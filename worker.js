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
//   B2_BUCKET_ID, B2_BUCKET_NAME             (Backblaze → Buckets)
// Only people signed in to Sinless GG can upload (their Firebase sign-in is checked here).
//
// 🧠 GG AI in squads (v54, optional). Secret, added in Cloudflare only:
//   GEMINI_API_KEY                           (aistudio.google.com → Get API key)
// =====================================================================

const ALLOWED_ORIGINS = ['https://sinlessgg.com', 'https://www.sinlessgg.com', 'https://sinlessgaming.github.io'];
const SITE = 'https://sinlessgg.com/';

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
  async fetch(req, env, ctx) {
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
      if (!env.GEMINI_API_KEY || !env.FIREBASE_SERVICE_ACCOUNT) return json({ ok: false, error: 'GG AI is not set up' }, 503);
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('ai:' + uid, 4, 60000)) return json({ ok: false, limit: true, error: 'slow down' }, 429);
      let body = {}; try { body = await req.json(); } catch (e) {}
      const sid = String(body.sid || ''); if (!/^[\w-]{3,80}$/.test(sid)) return json({ ok: false, error: 'bad squad' }, 400);
      const sq = await getDocument(env, `squads/${sid}`);
      if (!sq || !(sq.memberUids || []).includes(uid) || (sq.bots && sq.bots.ai === false)) return json({ ok: false, error: 'not allowed' }, 403);
      const day = new Date().toISOString().slice(0, 10).replace(/-/g, ''), uKey = `aiUsage/${sid}_${day}`, mKey = `aiUsage/u_${uid}_${day}`;
      const [su, mu] = await Promise.all([getDocument(env, uKey), getDocument(env, mKey)]);
      const sN = (su && su.n) || 0, mN = (mu && mu.n) || 0, SQ_MAX = +(env.AI_SQUAD_DAILY || 50), ME_MAX = +(env.AI_USER_DAILY || 10);
      if (sN >= SQ_MAX || mN >= ME_MAX) return json({ ok: false, limit: true }, 429);
      await Promise.all([patchDocument(env, uKey, { n: { integerValue: String(sN + 1) } }), patchDocument(env, mKey, { n: { integerValue: String(mN + 1) } })]);
      const asker = String(body.asker || '').slice(0, 40).replace(/[^\w.]/g, '');
      const q = String(body.q || '').replace(/(^|\s)@ai\b/ig, ' ').trim().slice(0, 500), context = String(body.ctx || '').slice(0, 2500);
      let reply = await askGemini(env, q, context, asker);
      if (!reply) reply = "Sorry, I can't answer that one right now. Try asking another way 🙏";
      const room = String(body.room || 'chat').slice(0, 40);
      await createDocument(env, `squads/${sid}/messages`, {
        room: { stringValue: room }, sender: { stringValue: 'GG AI' }, senderUid: { stringValue: 'gg_ai' }, bot: { booleanValue: true }, botName: { stringValue: 'GG AI' },
        text: { stringValue: (asker ? '@' + asker + ' ' : '') + reply.slice(0, 900) }, timestamp: { integerValue: String(Date.now()) }, createdAt: { timestampValue: new Date().toISOString() }
      });
      return json({ ok: true, left: SQ_MAX - sN - 1 });
    }

    if (url.pathname === '/media/health') return json({ ok: true, imagekit: !!env.IMAGEKIT_PRIVATE_KEY, b2: !!(env.B2_KEY_ID && env.B2_APP_KEY && env.B2_BUCKET_ID && env.B2_BUCKET_NAME) });
    if (url.pathname === '/ik-auth' && req.method === 'POST') {
      if (!env.IMAGEKIT_PRIVATE_KEY) return json({ ok: false, error: 'not set up' }, 503);
      const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
      if (tooFast('u:' + uid, 40, 600000)) return json({ ok: false, error: 'Too many uploads. Wait a few minutes.' }, 429);
      const token = crypto.randomUUID(), expire = Math.floor(Date.now() / 1000) + 600;
      return json({ ok: true, token, expire, signature: await hmacSha1Hex(env.IMAGEKIT_PRIVATE_KEY, token + expire) });
    }
    if (url.pathname === '/b2-upload' && req.method === 'POST') {
      if (!(env.B2_KEY_ID && env.B2_APP_KEY && env.B2_BUCKET_ID && env.B2_BUCKET_NAME)) return json({ ok: false, error: 'not set up' }, 503);
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
      if (!env.B2_BUCKET_NAME) return new Response('not set up', { status: 404 });
      const path = url.pathname.slice(3);
      if (!/^sinlessgg\/[\w/.-]+$/.test(path) || path.includes('..')) return new Response('not found', { status: 404 });
      const a = await b2Auth(env);
      const h = {}; const range = req.headers.get('Range'); if (range) h.Range = range;
      const r = await fetch(`${a.downloadUrl}/file/${env.B2_BUCKET_NAME}/${path}`, { method: req.method, headers: h, cf: { cacheEverything: true, cacheTtl: 2592000 } });
      const out = new Response(r.body, r);
      out.headers.set('Access-Control-Allow-Origin', '*');
      out.headers.set('Cache-Control', 'public, max-age=2592000, immutable');
      out.headers.set('X-Content-Type-Options', 'nosniff');
      return out;
    }
    return json({ ok: false, error: 'not found' }, 404);
  },

  // Runs on the schedules you set in Cloudflare:
  //   0 7 * * *   → match-day reminders (morning)
  //   0 18 * * *  → 🔥 gaming streak reminders (evening)
  async scheduled(event, env, ctx) {
    if (new Date(event.scheduledTime || Date.now()).getUTCHours() >= 15) ctx.waitUntil(streakReminders(env).catch(() => {}));
    else ctx.waitUntil(matchDayReminders(env).catch(() => {}));
  }
};

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
  b2A = { apiUrl: st.apiUrl, downloadUrl: st.downloadUrl, token: j.authorizationToken }; b2AAt = Date.now(); b2Up = null;
  return b2A;
}
async function b2UploadTarget(env, force) {
  if (!force && b2Up) return b2Up;
  const a = await b2Auth(env);
  const r = await fetch(a.apiUrl + '/b2api/v3/b2_get_upload_url?bucketId=' + encodeURIComponent(env.B2_BUCKET_ID), { headers: { Authorization: a.token } });
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
    if (r.ok) { const a = await b2Auth(env); return `${a.downloadUrl}/file/${env.B2_BUCKET_NAME}/${name}`; }
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
