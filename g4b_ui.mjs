
// G4b browser test (real 3D players via w3d.js; NO3D=1 blocks w3d.js to test the old-engine fallback). Based on the G4 test:
// G4 browser test: currency labels, new designer (shapes, patterns, collar/sleeves/shorts/socks, border/band/EST, 3D kit),
// friendly with opening ceremony, 3D live view, goal replay (live radar in the corner), closing ceremony, past replays,
// Club HQ 3D stadium + paid redesign, trophy lift, Season 1 Open Cup screen. Run: bash build.sh && node tests/g4_ui.mjs
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import * as FK from './g2_fake.mjs';
const { ROOT, put, get, setNow, getNow, call, cron, W, env, mkTok } = FK;
const OUT = process.env.SHOTS || (process.env.NO3D ? '/tmp/g4bshots-no3d' : '/tmp/g4bshots'); const NO3D = !!process.env.NO3D; fs.mkdirSync(OUT, { recursive: true });
globalThis.window = globalThis; globalThis.document = { getElementById: () => null, addEventListener() {}, head: { appendChild() {} }, body: { insertAdjacentHTML() {} }, querySelectorAll: () => [] }; globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
new Function(fs.readFileSync(ROOT + 'dist/w11.js', 'utf8'))(); const P = window.W11, C = P.C;
let ok = 0, bad = 0; const T = (c, msg) => { if (c) ok++; else { bad++; console.log('❌', msg); } };
const S = 1, H = 3600000, START = Date.UTC(2026, 10, 2) + 3 * 86400000 + 9 * H; setNow(START);
const club = (uid, ci, extra) => put('w11Clubs/' + uid, { uid, club: ci, name: 'Tema Rockets', short: 'TEM', crest: { c1: '#22d3ee', c2: '#a855f7', shape: 'shield' }, ids: C.squadIds(ci), form: '4-3-3', kits: [{ c1: '#22d3ee', c2: '#ffffff', pat: 'stripes' }, { c1: '#ffffff', c2: '#22d3ee', pat: 'plain' }, { c1: '#111827', c2: '#22d3ee', pat: 'plain' }], stats: { p: 5, w: 3, d: 1, l: 1, gf: 9, ga: 5 }, boot: [1, 2, 3, 4, 5].map(i => ({ at: 1, gf: 1, ga: 0 })), fr: 0, coins: 600000, gems: 150, energy: 25, med: 15, pioneer: true, pioneerNo: 3, createdAt: Date.UTC(2026, 10, 2), std: { lv: 4, nm: 'Rocket Dome' }, ...(extra || {}) });
club('uA', 100001, { wait: 2, sl: 0 });
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
const gl = await p.evaluate(() => W11.G3.ok()); console.log('WebGL in this browser:', gl); T(gl, 'WebGL available for the 3D tests');
await p.evaluate(() => { localStorage.setItem('w11_3d', '1'); window.W11.__dbg = 1; window.W11.open(); }); await p.waitForTimeout(2500);
for (let i = 0; i < 40 && await p.evaluate(() => W11.w3d.st === 1); i++) await p.waitForTimeout(500);
const st3 = await p.evaluate(() => W11.w3d.st); console.log('real 3D status:', st3); T(NO3D ? st3 === -1 : st3 === 2, NO3D ? 'w3d.js blocked: old engine kept' : 'real 3D (w3d.js + player + animations) loaded in the background');
await p.evaluate(() => { window.__seen = {}; setInterval(() => { const a = document.getElementById('w11cinec'), b = document.getElementById('w11cert'); if (document.getElementById('w11cine') && !window.__seen.cineAt) window.__seen.cineAt = performance.now(); if (a && /GOAL!/.test(a.innerText) && !window.__seen.goal) { window.__seen.goal = 1; window.__seen.goalAt = performance.now(); } if (b && /FULL TIME/.test(b.innerText)) window.__seen.ft = 1; if (b && /PLAYER OF THE MATCH/.test(b.innerText)) window.__seen.pom = 1; }, 60); });
const seen = (k) => p.evaluate((k) => !!window.__seen[k], k);
const BE = NO3D ? 'gl' : 'b3'; const be = () => p.evaluate(() => W11.G3.be);
// 1) GG Coins become rare once; the money chips swap
T(me().gems === C.TOK.pio && me().g4 === 1, 'old Pioneer club: GG Coins set to ' + C.TOK.pio + ' (was 150)');
let t = await txt(); T(/💎 600,000/.test(t) && /🪙 25/.test(t), 'chips: 💎 Gems (everyday) and 🪙 GG Coins (rare)');
T(/GG Coins are now rare/.test(await toasts()), 'told once about the new GG Coins'); await shot('01-home');
// 2) Season 1 Open Cup screen; Champions League says Season 2
put('w11c/1-oc', { s: 1, k: 'oc', ...C.ocBracket(1, [100001, ...C.initClubs(6, 0).slice(1), ...C.initClubs(6, 1)]), users: { 100001: { u: 'uA', n: 'Tema Rockets', sh: 'TEM', sl: 0, o: 70 } }, tk: {}, rr: {}, ur: {}, pu: {}, pr: 0, dn: 0 });
await p.evaluate(() => W11.cups('oc')); await p.waitForTimeout(1500); t = await txt();
T(/Open Cup/.test(t) && /Still in|skip/.test(t) && /its own kick-off time/.test(t), 'Season 1: Open Cup is on, with varied kick-off times'); await shot('02-open-cup-s1');
await p.evaluate(() => W11.cups('cl')); await p.waitForTimeout(1200); t = await txt(); T(/Champions League starts in Season 2/.test(t), 'Champions League: from Season 2'); await shot('03-cl-s2');
// 3) Club HQ: 3D stadium + redesign card
await p.evaluate(() => W11.hq()); await p.waitForTimeout(1800); t = await txt();
T(/CREST & KITS/.test(t) && /Redesign crest & kits · 5 🪙/.test(t) && await p.evaluate(() => !!document.querySelector('#w11std3 canvas')), 'Club HQ: 3D stadium and redesign button'); T(await be() === BE, 'HQ stadium drawn by ' + BE); await shot('04-hq-3d-stadium');
// 4) redesign: new shapes, band, EST, patterns, collar, sleeves, shorts, socks + 3D kit preview, costs 5 GG Coins
await p.evaluate(() => W11.redesign()); await p.waitForTimeout(800);
await p.evaluate(() => { W11.draft('crest', 'shape', 'star'); W11.draft('ui', 'cp', 'bd'); W11.draft('crest', 'bd', '#d4af37'); W11.draft('crest', 'band', 'd'); W11.draft('crest', 'sym', '🦈'); W11.draft('crest', 'est', 1);
  W11.draft('kit', 'pat', 'chevron'); W11.draft('ui', 'kp', 'col'); W11.draft('kit', 'col', '#d4af37'); W11.draft('ui', 'kp', 'sho'); W11.draft('kit', 'sho', '#0b1f4d'); W11.draft('ui', 'kp', 'soc'); W11.draft('kit', 'soc', '#d4af37'); }); await p.waitForTimeout(1500); t = await txt();
