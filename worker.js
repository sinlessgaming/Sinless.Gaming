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

    // morning reminders are sent in small batches (Cloudflare's free plan allows ~50 requests per run)
    if (url.pathname === '/remind' && req.method === 'POST') {
      if (!env.FIREBASE_SERVICE_ACCOUNT || req.headers.get('X-Key') !== sa(env).private_key_id) return json({ ok: false }, 403);
      let body = {};
      try { body = await req.json(); } catch (e) {}
      ctx.waitUntil(sendReminders(env, (body.list || []).slice(0, 8), body.day).catch(() => {}));
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
    // 📺 videos: their own schedule "2-59/5 * * * *" (40 channels a run); without it, the news run checks 12 channels too
    if (cron.startsWith('2-59/5')) { ctx.waitUntil(vidsRun(env, ctx, 36).catch(() => {})); return; }
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
    if (src[3] === 'c') prev = '';                       // community posts: headline only
    prev = prev.replace(/(submitted by|\[link\]|\[comments\]).*$/i, '').slice(0, 200);
    out.push({ title, link: link.replace(/&amp;/g, '&'), when, yt, prev, au: au ? au.replace(/&amp;/g, '&') : null });
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
  st.yt = st.yt || {}; if (st.yt[handle]) return st.yt[handle] === 'x' ? null : `https://www.youtube.com/feeds/videos.xml?channel_id=${st.yt[handle]}`;
  try {
    const r = await fetch(`https://www.youtube.com/${handle}`, { headers: { 'Accept-Language': 'en', 'User-Agent': 'Mozilla/5.0 SinlessGG' } }); const t = (await r.text()).slice(0, 400000);
    const m = t.match(/"externalId":"(UC[\w-]{22})"/) || t.match(/channel\/(UC[\w-]{22})/); st.yt[handle] = m ? m[1] : 'x';
  } catch (e) { st.yt[handle] = 'x'; }
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
    const it = { id, t: x.title, s: x.prev, u: x.link, src: [{ n: src[0], u: x.link }], sc: 1, tp, k, ts: Math.min(x.when, now), dt: now, w: w.slice(0, 12), rg: src[5] || 'global', tl: [{ k, t: now, n: src[0] }] };
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
NikoOmilana|Niko Omilana|fun|creators|global||c|cr`;
function seedChannels() { return CH_SEED.split('\n').filter(Boolean).map(l => { const [h, n, c, t, rg, f, st, kd] = l.split('|'); return { h, n, c, t, rg: rg || 'global', f: f === '1' ? 1 : 0, st: st || 'c', kd: kd || 'o' }; }); }
// ✅ auto-approve: the channel's real YouTube name matches the name on our list ("Shirrako" = "Shirrako Official")
function nameKey(s) { return String(s || '').toLowerCase().replace(/\s*-\s*topic$/, '').replace(/official|channel|tv|vevo|music|hq|yt|the /g, '').replace(/[^\p{L}\p{N}]+/gu, ''); }
function namesMatch(a, b) { const x = nameKey(a), y = nameKey(b); if (!x || !y) return false; const sh = x.length < y.length ? x : y, lg = x.length < y.length ? y : x; if (x === y || (sh.length >= 6 && lg.includes(sh) && sh.length / lg.length >= 0.6)) return true; let same = 0; for (let i = 0; i < Math.min(x.length, y.length); i++) if (x[i] === y[i]) same++; return same / Math.max(x.length, y.length) >= 0.8; }
async function chLoad(env) {
  const d = await getDocument(env, CH_DOC).catch(() => null); let L = null, st = {};
  try { L = JSON.parse((d && d.json) || 'null'); } catch (e) {} try { st = JSON.parse((d && d.st) || '{}'); } catch (e) {}
  if (!Array.isArray(L) || !L.length) L = seedChannels();
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
  const r = await fetch(`https://www.youtube.com/@${encodeURIComponent(h)}`, { headers: { 'Accept-Language': 'en', 'User-Agent': 'Mozilla/5.0 SinlessGG' } });
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
  return id || 'x';
}
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
  st.i = st.i || 0; st.ya = st.ya && st.day === day ? st.ya : {}; st.day = day;
  const live = L.filter(c => c.st !== 'x' && c.id !== 'x');
  // followed channels first (every hour), then everyone in turns
  const pick = live.filter(c => c.fol > 0 && c.id && now - (c.last || 0) > 3600e3).slice(0, Math.floor(budget / 3));
  // still looking channels up? spend most of this run on that (approved ones first) — everything is found within a few hours
  const unresolved = live.filter(c => !c.id).sort((a, b) => (a.st === 'o' ? 0 : 1) - (b.st === 'o' ? 0 : 1));
  const maxRes = unresolved.length ? Math.max(3, Math.floor(budget * 0.6)) : 0;
  unresolved.slice(0, maxRes).forEach(c => { if (pick.length < budget) pick.push(c); });
  const known = live.filter(c => c.id);
  for (let k = 0; pick.length < budget && k < known.length; k++) { const c = known[(st.i + k) % known.length]; if (!pick.includes(c)) pick.push(c); }
  st.i = (st.i + budget) % Math.max(1, known.length);
  let resolves = 0; const have = new Set(items.map(x => x.v)), alerts = [];
  await Promise.all(pick.map(async (c) => {
    try {
      if (!c.id) { if (resolves >= maxRes) return; resolves++; const id = await resolveHandle(c.h); if (id) { c.id = id; if (id === 'x') c.e = 'not found'; } return; }   // its videos come on the next turn (keeps each run small)
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
