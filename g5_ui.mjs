
// G5 browser test: fresh Season 1 by the owner, join at once (no Boot Camp), takers + styles in Squad, new rules in the match (set pieces in 3D). Based on the G4b test.
// G4b browser test (real 3D players via w3d.js; NO3D=1 blocks w3d.js to test the old-engine fallback). Based on the G4 test:
// G4 browser test: currency labels, new designer (shapes, patterns, collar/sleeves/shorts/socks, border/band/EST, 3D kit),
// friendly with opening ceremony, 3D live view, goal replay (live radar in the corner), closing ceremony, past replays,
// Club HQ 3D stadium + paid redesign, trophy lift, Season 1 Open Cup screen. Run: bash build.sh && node tests/g4_ui.mjs
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import * as FK from './g2_fake.mjs';
const { ROOT, put, get, setNow, getNow, call, cron, W, env, mkTok } = FK;
const OUT = process.env.SHOTS || '/tmp/g5shots'; const NO3D = !!process.env.NO3D; fs.mkdirSync(OUT, { recursive: true });
globalThis.window = globalThis; globalThis.document = { getElementById: () => null, addEventListener() {}, head: { appendChild() {} }, body: { insertAdjacentHTML() {} }, querySelectorAll: () => [] }; globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
new Function(fs.readFileSync(ROOT + 'dist/w11.js', 'utf8'))(); const P = window.W11, C = P.C;
let ok = 0, bad = 0; const T = (c, msg) => { if (c) ok++; else { bad++; console.log('❌', msg); } };
const S = 1, H = 3600000, START = Date.UTC(2026, 10, 2) + 3 * 86400000 + 9 * H; setNow(START);
const club = (uid, ci, extra) => put('w11Clubs/' + uid, { uid, club: ci, name: 'Tema Rockets', short: 'TEM', crest: { c1: '#22d3ee', c2: '#a855f7', shape: 'shield' }, ids: C.squadIds(ci), form: '4-3-3', kits: [{ c1: '#22d3ee', c2: '#ffffff', pat: 'stripes' }, { c1: '#ffffff', c2: '#22d3ee', pat: 'plain' }, { c1: '#111827', c2: '#22d3ee', pat: 'plain' }], stats: { p: 5, w: 3, d: 1, l: 1, gf: 9, ga: 5 }, boot: [1, 2, 3, 4, 5].map(i => ({ at: 1, gf: 1, ga: 0 })), fr: 0, coins: 600000, gems: 150, energy: 25, med: 15, pioneer: true, pioneerNo: 3, createdAt: Date.UTC(2026, 10, 2), std: { lv: 4, nm: 'Rocket Dome' }, ...(extra || {}) });
club('uA', 100001, { wait: 0, sl: 0, boot: [] });
put('w11Clubs/uAdmin', { ...get('w11Clubs/uA'), uid: 'uAdmin', club: 100005, name: 'Owner FC', short: 'OWN', ids: C.squadIds(100005), boot: [] });
put('w11meta/season', { s: S, d6: 32, ph: '', cur: 0, plan: '' });
const RT = {}; let rk = 0; const errs = [];
const mkPage = async (c) => { const pg = await c.newPage(); pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 200)); if (m.type() === 'warning' && process.env.DBG) console.log('WARN', m.text().slice(0, 300)); }); await pg.clock.install({ time: START }); await pg.route('**/*', handler); return pg; };
const handler = async (r) => {
  const u = new URL(r.request().url()), H = r.request().headers(), now = Number(H['x-now']) || 0; if (now) setNow(now);
  const J = (o) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(o) });
  if (u.host === 'game.test' && u.pathname === '/index.html') return r.fulfill({ status: 200, contentType: 'text/html', body: PAGE });
  if (u.host === 'game.test' && /^\/w3d[-a-z]*\.(js|glb)$/.test(u.pathname)) { if (NO3D) return r.fulfill({ status: 404, body: '' }); return r.fulfill({ status: 200, contentType: u.pathname.endsWith('.js') ? 'application/javascript' : 'model/gltf-binary', headers: { 'access-control-allow-origin': '*' }, body: fs.readFileSync(ROOT + 'dist' + u.pathname) }); }
  if (u.host === 'game.test' && u.pathname === '/w11.js') return r.fulfill({ status: 200, contentType: 'application/javascript; charset=utf-8', body: fs.readFileSync(ROOT + 'dist/w11.js', 'utf8') });
  if (u.host === 'db.test' && u.pathname === '/list') { const c = u.searchParams.get('c') + '/'; return J({ docs: [...FK.DB.keys()].filter(k => k.startsWith(c)).map(k => ({ id: k.slice(c.length), d: get(k) })) }); }
  if (u.host === 'db.test' && u.pathname === '/set') { put(u.searchParams.get('p'), JSON.parse(r.request().postData() || '{}')); return J({}); }
  if (u.host === 'db.test' && u.pathname === '/get') return J({ d: get(u.searchParams.get('p')) || null });
  if (u.host === 'db.test' && u.pathname === '/update') { const pa = u.searchParams.get('p'); put(pa, { ...get(pa), ...JSON.parse(r.request().postData() || '{}') }); return J({}); }
  if (u.host === 'rt.test' && u.pathname === '/list') return J(RT[u.searchParams.get('p')] || {});
  if (u.host === 'rt.test' && u.pathname === '/push') { const pa = u.searchParams.get('p'); (RT[pa] = RT[pa] || {})['k' + String(++rk).padStart(5, '0')] = JSON.parse(r.request().postData()); return J({}); }
  if (u.host === 'w.test') { const res = await W.fetch(new Request('https://w.dev' + u.pathname, { method: 'POST', headers: { Authorization: 'Bearer ' + mkTok(H['x-uid'] || 'uA'), 'Content-Type': 'application/json', Origin: 'https://sinlessgg.com' }, body: r.request().postData() || '{}' }), env, { waitUntil() {} }); return J(await res.json()); }
  return r.abort();
};
const PAGE = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#070b18;font-family:system-ui}button{border:0;color:inherit;font:inherit}</style></head><body><script>
const of = window.fetch; window.fetch = (u, o = {}) => { o.headers = { ...(o.headers || {}), 'X-Now': String(Date.now()), 'X-Uid': window.uidNow() }; return of(u, o); };
window.uidNow = () => (location.hash.slice(1) || 'uA'); window.me = () => 'kumi'; window.db = {}; window.__toasts = []; window.showToast = (t) => window.__toasts.push(t); window.nwUrl = async () => 'https://w.test'; window.mediaIdToken = async () => 'tok'; window.needSignIn = () => false; window.confirm = () => true; window.prompt = () => 'Rocket Dome';
const J = async (u, o) => (await fetch(u, o)).json();
window.fb11 = { doc: (d, c, id) => ({ path: c + '/' + id }), getDoc: async (r) => { const j = await J('https://db.test/get?p=' + encodeURIComponent(r.path)); return { exists: () => !!j.d, data: () => j.d }; }, updateDoc: async (r, patch) => J('https://db.test/update?p=' + encodeURIComponent(r.path), { method: 'POST', body: JSON.stringify(patch) }),
  collection: (d, c) => ({ c }), where: (f, op, v) => ({ f, v }), limit: () => ({}), query: (c, ...w) => ({ c: c.c, w: w.filter(x => x.f) }), getDocs: async (q) => { const j = await J('https://db.test/list?c=' + q.c), docs = j.docs.filter(x => q.w.every(w => x.d[w.f] === w.v)).map(x => ({ id: x.id, data: () => x.d })); return { empty: !docs.length, docs, forEach: (f) => docs.forEach(f) }; }, onSnapshot: (q, cb) => { let last = ''; const go = async () => { const j = await J('https://db.test/list?c=' + q.c), s = JSON.stringify(j); if (s === last) return; last = s; const docs = j.docs.map(x => ({ id: x.id, data: () => x.d })); cb({ forEach: (f) => docs.forEach(f), docs }); }; go(); const iv = setInterval(go, 400); return () => clearInterval(iv); } };
