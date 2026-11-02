// =====================================================================
// ⚽ 11 WONDERS · Score Manager — G1 (loaded only when you open it)
// Your club · procedural world · 15 formations · 4-minute live match (2D radar, 60 fps, no pauses)
// · 30-second touchline shouts · subs · 5-match Boot Camp · friendlies + 15-minute lockdown · Pioneer 50
// Everything about players comes from their ID, so thousands of players cost no storage.
// =====================================================================
(function () {
'use strict';
const W = window.W11 = window.W11 || {};
const WORLD = 'w11s1';
const db = () => window.db;

// ---------- helpers ----------
const hash = (s) => { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
const rng = (seed) => { let s = (seed >>> 0) || 0x9e3779b9; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; };
const pick = (r, a) => a[Math.floor(r() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = (s) => window.escapeHTML ? window.escapeHTML(String(s == null ? '' : s)) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const toast = (t) => window.showToast ? window.showToast(t) : console.log(t);
const fmt = (n) => Number(n || 0).toLocaleString();

// ---------- 🌍 people from everywhere (made-up combinations) ----------
const CULT = {
  gh: ['🇬🇭', 'Kwame Kofi Kojo Yaw Kwabena Kwaku Ebo Nana Fiifi Kwasi Selorm Elikem Atta Nii', 'Mensah Asante Boateng Owusu Appiah Osei Danso Addo Quaye Tetteh Agyeman Ofori Amoah Sarpong'],
  ng: ['🇳🇬', 'Chidi Emeka Tunde Segun Ifeanyi Uche Femi Kelechi Obinna Musa Sani Dayo Nnamdi Ayo', 'Okafor Adeyemi Okonkwo Balogun Eze Bello Adebayo Nwosu Ogunleye Ibrahim Afolabi Chukwu Danjuma'],
  ea: ['🇰🇪', 'Kamau Otieno Baraka Juma Mwangi Kiptoo Odhiambo Wanjala Hassani Amani Tumaini Kibet', 'Kariuki Omondi Mutua Wafula Kiprono Njoroge Achieng Mbwana Okello Ssempijja Kimani Barasa'],
  za: ['🇿🇦', 'Thabo Sipho Bongani Lwazi Mandla Tshepo Kagiso Sibusiso Lerato Themba Andile Jabu', 'Nkosi Dlamini Khumalo Mokoena Ndlovu Zulu Mahlangu Sithole Molefe Mthembu Radebe Mabaso'],
  fr: ['🇸🇳', 'Moussa Ousmane Ibrahima Mamadou Cheikh Abdoulaye Idrissa Pape Souleymane Lamine Youssouf Alioune', 'Diallo Ndiaye Diop Sow Traoré Koné Camara Cissé Fall Sarr Keita Baldé Touré'],
  ar: ['🇲🇦', 'Youssef Omar Karim Hamza Rayan Bilal Anas Tariq Samir Nabil Adel Zakaria Mehdi Walid', 'El Amrani Haddad Benali Mansour Saleh Rahimi Bakri Najjar Aziz Farouk Hamdi Sabri Kassem'],
  cn: ['🇨🇳', 'Wei Jun Hao Lei Tao Yang Peng Bo Chen Long Ming Rui Kai Zhen', 'Wang Li Zhang Liu Chen Zhao Huang Zhou Wu Xu Sun Ma Zhu Hu'],
  jp: ['🇯🇵', 'Haruto Ren Sota Yuto Kaito Riku Takumi Daiki Kenta Shota Yuki Ryo Kazuki Hiroshi', 'Sato Suzuki Takahashi Tanaka Watanabe Ito Nakamura Kobayashi Yamamoto Kato Yoshida Yamada'],
  kr: ['🇰🇷', 'Min-jun Seo-jun Do-yun Ji-ho Ha-jun Joon-young Hyun-woo Sung-min Jae-won Tae-yang', 'Kim Lee Park Choi Jung Kang Cho Yoon Jang Lim Han Shin'],
  in: ['🇮🇳', 'Arjun Rohan Vikram Aditya Rahul Karan Siddharth Aarav Ishaan Kabir Varun Nikhil Dev Harsh', 'Sharma Patel Singh Reddy Nair Gupta Iyer Rao Das Mehta Chopra Bose Pillai Verma'],
  en: ['🏴', 'Jack Harry Oliver George Charlie Alfie Mason Ethan Leo Jacob Callum Ryan Lewis Kyle', 'Smith Walker Hughes Turner Clarke Wright Baker Hall Green Cooper Ward Bennett Price Morris'],
  es: ['🇪🇸', 'Pablo Diego Javier Sergio Álvaro Hugo Mario Raúl Iker Adrián Marcos Rubén Dani Gonzalo', 'García Fernández López Martínez Sánchez Romero Navarro Torres Ruiz Moreno Ortega Delgado Castro'],
  pt: ['🇧🇷', 'João Pedro Lucas Gabriel Rafael Thiago Matheus Bruno Felipe Vinícius Caio Rodrigo Igor Davi', 'Silva Santos Oliveira Souza Costa Pereira Almeida Ferreira Ribeiro Carvalho Gomes Martins Rocha'],
  it: ['🇮🇹', 'Luca Marco Matteo Alessandro Davide Lorenzo Federico Andrea Simone Riccardo Nicolò Gianluca', 'Rossi Russo Ferrari Esposito Bianchi Romano Colombo Ricci Marino Greco Bruno Gallo Conti'],
  de: ['🇩🇪', 'Lukas Leon Jonas Felix Paul Maximilian Niklas Tim Jan Moritz Elias Finn Tobias Florian', 'Müller Schmidt Schneider Fischer Weber Wagner Becker Hoffmann Koch Richter Wolf Krüger Braun'],
  nl: ['🇳🇱', 'Daan Sem Thijs Bram Lars Ruben Jesse Niels Stijn Joris Wouter Milan', 'de Jong Jansen de Vries van Dijk Bakker Visser Smit Meijer de Boer Mulder Dekker Vos'],
  ee: ['🇵🇱', 'Jakub Kacper Mateusz Filip Szymon Michał Dominik Aleksander Igor Nikola Luka Marko', 'Kowalski Nowak Wiśniewski Petrović Novak Horvat Popescu Ionescu Kovač Dvořák Ivanov Babić'],
  la: ['🇲🇽', 'Santiago Mateo Sebastián Emiliano Nicolás Joaquín Benjamín Tomás Agustín Facundo Bruno Lautaro', 'Hernández González Rodríguez Gómez Díaz Morales Vargas Rojas Herrera Medina Aguilar Ramos'],
  ca: ['🇯🇲', 'Jamal Andre Shane Dwayne Kemar Damion Tyrone Marlon Rohan Akeem Romario Jermaine', 'Campbell Brown Williams Thompson Grant Clarke Francis Barrett Bailey Reid Powell Morgan'],
  tr: ['🇹🇷', 'Emre Burak Mert Can Arda Kerem Oğuz Serkan Hakan Barış Yusuf Ozan', 'Yılmaz Kaya Demir Şahin Çelik Aydın Öztürk Arslan Doğan Kılıç Aslan Kurt'],
};
const CULT_KEYS = Object.keys(CULT);
const CULT_W = { gh: 3, ng: 3, ea: 2, za: 2, fr: 2, ar: 2, cn: 1.5, jp: 1.5, kr: 1, in: 1.5, en: 2, es: 2, pt: 2, it: 1.5, de: 1.5, nl: 1, ee: 1.5, la: 2, ca: 1.5, tr: 1 };
const pickCult = (r) => { const tot = CULT_KEYS.reduce((a, k) => a + CULT_W[k], 0); let x = r() * tot; for (const k of CULT_KEYS) { x -= CULT_W[k]; if (x <= 0) return k; } return 'gh'; };
const CITY = 'Accra Kumasi Tamale Takoradi Lagos Ibadan Enugu Kano Abuja Nairobi Mombasa Kampala Dar Lusaka Harare Durban Soweto Dakar Abidjan Douala Casablanca Tunis Cairo Alexandria Doha Riyadh Mumbai Pune Delhi Chennai Osaka Nagoya Busan Seoul Shanghai Wuhan Manila Jakarta Bangkok Hanoi Lisbon Porto Seville Valencia Bilbao Naples Turin Genoa Lyon Marseille Lille Hamburg Cologne Bremen Leipzig Rotterdam Utrecht Antwerp Ghent Krakow Zagreb Belgrade Bucharest Istanbul Izmir Ankara Kingston Montego Bogota Medellin Lima Quito Santiago Rosario Recife Salvador Fortaleza Monterrey Guadalajara Leeds Bristol Glasgow Cardiff Belfast Dublin Oslo Malmo Aarhus'.split(' ');
const SUFFIX = 'FC United City Stars Rovers Athletic Lions Eagles Falcons Warriors Rangers Dynamos Wanderers Strikers Sharks Titans Comets Royals Phoenix Hornets'.split(' ');

// ---------- 🧑 players & clubs come from their IDs (no storage needed) ----------
const POS_TEMPLATE = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'GK', 'DEF', 'DEF', 'MID', 'MID', 'FWD', 'FWD'];
W.club = function (idx) {
  const r = rng(hash(WORLD + ':club:' + idx));
  const tier = idx < 14 ? 1 : idx < 42 ? 2 : idx < 98 ? 3 : idx < 210 ? 4 : idx < 434 ? 5 : 6;
  const name = pick(r, CITY) + ' ' + pick(r, SUFFIX);
  const hue = Math.floor(r() * 360);
  return { idx, tier, name, short: name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase(), hue, base: [78, 72, 67, 62, 57, 52][tier - 1] + Math.floor(r() * 6) };
};
W.player = function (id) {
  const [ci, slot] = String(id).split('-').map(Number), c = W.club(ci), r = rng(hash(WORLD + ':p:' + id));
  const cult = pickCult(r), C = CULT[cult], first = pick(r, C[1].split(' ')), last = pick(r, C[2].split(' '));
  const pos = POS_TEMPLATE[slot] || 'MID';
  const age = 16 + Math.floor(Math.pow(r(), 0.8) * 20);
  const peak = 1 - Math.abs(age - 27) / 22;
  let ovr = Math.round(c.base - 6 + r() * 14 + peak * 6 + (slot < 11 ? 3 : -3) + (r() < 0.06 ? 8 : 0));   // pure luck: some clubs hide a gem
  ovr = clamp(ovr, 40, 95);
  const a = (k, bias) => clamp(Math.round(ovr + bias + (r() - 0.5) * 14), 25, 99);
  const at = pos === 'GK' ? { pac: a('p', -18), sho: a('s', -35), pas: a('a', -12), dri: a('d', -25), def: a('f', -10), gk: a('g', 4) }
    : pos === 'DEF' ? { pac: a('p', -2), sho: a('s', -18), pas: a('a', -5), dri: a('d', -10), def: a('f', 6), gk: 20 }
    : pos === 'MID' ? { pac: a('p', 0), sho: a('s', -4), pas: a('a', 6), dri: a('d', 4), def: a('f', -6), gk: 20 }
    : { pac: a('p', 5), sho: a('s', 7), pas: a('a', -3), dri: a('d', 4), def: a('f', -22), gk: 20 };
  return { id, ci, slot, name: first + ' ' + last, short: last.length > 11 ? last.slice(0, 10) + '.' : last, flag: C[0], cult, pos, age, ovr, ...at, num: [1, 2, 4, 5, 3, 6, 8, 10, 7, 9, 11, 13, 15, 16, 14, 18, 19, 20][slot] || slot + 1 };
};
W.squadIds = (ci) => POS_TEMPLATE.map((_, s) => ci + '-' + s);
W.avg = (ids) => Math.round(ids.slice(0, 11).map(W.player).reduce((s, p) => s + p.ovr, 0) / 11);

// ---------- 📐 15 formations ----------
W.FORMS = { '4-4-2': [4, 4, 2], '4-3-3': [4, 3, 3], '4-2-3-1': [4, 2, 3, 1], '4-1-4-1': [4, 1, 4, 1], '4-4-1-1': [4, 4, 1, 1], '4-3-2-1': [4, 3, 2, 1], '4-5-1': [4, 5, 1], '4-1-2-1-2': [4, 1, 2, 1, 2], '4-2-4': [4, 2, 4], '3-5-2': [3, 5, 2], '3-4-3': [3, 4, 3], '3-4-2-1': [3, 4, 2, 1], '3-3-3-1': [3, 3, 3, 1], '5-3-2': [5, 3, 2], '5-4-1': [5, 4, 1] };
W.shape = function (form) {
  const L = W.FORMS[form] || W.FORMS['4-4-2'], out = [{ x: 4, y: 34, role: 'GK' }], n = L.length, x0 = 17, x1 = n >= 4 ? 47 : 44;
  L.forEach((k, li) => { const x = n === 1 ? 30 : x0 + (x1 - x0) * li / (n - 1); for (let i = 0; i < k; i++) out.push({ x, y: 8 + 52 * (i + 1) / (k + 1), role: li === 0 ? 'DEF' : li === n - 1 ? 'FWD' : 'MID' }); });
  return out;
};

// ---------- ⚙️ match engine (fixed 20 steps per second, same seed = same match) ----------
const DT = 0.05, HALF = 105, BREAK = 30, LEN = HALF * 2, TOTAL = HALF * 2 + BREAK;
W.TIMING = { HALF, BREAK, LEN, TOTAL };
function Team(side, info) {
  this.side = side; this.name = info.name; this.short = info.short; this.color = info.color; this.gkColor = info.gkColor;
  this.form = info.form || '4-4-2'; this.ids = info.ids.slice(0, 18); this.subsLeft = 5; this.mods = { attack: 0, tight: 0, press: 0, calm: 0 };
  this.score = 0; this.shots = 0; this.onT = 0; this.passes = 0; this.poss = 0; this.cards = 0;
}
function Match(home, away, seed) {
  this.r = rng(seed); this.seed = seed; this.t = 0; this.tick = 0; this.ev = []; this.over = false; this.pauseT = 0;
  this.T = [new Team(0, home), new Team(1, away)]; this.P = []; this.ball = { x: 52.5, y: 34, h: 0, owner: null, fl: null, px: 52.5, py: 34 };
  this.lastAlert = 0; this.cmds = [];
  this.T.forEach(t => this.layTeam(t));
  this.kickoff(0, true);
}
Match.prototype.dir = function (side) { return side === 0 ? 1 : -1; };
Match.prototype.goalX = function (side) { return side === 0 ? 105 : 0; };
Match.prototype.layTeam = function (t) {
  const sh = W.shape(t.form), old = this.P.filter(p => p.side === t.side);
  this.P = this.P.filter(p => p.side !== t.side);
  t.ids.slice(0, 11).forEach((id, i) => {
    const pl = W.player(id), s = sh[i] || sh[sh.length - 1], prev = old.find(o => o.id === id);
    const bx = t.side === 0 ? s.x : 105 - s.x;
    this.P.push({ ...pl, side: t.side, role: i === 0 ? 'GK' : s.role, bx, by: t.side === 0 ? s.y : 68 - s.y, x: prev ? prev.x : bx, y: prev ? prev.y : (t.side === 0 ? s.y : 68 - s.y), px: 0, py: 0, vx: 0, vy: 0, cd: 0, ycard: prev ? prev.ycard : 0 });
  });
};
Match.prototype.kickoff = function (side, first) {
  this.P.forEach(p => { p.x = p.side === 0 ? Math.min(p.bx, 49) : Math.max(p.bx, 56); p.y = p.by; p.dribT = 0; if (first) { p.px = p.x; p.py = p.y; } });
  const taker = this.P.filter(p => p.side === side && p.role !== 'GK').sort((a, b) => Math.abs(a.x - 52.5) + Math.abs(a.y - 34) - (Math.abs(b.x - 52.5) + Math.abs(b.y - 34)))[0];
  taker.x = 52.5 - this.dir(side) * 0.8; taker.y = 34; this.give(taker); this.ball.x = 52.5; this.ball.y = 34; this.ball.fl = null; this.dec = 0.6;
};
Match.prototype.give = function (p) { this.ball.owner = p; this.ball.fl = null; this.poss = p.side; p.cd = 0.35; this.dec = 0.3 + this.r() * 0.5; };
Match.prototype.say = function (k, txt, side) { this.ev.push({ t: this.t, k, txt, side, min: this.minute() }); };
Match.prototype.minute = function () { return Math.min(90, Math.floor(this.t / HALF * 45) + 1); };
Match.prototype.cmd = function (side, c) { this.cmds.push({ tick: this.tick, side, c }); this.applyCmd(side, c); };
Match.prototype.applyCmd = function (side, c) {
  const t = this.T[side];
  if (c.shout) { t.mods = { attack: 0, tight: 0, press: 0, calm: 0 }; if (c.shout !== 'none') t.mods[c.shout] = 1; this.say('shout', { attack: '📣 ALL OUT ATTACK!', tight: '🧱 KEEP IT TIGHT!', press: '⚡ PRESS HIGH!', calm: '🧘 CALM DOWN, KEEP THE BALL!' }[c.shout] || '', side); }
  if (c.form && W.FORMS[c.form]) { t.form = c.form; this.layTeam(t); this.say('form', '📐 ' + t.short + ' switch to ' + c.form, side); }
  if (c.sub && t.subsLeft > 0) { const [o, n] = c.sub; const i = t.ids.indexOf(o), j = t.ids.indexOf(n); if (i >= 0 && i < 11 && j >= 11) { const own = this.ball.owner && this.ball.owner.id === o; t.ids[i] = n; t.ids[j] = o; t.subsLeft--; this.layTeam(t); const np = this.P.find(p => p.id === n); if (own && np) this.give(np); this.say('sub', `🔁 ${W.player(n).short} on for ${W.player(o).short}`, side); } }
};
Match.prototype.nearest = function (list, x, y) { let b = null, bd = 1e9; for (const p of list) { const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; b = p; } } return b; };
Match.prototype.step = function () {
  const r = this.r, b = this.ball;
  if (this.over) return;
  b.px = b.x; b.py = b.y;
  this.t += DT; this.tick++;                                       // the clock never stops (goal celebrations included)
  if (this.t >= LEN - 1e-9) { this.over = true; this.say('ft', `🏁 Full time: ${this.T[0].short} ${this.T[0].score}–${this.T[1].score} ${this.T[1].short}`); return; }
  if (this.t >= HALF && !this.ht) { this.ht = true; this.pauseT = 0; this._after = null; this.say('ht', `⏸️ Half time: ${this.T[0].short} ${this.T[0].score}–${this.T[1].score} ${this.T[1].short}`); this.kickoff(1); this.P.forEach(p => { p.px = p.x; p.py = p.y; }); return; }
  if (this.pauseT > 0) { this.pauseT -= DT; if (this.pauseT <= 0 && this._after) { const f = this._after; this._after = null; f(); } this.moveAll(true); return; }
  if (this.t - this.lastAlert >= 30) { this.lastAlert = this.t; this.say('alert', '📢 Touchline moment!'); this.aiShout(1); }
  if (this.poss != null) this.T[this.poss].poss += DT;
  this.P.forEach(p => { if (p.cd > 0) p.cd -= DT; });
  // ball in flight
  if (b.fl) {
    const f = b.fl; f.k += DT / f.dur; const k = Math.min(1, f.k);
    b.x = f.x0 + (f.x1 - f.x0) * k; b.y = f.y0 + (f.y1 - f.y0) * k; b.h = f.arc * 4 * k * (1 - k);
    if (k >= 1) this.land();
  } else if (b.owner) {
    const o = b.owner, d = this.dir(o.side); b.x = o.x + d * 0.9; b.y = o.y; b.h = 0;
    this.carrier(o);
  } else {
    // loose ball: closest players chase; first one there takes it
    const p = this.nearest(this.P, b.x, b.y); if (p && (p.x - b.x) ** 2 + (p.y - b.y) ** 2 < 1.7) this.give(p);
  }
  this.moveAll(false);
};
Match.prototype.aiShout = function (side) {
  const t = this.T[side], o = this.T[1 - side], m = this.minute(), r = this.r;
  if (t.ai === false) return;
  let s = 'none'; if (t.score < o.score && m > 55) s = 'attack'; else if (t.score > o.score && m > 65) s = 'tight'; else if (r() < 0.3) s = pick(r, ['press', 'calm', 'none']);
  const cur = Object.keys(t.mods).find(k => t.mods[k]) || 'none'; if (s !== cur) this.applyCmd(side, { shout: s });
};
Match.prototype.carrier = function (o) {
  const r = this.r, d = this.dir(o.side), gx = this.goalX(o.side), T = this.T[o.side], mods = T.mods;
  const opp = this.P.filter(p => p.side !== o.side), mates = this.P.filter(p => p.side === o.side && p !== o);
  // pressure / tackles
  const presser = this.nearest(opp, o.x, o.y), pd = presser ? Math.hypot(presser.x - o.x, presser.y - o.y) : 99;
  if (presser && pd < 1.6 && o.cd <= 0 && r() < 0.11 * (1 + this.T[presser.side].mods.press * 0.5)) {
    const win = 0.42 + (presser.def - o.dri) / 160 + this.T[presser.side].mods.tight * 0.05;
    if (r() < 0.06) { this.foul(presser, o); return; }
    if (r() < win) { this.say('tackle', `🦵 ${presser.short} wins it`, presser.side); this.ball.owner = null; this.ball.x += (r() - 0.5) * 2; this.give(presser); return; }
  }
  this.dec -= DT; if (this.dec > 0) return;
  this.dec = (0.45 + r() * 0.7) * (1 + mods.calm * 0.35) * (1 - mods.attack * 0.2);
  if (o.role === 'GK') { this.passTo(o, this.bestPass(o, mates, opp, true)); return; }
  const dg = Math.hypot(gx - o.x, 34 - o.y);
  // shoot?
  if (dg < 27 && Math.abs(o.y - 34) < 20) {
    const want = 0.18 + (27 - dg) / 28 + mods.attack * 0.12 - mods.calm * 0.06;
    if (r() < want) { this.shoot(o, dg); return; }
  }
  // pass or dribble
  const space = pd > 4, room = Math.abs(gx - o.x) > 6;
  const dribW = (space ? 0.5 : 0.12) + (o.dri - 60) / 160 + mods.attack * 0.1 - mods.calm * 0.12 + (o.role === 'FWD' ? 0.12 : o.role === 'DEF' ? -0.15 : 0);
  if (room && r() < dribW) { o.dribT = 0.5 + r() * 0.7; this.dec = o.dribT; return; }
  const tgt = this.bestPass(o, mates, opp, false); if (tgt) this.passTo(o, tgt); else { o.dribT = 0.6; this.dec = 0.6; }
};
Match.prototype.bestPass = function (o, mates, opp, safe) {
  const r = this.r, d = this.dir(o.side); let best = null, bs = -1e9;
  for (const m of mates) {
    const dist = Math.hypot(m.x - o.x, m.y - o.y); if (dist < 5 || dist > 42) continue;
    const gain = d * (m.x - o.x), open = Math.min(10, Math.min(...opp.map(p => Math.hypot(p.x - m.x, p.y - m.y)))), risk = this.lineRisk(o, m, opp);
    const sc = (safe ? 0.03 : 0.14 + this.T[o.side].mods.attack * 0.05) * gain + open * 0.12 - risk * (0.9 + this.T[o.side].mods.calm * 0.6) - dist * 0.01 + r() * 0.7 + (m.role === 'GK' ? -4 : 0) + (gain < -3 && !safe ? -1.2 : 0);
    if (sc > bs) { bs = sc; best = m; }
  }
  return best;
};
Match.prototype.lineRisk = function (a, b, opp) {
  let risk = 0; const dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy || 1;
  for (const p of opp) { const k = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / L2, 0, 1); const ex = a.x + dx * k - p.x, ey = a.y + dy * k - p.y, dd = Math.sqrt(ex * ex + ey * ey); if (k > 0.1 && k < 0.95 && dd < 3) risk += (3 - dd) / 3; }
  return risk;
};
Match.prototype.passTo = function (o, m) {
  if (!m) return; const r = this.r, T = this.T[o.side], opp = this.P.filter(p => p.side !== o.side);
  const lead = 0.5, tx = clamp(m.x + this.dir(o.side) * 2.2 * lead, 1, 104), ty = clamp(m.y, 2, 66), dist = Math.hypot(tx - o.x, ty - o.y);
  T.passes++;
  const b = this.ball; b.owner = null;
  // interception?
  let cut = null; const dx = tx - o.x, dy = ty - o.y, L2 = dx * dx + dy * dy || 1;
  for (const p of opp) { const k = ((p.x - o.x) * dx + (p.y - o.y) * dy) / L2; if (k < 0.15 || k > 0.92) continue; const ex = o.x + dx * k - p.x, ey = o.y + dy * k - p.y; if (ex * ex + ey * ey < 5 && r() < 0.16 + (p.def - o.pas) / 260 + this.T[p.side].mods.press * 0.04) { cut = { p, k }; break; } }
  const miss = !cut && r() < 0.05 + (75 - o.pas) / 600 - T.mods.calm * 0.02;
  const ex = miss ? tx + (r() - 0.5) * 12 : cut ? o.x + dx * cut.k : tx, ey = miss ? clamp(ty + (r() - 0.5) * 12, -1, 69) : cut ? o.y + dy * cut.k : ty;
  b.fl = { x0: o.x, y0: o.y, x1: ex, y1: ey, k: 0, dur: Math.max(0.35, Math.hypot(ex - o.x, ey - o.y) / (dist > 28 ? 24 : 30)), arc: dist > 28 ? 2.2 : 0.3, to: cut ? cut.p : miss ? null : m, from: o, kind: 'pass' };
};
Match.prototype.shoot = function (o, dg) {
  const r = this.r, T = this.T[o.side], gx = this.goalX(o.side), gk = this.P.find(p => p.side !== o.side && p.role === 'GK');
  T.shots++;
  const q = clamp(0.07 + (o.sho / 100) * 0.42 * (1 - dg / 36) - (gk ? gk.gk / 100 : 0.6) * 0.16 + T.mods.attack * 0.03 + (r() - 0.5) * 0.05, 0.02, 0.55);
  const onT = r() < 0.38 + o.sho / 260, goal = onT && r() < q / 0.45;
  if (onT) T.onT++;
  const ty = goal ? 34 + (r() - 0.5) * 6.4 : onT ? 34 + (r() - 0.5) * 5 : 34 + (r() < 0.5 ? -1 : 1) * (4.5 + r() * 6);
  this.ball.owner = null;
  this.ball.fl = { x0: o.x, y0: o.y, x1: gx + this.dir(o.side) * (goal ? 1.2 : 0.2), y1: ty, k: 0, dur: Math.max(0.3, dg / 36), arc: dg > 18 ? 1.4 : 0.6, kind: 'shot', goal, onT, from: o, gk };
};
Match.prototype.land = function () {
  const b = this.ball, f = b.fl; b.fl = null;
  if (f.kind === 'shot') {
    const sh = f.from, T = this.T[sh.side];
    if (f.goal) { T.score++; this.say('goal', `⚽ GOAL! ${sh.name} (${T.short}) ${this.T[0].score}–${this.T[1].score}`, sh.side); this.pauseT = 2.6; this._after = () => this.kickoff(1 - sh.side); return; }
    if (f.onT && f.gk) { this.say('save', `🧤 Save by ${f.gk.short}!`, f.gk.side); if (this.r() < 0.35) { b.x = f.gk.x + this.dir(f.gk.side) * 5; b.y = clamp(f.gk.y + (this.r() - 0.5) * 14, 4, 64); b.owner = null; return; } this.pauseT = 0.8; this._after = () => this.give(f.gk); return; }
    this.say('miss', `💨 ${sh.short} shoots wide`, sh.side);
    const gk = this.P.find(p => p.side !== sh.side && p.role === 'GK'); this.pauseT = 1.0; this._after = () => this.give(gk); return;
  }
  if (b.y < 0 || b.y > 68 || b.x < 0 || b.x > 105) {           // out of play
    const last = f.from, oppSide = 1 - last.side, taker = this.nearest(this.P.filter(p => p.side === oppSide && p.role !== 'GK'), clamp(b.x, 1, 104), clamp(b.y, 1, 67));
    b.x = clamp(b.x, 0.5, 104.5); b.y = clamp(b.y, 0.5, 67.5);
    if (b.x <= 0.5 || b.x >= 104.5) { const gk = this.P.find(p => p.side === oppSide && p.role === 'GK'); this.pauseT = 0.7; this._after = () => this.give(gk); return; }
    this.pauseT = 0.6; this._after = () => { taker.x = b.x; taker.y = b.y; this.give(taker); }; return;
  }
  if (f.to) { const tp = f.to; if (tp.side !== f.from.side) this.say('int', `✂️ ${tp.short} cuts it out`, tp.side); else this.T[f.from.side].passes; this.give(tp); return; }
  b.owner = null;                                               // loose
};
Match.prototype.foul = function (by, on) {
  const r = this.r; this.say('foul', `⚠️ Foul by ${by.short}`, by.side);
  if (r() < 0.22) { by.ycard++; this.T[by.side].cards++; if (by.ycard >= 2) { this.say('red', `🟥 ${by.short} is sent off (2nd yellow)!`, by.side); this.sendOff(by); } else this.say('yellow', `🟨 Yellow card: ${by.name}`, by.side); }
  else if (r() < 0.015) { this.say('red', `🟥 Straight red: ${by.name}!`, by.side); this.sendOff(by); }
  this.pauseT = 0.9; this._after = () => this.give(on);
};
Match.prototype.sendOff = function (p) { this.P = this.P.filter(x => x !== p); if (this.ball.owner === p) this.ball.owner = null; };
Match.prototype.moveAll = function (frozen) {
  const b = this.ball, poss = this.ball.owner ? this.ball.owner.side : (b.fl && b.fl.from ? b.fl.from.side : null);
  const bx = b.fl ? b.fl.x1 : b.x, by = b.fl ? b.fl.y1 : b.y;
  const chasers = {}; [0, 1].forEach(s => { const L = this.P.filter(p => p.side === s && p.role !== 'GK'); const T = this.T[s], n = poss === s ? (b.owner ? 0 : 1) : 2 + T.mods.press; chasers[s] = L.sort((a, c) => ((a.x - bx) ** 2 + (a.y - by) ** 2) - ((c.x - bx) ** 2 + (c.y - by) ** 2)).slice(0, n); });
  for (const p of this.P) {
    p.px = p.x; p.py = p.y;
    if (frozen) continue;
    const T = this.T[p.side], d = this.dir(p.side), att = poss === p.side;
    let tx, ty;
    if (p.role === 'GK') { tx = p.side === 0 ? 3.5 + clamp((bx - 10) / 30, 0, 4) : 101.5 - clamp((95 - bx) / 30, 0, 4); ty = clamp(34 + (by - 34) * 0.35, 29, 39); }
    else if (b.owner === p) { const gx = this.goalX(p.side); if (p.dribT > 0) { p.dribT -= DT; tx = p.x + d * 3; ty = p.y + (34 - p.y) * 0.08; } else { tx = p.x + d * 0.6; ty = p.y; } if (Math.abs(gx - p.x) < 4) tx = p.x; }
    else if (chasers[p.side].includes(p)) { tx = bx - d * (att ? 0 : 0.6); ty = by; }
    else {
      const shift = clamp((bx - 52.5) * 0.55, -20, 20) + d * (att ? 7 + T.mods.attack * 6 : -5 - T.mods.tight * 5);
      tx = p.bx + shift; ty = p.by + (by - 34) * (0.22 + T.mods.tight * 0.08);
      if (att && p.role === 'FWD') tx = Math.max(d * tx, d * (bx + d * (9 + (p.num % 3) * 3))) * d;     // forwards run beyond the ball
      if (att && p.role === 'MID') tx = d > 0 ? Math.max(tx, bx - 4) : Math.min(tx, bx + 4);         // midfield supports
      if (!att && p.role === 'DEF') tx = d > 0 ? Math.min(tx, bx - 6) : Math.max(tx, bx + 6);        // defenders stay goal-side
      if (!att && T.mods.tight) tx -= d * 3;
      tx = clamp(tx, 2, 103); ty = clamp(ty, 2, 66);
    }
    const sp = (6.2 + p.pac * 0.075) * (b.owner === p ? 0.72 : 1);
    const dx = tx - p.x, dy = ty - p.y, dist = Math.hypot(dx, dy);
    if (dist > 0.05) { const st = Math.min(dist, sp * DT * (dist < 2 ? 0.6 : 1)); p.x += dx / dist * st; p.y += dy / dist * st; }
  }
};
W.Match = Match;
W.simulate = function (home, away, seed, cmds, upTo) {           // fast-forward (no drawing)
  const m = new Match(home, away, seed); let ci = 0; const C = (cmds || []).slice().sort((a, b) => a.tick - b.tick);
  const end = upTo == null ? Infinity : upTo;
  while (!m.over && m.tick < end) { while (ci < C.length && C[ci].tick === m.tick) { m.applyCmd(C[ci].side, C[ci].c); m.cmds.push(C[ci]); ci++; } m.step(); }
  return m;
};

// ---------- 🎨 the 2D view (60 fps, smooth between engine steps) ----------
function Pitch(canvas) { this.c = canvas; this.g = canvas.getContext('2d'); this.trail = []; }
Pitch.prototype.size = function () { const w = this.c.clientWidth || 360, dpr = Math.min(2, window.devicePixelRatio || 1); this.w = w; this.h = Math.round(w * 68 / 105); this.c.width = w * dpr; this.c.height = this.h * dpr; this.c.style.height = this.h + 'px'; this.g.setTransform(dpr * w / 105, 0, 0, dpr * w / 105, 0, 0); };
Pitch.prototype.field = function () {
  const g = this.g; for (let i = 0; i < 14; i++) { g.fillStyle = i % 2 ? '#2e8a3c' : '#2a8037'; g.fillRect(i * 7.5, 0, 7.5, 68); }
  g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 0.32; g.strokeRect(0.4, 0.4, 104.2, 67.2);
  g.beginPath(); g.moveTo(52.5, 0.4); g.lineTo(52.5, 67.6); g.stroke();
  g.beginPath(); g.arc(52.5, 34, 9.15, 0, Math.PI * 2); g.stroke();
  [[0, 1], [105, -1]].forEach(([x, d]) => { g.strokeRect(Math.min(x, x + d * 16.5), 13.85, 16.5, 40.3); g.strokeRect(Math.min(x, x + d * 5.5), 24.85, 5.5, 18.3); g.beginPath(); g.arc(x + d * 11, 34, 9.15, d > 0 ? -0.93 : Math.PI - 0.93, d > 0 ? 0.93 : Math.PI + 0.93); g.stroke(); g.fillStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.arc(x + d * 11, 34, 0.35, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(d > 0 ? -1.6 : 105, 30.34, 1.6, 7.32); });
  g.beginPath(); g.arc(52.5, 34, 0.4, 0, 7); g.fillStyle = '#fff'; g.fill();
};
Pitch.prototype.draw = function (m, a) {
  const g = this.g; this.field();
  const L = (p, k) => p[k === 'x' ? 'px' : 'py'] + (p[k] - p[k === 'x' ? 'px' : 'py']) * a;
  const b = m.ball, bf = b.fl;
  if (bf && bf.kind === 'pass') { g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 0.22; g.setLineDash([0.8, 0.8]); g.beginPath(); g.moveTo(bf.x0, bf.y0); g.lineTo(bf.x1, bf.y1); g.stroke(); g.setLineDash([]); }
  for (const p of m.P) {
    const x = L(p, 'x'), y = L(p, 'y'), T = m.T[p.side];
    g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(x + 0.3, y + 0.5, 1.6, 0.9, 0, 0, 7); g.fill();
    g.fillStyle = p.role === 'GK' ? T.gkColor : T.color; g.beginPath(); g.arc(x, y, 1.45, 0, 7); g.fill();
    g.lineWidth = 0.28; g.strokeStyle = b.owner === p ? '#fff' : 'rgba(255,255,255,.75)'; g.stroke();
    if (b.owner === p) { g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 0.2; g.beginPath(); g.arc(x, y, 2.3, 0, 7); g.stroke(); }
    g.fillStyle = p.role === 'GK' ? '#0b0f24' : '#06101f'; g.font = '900 1.35px system-ui,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(p.num), x, y + 0.05);
  }
  // ball (with a little height for long passes and shots)
  let bx, by; if (b.owner) { const o = b.owner, d = m.dir(o.side); bx = L(o, 'x') + d * 0.9; by = L(o, 'y'); } else { bx = b.px + (b.x - b.px) * a; by = b.py + (b.y - b.py) * a; }
  this.trail.push([bx, by]); if (this.trail.length > 7) this.trail.shift();
  if (bf && bf.kind === 'shot') { g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = 0.5; g.beginPath(); this.trail.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); }
  const h = b.h || 0; g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(bx + 0.2 + h * 0.3, by + 0.4 + h * 0.4, 0.75, 0.45, 0, 0, 7); g.fill();
  g.fillStyle = '#fff'; g.beginPath(); g.arc(bx, by - h * 0.6, 0.7 + h * 0.12, 0, 7); g.fill(); g.strokeStyle = '#111'; g.lineWidth = 0.12; g.stroke();
};

// ---------- ☁️ saving (Firebase) ----------
const F = () => window.fb11;
async function fbLoad() {
  if (window.fb11) return window.fb11;
  const m = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
  window.fb11 = m; return m;
}
W.load = async function () {
  const f = await fbLoad(); const uid = window.uidNow && window.uidNow(); if (!uid) return null;
  try { const s = await f.getDoc(f.doc(db(), 'w11Clubs', uid)); W.me = s.exists() ? s.data() : null; } catch (e) { W.me = W.me || null; }
  return W.me;
};
W.save = async function (patch) {
  const f = await fbLoad(); Object.assign(W.me, patch);
  try { await f.updateDoc(f.doc(db(), 'w11Clubs', window.uidNow()), patch); } catch (e) { console.warn('11W save', e); toast('⚠️ Not saved. Check your internet.'); }
};
W.create = async function (ci) {
  const f = await fbLoad(), uid = window.uidNow(), c = W.club(ci), ids = W.squadIds(ci);
  const base = { uid, tag: String(window.me ? window.me() : '').toLowerCase(), club: ci, name: c.name, short: c.short, form: '4-4-2', ids, ovr: W.avg(ids), stats: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 }, boot: [], fr: 0, createdAt: Date.now() };
  // 🏅 Pioneer 50: the first 50 managers get the founder pack
  for (let tryN = 0; tryN < 3; tryN++) {
    let n = 0; try { const s = await f.getDoc(f.doc(db(), 'w11meta', 'pioneers')); n = s.exists() ? (s.data().count || 0) : 0; } catch (e) {}
    const pio = n < 50;
    const doc = { ...base, pioneer: pio, pioneerNo: pio ? n + 1 : 0, coins: pio ? 600000 : 250000, gems: pio ? 150 : 50, energy: pio ? 25 : 10, med: pio ? 15 : 5 };
    try {
      const bt = f.writeBatch(db());
      bt.set(f.doc(db(), 'w11Clubs', uid), doc);
      if (pio) bt.set(f.doc(db(), 'w11meta', 'pioneers'), { count: n + 1 });
      await bt.commit(); W.me = doc; return doc;
    } catch (e) { if (!pio) { console.warn(e); toast('⚠️ Could not create your club. Try again.'); return null; } }
  }
  return null;
};

// ---------- 🏕️ Boot Camp (5 timed matches) ----------
W.BOOT = [
  { gap: 0, opp: 600, tip: 'Match 1 · The basics. Watch your cyan team move on the radar. Every 30 seconds a 📢 touchline moment flashes: tap a shout to change how your team plays.' },
  { gap: 5, opp: 601, tip: 'Match 2 · Formations. Before kick-off (or at half time) open 📐 and try a new shape. 4-3-3 attacks, 5-4-1 defends.' },
  { gap: 5, opp: 602, tip: 'Match 3 · Substitutions. You have 5 subs. Tap 🔁, pick the player coming off, then the one coming on.' },
  { gap: 30, opp: 603, tip: 'Match 4 · Cards & wear and tear. Fouls bring yellow cards; two yellows = red. Rested players play better; from the league on, fitness and injuries count.' },
  { gap: 60, opp: 604, tip: 'Match 5 · Grand Finale. Use everything: the right shout at the right moment wins games. Win or not, you graduate to the 11 Wonders league!' },
];
W.bootNext = function () {
  const b = (W.me && W.me.boot) || [], i = b.length; if (i >= 5) return null;
  const prev = b[i - 1], at = prev ? prev.at + W.BOOT[i].gap * 60000 : 0;
  return { i, at, ready: Date.now() >= at, ...W.BOOT[i] };
};
// 15-minute lockdown: no friendly when an official match is less than 15 minutes away
W.lockdown = function () { const n = W.bootNext(); if (!n) return null; const ms = n.at - Date.now(); return ms < 15 * 60000 ? (ms <= 0 ? 'Your Boot Camp match is ready. Play it first!' : `Your Boot Camp match starts in ${Math.ceil(ms / 60000)} min. Friendlies are locked 15 minutes before official matches.`) : null; };

// ---------- 📱 screens ----------
const CSS = `
#w11{position:fixed;inset:0;z-index:300;background:#070b18;color:#e2e8f0;display:flex;flex-direction:column;font-family:inherit}
#w11 .hd{display:flex;align-items:center;gap:10px;padding:10px 12px;padding-top:max(10px,env(safe-area-inset-top));border-bottom:1px solid rgba(255,255,255,.07)}
#w11 .hd b{font-weight:900;letter-spacing:.06em;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent}
#w11 .bk{width:36px;height:36px;border-radius:12px;background:rgba(255,255,255,.06);font-size:16px}
#w11 .chips{margin-left:auto;display:flex;gap:6px;font-size:10px;font-weight:900}#w11 .chips span{padding:4px 8px;border-radius:999px;background:rgba(255,255,255,.06)}
#w11 .bd{flex:1;overflow-y:auto;padding:12px;padding-bottom:max(18px,env(safe-area-inset-bottom))}
#w11 .card{border-radius:18px;padding:14px;margin-bottom:12px;border:1px solid transparent;background:linear-gradient(#0c1228,#0c1228) padding-box,linear-gradient(135deg,rgba(34,211,238,.5),rgba(168,85,247,.4),rgba(255,45,149,.45)) border-box}
#w11 .btn{width:100%;padding:13px;border-radius:14px;font-weight:900;font-size:13px;color:#0b0f24;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);box-shadow:0 0 18px rgba(168,85,247,.35)}
#w11 .btn2{width:100%;padding:12px;border-radius:14px;font-weight:800;font-size:12px;color:#e2e8f0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)}
#w11 .btn:disabled,#w11 .btn2:disabled{opacity:.45}
#w11 .row{display:flex;align-items:center;gap:8px;padding:8px 4px;border-bottom:1px solid rgba(255,255,255,.05);font-size:12px}
#w11 .ovr{min-width:30px;text-align:center;font-weight:900;border-radius:8px;padding:3px 0;color:#0b0f24}
#w11 .pos{min-width:34px;font-size:10px;font-weight:900;color:#94a3b8}
#w11 .sel{outline:2px solid #22d3ee;border-radius:10px;background:rgba(34,211,238,.08)}
#w11 .sb{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#0b1024;border-radius:14px;margin-bottom:8px}
#w11 .sb .sc{font-size:24px;font-weight:900;letter-spacing:.06em}#w11 .sb .tm{font-size:11px;font-weight:900;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,.08)}
#w11 canvas{width:100%;display:block;border-radius:14px;box-shadow:0 0 22px rgba(34,211,238,.25),0 0 46px rgba(168,85,247,.2)}
#w11 .tick{margin-top:8px;font-size:12px;min-height:54px}#w11 .tick p{padding:3px 0;color:#cbd5e1}#w11 .tick p:first-child{color:#fff;font-weight:800}
#w11 .shouts{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px}#w11 .shouts button{padding:10px 2px;border-radius:12px;font-size:10px;font-weight:900;background:rgba(255,255,255,.06);color:#e2e8f0;border:1px solid rgba(255,255,255,.08)}
#w11 .shouts button.on{background:linear-gradient(135deg,#22d3ee,#a855f7);color:#0b0f24}
#w11 .pulse{animation:w11p 1s ease-in-out 4}@keyframes w11p{0%,100%{box-shadow:0 0 0 rgba(255,45,149,0)}50%{box-shadow:0 0 22px rgba(255,45,149,.9)}}
#w11 .alert{margin-top:8px;padding:8px 10px;border-radius:12px;font-size:11px;font-weight:900;color:#fff;background:linear-gradient(90deg,rgba(255,45,149,.35),rgba(168,85,247,.25));display:none}
#w11 .ov{position:absolute;inset:0;background:rgba(5,8,20,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px;text-align:center;z-index:5}
#w11 .steps{display:flex;gap:6px;margin:10px 0}#w11 .steps i{flex:1;height:8px;border-radius:99px;background:rgba(255,255,255,.1)}#w11 .steps i.done{background:linear-gradient(90deg,#22d3ee,#a855f7)}#w11 .steps i.now{background:#ff2d95}
#w11 .badge{width:46px;height:52px;flex-shrink:0}
#w11 .tip{font-size:11px;color:#cbd5e1;background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.25);border-radius:12px;padding:9px;margin-top:8px}`;
const ovrColor = (o) => o >= 85 ? '#facc15' : o >= 75 ? '#22d3ee' : o >= 65 ? '#a3e635' : o >= 55 ? '#e2e8f0' : '#94a3b8';
const badge = (c, short) => `<svg class="badge" viewBox="0 0 46 52"><defs><linearGradient id="bg${c.idx}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${c.hue},80%,55%)"/><stop offset="1" stop-color="hsl(${(c.hue + 60) % 360},80%,35%)"/></linearGradient></defs><path d="M23 2 L44 9 L41 34 Q37 45 23 50 Q9 45 5 34 L2 9 Z" fill="url(#bg${c.idx})" stroke="#fff" stroke-width="2"/><text x="23" y="31" text-anchor="middle" font-size="13" font-weight="900" fill="#fff" font-family="system-ui">${esc(short || c.short)}</text></svg>`;

W.ui = function (html, title, back) {
  let el = document.getElementById('w11');
  if (!el) { const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); document.body.insertAdjacentHTML('beforeend', '<div id="w11"></div>'); el = document.getElementById('w11'); }
  const me = W.me;
  el.innerHTML = `<div class="hd"><button class="bk" onclick="${back || 'W11.close()'}">←</button><b>${esc(title || '11 WONDERS')}</b>${me ? `<div class="chips"><span>🪙 ${fmt(me.coins)}</span><span>💎 ${fmt(me.gems)}</span></div>` : ''}</div><div class="bd" id="w11b">${html}</div>`;
  return el;
};
W.close = function () { W.stopLoop(); document.getElementById('w11')?.remove(); };
W.open = async function () {
  if (window.needSignIn && window.needSignIn('play 11 Wonders')) return;
  W.ui('<p style="text-align:center;padding:40px 0;color:#94a3b8">Loading your world…</p>');
  await W.load();
  if (W.resumeLive()) return;
  W.me ? W.home() : W.takeover();
};

