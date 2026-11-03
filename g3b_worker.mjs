// G3b worker test: Open Cup + Champions League from start to final (lock, phones vote, penalties, quick results,
// computer rounds, prizes, Hall of Fame), a manager taking over a cup place mid-season, stadium, sponsors, staff.
// Uses the fake Firestore from g2_fake.mjs. Run: bash build.sh && node tests/g3b_worker.mjs
import fs from 'node:fs';
import * as FK from './g2_fake.mjs';
const { ROOT, put, get, setNow, getNow, call, cron, DB } = FK;
const C = new Function(fs.readFileSync(ROOT + 'src/w11core.js', 'utf8') + '; return W11C;')();
let ok = 0, bad = 0; const T = (c, msg) => { if (c) ok++; else { bad++; console.log('❌', msg); } };
const S = 2, H = 3600000;
// 0) every G3a player (youngsters 1–15, market, wonders) and every team sheet without staff is exactly as before
const ORIG = process.env.ORIG_CORE || '/tmp/g3b_core.js';
const noG4 = (x) => { const y = { ...x }; delete y.kf; delete y.cr; delete y.sd; return JSON.stringify(y); };
if (fs.existsSync(ORIG)) { const O = new Function(fs.readFileSync(ORIG, 'utf8') + '; return W11C;')(); let n = 0, same = 0;
  for (const S0 of [1, 2, 4]) for (const Sx of [S0, S0 + 1, S0 + 9]) { for (const ci of [100001, 100777]) for (let k = 0; k < 15; k++) { n++; const id = 'y' + S0 + 'x' + ci + 'x' + k; if (JSON.stringify(O.player(id, Sx)) === JSON.stringify(C.player(id, Sx))) same++; }
    for (let i = 0; i < 15; i++) for (const nn of [0, 7, 999]) { n++; const id = 'a' + S0 + 'x' + i + 'x' + nn; if (JSON.stringify(O.player(id, Sx)) === JSON.stringify(C.player(id, Sx))) same++; }
    for (const no of [1, 25, 50]) { n++; const id = 'L' + S0 + 'x' + no; if (JSON.stringify(O.player(id, Sx)) === JSON.stringify(C.player(id, Sx))) same++; } }
  const cl = { ids: C.squadIds(100001), cond: { '100001-3': 20, '100001-7': 55 }, cd: 20400, tr: { fit: 3 }, inj: { '100001-2': 1 }, ban: {}, form: '4-3-3' };
  for (const d of [20400, 20401, 20410]) { n++; if (noG4(O.sheetOf(cl, d, 2)) === noG4(C.sheetOf(cl, d, 2))) same++; }
  T(same === n, 'G3a players + sheets unchanged ' + same + '/' + n); } else console.log('(skip: no G3a core to compare)');
const club = (uid, ci, extra) => put('w11Clubs/' + uid, { uid, club: ci, name: 'Club ' + uid, short: 'C' + uid.slice(1), ids: C.squadIds(ci), form: '4-4-2', kits: [], coins: 1000000, gems: 50, energy: 10, med: 5, boot: [1, 2, 3, 4, 5], pioneer: false, pioneerNo: 0, lg: { s: S, t: 6, g: 5, pos: 0, sl: 0 }, ...(extra || {}) });
const coins = (u) => get('w11Clubs/' + u).coins;
club('uA', 100001, { lg: { s: S, t: 6, g: 5, pos: 0, sl: 0 } }); club('uB', 100002, { lg: { s: S, t: 6, g: 6, pos: 0, sl: 3 } }); club('uC', 100003, { lg: { s: S, t: 5, g: 1, pos: 0, sl: 2 } });
put('w11meta/season', { s: S, d6: 32, ph: '', cur: 0, plan: '' });
const U = (u, n, sl) => ({ u, n: 'Club ' + u, sh: 'C' + u.slice(1), sl, o: 60 });
// Open Cup with 16 seats: the 14 clubs of Div 6 group 0 + uA + uB → 4 rounds on days 18, 20, 22, 24
const g60 = C.initClubs(6, 0), ob = C.ocBracket(S, [100001, 100002, ...g60]);
put('w11c/2-oc', { s: S, k: 'oc', R: ob.R, b: ob.b, users: { 100001: U('uA', 'A', 0), 100002: U('uB', 'B', 3) }, tk: {}, rr: {}, ur: {}, pu: {}, pr: 0, dn: 0 });
// Champions League: 64 clubs incl. uA and uC
const ent = [100001, 100003]; for (let i = 0; ent.length < 64; i++) ent.push(i);
put('w11c/2-cl', { s: S, k: 'cl', R: 11, gs: C.clGroups(S, ent), users: { 100001: U('uA', 'A', 0), 100003: U('uC', 'C', 2) }, tk: {}, rr: {}, ur: {}, pu: {}, pr: 0, dn: 0 });
T(ob.R === 4 && C.cupDays(get('w11c/2-oc')).join() === '18,20,22,24', 'small Open Cup: 4 rounds, final on day 24');

