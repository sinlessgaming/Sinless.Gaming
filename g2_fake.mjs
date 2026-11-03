// G2 test helper (used by g2_ui.mjs): fake Firestore REST + the real worker
import { generateKeyPairSync, createSign } from 'node:crypto';
import fs from 'node:fs';
export const ROOT = new URL('..', import.meta.url).pathname;
const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const pkcs8 = privateKey.export({ type: 'pkcs8', format: 'pem' }), jwk = publicKey.export({ format: 'jwk' });
const b64u = (b) => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
let NOW = Date.UTC(2026, 10, 4, 5, 0); export const RealNow = Date.now; Date.now = () => NOW; export const setNow = (t) => { NOW = t; }; export const getNow = () => NOW;
export const mkTok = (sub) => { const h = b64u(JSON.stringify({ alg: 'RS256', kid: 'k1', typ: 'JWT' })), n = Math.floor(NOW / 1000); const p = b64u(JSON.stringify({ aud: 'sinlessgg', iss: 'https://securetoken.google.com/sinlessgg', sub, iat: n - 10, exp: n + 3600 })); const s = createSign('RSA-SHA256'); s.update(h + '.' + p); return h + '.' + p + '.' + b64u(s.sign(privateKey)); };
// ---- fake Firestore ----
export const DB = new Map(); let UT = 1; const stats = { commits: 0, failedPre: 0, sub: 0 };
export const dec = (v) => { if (!v) return null; if ('stringValue' in v) return v.stringValue; if ('integerValue' in v) return Number(v.integerValue); if ('doubleValue' in v) return v.doubleValue; if ('booleanValue' in v) return v.booleanValue; if ('nullValue' in v) return null; if ('arrayValue' in v) return (v.arrayValue.values || []).map(dec); if ('mapValue' in v) { const o = {}; for (const k in v.mapValue.fields || {}) o[k] = dec(v.mapValue.fields[k]); return o; } return null; };
const decF = (f) => { const o = {}; for (const k in f || {}) o[k] = dec(f[k]); return o; };
export const enc = (v) => v === null ? { nullValue: null } : typeof v === 'number' ? (Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }) : typeof v === 'boolean' ? { booleanValue: v } : typeof v === 'string' ? { stringValue: v } : Array.isArray(v) ? { arrayValue: { values: v.map(enc) } } : { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, enc(x)])) } };
const docJ = (path, d) => ({ name: 'projects/sinlessgg/databases/(default)/documents/' + path, fields: enc(d.data).mapValue.fields, updateTime: 't' + d.ut });
const splitFP = (fp) => { const out = []; let cur = '', q = false; for (const ch of fp) { if (ch === '`') { q = !q; continue; } if (ch === '.' && !q) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out; };
const getP = (o, ks) => ks.reduce((a, k) => a == null ? undefined : a[k], o);
const setP = (o, ks, v) => { let a = o; for (let i = 0; i < ks.length - 1; i++) { if (a[ks[i]] == null || typeof a[ks[i]] !== 'object') a[ks[i]] = {}; a = a[ks[i]]; } if (v === undefined) delete a[ks[ks.length - 1]]; else a[ks[ks.length - 1]] = v; };
const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json' } });
globalThis.fetch = async (url, opt = {}) => {
  url = String(url); stats.sub++;
  if (url.includes('jwk/securetoken')) return J({ keys: [{ ...jwk, kid: 'k1', alg: 'RS256' }] });
  if (url.includes('oauth2.googleapis.com/token')) return J({ access_token: 'at', expires_in: 3600 });
  if (url.includes('fcm.googleapis.com')) return J({});
  const base = '/documents';
  if (url.endsWith(':batchGet')) { const b = JSON.parse(opt.body); return J(b.documents.map(n => { const p = n.split('/documents/')[1], d = DB.get(p); return d ? { found: docJ(p, d) } : { missing: n }; })); }
  if (url.endsWith(':runQuery')) { const sq = JSON.parse(opt.body).structuredQuery, col = sq.from[0].collectionId; const fl = sq.where.fieldFilter ? [sq.where.fieldFilter] : sq.where.compositeFilter.filters.map(f => f.fieldFilter);
    const rows = [...DB.entries()].filter(([p, d]) => p.split('/').length === 2 && p.startsWith(col + '/') && fl.every(f => JSON.stringify(d.data[f.field.fieldPath]) === JSON.stringify(dec(f.value)))).slice(0, sq.limit || 50);
    return J(rows.map(([p, d]) => ({ document: docJ(p, d) }))); }
  if (url.endsWith(':commit')) { stats.commits++; const ws = JSON.parse(opt.body).writes; const snap = new Map(DB);
    for (const w of ws) { if (w.delete) { DB.delete(w.delete.split('/documents/')[1]); continue; } const p = w.update.name.split('/documents/')[1], cur = DB.get(p);
      if (w.currentDocument) { if (w.currentDocument.updateTime && (!cur || 't' + cur.ut !== w.currentDocument.updateTime)) { DB.clear(); snap.forEach((v, k) => DB.set(k, v)); stats.failedPre++; return J({ error: 'FAILED_PRECONDITION' }, 409); } if (w.currentDocument.exists === true && !cur) { DB.clear(); snap.forEach((v, k) => DB.set(k, v)); stats.failedPre++; return J({ error: 'missing' }, 404); } if (w.currentDocument.exists === false && cur) { DB.clear(); snap.forEach((v, k) => DB.set(k, v)); stats.failedPre++; return J({ error: 'exists' }, 409); } }
      const data = decF(w.update.fields); let nd;
      if (w.updateMask) { nd = JSON.parse(JSON.stringify(cur ? cur.data : {})); for (const fp of w.updateMask.fieldPaths) { const ks = splitFP(fp); setP(nd, ks, getP(data, ks)); } } else nd = data;
      for (const t of w.updateTransforms || []) { const ks = splitFP(t.fieldPath); if (t.increment) setP(nd, ks, (Number(getP(nd, ks)) || 0) + dec(t.increment)); if (t.appendMissingElements) { const a = getP(nd, ks) || []; for (const v of t.appendMissingElements.values.map(dec)) if (!a.some(x => JSON.stringify(x) === JSON.stringify(v))) a.push(v); setP(nd, ks, a); } }
      DB.set(p, { data: nd, ut: UT++ }); }
    return J({ writeResults: [] }); }
  const m = url.match(/\/documents\/([^?]+)/);
  if (m && (!opt.method || opt.method === 'GET') && !m[1].includes('/')) { const col = m[1], all = [...DB.keys()].filter(k => k.startsWith(col + '/') && k.split('/').length === 2).sort(), u = new URL(url), ps = +(u.searchParams.get('pageSize') || 300), st = +(u.searchParams.get('pageToken') || 0), pg = all.slice(st, st + ps); return J({ documents: pg.map(k => docJ(k, DB.get(k))), nextPageToken: st + ps < all.length ? String(st + ps) : undefined }); }
  if (m && (!opt.method || opt.method === 'GET')) { const d = DB.get(m[1]); return d ? J(docJ(m[1], d)) : J({ error: 'nf' }, 404); }
  if (m && opt.method === 'PATCH') { const p = m[1], cur = DB.get(p), data = decF(JSON.parse(opt.body).fields); const nd = { ...(cur ? cur.data : {}), ...data }; DB.set(p, { data: nd, ut: UT++ }); return J({}); }
  return J({ error: 'unhandled ' + url }, 500);
};
export const put = (p, data) => DB.set(p, { data, ut: UT++ }); export const get = (p) => (DB.get(p) || {}).data;
// ---- worker ----
export const W = (await import(ROOT + 'dist/worker.js')).default;
export const env = { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'sinlessgg', client_email: 'x@y', private_key: pkcs8, private_key_id: 'kid' }) };
put('config/admins', { uids: ['uAdmin'] });
export const call = async (uid, path, body) => { const r = await W.fetch(new Request('https://w.dev' + path, { method: 'POST', headers: { Authorization: 'Bearer ' + mkTok(uid), 'Content-Type': 'application/json', Origin: 'https://sinlessgg.com' }, body: JSON.stringify(body || {}) }), env, { waitUntil() {} }); return r.json(); };
let maxSub = 0; export const getMaxSub = () => maxSub; export const cron = async () => { const s0 = stats.sub; let p = []; await W.scheduled({ cron: '4-59/5 * * * *', scheduledTime: NOW }, env, { waitUntil: (x) => p.push(x) }); await Promise.all(p); maxSub = Math.max(maxSub, stats.sub - s0); };
