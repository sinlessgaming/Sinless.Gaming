// =====================================================================
// Sinless GG push helper — a free Cloudflare Worker
// Sends phone alerts (Firebase Cloud Messaging) when the app is closed,
// plus a match-day reminder every morning.
//
// It needs ONE secret, added in Cloudflare (never share it with anyone):
//   FIREBASE_SERVICE_ACCOUNT = the whole JSON file you download from
//   Firebase → Project settings → Service accounts → Generate new private key
//
// 📦 Extra free storage (optional, see STORAGE-SETUP-GUIDE.txt). Secrets, added in Cloudflare only:
//   IMAGEKIT_PRIVATE_KEY                     (ImageKit → Developer options)
//   B2_KEY_ID, B2_APP_KEY                    (Backblaze → Application Keys)
//   B2_BUCKET_NAME                           (Backblaze → Buckets; the helper finds the ID by itself)
// Only people signed in to Sinless GG can upload (their Firebase sign-in is checked here).
//
// 🧠 GG AI in squads (v54, optional). Secret, added in Cloudflare only:
//   GEMINI_API_KEY                           (aistudio.google.com → Get API key)
// =====================================================================

const ALLOWED_ORIGINS = ['https://sinlessgg.com', 'https://www.sinlessgg.com', 'https://sinlessgaming.github.io'];
const SITE = 'https://sinlessgg.com/';

// 🧹 secrets pasted on a phone often carry hidden spaces or line breaks — remove them
let _envSrc = null, _envClean = null;
function cleanEnv(env) {
  if (_envSrc === env && _envClean) return _envClean;
  const out = {};
  for (const k of Object.keys(env)) { const v = env[k]; out[k] = (typeof v === 'string' && k !== 'FIREBASE_SERVICE_ACCOUNT') ? v.replace(/[\s\u200B-\u200D\uFEFF]+/g, '') : (typeof v === 'string' ? v.trim() : v); }
  _envSrc = env; _envClean = out; return out;
}

// ⚡ simple per-person speed limits (stop spam and abuse)
const RL = new Map();
function tooFast(key, max, windowMs) {
  const now = Date.now(), list = (RL.get(key) || []).filter(t => now - t < windowMs);
  if (list.length >= max) { RL.set(key, list); return true; }
  list.push(now); RL.set(key, list);
  if (RL.size > 5000) { for (const k of [...RL.keys()].slice(0, 2500)) RL.delete(k); }
  return false;
}

export default {
  async fetch(req, env0, ctx) {
    const env = cleanEnv(env0);
    const url = new URL(req.url);
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-File-Ext',
      'Vary': 'Origin'
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (url.pathname === '/health') return json({ ok: !!env.FIREBASE_SERVICE_ACCOUNT });
    // ⚽ G2 · 11 Wonders league (join, results, training, packs)
    if (url.pathname.startsWith('/w11/') && req.method === 'POST') return w11route(req, env, ctx, url, json);

    // morning reminders are sent in small batches (Cloudflare's free plan allows ~50 requests per run)
    if (url.pathname === '/remind' && req.method === 'POST') {
      if (!env.FIREBASE_SERVICE_ACCOUNT || req.headers.get('X-Key') !== sa(env).private_key_id) return json({ ok: false }, 403);
      let body = {};
      try { body = await req.json(); } catch (e) {}
      ctx.waitUntil(sendReminders(env, (body.list || []).slice(0, 8), body.day).catch(() => {}));
      return json({ ok: true });
    }

    // 🏛️ G18 Master League autopilot: one host per request (started by the hourly run below)
    if (url.pathname === '/mlrun' && req.method === 'POST') {
      if (!env.FIREBASE_SERVICE_ACCOUNT || req.headers.get('X-Key') !== sa(env).private_key_id) return json({ ok: false }, 403);
      let body = {}; try { body = await req.json(); } catch (e) {}
      if (body.uid) ctx.waitUntil(mlHost(env, String(body.uid)).catch(() => {}));
      return json({ ok: true });
    }
    // evening gaming-streak reminders, also sent in small batches
    if (url.pathname === '/remindgame' && req.method === 'POST') {
      if (!env.FIREBASE_SERVICE_ACCOUNT || req.headers.get('X-Key') !== sa(env).private_key_id) return json({ ok: false }, 403);
      let body = {};
      try { body = await req.json(); } catch (e) {}
      ctx.waitUntil(sendStreakReminders(env, (body.list || []).slice(0, 8)).catch(() => {}));
      return json({ ok: true });
    }

    if (url.pathname === '/notify' && req.method === 'POST') {
      let body = {};
      try { body = await req.json(); } catch (e) {}
      const id = String(body.id || '');
      if (!/^[A-Za-z0-9]{10,40}$/.test(id)) return json({ ok: false, error: 'bad id' }, 400);
      const who = req.headers.get('Authorization') ? await firebaseUid(req, env) : null;
      const ip = req.headers.get('CF-Connecting-IP') || 'x';
      if (tooFast('n:' + (who || ip), 40, 60000)) return json({ ok: false, error: 'slow down' }, 429);
      ctx.waitUntil(sendForNotification(env, id, who).catch(() => {}));
      return json({ ok: true });
    }
    // ---------- ⚽ Fantasy data relay (official FPL API, trimmed + cached so phones load it fast) ----------
    if (url.pathname.startsWith('/fpl/') && req.method === 'GET') {
      const path = url.pathname.slice(5);
      if (!/^[a-z0-9\-\/]{1,80}$/.test(path) || path.includes('..')) return json({ ok: false }, 400);
      const cache = caches.default, key = new Request('https://fpl.cache/' + path);
      let hit = await cache.match(key);
      if (!hit) {
        const r = await fetch('https://fantasy.premierleague.com/api/' + path, { headers: { 'User-Agent': 'Mozilla/5.0 SinlessGG' } });
        if (!r.ok) return json({ ok: false, status: r.status }, 502);
        let j = await r.json();
        if (path === 'bootstrap-static/') j = {
          teams: (j.teams || []).map(t => ({ id: t.id, short_name: t.short_name, name: t.name })),
          elements: (j.elements || []).map(p => ({ id: p.id, web_name: p.web_name, team: p.team, element_type: p.element_type, now_cost: p.now_cost, total_points: p.total_points, form: p.form, status: p.status, event_points: p.event_points, chance_of_playing_next_round: p.chance_of_playing_next_round })),
          events: (j.events || []).map(e => ({ id: e.id, deadline_time: e.deadline_time, is_current: e.is_current, is_next: e.is_next, finished: e.finished }))
        };
        const ttl = path === 'bootstrap-static/' ? 3 * 3600 : 600;
        hit = new Response(JSON.stringify(j), { headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${ttl}` } });
        ctx.waitUntil(cache.put(key, hit.clone()));
      }
      const out = new Response(hit.body, hit); out.headers.set('Access-Control-Allow-Origin', '*'); return out;
    }
    // ---------- 🔎 sitemap for Google: every public post, tournament, profile and squad ----------
    if (url.pathname === '/sitemap.xml') {
      if (!env.FIREBASE_SERVICE_ACCOUNT) return new Response('not set up', { status: 503 });
      const cache = caches.default, key = new Request('https://sitemap.cache/sinlessgg.xml');
      let hit = await cache.match(key); if (hit) return hit;
      const xml = await buildSitemap(env);
      const res = new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=21600' } });
      ctx.waitUntil(cache.put(key, res.clone()));
      return res;
    }
    // ---------- 📦 extra free storage ----------
    // 🌍 news for the app: only the topics a person wants, small and cached
    if (url.pathname === '/news' && req.method === 'GET') {
      const all = await newsGet(env), now = Date.now();
      const tps = (url.searchParams.get('t') || '').split(',').filter(Boolean), ks = (url.searchParams.get('k') || '').split(',').filter(Boolean);
      const rg = url.searchParams.get('rg') || '', q = (url.searchParams.get('q') || '').toLowerCase().slice(0, 60), one = url.searchParams.get('id');
      const lim = Math.min(120, +url.searchParams.get('limit') || 60), before = +url.searchParams.get('before') || 0;
      let list = all;
      if (one) list = list.filter(it => it.id === one);
      else {
        if (tps.length) list = list.filter(it => it.tp.some(z => tps.includes(z)));
        if (ks.length) list = list.filter(it => ks.includes(it.k));
        if (rg) list = list.filter(it => it.rg === rg);
        if (q) list = list.filter(it => (it.t + ' ' + (it.s || '')).toLowerCase().includes(q));
        if (before) list = list.filter(it => it.ts < before);
      }
      const counts = {}; all.forEach(it => { if (now - it.dt < 3600e3) it.tp.forEach(z => counts[z] = (counts[z] || 0) + 1); });
      const out = list.slice(0, lim).map(({ w, ...it }) => it);
      return new Response(JSON.stringify({ ok: true, at: now, hour: all.filter(it => now - it.dt < 3600e3).length, counts, items: out }), { headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' } });
    }
    // 🎁 free games right now
    if (url.pathname === '/free' && req.method === 'GET') {
      if (!_freeMem || Date.now() - _freeMem.at > 600000) { const { st } = await newsLoad(env); _freeMem = { at: Date.now(), free: st.free || [] }; }
      return new Response(JSON.stringify({ ok: true, free: _freeMem.free }), { headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' } });
    }
    // 📺 videos from ~1,600 official channels & creators (only approved ones, unless you ask for one channel)
    if (url.pathname === '/vids' && req.method === 'GET') {
      const all = await vidsGet(env), q = url.searchParams;
      const cs = (q.get('c') || '').split(',').filter(Boolean), ch = q.get('ch') || '', rg = q.get('rg') || '', lim = Math.min(200, +q.get('limit') || 60), before = +q.get('before') || 0, full = q.get('full') === '1';
      let list = ch ? all.filter(x => x.ci === ch) : all.filter(x => x.s === 'o');
      if (cs.length) list = list.filter(x => String(x.c).split(',').some(z => cs.includes(z)));
      if (rg) list = list.filter(x => x.rg === rg || x.rg === 'global');
      if (full) list = list.filter(x => x.f);
      if (before) list = list.filter(x => x.d < before);
      return new Response(JSON.stringify({ ok: true, items: list.slice(0, lim) }), { headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=120' } });
    }
    // 🛠️ admin: see / approve / remove / add channels
    if (url.pathname === '/channels' && req.method === 'GET') {
      const uid = await firebaseUid(req, env); if (!(await isAdminUid(env, uid))) return json({ ok: false, error: 'admins only' }, 403);
      const { L } = await chLoad(env), want = url.searchParams.get('st') || 'c', vids = await vidsGet(env), last = {};
      vids.forEach(x => { if (!last[x.ci]) last[x.ci] = x.v; });
      const list = L.filter(c => want === 'bad' ? c.id === 'x' : c.st === want && c.id && c.id !== 'x').slice(0, 300).map(c => ({ h: c.h, n: c.n, yt: c.yt || '', id: c.id, c: c.c, v: last[c.id] || '', fol: c.fol || 0 }));
      const count = { o: 0, c: 0, u: 0, x: 0, bad: 0, waiting: 0 }; L.forEach(c => { count[c.st] = (count[c.st] || 0) + 1; if (c.id === 'x') count.bad++; if (!c.id) count.waiting++; });
      return json({ ok: true, count, list });
    }
    if (url.pathname === '/channels/set' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); if (!(await isAdminUid(env, uid))) return json({ ok: false, error: 'admins only' }, 403);
      let b = {}; try { b = await req.json(); } catch (e) {}
      const { L, st } = await chLoad(env), to = ['o', 'x', 'c'].includes(b.st) ? b.st : null; if (!to) return json({ ok: false, error: 'bad status' }, 400);
      let n = 0;
      if (b.all === 'found') L.forEach(c => { if (c.st === 'c' && c.id && c.id !== 'x' && c.nv > 0) { c.st = to; n++; } });
      else if (b.all === 'bad') { const before = L.length; for (let i = L.length - 1; i >= 0; i--) if (L[i].id === 'x') L.splice(i, 1); n = before - L.length; }
      else L.forEach(c => { if ((b.id && c.id === b.id) || (b.h && String(c.h).toLowerCase() === String(b.h).toLowerCase())) { c.st = to; n++; } });
      await chSave(env, L, st); _vidMem = null;
      const items = await vidLoad(env), stOf = {}; L.forEach(c => { if (c.id) stOf[c.id] = c.st; }); items.forEach(x => { if (stOf[x.ci]) x.s = stOf[x.ci]; }); await vidSave(env, items.filter(x => x.s !== 'x'));
      return json({ ok: true, changed: n });
    }
    if (url.pathname === '/channels/add' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); if (!(await isAdminUid(env, uid))) return json({ ok: false, error: 'admins only' }, 403);
      let b = {}; try { b = await req.json(); } catch (e) {}
      let raw = String(b.h || '').trim(), byId = (raw.match(/(UC[\w-]{22})/) || [])[1] || null; raw = raw.replace(/^https?:\/\/(www\.|m\.)?youtube\.com\//, '').replace(/^@/, '').replace(/[/?#].*$/, '');
      const h = byId ? '' : raw; if (!byId && !/^[A-Za-z0-9_.\-]{2,60}$/.test(h)) return json({ ok: false, error: 'paste an @handle or a youtube.com/channel/UC… link' }, 400);
      const { L, st } = await chLoad(env); if (L.some(c => (h && String(c.h).toLowerCase() === h.toLowerCase()) || (byId && c.id === byId))) return json({ ok: false, error: 'already in the list' }, 409);
      const id = byId || await resolveHandle(h); if (!id || id === 'x') return json({ ok: false, error: 'channel not found on YouTube' }, 404);
      L.unshift({ h, n: String(b.n || h || '').slice(0, 40), c: String(b.c || 'fun').slice(0, 30), t: String(b.c || ''), rg: b.rg || 'global', f: b.f ? 1 : 0, st: 'o', kd: b.kd || 'o', id });
      await chSave(env, L, st); return json({ ok: true, id });
    }
    // ➕ follow a YouTube channel inside SINLESS GG (alerts when it posts)
    if (url.pathname === '/channels/follow' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('cf:' + uid, 15, 60000)) return json({ ok: false, error: 'slow down' }, 429);
      let b = {}; try { b = await req.json(); } catch (e) {}
      const id = String(b.id || ''); if (!/^UC[\w-]{22}$/.test(id)) return json({ ok: false, error: 'bad channel' }, 400);
      const on = b.on !== false, { L, st } = await chLoad(env);
      let c = L.find(x => x.id === id);
      if (!c && on) { c = { h: '', n: String(b.n || '').slice(0, 40), c: String(b.c || 'fun').slice(0, 20), t: '', rg: 'global', f: 0, st: 'u', id }; L.push(c); }
      if (c) { c.fol = Math.max(0, (c.fol || 0) + (on ? 1 : -1)); await chSave(env, L, st); }
      const user = await getDocument(env, `users/${uid}`); const tokens = ((user && user.fcmTokens) || []).slice(-5);
      if (tokens.length) await fetch(`https://iid.googleapis.com/iid/v1:${on ? 'batchAdd' : 'batchRemove'}`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json', access_token_auth: 'true' }, body: JSON.stringify({ to: '/topics/yt_' + id, registration_tokens: tokens }) }).catch(() => {});
      return json({ ok: true, alerts: tokens.length > 0 });
    }
    if (url.pathname === '/vids/run' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); if (!(await isAdminUid(env, uid))) return json({ ok: false, error: 'admins only' }, 403);
      return json({ ok: true, ...(await vidsRun(env, ctx, 30)) });
    }
    // 🔧 which news sources work (open in a browser)
    // ⭐ v60 server-side XP: phones send what they did, the worker checks the daily limits and adds the points
    if (url.pathname === '/xp' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('xp:' + uid, 20, 60000)) return json({ ok: false, error: 'slow down' }, 429);
      let b = {}; try { b = await req.json(); } catch (e) {}
      const ev = Array.isArray(b.events) ? b.events.slice(0, 80) : [];
      const r = await xpGrant(env, uid, ev);
      return json({ ok: true, ...r });
    }
    // 🛡️ v60 public app settings (App Check site key lives in Cloudflare → Variables: APPCHECK_SITE_KEY)
    if (url.pathname === '/cfg' && req.method === 'GET') {
      return json({ ok: true, appCheckKey: String(env.APPCHECK_SITE_KEY || '').trim() });
    }
    // 🤫 v59 Confession Room: tell the writer "someone replied" without saying who (the writer stays hidden too)
    if (url.pathname === '/confess/alert' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('cf:' + uid, 12, 60000)) return json({ ok: false, error: 'slow down' }, 429);
      let b = {}; try { b = await req.json(); } catch (e) {}
      const cid = String(b.cid || ''); if (!/^[A-Za-z0-9]{10,40}$/.test(cid)) return json({ ok: false, error: 'bad id' }, 400);
      ctx.waitUntil(confessAlert(env, cid, uid).catch(() => {}));
      return json({ ok: true });
    }
    if (url.pathname === '/newscheck') {
      const { items, st } = await newsLoad(env);
      const src = NEWS_SOURCES.map(s => { const x = (st.src || {})[s[0]]; return `${x ? (x.ok ? '✅' : '❌') : '⏳'} ${s[0]} ${x ? (x.ok ? x.n + ' items' : x.e) : 'not checked yet'}`; });
      const chs = await chLoad(env).catch(() => ({ L: [], st: {} })), cnt = { o: 0, c: 0, u: 0, x: 0 }; let bad = [], waiting = 0; chs.L.forEach(c => { cnt[c.st] = (cnt[c.st] || 0) + 1; if (c.id === 'x') bad.push('@' + c.h); if (!c.id) waiting++; });
      const vtext = `\n\n📺 VIDEO CHANNELS\nshown: ${cnt.o} · waiting for your check: ${cnt.c} · added by followers: ${cnt.u || 0} · removed: ${cnt.x || 0}\nnot looked up yet: ${waiting} · not found on YouTube: ${bad.length}\nlast video run: ${chs.st.last ? new Date(chs.st.last).toISOString() : 'never'}\n` + (bad.length ? 'not found: ' + bad.slice(0, 60).join(' ') + '\n' : '');
      return new Response(`SINLESS GG news engine\nstories saved: ${items.length}\nlast run: ${st.last ? new Date(st.last).toISOString() : 'never'}\nGG Briefs today: ${st.ai || 0}\nfree games found: ${(st.free || []).length}\n\n` + src.join('\n') + vtext, { headers: { ...cors, 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    // 🔔 follow a topic / track a rumour (phone alerts through Google's topic push)
    if (url.pathname === '/news/follow' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('f:' + uid, 20, 60000)) return json({ ok: false, error: 'slow down' }, 429);
      let body = {}; try { body = await req.json(); } catch (e) {}
      const topic = String(body.topic || ''); if (!/^(n|tr)_[\w-]{1,60}$/.test(topic)) return json({ ok: false, error: 'bad topic' }, 400);
      const user = await getDocument(env, `users/${uid}`); const tokens = ((user && user.fcmTokens) || []).slice(-5);
      if (!tokens.length) return json({ ok: false, error: 'turn on phone alerts first' }, 409);
      const r = await fetch(`https://iid.googleapis.com/iid/v1:${body.on === false ? 'batchRemove' : 'batchAdd'}`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json', access_token_auth: 'true' }, body: JSON.stringify({ to: '/topics/' + topic, registration_tokens: tokens }) });
      return json({ ok: r.ok, status: r.status });
    }
    // ▶️ admins can run the news engine right now
    if (url.pathname === '/news/run' && req.method === 'POST') {
      const uid = await firebaseUid(req, env); const adm = uid && await getDocument(env, 'config/admins');
      if (!adm || !(adm.uids || []).includes(uid)) return json({ ok: false, error: 'admins only' }, 403);
      return json({ ok: true, ...(await newsRun(env, ctx)) });
    }

    // 📦 storage meter for admins (ImageKit usage this month)
    if (url.pathname === '/media/usage' && req.method === 'GET') {
      if (!env.IMAGEKIT_PRIVATE_KEY) return json({ ok: false, error: 'ImageKit not set up' }, 503);
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      const adm = await getDocument(env, 'config/admins'); if (!adm || !(adm.uids || []).includes(uid)) return json({ ok: false, error: 'admins only' }, 403);
      const d = new Date(), start = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-01`, end = new Date(Date.now() + DAY).toISOString().slice(0, 10);
      const r = await fetch(`https://api.imagekit.io/v1/accounts/usage?startDate=${start}&endDate=${end}`, { headers: { Accept: 'application/json', Authorization: 'Basic ' + btoa(env.IMAGEKIT_PRIVATE_KEY + ':') } });
      if (!r.ok) return json({ ok: false, error: 'ImageKit said ' + r.status }, 502);
      const u = await r.json();
      return json({ ok: true, storageBytes: u.mediaLibraryStorageBytes || 0, bandwidthBytes: u.bandwidthBytes || 0, from: start });
    }

    // 🧠 GG AI: answers "@ai …" in squads. The key stays secret here; each squad gets a daily limit.
    if (url.pathname === '/ai' && req.method === 'POST') {
      if (!(env.GEMINI_API_KEY || env.AI) || !env.FIREBASE_SERVICE_ACCOUNT) return json({ ok: false, error: 'GG AI is not set up' }, 503);
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('ai:' + uid, 4, 60000)) return json({ ok: false, limit: true, error: 'slow down' }, 429);
      let body = {}; try { body = await req.json(); } catch (e) {}
      const sid = String(body.sid || ''); if (!/^[\w-]{3,80}$/.test(sid)) return json({ ok: false, error: 'bad squad' }, 400);
      const sq = await getDocument(env, `squads/${sid}`);
      if (!sq) return json({ ok: false, error: 'not allowed' }, 403);
      if (sq.bots && sq.bots.ai === false) return json({ ok: false, error: 'ai off' }, 403);
      // v58.7: older squads keep members by name only, so also accept the owner, squad admins, app admins and members listed by name
      let okMember = (sq.memberUids || []).includes(uid) || sq.ownerUid === uid || (sq.adminUids || []).includes(uid);
      if (!okMember) { const u = await getDocument(env, `users/${uid}`).catch(() => null); const names = [u && u.username, u && u.gamertag].filter(Boolean).map(x => String(x).replace('@', '').toLowerCase()); okMember = names.some(n => (sq.members || []).some(m => String(m).replace('@', '').toLowerCase() === n)) || await isAdminUid(env, uid); }
      if (!okMember) return json({ ok: false, error: 'not allowed' }, 403);
      const day = new Date().toISOString().slice(0, 10).replace(/-/g, ''), uKey = `aiUsage/${sid}_${day}`, mKey = `aiUsage/u_${uid}_${day}`;
      const [su, mu] = await Promise.all([getDocument(env, uKey), getDocument(env, mKey)]);
      const sN = (su && su.n) || 0, mN = (mu && mu.n) || 0, SQ_MAX = +(env.AI_SQUAD_DAILY || 50), ME_MAX = +(env.AI_USER_DAILY || 10);
      if (sN >= SQ_MAX || mN >= ME_MAX) return json({ ok: false, limit: true }, 429);
      await Promise.all([patchDocument(env, uKey, { n: { integerValue: String(sN + 1) } }), patchDocument(env, mKey, { n: { integerValue: String(mN + 1) } })]);
      const asker = String(body.asker || '').slice(0, 40).replace(/[^\w.]/g, '');
      const q = String(body.q || '').replace(/(^|\s)@ai\b/ig, ' ').trim().slice(0, 500), context = String(body.ctx || '').slice(0, 2500);
      let reply = env.GEMINI_API_KEY ? await askGemini(env, q, context, asker) : null;
      if (!reply && env.AI) reply = await askWorkersAi(env, q, context, asker);   // free Cloudflare AI when Google says no
      if (!reply) reply = "Sorry, I can't answer that one right now. Try asking another way 🙏";
      const room = String(body.room || 'chat').slice(0, 40);
      await createDocument(env, `squads/${sid}/messages`, {
        room: { stringValue: room }, sender: { stringValue: 'GG AI' }, senderUid: { stringValue: 'gg_ai' }, bot: { booleanValue: true }, botName: { stringValue: 'GG AI' },
        text: { stringValue: (asker ? '@' + asker + ' ' : '') + reply.slice(0, 900) }, timestamp: { integerValue: String(Date.now()) }, createdAt: { timestampValue: new Date().toISOString() }
      });
      return json({ ok: true, left: SQ_MAX - sN - 1 });
    }

    // 🌍 translate a post / comment / message into your language (free Cloudflare AI) · 40 a day per person
    if ((url.pathname === '/ai/translate' || url.pathname === '/ai/transcribe') && req.method === 'POST') {
      if (!env.AI) return json({ ok: false, error: 'Translation is not switched on yet (Workers AI binding "AI").' }, 503);
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('tr:' + uid, 12, 60000)) return json({ ok: false, error: 'slow down' }, 429);
      let body = {}; try { body = await req.json(); } catch (e) {}
      const to = String(body.to || 'en').toLowerCase().slice(0, 2).replace(/[^a-z]/g, '') || 'en';
      const day = new Date().toISOString().slice(0, 10).replace(/-/g, ''), key = `aiUsage/tr_${uid}_${day}`, u = await getDocument(env, key), n = (u && u.n) || 0;
      const MAX = url.pathname === '/ai/translate' ? 40 : 15; if (n >= MAX) return json({ ok: false, limit: true, error: 'daily limit reached, try tomorrow' }, 429);
      const tr = async (text) => { if (!text || to === 'en' && /^[\x00-\x7F\s]*$/.test(text) && body.src === 'en') return text; const r = await env.AI.run('@cf/meta/m2m100-1.2b', { text: String(text).slice(0, 1500), target_lang: to, ...(body.src ? { source_lang: String(body.src).slice(0, 2) } : {}) }); return String((r && r.translated_text) || ''); };
      try {
        if (url.pathname === '/ai/translate') {
          const text = String(body.text || '').slice(0, 1500); if (!text.trim()) return json({ ok: false, error: 'nothing to translate' }, 400);
          const out = await tr(text); await patchDocument(env, key, { n: { integerValue: String(n + 1) } });
          return json({ ok: true, text: out });
        }
        // 🎤 voice notes & short videos → words (Whisper), then into your language
        const mu = String(body.url || ''); let audio = null;
        const own = mu.match(/^https:\/\/[^/]+\/f\/(sinlessgg\/[\w/.-]+)$/);
        if (own && env.B2_KEY_ID) { const a = await b2Auth(env), bk = await b2FindBucket(env); const r = await fetch(`${a.downloadUrl}/file/${encodeURIComponent(bk.name)}/${own[1]}`, { headers: { Authorization: a.token } }); if (r.ok) audio = await r.arrayBuffer(); }
        else if (/^https:\/\/(ik\.imagekit\.io|res\.cloudinary\.com)\//.test(mu)) { const r = await fetch(mu); if (r.ok) audio = await r.arrayBuffer(); }
        if (!audio) return json({ ok: false, error: 'could not open that file' }, 400);
        if (audio.byteLength > 20 * 1024 * 1024) return json({ ok: false, error: 'too long (max about 20 MB)' }, 413);
        let bin = ''; const B = new Uint8Array(audio); for (let i = 0; i < B.length; i += 0x8000) bin += String.fromCharCode.apply(null, B.subarray(i, i + 0x8000));
        const w = await env.AI.run('@cf/openai/whisper-large-v3-turbo', { audio: btoa(bin) });
        const segs = ((w && w.segments) || []).slice(0, 400).map(s => ({ a: +(+s.start).toFixed(2), b: +(+s.end).toFixed(2), t: String(s.text || '').trim() })).filter(s => s.t);
        const lang = String((w && w.transcription_info && w.transcription_info.language) || '').slice(0, 2);
        let text = String((w && w.text) || '').trim();
        if (lang && lang !== to) { text = await tr(text); for (const s of segs.slice(0, 25)) s.t = await tr(s.t); }
        await patchDocument(env, key, { n: { integerValue: String(n + 1) } });
        return json({ ok: true, text, segs, lang });
      } catch (e) { return json({ ok: false, error: 'AI is busy, try again' }, 502); }
    }
    if (url.pathname === '/media/health') return json({ ok: true, imagekit: !!env.IMAGEKIT_PRIVATE_KEY, b2: !!(env.B2_KEY_ID && env.B2_APP_KEY), ai: !!(env.GEMINI_API_KEY || env.AI) });
    // 🔧 B2 check: open …workers.dev/b2check in a browser to see which step fails
    if (url.pathname === '/b2check') {
      const out = { signIn: false, bucket: null };
      try { await b2Auth(env, true); out.signIn = true; const bk = await b2FindBucket(env); out.bucket = bk.name; await b2UploadTarget(env, true); out.uploadReady = true; } catch (e) { out.error = String(e.message || e).slice(0, 160); }
      return json(out);
    }
    if (url.pathname === '/ik-auth' && req.method === 'POST') {
      if (!env.IMAGEKIT_PRIVATE_KEY) return json({ ok: false, error: 'not set up' }, 503);
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('u:' + uid, 40, 600000)) return json({ ok: false, error: 'Too many uploads. Wait a few minutes.' }, 429);
      const token = crypto.randomUUID(), expire = Math.floor(Date.now() / 1000) + 600;
      return json({ ok: true, token, expire, signature: await hmacSha1Hex(env.IMAGEKIT_PRIVATE_KEY, token + expire) });
    }
    if (url.pathname === '/b2-upload' && req.method === 'POST') {
      if (!(env.B2_KEY_ID && env.B2_APP_KEY)) return json({ ok: false, error: 'not set up' }, 503);
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      const type = (req.headers.get('Content-Type') || '').toLowerCase();
      if (!/^(image|video|audio)\/[\w.+-]+$/.test(type)) return json({ ok: false, error: 'photos, videos and audio only' }, 415);
      const len = +req.headers.get('Content-Length') || 0;
      if (len > 62 * 1024 * 1024) return json({ ok: false, error: 'file too big (60 MB max)' }, 413);
      const body = await req.arrayBuffer();
      if (!body.byteLength || body.byteLength > 62 * 1024 * 1024) return json({ ok: false, error: 'bad file size' }, 413);
      const ext = String(req.headers.get('X-File-Ext') || 'bin').replace(/[^a-z0-9]/gi, '').slice(0, 5).toLowerCase() || 'bin';
      const name = `sinlessgg/${uid.slice(0, 10)}/${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`;
      try { return json({ ok: true, url: await b2Upload(env, name, type, body) }); }
      catch (e) { return json({ ok: false, error: 'B2: ' + (e.message || 'upload failed') }, 502); }
    }
    // B2 files shown through Cloudflare (free traffic between Backblaze and Cloudflare, cached near the viewer)
    if (url.pathname.startsWith('/f/') && (req.method === 'GET' || req.method === 'HEAD')) {
      if (!env.B2_KEY_ID) return new Response('not set up', { status: 404 });
      const path = url.pathname.slice(3);
      if (!/^sinlessgg\/[\w/.-]+$/.test(path) || path.includes('..')) return new Response('not found', { status: 404 });
      const range = req.headers.get('Range');
      const finish = (r, ok) => { const out = new Response(req.method === 'HEAD' ? null : r.body, r); out.headers.set('Access-Control-Allow-Origin', '*'); out.headers.set('X-Content-Type-Options', 'nosniff'); out.headers.set('Cache-Control', ok ? 'public, max-age=2592000, immutable' : 'no-store'); return out; };
      // 1) already saved at Cloudflare? (only good files are ever saved)
      const key = new Request(url.origin + url.pathname, { method: 'GET' });
      const hit = await caches.default.match(range ? new Request(key, { headers: { Range: range } }) : key);
      if (hit) return finish(hit, true);
      // 2) fetch from Backblaze WITH our key (works for Private buckets); sign in again once if the pass expired
      const get = async (force, rng) => { const a = await b2Auth(env, force), bk = await b2FindBucket(env); const h = { Authorization: a.token }; if (rng) h.Range = rng; return fetch(`${a.downloadUrl}/file/${encodeURIComponent(bk.name)}/${path}`, { method: 'GET', headers: h }); };
      let r = await get(false, range);
      if (r.status === 401 || r.status === 403) { b2A = null; r = await get(true, range); }
      const ok = r.status === 200 || r.status === 206;
      // 3) save the whole file for next time (never save errors)
      if (ok) ctx.waitUntil((async () => { try { const full = range ? await get(false, null) : r.clone(); if (full.status === 200) { const c = new Response(full.body, full); c.headers.set('Cache-Control', 'public, max-age=2592000, immutable'); await caches.default.put(key, c); } } catch (e) {} })());
      return finish(r, ok);
    }
    return json({ ok: false, error: 'not found' }, 404);
  },

  // Runs on the schedules you set in Cloudflare:
  //   0 7 * * *   → match-day reminders (morning)
  //   0 18 * * *  → 🔥 gaming streak reminders (evening)
  async scheduled(event, env0, ctx) {
    const env = cleanEnv(env0);
    // 🌍 the news engine has its own 5-minute schedule; the reminders keep their own times
    const cron = String(event.cron || '');
    // ⚽ G2 · 11 Wonders: its own 5-minute schedule "4-59/5" (lock team sheets, settle results, season change)
    if (cron.startsWith('4-59/5')) { ctx.waitUntil(w11cron(env).catch(() => {})); return; }
    // 📺 videos: their own schedule "2-59/5 * * * *" (40 channels a run); without it, the news run checks 12 channels too
    if (cron.startsWith('2-59/5')) { ctx.waitUntil((async () => { const g = await goalsRun(env).catch(() => 0); await vidsRun(env, ctx, g ? 24 : 36).catch(() => {}); })()); return; }   // ⚽ v60 goal alerts first, then videos
    // 🏛️ G18: once an hour (minutes 30–34) the 5-minute run does the Master League autopilot instead of the news (its own full budget)
    if (cron.startsWith('*/5')) { const mm = new Date(event.scheduledTime || Date.now()).getUTCMinutes(); if (mm >= 30 && mm < 35) { ctx.waitUntil(mlCron(env).catch(() => {})); return; } }
    if (cron.includes('/5') || cron.includes('/10')) ctx.waitUntil(confessRun(env).catch(() => {}));   // 🤫 daily question + GG AI replies
    if (cron.includes('/5') || cron.includes('/10')) { ctx.waitUntil(newsRun(env, ctx).then(async () => { const d = await getDocument(env, CH_DOC).catch(() => null); const st = (() => { try { return JSON.parse((d && d.st) || '{}'); } catch (e) { return {}; } })(); if (!st.last || Date.now() - st.last > 12 * 60000) await vidsRun(env, ctx, 12); }).catch(() => {})); return; }
    if (new Date(event.scheduledTime || Date.now()).getUTCHours() >= 15) ctx.waitUntil(streakReminders(env).catch(() => {}));
    else ctx.waitUntil(matchDayReminders(env).catch(() => {}));
  }
};


// =====================================================================
// 🌍 v56 NEWS ENGINE — every 5 minutes it checks a few sources (in turns), merges repeats,
// labels them (Official / Reported / Rumour / Leak / Community / Video) and saves ONE small file.
// Legal: headline + short preview + credit + link only. Official YouTube videos are embedded, never copied.
// =====================================================================
const NEWS_DOC = 'news/feed';
// [id, url, topics, kind, tier, region]   kind: o=official p=press c=community v=video   tier: A=fast, B=normal
const NEWS_SOURCES = [
  // 🎮 games
  ['ign', 'https://feeds.feedburner.com/ign/news', 'games', 'p', 'A'],
  ['gamespot', 'https://www.gamespot.com/feeds/news/', 'games', 'p', 'A'],
  ['eurogamer', 'https://www.eurogamer.net/feed', 'games', 'p', 'B'],
  ['pcgamer', 'https://www.pcgamer.com/rss/', 'games', 'p', 'B'],
  ['vgc', 'https://www.videogameschronicle.com/feed/', 'games', 'p', 'A'],
  ['gematsu', 'https://www.gematsu.com/feed', 'games', 'p', 'B', 'asia'],
  ['polygon', 'https://www.polygon.com/rss/index.xml', 'games', 'p', 'B'],
  ['gamerant', 'https://gamerant.com/feed/', 'games', 'p', 'B'],
  ['dexerto', 'https://www.dexerto.com/feed/', 'games,esports', 'p', 'A'],
  ['psblog', 'https://blog.playstation.com/feed/', 'games', 'o', 'B'],
  ['xboxwire', 'https://news.xbox.com/en-us/feed/', 'games', 'o', 'B'],
  ['charlieintel', 'https://www.charlieintel.com/feed/', 'cod,games', 'p', 'A'],
  ['r_leaks', 'https://www.reddit.com/r/GamingLeaksAndRumours/.rss', 'games', 'c', 'A'],
  ['r_fcm', 'https://www.reddit.com/r/FUTMobile/.rss', 'fcmobile', 'c', 'A'],
  ['r_eafc', 'https://www.reddit.com/r/EASportsFC/.rss', 'eafc', 'c', 'B'],
  ['r_efootball', 'https://www.reddit.com/r/eFootball/.rss', 'efootball', 'c', 'A'],
  ['r_dls', 'https://www.reddit.com/r/DreamLeagueSoccer/.rss', 'dls', 'c', 'B'],
  ['r_codm', 'https://www.reddit.com/r/CallOfDutyMobile/.rss', 'cod', 'c', 'B'],
  ['esportsinsider', 'https://esportsinsider.com/feed', 'esports', 'p', 'B'],
  // ⚽ football & sports
  ['bbcfootball', 'https://feeds.bbci.co.uk/sport/football/rss.xml', 'football', 'p', 'A', 'europe'],
  ['skytransfers', 'https://www.skysports.com/rss/12040', 'football,transfers', 'p', 'A', 'europe'],
  ['skyfootball', 'https://www.skysports.com/rss/11095', 'football', 'p', 'B', 'europe'],
  ['guardianfootball', 'https://www.theguardian.com/football/rss', 'football', 'p', 'B', 'europe'],
  ['espnfc', 'https://www.espn.com/espn/rss/soccer/news', 'football', 'p', 'A', 'us'],
  ['ghanasoccernet', 'https://ghanasoccernet.com/feed', 'football', 'p', 'B', 'africa'],
  ['espnnba', 'https://www.espn.com/espn/rss/nba/news', 'sports,nba', 'p', 'B', 'us'],
  ['espnmma', 'https://www.espn.com/espn/rss/mma/news', 'sports,ufc', 'p', 'B', 'us'],
  ['espntennis', 'https://www.espn.com/espn/rss/tennis/news', 'sports', 'p', 'B'],
  ['f1', 'https://www.formula1.com/en/latest/all.xml', 'sports,f1', 'o', 'B'],
  ['cricinfo', 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml', 'sports,cricket', 'p', 'B', 'india'],
  // 🎬 movies, series, asian dramas, anime
  ['deadline', 'https://deadline.com/feed/', 'movies,series', 'p', 'A', 'us'],
  ['variety', 'https://variety.com/feed/', 'movies,series', 'p', 'B', 'us'],
  ['collider', 'https://collider.com/feed/', 'movies,series', 'p', 'B'],
  ['screenrant', 'https://screenrant.com/feed/', 'movies,series', 'p', 'B'],
  ['soompi', 'https://www.soompi.com/feed', 'kdrama,kpop,music', 'p', 'A', 'asia'],
  ['htbollywood', 'https://www.hindustantimes.com/feeds/rss/entertainment/bollywood/rssfeed.xml', 'bollywood,movies', 'p', 'B', 'india'],
  ['bellanaija', 'https://www.bellanaija.com/feed/', 'nollywood,music', 'p', 'B', 'africa'],
  ['ann', 'https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us', 'anime', 'p', 'A', 'asia'],
  ['crunchyroll', 'https://cr-news-api-service.prd.crunchyrollsvc.com/v1/en-US/rss', 'anime', 'o', 'B', 'asia'],
  ['mal', 'https://myanimelist.net/rss/news.xml', 'anime', 'p', 'B', 'asia'],
  // 🎵 music
  ['billboard', 'https://www.billboard.com/feed/', 'music', 'p', 'B', 'us'],
  ['rollingstone', 'https://www.rollingstone.com/feed/', 'music', 'p', 'B', 'us'],
  ['notjustok', 'https://notjustok.com/feed/', 'music,afrobeats', 'p', 'B', 'africa'],
  ['remezcla', 'https://remezcla.com/feed/', 'music,latin', 'p', 'B', 'latam'],
  // 📱 phones, tech, AI
  ['gsmarena', 'https://www.gsmarena.com/rss-news-reviews.php3', 'phones', 'p', 'A'],
  ['macrumors', 'https://feeds.macrumors.com/MacRumors-All', 'phones,tech', 'p', 'A'],
  ['9to5mac', 'https://9to5mac.com/feed/', 'phones,tech', 'p', 'A'],
  ['9to5google', 'https://9to5google.com/feed/', 'phones,tech', 'p', 'A'],
  ['sammobile', 'https://www.sammobile.com/feed/', 'phones', 'p', 'A'],
  ['androidauthority', 'https://www.androidauthority.com/feed/', 'phones,tech', 'p', 'B'],
  ['gizmochina', 'https://www.gizmochina.com/feed/', 'phones,tech', 'p', 'A', 'asia'],
  ['xda', 'https://www.xda-developers.com/feed/', 'phones,tech', 'p', 'B'],
  ['verge', 'https://www.theverge.com/rss/index.xml', 'tech', 'p', 'A'],
  ['techcrunch', 'https://techcrunch.com/feed/', 'tech,ai', 'p', 'B'],
  ['engadget', 'https://www.engadget.com/rss.xml', 'tech', 'p', 'B'],
  ['applenews', 'https://www.apple.com/newsroom/rss-feed.rss', 'phones,tech', 'o', 'B'],
  ['samsungnews', 'https://news.samsung.com/global/feed', 'phones,tech', 'o', 'B'],
  // 🚗 cars
  ['electrek', 'https://electrek.co/feed/', 'cars', 'p', 'B'],
  ['motor1', 'https://www.motor1.com/rss/news/all/', 'cars', 'p', 'B'],
  ['carscoops', 'https://www.carscoops.com/feed/', 'cars', 'p', 'B'],
  // 👗 lifestyle, wrestling, books, students
  ['hypebeast', 'https://hypebeast.com/feed', 'fashion', 'p', 'B'],
  ['vogue', 'https://www.vogue.com/feed/rss', 'fashion', 'p', 'B'],
  ['bonappetit', 'https://www.bonappetit.com/feed/rss', 'food', 'p', 'B'],
  ['menshealth', 'https://www.menshealth.com/rss/all.xml/', 'fitness', 'p', 'B'],
  ['cntraveler', 'https://www.cntraveler.com/feed/rss', 'travel', 'p', 'B'],
  ['cageside', 'https://www.cagesideseats.com/rss/index.xml', 'wrestling', 'p', 'B'],
  ['wrestlinginc', 'https://www.wrestlinginc.com/feed/', 'wrestling', 'p', 'B'],
  ['bookriot', 'https://bookriot.com/feed/', 'books', 'p', 'B'],
  ['lithub', 'https://lithub.com/feed/', 'books', 'p', 'B'],
  ['oppdesk', 'https://opportunitydesk.org/feed/', 'students', 'p', 'B'],
  // 🎬 official YouTube channels (trailers, gameplay) — "yt:@handle" is turned into the channel feed once
  ['yt_easportsfc', 'yt:@EASPORTSFC', 'eafc,fcmobile', 'v', 'A'],
  ['yt_efootball', 'yt:@play_eFootball', 'efootball', 'v', 'A'],
  ['yt_cod', 'yt:@CallofDuty', 'cod', 'v', 'A'],
  ['yt_playstation', 'yt:@PlayStation', 'games', 'v', 'B'],
  ['yt_xbox', 'yt:@Xbox', 'games', 'v', 'B'],
  ['yt_ign', 'yt:@IGN', 'games,movies', 'v', 'B'],
  ['yt_netflix', 'yt:@Netflix', 'series,movies', 'v', 'B'],
  ['yt_marvel', 'yt:@MarvelEntertainment', 'movies', 'v', 'B'],
  ['yt_wbpictures', 'yt:@WarnerBrosPictures', 'movies', 'v', 'B'],
  ['yt_sony', 'yt:@SonyPictures', 'movies', 'v', 'B'],
  ['yt_crunchyroll', 'yt:@Crunchyroll', 'anime', 'v', 'B', 'asia'],
  ['yt_fabrizio', 'yt:@FabrizioRomanoYT', 'football,transfers', 'v', 'A'],
  ['yt_wwe', 'yt:@WWE', 'wrestling', 'v', 'B'],
  ['yt_nba', 'yt:@NBA', 'sports,nba', 'v', 'B', 'us'],
  ['yt_f1', 'yt:@Formula1', 'sports,f1', 'v', 'B'],
  ['yt_tseries', 'yt:@tseries', 'music,bollywood', 'v', 'B', 'india'],
  ['yt_hybe', 'yt:@HYBELABELS', 'music,kpop', 'v', 'B', 'asia'],
  ['yt_samsung', 'yt:@Samsung', 'phones', 'v', 'B'],
  ['yt_apple', 'yt:@Apple', 'phones,tech', 'v', 'B'],
  ['yt_mkbhd', 'yt:@mkbhd', 'phones,tech', 'v', 'B'],
  ['yt_topgear', 'yt:@TopGear', 'cars', 'v', 'B'],
  // 🎙️ podcasts (audio plays from the podcast's own host, like any podcast app; video podcasts use YouTube's player)
  ['pod_footballdaily', 'https://podcasts.files.bbci.co.uk/p02nrsln.rss', 'football,podcasts', 'a', 'B', 'europe'],
  ['yt_overlap', 'yt:@TheOverlap', 'football,podcasts', 'v', 'B'],
  ['yt_restisfootball', 'yt:@TheRestIsFootball', 'football,podcasts', 'v', 'B'],
  ['yt_kindafunny', 'yt:@KindaFunnyGames', 'games,podcasts', 'v', 'B'],
  ['yt_hotones', 'yt:@FirstWeFeast', 'food,comedy,podcasts', 'v', 'B'],
  // 💃 dance & 😂 comedy (official channels only)
  ['yt_justdance', 'yt:@justdance', 'dance,games', 'v', 'B'],
  ['yt_1million', 'yt:@1MILLIONDanceStudio', 'dance', 'v', 'B', 'asia'],
  ['yt_snl', 'yt:@SNL', 'comedy', 'v', 'B', 'us'],
  ['yt_comedycentral', 'yt:@ComedyCentral', 'comedy', 'v', 'B', 'us']
];
const NEWS_BLOCK = /\b(mod ?apk|apk mod|free download|cracked?|hack(s|ed)? (tool|apk)|cheat (engine|codes? download)|torrent|nudes?|porn|xxx|onlyfans|betting tips?|sure odds|fixed matches?)\b/i;
const NEWS_TOPIC_WORDS = [
  ['fcmobile', /\b(fc ?mobile|fifa ?mobile)\b/i], ['efootball', /\befootball\b/i], ['dls', /\b(dls ?\d*|dream league)\b/i],
  ['cod', /\b(call of duty|warzone|black ops|cod ?mobile|modern warfare)\b/i], ['eafc', /\b(ea (sports )?fc|fc ?2[4-9]|ultimate team)\b/i],
  ['transfers', /\b(here we go|transfer|signs|signing|loan deal|release clause|bid for|agreed deal)\b/i],
  ['phones', /\b(iphone|ios \d|galaxy [sazf]\d*|pixel \d|xiaomi|redmi|poco|tecno|infinix|itel|oppo|vivo|oneplus|huawei|honor|nothing phone|realme|motorola)\b/i],
  ['ai', /\bAI\b|ChatGPT|OpenAI|\bLLMs?\b/], ['trailers', /\btrailers?\b/i], ['anime', /\banime|manga\b/i], ['kdrama', /\bk-?drama\b/i],
  ['esports', /\besports?|tournament final|world championship\b/i], ['gta', /\bgta ?(vi|6)|grand theft auto\b/i],
  ['patch', /\b(patch notes?|hotfix|title update|balance (update|changes)|season \d+ (update|patch)|v\d+\.\d+(\.\d+)? update)\b/i],
  ['codes', /\b(redeem codes?|promo codes?|reward codes?|gift codes?)\b/i],
  ['dance', /\b(dance challenge|choreograph|dance cover)\b/i]
];
const STOP = new Set('the a an and or of to in on for with at by from is are was be as it its this that new vs after over into how why what who will has have just more than up out about not his her their your our you we'.split(' '));
const nTxt = (s) => String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ').replace(/&(#\d+|#x[\da-f]+|\w+);/gi, (m, e) => { const map = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' }; if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return n ? String.fromCodePoint(n) : ''; } return map[e.toLowerCase()] ?? m; }).replace(/\s+/g, ' ').trim();
const tag = (block, name) => { const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i')); return m ? m[1] : ''; };
const words = (t) => [...new Set(String(t).toLowerCase().replace(/[^\p{L}\p{N} ]+/gu, ' ').split(' ').filter(w => w.length > 2 && !STOP.has(w)))];
function parseFeed(xml, src) {
  xml = xml.slice(0, 90000);
  const out = [], isAtom = /<feed[\s>]/i.test(xml.slice(0, 600));
  const blocks = xml.split(isAtom ? /<entry[\s>]/i : /<item[\s>]/i).slice(1, 14);
  for (const b of blocks) {
    const title = nTxt(tag(b, 'title')).slice(0, 220); if (!title) continue;
    let link = ''; if (isAtom) { const m = b.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i) || b.match(/<link[^>]*href="([^"]+)"/i); link = m ? m[1] : ''; } else link = nTxt(tag(b, 'link')) || ((b.match(/<guid[^>]*>(https?:[^<]+)<\/guid>/i) || [])[1] || '');
    if (!/^https?:\/\//.test(link)) continue;
    const when = Date.parse(nTxt(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date'))) || Date.now();
    const yt = (b.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1] || null;
    const au = src[3] === 'a' ? ((b.match(/<enclosure[^>]*url="(https:[^"]+)"[^>]*type="audio/i) || b.match(/<enclosure[^>]*type="audio[^"]*"[^>]*url="(https:[^"]+)"/i) || [])[1] || null) : null;
    let prev = nTxt(tag(b, 'description') || tag(b, 'summary') || tag(b, 'media:description') || tag(b, 'content'));
    let im = null;
    if (src[3] === 'c') {                                // v60: community posts get their picture + first lines, so they make sense
      const raw = b.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      const m = raw.match(/<media:thumbnail[^>]*url="(https:\/\/[^"]+)"/i) || raw.match(/<img[^>]*src="(https:\/\/(?:i|preview|external-preview)\.redd\.it\/[^"]+)"/i);
      im = m ? m[1].replace(/&amp;/g, '&') : null;
      prev = prev.replace(/<[^>]*>/g, ' ').replace(/&[#\w]+;/g, ' ').replace(/submitted by[\s\S]*$/i, '').replace(/\[link\]|\[comments\]/gi, '').replace(/\s+/g, ' ').trim();
      if (!prev && !im && (title.split(/\s+/).length < 9 || /\?\s*$/.test(title))) continue;   // a lonely question with no picture or text means nothing to readers
    }
    prev = prev.replace(/(submitted by|\[link\]|\[comments\]).*$/i, '').slice(0, 200);
    out.push({ title, link: link.replace(/&amp;/g, '&'), when, yt, prev, im, au: au ? au.replace(/&amp;/g, '&') : null });
  }
  return out;
}
function kindOf(src, title) {
  const k = src[3]; if (k === 'o') return 'o'; if (k === 'v') return 'v'; if (k === 'a') return 'a';
  if (/\b(leak(ed|s)?|datamin(e|ed|ing)|data-?mine)\b/i.test(title)) return 'l';
  if (/\bhere we go\b/i.test(title)) return 'p';
  if (/\b(rumou?rs?|reportedly|could|set to|linked|eyeing|in talks|tipped|expected to|might|may be|allegedly|claims?)\b/i.test(title)) return 'r';
  return k === 'c' ? 'c' : 'p';
}
function topicsOf(src, title) {
  const t = new Set(String(src[2]).split(','));
  NEWS_TOPIC_WORDS.forEach(([k, re]) => { if (re.test(title)) t.add(k); });
  if (t.has('fcmobile') || t.has('efootball') || t.has('dls') || t.has('cod') || t.has('eafc') || t.has('gta') || t.has('esports')) t.add('games');
  if (t.has('transfers')) t.add('football');
  return [...t].slice(0, 6);
}
const RANK = { o: 5, p: 3, v: 3, a: 3, r: 2, l: 2, c: 1 };
async function newsLoad(env) {
  const d = await getDocument(env, NEWS_DOC).catch(() => null);
  let items = [], st = {}; try { items = JSON.parse((d && d.json) || '[]'); } catch (e) {} try { st = JSON.parse((d && d.st) || '{}'); } catch (e) {}
  return { items, st };
}
async function newsSave(env, items, st) {
  await patchDocument(env, NEWS_DOC, { json: { stringValue: JSON.stringify(items) }, st: { stringValue: JSON.stringify(st) }, at: { integerValue: String(Date.now()) } });
}
async function ytFeedUrl(env, handle, st) {
  st.yt = st.yt || {}; if (st.ytv !== 1) { st.ytv = 1; Object.keys(st.yt).forEach(k => { if (st.yt[k] === 'x') delete st.yt[k]; }); }
  if (st.yt[handle]) return st.yt[handle] === 'x' ? null : `https://www.youtube.com/feeds/videos.xml?channel_id=${st.yt[handle]}`;
  try {
    const r = await fetch(`https://www.youtube.com/${handle}`, { headers: YT_HEAD }); const t = (await r.text()).slice(0, 400000);
    const m = t.match(/"externalId":"(UC[\w-]{22})"/) || t.match(/channel\/(UC[\w-]{22})/);
    if (m) st.yt[handle] = m[1]; else if (r.status === 404) st.yt[handle] = 'x';   // v60: only a real 404 counts as "not found"; otherwise try again next time
  } catch (e) {}
  return st.yt[handle] === 'x' ? null : `https://www.youtube.com/feeds/videos.xml?channel_id=${st.yt[handle]}`;
}
async function newsRun(env, ctx) {
  const { items, st } = await newsLoad(env);
  const A = NEWS_SOURCES.filter(s => s[4] === 'A'), B = NEWS_SOURCES.filter(s => s[4] !== 'A');
  st.ia = st.ia || 0; st.ib = st.ib || 0; st.src = st.src || {}; st.day = st.day || ''; st.al = st.al || {};
  const today = new Date().toISOString().slice(0, 10); if (st.day !== today) { st.day = today; st.al = {}; st.ai = 0; }
  const pick = []; for (let i = 0; i < 7; i++) pick.push(A[(st.ia + i) % A.length]); for (let i = 0; i < 5; i++) pick.push(B[(st.ib + i) % B.length]);
  st.ia = (st.ia + 7) % A.length; st.ib = (st.ib + 5) % B.length;
  const fresh = [];
  await Promise.all(pick.map(async (src) => {
    try {
      let url = src[1]; if (url.startsWith('yt:')) { url = await ytFeedUrl(env, url.slice(3), st); if (!url) { st.src[src[0]] = { ok: 0, e: 'channel not found', at: Date.now() }; return; } }
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SinlessGG/1.0; +https://sinlessgg.com/editorial.html)', Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.5' }, cf: { cacheTtl: 120 } });
      if (!r.ok) { st.src[src[0]] = { ok: 0, e: 'HTTP ' + r.status, at: Date.now() }; return; }
      const list = parseFeed(await r.text(), src);
      st.src[src[0]] = { ok: 1, n: list.length, at: Date.now() };
      list.forEach(x => fresh.push({ x, src }));
    } catch (e) { st.src[src[0]] = { ok: 0, e: String(e.message || e).slice(0, 60), at: Date.now() }; }
  }));
  const now = Date.now(), byLink = new Map(), alerts = [], idx = new Map();
  items.forEach(it => { byLink.set(it.u, it); (it.src || []).forEach(s => byLink.set(s.u, it)); if (!it.y && now - it.ts < 2 * 86400e3) (it.w || []).forEach(z => { let a = idx.get(z); if (!a) idx.set(z, a = []); a.push(it); }); });
  for (const { x, src } of fresh) {
    if (NEWS_BLOCK.test(x.title) || NEWS_BLOCK.test(x.prev)) continue;
    if (now - x.when > 3 * 86400e3) continue;
    if (byLink.has(x.link)) continue;
    const k = kindOf(src, x.title), w = words(x.title), tp = topicsOf(src, x.title);
    // same story from another source? (most words in common, same day or two)
    let twin = null;
    if (w.length >= 4 && !x.yt && !x.au) { const cnt = new Map(); w.forEach(z => (idx.get(z) || []).forEach(it => cnt.set(it, (cnt.get(it) || 0) + 1))); for (const [it, c] of cnt) { if (c >= 3 && c / Math.min(it.w.length, w.length) >= 0.6) { twin = it; break; } } }
    if (twin) {
      byLink.set(x.link, twin);
      if (!twin.src.some(s => s.n === src[0])) {
        twin.src.push({ n: src[0], u: x.link }); twin.sc = twin.src.length;
        const before = twin.k; if ((RANK[k] || 0) > (RANK[twin.k] || 0) && twin.k !== 'v') { twin.k = k; (twin.tl = twin.tl || []).push({ k, t: now, n: src[0] }); }
        tp.forEach(z => { if (!twin.tp.includes(z) && twin.tp.length < 8) twin.tp.push(z); });
        if (before !== 'o' && twin.k === 'o' && (before === 'r' || before === 'l')) alerts.push({ it: twin, why: 'confirmed' });
        if (twin.sc === 3) alerts.push({ it: twin, why: 'big' });
      }
      continue;
    }
    const id = (src[0] + '_' + (x.yt || x.link)).replace(/[^\w]+/g, '').slice(-40);
    const it = { id, t: x.title, s: x.prev, ...(x.im ? { im: x.im } : {}), u: x.link, src: [{ n: src[0], u: x.link }], sc: 1, tp, k, ts: Math.min(x.when, now), dt: now, w: w.slice(0, 12), rg: src[5] || 'global', tl: [{ k, t: now, n: src[0] }] };
    if (x.yt) { it.y = x.yt; it.k = 'v'; }
    if (x.au) { it.au = x.au; it.k = 'a'; }
    if (/\bspoilers?\b/i.test(x.title + ' ' + x.prev)) it.sp = 1;
    items.unshift(it); byLink.set(x.link, it); if (!it.y) w.forEach(z => { let a = idx.get(z); if (!a) idx.set(z, a = []); a.push(it); });
    if ((k === 'o' && /\b(release|launch|update|trailer|announc|revealed?|available now|season)\b/i.test(x.title)) || /\bhere we go\b/i.test(x.title)) alerts.push({ it, why: 'big' });
  }
  // keep newest 360, drop old (3 days)
  items.sort((a, b) => b.ts - a.ts);
  const kept = items.filter(it => now - it.ts < 3 * 86400e3).slice(0, 360);
  // ⚡ GG Brief: a short summary in our own words for the biggest story without one (free Cloudflare AI)
  if (env.AI && (st.ai || 0) < 90) {
    const top = kept.find(it => !it.br && !it.y && !it.au && it.tp.includes('patch') && now - it.ts < 24 * 3600e3) || kept.find(it => !it.br && !it.y && !it.au && (it.sc >= 2 || it.k === 'o') && now - it.ts < 12 * 3600e3);
    if (top) { try { const r = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8', { messages: [{ role: 'system', content: 'You write very short, neutral news briefs for a gaming and entertainment app. 2 sentences, max 45 words, plain words, no hype, no new facts beyond the input, say "reportedly" for unconfirmed things.' }, { role: 'user', content: `${top.tp.includes('patch') ? 'This is a game update. Write up to 5 very short lines starting with "• " listing what changed, only from the input.\n' : ''}Headline: ${top.t}\nPreview: ${top.s || ''}\nSources: ${top.src.map(s => s.n).join(', ')}` }], max_tokens: 160 }); const b = String((r && r.response) || '').trim(); if (b) { top.br = b.slice(0, 420); st.ai = (st.ai || 0) + 1; } } catch (e) {} }
  }
  if (now - (st.freeAt || 0) > 3 * 3600e3) { st.freeAt = now; try { st.free = await epicFree(); } catch (e) {} }
  st.last = now; st.n = kept.length;
  await newsSave(env, kept, st);
  _newsMem = { at: Date.now(), items: kept };
  // 🔔 alerts: one push per topic to everyone who follows it (max 3 per topic a day) + rumour trackers
  for (const a of alerts.slice(0, 3)) {
    const t0 = a.it.tp.find(z => !['games', 'football', 'movies', 'series', 'music', 'tech'].includes(z)) || a.it.tp[0];
    try {
      if (a.why === 'confirmed') await sendTopicPush(env, 'tr_' + a.it.id, '✅ It\'s official!', a.it.t, a.it.id);
      if (t0 && (st.al[t0] || 0) < 3) { st.al[t0] = (st.al[t0] || 0) + 1; await sendTopicPush(env, 'n_' + t0, (a.it.k === 'o' ? '🟢 ' : a.it.k === 'l' ? '💧 ' : '🔥 ') + t0.toUpperCase(), a.it.t, a.it.id); }
    } catch (e) {}
  }
  return { n: kept.length, fresh: fresh.length };
}
async function sendTopicPush(env, topic, title, body, id) {
  const project = sa(env).project_id;
  await fetch(`https://fcm.googleapis.com/v1/projects/${project}/messages:send`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { topic: topic.replace(/[^\w-]/g, '').slice(0, 200), webpush: { headers: { Urgency: 'high', TTL: '21600' }, data: { title: String(title).slice(0, 60), body: String(body).slice(0, 160), url: SITE + '#news=' + encodeURIComponent(id), tag: 'n' + id } } } }) });
}
// 🎁 free games right now (Epic Games Store's own public list; links go to the official store page)
async function epicFree() {
  const r = await fetch('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US'); if (!r.ok) return [];
  const els = (((await r.json()).data || {}).Catalog || {}).searchStore?.elements || [], now = Date.now(), out = [];
  for (const g of els) {
    const offers = ((g.promotions || {}).promotionalOffers || []).flatMap(x => x.promotionalOffers || []), up = ((g.promotions || {}).upcomingPromotionalOffers || []).flatMap(x => x.promotionalOffers || []);
    const free = (o) => o.discountSetting && o.discountSetting.discountPercentage === 0;
    const cur = offers.find(o => free(o) && Date.parse(o.startDate) <= now && Date.parse(o.endDate) > now), nxt = up.find(free);
    if (!cur && !nxt) continue;
    const slug = g.productSlug || ((g.offerMappings || [])[0] || {}).pageSlug || (((g.catalogNs || {}).mappings || [])[0] || {}).pageSlug || g.urlSlug;
    out.push({ t: String(g.title).slice(0, 80), u: 'https://store.epicgames.com/en-US/p/' + String(slug).replace(/\/home$/, ''), st: 'Epic Games Store', now: !!cur, from: Date.parse((cur || nxt).startDate), to: Date.parse((cur || nxt).endDate) });
  }
  return out.slice(0, 8);
}
let _newsMem = null, _freeMem = null;

// =====================================================================
// 📺 v58 VIDEO ENGINE — ~1,600 official channels & creators, checked in turns (free plan friendly).
// Videos are only LISTED (id, title, channel) and played with YouTube's own player. Nothing is copied.
// Status: o = shown to everyone · c = waiting for admin check · u = added by a follower · x = removed
// =====================================================================
const VID_DOC = 'vids/feed', CH_DOC = 'vids/channels';
const CH_SEED = `1MILLIONDance|1MILLION Dance Studio|music|dance|asia|1|o|o
1theK|1theK|music|kpop,dance,music|asia||o|o
20thCenturyStudios|20th Century Studios|movies|trailers,movies|us||o|o
A24|A24|movies|trailers,movies|us||o|o
AajTak|Aaj Tak|wow|docs|india||o|o
AbsoluteHistory|Absolute History|wow|docs|europe|1|o|o
AdultSwim|Adult Swim|fun,movies|comedy,series|us||o|o
AETV|A&E|wow,movies|docs,series|us|1|o|o
AEW|All Elite Wrestling (AEW)|wrestling,football|wrestling,sports|us||o|o
AfricaMagic|Africa Magic|movies|nollywood,series,movies|africa||o|o
AfricaMagicTV|Africa Magic|movies|nollywood,series,movies|africa||o|o
AIB|All India Bakchod|fun|comedy|india||o|o
AkwaabaMagic|Akwaaba Magic|movies|nollywood,series,movies|africa||o|o
AlJazeeraEnglish|Al Jazeera English|wow|docs|arab||o|o
ALTER|ALTER|movies|movies|global|1|o|o
amazonprimevideo|Prime Video|movies|series,movies|us||o|o
AMShowmax|Showmax|movies|nollywood,series,movies|africa||o|o
AnimalPlanet|Animal Planet|wow|docs|global||o|o
AniOneAsia|Ani-One Asia|anime|anime|asia|1|o|o
Aniplex|Aniplex|anime,music|anime,music,trailers|asia||o|o
AniplexUSA|Aniplex of America|anime,movies|anime,trailers|asia||o|o
AniPlusAsia|AniPlus Asia|anime,movies|anime,series|asia||o|o
AppleTV|Apple TV|movies|trailers,series,movies|global||o|o
ArianaGrande|Ariana Grande|music|music|us||o|o
Arsenal|Arsenal|football|football|europe||o|o
ashishchanchlanivines|Ashish Chanchlani Vines|fun|comedy|india||o|o
AtlanticRecords|Atlantic Records|music|music|us||o|o
Atlus_West|ATLUS West|gaming|games|us||o|o
ATV|atv|movies|turkish,series|europe|1|o|o
Auronplay|AuronPlay|fun,gaming|comedy,games|latam||o|cr
AyYapim|Ay Yapım|movies|turkish,trailers,series|europe||o|o
AztecaNovelas|Azteca Novelas|movies|telenovela|latam|1|o|o
B4UMovies|B4U Movies|movies|bollywood,movies|india|1|o|o
BadBunny|Bad Bunny|music|music|latam||o|o
BadBunnyPR|Bad Bunny|music|music|latam||o|o
BandaiNamcoEntertainment|Bandai Namco Entertainment|anime,gaming|anime,games|asia||o|o
BandaiNamcoFilmworks|Bandai Namco Filmworks|anime,movies|anime,trailers|asia||o|o
BANGTANTV|BANGTANTV|music|kpop,dance,music|asia||o|o
BBC|BBC|wow,fun|docs,comedy,series|europe||o|o
BBCAfrica|BBC News Africa|wow|docs|africa||o|o
BBCComedyGreats|BBC Comedy Greats|fun|comedy|europe|1|o|o
BBCDocumentaries|BBC Documentaries|wow|docs|europe|1|o|o
BBCEarth|BBC Earth|wow|docs|global|1|o|o
BBCNews|BBC News|wow|docs|europe||o|o
BBCTheSocial|BBC The Social|fun,movies|comedy,series|europe||o|o
BBCThree|BBC Three|fun,movies|comedy,series|europe||o|o
BBKiVines|BB Ki Vines|fun|comedy|india||o|o
BCCI|BCCI|football|sports,cricket|india||o|o
BellatorMMA|Bellator|football|sports|us||o|o
Bethesda|Bethesda|gaming|games|us||o|o
BethesdaSoftworks|Bethesda Softworks|gaming,movies|games,trailers|us||o|o
Beyonce|Beyoncé|music|dance,music|us||o|o
bilibili|bilibili|anime,movies|anime,series|asia||o|o
Billboard|Billboard|music,wow|music,docs|us||o|o
BLACKPINK|BLACKPINK|music|kpop,dance,music|asia||o|o
BlackSherif|Black Sherif|music|afrobeats,music|africa||o|o
BLASTPremier|BLAST Premier|gaming,football|esports,games,sports|global||o|o
BloombergOriginals|Bloomberg Originals|wow|docs|us||o|o
BluTV|BluTV|movies|turkish,series|europe||o|o
BrawlStars|Brawl Stars|gaming|games|global||o|o
BritishPathe|British Pathé|wow|docs|europe||o|o
BTS|BTS|music|kpop,music|asia||o|o
Bundesliga|Bundesliga|football|football,sports|europe||o|o
BurnaBoy|Burna Boy|music|afrobeats,music|africa||o|o
CAF|CAF|football|sports|africa|1|o|o
CAF_TV|CAF TV|football|football,sports|africa|1|o|o
CAFOnline|CAF TV|football|football|africa||o|o
CallofDuty|Call of Duty|gaming|games|us||o|o
CallofDutyLeague|Call of Duty League|gaming,football|esports,games,sports|us||o|o
Canal13|Canal 13|movies|telenovela,series|latam||o|o
CanalLasEstrellas|Las Estrellas|movies|telenovela|latam||o|o
CanalNueve|Canal 9|movies|telenovela,series|latam||o|o
CanalRCN|Canal RCN|movies|telenovela,series|latam|1|o|o
CapcomChannel|Capcom|gaming|games|asia||o|o
CapcomUSA|Capcom USA|gaming|games|us||o|o
CapitolRecords|Capitol Records|music|music|us||o|o
CaracolTelevision|Caracol Televisión|movies|telenovela,series|latam||o|o
CaracolTV|Caracol Televisión|movies|telenovela,series|latam||o|o
CCTV|CCTV|wow,movies|docs,series|asia||o|o
CCTVDocumentary|CCTV Documentary|wow|docs|asia||o|o
CDPRED|CD PROJEKT RED|gaming|games|europe||o|o
ChampionsLeague|UEFA Champions League|football|football,sports|europe||o|o
Channel4|Channel 4|wow,fun|docs,comedy,series|europe||o|o
ChannelA|Channel A|movies|kdrama,series|asia||o|o
ChannelsTelevision|Channels Television|wow|docs|africa||o|o
ChelseaFC|Chelsea Football Club|football|football|europe||o|o
ChinaHuaceTV|China Huace TV|movies|cdrama|asia|1|o|o
CitiSports|Citi Sports|football|sports|africa||o|o
CitiTube|CitiTube|wow|docs|africa||o|o
ClashofClans|Clash of Clans|gaming|games|global||o|o
CNAInsider|CNA Insider|wow|docs|asia||o|o
Coachella|Coachella|music|music|us||o|o
CollegeHumor|CollegeHumor|fun|comedy|us||o|o
ColorsTV|Colors TV|movies|bollywood,series|india||o|o
ColumbiaRecords|Columbia Records|music|music|us||o|o
ComedyCentral|Comedy Central|fun,movies|comedy,series|us||o|o
ComedyDynamics|Comedy Dynamics|fun|comedy|us|1|o|o
CounterStrike|Counter-Strike|gaming,football|esports,games,sports|global||o|o
CrotonMEGAHIT|Croton Media|movies|cdrama,series|asia|1|o|o
Crunchyroll|Crunchyroll|anime,movies|anime,trailers,series|asia|1|o|o
CrunchyrollCollection|Crunchyroll Collection|anime,movies|anime,trailers|global||o|o
CrunchyrollDubs|Crunchyroll Dubs|anime|anime|global||o|o
DancegodLloyd|Dancegod Lloyd|music|dance|africa||o|o
Davido|Davido|music|afrobeats,music|africa||o|o
DharmaProductions|Dharma Productions|movies|bollywood,trailers,movies|india||o|o
Diablo|Diablo|gaming|games|global||o|o
Discovery|Discovery|wow,movies|docs,series|global|1|o|o
Disney|Disney|movies|trailers,movies|us||o|o
DisneyPlus|Disney+|movies|trailers,series,movies|global||o|o
DisneyPlusHotstar|Disney+ Hotstar|football,movies|sports,series,movies|india||o|o
DOTA2|Dota 2|gaming,football|esports,games,sports|global||o|o
DragonTVOfficial|Dragon TV|movies|series|asia||o|o
DrakeOfficial|Drake|music|music|us||o|o
DreamHack|DreamHack|gaming,football|esports,games,sports|global||o|o
Dropout|Dropout|fun,movies|comedy,series|us||o|o
DryBarComedy|Dry Bar Comedy|fun|comedy|us|1|o|o
DUST|DUST|movies|movies|global|1|o|o
DWDocumental|DW Documental|wow|docs|latam|1|o|o
DWDocumentary|DW Documentary|wow|docs|europe|1|o|o
DWDocumentaryArabic|DW Documentary Arabic|wow|docs|arab||o|o
DWTravel|DW Travel|wow|docs|europe||o|o
EA|Electronic Arts|gaming,movies|games,trailers,docs|global||o|o
EASFCMOBILE|EA SPORTS FC MOBILE|gaming|games|global||o|o
easportsfc|EA SPORTS FC|gaming,football|games,football,sports|global||o|o
EASPORTSFCMOBILE|EA SPORTS FC Mobile|gaming|games|global||o|o
EdSheeran|Ed Sheeran|music|music|europe||o|o
eFootball|eFootball Official|gaming|games|asia||o|o
eltrece|eltrece|movies|telenovela,series|latam||o|o
enchufetv|enchufetv|fun|comedy|latam||o|o
EpicGames|Epic Games|gaming|games|global||o|o
ESL|ESL|gaming,football|esports,games,sports|global||o|o
ESLCS|ESL Counter-Strike|gaming,football|esports,games,sports|global||o|o
ESPN|ESPN|football|sports|us||o|o
Eurogamer|Eurogamer|gaming|games|europe||o|o
F1|Formula 1|football|sports|global||o|o
FCBarcelona|FC Barcelona|football|football|europe||o|o
FIBA|FIBA|football|sports|global||o|o
FIFA|FIFA|football|football,sports|global|1|o|o
FilmRise|FilmRise|movies|series,movies|us|1|o|o
FilmRiseMovies|FilmRise Movies|movies|movies|us|1|o|o
FirstTouchGames|First Touch Games|gaming|games|europe||o|o
FocusFeatures|Focus Features|movies|trailers,movies|us||o|o
Formula1|Formula 1|football|sports|global||o|o
Fortnite|Fortnite|gaming,football|esports,games,sports|global||o|o
FOXTurkiye|NOW|movies|turkish,series|europe||o|o
FreeDocumentary|Free Documentary|wow|docs|global|1|o|o
FreeFireOfficial|Garena Free Fire|gaming|games|global||o|o
frontline|FRONTLINE PBS|wow|docs|us|1|o|o
FRONTLINEPBS|FRONTLINE PBS|wow|docs|us|1|o|o
Funimation|Funimation (now Crunchyroll)|anime|anime|us||o|o
FunnyOrDie|Funny Or Die|fun|comedy|us||o|o
GameranxTV|gameranx|gaming|games|us||o|cr
GameSpot|GameSpot|gaming,movies|games,trailers|us||o|o
Garena|Garena|gaming,football|esports,games,sports|global||o|o
GarenaFreeFire|Garena Free Fire|gaming,football|esports,games,sports|global||o|o
GarenaFreeFireEsports|Free Fire Esports|gaming,football|esports,games,sports|global||o|o
GenshinImpact|Genshin Impact|gaming|games|asia||o|o
GhanaFA|Ghana Football Association|football|football,sports|africa||o|o
GhanaFootballAssociation|Ghana Football Association|football|football,sports|africa||o|o
GKIDSfilms|GKIDS Films|movies|trailers|us||o|o
Globo|Globo|movies|telenovela,series|latam|1|o|o
Globoplay|Globoplay|movies|telenovela,series|latam||o|o
goldminesTelefilms|Goldmines|movies|bollywood,movies|india|1|o|o
GONZO|GONZO|anime|anime|asia|1|o|o
GRAMMYMuseum|Grammy Museum|music|music|us||o|o
GRAMMYs|Recording Academy / GRAMMYs|music|music|us||o|o
GundamInfo|GundamInfo|anime|anime|asia|1|o|o
HallmarkChannel|Hallmark Channel|movies|trailers,series,movies|us||o|o
handle|name|movies|movies|global||o|o
HBO|HBO|movies|series,movies|us||o|o
HBOMax|Max|movies|series,movies|us||o|o
History|History|wow|docs|us||o|o
HuaceTV|Huace TV|movies|cdrama,series|asia|1|o|o
Hulu|Hulu|movies|trailers,series,movies|us||o|o
HunanTV|Hunan TV|movies,music|cdrama,music,series|asia||o|o
HYBE|HYBE|music|music|asia||o|o
HYBELABELS|HYBE LABELS|music|kpop,dance,music|asia||o|o
iamTiwaSavage|Tiwa Savage|music|afrobeats,music|africa||o|o
Ibai|Ibai|gaming,football|games,sports|latam||o|cr
ICC|ICC|football|sports,cricket|global||o|o
IGN|IGN|gaming,movies|games,series,movies|us||o|o
IMDb|IMDb|movies|trailers,series,movies|global||o|o
InterMedya|Inter Medya|movies|turkish,trailers,series|europe||o|o
InterscopeRecords|Interscope Records|music|music|us||o|o
InvestigationDiscovery|Investigation Discovery|wow|docs|us||o|o
IPL|Indian Premier League|football|sports|india||o|o
iQIYI|iQIYI|anime,movies|anime,cdrama,series|asia|1|o|o
iQIYIOfficial|iQIYI Official|movies|cdrama|asia|1|o|o
irokotv|irokoTV|movies|nollywood,series,movies|africa|1|o|o
ITV|ITV|movies|series|europe||o|o
jacksepticeye|jacksepticeye|gaming|games|europe||o|cr
JioCinema|JioCinema|football,movies|sports,series,movies|india||o|o
JoyNewsOnTV|JoyNews|wow|docs|africa||o|o
JoyPrimeTV|Joy Prime|fun,movies|comedy,series|africa||o|o
JoySports|Joy Sports|football|sports|africa||o|o
JTBC|JTBC|movies|kdrama,series|asia||o|o
JTBCdrama|JTBC Drama|movies|kdrama|asia||o|o
JTBCEntertainment|JTBC Entertainment|movies,fun|kdrama,comedy|asia||o|o
JustForLaughs|Just For Laughs|fun|comedy|global|1|o|o
JYPEntertainment|JYP Entertainment|music|kpop,dance,music|asia||o|o
KADOKAWAanime|KADOKAWA Anime|anime,movies|anime,trailers|asia||o|o
Kanal7|Kanal 7|movies|turkish,series|europe|1|o|o
Kanal7Dizileri|Kanal 7 Dizileri|movies|turkish,series|europe|1|o|o
KanalD|Kanal D|movies|turkish,series|europe|1|o|o
KanalDInternational|Kanal D International|movies,wow|turkish,trailers,docs|global||o|o
KBSdrama|KBS Drama|movies|kdrama|asia||o|o
KBSKpop|KBS Kpop|music|kpop,dance,music|asia||o|o
KBSWorld|KBS World|movies|kdrama,series|asia|1|o|o
KBSWorldRadio|KBS WORLD Radio|music|music|asia||o|o
KBSWORLDtv|KBS WORLD TV|movies,music|kdrama,music,series|asia|1|o|o
KeyAndPeele|Key & Peele|fun|comedy|us||o|o
KOCOWA|KOCOWA TV|movies|kdrama|asia||o|o
Kodansha|KODANSHA|anime|anime|asia||o|o
Konami|KONAMI|gaming|games|asia||o|o
KondZilla|KondZilla|music|dance,music|latam||o|o
KSI|KSI|fun|comedy|europe||o|cr
Kurzgesagt|Kurzgesagt – In a Nutshell|wow|docs|europe||o|o
KyotoAnimation|Kyoto Animation|anime|anime|asia||o|o
LaLiga|LaLiga|football|football,sports|europe||o|o
LasEstrellas|Las Estrellas|movies|telenovela,series|latam||o|o
LaughFactory|Laugh Factory|fun|comedy|us||o|o
LCKGlobal|LCK Global|gaming,football|esports,games,sports|asia||o|o
LCS|LCS|gaming,football|esports,games,sports|us||o|o
LeagueofLegends|League of Legends|gaming,football|esports,games,sports|us||o|o
LeagueofLegendsBrasil|League of Legends Brasil|gaming,football|esports,games,sports|latam||o|o
LeagueofLegendsES|League of Legends ES|gaming,football|esports,games,sports|latam||o|o
LEC|LEC|gaming,football|esports,games,sports|europe||o|o
LFC|Liverpool FC|football|football|europe||o|o
Lifetime|Lifetime|movies|trailers,series,movies|us||o|o
Ligue1|Ligue 1|football|sports|europe||o|o
LionsgateMovies|Lionsgate Movies|movies|trailers,movies|us||o|o
Lollapalooza|Lollapalooza|music|music|us||o|o
LPL|LPL|gaming,football|esports,games,sports|asia||o|o
Madhouse|Madhouse|anime|anime|asia||o|o
MaishaMagicEast|Maisha Magic East|movies|series,movies|africa||o|o
MaishaMagicPlus|Maisha Magic Plus|fun,movies|comedy,series|africa||o|o
MangoTV|MangoTV|movies|cdrama|asia||o|o
ManUtd|Manchester United|football|football|europe||o|o
Markiplier|Markiplier|gaming|games|us||o|cr
Marvel|Marvel Entertainment|movies|trailers,movies|us||o|o
MattSteffanina|Matt Steffanina|music|dance|us||o|o
Max|Max (HBO)|movies|series,movies|us||o|o
MBCdrama|MBC Drama|movies|kdrama,series|asia|1|o|o
MBCentertainment|MBCentertainment|movies,fun|kdrama,comedy|asia||o|o
MBCkpop|MBCkpop|music|kpop|asia||o|o
MBCofficial|MBC|movies|kdrama|asia||o|o
Mdundo|Mdundo|music|music|africa||o|o
MedYapim|MedYapım|movies|turkish,series|europe||o|o
MGM|MGM|movies|trailers,movies|us||o|o
Minecraft|Minecraft|gaming|games|global||o|o
MLB|MLB|football|sports|us||o|o
MLG|Major League Gaming|gaming,football|esports,games,sports|us||o|o
MLS|Major League Soccer|football|football|us||o|o
Mnet|Mnet|music|kpop,dance,music|asia||o|o
MnetKPOP|Mnet K-POP|music|kpop,dance,music|asia||o|o
MobileLegends5v5MOBA|Mobile Legends: Bang Bang|gaming,football|esports,games,sports|global||o|o
MotoGP|MotoGP|football|sports|global||o|o
MPL|Mobile Legends: Bang Bang|gaming,football|esports,games,sports|asia||o|o
MrBean|Mr Bean|fun|comedy|europe|1|o|o
MrBeast|MrBeast|fun|comedy|us||o|o
MTV|MTV|music|music|us||o|o
MTVUK|MTV UK|music|music|europe||o|o
MuseAsia|Muse Asia|anime|anime|asia|1|o|o
NancyAjram|Nancy Ajram|music|music|arab||o|o
NASA|NASA|wow|docs|us||o|o
NASAJPL|NASA Jet Propulsion Laboratory|movies|movies|us||o|o
NatGeo|National Geographic|wow|docs|global|1|o|o
NatGeoWild|Nat Geo WILD|wow|docs|global||o|o
NationalGeographic|National Geographic|wow|docs|global||o|o
NBA|NBA|football|sports|us|1|o|o
NBAAfrica|NBA Africa|football|sports|africa||o|o
Neon|NEON|movies|movies|us||o|o
Netflix|Netflix|movies|trailers,series,movies|global||o|o
NetflixAnime|Netflix Anime|anime,movies|anime,trailers|global||o|o
NetflixFilm|Netflix Film|movies|trailers,movies|global||o|o
NetflixIsAJoke|Netflix Is A Joke|fun|comedy|us||o|o
NFB|National Film Board of Canada|wow|docs|global|1|o|o
NFL|NFL|football|football,sports|us|1|o|o
NHL|NHL|football|sports|us||o|o
NHStudioz|NH Studioz|movies|bollywood,movies|india|1|o|o
Ninja|Ninja|gaming|games|us||o|cr
Nintendo|Nintendo|gaming,movies|games,trailers|asia||o|o
NintendoAmerica|Nintendo of America|gaming|games|us||o|o
NintendoEurope|Nintendo of Europe|gaming|games|europe||o|o
NintendoLife|Nintendo Life|gaming|games|europe||o|o
NintendoUK|Nintendo UK|gaming|games|europe||o|o
NJPW|New Japan Pro-Wrestling|wrestling|wrestling|asia||o|o
NOAH_ghc|Pro Wrestling NOAH|wrestling|wrestling|asia||o|o
NOVAPBSOfficial|NOVA PBS Official|wow|docs|us|1|o|o
NOW|NOW|movies|turkish|europe||o|o
OfficialGogglebox|Gogglebox|fun,movies|comedy,series|europe||o|o
OfficialPnation|P NATION|music|kpop,music|asia||o|o
officialpsy|PSY Official|music|kpop,dance,music|asia||o|o
officialruntown|Runtown|music|afrobeats|africa||o|o
OfficialYuGiOh|Official Yu-Gi-Oh!|anime|anime|asia|1|o|o
OGMPictures|OGM Pictures|movies|turkish,trailers,series|europe||o|o
Olympics|Olympics|football|sports|global||o|o
ONEChampionship|ONE Championship|football|sports|asia||o|o
OverwatchLeague|Overwatch League|gaming,football|esports,games,sports|us||o|o
Paralympics|Paralympics|football|sports|global||o|o
ParamountPictures|Paramount Pictures|movies|trailers,movies|us||o|o
ParamountPlus|Paramount+|movies|series,movies|us||o|o
PBS|PBS|wow,movies|docs,series|us|1|o|o
PBSNature|PBS Nature|wow|docs|us||o|o
PBSNova|NOVA|wow|docs|us||o|o
Peacock|Peacock|movies|trailers,series,movies|us||o|o
PenMovies|Pen Movies|movies|bollywood,trailers,movies|india|1|o|o
PenMultiplex|Pen Multiplex|movies|bollywood,movies|india|1|o|o
PewDiePie|PewDiePie|fun,gaming|comedy,games|global||o|cr
play_efootball|eFootball|gaming,football|games,football|asia||o|o
PlayOverwatch|Overwatch|gaming|games|global||o|o
PlayStation|PlayStation|gaming,movies|games,trailers|global||o|o
PlayStationAccess|PlayStation Access|gaming|games|europe||o|cr
PlayStationStudios|PlayStation Studios|gaming|games|global||o|o
PlutoTV|Pluto TV|movies|series,movies|us||o|o
pokemon|The Official Pokémon YouTube Channel|anime,gaming|anime,games|asia|1|o|o
Pokimane|Pokimane|gaming|games|us||o|cr
PonyCanyon|Pony Canyon|anime,music|anime,music|asia||o|o
Popcornflix|Popcornflix|movies|movies|us|1|o|o
PortaDosFundos|Porta dos Fundos|fun|comedy|latam||o|o
PremierLeague|Premier League|football|football,sports|europe||o|o
PrimeVideo|Prime Video|movies|trailers,series,movies|global||o|o
PUBG|PUBG|gaming,football|esports,games,sports|global||o|o
PUBGMOBILE|PUBG MOBILE|gaming,football|esports,games,sports|global||o|o
Rajshri|Rajshri|movies|bollywood,series,movies|india|1|o|o
RCNTelevision|RCN|movies|telenovela,series|latam||o|o
RDCworld1|RDCworld1|fun|comedy|us||o|o
realmadrid|Real Madrid|football|football|europe||o|o
RealWild|Real Wild|wow|docs|europe|1|o|o
RedBullDance|Red Bull Dance|music|dance|global||o|o
RedChilliesEnt|Red Chillies Entertainment|movies|trailers,movies|india||o|o
RedChilliesEntertainment|Red Chillies Entertainment|movies|bollywood,trailers,movies|india||o|o
RepublicRecords|Republic Records|music|music|us||o|o
RingOfHonor|Ring of Honor|wrestling|wrestling|us||o|o
RiotGames|Riot Games|gaming,football|esports,games,sports|us||o|o
Roblox|Roblox|gaming|games|global||o|o
RocketLeague|Rocket League|gaming,football|esports,games,sports|global||o|o
RockstarGames|Rockstar Games|gaming,movies|games,trailers|us||o|o
ROKStudios|ROK Studios|movies|nollywood,series,movies|africa||o|o
RotanaMusic|Rotana|music|music|arab||o|o
RottenTomatoes|Rotten Tomatoes|movies,wow|trailers,movies,docs|us||o|o
RottenTomatoesTrailers|Rotten Tomatoes Trailers|movies|trailers|us||o|o
Rubius|elrubiusOMG|gaming|games|latam||o|cr
SABTV|Sony SAB|fun,movies|comedy,series|india|1|o|o
SailorMoonOfficial|Sailor Moon Official|anime,movies|anime,trailers|asia||o|o
SaregamaMusic|Saregama Music|movies,music|bollywood,dance,music|india||o|o
Sarkodie|Sarkodie|music|music|africa||o|o
SarkodieTV|Sarkodie|music|afrobeats,music|africa||o|o
SaturdayNightLive|Saturday Night Live|fun|comedy|us||o|o
SBSCatch|SBS Catch|movies|kdrama|asia|1|o|o
SBSKPOP|SBS KPOP|music|kpop,music|asia||o|o
sbsnow|SBS|movies|kdrama,series|asia||o|o
SBSWorld|SBS World|movies|kdrama|asia||o|o
SBT|SBT|movies|telenovela,series|latam||o|o
SearchlightPictures|Searchlight Pictures|movies|trailers,movies|us||o|o
SEGA|SEGA|gaming|games|asia||o|o
SerieA|Serie A|football|football,sports|europe||o|o
SETIndia|Sony Entertainment Television India|fun,movies|comedy,series|india||o|o
Shakira|Shakira|music|dance,music|latam||o|o
shattawalegh|Shatta Wale|music|dance,music|africa||o|o
Shemaroo|Shemaroo|movies,fun|bollywood,comedy,movies|india|1|o|o
ShemarooComedy|Shemaroo Comedy|movies,fun|bollywood,comedy,movies|india||o|o
ShemarooMovies|Shemaroo Movies|movies|bollywood,movies|india|1|o|o
ShogakukanAsia|Shogakukan Asia|anime|anime|asia||o|o
ShonenJump|Shonen Jump|anime|anime|asia||o|o
ShoutStudios|Shout! Studios|movies|trailers,movies|us||o|o
Showmax|Showmax|movies|nollywood,series,movies|africa||o|o
Showtime|Showtime|movies|series|us||o|o
ShowTV|Show TV|movies,fun|turkish,comedy,series|europe||o|o
shroud|shroud|gaming|games|us||o|cr
ShueishaManga|Shueisha / Jump|anime,movies|anime,trailers|asia||o|o
Sidemen|Sidemen|fun|comedy|europe||o|cr
SILVERBIRDTV|Silverbird TV|movies|nollywood,series|africa||o|o
SkySports|Sky Sports|football|sports|europe||o|o
SkyTV|Sky TV|football,movies|sports,series,movies|europe||o|o
SmithsonianChannel|Smithsonian Channel|wow|docs|global||o|o
Smosh|Smosh|fun,movies|comedy,series|us||o|o
SMTOWN|SMTOWN|music|kpop,dance,music|asia||o|o
SNL|Saturday Night Live|fun|comedy|us|1|o|o
SonyEntertainmentTelevision|Sony Entertainment Television|movies|bollywood,series|india||o|o
SonyMusic|Sony Music Entertainment|music|music|global||o|o
SonyMusicIndia|Sony Music India|movies,music|bollywood,dance,music|india||o|o
SonyPAL|Sony PAL|fun,movies|comedy,series|india|1|o|o
SonyPictures|Sony Pictures|movies|trailers,movies|us||o|o
SonySAB|Sony SAB|fun,movies|comedy,series|india||o|o
SonySportsNetwork|Sony Sports Network|football|sports,cricket|india||o|o
SquareEnix|Square Enix|anime,gaming|anime,games|asia||o|o
StarCraft|StarCraft|gaming|games|global||o|o
StarPlus|Star Plus|movies|bollywood,series|india||o|o
StarSports|Star Sports|football|sports,cricket|india||o|o
StarTV|Star TV|movies|turkish,series|europe||o|o
StarWars|Star Wars|movies|trailers,movies|us||o|o
Steam|Steam|gaming|games|global||o|o
STONE_MUSIC_ENTERTAINMENT|Stone Music Entertainment|music|kpop,music|asia||o|o
Stonebwoy|Stonebwoy|music|afrobeats,dance,music|africa||o|o
Supercell|Supercell|gaming|games|global||o|o
SuperSportTV|SuperSport|football|sports|africa||o|o
tabii|tabii|movies|turkish,series|europe||o|o
TaylorSwift|Taylor Swift|music|music|us||o|o
TED|TED|wow|docs|global||o|o
Telefe|Telefe|movies|telenovela,series|latam||o|o
Telemundo|Telemundo|movies|telenovela,series|latam|1|o|o
TelemundoNovelas|Telemundo Novelas|movies|telenovela|us|1|o|o
Televisa|Televisa|movies|telenovela|latam||o|o
TelevisaTelenovelas|Televisa Telenovelas|movies|telenovela|latam|1|o|o
TelevisaUnivision|TelevisaUnivision|movies|telenovela,series|latam||o|o
TencentVideo|Tencent Video|movies|cdrama,series|asia|1|o|o
TencentVideoAnimation|Tencent Video Animation|anime,movies|anime,series|asia||o|o
TencentVideoDrama|Tencent Video Drama|movies|cdrama|asia||o|o
TheDailyShow|The Daily Show|fun,wow|comedy,docs|us||o|o
TheEFL|EFL|football|football,sports|europe||o|o
TheGameAwards|The Game Awards|gaming|games|us||o|o
TheGrefg|TheGrefg|gaming|games|latam||o|cr
TheKPOP|The K-POP|music|kpop,dance,music|asia||o|o
TheOnion|The Onion|fun|comedy|us||o|o
TheRadBrad|theRadBrad|gaming|games|us||o|cr
TheScoreesports|theScore esports|gaming,football|esports,games,sports|global||o|o
TheSwoon|The Swoon|movies|kdrama,trailers|asia||o|o
TheTryGuys|The Try Guys (official)|fun|comedy|us||o|o
TheViralFever|The Viral Fever|fun,movies|comedy,series|india||o|o
TheWeeknd|The Weeknd|music|music|global||o|o
TimelineChannel|Timeline|wow|docs|europe|1|o|o
TIMSB|Tims&B Productions|movies|turkish,trailers,series|europe||o|o
TipsOfficial|Tips Official|movies,music|bollywood,music,movies|india||o|o
TLC|TLC|movies|series|us||o|o
TLNovelas|TLNovelas|movies|telenovela|latam|1|o|o
TMSanime|TMS Anime|anime|anime|asia|1|o|o
TNAWrestling|TNA Wrestling|wrestling|wrestling|us||o|o
ToeiAnimation|Toei Animation|anime,movies|anime,trailers|asia|1|o|o
ToeiAnimationOfficial|Toei Animation Official|anime|anime|asia||o|o
TOHOanimation|TOHO animation|anime,movies|anime,trailers|asia||o|o
TraceAfrica|TRACE Africa|music|dance,music|africa||o|o
TraceUrban|TRACE Urban|music|dance,music|africa||o|o
TrevorNoah|Trevor Noah|fun|comedy|africa||o|o
TRT|TRT|wow,movies|docs,series|europe||o|o
TRT1|TRT 1|movies|turkish,series|europe|1|o|o
TRTizle|TRT İzle|movies,wow|turkish,docs,series|europe|1|o|o
trtworld|TRT World|wow|docs|europe||o|o
TSeries|T-Series|movies,music|bollywood,dance,music|india|1|o|o
Tubi|Tubi|movies|trailers,series,movies|us||o|o
TV3Ghana|TV3 Ghana|movies|series|africa||o|o
TVAzteca|TV Azteca|movies|telenovela,series|latam||o|o
TVF|The Viral Fever|fun,movies|comedy,series|india||o|o
TVGlobo|TV Globo|movies|telenovela,series|latam||o|o
tvN|tvN|movies|kdrama,series|asia||o|o
tvN_drama|tvN DRAMA|movies|kdrama|asia||o|o
tvNDrama|tvN DRAMA|movies|kdrama|asia||o|o
tvNDRAMA_official|tvN DRAMA|movies|kdrama|asia||o|o
TVTokyo|TV TOKYO|anime,movies|anime,series|asia||o|o
Ubisoft|Ubisoft|gaming,movies|games,trailers|global||o|o
UbisoftNA|Ubisoft North America|gaming,movies|games,trailers|us||o|o
UbisoftNorthAmerica|Ubisoft North America|gaming|games|us||o|o
UEFA|UEFA|football|football,sports|europe||o|o
ufc|UFC|wrestling,football|wrestling,sports|us||o|o
UltraMovieParlour|Ultra Movie Parlour|movies|bollywood,movies|india|1|o|o
UniversalMusicGroup|Universal Music Group|music|music|global||o|o
UniversalPictures|Universal Pictures|movies|trailers,movies|us||o|o
Univision|Univision|movies|telenovela,series|latam||o|o
UTVGhana|UTV Ghana|movies|series|africa||o|o
Valkyrae|Valkyrae|gaming|games|us||o|cr
Valorant|VALORANT|gaming,football|esports,games,sports|us||o|o
VCT|VCT|gaming,football|esports,games,sports|global||o|o
Vegetta777|Vegetta777|gaming|games|latam||o|cr
Venevision|Venevisión|movies|telenovela,series|latam||o|o
Vevo|Vevo|music|music|global||o|o
VICE|VICE|wow|docs|global||o|o
VICENews|VICE News|wow|docs|global||o|o
ViX|ViX|movies|series,movies|latam||o|o
VIZMedia|VIZ Media|anime|anime|us||o|o
Vox|Vox|wow|docs|us||o|o
Warcraft|Warcraft|gaming|games|global||o|o
WarnerBros|Warner Bros.|movies|trailers,movies|us||o|o
WarnerBrosPictures|Warner Bros. Pictures|movies|trailers,movies|us||o|o
WarnerMusic|Warner Music|music|music|global||o|o
WarnerRecords|Warner Records|music|music|us||o|o
watchdust|DUST|wow,movies|docs,movies|global|1|o|o
WeTV|WeTV|movies|cdrama|asia|1|o|o
WetvEnglish|WeTV English|movies|cdrama|asia|1|o|o
WeTVOfficial|WeTV|movies|cdrama,series|asia||o|o
Wizkid|Wizkid|music|afrobeats,music|africa||o|o
wizkidofficial|Wizkid|music|afrobeats,music|africa||o|o
WizkidVEVO|Wizkid|music|afrobeats|africa||o|o
WorldAquatics|World Aquatics|football|sports|global||o|o
WorldAthletics|World Athletics|football|sports|global||o|o
WorldofWarcraft|World of Warcraft|gaming|games|global||o|o
WorldRugby|World Rugby|football|sports|global||o|o
WTA|WTA|football|sports|global||o|o
WWE|WWE|wrestling,football|wrestling,sports|us|1|o|o
WWEVault|WWE Vault|wrestling|wrestling|us|1|o|o
Xbox|Xbox|gaming,movies|games,trailers|global||o|o
XboxGameStudios|Xbox Game Studios|gaming|games|us||o|o
xQc|xQc|gaming|games|us||o|cr
YG_FAMILY|YG Entertainment|music|music|asia||o|o
YGEntertainment|YG ENTERTAINMENT|music|kpop,dance,music|asia||o|o
Youku|Youku|movies|cdrama|asia|1|o|o
YOUKU-Official|YOUKU Official|movies|cdrama|asia|1|o|o
YOUKUDRAMA|YOUKU Drama|movies|cdrama|asia||o|o
YoukuOfficial|YOUKU|movies|cdrama,series|asia|1|o|o
YouTubeMusic|YouTube Music|music|music|global||o|o
YRF|Yash Raj Films|movies,music|bollywood,dance,music|india|1|o|o
yu_gi_oh_official|Yu-Gi-Oh!|anime,gaming|anime,games|global|1|o|o
ZeeMusicCompany|Zee Music Company|movies,music|bollywood,dance,music|india||o|o
ZeeStudiosOfficial|Zee Studios|movies|movies|india||o|o
ZeeTV|Zee TV|movies|bollywood,series|india||o|o
ZeeWorld|Zee World|movies|series|africa||o|o
ZhejiangTVOfficial|Zhejiang TV|movies|cdrama|asia||o|o
MKIceAndFire|MKIceAndFire|gaming|games|global||o|cr
Shirrako|Shirrako|gaming|games|global||o|cr
RespectTheJeff|RespectTheJeff|gaming,football|games,football|global||o|cr
MoreRespectTheJeff|More RespectTheJeff|gaming,football|games,football|global||o|cr
Castro1021|Castro1021|gaming,football|games,football|global||o|cr
AJ3|AJ3|gaming,football|games,football|global||o|cr
Bateson87|Bateson87|gaming,football|games,football|global||o|cr
NepentheZ|NepentheZ|gaming,football|games,football|global||o|cr
W2S|W2S|gaming,football|games,football|global||o|cr
Miniminter|Miniminter|gaming,football|games,football|global||o|cr
videogamedunkey|videogamedunkey|gaming,fun|games,comedy|global||o|cr
TypicalGamer|Typical Gamer|gaming|games|global||o|cr
SSundee|SSundee|gaming|games|global||o|cr
DanTDM|DanTDM|gaming|games|global||o|cr
CaptainSparklez|CaptainSparklez|gaming|games|global||o|cr
timthetatman|TimTheTatman|gaming|games|global||o|cr
DrLupo|DrLupo|gaming|games|global||o|cr
NICKMERCS|NICKMERCS|gaming|games,cod|global||o|cr
SypherPK|SypherPK|gaming|games|global||o|cr
Lachlan|Lachlan|gaming|games|global||o|cr
AliA|Ali-A|gaming|games,cod|global||o|cr
Vikkstar123|Vikkstar123|gaming|games|global||o|cr
JGOD|JGOD|gaming|games,cod|global||o|cr
TrueGameData|TrueGameData|gaming|games,cod|global||o|cr
Swagg|Swagg|gaming|games,cod|global||o|cr
VaatiVidya|VaatiVidya|gaming|games|global||o|cr
SkillUp|Skill Up|gaming|games|global||o|cr
GameTheory|The Game Theorists|gaming|games|global||o|cr
NakeyJakey|NakeyJakey|gaming|games|global||o|cr
penguinz0|penguinz0|gaming,fun|games,comedy|global||o|cr
CohhCarnage|CohhCarnage|gaming|games|global||o|cr
ludwig|Ludwig|gaming,fun|games,comedy|global||o|cr
Dream|Dream|gaming|games|global||o|cr
Preston|Preston|gaming|games|global||o|cr
Unspeakable|Unspeakable|gaming|games|global||o|cr
Muselk|Muselk|gaming|games|global||o|cr
DashieGames|DashieGames|gaming|games|global||o|cr
FightinCowboy|FightinCowboy|gaming|games|us||o|cr
BossFightDatabase|Boss Fight Database|gaming|games|us||o|cr
ZwebackHD|ZwebackHD|gaming|eafc,games|us||o|cr
Technoblade|Technoblade|gaming|games|us||o|cr
TommyInnit|TommyInnit|gaming|games|europe||o|cr
TheActMan|The Act Man|fun,gaming|comedy,games|us||o|cr
CharlieINTEL|Charlie INTEL|gaming|cod,games|us||o|cr
CarryMinati|CarryMinati|fun,gaming|comedy,games|india||o|cr
TechnoGamerz|Techno Gamerz|gaming|games|india||o|cr
TriggeredInsaan|Triggered Insaan|gaming|games|india||o|cr
elrubiusOMG|elrubiusOMG|gaming|games|europe||o|cr
Cellbit|Cellbit|gaming|games|latam||o|cr
Alanzoka|Alanzoka|gaming|games|latam||o|cr
ChristopherOdd|ChristopherOdd|gaming|games|us||o|cr
Gameranx|gameranx|gaming|games|us||o|cr
TheMasterBucks|TheMasterBucks|gaming|eafc,games|europe||o|cr
Cutzy|Cutzy|gaming|eafc,games|europe||o|cr
FIFAMobileGuide|FIFA Mobile Guide|gaming|fcmobile,games|india||o|cr
eFootballUniverse|eFootball Universe|gaming,football|efootball,football,games|global||o|cr
PESEP|PESEP|gaming,football|efootball,football,games|global||o|cr
DLSKing|DLS King|gaming|dls,games|india||o|cr
WhosImmortal|WhosImmortal|gaming|cod,games|us||o|cr
TheXclusiveAce|TheXclusiveAce|gaming|cod,games|us||o|cr
DrDisrespect|DrDisrespect|gaming|cod,games|us||o|cr
BobbyPlays|BobbyPlays|gaming|cod,games|india||o|cr
iFerg|iFerg|gaming|cod,games|europe||o|cr
DesiGamers|Desi Gamers|gaming|games|india||o|cr
JonathanGaming|Jonathan Gaming|gaming|games|india||o|cr
MrBeastGaming|MrBeast Gaming|gaming|games|us||o|cr
GTAWiseGuy|GTAWiseGuy|gaming|gta,games|us||o|cr
GTASeriesVideos|GTASeriesVideos|gaming|gta,games|us||o|cr
LazarBeam|LazarBeam|gaming|games,gta|us||o|cr
KreekCraft|KreekCraft|gaming|games|us||o|cr
TenZ|TenZ|gaming|esports,games|us||o|cr
Hiko|Hiko|gaming|esports,games|us||o|cr
ACG|ACG|gaming|games|us||o|cr
SummoningSalt|Summoning Salt|gaming|games|us||o|cr
MoistCr1TiKaL|MoistCr1TiKaL|gaming|games|us||o|cr
KwadwoSheldon|Kwadwo Sheldon|gaming|games|africa||o|cr
GrantHinds|Grant Hinds|gaming|games|africa||o|cr
MKBHD|MKBHD|wow,gaming|tech,games|africa||o|cr
Mythpat|Mythpat|gaming|games,gta|india||o|cr
AboFlah|AboFlah|gaming|games|arab||o|cr
BanderitaX|BanderitaX|gaming|games|arab||o|cr
WindahBasudara|Windah Basudara|gaming|games|asia||o|cr
JessNoLimit|Jess No Limit|gaming|games|asia||o|cr
FrostDiamond|Frost Diamond|gaming|games|asia||o|cr
Nobru|Nobru|gaming|games|latam||o|cr
Jahrein|Jahrein|gaming|games|europe||o|cr
PintiPanda|PintiPanda|gaming|esports,games|europe||o|cr
NewRockstars|New Rockstars|movies|movies|us||o|cr
HeavySpoilers|Heavy Spoilers|movies|movies|europe||o|cr
Nerdstalgic|Nerdstalgic|movies|movies|us||o|cr
ShattaWale|Shatta Wale|music|music|africa||o|cr
ManCity|Manchester City|football|football|europe||o|cr
LiverpoolFC|Liverpool FC|football|football|europe||o|cr
PSG|Paris Saint-Germain|football|football|global||o|cr
TifoFootball|Tifo Football|football|football|europe||o|cr
TheFootballTerrace|The Football Terrace|football|football|europe||o|cr
AFTV|AFTV|football|football|europe||o|cr
RabidRetrospectGames|Rabid Retrospect Games|gaming|games|us||o|cr
Docks|Docks|gaming|eafc,games|europe||o|cr
ChesnoidGaming|ChesnoidGaming|gaming|eafc,games|europe||o|cr
S2G|S2G|gaming|eafc,games|europe||o|cr
DJMariio|DJMariio|gaming|eafc,games|europe||o|cr
DannyAarons|Danny Aarons|gaming|eafc,games|europe||o|cr
Stopde|Stopde|gaming|fcmobile,games|us||o|cr
Ajjubhai|Ajjubhai|gaming|games|india||o|cr
Mortal|Mortal|gaming|games|india||o|cr
Aphmau|Aphmau|gaming|games|us||o|cr
LankyBox|LankyBox|gaming|games|us||o|cr
Kyedae|Kyedae|gaming|esports,games|us||o|cr
DigitalFoundry|Digital Foundry|wow|tech|europe||o|cr
WhatCultureGaming|WhatCulture Gaming|gaming|games|europe||o|cr
Mikecrack|Mikecrack|gaming|games|europe||o|cr
Fernanfloo|Fernanfloo|gaming|games|latam||o|cr
MiawAug|MiawAug|gaming|games|asia||o|cr
ChooxTV|ChooxTV|gaming|games|asia||o|cr
FoundFlix|FoundFlix|gaming|games|us||o|cr
ScreenCrush|ScreenCrush|movies|series|us||o|cr
CineFix|CineFix by IGN|gaming|games|us||o|cr
CinemaSins|CinemaSins|movies|movies|us||o|cr
MarkAngelComedy|Mark Angel Comedy|gaming|games|africa||o|cr
IShowSpeed|IShowSpeed|music|music|us||o|cr
Juventus|Juventus|gaming|games|europe||o|cr
AFTVMedia|AFTV|gaming|games|europe||o|cr
Copa90|COPA90|football|football|europe||o|cr
F2Freestylers|The F2|gaming|games|europe||o|cr
PopularMMOs|PopularMMOs|gaming|games|us||o|cr
Grian|Grian|gaming|games|europe||o|cr
GoodTimesWithScar|GoodTimesWithScar|gaming|games|us||o|cr
LDShadowLady|LDShadowLady|gaming|games|europe||o|cr
SmallishBeans|SmallishBeans|gaming|games|europe||o|cr
Tubbo|Tubbo|gaming|games|europe||o|cr
GeorgeNotFound|GeorgeNotFound|gaming|games|europe||o|cr
Sapnap|Sapnap|gaming|games|us||o|cr
PrestonPlayz|PrestonPlayz|gaming|games|us||o|cr
ItsFunneh|ItsFunneh|gaming|games|us||o|cr
Thinknoodles|Thinknoodles|gaming|games|us||o|cr
Flamingo|Flamingo|gaming,fun|games,comedy|us||o|cr
Sketch|Sketch|gaming,fun|games,comedy|us||o|cr
Denis|Denis|gaming|games|us||o|cr
GamingWithKev|GamingWithKev|gaming|games|us||o|cr
Fresh|Fresh|gaming|games|us||o|cr
Clix|Clix|gaming|games|us||o|cr
Bugha|Bugha|gaming|games|us||o|cr
Tfue|Tfue|gaming|games|us||o|cr
NoahJ456|NoahJ456|gaming|cod,games|us||o|cr
MrRoflWaffles|MrRoflWaffles|gaming|cod,games|europe||o|cr
CarryisLive|CarryisLive|gaming|games|india||o|cr
Scout|Scout|gaming|games|india||o|cr
Levinho|Levinho|gaming|games|global||o|cr
WackyJacky101|WackyJacky101|gaming|games|europe||o|cr
ChocoTaco|ChocoTaco|gaming|games|us||o|cr
VanossGaming|VanossGaming|fun,gaming|comedy,games|us||o|cr
GVMERS|GVMERS|gaming|games|us||o|cr
Noclip|Noclip|gaming|games|us||o|cr
SmallAnt|SmallAnt|gaming|games|us||o|cr
PointCrow|PointCrow|gaming|games|us||o|cr
DougDoug|DougDoug|fun,gaming|comedy,games|us||o|cr
RTGame|RTGame|fun,gaming|comedy,games|europe||o|cr
CallMeKevin|CallMeKevin|fun,gaming|comedy,games|europe||o|cr
CoryxKenshin|CoryxKenshin|gaming|games|us||o|cr
NickRTFM|NickRTFM|gaming,football|eafc,football,games|us||o|cr
JarradHD|JarradHD|gaming|eafc,games|europe||o|cr
MGH|MGH|gaming|eafc,games|europe||o|cr
Tekkz|Tekkz|gaming,football|eafc,football,games|europe||o|cr
ChrisMD|ChrisMD|gaming,football|eafc,football,games|europe||o|cr
BfordLancer48|BfordLancer48|gaming|eafc,games|us||o|cr
442oons|442oons|football,fun|football,comedy|europe||o|cr
Unisport|Unisport|football|football|global||o|cr
SV2|SV2|football|football|europe||o|cr
Willyrex|Willyrex|gaming|games|europe||o|cr
DayoScript|DayoScript|gaming|games|europe||o|cr
BRKsEDU|BRKsEDU|gaming|games|latam||o|cr
TazerCraft|TazerCraft|gaming|games|latam||o|cr
AuthenticGames|AuthenticGames|gaming|games|latam||o|cr
M8N|M8N|gaming|games|arab||o|cr
M7MDXD|M7MDXD|gaming|games|arab||o|cr
TheSpiffingBrit|The Spiffing Brit|fun,gaming|comedy,games|europe||o|cr
MandaloreGaming|MandaloreGaming|gaming|games|us||o|cr
BillieEilish|Billie Eilish|music|music|us||o|cr
Rihanna|Rihanna|music|music|global||o|cr
Rema|Rema|music|afrobeats|africa||o|cr
Tems|Tems|music|afrobeats|africa||o|cr
KiDi|KiDi|music|music|africa||o|cr
Asake|Asake|music|afrobeats|africa||o|cr
GamersLittlePlayground|Gamers Little Playground|gaming|games|us||c|cr
GamerMaxChannel|Gamer Max Channel|gaming|games|global||c|cr
AFGuidesHD|AFGuidesHD|gaming|games|us||c|cr
LetsPlayMasterNoCommentary|LetsPlayMaster|gaming|games|global||c|cr
PLAYGAMES.|PLAYGAMES|gaming|games|global||c|cr
MajorDominates|Major Dominates|gaming|fcmobile,efootball,dls|global||c|cr
LEGAS1710|L E G A S|gaming|fcmobile,games|latam||c|cr
SelfGamerPro|Self Gamer Pro|gaming|fcmobile,dls,games|africa||c|cr
NOMADEMPIRE7|NOMAD EMPIRE|gaming|games|africa||c|cr
SamuelRamogo_|Samuel Ramogo|gaming|games|africa||c|cr
bluemoonpes100|BLUEMOON PES|gaming,football|efootball,football,games|africa||c|cr
Afrigamer|Afrigamer|gaming|games|africa||c|cr
CinemaSummary|various official studio channels|gaming|games|global||c|cr
GhanaLeague|Ghana Premier League|gaming|games|africa||c|cr
Theresagamer|TetraBit Gaming|gaming|games|us||c|cr
GamerSA|Gamer's Little Playground|gaming|games|us||c|cr
Pushthegaming|Push Square|gaming|games|europe||c|cr
LanceMcDonald|Lance McDonald|gaming|games|us||c|cr
ZackScottGames|ZackScottGames|gaming|games|us||c|cr
DansGaming|DansGaming|gaming|games|us||c|cr
PowerPyx|PowerPyx|gaming|games|us||c|cr
HappyThumbsGaming|Happy Thumbs Gaming|gaming|games|us||c|cr
NoCommentaryGameplay|No Commentary Gameplay|gaming|games|europe||c|cr
AndrewLouis|Andrew Louis|gaming|games|us||c|cr
HDFC|Harry|gaming|eafc,games|europe||c|cr
FIFAwithMOMO|FIFA with Momo|gaming|eafc,games|europe||c|cr
LokiFUT|Loki|gaming|eafc,games|europe||c|cr
FIFAGalaxy|FIFA Galaxy|gaming|eafc,games|europe||c|cr
MattHDGamer|MattHDGamer|gaming|eafc,games|europe||c|cr
Zerkaa|Zerkaa|gaming|eafc,games|europe||c|cr
Tobjizzle|Tobjizzle|gaming|eafc,games|europe||c|cr
SpencerFC|Spencer FC|gaming|eafc,games|europe||c|cr
FCMobileKing|FC Mobile King|gaming|fcmobile,games|india||c|cr
FCMobileGuide|FC Mobile Guide|gaming|fcmobile,games|global||c|cr
FCMobileLeaks|FC Mobile Leaks Hub|gaming|fcmobile,games|global||c|cr
SpookyExpress|Spooky|gaming,football|efootball,football,games|europe||c|cr
LotharMaths|Lothar Matthäus Gaming|gaming,football|efootball,football,games|europe||c|cr
DLSCenter|DLS Center|gaming|dls,games|global||c|cr
DLS22Official|DLS22|gaming|dls,games|india||c|cr
FreeFire|Garena Free Fire|gaming|games|global||c|cr
TotalGaming|Total Gaming|gaming|games|india||c|cr
LanaRaee|Lana Rae|gaming|games|us||c|cr
Aculite|Aculite|gaming|esports,games|india||c|cr
S8UL|S8UL|gaming|games,esports|india||c|cr
EasyAllies|Easy Allies|gaming|games|us||c|cr
Sumito|Summito|gaming|games|us||c|cr
KarlJobst|Karl Jobst|gaming|games|us||c|cr
SomeOrdinaryGamers|Mutahar|gaming|games|us||c|cr
FisayoFosudo|Fisayo Fosudo|wow,gaming|tech,games|africa||c|cr
IzzyGaming|Izzy Gaming|gaming|eafc,games|africa||c|cr
TheAfricanGamer|African Gamer|gaming|games|africa||c|cr
SlaggaJ|Slagga J|gaming|gta,games|africa||c|cr
GamerGirlZA|Gamer Girl ZA|gaming|games|africa||c|cr
CasAfrica|Cas Africa|gaming|games|africa||c|cr
SymbolGaming|Symbol|gaming|games|africa||c|cr
Rawknee|Rawknee Games|gaming|gta,games|india||c|cr
MM3RO|MM3RO|gaming|games|arab||c|cr
AlodiasGosiengfiao|Alodia Gosiengfiao|gaming|games|asia||c|cr
ElRubius|elrubiusOMG|gaming|games|europe||c|cr
LelePons|Lele Pons|fun,gaming|comedy,games|latam||c|cr
ScreenPrism|The Take|movies|movies|us||c|cr
EmergencyAwesome|Emergency Awesome|movies|movies,series|us||c|cr
CinemaTyler|CinemaTyler|movies|movies|us||c|cr
ThinkStory|Think Story|gaming|games|asia||c|cr
AnisaExplains|Anisa|movies|series|india||c|cr
FilmiCraft|FilmiCraft|gaming|games|india||c|cr
KhabyLame|Khaby Lame|fun|comedy|global||c|cr
KingBach|King Bach|fun|comedy|us||c|cr
AyaNakamura|Aya Nakamura|music|music|global||c|cr
Anitta|Anitta|music|music|latam||c|cr
TheUnitedStand|The United Stand|football|football|europe||c|cr
ChroniclesOfTumi|Chronicles of Tumi|football|football|africa||c|cr
ESPNFC|ESPN FC|football|football|us||c|cr
FabrizioRomano|Fabrizio Romano|football|football|europe||c|cr
433|433|football|football|europe||c|cr
Baller|Baller|football|football|global||c|cr
GamersPrey|GamersPrey|gaming|games|global||c|cr
XPLikesToPlay|XP Likes To Play|gaming|games|global||c|cr
GamerSlayer|GamerSlayer|gaming|games|global||c|cr
CenterStrain01|CenterStrain01|gaming|games|us||c|cr
TetraBitGaming|TetraBitGaming|gaming|games|us||c|cr
SlyFoxHound|SlyFoxHound|gaming|games|us||c|cr
BarcaBoy|BarcaBoy|gaming|eafc,games|europe||c|cr
B4Mz|B4Mz|gaming|eafc,games|europe||c|cr
FIFARenderZ|FIFA RenderZ|gaming|eafc,games|global||c|cr
Castastrofe|Castro1021|gaming|eafc,games|us||c|cr
RKN_FCMOBILE|RKN FC Mobile|gaming|fcmobile,games|global||c|cr
SpoonyTech|SpoonyTech|gaming,wow|fcmobile,tech,games|europe||c|cr
LalbabuGame|Lalbabu Gaming|gaming,football|efootball,football,games|india||c|cr
SpoonyeFootball|Spoony eFootball|gaming,football|efootball,football,games|global||c|cr
DLSGFX|DLS GFX|gaming|dls,games|global||c|cr
LuizGamingDLS|Luiz Gaming|gaming|dls,games|latam||c|cr
IndoDLS|Indo DLS|gaming|dls,games|asia||c|cr
SonuDLS|Sonu DLS|gaming|dls,games|india||c|cr
FG_FCMobile|FG FC Mobile|gaming|fcmobile,games|global||c|cr
HawksNest|HawksNest|gaming|cod,games|us||c|cr
TotalGaming001|Total Gaming|gaming|games|india||c|cr
TencentPUBGMOBILE|PUBG MOBILE|gaming|games|global||c|cr
GameTheorists|The Game Theorists|gaming|games|us||c|cr
BoundaryBreak|Shesez (Boundary Break)|gaming|games|us||c|cr
WritingWithSkill|Writing On Games|gaming|games|europe||c|cr
WodeMaya|Wode Maya Tech/Play|gaming|games|africa||c|cr
SamSpedy|SamSpedy Play|fun,gaming|comedy,games|africa||c|cr
Kipochii|Kipochii|gaming|eafc,games|africa||c|cr
SlikourOnLife|Slikour Gaming|gaming,football|esports,sports,games|africa||c|cr
SuperSportUncut|SuperSport Gaming|gaming,football|esports,sports,games|africa||c|cr
GhanaEsports|Esports Association Ghana|gaming|games|africa||c|cr
GamersInAfrica|Gamers In Africa|gaming|games|africa||c|cr
ArabGamesNetwork|Arab Games Network|gaming|games|arab||c|cr
JuegaGerman|JuegaGerman|gaming|games|latam||c|cr
RuokFF|Ruok FF|gaming|games|asia||c|cr
E-MasterSensei|E-MasterSensei|gaming|games|latam||c|cr
Lyna|Lyna|gaming|games|latam||c|cr
DeadMeat|Dead Meat|gaming|games|us||c|cr
MysteryRecapped|Mystery Recapped|movies|movies|global||c|cr
ScreenRant|Screen Rant|movies|movies|us||c|cr
CelineDept|Celine Dept|football,fun|football,comedy|europe||c|cr
Thogden|Thogden|gaming|games|europe||c|cr
Futcrunch|Futcrunch|football|football|europe||c|cr
Rubhen925|Rubhen925|gaming|games|global||c|cr
GameRiot|GameRiot|gaming|games|global||c|cr
Materwelonz|Materwelonz|gaming|games|global||c|cr
Welonz|Welonz|gaming|games|global||c|cr
LobosJr|LobosJr|gaming|games|us||c|cr
Marz|Marz|gaming|games|us||c|cr
ManlyBadassHero|ManlyBadassHero|gaming|games|us||c|cr
Insym|Insym|gaming|games|europe||c|cr
CJUGames|CJUGames|gaming|games|europe||c|cr
Fooster|Fooster|gaming|games|us||c|cr
IGP|IGP|gaming|games|us||c|cr
Stampylonghead|Stampylonghead|gaming|games|europe||c|cr
GamingWithJen|GamingWithJen|gaming|games|us||c|cr
Ali-A|Ali-A|gaming|games|europe||c|cr
TheCampingRusher|TheCampingRusher|gaming|games|us||c|cr
MrSavage|MrSavage|gaming|games|global||c|cr
CourageJD|CourageJD|gaming|games|us||c|cr
Aydan|Aydan|gaming|cod,games|us||c|cr
HusKerrs|HusKerrs|gaming|cod,games|us||c|cr
JoeWo|JoeWo|gaming|cod,games|us||c|cr
IceManIsaac|IceManIsaac|gaming|cod,games|us||c|cr
ZLaner|ZLaner|gaming|cod,games|us||c|cr
Symfuhny|Symfuhny|gaming|cod,games|us||c|cr
Fifakill|Fifakill|gaming|cod,games|europe||c|cr
ParkerTheSlayer|ParkerTheSlayer|gaming|cod,games|us||c|cr
Yanrique|Yanrique|gaming|games|global||c|cr
Raistar|Raistar|gaming|games|india||c|cr
Ghatak|Ghatak|gaming,football|esports,sports,games|india||c|cr
H2ODelirious|H2ODelirious|fun,gaming|comedy,games|us||c|cr
Terroriser|Terroriser|fun,gaming|comedy,games|europe||c|cr
Nogla|Daithi De Nogla|fun,gaming|comedy,games|europe||c|cr
BasicallyIDoWrk|BasicallyIDoWrk|fun,gaming|comedy,games|us||c|cr
IAmWildcat|IAmWildcat|fun,gaming|comedy,games|us||c|cr
Fourzer0seven|fourzer0seven|fun,gaming|comedy,games|us||c|cr
MrMattyPlays|MrMattyPlays|gaming|games|us||c|cr
Bismuth|Bismuth|gaming|games|global||c|cr
GDQ|Games Done Quick|gaming|games|us||c|cr
PangaeaPanga|PangaeaPanga|gaming|games|us||c|cr
LetsGameItOut|Let's Game It Out|fun,gaming|comedy,games|us||c|cr
GrayStillPlays|GrayStillPlays|fun,gaming|comedy,games|us||c|cr
Berleezy|Berleezy|fun,gaming|comedy,games|us||c|cr
Rhymestyle|Rhymestyle|gaming|games|us||c|cr
SeeReax|SeeReax|anime,gaming|anime,games|us||c|cr
Dotodoya|Dotodoya|anime,fun|anime,comedy,games|us||c|cr
FNG|FNG|gaming,football|eafc,football,games|europe||c|cr
Airrack|Airrack|gaming|games|us||c|cr
Jubilee|Jubilee|gaming|games|us||c|cr
Cut|Cut|gaming|games|us||c|cr
AMP|AMP|fun|comedy|us||c|cr
SidemenReacts|SidemenReacts|gaming|games|europe||c|cr
Mrwhosetheboss|Mrwhosetheboss|wow|tech|europe||c|cr
JerryRigEverything|JerryRigEverything|wow|tech|us||c|cr
iJustine|iJustine|wow|tech|us||c|cr
Dave2D|Dave2D|wow|tech|us||c|cr
TechCrunch|TechCrunch|wow|tech|us||c|cr
CNET|CNET|wow|tech|us||c|cr
TheRelaxingEnd|TheRelaxingEnd|gaming|games|global||c|cr
RRaenee|RRaenee|gaming,football|efootball,football,games|global||c|cr
awesomePCgames|awesomePCgames|gaming,football|efootball,football,games|global||c|cr
INDOMINATOR|INDOMINATOR|gaming,football|efootball,football,games|global||c|cr
AXG|AXG|gaming,football|efootball,football,games|global||c|cr
ElTrollino|ElTrollino|gaming|games|europe||c|cr
Cerol|Cerol|gaming|games|latam||c|cr
PlayHard|PlayHard|gaming|games|latam||c|cr
TheDonato|TheDonato|gaming|games|latam||c|cr
AbuFlah|AbuFlah|gaming|games|arab||c|cr
TheGamingBeaver|TheGamingBeaver|gaming|games|europe||c|cr
SovietWomble|SovietWomble|fun,gaming|comedy,games|europe||c|cr
RKG|RKG|gaming|games|europe||c|cr
PCGamesN|PCGamesN|gaming|games|europe||c|cr
TotalBiscuit|TotalBiscuit|gaming|games|europe||c|cr
GmanLives|GmanLives|gaming|games|us||c|cr
Matthewmatosis|Matthewmatosis|gaming|games|global||c|cr
GamingBolt|GamingBolt|gaming|games|india||c|cr
Beebom|Beebom|wow,gaming|tech,games|india||c|cr
8-BitRyan|8-BitRyan|gaming|games|europe||c|cr
Poiised|Poiised|gaming|games|us||c|cr
DashieXP|DashieXP|fun|comedy|us||c|cr
Nigahiga|nigahiga|fun|comedy|us||c|cr
Tasty|Tasty|fun|food|us||c|cr
Epicurious|Epicurious|fun|food|us||c|cr
Vogue|Vogue|fun|fashion|us||c|cr
GQ|GQ|fun|fashion|us||c|cr
HYPEBEAST|HYPEBEAST|fun|fashion|global||c|cr
Complex|Complex|music,fun|music,fashion|us||c|cr
Highsnobiety|Highsnobiety|fun|fashion|global||c|cr
NOWNESS|NOWNESS|gaming|games|global||c|cr
T-Series|T-Series|music|music|india||c|cr
A-Reece|A-Reece|gaming|games|africa||c|cr
Sjava|Sjava|music|music|africa||c|cr
Flavour|Flavour|music|music|africa||c|cr
MKIceAndFireEN|MKIceAndFire EN|gaming|games|global||c|cr
ProsafiaGaming|ProsafiaGaming|gaming|games|global||c|cr
packattack04082|packattack04082|gaming|games|us||c|cr
ShirrakoGaming|Shirrako Gaming|gaming|games|us||c|cr
LongplayArchive|LongplayArchive|gaming|games|global||c|cr
WorldOfLongplays|World of Longplays|gaming|games|global||c|cr
NostalgicGaming|Nostalgic Gaming|gaming|games|global||c|cr
JumboJesse|Jumbo Jesse|gaming|games|global||c|cr
TmarTn2|TmarTn2|gaming|games|us||c|cr
HashtagUnited|Hashtag United|gaming,football|eafc,football,games|europe||c|cr
BorussiaDortmund|Borussia Dortmund|gaming,football|eafc,football,games|europe||c|cr
EASPORTSFIFA|EA SPORTS FIFA|gaming|eafc,games|global||c|cr
ChuBoi|ChuBoi|gaming|eafc,games|europe||c|cr
Jamboo|Jamboo|gaming|eafc,games|europe||c|cr
Geografifa|Geografifa|gaming|eafc,games|europe||c|cr
Barfieboy|Barfieboy|gaming|eafc,games|europe||c|cr
BullyJuiceGaming|BullyJuice Gaming|gaming|eafc,games|us||c|cr
OllieGamerz|OllieGamerz|gaming|eafc,games|europe||c|cr
Matador|Matador|gaming|fcmobile,games|arab||c|cr
VSArena|VSArena|gaming|fcmobile,games|global||c|cr
Geelify|Geelify|gaming|fcmobile,games|global||c|cr
NEALGuides|NealGuides|gaming|fcmobile,games|us||c|cr
MrBeliever|MrBeliever|gaming|fcmobile,games|india||c|cr
SportsGamingUniverse|Sports Gaming Universe|gaming|fcmobile,games|us||c|cr
NicoThePro|NicoThePro|gaming|fcmobile,games|global||c|cr
FranklynGameplays|Franklyn Gameplays|gaming|fcmobile,efootball,dls|latam||c|cr
eFootballLeague|eFootball League|gaming,football|efootball,esports,football|global||c|cr
PESMaster|PES Master|gaming,football|efootball,football,games|global||c|cr
Bachira|Bachira|gaming,football|efootball,football,games|latam||c|cr
SpoonyPizzas|Spoony Pizzas|gaming,football|efootball,football,games|europe||c|cr
TheTrueBrits|TheTrueBrits|gaming,football|efootball,football,games|europe||c|cr
DreamLeagueSoccer|Dream League Soccer|gaming|dls,games|global||c|cr
DLSGamer|DLS Gamer|gaming|dls,games|global||c|cr
DLS19|DLS|gaming|dls,games|global||c|cr
DLSModding|DLS Modding|gaming|dls,games|global||c|cr
DreamSoccerGaming|Dream Soccer Gaming|gaming|dls,games|global||c|cr
DLSGameplay|DLS Gameplay|gaming|dls,games|global||c|cr
DLS24|DLS 24|gaming|dls,games|global||c|cr
FTS24|FTS 24|gaming,football|dls,football,games|global||c|cr
PESMobile|PES Mobile|gaming,football|efootball,football,games|global||c|cr
Warzone|Call of Duty: Warzone|gaming|cod,games|global||c|cr
Scump|Scump|gaming|cod,games|us||c|cr
Nadeshot|Nadeshot|gaming,football|cod,esports,sports|us||c|cr
OpTicGaming|OpTic Gaming|gaming,football|cod,esports,sports|us||c|cr
FaZeClan|FaZe Clan|gaming|cod,games|us||c|cr
FaZeSwagg|FaZe Swagg|gaming|cod,games|us||c|cr
XclusiveAce|Xclusive Ace|gaming|cod,games|us||c|cr
TheTacticalBrit|TheTacticalBrit|gaming|cod,games|europe||c|cr
JackFrags|Jackfrags|gaming|cod,games|europe||c|cr
KARNAGEClan|KARNAGE Clan|gaming|cod,games|us||c|cr
FazeBooya|FaZe Booya|gaming|cod,games|us||c|cr
Its_Iron|Its_Iron|gaming|cod,games|us||c|cr
RogueCompany|Rogue Company|gaming|cod,games|global||c|cr
PrestigeIsKey|PrestigeIsKey|gaming|cod,games|us||c|cr
TheGamingRevolution|The Gaming Revolution|gaming|cod,games|us||c|cr
GlitchingQueen|Glitching Queen|gaming|cod,games|us||c|cr
TheSmithPlays|TheSmithPlays|gaming|cod,games|us||c|cr
KrazyRabb1t|KrazyRabb1t|gaming|cod,games|us||c|cr
SallyIsADog|SallyIsADog|gaming|cod,games|us||c|cr
FreeFireEsports|Free Fire Esports|gaming,football|games,esports,sports|global||c|cr
TotalGaming093|Total Gaming|gaming|games|india||c|cr
A_S_GAMING|AS Gaming|gaming|games|india||c|cr
GyanGaming|Gyan Gaming|gaming|games|india||c|cr
LokeshGamer|Lokesh Gamer|gaming|games|india||c|cr
TwoSideGamers|Two Side Gamers|gaming|games|india||c|cr
GamingTamizhan|Gaming Tamizhan|gaming|games|india||c|cr
Amitbhai|Desi Gamers|gaming|games|india||c|cr
White444|White444|gaming|games|arab||c|cr
B2K|B2K|gaming|games|arab||c|cr
Loud_Coringa|Coringa|gaming|games|latam||c|cr
LOUD|LOUD|gaming,football|games,esports,sports|latam||c|cr
GarenaFreeFireLATAM|Free Fire LATAM|gaming,football|games,esports,sports|latam||c|cr
GarenaFreeFireIndonesia|Free Fire Indonesia|gaming|games|asia||c|cr
PUBGMOBILE_Arabia|PUBG MOBILE Arabia|gaming|games|arab||c|cr
PUBGMOBILEIndiaOfficial|PUBG MOBILE India|gaming|games|india||c|cr
JonathanGamingYT|Jonathan Gaming|gaming,football|games,esports,sports|india||c|cr
DynamoGaming|Dynamo Gaming|gaming|games|india||c|cr
SnaxGaming|Snax Gaming|gaming|games|india||c|cr
GodNixon|GodNixon|gaming|games|india||c|cr
PayalGaming|Payal Gaming|gaming|games|india||c|cr
KrontenGaming|Kronten Gaming|gaming|games|india||c|cr
Mavi|Mavi|gaming,football|games,esports,sports|india||c|cr
LolzZzGaming|LolzZz Gaming|gaming|games|india||c|cr
AthenaGaming|Athena Gaming|gaming|games|asia||c|cr
PowerBangGaming|PowerBang Gaming|gaming|games|us||c|cr
TGLTN|TGLTN|gaming,football|games,esports,sports|us||c|cr
Kaymind|Kaymind|gaming,football|games,esports,sports|global||c|cr
PajamaMan|PajamaMan|gaming|games|global||c|cr
LachlanYT|Lachlan|gaming|games|us||c|cr
Loserfruit|Loserfruit|gaming|games|us||c|cr
NickEh30|Nick Eh 30|gaming|games|us||c|cr
Mongraal|Mongraal|gaming,football|games,esports,sports|europe||c|cr
Benjyfishy|Benjyfishy|gaming,football|games,esports,sports|europe||c|cr
Replays|Replays|gaming|games|us||c|cr
TaborHill|Tabor Hill|gaming|games|us||c|cr
HYPEX|HYPEX|gaming|games|global||c|cr
ShiinaBR|ShiinaBR|gaming|games|global||c|cr
FaZeSway|FaZe Sway|gaming|games|us||c|cr
FazeJarvis|FaZe Jarvis|gaming|games|europe||c|cr
Ranger|Ranger|gaming|games|us||c|cr
ItsJerian|ItsJerian|gaming|games|us||c|cr
BillyBicep|Billy Bicep|gaming|games|us||c|cr
BajanCanadian|BajanCanadian|gaming|games|us||c|cr
JeromeASF|JeromeASF|gaming|games|us||c|cr
TheAtlanticCraft|TheAtlanticCraft|gaming|games|us||c|cr
MumboJumbo|Mumbo Jumbo|gaming|games|europe||c|cr
EthosLab|EthosLab|gaming,wow|games,tech|us||c|cr
xisumavoid|xisumavoid|gaming,wow|games,tech|europe||c|cr
ilmango|ilmango|gaming,wow|games,tech|europe||c|cr
Wattles|wattles|gaming|games|us||c|cr
Pixlriffs|Pixlriffs|gaming|games|europe||c|cr
ibxtoycat|ibxtoycat|gaming|games|europe||c|cr
MisterEpic|MisterEpic|gaming|games|us||c|cr
Mojang|Mojang|gaming|games|global||c|cr
MinecraftChina|Minecraft China|gaming|games|asia||c|cr
Fwhip|fWhip|gaming|games|europe||c|cr
Keralis|Keralis|gaming|games|global||c|cr
BdoubleO100|BdoubleO100|gaming|games|us||c|cr
TangoTek|TangoTek|gaming,wow|games,tech|us||c|cr
Etho|EthosLab|gaming,wow|games,tech|us||c|cr
Fundy|Fundy|gaming|games|global||c|cr
Ranboo|Ranboo|gaming|games|us||c|cr
WilburSoot|Wilbur Soot|gaming,music|games,music|europe||c|cr
CrispyGamer|Crispy Gamer|gaming|gta,games|us||c|cr
TGG|TGG|gaming|gta,games|us||c|cr
Kwebbelkop|Kwebbelkop|gaming|gta,games|global||c|cr
Syndicate|Syndicate|gaming|gta,games|europe||c|cr
Nought|Nought|gaming|gta,games|europe||c|cr
BayAreaBuggs|Bay Area Buggs|gaming|gta,games|us||c|cr
GhillieMaster|GhillieMaster|gaming|gta,games|us||c|cr
DarkViperAU|DarkViperAU|gaming|gta,games|us||c|cr
Hugoy|Hugoy|gaming|gta,games|global||c|cr
SpeirsTheAmazingHD|SpeirsTheAmazingHD|gaming|gta,games|us||c|cr
Broughy1322|Broughy1322|gaming|gta,games|europe||c|cr
DigitalCarAddiction|Digital Car Addict|gaming|gta,games|us||c|cr
MrBossFTW|MrBossFTW|gaming|gta,games|us||c|cr
Tylarious|Tylarious|gaming|gta,games|us||c|cr
Mafioso|Mafioso|gaming|gta,games|global||c|cr
InquisitorMaster|InquisitorMaster|gaming|games|us||c|cr
Tofuu|Tofuu|gaming|games|us||c|cr
RussoPlays|RussoPlays|gaming|games|us||c|cr
GamingDan|Gaming Dan|gaming|games|europe||c|cr
Jayingee|Jayingee|gaming|games|us||c|cr
Corl|Corl|gaming|games|us||c|cr
CookieSwirlC|CookieSwirlC|gaming|games|us||c|cr
LeahAshe|Leah Ashe|gaming|games|us||c|cr
ItsYeet|ItsYeet|gaming|games|us||c|cr
Remainings|Remainings|gaming|games|europe||c|cr
Bandites|Bandites|gaming|games|us||c|cr
TheBaconHair|TheBaconHair|gaming|games|us||c|cr
VALORANTChampionsTour|VALORANT Champions Tour|gaming,football|esports,sports,games|global||c|cr
Tarik|tarik|gaming,football|esports,sports,games|us||c|cr
ShahZaM|ShahZaM|gaming,football|esports,sports,games|us||c|cr
ScreaM|ScreaM|gaming,football|esports,sports,games|global||c|cr
Boaster|Boaster|gaming,football|esports,sports,games|europe||c|cr
iiTzTimmy|iiTzTimmy|gaming|esports,games|us||c|cr
AverageJonas|AverageJonas|gaming|esports,games|global||c|cr
Woohoojin|Woohoojin|gaming|esports,games|us||c|cr
SkillCappedValorant|Skill Capped Valorant|gaming|esports,games|us||c|cr
VALORANTEsports|VALORANT Esports|gaming,football|esports,sports,games|global||c|cr
Sentinels|Sentinels|gaming,football|esports,sports,games|us||c|cr
FNATIC|FNATIC|gaming,football|esports,sports,games|europe||c|cr
100Thieves|100 Thieves|gaming,football|esports,sports,games|us||c|cr
Cloud9|Cloud9|gaming,football|esports,sports,games|us||c|cr
G2Esports|G2 Esports|gaming,football|esports,sports,games|us||c|cr
NAVI|Natus Vincere|gaming,football|esports,sports,games|europe||c|cr
TeamLiquid|Team Liquid|gaming,football|esports,sports,games|global||c|cr
PaperRex|Paper Rex|gaming,football|esports,sports,games|asia||c|cr
DRXGlobal|DRX|gaming,football|esports,sports,games|asia||c|cr
T1|T1|gaming,football|esports,sports,games|asia||c|cr
GenG|Gen.G|gaming,football|esports,sports,games|asia||c|cr
EDwardGaming|EDward Gaming|gaming,football|esports,sports,games|asia||c|cr
HLTVorg|HLTV.org|gaming,football|esports,sports,games|global||c|cr
PGL|PGL|gaming,football|esports,sports,games|global||c|cr
StarLadder|StarLadder|gaming,football|esports,sports,games|europe||c|cr
AngryJoeShow|AngryJoeShow|gaming|games|us||c|cr
Fextralife|Fextralife|gaming|games|us||c|cr
TheBrotherhoodOfGaming|The Brotherhood of Gaming|gaming|games|us||c|cr
TheSaltFactory|The Salt Factory|gaming|games|us||c|cr
OutsideXbox|Outside Xbox|gaming|games|europe||c|cr
OutsideXtra|Outside Xtra|gaming|games|europe||c|cr
ModernVintageGamer|Modern Vintage Gamer|wow|tech|us||c|cr
DidYouKnowGaming|Did You Know Gaming?|gaming|games|global||c|cr
Ahoy|Ahoy|gaming|games|europe||c|cr
Razbuten|Razbuten|gaming|games|us||c|cr
GirlfriendReviews|Girlfriend Reviews|fun,gaming|comedy,games|us||c|cr
MortismalGaming|Mortismal Gaming|gaming|games|us||c|cr
SsethTzeentach|SsethTzeentach|fun,gaming|comedy,games|us||c|cr
Caddicarus|Caddicarus|fun,gaming|comedy,games|europe||c|cr
ScottTheWoz|Scott The Woz|fun,gaming|comedy,games|us||c|cr
RagnarRox|RagnarRox|gaming|games|europe||c|cr
TheLorebrarians|The Lorebrarians|gaming|games|us||c|cr
TheRussianBadger|TheRussianBadger|fun,gaming|comedy,games|us||c|cr
Wirtual|Wirtual|gaming|games|global||c|cr
NikoB|NikoB|gaming|games|us||c|cr
AsmongoldTV|Asmongold TV|gaming|games|us||c|cr
Asmongold|Asmongold|gaming|games|us||c|cr
Nobbel87|Nobbel87|gaming|games|global||c|cr
Lorekeeper|Lorekeeper|gaming|games|us||c|cr
iAmSelly|iAmSelly|gaming|games|africa||c|cr
EyramGaming|Eyram Gaming|gaming|games|africa||c|cr
MaccasioGaming|Maccasio Gaming|gaming|games|africa||c|cr
LyricalJoeGaming|Lyrical Joe Gaming|gaming|games|africa||c|cr
IfeanyiGaming|Ifeanyi Gaming|gaming|games|africa||c|cr
Peller|Peller|gaming|games|africa||c|cr
TheWizzyGaming|TheWizzyGaming|gaming|games|africa||c|cr
TSpicesGaming|TSpices Gaming|gaming|games|africa||c|cr
FamousTubeKIDS|FamousTubeKIDS|gaming|games|africa||c|cr
ApexTrap|ApexTrap|gaming|games|africa||c|cr
GrewalsGaming|Grewals Gaming|gaming|games|africa||c|cr
TheeAndrew|TheeAndrew|gaming|games|africa||c|cr
Mettlestate|Mettlestate|gaming,football|esports,sports,games|africa||c|cr
VoxGaming|Vox Gaming|gaming,football|esports,sports,games|africa||c|cr
TechnoGamerzOfficial|Techno Gamerz|gaming|gta,games|india||c|cr
LiveInsaan|Live Insaan|gaming|games|india||c|cr
BeastBoyShub|BeastBoyShub|gaming|games|india||c|cr
ASGaming|AS Gaming|gaming|games|india||c|cr
SlayyPoint|Slayy Point|fun,gaming|comedy,games|india||c|cr
NischayMalhan|Nischay Malhan|gaming|games|india||c|cr
SoulRegaltos|Soul Regaltos|gaming,football|games,esports,sports|india||c|cr
SoulAman|Soul Aman|gaming,football|games,esports,sports|india||c|cr
GodLJonathan|GodLike Jonathan|gaming,football|games,esports,sports|india||c|cr
GodLClutchGod|ClutchGod|gaming,football|games,esports,sports|india||c|cr
MafiaMundeer|Mafia Mundeer|gaming|games|india||c|cr
LiveFIB|LiveFIB|gaming|games|india||c|cr
HydraFlick|HydraFlick|gaming|games|india||c|cr
MortalLive|Mortal Live|gaming|games|india||c|cr
GamingWithNayeem|Gaming With Nayeem|gaming|games|india||c|cr
AbuFalah|أبو فلة|gaming|games|arab||c|cr
SXB|SXB|gaming|games|arab||c|cr
M7MD|M7MD|gaming|games|arab||c|cr
Abood|عبود|gaming|games|arab||c|cr
Bashaer|بشاير|gaming|games|arab||c|cr
MODY|MODY|gaming|games|arab||c|cr
GamingWithMaha|Gaming With Maha|gaming|games|arab||c|cr
AboodGamer|Abood Gamer|gaming|games|arab||c|cr
SaudiGamer|Saudi Gamer|gaming|games|arab||c|cr
ArabHardware|ArabHardware|wow,gaming|tech,games|arab||c|cr
TechnoArabia|Techno Arabia|wow,gaming|tech,games|arab||c|cr
W7S|W7S|gaming|games|arab||c|cr
M7MDKURDI|M7MD Kurdi|gaming|games|arab||c|cr
Mjalwad|Mjalwad|gaming|games|arab||c|cr
GamingDose|GamingDose|gaming|games|arab||c|cr
FadyGaming|Fady Gaming|gaming|games|arab||c|cr
jvnq|jvnq|gaming|games|latam||c|cr
BrunoPlayHard|PlayHard|gaming|games|latam||c|cr
Athos|Athos|gaming|games|latam||c|cr
GamesEduUu|Games EduUu|gaming|games|latam||c|cr
JogaMuito|JogaMuito|gaming|games|latam||c|cr
VenomExtreme|VenomExtreme|gaming|games|latam||c|cr
RezendeEvil|Rezende|gaming|games|latam||c|cr
BaixaMemoria|Baixa Memória|gaming|games|latam||c|cr
Zangado|Zangado|gaming|games|latam||c|cr
CoisaDeNerd|Coisa de Nerd|gaming|games|latam||c|cr
Jazzghost|Jazzghost|gaming|games|latam||c|cr
Monark|Monark|gaming|games|latam||c|cr
Godenot|Godenot|fun,gaming|comedy,games|latam||c|cr
RatoBorrachudo|Rato Borrachudo|gaming|games|latam||c|cr
LubaTV|LubaTV|gaming|games|latam||c|cr
Mikannn|Mikannn|gaming|games|latam||c|cr
MundoCanibal|Mundo Canibal|fun,gaming|comedy,games|latam||c|cr
GamerMats|GamerMats|gaming|games|latam||c|cr
T3ddy|T3ddy|gaming|games|latam||c|cr
Alexby11|Alexby|gaming|games|europe||c|cr
TheShooterCoC|TheShooterCoC|gaming|games|europe||c|cr
elchurches|ElChurches|gaming|games|europe||c|cr
iTownGamePlay|iTownGamePlay|gaming|games|europe||c|cr
NexxuzHD|NexxuzHD|gaming|gta,games|europe||c|cr
AlphaSniper97|AlphaSniper97|gaming|games|europe||c|cr
L3tCraft|L3tCraft|gaming|games|europe||c|cr
ByViruZz|ByViruZz|gaming|games|europe||c|cr
TheWillyrex|Willyrex|gaming|games|europe||c|cr
BaityBait|BaityBait|fun,gaming|comedy,games|europe||c|cr
NateGentile|Nate Gentile|wow,gaming|tech,games|europe||c|cr
Sergindsegasonic|Sergindsegasonic|gaming|games|europe||c|cr
CooLifeGame|CooLifeGame|gaming|games|europe||c|cr
MangelRogel|Mangel|gaming|games|europe||c|cr
Knekro|Knekro|gaming|games|europe||c|cr
Perxitaa|Perxitaa|gaming|games|europe||c|cr
Luzu|Luzu|gaming|games|europe||c|cr
Wismichu|Wismichu|gaming|games|europe||c|cr
PokeR988|PokeR988|gaming|games|europe||c|cr
DylandPROS|Dyland PROS|gaming|games|asia||c|cr
Erpan1140|Erpan1140|gaming|games|asia||c|cr
GamerSejati|GamerSejati|gaming,football|esports,sports,games|asia||c|cr
RiaRicis|Ricis Official|gaming|games|asia||c|cr
Oura|Oura|gaming,football|esports,sports,games|asia||c|cr
RRQ|RRQ|gaming,football|esports,sports,games|asia||c|cr
JunellDominic|Junell Dominic|gaming|games|asia||c|cr
AkosiDogie|AKOSI DOGIE|gaming|games|asia||c|cr
RobstixStudio|Robstix|gaming|games|asia||c|cr
Dogie|Dogie|gaming,football|esports,sports,games|asia||c|cr
LakadMatatag|Lakad Matatag|gaming|games|asia||c|cr
Sanz|Sanz|gaming|games|asia||c|cr
CongTV|Cong TV|gaming|games|asia||c|cr
Mimiyuuuh|Mimiyuuuh|gaming|games|asia||c|cr
Teejay|Teejay|gaming|games|asia||c|cr
Renejay|Renejay|gaming,football|esports,sports,games|asia||c|cr
OhMyV33nus|OhMyV33nus|gaming,football|esports,sports,games|asia||c|cr
Wise|Wise|gaming,football|esports,sports,games|asia||c|cr
Robstix|Robstix|gaming|games|asia||c|cr
MuratAbiGF|MuratAbiGF|gaming|games|europe||c|cr
Kafalar|Kafalar|gaming|games|europe||c|cr
Pqueen|Pqueen|gaming|games|europe||c|cr
Elraenn|Elraenn|gaming|games|europe||c|cr
wtcn|wtcN|gaming,football|esports,sports,games|europe||c|cr
BoraLo|BoraLo|gaming|games|europe||c|cr
Webtekno|Webtekno|wow,gaming|tech,games|europe||c|cr
Technopat|Technopat|wow,gaming|tech,games|europe||c|cr
TheTake|The Take|movies|movies,series|us||c|cr
Looper|Looper|movies|movies,series|us||c|cr
WhatCulture|WhatCulture|movies|movies,series|europe||c|cr
RedLetterMedia|RedLetterMedia|movies,gaming|movies,games|us||c|cr
MovieBob|MovieBob|movies,gaming|movies,games|us||c|cr
Filmento|Filmento|gaming|games|us||c|cr
CinemaWins|CinemaWins|movies|movies|us||c|cr
ScreenJunkies|ScreenJunkies|movies|movies|us||c|cr
CZsWorld|CZsWorld|movies|movies|us||c|cr
SpookyRice|SpookyRice|gaming|games|us||c|cr
FilmComicsExplained|FilmComicsExplained|gaming|games|us||c|cr
DC|DC|movies|movies|us||c|cr
MrFunny|Sabinus|fun|comedy|africa||c|cr
BrodaShaggi|Broda Shaggi|fun|comedy|africa||c|cr
BrainJotter|Brain Jotter|fun|comedy|africa||c|cr
Taooma|Taooma|fun|comedy|africa||c|cr
MrMacaroni|Mr Macaroni|fun|comedy|africa||c|cr
SydneyTalker|Sydney Talker|fun|comedy|africa||c|cr
NastyBlaq|Nasty Blaq|fun|comedy|africa||c|cr
ShankComics|Shank Comics|fun|comedy|africa||c|cr
Josh2Funny|Josh2Funny|fun|comedy|africa||c|cr
LasisiElenu|Lasisi Elenu|fun|comedy|africa||c|cr
CrazeClown|Craze Clown|fun|comedy|africa||c|cr
OgaSabinus|Oga Sabinus|fun|comedy|africa||c|cr
FunnyBrosComedy|Funny Bros Comedy|fun|comedy|africa||c|cr
Zicsaloma|Zicsaloma|fun|comedy|africa||c|cr
Carterefe|Carter Efe|fun,music|comedy,music|africa||c|cr
EmmaOhMaGod|EmmaOhMaGod|fun,music|comedy,music|africa||c|cr
Twyse_116|Twyse|fun|comedy|africa||c|cr
AkpororoTV|Akpororo|fun,music|comedy,music|africa||c|cr
KennyBlaqmcfr|Kenny Blaq|fun,music|comedy,music|africa||c|cr
Kelvinsapp|Kelvin Sapp|fun|comedy|africa||c|cr
Nasboi|Nasboi|fun,music|comedy,music|africa||c|cr
Basketmouthcomedy|Basketmouth|fun|comedy|africa||c|cr
Taaooma|Taaooma|fun|comedy|africa||c|cr
AuntyShaggi|Aunty Shaggi|fun|comedy|africa||c|cr
DamilolaAdegbite|Damilola Adegbite|fun|comedy|africa||c|cr
KieKieTV|KieKie|fun|comedy|africa||c|cr
Afigo|Afigo|fun|comedy|africa||c|cr
TeacherKwadwo|Teacher Kwadwo|fun|comedy|africa||c|cr
FameyeComedy|Fameye Comedy|fun|comedy|africa||c|cr
Asantewaa|Asantewaa|fun|comedy|africa||c|cr
Pentecost|Pentertainment|fun|comedy|africa||c|cr
SDKDele|SDK Dele|fun|comedy|africa||c|cr
FatherAnkrah|Father Ankrah|fun|comedy|africa||c|cr
Maccasio|Maccasio|fun|comedy|africa||c|cr
NanaAmaMcBrown|Nana Ama McBrown|fun|comedy|africa||c|cr
Kalybos|Kalybos|fun|comedy|africa||c|cr
ClementoSuarez|Clemento Suarez|fun|comedy|africa||c|cr
Dauglas_FYP|Dauglas FYP|fun|comedy|africa||c|cr
CrazyKennar|Crazy Kennar|fun|comedy|africa||c|cr
EddieButita|Eddie Butita|fun|comedy|africa||c|cr
TeacherWanjiku|Teacher Wanjiku|fun|comedy|africa||c|cr
FilterCopy|FilterCopy|movies,fun|series,comedy|india||c|cr
Jesser|Jesser|fun,football|comedy,sports|us||c|cr
TiwaSavage|Tiwa Savage|music|dance,music|africa||c|cr
YemiAlade|Yemi Alade|music|dance,music|africa||c|cr
Olamide|Olamide|music|music|africa||c|cr
FireboyDML|Fireboy DML|music|music|africa||c|cr
OmahLay|Omah Lay|music|music|africa||c|cr
AyraStarr|Ayra Starr|music|dance,music|africa||c|cr
MrEazi|Mr Eazi|music|music|africa||c|cr
Simi|Simi|music|music|africa||c|cr
Teni|Teni|music|music|africa||c|cr
Falz|Falz|fun,music|comedy,music|africa||c|cr
ChocolateCity|Chocolate City|music|music|africa||c|cr
StarboyTV|Starboy TV|music|music|africa||c|cr
Samini|Samini|music|music|africa||c|cr
KuamiEugene|Kuami Eugene|music|music|africa||c|cr
Fameye|Fameye|music|music|africa||c|cr
KingPromise|King Promise|music|music|africa||c|cr
Gyakie|Gyakie|music|music|africa||c|cr
Camidoh|Camidoh|music|music|africa||c|cr
LynxEntertainment|Lynx Entertainment|music|music|africa||c|cr
UniversalMusicAfrica|Universal Music Africa|music|music|africa||c|cr
MavinRecords|Mavin Records|music|music|africa||c|cr
MasterKG|Master KG|music|dance,music|africa||c|cr
TylerICU|Tyler ICU|music|dance,music|africa||c|cr
KabzaDeSmall|Kabza De Small|music|dance,music|africa||c|cr
DJMaphorisa|DJ Maphorisa|music|dance,music|africa||c|cr
AmiFaku|Ami Faku|music|music|africa||c|cr
NastyC|Nasty C|music|music|africa||c|cr
AKAworldwide|AKA|music|music|africa||c|cr
CassperNyovest|Cassper Nyovest|music|music|africa||c|cr
ShoMadjozi|Sho Madjozi|music|dance,music|africa||c|cr
MajorLeagueDJz|Major League DJz|music|dance,music|africa||c|cr
BlackCoffee|Black Coffee|music|dance,music|africa||c|cr
Tyla|Tyla|music|dance,music|africa||c|cr
Drake|Drake|music|music|us||c|cr
LadyGaga|Lady Gaga|music|dance,music|us||c|cr
BrunoMars|Bruno Mars|music|dance,music|us||c|cr
JustinBieber|Justin Bieber|music|music|us||c|cr
NickiMinaj|Nicki Minaj|music|music|us||c|cr
KatyPerry|Katy Perry|music|music|us||c|cr
selenagomez|Selena Gomez|music|music|us||c|cr
JBalvin|J Balvin|music|music|global||c|cr
KarolG|KAROL G|music|music|global||c|cr
Maluma|Maluma|music|music|global||c|cr
DaddyYankee|Daddy Yankee|music|music|global||c|cr
Ozuna|Ozuna|music|music|global||c|cr
AnuelAA|Anuel AA|music|music|global||c|cr
LuisFonsi|Luis Fonsi|music|music|global||c|cr
EnriqueIglesias|Enrique Iglesias|music|music|europe||c|cr
Rosalia|Rosalía|music|dance,music|europe||c|cr
Aitana|Aitana|music|music|europe||c|cr
ManuelTurizo|Manuel Turizo|music|music|global||c|cr
Feid|Feid|music|music|global||c|cr
ArijitSingh|Arijit Singh|music|music|india||c|cr
Badshah|Badshah|music|dance,music|india||c|cr
DiljitDosanjh|Diljit Dosanjh|music|music|india||c|cr
NehaKakkar|Neha Kakkar|music|music|india||c|cr
YoYoHoneySingh|Yo Yo Honey Singh|music|music|india||c|cr
TWICE|TWICE|music|dance|asia||c|cr
StrayKids|Stray Kids|music|dance|asia||c|cr
SEVENTEEN|SEVENTEEN|music|dance|asia||c|cr
NewJeans_official|NewJeans|music|dance|asia||c|cr
aespa|aespa|music|dance|asia||c|cr
IVE|IVE|music|dance|asia||c|cr
ENHYPEN|ENHYPEN|music|dance|asia||c|cr
LE_SSERAFIM|LE SSERAFIM|music|dance|asia||c|cr
ITZY|ITZY|music|dance|asia||c|cr
NCTsmtown|NCT|music|dance|asia||c|cr
YOASOBI|YOASOBI|music|music|asia||c|cr
Ado1024|Ado|music|music|asia||c|cr
HikakinTV|HikakinTV|music|music|asia||c|cr
KenshiYonezu|Kenshi Yonezu|music|music|asia||c|cr
LiSA|LiSA|anime,music|anime,music|asia||c|cr
Eve|Eve|anime,music|anime,music|asia||c|cr
KingGnu|King Gnu|music|music|asia||c|cr
CigarettesAfterSex|Cigarettes After Sex|music|music|us||c|cr
ImagineDragons|Imagine Dragons|music|music|us||c|cr
Coldplay|Coldplay|music|music|europe||c|cr
Adele|Adele|music|music|europe||c|cr
DuaLipa|Dua Lipa|music|music|europe||c|cr
HarryStyles|Harry Styles|music|music|europe||c|cr
OneDirection|One Direction|music|music|europe||c|cr
OfficialCharts|Official Charts|music|music|europe||c|cr
EFL|EFL|football|football|europe||c|cr
SPFL|SPFL|football|football|europe||c|cr
LigaMX|Liga MX|football|football|latam||c|cr
Brasileirao|Brasileirão|football|football|latam||c|cr
AFA|AFA|football|football|latam||c|cr
CONMEBOL|CONMEBOL|football|football|latam||c|cr
CONCACAF|Concacaf|football|football|latam||c|cr
NigeriaFootballFederation|Nigeria Football Federation|football|football|africa||c|cr
SAFA|South African Football Association|football|football|africa||c|cr
FootballKenya|Football Kenya Federation|football|football|africa||c|cr
ManchesterUnited|Manchester United|football|football|europe||c|cr
TottenhamHotspur|Tottenham Hotspur|football|football|europe||c|cr
WestHamUnited|West Ham United|football|football|europe||c|cr
Everton|Everton Football Club|football|football|europe||c|cr
LeicesterCity|Leicester City|football|football|europe||c|cr
AstonVillaFC|Aston Villa|football|football|europe||c|cr
NewcastleUnited|Newcastle United|football|football|europe||c|cr
Wolves|Wolverhampton Wanderers|football|football|europe||c|cr
Atleti|Atlético de Madrid|football|football|europe||c|cr
SevillaFC|Sevilla FC|football|football|europe||c|cr
ValenciaCF|Valencia CF|football|football|europe||c|cr
VillarrealCF|Villarreal CF|football|football|europe||c|cr
AthleticClub|Athletic Club|football|football|europe||c|cr
ACMilan|AC Milan|football|football|global||c|cr
Inter|Inter|football|football|global||c|cr
ASRoma|AS Roma|football|football|global||c|cr
Lazio|S.S. Lazio|football|football|global||c|cr
Napoli|SSC Napoli|football|football|global||c|cr
Bayern|FC Bayern München|football|football|europe||c|cr
BVB|Borussia Dortmund|football|football|europe||c|cr
Bayer04|Bayer 04 Leverkusen|football|football|europe||c|cr
OM|Olympique de Marseille|football|football|global||c|cr
Ajax|AFC Ajax|football|football|global||c|cr
PSV|PSV|football|football|global||c|cr
Feyenoord|Feyenoord|football|football|global||c|cr
SLBenfica|SL Benfica|football|football|global||c|cr
SportingCP|Sporting CP|football|football|global||c|cr
FCPorto|FC Porto|football|football|global||c|cr
Galatasaray|Galatasaray|football|football|europe||c|cr
Fenerbahce|Fenerbahçe|football|football|europe||c|cr
Besiktas|Beşiktaş|football|football|europe||c|cr
AlNassrFC|Al-Nassr|football|football|arab||c|cr
AlHilal|Al-Hilal|football|football|arab||c|cr
AlAhli|Al-Ahli Saudi FC|football|football|arab||c|cr
AlIttihad|Al-Ittihad Club|football|football|arab||c|cr
InterMiamiCF|Inter Miami CF|football|football|us||c|cr
LAFC|Los Angeles Football Club|football|football|us||c|cr
LAGalaxy|LA Galaxy|football|football|us||c|cr
SeattleSoundersFC|Seattle Sounders FC|football|football|us||c|cr
TorontoFC|Toronto FC|football|football|us||c|cr
Corinthians|Corinthians|football|football|latam||c|cr
Flamengo|Flamengo|football|football|latam||c|cr
Palmeiras|Palmeiras|football|football|latam||c|cr
SantosFC|Santos FC|football|football|latam||c|cr
BocaJuniors|Boca Juniors|football|football|latam||c|cr
RiverPlate|River Plate|football|football|latam||c|cr
ClubAmerica|Club América|football|football|latam||c|cr
Chivas|Chivas|football|football|latam||c|cr
TigresOficial|Tigres UANL|football|football|latam||c|cr
Monterrey|Rayados|football|football|latam||c|cr
KaizerChiefs|Kaizer Chiefs|football|football|africa||c|cr
OrlandoPirates|Orlando Pirates|football|football|africa||c|cr
MamelodiSundowns|Mamelodi Sundowns|football|football|africa||c|cr
AsanteKotokoSC|Asante Kotoko|football|football|africa||c|cr
HeartsOfOak|Hearts of Oak|football|football|africa||c|cr
AccraHeartsOfOak|Accra Hearts of Oak|football|football|africa||c|cr
KumasiAsanteKotoko|Kumasi Asante Kotoko|football|football|africa||c|cr
EnyimbaFC|Enyimba FC|football|football|africa||c|cr
RangersInternational|Rangers International|football|football|africa||c|cr
KanoPillars|Kano Pillars|football|football|africa||c|cr
GorMahiaFC|Gor Mahia|football|football|africa||c|cr
AFCLeopards|AFC Leopards|football|football|africa||c|cr
SimbaSC|Simba SC|football|football|global||c|cr
YoungAfricansSC|Young Africans SC|football|football|global||c|cr
AlAhly|Al Ahly SC|football|football|arab||c|cr
ZamalekSC|Zamalek SC|football|football|arab||c|cr
WydadAC|Wydad AC|football|football|global||c|cr
EsperanceSportivedeTunis|Espérance Sportive de Tunis|football|football|global||c|cr
footballDaily|Football Daily|football|football|europe||c|cr
UnitedStand|The United Stand|football|football|europe||c|cr
ExpressionsOOZ|Expressions Oozing|football|football|europe||c|cr
MarkGoldbridge|Mark Goldbridge|football|football|europe||c|cr
FilthyFellas|Filthy Fellas|football|football|europe||c|cr
FootballMadeSimple|Football Made Simple|football|football|europe||c|cr
ThePuristFootball|The Purist Football|football|football|global||c|cr
ShootforLove|Shoot for Love|football|football|asia||c|cr
KICKTV|KICKTV|football|football|us||c|cr
BetaSquad|Beta Squad|football|football|europe||c|cr
Chunkz|Chunkz|football|football|europe||c|cr
JokerFCMobile|JOKER FC Mobile|gaming|games|global||c|cr
SHNSurvivalHorrorNetwork|SHN Survival Horror Network|gaming|games|global||c|cr
BANDAINAMCOEntertainmentAmerica|BANDAI NAMCO Entertainment America|gaming|games|global||c|cr
GabSmolders|Gab Smolders|fun|creators|global||c|cr
JohnWolfe|John Wolfe|gaming|games|global||c|cr
NecoTheSergal|Neco The Sergal|gaming|games|global||c|cr
FazeJev|FaZe Jev|gaming|games|global||c|cr
JHCGaming|JHC Gaming|gaming|games|global||c|cr
TheBushka|The Bushka|gaming|games|global||c|cr
MiniLadd|Mini Ladd|gaming|games|global||c|cr
TheGameTheorists|The Game Theorists|gaming|games|global||c|cr
TheFilmTheorists|The Film Theorists|fun|creators|global||c|cr
TheCompletionist|The Completionist|fun|creators|global||c|cr
JakeBaldino|Jake Baldino|gaming|games|global||c|cr
ApolloLegend|Apollo Legend|fun|creators|global||c|cr
DazGames|Daz Games|gaming|games|global||c|cr
KubzScouts|Kubz Scouts|gaming|games|global||c|cr
BijuuMike|Bijuu Mike|gaming|games|global||c|cr
AfroSenjuXL|AfroSenju XL|gaming|games|global||c|cr
TheAnimeMan|The Anime Man|gaming|games|global||c|cr
BossFC|Boss FC|gaming|games|global||c|cr
HashtagHarry|Hashtag Harry|gaming|games|global||c|cr
HITCSevens|HITC Sevens|fun|creators|global||c|cr
TheCoachesVoice|The Coaches' Voice|fun|creators|global||c|cr
GoldbridgeThatsFootball|That's Football|fun|creators|global||c|cr
SkySportsFootball|Sky Sports Football|fun|creators|global||c|cr
CAFTV|CAF TV|fun|creators|global||c|cr
ChelseaFootballClub|Chelsea Football Club|fun|creators|global||c|cr
BRFootball|B/R Football|fun|creators|global||c|cr
CBSSportsGolazo|CBS Sports Golazo|fun|creators|global||c|cr
TheOverlap|The Overlap|fun|creators|global||c|cr
RioFerdinandPresents|Rio Ferdinand Presents|fun|creators|global||c|cr
JesseLingard|Jesse Lingard|fun|creators|global||c|cr
RyanTrahan|Ryan Trahan|fun|creators|global||c|cr
DudePerfect|Dude Perfect|fun|creators|global||c|cr
YesTheory|Yes Theory|fun|creators|global||c|cr
ZachKing|Zach King|fun|creators|global||c|cr
LillySingh|Lilly Singh|fun|creators|global||c|cr
DrewGooden|Drew Gooden|fun|creators|global||c|cr
DannyGonzalez|Danny Gonzalez|fun|creators|global||c|cr
KurtisConner|Kurtis Conner|fun|creators|global||c|cr
ScottCramer|Scott Cramer|fun|creators|global||c|cr
HowRidiculous|How Ridiculous|fun|creators|global||c|cr
MarkRober|Mark Rober|fun|creators|global||c|cr
MarquesBrownlee|Marques Brownlee|fun|creators|global||c|cr
UnboxTherapy|Unbox Therapy|fun|creators|global||c|cr
LinusTechTips|Linus Tech Tips|fun|creators|global||c|cr
AustinEvans|Austin Evans|fun|creators|global||c|cr
GSMArenaOfficial|GSMArena Official|fun|creators|global||c|cr
TheVerge|The Verge|fun|creators|global||c|cr
FiqiAmd|Fiqi Amd|gaming|games|global||c|cr
RezaArap|Reza Arap|gaming|games|global||c|cr
BangAlex|Bang Alex|gaming|games|global||c|cr
OuraGaming|Oura Gaming|gaming|games|global||c|cr
RubiusZ|Rubius Z|gaming|games|global||c|cr
FelipeNeto|Felipe Neto|gaming|games|global||c|cr
LOUDCoringa|LOUD Coringa|gaming|games|global||c|cr
ElGato|El Gato|gaming|games|global||c|cr
AboFlahGaming|AboFlah Gaming|gaming|games|global||c|cr
BanderitaXGaming|BanderitaX Gaming|gaming|games|global||c|cr
ManyATrueNerd|Many A True Nerd|gaming|games|global||c|cr
TheYogscast|The Yogscast|gaming|games|global||c|cr
HatFilms|Hat Films|gaming|games|global||c|cr
RockPaperShotgun|Rock Paper Shotgun|gaming|games|global||c|cr
PCGamer|PC Gamer|gaming|games|global||c|cr
NoahCaldwell-Gervais|Noah Caldwell-Gervais|gaming|games|global||c|cr
JosephAnderson|Joseph Anderson|gaming|games|global||c|cr
RyanHiga|Ryan Higa|fun|creators|global||c|cr
DrewBinsky|Drew Binsky|fun|creators|global||c|cr
NasDaily|Nas Daily|fun|creators|global||c|cr
MarkWiens|Mark Wiens|fun|creators|global||c|cr
BestEverFoodReviewShow|Best Ever Food Review Show|fun|creators|global||c|cr
StrictlyDumpling|Strictly Dumpling|fun|creators|global||c|cr
JoshuaWeissman|Joshua Weissman|fun|creators|global||c|cr
BabishCulinaryUniverse|Babish Culinary Universe|fun|creators|global||c|cr
BonApptit|Bon Appétit|fun|creators|global||c|cr
GordonRamsay|Gordon Ramsay|fun|creators|global||c|cr
JamieOliver|Jamie Oliver|fun|creators|global||c|cr
BingingwithBabish|Binging with Babish|fun|creators|global||c|cr
TheDodo|The Dodo|fun|creators|global||c|cr
RedBull|Red Bull|fun|creators|global||c|cr
Beyonc|Beyoncé|fun|creators|global||c|cr
DiamondPlatnumz|Diamond Platnumz|fun|creators|global||c|cr
ZakesBantwini|Zakes Bantwini|fun|creators|global||c|cr
FallyIpupa|Fally Ipupa|fun|creators|global||c|cr
Fuballer|FifaRalle|gaming|games|global||c|cr
LoLEsports|LoL Esports|fun|creators|global||c|cr
ZullietheWitch|Zullie the Witch|gaming|games|global||c|cr
GameMakersToolkit|Game Maker's Toolkit|gaming|games|global||c|cr
InternetHistorian|Internet Historian|gaming|games|global||c|cr
BellularWarcraft|Bellular Warcraft|gaming|games|global||c|cr
PreachGaming|Preach Gaming|gaming|games|global||c|cr
TheStoryteller|The Storyteller|gaming|games|global||c|cr
ATKArena|ATK Arena|gaming|games|global||c|cr
BravadoGaming|Bravado Gaming|gaming|games|global||c|cr
GoliathGaming|Goliath Gaming|gaming|games|global||c|cr
RakaZoneGaming|RakaZone Gaming|gaming|games|global||c|cr
UnGraduateGamer|UnGraduate Gamer|gaming|games|global||c|cr
RDXGaming|RDX Gaming|gaming|games|global||c|cr
DGamingZone|D Gaming Zone|gaming|games|global||c|cr
MishoGaming|Misho Gaming|gaming|games|global||c|cr
M7MDAl-Haddad|M7MD Al-Haddad|gaming|games|global||c|cr
MucaMurioca|Muca Muriçoca|gaming|games|global||c|cr
BUDI01GAMING|BUDI01 GAMING|gaming|games|global||c|cr
KemasPakeZ|Kemas Pake Z|gaming|games|global||c|cr
AldiTV|Aldi TV|gaming|games|global||c|cr
LetDaHyper|LetDa Hyper|gaming|games|global||c|cr
JonathanLiandi|Jonathan Liandi|gaming|games|global||c|cr
GemaShowIndo|Gema Show Indo|gaming|games|global||c|cr
ArapGaming|Arap Gaming|gaming|games|global||c|cr
PickyPicks|Picky Picks|gaming|games|global||c|cr
BayuSkak|Bayu Skak|gaming|games|global||c|cr
TretanMuslim|Tretan Muslim|gaming|games|global||c|cr
EVOSEsports|EVOS Esports|fun|creators|global||c|cr
ONICEsports|ONIC Esports|fun|creators|global||c|cr
AlterEgoEsports|Alter Ego Esports|fun|creators|global||c|cr
MomoGaming|Momo Gaming|gaming|games|global||c|cr
NianaGuerrero|Niana Guerrero|gaming|games|global||c|cr
BlacklistInternational|Blacklist International|fun|creators|global||c|cr
EchoEsports|ECHO|fun|creators|global||c|cr
BrenEsports|Bren Esports|fun|creators|global||c|cr
ONICPhilippines|ONIC Philippines|fun|creators|global||c|cr
TeamPayaman|Team Payaman|gaming|games|global||c|cr
KimpoyFeliciano|Kimpoy Feliciano|gaming|games|global||c|cr
RanzKyle|Ranz Kyle|gaming|games|global||c|cr
TimsGaming|Tims Gaming|gaming|games|global||c|cr
EnesBatur|Enes Batur|gaming|games|global||c|cr
Barzcan|Barış Özcan|gaming|games|global||c|cr
BurakOyunda|Burak Oyunda|gaming|games|global||c|cr
MuratSoner|Murat Soner|gaming|games|global||c|cr
MamiEren|Mami Eren|gaming|games|global||c|cr
TugkanGnlta|Elraenn|gaming|games|global||c|cr
CanSungur|Can Sungur|gaming|games|global||c|cr
Mesutevik|Mesut Çevik|gaming|games|global||c|cr
MertGnhan|Mert Günhan|gaming|games|global||c|cr
SertaAbi|Sertaç Abi|gaming|games|global||c|cr
OyunDelisi|Oyun Delisi|gaming|games|global||c|cr
FurkanYaman|Furkan Yaman|gaming|games|global||c|cr
EfeUyga|Efe Uygaç|gaming|games|global||c|cr
BaturayAnar|Baturay Anar|gaming|games|global||c|cr
OyunPortal|Oyun Portalı|gaming|games|global||c|cr
TheFilmBee|The Film Bee|fun|creators|global||c|cr
LessonsfromtheScreenplay|Lessons from the Screenplay|gaming|games|global||c|cr
TheCloserLook|The Closer Look|fun|creators|global||c|cr
TheCriticalDrinker|The Critical Drinker|fun|creators|global||c|cr
ChrisStuckmann|Chris Stuckmann|fun|creators|global||c|cr
JeremyJahns|Jeremy Jahns|fun|creators|global||c|cr
BreakfastAllDay|Breakfast All Day|fun|creators|global||c|cr
TheMovieCouple|The Movie Couple|fun|creators|global||c|cr
DanMurrell|Dan Murrell|fun|creators|global||c|cr
AccentedCinema|Accented Cinema|fun|creators|global||c|cr
ThomasFlight|Thomas Flight|fun|creators|global||c|cr
LikeStoriesofOld|Like Stories of Old|fun|creators|global||c|cr
HonestTrailers|Honest Trailers|fun|creators|global||c|cr
PitchMeeting|Pitch Meeting|fun|creators|global||c|cr
HowItShouldHaveEnded|HISHE|fun|creators|global||c|cr
TheHorrorShow|The Horror Show|fun|creators|global||c|cr
MarvelEntertainment|Marvel Entertainment|fun|creators|global||c|cr
TheLordoftheRings|The Lord of the Rings|fun|creators|global||c|cr
FlaqoRaz|Flaqo Raz|fun|creators|global||c|cr
MCFullstop|MC Fullstop|fun|creators|global||c|cr
AmitBhadana|Amit Bhadana|fun|creators|global||c|cr
HarshBeniwal|Harsh Beniwal|fun|creators|global||c|cr
DiceMedia|Dice Media|fun|creators|global||c|cr
RussellPeters|Russell Peters|fun|creators|global||c|cr
JoKoy|Jo Koy|fun|creators|global||c|cr
RiyadhK|Riyadh K|fun|creators|global||c|cr
WhinderssonNunes|Whindersson Nunes|fun|creators|global||c|cr
TroomTroom|Troom Troom|fun|creators|global||c|cr
AlanChikinChow|Alan Chikin Chow|fun|creators|global||c|cr
DharMann|Dhar Mann|fun|creators|global||c|cr
RiyazAly|Riyaz Aly|fun|creators|global||c|cr
YBNLNation|YBNL Nation|fun|creators|global||c|cr
SarkcessMusic|Sarkcess Music|fun|creators|global||c|cr
Officialdism|Official HIGE DANdism|fun|creators|global||c|cr
RBLeipzig|RB Leipzig|fun|creators|global||c|cr
OlympiqueLyonnais|Olympique Lyonnais|fun|creators|global||c|cr
TheF2|The F2|fun|creators|global||c|cr
AJShabeel|AJ Shabeel|fun|creators|global||c|cr
TheoBaker|Theo Baker|fun|creators|global||c|cr
NikoOmilana|Niko Omilana|fun|creators|global||c|cr
CaseyNeistat|Casey Neistat|fun|vlogs,creators|global||c|cr
DavidDobrik|David Dobrik|fun|vlogs,creators|global||c|cr
emmachamberlain|emma chamberlain|fun|vlogs,creators|global||c|cr
PeterMcKinnon|Peter McKinnon|fun|vlogs,creators|global||c|cr
KaraandNate|Kara and Nate|fun|vlogs,creators|global||c|cr
lostleblanc|Lost LeBlanc|fun|vlogs,creators|global||c|cr
FunForLouis|FunForLouis|fun|vlogs,creators|global||c|cr
EvaZubeck|Eva zu Beck|fun|vlogs,creators|global||c|cr
TheBucketListFamily|The Bucket List Family|fun|vlogs,creators|global||c|cr
aliabdaal|Ali Abdaal|fun|vlogs,creators|global||c|cr
mattdavella|Matt DAvella|fun|vlogs,creators|global||c|cr
KaiCenat|Kai Cenat|fun|vlogs,creators|global||c|cr
StokesTwins|Stokes Twins|fun|vlogs,creators|global||c|cr
ImpaulsiveShow|IMPAULSIVE|fun|vlogs,creators|global||c|cr
nelkboys|NELK|fun|vlogs,creators|global||c|cr
zackdfilms|Zack D. Films|fun|vlogs,creators|global||c|cr
FaZeRug|FaZe Rug|fun|vlogs,creators|global||c|cr
Behzinga|Behzinga|fun|vlogs,creators|global||c|cr
TBJZL|TBJZL|fun|vlogs,creators|global||c|cr
IndigoTraveller|Indigo Traveller|fun|vlogs,creators|global||c|cr
Davidsbeenhere|Davidsbeenhere|fun|vlogs,creators|global||c|cr
SamuelandAudrey|Samuel and Audrey|fun|vlogs,creators|global||c|cr
BrooklynandBailey|Brooklyn and Bailey|fun|vlogs,creators|global||c|cr
TheAceFamily|The ACE Family|fun|vlogs,creators|global||c|cr`;
function seedChannels() { return CH_SEED.split('\n').filter(Boolean).map(l => { const [h, n, c, t, rg, f, st, kd] = l.split('|'); return { h, n, c, t, rg: rg || 'global', f: f === '1' ? 1 : 0, st: st || 'c', kd: kd || 'o' }; }); }
// ✅ auto-approve: the channel's real YouTube name matches the name on our list ("Shirrako" = "Shirrako Official")
function nameKey(s) { return String(s || '').toLowerCase().replace(/\s*-\s*topic$/, '').replace(/official|channel|tv|vevo|music|hq|yt|the /g, '').replace(/[^\p{L}\p{N}]+/gu, ''); }
function namesMatch(a, b) { const x = nameKey(a), y = nameKey(b); if (!x || !y) return false; const sh = x.length < y.length ? x : y, lg = x.length < y.length ? y : x; if (x === y || (sh.length >= 6 && lg.includes(sh) && sh.length / lg.length >= 0.6)) return true; let same = 0; for (let i = 0; i < Math.min(x.length, y.length); i++) if (x[i] === y[i]) same++; return same / Math.max(x.length, y.length) >= 0.8; }
async function chLoad(env) {
  const d = await getDocument(env, CH_DOC).catch(() => null); let L = null, st = {};
  try { L = JSON.parse((d && d.json) || 'null'); } catch (e) {} try { st = JSON.parse((d && d.st) || '{}'); } catch (e) {}
  if (!Array.isArray(L) || !L.length) L = seedChannels();
  if ((st.seedv || 1) < 2) { const have = new Set(L.map(c => String(c.h || '').toLowerCase())); seedChannels().forEach(c => { if (!have.has(String(c.h).toLowerCase())) L.push(c); }); st.seedv = 2; }   // v60: new channels (vlog creators) join the saved list
  if (!st.kdv) { const m = {}; seedChannels().forEach(c => m[String(c.h).toLowerCase()] = c.kd); L.forEach(c => { if (!c.kd) c.kd = m[String(c.h || '').toLowerCase()] || 'o'; }); st.kdv = 1; }   // v58.2: label creators vs official
  return { L, st };
}
async function chSave(env, L, st) { await patchDocument(env, CH_DOC, { json: { stringValue: JSON.stringify(L) }, st: { stringValue: JSON.stringify(st) }, at: { integerValue: String(Date.now()) } }); }
async function vidLoad(env) { const d = await getDocument(env, VID_DOC).catch(() => null); try { return JSON.parse((d && d.json) || '[]'); } catch (e) { return []; } }
async function vidSave(env, items) { await patchDocument(env, VID_DOC, { json: { stringValue: JSON.stringify(items) }, at: { integerValue: String(Date.now()) } }); }
// read just the start of a big page (the channel id is near the top) — keeps CPU tiny
async function readStart(r, max) {
  const rd = r.body.getReader(), dec = new TextDecoder(); let s = '';
  while (s.length < max) { const { done, value } = await rd.read(); if (done) break; s += dec.decode(value, { stream: true }); if (/"(?:externalId|channelId)":"UC[\w-]{22}"|channel\/UC[\w-]{22}/.test(s.slice(-60000))) break; }
  try { rd.cancel(); } catch (e) {}
  return s;
}
async function resolveHandle(h) {
  const r = await fetch(`https://www.youtube.com/@${encodeURIComponent(h)}`, { headers: YT_HEAD });
  if (r.status === 404) return 'x';
  if (!r.ok) return null;
  let id = null;
  if (typeof HTMLRewriter !== 'undefined') {   // Cloudflare's fast built-in reader: grab the channel link from the page head, then stop
    const pick = (v) => { const m = String(v || '').match(/channel\/(UC[\w-]{22})/); if (m && !id) id = m[1]; };
    const out = new HTMLRewriter().on('link[rel="canonical"]', { element: (e) => pick(e.getAttribute('href')) }).on('meta[property="og:url"]', { element: (e) => pick(e.getAttribute('content')) }).on('meta[itemprop="identifier"]', { element: (e) => { const c = e.getAttribute('content'); if (/^UC[\w-]{22}$/.test(c || '') && !id) id = c; } }).transform(r);
    const rd = out.body.getReader(); let n = 0;
    while (!id && n < 1500000) { const { done, value } = await rd.read(); if (done) break; n += value.length; }
    try { rd.cancel(); } catch (e) {}
  } else {
    const t = await readStart(r, 700000);
    const m = t.match(/"externalId":"(UC[\w-]{22})"/) || t.match(/channel\/(UC[\w-]{22})/); id = m ? m[1] : null;
  }
  return id || null;   // v60: a page without the channel link = YouTube said "not now" (consent / busy), so try again later
}
const YT_HEAD = { 'Accept-Language': 'en-US,en;q=0.9', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', Cookie: 'SOCS=CAI; CONSENT=YES+1' };
function parseYt(xml) {
  const out = []; let i = 0; const ttl = (xml.match(/<title>([^<]{1,120})<\/title>/) || [])[1] || '';
  for (let k = 0; k < 6; k++) {
    const a = xml.indexOf('<entry>', i); if (a < 0) break; const b = xml.indexOf('</entry>', a); if (b < 0) break; const e = xml.slice(a, b); i = b;
    const v = (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1]; if (!v) continue;
    const t = nTxt((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').slice(0, 160), d = Date.parse((e.match(/<published>([^<]+)<\/published>/) || [])[1] || '') || Date.now();
    out.push({ v, t, d });
  }
  return { ttl: nTxt(ttl), list: out };
}
async function vidsRun(env, ctx, budget) {
  const { L, st } = await chLoad(env), items = await vidLoad(env), now = Date.now(), day = new Date().toISOString().slice(0, 10);
  if (st.rv !== 1) { st.rv = 1; L.forEach(c => { if (c.id === 'x') { delete c.id; c.tries = 0; c.nt = 0; c.e = ''; } }); }   // v60: retry everything YouTube refused before
  st.i = st.i || 0; st.ya = st.ya && st.day === day ? st.ya : {}; st.day = day;
  const live = L.filter(c => c.st !== 'x' && c.id !== 'x');
  // followed channels first (every hour), then everyone in turns
  const pick = live.filter(c => c.fol > 0 && c.id && now - (c.last || 0) > 3600e3).slice(0, Math.floor(budget / 3));
  // still looking channels up? spend most of this run on that (approved ones first) — everything is found within a few hours
  const unresolved = live.filter(c => !c.id && (!c.nt || now >= c.nt)).sort((a, b) => (a.st === 'o' ? 0 : 1) - (b.st === 'o' ? 0 : 1));
  const maxRes = unresolved.length ? Math.max(3, Math.floor(budget * 0.6)) : 0;
  unresolved.slice(0, maxRes).forEach(c => { if (pick.length < budget) pick.push(c); });
  const known = live.filter(c => c.id);
  for (let k = 0; pick.length < budget && k < known.length; k++) { const c = known[(st.i + k) % known.length]; if (!pick.includes(c)) pick.push(c); }
  st.i = (st.i + budget) % Math.max(1, known.length);
  let resolves = 0; const have = new Set(items.map(x => x.v)), alerts = [];
  await Promise.all(pick.map(async (c) => {
    try {
      if (!c.id) { if (resolves >= maxRes) return; resolves++; const id = await resolveHandle(c.h);
        if (id) { c.id = id; c.tries = 0; c.nt = 0; if (id === 'x') c.e = 'not found'; }
        else { c.tries = (c.tries || 0) + 1; c.nt = now + Math.min(24, 2 * c.tries) * 3600e3; c.e = 'retry ' + c.tries; if (c.tries >= 6) { c.id = 'x'; c.e = 'not found'; } }   // v60: 6 tries over ~2 days before "not found"
        return; }   // its videos come on the next turn (keeps each run small)
      const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${c.id}`, { cf: { cacheTtl: 300 } });
      c.last = now; if (!r.ok) { c.e = 'HTTP ' + r.status; return; }
      const { ttl, list } = parseYt((await r.text()).slice(0, 40000));
      if (ttl) c.yt = ttl.slice(0, 60); c.e = ''; c.nv = list.length;
      if (/\s-\sTopic$/.test(ttl)) c.kd = 'tp';                                     // YouTube's own artist channel ("Wizkid - Topic")
      if (c.st === 'c' && ttl && (namesMatch(c.n, ttl) || namesMatch(c.h, ttl))) c.st = 'o';   // name matches → approved automatically
      list.forEach(x => {
        if (have.has(x.v) || now - x.d > 10 * 864e5 || NEWS_BLOCK.test(x.t)) return;
        have.add(x.v); items.push({ v: x.v, t: x.t, d: x.d, ci: c.id, h: c.h || '', n: c.yt || c.n || '', c: c.c || 'fun', k: c.t || '', rg: c.rg || 'global', f: c.f || 0, s: c.st, kd: c.kd || 'o' });
        if (c.fol > 0 && now - x.d < 3 * 3600e3 && !st.ya[c.id]) { st.ya[c.id] = 1; alerts.push({ c, x }); }
      });
    } catch (e) { c.e = String(e.message || e).slice(0, 40); }
  }));
  // keep it light: newest first, max 8 per channel, 10 days, 1,800 videos
  items.sort((a, b) => b.d - a.d); const per = {};
  const kept = items.filter(x => now - x.d < 10 * 864e5 && (per[x.ci] = (per[x.ci] || 0) + 1) <= 8).slice(0, 1800);
  // status of each channel follows its current status (admin may approve/remove later)
  const stOf = {}, kdOf = {}; L.forEach(c => { if (c.id) { stOf[c.id] = c.st; kdOf[c.id] = c.kd || 'o'; } }); kept.forEach(x => { if (stOf[x.ci]) x.s = stOf[x.ci]; x.kd = kdOf[x.ci] || x.kd; });
  st.last = now; await Promise.all([chSave(env, L, st), vidSave(env, kept)]);
  _vidMem = { at: Date.now(), items: kept };
  for (const a of alerts.slice(0, 3)) { try { await sendTopicPush(env, 'yt_' + a.c.id, '📺 ' + (a.c.n || a.c.yt || 'New video'), a.x.t, 'v_' + a.x.v); } catch (e) {} }
  return { checked: pick.length, videos: kept.length };
}
let _vidMem = null;
async function vidsGet(env) { if (_vidMem && Date.now() - _vidMem.at < 90000) return _vidMem.items; _vidMem = { at: Date.now(), items: await vidLoad(env) }; return _vidMem.items; }
async function isAdminUid(env, uid) { const adm = uid && await getDocument(env, 'config/admins'); return !!(adm && (adm.uids || []).includes(uid)); }

async function newsGet(env) { if (_newsMem && Date.now() - _newsMem.at < 90000) return _newsMem.items; const { items } = await newsLoad(env); _newsMem = { at: Date.now(), items }; return items; }

// ---------------- Google sign-in for the helper ----------------
let cachedToken = null, cachedUntil = 0;
function sa(env) { return JSON.parse(env.FIREBASE_SERVICE_ACCOUNT); }
function b64url(buf) {
  const s = typeof buf === 'string' ? btoa(buf) : btoa(String.fromCharCode(...new Uint8Array(buf)));
  return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function accessToken(env) {
  if (cachedToken && Date.now() < cachedUntil) return cachedToken;
  const acc = sa(env);
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: acc.client_email, aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/firebase.messaging https://www.googleapis.com/auth/datastore'
  }));
  const pem = acc.private_key.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const der = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${head}.${claim}`));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${head}.${claim}.${b64url(sig)}`
  });
  const j = await res.json();
  cachedToken = j.access_token; cachedUntil = Date.now() + 50 * 60 * 1000;
  return cachedToken;
}

// ---------------- Firestore (REST) ----------------
function fsBase(env) { return `https://firestore.googleapis.com/v1/projects/${sa(env).project_id}/databases/(default)/documents`; }
function decode(v) {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('timestampValue' in v) return Date.parse(v.timestampValue);
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(decode);
  if ('mapValue' in v) return decodeFields(v.mapValue.fields || {});
  return null;
}
function decodeFields(f) { const o = {}; for (const k in f) o[k] = decode(f[k]); return o; }
async function getDocument(env, path) {
  const r = await fetch(`${fsBase(env)}/${path}`, { headers: { Authorization: `Bearer ${await accessToken(env)}` } });
  if (!r.ok) return null;
  const j = await r.json();
  return decodeFields(j.fields || {});
}
async function patchDocument(env, path, fields) {
  const mask = Object.keys(fields).map(k => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join('&');
  await fetch(`${fsBase(env)}/${path}?${mask}`, {
    method: 'PATCH', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  });
}
async function listDocuments(env, coll, pageSize = 300) {
  const r = await fetch(`${fsBase(env)}/${coll}?pageSize=${pageSize}`, { headers: { Authorization: `Bearer ${await accessToken(env)}` } });
  if (!r.ok) return [];
  const j = await r.json();
  return (j.documents || []).map(d => ({ ...decodeFields(d.fields || {}), id: d.name.split('/').pop() }));
}

async function createDocument(env, coll, fields) {
  const r = await fetch(`${fsBase(env)}/${coll}`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ fields }) });
  return r.ok;
}
const AI_RULES = `You are GG AI, the friendly helper bot inside a squad (a group chat) on SINLESS GG, a free gaming and football community app.
Rules:
- Keep it short: at most 3 sentences and under 80 words. Friendly, positive, a little playful.
- Keep everything clean and suitable for everyone aged 13+. No adult content, no swearing, no insults, no hate, no violence.
- No betting or gambling tips, no medical, legal or money advice, no personal information about anyone.
- Never mention or recommend other apps, websites or social networks.
- For fixtures, schedules and squad rules, answer ONLY from the context given. If it's not in the context, say you don't know and suggest checking the Today's Fixtures board.
- You can give game tips (FC Mobile, eFootball, DLS, Ludo and other games), simple football facts (they may be out of date), and fun banter.
- Answer in the same language the person used.`;
async function askWorkersAi(env, q, context, asker) {
  if (!q) return "Hi! Ask me something like: who do I play today? 😄";
  const messages = [{ role: 'system', content: AI_RULES }, { role: 'user', content: `Context: ${context}\n\n${asker || 'A member'} asks: ${q}` }];
  for (const m of [env.CF_AI_MODEL || '@cf/meta/llama-3.1-8b-instruct-fp8', '@cf/meta/llama-3.2-3b-instruct', '@cf/meta/llama-4-scout-17b-16e-instruct']) {
    try { const r = await env.AI.run(m, { messages, max_tokens: 300, temperature: 0.6 }); const t = String((r && (r.response || (r.result && r.result.response))) || '').trim(); if (t) return t; } catch (e) {}
  }
  return null;
}
async function askGemini(env, q, context, asker) {
  if (!q) return "Hi! Ask me something like: who do I play today? 😄";
  const models = [env.GEMINI_MODEL || 'gemini-flash-latest', 'gemini-2.5-flash'];
  const payload = {
    systemInstruction: { parts: [{ text: AI_RULES }] },
    contents: [{ role: 'user', parts: [{ text: `Context: ${context}\n\n${asker || 'A member'} asks: ${q}` }] }],
    generationConfig: { maxOutputTokens: 400, temperature: 0.6 },
    safetySettings: ['HARM_CATEGORY_HARASSMENT', 'HARM_CATEGORY_HATE_SPEECH', 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'HARM_CATEGORY_DANGEROUS_CONTENT'].map(category => ({ category, threshold: 'BLOCK_LOW_AND_ABOVE' }))
  };
  for (const m of models) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY }, body: JSON.stringify(payload) });
      if (r.status === 404) continue;
      if (!r.ok) return null;
      const j = await r.json();
      const t = (((j.candidates || [])[0] || {}).content || {}).parts;
      const text = (t || []).map(p => p.text || '').join('').trim();
      return text || null;
    } catch (e) { return null; }
  }
  return null;
}

// ---------------- Sending ----------------
async function pushToUser(env, uid, title, body, link, tag) {
  const user = await getDocument(env, `users/${uid}`);
  const tokens = (user && user.fcmTokens) || [];
  if (!tokens.length) return 0;
  const project = sa(env).project_id, bearer = await accessToken(env);
  const alive = [];
  let sent = 0;
  for (const token of tokens.slice(-5)) {
    const r = await fetch(`https://fcm.googleapis.com/v1/projects/${project}/messages:send`, {
      method: 'POST', headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: { token, webpush: { headers: { Urgency: 'high', TTL: '86400' }, data: { title, body, url: link, tag: tag || '' } } } })
    });
    if (r.ok) { sent++; alive.push(token); }
    else if (![400, 404].includes(r.status)) alive.push(token);  // keep tokens that failed for other reasons
  }
  if (alive.length !== tokens.length) {
    await patchDocument(env, `users/${uid}`, { fcmTokens: { arrayValue: { values: alive.map(t => ({ stringValue: t })) } } });
  }
  return sent;
}

const DEFAULT_TEXT = {
  gg: 'GG’d your post 🔥', like: 'GG’d your post 🔥', comment: 'commented on your post', reply: 'replied to you',
  follow: 'started following you', mention: 'mentioned you', squad: 'joined your squad', story: 'liked your story ❤️'
};
async function sendForNotification(env, id, callerUid) {
  const n = await getDocument(env, `notifications/${id}`);
  if (!n || n.pushed || !n.toUid || n.type === 'test') return;
  if (callerUid && n.fromUid && n.fromUid !== callerUid) return;      // only the person who made the alert can ring it
  if (!n.createdAt || Date.now() - n.createdAt > 10 * 60 * 1000) return;   // only fresh ones
  await patchDocument(env, `notifications/${id}`, { pushed: { booleanValue: true } });
  const who = n.fromUser || 'Someone';
  let title = 'Sinless GG', body = `${who} ${n.text || DEFAULT_TEXT[n.type] || 'sent you something'}`;
  if (n.type === 'dm') { title = `💬 ${who}`; body = n.text || 'sent you a message'; }
  if (n.type === 'group') { title = `👥 ${who}`; body = n.text || 'new group message'; }
  if (n.type === 'test') { title = 'Sinless GG'; body = n.text || 'Alerts are working 🎉'; }
  const link = SITE + (n.postId ? `#post=${String(n.postId).replace(/[^\w:\-]/g, "")}` : '');   // posts, DMs, groups, squads, tournaments: opens the exact place
  await pushToUser(env, n.toUid, title, body.slice(0, 160), link, id);
}

// ---------------- Match-day reminders (same schedule maths as the app) ----------------
const DAY = 86400000;
const dayStart = (ms) => { const d = new Date(ms); d.setUTCHours(0, 0, 0, 0); return d.getTime(); };
const isReal = (p) => p && !/^Club_\d+$/.test(p) && !['Open Spot', 'TBD', '__BYE__'].includes(p);
function matchDay(t, m) {
  if (m && m.date) return dayStart(m.date);
  if (!t.startAt) return null;
  const D = Math.round((dayStart(t.endAt || t.startAt) - dayStart(t.startAt)) / DAY) + 1;
  let di;
  if (t.format === 'LEAGUE') {
    const maxR = Math.max(0, ...(t.matches || []).map(x => x.round || 0));
    const n = (t.players || []).length + ((t.players || []).length % 2);
    const R = maxR > 1 ? maxR : Math.max(1, (n - 1) * (t.leagueH2H === '2x' ? 2 : 1));
    if (maxR <= 1 && R > 1) return null;
    const r = m.round || 1;
    if (t.mdDates && t.mdDates[r]) return dayStart(t.mdDates[r]);
    di = R <= 1 || D <= 1 ? 0 : R <= D ? Math.round((r - 1) * (D - 1) / (R - 1)) : Math.min(D - 1, Math.floor((r - 1) * D / R));
  } else {
    const K = Math.max(1, Math.round(Math.log2(Math.max(2, t.maxPlayers || 8))));
    const r = m.round || 1;
    di = r >= K ? D - 1 : Math.min(D - 1, Math.floor((r - 1) * D / K));
  }
  return dayStart(t.startAt) + Math.min(di, D - 1) * DAY;
}
async function matchDayReminders(env) {
  const today = dayStart(Date.now());
  const tours = await listDocuments(env, 'tournaments', 300);
  const per = {};   // gamertag → { n, comps:Set }
  for (const t of tours) {
    if (t.status === 'finished' || !t.startAt) continue;
    for (const m of t.matches || []) {
      if (m.winner && m.status === 'approved') continue;
      if (!isReal(m.p1) || !isReal(m.p2)) continue;
      if (matchDay(t, m) !== today) continue;
      for (const p of [m.p1, m.p2]) {
        const k = p.toLowerCase();
        (per[k] = per[k] || { n: 0, comps: new Set() }).n++;
        per[k].comps.add((t.compName || t.title || 'Tournament').replace(/\s*·\s*Season \d+$/i, ''));
      }
    }
  }
  const list = Object.entries(per).slice(0, 360).map(([tag, info]) => ({ tag, n: info.n, comps: [...info.comps].slice(0, 3) }));
  if (!list.length) return;
  const cfg = await getDocument(env, 'config/push');
  const self = cfg && cfg.url ? String(cfg.url).replace(/\/$/, '') : '';
  if (!self) return sendReminders(env, list.slice(0, 10), today);
  for (let i = 0; i < list.length; i += 8) {
    await fetch(`${self}/remind`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Key': sa(env).private_key_id || '' }, body: JSON.stringify({ list: list.slice(i, i + 8), day: today }) }).catch(() => {});
  }
}

async function sendReminders(env, list, day) {
  for (const it of list) {
    const prof = await getDocument(env, `profiles/${String(it.tag).toLowerCase()}`);
    if (!prof || !prof.uid) continue;
    const comps = (it.comps || []).join(', ');
    await pushToUser(env, prof.uid, '⚽ Match day!', `You have ${it.n} match${it.n > 1 ? 'es' : ''} today${comps ? ': ' + comps : ''}. Good luck!`, SITE, `matchday-${day || ''}`);
  }
}

// ---------------- 🔥 Gaming streak reminders (evening) ----------------
// People who played yesterday but not yet today get: "Your 5-day gaming streak ends tonight!"
async function runQuery(env, structuredQuery) {
  const r = await fetch(`${fsBase(env)}:runQuery`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ structuredQuery }) });
  if (!r.ok) return [];
  const j = await r.json();
  return (j || []).filter(x => x.document).map(x => ({ ...decodeFields(x.document.fields || {}), id: x.document.name.split('/').pop() }));
}
async function streakReminders(env) {
  const y = new Date(Date.now() - DAY).toISOString().slice(0, 10);
  const rows = await runQuery(env, { from: [{ collectionId: 'users' }], where: { fieldFilter: { field: { fieldPath: 'gameDay' }, op: 'EQUAL', value: { stringValue: y } } }, limit: 400 });
  const list = rows.filter(u => (u.gameStreak || 0) >= 1).map(u => ({ uid: u.id, n: u.gameStreak || 1 }));
  if (!list.length) return;
  const cfg = await getDocument(env, 'config/push');
  const self = cfg && cfg.url ? String(cfg.url).replace(/\/$/, '') : '';
  if (!self) return sendStreakReminders(env, list.slice(0, 10));
  for (let i = 0; i < list.length; i += 8) {
    await fetch(`${self}/remindgame`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Key': sa(env).private_key_id || '' }, body: JSON.stringify({ list: list.slice(i, i + 8) }) }).catch(() => {});
  }
}
async function sendStreakReminders(env, list) {
  const day = new Date().toISOString().slice(0, 10);
  for (const it of list) {
    const n = Number(it.n) || 1;
    await pushToUser(env, it.uid, '🔥 Keep your gaming streak!', n > 1 ? `Your ${n}-day gaming streak ends tonight. Play one quick game to keep it!` : 'You played yesterday. Play a quick game today and start a streak!', SITE + '#play', `gstreak-${day}`);
  }
}


// ---------------- 📦 storage helpers ----------------
function b64urlDecode(x) { x = x.replace(/-/g, '+').replace(/_/g, '/'); while (x.length % 4) x += '='; return Uint8Array.from(atob(x), c => c.charCodeAt(0)); }
let gKeys = null, gKeysAt = 0;
// checks the person's Firebase sign-in (an ID token from the app) and returns their uid, or null
async function firebaseUid(req, env) {
  try {
    const m = (req.headers.get('Authorization') || '').match(/^Bearer ([\w-]+\.[\w-]+\.[\w-]+)$/); if (!m) return null;
    const [h, p, s] = m[1].split('.');
    const head = JSON.parse(new TextDecoder().decode(b64urlDecode(h))), pay = JSON.parse(new TextDecoder().decode(b64urlDecode(p)));
    const pid = env.FIREBASE_PROJECT_ID || 'sinlessgg', now = Date.now() / 1000;
    if (head.alg !== 'RS256' || pay.aud !== pid || pay.iss !== `https://securetoken.google.com/${pid}` || !pay.sub || pay.exp < now || pay.iat > now + 300) return null;
    if (!gKeys || Date.now() - gKeysAt > 3600e3) { gKeys = (await (await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')).json()).keys || []; gKeysAt = Date.now(); }
    const jwk = gKeys.find(k => k.kid === head.kid); if (!jwk) return null;
    const key = await crypto.subtle.importKey('jwk', { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: 'RS256', ext: true }, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlDecode(s), new TextEncoder().encode(h + '.' + p));
    return ok ? pay.sub : null;
  } catch (e) { return null; }
}
async function hmacSha1Hex(secret, msg) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  return [...new Uint8Array(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(msg)))].map(b => b.toString(16).padStart(2, '0')).join('');
}
let b2A = null, b2AAt = 0, b2Up = null;
async function b2Auth(env, force) {
  if (!force && b2A && Date.now() - b2AAt < 20 * 3600e3) return b2A;
  const r = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', { headers: { Authorization: 'Basic ' + btoa(env.B2_KEY_ID + ':' + env.B2_APP_KEY) } });
  const j = await r.json(); if (!r.ok) throw new Error(j.message || 'B2 sign-in failed');
  const st = (j.apiInfo && j.apiInfo.storageApi) || j;
  b2A = { apiUrl: st.apiUrl, downloadUrl: st.downloadUrl, token: j.authorizationToken, accountId: j.accountId, allowed: (st.allowed && st.allowed.buckets) || [] }; b2AAt = Date.now(); b2Up = null; b2Bucket = null;
  return b2A;
}
// 🔎 the helper finds the bucket by itself (no need to copy the Bucket ID)
let b2Bucket = null;
async function b2FindBucket(env) {
  if (b2Bucket) return b2Bucket;
  const a = await b2Auth(env), want = (env.B2_BUCKET_NAME || '').toLowerCase();
  let hit = a.allowed.find(b => b && b.id && (!want || String(b.name || '').toLowerCase() === want)) || (a.allowed.length === 1 && a.allowed[0].id ? a.allowed[0] : null);
  if (!hit) {
    const r = await fetch(a.apiUrl + '/b2api/v3/b2_list_buckets', { method: 'POST', headers: { Authorization: a.token, 'Content-Type': 'application/json' }, body: JSON.stringify({ accountId: a.accountId, ...(want ? { bucketName: env.B2_BUCKET_NAME } : {}) }) });
    const j = await r.json().catch(() => ({}));
    const list = (j.buckets || []).map(b => ({ id: b.bucketId, name: b.bucketName }));
    hit = list.find(b => String(b.name).toLowerCase() === want) || (list.length === 1 ? list[0] : null);
  }
  if (!hit && env.B2_BUCKET_ID) hit = { id: env.B2_BUCKET_ID, name: env.B2_BUCKET_NAME };
  if (!hit) throw new Error('B2 bucket not found. Check B2_BUCKET_NAME is the exact bucket name.');
  b2Bucket = { id: hit.id, name: hit.name || env.B2_BUCKET_NAME };
  return b2Bucket;
}
async function b2UploadTarget(env, force) {
  if (!force && b2Up) return b2Up;
  const a = await b2Auth(env), bk = await b2FindBucket(env);
  const r = await fetch(a.apiUrl + '/b2api/v3/b2_get_upload_url?bucketId=' + encodeURIComponent(bk.id), { headers: { Authorization: a.token } });
  const j = await r.json();
  if (r.status === 401) { await b2Auth(env, true); return b2UploadTarget(env, true); }
  if (!r.ok) throw new Error(j.message || 'no upload address');
  b2Up = { url: j.uploadUrl, token: j.authorizationToken };
  return b2Up;
}
async function b2Upload(env, name, type, body) {
  for (let i = 0; i < 3; i++) {
    const t = await b2UploadTarget(env, i > 0);
    const r = await fetch(t.url, { method: 'POST', body, headers: { Authorization: t.token, 'X-Bz-File-Name': name.split('/').map(encodeURIComponent).join('/'), 'Content-Type': type, 'X-Bz-Content-Sha1': 'do_not_verify' } });
    if (r.ok) { const a = await b2Auth(env), bk = await b2FindBucket(env); return `${a.downloadUrl}/file/${bk.name}/${name}`; }
    b2Up = null;
    if (r.status !== 401 && r.status !== 503 && r.status !== 408) { let m = ''; try { m = (await r.json()).message; } catch (e) {} throw new Error(m || 'upload failed ' + r.status); }
  }
  throw new Error('B2 is busy, try again');
}


// ---------------- 🔎 sitemap ----------------
async function buildSitemap(env) {
  const q = (coll, order, n) => runQuery(env, { from: [{ collectionId: coll }], ...(order ? { orderBy: [{ field: { fieldPath: order }, direction: 'DESCENDING' }] } : {}), limit: n }).catch(() => []);
  const [posts, tourns, profiles, squads, adm] = await Promise.all([q('posts', 'createdAt', 2000), q('tournaments', 'createdAt', 500), q('profiles', null, 3000), q('squads', null, 500), getDocument(env, 'config/admins').catch(() => null)]);
  const hideUids = new Set((adm && adm.uids) || []);
  const hideTags = new Set(profiles.filter(p => p.noIndex || p.deleted || hideUids.has(p.uid)).map(p => String(p.gamertag || p.id).toLowerCase()));
  const privSquads = new Set(squads.filter(s => s.isPublic === false).map(s => s.id));
  const ok = (tag, uid) => !hideTags.has(String(tag || '').toLowerCase()) && !hideUids.has(uid);
  const iso = (t) => { const d = new Date(typeof t === 'number' ? t : Date.parse(t || '')); return isNaN(d) ? '' : d.toISOString(); };
  const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const urls = [['https://sinlessgg.com/', '', 'daily', '1.0']];
  posts.filter(p => !p.repostOf && (p.caption || (p.mediaList || []).length) && ok(p.user, p.uid) && !p.hidden && !(p.reportsCount >= 3))
    .forEach(p => urls.push([`https://sinlessgg.com/?p=${encodeURIComponent(p.id)}`, iso(p.createdAt), 'weekly', '0.6']));
  tourns.filter(t => !(t.squadId && privSquads.has(t.squadId)) && ok(t.host, t.hostUid) && !t.deleted)
    .forEach(t => urls.push([`https://sinlessgg.com/?t=${encodeURIComponent(t.id)}`, iso(t.updatedAt || t.createdAt), 'daily', '0.8']));
  profiles.filter(p => p.gamertag && ok(p.gamertag, p.uid))
    .forEach(p => urls.push([`https://sinlessgg.com/?u=${encodeURIComponent(String(p.gamertag).replace('@', ''))}`, iso(p.lastSeen), 'weekly', '0.5']));
  squads.filter(s => s.isPublic !== false && !s.isOfficial)
    .forEach(s => urls.push([`https://sinlessgg.com/?s=${encodeURIComponent(s.id)}`, iso(s.createdAt), 'weekly', '0.5']));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.slice(0, 45000).map(([loc, lm, cf, pr]) => `  <url><loc>${esc(loc)}</loc>${lm ? `<lastmod>${lm}</lastmod>` : ''}<changefreq>${cf}</changefreq><priority>${pr}</priority></url>`).join('\n') + '\n</urlset>\n';
}


// =====================================================================
// 🤫 v59 CONFESSION ROOM helpers
// • confessAlert: "💬 Someone replied to your confession" (max one alert per confession every 20 min)
// • confessRun (every 5 min): one fresh "Today's question" a day + GG AI replies (clearly labelled 🧠 GG AI)
// Nobody's name is ever written on a confession. Only confessOwners (locked, admin-only) links a post to its writer.
// =====================================================================
async function confessAlert(env, cid, fromUid) {
  const own = await getDocument(env, `confessOwners/${cid}`); if (!own || !own.uid || own.uid === fromUid) return;
  if (own.lastAlert && Date.now() - own.lastAlert < 20 * 60000) return;
  await patchDocument(env, `confessOwners/${cid}`, { lastAlert: { integerValue: String(Date.now()) } });
  await createDocument(env, 'notifications', { toUid: { stringValue: own.uid }, fromUid: { stringValue: 'confess' }, fromUser: { stringValue: 'Confession Room' }, type: { stringValue: 'confess' },
    postId: { stringValue: 'confess:' + cid }, text: { stringValue: '💬 Someone replied to your confession' }, read: { booleanValue: false }, createdAt: { timestampValue: new Date().toISOString() } });
  await pushToUser(env, own.uid, '🤫 Confession Room', '💬 Someone replied to your confession', 'https://sinlessgg.com/#confess=' + cid, 'cf_' + cid).catch(() => {});
}
async function aiText(env, system, user, max) {
  if (env.GEMINI_API_KEY) {
    for (const m of [env.GEMINI_MODEL || 'gemini-flash-latest', 'gemini-2.5-flash']) {
      try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
          body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: user }] }], generationConfig: { maxOutputTokens: max || 200, temperature: 0.9 },
            safetySettings: ['HARM_CATEGORY_HARASSMENT', 'HARM_CATEGORY_HATE_SPEECH', 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'HARM_CATEGORY_DANGEROUS_CONTENT'].map(category => ({ category, threshold: 'BLOCK_LOW_AND_ABOVE' })) }) });
        if (r.status === 404) continue; if (!r.ok) break;
        const j = await r.json(), t = ((((j.candidates || [])[0] || {}).content || {}).parts || []).map(p => p.text || '').join('').trim(); if (t) return t; break;
      } catch (e) { break; }
    }
  }
  if (env.AI) {
    for (const m of ['@cf/meta/llama-3.1-8b-instruct-fp8', '@cf/meta/llama-3.2-3b-instruct']) {
      try { const r = await env.AI.run(m, { messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: max || 200, temperature: 0.9 }); const t = String((r && (r.response || (r.result && r.result.response))) || '').trim(); if (t) return t; } catch (e) {}
    }
  }
  return null;
}
const CF_SEED_Q = ['Confess the worst rage-quit you have ever done 🎮', 'What game do you pretend to be good at? 😅', 'Confess your most embarrassing football moment ⚽', 'What song do you secretly love but never admit? 🎵',
  'Confess something you did in school that nobody knows 📚', 'Who was your first gaming rival and did you ever beat them? 🏆', 'What is the pettiest reason you stopped talking to someone? 😂', 'Confess a time you blamed lag when it was really you 📶',
  'What is your guilty pleasure TV show or anime? 📺', 'Confess the most money you wasted on a game 💸', 'What is a small thing that makes your whole day better? ☀️', 'Confess your worst cooking disaster 🍳',
  'What did you believe as a kid that was totally wrong? 🤯', 'Confess the longest you stayed up gaming 🌙', 'What is the funniest lie you told your parents? 🙊', 'Confess a team you secretly support 🤫',
  'What is a skill you wish you had? ✨', 'Confess your most dramatic group chat moment 💬', 'What is the weirdest food combo you love? 🍟', 'Confess a time you were too shy to talk to your crush 💔',
  'What is a goal you are quietly working on? 🎯', 'Confess the silliest thing you got angry about this week 😤', 'What fictional character are you most like? 🦸', 'Confess the worst haircut you ever had 💇'];
async function confessRun(env) {
  const sw = await getDocument(env, 'config/switches').catch(() => null); if (sw && sw.confess === false) return;
  const now = Date.now(), day = new Date().toISOString().slice(0, 10), cfg = (await getDocument(env, 'config/confess').catch(() => null)) || {};
  // 1) today's question (once a day, after 07:00 UTC)
  if (cfg.qday !== day && new Date().getUTCHours() >= 7) {
    let used = []; try { used = JSON.parse(cfg.used || '[]'); } catch (e) {}
    let q = (await aiText(env, 'You write ONE short, fun, safe question for an anonymous confession wall on SINLESS GG, a worldwide gaming, football and fun community. It must invite people to confess something light: gaming, football, music, movies, school, food, friends or everyday life. Max 110 characters. One emoji at the end. No names, no brands of alcohol or drugs, nothing sexual, nothing about self-harm, nothing political. Reply with the question only.', 'Write today\'s question. Do not repeat any of these: ' + used.slice(-40).join(' | '), 80) || '').split('\n')[0].replace(/^["“\s]+|["”\s]+$/g, '').slice(0, 140);
    if (!q || q.length < 12 || used.some(u => u.toLowerCase() === q.toLowerCase())) q = CF_SEED_Q.find(x => !used.includes(x)) || CF_SEED_Q[Math.floor(now / 864e5) % CF_SEED_Q.length];
    used.push(q);
    await patchDocument(env, 'confessions/q' + day.replace(/-/g, '') + 'sgdaily', { text: { stringValue: q }, mood: { stringValue: 'q' }, at: { integerValue: String(now) }, likes: { integerValue: '0' }, replies: { integerValue: '0' }, reports: { integerValue: '0' }, sys: { booleanValue: true }, ai: { booleanValue: true } });
    await patchDocument(env, 'config/confess', { qday: { stringValue: day }, used: { stringValue: JSON.stringify(used.slice(-120)) } });
  }
  // 2) GG AI replies to new confessions (max 2 a run, after 3 minutes so people can reply first)
  if (sw && sw.ai === false) return;
  const rows = await runQuery(env, { from: [{ collectionId: 'confessions' }], orderBy: [{ field: { fieldPath: 'at' }, direction: 'DESCENDING' }], limit: 15 });
  let n = 0;
  for (const c of rows) {
    if (n >= 2) break; if (c.ai || c.sys || (c.reports || 0) >= 3 || now - (c.at || 0) < 3 * 60000 || now - (c.at || 0) > 2 * 864e5) continue;
    n++;
    await patchDocument(env, `confessions/${c.id}`, { ai: { booleanValue: true } });
    const t = await aiText(env, 'You are GG AI, the friendly bot of the anonymous Confession Room on SINLESS GG (a worldwide gaming and football community). Reply to the confession in ONE or TWO short sentences, like a fun, kind friend. Be warm, playful or supportive. Never judge harshly, never ask for names, photos or personal details, never guess who wrote it. If it mentions self-harm, suicide, abuse or danger, reply with care and encourage them to talk to someone they trust or a local helpline. Nothing sexual. Reply with the message only.', 'Confession: ' + String(c.text || '').slice(0, 900), 120);
    if (!t) continue;
    await patchDocument(env, `confessions/${c.id}/comments/gga${c.id}`, { text: { stringValue: t.slice(0, 400) }, alias: { stringValue: '🧠 GG AI' }, op: { booleanValue: false }, ai: { booleanValue: true }, at: { integerValue: String(Date.now()) }, reports: { integerValue: '0' } });
    await patchDocument(env, `confessions/${c.id}`, { replies: { integerValue: String((c.replies || 0) + 1) } });
  }
}


// =====================================================================
// ⭐ v60 SERVER-SIDE XP — the phone only says WHAT happened; the worker decides the points.
// Each action has a fair amount and a daily limit, plus a total limit per day, so nobody can cheat their level.
// =====================================================================
const XP_SERVER = { daily: [5, 1], post: [20, 5], comment: [5, 10], gg: [1, 20], predict: [3, 20], lounge: [1, 20], live: [30, 2], story: [10, 3], poll: [2, 10], share: [2, 10], tournament: [10, 5], follow: [2, 10],
  chat: [1, 40], react: [1, 30], watch: [2, 30], quiz: [10, 5], game: [5, 30], win: [20, 10], challenge: [100, 6], invite: [50, 5], streak: [10, 1], read: [2, 20], confess: [2, 10],
  quest: [300, 3], news: [1, 30], clip: [1, 40], time: [1, 30], play: [1, 30] };
const XP_DAY_MAX = 1500;
async function xpGrant(env, uid, events) {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, ''), key = `xpDay/${uid}_${day}`;
  const d = (await getDocument(env, key).catch(() => null)) || {}; let used = {}; try { used = JSON.parse(d.used || '{}'); } catch (e) {}
  let total = used._t || 0, add = 0;
  for (const e of events) {
    const r = String((e && e.r) || '').replace(/[^\w]/g, '').slice(0, 20) || 'other', want = Math.max(0, Math.floor(Number(e && e.n) || 0));
    const known = XP_SERVER[r], [per, cap] = known || [2, 10];
    if ((used[r] || 0) >= cap || !want) continue;
    const n = Math.min(want, known ? per * (r === 'challenge' || r === 'quest' ? 1 : 2) : per, XP_DAY_MAX - total); if (n <= 0) break;
    used[r] = (used[r] || 0) + 1; total += n; add += n;
  }
  if (!add) return { added: 0 };
  used._t = total;
  const rows = await runQuery(env, { from: [{ collectionId: 'profiles' }], where: { fieldFilter: { field: { fieldPath: 'uid' }, op: 'EQUAL', value: { stringValue: uid } } }, limit: 1 });
  const prof = rows[0]; if (!prof) return { added: 0, error: 'no profile' };
  await patchDocument(env, key, { used: { stringValue: JSON.stringify(used) }, at: { integerValue: String(Date.now()) } });
  const name = `projects/${sa(env).project_id}/databases/(default)/documents/profiles/${prof.id}`;
  await fetch(`${fsBase(env)}:commit`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes: [{ transform: { document: name, fieldTransforms: [{ fieldPath: 'xp', increment: { integerValue: String(add) } }] } }] }) });
  return { added: add, xp: (Number(prof.xp) || 0) + add };
}

// =====================================================================
// ⚽ v60 GOAL ALERTS — big matches only, sent to everyone who has match alerts on (topic "n_goals"), even with the app closed.
// Uses ESPN's public scoreboard; max 8 matches a day so nobody gets spammed.
// =====================================================================
// G18: big matches = kick-off, every goal and full time, to everyone with alerts on (on by default once notifications are allowed)
const GOAL_LEAGUES = ['uefa.champions', 'uefa.europa', 'eng.1', 'esp.1', 'ita.1', 'ger.1', 'fra.1', 'fifa.world', 'caf.nations', 'caf.champions'];
const GOAL_ALWAYS = /^(uefa\.champions|fifa\.world|caf\.nations)$/;
const GOAL_BIG = /arsenal|chelsea|liverpool|manchester|man utd|man city|tottenham|newcastle|real madrid|barcelona|atl[eé]tico|bayern|dortmund|leverkusen|juventus|inter|milan|napoli|roma|psg|paris saint|marseille|monaco|benfica|porto|sporting|ajax|celtic|galatasaray|al ahly|zamalek|mamelodi|esp[eé]rance|wydad|raja/i;
async function goalsRun(env) {
  const h = new Date().getUTCHours(); if (h < 10 && h > 3) return 0;          // no football in the quiet hours (UTC 04–09)
  const day = new Date().toISOString().slice(0, 10), st0 = (await getDocument(env, 'config/goalAlerts').catch(() => null)) || {};
  let st = {}; try { st = JSON.parse(st0.json || '{}'); } catch (e) {}
  if (st.day !== day) st = { day, m: {}, n: 0 };
  let liveAny = 0;
  const boards = await Promise.all(GOAL_LEAGUES.map(lg => fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg}/scoreboard`, { cf: { cacheTtl: 60 } }).then(r => r.ok ? r.json() : null).catch(() => null)));
  const pushes = [];
  boards.forEach((j, i) => {
    const lg = GOAL_LEAGUES[i];
    ((j && j.events) || []).forEach(ev => {
      const c = ((ev.competitions || [])[0] || {}), cs = c.competitors || [], st8 = ((ev.status || {}).type || {}).state;
      if (st8 !== 'in' && st8 !== 'post') return;
      const hm = cs.find(x => x.homeAway === 'home') || cs[0], aw = cs.find(x => x.homeAway === 'away') || cs[1]; if (!hm || !aw) return;
      const hn = (hm.team || {}).shortDisplayName || (hm.team || {}).displayName || 'Home', an = (aw.team || {}).shortDisplayName || (aw.team || {}).displayName || 'Away';
      const big = GOAL_ALWAYS.test(lg) || GOAL_BIG.test(hn + ' ' + an + ' ' + ((hm.team || {}).displayName || '') + ' ' + ((aw.team || {}).displayName || ''));
      if (!big) return;
      if (st8 === 'in') liveAny = 1;
      const sc = `${hm.score || 0}-${aw.score || 0}`, prev = st.m[ev.id];
      const clk = parseInt(((ev.status || {}).displayClock || '').replace(/[^0-9]/g, ''), 10);
      if (!prev) { if (st.n >= 10 || st8 !== 'in') return; st.n++; st.m[ev.id] = { s: sc }; if (sc === '0-0' && !(clk > 12)) pushes.push(['🔥 Big match kick-off', `${hn} vs ${an} has started. Follow it live on SINLESS GG`, ev.id + 'ko']); return; }   // G18: first time we see it near the start: kick-off alert (later: just remember it)
      if (st8 === 'post' && !prev.ft) { prev.ft = 1; prev.s = sc; pushes.push(['🏁 Full time', `${hn} ${sc.replace('-', '–')} ${an}`, ev.id + 'ft']); return; }   // G18: full-time alert
      if (prev.s === sc || st8 !== 'in') { prev.s = sc; return; }
      const [h1, a1] = prev.s.split('-').map(Number), [h2, a2] = sc.split('-').map(Number); prev.s = sc;
      if (h2 + a2 <= h1 + a1) return;                                                  // only when a goal is added (not VAR take-backs)
      const who = h2 > h1 ? hn : an, clock = ((ev.status || {}).displayClock || '').replace(/\s/g, '');
      pushes.push(['⚽ GOAL! ' + who, `${hn} ${h2}–${a2} ${an}${clock ? ' · ' + clock : ''}`, ev.id]);
    });
  });
  for (const [t, b, id] of pushes.slice(0, 6)) await sendGoalPush(env, t, b, id).catch(() => {});
  await patchDocument(env, 'config/goalAlerts', { json: { stringValue: JSON.stringify(st) }, at: { integerValue: String(Date.now()) } });
  return liveAny;
}
async function sendGoalPush(env, title, body, id) {
  const project = sa(env).project_id;
  await fetch(`https://fcm.googleapis.com/v1/projects/${project}/messages:send`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: { topic: 'n_goals', webpush: { headers: { Urgency: 'high', TTL: '1800' }, data: { title: String(title).slice(0, 60), body: String(body).slice(0, 160), url: SITE + '#scores', tag: 'goal_' + id } } } }) });
}
/* =====================================================================
   ⚽ 11 WONDERS · shared core (G2 + G3a + G3b + G4). build.sh pastes this SAME block into w11.js and worker.js,
   so phones and the worker always agree. Only + - * / and sqrt are used for anything that decides
   a result, so every phone (Android or iPhone) gets exactly the same numbers.
   ===================================================================== */
const W11C = (() => {
const WORLD = 'w11s1';
const hash = (s) => { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
const rng = (seed) => { let s = (seed >>> 0) || 0x9e3779b9; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; };
const pick = (r, a) => a[Math.floor(r() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* 🌍 people from everywhere (made-up combinations) */
const CULT = {
  gh: ['🇬🇭', 'Kwame Kofi Kojo Yaw Kwabena Kwaku Ebo Nana Fiifi Kwasi Selorm Elikem Atta Nii', 'Mensah Asante Boateng Owusu Appiah Osei Danso Addo Quaye Tetteh Agyeman Ofori Amoah Sarpong'],
  ng: ['🇳🇬', 'Chidi Emeka Tunde Segun Ifeanyi Uche Femi Kelechi Obinna Musa Sani Dayo Nnamdi Ayo', 'Okafor Adeyemi Okonkwo Balogun Eze Bello Adebayo Nwosu Ogunleye Ibrahim Afolabi Chukwu Danjuma'],
  ea: ['🇰🇪', 'Kamau Otieno Baraka Juma Mwangi Kiptoo Odhiambo Wanjala Hassani Amani Tumaini Kibet', 'Kariuki Omondi Mutua Wafula Kiprono Njoroge Achieng Mbwana Okello Ssempijja Kimani Barasa'],
  za: ['🇿🇦', 'Thabo Sipho Bongani Lwazi Mandla Tshepo Kagiso Sibusiso Lerato Themba Andile Jabu', 'Nkosi Dlamini Khumalo Mokoena Ndlovu Zulu Mahlangu Sithole Molefe Mthembu Radebe Mabaso'],
  fr: ['🇸🇳', 'Moussa Ousmane Ibrahima Mamadou Cheikh Abdoulaye Idrissa Pape Souleymane Lamine Youssouf Alioune', 'Diallo Ndiaye Diop Sow Traoré Koné Camara Cissé Fall Sarr Keita Baldé Touré'],
  ar: ['🇲🇦', 'Youssef Omar Karim Hamza Rayan Bilal Anas Tariq Samir Nabil Adel Zakaria Mehdi Walid', 'El Amrani Haddad Benali Mansour Saleh Rahimi Bakri Najjar Aziz Farouk Hamdi Sabri Kassem'],
  cn: ['🇨🇳', 'Wei Jun Hao Lei Tao Yang Peng Bo Chen Long Ming Rui Kai Zhen', 'Wang Li Zhang Liu Chen Zhao Huang Zhou Wu Xu Sun Ma Zhu Hu'],
  jp: ['🇯🇵', 'Haruto Ren Sota Yuto Kaito Riku Takumi Daiki Kenta Shota Yuki Ryo Kazuki Hiroshi', 'Sato Suzuki Takahashi Tanaka Watanabe Ito Nakamura Kobayashi Yamamoto Kato Yoshida Yamada'],
  kr: ['🇰🇷', 'Min-jun Seo-jun Do-yun Ji-ho Ha-jun Joon-young Hyun-woo Sung-min Jae-won Tae-yang', 'Kim Lee Park Choi Jung Kang Cho Yoon Jang Lim Han Shin'],
  in: ['🇮🇳', 'Arjun Rohan Vikram Aditya Rahul Karan Siddharth Aarav Ishaan Kabir Varun Nikhil Dev Harsh', 'Sharma Patel Singh Reddy Nair Gupta Iyer Rao Das Mehta Chopra Bose Pillai Verma'],
  en: ['🏴', 'Jack Harry Oliver George Charlie Alfie Mason Ethan Leo Jacob Callum Ryan Lewis Kyle', 'Smith Walker Hughes Turner Clarke Wright Baker Hall Green Cooper Ward Bennett Price Morris'],
  es: ['🇪🇸', 'Pablo Diego Javier Sergio Álvaro Hugo Mario Raúl Iker Adrián Marcos Rubén Dani Gonzalo', 'García Fernández López Martínez Sánchez Romero Navarro Torres Ruiz Moreno Ortega Delgado Castro'],
  pt: ['🇧🇷', 'João Pedro Lucas Gabriel Rafael Thiago Matheus Bruno Felipe Vinícius Caio Rodrigo Igor Davi', 'Silva Santos Oliveira Souza Costa Pereira Almeida Ferreira Ribeiro Carvalho Gomes Martins Rocha'],
  it: ['🇮🇹', 'Luca Marco Matteo Alessandro Davide Lorenzo Federico Andrea Simone Riccardo Nicolò Gianluca', 'Rossi Russo Ferrari Esposito Bianchi Romano Colombo Ricci Marino Greco Bruno Gallo Conti'],
  de: ['🇩🇪', 'Lukas Leon Jonas Felix Paul Maximilian Niklas Tim Jan Moritz Elias Finn Tobias Florian', 'Müller Schmidt Schneider Fischer Weber Wagner Becker Hoffmann Koch Richter Wolf Krüger Braun'],
  nl: ['🇳🇱', 'Daan Sem Thijs Bram Lars Ruben Jesse Niels Stijn Joris Wouter Milan', 'de Jong Jansen de Vries van Dijk Bakker Visser Smit Meijer de Boer Mulder Dekker Vos'],
  ee: ['🇵🇱', 'Jakub Kacper Mateusz Filip Szymon Michał Dominik Aleksander Igor Nikola Luka Marko', 'Kowalski Nowak Wiśniewski Petrović Novak Horvat Popescu Ionescu Kovač Dvořák Ivanov Babić'],
  la: ['🇲🇽', 'Santiago Mateo Sebastián Emiliano Nicolás Joaquín Benjamín Tomás Agustín Facundo Bruno Lautaro', 'Hernández González Rodríguez Gómez Díaz Morales Vargas Rojas Herrera Medina Aguilar Ramos'],
  ca: ['🇯🇲', 'Jamal Andre Shane Dwayne Kemar Damion Tyrone Marlon Rohan Akeem Romario Jermaine', 'Campbell Brown Williams Thompson Grant Clarke Francis Barrett Bailey Reid Powell Morgan'],
  tr: ['🇹🇷', 'Emre Burak Mert Can Arda Kerem Oğuz Serkan Hakan Barış Yusuf Ozan', 'Yılmaz Kaya Demir Şahin Çelik Aydın Öztürk Arslan Doğan Kılıç Aslan Kurt'],
};
const CULT_KEYS = Object.keys(CULT);
const CULT_W = { gh: 3, ng: 3, ea: 2, za: 2, fr: 2, ar: 2, cn: 1.5, jp: 1.5, kr: 1, in: 1.5, en: 2, es: 2, pt: 2, it: 1.5, de: 1.5, nl: 1, ee: 1.5, la: 2, ca: 1.5, tr: 1 };
const pickCult = (r) => { const tot = CULT_KEYS.reduce((a, k) => a + CULT_W[k], 0); let x = r() * tot; for (const k of CULT_KEYS) { x -= CULT_W[k]; if (x <= 0) return k; } return 'gh'; };
const CITY = 'Accra Kumasi Tamale Takoradi Lagos Ibadan Enugu Kano Abuja Nairobi Mombasa Kampala Dar Lusaka Harare Durban Soweto Dakar Abidjan Douala Casablanca Tunis Cairo Alexandria Doha Riyadh Mumbai Pune Delhi Chennai Osaka Nagoya Busan Seoul Shanghai Wuhan Manila Jakarta Bangkok Hanoi Lisbon Porto Seville Valencia Bilbao Naples Turin Genoa Lyon Marseille Lille Hamburg Cologne Bremen Leipzig Rotterdam Utrecht Antwerp Ghent Krakow Zagreb Belgrade Bucharest Istanbul Izmir Ankara Kingston Montego Bogota Medellin Lima Quito Santiago Rosario Recife Salvador Fortaleza Monterrey Guadalajara Leeds Bristol Glasgow Cardiff Belfast Dublin Oslo Malmo Aarhus'.split(' ');
const SUFFIX = 'FC United City Stars Rovers Athletic Lions Eagles Falcons Warriors Rangers Dynamos Wanderers Strikers Sharks Titans Comets Royals Phoenix Hornets'.split(' ');
const POS_TEMPLATE = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'GK', 'DEF', 'DEF', 'MID', 'MID', 'FWD', 'FWD'];
const NUMS = [1, 2, 4, 5, 3, 6, 8, 10, 7, 9, 11, 13, 15, 16, 14, 18, 19, 20];

const club = function (idx) {
  const r = rng(hash(WORLD + ':club:' + idx));
  if (idx >= 100000) { const b = 47 + Math.floor(r() * 9); return { idx, tier: 6, name: 'My Club', short: 'MYC', hue: Math.floor(r() * 360), base: b, user: true }; }
  const tier = idx < 14 ? 1 : idx < 42 ? 2 : idx < 98 ? 3 : idx < 210 ? 4 : idx < 434 ? 5 : 6;
  const name = pick(r, CITY) + ' ' + pick(r, SUFFIX);
  const hue = Math.floor(r() * 360);
  return { idx, tier, name, short: name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase(), hue, base: [78, 72, 67, 62, 57, 52][tier - 1] + Math.floor(r() * 6) };
};
const attrs = (r, pos, ovr) => {
  const a = (bias) => clamp(Math.round(ovr + bias + (r() - 0.5) * 14), 25, 99);
  return pos === 'GK' ? { pac: a(-18), sho: a(-35), pas: a(-12), dri: a(-25), def: a(-10), gk: a(4) }
    : pos === 'DEF' ? { pac: a(-2), sho: a(-18), pas: a(-5), dri: a(-10), def: a(6), gk: 20 }
    : pos === 'MID' ? { pac: a(0), sho: a(-4), pas: a(6), dri: a(4), def: a(-6), gk: 20 }
    : { pac: a(5), sho: a(7), pas: a(-3), dri: a(4), def: a(-22), gk: 20 };
};
/* G8 legal check: a random first + last name must never spell a real footballer (found by the name audit: tests/g8_names.mjs).
   Same random numbers are used, so every other player stays exactly the same; a clash just takes the next surname. */
const REAL_NAMES = new Set(['kyle walker', 'thiago silva']);
const named = (r) => { const cult = pickCult(r), C = CULT[cult], L = C[2].split(' '), first = pick(r, C[1].split(' ')); let li = Math.floor(r() * L.length); if (REAL_NAMES.has((first + ' ' + L[li]).toLowerCase())) li = (li + 1) % L.length; const last = L[li]; return { cult, flag: C[0], name: first + ' ' + last, short: last.length > 11 ? last.slice(0, 10) + '.' : last }; };
/* the original G1 player (season 1) — must never change */
const base = function (id) {
  const [ci, slot] = String(id).split('-').map(Number), c = club(ci), r = rng(hash(WORLD + ':p:' + id));
  const nm = named(r), pos = POS_TEMPLATE[slot] || 'MID';
  const age = 16 + Math.floor(Math.pow(r(), 0.8) * 20);
  const peak = 1 - Math.abs(age - 27) / 22;
  let ovr = Math.round(c.base - 6 + r() * 14 + peak * 6 + (slot < 11 ? 3 : -3) + (r() < 0.06 ? 8 : 0));
  ovr = clamp(ovr, 40, 95);
  return { id, ci, slot, ...nm, pos, age, ovr, ...attrs(r, pos, ovr), num: NUMS[slot] || slot + 1 };
};
/* 🧒 a 17-year-old who takes the place of a retired player */
const youth = function (id, gid) {
  const [ci, slot] = String(id).split('-').map(Number), c = club(ci), r = rng(hash(WORLD + ':y:' + gid));
  const nm = named(r), pos = POS_TEMPLATE[slot] || 'MID';
  const ovr = clamp(Math.round(c.base - 11 + r() * 12 + (r() < 0.08 ? 8 : 0)), 40, 95);
  return { id, ci, slot, ...nm, pos, age: 17, ovr, ...attrs(r, pos, ovr), num: NUMS[slot] || slot + 1 };
};
const grow = (y) => y < 21 ? 4 : y < 24 ? 3 : y < 27 ? 1 : y < 30 ? 0 : y < 32 ? -1 : y < 34 ? -2 : -3;
/* 🎂 1 season = 1 year: players improve until ~27, drop after ~31, retire at 34–37 */
const oplayer = function (id, S) {
  S = Math.max(1, Math.floor(S || 1));
  let p = base(id); if (S === 1) return p;
  let s = 1, a0 = p.age, g = 0, gid = String(id);
  for (let guard = 0; guard < 40; guard++) {
    const R = 34 + hash(gid + ':ret') % 4;
    if (a0 + (S - s) <= R) break;
    s = Math.max(s + 1, s + (R - a0) + 1); g++; gid = id + '~' + g; p = youth(id, gid); a0 = 17;
    if (s > S) break;
  }
  const age = a0 + (S - s), pot = clamp(p.ovr + 4 + hash(gid + ':pot') % 16, p.ovr, 94); let d = 0;
  for (let y = a0; y < age; y++) { const st = grow(y) + (hash(gid + ':g' + y) % 3) - 1; d += st > 0 ? Math.max(0, Math.min(st, pot - p.ovr - d)) : st; }
  const sh = (v) => clamp(v + d, 25, 99);
  return { ...p, gid, gen: g, age, ovr: clamp(p.ovr + d, 40, 97), pac: sh(p.pac), sho: sh(p.sho), pas: sh(p.pas), dri: sh(p.dri), def: sh(p.def), gk: p.pos === 'GK' ? sh(p.gk) : p.gk };
};
/* ===== G3a: new kinds of players (their ID says everything about them) =====
   a{S}x{slot}x{n}  = player sold in the market (born in season S)
   y{S}x{club}x{k}  = one of the 15 youngsters a club sees in its youth draft in season S
   L{S}x{no}        = the 150-OVR wonder given to Pioneer #no (1–50). Only 50 can ever exist. */
const NEW_RE = /^([aybLw])(\d+)x(\d+)(?:x(\d+))?$/;
const isNew = (id) => NEW_RE.test(String(id));
const POS15 = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'FWD', 'GK'];
const LEG_POS = ['FWD', 'MID', 'FWD', 'DEF', 'MID', 'FWD', 'MID', 'DEF', 'FWD', 'GK'];
const LEGEND_OVR = 150, MAX_SQUAD = 25, MIN_SQUAD = 16, PLAYABLE = 18, PIONEERS = 50;
const legAttrs = (r, pos) => {
  const v = (x) => Math.round(x + (r() - 0.5) * 8);
  return pos === 'GK' ? { pac: v(80), sho: v(55), pas: v(100), dri: v(80), def: v(110), gk: v(140) }
    : pos === 'DEF' ? { pac: v(110), sho: v(90), pas: v(115), dri: v(105), def: v(140), gk: 20 }
    : pos === 'MID' ? { pac: v(110), sho: v(125), pas: v(140), dri: v(135), def: v(100), gk: 20 }
    : { pac: v(115), sho: v(140), pas: v(118), dri: v(138), def: v(70), gk: 20 };
};
/* G12 market lots ('b'): any position, picked from the lot (not the slot) */
const POSB = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'FWD'];
const posOfNew = (m) => m[1] === 'L' ? LEG_POS[Number(m[3]) % 10] : (m[1] === 'b' || m[1] === 'w') ? POSB[hash('pb:' + m[0]) % 16] : POS15[Number(m[1] === 'a' ? m[3] : m[4]) % 15];
/* the player as he is in his first season (g = 0), or the 17-year-old who replaces him after he retires (g > 0) */
const nbase = function (id, gid, g) {
  const m = NEW_RE.exec(id), k = m[1], r = rng(hash(WORLD + ':n:' + gid)), nm = named(r), pos = posOfNew(m), num = 21 + hash(gid + ':num') % 70;
  if (g > 0) { const ovr = 45 + Math.floor(r() * 16); return { id, k, ...nm, pos, age: 17, ovr, pot: clamp(ovr + 8 + Math.floor(r() * 16), ovr, 88), wk: false, ...attrs(r, pos, ovr), num }; }
  if (k === 'L') return { id, k, ...nm, pos, age: 16 + Number(m[3]) % 2, ovr: LEGEND_OVR, pot: LEGEND_OVR, wk: true, legend: true, ...legAttrs(r, pos), num: pos === 'GK' ? 1 : [7, 10, 9, 11, 8][Number(m[3]) % 5] };
  let age, ovr, pot, wk = false;
  if (k === 'y') {
    const sc = Number(m[4]) >= 15;
    age = 15 + Math.floor(r() * 3); wk = r() < (sc ? 0.25 : 0.05);
    ovr = wk ? 60 + Math.floor(r() * 10) : (sc ? 50 : 42) + Math.floor(r() * (sc ? 14 : 19));
    pot = wk ? 90 + Math.floor(r() * 8) : clamp(ovr + 10 + Math.floor(r() * 19), ovr, sc ? 90 : 86);
  } else {
    age = 16 + Math.floor(r() * 17); const x = r();
    ovr = x < 0.22 ? 48 + Math.floor(r() * 12) : x < 0.52 ? 60 + Math.floor(r() * 10) : x < 0.8 ? 70 + Math.floor(r() * 10) : x < 0.95 ? 80 + Math.floor(r() * 8) : 88 + Math.floor(r() * 6);
    if (age <= 20) ovr = Math.min(ovr, 50 + (age - 16) * 6);
    if (age <= 19 && r() < 0.05) { wk = true; ovr = 66 + Math.floor(r() * 11); }
    pot = wk ? 91 + Math.floor(r() * 7) : age < 27 ? clamp(ovr + 3 + Math.floor(r() * 14), ovr, 94) : ovr;
  }
  if (k === 'b') return bplayer(id, k, nm, pos, r, num);
  if (k === 'w') return wplayer(id, k, nm, pos, r, num);
  return { id, k, ...nm, pos, age, ovr, pot, wk, ...attrs(r, pos, ovr), num };
};
/* G12: market players with heavy variety: every age 16–35, OVR 42–93, and a profile that makes him special
   (a sprinter, a pure finisher, a passer, a dribbler, a rock at the back...), not just 'good at everything a bit' */
const B_PROF = { GK: [{ gk: 8, pas: -6 }, { pas: 12, pac: 6, gk: -2 }, { gk: 4, def: 6 }],
  DEF: [{ def: 9, pac: -6 }, { pac: 14, def: -2, dri: 4 }, { pas: 12, def: 2 }, { def: 5, sho: 10 }, { dri: 10, pac: 8, def: -4 }],
  MID: [{ pas: 12, def: -4 }, { def: 10, pas: 4, sho: -8 }, { sho: 12, pas: -2 }, { dri: 12, pac: 6, def: -8 }, { pac: 12, pas: 3 }, { pas: 6, def: 6, pac: 4, sho: -6 }],
  FWD: [{ sho: 12, pac: -4, pas: -6 }, { pac: 16, sho: 2, pas: -6 }, { dri: 13, sho: 4 }, { pas: 10, dri: 4, sho: -2 }, { sho: 6, def: 8, pac: -6 }] };
const bplayer = function (id, k, nm, pos, r, num) {
  const age = 16 + Math.floor(r() * 20), x = r();
  let ovr = x < 0.18 ? 42 + Math.floor(r() * 12) : x < 0.45 ? 54 + Math.floor(r() * 10) : x < 0.72 ? 64 + Math.floor(r() * 10) : x < 0.9 ? 74 + Math.floor(r() * 9) : x < 0.98 ? 83 + Math.floor(r() * 6) : 89 + Math.floor(r() * 5);
  if (age <= 19) ovr = Math.min(ovr, 50 + (age - 16) * 7); if (age >= 33) ovr = Math.max(48, ovr - (age - 32) * 2);
  let wk = false; if (age <= 19 && r() < 0.07) { wk = true; ovr = 64 + Math.floor(r() * 12); }
  const pot = wk ? 90 + Math.floor(r() * 8) : age < 27 ? clamp(ovr + 2 + Math.floor(r() * (age < 22 ? 22 : 12)), ovr, 94) : ovr;
  const A = attrs(r, pos, ovr), P = B_PROF[pos][Math.floor(r() * B_PROF[pos].length)], sp = 0.8 + r() * 0.7;
  for (const q in P) A[q] = clamp(Math.round(A[q] + P[q] * sp), 25, 99);
  return { id, k, ...nm, pos, age, ovr, pot, wk, ...A, num };
};
/* G18 demo market ('w', from MK_T3): the whole range, OVR 35 to 110. Over 99 the stats go past 99 too (like the legends, but far below 150). */
const WMAX = 110, WMIN = 35;
const wplayer = function (id, k, nm, pos, r, num) {
  const age = 16 + Math.floor(r() * 20), x = r();
  let ovr = x < 0.14 ? 35 + Math.floor(r() * 15) : x < 0.38 ? 50 + Math.floor(r() * 15) : x < 0.64 ? 65 + Math.floor(r() * 13) : x < 0.85 ? 78 + Math.floor(r() * 12) : x < 0.96 ? 90 + Math.floor(r() * 10) : 100 + Math.floor(r() * 11);
  if (age <= 18) ovr = Math.min(ovr, 58 + (age - 16) * 8); if (age >= 34) ovr = Math.max(WMIN, ovr - (age - 33) * 3);
  let wk = false; if (age <= 19 && r() < 0.08) { wk = true; ovr = 62 + Math.floor(r() * 14); }
  const pot = wk ? 98 + Math.floor(r() * 13) : age < 27 ? clamp(ovr + 2 + Math.floor(r() * (age < 22 ? 24 : 12)), ovr, WMAX) : ovr;
  const A = attrs(r, pos, Math.min(ovr, 99)), P = B_PROF[pos][Math.floor(r() * B_PROF[pos].length)], sp = 0.8 + r() * 0.7, top = Math.max(0, ovr - 99);
  for (const q in A) { if (pos !== 'GK' && q === 'gk') continue; A[q] = clamp(Math.round(A[q] + (P[q] || 0) * sp + top * 1.1), 25, 120); }
  return { id, k, ...nm, pos, age, ovr, pot, wk, ...A, num };
};
const nplayer = function (id, S) {
  const m = NEW_RE.exec(id), S0 = Number(m[2]); S = Math.max(S0, Math.floor(S || 1));
  let s = S0, g = 0, gid = String(id), p = nbase(id, gid, 0), a0 = p.age;
  for (let guard = 0; guard < 40; guard++) {
    const R = p.legend ? 37 : 34 + hash(gid + ':ret') % 4;
    if (a0 + (S - s) <= R) break;
    s = s + (R - a0) + 1; g++; gid = id + '~' + g; p = nbase(id, gid, g); a0 = 17;
    if (s > S) break;
  }
  const age = a0 + (S - s);
  if (p.legend) return { ...p, ci: -1, slot: -1, gid, gen: g, age };
  let d = 0;
  for (let y = a0; y < age; y++) { const st = grow(y) + (p.wk && y < 22 ? 2 : 0) + (hash(gid + ':g' + y) % 3) - 1; d += st > 0 ? Math.max(0, Math.min(st, p.pot - p.ovr - d)) : st; }
  const W8 = p.k === 'w' && g === 0, sh = (v) => clamp(v + d, 25, W8 ? 120 : 99);
  return { ...p, ci: -1, slot: -1, gid, gen: g, age, ovr: W8 ? clamp(p.ovr + d, WMIN, WMAX) : clamp(p.ovr + d, 40, 97), pac: sh(p.pac), sho: sh(p.sho), pas: sh(p.pas), dri: sh(p.dri), def: sh(p.def), gk: p.pos === 'GK' ? sh(p.gk) : p.gk };
};
const player = (id, S) => isNew(id) ? nplayer(String(id), S) : oplayer(id, S);
/* 💰 what a player is worth (plain multiplication only, so phones and the worker agree) */
const r500 = (v) => Math.round(v / 500) * 500;
const value = (p) => {
  if (!p || p.legend) return 0;
  let v = 2000; for (let i = 50; i < p.ovr; i++) v *= 1.12; for (let i = p.ovr; i < 50; i++) v /= 1.12;
  v *= p.age <= 21 ? 1.3 : p.age <= 26 ? 1.1 : p.age <= 29 ? 1 : p.age <= 31 ? 0.75 : 0.5;
  if (p.wk) v *= 2.5;
  return Math.max(500, r500(v));
};
const releaseValue = (p) => p && !p.legend ? Math.round(value(p) * 0.1 / 100) * 100 : 0;
const youthIds = (S, ci, n) => { const o = []; for (let k = 0; k < (n || 15); k++) o.push('y' + S + 'x' + ci + 'x' + k); return o; };
const legendId = (S, no) => 'L' + S + 'x' + no;

/* 🔨 the market: 15 auctions always running. Each lasts 60 s; the next one starts the moment it ends.
   A bid in the last 10 s puts the clock back to 10 s. 🤖 computer clubs (clearly marked) snipe 3 s before the end
   while the price is under the most they will pay. With no human bids, a computer club buys at the start price (or it's unsold). */
const MK_N = 15, MK_LEN = 60000, MK_EXT = 10000, MK_AI = 3000;
/* G12: from MK_T2 every auction lasts 2 min 30 s (MK_LEN2) and sells a 'b' player (any position, much more variety).
   Lots that started before MK_T2 keep 60 s and their 'a' players, so nothing already sold or owned ever changes. */
const MK_T2 = Date.UTC(2026, 10, 6, 0, 0), MK_LEN2 = 150000;
const mkLen = (st) => st >= MK_T2 ? MK_LEN2 : MK_LEN;
const lotT0 = (i) => EPOCH0 + i * 4000;
/* G18: from MK_T3 the market sells 'w' players (OVR 35–110). MK_T3 comes from w11meta/season.mk3, which the NEW worker sets
   (a whole hour ahead) the first time it runs, so phones and the worker always switch at the same moment. */
let MK_T3 = Infinity;
const setMk3 = (ms) => { ms = Number(ms) || 0; if (ms > Date.UTC(2026, 10, 1) && ms < Date.UTC(2040, 0, 1)) MK_T3 = ms; return MK_T3; };
const mk3 = () => MK_T3;
const lotPid = (i, n, st) => (st >= MK_T3 ? 'w' : st >= MK_T2 ? 'b' : 'a') + clock(st).s + 'x' + i + 'x' + n;
const stepOf = (p) => Math.max(500, r500(p * 0.05));
const lotInfo = (i, n, st) => {
  const pid = lotPid(i, n, st), p = player(pid, clock(st).s), v = value(p), start = Math.max(1000, r500(v * 0.4)), r = rng(hash('mkai:' + pid));
  const aiMax = r() < 0.35 ? 0 : Math.max(start, r500(v * (0.7 + r() * 0.9))), aiClub = Math.floor(r() * 434);
  return { i, n, st, pid, v, start, aiMax, aiClub };
};
/* L = a stored lot { i, n, st, end, p, u, un, c, nb } (or a fresh one { i, n, st }); answers how it stands at time `now` */
const lotEff = (L, now) => {
  const I = lotInfo(L.i, L.n, L.st);
  if (!L.u) { const end = L.st + mkLen(L.st); return { ...I, top: null, price: I.start, end, closed: now >= end, winner: now >= end ? (I.aiMax >= I.start ? 'ai' : null) : null, minNext: I.start }; }
  const e = L.end, aiNext = L.p + stepOf(L.p);
  if (aiNext <= I.aiMax && now >= e - MK_AI) { const end = e - MK_AI + MK_EXT; return { ...I, top: 'ai', price: aiNext, end, closed: now >= end, winner: now >= end ? 'ai' : null, minNext: aiNext + stepOf(aiNext), aiAt: e - MK_AI }; }
  return { ...I, top: 'u', price: L.p, end: e, closed: now >= e, winner: now >= e ? 'u' : null, minNext: L.p + stepOf(L.p) };
};
/* which lot is running in slot i right now, given the last stored lot of that slot (or none) */
/* the n-th lot after a lot that started at st0 (60 s lots before MK_T2, 150 s lots from the first start after it) */
const lotChain = (i, n0, st0, now) => {
  if (st0 >= MK_T2) { const k = Math.max(0, Math.floor((now - st0) / MK_LEN2)); return { i, n: n0 + k, st: st0 + k * MK_LEN2 }; }
  const k1 = Math.max(0, Math.floor((now - st0) / MK_LEN)); if (st0 + k1 * MK_LEN < MK_T2) return { i, n: n0 + k1, st: st0 + k1 * MK_LEN };
  const nB = Math.ceil((MK_T2 - st0) / MK_LEN), tB = st0 + nB * MK_LEN, k = Math.max(0, Math.floor((now - tB) / MK_LEN2)); return { i, n: n0 + nB + k, st: tB + k * MK_LEN2 };
};
/* which lot is running in slot i right now, given the last stored lot of that slot (or none) */
const lotCur = (i, L, now) => {
  if (!L) return lotChain(i, 0, lotT0(i), now);
  const E = lotEff(L, now); if (!E.closed) return L;
  return lotChain(i, L.n + 1, E.end, now);
};
const squadIds = (ci) => POS_TEMPLATE.map((_, s) => ci + '-' + s);
const avg = (ids, S) => Math.round(ids.slice(0, 11).map(id => player(id, S)).reduce((s, p) => s + p.ovr, 0) / 11);

/* 📅 season clock: 28 days = 1 year. Days 1–26 one matchday each, day 27 last checks, day 28 promotion & prizes. */
const DAY = 86400000, EPOCH0 = Date.UTC(2026, 10, 2), SDAYS = 28, MDS = 26, ENGINE = 10;
/* G5: the season clock can be restarted (fresh Season 1): the start day is kept in w11meta/season.ep; the market keeps EPOCH0 */
let EPOCH = EPOCH0;
const setEpoch = (ms) => { ms = Number(ms) || 0; if (ms > Date.UTC(2026, 0, 1) && ms < Date.UTC(2040, 0, 1)) EPOCH = Math.floor(ms / DAY) * DAY; return EPOCH; };
const epoch = () => EPOCH;
/* 🌍 G6: 6 world zones, each with its own league ladder. A manager's zone comes from his phone's time zone (minutes east of GMT). */
const ZONES = 6, ZONE_NAME = ['Americas West', 'Americas East', 'Europe & Africa', 'Middle East & South Asia', 'East Asia', 'Oceania'], ZONE_FLAG = ['🌎', '🌎', '🌍', '🌏', '🌏', '🌏'];
const ZONE_OF = [-480, -300, 60, 300, 480, 600];
const cleanOf = (of) => { of = Math.round((Number(of) || 0) / 15) * 15; return of < -720 ? -720 : of > 840 ? 840 : of; };
const zoneOf = (of) => { of = cleanOf(of); return of <= -420 ? 0 : of <= -91 ? 1 : of <= 180 ? 2 : of <= 390 ? 3 : of < 600 ? 4 : 5; };
/* G6: kick-off slots are LOCAL times (10:00, 14:00, 18:00, 21:00 on the home manager's phone); computer games 18:00 zone time */
const SLOTS = [10, 14, 18, 21], AI_HOUR = 18, MATCH_MS = 4 * 60000;
const clock = (t) => { const e = Math.max(0, t - EPOCH), s = Math.floor(e / (SDAYS * DAY)) + 1, day = Math.floor((e % (SDAYS * DAY)) / DAY) + 1; return { s, day }; };
const dayStart = (s, day) => EPOCH + ((s - 1) * SDAYS + (day - 1)) * DAY;
const ko = (s, md, slot, of) => dayStart(s, md) + SLOTS[slot] * 3600000 - cleanOf(of) * 60000;
const aiKo = (s, md, z) => dayStart(s, md) + AI_HOUR * 3600000 - ZONE_OF[z == null ? 2 : z] * 60000;

/* 🏔️ pyramid per zone: Div 1 = 1 group … Div 5 = 16 groups, Div 6 = 32 groups (+ extra ones when full); 14 clubs a group.
   G6: group g of division t belongs to zone g >> (t-1) (zone z owns groups z·2^(t-1) … (z+1)·2^(t-1) − 1).
   Extra Div 6 groups have g >= 192: zone = (g − 192) % 6, k-th extra of that zone = floor((g − 192) / 6). */
const TIER_START = [0, 84, 252, 588, 1260, 2604];
const groupsIn = (t) => 1 << (t - 1);
const NG = (t) => ZONES << (t - 1), X6 = ZONES << 5;
const zoneOfG = (t, g) => t === 6 && g >= X6 ? (g - X6) % ZONES : g >> (t - 1);
const extraG = (z, k) => X6 + k * ZONES + z;
const groupNo = (t, g) => t === 6 && g >= X6 ? 33 + Math.floor((g - X6) / ZONES) : (g % groupsIn(t)) + 1;
const aiZone = (ci) => { ci = Number(ci); if (!(ci >= 0) || ci >= 100000) return 2; let t = 6; for (let i = 1; i < 6; i++) if (ci < TIER_START[i]) { t = i; break; } return zoneOfG(t, Math.floor((ci - TIER_START[t - 1]) / 14)); };
const gkey = (s, t, g) => s + '-' + t + '-' + g;
const initClubs = (t, g) => { const o = []; for (let i = 0; i < 14; i++) o.push(TIER_START[t - 1] + g * 14 + i); return o; };

/* 🗓️ fixtures: double round robin, 26 matchdays, 7 matches each. Returns [homePos, awayPos] */
const pairs = (md) => {
  const r = (md - 1) % 13, sec = md > 13, out = [];
  for (let i = 0; i < 7; i++) {
    const a = i === 0 ? 13 : (r + i) % 13, b = i === 0 ? r : (r + 13 - i) % 13;
    let h = (i === 0 ? r % 2 === 0 : i % 2 === 1) ? a : b, w = h === a ? b : a;
    if (sec) { const x = h; h = w; w = x; }
    out.push([h, w]);
  }
  return out;
};
const mid = (s, t, g, md, hp) => gkey(s, t, g) + '-' + md + '-' + hp;

/* ⚡ quick result (for computer-vs-computer games, and for any match nobody checked in time) */
const quick = (key, oh, oa) => {
  const r = rng(hash('q:' + key)), d = oh - oa;
  const lh = clamp(1.45 + 0.075 * d, 0.3, 3.6), la = clamp(1.15 - 0.075 * d, 0.25, 3.3);
  let h = 0, a = 0; for (let i = 0; i < 8; i++) { if (r() < lh / 8) h++; if (r() < la / 8) a++; }
  return [h, a];
};

/* who sits in a seat on a matchday (a manager who took over mid-season keeps the computer club's earlier games) */
const seatClub = (G, pos, md) => { const u = G.users && G.users[pos]; return u && md < (u.from || 1) && u.ai != null ? u.ai : G.clubs[pos]; };
const isUserAt = (G, pos, md) => { const u = G.users && G.users[pos]; return !!(u && md >= (u.from || 1)); };
const strengthCache = {};
/* G6: a computer club's strength is its base rating (cheap: the season change must fit the free plan) */
const strength = (G, pos, md) => {
  if (isUserAt(G, pos, md)) return G.users[pos].o || 55;
  const ci = seatClub(G, pos, md);
  if (strengthCache[ci] == null) strengthCache[ci] = club(ci).base;
  return strengthCache[ci];
};
/* result of one fixture: [h, a] or null (waiting) */
const result = (G, md, hp, ap, now) => {
  const k = md + '_' + hp, R = G.res && G.res[k];
  if (R) { const [h, a] = String(R).split('-').map(Number); return [h, a]; }
  if (isUserAt(G, hp, md) || isUserAt(G, ap, md)) return null;
  if (now != null && now < aiKo(G.s, md, zoneOfG(G.t, G.g)) + MATCH_MS) return null;
  return quick(gkey(G.s, G.t, G.g) + ':' + md + ':' + hp, strength(G, hp, md), strength(G, ap, md));
};
/* 📊 league table: points, goal difference, goals scored, then seat order */
const table = (G, now, uptoMd) => {
  const rows = []; for (let p = 0; p < 14; p++) rows.push({ pos: p, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, form: [] });
  const last = uptoMd || MDS;
  for (let md = 1; md <= last; md++) for (const [h, a] of pairs(md)) {
    const r = result(G, md, h, a, now); if (!r) continue;
    const H = rows[h], A = rows[a]; H.p++; A.p++; H.gf += r[0]; H.ga += r[1]; A.gf += r[1]; A.ga += r[0];
    if (r[0] > r[1]) { H.w++; A.l++; H.pts += 3; H.form.push('W'); A.form.push('L'); }
    else if (r[0] < r[1]) { A.w++; H.l++; A.pts += 3; H.form.push('L'); A.form.push('W'); }
    else { H.d++; A.d++; H.pts++; A.pts++; H.form.push('D'); A.form.push('D'); }
  }
  return rows.sort((x, y) => y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga) || y.gf - x.gf || x.pos - y.pos);
};

/* ⬆️⬇️ promotion: top 2 go up, bottom 4 go down (Div 1 has no "up", Div 6 has no "down") */
const UP = 2, DOWN = 4;
const parentOf = (t, g) => t > 1 && !(t === 6 && g >= X6) ? [t - 1, g >> 1] : null;
const childrenOf = (t, g) => t < 6 && g < NG(t) ? [[t + 1, 2 * g], [t + 1, 2 * g + 1]] : [];
/* fin = club ids in final order (1st … 14th). getFin(t, g) gives another group's final order. */
const nextClubs = (t, g, s, getFin) => {
  const fin = getFin(t, g), par = parentOf(t, g), kids = childrenOf(t, g);
  let stay;
  if (t === 1) stay = fin.slice(0, 14 - DOWN);
  else if (t === 6) stay = par ? fin.slice(UP) : fin.slice();
  else stay = fin.slice(UP, 14 - DOWN);
  let out = stay.slice();
  for (const [ct, cg] of kids) out = out.concat(getFin(ct, cg).slice(0, UP));
  if (par) { const pf = getFin(par[0], par[1]), down = pf.slice(14 - DOWN); out = out.concat(g % 2 === 0 ? [down[0], down[2]] : [down[1], down[3]]); }
  return out.sort((a, b) => hash(s + 1 + ':' + a) - hash(s + 1 + ':' + b) || a - b);
};
/* 🪙 coins (paid by the worker only) */
const winCoins = (t) => 3000 + 1000 * (6 - t), drawCoins = (t) => 1000 + 500 * (6 - t);
const prize = (t, place) => (15 - place) * 4000 * (7 - t);
const PROMO_BONUS = 50000;

/* 💪 fitness: 0–100 per player. A full match costs 24; each day back +15 (+1 per fitness training point). */
const absDay = (t) => Math.floor(t / DAY);
const REC = 15, DRAIN = 24, AI_COND = 92, TR_MAX = 15, PACK_FIT = 25;
const condNow = (club, id, day) => { const c = club && club.cond && club.cond[id] != null ? Number(club.cond[id]) : 100, cd = club && club.cd != null ? club.cd : day; return clamp(Math.round(c + Math.max(0, day - cd) * (REC + (Number(club && club.tr && club.tr.fit) || 0) + (hasStaff(club, 'ph', clock(day * DAY).s) ? PHYSIO_REC : 0))), 0, 100); };

/* G13 (engine 6): 📍 free positions like Top Eleven. 35 spots on the board (5 lines from defence to attack x 7 lanes);
   a club may put its 10 outfield starters on any 10 different spots (keeper fixed). Stored as club.fp = [spot for slot 1..10].
   Spot k: line = floor(k / 7) (0 defence, 1 holding mid, 2 midfield, 3 attacking mid, 4 attack), lane = k % 7 (0 = left touchline side). */
const FP_X = [16, 25, 33, 40, 47], FP_Y = [8, 17, 26, 34, 42, 51, 60], FP_N = 35;
const fpSpot = (k) => { const ln = Math.floor(k / 7), la = k % 7, side = la <= 1 ? 'L' : la >= 5 ? 'R' : 'C';
  const dp = ln === 0 ? (side === 'C' ? 'DC' : 'D' + side) : ln <= 2 ? (side === 'C' ? 'MC' : 'M' + side) : ln === 3 ? (side === 'C' ? 'AMC' : 'AM' + side) : (side === 'C' ? 'ST' : 'AM' + side);
  return { x: FP_X[ln], y: FP_Y[la], role: ln === 0 ? 'DEF' : ln === 4 ? 'FWD' : 'MID', dp, ln, la }; };
/* valid = 10 different whole spots, 3 to 5 defenders, at least one player in the two attacking lines, max 4 in one line besides defence */
const fpOk = (fp) => { if (!Array.isArray(fp) || fp.length !== 10) return false; const seen = new Set(), per = [0, 0, 0, 0, 0];
  for (const k of fp) { if (!Number.isInteger(k) || k < 0 || k >= FP_N || seen.has(k)) return false; seen.add(k); per[Math.floor(k / 7)]++; }
  return per[0] >= 3 && per[0] <= 5 && per[3] + per[4] >= 1 && per[1] <= 4 && per[2] <= 5 && per[3] <= 4 && per[4] <= 4; };
const fpClean = (fp) => fpOk(fp) ? fp.map(Number) : null;
/* the formation name that is closest to a set of spots (shown on phones as "Custom (4-2-3-1)") */
const fpForm = (fp) => { if (!fpOk(fp)) return ''; const per = [0, 0, 0, 0, 0]; fp.forEach(k => per[Math.floor(k / 7)]++); return per.filter(Boolean).join('-'); };
const FORM_NAMES = ['4-4-2', '4-3-3', '4-2-3-1', '4-1-4-1', '4-4-1-1', '4-3-2-1', '4-5-1', '4-1-2-1-2', '4-2-4', '3-5-2', '3-4-3', '3-4-2-1', '3-3-3-1', '5-3-2', '5-4-1'];
/* 📋 team sheet at the 15-minute lock: banned / injured players can't start (best fit from the bench comes in) */
const sheetOf = (club, day, S) => {
  const ids = (club.ids || []).slice(0, 18), ban = club.ban || {}, inj = club.inj || {};
  const bo = ids.filter(id => (Number(ban[id]) || 0) > 0), io = ids.filter(id => (Number(inj[id]) || 0) > 0 && !bo.includes(id)), out = new Set(bo.concat(io));
  for (let i = 0; i < 11; i++) {
    if (!out.has(ids[i])) continue;
    const pos = player(ids[i], S).pos; let best = -1, bo2 = -1;
    for (let j = 11; j < ids.length; j++) { if (out.has(ids[j])) continue; const p = player(ids[j], S), sc = (p.pos === pos ? 1000 : 0) + p.ovr; if (sc > bo2) { bo2 = sc; best = j; } }
    if (best > 0) { const x = ids[i]; ids[i] = ids[best]; ids[best] = x; }
  }
  if (hasStaff(club, 'as', S)) for (let i = 1; i < 11; i++) {
    const p = player(ids[i], S), c = condNow(club, ids[i], day); if (out.has(ids[i]) || c >= 60) continue; let best = -1, bs = -1;
    for (let j = 11; j < ids.length; j++) { if (out.has(ids[j])) continue; const q = player(ids[j], S), cq = condNow(club, ids[j], day); if (q.pos !== p.pos || cq < 75 || q.ovr < p.ovr - 10) continue; if (q.ovr + cq * 0.1 > bs) { bs = q.ovr + cq * 0.1; best = j; } }
    if (best > 0) { const x = ids[i]; ids[i] = ids[best]; ids[best] = x; }
  }
  const cond = {}; ids.forEach(id => { cond[id] = condNow(club, id, day); });
  const tk = {}; for (const k of ['cap', 'pen', 'fk', 'ck']) { const v = club.tk && club.tk[k]; if (typeof v === 'string' && ids.includes(v)) tk[k] = v; }
  const sh = { tk, ids, form: FORM_NAMES.includes(club.form) ? club.form : '4-4-2', cond, tr: { att: Number(club.tr && club.tr.att) || 0, def: Number(club.tr && club.tr.def) || 0, fit: Number(club.tr && club.tr.fit) || 0 }, bo, io, n: club.name || 'My Club', sh: club.short || 'MYC', kit: ((club.kits || [])[0] || {}).c1 || '', kits: (club.kits || []).map(k => k && k.c1).filter(Boolean), kf: (club.kits || []).slice(0, 3).map(cleanKit), cr: cleanCrest(club.crest), sd: { lv: stdLv(club), nm: String((club.std && club.std.nm) || ((club.name || 'My Club') + ' Park')).slice(0, 30) } }
  /* G4c: learned positions + renamed players travel with the team sheet (only when there are any) */
  const lp = learnedMap(club, ids, S, Date.now()), rn = rnMap(club, ids, S); if (Object.keys(lp).length) sh.lp = lp; if (Object.keys(rn).length) sh.rn = rn;
  /* G13: free positions travel with the sheet (only when set) */
  if (fpOk(club.fp)) sh.fp = club.fp.map(Number);
  /* G6: climate + time zone (weather, day/night) and the touchline manager's look */
  sh.cz = climOk(club.cz); sh.of = cleanOf(club.of); if (club.mgr) sh.mg = cleanMgr(club.mgr);
  return sh;
};
const aiSheet = (ci, key, S) => { const c = club(ci), z = aiZone(ci); return { ai: ci, ids: squadIds(ci), form: FORM_NAMES[hash(key + ':f') % 15], cond: {}, tr: {}, bo: [], io: [], n: c.name, sh: c.short, aiCond: AI_COND, cz: aiClim(ci), of: ZONE_OF[z] }; };
const ENGINE_TICKS = 4200;
/* parse "2-1|ids y/r;…|out>in@tick;…" */
const parseRes = (r) => { const [sc, cards, subs] = String(r || '').split('|'); const [h, a] = String(sc).split('-').map(Number); const C = String(cards || '').split(';'), U = String(subs || '').split(';');
  return { h, a, cards: [0, 1].map(i => (C[i] || '').split(',').filter(Boolean).map(x => [x.slice(0, -1), x.slice(-1)])), subs: [0, 1].map(i => (U[i] || '').split(',').filter(Boolean).map(x => { const m = x.match(/^(.+)>(.+)@(\d+)$/); return m ? [m[1], m[2], Number(m[3])] : null; }).filter(Boolean)) }; };
const RES_RE = /^\d{1,2}-\d{1,2}\|[\w~,;-]*\|[\w~,;>@-]*$/;

/* ===================== 🏆 G3b · cups, stadium, sponsors, staff ===================== */
/* 👔 staff (hired for one season) */
const STAFF = { ph: 60000, sc: 40000, as: 25000 }, PHYSIO_REC = 6, SCOUT_N = 20;
const hasStaff = (c, k, S) => !!(c && c.stf && c.stf.s === S && c.stf[k]);
/* 🏟️ stadium: 5 levels, ticket coins for every home match (league and cups) */
const STD_SEATS = [5000, 12000, 25000, 45000, 80000], STD_TICKET = [2000, 5000, 10000, 18000, 30000], STD_COST = [0, 120000, 350000, 800000, 1800000];
const stdLv = (c) => clamp(Math.floor(Number(c && c.std && c.std.lv) || 1), 1, 5);
/* 🤝 sponsors: made-up brands only. 3 kinds, 3 offers each, sign 1 of each per season */
const SP_A = 'Zantro Kivoo Lumaro Vexano Odumi Tazuko Morivo Quenzo Yelzo Nkiro Fenvo Pirolu Dorvix Zuvia Kwento Sambeo Ravito Okelu Velmo Junza Abeko Talume Sorvi Imbeza'.split(' ');
const SP_B = { sh: 'Sportswear Mobile Juice Electronics Shoes Water Gaming Solar'.split(' '), st: 'Motors Airways Logistics Builders Foods Cement Travel Homes'.split(' '), bo: 'Energy Snacks Tech Studios Radio Paints Bikes Kitchens'.split(' ') };
const SP_KINDS = ['sh', 'st', 'bo'];
const SP_BASE = { sh: [{ up: 40000, pm: 500 }, { up: 15000, pm: 1500 }, { up: 0, pm: 2500 }], st: [{ ph: 1500 }, { phw: 4000 }, { phg: 1500 }], bo: [{ pg: 1500 }, { pw: 5000 }, { top2: 150000, cup: 200000 }] };
const SP_MULT = [3, 2.5, 2, 1.6, 1.3, 1];
const spOffers = (S, ci, t) => { const o = {}, m = SP_MULT[clamp(t || 6, 1, 6) - 1];
  SP_KINDS.forEach(kd => { o[kd] = SP_BASE[kd].map((b, k) => { const r = rng(hash('sp:' + S + ':' + ci + ':' + kd + ':' + k)), f = m * (0.9 + r() * 0.2), d = { n: pick(r, SP_A) + ' ' + pick(r, SP_B[kd]), k }; for (const x in b) d[x] = r500(b[x] * f); return d; }); });
  return o; };
const spOf = (c, S, kd) => c && c.sp && c.sp.s === S && c.sp[kd] ? c.sp[kd] : null;
/* coins a manager gets from one match on top of win/draw coins: tickets (home) + sponsors */
const matchExtra = (c, S, home, gf, ga) => {
  const win = gf > ga, sh = spOf(c, S, 'sh'), st = spOf(c, S, 'st'), bo = spOf(c, S, 'bo'); let x = home ? STD_TICKET[stdLv(c) - 1] : 0;
  if (sh) x += sh.pm || 0;
  if (st && home) x += (st.ph || 0) + (win ? st.phw || 0 : 0) + (st.phg || 0) * gf;
  if (bo) x += (bo.pg || 0) * gf + (win ? bo.pw || 0 : 0);
  return x; };

/* 🏆 cups. Open Cup (oc): every club, knockout on even days, final on day 24. Higher divisions get the byes.
   ⭐ Champions League (cl): last season's 64 best group champions, 16 groups of 4 on days 7–17, knockout 19–27.
   Cup matches kick off 2 hours after the league slot (06→08, 12→14, 18→20, 22→00). A knockout draw goes to penalties. */
const OC_DAYS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], CL_DAYS = [7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27], CL_GR = 6;
const CUP_GAP = 2 * 3600000, CUP_AI_HOUR = AI_HOUR + 2, OC_FIRST = 1, CL_FIRST = 2, CUP_FIRST = 1;
const cupOn = (s, k) => s >= (k === 'cl' ? CL_FIRST : OC_FIRST);
/* G4: every cup match has its own kick-off time: a quarter hour between 06:15 and 23:45 GMT, never 20 minutes
   before or 10 minutes after a league kick-off (06/12/18/22). Same on every phone, nothing stored. */
/* G6: cup times are LOCAL quarter hours 09:15–22:45 (of = the manager's minutes east of GMT) */
const CUP_TIMES = (() => { const o = []; for (let m = 555; m <= 1365; m += 15) { if (SLOTS.some(h => m > h * 60 - 25 && m < h * 60 + 15)) continue; o.push(m); } return o; })();
const cupKoAt = (s, d, key, of) => dayStart(s, d) + (CUP_TIMES[hash('ckt:' + key) % CUP_TIMES.length] - cleanOf(of)) * 60000;
/* G6: a Champions League tie between two zones kicks off at the fairest hour for both (10:00–22:00 local if it can) */
const badMin = (l) => { l = ((l % 1440) + 1440) % 1440; return l >= 600 && l <= 1320 ? 0 : l > 1320 ? l - 1320 : 600 - l; };
const nearSlot = (l) => { l = ((l % 1440) + 1440) % 1440; return SLOTS.some(h => l > h * 60 - 25 && l < h * 60 + 15); };
const fairKo = (s, d, key, a, b) => { a = cleanOf(a); b = cleanOf(b); let best = 1e9; const ok = [];
  for (let u = 0; u < 1440; u += 15) { const x = badMin(u + a), y = badMin(u + b), sc = Math.max(x, y) * 2 + x + y + (nearSlot(u + a) || nearSlot(u + b) ? 30 : 0);
    if (sc < best - 0.5) { best = sc; ok.length = 0; } if (sc <= best + 0.5) ok.push(u); }
  return dayStart(s, d) + ok[hash('cft:' + key) % ok.length] * 60000; };
const OC_WIN = 5000, CL_WIN = 15000, CL_DRAW = 5000, CUP_PRIZE = { oc: [300000, 100000], cl: [1000000, 300000] };
const CUP_NAME = { oc: '🏆 Open Cup', cl: '⭐ Champions League' };
const cupDays = (C) => C.k === 'cl' ? CL_DAYS : OC_DAYS.slice(OC_DAYS.length - C.R);
const cupDay = (C, r) => cupDays(C)[r - 1];
const cupKo = (s, d, sl) => ko(s, d, sl) + CUP_GAP;
const cupAiKo = (s, d, z) => dayStart(s, d) + CUP_AI_HOUR * 3600000 - (z == null ? 0 : ZONE_OF[z]) * 60000;
/* G6: each zone has its own Open Cup (doc w11c/{S}-oc{z}); the Champions League is worldwide (w11c/{S}-cl) */
const cupId = (C) => C.k === 'oc' && C.z != null ? 'oc' + C.z : C.k;
const cupMid = (s, k, r, i) => s + '-' + k + '-' + r + '-' + i;
const isCupDay = (s, d) => (cupOn(s, 'oc') && OC_DAYS.includes(d)) || (cupOn(s, 'cl') && CL_DAYS.includes(d));
const isKO = (C, r) => C.k === 'oc' || r > CL_GR;
const seat = (C, ci) => ci < 0 ? ci : (C.tk && C.tk[ci] != null ? Number(C.tk[ci]) : ci);
const cupUser = (C, ci) => { const s = seat(C, ci); return s >= 0 && C.users && C.users[s] ? C.users[s] : null; };
const roundName = (C, r) => { if (C.k === 'cl') return r <= CL_GR ? 'Group matchday ' + r : ['Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'][r - CL_GR - 1];
  const left = C.R - r; return left === 0 ? 'Final' : left === 1 ? 'Semi-finals' : left === 2 ? 'Quarter-finals' : left === 3 ? 'Round of 16' : 'Round ' + r; };
/* penalties: same shoot-out on every phone */
const pens = (key) => { const r = rng(hash('pen:' + key)); let a = 0, b = 0; for (let i = 0; i < 5; i++) { if (r() < 0.76) a++; if (r() < 0.76) b++; }
  for (let g = 0; a === b && g < 30; g++) { if (r() < 0.76) a++; if (r() < 0.76) b++; } if (a === b) a++; return [a, b]; };
/* score text: "2-1", "1-1/4-3" (penalties) or "bye" → [h, a, penH, penA] */
const cupScore = (x) => { if (!x || x === 'bye') return null; const [sc, pe] = String(x).split('/'), [h, a] = sc.split('-').map(Number), q = pe ? pe.split('-').map(Number) : [0, 0]; return [h, a, q[0], q[1]]; };
const cupWin = (x) => { const v = cupScore(x); return !v ? 0 : v[0] > v[1] ? 0 : v[0] < v[1] ? 1 : v[2] >= v[3] ? 0 : 1; };
const winSide = (x, p) => p[0] < 0 ? 1 : p[1] < 0 ? 0 : cupWin(x);
const baseC = {}, cupStr = (C, ci) => { const u = cupUser(C, ci); if (u) return Number(u.o) || 60; if (ci < 0) return 0; if (baseC[ci] == null) baseC[ci] = club(ci).base; return baseC[ci]; };
const cupResStr = (k, r, h, a, mid) => h + '-' + a + (isKO({ k }, r) && h === a ? '/' + pens(mid).join('-') : '');
/* coins for one cup match (side i = 0 home, 1 away): a win (penalties count), or a Champions League group draw */
const cupCoins = (k, r, h, a, mid, i) => { if (h === a && !isKO({ k }, r)) return k === 'cl' ? CL_DRAW : 0; return cupWin(cupResStr(k, r, h, a, mid)) === i ? (k === 'cl' ? CL_WIN : OC_WIN) : 0; };
const CL_RR = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]];
const resOf = (C, r, k, live) => { const R = C.rr && C.rr[r]; return (R && R[k]) || (live && C.ur && C.ur[r + '_' + k]) || null; };
/* 📊 CL group table (g = 0…15) */
const clTable = (C, g, live) => {
  const T = [0, 1, 2, 3].map(j => ({ ci: C.gs[4 * g + j], j, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }));
  for (let r = 1; r <= CL_GR; r++) for (let x = 0; x < 2; x++) {
    const v = cupScore(resOf(C, r, 2 * g + x, live)); if (!v) continue; let [a, b] = CL_RR[(r - 1) % 3][x]; if (r > 3) [a, b] = [b, a];
    const H = T[a], A = T[b]; H.p++; A.p++; H.gf += v[0]; H.ga += v[1]; A.gf += v[1]; A.ga += v[0];
    if (v[0] > v[1]) { H.w++; A.l++; H.pts += 3; } else if (v[0] < v[1]) { A.w++; H.l++; A.pts += 3; } else { H.d++; A.d++; H.pts++; A.pts++; }
  }
  return T.sort((x, y) => y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga) || y.gf - x.gf || hash(C.s + ':t:' + x.ci) - hash(C.s + ':t:' + y.ci));
};
/* the pairs of round r: [[home, away], …] (club ids, -1 = bye), or null if the round before is not decided yet */
const cupPairs = (C, r) => {
  if (r < 1 || r > C.R) return null;
  if (C.k === 'cl' && r <= CL_GR) { const o = []; for (let g = 0; g < 16; g++) CL_RR[(r - 1) % 3].forEach(([a, b]) => o.push(r > 3 ? [C.gs[4 * g + b], C.gs[4 * g + a]] : [C.gs[4 * g + a], C.gs[4 * g + b]])); return o; }
  if (C.k === 'cl' && r === CL_GR + 1) { for (let q = 1; q <= CL_GR; q++) if (!(C.rr && C.rr[q])) return null; const W = [], U = []; for (let g = 0; g < 16; g++) { const t = clTable(C, g); W.push(t[0].ci); U.push(t[1].ci); } return W.map((w, k) => [w, U[(k + 8) % 16]]); }
  if (C.k === 'oc' && r === 1) { const o = []; for (let k = 0; k < C.b.length; k += 2) o.push([C.b[k], C.b[k + 1]]); return o; }
  const P = cupPairs(C, r - 1), R = C.rr && C.rr[r - 1]; if (!P || !R) return null;
  const w = P.map((p, k) => p[winSide(R[k], p)]), o = []; for (let k = 0; k < w.length; k += 2) o.push([w[k], w[k + 1]]); return o;
};
/* ⚡ a computer-vs-computer cup result */
const cupQuick = (C, r, k, p) => { const key = cupMid(C.s, cupId(C), r, k), q = quick(key, cupStr(C, p[0]), cupStr(C, p[1])); return q[0] + '-' + q[1] + (isKO(C, r) && q[0] === q[1] ? '/' + pens(key).join('-') : ''); };
/* kick-off of pair k in round r: a match with a manager gets its own time (see CUP_TIMES); computer games 20:00 GMT */
const cupOfs = (C, ci) => { const u = cupUser(C, ci); return u && u.of != null ? cleanOf(u.of) : ZONE_OF[ci >= 0 ? aiZone(seat(C, ci)) : 2]; };
const cupKoOf = (C, r, p, k) => { const h = cupUser(C, p[0]), a = cupUser(C, p[1]), d = cupDay(C, r), key = cupMid(C.s, cupId(C), r, k);
  if (!h && !a) return cupAiKo(C.s, d, C.k === 'oc' ? C.z : null);
  if (C.k === 'cl') return fairKo(C.s, d, key, cupOfs(C, p[0]), cupOfs(C, p[1]));
  return cupKoAt(C.s, d, key, h && h.of != null ? h.of : a && a.of != null ? a.of : ZONE_OF[C.z == null ? 2 : C.z]); };
/* build the Open Cup bracket from all clubs, best first. Byes go to the best clubs, the rest are drawn at random */
const ocBracket = (S, list) => {
  list = list.slice(0, 4096); let R = 1; while ((1 << R) < list.length) R++;
  const P = 1 << R, B = P - list.length, pairs = [], rest = list.slice(B).sort((a, b) => hash(S + ':ocd:' + a) - hash(S + ':ocd:' + b) || a - b);
  for (let i = 0; i < B; i++) pairs.push([list[i], -1]);
  for (let i = 0; i < rest.length; i += 2) pairs.push([rest[i], rest[i + 1]]);
  pairs.sort((x, y) => hash(S + ':ocp:' + x[0]) - hash(S + ':ocp:' + y[0]) || x[0] - y[0]);
  return { R, b: [].concat(...pairs) };
};
/* Champions League groups: 4 pots of 16 (best first), shuffled inside each pot */
const clGroups = (S, ent) => { const pots = [0, 1, 2, 3].map(q => ent.slice(16 * q, 16 * q + 16).sort((a, b) => hash(S + ':clp:' + a) - hash(S + ':clp:' + b) || a - b)), gs = [];
  for (let g = 0; g < 16; g++) for (let q = 0; q < 4; q++) gs.push(pots[q][g]); return gs; };

/* ===================== 🎨 G4 · kits, crests, 🪙 GG Coins (rare tokens) ===================== */
/* Money: the club field `coins` is shown as 💎 Gems (everyday money); the field `gems` is shown as 🪙 GG Coins (rare). */
const TOK = { start: 10, pio: 25, promo: 2, title: 5, oc: [10, 5], cl: [20, 10], design: 5 };
const COLORS = ['#22d3ee', '#a855f7', '#ff2d95', '#facc15', '#f97316', '#ef4444', '#22c55e', '#0ea5e9', '#1e3a8a', '#ffffff', '#111827', '#7c2d12', '#14b8a6', '#eab308',
  '#d4af37', '#c0c0c0', '#800000', '#0b1f4d', '#84cc16', '#7dd3fc', '#f9a8d4', '#047857', '#6d28d9', '#6b7280'];
const SHAPES = ['shield', 'round', 'diamond', 'hex', 'star', 'ring', 'badge', 'pennant'];
const SYMS = ['AB', '⚽', '★', '🦁', '🦅', '🔥', '⚡', '👑', '🐺', '🌍', '🐘', '🌙', '🦈', '🐉', '🐆', '🦬', '🐍', '🦂', '🏰', '⚔️', '🌟', '🔱', '🌊', '🛡️'];
const PATS = ['plain', 'stripes', 'hoops', 'halves', 'sash', 'pinstripes', 'chevron', 'gradient', 'checker', 'centre'];
const BANDS = ['none', 'h', 'v', 'd'];
const colOr = (c, d) => COLORS.includes(c) ? c : d;
const cleanKit = (k) => { k = k || {}; const c1 = colOr(k.c1, '#22d3ee'), c2 = colOr(k.c2, '#ffffff');
  return { c1, c2, pat: PATS.includes(k.pat) ? k.pat : 'plain', col: colOr(k.col, c2), slv: colOr(k.slv, c1), sho: colOr(k.sho, c1 === '#ffffff' ? '#111827' : '#ffffff'), soc: colOr(k.soc, c1) }; };
const cleanCrest = (c) => { c = c || {}; const c1 = colOr(c.c1, '#22d3ee'), c2 = colOr(c.c2, '#a855f7');
  return { shape: SHAPES.includes(c.shape) ? c.shape : 'shield', c1, c2, sym: SYMS.includes(c.sym) ? c.sym : 'AB', bd: colOr(c.bd, '#ffffff'), band: BANDS.includes(c.band) ? c.band : 'none', bc: colOr(c.bc, '#ffffff'), est: !!c.est }; };

/* ===================== G4c: detailed positions, learning new positions, renaming ===================== */
/* every player has a main spot (from his id, same on every phone); he can learn up to 2 nearby spots */
const DPOS = ['GK', 'DL', 'DC', 'DR', 'ML', 'MC', 'MR', 'AML', 'AMC', 'AMR', 'ST'];
const DLINE = { GK: 0, DL: 1, DC: 1, DR: 1, ML: 2, MC: 2, MR: 2, AML: 3, AMC: 3, AMR: 3, ST: 4 };
const DPOS_NAME = { GK: 'Goalkeeper', DL: 'Left back', DC: 'Centre back', DR: 'Right back', ML: 'Left midfield', MC: 'Centre midfield', MR: 'Right midfield', AML: 'Left wing', AMC: 'Attacking midfield', AMR: 'Right wing', ST: 'Striker' };
const dpOf = (p) => { if (!p) return 'MC'; const h = (hash('dp:' + (p.gid || p.id)) >>> 9) % 100;
  return p.pos === 'GK' ? 'GK' : p.pos === 'DEF' ? (h < 50 ? 'DC' : h < 75 ? 'DL' : 'DR') : p.pos === 'MID' ? (h < 35 ? 'MC' : h < 50 ? 'ML' : h < 65 ? 'MR' : h < 85 ? 'AMC' : h < 93 ? 'AML' : 'AMR') : (h < 60 ? 'ST' : h < 80 ? 'AML' : 'AMR'); };
/* nearby = same line (any side), or midfield <-> attacking midfield <-> striker. Never into defence or goal, never out of them. */
const canLearn = (from, to) => { const a = DLINE[from], b = DLINE[to]; if (a == null || b == null || from === to || !a || !b) return false; if (a === b) return true; return a >= 2 && b >= 2 && Math.abs(a - b) === 1; };
const LEARN_MAX = 2, LEARN_FAST = 3, LEARN_FAST_DAYS = 3;
/* how fast he adapts: half a season (14 days) to a full season (28 days) */
const learnDays = (gid) => 14 + hash('adapt:' + gid) % 15;
const gidOf = (id, S) => { const p = player(id, S); return (p && p.gid) || String(id); };
/* positions a player knows now: main + learned (+ the one in training once it is finished) */
const knownPos = (club, id, S, now) => { const p = player(id, S), g = (p && p.gid) || String(id), out = [dpOf(p)], lp = (club && club.lp && club.lp[g]) || [];
  for (const x of lp) if (DPOS.includes(x) && !out.includes(x)) out.push(x);
  const t = club && club.trn; if (t && t.g === g && Number(t.end) <= (now == null ? Date.now() : now) && DPOS.includes(t.to) && !out.includes(t.to)) out.push(t.to);
  return out; };
/* learned positions of the top 18 for a team sheet / friendly ({id: [pos…]}, only players who learned something) */
const learnedMap = (club, ids, S, now) => { const o = {}; for (const id of (ids || []).slice(0, 18)) { const k = knownPos(club, id, S, now); if (k.length > 1) o[id] = k.slice(1); } return o; };
/* how well he plays in a spot: 1 = his own spot, a little less on the other side of the same line, a lot less far away */
const posFit = (have, slot) => { if (!slot || have.includes(slot)) return 1; if (slot === 'GK' || have[0] === 'GK') return 0.45; let best = 0.72;
  for (const h of have) { const a = DLINE[h], b = DLINE[slot]; const f = a === b ? 0.93 : Math.abs(a - b) === 1 ? (Math.min(a, b) >= 2 ? 0.86 : 0.8) : 0.72; if (f > best) best = f; } return best; };
/* ✏️ rename: once per player (name + country). Letters only, no bad words, no famous footballers. */
const COUNTRIES = 'AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI XK KW KG LA LV LB LS LR LY LI LT LU MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG KP MK NO OM PK PW PS PA PG PY PE PH PL PT QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW HK PR CW FO GI EN SC2 WA NIR'.split(' ');
/* bad words: whole words, plus a few that are never part of a real name anywhere inside */
const BAD_W = 'fuck fuk fck shit sh1t bitch cunt dick cock pussy whore slut bastard asshole arsehole wank wanker twat nigger nigga faggot fag retard rape rapist nazi hitler porn penis vagina anus sex xxx kkk isis jihad terrorist pedo paedo molest boob boobs tits titty cum jizz dildo motherfucker mofo bollocks prick spastic tranny chink gook spic kike wetback coon paki crap piss'.split(' ');
const BAD_IN = 'fuck cunt nigg fagg hitler whore porn bitch motherf rapist paedo pussy dildo jizz shit wank twat'.split(' '), BAD_ALL = 'fuck cunt nigg fagg hitler'.split(' ');
/* unmistakable surnames block on their own; common ones only as a full name */
const FAMOUS = 'messi ronaldo ronaldinho neymar mbappe haaland lewandowski modric debruyne vandijk pele maradona zidane beckham rooney ibrahimovic suarez griezmann pogba hazard bellingham rodrygo osimhen drogba okocha etoo kante kroos neuer buffon casillas iniesta puyol totti pirlo maldini baggio kaka rivaldo eusebio cruyff beckenbauer platini gerrard lampard cantona alisson courtois oblak donnarumma dibala lukaku foden rashford grealish odegaard kvaratskhelia hakimi mahrez aubameyang adebayor yamal mitoma heungmin'.split(' ').concat('mohamed salah|mo salah|harry kane|thierry henry|sadio mane|yaya toure|kolo toure|xavi hernandez|sergio ramos|gerard pique|toni kroos|thomas muller|manuel neuer|luka modric|kevin de bruyne|son heungmin|heung min son|gareth bale|frank lampard|john terry|paul scholes|ryan giggs|roberto carlos|luis figo|bukayo saka|declan rice|cole palmer|raheem sterling|jamie vardy|lautaro martinez|emiliano martinez|julian alvarez|fede valverde|federico valverde|alphonso davies|christian pulisic|takefusa kubo|michael essien|asamoah gyan|andre ayew|jordan ayew|thomas partey|mohammed kudus|tony yeboah|abedi pele|nwankwo kanu|george weah|samuel etoo|didier drogba|riyad mahrez|achraf hakimi|victor osimhen|rafael leao|lamine yamal|pedri gonzalez|vinicius junior|vini jr|gavi paez|lionel messi|cristiano ronaldo|kylian mbappe|erling haaland|abedi ayew|sulley muntari|kevin prince boateng|jerome boateng|inaki williams|nico williams|ademola lookman|alex iwobi|wilfred ndidi|samuel chukwueze|kelechi iheanacho|jay jay okocha|john obi mikel|joseph yobo|vincent enyeama|odion ighalo|ahmed musa|taiwo awoniyi|calvin bassey|kalidou koulibaly|edouard mendy|idrissa gueye|ismaila sarr|hakim ziyech|yassine bounou|sofyan amrabat|ismael bennacer|wilfried zaha|nicolas pepe|franck kessie|sebastien haller|andre onana|vincent aboubakar|bryan mbeumo|pierre emerick aubameyang|naby keita|serhou guirassy|mohamed elneny|omar marmoush|percy tau|teboho mokoena|ronwen williams|benni mccarthy|lucas radebe|steven pienaar|jude bellingham|phil foden|marcus rashford|jack grealish|john stones|kyle walker|jordan pickford|harry maguire|mason mount|trent alexander arnold|jordan henderson|wayne rooney|steven gerrard|david beckham|alan shearer|michael owen|gary neville|rio ferdinand|ashley cole|ollie watkins|ivan toney|antoine griezmann|ousmane dembele|kingsley coman|paul pogba|ngolo kante|olivier giroud|hugo lloris|mike maignan|theo hernandez|lucas hernandez|raphael varane|aurelien tchouameni|eduardo camavinga|william saliba|dayot upamecano|jules kounde|karim benzema|zinedine zidane|patrick vieira|claude makelele|franck ribery|marcus thuram|randal kolo muani|michael olise|desire doue|bradley barcola|robert lewandowski|wojciech szczesny|joshua kimmich|leon goretzka|jamal musiala|florian wirtz|kai havertz|leroy sane|serge gnabry|antonio rudiger|ilkay gundogan|marc andre ter stegen|mario gotze|miroslav klose|michael ballack|bastian schweinsteiger|philipp lahm|mats hummels|pedri|gavi|rodri|alvaro morata|dani olmo|ferran torres|mikel oyarzabal|unai simon|dani carvajal|carles puyol|andres iniesta|iker casillas|david villa|fernando torres|sergio busquets|jordi alba|cesc fabregas|david silva|isco alarcon|marco asensio|raul gonzalez|luis suarez|edinson cavani|darwin nunez|ronald araujo|jose gimenez|diego godin|rodrigo bentancur|angel di maria|paulo dybala|rodrigo de paul|enzo fernandez|alexis mac allister|sergio aguero|gonzalo higuain|carlos tevez|javier mascherano|gabriel batistuta|juan roman riquelme|neymar junior|rodrygo goes|raphinha|casemiro|marquinhos|alisson becker|ederson moraes|gabriel jesus|gabriel martinelli|gabriel magalhaes|richarlison|bruno guimaraes|lucas paqueta|thiago silva|dani alves|ronaldinho gaucho|ricardo kaka|endrick felipe|bruno fernandes|bernardo silva|joao felix|ruben dias|joao cancelo|diogo jota|joao neves|vitinha|nuno mendes|pepe|rui costa|ricardo quaresma|gianluigi buffon|gianluigi donnarumma|francesco totti|alessandro del piero|andrea pirlo|paolo maldini|fabio cannavaro|roberto baggio|giorgio chiellini|leonardo bonucci|federico chiesa|nicolo barella|sandro tonali|lorenzo insigne|ciro immobile|marco verratti|jorginho|gianluca scamacca|mateo retegui|virgil van dijk|frenkie de jong|matthijs de ligt|memphis depay|cody gakpo|xavi simons|denzel dumfries|nathan ake|arjen robben|robin van persie|wesley sneijder|johan cruyff|ruud gullit|marco van basten|dennis bergkamp|clarence seedorf|edwin van der sar|patrick kluivert|son heung min|heungmin son|kim min jae|lee kang in|hwang hee chan|park ji sung|kaoru mitoma|wataru endo|takumi minamino|daichi kamada|takehiro tomiyasu|ritsu doan|shinji kagawa|keisuke honda|hidetoshi nakata|wu lei|sunil chhetri|arda guler|hakan calhanoglu|kenan yildiz|ferdi kadioglu|burak yilmaz|arda turan|jonathan david|weston mckennie|tyler adams|gio reyna|timothy weah|folarin balogun|landon donovan|clint dempsey|tim howard|hirving lozano|raul jimenez|edson alvarez|guillermo ochoa|santiago gimenez|javier hernandez|james rodriguez|luis diaz|radamel falcao|juan cuadrado|jhon duran|moises caicedo|enner valencia|piero hincapie|alexis sanchez|arturo vidal|claudio bravo|khvicha kvaratskhelia|ivan rakitic|mateo kovacic|josko gvardiol|dominik livakovic|zlatan ibrahimovic|alexander isak|viktor gyokeres|dejan kulusevski|martin odegaard|christian eriksen|kasper schmeichel|peter schmeichel|rasmus hojlund|aaron ramsey|eden hazard|thibaut courtois|romelu lukaku|jeremy doku|leandro trossard|youri tielemans|dusan vlahovic|aleksandar mitrovic|victor wanyama|dennis oliech|mbwana samatta|roger milla|emmanuel adebayor|frederic kanoute|seydou keita|abdul rahman baba|inaki williams|antoine semenyo|tariq lamptey|mohammed salisu|daniel amartey|kamaldeen sulemana|ernest nuamah|joseph paintsil|fatawu issahaku|jeremie frimpong|christopher wreh|diego maradona'.split('|'));
const normName = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const nameProblem = (n) => { const raw = String(n || '').normalize('NFC').replace(/\s+/g, ' ').trim();
  if (raw.length < 2 || raw.length > 24) return 'Use 2 to 24 letters';
  if (!/^[\p{L}][\p{L}\p{M} .'\u2019\-]*$/u.test(raw)) return 'Use letters only (spaces, - . and ’ are fine)';
  const flat = normName(raw).replace(/[^a-z]/g, ''), leet = normName(raw).replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's').replace(/[^a-z]/g, '');
  const words = normName(raw).replace(/[^a-z ]/g, ' ').split(' ').filter(Boolean), lw = normName(raw).replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's').replace(/[^a-z ]/g, ' ').split(' ').filter(Boolean);
  if (words.concat(lw).some(w => BAD_W.includes(w) || BAD_IN.some(b => w.includes(b))) || BAD_ALL.some(w => flat.includes(w) || leet.includes(w))) return 'Please choose a different name';
  const sp = words.join(' ');
  if (FAMOUS.some(f => f.includes(' ') ? (' ' + sp + ' ').includes(' ' + f + ' ') || flat === f.replace(/ /g, '') : words.includes(f.replace(/'/g, '')) || flat === f)) return 'Real footballers’ names can’t be used';
  return ''; };
const rnMap = (club, ids, S) => { const o = {}, R = (club && club.rn) || {}; for (const id of (ids || []).slice(0, 18)) { const g = gidOf(id, S), r = R[g]; if (r && r.n) o[g] = { n: String(r.n).slice(0, 24), c: String(r.c || '').slice(0, 4) }; } return o; };
const cleanPName = (n) => String(n || '').normalize('NFC').replace(/\s+/g, ' ').trim().slice(0, 24);
/* G18 🌍 club nation: every player of a club gets a made-up name from his club's country (same answer on every phone and in the worker) */
const NAT_CULT = (() => { const o = {}, put = (k, L) => L.split(' ').forEach(c => { o[c] = k; });
  put('gh', 'GH'); put('ng', 'NG'); put('ea', 'KE UG TZ RW ET BI SS SO ER DJ'); put('za', 'ZA BW NA ZW ZM LS SZ MW');
  put('fr', 'FR SN CI ML CM BF GN NE TG BJ GA CG CD CF TD MG KM GW GM SL LR MU'); put('ar', 'MA DZ TN EG LY SA AE QA KW BH OM JO IQ SY LB YE SD MR PS');
  put('cn', 'CN TW HK SG MY'); put('jp', 'JP'); put('kr', 'KR KP'); put('in', 'IN PK BD LK NP AF MV BT');
  put('en', 'GB EN SC2 WA NIR US CA AU NZ IE'); put('es', 'ES AD'); put('pt', 'PT BR AO MZ CV ST TL'); put('it', 'IT SM MT'); put('de', 'DE AT CH LI LU');
  put('nl', 'NL BE'); put('ee', 'PL HR RS RO CZ SK UA RU BG SI BA ME MK HU AL BY LT LV EE MD XK GR CY GE AM');
  put('la', 'MX AR CO CL PE UY VE EC PY BO CR HN GT SV NI PA CU DO PR'); put('ca', 'JM TT HT BB BS GY SR LC VC GD AG DM KN BZ'); put('tr', 'TR AZ KZ UZ TM KG');
  return o; })();
const natCult = (cc) => NAT_CULT[String(cc || '').toUpperCase()] || 'en';
const natName = (gid, cc) => {
  const C = CULT[natCult(cc)], F = C[1].split(' '), L = C[2].split(' '), r = rng(hash(WORLD + ':nat:' + gid + ':' + String(cc).toUpperCase()));
  const first = pick(r, F); let li = Math.floor(r() * L.length);
  for (let k = 0; k < L.length; k++) { const n = first + ' ' + L[(li + k) % L.length]; if (!REAL_NAMES.has(n.toLowerCase()) && !nameProblem(n)) return n; }
  return first + ' ' + L[li];
};

/* ===================== 🌍 G6 · zones, climate + weather, touchline managers, balls ===================== */
/* climate: 0 temperate north, 1 temperate south, 2 tropical, 3 dry/desert, 4 cold north (phone picks it from its time zone name) */
const CLIM_NAME = ['Temperate', 'Temperate (south)', 'Tropical', 'Dry', 'Cold'];
const climOk = (c) => { c = Math.floor(Number(c)); return c >= 0 && c <= 4 ? c : 0; };
const CLIM_AI = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 4, 4, 4, 2, 2, 2], [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 4, 4, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2]];
const aiClim = (ci) => CLIM_AI[aiZone(ci)][hash('clim:' + ci) % 20];
const climFromTz = (tz) => { tz = String(tz || '');
  if (/^(Australia\/|Pacific\/(Auckland|Chatham)|Antarctica|Atlantic\/(Stanley|South_Georgia)|America\/(Argentina|Santiago|Montevideo|Punta_Arenas|Asuncion|Sao_Paulo)|Africa\/(Johannesburg|Maseru|Mbabane|Windhoek|Gaborone))/.test(tz)) return 1;
  if (/^(Asia\/(Dubai|Riyadh|Qatar|Kuwait|Bahrain|Muscat|Aden|Baghdad|Karachi|Tehran|Kabul|Ashgabat)|Africa\/(Cairo|Tripoli|Khartoum|Algiers|Tunis|Casablanca|El_Aaiun|Nouakchott|Niamey|Ndjamena|Bamako)|America\/(Phoenix|Hermosillo))/.test(tz)) return 3;
  if (/^(Europe\/(Moscow|Helsinki|Stockholm|Oslo|Tallinn|Riga|Vilnius|Kirov|Samara|Volgograd)|Atlantic\/Reykjavik|Asia\/(Novosibirsk|Yekaterinburg|Omsk|Krasnoyarsk|Irkutsk|Yakutsk|Vladivostok|Magadan|Almaty|Astana|Ulaanbaatar)|America\/(Anchorage|Edmonton|Winnipeg|Regina|Montreal|Juneau|Nome))/.test(tz)) return 4;
  if (/^(Africa\/|Indian\/|Asia\/(Singapore|Jakarta|Makassar|Jayapura|Manila|Kolkata|Calcutta|Dhaka|Colombo|Bangkok|Ho_Chi_Minh|Saigon|Kuala_Lumpur|Yangon|Rangoon|Phnom_Penh|Vientiane|Brunei|Dili)|America\/(Bogota|Caracas|Lima|Guayaquil|Panama|Jamaica|Santo_Domingo|Port_of_Spain|Port-au-Prince|Havana|Puerto_Rico|Barbados|Martinique|Guadeloupe|Belize|Guatemala|Tegucigalpa|Managua|El_Salvador|Costa_Rica|Cancun|Merida|Bahia|Belem|Fortaleza|Manaus|Recife|Maceio|Cuiaba|Porto_Velho|Rio_Branco|La_Paz|Paramaribo|Cayenne|Guyana)|Pacific\/(Fiji|Port_Moresby|Guadalcanal|Noumea|Tahiti|Apia|Tongatapu|Honolulu))/.test(tz)) return 2;
  return 0; };
/* 🌦️ weather of one match: same on every phone (match id + home climate + month of the kick-off).
   k: clear · cloudy · rain · storm (heavy rain) · fog · snow.  t = temperature (°C), w = wind (m/s), dx/dy = wind direction on the pitch. */
const WX_KINDS = ['clear', 'cloudy', 'rain', 'storm', 'fog', 'snow'];
const WX_NAME = { clear: '☀️ Clear', cloudy: '☁️ Cloudy', rain: '🌧️ Rain', storm: '⛈️ Heavy rain', fog: '🌫️ Fog', snow: '❄️ Snow' };
const WIND_DIR = [[1, 0], [0.7071, 0.7071], [0, 1], [-0.7071, 0.7071], [-1, 0], [-0.7071, -0.7071], [0, -1], [0.7071, -0.7071]];
/* season by climate: 0 winter, 1 spring/autumn, 2 summer; tropics: 3 wet, 4 dry */
const seasonOf = (cz, ko) => { const m = new Date(Number(ko) || 0).getUTCMonth();
  if (cz === 2) return (m >= 4 && m <= 9) ? 3 : 4;
  const n = (m === 11 || m <= 1) ? 0 : (m >= 5 && m <= 7) ? 2 : 1; return cz === 1 ? (n === 0 ? 2 : n === 2 ? 0 : 1) : n; };
/* odds (out of 100) for clear, cloudy, rain, storm, fog, snow + temperature base and spread */
const WX_ODDS = {
  0: [[24, 26, 22, 7, 9, 12, 4, 8], [32, 30, 24, 6, 8, 0, 14, 9], [56, 22, 13, 8, 1, 0, 24, 8]],
  1: [[30, 30, 26, 7, 7, 0, 10, 7], [36, 30, 24, 5, 5, 0, 16, 8], [58, 22, 12, 8, 0, 0, 25, 8]],
  3: [[70, 18, 7, 2, 3, 0, 18, 8], [76, 14, 6, 2, 2, 0, 27, 8], [84, 10, 3, 3, 0, 0, 37, 6]],
  4: [[16, 22, 8, 4, 10, 40, -6, 8], [30, 32, 22, 6, 6, 4, 8, 9], [50, 26, 16, 7, 1, 0, 20, 7]],
  2: { 3: [26, 22, 26, 22, 4, 0, 28, 5], 4: [56, 26, 11, 4, 3, 0, 30, 5] } };
const wxOf = (key, cz, ko) => { cz = climOk(cz); const sn = seasonOf(cz, ko), O = cz === 2 ? WX_ODDS[2][sn] : WX_ODDS[cz][sn], r = rng(hash('wx:' + key));
  let x = r() * 100, k = 0; for (; k < 5; k++) { x -= O[k]; if (x < 0) break; }
  let kind = WX_KINDS[k]; const t = Math.round(O[6] + (r() * 2 - 1) * O[7]);
  if (kind === 'snow' && t > 3) kind = 'rain'; const temp = kind === 'snow' ? Math.min(t, 1) : kind === 'storm' || kind === 'rain' ? Math.min(t, 26) : t;
  const wind = Math.round((r() * r() * 14 + (kind === 'storm' ? 6 : 0)) * 10) / 10, d = WIND_DIR[Math.floor(r() * 8)];
  return { k: kind, t: temp, w: wind, dx: d[0], dy: d[1], cz, sn }; };
/* how the weather changes play (engine 4): all plain numbers */
const wxFx = (W) => { W = W || {}; const k = W.k, wet = k === 'rain' ? 1 : k === 'storm' ? 2 : 0, snow = k === 'snow' ? 1 : 0, heat = W.t >= 30 ? (W.t >= 35 ? 2 : 1) : 0, wind = W.w >= 7 ? (W.w - 6) / 8 : 0;
  return { wet, snow, heat, wind: wind > 1 ? 1 : wind,
    pass: 1 - 0.035 * wet - 0.03 * snow,
    touch: 1 - 0.05 * wet - 0.04 * snow,
    speed: 1 - 0.015 * wet - 0.06 * snow - 0.015 * heat,
    skid: 1 + 0.12 * wet - 0.25 * snow,
    slip: 0.0016 * wet + 0.0012 * snow,
    foul: 1 + 0.12 * wet + 0.08 * snow,
    tire: 1 + 0.18 * heat,
    drain: 1 + 0.12 * heat }; };
const wxLabel = (W) => W ? (WX_NAME[W.k] || '') + ' · ' + W.t + '°C' + (W.w >= 7 ? ' · 💨 windy' : '') : '';
/* 🧥 touchline manager look (designer): first design free, then 2 🪙 GG Coins */
const MGR_LIMITS = { sk: 8, hr: 12, hc: 8, bd: 5, gl: 3, fit: 4, col: COLORS.length, bu: 3, ag: 3 };
const MGR_FIT = ['Suit', 'Tracksuit', 'Long coat', 'Polo + trousers'];
const mgrOf = (ci) => { const r = rng(hash('mgr:' + ci)), o = {}; for (const k in MGR_LIMITS) o[k] = Math.floor(r() * MGR_LIMITS[k]); o.col = [10, 17, 8, 11, 0, 1, 23][Math.floor(r() * 7)]; return o; };
const cleanMgr = (m) => { m = m || {}; const o = {}; for (const k in MGR_LIMITS) { const v = Math.floor(Number(m[k])); o[k] = v >= 0 && v < MGR_LIMITS[k] ? v : 0; } return o; };
TOK.mgr = 2;
/* ⚽ tournament balls (looks only): new designs every season */
const ballOf = (kind, S, fin) => ({ kind: fin ? 'final' : kind, d: hash('ball:' + kind + ':' + S) % 4 });
/* G6: league + cup kick-off times are listed per GMT day in w11kt/{day} (the lock reads only that small doc) */
const ktDay = (t) => Math.floor(Number(t) / DAY);

return { ZONES, ZONE_NAME, ZONE_FLAG, ZONE_OF, cleanOf, zoneOf, NG, X6, zoneOfG, extraG, groupNo, aiZone, fairKo, cupId, cupOfs, CLIM_NAME, climOk, aiClim, climFromTz, WX_KINDS, WX_NAME, seasonOf, wxOf, wxFx, wxLabel, MGR_LIMITS, MGR_FIT, mgrOf, cleanMgr, ballOf, ktDay,  rnMap, DPOS, DLINE, DPOS_NAME, dpOf, canLearn, LEARN_MAX, LEARN_FAST, LEARN_FAST_DAYS, learnDays, gidOf, knownPos, learnedMap, posFit, COUNTRIES, nameProblem, cleanPName, normName, FAMOUS, EPOCH0, ENGINE, setEpoch, setMk3, mk3, WMAX, WMIN, natCult, natName, epoch, OC_FIRST, CL_FIRST, cupOn, CUP_TIMES, cupKoAt, TOK, COLORS, SHAPES, SYMS, PATS, BANDS, cleanKit, cleanCrest, STAFF, PHYSIO_REC, SCOUT_N, hasStaff, STD_SEATS, STD_TICKET, STD_COST, stdLv, SP_KINDS, spOffers, spOf, matchExtra, OC_DAYS, CL_DAYS, CL_GR, CUP_GAP, CUP_FIRST, OC_WIN, CL_WIN, CL_DRAW, CUP_PRIZE, CUP_NAME, cupDays, cupDay, cupKo, cupAiKo, cupMid, isCupDay, isKO, seat, cupUser, roundName, pens, cupScore, cupWin, winSide, cupStr, cupResStr, cupCoins, clTable, cupPairs, cupQuick, cupKoOf, ocBracket, clGroups, r500, NEW_RE, isNew, POS15, LEGEND_OVR, MAX_SQUAD, MIN_SQUAD, PLAYABLE, PIONEERS, nplayer, oplayer, value, releaseValue, youthIds, legendId, MK_N, MK_LEN, MK_LEN2, MK_T2, mkLen, MK_EXT, MK_AI, lotT0, lotPid, stepOf, lotInfo, lotEff, lotCur, absDay, REC, DRAIN, AI_COND, TR_MAX, PACK_FIT, condNow, FORM_NAMES, FP_X, FP_Y, FP_N, fpSpot, fpOk, fpClean, fpForm, sheetOf, aiSheet, ENGINE_TICKS, parseRes, RES_RE, WORLD, hash, rng, pick, clamp, CULT, POS_TEMPLATE, club, base, youth, player, squadIds, avg, DAY, EPOCH, SDAYS, MDS, SLOTS, AI_HOUR, MATCH_MS, clock, dayStart, ko, aiKo, TIER_START, groupsIn, gkey, initClubs, pairs, mid, quick, seatClub, isUserAt, strength, result, table, UP, DOWN, parentOf, childrenOf, nextClubs, winCoins, drawCoins, prize, PROMO_BONUS };
})();
// =====================================================================
// ⚽ G2 · 11 WONDERS LEAGUE (worker side). The worker never plays matches (too heavy for the free plan).
// It: puts clubs in groups, locks team sheets 15 min before kick-off, counts result "votes" from phones
// (2 different phones must agree), pays coins, updates fitness / cards / injuries, and runs the season change.
// =====================================================================
const C11 = W11C;
const W11_META = 'w11meta/season';
function w11v(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(w11v) } };
  return { mapValue: { fields: w11f(v) } };
}
function w11f(o) { const f = {}; for (const k in o) if (o[k] !== undefined) f[k] = w11v(o[k]); return f; }
const w11fp = (k) => /^[A-Za-z_][A-Za-z_0-9]*$/.test(k) ? k : '`' + String(k).replace(/`/g, '') + '`';
function w11name(env, path) { return `projects/${sa(env).project_id}/databases/(default)/documents/${path}`; }
async function w11get(env, path) {
  const r = await fetch(`${fsBase(env)}/${path}`, { headers: { Authorization: `Bearer ${await accessToken(env)}` } });
  if (!r.ok) return null; const j = await r.json(); return { data: decodeFields(j.fields || {}), ut: j.updateTime };
}
async function w11batchGet(env, paths) {
  const out = {}; if (!paths.length) return out;
  const r = await fetch(`${fsBase(env)}:batchGet`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ documents: paths.map(p => w11name(env, p)) }) });
  if (!r.ok) return out; const j = await r.json();
  for (const x of j || []) if (x.found) { const p = x.found.name.split('/documents/')[1]; out[p] = { data: decodeFields(x.found.fields || {}), ut: x.found.updateTime }; }
  return out;
}
async function w11query(env, coll, filters, limit) {
  const where = filters.length === 1 ? { fieldFilter: filters[0] } : { compositeFilter: { op: 'AND', filters: filters.map(f => ({ fieldFilter: f })) } };
  const r = await fetch(`${fsBase(env)}:runQuery`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ structuredQuery: { from: [{ collectionId: coll }], where, limit: limit || 50 } }) });
  if (!r.ok) return []; const j = await r.json();
  return (j || []).filter(x => x.document).map(x => ({ id: x.document.name.split('/').pop(), data: decodeFields(x.document.fields || {}), ut: x.document.updateTime }));
}
const w11eq = (field, v) => ({ field: { fieldPath: field }, op: 'EQUAL', value: w11v(v) });
/* writes: [{ path, data, mask?: [fields], pre?: { ut } | { exists }, inc?: {field: n}, push?: {field: [values]} }] */
/* G6: writes to the same doc in one commit are merged into one (later fields win, increments add up) */
const w11isObj = (o) => o && typeof o === 'object' && !Array.isArray(o);
const w11deep = (a, b) => { const o = { ...a }; for (const k in b) o[k] = w11isObj(o[k]) && w11isObj(b[k]) ? w11deep(o[k], b[k]) : b[k]; return o; };
function w11merge(writes) {
  const out = [], at = {};
  for (const w0 of writes) { if (!w0) continue; const w = { ...w0 }, i = at[w.path];
    if (i == null || w.pre || out[i].pre) { at[w.path] = out.length; out.push(w); continue; }
    const a = out[i];
    if (!w.mask) { out[i] = w; continue; }
    const m = { ...a, data: w11deep(a.data || {}, w.data || {}) };
    if (a.mask) m.mask = [...new Set(a.mask.concat(w.mask))];
    if (w.inc) { m.inc = { ...(a.inc || {}) }; for (const k in w.inc) m.inc[k] = (m.inc[k] || 0) + w.inc[k]; }
    if (w.push) { m.push = { ...(a.push || {}) }; for (const k in w.push) m.push[k] = (m.push[k] || []).concat(w.push[k]); }
    out[i] = m; }
  return out;
}
async function w11commit(env, writes) {
  writes = w11merge(writes);
  const body = { writes: writes.map(w => {
    const o = { update: { name: w11name(env, w.path), fields: w11f(w.data || {}) } };
    if (w.mask) o.updateMask = { fieldPaths: w.mask.map(m => m.split('.').map(w11fp).join('.')) };
    if (w.pre) o.currentDocument = w.pre.ut ? { updateTime: w.pre.ut } : { exists: !!w.pre.exists };
    const tr = [];
    for (const k in (w.inc || {})) tr.push({ fieldPath: k.split('.').map(w11fp).join('.'), increment: w11v(w.inc[k]) });
    for (const k in (w.push || {})) tr.push({ fieldPath: w11fp(k), appendMissingElements: { values: w.push[k].map(w11v) } });
    for (const k of (w.ts || [])) tr.push({ fieldPath: w11fp(k), setToServerValue: 'REQUEST_TIME' });
    if (tr.length) o.updateTransforms = tr;
    return o;
  }) };
  const r = await fetch(`${fsBase(env)}:commit`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return r.ok;
}
/* G6: za = active zones (a zone wakes up when its first manager joins), dx = extra Div 6 groups per zone */
async function w11meta(env, s, budget) {
  if (budget && budget.meta) return budget.meta;
  const m = await w11get(env, W11_META), d = (m && m.data) || {}, dx = Array.isArray(d.dx) ? d.dx.map(Number) : [];
  while (dx.length < C11.ZONES) dx.push(0);
  const M = { s: d.s || s, ph: d.ph || '', cur: d.cur || 0, plan: d.plan || '', za: Array.isArray(d.za) ? d.za.map(Number).filter(z => z >= 0 && z < C11.ZONES) : [], dx, pz: Array.isArray(d.pz) ? d.pz.map(Number) : [], ut: m && m.ut };
  if (budget) budget.meta = M; return M;
}
/* all groups of one zone (normal + extra Div 6 groups), and of all active zones */
const w11zoneGroups = (z, nx) => { const L = []; for (let t = 1; t <= 6; t++) { const n = C11.groupsIn(t); for (let l = 0; l < n; l++) L.push([t, z * n + l]); } for (let k = 0; k < (nx || 0); k++) L.push([6, C11.extraG(z, k)]); return L; };
const w11groups = (za, dx) => [].concat(...za.slice().sort((a, b) => a - b).map(z => w11zoneGroups(z, dx[z])));
const w11pristine = (s, t, g) => ({ s, t, g, z: C11.zoneOfG(t, g), clubs: C11.initClubs(t, g), users: {}, res: {} });
/* G6: kick-off times per GMT day (w11kt/{day} {kt:{ms:1}, lk:{ms:1}}): the lock only reads these small docs */
const w11kt = (times) => { const by = {}; for (const t of times) { if (!(t > 0)) continue; const d = C11.ktDay(t); (by[d] = by[d] || new Set()).add(t); }
  return Object.keys(by).map(d => { const kt = {}; by[d].forEach(t => { kt[t] = 1; }); return { path: `w11kt/${d}`, data: { kt }, mask: [...by[d]].map(t => 'kt.' + t) }; }); };

// ---------- 🧭 join a Division 6 group of your world zone (takes over a computer club mid-season) ----------
async function w11join(env, uid, sl, ofIn, czIn) {
  const now = Date.now(), { s, day } = C11.clock(now);
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const club = cd.data;
  if (club.lg && club.lg.s === s) return { ok: true, already: true, lg: club.lg };
  if (!(sl >= 0 && sl <= 3)) sl = 2;
  const of = C11.cleanOf(ofIn != null && ofIn !== '' && !isNaN(Number(ofIn)) ? ofIn : club.of), cz = C11.climOk(czIn != null ? czIn : club.cz), z = C11.zoneOf(of);
  let from = 0; for (let md = Math.max(1, day); md <= C11.MDS; md++) if (Math.min(C11.ko(s, md, sl, of), C11.aiKo(s, md, z)) - 20 * 60000 > now) { from = md; break; }
  const meta = await w11meta(env, s);
  if (!from || meta.s !== s) {
    const w = meta.s !== s ? meta.s + 1 : s + 1;
    await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { wait: w, sl, of, cz, zn: z }, mask: ['wait', 'sl', 'of', 'cz', 'zn'] }]);
    return { ok: true, wait: w, z };
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    const rows = await w11query(env, 'w11g', [w11eq('s', s), w11eq('t', 6), w11eq('z', z)], 300), have = {};
    rows.forEach(r => { have[r.data.g] = r; });
    const cand = []; for (let l = 0; l < 32; l++) cand.push(z * 32 + l); for (let k = 0; k <= meta.dx[z]; k++) cand.push(C11.extraG(z, k));
    let best = null;
    for (const g of cand) {
      const extra = g >= C11.X6, fresh = extra && C11.extraG(z, meta.dx[z]) === g, row = have[g], G = row ? row.data : w11pristine(s, 6, g), users = G.users || {};
      const free = []; for (let p = 0; p < 14; p++) if (!users[p]) free.push(p);
      if (!free.length) continue;
      const U = Object.values(users), same = U.filter(u => u.sl === sl).length, near = U.reduce((a, u) => a - Math.abs(C11.cleanOf(u.of) - of) / 240, 0), n = U.length;
      const score = (fresh ? -1000 : 0) + same * 10 + near + (n ? 3 : 0) - g * 0.0001;
      if (!best || score > best.score) best = { g, G, row, free, score, extra: fresh };
    }
    if (!best) return { ok: false, error: 'league full' };
    const { g, G, row, free } = best, pos = free[C11.hash(uid + ':' + s) % free.length];
    const users = { ...(G.users || {}) }, o = C11.avg(club.ids || C11.squadIds(club.club), s);
    users[pos] = { u: uid, c: club.club, n: club.name || 'My Club', sh: club.short || 'MYC', o, sl, of, cz, from, ai: G.clubs[pos] };
    const clubs = G.clubs.slice(); clubs[pos] = club.club;
    const writes = [{ path: `w11g/${C11.gkey(s, 6, g)}`, data: { s, t: 6, g, z, clubs, users, res: G.res || {}, at: now }, pre: row ? { ut: row.ut } : { exists: false } }];
    const Gn = { ...G, users, clubs }, kts = [];
    for (let md = from; md <= C11.MDS; md++) {
      const pr = C11.pairs(md).find(([h, a]) => h === pos || a === pos), [hp, ap] = pr, home = hp === pos, oth = home ? ap : hp, id = C11.mid(s, 6, g, md, hp), k = C11.ko(s, md, sl, of);
      if (C11.isUserAt(Gn, oth, md)) { if (home) kts.push(k); writes.push(home ? { path: `w11m/${id}`, data: { hu: uid, h: club.club, ko: k }, mask: ['hu', 'h', 'ko'] } : { path: `w11m/${id}`, data: { au: uid, a: club.club }, mask: ['au', 'a'] }); }
      else { kts.push(k); writes.push({ path: `w11m/${id}`, data: { s, t: 6, g, md, hp, ap, h: C11.seatClub(Gn, hp, md), a: C11.seatClub(Gn, ap, md), hu: home ? uid : '', au: home ? '' : uid, ko: k, st: 'sched', nv: 0, jobs: {} } }); }
    }
    writes.push(...w11kt(kts));
    const mw = { path: W11_META, data: { s }, mask: ['s'] }; if (!meta.za.includes(z)) mw.push = { za: [z] };
    if (best.extra) { const dx = meta.dx.slice(); dx[z] = meta.dx[z] + 1; mw.data.dx = dx; mw.mask.push('dx'); }
    if (mw.push || best.extra) writes.push(mw);
    writes.push({ path: `w11Clubs/${uid}`, data: { lg: { s, t: 6, g, pos, sl, z }, sl, of, cz, zn: z, wait: 0, cond: {}, cd: C11.absDay(now), tr: {}, trd: 0, yc: {}, ban: {}, inj: {} }, mask: ['lg', 'sl', 'of', 'cz', 'zn', 'wait', 'cond', 'cd', 'tr', 'trd', 'yc', 'ban', 'inj'] });
    if (await w11commit(env, writes)) { await w11cupTake(env, s, G.clubs[pos], club, uid, sl, o, of, z).catch(() => {}); return { ok: true, lg: { s, t: 6, g, pos, sl, z }, from, z }; }
  }
  return { ok: false, error: 'busy, try again' };
}

// ---------- 🔒 lock team sheets 15 minutes before kick-off ----------
async function w11lock(env, budget) {
  const now = Date.now(), { s, day } = C11.clock(now), K = new Set(), cupOf = {};
  const inWin = (k) => k - 15 * 60000 <= now && k > now - 6 * 3600000;
  /* G6: every league + cup kick-off time is listed in w11kt/{GMT day}; lk marks the ones already locked */
  const days = [...new Set([C11.ktDay(now - 6 * 3600000), C11.ktDay(now), C11.ktDay(now + 15 * 60000)])], kd = await w11batchGet(env, days.map(d => `w11kt/${d}`)); budget.n--;
  for (const d of days) { const D = kd[`w11kt/${d}`]; if (!D) continue; const kt = D.data.kt || {}, lk = D.data.lk || {};
    for (const t in kt) { const k = Number(t); if (inWin(k) && !lk[t]) { K.add(k); cupOf[k] = `w11kt/${d}`; } } }
  let done = 0;
  for (const k of K) {
    if (budget.n < 6) break;
    const rows = (await w11query(env, 'w11m', [w11eq('ko', k), w11eq('st', 'sched')], 100)).filter(r => r.data.st === 'sched'); budget.n--;
    if (cupOf[k] && rows.length < 100) { await w11commit(env, [{ path: cupOf[k], data: { lk: { [k]: 1 } }, mask: ['lk.' + k] }]); budget.n--; }
    if (budget.n < 5) break;
    if (!rows.length) continue;
    const need = new Set(); rows.forEach(r => { if (r.data.hu) need.add(r.data.hu); if (r.data.au) need.add(r.data.au); });
    const clubs = await w11batchGet(env, [...need].map(u => `w11Clubs/${u}`)); budget.n--;
    const today = C11.absDay(now), writes = [], alert = [];
    for (const r of rows) {
      const M = r.data, sd = (u, ci) => { const c = u && clubs[`w11Clubs/${u}`]; return c ? C11.sheetOf(c.data, today, M.s) : C11.aiSheet(ci, r.id, M.s); };
      writes.push({ path: `w11m/${r.id}`, data: { st: 'locked', s0: sd(M.hu, M.h), s1: sd(M.au, M.a), lockAt: now }, mask: ['st', 's0', 's1', 'lockAt'], pre: { ut: r.ut } });
      if (M.hu) alert.push(M.hu); if (M.au) alert.push(M.au);
    }
    for (let i = 0; i < writes.length; i += 400) { await w11commit(env, writes.slice(i, i + 400)); budget.n--; }
    done += rows.length;
    for (const u of alert.slice(0, 5)) { if (budget.n < 10) break; budget.n -= 4; await pushToUser(env, u, '⚽ 11 Wonders: kick-off in 15 min', 'Your match is about to start. Come and shout from the touchline!', SITE + '#11wonders', 'w11ko').catch(() => {}); }
  }
  return done;
}

// ---------- ✅ a phone sends the result it worked out ----------
const w11agreed = (v) => { const c = {}; for (const u in v || {}) { const x = v[u]; c[x] = (c[x] || 0) + 1; if (c[x] >= 2) return x; } return null; };
async function w11result(env, uid, mid, r) {
  if (!/^[\w-]{5,60}$/.test(mid) || typeof r !== 'string' || r.length > 2000 || !C11.RES_RE.test(r)) return { ok: false, error: 'bad result' };
  const m = await w11get(env, `w11m/${mid}`); if (!m) return { ok: false, error: 'no match' };
  const M = m.data; if (M.st === 'final') return { ok: true, final: M.r };
  if (M.st !== 'locked') return { ok: false, error: 'not played yet' };
  if (Date.now() < M.ko + C11.MATCH_MS + 3000) return { ok: false, error: 'still playing' };
  if (uid !== M.hu && uid !== M.au && !(M.jobs && M.jobs[uid])) return { ok: false, error: 'not your match' };
  const vd = await w11get(env, `w11v/${mid}`), v = { ...((vd && vd.data.v) || {}) }; v[uid] = r;
  const win = w11agreed(v);
  if (!win) { await w11commit(env, [{ path: `w11v/${mid}`, data: { v: { [uid]: r } }, mask: ['v.' + uid] }, { path: `w11m/${mid}`, data: { nv: Object.keys(v).length }, mask: ['nv'], pre: { ut: m.ut } }]); return { ok: true, waiting: true }; }
  const ok = await w11final(env, mid, M, m.ut, win, v);
  return { ok, final: win };
}
/* apply a confirmed result: table, coins, fitness, cards, bans, injuries */
async function w11final(env, mid, M, ut, r, v, quickSettled) {
  const P = C11.parseRes(r), day = C11.absDay(Date.now()), side = [M.hu, M.au], writes = [], FX = C11.wxFx(C11.wxOf(mid, (M.s0 || {}).cz, M.ko));
  const clubs = await w11batchGet(env, side.filter(Boolean).map(u => `w11Clubs/${u}`));
  for (let i = 0; i < 2; i++) {
    const u = side[i]; if (!u) continue; const cd = clubs[`w11Clubs/${u}`]; if (!cd) continue;
    const c = cd.data, sh = M['s' + i] || C11.sheetOf(c, day, M.s), gf = i ? P.a : P.h, ga = i ? P.h : P.a, res = gf > ga ? 'w' : gf < ga ? 'l' : 'd', phy = C11.hasStaff(c, 'ph', M.s);
    const cond = {}, ids = sh.ids || [], subs = P.subs[i] || [], ban = { ...(c.ban || {}) }, inj = { ...(c.inj || {}) }, yc = { ...(c.yc || {}) };
    (c.ids || []).forEach(id => { cond[id] = C11.condNow(c, id, day); });
    const played = {}; ids.slice(0, 11).forEach(id => { played[id] = 1; });
    subs.forEach(([o, n, k]) => { if (played[o] != null) played[o] = Math.min(played[o], k / C11.ENGINE_TICKS); played[n] = 1 - k / C11.ENGINE_TICKS; });
    for (const id in played) { if (cond[id] == null) continue; const before = cond[id]; cond[id] = Math.max(0, Math.round(before - C11.DRAIN * FX.drain * played[id]));
      const rr = C11.rng(C11.hash(mid + ':inj:' + id)); if (!quickSettled && played[id] > 0.2 && rr() < (0.03 + (100 - before) * 0.0006) * (phy ? 0.6 : 1)) inj[id] = Math.max(Number(inj[id]) || 0, Math.max(1, 1 + Math.floor(rr() * 3) - (phy ? 1 : 0))); }
    (sh.bo || []).forEach(id => { ban[id] = Math.max(0, (Number(ban[id]) || 0) - 1); if (!ban[id]) delete ban[id]; });
    (sh.io || []).forEach(id => { inj[id] = Math.max(0, (Number(inj[id]) || 0) - 1); if (!inj[id]) delete inj[id]; });
    (P.cards[i] || []).forEach(([id, k]) => { if (k === 'r') ban[id] = (Number(ban[id]) || 0) + 1; else { yc[id] = (Number(yc[id]) || 0) + 1; if (yc[id] >= 5) { yc[id] = 0; ban[id] = (Number(ban[id]) || 0) + 1; } } });
    const extra = C11.matchExtra(c, M.s, i === 0, gf, ga);
    if (M.cup) {
      const coins = C11.cupCoins(M.cup, M.cr, P.h, P.a, mid, i) + extra;
      writes.push({ path: `w11Clubs/${u}`, data: { cond, cd: day, ban, inj, yc }, mask: ['cond', 'cd', 'ban', 'inj', 'yc'], inc: coins ? { coins } : null });
      continue;
    }
    const lst = { ...(c.lst || {}) }; lst.p = (lst.p || 0) + 1; lst[res] = (lst[res] || 0) + 1; lst.gf = (lst.gf || 0) + gf; lst.ga = (lst.ga || 0) + ga;
    const coins = (res === 'w' ? C11.winCoins(M.t) : res === 'd' ? C11.drawCoins(M.t) : 0) + extra;
    writes.push({ path: `w11Clubs/${u}`, data: { cond, cd: day, ban, inj, yc, lst }, mask: ['cond', 'cd', 'ban', 'inj', 'yc', 'lst'], inc: coins ? { coins } : null });
  }
  if (M.cup) { const k = M.cr + '_' + M.ck; writes.push({ path: CUPP(M.s, M.cup === 'oc' && M.cz != null ? 'oc' + M.cz : M.cup), data: { ur: { [k]: C11.cupResStr(M.cup, M.cr, P.h, P.a, mid) } }, mask: ['ur.' + k] }); }
  else writes.push({ path: `w11g/${C11.gkey(M.s, M.t, M.g)}`, data: { res: { [M.md + '_' + M.hp]: P.h + '-' + P.a } }, mask: ['res.' + M.md + '_' + M.hp] });
  writes.unshift({ path: `w11m/${mid}`, data: { st: 'final', r, nv: Object.keys(v || {}).length, fin: Date.now(), q: !!quickSettled }, mask: ['st', 'r', 'nv', 'fin', 'q'], pre: ut ? { ut } : undefined });
  if (v) writes.push({ path: `w11v/${mid}`, data: { v } });
  return await w11commit(env, writes);
}
/* matches nobody checked within 24 hours get the quick result (no cards, no injuries) */
async function w11settle(env, budget, all) {
  const now = Date.now(), rows = (await w11query(env, 'w11m', [w11eq('st', 'locked')], 60)).filter(r => { const M = r.data; if (M.ko + C11.MATCH_MS + 60000 > now) return false; return all ? !M.cup : M.ko < now - (M.cup ? 6 : 24) * 3600000; }); budget.n--;
  let n = 0;
  for (const r of rows.slice(0, all ? 20 : 4)) {
    if (budget.n < 4) break; const M = r.data, S = M.s;
    const o0 = C11.avg((M.s0 && M.s0.ids) || C11.squadIds(M.h), S), o1 = C11.avg((M.s1 && M.s1.ids) || C11.squadIds(M.a), S), q = C11.quick(M.cup ? r.id : C11.gkey(M.s, M.t, M.g) + ':' + M.md + ':' + M.hp, o0, o1);
    budget.n -= 2; if (await w11final(env, r.id, M, r.ut, q[0] + '-' + q[1] + '|;|;', null, true)) n++;
  }
  return n;
}
// ---------- 🔍 hand out a match for this phone to double-check ----------
async function w11jobs(env, uid) {
  const now = Date.now(), rows = (await w11query(env, 'w11m', [w11eq('st', 'locked')], 40)).filter(r => r.data.ko + C11.MATCH_MS + 10000 < now && r.data.hu !== uid && r.data.au !== uid && !(r.data.jobs || {})[uid]);
  rows.sort((a, b) => (b.data.nv || 0) - (a.data.nv || 0) || a.data.ko - b.data.ko);
  const pick = rows.slice(0, 2); if (!pick.length) return [];
  await w11commit(env, pick.map(r => ({ path: `w11m/${r.id}`, data: { jobs: { [uid]: now } }, mask: ['jobs.' + uid] })));
  return pick.map(r => ({ id: r.id, ...r.data }));
}
// ---------- 🏋️ training (once a day) and packs ----------
async function w11train(env, uid, f) {
  if (!['att', 'def', 'fit'].includes(f)) return { ok: false, error: 'pick attack, defence or fitness' };
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, day = C11.absDay(Date.now()); if (!c.lg) return { ok: false, error: 'join the league first' };
  if (c.trd === day) return { ok: false, error: 'Already trained today. Come back tomorrow!' };
  const tr = { att: 0, def: 0, fit: 0, ...(c.tr || {}) }; if (tr[f] >= C11.TR_MAX) return { ok: false, error: 'That training is maxed out this season' };
  tr[f]++;
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { tr, trd: day }, mask: ['tr', 'trd'], pre: { ut: cd.ut } }]);
  return ok ? { ok: true, tr, trd: day } : { ok: false, error: 'try again' };
}
async function w11pack(env, uid, k, id) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, day = C11.absDay(Date.now());
  if (k === 'energy') {
    if (!(c.energy > 0)) return { ok: false, error: 'No Energy Packs left' };
    const cond = {}; (c.ids || []).forEach(x => { cond[x] = Math.min(100, C11.condNow(c, x, day) + C11.PACK_FIT); });
    const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { cond, cd: day, energy: c.energy - 1 }, mask: ['cond', 'cd', 'energy'], pre: { ut: cd.ut } }]);
    return ok ? { ok: true, cond, cd: day, energy: c.energy - 1 } : { ok: false, error: 'try again' };
  }
  if (k === 'med') {
    if (!(c.med > 0)) return { ok: false, error: 'No Med-Packs left' };
    const inj = { ...(c.inj || {}) }; if (!(inj[id] > 0)) return { ok: false, error: 'That player is not injured' };
    delete inj[id];
    const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { inj, med: c.med - 1 }, mask: ['inj', 'med'], pre: { ut: cd.ut } }]);
    return ok ? { ok: true, inj, med: c.med - 1 } : { ok: false, error: 'try again' };
  }
  return { ok: false, error: 'unknown pack' };
}

// ---------- 🔁 season change (day 28): final tables → prizes → new groups. G6: every active zone has its own ladder ----------
async function w11season(env, budget) {
  const now = Date.now(), { s: cs, day } = C11.clock(now);
  const meta = await w11meta(env, cs, budget); budget.n--;
  const S = meta.s; if (S > cs || (S === cs && day < C11.SDAYS)) return 'not yet';
  const L = w11groups(meta.za, meta.dx), isU = (ci) => ci >= 100000;
  if (meta.ph === '' || meta.ph === 'fin') {
    if (meta.ph === '') { await w11settle(env, budget, true); }
    let cur = meta.cur;
    while (cur < L.length && budget.n > 10) {
      /* up to 10 groups a run (a computer club's strength is cheap now) */
      const part = L.slice(cur, cur + 10), rows = await w11batchGet(env, part.map(([t, g]) => `w11g/${C11.gkey(S, t, g)}`)); budget.n--;
      const writes = [], top2 = [];
      const done = part.map(([t, g]) => {
        const key = C11.gkey(S, t, g), row = rows[`w11g/${key}`], G = row ? { ...w11pristine(S, t, g), ...row.data } : w11pristine(S, t, g), res = { ...(G.res || {}) };
        for (let md = 1; md <= C11.MDS; md++) for (const [h, a] of C11.pairs(md)) if ((C11.isUserAt(G, h, md) || C11.isUserAt(G, a, md)) && !res[md + '_' + h]) { const q = C11.quick(key + ':' + md + ':' + h, C11.strength(G, h, md), C11.strength(G, a, md)); res[md + '_' + h] = q[0] + '-' + q[1]; writes.push({ path: `w11m/${C11.mid(S, t, g, md, h)}`, data: { st: 'final', q: true, r: q[0] + '-' + q[1] + '|;|;' }, mask: ['st', 'q', 'r'] }); }
        const tb = C11.table({ ...G, res }), fin = tb.map(r => G.clubs[r.pos]);
        writes.push({ path: `w11g/${key}`, data: { s: S, t, g, z: C11.zoneOfG(t, g), clubs: G.clubs, users: G.users || {}, res, fin, at: now } });
        writes.push(...w11hofWrites(S, 'd', t + '-' + g, fin[0], (Object.values(G.users || {}).find(u => u.c === fin[0]) || {}).n, t, g));
        tb.slice(0, 2).forEach(r => { const u = (G.users || {})[r.pos]; if (u) top2.push(u); });
        return { t, g, G, tb };
      });
      const bonus = {};
      if (top2.length) { const cs2 = await w11batchGet(env, top2.map(u => `w11Clubs/${u.u}`)); budget.n--; top2.forEach(u => { const k = cs2[`w11Clubs/${u.u}`], bo = k && C11.spOf(k.data, S, 'bo'); if (bo && bo.top2) bonus[u.u] = bo.top2; }); }
      for (const { t, g, G, tb } of done) tb.forEach((r, place) => { const u = (G.users || {})[r.pos]; if (!u) return; const up = t > 1 && place < C11.UP && !!C11.parentOf(t, g), down = t < 6 && place >= 14 - C11.DOWN;
        const tok = (up ? C11.TOK.promo : 0) + (place === 0 ? C11.TOK.title : 0), inc = { coins: C11.prize(t, place + 1) + (up ? C11.PROMO_BONUS : 0) + (bonus[u.u] || 0) }; if (tok) inc.gems = tok;
        writes.push({ path: `w11Clubs/${u.u}`, data: {}, mask: [], inc, push: { hist: [{ s: S, t, p: place + 1, pts: r.pts, up, down, z: C11.zoneOfG(t, g) }] } }); });
      /* one Hall of Fame doc write per commit chunk is fine; increments on w11meta/hof stay separate writes */
      for (let i = 0; i < writes.length; i += 450) { await w11commit(env, writes.slice(i, i + 450)); budget.n--; }
      cur += part.length;
      await w11commit(env, [{ path: W11_META, data: { s: S, ph: 'fin', cur }, mask: ['s', 'ph', 'cur'] }]); budget.n--;
      break;
    }
    if (cur < L.length) return 'fin ' + cur + '/' + L.length;
    meta.ph = 'plan'; meta.cur = 0; meta.pz = []; meta.plan = '';
  }
  if (meta.ph === 'plan') {
    let P = meta.plan ? JSON.parse(meta.plan) : null, cur = meta.cur, pz = meta.pz;
    if (!P) {
      /* managers waiting for next season wake up their zones too */
      const waiting = await w11query(env, 'w11Clubs', [w11eq('wait', S + 1)], 300); budget.n--;
      const wl = waiting.map(w => { const c = w.data, of = C11.cleanOf(c.of); return { u: c.uid || w.id, c: c.club, n: c.name || 'My Club', sh: c.short || 'MYC', sl: c.sl == null ? 2 : c.sl, of, cz: C11.climOk(c.cz), z: c.zn != null ? Number(c.zn) : C11.zoneOf(of) }; }).filter(x => x.c != null);
      pz = [...new Set(meta.za.concat(wl.map(x => x.z)))].filter(z => z >= 0 && z < C11.ZONES).sort((a, b) => a - b);
      P = { plan: [], users: {}, dx: [0, 0, 0, 0, 0, 0], ch: [], ru: [], wl }; cur = 0;
    }
    while (cur < pz.length && budget.n > 8) {
      const z = pz[cur], ZL = w11zoneGroups(z, meta.dx[z]), docs = await w11batchGet(env, ZL.map(([t, g]) => `w11g/${C11.gkey(S, t, g)}`)); budget.n--;
      const fins = {}, users = {};
      for (const [t, g] of ZL) { const d = docs[`w11g/${C11.gkey(S, t, g)}`]; const G = d ? d.data : w11pristine(S, t, g); fins[t + '-' + g] = G.fin || G.clubs;
        for (const p in (G.users || {})) { const u = G.users[p]; users[u.c] = { u: u.u, c: u.c, n: u.n, sh: u.sh, sl: u.sl, of: u.of, cz: u.cz }; }
        const f = fins[t + '-' + g] || []; if (f[0] != null) P.ch.push([t, z, g, f[0]]); if (f[1] != null) P.ru.push([t, z, g, f[1]]); }
      const plan = ZL.filter(([t, g]) => g < C11.X6 || t !== 6).map(([t, g]) => [t, g, C11.nextClubs(t, g, S, (a, b) => fins[a + '-' + b] || C11.initClubs(a, b))]);
      /* extra Div 6 groups: their top 2 managers swap with computer clubs in a Div 5 group of the same zone; the rest stay in their extra group */
      ZL.filter(([t, g]) => t === 6 && g >= C11.X6).forEach(([t, g]) => { plan.push([6, g, (fins['6-' + g] || C11.initClubs(6, g)).slice()]); });
      plan.filter(([t, g]) => t === 6 && g >= C11.X6).forEach(([t, g, me]) => {
        const k = Math.floor((g - C11.X6) / C11.ZONES), top = (fins['6-' + g] || []).slice(0, C11.UP).filter(isU), tgt = plan.find(([a, b]) => a === 5 && b === z * 16 + (k % 16));
        top.forEach(ci => { const x = tgt[2].map((v, i) => [v, i]).filter(([v]) => !isU(v)).pop(); if (!x) return; const j = me.indexOf(ci); me[j] = x[0]; tgt[2][x[1]] = ci; });
      });
      /* managers waiting to join this zone go into its Division 6 (same kick-off time first) */
      for (const c of P.wl.filter(x => x.z === z)) {
        if (users[c.c]) continue;
        let best = null; plan.forEach((p, i) => { if (p[0] !== 6) return; const aiAt = p[2].findIndex(x => !isU(x)); if (aiAt < 0) return; const same = p[2].filter(x => isU(x) && users[x] && users[x].sl === c.sl).length; const sc = same * 10 + (p[2].some(isU) ? 3 : 0) - p[1] * 0.0001; if (!best || sc > best.sc) best = { i, aiAt, sc }; });
        if (!best) { const nx = plan.filter(p => p[0] === 6 && p[1] >= C11.X6).length, g = C11.extraG(z, nx); plan.push([6, g, C11.initClubs(6, g)]); best = { i: plan.length - 1, aiAt: 0 }; }
        plan[best.i][2][best.aiAt] = c.c; users[c.c] = { u: c.u, c: c.c, n: c.n, sh: c.sh, sl: c.sl, of: c.of, cz: c.cz };
      }
      P.dx[z] = plan.filter(p => p[0] === 6 && p[1] >= C11.X6).length;
      plan.forEach(([t, g, cl]) => { P.plan.push([t, g, cl]); cl.forEach(ci => { if (users[ci]) P.users[ci] = users[ci]; }); });
      cur++;
      await w11commit(env, [{ path: W11_META, data: { s: S, ph: 'plan', cur, pz, plan: JSON.stringify(P) }, mask: ['s', 'ph', 'cur', 'pz', 'plan'] }]); budget.n--;
      break;
    }
    if (cur < pz.length) return 'plan ' + cur + '/' + pz.length;
    /* ⭐ Champions League: group champions by division (all zones), then runners-up, 64 clubs */
    const ord = (a, b) => a[0] - b[0] || a[2] - b[2] || a[1] - b[1];
    const cl = [...new Set(P.ch.sort(ord).map(x => x[3]).concat(P.ru.sort(ord).map(x => x[3])))].slice(0, 64);
    P.cl = cl; P.pz = pz; delete P.wl; delete P.ch; delete P.ru;
    await w11commit(env, [{ path: W11_META, data: { s: S, ph: 'build', cur: 0, pz, plan: JSON.stringify(P) }, mask: ['s', 'ph', 'cur', 'pz', 'plan'] }]); budget.n--;
    return 'planned';
  }
  if (meta.ph === 'build') {
    const P = JSON.parse(meta.plan || '{}'), N = S + 1; let cur = meta.cur, writes = [];
    const flush = async () => { for (let i = 0; i < writes.length; i += 450) { await w11commit(env, writes.slice(i, i + 450)); budget.n--; } writes = []; };
    while (cur < P.plan.length && budget.n > 6) {
      const [t, g, cl] = P.plan[cur], users = {}, kts = [];
      cl.forEach((ci, pos) => { const u = P.users[ci]; if (u) users[pos] = { u: u.u, c: ci, n: u.n, sh: u.sh, sl: u.sl, of: C11.cleanOf(u.of), cz: C11.climOk(u.cz), o: C11.avg(C11.squadIds(ci), N), from: 1 }; });
      writes.push({ path: `w11g/${C11.gkey(N, t, g)}`, data: { s: N, t, g, z: C11.zoneOfG(t, g), clubs: cl, users, res: {}, at: Date.now() } });
      for (let md = 1; md <= C11.MDS; md++) for (const [h, a] of C11.pairs(md)) {
        const hu = users[h], au = users[a]; if (!hu && !au) continue; const k = C11.ko(N, md, (hu || au).sl, (hu || au).of); kts.push(k);
        writes.push({ path: `w11m/${C11.mid(N, t, g, md, h)}`, data: { s: N, t, g, md, hp: h, ap: a, h: cl[h], a: cl[a], hu: hu ? hu.u : '', au: au ? au.u : '', ko: k, st: 'sched', nv: 0, jobs: {} } });
      }
      for (const pos in users) { const u = users[pos]; writes.push({ path: `w11Clubs/${u.u}`, data: { lg: { s: N, t, g, pos: Number(pos), sl: u.sl, z: C11.zoneOfG(t, g) }, zn: C11.zoneOfG(t, g), wait: 0, cond: {}, cd: C11.absDay(Date.now()), tr: {}, trd: 0, yc: {}, ban: {}, inj: {} }, mask: ['lg', 'zn', 'wait', 'cond', 'cd', 'tr', 'trd', 'yc', 'ban', 'inj'] }); }
      /* kt docs: one write per day doc per commit */
      const ktw = w11kt(kts); if (writes.length + ktw.length > 400) { await flush(); }
      writes.push(...ktw); cur++;
      if (writes.length > 300) await flush();
    }
    await flush();
    const done = cur >= P.plan.length;
    if (done && N >= C11.CUP_FIRST) { await w11commit(env, w11cupDocs(N, P)); budget.n--; }
    await w11commit(env, [{ path: W11_META, data: done ? { s: N, ph: '', cur: 0, plan: '', za: P.pz || [], dx: P.dx || [0, 0, 0, 0, 0, 0], pz: [] } : { s: S, ph: 'build', cur, plan: meta.plan }, mask: done ? ['s', 'ph', 'cur', 'plan', 'za', 'dx', 'pz'] : ['s', 'ph', 'cur', 'plan'] }]); budget.n--;
    return done ? 'season ' + N + ' ready' : 'build ' + cur + '/' + P.plan.length;
  }
  return 'idle';
}

// ---------- ⏱️ every 5 minutes ----------
async function w11cron(env) {
  const budget = { n: 44, meta: null }, out = {}; try { await w11epoch(env); budget.n--; } catch (e) {}
  try { out.locked = await w11lock(env, budget); } catch (e) { out.lockErr = String(e); }
  try { out.settled = await w11settle(env, budget, false); } catch (e) { out.settleErr = String(e); }
  try { if (budget.n > 10) out.cups = await w11cups(env, budget); } catch (e) { out.cupErr = String(e); }
  try { out.season = await w11season(env, budget); } catch (e) { out.seasonErr = String(e); }
  try { if (budget.n > 4) out.market = await w11mkSettle(env, budget); } catch (e) { out.mkErr = String(e); }
  return out;
}

// ---------- 🌐 routes ----------
async function w11route(req, env, ctx, url, json) {
  const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
  if (tooFast('w11:' + uid, 30, 60000)) return json({ ok: false, error: 'slow down' }, 429);
  let b = {}; if (req.method === 'POST') { try { b = await req.json(); } catch (e) {} }
  const p = url.pathname; await w11epoch(env);
  const g18 = await w11g18route(p, env, uid, b); if (g18) return json(g18);
  const g5 = await w11g5route(p, env, uid, b); if (g5) return json(g5);
  const g4c = await w11g4croute(p, env, uid, b); if (g4c) return json(g4c);
  const g6 = await w11g6route(p, env, uid, b); if (g6) return json(g6);
  if (p === '/w11/join') return json(await w11join(env, uid, Number(b.sl), b.of, b.cz));
  if (p === '/w11/result') return json(await w11result(env, uid, String(b.mid || ''), b.r));
  if (p === '/w11/job') return json({ ok: true, jobs: await w11jobs(env, uid) });
  if (p === '/w11/train') return json(await w11train(env, uid, String(b.f || '')));
  if (p === '/w11/pack') return json(await w11pack(env, uid, String(b.k || ''), String(b.id || '')));
  const g3 = await w11g3route(p, env, uid, b) || await w11g3broute(p, env, uid, b) || await w11g4route(p, env, uid, b); if (g3) return json(g3);
  if (p === '/w11/run' && await isAdminUid(env, uid)) return json({ ok: true, ...(await w11cron(env)) });
  return json({ ok: false, error: 'unknown' }, 404);
}
// =====================================================================
// 🔨 G3a · 11 WONDERS MARKET + YOUTH DRAFT + PIONEER WONDERS (worker side)
// 15 auctions always running (w11a/0 … w11a/14). Only lots with a human bid are stored; everything else
// (the player, start price, 🤖 computer-club snipes, unbid lots) comes from the shared core, so phones and
// the worker agree without extra reads. Coins of the top bidder are held at once and given back when outbid.
// =====================================================================
const MKP = (i) => `w11a/${i}`;
async function w11lots(env, extra) {
  const paths = []; for (let i = 0; i < C11.MK_N; i++) paths.push(MKP(i));
  return await w11batchGet(env, paths.concat(extra || []));
}
const w11lotOf = (docs, i) => { const x = docs[MKP(i)]; return x ? { ...x.data, i, _ut: x.ut } : null; };
/* players this manager is about to get from the market (top bidder now, or won but not handed over yet) */
function w11pending(docs, uid, now, skip) {
  let n = 0;
  for (let i = 0; i < C11.MK_N; i++) {
    if (i === skip) continue; const L = w11lotOf(docs, i); if (!L || L.u !== uid || L.done) continue;
    if (C11.lotEff(L, now).top === 'u') n++;
  }
  return n;
}
const w11acc = () => { const a = {}; return { a, add(u, inc, pid) { const x = a[u] || (a[u] = { inc: 0, push: [] }); x.inc += inc; if (pid) x.push.push(pid); } }; };
const w11accWrites = (A, pre) => Object.keys(A.a).filter(u => A.a[u].inc || A.a[u].push.length).map(u => ({ path: `w11Clubs/${u}`, data: {}, mask: [], inc: A.a[u].inc ? { coins: A.a[u].inc } : null, push: A.a[u].push.length ? { ids: A.a[u].push } : null, pre: pre && pre[u] ? { ut: pre[u] } : undefined }));

async function w11bid(env, uid, i, n, amt) {
  i = Math.floor(Number(i)); n = Math.floor(Number(n)); amt = Math.floor(Number(amt));
  if (!(i >= 0 && i < C11.MK_N) || !(n >= 0) || !(amt > 0 && amt <= 99000000)) return { ok: false, error: 'bad bid' };
  const now = Date.now(), docs = await w11lots(env, [`w11Clubs/${uid}`]), cd = docs[`w11Clubs/${uid}`];
  if (!cd) return { ok: false, error: 'Create your club first' };
  const c = cd.data, L = w11lotOf(docs, i), cur = C11.lotCur(i, L, now);
  if (cur.n !== n) return { ok: false, ended: true, error: 'Too late! That auction ended. A new player is up.' };
  const same = !!(L && L.n === n), E = C11.lotEff(same ? L : { i, n, st: cur.st }, now);
  if (E.closed) return { ok: false, ended: true, error: 'Too late! That auction ended.' };
  if (same && E.top === 'u' && L.u === uid) return { ok: false, error: 'You are already the top bidder' };
  if (amt < E.minNext) return { ok: false, min: E.minNext, error: 'Someone bid first. Bid at least ' + E.minNext.toLocaleString() };
  const back = same && L.u === uid ? L.p : 0, need = amt - back;
  if ((Number(c.coins) || 0) < need) return { ok: false, error: 'Not enough 💎 Gems' };
  const prevWin = !same && L && L.u === uid && !L.done && C11.lotEff(L, now).winner === 'u' ? 1 : 0;
  if ((c.ids || []).length + w11pending(docs, uid, now, i) + prevWin + 1 > C11.MAX_SQUAD) return { ok: false, full: true, error: 'Your squad is full (25). Release a player first.' };
  const A = w11acc(); A.add(uid, -need, null);
  let prev = (L && L.prev) || null;
  if (same && L.u && L.u !== uid) A.add(L.u, L.p, null);
  if (L && !same) {
    const PE = C11.lotEff(L, now);
    prev = { n: L.n, w: PE.winner || '', un: PE.winner === 'u' ? (L.un || '') : '', p: PE.price, ai: PE.aiClub, pid: PE.pid };
    if (L.u && !L.done) { if (PE.winner === 'u') A.add(L.u, 0, PE.pid); else A.add(L.u, L.p, null); }
  }
  const doc = { i, n, st: cur.st, end: Math.max(E.end, now + C11.MK_EXT), p: amt, u: uid, un: String(c.name || 'My Club').slice(0, 40), c: Number(c.club) || 0, nb: (same ? (L.nb || 0) : 0) + 1, done: 0, at: now };
  if (prev) doc.prev = prev;
  const writes = [{ path: MKP(i), data: doc, pre: L ? { ut: L._ut } : { exists: false } }, ...w11accWrites(A, { [uid]: cd.ut })];
  if (!(await w11commit(env, writes))) return { ok: false, retry: true, error: 'Someone bid at the same time. Try again!' };
  return { ok: true, lot: doc, coins: (Number(c.coins) || 0) - need };
}

/* hand over won players / give coins back for finished lots (cron every 5 min, or when a phone asks) */
async function w11mkSettle(env, budget) {
  const now = Date.now(), docs = await w11lots(env); if (budget) budget.n--;
  const todo = [];
  for (let i = 0; i < C11.MK_N; i++) { const L = w11lotOf(docs, i); if (L && L.u && !L.done) { const E = C11.lotEff(L, now); if (E.closed) todo.push([L, E]); } }
  if (!todo.length) return 0;
  const win = [...new Set(todo.filter(([, E]) => E.winner === 'u').map(([L]) => L.u))];
  const clubs = win.length ? await w11batchGet(env, win.map(u => `w11Clubs/${u}`)) : {}; if (budget && win.length) budget.n--;
  const A = w11acc(), writes = [], got = {};
  for (const [L, E] of todo) {
    let w = E.winner;
    if (w === 'u') { const k = clubs[`w11Clubs/${L.u}`], have = k ? (k.data.ids || []).length + (got[L.u] || 0) : 99; if (have >= C11.MAX_SQUAD) w = 'full'; }
    if (w === 'u') { A.add(L.u, 0, E.pid); got[L.u] = (got[L.u] || 0) + 1; } else A.add(L.u, L.p, null);
    writes.push({ path: MKP(L.i), data: { done: 1, w, wp: E.price }, mask: ['done', 'w', 'wp'], pre: { ut: L._ut } });
  }
  const ok = await w11commit(env, writes.concat(w11accWrites(A))); if (budget) budget.n--;
  return ok ? todo.length : 0;
}

// ---------- 🗑️ release a player (a few coins back; keep at least 16) ----------
async function w11release(env, uid, id) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, ids = c.ids || []; id = String(id || '');
  if (!ids.includes(id)) return { ok: false, error: 'That player is not in your squad' };
  if (ids.length <= C11.MIN_SQUAD) return { ok: false, error: 'You need at least ' + C11.MIN_SQUAD + ' players' };
  const S = C11.clock(Date.now()).s, back = C11.releaseValue(C11.player(id, S)), nids = ids.filter(x => x !== id);
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { ids: nids, ovr: C11.avg(nids, S) }, mask: ['ids', 'ovr'], inc: back ? { coins: back } : null, pre: { ut: cd.ut } }]);
  return ok ? { ok: true, ids: nids, back, coins: (Number(c.coins) || 0) + back } : { ok: false, error: 'try again' };
}

// ---------- 🧒 youth draft: 15 youngsters a season, keep up to 5 ----------
async function w11draft(env, uid, picks) {
  if (!Array.isArray(picks)) return { ok: false, error: 'pick your youngsters' };
  const now = Date.now(), S = C11.clock(now).s, docs = await w11lots(env, [`w11Clubs/${uid}`]), cd = docs[`w11Clubs/${uid}`];
  if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, nY = C11.hasStaff(c, 'sc', S) ? C11.SCOUT_N : 15;
  const P = [...new Set(picks.map(Number))].filter(k => Number.isInteger(k) && k >= 0 && k < nY);
  if (!P.length || P.length > 5 || P.length !== picks.length) return { ok: false, error: 'Pick 1 to 5 youngsters' };
  if (c.yd === S) return { ok: false, error: 'You already picked your youngsters this season' };
  const room = C11.MAX_SQUAD - (c.ids || []).length - w11pending(docs, uid, now, -1);
  if (P.length > room) return { ok: false, full: true, error: room > 0 ? 'Room for only ' + room + '. Release a player first.' : 'Your squad is full (25). Release a player first.' };
  const add = P.map(k => C11.youthIds(S, c.club, nY)[k]);
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { yd: S }, mask: ['yd'], push: { ids: add }, pre: { ut: cd.ut } }]);
  return ok ? { ok: true, ids: (c.ids || []).concat(add), yd: S } : { ok: false, error: 'try again' };
}

// ---------- 🌟 Pioneer wonder: one 150-OVR player for each of the first 50 managers ----------
async function w11gift(env, uid) {
  const now = Date.now(), S = C11.clock(now).s, docs = await w11lots(env, [`w11Clubs/${uid}`]), cd = docs[`w11Clubs/${uid}`];
  if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, no = Number(c.pioneerNo) || 0;
  if (!c.pioneer || !(no >= 1 && no <= C11.PIONEERS)) return { ok: false, error: 'Only for the first 50 Pioneers' };
  if (c.leg) return { ok: true, already: true, id: c.leg };
  if ((c.ids || []).length + w11pending(docs, uid, now, -1) + 1 > C11.MAX_SQUAD) return { ok: false, full: true, error: 'Your squad is full (25). Release a player to make room for your wonder.' };
  const id = C11.legendId(S, no);
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { leg: id }, mask: ['leg'], push: { ids: [id] }, pre: { ut: cd.ut } }]);
  return ok ? { ok: true, id } : { ok: false, error: 'try again' };
}

async function w11g3route(p, env, uid, b) {
  if (p === '/w11/bid') return await w11bid(env, uid, b.i, b.n, b.amt);
  if (p === '/w11/claim') return { ok: true, n: await w11mkSettle(env, null) };
  if (p === '/w11/release') return await w11release(env, uid, b.id);
  if (p === '/w11/draft') return await w11draft(env, uid, b.picks);
  if (p === '/w11/gift') return await w11gift(env, uid);
  return null;
}
// =====================================================================
// 🏆 G3b · 11 WONDERS CUPS + STADIUM + SPONSORS + STAFF + HALL OF FAME (worker side)
// Two cups a season (from Season 2): 🏆 Open Cup (every club, knockout, even days, final day 24) and
// ⭐ Champions League (64 best group champions, groups days 7–17, knockout 19–27). A cup doc w11c/{S}-{k}
// holds the draw and every decided round; computer-vs-computer results are worked out here from the shared core.
// Matches with a manager are normal w11m docs (lock → phones vote → final), kick-off 2 h after the league slot.
// =====================================================================
/* G6: k = 'cl' (worldwide) or 'oc' + zone (one Open Cup per world zone) */
const CUPP = (s, k) => `w11c/${s}-${k}`;
const HOFP = (s) => `w11hof/${s}`, HOF_META = 'w11meta/hof';
const w11cupName = (C, ci) => { const u = C11.cupUser(C, ci); return u ? u.n : C11.club(C11.seat(C, ci)).name; };
/* 🏛️ Hall of Fame: a season's winners (w11hof/{S}) and the all-time trophy count (w11meta/hof) */
function w11hofWrites(S, kind, key, ci, uname, t, g, ru) {
  if (ci == null) return [];
  const n = String(uname || C11.club(ci).name).slice(0, 40), e = { ci, n, u: uname ? 1 : 0 };
  if (t) { e.t = t; e.g = g; } if (ru) e.ru = ru;
  const f = kind === 'd' ? 'd.' + key : kind, data = kind === 'd' ? { s: S, d: { [key]: e } } : { s: S, [kind]: e };
  return [{ path: HOFP(S), data, mask: ['s', f] }, { path: HOF_META, data: { tro: { [ci]: { n } } }, mask: ['tro.' + ci + '.n'], inc: { ['tro.' + ci + '.' + (kind === 'd' ? 'l' : String(kind).slice(0, 2))]: 1 } }];
}
/* the cups of season N, built from the season plan: an Open Cup for every active zone, and the worldwide Champions League */
const w11pickU = (users, ids) => { const u = {}; ids.forEach(ci => { const x = users[ci]; if (x) u[ci] = { u: x.u, n: x.n, sh: x.sh, sl: x.sl == null ? 2 : x.sl, o: x.o || 60, of: C11.cleanOf(x.of), cz: C11.climOk(x.cz) }; }); return u; };
function w11ocDoc(N, z, plan, users) {
  const all = []; plan.forEach(([t, g, cl]) => { if (C11.zoneOfG(t, g) === z) cl.forEach(ci => all.push([t, ci])); });
  all.sort((a, b) => a[0] - b[0] || C11.hash(N + ':ocs:' + a[1]) - C11.hash(N + ':ocs:' + b[1]) || a[1] - b[1]);
  const ob = C11.ocBracket(N * 7 + z, all.map(x => x[1]));
  return { path: CUPP(N, 'oc' + z), data: { s: N, k: 'oc', z, R: ob.R, b: ob.b, users: w11pickU(users, ob.b.filter(x => x >= 0)), tk: {}, rr: {}, ur: {}, pu: {}, pr: 0, dn: 0, at: Date.now() } };
}
function w11cupDocs(N, P) {
  const users = P.users || {}, zs = P.pz || [...new Set(P.plan.map(([t, g]) => C11.zoneOfG(t, g)))], docs = [];
  if (C11.cupOn(N, 'oc')) for (const z of zs) docs.push(w11ocDoc(N, z, P.plan, users));
  if (C11.cupOn(N, 'cl') && P.cl && P.cl.length === 64) { const gs = C11.clGroups(N, P.cl); docs.push({ path: CUPP(N, 'cl'), data: { s: N, k: 'cl', R: 11, gs, users: w11pickU(users, gs), tk: {}, rr: {}, ur: {}, pu: {}, pr: 0, dn: 0, at: Date.now() } }); }
  return docs;
}
/* an Open Cup drawn mid-season for a zone (its groups as they are now; managers already in keep their seats) */
async function w11firstCup(env, s, z, budget, meta) {
  const L = w11zoneGroups(z, meta.dx[z]);
  const gd = await w11batchGet(env, L.map(([t, g]) => `w11g/${C11.gkey(s, t, g)}`)); budget.n--;
  const users = {}, plan = L.map(([t, g]) => { const d = gd[`w11g/${C11.gkey(s, t, g)}`], G = d ? d.data : w11pristine(s, t, g);
    for (const p in (G.users || {})) { const u = G.users[p]; users[u.c] = { u: u.u, n: u.n, sh: u.sh, sl: u.sl, o: u.o, of: u.of, cz: u.cz }; }
    return [t, g, G.clubs || C11.initClubs(t, g)]; });
  const doc = w11ocDoc(s, z, plan, users);
  const ok = await w11commit(env, [{ ...doc, pre: { exists: false } }]); budget.n--;
  return ok ? doc.data : null;
}
/* a manager who takes over a computer club mid-season also takes over its cup places */
async function w11cupTake(env, s, ai, club, uid, sl, o, of, z) {
  if (s < C11.CUP_FIRST || ai == null || ai >= 100000) return;
  const u = { u: uid, n: club.name || 'My Club', sh: club.short || 'MYC', sl, o: o || 60, of: C11.cleanOf(of), cz: C11.climOk(club.cz) };
  for (const k of ['oc' + (z == null ? C11.aiZone(ai) : z), 'cl']) if (C11.cupOn(s, k.slice(0, 2))) await w11commit(env, [{ path: CUPP(s, k), data: { tk: { [ai]: club.club }, users: { [club.club]: u } }, mask: ['tk.' + ai, 'users.' + club.club], pre: { exists: true } }]);
}
/* batchGet with only a few fields (cheap): used to see which cup needs work this run */
async function w11batchGetMask(env, paths, fields) {
  const out = {}; if (!paths.length) return out;
  const r = await fetch(`${fsBase(env)}:batchGet`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ documents: paths.map(p => w11name(env, p)), mask: { fieldPaths: fields } }) });
  if (!r.ok) return out; const j = await r.json();
  for (const x of j || []) if (x.found) { const p = x.found.name.split('/documents/')[1]; out[p] = { data: decodeFields(x.found.fields || {}), ut: x.found.updateTime }; }
  return out;
}
/* is there something to do for this cup now? (decide the last played round, or get the next one ready) */
const w11cupDue = (C, now) => { const r = (C.dn || 0) + 1, q = (C.pr || 0) + 1;
  const dec = r <= C.R && (C.pr || 0) >= r && now >= C11.cupAiKo(C.s, C11.cupDay(C, r), C.k === 'oc' ? C.z : null) + C11.MATCH_MS + 60000;
  const need = (C.k === 'oc' ? q > 1 : q > C11.CL_GR) && (C.dn || 0) < q - 1;
  const prep = q <= C.R && !need && now >= C11.dayStart(C.s, C11.cupDay(C, q)) - 26 * 3600000;
  return dec || prep; };
/* ⏱️ every 5 minutes: decide finished rounds (prizes on the final), then get the next round's matches ready */
async function w11cups(env, budget) {
  const now = Date.now(), { s, day } = C11.clock(now); if (s < C11.CUP_FIRST) return 'off';
  const meta = await w11meta(env, s, budget);
  const paths = []; for (const S of (day <= 2 && s > C11.CUP_FIRST ? [s - 1, s] : [s])) { if (C11.cupOn(S, 'oc')) for (const z of meta.za) paths.push(CUPP(S, 'oc' + z)); if (C11.cupOn(S, 'cl')) paths.push(CUPP(S, 'cl')); }
  if (!paths.length) return 'none';
  const lite = await w11batchGetMask(env, paths, ['s', 'k', 'z', 'R', 'pr', 'dn']); budget.n--;
  const out = [];
  /* a zone that woke up early in the season gets its Open Cup drawn (one a run) */
  if (C11.cupOn(s, 'oc') && day <= 4 && budget.n > 12) for (const z of meta.za) if (!lite[CUPP(s, 'oc' + z)]) { const D = await w11firstCup(env, s, z, budget, meta); if (D) out.push('oc' + z + ':drawn'); break; }
  const due = paths.filter(p => lite[p] && w11cupDue(lite[p].data, now));
  if (!due.length) return out.join(' ') || 'idle';
  const k0 = Math.floor(now / 300000) % due.length, pick = due.slice(k0).concat(due.slice(0, k0)).slice(0, 2);
  const docs = await w11batchGet(env, pick); budget.n--;
  for (const p of pick) { const d = docs[p]; if (!d) continue; if (budget.n < 8) break; out.push(C11.cupId(d.data) + ':' + await w11cupStep(env, { ...d.data }, budget, now)); }
  return out.join(' ') || 'none';
}
async function w11cupStep(env, C, budget, now) {
  let did = '';
  const r = (C.dn || 0) + 1;
  const CP = CUPP(C.s, C11.cupId(C));
  if (r <= C.R && (C.pr || 0) >= r && now >= C11.cupAiKo(C.s, C11.cupDay(C, r), C.k === 'oc' ? C.z : null) + C11.MATCH_MS + 60000) {
    const ks = (C.pu && C.pu[r]) || [], ur = C.ur || {};
    if (!ks.some(k => !ur[r + '_' + k])) {
      const P = C11.cupPairs(C, r), rr = P.map((p, k) => p[0] < 0 || p[1] < 0 ? 'bye' : ur[r + '_' + k] || C11.cupQuick(C, r, k, p));
      const writes = [{ path: CP, data: { rr: { [r]: rr }, dn: r }, mask: ['rr.' + r, 'dn'] }];
      C.rr = { ...(C.rr || {}), [r]: rr }; C.dn = r;
      if (r === C.R) { const X = await w11cupChamp(env, C, P[0], rr[0], budget); Object.assign(writes[0].data, X.data); writes[0].mask.push('champ', 'ru'); writes.push(...X.writes); }
      await w11commit(env, writes); budget.n--; did += 'decided ' + r + ' ';
    }
  }
  const q = (C.pr || 0) + 1;
  const need = (C.k === 'oc' ? q > 1 : q > C11.CL_GR) && !(C.rr && C.rr[q - 1]);
  if (q <= C.R && !need && budget.n > 6 && now >= C11.dayStart(C.s, C11.cupDay(C, q)) - 26 * 3600000) {
    const P = C11.cupPairs(C, q);
    if (P) {
      const writes = [], ks = [], d = C11.cupDay(C, q), kts = new Set();
      P.forEach((p, k) => { if (p[0] < 0 || p[1] < 0) return; const h = C11.cupUser(C, p[0]), a = C11.cupUser(C, p[1]), kt = C11.cupKoOf(C, q, p, k); if ((!h && !a) || kt - 20 * 60000 < now) return; ks.push(k); kts.add(kt);
        const cz = C.k === 'oc' && C.z != null ? { cz: C.z } : {};
        writes.push({ path: `w11m/${C11.cupMid(C.s, C11.cupId(C), q, k)}`, data: { s: C.s, cup: C.k, ...cz, cr: q, ck: k, md: d, t: 0, g: 0, hp: 0, ap: 1, h: C11.seat(C, p[0]), a: C11.seat(C, p[1]), hu: h ? h.u : '', au: a ? a.u : '', ko: kt, rn: C11.roundName(C, q), st: 'sched', nv: 0, jobs: {} } }); });
      writes.push({ path: CP, data: { pr: q, pu: { [q]: ks }, kt: { [q]: [...kts].sort((x, y) => x - y) } }, mask: ['pr', 'pu.' + q, 'kt.' + q] });
      writes.push(...w11kt([...kts]));
      for (let i = 0; i < writes.length; i += 400) { await w11commit(env, writes.slice(i, i + 400)); budget.n--; }
      did += 'ready ' + q + ' (' + ks.length + ')';
    }
  }
  return did || 'idle';
}
/* 🏆 the final: prizes for the winner and runner-up (if managers), 🏆 Bonus sponsor, Hall of Fame */
async function w11cupChamp(env, C, p, res, budget) {
  const w = C11.winSide(res, p), win = p[w], ru = p[1 - w], W = C11.cupUser(C, win), U = C11.cupUser(C, ru), writes = [];
  const champ = { ci: C11.seat(C, win), n: w11cupName(C, win) }, rup = { ci: C11.seat(C, ru), n: w11cupName(C, ru) };
  const us = [W, U].filter(Boolean), cs = us.length ? await w11batchGet(env, us.map(u => `w11Clubs/${u.u}`)) : {}; if (us.length) budget.n--;
  [[W, 0], [U, 1]].forEach(([u, place]) => { if (!u) return; const k = cs[`w11Clubs/${u.u}`]; if (!k) return; const bo = place === 0 ? C11.spOf(k.data, C.s, 'bo') : null;
    writes.push({ path: `w11Clubs/${u.u}`, data: {}, mask: [], inc: { coins: C11.CUP_PRIZE[C.k][place] + (bo && bo.cup ? bo.cup : 0), gems: C11.TOK[C.k][place] }, push: { tro: [{ s: C.s, k: C.k, p: place + 1 }] } }); });
  writes.push(...w11hofWrites(C.s, C11.cupId(C), C11.cupId(C), champ.ci, W ? W.n : null, 0, 0, rup));
  return { data: { champ, ru: rup }, writes };
}

// ---------- 🏟️ stadium · 🤝 sponsors · 👔 staff ----------
async function w11stadium(env, uid, act, nm) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, std = { lv: C11.stdLv(c), nm: String((c.std && c.std.nm) || ((c.name || 'My Club') + ' Park')).slice(0, 30) };
  if (act === 'name') {
    nm = String(nm || '').replace(/[<>"`\\{}]/g, '').replace(/\s+/g, ' ').trim();
    if (nm.length < 3 || nm.length > 30) return { ok: false, error: 'Stadium name: 3 to 30 letters' };
    std.nm = nm;
    const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { std }, mask: ['std'], pre: { ut: cd.ut } }]);
    return ok ? { ok: true, std } : { ok: false, error: 'try again' };
  }
  if (act === 'up') {
    if (std.lv >= 5) return { ok: false, error: 'Your stadium is already the biggest (level 5)' };
    const cost = C11.STD_COST[std.lv], have = Number(c.coins) || 0; if (have < cost) return { ok: false, error: 'Not enough 💎 Gems' };
    std.lv++;
    const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { std }, mask: ['std'], inc: { coins: -cost }, pre: { ut: cd.ut } }]);
    return ok ? { ok: true, std, coins: have - cost } : { ok: false, error: 'try again' };
  }
  return { ok: false, error: 'unknown' };
}
const w11tier = (c, S) => c.lg && c.lg.s === S ? c.lg.t : 6;
async function w11sponsor(env, uid, kd, k) {
  k = Math.floor(Number(k)); if (!C11.SP_KINDS.includes(kd) || !(k >= 0 && k <= 2)) return { ok: false, error: 'pick an offer' };
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, S = C11.clock(Date.now()).s;
  if (C11.spOf(c, S, kd)) return { ok: false, error: 'You already signed this kind of sponsor this season' };
  const off = C11.spOffers(S, c.club, w11tier(c, S))[kd][k], sp = c.sp && c.sp.s === S ? { ...c.sp } : { s: S }; sp[kd] = off;
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { sp }, mask: ['sp'], inc: off.up ? { coins: off.up } : null, pre: { ut: cd.ut } }]);
  return ok ? { ok: true, sp, coins: (Number(c.coins) || 0) + (off.up || 0) } : { ok: false, error: 'try again' };
}
async function w11staff(env, uid, k) {
  if (!C11.STAFF[k]) return { ok: false, error: 'unknown staff' };
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, S = C11.clock(Date.now()).s, cost = C11.STAFF[k], have = Number(c.coins) || 0;
  if (C11.hasStaff(c, k, S)) return { ok: false, error: 'Already hired this season' };
  if (have < cost) return { ok: false, error: 'Not enough 💎 Gems' };
  const stf = c.stf && c.stf.s === S ? { ...c.stf } : { s: S }; stf[k] = 1;
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { stf }, mask: ['stf'], inc: { coins: -cost }, pre: { ut: cd.ut } }]);
  return ok ? { ok: true, stf, coins: have - cost } : { ok: false, error: 'try again' };
}
async function w11g3broute(p, env, uid, b) {
  if (p === '/w11/stadium') return await w11stadium(env, uid, String(b.act || ''), b.nm);
  if (p === '/w11/sponsor') return await w11sponsor(env, uid, String(b.kind || ''), b.k);
  if (p === '/w11/staff') return await w11staff(env, uid, String(b.k || ''));
  return null;
}
// =====================================================================
// 🎨 G4 · 11 WONDERS: crest + kit redesign (costs 🪙 GG Coins) and the one-time switch to rare GG Coins.
// Money: the club field `coins` is shown as 💎 Gems (everyday money), the field `gems` as 🪙 GG Coins (rare tokens).
// =====================================================================
/* redesign crest + 3 kits: costs C11.TOK.design GG Coins (field gems) */
async function w11design(env, uid, b) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, have = Number(c.gems) || 0, cost = C11.TOK.design;
  if (!Array.isArray(b.kits) || b.kits.length !== 3 || !b.crest || typeof b.crest !== 'object') return { ok: false, error: 'bad design' };
  if (have < cost) return { ok: false, error: `Not enough 🪙 GG Coins (a redesign costs ${cost})` };
  const crest = C11.cleanCrest(b.crest), kits = b.kits.map(C11.cleanKit);
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { crest, kits }, mask: ['crest', 'kits'], inc: { gems: -cost }, pre: { ut: cd.ut } }]);
  return ok ? { ok: true, crest, kits, gems: have - cost } : { ok: false, error: 'try again' };
}
/* once per club: GG Coins become rare tokens (10, or 25 for Pioneers) */
async function w11g4once(env, uid) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data; if (c.g4) return { ok: true, already: true, gems: Number(c.gems) || 0 };
  const gems = c.pioneer ? C11.TOK.pio : C11.TOK.start;
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { gems, g4: 1 }, mask: ['gems', 'g4'], pre: { ut: cd.ut } }]);
  return ok ? { ok: true, gems } : { ok: false, error: 'try again' };
}
async function w11g4route(p, env, uid, b) {
  if (p === '/w11/design') return await w11design(env, uid, b);
  if (p === '/w11/g4') return await w11g4once(env, uid);
  return null;
}
// =====================================================================
// ⚽ G5 · 11 WONDERS: new match engine (v2), fresh Season 1, instant join, set-piece takers.
// - Season start day lives in w11meta/season.ep (read once a minute per worker instance) so a fresh Season 1 can start any day.
// - Results are only counted from phones running engine v2 (b.ev). Old phones are told to update.
// - /w11/fresh (admin): wipes league + cup + Hall of Fame data, keeps clubs/squads/coins/GG Coins/Pioneers/stadium/market,
//   and starts Season 1 today. Repeat the tap until it says done (big leagues need a few rounds).
// =====================================================================
let W11EP = { at: 0, ep: 0 };
async function w11epoch(env, force) {
  if (!force && Date.now() - W11EP.at < 60000) return W11EP.ep;
  const m = await w11get(env, W11_META); const ep = Number(m && m.data && m.data.ep) || 0; W11EP = { at: Date.now(), ep };
  if (ep) C11.setEpoch(ep);
  /* G18: the 'w' market (OVR 35–110) starts at w11meta/season.mk3. The first new worker sets it a whole hour ahead, so every phone learns it in time. */
  let mk = Number(m && m.data && m.data.mk3) || 0;
  if (!mk && m) { mk = Math.ceil((Date.now() + 1800000) / 3600000) * 3600000; try { await w11commit(env, [{ path: W11_META, data: { mk3: mk }, mask: ['mk3'] }]); } catch (e) {} }
  if (mk) C11.setMk3(mk);
  return ep;
}
/* set-piece takers: captain, penalties, free kicks, corners (must be in the squad) */
async function w11takers(env, uid, b) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const ids = cd.data.ids || [], tk = {}; for (const k of ['cap', 'pen', 'fk', 'ck']) { const v = b && b.tk && b.tk[k]; if (typeof v === 'string' && ids.includes(v)) tk[k] = v; }
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { tk }, mask: ['tk'] }]); return ok ? { ok: true, tk } : { ok: false, error: 'try again' };
}
async function w11list(env, coll, pageToken) {
  const u = `${fsBase(env)}/${coll}?pageSize=300&mask.fieldPaths=s${pageToken ? '&pageToken=' + encodeURIComponent(pageToken) : ''}`;
  const r = await fetch(u, { headers: { Authorization: `Bearer ${await accessToken(env)}` } }); if (!r.ok) return { docs: [], next: '' };
  const j = await r.json(); return { docs: (j.documents || []).map(d => d.name.split('/documents/')[1]), next: j.nextPageToken || '' };
}
async function w11deleteMany(env, paths) {
  for (let i = 0; i < paths.length; i += 400) { const body = { writes: paths.slice(i, i + 400).map(p => ({ delete: w11name(env, p) })) };
    const r = await fetch(`${fsBase(env)}:commit`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); if (!r.ok) return false; }
  return true;
}
const W11_RESET_FIELDS = ['lg', 'zn', 'wait', 'cond', 'cd', 'tr', 'trd', 'yc', 'ban', 'inj', 'lst', 'hist', 'tro', 'yd', 'sp', 'stf'];
async function w11fresh(env, uid) {
  if (!await isAdminUid(env, uid)) return { ok: false, error: 'admin only' };
  let calls = 0; const done = [];
  for (const coll of ['w11g', 'w11m', 'w11v', 'w11c', 'w11hof', 'w11kt']) {
    let tok = '', n = 0; do { const L = await w11list(env, coll, tok); calls++; if (L.docs.length) { if (!await w11deleteMany(env, L.docs)) return { ok: false, error: 'delete failed (' + coll + ')' }; calls++; n += L.docs.length; } tok = L.next; } while (tok && calls < 40);
    if (tok) return { ok: true, more: true, note: 'Tap again to continue', done };
    done.push(coll + ':' + n);
  }
  /* clubs keep squads, coins, GG Coins, Pioneer, stadium, kits; league life starts again */
  let tok = '', nc = 0; do { const L = await w11list(env, 'w11Clubs', tok); calls++; const writes = L.docs.map(p => ({ path: p, data: { wait: 0 }, mask: W11_RESET_FIELDS }));
    for (let i = 0; i < writes.length; i += 400) { if (!await w11commit(env, writes.slice(i, i + 400))) return { ok: false, error: 'club reset failed' }; calls++; } nc += L.docs.length; tok = L.next; } while (tok && calls < 45);
  if (tok) return { ok: true, more: true, note: 'Tap again to continue', done };
  const ep = Math.floor(Date.now() / C11.DAY) * C11.DAY;
  await w11deleteMany(env, ['w11meta/hof']);
  await w11commit(env, [{ path: W11_META, data: { s: 1, ph: '', cur: 0, plan: '', za: [], dx: [0, 0, 0, 0, 0, 0], pz: [], ep, eng: C11.ENGINE, fresh: Date.now() } }]);
  await w11epoch(env, true);
  return { ok: true, done: done.concat('clubs:' + nc), ep };
}
async function w11g5route(p, env, uid, b) {
  if (p === '/w11/result' && Number(b && b.ev) !== C11.ENGINE) return { ok: false, update: 1, error: 'Please close and reopen SINLESS GG to update 11 Wonders' };
  if (p === '/w11/tk') return await w11takers(env, uid, b);
  if (p === '/w11/fresh') return await w11fresh(env, uid);
  return null;
}
// =====================================================================
// 🧬 G4c · 11 WONDERS: learn a new position (free and slow, or 3 🪙 GG Coins for 3 days) and rename a player once.
// Club fields (worker-only): lp {gid: [pos, pos]} learned spots · trn {g, id, to, st, end} the one in training · rn {gid: {n, c}} renamed players.
// =====================================================================
async function w11learn(env, uid, b) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, now = Date.now(), S = C11.clock(now).s, lp = Object.assign({}, c.lp || {}); let trn = c.trn || null;
  /* a finished training becomes a learned spot */
  if (trn && Number(trn.end) <= now) { const a = (lp[trn.g] || []).slice(); if (!a.includes(trn.to) && a.length < C11.LEARN_MAX) a.push(trn.to); lp[trn.g] = a; trn = null; }
  if (b && b.cancel) { if (!trn) return { ok: false, error: 'Nobody is training' }; const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { lp, trn: null }, mask: ['lp', 'trn'], pre: { ut: cd.ut } }]); return ok ? { ok: true, lp, trn: null } : { ok: false, error: 'try again' }; }
  if (b && b.fast) {
    if (!trn) return { ok: false, error: 'Nobody is training' };
    const cost = C11.LEARN_FAST, have = Number(c.gems) || 0; if (have < cost) return { ok: false, error: `Not enough 🪙 GG Coins (it costs ${cost})` };
    const end = Math.min(Number(trn.end), now + C11.LEARN_FAST_DAYS * C11.DAY); if (end >= Number(trn.end)) return { ok: false, error: 'Already finishing within 3 days' };
    trn = Object.assign({}, trn, { end, fast: 1 });
    const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { lp, trn }, mask: ['lp', 'trn'], inc: { gems: -cost }, pre: { ut: cd.ut } }]);
    return ok ? { ok: true, lp, trn, gems: have - cost } : { ok: false, error: 'try again' };
  }
  const id = String(b && b.id || ''), to = String(b && b.pos || '');
  if (!(c.ids || []).includes(id)) return { ok: false, error: 'Not your player' };
  if (trn) return { ok: false, error: 'Another player is already training. Wait, cancel it, or finish it with GG Coins.' };
  const p = C11.player(id, S), g = (p && p.gid) || id, main = C11.dpOf(p), known = C11.knownPos({ lp }, id, S, now);
  if (known.length - 1 >= C11.LEARN_MAX) return { ok: false, error: `He already knows ${C11.LEARN_MAX} extra positions` };
  if (known.includes(to)) return { ok: false, error: 'He already plays there' };
  if (!C11.canLearn(main, to)) return { ok: false, error: 'Too far from his position' };
  trn = { g, id, to, st: now, end: now + C11.learnDays(g) * C11.DAY };
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { lp, trn }, mask: ['lp', 'trn'], pre: { ut: cd.ut } }]);
  return ok ? { ok: true, lp, trn } : { ok: false, error: 'try again' };
}
async function w11rename(env, uid, b) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, id = String(b && b.id || ''), S = C11.clock(Date.now()).s;
  if (!(c.ids || []).includes(id)) return { ok: false, error: 'Not your player' };
  const p = C11.player(id, S), g = (p && p.gid) || id, rn = Object.assign({}, c.rn || {});
  if (rn[g] && !rn[g].a) return { ok: false, error: 'This player was already renamed (once only)' };
  const n = C11.cleanPName(b && b.n), bad = C11.nameProblem(n); if (bad) return { ok: false, error: bad };
  const cc = String(b && b.c || '').toUpperCase(); if (!C11.COUNTRIES.includes(cc)) return { ok: false, error: 'Pick a country' };
  rn[g] = { n, c: cc };
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { rn }, mask: ['rn'], pre: { ut: cd.ut } }]);
  return ok ? { ok: true, rn } : { ok: false, error: 'try again' };
}
async function w11g4croute(p, env, uid, b) {
  if (p === '/w11/learn') return await w11learn(env, uid, b || {});
  if (p === '/w11/rename') return await w11rename(env, uid, b || {});
  return null;
}
// =====================================================================
// 🌍 G6 · 11 WONDERS: world zones (local kick-off times), weather, touchline managers (worker side)
// - /w11/tz {of, cz}: the phone's time zone (minutes east of GMT) + climate. Used for the next matches the worker creates
//   (your zone is fixed for the season you play in; it moves with you from the next season).
// - /w11/mgr {mgr}: the touchline manager's look. First design free, then 2 🪙 GG Coins.
// =====================================================================
async function w11tz(env, uid, b) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, of = C11.cleanOf(b && b.of), cz = C11.climOk(b && b.cz), writes = [{ path: `w11Clubs/${uid}`, data: { of, cz }, mask: ['of', 'cz'] }];
  if (c.of === of && c.cz === cz) return { ok: true, same: true, of, cz };
  const S = C11.clock(Date.now()).s, lg = c.lg;
  if (lg && lg.s === S) writes.push({ path: `w11g/${C11.gkey(lg.s, lg.t, lg.g)}`, data: { users: { [lg.pos]: { of, cz } } }, mask: ['users.' + lg.pos + '.of', 'users.' + lg.pos + '.cz'], pre: { exists: true } });
  const ok = await w11commit(env, writes) || await w11commit(env, writes.slice(0, 1));
  return ok ? { ok: true, of, cz, z: C11.zoneOf(of) } : { ok: false, error: 'try again' };
}
async function w11mgr(env, uid, b) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, have = Number(c.gems) || 0, cost = c.mgr ? C11.TOK.mgr : 0, mgr = C11.cleanMgr(b && b.mgr);
  if (have < cost) return { ok: false, error: `Not enough 🪙 GG Coins (a new look costs ${cost})` };
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { mgr }, mask: ['mgr'], inc: cost ? { gems: -cost } : null, pre: { ut: cd.ut } }]);
  return ok ? { ok: true, mgr, gems: have - cost, cost } : { ok: false, error: 'try again' };
}
async function w11g6route(p, env, uid, b) {
  if (p === '/w11/tz') return await w11tz(env, uid, b);
  if (p === '/w11/mgr') return await w11mgr(env, uid, b);
  return null;
}
// =====================================================================
// ⚽ G18 · 11 WONDERS DEMO
// - /w11/nation {c}: your club's country. Your home-grown players (first squad + youth draft) get made-up names from that country
//   (market players stay from all over the world)
//   (C11.natName), with the country's flag. Names you changed yourself (✏️ rename) are kept.
//   Call it again with no country after new players join, and they get names from your country too.
//   The auto names are marked a:1, so you can still rename those players once yourself.
//   The country is kept in rn._nat (rn is worker-only and every phone already reads it).
// - /w11/demo: the demo wallet: 💎 10,000,000 · 🪙 5,000,000 · ⚡ 1,000,000 · 🩹 1,000,000. Filled up again once a day (only ever raised, never lowered).
// =====================================================================
/* home-grown = the club's first squad ("club-slot", and the 17-year-olds who replace them) and youth-draft players ('y…'). Market players ('a', 'b', 'w') keep their own country. */
const w18home = (id) => /^\d+-\d+$/.test(String(id)) || /^y\d/.test(String(id));
const W18_DEMO = { coins: 10000000, gems: 5000000, energy: 1000000, med: 1000000 };
async function w11nation(env, uid, b) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, rn = Object.assign({}, c.rn || {}), S = C11.clock(Date.now()).s;
  let cc = String((b && b.c) || '').toUpperCase();
  if (!cc) cc = String((rn._nat && rn._nat.c) || '');
  if (!C11.COUNTRIES.includes(cc)) return { ok: false, error: 'Pick a country' };
  const same = rn._nat && rn._nat.c === cc; let n = 0;
  for (const id of (c.ids || [])) {
    if (!w18home(id)) continue;                        // market players stay from all over the world
    const p = C11.player(id, S); if (!p || p.legend) continue;
    const g = p.gid || id, cur = rn[g];
    if (cur && !cur.a) continue;                        // the manager renamed this one himself
    if (cur && cur.a && same && cur.c === cc) continue;  // already done
    rn[g] = { n: C11.natName(g, cc), c: cc, a: 1 }; n++;
  }
  if (same && !n) return { ok: true, rn, n: 0 };
  rn._nat = { c: cc };
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { rn }, mask: ['rn'], pre: { ut: cd.ut } }]);
  return ok ? { ok: true, rn, n } : { ok: false, error: 'try again' };
}
async function w11demo(env, uid) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, rn = Object.assign({}, c.rn || {});
  if (rn._d18 && Date.now() - (Number(rn._d18.at) || 0) < 86400000) return { ok: true, done: 1, coins: c.coins, gems: c.gems, energy: c.energy, med: c.med };
  const up = {}; for (const k in W18_DEMO) up[k] = Math.max(Number(c[k]) || 0, W18_DEMO[k]);
  rn._d18 = { at: Date.now() };
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { ...up, rn }, mask: ['coins', 'gems', 'energy', 'med', 'rn'], pre: { ut: cd.ut } }]);
  return ok ? { ok: true, ...up } : { ok: false, error: 'try again' };
}
async function w11g18route(p, env, uid, b) {
  if (p === '/w11/nation') return await w11nation(env, uid, b || {});
  if (p === '/w11/demo') return await w11demo(env, uid);
  if (p === '/w11/mlnow') return await mlHost(env, uid, true);
  return null;
}
// =====================================================================
// 🏛️ G18 · MASTER LEAGUE AUTOPILOT (runs every hour, with or without the host)
// hosts/{uid}.auto  = the host's settings (written by the app): on, days, reg, sched, sizes, h2h, cup modes, game, prize, rules, squad, first, s0, off
// hosts/{uid}.ml    = where the season is (written ONLY here): s, ph (wait → reg → live), regAt, closeAt, startAt, endAt, cupS, cupE, clS, clE, rem, pend
// mlReg/{uid}_s{N}  = the registration (status open/closed); mlReg/…/players/{uid} = { uid, tag, ign, gid, cups, out } written by each player
// Season timeline (host's own midnight): registration opens the day after the league ends → closes `sched` h before the start (fixtures out)
//   → league `days` days → Open Cup from day 3 to 2 days before the league ends → Champions League after the cup until 2 days after the league
//   → reminder to the host 2 days before the end → champions, titles and season news → next registration.
// Places: last season's divisions after promotion/relegation, only people who registered; empty places are filled by the next best from the
// division below (and so on); newcomers come in after everyone who was already in the league. A division with fewer than 3 joins the one above.
// =====================================================================
const MLD = 86400000, MLH = 3600000;
const mlInt = (v, lo, hi, d) => { v = Math.round(Number(v)); return v >= lo && v <= hi ? v : d; };
const mlDay0 = (t, off) => Math.floor((t + (off || 0) * 60000) / MLD) * MLD - (off || 0) * 60000;
const mlTag = (p) => String(p || '').toLowerCase();
const mlReal = (p) => p && !/^Club_\d+$/.test(p) && p !== 'Open Spot' && p !== 'TBD' && p !== '__BYE__';
function mlCupDates(start, end, isCL) {
  const days = Math.max(1, Math.round((end - start) / MLD) + 1), cupS = days >= 8 ? start + 2 * MLD : start, cupE = Math.max(cupS + MLD - 60000, end - 2 * MLD);
  if (!isCL) return [cupS, cupE];
  const clE = end + 2 * MLD, gap = Math.max(1, Math.round((clE - cupS) / MLD / 4)), clS = Math.min(Math.max(cupS + MLD, cupS + gap * MLD), end);
  return [clS, clE];
}
function mlPlan(A, s, regAt) {
  const reg = mlInt(A.reg, 1, 5, 2), days = mlInt(A.days, 3, 90, 14), sched = [6, 12, 24].includes(Number(A.sched)) ? Number(A.sched) : 12;
  const startAt = regAt + reg * MLD, closeAt = startAt - sched * MLH, endAt = startAt + days * MLD - 60000;
  const [cupS, cupE] = mlCupDates(startAt, endAt, false), [clS, clE] = mlCupDates(startAt, endAt, true);
  return { s, ph: 'wait', regAt, closeAt, startAt, endAt, cupS, cupE, clS, clE, rem: 0, pend: [] };
}
/* the same fixtures the app makes: everyone once (or home & away), matchdays by the circle method */
function mlLeagueMatches(players, h2h, stamp) {
  const ms = []; let n = 0;
  for (let i = 0; i < players.length; i++) for (let j = i + 1; j < players.length; j++) {
    ms.push({ id: `m_${stamp}_${n++}`, round: 1, p1: players[i], p2: players[j], s1: null, s2: null, winner: null, stage: 'League Match (Leg 1)', streamUrl: '', mvp: null, status: 'approved' });
    if (h2h === '2x') ms.push({ id: `m_${stamp}_${n++}`, round: 1, p1: players[j], p2: players[i], s1: null, s2: null, winner: null, stage: 'League Match (Leg 2)', streamUrl: '', mvp: null, status: 'approved' });
  }
  const ps = [...players]; if (ps.length % 2) ps.push('__BYE__');
  const N = ps.length, R1 = N - 1, key = (a, b) => [a, b].sort().join('\u0001'), round = {}, arr = [...ps];
  for (let r = 0; r < R1; r++) { for (let i = 0; i < N / 2; i++) round[key(arr[i], arr[N - 1 - i])] = r + 1; arr.splice(1, 0, arr.pop()); }
  ms.forEach(m => { const r = round[key(m.p1, m.p2)]; if (!r) return; m.leg = /leg 2/i.test(m.stage) ? 2 : 1; m.round = m.leg === 2 ? r + R1 : r; m.stage = `Matchday ${m.round}`; });
  return ms.sort((a, b) => a.round - b.round);
}
function mlStage(N, round) { const k = N / Math.pow(2, round - 1); return k === 2 ? 'Final' : k === 4 ? 'Semi-Final' : k === 8 ? 'Quarter-Final' : 'Round of ' + k; }
function mlKnockout(players, name, stamp) {
  let N = 2; while (N < players.length) N *= 2;
  const ms = []; for (let i = 0; i < N / 2; i++) ms.push({ id: `m_${stamp}_${i}`, round: 1, p1: players[i * 2] || 'Open Spot', p2: players[i * 2 + 1] || 'Open Spot', s1: null, s2: null, winner: null, stage: `🏆 ${name} · ${mlStage(N, 1)}`, streamUrl: '', mvp: null, status: 'approved' });
  return { N, ms };
}
const mlShuffle = (L, seed) => { const a = [...L], r = C11.rng(C11.hash(String(seed))); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
/* final table: points, goal difference, goals scored (approved results only) */
function mlOrder(t) {
  if (t.finalOrder && t.finalOrder.length) return t.finalOrder;
  const st = {}; (t.players || []).filter(mlReal).forEach(p => { st[p] = { p, pts: 0, gd: 0, gf: 0 }; });
  for (const m of (t.matches || [])) {
    if (m.status !== 'approved' || m.s1 == null || m.s2 == null || !mlReal(m.p1) || !mlReal(m.p2) || m.winner === 'NONE') continue;
    for (const p of [m.p1, m.p2]) st[p] = st[p] || { p, pts: 0, gd: 0, gf: 0 };
    const a = Number(m.s1), b = Number(m.s2); st[m.p1].gf += a; st[m.p2].gf += b; st[m.p1].gd += a - b; st[m.p2].gd += b - a;
    if (a > b) st[m.p1].pts += 3; else if (b > a) st[m.p2].pts += 3; else { st[m.p1].pts++; st[m.p2].pts++; }
  }
  return Object.values(st).sort((x, y) => y.pts - x.pts || y.gd - x.gd || y.gf - x.gf || x.p.localeCompare(y.p)).map(x => x.p);
}
function mlKoWinner(t) { const ms = (t.matches || []).filter(m => m.winner && m.winner !== 'DRAW' && m.winner !== 'NONE'); if (!ms.length) return null; const top = Math.max(...(t.matches || []).map(m => m.round || 1)); const fin = ms.filter(m => m.round === top).slice(-1)[0]; return fin && /final/i.test(fin.stage || '') && !/semi|quarter/i.test(fin.stage || '') ? fin.winner : null; }
async function mlListPlayers(env, rid) {
  const out = []; let tok = '';
  for (let k = 0; k < 4; k++) {
    const r = await fetch(`${fsBase(env)}/mlReg/${rid}/players?pageSize=300${tok ? '&pageToken=' + encodeURIComponent(tok) : ''}`, { headers: { Authorization: `Bearer ${await accessToken(env)}` } });
    if (!r.ok) break; const j = await r.json(); (j.documents || []).forEach(d => out.push(decodeFields(d.fields || {}))); tok = j.nextPageToken || ''; if (!tok) break;
  }
  return out;
}
const mlNotif = (toUid, fromUid, from, text, i) => ({ path: `notifications/ml${Date.now().toString(36)}${i}${Math.floor(Math.random() * 1e6).toString(36)}`, data: { toUid, fromUid, fromUser: from, type: 'tournament', postId: null, text: String(text).slice(0, 140), read: false }, ts: ['createdAt'] });
const mlTid = (uid, cid, s) => `tourn_${uid.slice(0, 6)}_${cid}_s${s}`.replace(/[^\w-]/g, '_');
const mlOrd = (n) => n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th');

/* 📝 open registration and tell last season's players */
async function mlOpenReg(env, uid, h, A, st, prevT, W) {
  const comps = h.comps || [], leagues = comps.filter(c => c.kind === 'league').sort((a, b) => a.tier - b.tier), cups = comps.filter(c => c.kind === 'cup' && ((A.cup || {})[c.id] || 'all') !== 'off');
  W.push({ path: `mlReg/${uid}_s${st.s}`, data: { hostUid: uid, org: h.org || '', user: h.user || '', season: st.s, status: 'open', regAt: st.regAt, closeAt: st.closeAt, startAt: st.startAt, endAt: st.endAt, comps: leagues.map(c => c.name).concat(cups.map(c => c.name)).slice(0, 12),
    regCups: cups.filter(c => (A.cup || {})[c.id] === 'reg').map(c => ({ id: c.id, name: c.name })), home: A.home || null, game: String(A.game || 'FC MOBILE').slice(0, 30), rules: String(A.rules || '').slice(0, 1500), squadId: A.squad || null, verified: !!h.verified, banned: (st.ban0 || []).slice(0, 100) }, ts: ['createdAt'] });
  const uids = new Set(); prevT.filter(t => t.compKind === 'league' && t.season === st.s - 1).forEach(t => (t.playerUids || []).forEach(u => uids.add(u)));
  [...uids].slice(0, 150).forEach((u, i) => W.push(mlNotif(u, uid, h.org || 'Master League', `📝 Registration for ${h.org || 'the Master League'} Season ${st.s} is open. Tap ✅ Register to keep your place (closes ${new Date(st.closeAt).toUTCString().slice(0, 22)} UTC).`, i)));
}
/* ⚽ close registration: places, fixtures, cups, Champions League */
async function mlSchedule(env, uid, h, A, st, prevT) {
  const rid = `${uid}_s${st.s}`, banned = new Set((st.ban0 || []).map(mlTag)), all0 = (await mlListPlayers(env, rid)).filter(x => x && x.tag && !x.out && x.uid);
  /* G18.1: this season's tournaments the host made by hand (e.g. "Start a full season"): people who joined them directly count as registered */
  const mine = prevT.filter(t => t.season === st.s && t.hostId === uid && !t.auto && !t.deleted), have = new Set(all0.map(x => mlTag(x.tag)));
  for (const t of mine) for (const p of (t.players || []).filter(mlReal)) { const k = mlTag(p); if (have.has(k)) continue; have.add(k);
    const pr = await w11get(env, `profiles/${k}`).catch(() => null), u = pr && pr.data && pr.data.uid; if (u) all0.push({ uid: u, tag: p, ign: '', gid: ((t.gameIds || {})[k] || ''), at: 0 }); }
  const regs = all0.filter(x => !banned.has(mlTag(x.tag))), bannedRegs = all0.filter(x => banned.has(mlTag(x.tag)));
  const R = {}; regs.forEach(x => { R[mlTag(x.tag)] = x; });
  const comps = h.comps || [], leagues = comps.filter(c => c.kind === 'league').sort((a, b) => a.tier - b.tier), cups = comps.filter(c => c.kind === 'cup');
  if (regs.length < 2 || !leagues.length) return { extend: true, n: regs.length };
  /* last season: the latest league of each division before this season */
  const last = leagues.map(c => prevT.filter(t => t.compId === c.id && t.compKind === 'league' && (t.season || 0) < st.s).sort((a, b) => (b.season || 0) - (a.season || 0))[0] || null);
  const orders = last.map(t => t ? mlOrder(t).filter(mlReal) : []);
  const next = orders.map(o => [...o]);
  for (let k = 0; k < leagues.length - 1; k++) {
    const up = Math.min(leagues[k + 1].promote || 0, orders[k + 1].length), down = Math.min(leagues[k].relegate || 0, orders[k].length);
    const promoted = orders[k + 1].slice(0, up), relegated = down ? orders[k].slice(-down) : [];
    next[k] = next[k].filter(p => !relegated.includes(p)).concat(promoted);
    next[k + 1] = next[k + 1].filter(p => !promoted.includes(p)).concat(relegated);
  }
  /* removed last season (not banned): one division lower (they stay in the bottom division if there is none below) */
  const drop = new Set((st.drop || []).map(mlTag)), minT = {};
  for (let k = 0; k < next.length - 1; k++) { const down = next[k].filter(p => drop.has(mlTag(p))); if (down.length) { next[k] = next[k].filter(p => !drop.has(mlTag(p))); next[k + 1] = next[k + 1].concat(down); down.forEach(p => { drop.delete(mlTag(p)); minT[mlTag(p)] = k + 1; }); } }
  /* the ladder: everyone who was in the league (division by division, best first), then newcomers in the order they registered */
  const seen = new Set(), ladder = [];
  next.forEach(L => L.forEach(p => { const k = mlTag(p); if (R[k] && !seen.has(k)) { seen.add(k); ladder.push(R[k]); } }));
  regs.filter(x => !seen.has(mlTag(x.tag))).sort((a, b) => (a.at || 0) - (b.at || 0)).forEach(x => { seen.add(mlTag(x.tag)); ladder.push(x); });
  /* fill each division from the top of the ladder; a player who dropped can't be pulled back above his new division */
  const tiers = leagues.map(() => []);
  leagues.forEach((c, k) => { const size = mlInt((A.sizes || {})[c.id], 2, 40, 16); for (let i = 0; i < ladder.length && tiers[k].length < size;) { if ((minT[mlTag(ladder[i].tag)] || 0) <= k) tiers[k].push(ladder.splice(i, 1)[0]); else i++; } });
  let li = tiers.length - 1; while (li > 0 && !tiers[li].length) li--;
  tiers[li].push(...ladder.splice(0, 8)); const waiting = ladder;
  for (let k = tiers.length - 1; k > 0; k--) if (tiers[k].length && tiers[k].length < 3) { tiers[k - 1].push(...tiers[k]); tiers[k] = []; }
  const W = [], placed = {}, stamp = Date.now().toString(36), base = { host: h.user || '', hostUid: uid, hostId: uid, hostOrg: h.org || '', game: String(A.game || 'FC MOBILE'), prizePool: String(A.prize || 'Bragging Rights').slice(0, 60), squadId: A.home || A.squad || null, fullSeason: false, eliminated: [], season: st.s, status: 'active', rules: String(A.rules || '').slice(0, 1500), needGameId: true, proofReq: A.proof !== false, deadlineHrs: 24, coHosts: [], coHostUids: [], verified: !!h.verified, auto: true };
  const gidsOf = (L) => { const o = {}; L.forEach(x => { o[mlTag(x.tag)] = `${x.ign || ''} · ${x.gid || ''}`.slice(0, 40); }); return o; };
  const made = [];
  leagues.forEach((c, k) => {
    const L = tiers[k]; if (L.length < 2) return; const players = L.map(x => x.tag), h2h = (A.h2h || {})[c.id] || c.h2h || '1x', id = mlTid(uid, c.id, st.s);
    W.push({ path: `tournaments/${id}`, data: { ...base, title: `${c.name} · Season ${st.s}`, format: 'LEAGUE', leagueH2H: h2h, maxPlayers: players.length, players, playerUids: L.map(x => x.uid), matches: mlLeagueMatches(players, h2h, stamp + k), compId: c.id, compName: c.name, compKind: 'league', tier: c.tier, startAt: st.startAt, endAt: st.endAt, gameIds: gidsOf(L) }, ts: ['createdAt', 'updatedAt'], pre: { exists: false } });
    L.forEach(x => { placed[mlTag(x.tag)] = { x, comp: c.name }; }); made.push(c.name + ' (' + players.length + ')');
  });
  const all = Object.values(placed).map(v => v.x);
  cups.forEach((c, ci) => {
    const mode = (A.cup || {})[c.id] || (/champion/i.test(c.name) ? 'qual' : 'all'); if (mode === 'off') return;
    let L = [];
    if (mode === 'all') L = all;
    else if (mode === 'reg') L = all.filter(x => (x.cups || []).includes(c.id));
    else { const q = []; leagues.forEach((lg, k) => { let from = 0; (lg.qual || []).forEach(x => { if (x.to === c.id) orders[k].slice(from, from + x.n).forEach(p => q.push(p)); from += x.n; }); });
      if (!q.length && orders[0]) orders[0].slice(0, 4).forEach(p => q.push(p)); L = q.map(p => placed[mlTag(p)] && placed[mlTag(p)].x).filter(Boolean); }
    if (L.length < 2) return;
    const isCL = mode === 'qual' || /champion/i.test(c.name), [s0, e0] = isCL ? [st.clS, st.clE] : [st.cupS, st.cupE], id = mlTid(uid, c.id, st.s);
    const ko = mlKnockout(mlShuffle(L.map(x => x.tag), id), c.name, stamp + 'c' + ci);
    W.push({ path: `tournaments/${id}`, data: { ...base, title: `${c.name} · Season ${st.s}`, format: 'KNOCKOUT', maxPlayers: ko.N, players: L.map(x => x.tag), playerUids: L.map(x => x.uid), matches: ko.ms, compId: c.id, compName: c.name, compKind: 'cup', tier: 0, startAt: s0, endAt: e0, gameIds: gidsOf(L) }, ts: ['createdAt', 'updatedAt'], pre: { exists: false } });
    st.pend.push({ id, at: e0 + MLD }); made.push(c.name + ' (' + L.length + ')');
  });
  W.push({ path: `mlReg/${rid}`, data: { status: 'closed', placed: Object.fromEntries(Object.values(placed).map(v => [mlTag(v.x.tag), v.comp])) }, mask: ['status', 'placed'] });
  Object.values(placed).forEach((v, i) => W.push(mlNotif(v.x.uid, uid, h.org || 'Master League', `⚽ ${h.org || 'Master League'} Season ${st.s}: fixtures are out! You play in ${v.comp}. Kick-off ${new Date(st.startAt).toUTCString().slice(0, 16)}.`, 'p' + i)));
  bannedRegs.slice(0, 40).forEach((x, i) => W.push(mlNotif(x.uid, uid, h.org || 'Master League', `🚫 You sit out ${h.org || 'the Master League'} Season ${st.s} (removed 3 times). You can come back next season 💪`, 'b' + i)));
  waiting.slice(0, 60).forEach((x, i) => W.push(mlNotif(x.uid, uid, h.org || 'Master League', `⏳ ${h.org || 'Master League'} Season ${st.s} is full. You're first in line for next season.`, 'w' + i)));
  const wrote = new Set();
  W.forEach(w => { if (!/^tournaments\//.test(w.path)) return; const id = w.path.slice(12); wrote.add(id); if (prevT.some(t => t.id === id)) { w.mask = Object.keys(w.data); w.ts = ['updatedAt']; delete w.pre; } });
  for (let i = 0; i < W.length; i += 400) { const ok = await w11commit(env, W.slice(i, i + 400)); if (!ok && i === 0) return { error: 'could not save the season' }; }
  const left = mine.filter(t => !wrote.has(t.id)).map(t => `tournaments/${t.id}`); if (left.length) await w11deleteMany(env, left).catch(() => {});
  return { ok: true, made, n: regs.length };
}
/* 🏁 a competition is over: champion, final table, title, everyone's news */
async function mlFinish(env, uid, h, t, notes) {
  if (!t || t.status === 'finished') return [];
  const W = [], league = t.format === 'LEAGUE', order = league ? mlOrder(t) : [], champ = league ? order[0] : mlKoWinner(t);
  W.push({ path: `tournaments/${t.id}`, data: { status: 'finished', champion: champ || null, finalOrder: league ? order : (champ ? [champ] : []), finishedAt: Date.now() }, mask: ['status', 'champion', 'finalOrder', 'finishedAt'] });
  if (champ) W.push({ path: `titles/ml_${t.id}`, data: { tag: mlTag(champ), user: champ, title: `${t.compName || t.title} Champion`, compId: t.compId || null, compName: t.compName || t.title, season: t.season || 1, hostUid: uid, hostOrg: t.hostOrg || null, compKind: t.compKind || null, tier: t.tier || 0, format: t.format || null, game: t.game || null, runnerUp: order[1] || null, tournId: t.id }, ts: ['at'] });
  /* season news for every player (their uid comes from the registration) */
  const regs = await mlListPlayers(env, `${uid}_s${t.season}`), U = {}; regs.forEach(x => { if (x && x.tag) U[mlTag(x.tag)] = x.uid; });
  const comps = (h.comps || []).filter(c => c.kind === 'league').sort((a, b) => a.tier - b.tier), k = comps.findIndex(c => c.id === t.compId);
  (league ? order : (t.players || [])).forEach((p, i) => {
    const u = U[mlTag(p)]; if (!u) return;
    let txt;
    if (champ && mlTag(p) === mlTag(champ)) txt = `👑 Congratulations! You are the ${t.compName || t.title} Champion (Season ${t.season})! 🏆`;
    else if (league) { const up = k > 0 ? (comps[k].promote || 0) : 0, down = k >= 0 && k < comps.length - 1 ? (comps[k].relegate || 0) : 0;
      txt = `🏁 ${t.compName} Season ${t.season} is over: you finished ${mlOrd(i + 1)} of ${order.length}.` + (up && i < up ? ` ⬆️ Promoted to ${comps[k - 1].name}!` : down && i >= order.length - down ? ` ⬇️ Relegated to ${comps[k + 1].name}.` : '') + ' Register for the next season to keep your place.'; }
    else txt = `🏁 ${t.compName || t.title} is over.${champ ? ' Champion: ' + champ + '.' : ''}`;
    W.push(mlNotif(u, uid, h.org || 'Master League', txt, i));
  });
  await w11commit(env, W); notes.push(`🏁 ${t.compName || t.title}: ${champ || 'no champion'}`);
  return [champ];
}
async function mlHost(env, uid, fromApp) {
  const hd = await w11get(env, `hosts/${uid}`); if (!hd) return { ok: false, error: 'Create your Master League first' };
  const h = hd.data, A = h.auto || {}; if (!A.on) return { ok: true, ml: h.ml || null, note: 'Autopilot is off' };
  { const L = (h.comps || []).filter(c => c.kind === 'league'), tiers = L.map(c => Number(c.tier) || 0);
    if (new Set(tiers).size !== tiers.length) { const order = L.slice().sort((a, b) => (Number(a.tier) || 0) - (Number(b.tier) || 0)); order.forEach((c, i) => { c.tier = i + 1; });
      await w11commit(env, [{ path: `hosts/${uid}`, data: { comps: h.comps }, mask: ['comps'] }]).catch(() => {}); } }
  const now = Date.now(), notes = [], off = Number(A.off) || 0, reg = mlInt(A.reg, 1, 5, 2);
  let st = h.ml && h.ml.s ? { ...h.ml, pend: [...(h.ml.pend || [])] } : null;
  if (!st) { const first = Number(A.first) || (mlDay0(now, off) + (reg + 1) * MLD); st = mlPlan(A, Math.max(1, mlInt(A.s0, 1, 999, 1)), mlDay0(first, off) - reg * MLD); notes.push(`Season ${st.s} planned`); }
  const prevT = (await w11query(env, 'tournaments', [w11eq('hostId', uid)], 120)).map(x => ({ ...x.data, id: x.id, _ut: x.ut }));
  let W = [];
  for (let guard = 0; guard < 4; guard++) {
    if (st.ph === 'wait' && now >= st.regAt) { await mlOpenReg(env, uid, h, A, st, prevT, W); st.ph = 'reg'; notes.push(`📝 Season ${st.s} registration is open`); continue; }
    if (st.ph === 'reg' && now >= st.closeAt) {
      if (W.length) { await w11commit(env, W); W = []; }
      const res = await mlSchedule(env, uid, h, A, st, prevT);
      if (res.extend) { const shift = reg * MLD; ['closeAt', 'startAt', 'endAt', 'cupS', 'cupE', 'clS', 'clE'].forEach(k => { st[k] += shift; }); W.push({ path: `mlReg/${uid}_s${st.s}`, data: { closeAt: st.closeAt, startAt: st.startAt, endAt: st.endAt }, mask: ['closeAt', 'startAt', 'endAt'] });
        W.push(mlNotif(uid, uid, 'Master League', `⏳ Only ${res.n} registered for Season ${st.s}, so registration stays open ${reg} more day(s).`, 'x')); notes.push('Not enough players yet: registration extended'); break; }
      if (res.error) { notes.push(res.error); break; }
      st.ph = 'live'; notes.push(`⚽ Season ${st.s} fixtures are out: ${res.made.join(', ')}`); break;
    }
    if (st.ph === 'live' && now <= st.endAt) { if (W.length) { await w11commit(env, W); W = []; } await mlDiscipline(env, uid, h, A, st, prevT, notes); }
    if (st.ph === 'live' && !st.rem && now >= st.endAt - 2 * MLD) { st.rem = 1; W.push(mlNotif(uid, uid, 'Master League', `⏰ ${h.org || 'Your'} Season ${st.s} ends in 2 days. Want to change anything for next season (days, division sizes, cups)? Master League → ⚙️ Settings.`, 'r'));
      ctxPush(env, uid, '⏰ Season ending soon', `Season ${st.s} ends in 2 days. Any changes for next season?`); notes.push('Reminder sent'); }
    if (st.ph === 'live' && now > st.endAt) {
      const mine = prevT.filter(t => t.season === st.s && t.hostId === uid);
      for (const t of mine.filter(t => t.compKind === 'league')) await mlFinish(env, uid, h, t, notes);
      const nx = mlPlan(A, st.s + 1, mlDay0(st.endAt + MLH, off) + (mlDay0(st.endAt + MLH, off) <= st.endAt ? MLD : 0));
      const sk = { ...(st.strikes || {}) }, ban0 = Object.keys(sk).filter(k => sk[k] >= 3); ban0.forEach(k => { sk[k] = 0; });
      nx.pend = st.pend; nx.strikes = sk; nx.ban0 = ban0; nx.drop = Object.keys(st.ban || {}).filter(k => !ban0.includes(k)); st = nx; notes.push(`Season ${st.s} is next`); continue;
    }
    break;
  }
  /* cups whose time is over */
  const keep = [];
  for (const p of (st.pend || [])) { if (now < p.at) { keep.push(p); continue; } const t = prevT.find(x => x.id === p.id); if (t) await mlFinish(env, uid, h, t, notes); }
  st.pend = keep;
  W.push({ path: `hosts/${uid}`, data: { ml: st }, mask: ['ml'] });
  await w11commit(env, W);
  return { ok: true, ml: st, note: notes.join(' · ') || (fromApp ? 'All up to date' : '') };
}
function ctxPush(env, uid, title, body) { try { pushToUser(env, uid, title, body, SITE + '#tournaments', 'ml-' + uid).catch(() => {}); } catch (e) {} }
/* every hour: one run per host (each in its own request, so every host gets a full budget) */
async function mlCron(env) {
  const hosts = await w11query(env, 'hosts', [w11eq('auto.on', true)], 60);
  if (!hosts.length) return 0;
  const cfg = await getDocument(env, 'config/push').catch(() => null), self = cfg && cfg.url ? String(cfg.url).replace(/\/$/, '') : '';
  if (!self) { await mlHost(env, hosts[0].id).catch(() => {}); return 1; }
  for (const x of hosts.slice(0, 40)) await fetch(`${self}/mlrun`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Key': sa(env).private_key_id || '' }, body: JSON.stringify({ uid: x.id }) }).catch(() => {});
  return hosts.length;
}

/* 🚫 no-shows: missing a match in play time (the GG AI gave the win to the opponent, or nobody came) counts as a no-show.
   One before the limit = a warning. At the limit (A.ban, default 3, 0 = off) the player is removed: his remaining league matches
   go to his opponents (1–0) and next season he starts one division lower (ml.drop). Every removal is a strike (ml.strikes, kept
   across seasons); the 3rd strike = he sits out the next season (ml.ban0), then his strikes start again from 0. The host can still undo single auto results. */
async function mlDiscipline(env, uid, h, A, st, prevT, notes) {
  const lim = mlInt(A.ban, 0, 9, 3); if (!lim) return;
  const mine = prevT.filter(t => t.season === st.s && t.hostId === uid && t.status !== 'finished' && !t.deleted), cnt = {}, tagOf = {};
  mine.forEach(t => (t.matches || []).forEach(m => { const a = m.auto; if (!a || m.autoUndone) return;
    const add = (p) => { if (!mlReal(p)) return; const k = mlTag(p); cnt[k] = (cnt[k] || 0) + 1; tagOf[k] = p; };
    if (a.kind === 'win' && !a.ai && m.forfeit) add(m.forfeit); else if (a.kind === 'both') { add(m.p1); add(m.p2); } }));
  st.warn = st.warn || {}; st.ban = st.ban || {};
  const todo = Object.keys(cnt).filter(k => (cnt[k] >= lim && !st.ban[k]) || (lim > 1 && cnt[k] >= lim - 1 && cnt[k] < lim && !st.warn[k]));
  if (!todo.length) return;
  const regs = await mlListPlayers(env, `${uid}_s${st.s}`), U = {}; regs.forEach(x => { if (x && x.tag) U[mlTag(x.tag)] = x.uid; });
  const W = [], org = h.org || 'the Master League';
  for (const k of todo) {
    const c = cnt[k], who = tagOf[k];
    if (c >= lim) {
      st.ban[k] = 1; st.warn[k] = 1; st.strikes = st.strikes || {}; st.strikes[k] = (st.strikes[k] || 0) + 1; const third = st.strikes[k] >= 3;
      for (const t of mine.filter(x => x.format === 'LEAGUE')) {
        let n = 0; const ms = (t.matches || []).map(m => { const mineM = mlTag(m.p1) === k || mlTag(m.p2) === k, open = m.s1 == null && !m.winner;
          if (!mineM || !open) return m; const opp = mlTag(m.p1) === k ? m.p2 : m.p1; if (!mlReal(opp)) return m; n++;
          return { ...m, s1: mlTag(m.p1) === k ? 0 : 1, s2: mlTag(m.p1) === k ? 1 : 0, winner: opp, status: 'approved', forfeit: m.p1 === opp ? m.p2 : m.p1, forfeitBy: '🤖 SINLESS GG bot', auto: { at: Date.now(), kind: 'ban' } }; });
        if (n) { t.matches = ms; await w11commit(env, [{ path: `tournaments/${t.id}`, data: { matches: ms }, mask: ['matches'], pre: t._ut ? { ut: t._ut } : undefined }]); }
      }
      if (U[k]) W.push(mlNotif(U[k], uid, org, third ? `🚫 You were removed from ${org} Season ${st.s} after ${c} no-shows. That's your 3rd removal, so you sit out next season. You can come back the season after 💪` : `🚫 You were removed from ${org} Season ${st.s} after ${c} no-shows. Your remaining matches go to your opponents (1–0), and next season you start one division lower.`, 'B' + k));
      W.push(mlNotif(uid, uid, 'Master League', `🚫 ${who} was removed from Season ${st.s} for ${c} no-shows${third ? ' (3rd time: sits out next season)' : ' (drops one division next season)'}.`, 'H' + k));
      notes.push(`🚫 ${who} removed (${c} no-shows)`);
    } else {
      st.warn[k] = 1;
      if (U[k]) W.push(mlNotif(U[k], uid, org, `⚠️ Warning: you missed ${c} match${c > 1 ? 'es' : ''} in ${org} Season ${st.s}. One more no-show and you're removed for the rest of this season and next season.`, 'W' + k));
      notes.push(`⚠️ ${who} warned (${c} no-shows)`);
    }
  }
  if (W.length) await w11commit(env, W);
}
