// ---------- ⚙️ match engine v2 (G5: full rules, set pieces, player styles; fixed 20 steps per second, same seed = same match) ----------
const DT = 0.05, HALF = 105, BREAK = 30, LEN = HALF * 2, TOTAL = HALF * 2 + BREAK;
W.TIMING = { HALF, BREAK, LEN, TOTAL };
W.ENGINE = 2;
const BOX_X = 16.5, BOX_Y = 20.16;
/* 🎯 every player's style comes from his id and stats (the same on every phone, never stored) */
W.STYLE_NAME = { screamer: '💥 Long-range screamer', poacher: '🦊 Box poacher', curler: '🌀 Finesse curler', dribbler: '⚡ Dribbler-finisher', short: '🔁 Short passer', long: '🎯 Long passer', tempo: '🎼 Tempo controller', burst: '🚀 Explosive starter', engine: '🔋 Top-speed engine', steady: '🏃 Steady runner', power: 'power', curl: 'curl', knuckle: 'knuckle', place: 'placed', stutter: 'stutter run-up', chip: 'chip' };
W.styleOf = function (p) {
  if (!p) return {}; if (p._st) return p._st;
  const h = hash('sty:' + p.id), x = h % 10, y = (h >>> 4) % 10, pos = p.pos;
  const shot = pos === 'GK' ? '' : pos !== 'DEF' && p.dri >= p.sho + 7 && p.dri >= 62 && (h >>> 3) % 2 ? 'dribbler' : pos === 'FWD' ? (x < 5 ? 'poacher' : x < 8 ? 'curler' : 'screamer') : pos === 'MID' ? (x < 4 ? 'screamer' : x < 8 ? 'curler' : 'poacher') : (x < 5 ? 'screamer' : x < 8 ? 'curler' : 'poacher');
  const pass = pos === 'MID' ? (y < 4 ? 'tempo' : y < 7 ? 'long' : 'short') : pos === 'DEF' ? (y < 4 ? 'long' : 'short') : pos === 'GK' ? (y < 6 ? 'long' : 'short') : (y < 2 ? 'long' : y < 4 ? 'tempo' : 'short');
  const pace = p.pac >= 70 && (h >>> 8) % 2 ? 'burst' : (h >>> 9) % 3 === 0 ? 'engine' : 'steady';
  const fk = ['power', 'curl', 'knuckle'][(h >>> 12) % 3], z = (h >>> 14) % 10, pen = z < 4 ? 'place' : z < 7 ? 'power' : z < 9 ? 'stutter' : 'chip';
  const head = clamp(Math.round((pos === 'DEF' ? 70 : pos === 'FWD' ? 66 : pos === 'GK' ? 40 : 54) + ((h >>> 18) % 30) - 15 + ((p.ovr || 60) - 65) * 0.4), 25, 99);
  const st = { shot, pass, pace, fk, pen, head, lt: pos === 'DEF' && (h >>> 22) % 5 === 0, set: Math.round((p.sho || 50) * 0.5 + (p.pas || 50) * 0.5) };
  try { Object.defineProperty(p, '_st', { value: st, enumerable: false }); } catch (e) {}
  return st;
};
function Team(side, info) {
  this.side = side; this.name = info.name; this.short = info.short; this.color = info.color; this.gkColor = info.gkColor;
  this.form = info.form || '4-4-2'; this.ids = info.ids.slice(0, 18); this.subsLeft = 5; this.mods = { attack: 0, tight: 0, press: 0, calm: 0 };
  this.score = 0; this.shots = 0; this.onT = 0; this.passes = 0; this.poss = 0; this.cards = 0; this.corners = 0; this.offs = 0; this.fouls = 0;
  /* G2: fitness (0–100 per player), training points, who can't play, manager present or not · G5: set-piece takers */
  this.ai = info.ai; this.cond = info.cond || {}; this.tr = info.tr || {}; this.out = new Set(info.out || []); this.tk = info.tk || {};
  this.off = new Set(); this.used = new Set(); this.subLog = []; this.cardLog = [];
}
function Match(home, away, seed) {
  this.S = home.S || W.S; this.league = !!home.league;
  this.r = rng(seed); this.seed = seed; this.t = 0; this.tick = 0; this.ev = []; this.over = false; this.pauseT = 0;
  this.T = [new Team(0, home), new Team(1, away)]; this.P = []; this.ball = { x: 52.5, y: 34, h: 0, owner: null, fl: null, px: 52.5, py: 34 };
  this.lastAlert = 0; this.cmds = []; this.sp = null; this.pend = []; this.stops = [0, 0]; this.added = [0, 0]; this.hug = -1; this.ln = [105, 0];
  this.ref = { x: 45, y: 30 };
  this.T.forEach(t => this.layTeam(t));
  this.kickoff(0, true);
}
Match.prototype.dir = function (side) { return side === 0 ? 1 : -1; };
Match.prototype.goalX = function (side) { return side === 0 ? 105 : 0; };
Match.prototype.layTeam = function (t) {
  const sh = W.shape(t.form), old = this.P.filter(p => p.side === t.side);
  this.P = this.P.filter(p => p.side !== t.side);
  const tr = t.tr, at = Number(tr.att) || 0, df = Number(tr.def) || 0, ft = Number(tr.fit) || 0;
  t.ids.slice(0, 11).forEach((id, i) => {
    if (t.off.has(id)) return;
    const p0 = W.player(id, this.S), c = t.cond[id] == null ? 100 : clamp(Number(t.cond[id]) || 0, 0, 100), k = 0.8 + 0.2 * c / 100;
    const pl = { ...p0, pac: (p0.pac + 0.4 * ft) * k, sho: (p0.sho + 0.4 * at) * k, dri: (p0.dri + 0.4 * at) * k, pas: p0.pas * k, def: (p0.def + 0.4 * df) * k, gk: (p0.gk + (p0.pos === 'GK' ? 0.4 * df : 0)) * k, cond: c };
    const s = sh[i] || sh[sh.length - 1], prev = old.find(o => o.id === id), st = W.styleOf(p0);
    const bx = t.side === 0 ? s.x : 105 - s.x;
    this.P.push({ ...pl, st, side: t.side, role: i === 0 ? 'GK' : s.role, bx, by: t.side === 0 ? s.y : 68 - s.y, x: prev ? prev.x : bx, y: prev ? prev.y : (t.side === 0 ? s.y : 68 - s.y), px: 0, py: 0, vx: prev ? prev.vx : 0, vy: prev ? prev.vy : 0, cd: 0, ycard: prev ? prev.ycard : 0, ofs: -0.8, ofT: 0 });
  });
};
/* kick-off: instant at the start and after half time, otherwise the players walk back first */
Match.prototype.kickoff = function (side, first) {
  if (first) { this.P.forEach(p => { p.x = p.side === 0 ? Math.min(p.bx, 49) : Math.max(p.bx, 56); p.y = p.by; p.dribT = 0; p.vx = p.vy = 0; p.px = p.x; p.py = p.y; });
    const tk = this.koTaker(side); tk.x = 52.5 - this.dir(side) * 0.8; tk.y = 34; this.give(tk); this.ball.x = 52.5; this.ball.y = 34; this.ball.fl = null; this.dec = 0.6; return; }
  this.restart('ko', side, 52.5, 34);
};
Match.prototype.koTaker = function (side) { return this.P.filter(p => p.side === side && p.role !== 'GK').sort((a, b) => Math.abs(a.x - 52.5) + Math.abs(a.y - 34) - (Math.abs(b.x - 52.5) + Math.abs(b.y - 34)))[0]; };
Match.prototype.give = function (p) { if (!p) return; this.ball.owner = p; this.ball.fl = null; this.poss = p.side; p.cd = 0.35; this.dec = 0.3 + this.r() * 0.5; };
Match.prototype.say = function (k, txt, side, pid, x) { const e = { t: this.t, k, txt, side, min: this.minute(), pid }; if (x) Object.assign(e, x); this.ev.push(e); return e; };
/* the clock: 45 minutes per half, then added time (the last 8% of each half), announced like on TV */
Match.prototype.minute = function () { const h = this.t >= HALF ? 1 : 0, th = this.t - h * HALF, base = h * 45; return Math.min(base + 45, base + Math.floor(th / (HALF * 0.92) * 45) + 1); };
Match.prototype.minLabel = function () { const h = this.t >= HALF ? 1 : 0, th = this.t - h * HALF, base = h * 45, n = 45 * 0.92;
  if (th < HALF * 0.92) return (base + Math.floor(th / (HALF * 0.92) * 45) + 1) + "'"; const a = this.added[h] || 1; return (base + 45) + '+' + Math.min(a, Math.floor((th - HALF * 0.92) / (HALF * 0.08) * a) + 1) + "'"; };