// 1) stadium, sponsors, staff (Season 2)
setNow(C.dayStart(S, 3) + 9 * H);
let r = await call('uA', '/w11/stadium', { act: 'name', nm: '  Neon   Arena  ' }); T(r.ok && r.std.nm === 'Neon Arena' && r.std.lv === 1, 'name the stadium');
r = await call('uA', '/w11/stadium', { act: 'name', nm: 'ab' }); T(!r.ok, 'too short refused');
let c0 = coins('uA'); r = await call('uA', '/w11/stadium', { act: 'up' }); T(r.ok && r.std.lv === 2 && coins('uA') === c0 - C.STD_COST[1], 'upgrade to level 2 costs ' + C.STD_COST[1]);
const offA = C.spOffers(S, 100001, 6); c0 = coins('uA');
r = await call('uA', '/w11/sponsor', { kind: 'sh', k: 0 }); T(r.ok && coins('uA') === c0 + offA.sh[0].up && get('w11Clubs/uA').sp.sh.n === offA.sh[0].n, 'shirt sponsor signed, signing money paid: ' + offA.sh[0].n);
r = await call('uA', '/w11/sponsor', { kind: 'sh', k: 2 }); T(!r.ok, 'one shirt sponsor a season');
r = await call('uA', '/w11/sponsor', { kind: 'st', k: 0 }); T(r.ok, 'stadium sponsor'); r = await call('uA', '/w11/sponsor', { kind: 'bo', k: 1 }); T(r.ok && Object.keys(get('w11Clubs/uA').sp).length === 4, 'bonus sponsor → 3 sponsors');
T(Object.values(offA).flat().every(o => /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(o.n)), 'made-up brand names');
c0 = coins('uA'); r = await call('uA', '/w11/staff', { k: 'ph' }); T(r.ok && coins('uA') === c0 - C.STAFF.ph, 'hire physio');
r = await call('uA', '/w11/staff', { k: 'ph' }); T(!r.ok, 'only once'); r = await call('uA', '/w11/staff', { k: 'zz' }); T(!r.ok, 'unknown staff refused');
r = await call('uA', '/w11/staff', { k: 'sc' }); T(r.ok, 'hire scout'); r = await call('uA', '/w11/staff', { k: 'as' }); T(r.ok, 'hire assistant');
club('uP', 100009, { coins: 10 }); r = await call('uP', '/w11/staff', { k: 'as' }); T(!r.ok && /gems/i.test(r.error), 'poor club cannot hire');
// physio: +6 a day; scout: 20 youngsters; assistant: tired starter swapped
const A = get('w11Clubs/uA'), today = C.absDay(getNow()), cA = { ...A, cond: { '100001-5': 40 }, cd: today - 1 };
T(C.condNow(cA, '100001-5', today) === 40 + C.REC + C.PHYSIO_REC && C.condNow({ ...cA, stf: {} }, '100001-5', today) === 40 + C.REC, 'physio gives +6 fitness a day');
r = await call('uA', '/w11/draft', { picks: [15, 16, 19] }); T(r.ok && r.ids.includes('y2x100001x19'), 'scout: youngsters 16–20 can be picked');
r = await call('uB', '/w11/draft', { picks: [15] }); T(!r.ok, 'no scout → only 15');
let wk = 0, wk0 = 0; for (let ci = 100100; ci < 100600; ci++) { for (let k = 15; k < 20; k++) if (C.player('y2x' + ci + 'x' + k, 2).wk) wk++; for (let k = 0; k < 5; k++) if (C.player('y2x' + ci + 'x' + k, 2).wk) wk0++; }
T(wk > wk0 * 3, 'scout finds more wonderkids (' + wk + ' vs ' + wk0 + ' per 2,500)');
const tired = { ...A, cond: { '100001-5': 30 }, cd: today }, sh1 = C.sheetOf(tired, today, S), sh0 = C.sheetOf({ ...tired, stf: {} }, today, S);
T(sh0.ids[5] === '100001-5' && sh1.ids[5] !== '100001-5' && C.player(sh1.ids[5], S).pos === 'MID', 'assistant swaps a tired starter for a fresh one');

