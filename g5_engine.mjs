// G5 engine check: many matches, real-football-like numbers, deterministic, quick. Run: bash build.sh && node tests/g5_engine.mjs [N]
import fs from 'node:fs';
const ROOT = new URL('..', import.meta.url).pathname;
globalThis.window = globalThis; globalThis.document = { getElementById: () => null, addEventListener() {}, head: { appendChild() {} }, body: { insertAdjacentHTML() {} }, querySelectorAll: () => [] };
new Function(fs.readFileSync(ROOT + 'dist/w11.js', 'utf8'))(); const W = window.W11, C = W.C;
let ok = 0, bad = 0; const T = (c, msg) => { if (c) ok++; else { bad++; console.log('❌', msg); } };
const N = +(process.argv[2] || 300), K = {}, add = (k, v) => { K[k] = (K[k] || 0) + v; };
const team = (ci, side) => { const c = C.club(ci); return { name: c.name, short: c.short, color: side ? '#ff2d95' : '#22d3ee', gkColor: side ? '#a3e635' : '#facc15', form: ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2'][ci % 5], ids: C.squadIds(ci), S: 1 }; };
const t0 = Date.now(); let wins = [0, 0, 0];
for (let i = 0; i < N; i++) {
  const a = (i * 37) % 600, b = (i * 53 + 11) % 600, m = W.simulate(team(a, 0), team(b, 1), 1000 + i, []);
  add('goals', m.T[0].score + m.T[1].score); add('shots', m.T[0].shots + m.T[1].shots); add('onT', m.T[0].onT + m.T[1].onT); add('corners', m.T[0].corners + m.T[1].corners); add('offs', m.T[0].offs + m.T[1].offs); add('fouls', m.T[0].fouls + m.T[1].fouls); add('cards', m.T[0].cards + m.T[1].cards);
  for (const e of m.ev) add('ev_' + e.k, 1); for (const e of m.ev) if (e.k === 'goal') add('how_' + (e.how || '-'), 1);
  add('reds', m.ev.filter(e => e.k === 'red').length); wins[m.T[0].score > m.T[1].score ? 0 : m.T[0].score < m.T[1].score ? 2 : 1]++;
  const st = C.strength ? 0 : 0;
}
const avg = (k) => +((K[k] || 0) / N).toFixed(2), ms = (Date.now() - t0) / N;
console.log(JSON.stringify({ N, msPerMatch: +ms.toFixed(1), goals: avg('goals'), shots: avg('shots'), onTarget: avg('onT'), corners: avg('corners'), offsides: avg('offs'), fouls: avg('fouls'), cards: avg('cards'), reds: avg('reds'), pens: avg('ev_pen'), fkDirect: avg('ev_fk'), adv: avg('ev_adv'), headers: avg('ev_header'), saves: avg('ev_save'), blocks: avg('ev_block'), slides: +(m => m)(0), homeDrawAway: wins.map(x => +(x / N).toFixed(2)) }));
console.log('goals by type:', Object.keys(K).filter(k => k.startsWith('how_')).map(k => k.slice(4) + ' ' + avg(k)).join(' · '));
console.log('events:', Object.keys(K).filter(k => k.startsWith('ev_')).map(k => k.slice(3) + ' ' + avg(k)).join(' · '));
T(avg('goals') >= 2.2 && avg('goals') <= 3.4, 'goals per match 2.2–3.4: ' + avg('goals'));
T(avg('corners') >= 3.3 && avg('corners') <= 13, 'corners 3.3–13: ' + avg('corners'));
T(avg('offs') >= 1 && avg('offs') <= 6, 'offsides 1–6: ' + avg('offs'));
T(avg('fouls') >= 8 && avg('fouls') <= 30, 'fouls 8–30: ' + avg('fouls'));
T(avg('cards') >= 2 && avg('cards') <= 6, 'cards 2–6: ' + avg('cards'));
T(avg('ev_pen') >= 0.12 && avg('ev_pen') <= 0.45, 'penalties 0.12–0.45: ' + avg('ev_pen'));
T(avg('ev_adv') >= 0.5, 'advantage is played: ' + avg('ev_adv'));
T(avg('ev_fk') >= 1, 'free kicks: ' + avg('ev_fk'));
T(avg('reds') <= 0.35, 'red cards rare: ' + avg('reds'));
T(ms < 60, 'fast enough: ' + ms.toFixed(1) + ' ms per match');
/* deterministic + replay with orders */
const A = W.simulate(team(5, 0), team(9, 1), 77, [{ tick: 900, side: 0, c: { shout: 'attack' } }, { tick: 1500, side: 1, c: { sub: [C.squadIds(9)[5], C.squadIds(9)[14]] } }]), B = W.simulate(team(5, 0), team(9, 1), 77, [{ tick: 900, side: 0, c: { shout: 'attack' } }, { tick: 1500, side: 1, c: { sub: [C.squadIds(9)[5], C.squadIds(9)[14]] } }]);
T(W.resultStr(A) === W.resultStr(B) && A.ev.length === B.ev.length, 'same seed + orders = same match');
T(A.minLabel && /\+\d'$/.test((() => { const m = W.simulate(team(5, 0), team(9, 1), 77, [], Math.round(104 / 0.05)); return m.minLabel(); })()), 'added time shown as 45+x');
const styles = {}; for (let ci = 0; ci < 60; ci++) for (const id of C.squadIds(ci)) { const s = W.styleOf(W.player(id, 1)); styles[s.shot] = (styles[s.shot] || 0) + 1; }
console.log('scoring styles:', JSON.stringify(styles)); T(['screamer', 'poacher', 'curler', 'dribbler'].every(k => styles[k] > 20), 'all four scoring styles exist');
console.log(`\n${ok} passed, ${bad} failed`); process.exit(bad ? 1 : 0);
