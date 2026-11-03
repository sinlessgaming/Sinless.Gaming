// G2 worker test: fake Firestore REST + the real engine as "phones". Run: node tests/g2_worker.mjs (after build.sh)
import { generateKeyPairSync, createSign } from 'node:crypto';
import fs from 'node:fs';
const ROOT = new URL('..', import.meta.url).pathname;
const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const pkcs8 = privateKey.export({ type: 'pkcs8', format: 'pem' }), jwk = publicKey.export({ format: 'jwk' });
const b64u = (b) => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
let NOW = Date.UTC(2026, 10, 4, 5, 0); const RealNow = Date.now; Date.now = () => NOW;
const mkTok = (sub) => { const h = b64u(JSON.stringify({ alg: 'RS256', kid: 'k1', typ: 'JWT' })), n = Math.floor(NOW / 1000); const p = b64u(JSON.stringify({ aud: 'sinlessgg', iss: 'https://securetoken.google.com/sinlessgg', sub, iat: n - 10, exp: n + 3600 })); const s = createSign('RSA-SHA256'); s.update(h + '.' + p); return h + '.' + p + '.' + b64u(s.sign(privateKey)); };
// ---- fake Firestore ----
const DB = new Map(); let UT = 1; const stats = { commits: 0, failedPre: 0, sub: 0 };
const dec = (v) => { if (!v) return null; if ('stringValue' in v) return v.stringValue; if ('integerValue' in v) return Number(v.integerValue); if ('doubleValue' in v) return v.doubleValue; if ('booleanValue' in v) return v.booleanValue; if ('nullValue' in v) return null; if ('arrayValue' in v) return (v.arrayValue.values || []).map(dec); if ('mapValue' in v) { const o = {}; for (const k in v.mapValue.fields || {}) o[k] = dec(v.mapValue.fields[k]); return o; } return null; };
const decF = (f) => { const o = {}; for (const k in f || {}) o[k] = dec(f[k]); return o; };
const enc = (v) => v === null ? { nullValue: null } : typeof v === 'number' ? (Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }) : typeof v === 'boolean' ? { booleanValue: v } : typeof v === 'string' ? { stringValue: v } : Array.isArray(v) ? { arrayValue: { values: v.map(enc) } } : { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, enc(x)])) } };
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
    for (const w of ws) { const p = w.update.name.split('/documents/')[1], cur = DB.get(p);
      if (w.currentDocument) { if (w.currentDocument.updateTime && (!cur || 't' + cur.ut !== w.currentDocument.updateTime)) { DB.clear(); snap.forEach((v, k) => DB.set(k, v)); stats.failedPre++; return J({ error: 'FAILED_PRECONDITION' }, 409); } if (w.currentDocument.exists === false && cur) { DB.clear(); snap.forEach((v, k) => DB.set(k, v)); stats.failedPre++; return J({ error: 'exists' }, 409); } }
      const data = decF(w.update.fields); let nd;
      if (w.updateMask) { nd = JSON.parse(JSON.stringify(cur ? cur.data : {})); for (const fp of w.updateMask.fieldPaths) { const ks = splitFP(fp); setP(nd, ks, getP(data, ks)); } } else nd = data;
      for (const t of w.updateTransforms || []) { const ks = splitFP(t.fieldPath); if (t.increment) setP(nd, ks, (Number(getP(nd, ks)) || 0) + dec(t.increment)); if (t.appendMissingElements) { const a = getP(nd, ks) || []; for (const v of t.appendMissingElements.values.map(dec)) if (!a.some(x => JSON.stringify(x) === JSON.stringify(v))) a.push(v); setP(nd, ks, a); } }
      DB.set(p, { data: nd, ut: UT++ }); }
    return J({ writeResults: [] }); }
  const m = url.match(/\/documents\/([^?]+)/); if (m && (!opt.method || opt.method === 'GET')) { const d = DB.get(m[1]); return d ? J(docJ(m[1], d)) : J({ error: 'nf' }, 404); }
  if (m && opt.method === 'PATCH') { const p = m[1], cur = DB.get(p), data = decF(JSON.parse(opt.body).fields); const nd = { ...(cur ? cur.data : {}), ...data }; DB.set(p, { data: nd, ut: UT++ }); return J({}); }
  return J({ error: 'unhandled ' + url }, 500);
};
const put = (p, data) => DB.set(p, { data, ut: UT++ }); const get = (p) => (DB.get(p) || {}).data;
// ---- worker ----
const W = (await import(ROOT + 'dist/worker.js')).default;
const env = { FIREBASE_SERVICE_ACCOUNT: JSON.stringify({ project_id: 'sinlessgg', client_email: 'x@y', private_key: pkcs8, private_key_id: 'kid' }) };
put('config/admins', { uids: ['uAdmin'] });
const call = async (uid, path, body) => { const r = await W.fetch(new Request('https://w.dev' + path, { method: 'POST', headers: { Authorization: 'Bearer ' + mkTok(uid), 'Content-Type': 'application/json', Origin: 'https://sinlessgg.com' }, body: JSON.stringify(body || {}) }), env, { waitUntil() {} }); return r.json(); };
let maxSub = 0; const cron = async () => { const s0 = stats.sub; let p = []; await W.scheduled({ cron: '4-59/5 * * * *', scheduledTime: NOW }, env, { waitUntil: (x) => p.push(x) }); await Promise.all(p); maxSub = Math.max(maxSub, stats.sub - s0); };
// ---- phones: the real game file ----
globalThis.window = globalThis; globalThis.document = { getElementById: () => null, addEventListener() {}, head: { appendChild() {} }, body: { insertAdjacentHTML() {} }, querySelectorAll: () => [] }; globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
new Function(fs.readFileSync(ROOT + 'dist/w11.js', 'utf8'))(); const P = window.W11, C = P.C;
let ok = 0, bad = 0; const T = (c, msg) => { if (c) ok++; else { bad++; console.log('❌', msg); } };
const club = (uid, ci, extra) => put('w11Clubs/' + uid, { uid, club: ci, name: 'Club ' + uid, short: uid.slice(0, 3).toUpperCase(), ids: C.squadIds(ci), form: '4-3-3', kits: [{ c1: '#22d3ee' }], boot: [1, 2, 3, 4, 5].map(i => ({ at: 1, gf: 1, ga: 0 })), coins: 250000, gems: 50, energy: 10, med: 5, ...(extra || {}) });
club('uA', 100001); club('uB', 100002); club('uC', 100003); club('uD', 100004); club('uNoBoot', 100005, { boot: [] });
// 1) join
let r = await call('uNoBoot', '/w11/join', { sl: 0 }); T(r.ok, 'G5: no Boot Camp needed, joins at once');
T((await call('uA', '/w11/result', { mid: 'x-1-1-1-0', r: '1-0|;|' })).update === 1, 'G5: results without the new engine version are refused (update)');
r = await call('uA', '/w11/join', { sl: 0 }); T(r.ok && r.from === 3, 'A joins from matchday 3: ' + JSON.stringify(r));
r = await call('uB', '/w11/join', { sl: 0 }); T(r.ok && r.lg.g === get('w11Clubs/uA').lg.g, 'B (same time) lands in A\'s group');
r = await call('uC', '/w11/join', { sl: 2 }); T(r.ok, 'C joins');
r = await call('uA', '/w11/join', { sl: 1 }); T(r.ok && r.already, 'joining twice is harmless');
const A = get('w11Clubs/uA'), Bc = get('w11Clubs/uB'), gk = C.gkey(1, 6, A.lg.g), G = get('w11g/' + gk);
T(Object.keys(G.users).length >= 2 && G.clubs[A.lg.pos] === 100001 && G.users[A.lg.pos].ai != null, 'group doc has both managers + old computer club kept');
const mA = [...DB.keys()].filter(k => k.startsWith('w11m/') && (get(k).hu === 'uA' || get(k).au === 'uA')).map(k => k.slice(5)); T(mA.length === 24, 'A has 24 match docs (md 3–26): ' + mA.length);
const vsAB = mA.filter(k => { const d = get('w11m/' + k); return (d.hu === 'uA' && d.au === 'uB') || (d.hu === 'uB' && d.au === 'uA'); }); T(vsAB.length === 2, 'A vs B twice: ' + vsAB.length);
// 2) table works from day 3 with inherited points
const tb = C.table(G, NOW); T(tb.find(x => x.pos === A.lg.pos).p === 2, 'A inherits 2 played matches');
// 3) lock + play matchday 3 (06:00 GMT)
const md3 = mA.map(k => [k, get('w11m/' + k)]).find(([, d]) => d.md === 3); const [mid3] = md3;
NOW = C.ko(1, 3, 0) - 12 * 60000; put('w11Clubs/uA', { ...get('w11Clubs/uA'), inj: { '100001-1': 2 }, ban: { '100001-2': 1 } });
await cron(); const L = get('w11m/' + mid3); T(L.st === 'locked' && L.s0 && L.s1, 'locked 12 min before');
const mySh = L.hu === 'uA' ? L.s0 : L.s1; T(!mySh.ids.slice(0, 11).includes('100001-1') && !mySh.ids.slice(0, 11).includes('100001-2') && mySh.io.includes('100001-1') && mySh.bo.includes('100001-2'), 'injured + banned starters swapped out');
// phones work out the result
const live = P.liveFrom(mid3, L); const side = L.hu === 'uA' ? 0 : 1;
const cmds = P.cmdsFrom(live, { k1: { by: 'uA', s: side, t: 600, c: JSON.stringify({ here: 1 }), at: L.ko + 5000 }, k2: { by: 'uA', s: side, t: 1300, c: JSON.stringify({ shout: 'attack' }), at: L.ko + 60000 }, k3: { by: 'uX', s: side, t: 1500, c: '{"shout":"calm"}', at: L.ko + 70000 }, k4: { by: 'uA', s: side, t: 100, c: '{"shout":"calm"}', at: L.ko + 90000 } });
T(cmds.length === 2, 'orders: wrong person and "back in time" orders are ignored (' + cmds.length + ')');
const m1 = P.simL(live, cmds), r1 = P.resultStr(m1), m2 = P.simL(live, JSON.parse(JSON.stringify(cmds))), r2 = P.resultStr(m2);
T(r1 === r2 && C.RES_RE.test(r1), 'same orders = same result: ' + r1);
r = await call('uA', '/w11/result', { mid: mid3, r: r1, ev: 2 }); T(!r.ok && /still/.test(r.error), 'too early refused');
NOW = L.ko + 5 * 60000;
r = await call('uZ', '/w11/result', { mid: mid3, r: r1, ev: 2 }); T(!r.ok, 'stranger without a job refused');
r = await call('uA', '/w11/result', { mid: mid3, r: r1, ev: 2 }); T(r.ok && r.waiting, 'first vote waits');
T(!get('w11m/' + mid3).v && get('w11v/' + mid3).v.uA === r1, 'votes hidden in w11v (not in readable match doc)');
r = await call('uA', '/w11/result', { mid: mid3, r: r1, ev: 2 }); T(r.ok && r.waiting, 'same phone twice still waits');
const jobs = (await call('uV', '/w11/job', {})).jobs; T(jobs.some(j => j.id === mid3) && !jobs[0].v, 'verifier gets a job (no votes inside)');
const coins0 = get('w11Clubs/uA').coins;
r = await call('uV', '/w11/result', { mid: mid3, r: r1, ev: 2 }); T(r.ok && r.final === r1, 'verifier agrees → final');
const F = get('w11m/' + mid3), A2 = get('w11Clubs/uA'), [hs, as] = r1.split('|')[0].split('-').map(Number), my = side ? as : hs, th = side ? hs : as;
T(F.st === 'final' && get('w11g/' + gk).res[F.md + '_' + F.hp] === hs + '-' + as, 'table updated');
T(A2.coins - coins0 === (my > th ? C.winCoins(6) : my === th ? C.drawCoins(6) : 0), 'coins paid by the server: ' + (A2.coins - coins0));
T(A2.lst.p === 1 && Object.values(A2.cond).some(c => c < 100), 'league stats + fitness drop');
T(!A2.ban['100001-2'] && A2.inj['100001-1'] === 1, 'ban served, injury counts down');
// 4) disagreement needs a 3rd phone
const other = mA.map(k => [k, get('w11m/' + k)]).find(([, d]) => d.md === 4 && !(d.hu && d.au)); NOW = other[1].ko - 10 * 60000; await cron(); NOW = other[1].ko + 6 * 60000;
const Lo = get('w11m/' + other[0]); const ro = P.resultStr(P.simL(P.liveFrom(other[0], Lo), []));
await call('uA', '/w11/result', { mid: other[0], r: '9-0|;|;', ev: 2 }); await call('uV', '/w11/job', {}); r = await call('uV', '/w11/result', { mid: other[0], r: ro, ev: 2 });
T(r.ok && r.waiting, 'fake 9-0 vs honest: no agreement'); await call('uW', '/w11/job', {}); r = await call('uW', '/w11/result', { mid: other[0], r: ro, ev: 2 }); T(r.final === ro, '3rd phone settles it honestly');
// 5) training + packs
r = await call('uA', '/w11/train', { f: 'att' }); T(r.ok && r.tr.att === 1, 'train'); r = await call('uA', '/w11/train', { f: 'def' }); T(!r.ok, 'only once a day');
T(!(get('w11Clubs/uA').inj || {})['100001-1'], 'injury healed itself after sitting out 2 matches'); put('w11Clubs/uA', { ...get('w11Clubs/uA'), inj: { '100001-1': 3 } }); r = await call('uA', '/w11/pack', { k: 'med', id: '100001-1' }); T(r.ok && !r.inj['100001-1'] && r.med === 4, 'med pack heals');
r = await call('uA', '/w11/pack', { k: 'energy' }); T(r.ok && r.energy === 9, 'energy pack');
// 6) unchecked after 24h → quick result
const un = mA.map(k => [k, get('w11m/' + k)]).find(([, d]) => d.md === 5); NOW = un[1].ko - 10 * 60000; await cron(); NOW = un[1].ko + 25 * 3600000; await cron();
T(get('w11m/' + un[0]).st === 'final' && get('w11m/' + un[0]).q === true, 'unchecked match settled by quick result');
// 7) late join → waiting list; season change
NOW = C.dayStart(1, 26) + 23 * 3600000; r = await call('uD', '/w11/join', { sl: 3 }); T(r.ok && r.wait === 2, 'late joiner waits for season 2');
NOW = C.dayStart(1, 28) + 3600000; let runs = 0, t0 = RealNow();
for (; runs < 200; runs++) { await cron(); const mt = get('w11meta/season'); if (mt && mt.s === 2) break; NOW += 5 * 60000; }
console.log('season change took', runs + 1, 'runs ≈', ((runs + 1) * 5 / 60).toFixed(1), 'hours;', ((RealNow() - t0) / (runs + 1)).toFixed(1), 'ms per run (node, incl. fake db)');
const meta = get('w11meta/season'); T(meta && meta.s === 2 && meta.ph === '', 'season 2 ready');
const g2 = [...DB.keys()].filter(k => k.startsWith('w11g/2-')).map(get); T(g2.length === 31 + meta.d6, 'all groups built: ' + g2.length);
const allC = g2.flatMap(x => x.clubs); T(allC.length === new Set(allC).size && allC.length === g2.length * 14, 'every club exactly once');
const D = get('w11Clubs/uD'); T(D.lg && D.lg.s === 2 && D.wait === 0, 'waiting manager placed in season 2');
const A3 = get('w11Clubs/uA'); T(A3.lg.s === 2 && (A3.hist || []).length === 1 && A3.tr && !A3.tr.att, 'A: new season, history saved, training reset: ' + JSON.stringify(A3.hist));
const fin1 = get('w11g/' + gk).fin, place = fin1.indexOf(100001); T(A3.lg.t === (place < 2 ? 5 : 6), 'promotion follows final place (' + (place + 1) + ' → Div ' + A3.lg.t + ')');
const tokC = (A3.tro || []).reduce((t, x) => t + (C.TOK[x.k] ? C.TOK[x.k][x.p - 1] : 0), 0); T(A3.gems === 50 + (place < 2 ? C.TOK.promo : 0) + (place === 0 ? C.TOK.title : 0) + tokC, 'G4: GG Coins for promotion / title (' + A3.gems + ')');
const s2m = [...DB.keys()].filter(k => k.startsWith('w11m/2-') && (get(k).hu === 'uA' || get(k).au === 'uA')); T(s2m.length === 26, 'A has 26 matches in season 2: ' + s2m.length);
const old1 = [...DB.keys()].filter(k => k.startsWith('w11m/1-') && get(k).st !== 'final'); T(old1.length === 0, 'no season-1 match left open: ' + old1.length);
// G3b: the season change also drew the Season 2 cups and filled the Hall of Fame
const OC = get('w11c/2-oc'), CL = get('w11c/2-cl'), g1 = [...DB.keys()].filter(k => k.startsWith('w11g/1-')).map(get);
T(OC && OC.b.length === (1 << OC.R) && new Set(OC.b.filter(x => x >= 0)).size === allC.length && OC.b.filter(x => x >= 0).length === allC.length && OC.users[100001] && OC.users[100001].u === 'uA', 'Open Cup draw: every club once, R=' + (OC && OC.R));
T(CL && CL.gs.length === 64 && new Set(CL.gs).size === 64 && g1.every(G => CL.gs.includes(G.fin[0])), 'Champions League: 64 clubs, every Season 1 group champion is in');
const H1 = get('w11hof/1'), HM = get('w11meta/hof'); T(H1 && Object.keys(H1.d).length === g1.length && g1.every(G => H1.d[G.t + '-' + G.g].ci === G.fin[0]), 'Hall of Fame: every group champion of Season 1');
T(HM && Object.values(HM.tro).reduce((a, x) => a + (x.l || 0), 0) === g1.length, 'trophy table counts the titles');
console.log('most outside calls in one 5-minute run:', maxSub, '(free plan limit 50)'); console.log(`\n${ok} passed, ${bad} failed · commits ${stats.commits} · precondition clashes ${stats.failedPre}`);
process.exit(bad ? 1 : 0);
