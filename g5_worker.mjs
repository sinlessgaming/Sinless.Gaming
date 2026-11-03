// G5 worker test: fresh Season 1 (admin), clubs keep squads/money, instant join with a match the same day,
// engine-version gate, set-piece takers in the team sheet, market keeps its own clock. Run: bash build.sh && node tests/g5_worker.mjs
import fs from 'node:fs';
import * as FK from './g2_fake.mjs';
const { ROOT, put, get, setNow, call, cron, DB } = FK;
const C = new Function(fs.readFileSync(ROOT + 'src/w11core.js', 'utf8') + '; return W11C;')();
let ok = 0, bad = 0; const T = (c, msg) => { if (c) ok++; else { bad++; console.log('❌', msg); } };
const H = 3600000, OLD = C.dayStart(1, 3) + 9 * H;
const club = (uid, ci, extra) => put('w11Clubs/' + uid, { uid, club: ci, name: 'Club ' + uid, short: 'C' + uid.slice(1), ids: C.squadIds(ci), form: '4-4-2', kits: [{ c1: '#22d3ee' }], coins: 777777, gems: 12, g4: 1, energy: 3, med: 3, boot: [], pioneer: true, std: { lv: 3, nm: 'Rock' }, ...(extra || {}) });
put('w11meta/season', { s: 1, d6: 32, ph: '', cur: 0, plan: '' });
/* an old Season 1 already running */
setNow(OLD); club('uA', 100001); club('uB', 100002, { pioneer: false });
let r = await call('uA', '/w11/join', { sl: 0 }); T(r.ok && !(get('w11Clubs/uA').boot || []).length, 'joined without Boot Camp');
await cron(); T([...DB.keys()].some(k => k.startsWith('w11g/')) && [...DB.keys()].some(k => k.startsWith('w11c/')), 'old season has groups and a cup');
put('w11a/3', { i: 3, n: 5, u: 'uB', p: 9000 }); put('w11Clubs/uA', { ...get('w11Clubs/uA'), hist: [{ s: 1, p: 9 }], tro: [{ s: 1, k: 'oc', p: 1 }], tk: { pen: C.squadIds(100001)[9] } });
/* only the admin can start it */
r = await call('uA', '/w11/fresh', {}); T(!r.ok, 'not admin → refused');
const day = 5; setNow(C.dayStart(1, day) + 14.5 * H);
for (let i = 0; i < 5; i++) { r = await call('uAdmin', '/w11/fresh', {}); if (!r.more) break; }
T(r.ok && !r.more, 'fresh Season 1 done: ' + JSON.stringify(r.done));
T(![...DB.keys()].some(k => /^w11(g|m|v|c|hof)\//.test(k)) && !get('w11meta/hof'), 'league, matches, votes, cups, Hall of Fame wiped');
T(get('w11a/3') && get('w11a/3').p === 9000, 'market bids untouched (held coins safe)');
const A = get('w11Clubs/uA'); T(A.coins === 777777 && A.gems === 12 && A.pioneer && A.std.lv === 3 && A.ids.length === 18 && !A.lg && !A.hist && !A.tro && A.wait === 0 && A.tk, 'club keeps squad, money, GG Coins, Pioneer, stadium, takers; league life reset');
const M = get('w11meta/season'); T(M.s === 1 && M.eng === 2 && M.ep === Math.floor(Date.now() / C.DAY) * C.DAY, 'meta: Season 1 starts today, engine 2');
C.setEpoch(M.ep); T(C.clock(Date.now()).s === 1 && C.clock(Date.now()).day === 1, 'today is Season 1 · day 1');
T(C.lotT0(0) === C.EPOCH0, 'market keeps its own clock');
/* instant join: first match today (slot 22:00 GMT, it is 14:30) */
r = await call('uB', '/w11/join', { sl: 3 }); T(r.ok && r.from === 1, 'joins at once, first match today (matchday ' + r.from + ')');
r = await call('uA', '/w11/join', { sl: 0 }); T(r.ok && r.from === 2, 'a 06:00 slot that has passed → first match tomorrow (matchday ' + r.from + ')');
/* takers in the team sheet */
r = await call('uA', '/w11/tk', { tk: { pen: C.squadIds(100001)[9], fk: 'not-mine', ck: C.squadIds(100001)[7] } });
T(r.ok && r.tk.pen === C.squadIds(100001)[9] && !r.tk.fk && r.tk.ck, 'takers saved (only own players)');
const sh = C.sheetOf(get('w11Clubs/uA'), 1, 1); T(sh.tk && sh.tk.pen === C.squadIds(100001)[9], 'team sheet carries the takers');
/* cron runs on the new clock and draws the new Open Cup */
const co = await call('uAdmin', '/w11/run', {}); if (process.env.DBG) console.log(JSON.stringify(co)); const oc = get('w11c/1-oc'); T(oc && oc.k === 'oc', 'new Season 1 Open Cup drawn');
T((await call('uA', '/w11/result', { mid: 'none-1-1-1-0', r: '1-0|;|' })).update === 1, 'old engine results refused');
console.log(`\n${ok} passed, ${bad} failed`); process.exit(bad ? 1 : 0);