T(/Pinstripes/.test(t) && /Checker/.test(t) && /Centre stripe/.test(t) && /Pennant/.test(t) && /Collar/.test(t) && /Socks/.test(t) && /EST. 2026/.test(t), 'designer shows the new options');
T(await p.evaluate(() => !!document.querySelector('#w11k3 canvas')), 'spinning 3D kit preview'); T(await be() === BE, 'kit preview drawn by ' + BE); await shot('05-redesign');
await p.evaluate(() => document.getElementById('w11b').scrollTo(0, 99999)); await p.waitForTimeout(400); await shot('06-redesign-kits');
await p.evaluate(() => W11.designSave()); await p.waitForTimeout(1500);
T(me().gems === C.TOK.pio - C.TOK.design && me().crest.shape === 'star' && me().crest.est === true && me().kits[0].pat === 'chevron' && me().kits[0].sho === '#0b1f4d', 'redesign saved by the worker, ' + C.TOK.design + ' 🪙 spent (' + me().gems + ' left)'); await shot('07-hq-after');
// 5) friendly: opening ceremony (no skip) → live 3D → goal replay with live radar → closing ceremony → past replays
const seed = await p.evaluate(() => { W11.prematch('cpu'); return W11.live.seed; });
await p.clock.fastForward(5000); await p.waitForTimeout(900); t = await txt(); if (process.env.DBG) console.log('DBG', JSON.stringify(await p.evaluate(() => ({ cer: W11._cer, be: W11.G3.be, view: !!W11.G3.view, el: !!document.getElementById('w11cer'), e: (Date.now() - W11.live.startAt) / 1000 }))), errs.slice(-5));
T(await p.evaluate(() => !!document.getElementById('w11cer')) && /Rocket Dome|vs|Starting XI|KICK-OFF/i.test(t), 'opening ceremony is running'); T(await be() === BE, 'opening ceremony drawn by ' + BE); await shot('08-opening');
await p.clock.fastForward(3500); await p.waitForTimeout(800); if (process.env.DBG) console.log('DBG2', JSON.stringify(await p.evaluate(() => W11.G3.B3 && W11.G3.B3.dbg()))); await shot('09-opening-lineup'); if (process.env.DBGSEQ) for (let i = 0; i < 6; i++) { await p.waitForTimeout(700); console.log('SEQ', i, JSON.stringify(await p.evaluate(() => ({ d: W11.G3.B3.dbg().cam, e: (Date.now() - W11.live.startAt) / 1000 })))); await shot('09-seq' + i); }
T(!/skip/i.test(await p.evaluate(() => document.getElementById('w11cer').innerText)), 'no skip button');
await p.clock.fastForward(5500); await p.waitForTimeout(1200);
T(await p.evaluate(() => !document.getElementById('w11cer')), 'ceremony ends at kick-off');
for (let i = 0; i < 12 && await p.evaluate(() => !!W11.cine.cur); i++) { await p.clock.fastForward(1500); await p.waitForTimeout(400); }
await p.waitForTimeout(800); T(await p.evaluate(() => W11.v3.on && !!(document.querySelector('#w11l3 canvas') || (W11.cine.cur && document.querySelector('#w11cine canvas')))), '3D live view on'); await p.clock.fastForward(6000); await p.waitForTimeout(700); await shot('10-live-3d');
await p.evaluate(() => W11.v3toggle()); await p.waitForTimeout(400); T(await p.evaluate(() => !W11.v3.on), 'switch to 2D radar'); await p.evaluate(() => W11.v3toggle()); await p.waitForTimeout(300);
const goals = await p.evaluate(() => { const L = W11.live, m = W11.simulate(L.home, L.away, L.seed, L.cmds); return m.ev.filter(e => e.k === 'goal').map(e => ({ tick: e.tick, side: e.side, pid: e.pid, txt: e.txt })); });
console.log('goals in this friendly:', goals.length, goals.map(g => g.tick).join(','));
const startAt = await p.evaluate(() => W11.live.startAt), rt = (tick) => { const s = tick * 0.05; return startAt + 1000 * (s <= 105 ? s : s + 30); };
const now0 = await p.evaluate(() => Date.now()), gl1 = goals.filter(g => rt(g.tick) > now0 + 6000 && rt(g.tick) < startAt + 225000 && Math.abs(g.tick * 0.05 - 105) > 8);
if (gl1.length) {
  const g = gl1[0]; let nowB = await p.evaluate(() => Date.now()); await p.clock.fastForward(Math.max(0, rt(g.tick) - nowB - 2600)); await p.waitForTimeout(900);
  for (let i = 0; i < 6 && await p.evaluate(() => { const c = document.getElementById('w11cine'); return !c || c.offsetHeight < document.getElementById('w11').offsetHeight * 0.97; }); i++) await p.waitForTimeout(300);
  T(await p.evaluate(() => !!document.querySelector('#w11cine button')), 'shout buttons inside the 3D camera');
  const cs = await p.evaluate(() => { const c = document.getElementById('w11cine'), h = document.getElementById('w11'); return c ? { w: c.offsetWidth, hw: h.offsetWidth, h: c.offsetHeight, hh: h.offsetHeight, op: getComputedStyle(c).opacity, can: !!c.querySelector('canvas'), rp: !!document.getElementById('w11rp') } : null; });
  T(cs && cs.w >= cs.hw * 0.97 && cs.h >= cs.hh * 0.97 && cs.can, 'before the goal: the radar has turned into a full-screen 3D camera ' + JSON.stringify(cs)); T(await be() === BE, 'live goal camera drawn by ' + BE);
  T(cs && !cs.rp, 'no split-screen replay any more');
  T(await p.evaluate(() => !window.__seen.goalAt || window.__seen.cineAt < window.__seen.goalAt - 300), 'run-up: the 3D camera opened before the GOAL caption'); await shot('11-cine-runup');
  await p.clock.fastForward(1200); await p.waitForTimeout(400); await shot('12-cine-shot');
  let gl = false; for (let i = 0; i < 8 && !gl; i++) { await p.clock.fastForward(400); await p.waitForTimeout(250); gl = /GOAL!/.test(await p.evaluate(() => (document.getElementById('w11cinec') || {}).innerText || '')); }
  T(gl || await seen('goal'), 'GOAL! shown in the 3D camera'); await shot('12b-cine-goal');
  let back = false; for (let i = 0; i < 10 && !back; i++) { await p.clock.fastForward(1200); await p.waitForTimeout(450); back = await p.evaluate(() => !document.getElementById('w11cine')); }
  T(back, 'back to the tactical radar when play restarts'); await shot('12c-back-to-radar');
} else console.log('(no usable goal in this friendly)');
const nowB = await p.evaluate(() => Date.now()); await p.clock.fastForward(startAt + 240000 - nowB + 400); await p.waitForTimeout(1200);
for (let i = 0; i < 16 && await p.evaluate(() => W11._cer !== 'close'); i++) { await p.clock.fastForward(3000); await p.waitForTimeout(500); }
await p.waitForTimeout(500);
if (process.env.DBG) console.log(await p.evaluate(() => JSON.stringify({ cer: W11._cer, rp: W11._rp, gq: (W11._gq || []).length, cd: W11._closeDone, over: W11.m && W11.m.over, e: (Date.now() - W11.live.startAt) / 1000, live: !!W11.live, ui: document.getElementById('w11').innerText.slice(-200), el: !!document.getElementById('w11cer'), cap: (document.getElementById('w11cert') || {}).innerHTML })));
T(await seen('ft'), 'closing ceremony: full time'); T(await be() === BE, 'closing ceremony drawn by ' + BE); await shot('13-closing');
let pom = false; for (let i = 0; i < 10 && !pom; i++) { await p.clock.fastForward(1000); await p.waitForTimeout(300); pom = /PLAYER OF THE MATCH/.test(await txt()) || await seen('pom'); } T(pom, 'closing ceremony: player of the match'); await shot('14-closing-best');
await p.clock.fastForward(4000); await p.waitForTimeout(600); await shot('15-closing-fireworks');
await p.clock.fastForward(4000); await p.waitForTimeout(1800); t = await txt();
T(/WIN|DEFEAT|DRAW/.test(t) && !await p.evaluate(() => !!document.getElementById('w11cer')), 'then the full-time screen');
if (goals.length) { T(/Goal replays/.test(t), 'full-time screen lists goal replays'); await shot('16-fulltime');
  await p.evaluate(() => { W11.replayPast(0).catch(e => window.__toasts.push('ERR ' + e.message)); }); await p.waitForTimeout(600); if (process.env.DBG) console.log(await p.evaluate(() => JSON.stringify({ rp: W11._rp, x: !!W11._rpx, el: !!document.getElementById('w11rp'), t: window.__toasts.slice(-2) }))); await p.clock.fastForward(4000); await p.waitForTimeout(600); T(await p.evaluate(() => !!document.getElementById('w11rp')), 'past goal replay plays'); await shot('17-replay-past');
  await p.clock.fastForward(8000); await p.waitForTimeout(800); T(await p.evaluate(() => !document.getElementById('w11rp')), 'past replay closes'); }