W.minLabel = (m) => m && m.minLabel ? m.minLabel() : (m ? m.minute() + "'" : '');
Match.prototype.cmd = function (side, c) { this.cmds.push({ tick: this.tick, side, c }); this.applyCmd(side, c); };
Match.prototype.applyCmd = function (side, c) {
  const t = this.T[side];
  if (c.here) t.ai = false;
  if (c.shout) { t.mods = { attack: 0, tight: 0, press: 0, calm: 0 }; if (c.shout !== 'none') t.mods[c.shout] = 1; this.say('shout', { attack: '📣 ALL OUT ATTACK!', tight: '🧱 KEEP IT TIGHT!', press: '⚡ PRESS HIGH!', calm: '🧘 CALM DOWN, KEEP THE BALL!' }[c.shout] || '', side); }
  if (c.form && W.FORMS[c.form]) { t.form = c.form; this.layTeam(t); this.say('form', '📐 ' + t.short + ' switch to ' + c.form, side); }
  if (c.sub && t.subsLeft > 0) { const [o, n] = c.sub; const i = t.ids.indexOf(o), j = t.ids.indexOf(n); if (i >= 0 && i < 11 && j >= 11 && !t.off.has(o) && !t.used.has(n) && !t.out.has(n)) { t.used.add(o); t.subLog.push([o, n, this.tick]); const own = this.ball.owner && this.ball.owner.id === o, wasTk = this.sp && this.sp.taker && this.sp.taker.id === o; t.ids[i] = n; t.ids[j] = o; t.subsLeft--; this.layTeam(t); const np = this.P.find(p => p.id === n); if (own && np) this.give(np); if (wasTk && np) this.sp.taker = np; this.stops[this.t >= HALF ? 1 : 0]++; this.say('sub', `🔁 ${W.player(n).short} on for ${W.player(o).short}`, side); } }
};
Match.prototype.nearest = function (list, x, y) { let b = null, bd = 1e9; for (const p of list) { const d = sq(p.x - x) + sq(p.y - y); if (d < bd) { bd = d; b = p; } } return b; };
const inBoxOf = (gx, x, y) => Math.abs(gx - x) < BOX_X && Math.abs(y - 34) < BOX_Y;
Match.prototype.step = function () {
  const r = this.r, b = this.ball;
  if (this.over) return;
  b.px = b.x; b.py = b.y;
  this.t += DT; this.tick++;
  const half = this.t >= HALF ? 1 : 0, th = this.t - half * HALF;
  if (th >= HALF * 0.92 && !this.added[half]) { this.added[half] = clamp(1 + Math.round(this.stops[half] / 7), 1, 6); this.say('added', `⏱️ +${this.added[half]} minute${this.added[half] > 1 ? 's' : ''} added`); }
  if (this.t >= LEN - 1e-9) { this.over = true; this.say('ft', `🏁 Full time: ${this.T[0].short} ${this.T[0].score}–${this.T[1].score} ${this.T[1].short}`); return; }
  if (this.t >= HALF && !this.ht) { this.ht = true; this.pauseT = 0; this._after = null; this.sp = null; this.hug = -1; this.flushCards(); this.say('ht', `⏸️ Half time: ${this.T[0].short} ${this.T[0].score}–${this.T[1].score} ${this.T[1].short}`); this.kickoff(1, true); return; }
  this.lines(); this.moveRef();
  if (this.pauseT > 0) { this.pauseT -= DT; if (this.pauseT <= 0 && this._after) { const f = this._after; this._after = null; f(); } this.moveAll(this.sp || this.hug >= 0 ? 'setup' : 'frozen'); return; }
  if (this.t - this.lastAlert >= 30) { this.lastAlert = this.t; this.say('alert', '📢 Touchline moment!'); this.aiShout(1); if (this.league) this.aiShout(0); }
  if (this.pend.length && this.t - this.pend[0][2] > 6) this.flushCards();
  if (this.poss != null) this.T[this.poss].poss += DT;
  this.P.forEach(p => { if (p.cd > 0) p.cd -= DT; });
  if (b.fl) {
    const f = b.fl; f.k += DT / f.dur; const k = Math.min(1, f.k);
    b.x = f.x0 + (f.x1 - f.x0) * k; b.y = f.y0 + (f.y1 - f.y0) * k + (f.curve || 0) * Math.sin(Math.PI * k); b.h = f.arc * 4 * k * (1 - k);
    if (k >= 1) this.land();
  } else if (b.owner) {
    const o = b.owner, d = this.dir(o.side); b.x = o.x + d * 0.9; b.y = o.y; b.h = 0;
    this.carrier(o);
  } else {
    const p = this.nearest(this.P, b.x, b.y); if (p && sq(p.x - b.x) + sq(p.y - b.y) < 1.7) this.give(p);
    if (b.x < -0.5 || b.x > 105.5 || b.y < -0.5 || b.y > 68.5) this.outOfPlay(this.lastTouch || 0);
  }
  this.moveAll('play');
};
/* offside lines: the second-last defender (or the ball, or halfway) */
Match.prototype.lines = function () {
  for (let s = 0; s < 2; s++) { const d = this.dir(s), xs = this.P.filter(p => p.side !== s).map(p => p.x).sort((a, c) => d > 0 ? c - a : a - c), sl = xs.length > 1 ? xs[1] : (d > 0 ? 105 : 0);
    this.ln[s] = d > 0 ? Math.max(sl, this.ball.x, 52.5) : Math.min(sl, this.ball.x, 52.5); }
};
Match.prototype.isOff = function (p) { return this.dir(p.side) * (p.x - this.ln[p.side]) > 0.35; };
/* the referee follows play (drawing only, never changes the match) */
Match.prototype.moveRef = function () { const b = this.ball, R = this.ref, tx = clamp(b.x - 9, 6, 99), ty = clamp(b.y + (b.y < 34 ? 11 : -11), 6, 62), dx = tx - R.x, dy = ty - R.y, d = hyp(dx, dy); R.px = R.x; R.py = R.y; if (d > 0.3) { const st = Math.min(d, 7.2 * DT); R.x += dx / d * st; R.y += dy / d * st; } };
Match.prototype.aiShout = function (side) {
  const t = this.T[side], o = this.T[1 - side], m = this.minute(), r = this.r;
  if (t.ai === false) return;
  let s = 'none'; if (t.score < o.score && m > 55) s = 'attack'; else if (t.score > o.score && m > 65) s = 'tight'; else if (r() < 0.3) s = pick(r, ['press', 'calm', 'none']);
  const cur = Object.keys(t.mods).find(k => t.mods[k]) || 'none'; if (s !== cur) this.applyCmd(side, { shout: s });
};
Match.prototype.carrier = function (o) {
  const r = this.r, d = this.dir(o.side), gx = this.goalX(o.side), T = this.T[o.side], mods = T.mods, st = o.st || {};
  const opp = this.P.filter(p => p.side !== o.side), mates = this.P.filter(p => p.side === o.side && p !== o);
  /* duels: standing tackles, slide tackles, shoulder battles */
  const presser = this.nearest(opp, o.x, o.y), pd = presser ? hyp(presser.x - o.x, presser.y - o.y) : 99;
  if (presser && pd < 1.6 && o.cd <= 0 && r() < 0.11 * (1 + this.T[presser.side].mods.press * 0.5)) {
    const behind = this.dir(presser.side) * (presser.x - o.x) > 0.3, slide = behind || r() < 0.22;
    const win = 0.42 + (presser.def - o.dri) / 160 + this.T[presser.side].mods.tight * 0.05 - (st.shot === 'dribbler' ? 0.08 : 0) + (slide ? 0.06 : 0);
    if (r() < (slide ? 0.28 : 0.16) * (inBoxOf(this.goalX(o.side), o.x, o.y) ? 0.3 : 1)) { this.foul(presser, o, slide); return; }
    if (r() < win) { if (Math.abs(this.goalX(o.side) - o.x) < 30 && r() < 0.2) { this.say('tackle', `🦵 ${presser.short} pokes it out`, presser.side, presser.id, { sl: slide ? 1 : 0, on: o.id }); this.lastTouch = presser.side; this.ball.owner = null; const gl = Math.abs(this.goalX(o.side) - o.x) < 14 && r() < 0.6; if (gl) { this.T[o.side].corners++; return this.restart('corner', o.side, this.goalX(o.side), o.y < 34 ? 0 : 68); } return this.restart('throw', o.side, clamp(o.x, 1, 104), o.y < 34 ? 0 : 68); }
      this.say('tackle', `${slide ? '🛷 Slide tackle' : '🦵 Tackle'}: ${presser.short} wins it`, presser.side, presser.id, { sl: slide ? 1 : 0, on: o.id }); this.ball.owner = null; this.ball.x += (r() - 0.5) * 2; this.give(presser); return; }
    o.beat = this.t; if (st.shot === 'dribbler' && r() < 0.3) this.say('skill', `🌀 ${o.short} skips past ${presser.short}`, o.side, o.id);
    o.cd = 0.5;
  }
  this.dec -= DT; if (this.dec > 0) return;
  this.dec = (0.45 + r() * 0.7) * (1 + mods.calm * 0.35) * (1 - mods.attack * 0.2) * (st.pass === 'tempo' ? 0.8 : 1);
  if (o.role === 'GK') { this.passTo(o, this.bestPass(o, mates, opp, true)); return; }
  const dg = hyp(gx - o.x, 34 - o.y);
  /* shoot? each scoring style has its own range */
  const range = st.shot === 'screamer' ? 33 : st.shot === 'poacher' ? 21 : st.shot === 'curler' ? 28 : 25;
  if (dg < range && Math.abs(o.y - 34) < 21) {
    let want = 0.16 + (range - dg) / (range + 1) + mods.attack * 0.12 - mods.calm * 0.06; if (st.shot === 'poacher' && dg > 13) want *= 0.45; if (st.shot === 'dribbler' && o.beat && this.t - o.beat < 2.5) want += 0.25;
    if (r() < want) { this.shoot(o, dg); return; }
  }
  const space = pd > 4, room = Math.abs(gx - o.x) > 6;
  const dribW = (space ? 0.5 : 0.12) + (o.dri - 60) / 160 + mods.attack * 0.1 - mods.calm * 0.12 + (o.role === 'FWD' ? 0.12 : o.role === 'DEF' ? -0.15 : 0) + (st.shot === 'dribbler' ? 0.15 : 0);
  if (room && r() < dribW) { o.dribT = 0.5 + r() * 0.7; this.dec = o.dribT; return; }
  /* a cross from the wing into the box */
  if (Math.abs(gx - o.x) < 30 && Math.abs(o.y - 34) > 11 && r() < 0.5 + (o.pas - 60) / 200) { if (this.cross(o)) return; }
  const tgt = this.bestPass(o, mates, opp, false); if (tgt) this.passTo(o, tgt); else { o.dribT = 0.6; this.dec = 0.6; }
};
Match.prototype.bestPass = function (o, mates, opp, safe, maxD) {
  const r = this.r, d = this.dir(o.side), st = o.st || {}, far = maxD || (st.pass === 'short' ? 30 : st.pass === 'long' ? 50 : 42); let best = null, bs = -1e9;
  for (const m of mates) {
    const dist = hyp(m.x - o.x, m.y - o.y); if (dist < 5 || dist > far) continue;
    const gain = d * (m.x - o.x), open = Math.min(10, Math.min(...opp.map(p => hyp(p.x - m.x, p.y - m.y)))), risk = this.lineRisk(o, m, opp);
    let sc = (safe ? 0.03 : 0.14 + this.T[o.side].mods.attack * 0.05) * gain + open * 0.12 - risk * (0.9 + this.T[o.side].mods.calm * 0.6) - dist * 0.01 + r() * 0.7 + (m.role === 'GK' ? -4 : 0) + (gain < -3 && !safe ? -1.2 : 0);
    if (st.pass === 'long' && dist > 28) sc += 0.6 + Math.abs(m.y - o.y) * 0.02; if (st.pass === 'tempo' && gain > 3 && dist < 25) sc += 0.4;
    if (this.isOff(m)) sc -= 0.1 + o.pas / 260;
    if (sc > bs) { bs = sc; best = m; }
  }
  return best;
};
Match.prototype.lineRisk = function (a, b, opp) {
  let risk = 0; const dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy || 1;
  for (const p of opp) { const k = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / L2, 0, 1); const ex = a.x + dx * k - p.x, ey = a.y + dy * k - p.y, dd = Math.sqrt(ex * ex + ey * ey); if (k > 0.1 && k < 0.95 && dd < 3) risk += (3 - dd) / 3; }
  return risk;
};
Match.prototype.passTo = function (o, m, kind) {
  if (!m) return; const r = this.r, T = this.T[o.side], opp = this.P.filter(p => p.side !== o.side);
  const lead = 0.5, tx = clamp(m.x + this.dir(o.side) * 2.2 * lead, 1, 104), ty = clamp(m.y, 2, 66), dist = hyp(tx - o.x, ty - o.y);
  T.passes++; this.lastTouch = o.side;
  const b = this.ball, off = kind !== 'throw' && this.isOff(m) ? m : null; b.owner = null;
  let cut = null; const dx = tx - o.x, dy = ty - o.y, L2 = dx * dx + dy * dy || 1;
  for (const p of opp) { const k = ((p.x - o.x) * dx + (p.y - o.y) * dy) / L2; if (k < 0.15 || k > 0.92) continue; const ex = o.x + dx * k - p.x, ey = o.y + dy * k - p.y; if (ex * ex + ey * ey < 5 && r() < 0.16 + (p.def - o.pas) / 260 + this.T[p.side].mods.press * 0.04) { cut = { p, k }; break; } }
  const miss = !cut && r() < 0.05 + (75 - o.pas) / 600 - T.mods.calm * 0.02;
  const ex = miss ? tx + (r() - 0.5) * 12 : cut ? o.x + dx * cut.k : tx, ey = miss ? clamp(ty + (r() - 0.5) * 12, -1, 69) : cut ? o.y + dy * cut.k : ty;
  b.fl = { x0: o.x, y0: o.y, x1: ex, y1: ey, k: 0, dur: Math.max(0.35, hyp(ex - o.x, ey - o.y) / (dist > 28 ? 24 : 30)), arc: kind === 'throw' ? 1.1 : dist > 28 ? 2.2 : 0.3, to: cut ? cut.p : miss ? null : m, from: o, kind: kind || 'pass', off: cut || miss ? null : off, aer: dist > 30 };
};
/* 🎯 crosses (open play, corners, wide free kicks, long throws): an aerial duel in the box */
Match.prototype.cross = function (o, kind, spot) {
  const r = this.r, d = this.dir(o.side), gx = this.goalX(o.side), att = this.P.filter(p => p.side === o.side && p !== o && p.role !== 'GK' && inBoxOf(gx, p.x, p.y));
  if (!att.length) return false;
  let tot = 0; att.forEach(p => { tot += sq(p.st.head || 50); }); let x = r() * tot, tgt = att[0]; for (const p of att) { x -= sq(p.st.head || 50); if (x <= 0) { tgt = p; break; } }
  const near = spot === 'near', tx = clamp(tgt.x + d * (near ? 1.5 : 0.5), 1, 104), ty = clamp(tgt.y + (r() - 0.5) * 2.5, 6, 62);
  this.lastTouch = o.side; this.ball.owner = null; this.T[o.side].passes++;
  const curve = (kind === 'corner' ? (o.st.fk === 'curl' ? 1 : 0.6) : 0.4) * (o.y < 34 ? 1 : -1) * (r() < 0.5 ? 1 : -1) * 1.6;
  this.ball.fl = { x0: o.x, y0: o.y, x1: tx, y1: ty, k: 0, dur: Math.max(0.7, hyp(tx - o.x, ty - o.y) / 25), arc: 3.2, kind: 'cross', from: o, tgt, curve, ck: kind };
  return true;
};
Match.prototype.aerial = function (f) {
  const r = this.r, b = this.ball, o = f.from, gx = this.goalX(o.side), dside = 1 - o.side, gk = this.P.find(p => p.side === dside && p.role === 'GK');
  const tgt = f.tgt && this.P.includes(f.tgt) ? f.tgt : this.nearest(this.P.filter(p => p.side === o.side && p !== o), b.x, b.y);
  const def = this.nearest(this.P.filter(p => p.side === dside && p.role !== 'GK'), b.x, b.y);
  if (gk && Math.abs(gx - b.x) < 6.5 && Math.abs(b.y - 34) < 10 && r() < 0.3 * (gk.gk / 75)) { this.say('save', `🧤 ${gk.short} claims the cross`, dside, gk.id, { catch: 1 }); this.pauseT = 0.8; this._after = () => this.give(gk); return; }
  const ah = tgt ? (tgt.st.head || 50) + (tgt.ovr || 60) * 0.3 : 0, dh = def ? ((def.st.head || 50) + def.def * 0.4) * 1.12 : 0;
  if (tgt && (!def || r() < ah / (ah + dh))) {
    this.say('header', `🗣️ ${tgt.short} rises highest`, o.side, tgt.id);
    if (inBoxOf(gx, tgt.x, tgt.y) && Math.abs(gx - tgt.x) < 13) { this.shoot(tgt, hyp(gx - tgt.x, 34 - tgt.y), { header: 1 }); return; }
    this.give(tgt); return;
  }
  if (def) { this.say('clear', `🧱 ${def.short} heads it clear`, dside, def.id, { header: 1 }); this.lastTouch = dside;
    if (r() < 0.38) { this.T[o.side].corners++; return this.restart('corner', o.side, gx, b.y < 34 ? 0 : 68); }
    const ex = clamp(b.x - this.dir(o.side) * (14 + r() * 16), 3, 102), ey = clamp(b.y + (r() - 0.5) * 30, 3, 65); b.fl = { x0: b.x, y0: b.y, x1: ex, y1: ey, k: 0, dur: 1.1, arc: 2.6, kind: 'pass', from: def, to: null, aer: true }; return; }
  b.owner = null;
};
Match.prototype.shoot = function (o, dg, x) {
  x = x || {}; const r = this.r, T = this.T[o.side], gx = this.goalX(o.side), gk = this.P.find(p => p.side !== o.side && p.role === 'GK'), st = o.st || {};
  T.shots++; this.lastTouch = o.side;
  /* a defender in the way can block it */
  if (!x.pen && !x.fk) { const opp = this.P.filter(p => p.side !== o.side && p.role !== 'GK'), bl = opp.find(p => { const k = (p.x - o.x) / (gx - o.x); if (k < 0.08 || k > 0.6) return false; const ly = o.y + (34 - o.y) * k; return Math.abs(p.y - ly) < 1.3; });
    if (bl && r() < 0.28) { this.say('block', `🛡️ ${bl.short} blocks ${o.short}'s shot`, bl.side, bl.id); this.ball.owner = null; this.lastTouch = bl.side;
      if (r() < 0.55) { T.corners++; this.restart('corner', o.side, gx, o.y < 34 ? 0 : 68); return; } this.ball.x = bl.x - this.dir(o.side) * 2; this.ball.y = clamp(bl.y + (r() - 0.5) * 6, 2, 66); return; } }
  let q = clamp(0.07 + (o.sho / 100) * 0.42 * (1 - dg / 36) - (gk ? gk.gk / 100 : 0.6) * 0.16 + T.mods.attack * 0.03 + (r() - 0.5) * 0.05, 0.02, 0.55);
  if (st.shot === 'screamer' && dg > 20) q += 0.035; if (st.shot === 'poacher') q += dg < 11 ? 0.06 : -0.04; if (st.shot === 'curler' && dg > 13 && dg < 25 && Math.abs(o.y - 34) > 4) q += 0.045; if (st.shot === 'dribbler' && o.beat && this.t - o.beat < 2.5) q += 0.04;
  if (x.header) q = clamp(0.15 + ((st.head || 50) - 50) / 220 - (gk ? gk.gk / 100 : 0.6) * 0.05, 0.04, 0.3);
  if (x.q != null) q = x.q;
  const onT = x.onT != null ? x.onT : r() < (x.header ? 0.42 : 0.38 + o.sho / 260), goal = x.goal != null ? x.goal : onT && r() < q / 0.45;
  if (onT) T.onT++;
  const ty = goal ? 34 + (r() - 0.5) * 6.4 : onT ? 34 + (r() - 0.5) * 5 : 34 + (r() < 0.5 ? -1 : 1) * (4.5 + r() * 6);
  const curve = st.shot === 'curler' && !x.header ? (o.y < 34 ? -1 : 1) * 1.4 : x.fk && o.st.fk === 'curl' ? (o.y < 34 ? -1 : 1) * 2.2 : 0;
  this.ball.owner = null;
  this.ball.fl = { x0: o.x, y0: o.y, x1: gx + this.dir(o.side) * (goal ? 1.2 : 0.2), y1: ty - curve * 0.0, k: 0, dur: Math.max(0.3, dg / (st.shot === 'screamer' || x.pen ? 42 : 36)), arc: x.fk ? 2.4 : x.header ? 0.9 : dg > 18 ? 1.4 : 0.6, kind: 'shot', goal, onT, from: o, gk, curve, pen: x.pen ? 1 : 0, fk: x.fk ? 1 : 0, header: x.header ? 1 : 0, wide: !onT };
};
Match.prototype.land = function () {
  const b = this.ball, f = b.fl, r = this.r; b.fl = null;
  if (f.kind === 'shot') {
    const sh = f.from, T = this.T[sh.side], gx = this.goalX(sh.side);
    if (f.goal) { T.score++; const e = this.say('goal', `⚽ GOAL! ${sh.name} (${T.short}) ${this.T[0].score}–${this.T[1].score}`, sh.side, undefined, { how: f.pen ? 'pen' : f.fk ? 'fk' : f.header ? 'header' : (sh.st || {}).shot || '' }); void e;
      this.stops[this.t >= HALF ? 1 : 0]++; this.hug = sh.side; this.hugBy = sh; this.pauseT = 2.6; this._after = () => { this.hug = -1; this.kickoff(1 - sh.side); }; return; }
    if (f.onT && f.gk && this.P.includes(f.gk)) {
      const hold = r() < 0.5 + (f.gk.gk - 60) / 200 - (sh.st && sh.st.fk === 'knuckle' && f.fk ? 0.2 : 0) - (f.pen ? 0.25 : 0);
      this.say('save', `🧤 ${hold ? 'Great save' : 'Save'} by ${f.gk.short}!`, f.gk.side, f.gk.id, { catch: hold ? 1 : 0 });
      if (hold) { this.pauseT = 0.8; this._after = () => { this.give(f.gk); }; return; }
      this.lastTouch = f.gk.side;
      if (r() < 0.55) { T.corners++; this.restart('corner', sh.side, gx, b.y < 34 ? 0 : 68); return; }
      b.x = f.gk.x + this.dir(f.gk.side) * 5; b.y = clamp(f.gk.y + (r() - 0.5) * 14, 4, 64); b.owner = null; return;
    }
    if (!f.pen && !f.fk && r() < 0.3) { const dfn = this.nearest(this.P.filter(p => p.side !== sh.side && p.role !== 'GK'), b.x, b.y); this.say('miss', `💨 ${sh.short}'s shot deflects wide`, sh.side, sh.id, { near: 1 }); this.lastTouch = 1 - sh.side; T.corners++; return this.restart('corner', sh.side, gx, f.y1 < 34 ? 0 : 68); }
    this.say('miss', f.pen ? `😱 ${sh.short} misses the penalty!` : `💨 ${sh.short} ${f.fk || f.header ? 'puts it over' : 'shoots wide'}`, sh.side, sh.id, { near: Math.abs(f.y1 - 34) < 5.2 ? 1 : 0 });
    this.restart('gk', 1 - sh.side, gx, 34); return;
  }
  if (f.kind === 'cross') return this.aerial(f);
  if (b.y < 0 || b.y > 68 || b.x < 0 || b.x > 105) return this.outOfPlay(f.from ? f.from.side : this.lastTouch || 0);
  if (f.off && f.to === f.off && this.P.includes(f.off)) { const p = f.off; this.T[p.side].offs++; this.say('off', `🚩 Offside: ${p.short}`, p.side, p.id); return this.restart('ifk', 1 - p.side, p.x, p.y); }
  if (f.to && this.P.includes(f.to)) {
    const tp = f.to;
    if (f.aer) { const opp = this.nearest(this.P.filter(p => p.side !== tp.side && p.role !== 'GK'), b.x, b.y); if (opp && sq(opp.x - b.x) + sq(opp.y - b.y) < 6 && r() < ((opp.st.head || 50) + opp.def * 0.3) / ((opp.st.head || 50) + opp.def * 0.3 + (tp.st.head || 50) + tp.ovr * 0.3)) { this.say('duel', `💪 ${opp.short} wins the header`, opp.side, opp.id, { header: 1 }); this.give(opp); return; } }
    if (tp.side !== f.from.side) this.say('int', `✂️ ${tp.short} cuts it out`, tp.side); this.give(tp); return;
  }
  b.owner = null;
};
/* the ball crossed a line: throw-in, goal kick or corner */
Match.prototype.outOfPlay = function (lastSide) {
  const b = this.ball, x = clamp(b.x, 0, 105), y = clamp(b.y, 0, 68); b.owner = null; b.fl = null;
  if (b.y < 0 || b.y > 68) return this.restart('throw', 1 - lastSide, clamp(x, 1, 104), b.y < 0 ? 0 : 68);
  const defSide = x <= 0.5 ? 0 : 1;
  if (lastSide !== defSide) return this.restart('gk', defSide, x <= 0.5 ? 0 : 105, 34);
  this.T[1 - defSide].corners++; return this.restart('corner', 1 - defSide, x <= 0.5 ? 0 : 105, y < 34 ? 0 : 68);
};
/* fouls: free kick, penalty, advantage, cards (shown at the next stop when advantage is played) */
Match.prototype.foul = function (by, on, slide) {
  const r = this.r, gx = this.goalX(on.side), inBox = inBoxOf(gx, on.x, on.y), dg = hyp(gx - on.x, 34 - on.y);
  this.T[by.side].fouls++;
  const others = this.P.filter(p => p.side === by.side && p !== by && p.role !== 'GK' && this.dir(on.side) * (p.x - on.x) > 0), lastMan = dg < 32 && !others.length;
  let card = null; if (lastMan && r() < 0.45) card = 'r'; else if (r() < (slide ? 0.3 : 0.17)) card = 'y'; else if (r() < 0.012) card = 'r';
  if (!inBox && !lastMan && this.dir(on.side) * (on.x - 52.5) > 0 && dg > 22 && r() < 0.45) {
    this.say('adv', `▶️ Advantage! (foul by ${by.short})`, on.side, by.id); if (card) this.pend.push([by, card, this.t]); on.cd = 0.5; this.stops[this.t >= HALF ? 1 : 0]++; return;
  }
  this.say('foul', `⚠️ Foul by ${by.short} on ${on.short}${slide ? ' (slide tackle)' : ''}`, by.side, by.id, { sl: slide ? 1 : 0, on: on.id });
  if (card) this.card(by, card, lastMan);
  if (inBox) return this.restart('pen', on.side, gx - this.dir(on.side) * 11, 34);
  return this.restart(dg < 30 && Math.abs(on.y - 34) < 22 ? 'fkd' : 'fk', on.side, on.x, on.y);
};
Match.prototype.card = function (by, k, lastMan) {
  if (!this.P.includes(by)) return; const CL = this.T[by.side].cardLog;
  if (k === 'y') { by.ycard++; this.T[by.side].cards++; if (by.ycard >= 2) { CL.push([by.id, 'r']); this.say('red', `🟥 ${by.short} is sent off (2nd yellow)!`, by.side, by.id); this.sendOff(by); } else { CL.push([by.id, 'y']); this.say('yellow', `🟨 Yellow card: ${by.name}`, by.side, by.id); } }
  else { this.T[by.side].cards++; CL.push([by.id, 'r']); this.say('red', `🟥 Straight red: ${by.name}${lastMan ? ' (last man)' : ''}!`, by.side, by.id); this.sendOff(by); }
};
Match.prototype.flushCards = function () { const L = this.pend; this.pend = []; for (const [by, k] of L) this.card(by, k); };
Match.prototype.sendOff = function (p) { this.T[p.side].off.add(p.id); this.P = this.P.filter(x => x !== p); if (this.ball.owner === p) this.ball.owner = null; if (this.sp && this.sp.taker === p) this.sp.taker = null; };
/* ---------- 🚩 restarts: the players walk into position, then the taker plays it ---------- */
Match.prototype.taker = function (side, kind) {
  const L = this.P.filter(p => p.side === side && p.role !== 'GK'), want = this.T[side].tk[kind === 'fkd' ? 'fk' : kind === 'corner' ? 'ck' : kind];
  const chosen = want && L.find(p => p.id === want); if (chosen) return chosen;
  const sc = (p) => kind === 'pen' ? p.sho + (p.ovr || 60) * 0.3 : kind === 'corner' ? p.pas + (p.st.fk === 'curl' ? 6 : 0) : p.st.set;
  return L.slice().sort((a, b) => sc(b) - sc(a))[0];
};
Match.prototype.restart = function (kind, side, x, y) {
  const r = this.r, b = this.ball, d = this.dir(side), gx = this.goalX(side), half = this.t >= HALF ? 1 : 0; this.flushCards();
  b.owner = null; b.fl = null; b.x = x; b.y = y; b.h = 0; this.poss = side; this.stops[half]++;
  const mates = this.P.filter(p => p.side === side), opp = this.P.filter(p => p.side !== side), T = this.T[side], sp = { kind, side, x, y, pos: new Map(), t0: this.t };
  const set = (p, px, py) => { if (p) sp.pos.set(p, [clamp(px, 0.5, 104.5), clamp(py, 0.5, 67.5)]); };
  let setup = 1.2;
  if (kind === 'ko') { sp.taker = this.koTaker(side); this.P.forEach(p => set(p, p.side === 0 ? Math.min(p.bx, 49) : Math.max(p.bx, 56), p.by)); set(sp.taker, 52.5 - d * 0.8, 34); setup = 1.6; }
  else if (kind === 'gk') { sp.taker = mates.find(p => p.role === 'GK') || mates[0]; const gy = 34 + (r() < 0.5 ? -1 : 1) * 4; b.x = side === 0 ? 5.5 : 99.5; b.y = gy; sp.x = b.x; sp.y = gy; set(sp.taker, b.x - d * 1.2, gy); setup = 1.3; }
  else if (kind === 'throw') { sp.taker = this.nearest(mates.filter(p => p.role !== 'GK'), x, y); const inn = y === 0 ? 1 : -1; set(sp.taker, x, y - inn * 0.3); const near = mates.filter(p => p !== sp.taker && p.role !== 'GK').sort((a, c) => sq(a.x - x) + sq(a.y - y) - sq(c.x - x) - sq(c.y - y)).slice(0, 2); if (near[0]) set(near[0], x + d * 7, y + inn * 6); if (near[1]) set(near[1], x - d * 5, y + inn * 9); setup = 1.0; }
  else if (kind === 'corner') {
    sp.taker = this.taker(side, 'corner'); const cy = y, s = cy === 0 ? 1 : -1; set(sp.taker, x + (x === 0 ? -0.4 : 0.4), cy - s * 0.4);
    const att = mates.filter(p => p !== sp.taker && p.role !== 'GK').sort((a, c) => (c.st.head || 50) - (a.st.head || 50)), spots = [[4.5, 30.5], [6, 37.5], [10.5, 34], [8, 26.5], [12.5, 40.5]], marks = [];
    att.forEach((p, i) => { if (i < 5) { const sx = gx - d * spots[i][0], sy = spots[i][1] + (r() - 0.5) * 2; set(p, sx, sy); marks.push([sx, sy]); } else if (i === 5) set(p, gx - d * 20, 34 + (r() - 0.5) * 8); else if (i === 6) set(p, x - d * 6, cy + s * 9); });
    const df = opp.filter(p => p.role !== 'GK'), gk = opp.find(p => p.role === 'GK'); if (gk) set(gk, gx - d * 0.8, 34 - s * 1.2);
    marks.forEach((m, i) => { if (df[i]) set(df[i], m[0] + d * 0.9, m[1] + (34 - m[1]) * 0.05); }); if (df[5]) set(df[5], gx - d * 0.6, 34 - s * 3.6); if (df[6]) set(df[6], gx - d * 7, cy + s * 14);
    this.say('corner', `🚩 Corner to ${T.short}`, side, sp.taker && sp.taker.id); setup = 2.3;
  } else if (kind === 'pen') {
    sp.taker = this.taker(side, 'pen'); const sx = gx - d * 11; set(sp.taker, sx - d * (sp.taker && sp.taker.st.pen === 'stutter' ? 3.5 : 2.2), 34); const gk = opp.find(p => p.role === 'GK'); if (gk) set(gk, gx - d * 0.3, 34);
    let i = 0; this.P.forEach(p => { if (p === sp.taker || p.role === 'GK' && p.side !== side) return; if (p.role === 'GK') { set(p, p.side === 0 ? 8 : 97, 34); return; } set(p, gx - d * (18.5 + (i % 2) * 1.5), 14 + ((i * 7) % 40)); i++; });
    this.say('pen', `🎯 PENALTY to ${T.short}!${sp.taker ? ' ' + sp.taker.short + ' steps up' : ''}`, side, sp.taker && sp.taker.id); setup = 3.0;
  } else {
    sp.taker = kind === 'ifk' || kind === 'fk' ? this.nearest(mates.filter(p => p.role !== 'GK'), x, y) : this.taker(side, 'fk');
    if (kind === 'fkd' && sp.taker) { const tk2 = this.taker(side, 'fk'); if (tk2) sp.taker = tk2; }
    set(sp.taker, x - d * 1.8, y);
    if (kind === 'fkd') {
      const dx = gx - x, dy = 34 - y, L = hyp(dx, dy) || 1, ux = dx / L, uy = dy / L, wx = x + ux * 9.15, wy = y + uy * 9.15, n = L < 22 ? 5 : L < 26 ? 4 : 3, wall = [];
      const df = opp.filter(p => p.role !== 'GK').sort((a, c) => sq(a.x - wx) + sq(a.y - wy) - sq(c.x - wx) - sq(c.y - wy));
      for (let i = 0; i < n && df[i]; i++) { const off = (i - (n - 1) / 2) * 0.62; set(df[i], wx - uy * off, wy + ux * off); wall.push(df[i]); } sp.wall = wall;
      const gk = opp.find(p => p.role === 'GK'); if (gk) set(gk, gx - d * 0.6, 34 + (y < 34 ? 1.4 : -1.4));
      this.say('fk', `🎯 Free kick to ${T.short} · ${Math.round(L)} m out${sp.taker ? ' · ' + sp.taker.short + ' (' + W.STYLE_NAME[sp.taker.st.fk] + ')' : ''}`, side, sp.taker && sp.taker.id); setup = 2.4;
    } else if (kind === 'ifk') setup = 1.0;
    else { this.say('fk', `🦶 Free kick to ${T.short}`, side, sp.taker && sp.taker.id); setup = 1.1; }
  }
  if (sp.taker && !sp.pos.has(sp.taker)) set(sp.taker, x, y);
  this.sp = sp; this.pauseT = setup; this._after = () => this.execSP();
};
Match.prototype.execSP = function () {
  const sp = this.sp; this.sp = null; if (!sp) return; const r = this.r, b = this.ball, o = sp.taker && this.P.includes(sp.taker) ? sp.taker : this.nearest(this.P.filter(p => p.side === sp.side), sp.x, sp.y);
  if (!o) return; const mates = this.P.filter(p => p.side === sp.side && p !== o), opp = this.P.filter(p => p.side !== sp.side), gx = this.goalX(sp.side), d = this.dir(sp.side);
  o.x = sp.pos.get(o) ? sp.pos.get(o)[0] : o.x; this.lastTouch = sp.side; b.x = sp.x; b.y = sp.y;
  if (sp.kind === 'ko') { this.give(o); return; }
  if (sp.kind === 'gk') { const lng = r() < (o.st.pass === 'long' ? 0.72 : 0.42); const tgt = lng ? this.bestPass(o, mates.filter(p => p.role !== 'DEF'), opp, false, 62) : this.bestPass(o, mates.filter(p => p.role === 'DEF'), opp, true, 30); this.give(o); this.ball.owner = null; this.passTo(o, tgt || this.bestPass(o, mates, opp, true, 60)); return; }
  if (sp.kind === 'throw') { this.give(o); b.owner = null; if (o.st.lt && Math.abs(gx - sp.x) < 32 && this.cross(o, 'throw')) { this.say('throw', `💪 Long throw by ${o.short}`, sp.side, o.id); return; } const t = this.bestPass(o, mates, opp, true, 20) || this.bestPass(o, mates, opp, true, 35); if (t) this.passTo(o, t, 'throw'); else this.give(o); return; }
  if (sp.kind === 'corner') { this.give(o); b.owner = null; if (r() < 0.14) { const t = this.nearest(mates, sp.x, sp.y); if (t) { this.say('corner2', `↪️ ${o.short} plays it short`, sp.side, o.id); this.passTo(o, t); return; } } if (!this.cross(o, 'corner', r() < 0.4 ? 'near' : 'far')) this.give(o); return; }
  if (sp.kind === 'pen') { const gk = opp.find(p => p.role === 'GK'), s = o.st.pen || 'place'; let save = gk ? clamp(0.17 + (gk.gk - o.sho) / 320, 0.08, 0.3) : 0, miss = 0.06;
    if (s === 'power') { save -= 0.03; miss += 0.03; } if (s === 'stutter') save -= 0.04; if (s === 'chip') { save = gk && r() < 0.35 ? 0.6 : 0.02; miss = 0.05; }
    const x = r(), res = x < miss ? 'miss' : x < miss + save ? 'save' : 'goal';
    this.shoot(o, 11, { pen: 1, goal: res === 'goal', onT: res !== 'miss' }); if (this.ball.fl) { this.ball.fl.style = s; this.ball.fl.dive = r() < 0.5 ? 1 : -1; if (res === 'save') this.ball.fl.y1 = 34 + this.ball.fl.dive * 2.2; } return; }
  if (sp.kind === 'fkd') { const dg = hyp(gx - sp.x, 34 - sp.y), s = o.st.fk, wall = (sp.wall || []).filter(p => this.P.includes(p));
    if (wall.length && r() < (s === 'curl' ? 0.16 : s === 'power' ? 0.24 : 0.2)) { const w = wall[Math.floor(r() * wall.length)]; this.say('block', `🧱 It hits the wall!`, w.side, w.id, { wall: 1 }); this.T[sp.side].shots++; b.x = w.x - d * 2; b.y = w.y; this.give(o); b.owner = null; this.lastTouch = w.side; return; }
    if (dg > 27 && r() < 0.35) { if (!this.cross(o, 'fk')) this.give(o); return; }
    const gq = clamp(0.05 + (o.st.set - 60) / 380 + (30 - dg) / 260 + (s === 'curl' ? 0.015 : s === 'knuckle' ? 0.01 : 0), 0.02, 0.2), onT = r() < 0.45, goal = onT && r() < gq / 0.45;
    this.shoot(o, dg, { fk: 1, goal, onT }); return; }
  /* indirect / ordinary free kicks: played on (wide ones near the box are crossed in) */
  this.give(o); b.owner = null;
  if (sp.kind === 'fk' && Math.abs(gx - sp.x) < 30 && r() < 0.55 && this.cross(o, 'fk')) return;
  const t = this.bestPass(o, mates, opp, true); if (t) this.passTo(o, t); else this.give(o);
};
/* where everyone runs to while play is stopped, and in open play */
Match.prototype.target = function (p, bx, by, poss) {
  const T = this.T[p.side], d = this.dir(p.side), att = poss === p.side, b = this.ball; let tx, ty;
  if (p.role === 'GK') { tx = p.side === 0 ? 3.5 + clamp((bx - 10) / 30, 0, 4) : 101.5 - clamp((95 - bx) / 30, 0, 4); ty = clamp(34 + (by - 34) * 0.35, 29, 39); return [tx, ty]; }
  const shift = clamp((bx - 52.5) * 0.55, -20, 20) + d * (att ? 7 + T.mods.attack * 6 : -5 - T.mods.tight * 5);
  tx = p.bx + shift; ty = p.by + (by - 34) * (0.22 + T.mods.tight * 0.08);
  if (att && p.role === 'FWD') { tx = Math.max(d * tx, d * (bx + d * (9 + (p.num % 3) * 3))) * d; if (p.st.shot === 'poacher' && d * (bx - 52.5) > 10) { tx = this.goalX(p.side) - d * (8 + (p.num % 3) * 2); ty = 34 + (p.by - 34) * 0.35; } }
  if (att && p.role === 'MID') tx = d > 0 ? Math.max(tx, bx - 4) : Math.min(tx, bx + 4);
  if (!att && p.role === 'DEF') { const depth = 15 + T.mods.tight * 8 + (poss == null ? 4 : 0); tx = d > 0 ? clamp(tx, bx - depth, bx - 6) : clamp(tx, bx + 6, bx + depth); }
  if (!att && T.mods.tight) tx -= d * 3;
  /* attackers try to stay onside (good timing most of the time) */
  if (att && p.role !== 'DEF') { const L = this.ln[p.side] + d * p.ofs; if (p.role === 'FWD' && d * (bx - 52.5) > -14) tx = d > 0 ? Math.max(tx, L - 2) : Math.min(tx, L + 2); tx = d > 0 ? Math.min(tx, L) : Math.max(tx, L); }
  return [clamp(tx, 2, 103), clamp(ty, 2, 66)];
};
Match.prototype.moveAll = function (mode) {
  const b = this.ball, sp = this.sp, poss = sp ? sp.side : this.ball.owner ? this.ball.owner.side : (b.fl && b.fl.from ? b.fl.from.side : null), r = this.r;
  const bx = sp ? sp.x : b.fl ? b.fl.x1 : b.x, by = sp ? sp.y : b.fl ? b.fl.y1 : b.y;
  const chasers = {}; if (mode === 'play') [0, 1].forEach(s => { const L = this.P.filter(p => p.side === s && p.role !== 'GK'); const T = this.T[s], n = poss === s ? (b.owner ? 0 : 1) : 2 + T.mods.press; chasers[s] = L.sort((a, c) => (sq(a.x - bx) + sq(a.y - by)) - (sq(c.x - bx) + sq(c.y - by))).slice(0, n); });
  for (const p of this.P) {
    p.px = p.x; p.py = p.y;
    if (mode === 'frozen') { p.vx *= 0.8; p.vy *= 0.8; continue; }
    p.ofT -= DT; if (p.ofT <= 0) { p.ofT = 2 + r() * 2.5; p.ofs = -0.8 + r() * 2.9 + ((p.pas || 60) < 55 ? 0.3 : 0); }
    const d = this.dir(p.side); let tx, ty, slow = 1;
    if (mode === 'setup') {
      if (this.hug >= 0) { const sc = this.hugBy; if (p.side === this.hug && sc && this.P.includes(sc) && p !== sc && sq(p.x - sc.x) + sq(p.y - sc.y) < 900) { tx = sc.x; ty = sc.y; } else if (p === sc) { tx = clamp(p.x + d * 2, 2, 103); ty = clamp(p.y + (p.y < 34 ? -3 : 3), 2, 66); } else { tx = p.x; ty = p.y; slow = 0.4; } }
      else if (sp && sp.pos.has(p)) { [tx, ty] = sp.pos.get(p); }
      else [tx, ty] = this.target(p, bx, by, poss);
      if (sp) slow = sp.kind === 'ko' ? 0.75 : 0.6;
    } else if (p.role === 'GK') [tx, ty] = this.target(p, bx, by, poss);
    else if (b.owner === p) { const gx = this.goalX(p.side); if (p.dribT > 0) { p.dribT -= DT; tx = p.x + d * 3; ty = p.y + (34 - p.y) * 0.08; } else { tx = p.x + d * 0.6; ty = p.y; } if (Math.abs(gx - p.x) < 4) tx = p.x; }
    else if (chasers[p.side].includes(p)) { tx = bx - d * (poss === p.side ? 0 : 0.6); ty = by; }
    else [tx, ty] = this.target(p, bx, by, poss);
    /* acceleration: explosive starters get going fast, engines reach a higher top speed */
    const ps = p.st.pace, top = (6.2 + p.pac * 0.075) * (b.owner === p ? 0.72 : 1) * (ps === 'engine' ? 1.05 : ps === 'burst' ? 0.97 : 1) * slow, acc = ps === 'burst' ? 13 : ps === 'engine' ? 7 : 9.5;
    const dx = tx - p.x, dy = ty - p.y, dist = hyp(dx, dy), want = dist < 0.05 ? 0 : Math.min(top, dist / 0.32), dvx = dist > 0.001 ? dx / dist * want : 0, dvy = dist > 0.001 ? dy / dist * want : 0;
    let ax = dvx - p.vx, ay = dvy - p.vy; const al = hyp(ax, ay), mx = acc * DT * (al > 0 && want < hyp(p.vx, p.vy) ? 1.6 : 1); if (al > mx) { ax *= mx / al; ay *= mx / al; }
    p.vx += ax; p.vy += ay; p.x = clamp(p.x + p.vx * DT, -1, 106); p.y = clamp(p.y + p.vy * DT, -1, 69);
  }
};
W.Match = Match;
