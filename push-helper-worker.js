// =====================================================================
// Sinless GG push helper — a free Cloudflare Worker
// Sends phone alerts (Firebase Cloud Messaging) when the app is closed,
// plus a match-day reminder every morning.
//
// It needs ONE secret, added in Cloudflare (never share it with anyone):
//   FIREBASE_SERVICE_ACCOUNT = the whole JSON file you download from
//   Firebase → Project settings → Service accounts → Generate new private key
// =====================================================================

const ALLOWED_ORIGINS = ['https://sinlessgg.com', 'https://www.sinlessgg.com', 'https://sinlessgaming.github.io'];
const SITE = 'https://sinlessgg.com/';

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const origin = req.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
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
      ctx.waitUntil(sendForNotification(env, id).catch(() => {}));
      return json({ ok: true });
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
  return (j.documents || []).map(d => ({ id: d.name.split('/').pop(), ...decodeFields(d.fields || {}) }));
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
async function sendForNotification(env, id) {
  const n = await getDocument(env, `notifications/${id}`);
  if (!n || n.pushed || !n.toUid) return;
  if (!n.createdAt || Date.now() - n.createdAt > 10 * 60 * 1000) return;   // only fresh ones
  await patchDocument(env, `notifications/${id}`, { pushed: { booleanValue: true } });
  const who = n.fromUser || 'Someone';
  let title = 'Sinless GG', body = `${who} ${n.text || DEFAULT_TEXT[n.type] || 'sent you something'}`;
  if (n.type === 'dm') { title = `💬 ${who}`; body = n.text || 'sent you a message'; }
  if (n.type === 'group') { title = `👥 ${who}`; body = n.text || 'new group message'; }
  if (n.type === 'test') { title = 'Sinless GG'; body = n.text || 'Alerts are working 🎉'; }
  const link = SITE + (n.postId && !String(n.postId).startsWith('group:') ? `#post=${n.postId}` : '');
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
  return (j || []).filter(x => x.document).map(x => ({ id: x.document.name.split('/').pop(), ...decodeFields(x.document.fields || {}) }));
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