// 2) a new manager takes over a computer club mid-season → takes its cup place
club('uD', 100004, { lg: null, coins: 250000 });
setNow(C.dayStart(S, 4) + 2 * H); r = await call('uD', '/w11/join', { sl: 1 }); T(r.ok && r.lg, 'uD joins Div 6: ' + JSON.stringify(r));
const D = get('w11Clubs/uD'), aiD = g60[D.lg.pos]; let OC = get('w11c/2-oc');
T(D.lg.g === 0 && OC.tk[aiD] === 100004 && OC.users[100004].u === 'uD' && get('w11c/2-cl').tk[aiD] === 100004, 'uD took over ' + aiD + "'s Open Cup place");

// 3) run the whole Open Cup + Champions League. Each phone votes on its own matches.
let votes = 0, quickN = 0, pensSeen = 0; const seen = new Set();
const voteAll = async () => {
  for (const [k, d] of DB) { if (!k.startsWith('w11m/2-oc-') && !k.startsWith('w11m/2-cl-')) continue; const M = d.data, id = k.slice(5);
    if (M.st !== 'locked' || getNow() < M.ko + C.MATCH_MS + 15000 || seen.has(id)) continue; seen.add(id);
    if (M.cup === 'cl' && M.cr === 2) continue;
    const sc = (C.hash(id) % 3) + '-' + (C.hash(id + 'x') % 3), rs = sc + '|;|;', who = [M.hu, M.au].filter(Boolean);
    for (const u of who) await call(u, '/w11/result', { mid: id, r: rs, ev: 2 });
    if (who.length < 2) { const j = await call('uV', '/w11/job', {}); if ((j.jobs || []).some(x => x.id === id)) await call('uV', '/w11/result', { mid: id, r: rs, ev: 2 }); }
    votes++;
  }
};
const balance = { uA: coins('uA'), uB: coins('uB'), uC: coins('uC'), uD: coins('uD') };
setNow(C.dayStart(S, 5)); let runs = 0;
for (; getNow() < C.dayStart(S, 28) + 12 * H; runs++) {
  await cron(); await voteAll(); setNow(getNow() + 20 * 60000);
  OC = get('w11c/2-oc'); const CL = get('w11c/2-cl'); if (OC.champ && CL.champ && getNow() > C.dayStart(S, 28)) break;
}
OC = get('w11c/2-oc'); const CL = get('w11c/2-cl');
if (process.env.DBG) { console.log('CL dn', CL.dn, 'pr', CL.pr, 'pu', JSON.stringify(CL.pu), 'ur', JSON.stringify(CL.ur)); for (const [k, d] of DB) if (k.startsWith('w11m/2-cl-')) console.log(k, d.data.st, d.data.ko, new Date(d.data.ko).toISOString()); }
T(OC.dn === 4 && OC.champ && OC.ru && OC.rr[4].length === 1, 'Open Cup finished: champion ' + (OC.champ && OC.champ.n));
T(CL.dn === 11 && CL.champ && CL.rr[11].length === 1 && CL.rr[7].length === 16 && CL.rr[1].length === 32, 'Champions League finished: champion ' + (CL.champ && CL.champ.n));
const cupM = [...DB.keys()].filter(k => /^w11m\/2-(oc|cl)-/.test(k)).map(k => [k.slice(5), get(k)]);
T(cupM.length > 0 && cupM.every(([, M]) => M.st === 'final'), 'every cup match with a manager is final: ' + cupM.length);
T(cupM.some(([, M]) => M.q) && cupM.some(([, M]) => !M.q), 'some confirmed by phones, some quick results');
T(cupM.every(([id, M]) => M.ko === C.cupKoAt(S, M.md, id)), 'G4: every cup match has its own kick-off time');
const mins = cupM.map(([, M]) => (M.ko - C.dayStart(S, M.md)) / 60000);
T(mins.every(x => x >= 375 && x <= 1425 && x % 15 === 0 && C.SLOTS.every(h => x <= h * 60 - 25 || x >= h * 60 + 15)) && new Set(mins).size >= 4, 'kick-offs 06:15–23:45 GMT, never near a league kick-off, and they vary: ' + [...new Set(mins)].length + ' different times');
// knockout results: every decided knockout result has a winner; penalties when level
const koRes = []; for (let r2 = 1; r2 <= 4; r2++) koRes.push(...OC.rr[r2]); for (let r2 = 7; r2 <= 11; r2++) koRes.push(...CL.rr[r2]);
T(koRes.every(x => x === 'bye' || (() => { const v = C.cupScore(x); return v[0] !== v[1] || v[2] !== v[3]; })()), 'knockouts always have a winner');
T(koRes.some(x => /\//.test(x)), 'some went to penalties');
T(Object.values(CL.rr).slice(0, 6).every(a => a.every(x => !/\//.test(x))), 'no penalties in the group stage');
// Champions League knockout pairs: group winners vs runners-up
const P7 = C.cupPairs(CL, 7); T(P7.every(([w, u], k) => C.clTable(CL, k)[0].ci === w && C.clTable(CL, (k + 8) % 16)[1].ci === u), 'Round of 32: group winners vs runners-up');
// a match decided by penalties paid the shoot-out winner
const pm = cupM.find(([, M]) => M.cup === 'oc' && /\//.test(OC.ur[M.cr + '_' + M.ck] || ''));
if (pm) { const [id, M] = pm, x = OC.ur[M.cr + '_' + M.ck], v = C.cupScore(x); T(C.cupCoins('oc', M.cr, v[0], v[1], id, C.cupWin(x)) === C.OC_WIN && C.cupCoins('oc', M.cr, v[0], v[1], id, 1 - C.cupWin(x)) === 0, 'penalty winner gets the win coins'); } else console.log('(no manager penalty match this run)');
// uD's cup run: the computer club's place became his
const dM = cupM.filter(([, M]) => M.hu === 'uD' || M.au === 'uD'); T(dM.length >= 1, 'uD played cup matches in his taken-over place: ' + dM.length);
// prizes + Hall of Fame
const HF = get('w11hof/2'), HM = get('w11meta/hof');
T(HF && HF.oc && HF.oc.ci === OC.champ.ci && HF.cl && HF.cl.ci === CL.champ.ci && HF.oc.ru.ci === OC.ru.ci, 'Hall of Fame: both cup winners (and runners-up)');
T(HM && HM.tro[OC.champ.ci] && HM.tro[OC.champ.ci].oc >= 1 && HM.tro[CL.champ.ci].cl >= 1, 'trophy table counts cups');
const winU = Object.entries(OC.users).find(([ci]) => Number(ci) === OC.champ.ci);
if (winU) { const W = get('w11Clubs/' + winU[1].u); T((W.tro || []).some(x => x.k === 'oc' && x.p === 1), 'manager champion gets a trophy in club history'); } else console.log('(Open Cup won by a computer club this run)');
T(['uA', 'uB', 'uC', 'uD'].every(u => coins(u) >= balance[u]), 'managers earned coins in the cups');
// cards / fitness carried
T(Object.keys(get('w11Clubs/uA').cond || {}).length > 0, 'cup matches use fitness');
console.log('most outside calls in one 5-minute run:', FK.getMaxSub(), '(free plan limit 50)'); T(FK.getMaxSub() <= 45, 'stays under the free plan call limit');
console.log('cup runs:', runs, '· votes:', votes, '· cup matches with managers:', cupM.length);

// 4) tickets + sponsors paid with every match (worked out the same way as the worker)
const A5 = get('w11Clubs/uA'), xh = C.matchExtra(A5, S, true, 2, 1), xa = C.matchExtra(A5, S, false, 2, 1);
T(xh === C.STD_TICKET[1] + A5.sp.sh.pm + A5.sp.st.ph + A5.sp.bo.pw && xa === A5.sp.sh.pm + A5.sp.bo.pw, 'home match: tickets + 3 sponsors; away: shirt + bonus');
T(C.matchExtra({}, S, true, 0, 0) === C.STD_TICKET[0], 'no sponsors: level-1 tickets only');
T(C.matchExtra({ ...A5, sp: { ...A5.sp, s: 1 } }, S, false, 1, 0) === 0, "last season's sponsor pays nothing");

console.log(`\n${ok} passed, ${bad} failed`);
process.exit(bad ? 1 : 0);