window.fb11.writeBatch = () => { const ops = []; return { set: (r, d) => ops.push([r, d]), commit: async () => { for (const [r, d] of ops) await J('https://db.test/set?p=' + encodeURIComponent(r.path), { method: 'POST', body: JSON.stringify(d) }); } }; };
window.rtdbInit = async () => ({}); window.rtdbApi = { ref: (d, p) => ({ p }), onValue: (r, cb) => { cb({ val: () => 0 }); return () => {}; }, serverTimestamp: () => ({ __ts: 1 }),
  get: async (r) => { const j = await J('https://rt.test/list?p=' + r.p); return { val: () => j }; },
  push: async (r, v) => { v = { ...v, at: v.at && v.at.__ts ? Date.now() : v.at }; await J('https://rt.test/push?p=' + r.p, { method: 'POST', body: JSON.stringify(v) }); },
  onChildAdded: (r, cb) => { const seen = new Set(); const iv = setInterval(async () => { const j = await J('https://rt.test/list?p=' + r.p); for (const k of Object.keys(j)) if (!seen.has(k)) { seen.add(k); cb({ key: k, val: () => j[k] }); } }, 300); return () => clearInterval(iv); }, onChildChanged: () => () => {} };
</script><script src="https://game.test/w11.js"></script></body></html>`;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] }).catch(() => chromium.launch());
const ctx = await b.newContext({ viewport: { width: process.env.PORTRAIT ? 400 : 844, height: process.env.PORTRAIT ? 860 : 390 }, isMobile: true, hasTouch: true, timezoneId: 'Africa/Accra' });
const p = await mkPage(ctx); await p.goto('https://game.test/index.html#uA'); await p.waitForTimeout(300);
const shot = async (n) => { await p.screenshot({ path: `${OUT}/${n}.png`, fullPage: false }); };
const txt = () => p.evaluate(() => document.getElementById('w11') ? document.getElementById('w11').innerText : '');
const toasts = () => p.evaluate(() => window.__toasts.join(' | '));
const me = () => get('w11Clubs/uA');

const gl = await p.evaluate(() => W11.G3.ok()); T(gl, 'WebGL available');
await p.evaluate(() => { localStorage.setItem('w11_3d', '1'); window.W11.open(); }); await p.waitForTimeout(2500);
for (let i = 0; i < 40 && await p.evaluate(() => W11.w3d.st === 1); i++) await p.waitForTimeout(500);
await p.evaluate(() => W11.home()); await p.waitForTimeout(1500);
// 1) home: join the league now (no Boot Camp needed), Boot Camp offered as optional practice
let t = await txt(); if (process.env.DBG) console.log('HOME', t.slice(0, 600)); T(/Join the league now/.test(t) && /Boot Camp \(optional\)/.test(t), 'home: join now + optional Boot Camp'); await shot('01-join-now');
// 2) owner starts a fresh Season 1 (admin page)
const p3 = await mkPage(ctx); await p3.goto('https://game.test/index.html#uAdmin'); await p3.waitForTimeout(300);
await p3.evaluate(() => window.W11.open()); await p3.waitForTimeout(2000);
await p3.evaluate(() => W11.helpL()); await p3.waitForTimeout(1200);
T(/Full football rules/.test(await p3.evaluate(() => document.getElementById('w11').innerText)) && await p3.evaluate(() => !!document.querySelector('[onclick="W11.freshSeason()"]')), 'help explains the rules; owner sees the fresh-season button');
await p3.screenshot({ path: `${OUT}/02-owner.png` });
setNow(START + 5 * 3600000); await p3.evaluate(() => W11.freshSeason()); await p3.waitForTimeout(2500);
const M = get('w11meta/season'); T(M && M.eng === 2 && M.ep, 'fresh Season 1 started by the owner: ' + JSON.stringify({ s: M && M.s, ep: M && M.ep }));
await p.evaluate(() => { localStorage.removeItem('w11_ep'); }); await p.evaluate(() => W11.open()); await p.waitForTimeout(2000); await p.evaluate(() => W11.home()); await p.waitForTimeout(800);
T(await p.evaluate(() => W11.C.epoch()) === M.ep, 'phone picked up the new season start');
// 4) squad: takers + styles
await p.evaluate(() => W11.squad()); await p.waitForTimeout(800); t = await txt();
T(/Set pieces/.test(t) && /Penalties/.test(t) && /Player styles/.test(t) && /(screamer|poacher|curler|Dribbler)/i.test(t), 'squad shows takers and player styles');
const pen = await p.evaluate(() => W11.me.ids[9]); await p.evaluate((id) => W11.setTk('pen', id), pen); await p.waitForTimeout(800);
T(get('w11Clubs/uA').tk && get('w11Clubs/uA').tk.pen === pen, 'penalty taker saved'); await p.evaluate(() => document.getElementById('w11tk').scrollIntoView()); await shot('04-takers');
// 5) a friendly on the new engine: ticker shows set pieces, 3D shows corners / free kicks / penalties
await p.evaluate(() => W11.prematch('cpu')); console.log('PM toasts:', (await toasts()).slice(-300)); const L = await p.evaluate(() => { const L = W11.live, m = W11.simulate(L.home, L.away, L.seed, L.cmds); return { ev: m.ev.map(e => ({ k: e.k, tick: e.tick, txt: e.txt })), startAt: L.startAt, tk: L.home.tk }; });
T(L.tk && L.tk.pen === pen, 'friendly uses my takers');
const kinds = new Set(L.ev.map(e => e.k)); console.log('events in this friendly:', [...kinds].join(' '));
T(['corner', 'fk', 'foul', 'added'].filter(k => kinds.has(k)).length >= 3, 'new rules happen in the match');
const sp = L.ev.find(e => e.k === 'corner' || e.k === 'pen' || (e.k === 'fk' && /m out/.test(e.txt))) || L.ev.find(e => e.k === 'fk');
if (sp) { const at = L.startAt + 1000 * (sp.tick * 0.05 <= 105 ? sp.tick * 0.05 : sp.tick * 0.05 + 30); await p.clock.fastForward(Math.max(0, at - await p.evaluate(() => Date.now()) + 1200)); await p.waitForTimeout(2500);
  const st = await p.evaluate(() => ({ sp: W11.m && W11.m.sp ? W11.m.sp.kind : '', be: W11.G3.be, txt: document.getElementById('w11tk') ? document.getElementById('w11tk').innerText : '' }));
  console.log('set piece moment:', sp.k, JSON.stringify(st).slice(0, 200)); T(/Corner|Free kick|PENALTY|Foul/.test(st.txt), 'ticker shows the set piece'); await shot('05-set-piece'); await p.waitForTimeout(1500); await shot('06-set-piece-2'); }
// 3) the manager joins at once and plays today
await p.evaluate(() => W11.leaveMatch && W11.stopLoop()); await p.evaluate(() => W11.home()); await p.waitForTimeout(800);
await p.evaluate(() => W11.joinL(3)); await p.waitForTimeout(2500); t = await txt();
T(get('w11Clubs/uA').lg && get('w11Clubs/uA').lg.s === 1 && /DIVISION 6/.test(t), 'joined Division 6 at once'); await shot('03-league-home');
console.log('page errors:', errs.length ? errs : 'none'); T(!errs.length, 'no page errors');
await b.close(); console.log(`\n${ok} passed, ${bad} failed · screenshots in ${OUT}`); process.exit(bad ? 1 : 0);
