// G4 worker test: the first Open Cup in Season 1 (drawn from the groups as they are), every cup match with its own
// kick-off time (locks from the cup doc), GG Coins for cup prizes, crest/kit redesign for GG Coins, one-time GG Coin switch.
// Run: bash build.sh && node tests/g4_worker.mjs
import fs from 'node:fs';
import * as FK from './g2_fake.mjs';
const { ROOT, put, get, setNow, getNow, call, cron, DB } = FK;
const C = new Function(fs.readFileSync(ROOT + 'src/w11core.js', 'utf8') + '; return W11C;')();
let ok = 0, bad = 0; const T = (c, msg) => { if (c) ok++; else { bad++; console.log('❌', msg); } };
const S = 1, H = 3600000;
const club = (uid, ci, extra) => put('w11Clubs/' + uid, { uid, club: ci, name: 'Club ' + uid, short: 'C' + uid.slice(1), ids: C.squadIds(ci), form: '4-4-2', kits: [{ c1: '#22d3ee' }], coins: 1000000, gems: 10, g4: 1, energy: 10, med: 5, boot: [1, 2, 3, 4, 5], pioneer: false, pioneerNo: 0, ...(extra || {}) });
put('w11meta/season', { s: S, d6: 32, ph: '', cur: 0, plan: '' });
const seat = (uid, ci, t, g, pos, sl) => { const key = `w11g/${S}-${t}-${g}`, G = get(key) || { s: S, t, g, clubs: C.initClubs(t, g), users: {}, res: {} }, ai = G.clubs[pos];
  G.clubs[pos] = ci; G.users[pos] = { u: uid, c: ci, n: 'Club ' + uid, sh: 'C' + uid.slice(1), o: 99, sl, from: 1, ai }; put(key, G); club(uid, ci, { lg: { s: S, t, g, pos, sl }, sl }); };
seat('uA', 100001, 6, 0, 3, 0); seat('uB', 100002, 6, 1, 5, 3);
// 1) Season 1, day 1: the first cron draws the Open Cup. No Champions League this season.
setNow(C.dayStart(S, 1) + 10 * H); await cron();
let OC = get('w11c/1-oc');
T(OC && OC.k === 'oc' && OC.R === 10 && OC.b.length === 1024 && OC.b.filter(x => x >= 0).length === 434 + 32 * 14, 'Season 1 Open Cup drawn: every club, R = ' + (OC && OC.R));
T(OC && OC.b.includes(100001) && OC.users[100001].u === 'uA' && OC.users[100002].u === 'uB' && !OC.b.includes(C.initClubs(6, 0)[3]), 'managers already in keep their seats (their computer club is not drawn)');
T(!get('w11c/1-cl'), 'no Champions League in Season 1');
T(C.cupDays(OC).join() === '6,8,10,12,14,16,18,20,22,24', 'rounds on days 6…24');
T(C.cupOn(1, 'oc') && !C.cupOn(1, 'cl') && C.cupOn(2, 'cl') && C.isCupDay(1, 6) && !C.isCupDay(1, 7) && C.isCupDay(2, 7), 'Open Cup from Season 1, Champions League from Season 2');
await cron(); T(get('w11c/1-oc').at === OC.at, 'drawn only once');
// 2) a manager who joins after the draw takes over his computer club's cup place
club('uC', 100003, { coins: 250000 }); setNow(C.dayStart(S, 3) + 2 * H);
let r = await call('uC', '/w11/join', { sl: 2 }); const Cc = get('w11Clubs/uC'), aiC = (get(`w11g/${S}-6-${Cc.lg.g}`).users[Cc.lg.pos] || {}).ai;
OC = get('w11c/1-oc'); T(r.ok && OC.tk[aiC] === 100003 && OC.users[100003].u === 'uC', 'uC took over ' + aiC + "'s Open Cup place");
// 3) play the whole cup: managers' own matches are voted (home manager's phone and a second phone)
const seen = new Set(); let votes = 0;
const voteAll = async () => { for (const [k, d] of DB) { if (!k.startsWith('w11m/1-oc-')) continue; const M = d.data, id = k.slice(5);
  if (M.st !== 'locked' || getNow() < M.ko + C.MATCH_MS + 15000 || seen.has(id)) continue; seen.add(id);
  const rs = (M.hu ? '3-0' : '0-3') + '|;|;', who = [M.hu, M.au].filter(Boolean);
  for (const u of who) await call(u, '/w11/result', { mid: id, r: rs, ev: 2 });
  if (who.length < 2) { const j = await call('uV', '/w11/job', {}); if ((j.jobs || []).some(x => x.id === id)) await call('uV', '/w11/result', { mid: id, r: rs, ev: 2 }); }
  votes++; } };