W.takeover = function () {
  const r = rng(hash(WORLD + ':offer:' + (window.uidNow ? window.uidNow() : '') + ':' + Math.floor(Date.now() / 864e5)));
  const offers = []; while (offers.length < 6) { const ci = 434 + Math.floor(r() * 896); if (!offers.includes(ci)) offers.push(ci); }
  W._offers = offers;
  W.ui(`<div class="card"><p style="font-size:18px;font-weight:900">Welcome, manager 👔</p><p style="font-size:12px;color:#94a3b8;margin-top:4px">The world is already playing. Six clubs need a new manager <b>right now</b>, mid-season. Pick one and take over.</p></div>
    ${offers.map((ci, i) => { const c = W.club(ci), ids = W.squadIds(ci), star = ids.map(W.player).sort((a, b) => b.ovr - a.ovr)[0], rr = rng(hash(WORLD + ':tab:' + ci)), pos = 1 + Math.floor(rr() * 14), pts = Math.max(1, Math.round(13 * 3 * (1 - pos / 16) * (0.6 + rr() * 0.4)));
      return `<div class="card" style="display:flex;gap:12px;align-items:center">${badge(c)}<div style="flex:1;min-width:0"><p style="font-weight:900">${esc(c.name)}</p><p style="font-size:11px;color:#94a3b8">${pos}${['st', 'nd', 'rd'][pos - 1] || 'th'} of 14 · ${pts} pts · Matchday 13 · Team ${W.avg(ids)} OVR</p><p style="font-size:11px;color:#cbd5e1">⭐ ${star.flag} ${esc(star.name)} · ${star.ovr}</p></div><button class="btn" style="width:auto;padding:10px 14px" onclick="W11.pickClub(${i})">Take over</button></div>`; }).join('')}`);
};
W.pickClub = async function (i) {
  const ci = W._offers[i]; if (ci == null) return;
  W.ui('<p style="text-align:center;padding:40px 0;color:#94a3b8">Signing your contract…</p>');
  const d = await W.create(ci); if (!d) return W.takeover();
  W.ui(`<div class="card" style="text-align:center">${badge(W.club(ci))}<p style="font-size:20px;font-weight:900;margin-top:8px">You're the new manager of ${esc(d.name)}!</p>
    ${d.pioneer ? `<p style="margin-top:10px;font-size:13px;font-weight:900;color:#facc15">🛡️ FOUNDER SHIELD · Pioneer #${d.pioneerNo} of 50</p>` : ''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;font-size:13px;font-weight:900"><div class="card" style="margin:0">🪙 ${fmt(d.coins)}<br><span style="font-size:10px;color:#94a3b8">GG Coins</span></div><div class="card" style="margin:0">💎 ${d.gems}<br><span style="font-size:10px;color:#94a3b8">Gems</span></div><div class="card" style="margin:0">⚡ ${d.energy}<br><span style="font-size:10px;color:#94a3b8">Energy Packs</span></div><div class="card" style="margin:0">🩹 ${d.med}<br><span style="font-size:10px;color:#94a3b8">Med-Packs</span></div></div>
    <button class="btn" style="margin-top:14px" onclick="W11.home()">Let's go ⚽</button></div>`);
};

W.home = function () {
  const me = W.me, c = W.club(me.club), n = W.bootNext(), s = me.stats || {};
  const boot = (me.boot || []).length;
  W.ui(`<div class="card" style="display:flex;gap:12px;align-items:center">${badge(c, me.short)}<div style="flex:1"><p style="font-weight:900;font-size:16px">${esc(me.name)} ${me.pioneer ? '<span style="font-size:10px;color:#facc15">🛡️ Founder</span>' : ''}</p><p style="font-size:11px;color:#94a3b8">Team ${W.avg(me.ids)} OVR · ${esc(me.form)} · P${s.p || 0} W${s.w || 0} D${s.d || 0} L${s.l || 0}</p><p style="font-size:11px;color:#94a3b8">⚡ ${me.energy} · 🩹 ${me.med}</p></div></div>
    <div class="card"><p style="font-weight:900">🏕️ Boot Camp · ${boot}/5</p><div class="steps">${[0, 1, 2, 3, 4].map(i => `<i class="${i < boot ? 'done' : i === boot ? 'now' : ''}"></i>`).join('')}</div>
      ${n ? `<div class="tip">${esc(n.tip)}</div>${n.ready ? `<button class="btn" style="margin-top:10px" onclick="W11.prematch('boot')">▶ Play Boot Camp match ${n.i + 1}</button>` : `<button class="btn" style="margin-top:10px" disabled id="w11cd">Unlocks in …</button>`}`
        : `<p style="font-size:12px;color:#a3e635;margin-top:6px">🎓 Graduated! You're promoted to the 11 Wonders league. The league season opens in the next update.</p>`}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="btn2" onclick="W11.squad()">👕 Squad & tactics</button><button class="btn2" onclick="W11.friendly()">🤝 Friendly</button></div>`);
  if (n && !n.ready) { const tick = () => { const b = document.getElementById('w11cd'); if (!b) return; const ms = n.at - Date.now(); if (ms <= 0) return W.home(); b.textContent = `Unlocks in ${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`; setTimeout(tick, 1000); }; tick(); }
};

W.squad = function (sel) {
  const me = W.me, P = me.ids.map(W.player);
  const row = (p, i) => `<div class="row ${sel === i ? 'sel' : ''}" onclick="W11.swap(${i})"><span class="pos">${i < 11 ? W.shape(me.form)[i].role : 'SUB'}</span><span class="ovr" style="background:${ovrColor(p.ovr)}">${p.ovr}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.flag} <b>${esc(p.name)}</b> <span style="color:#94a3b8">· ${p.pos} · ${p.age}y</span></span><span style="font-size:10px;color:#94a3b8">#${p.num}</span></div>`;
  W.ui(`<div class="card"><p style="font-weight:900">📐 Formation</p><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${Object.keys(W.FORMS).map(f => `<button onclick="W11.setForm('${f}')" style="padding:7px 10px;border-radius:10px;font-size:11px;font-weight:900;${f === me.form ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.06)'}">${f}</button>`).join('')}</div></div>
    <div class="card"><p style="font-weight:900">Starting XI <span style="font-size:10px;color:#94a3b8;font-weight:700">· tap a player, then another to swap</span></p>${P.slice(0, 11).map(row).join('')}<p style="font-weight:900;margin-top:10px">Bench</p>${P.slice(11).map((p, k) => row(p, k + 11)).join('')}</div>`, '👕 Squad', 'W11.home()');
};
W.swap = async function (i) {
  if (W._sel == null) { W._sel = i; return W.squad(i); }
  const j = W._sel; W._sel = null; if (i === j) return W.squad();
  const ids = W.me.ids.slice(); [ids[i], ids[j]] = [ids[j], ids[i]];
  await W.save({ ids, ovr: W.avg(ids) }); W.squad();
};
W.setForm = async function (f) { await W.save({ form: f }); W.squad(); };

W.friendly = function () {
  const lock = W.lockdown();
  W.ui(`${lock ? `<div class="tip" style="border-color:rgba(255,45,149,.4);background:rgba(255,45,149,.08)">🔒 ${esc(lock)}</div>` : ''}
    <div class="card"><p style="font-weight:900">🤝 Friendlies</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">Test your tactics with no risk: friendlies never tire your players, give cards or injuries.</p>
      <button class="btn" style="margin-top:10px" ${lock ? 'disabled' : ''} onclick="W11.prematch('cpu')">🌍 Play a random club</button>
      <div style="display:flex;gap:6px;margin-top:10px"><input id="w11f" placeholder="Friend's gamertag" style="flex:1;padding:11px;border-radius:12px;background:#0b1024;border:1px solid rgba(34,211,238,.3);color:#fff;font-size:13px"><button class="btn" style="width:auto;padding:0 14px" ${lock ? 'disabled' : ''} onclick="W11.challenge()">Challenge</button></div></div>`, '🤝 Friendly', 'W11.home()');
};
W.challenge = async function () {
  const tag = String((document.getElementById('w11f') || {}).value || '').replace('@', '').trim().toLowerCase(); if (!tag) return;
  const f = await fbLoad();
  try { const qs = await f.getDocs(f.query(f.collection(db(), 'w11Clubs'), f.where('tag', '==', tag), f.limit(1))); if (qs.empty) { toast(`@${tag} hasn't started a club yet. Invite them!`); return; } const o = qs.docs[0].data(); W.prematch('friend', o); }
  catch (e) { toast('⚠️ Could not find that manager'); }
};

// ---------- 🏟️ match flow ----------
W.teamInfo = (src, side) => ({ name: src.name, short: src.short || W.club(src.club != null ? src.club : src.idx).short, color: side === 0 ? '#22d3ee' : '#ff2d95', gkColor: side === 0 ? '#facc15' : '#a3e635', form: src.form || '4-4-2', ids: src.ids });
W.prematch = function (kind, opp) {
  const me = W.me; let o;
  if (kind === 'boot') { const n = W.bootNext(); if (!n || !n.ready) return W.home(); const c = W.club([700, 650, 500, 330, 260][n.i] + (me.club % 50)); o = { name: c.name, short: c.short, club: c.idx, ids: W.squadIds(c.idx), form: ['4-4-2', '4-3-3', '4-2-3-1', '4-4-2', '4-3-3'][n.i] }; }
  else if (kind === 'friend') o = { name: opp.name, short: opp.short, club: opp.club, ids: opp.ids, form: opp.form, uid: opp.uid, tag: opp.tag };
  else { const ci = 210 + Math.floor(Math.random() * 1100); const c = W.club(ci); o = { name: c.name, short: c.short, club: ci, ids: W.squadIds(ci), form: pick(Math.random, Object.keys(W.FORMS)) }; }
  if (kind !== 'boot' && W.lockdown()) { toast('🔒 ' + W.lockdown()); return; }
  const live = { kind, seed: (Math.random() * 4294967295) >>> 0, startAt: Date.now() + 3000, home: W.teamInfo(me, 0), away: W.teamInfo(o, 1), cmds: [], boot: kind === 'boot' ? W.bootNext().i : null, opp: { uid: o.uid || null, tag: o.tag || null } };
  try { localStorage.setItem('w11_live', JSON.stringify(live)); } catch (e) {}
  W.play(live);
};
W.resumeLive = function () {
  let live = null; try { live = JSON.parse(localStorage.getItem('w11_live') || 'null'); } catch (e) {}
  if (!live || !W.me) return false;
  if (Date.now() > live.startAt + TOTAL * 1000 + 5000) { const m = W.simulate(live.home, live.away, live.seed, live.cmds); W.finish(live, m, true); return true; }
  W.play(live); return true;
};
// real time → engine steps (the 30-second half-time break is part of the 4 minutes; nothing ever pauses)
const playedAt = (live) => { const e = (Date.now() - live.startAt) / 1000; if (e <= 0) return 0; if (e <= HALF) return e; if (e <= HALF + BREAK) return HALF; return Math.min(LEN, e - BREAK); };
W.stopLoop = function () { if (W._raf) cancelAnimationFrame(W._raf); W._raf = null; clearInterval(W._iv); };
W.play = function (live) {
  W.stopLoop(); W.live = live;
  const m = W.simulate(live.home, live.away, live.seed, live.cmds, Math.floor(playedAt(live) / DT));
  m.T[0].ai = false; W.m = m;
  const n = live.boot != null ? W.BOOT[live.boot] : null;
  W.ui(`<div style="position:relative"><div class="sb"><span style="font-weight:900;color:#22d3ee">${esc(m.T[0].short)}</span><span class="sc" id="w11sc">0–0</span><span style="font-weight:900;color:#ff2d95">${esc(m.T[1].short)}</span><span class="tm" id="w11tm">1'</span></div>
    <canvas id="w11c"></canvas>
    <div class="alert" id="w11al">📢 TOUCHLINE MOMENT · shout now!</div>
    <div class="shouts" id="w11sh">${[['attack', '📣 Attack'], ['tight', '🧱 Tight'], ['press', '⚡ Press'], ['calm', '🧘 Calm']].map(([k, l]) => `<button data-k="${k}" onclick="W11.shout('${k}')">${l}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px"><button class="btn2" onclick="W11.subMenu()">🔁 Subs (<span id="w11subs">5</span>)</button><button class="btn2" onclick="W11.formMenu()">📐 Formation</button></div>
    <div class="tick" id="w11tk"></div>${n ? `<div class="tip">${esc(n.tip)}</div>` : ''}<div id="w11ov"></div></div>`, live.kind === 'boot' ? '🏕️ Boot Camp' : '🤝 Friendly', 'W11.leaveMatch()');
  const pitch = new Pitch(document.getElementById('w11c')); pitch.size(); W._pitch = pitch; window.addEventListener('resize', () => pitch.size(), { once: true });
  let acc = 0, last = performance.now(), seenEv = 0;
  const frame = (now) => {
    if (!document.getElementById('w11c')) return W.stopLoop();
    const ft = playedAt(live) / DT, target = Math.floor(ft);
    // catch up (e.g. after the phone was locked) without drawing every step
    let guard = 0; while (m.tick < target && !m.over && guard++ < 5000) m.step();
    pitch.draw(m, clamp(ft - target, 0, 1));
    const sc = document.getElementById('w11sc'); if (sc) sc.textContent = `${m.T[0].score}–${m.T[1].score}`;
    const el = (Date.now() - live.startAt) / 1000, tm = document.getElementById('w11tm');
    if (tm) tm.textContent = el < 0 ? 'Kick-off…' : el > HALF && el < HALF + BREAK ? `HT · ${Math.ceil(HALF + BREAK - el)}s` : m.over ? 'FT' : m.minute() + "'";
    if (m.ev.length !== seenEv) { const news = m.ev.slice(seenEv); seenEv = m.ev.length; W.feed(m); if (news.some(e => e.k === 'alert')) W.pulse(); if (news.some(e => e.k === 'goal' && e.side === 0) && navigator.vibrate) try { navigator.vibrate([80, 40, 120]); } catch (e) {} }
    W.halfTime(el > HALF && el < HALF + BREAK, m);
    const subs = document.getElementById('w11subs'); if (subs) subs.textContent = m.T[0].subsLeft;
    if (m.over && el > TOTAL) { W.stopLoop(); return W.finish(live, m, false); }
    W._raf = requestAnimationFrame(frame);
  };
  W._raf = requestAnimationFrame(frame);
  W.feed(m);
};
W.feed = function (m) {
  const el = document.getElementById('w11tk'); if (!el) return;
  const show = m.ev.filter(e => !['tackle', 'int'].includes(e.k)).slice(-4).reverse();
  el.innerHTML = show.map(e => `<p><span style="color:#94a3b8">${e.min}'</span> ${esc(e.txt)}</p>`).join('');
  const cur = Object.keys(m.T[0].mods).find(k => m.T[0].mods[k]); document.querySelectorAll('#w11sh button').forEach(b => b.classList.toggle('on', b.dataset.k === cur));
};
W.pulse = function () { const a = document.getElementById('w11al'), sh = document.getElementById('w11sh'); if (!a) return; a.style.display = 'block'; sh.classList.remove('pulse'); void sh.offsetWidth; sh.classList.add('pulse'); clearTimeout(W._pT); W._pT = setTimeout(() => { a.style.display = 'none'; }, 8000); };
W.command = function (c) { const m = W.m, live = W.live; if (!m || m.over) return; m.cmd(0, c); live.cmds = m.cmds.filter(x => x.side === 0); try { localStorage.setItem('w11_live', JSON.stringify(live)); } catch (e) {} W.feed(m); };
W.shout = function (k) { const cur = Object.keys(W.m.T[0].mods).find(x => W.m.T[0].mods[x]); W.command({ shout: cur === k ? 'none' : k }); };
W.subMenu = function () {
  const m = W.m, t = m.T[0]; if (t.subsLeft <= 0) return toast('No subs left');
  const ov = document.getElementById('w11ov');
  ov.innerHTML = `<div class="ov" style="justify-content:flex-start;overflow:auto"><p style="font-weight:900;margin-bottom:8px">🔁 Who comes off?</p>${t.ids.slice(1, 11).filter(id => m.P.some(p => p.id === id)).map(id => { const p = W.player(id); return `<button class="btn2" style="margin-bottom:6px;text-align:left" onclick="W11.subOn('${id}')">${p.flag} ${esc(p.name)} · ${p.pos} · ${p.ovr}</button>`; }).join('')}<button class="btn2" onclick="document.getElementById('w11ov').innerHTML=''">Cancel</button></div>`;
};
W.subOn = function (out) {
  const t = W.m.T[0], ov = document.getElementById('w11ov');
  ov.innerHTML = `<div class="ov" style="justify-content:flex-start;overflow:auto"><p style="font-weight:900;margin-bottom:8px">Who comes on for ${esc(W.player(out).short)}?</p>${t.ids.slice(11).map(id => { const p = W.player(id); return `<button class="btn2" style="margin-bottom:6px;text-align:left" onclick="W11.command({sub:['${out}','${id}']}); document.getElementById('w11ov').innerHTML=''">${p.flag} ${esc(p.name)} · ${p.pos} · ${p.ovr}</button>`; }).join('')}<button class="btn2" onclick="document.getElementById('w11ov').innerHTML=''">Cancel</button></div>`;
};
W.formMenu = function () {
  const ov = document.getElementById('w11ov');
  ov.innerHTML = `<div class="ov"><p style="font-weight:900;margin-bottom:10px">📐 Change formation</p><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">${Object.keys(W.FORMS).map(f => `<button onclick="W11.command({form:'${f}'}); document.getElementById('w11ov').innerHTML=''" style="padding:9px 11px;border-radius:10px;font-size:12px;font-weight:900;${f === W.m.T[0].form ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.08)'}">${f}</button>`).join('')}</div><button class="btn2" style="margin-top:12px" onclick="document.getElementById('w11ov').innerHTML=''">Cancel</button></div>`;
};
W.halfTime = function (on, m) {
  const ov = document.getElementById('w11ov'); if (!ov) return;
  if (on && !ov.querySelector('[data-ht]') && !ov.innerHTML) {
    const a = m.T[0], b = m.T[1], pt = a.poss + b.poss || 1;
    ov.innerHTML = `<div class="ov" data-ht><p style="font-size:12px;color:#94a3b8;font-weight:900">HALF TIME · 30 seconds</p><p style="font-size:30px;font-weight:900;margin:6px 0">${a.score}–${b.score}</p>
      <table style="width:100%;max-width:300px;font-size:12px;margin:8px 0"><tr><td>${Math.round(a.poss / pt * 100)}%</td><td style="color:#94a3b8">Possession</td><td>${Math.round(b.poss / pt * 100)}%</td></tr><tr><td>${a.shots}</td><td style="color:#94a3b8">Shots</td><td>${b.shots}</td></tr><tr><td>${a.onT}</td><td style="color:#94a3b8">On target</td><td>${b.onT}</td></tr><tr><td>${a.passes}</td><td style="color:#94a3b8">Passes</td><td>${b.passes}</td></tr></table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;max-width:300px"><button class="btn2" onclick="W11.subMenu()">🔁 Subs</button><button class="btn2" onclick="W11.formMenu()">📐 Formation</button></div></div>`;
  } else if (!on && ov.querySelector('[data-ht]')) ov.innerHTML = '';
};
W.leaveMatch = function () { W.stopLoop(); toast('⏱️ The match keeps playing. Come back any time.'); W.home(); };
W.finish = async function (live, m, offline) {
  try { localStorage.removeItem('w11_live'); } catch (e) {}
  const me = W.me, gf = m.T[0].score, ga = m.T[1].score, res = gf > ga ? 'w' : gf < ga ? 'l' : 'd';
  const s = { ...(me.stats || {}) }; s.p = (s.p || 0) + 1; s[res] = (s[res] || 0) + 1; s.gf = (s.gf || 0) + gf; s.ga = (s.ga || 0) + ga;
  const patch = { stats: s };
  if (live.kind === 'boot') patch.boot = [...(me.boot || []), { at: Date.now(), gf, ga }].slice(0, 5); else patch.fr = (me.fr || 0) + 1;
  await W.save(patch);
  window.addXP && window.addXP(res === 'w' ? 10 : 5, 'game');
  if (live.kind === 'friend' && live.opp && live.opp.uid && window.notify) window.notify(live.opp.uid, 'game', { text: `⚽ 11 Wonders: ${me.name} played your club in a friendly · ${gf}–${ga}`, postId: 'w11' });
  const a = m.T[0], b = m.T[1], pt = a.poss + b.poss || 1, goals = m.ev.filter(e => e.k === 'goal');
  const graduated = live.kind === 'boot' && patch.boot.length >= 5;
  W.ui(`<div class="card" style="text-align:center">${offline ? '<p style="font-size:11px;color:#94a3b8">Played while you were away</p>' : ''}<p style="font-size:12px;font-weight:900;color:${res === 'w' ? '#a3e635' : res === 'l' ? '#ff2d95' : '#facc15'}">${res === 'w' ? 'WIN' : res === 'l' ? 'DEFEAT' : 'DRAW'}</p>
    <p style="font-size:34px;font-weight:900">${gf}–${ga}</p><p style="font-size:12px;color:#94a3b8">${esc(a.name)} vs ${esc(b.name)}</p>
    <div style="text-align:left;margin-top:10px;font-size:12px">${goals.map(g => `<p>${g.min}' ${esc(g.txt.replace(/ \d+–\d+$/, ''))}</p>`).join('') || '<p style="color:#94a3b8">No goals</p>'}</div>
    <p style="font-size:11px;color:#94a3b8;margin-top:8px">Possession ${Math.round(a.poss / pt * 100)}% · Shots ${a.shots}–${b.shots} · On target ${a.onT}–${b.onT}</p>
    ${graduated ? '<p style="margin-top:12px;font-weight:900;color:#a3e635">🎓 Boot Camp complete! You are promoted to the 11 Wonders league.</p>' : ''}
    <button class="btn" style="margin-top:14px" onclick="W11.home()">Continue</button></div>`, 'Full time');
};
})();