// 6) trophy lift (once)
put('w11Clubs/uA', { ...me(), tro: [{ s: 1, k: 'oc', p: 1 }] }); await p.evaluate(async () => { await W11.load(); W11.home(); }); await p.waitForTimeout(1500); await p.clock.fastForward(2500); await p.waitForTimeout(700);
T(/CHAMPIONS/.test(await txt()) && /Open Cup/.test(await txt()), 'trophy lift for the Open Cup'); T(await be() === BE, 'trophy lift drawn by ' + BE); await shot('18-trophy');
await p.clock.fastForward(9500); await p.waitForTimeout(700); T(await p.evaluate(() => !!document.querySelector('#w11trb button')), 'Continue after the celebration');
await p.evaluate(() => document.querySelector('#w11trb button').click()); await p.waitForTimeout(300); await p.evaluate(() => W11.home()); await p.waitForTimeout(1500); T(await p.evaluate(() => !document.getElementById('w11cer')), 'shown only once');
// 7) a brand-new club: designer, GG Coins start at 10
const p2 = await mkPage(ctx); await p2.goto('https://game.test/index.html#uN'); await p2.waitForTimeout(300);
await p2.evaluate(() => window.W11.open()); await p2.waitForTimeout(2000);
await p2.evaluate(() => { W11._draft.name = 'Volta Sharks'; W11._draft.short = 'VOS'; W11.draft('crest', 'shape', 'pennant'); W11.draft('crest', 'band', 'h'); W11.draft('kit', 'pat', 'checker'); }); await p2.waitForTimeout(800);
await p2.screenshot({ path: `${OUT}/19-create.png` });
await p2.evaluate(() => W11.createGo()); await p2.waitForTimeout(1500); const N = get('w11Clubs/uN');
if (process.env.DBG) console.log('NEWCLUB', N && JSON.stringify({ g: N.gems, c: N.coins, p: N.pioneer, n: N.pioneerNo, g4: N.g4 })); T(N && N.gems === (N.pioneer ? C.TOK.pio : C.TOK.start) && N.g4 === 1 && N.crest.shape === 'pennant' && N.kits[0].pat === 'checker' && N.kits[0].sho, 'new club: ' + (N && N.gems) + ' 🪙 GG Coins (Pioneer #' + (N && N.pioneerNo) + '), new crest + full kits saved');
T(/GG Coins \(rare\)/.test(await p2.evaluate(() => document.getElementById('w11').innerText)), 'welcome card explains the two currencies'); await p2.screenshot({ path: `${OUT}/20-welcome.png` });
if (NO3D) errs.splice(0, errs.length, ...errs.filter(e => !/Failed to load resource/.test(e)));
console.log('page errors:', errs.length ? errs : 'none'); T(!errs.length, 'no page errors');
T(await p.evaluate(() => { const r = document.getElementById('w11rot'); return !!r && getComputedStyle(r).display === (innerHeight > innerWidth ? 'flex' : 'none'); }), 'turn-your-phone card only when upright');
await b.close(); console.log(`\n${ok} passed, ${bad} failed · screenshots in ${OUT}`); process.exit(bad ? 1 : 0);