const g0 = { uA: get('w11Clubs/uA').gems, uB: get('w11Clubs/uB').gems, uC: get('w11Clubs/uC').gems };
setNow(C.dayStart(S, 4)); let runs = 0;
for (; getNow() < C.dayStart(S, 26); runs++) { await cron(); await voteAll(); setNow(getNow() + 20 * 60000); if (get('w11c/1-oc').champ) break; }
OC = get('w11c/1-oc');
T(OC.dn === 10 && OC.champ && OC.ru, 'Season 1 Open Cup finished on day 24: champion ' + (OC.champ && OC.champ.n));
const cupM = [...DB.keys()].filter(k => k.startsWith('w11m/1-oc-')).map(k => [k.slice(5), get(k)]);
T(cupM.length >= 10 && cupM.every(([, M]) => M.st === 'final'), 'every cup match with a manager played and final: ' + cupM.length);
T(cupM.every(([id, M]) => M.ko === C.cupKoAt(S, M.md, id)), 'each cup match has its own kick-off time');
const mins = cupM.map(([, M]) => (M.ko - C.dayStart(S, M.md)) / 60000);
T(mins.every(x => x >= 375 && x <= 1425 && x % 15 === 0 && C.SLOTS.every(h => x <= h * 60 - 25 || x >= h * 60 + 15)), 'all between 06:15 and 23:45 GMT, never within 20 min of a league kick-off');
T(new Set(mins).size >= 5, 'kick-off times vary: ' + [...new Set(mins)].sort((a, b) => a - b).map(x => Math.floor(x / 60) + ':' + String(x % 60).padStart(2, '0')).join(' '));
T(mins.some(x => x < 360 + 6 * 60) && mins.some(x => x > 18 * 60), 'some cup matches before the 12:00 league match, some in the evening');
T(Object.keys(OC.kt || {}).length >= 5 && Object.keys(OC.lk || {}).length >= cupM.length / 2, 'cup doc lists kick-off times (kt) and which are locked (lk)');
T(cupM.every(([, M]) => M.s0 && M.s1 && M.s0.kf && M.s0.cr && M.s0.sd || !M.hu), 'team sheets carry full kits, crest and stadium (for 3D)');
const champU = Object.values(OC.users).find(u => C.seat(OC, OC.champ.ci) === Number(Object.keys(OC.users).find(k => OC.users[k] === u)));
const winner = ['uA', 'uB', 'uC'].find(u => get('w11Clubs/' + u).club === OC.champ.ci);
T(!!winner, 'a manager won (managers voted 3-0 wins): ' + winner);
if (winner) { const Wc = get('w11Clubs/' + winner); T(Wc.gems === g0[winner] + C.TOK.oc[0] && (Wc.tro || []).some(x => x.k === 'oc' && x.p === 1 && x.s === 1), 'Open Cup winner gets +' + C.TOK.oc[0] + ' 🪙 GG Coins and the trophy (' + Wc.gems + ')'); }
const ruU = ['uA', 'uB', 'uC'].find(u => get('w11Clubs/' + u).club === OC.ru.ci); if (ruU) T(get('w11Clubs/' + ruU).gems === g0[ruU] + C.TOK.oc[1], 'runner-up +' + C.TOK.oc[1] + ' 🪙');
T(get('w11hof/1') && get('w11hof/1').oc.ci === OC.champ.ci, 'Hall of Fame: Season 1 Open Cup winner');
console.log('most outside calls in one 5-minute run:', FK.getMaxSub(), '(free plan limit 50)'); T(FK.getMaxSub() <= 45, 'stays under the free plan call limit');
console.log('cup runs:', runs, '· votes:', votes, '· manager cup matches:', cupM.length, champU ? '' : '');
// 4) GG Coins become rare once; redesign costs GG Coins
club('uE', 100005, { gems: 50, g4: 0 }); club('uF', 100006, { gems: 150, pioneer: true, pioneerNo: 7, g4: 0 });
r = await call('uE', '/w11/g4', {}); T(r.ok && get('w11Clubs/uE').gems === C.TOK.start && get('w11Clubs/uE').g4 === 1, 'old club: GG Coins set to ' + C.TOK.start);
r = await call('uE', '/w11/g4', {}); T(r.ok && r.already && get('w11Clubs/uE').gems === C.TOK.start, 'only once');
r = await call('uF', '/w11/g4', {}); T(r.ok && get('w11Clubs/uF').gems === C.TOK.pio, 'Pioneer: ' + C.TOK.pio);
const crest = { shape: 'star', c1: '#d4af37', c2: '#800000', sym: '🦈', band: 'd', bc: '#ffffff', est: true, bd: '"><script>' };
const kits = [{ c1: '#800000', c2: '#d4af37', pat: 'chevron', col: '#ffffff', slv: '#d4af37', sho: 'bad', soc: '#800000' }, { c1: '#ffffff', c2: '#800000', pat: 'checker' }, { c1: '#0b1f4d', c2: '#7dd3fc', pat: 'nope' }];
r = await call('uE', '/w11/design', { crest, kits }); const E = get('w11Clubs/uE');
T(r.ok && E.gems === C.TOK.start - C.TOK.design && E.crest.shape === 'star' && E.crest.sym === '🦈' && E.crest.est === true && E.crest.bd === '#ffffff', 'redesign costs ' + C.TOK.design + ' 🪙; bad colours cleaned');
T(E.kits.length === 3 && E.kits[0].pat === 'chevron' && E.kits[0].sho === '#ffffff' && E.kits[2].pat === 'plain' && E.kits[1].sho === '#111827', 'kits cleaned (unknown pattern → plain, white shirt → dark shorts)');
r = await call('uE', '/w11/design', { crest, kits }); T(r.ok && get('w11Clubs/uE').gems === 0, 'second redesign');
r = await call('uE', '/w11/design', { crest, kits }); T(!r.ok && /GG Coins/.test(r.error) && get('w11Clubs/uE').gems === 0, 'no GG Coins → refused');
r = await call('uF', '/w11/design', { crest, kits: kits.slice(0, 2) }); T(!r.ok && get('w11Clubs/uF').gems === C.TOK.pio, 'bad design refused, nothing taken');
// 5) the shared core: kick-off times
T(C.CUP_TIMES.length > 50 && C.CUP_TIMES.every(x => C.SLOTS.every(h => x <= h * 60 - 25 || x >= h * 60 + 15)), 'cup time list: ' + C.CUP_TIMES.length + ' quarter hours');
console.log(`\n${ok} passed, ${bad} failed`);
process.exit(bad ? 1 : 0);
