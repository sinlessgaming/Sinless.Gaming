// =====================================================================
// ⚽ 11 WONDERS · Score Manager — G1 (loaded only when you open it)
// Your club · procedural world · 15 formations · 4-minute live match (2D radar, 60 fps, no pauses)
// · 30-second touchline shouts · subs · 5-match Boot Camp · friendlies + 15-minute lockdown · Pioneer 50
// G3a: transfer market (15 live auctions), youth draft, release players, Pioneer 150-OVR wonders, squads up to 25
// G3b: cups, club HQ, Hall of Fame · G4: kits & crests, rare GG Coins, 3D replays / ceremonies / live 3D (src/w11g4.js)
// Everything about players comes from their ID, so thousands of players cost no storage.
// =====================================================================
(function () {
'use strict';
const W = window.W11 = window.W11 || {};
/* =====================================================================
   ⚽ 11 WONDERS · shared core (G2 + G3a + G3b + G4). build.sh pastes this SAME block into w11.js and worker.js,
   so phones and the worker always agree. Only + - * / and sqrt are used for anything that decides
   a result, so every phone (Android or iPhone) gets exactly the same numbers.
   ===================================================================== */
const W11C = (() => {
const WORLD = 'w11s1';
const hash = (s) => { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
const rng = (seed) => { let s = (seed >>> 0) || 0x9e3779b9; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; };
const pick = (r, a) => a[Math.floor(r() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* 🌍 people from everywhere (made-up combinations) */
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
const POS_TEMPLATE = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'GK', 'DEF', 'DEF', 'MID', 'MID', 'FWD', 'FWD'];
const NUMS = [1, 2, 4, 5, 3, 6, 8, 10, 7, 9, 11, 13, 15, 16, 14, 18, 19, 20];

const club = function (idx) {
  const r = rng(hash(WORLD + ':club:' + idx));
  if (idx >= 100000) { const b = 47 + Math.floor(r() * 9); return { idx, tier: 6, name: 'My Club', short: 'MYC', hue: Math.floor(r() * 360), base: b, user: true }; }
  const tier = idx < 14 ? 1 : idx < 42 ? 2 : idx < 98 ? 3 : idx < 210 ? 4 : idx < 434 ? 5 : 6;
  const name = pick(r, CITY) + ' ' + pick(r, SUFFIX);
  const hue = Math.floor(r() * 360);
  return { idx, tier, name, short: name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase(), hue, base: [78, 72, 67, 62, 57, 52][tier - 1] + Math.floor(r() * 6) };
};
const attrs = (r, pos, ovr) => {
  const a = (bias) => clamp(Math.round(ovr + bias + (r() - 0.5) * 14), 25, 99);
  return pos === 'GK' ? { pac: a(-18), sho: a(-35), pas: a(-12), dri: a(-25), def: a(-10), gk: a(4) }
    : pos === 'DEF' ? { pac: a(-2), sho: a(-18), pas: a(-5), dri: a(-10), def: a(6), gk: 20 }
    : pos === 'MID' ? { pac: a(0), sho: a(-4), pas: a(6), dri: a(4), def: a(-6), gk: 20 }
    : { pac: a(5), sho: a(7), pas: a(-3), dri: a(4), def: a(-22), gk: 20 };
};
const named = (r) => { const cult = pickCult(r), C = CULT[cult], first = pick(r, C[1].split(' ')), last = pick(r, C[2].split(' ')); return { cult, flag: C[0], name: first + ' ' + last, short: last.length > 11 ? last.slice(0, 10) + '.' : last }; };
/* the original G1 player (season 1) — must never change */
const base = function (id) {
  const [ci, slot] = String(id).split('-').map(Number), c = club(ci), r = rng(hash(WORLD + ':p:' + id));
  const nm = named(r), pos = POS_TEMPLATE[slot] || 'MID';
  const age = 16 + Math.floor(Math.pow(r(), 0.8) * 20);
  const peak = 1 - Math.abs(age - 27) / 22;
  let ovr = Math.round(c.base - 6 + r() * 14 + peak * 6 + (slot < 11 ? 3 : -3) + (r() < 0.06 ? 8 : 0));
  ovr = clamp(ovr, 40, 95);
  return { id, ci, slot, ...nm, pos, age, ovr, ...attrs(r, pos, ovr), num: NUMS[slot] || slot + 1 };
};
/* 🧒 a 17-year-old who takes the place of a retired player */
const youth = function (id, gid) {
  const [ci, slot] = String(id).split('-').map(Number), c = club(ci), r = rng(hash(WORLD + ':y:' + gid));
  const nm = named(r), pos = POS_TEMPLATE[slot] || 'MID';
  const ovr = clamp(Math.round(c.base - 11 + r() * 12 + (r() < 0.08 ? 8 : 0)), 40, 95);
  return { id, ci, slot, ...nm, pos, age: 17, ovr, ...attrs(r, pos, ovr), num: NUMS[slot] || slot + 1 };
};
const grow = (y) => y < 21 ? 4 : y < 24 ? 3 : y < 27 ? 1 : y < 30 ? 0 : y < 32 ? -1 : y < 34 ? -2 : -3;
/* 🎂 1 season = 1 year: players improve until ~27, drop after ~31, retire at 34–37 */
const oplayer = function (id, S) {
  S = Math.max(1, Math.floor(S || 1));
  let p = base(id); if (S === 1) return p;
  let s = 1, a0 = p.age, g = 0, gid = String(id);
  for (let guard = 0; guard < 40; guard++) {
    const R = 34 + hash(gid + ':ret') % 4;
    if (a0 + (S - s) <= R) break;
    s = Math.max(s + 1, s + (R - a0) + 1); g++; gid = id + '~' + g; p = youth(id, gid); a0 = 17;
    if (s > S) break;
  }
  const age = a0 + (S - s), pot = clamp(p.ovr + 4 + hash(gid + ':pot') % 16, p.ovr, 94); let d = 0;
  for (let y = a0; y < age; y++) { const st = grow(y) + (hash(gid + ':g' + y) % 3) - 1; d += st > 0 ? Math.max(0, Math.min(st, pot - p.ovr - d)) : st; }
  const sh = (v) => clamp(v + d, 25, 99);
  return { ...p, gid, gen: g, age, ovr: clamp(p.ovr + d, 40, 97), pac: sh(p.pac), sho: sh(p.sho), pas: sh(p.pas), dri: sh(p.dri), def: sh(p.def), gk: p.pos === 'GK' ? sh(p.gk) : p.gk };
};
/* ===== G3a: new kinds of players (their ID says everything about them) =====
   a{S}x{slot}x{n}  = player sold in the market (born in season S)
   y{S}x{club}x{k}  = one of the 15 youngsters a club sees in its youth draft in season S
   L{S}x{no}        = the 150-OVR wonder given to Pioneer #no (1–50). Only 50 can ever exist. */
const NEW_RE = /^([ayL])(\d+)x(\d+)(?:x(\d+))?$/;
const isNew = (id) => NEW_RE.test(String(id));
const POS15 = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'FWD', 'GK'];
const LEG_POS = ['FWD', 'MID', 'FWD', 'DEF', 'MID', 'FWD', 'MID', 'DEF', 'FWD', 'GK'];
const LEGEND_OVR = 150, MAX_SQUAD = 25, MIN_SQUAD = 16, PLAYABLE = 18, PIONEERS = 50;
const legAttrs = (r, pos) => {
  const v = (x) => Math.round(x + (r() - 0.5) * 8);
  return pos === 'GK' ? { pac: v(80), sho: v(55), pas: v(100), dri: v(80), def: v(110), gk: v(140) }
    : pos === 'DEF' ? { pac: v(110), sho: v(90), pas: v(115), dri: v(105), def: v(140), gk: 20 }
    : pos === 'MID' ? { pac: v(110), sho: v(125), pas: v(140), dri: v(135), def: v(100), gk: 20 }
    : { pac: v(115), sho: v(140), pas: v(118), dri: v(138), def: v(70), gk: 20 };
};
const posOfNew = (m) => m[1] === 'L' ? LEG_POS[Number(m[3]) % 10] : POS15[Number(m[1] === 'a' ? m[3] : m[4]) % 15];
/* the player as he is in his first season (g = 0), or the 17-year-old who replaces him after he retires (g > 0) */
const nbase = function (id, gid, g) {
  const m = NEW_RE.exec(id), k = m[1], r = rng(hash(WORLD + ':n:' + gid)), nm = named(r), pos = posOfNew(m), num = 21 + hash(gid + ':num') % 70;
  if (g > 0) { const ovr = 45 + Math.floor(r() * 16); return { id, k, ...nm, pos, age: 17, ovr, pot: clamp(ovr + 8 + Math.floor(r() * 16), ovr, 88), wk: false, ...attrs(r, pos, ovr), num }; }
  if (k === 'L') return { id, k, ...nm, pos, age: 16 + Number(m[3]) % 2, ovr: LEGEND_OVR, pot: LEGEND_OVR, wk: true, legend: true, ...legAttrs(r, pos), num: pos === 'GK' ? 1 : [7, 10, 9, 11, 8][Number(m[3]) % 5] };
  let age, ovr, pot, wk = false;
  if (k === 'y') {
    const sc = Number(m[4]) >= 15;
    age = 15 + Math.floor(r() * 3); wk = r() < (sc ? 0.25 : 0.05);
    ovr = wk ? 60 + Math.floor(r() * 10) : (sc ? 50 : 42) + Math.floor(r() * (sc ? 14 : 19));
    pot = wk ? 90 + Math.floor(r() * 8) : clamp(ovr + 10 + Math.floor(r() * 19), ovr, sc ? 90 : 86);
  } else {
    age = 16 + Math.floor(r() * 17); const x = r();
    ovr = x < 0.22 ? 48 + Math.floor(r() * 12) : x < 0.52 ? 60 + Math.floor(r() * 10) : x < 0.8 ? 70 + Math.floor(r() * 10) : x < 0.95 ? 80 + Math.floor(r() * 8) : 88 + Math.floor(r() * 6);
    if (age <= 20) ovr = Math.min(ovr, 50 + (age - 16) * 6);
    if (age <= 19 && r() < 0.05) { wk = true; ovr = 66 + Math.floor(r() * 11); }
    pot = wk ? 91 + Math.floor(r() * 7) : age < 27 ? clamp(ovr + 3 + Math.floor(r() * 14), ovr, 94) : ovr;
  }
  return { id, k, ...nm, pos, age, ovr, pot, wk, ...attrs(r, pos, ovr), num };
};
const nplayer = function (id, S) {
  const m = NEW_RE.exec(id), S0 = Number(m[2]); S = Math.max(S0, Math.floor(S || 1));
  let s = S0, g = 0, gid = String(id), p = nbase(id, gid, 0), a0 = p.age;
  for (let guard = 0; guard < 40; guard++) {
    const R = p.legend ? 37 : 34 + hash(gid + ':ret') % 4;
    if (a0 + (S - s) <= R) break;
    s = s + (R - a0) + 1; g++; gid = id + '~' + g; p = nbase(id, gid, g); a0 = 17;
    if (s > S) break;
  }
  const age = a0 + (S - s);
  if (p.legend) return { ...p, ci: -1, slot: -1, gid, gen: g, age };
  let d = 0;
  for (let y = a0; y < age; y++) { const st = grow(y) + (p.wk && y < 22 ? 2 : 0) + (hash(gid + ':g' + y) % 3) - 1; d += st > 0 ? Math.max(0, Math.min(st, p.pot - p.ovr - d)) : st; }
  const sh = (v) => clamp(v + d, 25, 99);
  return { ...p, ci: -1, slot: -1, gid, gen: g, age, ovr: clamp(p.ovr + d, 40, 97), pac: sh(p.pac), sho: sh(p.sho), pas: sh(p.pas), dri: sh(p.dri), def: sh(p.def), gk: p.pos === 'GK' ? sh(p.gk) : p.gk };
};
const player = (id, S) => isNew(id) ? nplayer(String(id), S) : oplayer(id, S);
/* 💰 what a player is worth (plain multiplication only, so phones and the worker agree) */
const r500 = (v) => Math.round(v / 500) * 500;
const value = (p) => {
  if (!p || p.legend) return 0;
  let v = 2000; for (let i = 50; i < p.ovr; i++) v *= 1.12; for (let i = p.ovr; i < 50; i++) v /= 1.12;
  v *= p.age <= 21 ? 1.3 : p.age <= 26 ? 1.1 : p.age <= 29 ? 1 : p.age <= 31 ? 0.75 : 0.5;
  if (p.wk) v *= 2.5;
  return Math.max(500, r500(v));
};
const releaseValue = (p) => p && !p.legend ? Math.round(value(p) * 0.1 / 100) * 100 : 0;
const youthIds = (S, ci, n) => { const o = []; for (let k = 0; k < (n || 15); k++) o.push('y' + S + 'x' + ci + 'x' + k); return o; };
const legendId = (S, no) => 'L' + S + 'x' + no;

/* 🔨 the market: 15 auctions always running. Each lasts 60 s; the next one starts the moment it ends.
   A bid in the last 10 s puts the clock back to 10 s. 🤖 computer clubs (clearly marked) snipe 3 s before the end
   while the price is under the most they will pay. With no human bids, a computer club buys at the start price (or it's unsold). */
const MK_N = 15, MK_LEN = 60000, MK_EXT = 10000, MK_AI = 3000;
const lotT0 = (i) => EPOCH + i * 4000;
const lotPid = (i, n, st) => 'a' + clock(st).s + 'x' + i + 'x' + n;
const stepOf = (p) => Math.max(500, r500(p * 0.05));
const lotInfo = (i, n, st) => {
  const pid = lotPid(i, n, st), p = player(pid, clock(st).s), v = value(p), start = Math.max(1000, r500(v * 0.4)), r = rng(hash('mkai:' + pid));
  const aiMax = r() < 0.35 ? 0 : Math.max(start, r500(v * (0.7 + r() * 0.9))), aiClub = Math.floor(r() * 434);
  return { i, n, st, pid, v, start, aiMax, aiClub };
};
/* L = a stored lot { i, n, st, end, p, u, un, c, nb } (or a fresh one { i, n, st }); answers how it stands at time `now` */
const lotEff = (L, now) => {
  const I = lotInfo(L.i, L.n, L.st);
  if (!L.u) { const end = L.st + MK_LEN; return { ...I, top: null, price: I.start, end, closed: now >= end, winner: now >= end ? (I.aiMax >= I.start ? 'ai' : null) : null, minNext: I.start }; }
  const e = L.end, aiNext = L.p + stepOf(L.p);
  if (aiNext <= I.aiMax && now >= e - MK_AI) { const end = e - MK_AI + MK_EXT; return { ...I, top: 'ai', price: aiNext, end, closed: now >= end, winner: now >= end ? 'ai' : null, minNext: aiNext + stepOf(aiNext), aiAt: e - MK_AI }; }
  return { ...I, top: 'u', price: L.p, end: e, closed: now >= e, winner: now >= e ? 'u' : null, minNext: L.p + stepOf(L.p) };
};
/* which lot is running in slot i right now, given the last stored lot of that slot (or none) */
const lotCur = (i, L, now) => {
  if (!L) { const t0 = lotT0(i), n = Math.max(0, Math.floor((now - t0) / MK_LEN)); return { i, n, st: t0 + n * MK_LEN }; }
  const E = lotEff(L, now); if (!E.closed) return L;
  const k = Math.max(0, Math.floor((now - E.end) / MK_LEN)); return { i, n: L.n + 1 + k, st: E.end + k * MK_LEN };
};

const squadIds = (ci) => POS_TEMPLATE.map((_, s) => ci + '-' + s);
const avg = (ids, S) => Math.round(ids.slice(0, 11).map(id => player(id, S)).reduce((s, p) => s + p.ovr, 0) / 11);

/* 📅 season clock: 28 days = 1 year. Days 1–26 one matchday each, day 27 last checks, day 28 promotion & prizes. */
const DAY = 86400000, EPOCH = Date.UTC(2026, 10, 2), SDAYS = 28, MDS = 26;
const SLOTS = [6, 12, 18, 22], AI_HOUR = 18, MATCH_MS = 4 * 60000;
const clock = (t) => { const e = Math.max(0, t - EPOCH), s = Math.floor(e / (SDAYS * DAY)) + 1, day = Math.floor((e % (SDAYS * DAY)) / DAY) + 1; return { s, day }; };
const dayStart = (s, day) => EPOCH + ((s - 1) * SDAYS + (day - 1)) * DAY;
const ko = (s, md, slot) => dayStart(s, md) + SLOTS[slot] * 3600000;
const aiKo = (s, md) => dayStart(s, md) + AI_HOUR * 3600000;

/* 🏔️ pyramid: Div 1 = 1 group … Div 5 = 16 groups, Div 6 = 32 groups (+ extra ones when full); 14 clubs a group */
const TIER_START = [0, 14, 42, 98, 210, 434];
const groupsIn = (t) => 1 << (t - 1);
const gkey = (s, t, g) => s + '-' + t + '-' + g;
const initClubs = (t, g) => { const o = []; for (let i = 0; i < 14; i++) o.push(TIER_START[t - 1] + g * 14 + i); return o; };

/* 🗓️ fixtures: double round robin, 26 matchdays, 7 matches each. Returns [homePos, awayPos] */
const pairs = (md) => {
  const r = (md - 1) % 13, sec = md > 13, out = [];
  for (let i = 0; i < 7; i++) {
    const a = i === 0 ? 13 : (r + i) % 13, b = i === 0 ? r : (r + 13 - i) % 13;
    let h = (i === 0 ? r % 2 === 0 : i % 2 === 1) ? a : b, w = h === a ? b : a;
    if (sec) { const x = h; h = w; w = x; }
    out.push([h, w]);
  }
  return out;
};
const mid = (s, t, g, md, hp) => gkey(s, t, g) + '-' + md + '-' + hp;

/* ⚡ quick result (for computer-vs-computer games, and for any match nobody checked in time) */
const quick = (key, oh, oa) => {
  const r = rng(hash('q:' + key)), d = oh - oa;
  const lh = clamp(1.45 + 0.075 * d, 0.3, 3.6), la = clamp(1.15 - 0.075 * d, 0.25, 3.3);
  let h = 0, a = 0; for (let i = 0; i < 8; i++) { if (r() < lh / 8) h++; if (r() < la / 8) a++; }
  return [h, a];
};

/* who sits in a seat on a matchday (a manager who took over mid-season keeps the computer club's earlier games) */
const seatClub = (G, pos, md) => { const u = G.users && G.users[pos]; return u && md < (u.from || 1) && u.ai != null ? u.ai : G.clubs[pos]; };
const isUserAt = (G, pos, md) => { const u = G.users && G.users[pos]; return !!(u && md >= (u.from || 1)); };
const strengthCache = {};
const strength = (G, pos, md) => {
  if (isUserAt(G, pos, md)) return G.users[pos].o || 55;
  const ci = seatClub(G, pos, md), k = G.s + ':' + ci;
  if (strengthCache[k] == null) strengthCache[k] = avg(squadIds(ci), G.s);
  return strengthCache[k];
};
/* result of one fixture: [h, a] or null (waiting) */
const result = (G, md, hp, ap, now) => {
  const k = md + '_' + hp, R = G.res && G.res[k];
  if (R) { const [h, a] = String(R).split('-').map(Number); return [h, a]; }
  if (isUserAt(G, hp, md) || isUserAt(G, ap, md)) return null;
  if (now != null && now < aiKo(G.s, md) + MATCH_MS) return null;
  return quick(gkey(G.s, G.t, G.g) + ':' + md + ':' + hp, strength(G, hp, md), strength(G, ap, md));
};
/* 📊 league table: points, goal difference, goals scored, then seat order */
const table = (G, now, uptoMd) => {
  const rows = []; for (let p = 0; p < 14; p++) rows.push({ pos: p, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, form: [] });
  const last = uptoMd || MDS;
  for (let md = 1; md <= last; md++) for (const [h, a] of pairs(md)) {
    const r = result(G, md, h, a, now); if (!r) continue;
    const H = rows[h], A = rows[a]; H.p++; A.p++; H.gf += r[0]; H.ga += r[1]; A.gf += r[1]; A.ga += r[0];
    if (r[0] > r[1]) { H.w++; A.l++; H.pts += 3; H.form.push('W'); A.form.push('L'); }
    else if (r[0] < r[1]) { A.w++; H.l++; A.pts += 3; H.form.push('L'); A.form.push('W'); }
    else { H.d++; A.d++; H.pts++; A.pts++; H.form.push('D'); A.form.push('D'); }
  }
  return rows.sort((x, y) => y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga) || y.gf - x.gf || x.pos - y.pos);
};

/* ⬆️⬇️ promotion: top 2 go up, bottom 4 go down (Div 1 has no "up", Div 6 has no "down") */
const UP = 2, DOWN = 4;
const parentOf = (t, g) => t > 1 && !(t === 6 && g >= 32) ? [t - 1, g >> 1] : null;
const childrenOf = (t, g) => t < 6 && (t < 5 || g < 16) ? [[t + 1, 2 * g], [t + 1, 2 * g + 1]] : [];
/* fin = club ids in final order (1st … 14th). getFin(t, g) gives another group's final order. */
const nextClubs = (t, g, s, getFin) => {
  const fin = getFin(t, g), par = parentOf(t, g), kids = childrenOf(t, g);
  let stay;
  if (t === 1) stay = fin.slice(0, 14 - DOWN);
  else if (t === 6) stay = par ? fin.slice(UP) : fin.slice();
  else stay = fin.slice(UP, 14 - DOWN);
  let out = stay.slice();
  for (const [ct, cg] of kids) out = out.concat(getFin(ct, cg).slice(0, UP));
  if (par) { const pf = getFin(par[0], par[1]), down = pf.slice(14 - DOWN); out = out.concat(g % 2 === 0 ? [down[0], down[2]] : [down[1], down[3]]); }
  return out.sort((a, b) => hash(s + 1 + ':' + a) - hash(s + 1 + ':' + b) || a - b);
};
/* 🪙 coins (paid by the worker only) */
const winCoins = (t) => 3000 + 1000 * (6 - t), drawCoins = (t) => 1000 + 500 * (6 - t);
const prize = (t, place) => (15 - place) * 4000 * (7 - t);
const PROMO_BONUS = 50000;

/* 💪 fitness: 0–100 per player. A full match costs 24; each day back +15 (+1 per fitness training point). */
const absDay = (t) => Math.floor(t / DAY);
const REC = 15, DRAIN = 24, AI_COND = 92, TR_MAX = 15, PACK_FIT = 25;
const condNow = (club, id, day) => { const c = club && club.cond && club.cond[id] != null ? Number(club.cond[id]) : 100, cd = club && club.cd != null ? club.cd : day; return clamp(Math.round(c + Math.max(0, day - cd) * (REC + (Number(club && club.tr && club.tr.fit) || 0) + (hasStaff(club, 'ph', clock(day * DAY).s) ? PHYSIO_REC : 0))), 0, 100); };
const FORM_NAMES = ['4-4-2', '4-3-3', '4-2-3-1', '4-1-4-1', '4-4-1-1', '4-3-2-1', '4-5-1', '4-1-2-1-2', '4-2-4', '3-5-2', '3-4-3', '3-4-2-1', '3-3-3-1', '5-3-2', '5-4-1'];
/* 📋 team sheet at the 15-minute lock: banned / injured players can't start (best fit from the bench comes in) */
const sheetOf = (club, day, S) => {
  const ids = (club.ids || []).slice(0, 18), ban = club.ban || {}, inj = club.inj || {};
  const bo = ids.filter(id => (Number(ban[id]) || 0) > 0), io = ids.filter(id => (Number(inj[id]) || 0) > 0 && !bo.includes(id)), out = new Set(bo.concat(io));
  for (let i = 0; i < 11; i++) {
    if (!out.has(ids[i])) continue;
    const pos = player(ids[i], S).pos; let best = -1, bo2 = -1;
    for (let j = 11; j < ids.length; j++) { if (out.has(ids[j])) continue; const p = player(ids[j], S), sc = (p.pos === pos ? 1000 : 0) + p.ovr; if (sc > bo2) { bo2 = sc; best = j; } }
    if (best > 0) { const x = ids[i]; ids[i] = ids[best]; ids[best] = x; }
  }
  if (hasStaff(club, 'as', S)) for (let i = 1; i < 11; i++) {
    const p = player(ids[i], S), c = condNow(club, ids[i], day); if (out.has(ids[i]) || c >= 60) continue; let best = -1, bs = -1;
    for (let j = 11; j < ids.length; j++) { if (out.has(ids[j])) continue; const q = player(ids[j], S), cq = condNow(club, ids[j], day); if (q.pos !== p.pos || cq < 75 || q.ovr < p.ovr - 10) continue; if (q.ovr + cq * 0.1 > bs) { bs = q.ovr + cq * 0.1; best = j; } }
    if (best > 0) { const x = ids[i]; ids[i] = ids[best]; ids[best] = x; }
  }
  const cond = {}; ids.forEach(id => { cond[id] = condNow(club, id, day); });
  return { ids, form: FORM_NAMES.includes(club.form) ? club.form : '4-4-2', cond, tr: { att: Number(club.tr && club.tr.att) || 0, def: Number(club.tr && club.tr.def) || 0, fit: Number(club.tr && club.tr.fit) || 0 }, bo, io, n: club.name || 'My Club', sh: club.short || 'MYC', kit: ((club.kits || [])[0] || {}).c1 || '', kits: (club.kits || []).map(k => k && k.c1).filter(Boolean), kf: (club.kits || []).slice(0, 3).map(cleanKit), cr: cleanCrest(club.crest), sd: { lv: stdLv(club), nm: String((club.std && club.std.nm) || ((club.name || 'My Club') + ' Park')).slice(0, 30) } };
};
const aiSheet = (ci, key, S) => { const c = club(ci); return { ai: ci, ids: squadIds(ci), form: FORM_NAMES[hash(key + ':f') % 15], cond: {}, tr: {}, bo: [], io: [], n: c.name, sh: c.short, aiCond: AI_COND }; };
const ENGINE_TICKS = 4200;
/* parse "2-1|ids y/r;…|out>in@tick;…" */
const parseRes = (r) => { const [sc, cards, subs] = String(r || '').split('|'); const [h, a] = String(sc).split('-').map(Number); const C = String(cards || '').split(';'), U = String(subs || '').split(';');
  return { h, a, cards: [0, 1].map(i => (C[i] || '').split(',').filter(Boolean).map(x => [x.slice(0, -1), x.slice(-1)])), subs: [0, 1].map(i => (U[i] || '').split(',').filter(Boolean).map(x => { const m = x.match(/^(.+)>(.+)@(\d+)$/); return m ? [m[1], m[2], Number(m[3])] : null; }).filter(Boolean)) }; };
const RES_RE = /^\d{1,2}-\d{1,2}\|[\w~,;-]*\|[\w~,;>@-]*$/;

/* ===================== 🏆 G3b · cups, stadium, sponsors, staff ===================== */
/* 👔 staff (hired for one season) */
const STAFF = { ph: 60000, sc: 40000, as: 25000 }, PHYSIO_REC = 6, SCOUT_N = 20;
const hasStaff = (c, k, S) => !!(c && c.stf && c.stf.s === S && c.stf[k]);
/* 🏟️ stadium: 5 levels, ticket coins for every home match (league and cups) */
const STD_SEATS = [5000, 12000, 25000, 45000, 80000], STD_TICKET = [2000, 5000, 10000, 18000, 30000], STD_COST = [0, 120000, 350000, 800000, 1800000];
const stdLv = (c) => clamp(Math.floor(Number(c && c.std && c.std.lv) || 1), 1, 5);
/* 🤝 sponsors: made-up brands only. 3 kinds, 3 offers each, sign 1 of each per season */
const SP_A = 'Zantro Kivoo Lumaro Vexano Odumi Tazuko Morivo Quenzo Yelzo Nkiro Fenvo Pirolu Dorvix Zuvia Kwento Sambeo Ravito Okelu Velmo Junza Abeko Talume Sorvi Imbeza'.split(' ');
const SP_B = { sh: 'Sportswear Mobile Juice Electronics Shoes Water Gaming Solar'.split(' '), st: 'Motors Airways Logistics Builders Foods Cement Travel Homes'.split(' '), bo: 'Energy Snacks Tech Studios Radio Paints Bikes Kitchens'.split(' ') };
const SP_KINDS = ['sh', 'st', 'bo'];
const SP_BASE = { sh: [{ up: 40000, pm: 500 }, { up: 15000, pm: 1500 }, { up: 0, pm: 2500 }], st: [{ ph: 1500 }, { phw: 4000 }, { phg: 1500 }], bo: [{ pg: 1500 }, { pw: 5000 }, { top2: 150000, cup: 200000 }] };
const SP_MULT = [3, 2.5, 2, 1.6, 1.3, 1];
const spOffers = (S, ci, t) => { const o = {}, m = SP_MULT[clamp(t || 6, 1, 6) - 1];
  SP_KINDS.forEach(kd => { o[kd] = SP_BASE[kd].map((b, k) => { const r = rng(hash('sp:' + S + ':' + ci + ':' + kd + ':' + k)), f = m * (0.9 + r() * 0.2), d = { n: pick(r, SP_A) + ' ' + pick(r, SP_B[kd]), k }; for (const x in b) d[x] = r500(b[x] * f); return d; }); });
  return o; };
const spOf = (c, S, kd) => c && c.sp && c.sp.s === S && c.sp[kd] ? c.sp[kd] : null;
/* coins a manager gets from one match on top of win/draw coins: tickets (home) + sponsors */
const matchExtra = (c, S, home, gf, ga) => {
  const win = gf > ga, sh = spOf(c, S, 'sh'), st = spOf(c, S, 'st'), bo = spOf(c, S, 'bo'); let x = home ? STD_TICKET[stdLv(c) - 1] : 0;
  if (sh) x += sh.pm || 0;
  if (st && home) x += (st.ph || 0) + (win ? st.phw || 0 : 0) + (st.phg || 0) * gf;
  if (bo) x += (bo.pg || 0) * gf + (win ? bo.pw || 0 : 0);
  return x; };

/* 🏆 cups. Open Cup (oc): every club, knockout on even days, final on day 24. Higher divisions get the byes.
   ⭐ Champions League (cl): last season's 64 best group champions, 16 groups of 4 on days 7–17, knockout 19–27.
   Cup matches kick off 2 hours after the league slot (06→08, 12→14, 18→20, 22→00). A knockout draw goes to penalties. */
const OC_DAYS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24], CL_DAYS = [7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27], CL_GR = 6;
const CUP_GAP = 2 * 3600000, CUP_AI_HOUR = AI_HOUR + 2, OC_FIRST = 1, CL_FIRST = 2, CUP_FIRST = 1;
const cupOn = (s, k) => s >= (k === 'cl' ? CL_FIRST : OC_FIRST);
/* G4: every cup match has its own kick-off time: a quarter hour between 06:15 and 23:45 GMT, never 20 minutes
   before or 10 minutes after a league kick-off (06/12/18/22). Same on every phone, nothing stored. */
const CUP_TIMES = (() => { const o = []; for (let m = 375; m <= 1425; m += 15) { if (SLOTS.some(h => m > h * 60 - 25 && m < h * 60 + 15)) continue; o.push(m); } return o; })();
const cupKoAt = (s, d, key) => dayStart(s, d) + CUP_TIMES[hash('ckt:' + key) % CUP_TIMES.length] * 60000;
const OC_WIN = 5000, CL_WIN = 15000, CL_DRAW = 5000, CUP_PRIZE = { oc: [300000, 100000], cl: [1000000, 300000] };
const CUP_NAME = { oc: '🏆 Open Cup', cl: '⭐ Champions League' };
const cupDays = (C) => C.k === 'cl' ? CL_DAYS : OC_DAYS.slice(OC_DAYS.length - C.R);
const cupDay = (C, r) => cupDays(C)[r - 1];
const cupKo = (s, d, sl) => ko(s, d, sl) + CUP_GAP;
const cupAiKo = (s, d) => dayStart(s, d) + CUP_AI_HOUR * 3600000;
const cupMid = (s, k, r, i) => s + '-' + k + '-' + r + '-' + i;
const isCupDay = (s, d) => (cupOn(s, 'oc') && OC_DAYS.includes(d)) || (cupOn(s, 'cl') && CL_DAYS.includes(d));
const isKO = (C, r) => C.k === 'oc' || r > CL_GR;
const seat = (C, ci) => ci < 0 ? ci : (C.tk && C.tk[ci] != null ? Number(C.tk[ci]) : ci);
const cupUser = (C, ci) => { const s = seat(C, ci); return s >= 0 && C.users && C.users[s] ? C.users[s] : null; };
const roundName = (C, r) => { if (C.k === 'cl') return r <= CL_GR ? 'Group matchday ' + r : ['Round of 32', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'][r - CL_GR - 1];
  const left = C.R - r; return left === 0 ? 'Final' : left === 1 ? 'Semi-finals' : left === 2 ? 'Quarter-finals' : left === 3 ? 'Round of 16' : 'Round ' + r; };
/* penalties: same shoot-out on every phone */
const pens = (key) => { const r = rng(hash('pen:' + key)); let a = 0, b = 0; for (let i = 0; i < 5; i++) { if (r() < 0.76) a++; if (r() < 0.76) b++; }
  for (let g = 0; a === b && g < 30; g++) { if (r() < 0.76) a++; if (r() < 0.76) b++; } if (a === b) a++; return [a, b]; };
/* score text: "2-1", "1-1/4-3" (penalties) or "bye" → [h, a, penH, penA] */
const cupScore = (x) => { if (!x || x === 'bye') return null; const [sc, pe] = String(x).split('/'), [h, a] = sc.split('-').map(Number), q = pe ? pe.split('-').map(Number) : [0, 0]; return [h, a, q[0], q[1]]; };
const cupWin = (x) => { const v = cupScore(x); return !v ? 0 : v[0] > v[1] ? 0 : v[0] < v[1] ? 1 : v[2] >= v[3] ? 0 : 1; };
const winSide = (x, p) => p[0] < 0 ? 1 : p[1] < 0 ? 0 : cupWin(x);
const baseC = {}, cupStr = (C, ci) => { const u = cupUser(C, ci); if (u) return Number(u.o) || 60; if (ci < 0) return 0; if (baseC[ci] == null) baseC[ci] = club(ci).base; return baseC[ci]; };
const cupResStr = (k, r, h, a, mid) => h + '-' + a + (isKO({ k }, r) && h === a ? '/' + pens(mid).join('-') : '');
/* coins for one cup match (side i = 0 home, 1 away): a win (penalties count), or a Champions League group draw */
const cupCoins = (k, r, h, a, mid, i) => { if (h === a && !isKO({ k }, r)) return k === 'cl' ? CL_DRAW : 0; return cupWin(cupResStr(k, r, h, a, mid)) === i ? (k === 'cl' ? CL_WIN : OC_WIN) : 0; };
const CL_RR = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]];
const resOf = (C, r, k, live) => { const R = C.rr && C.rr[r]; return (R && R[k]) || (live && C.ur && C.ur[r + '_' + k]) || null; };
/* 📊 CL group table (g = 0…15) */
const clTable = (C, g, live) => {
  const T = [0, 1, 2, 3].map(j => ({ ci: C.gs[4 * g + j], j, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }));
  for (let r = 1; r <= CL_GR; r++) for (let x = 0; x < 2; x++) {
    const v = cupScore(resOf(C, r, 2 * g + x, live)); if (!v) continue; let [a, b] = CL_RR[(r - 1) % 3][x]; if (r > 3) [a, b] = [b, a];
    const H = T[a], A = T[b]; H.p++; A.p++; H.gf += v[0]; H.ga += v[1]; A.gf += v[1]; A.ga += v[0];
    if (v[0] > v[1]) { H.w++; A.l++; H.pts += 3; } else if (v[0] < v[1]) { A.w++; H.l++; A.pts += 3; } else { H.d++; A.d++; H.pts++; A.pts++; }
  }
  return T.sort((x, y) => y.pts - x.pts || (y.gf - y.ga) - (x.gf - x.ga) || y.gf - x.gf || hash(C.s + ':t:' + x.ci) - hash(C.s + ':t:' + y.ci));
};
/* the pairs of round r: [[home, away], …] (club ids, -1 = bye), or null if the round before is not decided yet */
const cupPairs = (C, r) => {
  if (r < 1 || r > C.R) return null;
  if (C.k === 'cl' && r <= CL_GR) { const o = []; for (let g = 0; g < 16; g++) CL_RR[(r - 1) % 3].forEach(([a, b]) => o.push(r > 3 ? [C.gs[4 * g + b], C.gs[4 * g + a]] : [C.gs[4 * g + a], C.gs[4 * g + b]])); return o; }
  if (C.k === 'cl' && r === CL_GR + 1) { for (let q = 1; q <= CL_GR; q++) if (!(C.rr && C.rr[q])) return null; const W = [], U = []; for (let g = 0; g < 16; g++) { const t = clTable(C, g); W.push(t[0].ci); U.push(t[1].ci); } return W.map((w, k) => [w, U[(k + 8) % 16]]); }
  if (C.k === 'oc' && r === 1) { const o = []; for (let k = 0; k < C.b.length; k += 2) o.push([C.b[k], C.b[k + 1]]); return o; }
  const P = cupPairs(C, r - 1), R = C.rr && C.rr[r - 1]; if (!P || !R) return null;
  const w = P.map((p, k) => p[winSide(R[k], p)]), o = []; for (let k = 0; k < w.length; k += 2) o.push([w[k], w[k + 1]]); return o;
};
/* ⚡ a computer-vs-computer cup result */
const cupQuick = (C, r, k, p) => { const key = cupMid(C.s, C.k, r, k), q = quick(key, cupStr(C, p[0]), cupStr(C, p[1])); return q[0] + '-' + q[1] + (isKO(C, r) && q[0] === q[1] ? '/' + pens(key).join('-') : ''); };
/* kick-off of pair k in round r: a match with a manager gets its own time (see CUP_TIMES); computer games 20:00 GMT */
const cupKoOf = (C, r, p, k) => { const u = cupUser(C, p[0]) || cupUser(C, p[1]); return u ? cupKoAt(C.s, cupDay(C, r), cupMid(C.s, C.k, r, k)) : cupAiKo(C.s, cupDay(C, r)); };
/* build the Open Cup bracket from all clubs, best first. Byes go to the best clubs, the rest are drawn at random */
const ocBracket = (S, list) => {
  list = list.slice(0, 4096); let R = 1; while ((1 << R) < list.length) R++;
  const P = 1 << R, B = P - list.length, pairs = [], rest = list.slice(B).sort((a, b) => hash(S + ':ocd:' + a) - hash(S + ':ocd:' + b) || a - b);
  for (let i = 0; i < B; i++) pairs.push([list[i], -1]);
  for (let i = 0; i < rest.length; i += 2) pairs.push([rest[i], rest[i + 1]]);
  pairs.sort((x, y) => hash(S + ':ocp:' + x[0]) - hash(S + ':ocp:' + y[0]) || x[0] - y[0]);
  return { R, b: [].concat(...pairs) };
};
/* Champions League groups: 4 pots of 16 (best first), shuffled inside each pot */
const clGroups = (S, ent) => { const pots = [0, 1, 2, 3].map(q => ent.slice(16 * q, 16 * q + 16).sort((a, b) => hash(S + ':clp:' + a) - hash(S + ':clp:' + b) || a - b)), gs = [];
  for (let g = 0; g < 16; g++) for (let q = 0; q < 4; q++) gs.push(pots[q][g]); return gs; };

/* ===================== 🎨 G4 · kits, crests, 🪙 GG Coins (rare tokens) ===================== */
/* Money: the club field `coins` is shown as 💎 Gems (everyday money); the field `gems` is shown as 🪙 GG Coins (rare). */
const TOK = { start: 10, pio: 25, promo: 2, title: 5, oc: [10, 5], cl: [20, 10], design: 5 };
const COLORS = ['#22d3ee', '#a855f7', '#ff2d95', '#facc15', '#f97316', '#ef4444', '#22c55e', '#0ea5e9', '#1e3a8a', '#ffffff', '#111827', '#7c2d12', '#14b8a6', '#eab308',
  '#d4af37', '#c0c0c0', '#800000', '#0b1f4d', '#84cc16', '#7dd3fc', '#f9a8d4', '#047857', '#6d28d9', '#6b7280'];
const SHAPES = ['shield', 'round', 'diamond', 'hex', 'star', 'ring', 'badge', 'pennant'];
const SYMS = ['AB', '⚽', '★', '🦁', '🦅', '🔥', '⚡', '👑', '🐺', '🌍', '🐘', '🌙', '🦈', '🐉', '🐆', '🦬', '🐍', '🦂', '🏰', '⚔️', '🌟', '🔱', '🌊', '🛡️'];
const PATS = ['plain', 'stripes', 'hoops', 'halves', 'sash', 'pinstripes', 'chevron', 'gradient', 'checker', 'centre'];
const BANDS = ['none', 'h', 'v', 'd'];
const colOr = (c, d) => COLORS.includes(c) ? c : d;
const cleanKit = (k) => { k = k || {}; const c1 = colOr(k.c1, '#22d3ee'), c2 = colOr(k.c2, '#ffffff');
  return { c1, c2, pat: PATS.includes(k.pat) ? k.pat : 'plain', col: colOr(k.col, c2), slv: colOr(k.slv, c1), sho: colOr(k.sho, c1 === '#ffffff' ? '#111827' : '#ffffff'), soc: colOr(k.soc, c1) }; };
const cleanCrest = (c) => { c = c || {}; const c1 = colOr(c.c1, '#22d3ee'), c2 = colOr(c.c2, '#a855f7');
  return { shape: SHAPES.includes(c.shape) ? c.shape : 'shield', c1, c2, sym: SYMS.includes(c.sym) ? c.sym : 'AB', bd: colOr(c.bd, '#ffffff'), band: BANDS.includes(c.band) ? c.band : 'none', bc: colOr(c.bc, '#ffffff'), est: !!c.est }; };

return { OC_FIRST, CL_FIRST, cupOn, CUP_TIMES, cupKoAt, TOK, COLORS, SHAPES, SYMS, PATS, BANDS, cleanKit, cleanCrest, STAFF, PHYSIO_REC, SCOUT_N, hasStaff, STD_SEATS, STD_TICKET, STD_COST, stdLv, SP_KINDS, spOffers, spOf, matchExtra, OC_DAYS, CL_DAYS, CL_GR, CUP_GAP, CUP_FIRST, OC_WIN, CL_WIN, CL_DRAW, CUP_PRIZE, CUP_NAME, cupDays, cupDay, cupKo, cupAiKo, cupMid, isCupDay, isKO, seat, cupUser, roundName, pens, cupScore, cupWin, winSide, cupStr, cupResStr, cupCoins, clTable, cupPairs, cupQuick, cupKoOf, ocBracket, clGroups, r500, NEW_RE, isNew, POS15, LEGEND_OVR, MAX_SQUAD, MIN_SQUAD, PLAYABLE, PIONEERS, nplayer, oplayer, value, releaseValue, youthIds, legendId, MK_N, MK_LEN, MK_EXT, MK_AI, lotT0, lotPid, stepOf, lotInfo, lotEff, lotCur, absDay, REC, DRAIN, AI_COND, TR_MAX, PACK_FIT, condNow, FORM_NAMES, sheetOf, aiSheet, ENGINE_TICKS, parseRes, RES_RE, WORLD, hash, rng, pick, clamp, CULT, POS_TEMPLATE, club, base, youth, player, squadIds, avg, DAY, EPOCH, SDAYS, MDS, SLOTS, AI_HOUR, MATCH_MS, clock, dayStart, ko, aiKo, TIER_START, groupsIn, gkey, initClubs, pairs, mid, quick, seatClub, isUserAt, strength, result, table, UP, DOWN, parentOf, childrenOf, nextClubs, winCoins, drawCoins, prize, PROMO_BONUS };
})();

const { WORLD, hash, rng, pick, clamp } = W11C;
const db = () => window.db;
const esc = (s) => window.escapeHTML ? window.escapeHTML(String(s == null ? '' : s)) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const toast = (t) => window.showToast ? window.showToast(t) : console.log(t);
const fmt = (n) => Number(n || 0).toLocaleString();

// ---------- 🧑 players & clubs come from their IDs (shared core; 1 season = 1 year) ----------
W.C = W11C; W.S = W11C.clock(Date.now()).s;
W.club = W11C.club;
W.player = (id, S) => W11C.player(id, S || W.S);
W.squadIds = W11C.squadIds;
W.avg = (ids, S) => W11C.avg(ids, S || W.S);
const hyp = (a, b) => Math.sqrt(a * a + b * b), sq = (a) => a * a;

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
  /* G2: fitness (0–100 per player), training points, who can't play, manager present or not */
  this.ai = info.ai; this.cond = info.cond || {}; this.tr = info.tr || {}; this.out = new Set(info.out || []);
  this.off = new Set(); this.used = new Set(); this.subLog = []; this.cardLog = [];
}
function Match(home, away, seed) {
  this.S = home.S || W.S; this.league = !!home.league;
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
  const tr = t.tr, at = Number(tr.att) || 0, df = Number(tr.def) || 0, ft = Number(tr.fit) || 0;
  t.ids.slice(0, 11).forEach((id, i) => {
    if (t.off.has(id)) return;
    const p0 = W.player(id, this.S), c = t.cond[id] == null ? 100 : clamp(Number(t.cond[id]) || 0, 0, 100), k = 0.8 + 0.2 * c / 100;
    const pl = { ...p0, pac: (p0.pac + 0.4 * ft) * k, sho: (p0.sho + 0.4 * at) * k, dri: (p0.dri + 0.4 * at) * k, pas: p0.pas * k, def: (p0.def + 0.4 * df) * k, gk: (p0.gk + (p0.pos === 'GK' ? 0.4 * df : 0)) * k, cond: c };
    const s = sh[i] || sh[sh.length - 1], prev = old.find(o => o.id === id);
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
Match.prototype.say = function (k, txt, side, pid) { this.ev.push({ t: this.t, k, txt, side, min: this.minute(), pid }); };
Match.prototype.minute = function () { return Math.min(90, Math.floor(this.t / HALF * 45) + 1); };
Match.prototype.cmd = function (side, c) { this.cmds.push({ tick: this.tick, side, c }); this.applyCmd(side, c); };
Match.prototype.applyCmd = function (side, c) {
  const t = this.T[side];
  if (c.here) t.ai = false;
  if (c.shout) { t.mods = { attack: 0, tight: 0, press: 0, calm: 0 }; if (c.shout !== 'none') t.mods[c.shout] = 1; this.say('shout', { attack: '📣 ALL OUT ATTACK!', tight: '🧱 KEEP IT TIGHT!', press: '⚡ PRESS HIGH!', calm: '🧘 CALM DOWN, KEEP THE BALL!' }[c.shout] || '', side); }
  if (c.form && W.FORMS[c.form]) { t.form = c.form; this.layTeam(t); this.say('form', '📐 ' + t.short + ' switch to ' + c.form, side); }
  if (c.sub && t.subsLeft > 0) { const [o, n] = c.sub; const i = t.ids.indexOf(o), j = t.ids.indexOf(n); if (i >= 0 && i < 11 && j >= 11 && !t.off.has(o) && !t.used.has(n) && !t.out.has(n)) { t.used.add(o); t.subLog.push([o, n, this.tick]); const own = this.ball.owner && this.ball.owner.id === o; t.ids[i] = n; t.ids[j] = o; t.subsLeft--; this.layTeam(t); const np = this.P.find(p => p.id === n); if (own && np) this.give(np); this.say('sub', `🔁 ${W.player(n).short} on for ${W.player(o).short}`, side); } }
};
Match.prototype.nearest = function (list, x, y) { let b = null, bd = 1e9; for (const p of list) { const d = sq(p.x - x) + sq(p.y - y); if (d < bd) { bd = d; b = p; } } return b; };
Match.prototype.step = function () {
  const r = this.r, b = this.ball;
  if (this.over) return;
  b.px = b.x; b.py = b.y;
  this.t += DT; this.tick++;                                       // the clock never stops (goal celebrations included)
  if (this.t >= LEN - 1e-9) { this.over = true; this.say('ft', `🏁 Full time: ${this.T[0].short} ${this.T[0].score}–${this.T[1].score} ${this.T[1].short}`); return; }
  if (this.t >= HALF && !this.ht) { this.ht = true; this.pauseT = 0; this._after = null; this.say('ht', `⏸️ Half time: ${this.T[0].short} ${this.T[0].score}–${this.T[1].score} ${this.T[1].short}`); this.kickoff(1); this.P.forEach(p => { p.px = p.x; p.py = p.y; }); return; }
  if (this.pauseT > 0) { this.pauseT -= DT; if (this.pauseT <= 0 && this._after) { const f = this._after; this._after = null; f(); } this.moveAll(true); return; }
  if (this.t - this.lastAlert >= 30) { this.lastAlert = this.t; this.say('alert', '📢 Touchline moment!'); this.aiShout(1); if (this.league) this.aiShout(0); }
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
    const p = this.nearest(this.P, b.x, b.y); if (p && sq(p.x - b.x) + sq(p.y - b.y) < 1.7) this.give(p);
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
  const presser = this.nearest(opp, o.x, o.y), pd = presser ? hyp(presser.x - o.x, presser.y - o.y) : 99;
  if (presser && pd < 1.6 && o.cd <= 0 && r() < 0.11 * (1 + this.T[presser.side].mods.press * 0.5)) {
    const win = 0.42 + (presser.def - o.dri) / 160 + this.T[presser.side].mods.tight * 0.05;
    if (r() < 0.06) { this.foul(presser, o); return; }
    if (r() < win) { this.say('tackle', `🦵 ${presser.short} wins it`, presser.side); this.ball.owner = null; this.ball.x += (r() - 0.5) * 2; this.give(presser); return; }
  }
  this.dec -= DT; if (this.dec > 0) return;
  this.dec = (0.45 + r() * 0.7) * (1 + mods.calm * 0.35) * (1 - mods.attack * 0.2);
  if (o.role === 'GK') { this.passTo(o, this.bestPass(o, mates, opp, true)); return; }
  const dg = hyp(gx - o.x, 34 - o.y);
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
    const dist = hyp(m.x - o.x, m.y - o.y); if (dist < 5 || dist > 42) continue;
    const gain = d * (m.x - o.x), open = Math.min(10, Math.min(...opp.map(p => hyp(p.x - m.x, p.y - m.y)))), risk = this.lineRisk(o, m, opp);
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
  const lead = 0.5, tx = clamp(m.x + this.dir(o.side) * 2.2 * lead, 1, 104), ty = clamp(m.y, 2, 66), dist = hyp(tx - o.x, ty - o.y);
  T.passes++;
  const b = this.ball; b.owner = null;
  // interception?
  let cut = null; const dx = tx - o.x, dy = ty - o.y, L2 = dx * dx + dy * dy || 1;
  for (const p of opp) { const k = ((p.x - o.x) * dx + (p.y - o.y) * dy) / L2; if (k < 0.15 || k > 0.92) continue; const ex = o.x + dx * k - p.x, ey = o.y + dy * k - p.y; if (ex * ex + ey * ey < 5 && r() < 0.16 + (p.def - o.pas) / 260 + this.T[p.side].mods.press * 0.04) { cut = { p, k }; break; } }
  const miss = !cut && r() < 0.05 + (75 - o.pas) / 600 - T.mods.calm * 0.02;
  const ex = miss ? tx + (r() - 0.5) * 12 : cut ? o.x + dx * cut.k : tx, ey = miss ? clamp(ty + (r() - 0.5) * 12, -1, 69) : cut ? o.y + dy * cut.k : ty;
  b.fl = { x0: o.x, y0: o.y, x1: ex, y1: ey, k: 0, dur: Math.max(0.35, hyp(ex - o.x, ey - o.y) / (dist > 28 ? 24 : 30)), arc: dist > 28 ? 2.2 : 0.3, to: cut ? cut.p : miss ? null : m, from: o, kind: 'pass' };
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
  const CL = this.T[by.side].cardLog;
  if (r() < 0.22) { by.ycard++; this.T[by.side].cards++; if (by.ycard >= 2) { CL.push([by.id, 'r']); this.say('red', `🟥 ${by.short} is sent off (2nd yellow)!`, by.side, by.id); this.sendOff(by); } else { CL.push([by.id, 'y']); this.say('yellow', `🟨 Yellow card: ${by.name}`, by.side, by.id); } }
  else if (r() < 0.015) { CL.push([by.id, 'r']); this.say('red', `🟥 Straight red: ${by.name}!`, by.side, by.id); this.sendOff(by); }
  this.pauseT = 0.9; this._after = () => this.give(on);
};
Match.prototype.sendOff = function (p) { this.T[p.side].off.add(p.id); this.P = this.P.filter(x => x !== p); if (this.ball.owner === p) this.ball.owner = null; };
Match.prototype.moveAll = function (frozen) {
  const b = this.ball, poss = this.ball.owner ? this.ball.owner.side : (b.fl && b.fl.from ? b.fl.from.side : null);
  const bx = b.fl ? b.fl.x1 : b.x, by = b.fl ? b.fl.y1 : b.y;
  const chasers = {}; [0, 1].forEach(s => { const L = this.P.filter(p => p.side === s && p.role !== 'GK'); const T = this.T[s], n = poss === s ? (b.owner ? 0 : 1) : 2 + T.mods.press; chasers[s] = L.sort((a, c) => (sq(a.x - bx) + sq(a.y - by)) - (sq(c.x - bx) + sq(c.y - by))).slice(0, n); });
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
    const dx = tx - p.x, dy = ty - p.y, dist = hyp(dx, dy);
    if (dist > 0.05) { const st = Math.min(dist, sp * DT * (dist < 2 ? 0.6 : 1)); p.x += dx / dist * st; p.y += dy / dist * st; }
  }
};
W.Match = Match;
/* G2: the exact text two phones must agree on (score | cards | subs) */
W.resultStr = (m) => `${m.T[0].score}-${m.T[1].score}|` + m.T.map(t => t.cardLog.map(([id, k]) => id + k).join(',')).join(';') + '|' + m.T.map(t => t.subLog.map(([o, n, k]) => o + '>' + n + '@' + k).join(',')).join(';');
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
  try { await f.updateDoc(f.doc(db(), 'w11Clubs', window.uidNow()), patch); } catch (e) { console.warn('11W save', e); toast('⚠️ Not saved. Your squad changed (new player?) or no internet. Reloading…'); await W.load(); }
};
W.create = async function (o) {
  const f = await fbLoad(), uid = window.uidNow(), ci = 100000 + (hash(uid + ':' + Date.now()) % 899000), ids = W.squadIds(ci);
  const base = { uid, tag: String(window.me ? window.me() : '').toLowerCase(), club: ci, name: o.name, short: o.short, crest: o.crest, kits: o.kits, form: '4-4-2', ids, ovr: W.avg(ids), stats: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 }, boot: [], fr: 0, createdAt: Date.now() };
  // 🏅 Pioneer 50: the first 50 managers get the founder pack
  for (let tryN = 0; tryN < 3; tryN++) {
    let n = 0; try { const s = await f.getDoc(f.doc(db(), 'w11meta', 'pioneers')); n = s.exists() ? (s.data().count || 0) : 0; } catch (e) {}
    const pio = n < 50;
    const doc = { ...base, pioneer: pio, pioneerNo: pio ? n + 1 : 0, coins: pio ? 600000 : 250000, gems: pio ? W11C.TOK.pio : W11C.TOK.start, g4: 1, energy: pio ? 25 : 10, med: pio ? 15 : 5 };
    try {
      const bt = f.writeBatch(db());
      bt.set(f.doc(db(), 'w11Clubs', uid), doc);
      if (pio) bt.set(f.doc(db(), 'w11meta', 'pioneers'), { count: n + 1 });
      await bt.commit(); W.me = doc; return doc;
    } catch (e) { if (!pio) { console.warn(e); toast('⚠️ Could not create your club. Try again.'); return null; } }
  }
  return null;
};

// ---------- 🎨 crest + kits (with the anti-clash rule) ----------
W.COLORS = ['#22d3ee', '#a855f7', '#ff2d95', '#facc15', '#f97316', '#ef4444', '#22c55e', '#0ea5e9', '#1e3a8a', '#ffffff', '#111827', '#7c2d12', '#14b8a6', '#eab308'];
W.SHAPES = ['shield', 'round', 'diamond', 'hex'];
W.SYMS = ['AB', '⚽', '★', '🦁', '🦅', '🔥', '⚡', '👑', '🐺', '🌍', '🐘', '🌙'];
W.PATS = ['plain', 'stripes', 'hoops', 'halves', 'sash'];
W.crestSvg = function (cr, short, size) {
  cr = cr || {}; const a = cr.c1 || '#22d3ee', b = cr.c2 || '#a855f7', id = 'cg' + Math.floor(Math.random() * 1e9), sym = !cr.sym || cr.sym === 'AB' ? esc(short || '') : cr.sym;
  const path = { shield: 'M23 2 L44 9 L41 34 Q37 45 23 50 Q9 45 5 34 L2 9 Z', round: 'M23 3 A22 22 0 1 0 23.01 3 Z', diamond: 'M23 1 L45 26 L23 51 L1 26 Z', hex: 'M23 1 L44 13 L44 39 L23 51 L2 39 L2 13 Z' }[cr.shape] || 'M23 2 L44 9 L41 34 Q37 45 23 50 Q9 45 5 34 L2 9 Z';
  return `<svg class="w11crest" style="width:${size || 46}px;height:${Math.round((size || 46) * 52 / 46)}px" viewBox="0 0 46 52"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><path d="${path}" fill="url(#${id})" stroke="#fff" stroke-width="2"/><text x="23" y="${sym.length > 2 ? 31 : 33}" text-anchor="middle" font-size="${sym.length > 2 ? 12 : 16}" font-weight="900" fill="#fff" font-family="system-ui">${sym}</text></svg>`;
};
W.kitSvg = function (k, size) {
  k = k || {}; const a = k.c1 || '#22d3ee', b = k.c2 || '#ffffff', id = 'kp' + Math.floor(Math.random() * 1e9), s = size || 54;
  const pat = { plain: '', stripes: [8, 18, 28, 38].map(x => `<rect x="${x}" y="0" width="5" height="60" fill="${b}"/>`).join(''), hoops: [14, 26, 38].map(y => `<rect x="0" y="${y}" width="60" height="6" fill="${b}"/>`).join(''), halves: `<rect x="25" y="0" width="30" height="60" fill="${b}"/>`, sash: `<path d="M0 8 L14 0 L54 44 L40 54 Z" fill="${b}"/>` }[k.pat || 'plain'] || '';
  return `<svg width="${s}" height="${s}" viewBox="0 0 50 50"><defs><clipPath id="${id}"><path d="M15 4 L20 2 Q25 6 30 2 L35 4 L47 12 L42 21 L37 18 L37 48 L13 48 L13 18 L8 21 L3 12 Z"/></clipPath></defs><g clip-path="url(#${id})"><rect width="50" height="50" fill="${a}"/>${pat}</g><path d="M15 4 L20 2 Q25 6 30 2 L35 4 L47 12 L42 21 L37 18 L37 48 L13 48 L13 18 L8 21 L3 12 Z" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1.2"/></svg>`;
};
const hexRgb = (h) => { h = String(h || '#000').replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16) || 0); };
W.clash = (c1, c2) => { const [a, b, c] = hexRgb(c1), [d, e, f] = hexRgb(c2); return Math.hypot(a - d, b - e, c - f) < 110; };
W.aiKits = (ci) => { const c = W.club(ci), h = c.hue; const hsl = (l) => `hsl(${h},75%,${l}%)`, tohex = (l) => { const s2 = 0.75, l2 = l / 100, k = (n) => (n + h / 30) % 12, a2 = s2 * Math.min(l2, 1 - l2), f2 = (n) => l2 - a2 * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return '#' + [f2(0), f2(8), f2(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join(''); }; return [{ c1: tohex(50), c2: '#ffffff', pat: 'plain' }, { c1: '#ffffff', c2: tohex(45), pat: 'plain' }, { c1: '#111827', c2: tohex(55), pat: 'stripes' }]; };
// anti-clash: the away side switches to its 2nd or 3rd kit if the colours are too close
W.pickKits = function (homeKits, awayKits) {
  const h = (homeKits || [])[0] || { c1: '#22d3ee' }, list = awayKits && awayKits.length ? awayKits : [{ c1: '#ff2d95' }];
  const a = list.find(k => !W.clash(k.c1, h.c1)) || { c1: W.clash('#ff2d95', h.c1) ? '#facc15' : '#ff2d95' };
  return [h.c1, a.c1];
};

W.createScreen = function () {
  const d = W._draft = W._draft || { name: '', short: '', crest: { shape: 'shield', c1: '#22d3ee', c2: '#a855f7', sym: 'AB' }, kits: [{ c1: '#22d3ee', c2: '#ffffff', pat: 'plain' }, { c1: '#ffffff', c2: '#a855f7', pat: 'plain' }, { c1: '#111827', c2: '#ff2d95', pat: 'stripes' }], kit: 0 };
  const sw = (sel, key, val, isCrest) => W.COLORS.map(c => `<button onclick="W11.draft('${isCrest ? 'crest' : 'kit'}','${key}','${c}')" style="width:26px;height:26px;border-radius:8px;background:${c};border:2px solid ${val === c ? '#fff' : 'rgba(255,255,255,.15)'}"></button>`).join('');
  const K = d.kits[d.kit];
  W.ui(`<div class="card"><p style="font-size:18px;font-weight:900">Create your club ⚽</p><p style="font-size:12px;color:#94a3b8;margin-top:4px">Name it, design your crest and pick your kits. Your squad is drawn by pure luck.</p></div>
    <div class="card"><p style="font-weight:900">🏷️ Name</p>
      <input id="w11n" maxlength="24" value="${esc(d.name)}" oninput="W11._draft.name=this.value; if(!W11._draft.shortEdited){W11._draft.short=W11.autoShort(this.value); document.getElementById('w11s').value=W11._draft.short;} W11.prev()" placeholder="e.g. Kumasi Thunder FC" style="width:100%;margin-top:8px;padding:12px;border-radius:12px;background:#0b1024;border:1px solid rgba(34,211,238,.3);color:#fff;font-size:15px">
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px"><span style="font-size:11px;color:#94a3b8">Short name</span><input id="w11s" maxlength="3" value="${esc(d.short)}" oninput="W11._draft.short=this.value.toUpperCase(); W11._draft.shortEdited=1; W11.prev()" style="width:70px;padding:8px;border-radius:10px;background:#0b1024;border:1px solid rgba(34,211,238,.3);color:#fff;font-weight:900;text-transform:uppercase"></div></div>
    <div class="card"><div style="display:flex;gap:12px;align-items:center"><div id="w11pc">${W.crestSvg(d.crest, d.short, 64)}</div><p style="font-weight:900">🛡️ Crest</p></div>
      <div style="display:flex;gap:6px;margin-top:8px">${W.SHAPES.map(x => `<button onclick="W11.draft('crest','shape','${x}')" class="btn2" style="padding:8px;${d.crest.shape === x ? 'border-color:#22d3ee' : ''}">${x}</button>`).join('')}</div>
      <p style="font-size:10px;color:#94a3b8;margin-top:8px">Main colour</p><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">${sw(0, 'c1', d.crest.c1, 1)}</div><p style="font-size:10px;color:#94a3b8;margin-top:6px">Second colour</p><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">${sw(0, 'c2', d.crest.c2, 1)}</div>
      <p style="font-size:10px;color:#94a3b8;margin-top:8px">Symbol</p><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">${W.SYMS.map(x => `<button onclick="W11.draft('crest','sym','${x}')" style="min-width:34px;height:34px;border-radius:10px;font-weight:900;background:rgba(255,255,255,.06);border:2px solid ${d.crest.sym === x ? '#22d3ee' : 'transparent'}">${x === 'AB' ? 'ABC' : x}</button>`).join('')}</div></div>
    <div class="card"><p style="font-weight:900">👕 Kits</p><div style="display:flex;gap:6px;margin-top:8px">${['Home', 'Away', 'Third'].map((l, i) => `<button onclick="W11._draft.kit=${i}; W11.createScreen()" style="flex:1;padding:6px;border-radius:12px;background:rgba(255,255,255,.05);border:2px solid ${d.kit === i ? '#22d3ee' : 'transparent'}">${W.kitSvg(d.kits[i], 44)}<span style="display:block;font-size:10px;font-weight:900">${l}</span></button>`).join('')}</div>
      <p style="font-size:10px;color:#94a3b8;margin-top:8px">Main colour</p><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">${sw(0, 'c1', K.c1)}</div>
      <p style="font-size:10px;color:#94a3b8;margin-top:6px">Second colour</p><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">${sw(0, 'c2', K.c2)}</div>
      <p style="font-size:10px;color:#94a3b8;margin-top:6px">Pattern</p><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${W.PATS.map(x => `<button onclick="W11.draft('kit','pat','${x}')" class="btn2" style="width:auto;padding:7px 10px;${K.pat === x ? 'border-color:#22d3ee' : ''}">${x}</button>`).join('')}</div>
      <p style="font-size:10px;color:#94a3b8;margin-top:8px">If your kit looks too much like your opponent's, the away team switches kits automatically.</p></div>
    <button class="btn" onclick="W11.createGo()">✅ Create my club</button>`, 'New club');
};
W.autoShort = (n) => { const w = String(n || '').trim().split(/\s+/).filter(x => !/^(fc|cf|sc|ac|the)$/i.test(x)); return (w.length >= 2 ? w.slice(0, 3).map(x => x[0]).join('') : (w[0] || '').slice(0, 3)).toUpperCase(); };
W.draft = function (what, key, val) { const d = W._draft; if (what === 'crest') d.crest[key] = val; else d.kits[d.kit][key] = val; W.createScreen(); };
W.prev = function () { const el = document.getElementById('w11pc'); if (el) el.innerHTML = W.crestSvg(W._draft.crest, W._draft.short, 64); };
W.createGo = async function () {
  const d = W._draft, name = String(d.name || '').trim().replace(/\s+/g, ' '), short = String(d.short || W.autoShort(name)).replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 3);
  if (name.length < 3) return toast('Give your club a name (3+ letters)');
  if (short.length < 2) return toast('Short name needs 2–3 letters');
  if (window.sgFilterText && window.sgFilterText(name) !== name) return toast('Please choose a cleaner name');
  W.ui('<p style="text-align:center;padding:40px 0;color:#94a3b8">Drawing your squad…</p>');
  const doc = await W.create({ name, short, crest: W11C.cleanCrest(d.crest), kits: d.kits.map(W11C.cleanKit) }); if (!doc) return W.createScreen();
  const P = doc.ids.map(id => W.player(id)), best = P.slice().sort((a, b) => b.ovr - a.ovr).slice(0, 3), young = P.filter(p => p.age <= 20).length;
  W.ui(`<div class="card" style="text-align:center">${W.crestSvg(doc.crest, doc.short, 72)}<p style="font-size:20px;font-weight:900;margin-top:8px">Welcome to ${esc(doc.name)}!</p>
    ${doc.pioneer ? `<p style="margin-top:8px;font-size:13px;font-weight:900;color:#facc15">🛡️ FOUNDER SHIELD · Pioneer #${doc.pioneerNo} of 50</p>` : ''}
    <p style="font-size:12px;color:#94a3b8;margin-top:8px">Your squad: 18 players · Team ${doc.ovr} OVR · ${young} youngsters</p>
    <div style="text-align:left;margin-top:8px;font-size:12px">${best.map(p => `<p>⭐ ${p.flag} <b>${esc(p.name)}</b> · ${p.pos} · ${p.age}y · <b>${p.ovr}</b></p>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;font-size:13px;font-weight:900"><div class="card" style="margin:0">💎 ${fmt(doc.coins)}<br><span style="font-size:10px;color:#94a3b8">Gems</span></div><div class="card" style="margin:0">🪙 ${doc.gems}<br><span style="font-size:10px;color:#94a3b8">GG Coins (rare)</span></div><div class="card" style="margin:0">⚡ ${doc.energy}<br><span style="font-size:10px;color:#94a3b8">Energy Packs</span></div><div class="card" style="margin:0">🩹 ${doc.med}<br><span style="font-size:10px;color:#94a3b8">Med-Packs</span></div></div>
    <button class="btn" style="margin-top:14px" onclick="W11.home()">Start Boot Camp ⚽</button></div>`);
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
W.lockdown = function () { const n = W.bootNext(); if (!n) return W.leagueLock ? W.leagueLock() : null; const ms = n.at - Date.now(); return ms < 15 * 60000 ? (ms <= 0 ? 'Your Boot Camp match is ready. Play it first!' : `Your Boot Camp match starts in ${Math.ceil(ms / 60000)} min. Friendlies are locked 15 minutes before official matches.`) : null; };

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
#w11 .w11crest{width:46px;height:52px;flex-shrink:0}
#w11 .tip{font-size:11px;color:#cbd5e1;background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.25);border-radius:12px;padding:9px;margin-top:8px}`;
const ovrColor = (o) => o >= 85 ? '#facc15' : o >= 75 ? '#22d3ee' : o >= 65 ? '#a3e635' : o >= 55 ? '#e2e8f0' : '#94a3b8';
const badge = (c, short) => `<svg class="w11crest" viewBox="0 0 46 52"><defs><linearGradient id="bg${c.idx}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${c.hue},80%,55%)"/><stop offset="1" stop-color="hsl(${(c.hue + 60) % 360},80%,35%)"/></linearGradient></defs><path d="M23 2 L44 9 L41 34 Q37 45 23 50 Q9 45 5 34 L2 9 Z" fill="url(#bg${c.idx})" stroke="#fff" stroke-width="2"/><text x="23" y="31" text-anchor="middle" font-size="13" font-weight="900" fill="#fff" font-family="system-ui">${esc(short || c.short)}</text></svg>`;

W.ui = function (html, title, back) {
  let el = document.getElementById('w11');
  if (!el) { const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); document.body.insertAdjacentHTML('beforeend', '<div id="w11"></div>'); el = document.getElementById('w11'); }
  const me = W.me;
  el.innerHTML = `<div class="hd"><button class="bk" onclick="${back || 'W11.close()'}">←</button><b>${esc(title || '11 WONDERS')}</b>${me ? `<div class="chips"><span>💎 ${fmt(me.coins)}</span><span>🪙 ${fmt(me.gems)}</span></div>` : ''}</div><div class="bd" id="w11b">${html}</div>`;
  return el;
};
W.close = function () { W.stopLoop(); document.getElementById('w11')?.remove(); };
W.open = async function () {
  if (window.needSignIn && window.needSignIn('play 11 Wonders')) return;
  W.ui('<p style="text-align:center;padding:40px 0;color:#94a3b8">Loading your world…</p>');
  await W.load();
  if (W.resumeLive()) return;
  W.me ? W.home() : W.createScreen();
};

W.home = function () {
  const me = W.me, n = W.bootNext(), s = me.stats || {};
  if (!n && W.leagueHome) return W.leagueHome();
  const boot = (me.boot || []).length;
  W.ui(`<div class="card" style="display:flex;gap:12px;align-items:center">${me.crest ? W.crestSvg(me.crest, me.short) : badge(W.club(me.club), me.short)}<div style="flex:1"><p style="font-weight:900;font-size:16px">${esc(me.name)} ${me.pioneer ? '<span style="font-size:10px;color:#facc15">🛡️ Founder</span>' : ''}</p><p style="font-size:11px;color:#94a3b8">Team ${W.avg(me.ids)} OVR · ${esc(me.form)} · P${s.p || 0} W${s.w || 0} D${s.d || 0} L${s.l || 0}</p><p style="font-size:11px;color:#94a3b8">⚡ ${me.energy} · 🩹 ${me.med}</p></div></div>
    <div class="card"><p style="font-weight:900">🏕️ Boot Camp · ${boot}/5</p><div class="steps">${[0, 1, 2, 3, 4].map(i => `<i class="${i < boot ? 'done' : i === boot ? 'now' : ''}"></i>`).join('')}</div>
      ${n ? `<div class="tip">${esc(n.tip)}</div>${n.ready ? `<button class="btn" style="margin-top:10px" onclick="W11.prematch('boot')">▶ Play Boot Camp match ${n.i + 1}</button>` : `<button class="btn" style="margin-top:10px" disabled id="w11cd">Unlocks in …</button>`}`
        : `<p style="font-size:12px;color:#a3e635;margin-top:6px">🎓 Graduated! Your club joins a Division 6 group in the live league pyramid. Tap to pick your kick-off time.</p>`}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="btn2" onclick="W11.squad()">👕 Squad & tactics</button><button class="btn2" onclick="W11.friendly()">🤝 Friendly</button></div>`);
  if (n && !n.ready) { const tick = () => { const b = document.getElementById('w11cd'); if (!b) return; const ms = n.at - Date.now(); if (ms <= 0) return W.home(); b.textContent = `Unlocks in ${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`; setTimeout(tick, 1000); }; tick(); }
};

W.squad = function (sel) {
  const me = W.me, P = me.ids.map(id => W.player(id));
  const day = W11C.absDay(Date.now()), inLg = !!(me.lg && me.lg.s === W.S);
  const st = (id) => { if (!inLg) return ''; const c = W11C.condNow(me, id, day), inj = (me.inj || {})[id] || 0, ban = (me.ban || {})[id] || 0, yc = (me.yc || {})[id] || 0;
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:900">${inj ? `<button onclick="event.stopPropagation();W11.med('${id}')" style="padding:2px 6px;border-radius:8px;background:rgba(255,45,149,.2)">🤕 ${inj}</button>` : ''}${ban ? `<span title="banned">🚫${ban}</span>` : ''}${yc ? `<span>🟨${yc}</span>` : ''}<span style="width:34px;height:6px;border-radius:9px;background:rgba(255,255,255,.1);overflow:hidden;display:inline-block"><i style="display:block;height:100%;width:${c}%;background:${c >= 75 ? '#22d3ee' : c >= 50 ? '#facc15' : '#ff2d95'}"></i></span>${c}</span>`; };
  const row = (p, i) => `<div class="row ${sel === i ? 'sel' : ''}" onclick="W11.swap(${i})"><span class="pos">${i < 11 ? W.shape(me.form)[i].role : 'SUB'}</span><span class="ovr" style="${p.legend ? 'background:linear-gradient(135deg,#facc15,#ff2d95,#a855f7);color:#fff' : 'background:' + ovrColor(p.ovr)}">${p.ovr}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.legend ? '👑 ' : p.wk && p.age <= 21 ? '🌟 ' : ''}${p.flag} <b>${esc(p.name)}</b> <span style="color:#94a3b8">· ${p.pos} · ${p.age}y</span></span>${st(p.id) || `<span style="font-size:10px;color:#94a3b8">#${p.num}</span>`}</div>`;
  W.ui(`<div class="card"><p style="font-weight:900">📐 Formation</p><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${Object.keys(W.FORMS).map(f => `<button onclick="W11.setForm('${f}')" style="padding:7px 10px;border-radius:10px;font-size:11px;font-weight:900;${f === me.form ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.06)'}">${f}</button>`).join('')}</div></div>
    <div class="card">${inLg ? `<p style="font-size:11px;color:#94a3b8;margin-bottom:6px">Bars = fitness. 🤕 injured (tap to use a 🩹 Med-Pack) · 🚫 banned · 🟨 yellows (5 = ban). Your team sheet locks 15 minutes before kick-off; injured or banned starters are swapped for the best bench player.</p>` : ''}<p style="font-weight:900">Starting XI <span style="font-size:10px;color:#94a3b8;font-weight:700">· tap a player, then another to swap</span></p>${P.slice(0, 11).map(row).join('')}<p style="font-weight:900;margin-top:10px">Bench</p>${P.slice(11, 18).map((p, k) => row(p, k + 11)).join('')}${P.length > 18 ? `<p style="font-weight:900;margin-top:10px">Reserves <span style="font-size:10px;color:#94a3b8;font-weight:700">· can't play in matches. Swap them into the top 18 to use them.</span></p>${P.slice(18).map((p, k) => row(p, k + 18)).join('')}` : ''}<p style="font-size:11px;color:#94a3b8;margin-top:10px">Squad: ${P.length}/25 players</p><button class="btn2" style="margin-top:8px" onclick="W11.releaseMenu()">🗑️ Release a player</button></div>`, '👕 Squad', 'W11.home()');
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
W.teamInfo = (src, side, color) => ({ name: src.name, short: src.short || W.club(src.club != null ? src.club : src.idx).short, color: color || (side === 0 ? '#22d3ee' : '#ff2d95'), gkColor: side === 0 ? '#facc15' : '#a3e635', form: src.form || '4-4-2', ids: src.ids });
W.prematch = function (kind, opp) {
  const me = W.me; let o;
  if (kind === 'boot') { const n = W.bootNext(); if (!n || !n.ready) return W.home(); const c = W.club([700, 650, 500, 330, 260][n.i] + (me.club % 50)); o = { name: c.name, short: c.short, club: c.idx, ids: W.squadIds(c.idx), form: ['4-4-2', '4-3-3', '4-2-3-1', '4-4-2', '4-3-3'][n.i] }; }
  else if (kind === 'friend') o = { name: opp.name, short: opp.short, club: opp.club, ids: opp.ids, form: opp.form, uid: opp.uid, tag: opp.tag, kits: opp.kits };
  else { const ci = 210 + Math.floor(Math.random() * 1100); const c = W.club(ci); o = { name: c.name, short: c.short, club: ci, ids: W.squadIds(ci), form: pick(Math.random, Object.keys(W.FORMS)) }; }
  if (kind !== 'boot' && W.lockdown()) { toast('🔒 ' + W.lockdown()); return; }
  const [hc, ac] = W.pickKits(me.kits, o.kits || W.aiKits(o.club));
  const live = { kind, seed: (Math.random() * 4294967295) >>> 0, startAt: Date.now() + 15000, home: W.teamInfo(me, 0, hc), away: W.teamInfo(o, 1, ac), cmds: [], boot: kind === 'boot' ? W.bootNext().i : null, opp: { uid: o.uid || null, tag: o.tag || null } };
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
  W.stopLoop(); W.live = live; W.my = 0;
  const m = W.simulate(live.home, live.away, live.seed, live.cmds, Math.floor(playedAt(live) / DT));
  m.T[0].ai = false; W.m = m;
  const n = live.boot != null ? W.BOOT[live.boot] : null;
  W.ui(`<div style="position:relative"><div class="sb"><span style="font-weight:900;color:${m.T[0].color}">${esc(m.T[0].short)}</span><span class="sc" id="w11sc">0–0</span><span style="font-weight:900;color:${m.T[1].color}">${esc(m.T[1].short)}</span><span class="tm" id="w11tm">1'</span></div>
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
    if (tm) tm.textContent = el < 0 ? 'Kick-off ' + Math.ceil(-el) + 's' : el > HALF && el < HALF + BREAK ? `HT · ${Math.ceil(HALF + BREAK - el)}s` : m.over ? 'FT' : m.minute() + "'";
    if (m.ev.length !== seenEv) { const news = m.ev.slice(seenEv); seenEv = m.ev.length; W.feed(m); if (news.some(e => e.k === 'alert')) W.pulse(); if (news.some(e => e.k === 'goal' && e.side === 0) && navigator.vibrate) try { navigator.vibrate([80, 40, 120]); } catch (e) {} }
    W.halfTime(el > HALF && el < HALF + BREAK, m);
    const subs = document.getElementById('w11subs'); if (subs) subs.textContent = m.T[0].subsLeft;
    if (m.over && el > TOTAL + W.cerDur(live).close && !W.hold()) { W.stopLoop(); return W.finish(live, m, false); }
    W._raf = requestAnimationFrame(frame);
  };
  W._raf = requestAnimationFrame(frame);
  W.feed(m);
};
W.feed = function (m) {
  const el = document.getElementById('w11tk'); if (!el) return;
  const show = m.ev.filter(e => !['tackle', 'int'].includes(e.k)).slice(-4).reverse();
  el.innerHTML = show.map(e => `<p><span style="color:#94a3b8">${e.min}'</span> ${esc(e.txt)}</p>`).join('');
  const MT = m.T[W.my > 0 ? 1 : 0], cur = Object.keys(MT.mods).find(k => MT.mods[k]); document.querySelectorAll('#w11sh button').forEach(b => b.classList.toggle('on', b.dataset.k === cur));
};
W.pulse = function () { const a = document.getElementById('w11al'), sh = document.getElementById('w11sh'); if (!a) return; a.style.display = 'block'; sh.classList.remove('pulse'); void sh.offsetWidth; sh.classList.add('pulse'); clearTimeout(W._pT); W._pT = setTimeout(() => { a.style.display = 'none'; }, 8000); };
W.command = function (c) { const m = W.m, live = W.live; if (!m || m.over) return; if (live && live.kind === 'league') return W.sendL(c); m.cmd(0, c); live.cmds = m.cmds.filter(x => x.side === 0); try { localStorage.setItem('w11_live', JSON.stringify(live)); } catch (e) {} W.feed(m); };
W.shout = function (k) { const T = W.m.T[W.my > 0 ? 1 : 0], cur = Object.keys(T.mods).find(x => T.mods[x]); W.command({ shout: cur === k ? 'none' : k }); };
W.subMenu = function () {
  const m = W.m, t = m.T[W.my > 0 ? 1 : 0]; if (t.subsLeft <= 0) return toast('No subs left');
  const ov = document.getElementById('w11ov');
  ov.innerHTML = `<div class="ov" style="justify-content:flex-start;overflow:auto"><p style="font-weight:900;margin-bottom:8px">🔁 Who comes off?</p>${t.ids.slice(1, 11).filter(id => m.P.some(p => p.id === id && p.side === t.side)).map(id => { const p = W.player(id); return `<button class="btn2" style="margin-bottom:6px;text-align:left" onclick="W11.subOn('${id}')">${p.flag} ${esc(p.name)} · ${p.pos} · ${p.ovr}</button>`; }).join('')}<button class="btn2" onclick="document.getElementById('w11ov').innerHTML=''">Cancel</button></div>`;
};
W.subOn = function (out) {
  const t = W.m.T[W.my > 0 ? 1 : 0], ov = document.getElementById('w11ov');
  ov.innerHTML = `<div class="ov" style="justify-content:flex-start;overflow:auto"><p style="font-weight:900;margin-bottom:8px">Who comes on for ${esc(W.player(out).short)}?</p>${t.ids.slice(11).filter(id => !t.used.has(id) && !t.out.has(id)).map(id => { const p = W.player(id, W.m.S); return `<button class="btn2" style="margin-bottom:6px;text-align:left" onclick="W11.command({sub:['${out}','${id}']}); document.getElementById('w11ov').innerHTML=''">${p.flag} ${esc(p.name)} · ${p.pos} · ${p.ovr}</button>`; }).join('')}<button class="btn2" onclick="document.getElementById('w11ov').innerHTML=''">Cancel</button></div>`;
};
W.formMenu = function () {
  const ov = document.getElementById('w11ov');
  ov.innerHTML = `<div class="ov"><p style="font-weight:900;margin-bottom:10px">📐 Change formation</p><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center">${Object.keys(W.FORMS).map(f => `<button onclick="W11.command({form:'${f}'}); document.getElementById('w11ov').innerHTML=''" style="padding:9px 11px;border-radius:10px;font-size:12px;font-weight:900;${f === W.m.T[W.my > 0 ? 1 : 0].form ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.08)'}">${f}</button>`).join('')}</div><button class="btn2" style="margin-top:12px" onclick="document.getElementById('w11ov').innerHTML=''">Cancel</button></div>`;
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
    ${graduated ? '<p style="margin-top:12px;font-weight:900;color:#a3e635">🎓 Boot Camp complete! Your club joins a Division 6 group in the live league pyramid.</p>' : ''}
    <button class="btn" style="margin-top:14px" onclick="W11.home()">Continue</button></div>`, 'Full time');
};

// =====================================================================
// 🏆 G2 · LEAGUE LIFE — 28-day seasons, 6 divisions, live matches with both managers, fitness, training,
// injuries, cards, ageing, coins from the server. Phones work out results; 2 different phones must agree.
// =====================================================================
const CC = W11C, MS = CC.MATCH_MS;
const uidNow = () => (window.uidNow && window.uidNow()) || '';
const localT = (ms, withDay) => { const d = new Date(ms); return (withDay ? d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' : '') + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
const slotTxt = (sl) => { const d = new Date(Date.UTC(2026, 0, 1, CC.SLOTS[sl])); return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
const ord = (n) => n + (n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th');
const left = (ms) => { if (ms <= 0) return 'now'; const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60; return h ? `${h}h ${m}m` : `${m}:${String(s).padStart(2, '0')}`; };
W.off = 0; W.nowS = () => Date.now() + (W.off || 0);
W.api = async function (path, body) {
  const base = window.nwUrl ? await window.nwUrl() : ''; if (!base) return { ok: false, error: 'The game helper is not set up yet.' };
  try { const r = await fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (window.mediaIdToken ? await window.mediaIdToken() : '') }, body: JSON.stringify(body || {}) }); return await r.json().catch(() => ({ ok: false, error: 'helper error ' + r.status })); }
  catch (e) { return { ok: false, error: 'No internet' }; }
};
W.inLeague = () => !!(W.me && W.me.lg && W.me.lg.s === W.S);
W.loadG = async function (force) {
  if (!W.inLeague()) return null;
  const lg = W.me.lg, key = CC.gkey(lg.s, lg.t, lg.g);
  if (!force && W.G && W.G._k === key && Date.now() - W.G._at < 60000) return W.G;
  const f = await fbLoad();
  try { const sn = await f.getDoc(f.doc(db(), 'w11g', key)); const G = sn.exists() ? sn.data() : { s: lg.s, t: lg.t, g: lg.g, clubs: CC.initClubs(lg.t, lg.g), users: {}, res: {} }; G._k = key; G._at = Date.now(); W.G = G; } catch (e) {}
  return W.G;
};
const seatName = (G, pos, md) => { const u = G.users && G.users[pos]; if (u && md >= (u.from || 1)) return { n: u.n, sh: u.sh, user: true, me: u.u === uidNow(), hue: CC.club(u.c).hue }; const c = CC.club(CC.seatClub(G, pos, md)); return { n: c.name, sh: c.short, hue: c.hue }; };
const koOf = (G, md, hp, ap) => { const U = G.users || {}, hu = CC.isUserAt(G, hp, md) && U[hp], au = CC.isUserAt(G, ap, md) && U[ap]; return hu ? CC.ko(G.s, md, hu.sl) : au ? CC.ko(G.s, md, au.sl) : CC.aiKo(G.s, md); };
const mini = (hue, sh) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:7px;font-size:8px;font-weight:900;color:#fff;background:linear-gradient(135deg,hsl(${hue},80%,55%),hsl(${(hue + 60) % 360},80%,35%));flex-shrink:0">${esc(String(sh || '').slice(0, 3))}</span>`;
W.myFixtures = (G) => { const pos = W.me.lg.pos, out = []; for (let md = 1; md <= CC.MDS; md++) { const [hp, ap] = CC.pairs(md).find(([h, a]) => h === pos || a === pos); out.push({ md, hp, ap, home: hp === pos, mine: CC.isUserAt(G, pos, md), ko: koOf(G, md, hp, ap), id: CC.mid(G.s, G.t, G.g, md, hp), res: G.res && G.res[md + '_' + hp] }); } return out; };
W.nextMatch = (G) => W.myFixtures(G).find(f => f.mine && !f.res && W.nowS() < f.ko + MS + 15 * 60000);
W.leagueLock = () => { if (!W.inLeague() || !W.G) return null; const n = W.nextMatch(W.G); if (!n) return null; const ms = n.ko - W.nowS(); if (ms < 15 * 60000 && ms > -MS - 30000) return ms > 0 ? `Your league match starts in ${Math.ceil(ms / 60000)} min. Friendlies are locked 15 minutes before official matches.` : 'Your league match is being played right now!'; return null; };
const zone = (t, rank) => rank < CC.UP && t > 1 ? 'up' : rank >= 14 - CC.DOWN && t < 6 ? 'down' : '';

// ---------- 🏠 league home ----------
W.leagueHome = async function () {
  const me = W.me, s = me.stats || {}, now = W.nowS(), { s: cs, day } = CC.clock(now);
  W.S = cs;
  const top = `<div class="card" style="display:flex;gap:12px;align-items:center">${me.crest ? W.crestSvg(me.crest, me.short) : badge(W.club(me.club), me.short)}<div style="flex:1"><p style="font-weight:900;font-size:16px">${esc(me.name)} ${me.pioneer ? '<span style="font-size:10px;color:#facc15">🛡️ Founder</span>' : ''}</p><p style="font-size:11px;color:#94a3b8">Team ${W.avg(me.ids)} OVR · ${esc(me.form)} · Season ${cs} · Day ${day}/28</p><p style="font-size:11px;color:#94a3b8">⚡ ${me.energy} · 🩹 ${me.med}</p></div></div>`;
  const grid = (b) => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${b.join('')}</div>`;
  if (!W.inLeague()) {
    if (me.wait && me.wait >= cs) {
      W.ui(top + `<div class="card"><p style="font-weight:900">⏳ You're in!</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">Your club starts in a Division 6 group when Season ${me.wait} begins: <b>${localT(CC.dayStart(me.wait, 1), true)}</b>. Your home matches kick off at <b>${slotTxt(me.sl == null ? 2 : me.sl)}</b>.</p><p style="font-size:11px;color:#94a3b8;margin-top:6px">Until then: friendlies, tactics and squad. (Promotion and prizes are worked out on day 28.)</p></div>` + grid([`<button class="btn2" onclick="W11.squad()">👕 Squad & tactics</button>`, `<button class="btn2" onclick="W11.friendly()">🤝 Friendly</button>`]));
      return;
    }
    W.ui(top + `<div class="card"><p style="font-weight:900">🎓 Boot Camp done! Join the league</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">You'll take over a computer club in a Division 6 group that is already playing. You keep its points so far. Top 2 go up, bottom 4 go down. 6 divisions. 1 season = 28 days.</p>
      <p style="font-weight:900;margin-top:12px;font-size:12px">⏰ Pick your daily kick-off time</p><p style="font-size:11px;color:#94a3b8">Your home matches start at this time every day. Away matches start at the home manager's time.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">${[0, 1, 2, 3].map(sl => `<button class="btn2" onclick="W11.joinL(${sl})" style="padding:14px 6px"><b style="font-size:15px">${slotTxt(sl)}</b><br><span style="font-size:10px;color:#94a3b8">${String(CC.SLOTS[sl]).padStart(2, '0')}:00 GMT</span></button>`).join('')}</div></div>` + grid([`<button class="btn2" onclick="W11.squad()">👕 Squad & tactics</button>`, `<button class="btn2" onclick="W11.friendly()">🤝 Friendly</button>`]));
    return;
  }
  const G = await W.loadG(); if (!G) return;
  const tb = CC.table(G, now), rank = tb.findIndex(r => r.pos === me.lg.pos), row = tb[rank], n = W.nextMatch(G), z = zone(G.t, rank);
  let nx = '';
  if (n) {
    const ms = n.ko - now, live = ms <= 0 && now < n.ko + (W.TIMING.TOTAL * 1000) + 15000, opp = seatName(G, n.home ? n.ap : n.hp, n.md);
    nx = `<div class="card"><p style="font-weight:900">${live ? '<span style="color:#ff2d95">● LIVE NOW</span>' : '⚽ Next match'} · Matchday ${n.md}</p>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px">${mini(opp.hue, opp.sh)}<p style="flex:1;font-weight:900">${n.home ? 'vs' : '@'} ${esc(opp.n)} ${opp.user ? '<span style="font-size:10px;color:#67e8f9">👤 manager</span>' : ''}</p></div>
      <p style="font-size:11px;color:#94a3b8;margin-top:6px">${n.home ? 'Home' : 'Away'} · ${localT(n.ko, true)} · <span id="w11lc">${live ? 'playing' : 'in ' + left(ms)}</span></p>
      ${ms < 15 * 60000 ? `<button class="btn" style="margin-top:10px" onclick="W11.openL('${n.id}')">${live ? '▶ Go to the touchline' : '🔒 Team sheet locked · open match'}</button>` : `<p style="font-size:11px;color:#cbd5e1;margin-top:8px">📋 Your team sheet locks 15 minutes before kick-off. Not there? GG AI shouts for you.</p>`}</div>`;
  } else if (day >= 27) nx = `<div class="card"><p style="font-weight:900">🏁 Season ${cs} is over</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">Last results are checked today. Promotion, relegation and prizes are worked out on day 28. Season ${cs + 1} starts ${localT(CC.dayStart(cs + 1, 1), true)}.</p></div>`;
  else nx = `<div class="card"><p style="font-weight:900">⚽ No match right now</p><p style="font-size:12px;color:#94a3b8;margin-top:6px">Your next league match will show here.</p></div>`;
  const trained = me.trd === CC.absDay(Date.now());
  W.ui(top + `<div class="card" onclick="W11.tableL()" style="cursor:pointer"><p style="font-size:10px;font-weight:900;letter-spacing:.1em;color:#67e8f9">DIVISION ${G.t} · GROUP ${G.g + 1}</p><p style="font-size:26px;font-weight:900;margin-top:2px">${ord(rank + 1)} <span style="font-size:13px;color:#94a3b8">· ${row.pts} pts · P${row.p} W${row.w} D${row.d} L${row.l}</span></p>
      <p style="font-size:11px;margin-top:4px;color:${z === 'up' ? '#22d3ee' : z === 'down' ? '#ff2d95' : '#94a3b8'}">${z === 'up' ? '⬆️ Promotion place' : z === 'down' ? '⬇️ Relegation zone' : G.t === 1 && rank === 0 ? '👑 Top of the pyramid' : 'Tap for the full table'}</p></div>` + nx +
    grid([`<button class="btn2" onclick="W11.tableL()">📊 Table</button>`, `<button class="btn2" onclick="W11.fixturesL()">🗓️ Fixtures</button>`, `<button class="btn2" onclick="W11.trainL()">🏋️ Training ${trained ? '✅' : '· 1 today'}</button>`, `<button class="btn2" onclick="W11.squad()">👕 Squad & fitness</button>`, `<button class="btn2" onclick="W11.energyL()">⚡ Energy Pack (${me.energy})</button>`, `<button class="btn2" onclick="W11.friendly()">🤝 Friendly</button>`, `<button class="btn2" onclick="W11.histL()">📜 Club history</button>`, `<button class="btn2" onclick="W11.helpL()">❓ How it works</button>`]));
  if (n) { const tick = () => { const el = document.getElementById('w11lc'); if (!el) return; const ms = n.ko - W.nowS(); if (ms <= 15 * 60000 && !W._lcRe) { W._lcRe = 1; setTimeout(() => { W._lcRe = 0; if (document.getElementById('w11lc')) W.leagueHome(); }, 400); return; } el.textContent = ms > 0 ? 'in ' + left(ms) : 'playing'; setTimeout(tick, 1000); }; if (n.ko - now > 15 * 60000) tick(); }
  W.bgCheck();
};
W.joinL = async function (sl) {
  toast('⏳ Finding your group…');
  const r = await W.api('/w11/join', { sl });
  if (!r.ok) return toast('⚠️ ' + (r.error || 'Could not join. Try again.'));
  await W.load(); W.G = null;
  if (r.wait) toast(`✅ You're in! Your league starts in Season ${r.wait}.`); else toast(`✅ Welcome to Division 6! Your first match is on matchday ${r.from}.`);
  W.leagueHome();
};
W.helpL = function () {
  W.ui(`<div class="card" style="font-size:12px;line-height:1.55;color:#cbd5e1"><p style="font-weight:900;color:#fff;font-size:14px">❓ How the league works</p>
    <p style="margin-top:8px">📅 <b>1 season = 28 days = 1 year.</b> Days 1–26: one match a day. Day 27: last results are checked. Day 28: promotion, relegation and prizes.</p>
    <p style="margin-top:6px">🏔️ <b>6 divisions</b>, 14 clubs in each group. Top 2 go up, bottom 4 go down.</p>
    <p style="margin-top:6px">📋 <b>Team sheet</b> locks 15 minutes before kick-off. Injured or banned starters are swapped for the best player on the bench.</p>
    <p style="margin-top:6px">📢 <b>Live:</b> both managers can shout, change shape and make subs. Your orders reach the pitch 2 seconds later, so both phones see the same match. Not there? GG AI shouts for you.</p>
    <p style="margin-top:6px">✅ <b>Results</b> are worked out on phones. A result counts when 2 different phones get exactly the same score. When you open 11 Wonders, your phone may quietly check one or two other matches. Nobody checked within a day? The match gets a quick result.</p>
    <p style="margin-top:6px">💪 <b>Fitness:</b> a full match costs 24, each day back gives +15. ⚡ An Energy Pack gives +25 to the whole squad. Tired players play worse and get injured more.</p>
    <p style="margin-top:6px">🤕 <b>Injuries</b> last 1–3 matches. 🩹 One Med-Pack heals one player. 🟨 5 yellows or 🟥 a red = 1-match ban.</p>
    <p style="margin-top:6px">🏋️ <b>Training:</b> once a day, pick attack, defence or fitness. Max 15 of each per season. Resets every season.</p>
    <p style="margin-top:6px">🎂 <b>Ageing:</b> every season players get a year older. They improve until about 27 and drop after about 31. They retire at 34–37 and a 17-year-old takes their place.</p>
    <p style="margin-top:6px">💎 <b>Gems</b> (everyday money) come only from the server: for every win and draw, a prize for your final place, and +${fmt(CC.PROMO_BONUS)} for promotion.</p>
    <p style="margin-top:6px">🪙 <b>GG Coins</b> are rare and precious: +${CC.TOK.promo} for promotion, +${CC.TOK.title} for winning your group, +${CC.TOK.oc[0]} for the Open Cup (+${CC.TOK.oc[1]} runner-up), +${CC.TOK.cl[0]} for the Champions League (+${CC.TOK.cl[1]} runner-up). A crest and kit redesign costs ${CC.TOK.design} 🪙.</p></div>`, '❓ How it works', 'W11.home()');
};

// ---------- 📊 table & 🗓️ fixtures ----------
W.tableL = async function () {
  const G = await W.loadG(true); if (!G) return W.home();
  const now = W.nowS(), { day } = CC.clock(now), md = clamp(day, 1, CC.MDS), tb = CC.table(G, now);
  const rows = tb.map((r, i) => { const n = seatName(G, r.pos, md), z = zone(G.t, i);
    return `<div class="row" style="${n.me ? 'background:rgba(34,211,238,.1);border-radius:10px;' : ''}border-left:3px solid ${z === 'up' ? '#22d3ee' : z === 'down' ? '#ff2d95' : 'transparent'};padding-left:6px"><span style="width:18px;font-weight:900;color:#94a3b8">${i + 1}</span>${mini(n.hue, n.sh)}<span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${n.me ? 900 : 700}">${esc(n.n)}${n.user ? ' <span style="font-size:9px">👤</span>' : ''}</span><span style="width:22px;text-align:center;color:#94a3b8">${r.p}</span><span style="width:30px;text-align:center;color:#94a3b8">${r.gf - r.ga > 0 ? '+' : ''}${r.gf - r.ga}</span><span style="width:26px;text-align:right;font-weight:900">${r.pts}</span></div>`; }).join('');
  W.ui(`<div class="card"><p style="font-weight:900">📊 Division ${G.t} · Group ${G.g + 1} · Season ${G.s}</p><div class="row" style="font-size:10px;color:#94a3b8;font-weight:900"><span style="width:18px">#</span><span style="flex:1;padding-left:30px">Club</span><span style="width:22px;text-align:center">P</span><span style="width:30px;text-align:center">GD</span><span style="width:26px;text-align:right">Pts</span></div>${rows}
    <p style="font-size:10px;color:#94a3b8;margin-top:8px">${G.t > 1 ? '<span style="color:#22d3ee">▌</span> promotion · ' : ''}${G.t < 6 ? '<span style="color:#ff2d95">▌</span> relegation · ' : ''}👤 = a real manager. Computer matches finish at ${localT(CC.aiKo(G.s, md))} each day.</p></div>`, '📊 Table', 'W11.home()');
};
W.fixturesL = async function (md) {
  const G = await W.loadG(); if (!G) return W.home();
  const now = W.nowS(), { day } = CC.clock(now); md = clamp(md || clamp(day, 1, CC.MDS), 1, CC.MDS);
  const list = CC.pairs(md).map(([h, a]) => { const H = seatName(G, h, md), A = seatName(G, a, md), r = CC.result(G, md, h, a, now), k = koOf(G, md, h, a), mine = H.me || A.me;
    return `<div class="row" style="${mine ? 'background:rgba(34,211,238,.1);border-radius:10px;' : ''}"><span style="flex:1;text-align:right;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${H.me ? 900 : 700}">${esc(H.n)}</span>${mini(H.hue, H.sh)}<span style="min-width:58px;text-align:center;font-weight:900">${r ? r[0] + ' – ' + r[1] : `<span style="font-size:10px;color:#94a3b8">${now > k ? '⏳ checking' : localT(k)}</span>`}</span>${mini(A.hue, A.sh)}<span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${A.me ? 900 : 700}">${esc(A.n)}</span></div>`; }).join('');
  W.ui(`<div class="card"><div style="display:flex;align-items:center;gap:8px"><button class="btn2" style="width:44px" onclick="W11.fixturesL(${md - 1})" ${md <= 1 ? 'disabled' : ''}>◀</button><p style="flex:1;text-align:center;font-weight:900">Matchday ${md}<br><span style="font-size:10px;color:#94a3b8">${localT(CC.dayStart(G.s, md), true).split(' · ')[0]}</span></p><button class="btn2" style="width:44px" onclick="W11.fixturesL(${md + 1})" ${md >= CC.MDS ? 'disabled' : ''}>▶</button></div><div style="margin-top:8px">${list}</div></div>`, '🗓️ Fixtures', 'W11.home()');
};

// ---------- 🏋️ training, ⚡ packs, 📜 history ----------
W.trainL = function () {
  const me = W.me, tr = { att: 0, def: 0, fit: 0, ...(me.tr || {}) }, done = me.trd === CC.absDay(Date.now());
  const b = (k, ic, name, what) => `<button class="btn2" style="text-align:left;margin-bottom:8px;padding:12px" ${done || tr[k] >= CC.TR_MAX ? 'disabled' : ''} onclick="W11.doTrain('${k}')"><b>${ic} ${name}</b> <span style="float:right;color:#67e8f9">${tr[k]}/${CC.TR_MAX}</span><br><span style="font-size:11px;color:#94a3b8">${what}</span></button>`;
  W.ui(`<div class="card"><p style="font-weight:900">🏋️ Training · once a day</p><p style="font-size:11px;color:#94a3b8;margin:4px 0 10px">${done ? '✅ Done for today. Come back tomorrow!' : 'Pick one focus for today. Points last until the end of the season.'}</p>
    ${b('att', '⚽', 'Attack', 'Every point: a little better shooting and dribbling for the whole team.')}${b('def', '🧱', 'Defence', 'Every point: a little better tackling and goalkeeping.')}${b('fit', '🏃', 'Fitness', 'Every point: a little faster, and +1 fitness back every day.')}</div>`, '🏋️ Training', 'W11.home()');
};
W.doTrain = async function (f) {
  const r = await W.api('/w11/train', { f }); if (!r.ok) return toast('⚠️ ' + (r.error || 'Try again'));
  W.me.tr = r.tr; W.me.trd = r.trd; toast('💪 Training done!'); W.trainL();
};
W.energyL = async function () {
  const me = W.me; if (!(me.energy > 0)) return toast('No Energy Packs left');
  if (!W.inLeague()) return toast('Energy Packs work in the league. Join it first!');
  if (!confirm(`Use 1 Energy Pack? The whole squad gets +${CC.PACK_FIT} fitness. You have ${me.energy}.`)) return;
  const r = await W.api('/w11/pack', { k: 'energy' }); if (!r.ok) return toast('⚠️ ' + (r.error || 'Try again'));
  Object.assign(W.me, { cond: r.cond, cd: r.cd, energy: r.energy }); toast('⚡ Squad refreshed!'); W.home();
};
W.med = async function (id) {
  const me = W.me; if (!(me.med > 0)) return toast('No Med-Packs left');
  if (!confirm(`Use 1 Med-Pack on ${W.player(id).name}? You have ${me.med}.`)) return;
  const r = await W.api('/w11/pack', { k: 'med', id }); if (!r.ok) return toast('⚠️ ' + (r.error || 'Try again'));
  Object.assign(W.me, { inj: r.inj, med: r.med }); toast('🩹 Healed!'); W.squad();
};
W.histL = function () {
  const me = W.me, h = (me.hist || []).slice().reverse(), l = me.lst || {};
  W.ui(`<div class="card"><p style="font-weight:900">📜 ${esc(me.name)}</p><p style="font-size:12px;color:#94a3b8;margin-top:4px">League: P${l.p || 0} W${l.w || 0} D${l.d || 0} L${l.l || 0} · Goals ${l.gf || 0}–${l.ga || 0}</p></div>
    <div class="card">${h.length ? h.map(x => `<div class="row"><b style="width:74px">Season ${x.s}</b><span style="flex:1">Division ${x.t} · ${ord(x.p)} · ${x.pts} pts</span><span>${x.p === 1 ? '🏆' : ''}${x.up ? '⬆️' : x.down ? '⬇️' : ''}</span></div>`).join('') : '<p style="font-size:12px;color:#94a3b8">Your first season is under way. Finished seasons show here.</p>'}</div>`, '📜 History', 'W11.home()');
};

// ---------- 📡 live league match (both managers, orders 2 seconds later) ----------
const tickAtMs = (startAt, ms) => { const e = (ms - startAt) / 1000; const pl = e <= 0 ? 0 : e <= HALF ? e : e <= HALF + BREAK ? HALF : Math.min(LEN, e - BREAK); return Math.floor(pl / DT); };
const CMD_KEYS = { shout: 1, form: 1, sub: 1, here: 1 };
W.cmdsFrom = function (live, raw) {
  const per = [0, 0], M = live.M, out = [];
  for (const k of Object.keys(raw || {}).sort()) {
    const x = raw[k]; if (!x || (x.s !== 0 && x.s !== 1) || typeof x.t !== 'number' || typeof x.at !== 'number') continue;
    if (!x.by || x.by !== (x.s ? M.au : M.hu)) continue;
    if (x.t < tickAtMs(live.startAt, x.at) + 20 || x.t >= LEN / DT || x.at > live.startAt + TOTAL * 1000) continue;
    let c; try { c = JSON.parse(x.c); } catch (e) { continue; }
    if (!c || typeof c !== 'object' || Object.keys(c).some(q => !CMD_KEYS[q])) continue;
    if (++per[x.s] > 80) continue;
    out.push({ tick: x.t, side: x.s, c, k });
  }
  return out.sort((a, b) => a.tick - b.tick || (a.k < b.k ? -1 : 1));
};
W.teamL = (sh, side, color, S) => ({ name: sh.n, short: sh.sh, color, gkColor: side ? '#a3e635' : '#facc15', form: sh.form, ids: sh.ids, cond: sh.aiCond ? Object.fromEntries(sh.ids.map(i => [i, sh.aiCond])) : (sh.cond || {}), tr: sh.tr || {}, out: (sh.bo || []).concat(sh.io || []), S, league: true });
W.liveFrom = function (mid, M) {
  const kits = (sh, ci) => sh.kits && sh.kits.length ? sh.kits.map(c => ({ c1: c })) : W.aiKits(ci);
  const [hc, ac] = W.pickKits(kits(M.s0, M.h), kits(M.s1, M.a));
  return { kind: 'league', mid, M, seed: hash('w11m:' + mid), startAt: M.ko, home: W.teamL(M.s0, 0, hc, M.s), away: W.teamL(M.s1, 1, ac, M.s) };
};
W.simL = (live, cmds, upTo) => W.simulate(live.home, live.away, live.seed, cmds, upTo);
async function rt() { const d = window.rtdbInit ? await window.rtdbInit() : null; if (!d) return null; const D = window.rtdbApi; if (!W._offOn) { W._offOn = 1; try { D.onValue(D.ref(d, '.info/serverTimeOffset'), (s) => { W.off = Number(s.val()) || 0; }); } catch (e) {} } return { d, D }; }
W.cmdsOnce = async function (live) { const R = await rt(); if (!R) return []; try { const sn = await R.D.get(R.D.ref(R.d, 'w11live/' + live.mid)); return W.cmdsFrom(live, sn.val() || {}); } catch (e) { return []; } };
W.sendL = async function (c) {
  const live = W.live; if (!live || W.my < 0) return; const R = await rt(); if (!R) return toast('⚠️ No live connection');
  const t = Math.max(W.m.tick, tickAtMs(live.startAt, W.nowS())) + 40;
  try { await R.D.push(R.D.ref(R.d, 'w11live/' + live.mid), { by: uidNow(), s: W.my, t, c: JSON.stringify(c), at: R.D.serverTimestamp() }); if (!c.here) toast('📣 Order sent: on the pitch in 2 seconds'); } catch (e) { toast('⚠️ Order not sent. Check your internet.'); }
};
W.openL = async function (mid) {
  const f = await fbLoad(); let M = null;
  try { const sn = await f.getDoc(f.doc(db(), 'w11m', mid)); M = sn.exists() ? sn.data() : null; } catch (e) {}
  await rt();
  if (!M) return toast('Match not ready yet. Try again in a minute.');
  if (M.st === 'final') return W.resultL(mid, M);
  if (M.st !== 'locked') {
    W.ui(`<div class="card" style="text-align:center"><p style="font-size:30px">📋</p><p style="font-weight:900;margin-top:6px">Locking the team sheets…</p><p style="font-size:12px;color:#94a3b8;margin-top:6px">Kick-off ${localT(M.ko, true)}. This takes up to 5 minutes. This page refreshes by itself.</p></div>`, '⚽ Matchday ' + M.md, 'W11.home()');
    clearTimeout(W._olT); W._olT = setTimeout(() => { if (document.getElementById('w11')) W.openL(mid); }, 20000); return;
  }
  const uid = uidNow(), my = M.hu === uid ? 0 : M.au === uid ? 1 : -1;
  W.playL(W.liveFrom(mid, M), my);
};
W.playL = async function (live, my) {
  W.stopLoop(); W.live = live; W.my = my; const R = await rt();
  let raw = {}, cmds = [], m = null, applied = '', ci = 0;
  const target = () => Math.floor((function () { const e = (W.nowS() - live.startAt) / 1000; return e <= 0 ? 0 : e <= HALF ? e : e <= HALF + BREAK ? HALF : Math.min(LEN, e - BREAK); })() / DT);
  const rebuild = () => { const tg = m ? m.tick : target(); m = W.simL(live, cmds, tg); m.P.forEach(p => { p.px = p.x; p.py = p.y; }); W.m = m; ci = cmds.findIndex(c => c.tick >= m.tick); if (ci < 0) ci = cmds.length; applied = JSON.stringify(cmds.filter(c => c.tick < m.tick)); };
  const onRaw = () => { cmds = W.cmdsFrom(live, raw); W._cmds = cmds; if (!m) return; const a = JSON.stringify(cmds.filter(c => c.tick < m.tick)); if (a !== applied) rebuild(); else { ci = cmds.findIndex(c => c.tick >= m.tick); if (ci < 0) ci = cmds.length; } };
  if (R) { try { const sn = await R.D.get(R.D.ref(R.d, 'w11live/' + live.mid)); raw = sn.val() || {}; } catch (e) {} }
  cmds = W.cmdsFrom(live, raw); W._cmds = cmds; rebuild();
  if (R) { const ref = R.D.ref(R.d, 'w11live/' + live.mid); const u1 = R.D.onChildAdded(ref, (s) => { raw[s.key] = s.val(); onRaw(); }), u2 = R.D.onChildChanged(ref, (s) => { raw[s.key] = s.val(); onRaw(); }); W._unsub = () => { try { u1(); u2(); } catch (e) {} }; }
  const M = live.M, ctl = my >= 0;
  W.ui(`<div style="position:relative"><div class="sb"><span style="font-weight:900;color:${m.T[0].color}">${esc(m.T[0].short)}</span><span class="sc" id="w11sc">0–0</span><span style="font-weight:900;color:${m.T[1].color}">${esc(m.T[1].short)}</span><span class="tm" id="w11tm">1'</span></div>
    <canvas id="w11c"></canvas>
    ${ctl ? `<div class="alert" id="w11al">📢 TOUCHLINE MOMENT · shout now!</div>
    <div class="shouts" id="w11sh">${[['attack', '📣 Attack'], ['tight', '🧱 Tight'], ['press', '⚡ Press'], ['calm', '🧘 Calm']].map(([k, l]) => `<button data-k="${k}" onclick="W11.shout('${k}')">${l}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px"><button class="btn2" onclick="W11.subMenu()">🔁 Subs (<span id="w11subs">5</span>)</button><button class="btn2" onclick="W11.formMenu()">📐 Formation</button></div>` : '<p style="font-size:11px;color:#94a3b8;margin-top:8px;text-align:center">👀 Watching</p>'}
    <div class="tick" id="w11tk"></div><div class="tip">${M.cup ? CC.CUP_NAME[M.cup] + ' · ' + esc(M.rn || '') + (CC.isKO({ k: M.cup }, M.cr) ? ' · a draw goes to penalties' : '') : 'League · Division ' + M.t + ' · Matchday ' + M.md}. You are ${my === 0 ? 'the home side (left → right)' : my === 1 ? 'the away side (right → left)' : 'watching'}. Orders reach the pitch 2 seconds after you tap.</div><div id="w11ov"></div></div>`, M.cup ? '🏆 CUP MATCH' : '🏆 League', 'W11.leaveMatch()');
  if (ctl && !Object.values(raw).some(x => x && x.by === uidNow() && /here/.test(x.c || ''))) W.sendL({ here: 1 });
  const pitch = new Pitch(document.getElementById('w11c')); pitch.size(); W._pitch = pitch; window.addEventListener('resize', () => pitch.size(), { once: true });
  let seenEv = 0;
  const frame = () => {
    if (!document.getElementById('w11c')) return W.stopLoop();
    const e = (W.nowS() - live.startAt) / 1000, pl = e <= 0 ? 0 : e <= HALF ? e : e <= HALF + BREAK ? HALF : Math.min(LEN, e - BREAK), ft = pl / DT, tg = Math.floor(ft);
    let guard = 0; while (m.tick < tg && !m.over && guard++ < 5000) { while (ci < cmds.length && cmds[ci].tick === m.tick) { m.applyCmd(cmds[ci].side, cmds[ci].c); m.cmds.push(cmds[ci]); ci++; } m.step(); }
    applied = JSON.stringify(cmds.filter(c => c.tick < m.tick));
    pitch.draw(m, clamp(ft - tg, 0, 1));
    const sc = document.getElementById('w11sc'); if (sc) sc.textContent = `${m.T[0].score}–${m.T[1].score}`;
    const tm = document.getElementById('w11tm'); if (tm) tm.textContent = e < 0 ? 'Kick-off ' + left(-e * 1000) : e > HALF && e < HALF + BREAK ? `HT · ${Math.ceil(HALF + BREAK - e)}s` : m.over ? 'FT' : m.minute() + "'";
    if (m.ev.length !== seenEv) { const news = m.ev.slice(seenEv); seenEv = m.ev.length; W.feed(m); if (ctl && news.some(x => x.k === 'alert')) W.pulse(); if (news.some(x => x.k === 'goal' && x.side === my) && navigator.vibrate) try { navigator.vibrate([80, 40, 120]); } catch (er) {} }
    if (ctl) { W.halfTime(e > HALF && e < HALF + BREAK, m); const subs = document.getElementById('w11subs'); if (subs) subs.textContent = m.T[my].subsLeft; }
    if (m.over && e > TOTAL + Math.max(6, W.cerDur(live).close) && !W.hold()) { W.stopLoop(); return W.finishL(live); }
    W._raf = requestAnimationFrame(frame);
  };
  W._raf = requestAnimationFrame(frame); W.feed(m);
};
W.stopLoop = (function (b) { return function () { b(); if (W._unsub) { W._unsub(); W._unsub = null; } }; })(W.stopLoop);
W.voted = (mid) => { try { return JSON.parse(localStorage.getItem('w11_voted') || '[]').includes(mid); } catch (e) { return false; } };
W.markVoted = (mid) => { try { const a = JSON.parse(localStorage.getItem('w11_voted') || '[]'); a.push(mid); localStorage.setItem('w11_voted', JSON.stringify(a.slice(-60))); } catch (e) {} };
/* work out the whole match from the start with every order, and send the result */
W.checkL = async function (mid, M) {
  const live = W.liveFrom(mid, M), cmds = await W.cmdsOnce(live), m = W.simL(live, cmds), r = W.resultStr(m);
  const j = await W.api('/w11/result', { mid, r }); if (j.ok) W.markVoted(mid);
  return { m, r, j };
};
W.finishL = async function (live) {
  const my = W.my; W.ui('<p style="text-align:center;padding:40px 0;color:#94a3b8">⏱️ Full time! Working out the official result…</p>', 'Full time');
  const { m, r, j } = await W.checkL(live.mid, live.M);
  const a = m.T[0], b = m.T[1], pt = a.poss + b.poss || 1, goals = m.ev.filter(e => e.k === 'goal'), mineGf = my === 1 ? b.score : a.score, mineGa = my === 1 ? a.score : b.score;
  const LM = live.M, pk = LM.cup && CC.isKO({ k: LM.cup }, LM.cr) && a.score === b.score ? CC.pens(live.mid) : null;
  let res = my < 0 ? '' : mineGf > mineGa ? 'w' : mineGf < mineGa ? 'l' : 'd'; if (pk && res) res = (pk[0] > pk[1] ? 0 : 1) === my ? 'w' : 'l';
  const coins = LM.cup ? (my < 0 ? 0 : CC.cupCoins(LM.cup, LM.cr, a.score, b.score, live.mid, my)) : res === 'w' ? CC.winCoins(LM.t) : res === 'd' ? CC.drawCoins(LM.t) : 0;
  const status = j.final ? (j.final === r ? `✅ Result confirmed${coins ? ` · +${fmt(coins)} 💎` : ''}` : `✅ Confirmed by other phones: ${esc(String(j.final).split('|')[0])}`) : j.ok ? '⏳ Waiting for a second phone to check the result. Gems arrive once it is confirmed.' : '⚠️ ' + esc(j.error || 'Could not send the result. It will be sent next time you open 11 Wonders.');
  W.G = null; await W.load();
  W.ui(`<div class="card" style="text-align:center">${res ? `<p style="font-size:12px;font-weight:900;color:${res === 'w' ? '#a3e635' : res === 'l' ? '#ff2d95' : '#facc15'}">${res === 'w' ? 'WIN' : res === 'l' ? 'DEFEAT' : 'DRAW'}</p>` : ''}
    <p style="font-size:34px;font-weight:900">${a.score}–${b.score}</p>${pk ? `<p style="font-size:13px;font-weight:900;color:#facc15">🥅 Penalties ${pk[0]}–${pk[1]}</p>` : ''}<p style="font-size:12px;color:#94a3b8">${esc(a.name)} vs ${esc(b.name)}${LM.cup ? ' · ' + CC.CUP_NAME[LM.cup] + ' · ' + esc(LM.rn || '') : ''}</p>
    <div style="text-align:left;margin-top:10px;font-size:12px">${goals.map(g => `<p>${g.min}' ${esc(g.txt.replace(/ \d+–\d+$/, ''))}</p>`).join('') || '<p style="color:#94a3b8">No goals</p>'}</div>
    <p style="font-size:11px;color:#94a3b8;margin-top:8px">Possession ${Math.round(a.poss / pt * 100)}% · Shots ${a.shots}–${b.shots} · On target ${a.onT}–${b.onT}</p>
    <div class="tip" style="text-align:left">${status}</div>
    <button class="btn" style="margin-top:14px" onclick="W11.home()">${LM.cup ? 'Back' : 'Back to the league'}</button></div>`, 'Full time');
};
W.resultL = async function (mid, M) {
  const [sc] = String(M.r || '').split('|');
  let goals = ''; if (!M.q && M.s0 && M.s1) { const live = W.liveFrom(mid, M), m = W.simL(live, await W.cmdsOnce(live)); goals = m.ev.filter(e => e.k === 'goal').map(g => `<p>${g.min}' ${esc(g.txt.replace(/ \d+–\d+$/, ''))}</p>`).join(''); }
  const pk = M.cup ? (CC.cupResStr(M.cup, M.cr, ...String(sc).split('-').map(Number), mid).split('/')[1] || '') : '';
  W.ui(`<div class="card" style="text-align:center"><p style="font-size:11px;color:#94a3b8">${M.cup ? CC.CUP_NAME[M.cup] + ' · ' + esc(M.rn || '') : 'Matchday ' + M.md} · ${M.q ? '⚡ quick result (nobody checked it in time)' : '✅ confirmed'}</p><p style="font-size:34px;font-weight:900">${esc(sc)}</p>${pk ? `<p style="font-size:13px;font-weight:900;color:#facc15">🥅 Penalties ${esc(pk.replace('-', '–'))}</p>` : ''}<p style="font-size:12px;color:#94a3b8">${esc((M.s0 && M.s0.n) || '')} vs ${esc((M.s1 && M.s1.n) || '')}</p><div style="text-align:left;margin-top:10px;font-size:12px">${goals}</div><button class="btn" style="margin-top:14px" onclick="W11.home()">Back</button></div>`, 'Result');
};
/* 🔍 quietly check your own finished matches and 1–2 others (keeps everyone honest) */
W.bgCheck = function () {
  if (W._bg) return; W._bg = 1;
  setTimeout(async () => {
    try {
      const f = await fbLoad(), G = W.G, now = W.nowS(), todo = [];
      if (G && W.inLeague()) W.myFixtures(G).filter(x => x.mine && !x.res && now > x.ko + TOTAL * 1000 + 15000 && !W.voted(x.id)).slice(0, 3).forEach(x => todo.push(x.id));
      for (const id of todo) { try { const sn = await f.getDoc(f.doc(db(), 'w11m', id)); const M = sn.exists() ? sn.data() : null; if (M && M.st === 'locked') { await W.checkL(id, M); await new Promise(r => setTimeout(r, 400)); } } catch (e) {} }
      const j = await W.api('/w11/job', {}); for (const M of (j && j.jobs) || []) { if (!M.s0 || !M.s1) continue; await W.checkL(M.id, M); await new Promise(r => setTimeout(r, 400)); }
    } catch (e) { console.warn('11W check', e); }
  }, 4000);
};
W.open = (function (b) { return async function () { await b(); if (W.inLeague() && document.getElementById('w11') && !W.live) { const G = await W.loadG(); const n = G && W.nextMatch(G); if (n && W.nowS() > n.ko - 60000 && W.nowS() < n.ko + TOTAL * 1000) W.openL(n.id); } }; })(W.open);
W.leaveMatch = (function (b) { return function () { if (W.live && W.live.kind === 'league') { W.stopLoop(); W.live = null; toast('⏱️ The match keeps playing. GG AI keeps your last orders.'); return W.home(); } return b(); }; })(W.leaveMatch);

// ===================== 🔨 G3a · market, youth draft, releases, Pioneer wonders =====================
const POSC = { GK: '#facc15', DEF: '#22d3ee', MID: '#a855f7', FWD: '#ff2d95' };
const ptag = (p) => p.legend ? '<span style="font-size:9px;font-weight:900;padding:2px 6px;border-radius:99px;background:linear-gradient(90deg,#facc15,#ff2d95);color:#0b0f24">👑 150 WONDER</span>' : p.wk && p.age <= 21 ? '<span style="font-size:9px;font-weight:900;padding:2px 6px;border-radius:99px;background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24">🌟 WONDERKID</span>' : '';
const pline = (p) => `<span class="ovr" style="${p.legend ? 'background:linear-gradient(135deg,#facc15,#ff2d95,#a855f7);color:#fff' : 'background:' + ovrColor(p.ovr)}">${p.ovr}</span><span style="flex:1;min-width:0"><span style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.flag} <b>${esc(p.name)}</b> ${ptag(p)}</span><span style="font-size:10px;color:#94a3b8"><b style="color:${POSC[p.pos] || '#94a3b8'}">${p.pos}</b> · ${p.age}y · ⚡${p.pac} 🎯${p.sho} 🎩${p.pas} 🪄${p.dri} 🛡️${p.def}${p.pos === 'GK' ? ' 🧤' + p.gk : ''}</span></span>`;
W.chips = () => { const c = document.querySelector('#w11 .chips'); if (c && W.me) c.innerHTML = `<span>💎 ${fmt(W.me.coins)}</span><span>🪙 ${fmt(W.me.gems)}</span>`; };
W.giftWaiting = () => { const me = W.me; return !!(me && me.pioneer && me.pioneerNo >= 1 && me.pioneerNo <= CC.PIONEERS && !me.leg); };

// ---------- buttons on the home screens ----------
W.g3Bar = function () {
  const b = document.getElementById('w11b'); if (!b || b.querySelector('[data-g3]') || !W.me || W.live) return;
  const me = W.me, S = CC.clock(W.nowS()).s, ydone = me.yd === S;
  const html = `<div data-g3>${W.giftWaiting() ? `<div class="card" onclick="W11.gift()" style="cursor:pointer;text-align:center"><p style="font-size:22px">🎁</p><p style="font-weight:900">Your Pioneer wonder is waiting!</p><p style="font-size:11px;color:#cbd5e1;margin-top:4px">One 150-OVR player for each of the first 50 managers. Tap to claim.</p></div>` : ''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px"><button class="btn" onclick="W11.market()">🔨 Transfer Market<br><span style="font-size:10px;font-weight:800">15 live auctions</span></button><button class="btn2" onclick="W11.youthD()">🧒 Youth Draft<br><span style="font-size:10px;color:${ydone ? '#a3e635' : '#ff2d95'}">${ydone ? '✅ done this season' : '● 15 youngsters waiting'}</span></button></div></div>`;
  const first = b.querySelector('.card'); if (first) first.insertAdjacentHTML('afterend', html); else b.insertAdjacentHTML('afterbegin', html);
  if (W.giftWaiting() && !W._giftTried) { W._giftTried = 1; W.gift(true); }
};
W.home = (function (b) { return function () { const r = b.apply(this, arguments); Promise.resolve(r).then(() => W.g3Bar()); return r; }; })(W.home);
W.leagueHome = (function (b) { return async function () { await b.apply(this, arguments); W.g3Bar(); }; })(W.leagueHome);
W.close = (function (b) { return function () { W.stopMk(); return b.apply(this, arguments); }; })(W.close);

// ---------- 🌟 Pioneer wonder ----------
W.gift = async function (auto) {
  const r = await W.api('/w11/gift', {});
  if (!r.ok) { if (!auto || r.full) toast('⚠️ ' + (r.error || 'Could not claim. Try again.')); return; }
  await W.load(); if (r.already) return;
  const p = W.player(r.id);
  W.ui(`<div class="card" style="text-align:center"><p style="font-size:44px">👑</p><p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#facc15">PIONEER #${W.me.pioneerNo} · ONE OF ONLY 50</p>
    <p style="font-size:22px;font-weight:900;margin-top:6px">${p.flag} ${esc(p.name)}</p><p style="font-size:13px;color:#cbd5e1;margin-top:4px">${p.pos} · ${p.age} years old</p>
    <p style="font-size:54px;font-weight:900;margin-top:8px;background:linear-gradient(90deg,#facc15,#ff2d95,#a855f7);-webkit-background-clip:text;background-clip:text;color:transparent">${p.ovr}</p><p style="font-size:11px;color:#94a3b8">OVR</p>
    <p style="font-size:12px;color:#cbd5e1;margin-top:10px">Thank you for being one of the first 50 managers. Only 50 players like this will ever exist in 11 Wonders. He is now in your squad. Move him into your top 18 to play him!</p>
    <button class="btn" style="margin-top:14px" onclick="W11.squad()">👕 See my squad</button></div>`, '🎁 PIONEER WONDER', 'W11.home()');
};

// ---------- 🔨 transfer market ----------
W.stopMk = function () { if (W._mkUnsub) { try { W._mkUnsub(); } catch (e) {} W._mkUnsub = null; } clearInterval(W._mkIv); W._mkIv = null; };
W.market = async function (pos, sort) {
  const F = W._mkF = W._mkF || { pos: 'ALL', sort: 'end' }; if (pos) F.pos = pos; if (sort) F.sort = sort;
  if (document.getElementById('w11mk')) { W.mkChips(); return W.mkDraw(); }
  W.stopMk();
  W.ui(`<div class="card" style="padding:12px"><p style="font-size:11px;color:#cbd5e1">15 players are up for auction at the same time. Each auction lasts <b>60 seconds</b>, and the next player comes up the moment it ends. A bid in the last 10 seconds puts the clock back to <b>10 seconds</b>. 🤖 = computer clubs: they bid too. Your 💎 Gems are held while you are the top bidder and come back if someone beats you.</p><div id="w11mkf"></div></div><div id="w11mk"><p style="text-align:center;color:#94a3b8;padding:20px">Loading the market…</p></div>`, '🔨 TRANSFER MARKET', 'W11.stopMk();W11.home()');
  W.mkChips();
  try { rt(); } catch (e) {}
  W._lots = W._lots || {};
  try {
    const f = await fbLoad();
    W._mkUnsub = f.onSnapshot(f.collection(db(), 'w11a'), (qs) => {
      const me = uidNow();
      qs.forEach(d => { const i = Number(d.id), o = W._lots[i], L = { ...d.data(), i };
        if (o && o.u === me && o.n === L.n && L.u !== me) { toast(`😮 Outbid on ${W.player(CC.lotPid(i, L.n, L.st)).short}! Your ${fmt(o.p)} 💎 are back.`); W.load().then(W.chips); }
        W._lots[i] = L; });
      W.mkDraw();
    }, (e) => console.warn('11W market', e));
  } catch (e) { console.warn(e); }
  W._mkIv = setInterval(W.mkDraw, 1000); W.mkDraw();
};
W.mkChips = function () {
  const el = document.getElementById('w11mkf'); if (!el) return; const F = W._mkF;
  const chip = (on, label, js) => `<button onclick="${js}" style="padding:6px 10px;border-radius:10px;font-size:11px;font-weight:900;${on ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.06)'}">${label}</button>`;
  el.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">${['ALL', 'GK', 'DEF', 'MID', 'FWD', 'MINE'].map(p => chip(F.pos === p, p === 'MINE' ? '⭐ My bids' : p === 'ALL' ? 'All' : p, `W11.market('${p}')`)).join('')}</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px">${[['end', '⏱️ Ending soon'], ['ovr', '📈 Best OVR'], ['price', '💎 Cheapest']].map(([k, l]) => chip(F.sort === k, l, `W11.market(null,'${k}')`)).join('')}<span style="margin-left:auto;font-size:10px;color:#94a3b8;align-self:center">Squad ${(W.me.ids || []).length}/25</span></div>`;
};
const prevTxt = (i, L, cur, same, now) => {
  if (!cur.n) return '';
  let w, un, pr, ai, pid;
  if (same && L.prev && L.prev.n === cur.n - 1) ({ w, un, p: pr, ai, pid } = L.prev);
  else { const PL = !same && L && L.n === cur.n - 1 ? L : { i, n: cur.n - 1, st: cur.st - CC.MK_LEN }, E = CC.lotEff(PL, now); w = E.winner || ''; un = PL.un; pr = E.price; ai = E.aiClub; pid = E.pid; }
  const p = W.player(pid);
  return `<p style="font-size:10px;color:#64748b;margin-top:6px">Last: ${esc(p.short)} (${p.ovr}) ${w === 'u' ? `sold to 👤 ${esc(un || 'a manager')} for ${fmt(pr)}` : w === 'ai' ? `bought by 🤖 ${esc(CC.club(ai).name)} for ${fmt(pr)}` : 'unsold'}</p>`;
};
W.mkDraw = function () {
  const el = document.getElementById('w11mk'); if (!el) return W.stopMk();
  const now = W.nowS(), me = uidNow(), F = W._mkF, rows = [];
  for (let i = 0; i < CC.MK_N; i++) {
    const L = W._lots[i] || null, cur = CC.lotCur(i, L, now), same = !!(L && L.n === cur.n), E = CC.lotEff(same ? L : { i, n: cur.n, st: cur.st }, now), p = W.player(E.pid, CC.clock(cur.st).s);
    rows.push({ i, L, cur, same, E, p, mine: same && L.u === me });
    if (L && L.u === me && !L.done && CC.lotEff(L, now).closed) W.mkClaim(L);
  }
  let list = rows.filter(r => F.pos === 'ALL' || (F.pos === 'MINE' ? r.mine : r.p.pos === F.pos));
  list.sort(F.sort === 'ovr' ? (a, b) => b.p.ovr - a.p.ovr : F.sort === 'price' ? (a, b) => a.E.minNext - b.E.minNext : (a, b) => a.E.end - b.E.end);
  el.innerHTML = list.map(({ i, L, cur, same, E, p, mine }) => {
    const ms = Math.max(0, E.end - now), hot = ms < 10000, step = CC.stepOf(E.minNext);
    const top = E.top === 'u' ? (mine ? '<b style="color:#a3e635">🟢 You are top bidder</b>' : `👤 ${esc(L.un || 'a manager')}`) : E.top === 'ai' ? `🤖 ${esc(CC.club(E.aiClub).name)} <span style="font-size:9px;color:#94a3b8">(computer club)</span>` : '<span style="color:#94a3b8">No bids yet · start ' + fmt(E.start) + '</span>';
    const btns = mine && E.top === 'u' ? `<button class="btn2" disabled style="margin-top:8px">✅ Leading with ${fmt(E.price)} 💎</button>`
      : `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px"><button class="btn" onclick="W11.bid(${i},${cur.n},${E.minNext})">Bid ${fmt(E.minNext)}</button><button class="btn2" onclick="W11.bid(${i},${cur.n},${E.minNext + 2 * step})">Bid ${fmt(E.minNext + 2 * step)}</button></div>`;
    return `<div class="card" style="padding:12px${mine ? ';box-shadow:0 0 16px rgba(163,230,53,.25)' : ''}"><div class="row" style="border:0;padding:0">${pline(p)}<span style="font-weight:900;font-size:15px;padding:4px 8px;border-radius:10px;background:${hot ? 'rgba(255,45,149,.25);color:#ff2d95' : 'rgba(34,211,238,.12);color:#67e8f9'}">${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px"><span>${top}</span><b>${E.top ? fmt(E.price) + ' 💎' : ''}</b></div>${btns}${prevTxt(i, L, cur, same, now)}</div>`;
  }).join('') || '<p style="text-align:center;color:#94a3b8;padding:20px">No players here right now. Try another filter.</p>';
};
W.bid = async function (i, n, amt) {
  if (W._bidding) return; W._bidding = 1;
  if (amt > (W.me.coins || 0)) { W._bidding = 0; return toast('⚠️ Not enough 💎 Gems'); }
  const r = await W.api('/w11/bid', { i, n, amt }); W._bidding = 0;
  if (r.ok) { W.me.coins = r.coins; W.chips(); toast('🔨 Bid placed: ' + fmt(amt) + ' 💎'); W._lots[i] = { ...r.lot, i }; W.mkDraw(); }
  else { toast('⚠️ ' + (r.error || 'Could not bid')); if (r.full) setTimeout(() => W.releaseMenu(), 600); }
};
W.mkClaim = async function (L) {
  W._claimed = W._claimed || {}; const k = L.i + ':' + L.n; if (W._claimed[k]) return; W._claimed[k] = 1;
  const E = CC.lotEff(L, W.nowS()), p = W.player(E.pid);
  await W.api('/w11/claim', {}); await W.load(); W.chips(); W.mkChips();
  if (E.winner === 'u') toast((W.me.ids || []).includes(E.pid) ? `✅ ${p.name} joined your squad! Move him into your top 18 to play him.` : '⚠️ Your squad was full, so your 💎 Gems came back.');
  else toast(`🤖 ${CC.club(E.aiClub).name} sniped ${p.short} at the end. Your ${fmt(L.p)} 💎 are back.`);
};

// ---------- 🧒 youth draft ----------
W.youthD = function () {
  const me = W.me, S = CC.clock(W.nowS()).s, ids = CC.youthIds(S, me.club, CC.hasStaff(me, 'sc', S) ? CC.SCOUT_N : 15), done = me.yd === S;
  const room = Math.max(0, CC.MAX_SQUAD - (me.ids || []).length), max = Math.min(5, room);
  if (!W._yp || W._yps !== S) { W._yp = []; W._yps = S; }
  const P = ids.map((id, k) => ({ k, id, p: W.player(id, S) })).sort((a, b) => b.p.ovr - a.p.ovr || a.k - b.k);
  const intro = `<div class="card"><p style="font-weight:900">🧒 Youth Draft · Season ${S}</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">Every season (28 days) your scouts find <b>${ids.length} youngsters aged 15–17</b>${ids.length > 15 ? ' (🔭 your Scout found 5 extra)' : ''}. Keep your best <b>5</b>. The rest go to other clubs. 🌟 Wonderkids are rare: they can grow into world-class stars.</p></div>`;
  if (done) { const kept = ids.filter(id => (me.ids || []).includes(id)).map(id => W.player(id, S)); return W.ui(intro + `<div class="card"><p style="font-weight:900;color:#a3e635">✅ Done for this season</p>${kept.map(p => `<div class="row">${pline(p)}</div>`).join('') || '<p style="font-size:12px;color:#94a3b8">(already released)</p>'}<p style="font-size:11px;color:#94a3b8;margin-top:8px">New youngsters arrive in Season ${S + 1}: ${localT(CC.dayStart(S + 1, 1), true)}.</p></div>`, '🧒 YOUTH DRAFT', 'W11.home()'); }
  const sel = W._yp;
  W.ui(intro + `<div class="card"><p style="font-weight:900">Pick up to ${max} <span style="font-size:11px;color:#94a3b8">· ${sel.length} picked</span></p>${room < 5 ? `<div class="tip">Your squad has room for only ${room}. <button onclick="W11.releaseMenu()" style="text-decoration:underline;font-weight:900">Release players</button> to keep more.</div>` : ''}
    ${P.map(({ k, p }) => `<div class="row ${sel.includes(k) ? 'sel' : ''}" onclick="W11.yPick(${k})" style="cursor:pointer">${pline(p)}<span style="font-size:18px">${sel.includes(k) ? '✅' : '⬜'}</span></div>`).join('')}
    <button class="btn" style="margin-top:12px" ${sel.length ? '' : 'disabled'} onclick="W11.yGo()">Keep ${sel.length || ''} youngster${sel.length === 1 ? '' : 's'}</button><p style="font-size:10px;color:#94a3b8;margin-top:6px">You can only pick once a season.</p></div>`, '🧒 YOUTH DRAFT', 'W11.home()');
};
W.yPick = function (k) {
  const S = CC.clock(W.nowS()).s, max = Math.min(5, Math.max(0, CC.MAX_SQUAD - (W.me.ids || []).length)), sel = W._yp, at = sel.indexOf(k);
  if (at >= 0) sel.splice(at, 1); else if (sel.length < max) sel.push(k); else toast(max ? `You can keep ${max}. Untick one first.` : 'Your squad is full (25). Release a player first.');
  W._yps = S; W.youthD();
};
W.yGo = async function () {
  if (W._yBusy || !W._yp.length) return; W._yBusy = 1;
  const r = await W.api('/w11/draft', { picks: W._yp.slice() }); W._yBusy = 0;
  if (!r.ok) return toast('⚠️ ' + (r.error || 'Could not save. Try again.'));
  W.me.ids = r.ids; W.me.yd = r.yd; W._yp = [];
  toast('✅ Welcome to the club, youngsters! They are in your reserves.'); W.youthD();
};

// ---------- 🗑️ release ----------
W.releaseMenu = function () {
  const me = W.me, S = CC.clock(W.nowS()).s, P = (me.ids || []).map(id => W.player(id, S)), can = P.length > CC.MIN_SQUAD;
  W.ui(`<div class="card"><p style="font-weight:900">🗑️ Release a player</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">Squad: <b>${P.length}/25</b>. You get 10% of the player's value back. Keep at least ${CC.MIN_SQUAD} players.</p></div>
    <div class="card">${P.map(p => { const v = CC.releaseValue(p), ask = W._rel === p.id; return `<div class="row">${pline(p)}<button ${can ? '' : 'disabled'} onclick="W11.release('${p.id}')" style="padding:6px 8px;border-radius:10px;font-size:10px;font-weight:900;${ask ? 'background:#ff2d95;color:#fff' : 'background:rgba(255,255,255,.06)'}">${ask ? (p.legend ? 'Sure? He never comes back' : 'Tap again') : 'Release' + (v ? ' +' + fmt(v) : '')}</button></div>`; }).join('')}</div>`, '🗑️ RELEASE', 'W11.squad()');
};
W.release = async function (id) {
  if (W._rel !== id) { W._rel = id; return W.releaseMenu(); }
  W._rel = null; const p = W.player(id);
  const r = await W.api('/w11/release', { id });
  if (!r.ok) { toast('⚠️ ' + (r.error || 'Could not release. Try again.')); return W.releaseMenu(); }
  W.me.ids = r.ids; W.me.coins = r.coins; W.me.ovr = W.avg(r.ids);
  toast(`👋 ${p.name} left the club${r.back ? ' · +' + fmt(r.back) + ' 💎' : ''}`); W.releaseMenu();
};

// ===================== 🏆 G3b · cups, club HQ (stadium, sponsors, staff), Hall of Fame =====================
const cupSeatMine = (C, ci) => ci >= 0 && W.me && CC.seat(C, ci) === W.me.club;
const cupNm = (C, ci) => { if (ci < 0) return { n: 'bye', sh: '–', hue: 220 }; const u = CC.cupUser(C, ci), sc = CC.seat(C, ci); if (u) return { n: u.n, sh: u.sh, user: true, me: u.u === uidNow(), hue: CC.club(sc).hue }; const c = CC.club(sc); return { n: c.name, sh: c.short, hue: c.hue }; };
const scoreTxt = (x) => { if (x === 'bye') return 'bye'; const v = CC.cupScore(x); return v ? v[0] + ' – ' + v[1] + (/\//.test(x) ? `<br><span style="font-size:9px;color:#facc15">pens ${v[2]}–${v[3]}</span>` : '') : ''; };
W.loadCups = async function (force) {
  const S = CC.clock(W.nowS()).s;
  if (!force && W._cups && W._cups.S === S && Date.now() - W._cups.at < 60000) return W._cups;
  const out = { S, at: Date.now(), oc: null, cl: null };
  if (S >= CC.CUP_FIRST) { const f = await fbLoad(); for (const k of ['oc', 'cl']) { if (!CC.cupOn(S, k)) continue; try { const sn = await f.getDoc(f.doc(db(), 'w11c', S + '-' + k)); out[k] = sn.exists() ? sn.data() : null; } catch (e) {} } }
  W._cups = out; W._nextCup = W.nextCup(); return out;
};
/* my cup matches (rounds that are drawn so far) */
W.myCupFix = function (C) {
  const out = []; if (!C || !W.me) return out;
  for (let r = 1; r <= C.R; r++) { const P = CC.cupPairs(C, r); if (!P) { if (C.k === 'cl' && r <= CC.CL_GR) continue; break; }
    P.forEach((p, k) => { const h = cupSeatMine(C, p[0]), a = cupSeatMine(C, p[1]); if (!h && !a) return;
      const ready = (C.pr || 0) >= r, real = !ready || ((C.pu && C.pu[r]) || []).includes(k);
      out.push({ C, k: C.k, r, i: k, p, home: h, opp: p[h ? 1 : 0], ko: p[0] < 0 || p[1] < 0 ? 0 : CC.cupKoOf(C, r, p, k), mid: CC.cupMid(C.s, C.k, r, k), x: (C.rr && C.rr[r] && C.rr[r][k]) || (C.ur && C.ur[r + '_' + k]) || null, done: !!(C.rr && C.rr[r]), real }); }); }
  return out;
};
W.nextCup = function () { const D = W._cups; if (!D) return null; let best = null;
  for (const k of ['oc', 'cl']) for (const f of W.myCupFix(D[k])) if (!f.x && f.ko && f.real && W.nowS() < f.ko + MS + 15 * 60000 && (!best || f.ko < best.ko)) best = f;
  return best; };
/* where am I in this cup? */
const cupState = (C) => { const F = W.myCupFix(C); if (!F.length) return { out: true, none: true };
  const last = F[F.length - 1]; if (C.champ && cupSeatMine(C, C.champ.ci)) return { won: true, F };
  const lost = F.find(f => f.done && f.x !== 'bye' && CC.isKO(C, f.r) && CC.winSide(f.x, f.p) !== (f.home ? 0 : 1));
  if (lost) return { lost, F };
  if (C.k === 'cl' && (C.rr || {})[CC.CL_GR] && !F.some(f => f.r > CC.CL_GR)) return { groupOut: true, F };
  return { alive: true, F, next: F.find(f => !f.x && f.ko) || null, bye: F.find(f => !f.x && !f.ko) || null, last }; };

// ---------- 🏠 extra buttons + next cup match on the home screens ----------
W.g3Bar = (function (b) { return function () { b.apply(this, arguments); W.g3bBar(); }; })(W.g3Bar);
W.g3bBar = function () {
  const box = document.querySelector('#w11b [data-g3]'); if (!box || box.querySelector('[data-g3b]') || !W.me) return;
  box.insertAdjacentHTML('beforeend', `<div data-g3b><div id="w11cupc"></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px"><button class="btn2" onclick="W11.cups()" style="padding:12px 4px">🏆 Cups</button><button class="btn2" onclick="W11.hq()" style="padding:12px 4px">🏟️ Club HQ</button><button class="btn2" onclick="W11.hof()" style="padding:12px 4px">🏛️ Hall of Fame</button></div></div>`);
  W.loadCups().then(() => { const el = document.getElementById('w11cupc'), n = W._nextCup; if (!el || !n) return;
    const o = cupNm(n.C, n.opp), ms = n.ko - W.nowS(), live = ms <= 0;
    el.innerHTML = `<div class="card"><p style="font-weight:900">${live ? '<span style="color:#ff2d95">● LIVE NOW</span>' : CC.CUP_NAME[n.k]} · ${esc(CC.roundName(n.C, n.r))}</p><div style="display:flex;align-items:center;gap:8px;margin-top:8px">${mini(o.hue, o.sh)}<p style="flex:1;font-weight:900">${n.home ? 'vs' : '@'} ${esc(o.n)} ${o.user ? '<span style="font-size:10px;color:#67e8f9">👤 manager</span>' : ''}</p></div>
      <p style="font-size:11px;color:#94a3b8;margin-top:6px">${localT(n.ko, true)} · ${live ? 'playing' : 'in ' + left(ms)}</p>${ms < 15 * 60000 ? `<button class="btn" style="margin-top:10px" onclick="W11.openL('${n.mid}')">${live ? '▶ Go to the touchline' : '🔒 Team sheet locked · open match'}</button>` : ''}</div>`; });
  W.cupCheck();
};
W.leagueLock = (function (b) { return function () { const x = b.apply(this, arguments); if (x) return x; const n = W._nextCup; if (!n) return null; const ms = n.ko - W.nowS();
  if (ms < 15 * 60000 && ms > -MS - 30000) return ms > 0 ? `Your cup match starts in ${Math.ceil(ms / 60000)} min. Friendlies are locked 15 minutes before official matches.` : 'Your cup match is being played right now!'; return null; }; })(W.leagueLock);
W.open = (function (b) { return async function () { await b.apply(this, arguments); if (!W.me || W.live || !document.getElementById('w11')) return; await W.loadCups(); const n = W._nextCup; if (n && W.nowS() > n.ko - 60000 && W.nowS() < n.ko + TOTAL * 1000) W.openL(n.mid); }; })(W.open);
/* quietly send results of my own finished cup matches */
W.cupCheck = function () { if (W._cupBg) return; W._cupBg = 1;
  setTimeout(async () => { try { const D = await W.loadCups(), f = await fbLoad(), now = W.nowS();
    for (const k of ['oc', 'cl']) for (const x of W.myCupFix(D[k])) { if (x.x || !x.ko || !x.real || now < x.ko + TOTAL * 1000 + 15000 || W.voted(x.mid)) continue;
      try { const sn = await f.getDoc(f.doc(db(), 'w11m', x.mid)); const M = sn.exists() ? sn.data() : null; if (M && M.st === 'locked') { await W.checkL(x.mid, M); await new Promise(r => setTimeout(r, 400)); } } catch (e) {} }
  } catch (e) { console.warn('11W cup check', e); } }, 6000); };

// ---------- 🏆 cups screen ----------
const tabs = (cur, list) => `<div style="display:grid;grid-template-columns:repeat(${list.length},1fr);gap:6px;margin-bottom:12px">${list.map(([k, l, js]) => `<button onclick="${js}" style="padding:10px 4px;border-radius:12px;font-size:12px;font-weight:900;${k === cur ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.06)'}">${l}</button>`).join('')}</div>`;
const cupInfo = () => `<div class="card" style="font-size:12px;line-height:1.55;color:#cbd5e1"><p>🏆 <b>Open Cup</b>: every club in the pyramid, knockout. One round every 2 days (even days), final on day 24. The best clubs skip the first round. Win: +${fmt(CC.OC_WIN)} 💎 · Cup winner +${fmt(CC.CUP_PRIZE.oc[0])} · Runner-up +${fmt(CC.CUP_PRIZE.oc[1])}</p>
  <p style="margin-top:6px">⭐ <b>Champions League</b> (from Season ${CC.CL_FIRST}): last season's group champions (64 best, filled up with runners-up). 16 groups of 4 on days 7–17, top 2 go through, then knockout on days 19–27. Final on day 27. Win +${fmt(CC.CL_WIN)} · draw +${fmt(CC.CL_DRAW)} · Champion +${fmt(CC.CUP_PRIZE.cl[0])} · Runner-up +${fmt(CC.CUP_PRIZE.cl[1])}</p>
  <p style="margin-top:6px">⏰ Every cup match has <b>its own kick-off time</b>, any quarter hour between 06:15 and 23:45 GMT. Some days the cup match comes first, some days the league match. A cup match never starts within 20 minutes of a league kick-off. A knockout draw goes to 🥅 penalties. Cup cards and injuries count in the league too.</p></div>`;
W.cups = async function (k, r) {
  W.ui('<p style="text-align:center;padding:40px 0;color:#94a3b8">Loading the cups…</p>', '🏆 CUPS', 'W11.home()');
  const D = await W.loadCups(true), S = D.S;
  if (S < CC.OC_FIRST) return W.ui(`<div class="card" style="text-align:center"><p style="font-size:34px">🏆⭐</p><p style="font-weight:900;margin-top:6px">The cups start in Season ${CC.CUP_FIRST}</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">${localT(CC.dayStart(CC.CUP_FIRST, 1), true)}. Win your group this season to play in the first Champions League!</p></div>` + cupInfo(), '🏆 CUPS', 'W11.home()');
  k = k || W._cupK || (D.cl && cupState(D.cl).alive ? 'cl' : 'oc'); W._cupK = k; const C = D[k];
  const top = tabs(k, [['oc', '🏆 Open Cup', "W11.cups('oc')"], ['cl', '⭐ Champions League', "W11.cups('cl')"]]);
  if (!C) return W.ui(top + (CC.cupOn(S, k) ? `<div class="card"><p style="font-weight:900">${CC.CUP_NAME[k]} · Season ${S}</p><p style="font-size:12px;color:#94a3b8;margin-top:6px">${S === CC.OC_FIRST ? 'The first Open Cup is being drawn right now. Check back in a few minutes!' : 'The draw is made on day 28 of the season before. Check back soon!'}</p></div>` : `<div class="card" style="text-align:center"><p style="font-size:34px">⭐</p><p style="font-weight:900;margin-top:6px">The Champions League starts in Season ${CC.CL_FIRST}</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">${localT(CC.dayStart(CC.CL_FIRST, 1), true)}. Win your group this season to play in the first one!</p></div>`) + cupInfo(), '🏆 CUPS', 'W11.home()');
  const st = cupState(C), cur = (() => { for (let q = 1; q <= C.R; q++) if (!(C.rr && C.rr[q])) return q; return C.R; })();
  r = clamp(r || cur, 1, C.R);
  let me = '';
  if (st.won) me = `<p style="font-size:30px;text-align:center">🏆</p><p style="font-weight:900;text-align:center;color:#facc15">You won the ${CC.CUP_NAME[k].slice(2)}!</p>`;
  else if (st.none) me = `<p style="font-weight:900">${k === 'cl' ? 'Not in this season\'s Champions League' : 'Not in this season\'s Open Cup'}</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">${k === 'cl' ? 'Win your group this season to play in it next season.' : 'Every club in the pyramid is drawn on day 28. Join the league to be in the next one.'}</p>`;
  else if (st.lost) me = `<p style="font-weight:900">😔 Knocked out in the ${esc(CC.roundName(C, st.lost.r))}</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">There's always next season.</p>`;
  else if (st.groupOut) me = `<p style="font-weight:900">😔 Out in the group stage</p>`;
  else if (st.next) { const n = st.next, o = cupNm(C, n.opp); me = `<p style="font-weight:900">✅ Still in! Next: ${esc(CC.roundName(C, n.r))}</p><div style="display:flex;align-items:center;gap:8px;margin-top:8px">${mini(o.hue, o.sh)}<p style="flex:1;font-weight:900">${n.home ? 'vs' : '@'} ${esc(o.n)}${o.user ? ' <span style="font-size:10px;color:#67e8f9">👤</span>' : ''}</p></div><p style="font-size:11px;color:#94a3b8;margin-top:4px">${n.ko ? localT(n.ko, true) : ''}${n.real ? '' : ' · ⚡ quick result (you joined after the draw)'}</p>${n.ko && n.ko - W.nowS() < 15 * 60000 && n.real ? `<button class="btn" style="margin-top:8px" onclick="W11.openL('${n.mid}')">▶ Open match</button>` : ''}`; }
  else if (st.bye) me = `<p style="font-weight:900">✅ Still in! You skip ${esc(CC.roundName(C, st.bye.r))}</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">The best clubs skip the first round. You go straight into the next one.</p>`;
  else me = `<p style="font-weight:900">✅ Still in!</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">The next draw comes when this round is finished.</p>`;
  const champ = C.champ ? `<div class="card" style="text-align:center"><p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#facc15">SEASON ${C.s} CHAMPION</p><p style="font-size:20px;font-weight:900;margin-top:4px">🏆 ${esc(C.champ.n)}</p><p style="font-size:11px;color:#94a3b8">Runner-up: ${esc((C.ru || {}).n || '')}</p></div>` : '';
  const nav = `<div style="display:flex;align-items:center;gap:8px"><button class="btn2" style="width:44px" onclick="W11.cups('${k}',${r - 1})" ${r <= 1 ? 'disabled' : ''}>◀</button><p style="flex:1;text-align:center;font-weight:900">${esc(CC.roundName(C, r))}<br><span style="font-size:10px;color:#94a3b8">Day ${CC.cupDay(C, r)} · ${localT(CC.dayStart(C.s, CC.cupDay(C, r)), true).split(' · ')[0]}</span></p><button class="btn2" style="width:44px" onclick="W11.cups('${k}',${r + 1})" ${r >= C.R ? 'disabled' : ''}>▶</button></div>`;
  let body = '';
  if (k === 'cl' && r <= CC.CL_GR) {
    const mine = []; for (let g = 0; g < 16; g++) mine.push([g, [0, 1, 2, 3].some(j => cupSeatMine(C, C.gs[4 * g + j]))]);
    mine.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    body = mine.map(([g, my]) => { const t = CC.clTable(C, g, true);
      return `<div style="margin-top:10px;${my ? 'background:rgba(34,211,238,.06);border-radius:12px;padding:4px' : ''}"><p style="font-size:10px;font-weight:900;color:#67e8f9;letter-spacing:.1em">GROUP ${String.fromCharCode(65 + g)}</p>${t.map((x, i) => { const n = cupNm(C, x.ci); return `<div class="row" style="border-left:3px solid ${i < 2 ? '#22d3ee' : 'transparent'};padding-left:6px;${n.me ? 'font-weight:900' : ''}">${mini(n.hue, n.sh)}<span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(n.n)}${n.user ? ' 👤' : ''}</span><span style="width:22px;text-align:center;color:#94a3b8">${x.p}</span><span style="width:30px;text-align:center;color:#94a3b8">${x.gf - x.ga > 0 ? '+' : ''}${x.gf - x.ga}</span><b style="width:24px;text-align:right">${x.pts}</b></div>`; }).join('')}</div>`; }).join('') + `<p style="font-size:10px;color:#94a3b8;margin-top:8px"><span style="color:#22d3ee">▌</span> top 2 go through to the Round of 32</p>`;
  }
  const P = CC.cupPairs(C, r);
  let list = '';
  if (!P) list = `<p style="font-size:12px;color:#94a3b8;margin-top:10px">Drawn when the ${esc(CC.roundName(C, r - 1))} is finished.</p>`;
  else {
    const rows = P.map((p, i) => ({ p, i, x: (C.rr && C.rr[r] && C.rr[r][i]) || (C.ur && C.ur[r + '_' + i]) || null, my: cupSeatMine(C, p[0]) || cupSeatMine(C, p[1]), u: !!(CC.cupUser(C, p[0]) || CC.cupUser(C, p[1])) }));
    const show = (k === 'cl' && r <= CC.CL_GR ? rows.filter(x => x.my) : rows).sort((a, b) => b.my - a.my || b.u - a.u || a.i - b.i), cap = 60;
    list = show.slice(0, cap).map(({ p, i, x, my, u }) => { const H = cupNm(C, p[0]), A = cupNm(C, p[1]), kt = p[0] >= 0 && p[1] >= 0 ? CC.cupKoOf(C, r, p, i) : 0;
      return `<div class="row" style="${my ? 'background:rgba(34,211,238,.1);border-radius:10px;' : ''}"><span style="flex:1;text-align:right;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${H.me ? 900 : 700}">${esc(H.n)}${H.user ? ' 👤' : ''}</span>${mini(H.hue, H.sh)}<span style="min-width:58px;text-align:center;font-weight:900">${x ? scoreTxt(x) : `<span style="font-size:10px;color:#94a3b8">${kt && W.nowS() > kt ? '⏳' : kt ? localT(kt) : ''}</span>`}</span>${mini(A.hue, A.sh)}<span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:${A.me ? 900 : 700}">${A.user ? '👤 ' : ''}${esc(A.n)}</span></div>`; }).join('')
      + (show.length > cap ? `<p style="font-size:10px;color:#94a3b8;margin-top:6px">+ ${show.length - cap} more matches between computer clubs</p>` : '');
  }
  W.ui(top + champ + `<div class="card">${me}</div><div class="card">${nav}${body}<div style="margin-top:8px">${list}</div></div>` + cupInfo(), '🏆 CUPS', 'W11.home()');
};

// ---------- 🏟️ club HQ: stadium, sponsors, staff ----------
const spTerms = (o) => [o.up ? `+${fmt(o.up)} now` : '', o.pm ? `+${fmt(o.pm)} every match` : '', o.ph ? `+${fmt(o.ph)} every home match` : '', o.phw ? `+${fmt(o.phw)} every home win` : '', o.phg ? `+${fmt(o.phg)} every home goal` : '', o.pg ? `+${fmt(o.pg)} every goal` : '', o.pw ? `+${fmt(o.pw)} every win` : '', o.top2 ? `+${fmt(o.top2)} if you finish top 2` : '', o.cup ? `+${fmt(o.cup)} if you win a cup` : ''].filter(Boolean).join(' · ');
const SP_TXT = { sh: ['👕 Shirt sponsor', 'Pays for every match you play (league and cups).'], st: ['🏟️ Stadium sponsor', 'Pays for your home matches.'], bo: ['🏆 Bonus sponsor', 'Pays when you win, score or lift a trophy.'] };
const STF_TXT = { ph: ['🩹 Physio', `+${CC.PHYSIO_REC} fitness back every day, fewer and shorter injuries.`], sc: ['🔭 Scout', '5 extra youngsters in your Youth Draft, with a much better wonderkid chance.'], as: ['📋 Assistant', 'At the 15-minute lock, swaps very tired starters (under 60) for a fresh bench player in the same position.'] };
W.hq = function () {
  const me = W.me, S = CC.clock(W.nowS()).s, lv = CC.stdLv(me), nm = (me.std && me.std.nm) || (me.name + ' Park'), t = me.lg && me.lg.s === S ? me.lg.t : 6, off = CC.spOffers(S, me.club, t);
  const std = `<div class="card"><p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">🏟️ STADIUM · LEVEL ${lv}/5</p><p style="font-size:20px;font-weight:900;margin-top:4px">${esc(nm)} <button onclick="W11.stdName()" style="font-size:12px;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,.08)">✏️</button></p>
    <div class="steps">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= lv ? 'done' : ''}"></i>`).join('')}</div>
    <p style="font-size:12px;color:#cbd5e1">💺 ${fmt(CC.STD_SEATS[lv - 1])} seats · 💎 <b>+${fmt(CC.STD_TICKET[lv - 1])}</b> Gems every home match (league and cups)</p>
    ${lv < 5 ? `<button class="btn" style="margin-top:10px" onclick="W11.stdUp()">⬆️ Level ${lv + 1}: ${fmt(CC.STD_SEATS[lv])} seats · +${fmt(CC.STD_TICKET[lv])} a home match · costs ${fmt(CC.STD_COST[lv])} 💎</button>` : '<p style="font-size:12px;color:#a3e635;margin-top:8px">🏟️ The biggest stadium there is!</p>'}</div>`;
  const sp = CC.SP_KINDS.map(kd => { const got = CC.spOf(me, S, kd), [ttl, why] = SP_TXT[kd];
    return `<div style="margin-top:10px"><p style="font-weight:900">${ttl}</p><p style="font-size:11px;color:#94a3b8">${why}</p>${got ? `<div class="tip">✅ <b>${esc(got.n)}</b> · ${spTerms(got)}</div>` : off[kd].map((o, k) => `<button class="btn2" style="text-align:left;margin-top:6px" onclick="W11.spSign('${kd}',${k})"><b>${esc(o.n)}</b> <span style="float:right;color:#67e8f9">Sign</span><br><span style="font-size:11px;color:#cbd5e1">${spTerms(o)}</span></button>`).join('')}</div>`; }).join('');
  const stf = Object.keys(CC.STAFF).map(k => { const [ttl, why] = STF_TXT[k], got = CC.hasStaff(me, k, S);
    return `<div class="row" style="align-items:flex-start"><span style="flex:1"><b>${ttl}</b><br><span style="font-size:11px;color:#94a3b8">${why}</span></span>${got ? '<b style="color:#a3e635;font-size:11px">✅ Hired</b>' : `<button onclick="W11.hire('${k}')" style="padding:7px 10px;border-radius:10px;font-size:11px;font-weight:900;background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24;white-space:nowrap">Hire · ${fmt(CC.STAFF[k])}</button>`}</div>`; }).join('');
  W.ui(std + `<div class="card"><p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">🤝 SPONSORS · SEASON ${S}</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">Sign 1 of each kind for this season. Deals end when the season ends; new offers come every season (better in higher divisions). All brands are made up.</p>${sp}</div>
    <div class="card"><p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">👔 STAFF · SEASON ${S}</p><p style="font-size:11px;color:#94a3b8;margin:4px 0 6px">Hired for one season. Hire again next season.</p>${stf}</div>`, '🏟️ CLUB HQ', 'W11.home()');
};
const hqDo = async (path, body, okMsg) => { if (W._hqBusy) return; W._hqBusy = 1; const r = await W.api(path, body); W._hqBusy = 0; if (!r.ok) return toast('⚠️ ' + (r.error || 'Try again')); ['std', 'sp', 'stf', 'coins'].forEach(k => { if (r[k] != null) W.me[k] = r[k]; }); toast(okMsg); W.hq(); };
W.stdUp = function () { const lv = CC.stdLv(W.me); if (lv >= 5) return; if ((W.me.coins || 0) < CC.STD_COST[lv]) return toast('⚠️ Not enough 💎 Gems'); if (!confirm(`Upgrade your stadium to level ${lv + 1} for ${fmt(CC.STD_COST[lv])} 💎 Gems?`)) return; hqDo('/w11/stadium', { act: 'up' }, '🏟️ Stadium upgraded!'); };
W.stdName = function () { const nm = prompt('Name your stadium (3–30 letters)', (W.me.std && W.me.std.nm) || (W.me.name + ' Park')); if (nm == null) return; hqDo('/w11/stadium', { act: 'name', nm }, '✅ Stadium renamed'); };
W.spSign = function (kd, k) { const S = CC.clock(W.nowS()).s, t = W.me.lg && W.me.lg.s === S ? W.me.lg.t : 6, o = CC.spOffers(S, W.me.club, t)[kd][k]; if (!confirm(`Sign ${o.n} for Season ${S}?\n${spTerms(o)}\nYou can't change it until next season.`)) return; hqDo('/w11/sponsor', { kind: kd, k }, '🤝 Deal signed with ' + o.n); };
W.hire = function (k) { if ((W.me.coins || 0) < CC.STAFF[k]) return toast('⚠️ Not enough 💎 Gems'); if (!confirm(`Hire the ${STF_TXT[k][0].slice(2).trim()} for this season for ${fmt(CC.STAFF[k])} 💎 Gems?`)) return; hqDo('/w11/staff', { k }, '👔 Welcome to the club!'); };

// ---------- 🏛️ Hall of Fame ----------
W.hof = async function (s) {
  W.ui('<p style="text-align:center;padding:40px 0;color:#94a3b8">Opening the Hall of Fame…</p>', '🏛️ HALL OF FAME', 'W11.home()');
  const f = await fbLoad(), S = CC.clock(W.nowS()).s; let tro = {}, H = null;
  try { const sn = await f.getDoc(f.doc(db(), 'w11meta', 'hof')); tro = (sn.exists() && sn.data().tro) || {}; } catch (e) {}
  if (s == null) { s = S - 1; try { const sn = await f.getDoc(f.doc(db(), 'w11hof', String(S))); if (sn.exists() && (sn.data().oc || sn.data().cl)) { s = S; H = sn.data(); } } catch (e) {} }
  s = clamp(s, 1, S);
  if (!H) { try { const sn = await f.getDoc(f.doc(db(), 'w11hof', String(s))); H = sn.exists() ? sn.data() : null; } catch (e) {} }
  const nav = `<div style="display:flex;align-items:center;gap:8px"><button class="btn2" style="width:44px" onclick="W11.hof(${s - 1})" ${s <= 1 ? 'disabled' : ''}>◀</button><p style="flex:1;text-align:center;font-weight:900">Season ${s}</p><button class="btn2" style="width:44px" onclick="W11.hof(${s + 1})" ${s >= S ? 'disabled' : ''}>▶</button></div>`;
  const ent = (ic, label, e) => e ? `<div class="row"><span style="font-size:18px">${ic}</span><span style="flex:1"><span style="font-size:10px;color:#94a3b8">${label}</span><br><b>${esc(e.n)}</b>${e.u ? ' <span style="font-size:10px;color:#67e8f9">👤</span>' : ''}${e.ru ? `<br><span style="font-size:10px;color:#94a3b8">Runner-up: ${esc(e.ru.n)}</span>` : ''}</span></div>` : '';
  let season = '';
  if (!H) season = `<p style="font-size:12px;color:#94a3b8;margin-top:10px">${s >= S ? 'This season is still being played. Champions are added on day 28 (cups when their final is played).' : 'No champions saved for this season.'}</p>`;
  else { const d = Object.values(H.d || {}).sort((a, b) => a.t - b.t || a.g - b.g), by = {}; d.forEach(e => { (by[e.t] = by[e.t] || []).push(e); });
    season = ent('⭐', 'Champions League', H.cl) + ent('🏆', 'Open Cup', H.oc) + Object.keys(by).map(t => `<p style="font-size:10px;font-weight:900;color:#67e8f9;letter-spacing:.1em;margin-top:10px">DIVISION ${t} CHAMPIONS</p>${by[t].map(e => `<div class="row"><span style="width:62px;color:#94a3b8;font-size:10px">${Number(t) > 1 ? 'Group ' + (e.g + 1) : ''}</span><span style="flex:1;font-weight:${e.u ? 900 : 700}">🥇 ${esc(e.n)}${e.u ? ' <span style="font-size:10px;color:#67e8f9">👤</span>' : ''}</span></div>`).join('')}`).join(''); }
  const top = Object.entries(tro).map(([ci, x]) => ({ ci, n: x.n, l: x.l || 0, oc: x.oc || 0, cl: x.cl || 0 })).sort((a, b) => b.cl - a.cl || b.oc - a.oc || b.l - a.l || a.n.localeCompare(b.n)).slice(0, 25);
  W.ui(`<div class="card">${nav}${season}</div>
    <div class="card"><p style="font-weight:900">🏆 Most trophies (all time)</p><p style="font-size:10px;color:#94a3b8;margin-bottom:4px">⭐ Champions League · 🏆 Open Cup · 🥇 group titles</p>${top.length ? top.map((x, i) => `<div class="row"><b style="width:20px;color:#94a3b8">${i + 1}</b><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:800">${esc(x.n)}${Number(x.ci) >= 100000 ? ' 👤' : ''}</span><span style="font-size:11px;font-weight:900">${x.cl ? '⭐' + x.cl + ' ' : ''}${x.oc ? '🏆' + x.oc + ' ' : ''}${x.l ? '🥇' + x.l : ''}</span></div>`).join('') : '<p style="font-size:12px;color:#94a3b8">The first trophies are handed out at the end of Season 1.</p>'}</div>
    <div class="card"><p style="font-weight:900">👑 The 50 Pioneer wonders</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">Only 50 players with 150 OVR will ever exist: one for each of the first 50 managers.</p><div id="w11pio"><button class="btn2" style="margin-top:8px" onclick="W11.hofPio()">Show them</button></div></div>`, '🏛️ HALL OF FAME', 'W11.home()');
};
W.hofPio = async function () {
  const el = document.getElementById('w11pio'); if (!el) return; el.innerHTML = '<p style="font-size:12px;color:#94a3b8;margin-top:8px">Loading…</p>';
  const f = await fbLoad(); let L = [];
  try { const qs = await f.getDocs(f.query(f.collection(db(), 'w11Clubs'), f.where('pioneer', '==', true), f.limit(50))); qs.forEach(d => { const x = d.data(); if (x.leg) L.push(x); }); } catch (e) {}
  L.sort((a, b) => (a.pioneerNo || 0) - (b.pioneerNo || 0));
  el.innerHTML = L.length ? L.map(x => { const p = W.player(x.leg); return `<div class="row"><b style="width:30px;color:#facc15">#${x.pioneerNo}</b><span class="ovr" style="background:linear-gradient(135deg,#facc15,#ff2d95,#a855f7);color:#fff">${p.ovr}</span><span style="flex:1;min-width:0"><span style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">👑 ${p.flag} <b>${esc(p.name)}</b></span><span style="font-size:10px;color:#94a3b8">${p.pos} · ${p.age}y · ${esc(x.name)}</span></span></div>`; }).join('') : '<p style="font-size:12px;color:#94a3b8;margin-top:8px">No wonders claimed yet.</p>';
};

// ---------- 📜 trophies in club history · ❓ help ----------
W.histL = (function (b) { return function () { b.apply(this, arguments); const T = (W.me.tro || []).slice().reverse(), el = document.getElementById('w11b'); if (!el || !T.length) return;
  el.insertAdjacentHTML('afterbegin', `<div class="card"><p style="font-weight:900">🏆 Trophies</p>${T.map(x => `<div class="row"><b style="width:74px">Season ${x.s}</b><span style="flex:1">${CC.CUP_NAME[x.k]}</span><span>${x.p === 1 ? '🥇 Winner' : '🥈 Runner-up'}</span></div>`).join('')}</div>`); }; })(W.histL);
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🏆 <b>Cups</b>: the Open Cup for every club, from Season 1 (even days, final day 24), and from Season ${CC.CL_FIRST} the Champions League for last season's group champions (odd days from day 7, final day 27). Every cup match has its own kick-off time (06:15–23:45 GMT), never at the same time as a league match. Knockout draws go to penalties.</p>
    <p style="margin-top:6px">🏟️ <b>Club HQ</b>: grow your stadium for more ticket 💎 Gems every home match, sign 3 sponsors each season (shirt, stadium, bonus) and hire staff (🩹 Physio, 🔭 Scout, 📋 Assistant) for one season.</p>
    <p style="margin-top:6px">🏛️ <b>Hall of Fame</b>: every season's champions, the all-time trophy table and the 50 Pioneer wonders.</p>`); }; })(W.helpL);
// =====================================================================
// 🎨🎥 G4 · kits & crests (more options, paid redesign), 🪙 rare GG Coins, and stylised 3D:
// goal replays (no skip, live radar in the corner), opening + closing ceremonies, 3D live match,
// trophy lift, 3D stadium in Club HQ, spinning kit preview. Own tiny WebGL engine (no download).
// build.sh pastes this file into w11.js at the G4 marker.
// =====================================================================
W.weak = (() => { try { return !!((navigator.deviceMemory && navigator.deviceMemory <= 3) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)); } catch (e) { return false; } })();
const HEX = /^#[0-9a-fA-F]{6}$/, hx = (c, d) => HEX.test(String(c || '')) ? c : d;

// ---------- 🎨 kits & crests ----------
W.COLORS = CC.COLORS; W.SHAPES = CC.SHAPES; W.SYMS = CC.SYMS; W.PATS = CC.PATS;
const PAT_NAME = { plain: 'Plain', stripes: 'Stripes', hoops: 'Hoops', halves: 'Halves', sash: 'Sash', pinstripes: 'Pinstripes', chevron: 'Chevron', gradient: 'Gradient', checker: 'Checker', centre: 'Centre stripe' };
const SHAPE_NAME = { shield: 'Shield', round: 'Round', diamond: 'Diamond', hex: 'Hex', star: 'Star', ring: 'Ring', badge: 'Badge', pennant: 'Pennant' };
W.kitN = (k) => { k = k || {}; const c1 = hx(k.c1, '#22d3ee'), c2 = hx(k.c2, '#ffffff'); return { c1, c2, pat: CC.PATS.includes(k.pat) ? k.pat : 'plain', col: hx(k.col, c2), slv: hx(k.slv, c1), sho: hx(k.sho, c1 === '#ffffff' ? '#111827' : '#ffffff'), soc: hx(k.soc, c1) }; };
W.crestN = (c) => { c = c || {}; return { shape: CC.SHAPES.includes(c.shape) ? c.shape : 'shield', c1: hx(c.c1, '#22d3ee'), c2: hx(c.c2, '#a855f7'), sym: CC.SYMS.includes(c.sym) ? c.sym : 'AB', bd: hx(c.bd, '#ffffff'), band: CC.BANDS.includes(c.band) ? c.band : 'none', bc: hx(c.bc, '#ffffff'), est: !!c.est }; };
const STAR_D = (() => { let d = ''; for (let i = 0; i < 10; i++) { const r = i % 2 ? 10.5 : 24, a = -Math.PI / 2 + i * Math.PI / 5; d += (i ? ' L' : 'M') + (23 + r * Math.cos(a)).toFixed(1) + ' ' + (27 + r * Math.sin(a)).toFixed(1); } return d + ' Z'; })();
const CREST_D = { shield: 'M23 2 L44 9 L41 34 Q37 45 23 50 Q9 45 5 34 L2 9 Z', round: 'M23 3 A22 22 0 1 0 23.01 3 Z', diamond: 'M23 1 L45 26 L23 51 L1 26 Z', hex: 'M23 1 L44 13 L44 39 L23 51 L2 39 L2 13 Z', star: STAR_D, ring: 'M23 3 A22 22 0 1 0 23.01 3 Z', badge: 'M6 3 H40 Q43 3 43 6 V30 Q43 43 23 50 Q3 43 3 30 V6 Q3 3 6 3 Z', pennant: 'M3 2 H43 V24 L23 50 L3 24 Z' };
W.crestSvg = function (cr, short, size, year) {
  const c = W.crestN(cr), id = 'cg' + Math.floor(Math.random() * 1e9), sym = c.sym === 'AB' ? esc(String(short || '').slice(0, 4)) : c.sym, d = CREST_D[c.shape], s = size || 46;
  const band = { none: '', h: '<rect x="0" y="19" width="46" height="10"', v: '<rect x="18" y="0" width="10" height="52"', d: '<path d="M0 10 L10 0 L46 42 L36 52 Z"' }[c.band];
  const big = sym.length > 2 && c.sym === 'AB', fs = (big ? 12 : 16) * (c.shape === 'star' || c.shape === 'diamond' ? 0.8 : 1);
  const ty = (c.shape === 'pennant' ? 26 : c.shape === 'star' ? 31 : big ? 31 : 33) - (c.est ? 3 : 0), ey = { star: 39, pennant: 36, diamond: 40 }[c.shape] || 43;
  return `<svg class="w11crest" style="width:${s}px;height:${Math.round(s * 52 / 46)}px" viewBox="0 0 46 52"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.c1}"/><stop offset="1" stop-color="${c.c2}"/></linearGradient><clipPath id="${id}k"><path d="${d}"/></clipPath></defs><path d="${d}" fill="url(#${id})"/>${band ? `<g clip-path="url(#${id}k)">${band} fill="${c.bc}" opacity=".92"/></g>` : ''}${c.shape === 'ring' ? `<circle cx="23" cy="25" r="16.5" fill="none" stroke="${c.c2 === c.bd ? '#ffffff' : c.bd}" stroke-width="2" opacity=".85"/>` : ''}<path d="${d}" fill="none" stroke="${c.bd}" stroke-width="2.4"/><text x="23" y="${ty}" text-anchor="middle" font-size="${fs}" font-weight="900" fill="#fff" font-family="system-ui" style="paint-order:stroke" stroke="rgba(0,0,0,.25)" stroke-width="1">${sym}</text>${c.est ? `<text x="23" y="${ey}" text-anchor="middle" font-size="5" font-weight="900" fill="#fff" font-family="system-ui" letter-spacing=".4">EST. ${Number(year) || 2026}</text>` : ''}</svg>`;
};
const KIT_BODY = 'M15 4 L20 2 Q25 6 30 2 L35 4 L37 18 L37 48 L13 48 L13 18 Z', KIT_ALL = 'M15 4 L20 2 Q25 6 30 2 L35 4 L47 12 L42 21 L37 18 L37 48 L13 48 L13 18 L8 21 L3 12 Z';
W.kitSvg = function (k, size, full) {
  const K = W.kitN(k), id = 'kp' + Math.floor(Math.random() * 1e9), s = size || 54, b = K.c2;
  const chk = () => { let o = ''; for (let y = 0; y < 50; y += 5) for (let x = 10; x < 40; x += 5) if (((x + y) / 5) % 2) o += `<rect x="${x}" y="${y}" width="5" height="5" fill="${b}"/>`; return o; };
  const pat = { plain: '', stripes: [8, 18, 28, 38].map(x => `<rect x="${x}" y="0" width="5" height="60" fill="${b}"/>`).join(''), hoops: [14, 26, 38].map(y => `<rect x="0" y="${y}" width="60" height="6" fill="${b}"/>`).join(''), halves: `<rect x="25" y="0" width="30" height="60" fill="${b}"/>`, sash: `<path d="M0 8 L14 0 L54 44 L40 54 Z" fill="${b}"/>`,
    pinstripes: [15, 18, 21, 24, 27, 30, 33, 36].map(x => `<rect x="${x}" y="0" width="0.9" height="60" fill="${b}"/>`).join(''), chevron: `<path d="M13 15 L25 27 L37 15 L37 22 L25 34 L13 22 Z" fill="${b}"/>`, gradient: `<rect width="50" height="50" fill="url(#${id}g)"/>`, checker: chk(), centre: `<rect x="21" y="0" width="8" height="60" fill="${b}"/>` }[K.pat] || '';
  const legs = full ? `<path d="M14 49 H36 L37.5 62 H27 L25 56 L23 62 H12.5 Z" fill="${K.sho}" stroke="rgba(255,255,255,.5)" stroke-width=".8"/><rect x="14" y="63" width="8" height="10" rx="1.5" fill="${K.soc}"/><rect x="28" y="63" width="8" height="10" rx="1.5" fill="${K.soc}"/><rect x="13.5" y="72" width="9" height="3.2" rx="1.2" fill="#0b0f24"/><rect x="27.5" y="72" width="9" height="3.2" rx="1.2" fill="#0b0f24"/>` : '';
  const H = full ? 76 : 50, w = full ? Math.round(s * 50 / 76) : s;
  return `<svg width="${w}" height="${s}" viewBox="0 0 50 ${H}"><defs><clipPath id="${id}"><path d="${KIT_BODY}"/></clipPath><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.c1}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><g clip-path="url(#${id})"><rect width="50" height="50" fill="${K.c1}"/>${pat}</g><path d="M15 4 L3 12 L8 21 L13 18 Z" fill="${K.slv}"/><path d="M35 4 L47 12 L42 21 L37 18 Z" fill="${K.slv}"/><path d="M19.5 2.2 Q25 7 30.5 2.2 L32 3 Q25 10 18 3 Z" fill="${K.col}"/><path d="${KIT_ALL}" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1.2"/>${legs}</svg>`;
};
/* the designer: used to create a club and (for GG Coins) to redesign it */
W.createScreen = function () {
  if (!W._draft || W._draft.mode === 'edit') W._draft = { mode: 'create', name: '', short: '', crest: W.crestN({ shape: 'shield', c1: '#22d3ee', c2: '#a855f7', sym: 'AB' }), kits: [{ c1: '#22d3ee', c2: '#ffffff', pat: 'plain' }, { c1: '#ffffff', c2: '#a855f7', pat: 'plain' }, { c1: '#111827', c2: '#ff2d95', pat: 'stripes' }].map(W.kitN), kit: 0 };
  W.designUI();
};
W.redesign = function () {
  const me = W.me; if (!me) return;
  W._draft = { mode: 'edit', short: me.short, crest: W.crestN(me.crest), kits: [0, 1, 2].map(i => W.kitN((me.kits || [])[i])), kit: 0 };
  W.designUI();
};
W.designUI = function () {
  const d = W._draft, edit = d.mode === 'edit', K = d.kits[d.kit], C = d.crest, old = document.getElementById('w11b'), sc = old ? old.scrollTop : 0;
  const sw = (what, key, val) => W.COLORS.map(c => `<button onclick="W11.draft('${what}','${key}','${c}')" aria-label="colour ${c}" style="width:26px;height:26px;border-radius:8px;background:${c};border:2px solid ${val === c ? '#fff' : 'rgba(255,255,255,.15)'}"></button>`).join('');
  const chip = (on, label, js) => `<button onclick="${js}" class="btn2" style="width:auto;padding:7px 10px;${on ? 'border-color:#22d3ee;color:#67e8f9' : ''}">${label}</button>`;
  const cp = d.cp || 'c1', kp = d.kp || 'c1', year = edit ? new Date(W.me.createdAt || Date.now()).getFullYear() : new Date().getFullYear();
  const CP = [['c1', 'Main'], ['c2', 'Second'], ['bd', 'Border'], ['bc', 'Band']], KP = [['c1', 'Shirt'], ['c2', 'Pattern'], ['col', 'Collar'], ['slv', 'Sleeves'], ['sho', 'Shorts'], ['soc', 'Socks']];
  const lbl = (t) => `<p style="font-size:10px;color:#94a3b8;margin-top:10px">${t}</p>`, row = (h) => `<div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">${h}</div>`;
  const head = edit ? `<div class="card"><p style="font-size:18px;font-weight:900">🎨 Redesign your club</p><p style="font-size:12px;color:#94a3b8;margin-top:4px">New crest and kits for <b style="color:#facc15">${CC.TOK.design} 🪙 GG Coins</b>. You have ${fmt(W.me.gems || 0)} 🪙.</p></div>`
    : `<div class="card"><p style="font-size:18px;font-weight:900">Create your club ⚽</p><p style="font-size:12px;color:#94a3b8;margin-top:4px">Name it, design your crest and pick your kits. Your squad is drawn by pure luck. Later changes cost ${CC.TOK.design} 🪙 GG Coins, so choose well!</p></div>
    <div class="card"><p style="font-weight:900">🏷️ Name</p>
      <input id="w11n" maxlength="24" value="${esc(d.name)}" oninput="W11._draft.name=this.value; if(!W11._draft.shortEdited){W11._draft.short=W11.autoShort(this.value); document.getElementById('w11s').value=W11._draft.short;} W11.prev()" placeholder="e.g. Kumasi Thunder FC" style="width:100%;margin-top:8px;padding:12px;border-radius:12px;background:#0b1024;border:1px solid rgba(34,211,238,.3);color:#fff;font-size:15px">
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px"><span style="font-size:11px;color:#94a3b8">Short name</span><input id="w11s" maxlength="3" value="${esc(d.short)}" oninput="W11._draft.short=this.value.toUpperCase(); W11._draft.shortEdited=1; W11.prev()" style="width:70px;padding:8px;border-radius:10px;background:#0b1024;border:1px solid rgba(34,211,238,.3);color:#fff;font-weight:900;text-transform:uppercase"></div></div>`;
  const crest = `<div class="card"><div style="display:flex;gap:12px;align-items:center"><div id="w11pc">${W.crestSvg(C, d.short, 72, year)}</div><p style="font-weight:900">🛡️ Crest</p></div>
    ${lbl('Shape')}${row(CC.SHAPES.map(x => chip(C.shape === x, SHAPE_NAME[x], `W11.draft('crest','shape','${x}')`)).join(''))}
    ${lbl('Colour for')}${row(CP.map(([k, l]) => chip(cp === k, l, `W11.draft('ui','cp','${k}')`)).join(''))}${row(sw('crest', cp, C[cp]))}
    ${lbl('Band')}${row([['none', 'None'], ['h', 'Across'], ['v', 'Down'], ['d', 'Diagonal']].map(([k, l]) => chip(C.band === k, l, `W11.draft('crest','band','${k}')`)).join(''))}
    ${lbl('Symbol')}${row(CC.SYMS.map(x => `<button onclick="W11.draft('crest','sym','${x}')" style="min-width:34px;height:34px;border-radius:10px;font-weight:900;background:rgba(255,255,255,.06);border:2px solid ${C.sym === x ? '#22d3ee' : 'transparent'}">${x === 'AB' ? 'ABC' : x}</button>`).join(''))}
    ${lbl('Founding year')}${row(chip(C.est, C.est ? `✅ EST. ${year}` : `➕ Add "EST. ${year}"`, `W11.draft('crest','est',1)`))}</div>`;
  const kit = `<div class="card"><p style="font-weight:900">👕 Kits</p><div style="display:flex;gap:6px;margin-top:8px">${['Home', 'Away', 'Third'].map((l, i) => `<button onclick="W11.draft('ui','kit',${i})" style="flex:1;padding:6px;border-radius:12px;background:rgba(255,255,255,.05);border:2px solid ${d.kit === i ? '#22d3ee' : 'transparent'}">${W.kitSvg(d.kits[i], 58, true)}<span style="display:block;font-size:10px;font-weight:900">${l}</span></button>`).join('')}</div>
    <div id="w11k3" style="height:190px;margin-top:10px;border-radius:14px;overflow:hidden;background:radial-gradient(circle at 50% 70%,rgba(34,211,238,.18),rgba(7,11,24,0) 70%);display:${W.G3.ok() ? 'block' : 'none'}"></div>
    ${lbl('Colour for')}${row(KP.map(([k, l]) => chip(kp === k, l, `W11.draft('ui','kp','${k}')`)).join(''))}${row(sw('kit', kp, K[kp]))}
    ${lbl('Pattern')}${row(CC.PATS.map(x => chip(K.pat === x, PAT_NAME[x], `W11.draft('kit','pat','${x}')`)).join(''))}
    <p style="font-size:10px;color:#94a3b8;margin-top:10px">If your kit looks too much like your opponent's, the away team switches kits automatically.</p></div>`;
  const btn = edit ? `<button class="btn" onclick="W11.designSave()">✅ Save the new look · ${CC.TOK.design} 🪙</button>` : `<button class="btn" onclick="W11.createGo()">✅ Create my club</button>`;
  W.ui(head + crest + kit + btn, edit ? '🎨 REDESIGN' : 'New club', edit ? 'W11.hq()' : undefined);
  const nb = document.getElementById('w11b'); if (nb) nb.scrollTop = sc;
  W.G3.kitPreview(document.getElementById('w11k3'), K);
};
W.draft = function (what, key, val) { const d = W._draft; if (!d) return; if (what === 'crest') d.crest[key] = key === 'est' ? !d.crest.est : val; else if (what === 'kit') d.kits[d.kit][key] = val; else if (what === 'ui') d[key] = val; W.designUI(); };
W.prev = function () { const el = document.getElementById('w11pc'); if (el && W._draft) el.innerHTML = W.crestSvg(W._draft.crest, W._draft.short, 72, new Date().getFullYear()); };
W.designSave = async function () {
  const d = W._draft, me = W.me; if (!d || !me || W._dsBusy) return;
  if ((me.gems || 0) < CC.TOK.design) return toast(`⚠️ A redesign costs ${CC.TOK.design} 🪙 GG Coins. You have ${me.gems || 0}.`);
  if (!confirm(`Spend ${CC.TOK.design} 🪙 GG Coins on your new crest and kits?`)) return;
  W._dsBusy = 1; const r = await W.api('/w11/design', { crest: d.crest, kits: d.kits }); W._dsBusy = 0;
  if (!r.ok) return toast('⚠️ ' + (r.error || 'Try again'));
  me.crest = r.crest; me.kits = r.kits; me.gems = r.gems; W._draft = null; toast('🎨 Your new look is ready!'); W.hq();
};

// ---------- 🎥 tiny WebGL engine (boxes, cylinders, spheres, lathes; one light, fog, textures) ----------
const G3 = W.G3 = { views: [] };
G3.ok = () => { if (G3._ok != null) return G3._ok; try { const c = document.createElement('canvas'); G3._ok = !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { G3._ok = false; } return G3._ok; };
const M4 = {
  id: () => { const m = new Float32Array(16); m[0] = m[5] = m[10] = m[15] = 1; return m; },
  mul: (a, b) => { const o = new Float32Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3]; return o; },
  persp: (fov, asp, n, f) => { const t = 1 / Math.tan(fov / 2), m = new Float32Array(16); m[0] = t / asp; m[5] = t; m[10] = (f + n) / (n - f); m[11] = -1; m[14] = 2 * f * n / (n - f); return m; },
  look: (e, c, u) => { let zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2], l = Math.sqrt(zx * zx + zy * zy + zz * zz) || 1; zx /= l; zy /= l; zz /= l;
    let xx = u[1] * zz - u[2] * zy, xy = u[2] * zx - u[0] * zz, xz = u[0] * zy - u[1] * zx; l = Math.sqrt(xx * xx + xy * xy + xz * xz) || 1; xx /= l; xy /= l; xz /= l;
    const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    return new Float32Array([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0, -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1]); },
  t: (x, y, z) => { const m = M4.id(); m[12] = x; m[13] = y; m[14] = z; return m; },
  s: (x, y, z) => { const m = M4.id(); m[0] = x; m[5] = y == null ? x : y; m[10] = z == null ? x : z; return m; },
  ry: (a) => { const m = M4.id(), c = Math.cos(a), s = Math.sin(a); m[0] = c; m[2] = -s; m[8] = s; m[10] = c; return m; },
  rx: (a) => { const m = M4.id(), c = Math.cos(a), s = Math.sin(a); m[5] = c; m[6] = s; m[9] = -s; m[10] = c; return m; },
  rz: (a) => { const m = M4.id(), c = Math.cos(a), s = Math.sin(a); m[0] = c; m[1] = s; m[4] = -s; m[5] = c; return m; },
  ch: (...ms) => ms.reduce((a, b) => M4.mul(a, b)),
};
G3.M4 = M4;
const rgb = (h) => { h = String(h || '#ffffff').replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => (parseInt(h.substr(i, 2), 16) || 0) / 255); };
G3.rgb = rgb;
/* geometry: plain triangle lists { p, n, c, t } */
const Geo = () => ({ p: [], n: [], c: [], t: [] });
const pushV = (g, m, p, n, c, t) => { const x = p[0], y = p[1], z = p[2];
  g.p.push(m ? m[0] * x + m[4] * y + m[8] * z + m[12] : x, m ? m[1] * x + m[5] * y + m[9] * z + m[13] : y, m ? m[2] * x + m[6] * y + m[10] * z + m[14] : z);
  const a = n[0], b = n[1], d = n[2]; let nx = m ? m[0] * a + m[4] * b + m[8] * d : a, ny = m ? m[1] * a + m[5] * b + m[9] * d : b, nz = m ? m[2] * a + m[6] * b + m[10] * d : d; const l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
  g.n.push(nx / l, ny / l, nz / l); g.c.push(c[0], c[1], c[2]); g.t.push(t ? t[0] : 0, t ? t[1] : 0); };
const quad = (g, m, a, b, c2, d, n, col, uv) => { const U = uv || [[0, 1], [1, 1], [1, 0], [0, 0]]; [[a, 0], [b, 1], [c2, 2], [a, 0], [c2, 2], [d, 3]].forEach(([p, i]) => pushV(g, m, p, n, col, U[i])); };
G3.box = (g, w, h, d, col, m) => { const x = w / 2, y = h / 2, z = d / 2, c = typeof col === 'string' ? rgb(col) : col;
  quad(g, m, [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z], [0, 0, 1], c); quad(g, m, [x, -y, -z], [-x, -y, -z], [-x, y, -z], [x, y, -z], [0, 0, -1], c);
  quad(g, m, [x, -y, z], [x, -y, -z], [x, y, -z], [x, y, z], [1, 0, 0], c); quad(g, m, [-x, -y, -z], [-x, -y, z], [-x, y, z], [-x, y, -z], [-1, 0, 0], c);
  quad(g, m, [-x, y, z], [x, y, z], [x, y, -z], [-x, y, -z], [0, 1, 0], c); quad(g, m, [-x, -y, -z], [x, -y, -z], [x, -y, z], [-x, -y, z], [0, -1, 0], c); return g; };
/* cylinder from y = 0 down to y = -h (so it swings from the top), colour by height: cols = [[fromY, '#hex'], ...] */
G3.cyl = (g, r1, r2, h, seg, cols, m) => { const cc = (y) => { let c = cols[0][1]; for (const [k, v] of cols) if (-y / h >= k) c = v; return typeof c === 'string' ? rgb(c) : c; };
  for (let i = 0; i < seg; i++) { const a0 = i / seg * Math.PI * 2, a1 = (i + 1) / seg * Math.PI * 2, s0 = Math.sin(a0), c0 = Math.cos(a0), s1 = Math.sin(a1), c1 = Math.cos(a1);
    const B = 6; for (let j = 0; j < B; j++) { const y0 = -h * j / B, y1 = -h * (j + 1) / B, ra = r1 + (r2 - r1) * j / B, rb = r1 + (r2 - r1) * (j + 1) / B, col = cc((y0 + y1) / 2);
      [[[ra * s0, y0, ra * c0], [s0, 0, c0]], [[rb * s0, y1, rb * c0], [s0, 0, c0]], [[rb * s1, y1, rb * c1], [s1, 0, c1]], [[ra * s0, y0, ra * c0], [s0, 0, c0]], [[rb * s1, y1, rb * c1], [s1, 0, c1]], [[ra * s1, y0, ra * c1], [s1, 0, c1]]].forEach(([p, n]) => pushV(g, m, p, n, col)); }
    pushV(g, m, [0, -h, 0], [0, -1, 0], cc(-h)); pushV(g, m, [r2 * s1, -h, r2 * c1], [0, -1, 0], cc(-h)); pushV(g, m, [r2 * s0, -h, r2 * c0], [0, -1, 0], cc(-h));
    pushV(g, m, [0, 0, 0], [0, 1, 0], cc(0)); pushV(g, m, [r1 * s0, 0, r1 * c0], [0, 1, 0], cc(0)); pushV(g, m, [r1 * s1, 0, r1 * c1], [0, 1, 0], cc(0)); } return g; };
G3.sph = (g, r, seg, colFn, m, rows) => { const P = (i, j) => { const th = i / seg * Math.PI, ph = j / (seg * 2) * Math.PI * 2; return [Math.sin(th) * Math.sin(ph), Math.cos(th), Math.sin(th) * Math.cos(ph)]; };
  for (let i = 0; i < (rows || seg); i++) for (let j = 0; j < seg * 2; j++) { const a = P(i, j), b = P(i + 1, j), c = P(i + 1, j + 1), d = P(i, j + 1), col = typeof colFn === 'function' ? colFn(i, j) : rgb(colFn);
    [a, b, c, a, c, d].forEach(v => pushV(g, m, [v[0] * r, v[1] * r, v[2] * r], v, col)); } return g; };
G3.lathe = (g, prof, seg, col, m) => { const c = rgb(col); for (let i = 0; i < seg; i++) { const a0 = i / seg * Math.PI * 2, a1 = (i + 1) / seg * Math.PI * 2;
  for (let k = 0; k < prof.length - 1; k++) { const [r0, y0] = prof[k], [r1, y1] = prof[k + 1], P = (r, y, a) => [r * Math.sin(a), y, r * Math.cos(a)], N = (a) => [Math.sin(a), 0.2, Math.cos(a)];
    [[P(r0, y0, a0), N(a0)], [P(r1, y1, a1), N(a1)], [P(r1, y1, a0), N(a0)], [P(r0, y0, a0), N(a0)], [P(r0, y0, a1), N(a1)], [P(r1, y1, a1), N(a1)]].forEach(([p, n]) => pushV(g, m, p, n, c)); } } return g; };
G3.plane = (g, w, d, col, m, uv) => { const c = rgb(col), x = w / 2, z = d / 2; quad(g, m, [-x, 0, z], [x, 0, z], [x, 0, -z], [-x, 0, -z], [0, 1, 0], c, uv || [[0, 1], [1, 1], [1, 0], [0, 0]]); return g; };
G3.init = function () {
  if (G3.gl) return G3.gl;
  const cv = document.createElement('canvas'); cv.style.cssText = 'display:block;width:100%;height:100%;border-radius:0;box-shadow:none';
  const gl = cv.getContext('webgl', { antialias: !W.weak, alpha: false, preserveDrawingBuffer: false }) || cv.getContext('experimental-webgl'); if (!gl) { G3._ok = false; return null; }
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec3 aP;attribute vec3 aN;attribute vec3 aC;attribute vec2 aT;uniform mat4 uPV;uniform mat4 uM;uniform vec3 uL;varying vec3 vC;varying vec2 vT;varying float vS;varying float vD;void main(){vec4 w=uM*vec4(aP,1.0);gl_Position=uPV*w;vec3 n=normalize((uM*vec4(aN,0.0)).xyz);vS=max(dot(n,uL),0.0);vC=aC;vT=aT;vD=gl_Position.w;}'));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec3 vC;varying vec2 vT;varying float vS;varying float vD;uniform vec4 uK;uniform sampler2D uX;uniform float uU;uniform float uA;uniform float uE;uniform vec3 uF;uniform float uFd;void main(){vec4 c=vec4(vC,1.0)*uK;if(uU>0.5)c*=texture2D(uX,vT);float l=mix(uA+(1.0-uA)*vS,1.0,uE);float f=1.0-exp(-pow(vD*uFd,2.0));gl_FragColor=vec4(mix(c.rgb*l,uF,clamp(f,0.0,1.0)),c.a);}'));
  gl.linkProgram(pr); gl.useProgram(pr);
  const L = (n) => gl.getUniformLocation(pr, n), A = (n) => gl.getAttribLocation(pr, n);
  G3.u = { PV: L('uPV'), M: L('uM'), L: L('uL'), K: L('uK'), X: L('uX'), U: L('uU'), A: L('uA'), E: L('uE'), F: L('uF'), Fd: L('uFd') }; G3.a = { P: A('aP'), N: A('aN'), C: A('aC'), T: A('aT') };
  Object.values(G3.a).forEach(i => i >= 0 && gl.enableVertexAttribArray(i));
  gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  G3.gl = gl; G3.cv = cv; G3.white = G3.texOf((() => { const c = document.createElement('canvas'); c.width = c.height = 2; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 2, 2); return c; })());
  cv.addEventListener('webglcontextlost', (e) => { e.preventDefault(); G3._lost = 1; });
  return gl;
};
G3.mesh = (g) => { const gl = G3.gl, b = (arr) => { const o = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, o); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW); return o; }; return { p: b(g.p), n: b(g.n), c: b(g.c), t: b(g.t), k: g.p.length / 3 }; };
G3.texOf = (canvas) => { const gl = G3.gl, t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]].forEach(([k, v]) => gl.texParameteri(gl.TEXTURE_2D, k, v)); return t; };
G3.frame = function (cam) {
  const gl = G3.gl, cv = G3.cv, w = cv.clientWidth || 300, h = cv.clientHeight || 200, dpr = Math.min(window.devicePixelRatio || 1, W.weak ? 1 : 1.5);
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
  gl.viewport(0, 0, cv.width, cv.height); const bg = cam.bg || [0.027, 0.043, 0.094]; gl.clearColor(bg[0], bg[1], bg[2], 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const P = M4.persp((cam.fov || 40) * Math.PI / 180, w / h, 0.3, 600), V = M4.look(cam.eye, cam.at, [0, 1, 0]);
  gl.uniformMatrix4fv(G3.u.PV, false, M4.mul(P, V)); const l = [0.35, 1, 0.45], n = Math.sqrt(l[0] * l[0] + l[1] * l[1] + l[2] * l[2]);
  gl.uniform3f(G3.u.L, l[0] / n, l[1] / n, l[2] / n); gl.uniform1f(G3.u.A, cam.amb == null ? 0.5 : cam.amb); gl.uniform3f(G3.u.F, bg[0], bg[1], bg[2]); G3._fog = cam.fog == null ? 0.0035 : cam.fog; gl.uniform1f(G3.u.Fd, G3._fog);
};
G3.draw = function (me, M, tint, tex, emis, alpha) {
  const gl = G3.gl, a = G3.a, bind = (buf, loc, n) => { if (loc < 0) return; gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.vertexAttribPointer(loc, n, gl.FLOAT, false, 0, 0); };
  bind(me.p, a.P, 3); bind(me.n, a.N, 3); bind(me.c, a.C, 3); bind(me.t, a.T, 2);
  gl.uniformMatrix4fv(G3.u.M, false, M || M4.id()); const t = tint || [1, 1, 1];
  gl.uniform4f(G3.u.K, t[0], t[1], t[2], alpha == null ? 1 : alpha); gl.uniform1f(G3.u.E, emis || 0);
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex || G3.white); gl.uniform1i(G3.u.X, 0); gl.uniform1f(G3.u.U, tex ? 1 : 0);
  if (alpha != null && alpha < 1) { gl.enable(gl.BLEND); gl.depthMask(false); gl.drawArrays(gl.TRIANGLES, 0, me.k); gl.depthMask(true); gl.disable(gl.BLEND); } else gl.drawArrays(gl.TRIANGLES, 0, me.k);
};
/* one canvas for everything: mount it in a box and run a view ({ step(dt, now) → camera, draw(), alive() }) */
G3.run = function (box, view) {
  if (!G3.ok() || !box || !G3.init()) return false;
  G3.view = view; view._err = 0; box.appendChild(G3.cv); G3.host = box;
  if (!G3._raf) { let last = performance.now(); const loop = () => { if (G3.be !== 'gl') { G3._raf = null; return; } const now = performance.now(); const v = G3.view; if (!v || !document.body.contains(G3.cv) || (v.alive && !v.alive())) { G3._raf = null; if (v && v.end) v.end(); if (G3.view === v) G3.view = null; return; }
      const dt = Math.min(0.1, (now - last) / 1000); last = now; try { const cam = v.step(dt, now); if (cam) { G3.frame(cam); v.draw(); } } catch (e) { if (!v._err++) console.warn('3D', e); if (v._err > 5) G3.view = null; }
      G3._raf = requestAnimationFrame(loop); }; G3._raf = requestAnimationFrame(loop); }
  return true;
};
G3.stop = function (view) { if (!view || G3.view === view) { const v = G3.view; G3.view = null; if (v && v.end) v.end(); if (G3.cv && G3.cv.parentNode) G3.cv.parentNode.removeChild(G3.cv); } };

// ---------- 🏟️ the stadium, the players, the ball ----------
const PX = (x) => x - 52.5, PZ = (y) => y - 34;
const parts = {};
G3.parts = function () {
  if (parts.torso) return parts;
  const W1 = '#ffffff';
  parts.torso = G3.mesh(G3.box(Geo(), 0.5, 0.62, 0.28, W1));
  parts.shorts = G3.mesh(G3.box(Geo(), 0.5, 0.26, 0.3, W1));
  parts.head = G3.mesh(G3.sph(Geo(), 0.16, 8, W1));
  parts.hair = G3.mesh(G3.sph(Geo(), 0.17, 8, () => [1, 1, 1], null, 4));
  parts.sky = G3.mesh(G3.sph(Geo(), 420, 10, (i) => rgb(['#04050f', '#070a1c', '#0b0f2a', '#160f3a', '#2a1450', '#3a1a5c', '#140c2c', '#06070f', '#06070f', '#06070f'][i] || '#06070f')));
  parts.collar = G3.mesh(G3.box(Geo(), 0.24, 0.06, 0.2, W1));
  parts.shadow = G3.mesh(G3.cyl(Geo(), 0.42, 0.42, 0.01, 10, [[0, '#000000']]));
  parts.ball = G3.mesh(G3.sph(Geo(), 0.22, 6, (i, j) => (i + j) % 3 === 0 ? [0.1, 0.1, 0.12] : [1, 1, 1]));
  parts.cube = G3.mesh(G3.box(Geo(), 1, 1, 1, W1));
  parts.trophy = G3.mesh((() => { const g = Geo(); G3.lathe(g, [[0.0, 0], [0.32, 0], [0.32, 0.08], [0.12, 0.14], [0.08, 0.42], [0.14, 0.5], [0.34, 0.62], [0.42, 0.95], [0.4, 1.02], [0.0, 1.02]], 14, '#ffffff');
    G3.cyl(g, 0.05, 0.05, 0.36, 6, [[0, '#ffffff']], M4.ch(M4.t(0.42, 0.92, 0), M4.rz(1.1))); G3.cyl(g, 0.05, 0.05, 0.36, 6, [[0, '#ffffff']], M4.ch(M4.t(-0.42, 0.92, 0), M4.rz(-1.1))); return g; })());
  return parts;
};
const SKINS = ['#5a3825', '#6f4a2f', '#8d5b3a', '#a86f48', '#c48a5e', '#e0b48a', '#f2c9a0'], HAIRS = ['#0b0b0e', '#1d1410', '#3b2414', '#6b4423', '#b8862f'];
const pidTone = (id) => { const h = hash('skin:' + id); return { skin: rgb(SKINS[h % SKINS.length]), hair: rgb(HAIRS[(h >> 4) % HAIRS.length]) }; };
G3.shirtTex = function (kit, plainC) {
  const K = W.kitN(kit), c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), b = K.c2;
  x.fillStyle = plainC || K.c1; x.fillRect(0, 0, 64, 64); x.fillStyle = b;
  if (!plainC) ({ stripes: () => { for (let i = 4; i < 64; i += 16) x.fillRect(i, 0, 7, 64); }, hoops: () => { for (let i = 6; i < 64; i += 18) x.fillRect(0, i, 64, 8); }, halves: () => x.fillRect(32, 0, 32, 64), sash: () => { x.beginPath(); x.moveTo(0, 10); x.lineTo(12, 0); x.lineTo(64, 52); x.lineTo(52, 64); x.fill(); },
    pinstripes: () => { for (let i = 3; i < 64; i += 6) x.fillRect(i, 0, 1.5, 64); }, chevron: () => { x.beginPath(); x.moveTo(0, 10); x.lineTo(32, 34); x.lineTo(64, 10); x.lineTo(64, 22); x.lineTo(32, 46); x.lineTo(0, 22); x.fill(); },
    gradient: () => { const g = x.createLinearGradient(0, 0, 0, 64); g.addColorStop(0, K.c1); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, 0, 64, 64); }, checker: () => { for (let i = 0; i < 64; i += 16) for (let j = 0; j < 64; j += 16) if (((i + j) / 16) % 2) x.fillRect(i, j, 16, 16); }, centre: () => x.fillRect(24, 0, 16, 64) }[K.pat] || (() => {}))();
  return G3.texOf(c);
};
/* the clothes of one team: outfield kit + goalkeeper kit */
G3.team = function (kit, gkC) {
  const K = W.kitN(kit), g = hx(gkC, '#facc15');
  const leg = (c) => G3.mesh(G3.cyl(Geo(), 0.095, 0.08, 0.88, 9, [[0, '#c48a5e'], [0.4, c], [0.88, '#0b0f24']])), arm = (c) => G3.mesh(G3.cyl(Geo(), 0.075, 0.06, 0.62, 8, [[0, c], [0.6, '#c48a5e']]));
  return { tex: G3.shirtTex(K), sho: rgb(K.sho), col: rgb(K.col), leg: leg(K.soc), arm: arm(K.slv), gk: { tex: G3.shirtTex(K, g), sho: rgb('#111827'), col: rgb('#111827'), leg: leg(g), arm: arm(g) } };
};
/* draw one player. o: { phase, run (0..1), jump, arms: 'up'|'' , lean, yaw } */
G3.fig = function (T, gk, id, x, z, o) {
  const P = G3.parts(), C = gk ? T.gk : T, tone = pidTone(id), S = 1.3, dv = o.dive || 0, y0 = (o.jump || 0) + (o.y || 0) + Math.abs(dv) * 0.45;
  let sw = Math.sin(o.phase || 0) * 0.75 * (o.run || 0); const kk = o.kick || 0;
  const B = M4.ch(M4.t(x, y0, z), M4.ry(o.yaw || 0), M4.rz(dv * 1.25), M4.rx((o.lean || 0) - kk * 0.18), M4.s(S));
  if (kk) { G3.draw(P.shadow, M4.ch(M4.t(x, 0.02, z), M4.s(S)), null, null, 0, 0.35); G3.draw(C.leg, M4.ch(B, M4.t(0.12, 0.9, 0), M4.rx(-1.5 * kk + 0.3))); G3.draw(C.leg, M4.ch(B, M4.t(-0.12, 0.9, 0), M4.rx(0.25 * kk)));
    G3.draw(P.shorts, M4.ch(B, M4.t(0, 0.98, 0)), C.sho); G3.draw(P.torso, M4.ch(B, M4.t(0, 1.39, 0)), null, C.tex); G3.draw(P.collar, M4.ch(B, M4.t(0, 1.71, 0)), C.col);
    G3.draw(C.arm, M4.ch(B, M4.t(0.33, 1.66, 0), M4.rz(0.9 * kk), M4.rx(-0.6 * kk))); G3.draw(C.arm, M4.ch(B, M4.t(-0.33, 1.66, 0), M4.rz(-0.9 * kk), M4.rx(0.4 * kk)));
    G3.draw(P.head, M4.ch(B, M4.t(0, 1.88, 0)), tone.skin); G3.draw(P.hair, M4.ch(B, M4.t(0, 1.9, -0.012)), tone.hair); return; }
  if (dv) sw = 0.2;
  G3.draw(P.shadow, M4.ch(M4.t(x, 0.02, z), M4.s(S * (1 - Math.min(0.5, (o.jump || 0) / 3)), 1, S)), null, null, 0, 0.35);
  G3.draw(C.leg, M4.ch(B, M4.t(0.12, 0.9, 0), M4.rx(sw))); G3.draw(C.leg, M4.ch(B, M4.t(-0.12, 0.9, 0), M4.rx(-sw)));
  G3.draw(P.shorts, M4.ch(B, M4.t(0, 0.98, 0)), C.sho); G3.draw(P.torso, M4.ch(B, M4.t(0, 1.39, 0)), null, C.tex); G3.draw(P.collar, M4.ch(B, M4.t(0, 1.71, 0)), C.col);
  const up = o.arms === 'up' || !!dv, a1 = up ? -2.7 + Math.sin(o.phase * 2) * 0.2 : -sw * 0.9, a2 = up ? -2.7 - Math.sin(o.phase * 2) * 0.2 : sw * 0.9;
  G3.draw(C.arm, M4.ch(B, M4.t(0.33, 1.66, 0), M4.rz(up ? 0.25 : 0.12), M4.rx(a1))); G3.draw(C.arm, M4.ch(B, M4.t(-0.33, 1.66, 0), M4.rz(up ? -0.25 : -0.12), M4.rx(a2)));
  G3.draw(P.head, M4.ch(B, M4.t(0, 1.88, 0)), tone.skin); G3.draw(P.hair, M4.ch(B, M4.t(0, 1.9, -0.012)), tone.hair);
};
G3.ball = function (x, z, h, spin) { const P = G3.parts(), y = 0.3 + (h || 0) * 1.6; G3.draw(P.shadow, M4.ch(M4.t(x, 0.02, z), M4.s(0.5, 1, 0.5)), null, null, 0, 0.4); G3.draw(P.ball, M4.ch(M4.t(x, y, z), M4.ry(spin || 0), M4.rx((spin || 0) * 1.3), M4.s(1.5))); };
/* the stadium for a level (1–5), with the crowd in both clubs' colours */
G3.worlds = {};
G3.world = function (lv, c1, c2) {
  lv = clamp(Math.floor(lv) || 1, 1, 5); const key = lv + c1 + c2; if (G3.worlds[key]) return G3.worlds[key];
  const st = Geo(), crowd = Geo(), r = rng(hash('std:' + key)), weak = W.weak;
  G3.plane(st, 260, 210, '#0d2016', M4.t(0, -0.05, 0)); G3.plane(st, 124, 88, '#1f5a2c', M4.t(0, -0.02, 0));
  const board = ['#22d3ee', '#a855f7', '#ff2d95'];
  for (let i = -6; i <= 6; i++) { G3.box(st, 8.6, 0.9, 0.25, board[(i + 9) % 3], M4.t(i * 8.8, 0.45, 38.5)); G3.box(st, 8.6, 0.9, 0.25, board[(i + 10) % 3], M4.t(i * 8.8, 0.45, -38.5)); }
  for (let i = -4; i <= 4; i++) { G3.box(st, 0.25, 0.9, 7.4, board[(i + 9) % 3], M4.t(57, 0.45, i * 8)); G3.box(st, 0.25, 0.9, 7.4, board[(i + 10) % 3], M4.t(-57, 0.45, i * 8)); }
  [-1, 1].forEach(sd => { const gx = sd * 52.5, cw = '#f8fafc'; G3.box(st, 0.14, 2.44, 0.14, cw, M4.t(gx, 1.22, 3.66)); G3.box(st, 0.14, 2.44, 0.14, cw, M4.t(gx, 1.22, -3.66)); G3.box(st, 0.14, 0.14, 7.46, cw, M4.t(gx, 2.44, 0)); });
  const tiers = [1, 1, 2, 2, 3][lv - 1], ends = lv >= 2, corners = lv >= 4, rows = 7, SEAT = ['#1e293b', '#334155'];
  const fan = () => { const x = r(); return rgb(x < 0.42 ? c1 : x < 0.62 ? c2 : x < 0.7 ? '#ffffff' : ['#facc15', '#22d3ee', '#a855f7', '#ff2d95', '#0f172a', '#f97316'][Math.floor(r() * 6)]); };
  const fill = [0.35, 0.5, 0.65, 0.8, 0.95][lv - 1], seats = [];
  const stand = (len, along, out, sx, sz) => { for (let t = 0; t < tiers; t++) for (let k = 0; k < rows; k++) { const d = out + t * (rows * 0.95 + 2.5) + k * 0.95, h = 0.6 + t * (rows * 0.55 + 2.2) + k * 0.55, L = len + d * 0.4;
      const m = along === 'x' ? M4.t(0, h, sz * d) : M4.t(sx * d, h, 0); G3.box(st, along === 'x' ? L : 0.95, 0.55, along === 'x' ? 0.95 : L, SEAT[k % 2], M4.mul(m, M4.t(0, -0.27, 0)));
      for (let s = -L / 2 + 0.5; s < L / 2 - 0.4; s += 0.75) seats.push(along === 'x' ? [s, h + 0.32, sz * d] : [sx * d, h + 0.32, s]); } };
  stand(112, 'x', 42, 0, 1); stand(112, 'x', 42, 0, -1); if (ends) { stand(80, 'z', 61, 1, 0); stand(80, 'z', 61, -1, 0); }
  const cap = Math.min(seats.length * fill, weak ? 1400 : 3200), keep = cap / seats.length;
  for (const q of seats) if (r() < keep) G3.box(crowd, 0.5, 0.66, 0.4, fan(), M4.t(q[0], q[1], q[2]));
  const top = tiers * (rows * 0.55 + 2.2) + 1.5, far = 42 + tiers * (rows * 0.95 + 2.5);
  if (corners) [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, b]) => { for (let k = 0; k < tiers * 3; k++) G3.box(st, 9, top * (k + 1) / (tiers * 3), 9, '#1e293b', M4.t(a * (60 + k * 2.4), top * (k + 1) / (tiers * 6), b * (42 + k * 2.4))); });
  if (lv >= 5) { G3.box(st, 140, 0.6, 7, '#0f172a', M4.t(0, top + 3, far - 2)); G3.box(st, 140, 0.6, 7, '#0f172a', M4.t(0, top + 3, -far + 2)); G3.box(st, 140, 0.25, 0.4, '#22d3ee', M4.t(0, top + 2.7, far - 5.6)); G3.box(st, 140, 0.25, 0.4, '#ff2d95', M4.t(0, top + 2.7, -far + 5.6)); }
  const pole = lv >= 3 ? 34 : 22; [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, b]) => { if (lv === 1 && b < 0) return; G3.box(st, 0.8, pole, 0.8, '#475569', M4.t(a * 64, pole / 2, b * (far + 2))); });
  const lights = Geo(); [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([a, b]) => { if (lv === 1 && b < 0) return; G3.box(lights, 5, 3, 0.6, '#fffbe8', M4.t(a * 64, pole + 1.5, b * (far + 2))); });
  if (lv >= 4) { G3.box(lights, 18, 8, 0.5, '#0b1024', M4.t(0, top + 6, -far - 1)); }
  const pc = document.createElement('canvas'); pc.width = 1050; pc.height = 680; const g = pc.getContext('2d'), k = 10;
  for (let i = 0; i < 14; i++) { g.fillStyle = i % 2 ? '#2e8a3c' : '#287a35'; g.fillRect(i * 75, 0, 75, 680); }
  g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 3.2; g.strokeRect(4, 4, 1042, 672); g.beginPath(); g.moveTo(525, 4); g.lineTo(525, 676); g.stroke(); g.beginPath(); g.arc(525, 340, 91.5, 0, 7); g.stroke();
  [[0, 1], [1050, -1]].forEach(([x, d]) => { g.strokeRect(Math.min(x, x + d * 165), 138.5, 165, 403); g.strokeRect(Math.min(x, x + d * 55), 248.5, 55, 183); g.beginPath(); g.arc(x + d * 110, 340, 91.5, d > 0 ? -0.93 : Math.PI - 0.93, d > 0 ? 0.93 : Math.PI + 0.93); g.stroke(); });
  g.fillStyle = '#fff'; g.beginPath(); g.arc(525, 340, 4, 0, 7); g.fill();
  const pitch = G3.plane(Geo(), 105, 68, '#ffffff', M4.t(0, 0, 0), [[0, 1], [1, 1], [1, 0], [0, 0]]);
  const net = Geo(); [-1, 1].forEach(sd => { const gx = sd * 53.6; G3.box(net, 2.2, 2.44, 0.04, '#ffffff', M4.t(gx, 1.22, 3.66)); G3.box(net, 2.2, 2.44, 0.04, '#ffffff', M4.t(gx, 1.22, -3.66)); G3.box(net, 0.04, 2.44, 7.32, '#ffffff', M4.t(sd * 54.7, 1.22, 0)); G3.box(net, 2.2, 0.04, 7.32, '#ffffff', M4.t(gx, 2.44, 0)); });
  const Wd = { st: G3.mesh(st), crowd: G3.mesh(crowd), lights: G3.mesh(lights), pitch: G3.mesh(pitch), ptex: G3.texOf(pc), net: G3.mesh(net), top, far, lv };
  const old = Object.keys(G3.worlds); if (old.length >= 2) { const o = G3.worlds[old[0]], gl = G3.gl; ['st', 'crowd', 'lights', 'pitch', 'net'].forEach(k => ['p', 'n', 'c', 't'].forEach(b => gl.deleteBuffer(o[k][b]))); gl.deleteTexture(o.ptex); delete G3.worlds[old[0]]; }
  G3.worlds[key] = Wd; return Wd;
};
G3.drawWorld = function (Wd, bounce) {
  const gl = G3.gl; gl.disable(gl.CULL_FACE); gl.uniform1f(G3.u.Fd, 0); G3.draw(G3.parts().sky, null, null, null, 1); gl.uniform1f(G3.u.Fd, G3._fog || 0.0035); gl.enable(gl.CULL_FACE);
  G3.draw(Wd.st); G3.draw(Wd.pitch, M4.t(0, 0.005, 0), null, Wd.ptex); G3.draw(Wd.crowd, M4.t(0, bounce || 0, 0)); G3.draw(Wd.lights, null, null, null, 1); G3.draw(Wd.net, null, null, null, 0.6, 0.28);
};
/* confetti / fireworks: particles = [{ x, y, z, vx, vy, vz, c, life }] */
G3.particles = function (list, dt) { const P = G3.parts(); for (const q of list) { q.vy -= 9.8 * dt * (q.g == null ? 0.25 : q.g); q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt; q.life -= dt; q.rot = (q.rot || 0) + dt * 6;
  if (q.life > 0 && q.y > 0) G3.draw(P.cube, M4.ch(M4.t(q.x, q.y, q.z), M4.ry(q.rot), M4.rx(q.rot * 0.7), M4.s(q.s || 0.25, 0.04 + (q.s || 0.25) * 0.4, q.s || 0.25)), q.c, null, 0.8); } return list.filter(q => q.life > 0 && q.y > 0); };
G3.burst = function (list, n, at, spread) { const C = ['#22d3ee', '#a855f7', '#ff2d95', '#facc15', '#ffffff'].map(rgb); for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, s = Math.random() * (spread || 6);
  list.push({ x: at[0], y: at[1], z: at[2], vx: Math.cos(a) * s, vy: 2 + Math.random() * 6, vz: Math.sin(a) * s, c: C[i % 5], life: 2 + Math.random() * 2.5, s: 0.18 + Math.random() * 0.2 }); } return list; };
G3.trophy = function (x, y, z, ry, s) { const gl = G3.gl; gl.disable(gl.CULL_FACE); G3.draw(G3.parts().trophy, M4.ch(M4.t(x, y, z), M4.ry(ry || 0), M4.s(s || 1)), rgb('#facc15'), null, 0.25); gl.enable(gl.CULL_FACE); };
G3.floor = function () { G3.draw(G3.parts().cube, M4.ch(M4.t(0, -0.06, 0), M4.s(2.2, 0.1, 2.2)), rgb('#1e293b')); };
G3.freeTeam = function (T) { const gl = G3.gl; if (!gl || !T) return; [T, T.gk].forEach(x => { if (!x) return; gl.deleteTexture(x.tex); [x.leg, x.arm].forEach(me => me && ['p', 'n', 'c', 't'].forEach(k => gl.deleteBuffer(me[k]))); }); };
const lerp = (a, b, u) => a + (b - a) * u, ease = (u) => u < 0 ? 0 : u > 1 ? 1 : u * u * (3 - 2 * u);
const angL = (a, b, k) => { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return a + d * k; };
const sm = (cur, tgt, k) => { if (!cur) return tgt.slice(); for (let i = 0; i < 3; i++) cur[i] += (tgt[i] - cur[i]) * k; return cur; };
/* animation memory for one player (facing, running) */
const anim = (st, id, x, z, dt, face) => { let a = st[id]; if (!a) a = st[id] = { x, z, yaw: face == null ? 0 : face, phase: hash('ph' + id) % 6, run: 0 };
  const dx = x - a.x, dz = z - a.z, d = Math.sqrt(dx * dx + dz * dz), sp = dt > 0 ? d / dt : 0, k = Math.min(1, dt * 9);
  if (d > 0.015) a.yaw = angL(a.yaw, Math.atan2(dx, dz), k); else if (face != null) a.yaw = angL(a.yaw, face, k * 0.5);
  a.run += (Math.min(1, sp / 5.5) - a.run) * Math.min(1, dt * 7); a.phase += dt * (3 + sp * 1.7); a.x = x; a.z = z; return a; };

// ---------- 📼 recording the match for replays (only reads the engine; results never change) ----------
W._rec = 260;
const snap = (m) => ({ k: m.tick, b: [m.ball.x, m.ball.y, m.ball.h || 0], p: m.P.map(p => [p.side, p.role === 'GK' ? 1 : 0, p.x, p.y, p.id, p.num]) });
const _say = Match.prototype.say; Match.prototype.say = function () { _say.apply(this, arguments); const e = this.ev[this.ev.length - 1]; if (e) e.tick = this.tick; };
const _step = Match.prototype.step; Match.prototype.step = function () {
  const fl = this.ball.fl, n = this.ev.length; _step.call(this);
  for (let i = n; i < this.ev.length; i++) if (this.ev[i].k === 'goal' && fl && fl.from) this.ev[i].pid = fl.from.id;
  if (this.rec === undefined) { this.recMax = W._rec || 0; this.rec = this.recMax ? [] : null; }
  if (this.rec) { this.rec.push(snap(this)); if (this.rec.length > this.recMax) this.rec.shift(); }
};

// ---------- 👕 who wears what, where they play ----------
const kitPick = (list, color) => { const L = (list || []).map(W.kitN); return L.find(k => k.c1 === color) || W.kitN({ c1: hx(color, '#22d3ee'), c2: '#ffffff' }); };
W.teamInfo = (function (b) { return function (src, side, color) { const t = b.apply(this, arguments); t.kitsAll = src.kits || (src.club != null ? W.aiKits(src.club) : null); t.crest = src.crest || null; t.club = src.club != null ? src.club : null; return t; }; })(W.teamInfo);
W.dress = function (live) {
  if (live._dr) return live._dr;
  const M = live.M, S = M ? M.s : W.S, D = { S, k: [], gk: [live.home.gkColor, live.away.gkColor], cr: [], ci: [], n: [live.home.name, live.away.name], sh: [live.home.short, live.away.short], ids: [live.home.ids, live.away.ids] };
  [live.home, live.away].forEach((t, i) => { const sh = M ? M['s' + i] : null, ci = M ? M[i ? 'a' : 'h'] : t.club;
    D.ci[i] = ci; D.k[i] = kitPick(sh ? (sh.kf && sh.kf.length ? sh.kf : sh.kits && sh.kits.length ? sh.kits.map(c => ({ c1: c })) : W.aiKits(ci)) : (t.kitsAll || (ci != null ? W.aiKits(ci) : [])), t.color);
    D.cr[i] = sh ? sh.cr || null : t.crest || null; });
  const s0 = M && M.s0, hc = D.ci[0];
  D.sd = s0 && s0.sd ? s0.sd : (!M && W.me) ? { lv: CC.stdLv(W.me), nm: (W.me.std && W.me.std.nm) || (W.me.name + ' Park') } : hc != null && hc < 100000 ? { lv: [5, 4, 3, 2, 1, 1][W.club(hc).tier - 1], nm: W.club(hc).name.split(' ')[0] + ' Arena' } : { lv: 1, nm: D.n[0] + ' Park' };
  D.comp = M ? (M.cup ? CC.CUP_NAME[M.cup] + ' · ' + (M.rn || '') : 'League · Division ' + M.t + ' · Matchday ' + M.md) : live.kind === 'boot' ? '🏕️ Boot Camp · Match ' + ((live.boot || 0) + 1) : '🤝 Friendly';
  live._dr = D; return D;
};
const crestHtml = (D, i, s) => D.cr[i] ? W.crestSvg(D.cr[i], D.sh[i], s) : D.ci[i] != null ? badge(W.club(D.ci[i]), D.sh[i]).replace('class="w11crest"', `class="w11crest" style="width:${s}px;height:${Math.round(s * 52 / 46)}px"`) : '';
W.cerDur = (live) => live && live.kind === 'league' ? { open: 45, close: 15 } : { open: 12, close: 10 };
const teamsOf = (live) => { const D = W.dress(live); if (!D.T || D.Tbe !== G3.be) { D.T = [G3.team(D.k[0], D.gk[0], D.cr[0], D.sh[0]), G3.team(D.k[1], D.gk[1], D.cr[1], D.sh[1])]; D.Tbe = G3.be; } return D; };
/* draw everybody from an engine-like list: [{ side, gk, x, y, id }] (engine metres) */
const drawPlayers = (D, list, st, dt, opt) => { for (const p of list) { const x = PX(p.x), z = PZ(p.y), o = opt ? opt(p) : null, face = o && o.face != null ? o.face : null, a = anim(st, p.id, x, z, dt, face);
  G3.fig(D.T[p.side], p.gk, p.id, x, z, { phase: a.phase, run: o && o.run != null ? o.run : a.run, yaw: o && o.yaw != null ? o.yaw : a.yaw, jump: o && o.jump, arms: o && o.arms, lean: o && o.lean, kick: o && o.kick, dive: o && o.dive, num: p.num }); } };
/* what each player is doing right now in the live engine: kicking, diving, celebrating */
W.liveOpts = function (m) {
  const b = m.ball, f = b.fl, g = m.ev.length && m.ev[m.ev.length - 1], cel = g && g.k === 'goal' && m.pauseT > 0 && m.tick - g.tick < 60 ? g.side : -1;
  return (p) => { if (f && f.from && f.from.id === p.id && f.k < 0.35) return { kick: (f.kind === 'shot' ? 1 : 0.55) * (1 - f.k / 0.35) };
    if (f && f.kind === 'shot' && f.gk && f.gk.id === p.id && f.k > 0.15) { const d = clamp((f.y1 - p.y) / 3.2, -1, 1); return { dive: d * Math.min(1, (f.k - 0.15) * 2.5) * (Math.abs(f.y1 - p.y) > 0.8 ? 1 : 0.3), run: 0 }; }
    if (cel >= 0) { const ph = hash(p.id) % 7; return p.side === cel ? { jump: Math.abs(Math.sin(performance.now() / 160 + ph)) * 0.5, arms: 'up', run: 0.3 } : { lean: 0.3, run: 0 }; }
    return null; };
};
const tvCam = (bx, bz, k) => ({ eye: [bx * 0.8, 21 * (k || 1), 34 + 38 * (k || 1)], at: [bx * 0.93, 0, bz * 0.55] });

// ---------- 📺 3D live match ----------
W.v3 = { on: false };
W.v3pref = () => { if (!G3.ok()) return false; let v = null; try { v = localStorage.getItem('w11_3d'); } catch (e) {} return v == null ? !W.weak : v === '1'; };
W.v3set = function (on) {
  W.v3.on = !!on && G3.ok(); try { localStorage.setItem('w11_3d', W.v3.on ? '1' : '0'); } catch (e) {}
  const box = document.getElementById('w11l3'), b = document.getElementById('w11v3b');
  if (b) b.textContent = W.v3.on ? '🗺️ 2D radar' : '🎥 3D view';
  if (box) box.style.display = W.v3.on ? 'block' : 'none';
  if (W.v3.on && box && !W._cer && !W._rp) { if (!G3.run(box, W.v3live(box))) { W.v3.on = false; box.style.display = 'none'; } }
  else if (!W.v3.on && G3.view && G3.view.live) G3.stop(G3.view);
};
W.v3toggle = () => W.v3set(!W.v3.on);
W.v3live = function (box) {
  const st = {}; let cam = null, spin = 0;
  const v = { live: true, alive: () => W.v3.on && document.body.contains(box) && !!W.m && G3.view === v,
    step(dt) { const live = W.live, m = W.m; if (!live || !m) return null; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(v.D.sd.lv, v.D.k[0].c1, v.D.k[1].c1); v.m = m; v.dt = dt;
      const a = clamp(W._alpha == null ? 1 : W._alpha, 0, 1), b = m.ball; let bx, by;
      if (b.owner) { const o = b.owner; bx = o.px + (o.x - o.px) * a + m.dir(o.side) * 0.9; by = o.py + (o.y - o.py) * a; } else { bx = b.px + (b.x - b.px) * a; by = b.py + (b.y - b.py) * a; }
      v.bx = bx; v.by = by; v.bh = b.h || 0; spin += dt * (b.fl ? 14 : b.owner ? 6 : 2);
      const t = tvCam(PX(bx), PZ(by)), k = 1 - Math.exp(-dt * 2.6); cam = { eye: sm(cam && cam.eye, t.eye, k), at: sm(cam && cam.at, t.at, k * 1.4), fov: 40 }; return cam; },
    draw() { const m = v.m, a = clamp(W._alpha == null ? 1 : W._alpha, 0, 1); G3.drawWorld(v.Wd, 0);
      const lo = W.liveOpts(m), byId = {}; m.P.forEach(p => { byId[p.id] = p; });
      drawPlayers(v.D, m.P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.px + (p.x - p.px) * a, y: p.py + (p.y - p.py) * a, id: p.id, num: p.num })), st, v.dt, (q) => lo(byId[q.id]));
      G3.ball(PX(v.bx), PZ(v.by), v.bh, spin); } };
  return v;
};

// ---------- 🎬 goal replay (no skip). Live: a small live radar stays in the corner and your shouts keep working ----------
const frameAt = (F, fi) => { const i0 = clamp(Math.floor(fi), 0, F.length - 1), i1 = Math.min(F.length - 1, i0 + 1), u = clamp(fi - i0, 0, 1), A = F[i0], B = F[i1];
  if (!B._m) { B._m = {}; B.p.forEach(q => { B._m[q[4]] = q; }); }
  return { b: [lerp(A.b[0], B.b[0], u), lerp(A.b[1], B.b[1], u), lerp(A.b[2], B.b[2], u)], p: A.p.map(q => { const r = B._m[q[4]] || q; return { side: q[0], gk: !!q[1], x: lerp(q[2], r[2], u), y: lerp(q[3], r[3], u), id: q[4], num: q[5] }; }) }; };
W.replay = function (F, g, live, liveMode) {
  return new Promise((done) => {
    W._rp = 1; const D = W.dress(live), sc = W.player(g.pid || '', D.S), gi = Math.max(0, F.findIndex(f => f.k >= g.tick)), side = g.side, gx = side === 0 ? 52.5 : -52.5;
    const a0 = Math.max(0, gi - 110), a1 = Math.max(a0, gi - 40), c1 = Math.min(F.length - 1, gi + 30);
    const SEG = [[a0, a1, 1, 'tv'], [a1, gi + 4, 0.55, 'goal'], [gi + 4, c1, 0.9, 'orbit']].filter(s => s[1] > s[0]), dur = SEG.reduce((t, s) => t + (s[1] - s[0]) * 0.05 / s[2], 0);
    const scorerTxt = g.pid ? `${esc(sc.name)} (${esc(D.sh[side])})` : esc(D.sh[side]);
    let host, box; const wrap = document.querySelector('[data-g4]'), sb = document.querySelector('#w11 .sb');
    if (liveMode && wrap) { const top = sb ? sb.offsetHeight + 8 : 0; host = document.createElement('div'); host.style.cssText = `position:absolute;left:0;right:0;top:${-top}px;height:${wrap.offsetHeight + top}px;z-index:6;border-radius:14px;overflow:hidden;background:#070b18;box-shadow:0 0 26px rgba(255,45,149,.35)`; wrap.appendChild(host); }
    else { host = document.createElement('div'); host.style.cssText = 'position:absolute;inset:0;z-index:40;background:#070b18'; (document.getElementById('w11') || document.body).appendChild(host); }
    host.id = 'w11rp';
    host.innerHTML = `<div id="w11rpb" style="position:absolute;inset:0"></div><div style="position:absolute;left:8px;top:8px;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:900;letter-spacing:.12em;color:#0b0f24;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95)">🎬 REPLAY</div>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:10px 12px;background:linear-gradient(0deg,rgba(7,11,24,.92),rgba(7,11,24,0))"><p style="font-size:16px;font-weight:900">⚽ GOAL! ${scorerTxt} · ${g.min}'</p><p style="font-size:11px;color:#cbd5e1">${esc(D.n[0])} vs ${esc(D.n[1])}</p></div>
      ${liveMode ? '<div style="position:absolute;right:8px;bottom:52px;width:36%;max-width:180px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,.35);box-shadow:0 0 12px rgba(0,0,0,.6)"><canvas id="w11mini" style="border-radius:0;box-shadow:none"></canvas><p style="position:absolute;left:4px;top:2px;font-size:8px;font-weight:900;color:#ff2d95">● LIVE</p></div>' : ''}`;
    box = document.getElementById('w11rpb');
    if (liveMode) { const mc = document.getElementById('w11mini'); W._mini = new Pitch(mc); W._mini.size(); }
    const t0 = performance.now(), fiAt = (t) => { let left = t; for (const s of SEG) { const len = (s[1] - s[0]) * 0.05 / s[2]; if (left <= len) return [s[0] + left / len * (s[1] - s[0]), s]; left -= len; } const s = SEG[SEG.length - 1] || [0, F.length - 1, 1, 'tv']; return [s[1], s]; };
    const finish = () => { if (!W._rp) return; W._rp = 0; W._mini = null; if (G3.view === v3) G3.stop(v3); host.remove(); clearInterval(iv2); if (liveMode && W.v3.on) W.v3set(true); done(); };
    const st = {}, parts3 = []; let cam = null, spin = 0, burst = false, iv2 = null;
    const v3 = { alive: () => !!W._rp && document.body.contains(box),
      step(dt, now) { const t = (now - t0) / 1000; if (t > dur + 0.3) { setTimeout(finish, 0); return null; } v3.D = teamsOf(live); v3.Wd = v3.Wd || G3.world(v3.D.sd.lv, v3.D.k[0].c1, v3.D.k[1].c1); v3.dt = dt; v3.t = t;
        const [fi, s] = fiAt(t), f = frameAt(F, fi); v3.f = f; v3.mode = s[3]; v3.cel = fi >= gi; spin += dt * 8; const bx = PX(f.b[0]), bz = PZ(f.b[1]);
        let tg; if (s[3] === 'tv') tg = { eye: [bx * 0.85, 13, 34 + 24], at: [bx, 0.5, bz * 0.7] };
        else if (s[3] === 'goal') tg = { eye: [gx + Math.sign(gx) * 13, 4.2, bz * 0.35 + 3], at: [bx, 1, bz] };
        else { const sp = f.p.find(q => q.id === g.pid) || f.p[0], th = t * 0.9; tg = { eye: [PX(sp.x) + Math.sin(th) * 7.5, 3.2, PZ(sp.y) + Math.cos(th) * 7.5], at: [PX(sp.x), 1.3, PZ(sp.y)] }; }
        if (v3.cel && !burst) { burst = true; G3.burst(parts3, 60, [gx, 3, 0], 7); }
        const k = s[3] === cam?.m ? 1 - Math.exp(-dt * 5) : 1; cam = { eye: sm(k < 1 && cam ? cam.eye : null, tg.eye, k), at: sm(k < 1 && cam ? cam.at : null, tg.at, k), fov: 42, m: s[3] }; return cam; },
      draw() { const f = v3.f; G3.drawWorld(v3.Wd, v3.cel ? Math.abs(Math.sin(v3.t * 9)) * 0.35 : 0);
        drawPlayers(v3.D, f.p, st, v3.dt, (p) => v3.cel && p.side === side && !p.gk ? { jump: Math.abs(Math.sin(v3.t * 7 + (hash(p.id) % 7))) * (p.id === g.pid ? 0.8 : 0.4), arms: p.id === g.pid || hash(p.id) % 2 ? 'up' : '' } : null);
        G3.ball(PX(f.b[0]), PZ(f.b[1]), f.b[2], spin); parts3.splice(0, parts3.length, ...G3.particles(parts3, v3.dt)); } };
    if (!G3.run(box, v3)) {
      /* no 3D on this phone: the same replay on the 2D radar */
      const cv = document.createElement('canvas'); box.appendChild(cv); box.style.display = 'flex'; box.style.alignItems = 'center'; const P2 = new Pitch(cv); P2.size(); const T = [{ color: live.home.color, gkColor: live.home.gkColor }, { color: live.away.color, gkColor: live.away.gkColor }];
      iv2 = setInterval(() => { const t = (performance.now() - t0) / 1000; if (t > dur + 0.3 || !document.body.contains(cv)) return finish(); const [fi] = fiAt(t), f = frameAt(F, fi);
        P2.draw({ P: f.p.map(q => ({ x: q.x, y: q.y, px: q.x, py: q.y, side: q.side, role: q.gk ? 'GK' : 'MID', num: q.num })), ball: { x: f.b[0], y: f.b[1], px: f.b[0], py: f.b[1], h: f.b[2], owner: null }, T, dir: (s) => s === 0 ? 1 : -1 }, 1); }, 33);
    }
  });
};
/* ▶️ replay a goal from a finished match (simulates it again with every order) */
W.replayPast = async function (i) {
  const X = W._rpx; if (!X || W._rp) return; const old = W._rec; W._rec = Infinity; let m;
  try { m = W.simulate(X.home, X.away, X.seed, X.cmds); } finally { W._rec = old; }
  const g = m.ev.filter(e => e.k === 'goal')[i]; if (!g) return;
  const F = m.rec.filter(f => f.k >= g.tick - 110 && f.k <= g.tick + 30); await W.replay(F, g, X.live, false);
};
W.addReplays = function (X) {
  if (!X) return; W._rpx = X; const old = W._rec; W._rec = 0; let m; try { m = W.simulate(X.home, X.away, X.seed, X.cmds); } finally { W._rec = old; }
  const goals = m.ev.filter(e => e.k === 'goal'), el = document.querySelector('#w11b .card'); if (!goals.length || !el) return;
  el.insertAdjacentHTML('afterend', `<div class="card"><p style="font-weight:900">🎬 Goal replays</p><div style="display:grid;grid-template-columns:1fr;gap:6px;margin-top:8px">${goals.map((g, i) => `<button class="btn2" style="text-align:left" onclick="W11.replayPast(${i})">▶️ ${g.min}' ${esc(String(g.txt).replace(/^⚽ GOAL! /, '').replace(/ \d+–\d+$/, ''))}</button>`).join('')}</div></div>`);
};

// ---------- 🎆 opening + closing ceremonies (no skip) ----------
const lineup = (D, i) => (D.ids[i] || []).slice(0, 11).map(id => W.player(id, D.S));
const cerBox = () => { let o = document.getElementById('w11cer'); if (o) return o; o = document.createElement('div'); o.id = 'w11cer'; o.style.cssText = 'position:absolute;inset:0;z-index:30;background:#070b18;overflow:hidden';
  o.innerHTML = '<div id="w11cerb" style="position:absolute;inset:0"></div><div id="w11cert" style="position:absolute;inset:0;pointer-events:none;display:flex;flex-direction:column;justify-content:flex-end;padding:16px;padding-bottom:max(22px,env(safe-area-inset-bottom))"></div>';
  (document.getElementById('w11') || document.body).appendChild(o); return o; };
const capCard = (h) => `<div style="padding:12px 14px;border-radius:16px;background:rgba(7,11,24,.72);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.12);box-shadow:0 0 22px rgba(168,85,247,.3)">${h}</div>`;
const xiList = (P) => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 10px;margin-top:6px;font-size:11px">${P.map(p => `<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b style="color:#67e8f9">${p.num}</b> ${p.flag} ${esc(p.short)} <span style="color:#94a3b8">${p.pos}</span></span>`).join('')}</div>`;
/* who was the best player? goals first, then the winning side's best player (or a goalkeeper in a 0–0) */
W.bestPlayer = function (m) {
  const G = {}; m.ev.forEach(e => { if (e.k === 'goal' && e.pid) G[e.pid] = (G[e.pid] || 0) + 1; });
  const ws = m.T[0].score > m.T[1].score ? 0 : m.T[1].score > m.T[0].score ? 1 : -1;
  let best = null, bs = -1; for (const p of m.P) { const sc = (G[p.id] || 0) * 100 + (p.side === ws ? 30 : 0) + (p.ovr || 0) * 0.1 + (m.T[0].score + m.T[1].score === 0 && p.role === 'GK' ? 50 : 0); if (sc > bs) { bs = sc; best = p; } }
  return best ? { id: best.id, side: best.side, goals: G[best.id] || 0, p: W.player(best.id, m.S) } : null;
};
W.ceremony = function (kind, live) {
  const D = W.dress(live), dur = W.cerDur(live)[kind], m0 = W.m, short = live.kind !== 'league'; W._cer = kind;
  const o = cerBox(), box = document.getElementById('w11cerb'), cap = document.getElementById('w11cert'); let lastCap = '';
  const setCap = (h) => { if (h !== lastCap) { lastCap = h; cap.innerHTML = h; } };
  const PH = kind === 'open' ? (short ? [0, 2.5, 6, 7.5, 9, 12] : [0, 8, 20, 28, 36, 45]) : (short ? [0, 3.5, 7, 10] : [0, 5, 10, 15]);
  const t0 = performance.now(), clockT = () => kind === 'open' ? dur + ((live.kind === 'league' ? W.nowS() : Date.now()) - live.startAt) / 1000 : (performance.now() - t0) / 1000;
  const L = [lineup(D, 0), lineup(D, 1)], sd = D.sd, seats = CC.STD_SEATS[clamp(sd.lv, 1, 5) - 1];
  const vs = `<div style="display:flex;align-items:center;justify-content:center;gap:14px">${crestHtml(D, 0, 58)}<b style="font-size:14px;color:#94a3b8">VS</b>${crestHtml(D, 1, 58)}</div><p style="text-align:center;font-weight:900;font-size:15px;margin-top:6px">${esc(D.n[0])} <span style="color:#94a3b8">vs</span> ${esc(D.n[1])}</p>`;
  const kick0 = (m0 && m0.tick === 0 ? m0 : W.simulate(live.home, live.away, live.seed, [], 0)).P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.x, y: p.y, id: p.id }));
  const mEnd = W.m, my = W.my, best = kind === 'close' && mEnd ? W.bestPlayer(mEnd) : null, pk = kind === 'close' && live.M && live.M.cup && CC.isKO({ k: live.M.cup }, live.M.cr) && mEnd.T[0].score === mEnd.T[1].score ? CC.pens(live.mid) : null;
  const ws = mEnd ? (mEnd.T[0].score > mEnd.T[1].score ? 0 : mEnd.T[1].score > mEnd.T[0].score ? 1 : pk ? (pk[0] > pk[1] ? 0 : 1) : -1) : -1;
  const captions = (t) => {
    if (kind === 'open') { const ph = PH.findIndex((x, i) => t >= x && t < (PH[i + 1] == null ? 1e9 : PH[i + 1]));
      if (ph <= 0) return capCard(`<p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">${esc(D.comp)}</p><p style="font-size:20px;font-weight:900;margin-top:2px">🏟️ ${esc(sd.nm)}</p><p style="font-size:11px;color:#cbd5e1">Stadium level ${sd.lv} · ${fmt(seats)} seats · Season ${D.S}</p>`);
      if (ph === 1) return capCard(vs);
      if (ph === 2) return capCard(short ? `<p style="font-weight:900">📋 ${esc(D.sh[0])} · Starting XI</p>${xiList(L[0])}<p style="font-weight:900;margin-top:8px">📋 ${esc(D.sh[1])} · Starting XI</p>${xiList(L[1])}` : `<p style="font-weight:900">📋 ${esc(D.n[0])} · Starting XI</p>${xiList(L[0])}`);
      if (ph === 3) return capCard(short ? vs : `<p style="font-weight:900">📋 ${esc(D.n[1])} · Starting XI</p>${xiList(L[1])}`);
      const n = Math.max(0, Math.ceil(dur - t)); return `<div style="text-align:center"><p style="font-size:12px;font-weight:900;letter-spacing:.14em;color:#67e8f9">KICK-OFF IN</p><p style="font-size:64px;font-weight:900;line-height:1;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent">${n}</p></div>`; }
    const sc = mEnd ? `${mEnd.T[0].score}–${mEnd.T[1].score}` : '', ph = t < PH[1] ? 0 : t < PH[2] ? 1 : 2;
    if (ph === 0) return capCard(`<p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">🏁 FULL TIME · ${esc(D.comp)}</p><div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:6px">${crestHtml(D, 0, 44)}<b style="font-size:34px">${sc}</b>${crestHtml(D, 1, 44)}</div>${pk ? `<p style="text-align:center;font-weight:900;color:#facc15">🥅 Penalties ${pk[0]}–${pk[1]}</p>` : ''}<p style="text-align:center;font-size:12px;color:#cbd5e1">${esc(D.n[0])} vs ${esc(D.n[1])}</p>`);
    if (ph === 1 && best) return capCard(`<p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#facc15">⭐ PLAYER OF THE MATCH</p><p style="font-size:20px;font-weight:900;margin-top:2px">${best.p.flag} ${esc(best.p.name)}</p><p style="font-size:12px;color:#cbd5e1">${esc(D.n[best.side])} · ${best.p.pos} · ${best.p.ovr} OVR${best.goals ? ` · ⚽ ${best.goals} goal${best.goals > 1 ? 's' : ''}` : ''}</p>`);
    const me = my === 0 || my === 1 ? (ws === -1 ? 'DRAW' : ws === my ? 'WIN' : 'DEFEAT') : '';
    return capCard(`<p style="text-align:center;font-size:24px;font-weight:900;color:${me === 'WIN' ? '#a3e635' : me === 'DEFEAT' ? '#ff2d95' : '#facc15'}">${me === 'WIN' ? '🎉 WIN!' : me === 'DEFEAT' ? 'DEFEAT' : me === 'DRAW' ? 'DRAW' : ws >= 0 ? '🏆 ' + esc(D.n[ws]) + ' win' : 'A DRAW'}</p><p style="text-align:center;font-size:12px;color:#cbd5e1">${sc}${pk ? ' · pens ' + pk[0] + '–' + pk[1] : ''} · thanks for watching</p>`);
  };
  const finish = () => { if (W._cer !== kind) return; W._cer = null; clearInterval(iv); if (G3.view === v) G3.stop(v); o.remove(); if (W.v3.on && document.getElementById('w11l3')) W.v3set(true); };
  const st = {}, parts3 = []; let cam = null, spin = 0, fired = 0;
  const v = { alive: () => W._cer === kind && document.body.contains(box),
    step(dt) { const t = clockT(); if (t >= dur || t < -1) { setTimeout(finish, 0); return null; } v.D = teamsOf(live); v.Wd = v.Wd || G3.world(sd.lv, v.D.k[0].c1, v.D.k[1].c1); v.t = t; v.dt = dt; spin += dt * 3;
      let eye, at; const P = PH;
      if (kind === 'open') {
        if (t < P[1]) { const th = t * 0.22 + 0.6; eye = [Math.sin(th) * 88, 40, Math.cos(th) * 72]; at = [0, 0, 0]; }
        else if (t < P[2]) { const u = (t - P[1]) / (P[2] - P[1]); at = [0, 1.2, lerp(30, 3, ease(u))]; eye = [9, 4.5, at[2] + 15]; if (!fired) { fired = 1; G3.burst(parts3, 80, [0, 2, 34], 5); } }
        else if (t < P[4]) { const sd2 = short ? (t < P[3] ? 0 : 1) : (t < P[3] ? 0 : 1), u = short ? (t - P[2]) / (P[4] - P[2]) : (t - (sd2 ? P[3] : P[2])) / (P[3] - P[2]); const x = short ? lerp(-21, 21, u) : sd2 ? lerp(2, 21, u) : lerp(-2, -21, u); at = [x, 1.5, 0]; eye = [x * 0.9, 2.2, 7]; }
        else { const u = ease((t - P[4]) / (P[5] - P[4])); eye = [0, lerp(6, 21, u), lerp(16, 72, u)]; at = [0, lerp(1.2, 0, u), 0]; }
      } else {
        if (t < P[1]) { const u = t / P[1]; eye = [Math.sin(u * 0.6) * 30, lerp(30, 20, u), lerp(80, 62, u)]; at = [0, 0, 0]; }
        else if (t < P[2] && best) { const bp = mEnd.P.find(p => p.id === best.id) || mEnd.P[0], th = t * 0.8; at = [PX(bp.x), 1.3, PZ(bp.y)]; eye = [at[0] + Math.sin(th) * 6.5, 2.8, at[2] + Math.cos(th) * 6.5]; }
        else { const th = t * 0.3; eye = [Math.sin(th) * 70, 34, Math.cos(th) * 60]; at = [0, 0, 0]; if (fired < 6 && Math.random() < dt * 3) { fired++; G3.burst(parts3, 50, [(Math.random() - 0.5) * 90, 30 + Math.random() * 10, (Math.random() - 0.5) * 60], 9); } }
      }
      const k = 1 - Math.exp(-dt * 4); cam = { eye: sm(cam && cam.eye, eye, cam ? k : 1), at: sm(cam && cam.at, at, cam ? k : 1), fov: 42 }; return cam; },
    draw() { const t = v.t, P = PH; G3.drawWorld(v.Wd, Math.abs(Math.sin(t * (kind === 'close' ? 8 : 3))) * (kind === 'close' ? 0.3 : 0.12));
      if (kind === 'open') {
        const list = []; for (let s = 0; s < 2; s++) L[s].forEach((p, i) => { const id = (D.ids[s] || [])[i] || s + ':' + i, lx = s ? 2 + i * 1.9 : -2 - i * 1.9, k0 = kick0.find(q => q.id === id) || { x: 52.5, y: 34 };
          let x, z, face = 0; if (t < P[1]) { x = s ? 1.2 : -1.2; z = 40 + i * 1.3; }
          else if (t < P[2]) { const u = clamp(((t - P[1]) / (P[2] - P[1])) * 1.35 - i * 0.03, 0, 1); x = lerp(s ? 1.2 : -1.2, lx, ease(u)); z = lerp(40 + i * 1.3, 0, ease(u)); }
          else if (t < P[4]) { x = lx; z = 0; }
          else { const u = ease((t - P[4]) / (P[5] - P[4]) * 1.4); x = lerp(lx, PX(k0.x), u); z = lerp(0, PZ(k0.y), u); face = u > 0.9 ? (s ? -Math.PI / 2 : Math.PI / 2) : 0; }
          list.push({ side: s, gk: i === 0, x: x + 52.5, y: z + 34, id, face, num: p.num }); });
        drawPlayers(v.D, list, st, v.dt, (p) => ({ face: p.face })); if (t >= P[4]) G3.ball(0, 0, 0, 0);
      } else if (mEnd) {
        drawPlayers(v.D, mEnd.P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.x, y: p.y, id: p.id, num: p.num })), st, v.dt, (p) => { const win = ws === p.side, ph = hash(p.id) % 7;
          return win ? { jump: Math.abs(Math.sin(t * 6 + ph)) * 0.5, arms: 'up', run: 0 } : ws === -1 ? { arms: Math.sin(t * 5 + ph) > 0.6 ? 'up' : '', run: 0 } : { lean: 0.35, run: 0 }; });
      }
      parts3.splice(0, parts3.length, ...G3.particles(parts3, v.dt)); } };
  const iv = setInterval(() => { const t = clockT(); setCap(captions(Math.max(0, t))); if (!G3.ok() && (t >= dur || !document.body.contains(o))) finish(); }, 200);
  setCap(captions(Math.max(0, clockT())));
  if (!G3.run(box, v)) { box.style.background = 'radial-gradient(circle at 50% 30%,rgba(168,85,247,.35),rgba(7,11,24,0) 70%)'; cap.style.justifyContent = 'center'; }
};

// ---------- 🏆 trophy lift (once per trophy) ----------
W.trophyLift = function (title, sub) {
  const me = W.me; if (!me || W._tro) return; W._tro = 1;
  const o = cerBox(), box = document.getElementById('w11cerb'), cap = document.getElementById('w11cert');
  const live = { kind: 'friend', home: W.teamInfo(me, 0, W.kitN((me.kits || [])[0]).c1), away: W.teamInfo(me, 1, '#ffffff'), seed: 1 }, D = W.dress(live), ids = (me.ids || []).slice(0, 11);
  cap.innerHTML = capCard(`<div style="text-align:center">${crestHtml(D, 0, 64)}<p style="font-size:11px;font-weight:900;letter-spacing:.14em;color:#facc15;margin-top:6px">CHAMPIONS</p><p style="font-size:22px;font-weight:900">${esc(title)}</p><p style="font-size:12px;color:#cbd5e1">${esc(sub)}</p><div id="w11trb" style="margin-top:10px;min-height:44px"></div></div>`);
  const t0 = performance.now(), parts3 = [], st = {}; let cam = null;
  const end = () => { W._tro = 0; if (G3.view === v) G3.stop(v); o.remove(); };
  setTimeout(() => { const b = document.getElementById('w11trb'); if (b) { b.innerHTML = '<button class="btn" style="pointer-events:auto">Continue</button>'; b.firstChild.onclick = end; } }, 9000);
  const v = { alive: () => !!W._tro && document.body.contains(box),
    step(dt, now) { const t = (now - t0) / 1000; v.t = t; v.dt = dt; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(CC.stdLv(me), v.D.k[0].c1, '#facc15');
      if (Math.random() < dt * 6) G3.burst(parts3, 14, [(Math.random() - 0.5) * 16, 14, (Math.random() - 0.5) * 10], 3);
      const th = t * 0.35 + 0.4, tg = { eye: [Math.sin(th) * 11, 3.4 + Math.sin(t * 0.5), Math.cos(th) * 11], at: [0, 1.8, 0] }; const k = 1 - Math.exp(-dt * 3); cam = { eye: sm(cam && cam.eye, tg.eye, cam ? k : 1), at: sm(cam && cam.at, tg.at, cam ? k : 1), fov: 45 }; return cam; },
    draw() { const t = v.t; G3.drawWorld(v.Wd, Math.abs(Math.sin(t * 8)) * 0.35);
      drawPlayers(v.D, ids.map((id, i) => { const a = (i - 5) / 5 * 1.25; return { side: 0, gk: i === 0, x: 52.5 + (i === 10 ? 0 : Math.sin(a) * 4.2), y: 34 + (i === 10 ? 1.4 : -Math.cos(a) * 4.2 + 3), id }; }), st, v.dt, (p) => ({ face: 0, jump: Math.abs(Math.sin(t * 5 + hash(p.id) % 5)) * 0.45, arms: 'up', run: 0 }));
      const lift = 2.9 + Math.abs(Math.sin(t * 2.5)) * 0.5; G3.trophy(0, lift, 1.4, t * 1.2, 0.9);
      parts3.splice(0, parts3.length, ...G3.particles(parts3, v.dt)); } };
  if (!G3.run(box, v)) { box.style.background = 'radial-gradient(circle at 50% 30%,rgba(250,204,21,.35),rgba(7,11,24,0) 70%)'; box.innerHTML = '<p style="text-align:center;font-size:90px;margin-top:18vh">🏆</p>'; cap.style.justifyContent = 'center'; }
};
W.troCheck = function () {
  const me = W.me; if (!me || W.live || W._tro) return; let seen = []; try { seen = JSON.parse(localStorage.getItem('w11_tro_seen') || '[]'); } catch (e) {}
  const all = (me.tro || []).filter(x => x.p === 1).map(x => ({ key: 'c' + x.s + x.k, t: CC.CUP_NAME[x.k], s: 'Season ' + x.s + ' · ' + esc(me.name) }))
    .concat((me.hist || []).filter(h => h.p === 1).map(h => ({ key: 'l' + h.s, t: '🥇 Division ' + h.t + ' champions', s: 'Season ' + h.s + ' · ' + h.pts + ' points' })));
  const n = all.find(x => !seen.includes(x.key)); if (!n) return;
  seen.push(n.key); try { localStorage.setItem('w11_tro_seen', JSON.stringify(seen.slice(-80))); } catch (e) {}
  W.trophyLift(n.t, n.s);
};

// ---------- 🏟️ 3D stadium in Club HQ · 👕 spinning kit preview ----------
W.stadium3d = function (box, lv) {
  if (!box) return; const me = W.me, K = W.kitN((me.kits || [])[0]); let cam = null;
  const v = { alive: () => document.body.contains(box) && G3.view === v,
    step(dt, now) { v.Wd = G3.world(lv, K.c1, K.c2); const th = now / 1000 * 0.18; const tg = { eye: [Math.sin(th) * 92, 46, Math.cos(th) * 78], at: [0, 2, 0] }; cam = { eye: tg.eye, at: tg.at, fov: 42 }; return cam; },
    draw() { G3.drawWorld(v.Wd, 0); } };
  if (!G3.run(box, v)) box.style.display = 'none';
};
W.G3.kitPreview = function (box, kit) {
  if (!box || !G3.ok()) return; const id = 'kitp'; let T = null;
  const v = { alive: () => document.body.contains(box) && G3.view === v, end: () => { G3.freeTeam(T); },
    step(dt, now) { if (!T) T = G3.team(kit, '#facc15'); v.T = T; v.t = now / 1000; return G3.be === 'b3' ? { eye: [0, 1.2, 3.55], at: [0, 1.02, 0], fov: 36, amb: 0.55, fog: 0.001, bg: [0.03, 0.05, 0.11] } : { eye: [0, 1.35, 4.6], at: [0, 1.15, 0], fov: 36, amb: 0.55, fog: 0.001, bg: [0.03, 0.05, 0.11] }; },
    draw() { const t = v.t; G3.floor(); G3.fig(T, false, id, 0, 0, { yaw: t * 0.9, phase: 0, run: 0, num: 10 }); } };
  G3.run(box, v);
};


// ---------- 🧍 G4b: real 3D players (Three.js + Quaternius, file w3d.js). Loaded in the background when 11 Wonders opens.
// Every view above stays the same; only the drawing switches. The tiny engine stays as the fallback (no WebGL2 / load failed / errors).
G3.be = 'gl';
const G3OLD = {}; ['run', 'stop', 'team', 'freeTeam', 'fig', 'ball', 'world', 'drawWorld', 'particles', 'trophy', 'floor'].forEach(k => { G3OLD[k] = G3[k]; });
const B3 = () => G3.B3 && G3.B3.ok() ? G3.B3 : null;
G3.run = function (box, view) {
  const B = B3(); if (B && box) { if (G3.be === 'gl' && G3.cv && G3.cv.parentNode) G3.cv.parentNode.removeChild(G3.cv); G3.be = 'b3'; G3.view = view; if (B.run(box, view)) return true; G3.view = null; }
  if (G3.be === 'b3' && G3.B3) G3.B3.stop(); G3.be = 'gl'; return G3OLD.run(box, view);
};
G3.stop = function (view) {
  if (G3.be !== 'b3') return G3OLD.stop(view);
  if (!view || G3.view === view) { const v = G3.view; G3.view = null; if (v && v.end) v.end(); if (G3.B3) G3.B3.stop(); }
};
['team', 'freeTeam', 'fig', 'ball', 'world', 'drawWorld', 'particles', 'trophy', 'floor'].forEach(k => { G3[k] = function () { return (G3.be === 'b3' && G3.B3 ? G3.B3 : G3OLD)[k].apply(this, arguments); }; });
W.W3D_V = 1;
W.w3d = { st: 0 };
W.w3dLoad = function () {
  if (W.w3d.st || !G3.ok() || typeof window === 'undefined') return;
  try { if (localStorage.getItem('w11_3dq') === 'lite') return; const c = document.createElement('canvas'); if (!c.getContext('webgl2')) return; } catch (e) { return; }
  if (navigator.deviceMemory && navigator.deviceMemory < 2) return;
  W.w3d.st = 1; const base = new URL('./', document.baseURI).href;
  import(base + 'w3d.js?v=' + W.W3D_V).then(() => window.W3D.load({ G3, base, v: W.W3D_V, weak: W.weak, hash, hx, kitN: W.kitN, crestSvg: W.crestSvg, numOf: (id) => { const p = W.player(id, W.S); return p ? p.num : null; } }))
    .then(B => { G3.B3 = B; W.w3d.st = 2; }).catch(e => { W.w3d.st = -1; console.warn('3D load', e); });
};

// ---------- 🔌 hooks into the match screens, home, Club HQ ----------
const _pdraw = Pitch.prototype.draw;
Pitch.prototype.draw = function (m, a) {
  if (this === W._mini) return _pdraw.call(this, m, a);
  if (this === W._pitch) { try { W.g4tick(m, a); } catch (e) { console.warn('G4', e); } if (W._mini) W._mini.draw(m, a); if (W.v3.on && G3.view && G3.view.live) return; }
  return _pdraw.call(this, m, a);
};
W.hold = () => !!(W._cer || W._rp || (W.cine && W.cine.cur));
W.g4match = function () {
  const cv = document.getElementById('w11c'); if (!cv || (cv.parentNode && cv.parentNode.dataset.g4)) return;
  const wrap = document.createElement('div'); wrap.dataset.g4 = '1'; wrap.style.cssText = 'position:relative'; cv.parentNode.insertBefore(wrap, cv); wrap.appendChild(cv);
  wrap.insertAdjacentHTML('beforeend', `<div id="w11l3" style="position:absolute;inset:0;border-radius:14px;overflow:hidden;display:none;box-shadow:0 0 22px rgba(34,211,238,.25)"></div>${G3.ok() ? '<button id="w11v3b" onclick="W11.v3toggle()" style="position:absolute;top:6px;right:6px;z-index:3;padding:5px 9px;border-radius:10px;font-size:10px;font-weight:900;background:rgba(7,11,24,.72);border:1px solid rgba(255,255,255,.22);color:#fff"></button>' : ''}`);
  W._gseen = new Set(); W._gq = []; W._closeDone = false; W._cer = null; W._rp = 0; W.cine = { cur: null, plan: [], done: new Set(), S: null, last: -1e9 };
  W.v3set(W.v3pref());
};
W.g4tick = function (m, a) {
  W._alpha = a; const live = W.live; if (!live || !document.getElementById('w11c') || !W._gseen) return;
  const e = ((live.kind === 'league' ? W.nowS() : Date.now()) - live.startAt) / 1000, CER = W.cerDur(live);
  if (e < -0.3 && e > -CER.open && !W._cer && !W._rp) W.ceremony('open', live);
  if (e >= 0 && !m.over && !W._cer) W.cineTick(m, live);
  if (W.cine.cur) W.cineStep(m);
  if (m.over && e >= TOTAL && !W._closeDone && !W._cer && !W._rp && !W.cine.cur) { W._closeDone = true; if (e < TOTAL + 120) W.ceremony('close', live); }
};
W.stopLoop = (function (b) { return function () { b.apply(this, arguments); W._cer = null; W._rp = 0; W._gq = []; W._mini = null; if (W.cine) W.cine.cur = null; ['w11cer', 'w11rp', 'w11cine'].forEach(id => { const x = document.getElementById(id); if (x && !W._tro) x.remove(); }); if (G3.view && !W._tro) G3.stop(); }; })(W.stopLoop);
W.play = (function (b) { return function () { const r = b.apply(this, arguments); W.g4match(); return r; }; })(W.play);
W.playL = (function (b) { return async function () { const r = await b.apply(this, arguments); W.g4match(); return r; }; })(W.playL);
/* ▶️ goal replays on the full-time screens */
W.finish = (function (b) { return async function (live, m) { const r = await b.apply(this, arguments); if (W.live === live) W.live = null; try { W.addReplays({ home: live.home, away: live.away, seed: live.seed, cmds: m.cmds.slice(), live }); } catch (e) {} return r; }; })(W.finish);
W.finishL = (function (b) { return async function (live) { const r = await b.apply(this, arguments); if (W.live === live) W.live = null; try { const cmds = await W.cmdsOnce(live); W.addReplays({ home: live.home, away: live.away, seed: live.seed, cmds, live }); } catch (e) {} return r; }; })(W.finishL);
W.resultL = (function (b) { return async function (mid, M) { const r = await b.apply(this, arguments); try { if (!M.q && M.s0 && M.s1) { const live = W.liveFrom(mid, M), cmds = await W.cmdsOnce(live); W.addReplays({ home: live.home, away: live.away, seed: live.seed, cmds, live }); } } catch (e) {} return r; }; })(W.resultL);
/* 🪙 once: GG Coins become rare tokens */
W.open = (function (b) { return async function () { await b.apply(this, arguments); try { W.w3dLoad(); } catch (e) {} const me = W.me; if (!me || me.g4) return;
  const r = await W.api('/w11/g4', {}); if (r && r.ok) { [me, W.me].forEach(x => { if (x) { x.g4 = 1; x.gems = r.gems; } }); W.chips(); if (!r.already) toast(`🪙 GG Coins are now rare and precious: you have ${r.gems}. Win trophies and promotion to earn more. Everyday money is now 💎 Gems.`); } }; })(W.open);
W.home = (function (b) { return function () { const r = b.apply(this, arguments); Promise.resolve(r).then(() => setTimeout(W.troCheck, 600)); return r; }; })(W.home);
W.hq = (function (b) { return function () { b.apply(this, arguments); const me = W.me, first = document.querySelector('#w11b .card'); if (!first) return;
  if (G3.ok()) { first.insertAdjacentHTML('afterbegin', '<div id="w11std3" style="height:170px;margin:-4px -4px 10px;border-radius:14px;overflow:hidden"></div>'); W.stadium3d(document.getElementById('w11std3'), CC.stdLv(me)); }
  first.insertAdjacentHTML('afterend', `<div class="card"><p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">🎨 CREST & KITS</p><div style="display:flex;align-items:center;gap:8px;margin-top:8px">${W.crestSvg(me.crest, me.short, 52, new Date(me.createdAt || Date.now()).getFullYear())}${(me.kits || []).slice(0, 3).map(k => W.kitSvg(k, 52, true)).join('')}</div>
    <button class="btn2" style="margin-top:10px" onclick="W11.redesign()">🎨 Redesign crest & kits · ${CC.TOK.design} 🪙 <span style="color:#94a3b8">(you have ${fmt(me.gems || 0)})</span></button></div>`); }; })(W.hq);
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🎥 <b>3D</b>: goals and big saves switch to a live 3D camera (see below), plus an opening ceremony before kick-off and a closing ceremony at full time. Switch the live match between 🎥 3D and 🗺️ 2D at any time. Win a trophy and your players lift it in 3D.</p>
    <p style="margin-top:6px">🧍 <b>Real 3D players</b>: your players wear your full kit (pattern, crest, collar, sleeves, shorts, socks, number on the back), run, kick, dive and celebrate. The 3D files download once when you open 11 Wonders and are then saved on your phone. Phones without the newest 3D keep the simple 3D.</p>
    <p style="margin-top:6px">🎨 <b>Crest & kits</b>: change them in 🏟️ Club HQ for ${CC.TOK.design} 🪙 GG Coins.</p>`); }; })(W.helpL);

// ---------- 🎬 live cinematic: the radar turns into a full-screen 3D camera for goals and big saves ----------
/* The engine is the same on every phone, so a hidden copy of the match runs a few seconds ahead ("shadow").
   When it sees a goal (or a big save) coming, the radar zooms into a 3D camera behind the attacker, follows the
   shot into the net (or the keeper's dive), the celebration, then shrinks back to the radar at the restart. Nothing is skipped:
   it is the live match itself, only seen from another camera. */
W.cine = { cur: null, plan: [], done: new Set(), S: null, last: -1e9 };
const LOOK = 90;
const cmdsNow = (live) => live.kind === 'league' ? (W._cmds || []) : (live.cmds || []);
W.cineTick = function (m, live) {
  const Cn = W.cine, cmds = cmdsNow(live), key = live.seed + ':' + JSON.stringify(cmds);
  let S = Cn.S;
  if (!S || S.key !== key || S.m.tick > m.tick + LOOK + 5 || S.m.tick < m.tick - 200) { const old = W._rec; W._rec = 0; try { S = Cn.S = { key, m: W.simulate(live.home, live.away, live.seed, cmds, m.tick + LOOK), C: cmds.slice().sort((a, b) => a.tick - b.tick) }; } finally { W._rec = old; } S.ci = S.C.findIndex(c => c.tick >= S.m.tick); if (S.ci < 0) S.ci = S.C.length; }
  let guard = 0; while (S.m.tick < m.tick + LOOK && !S.m.over && guard++ < 400) { while (S.ci < S.C.length && S.C[S.ci].tick === S.m.tick) { S.m.applyCmd(S.C[S.ci].side, S.C[S.ci].c); S.ci++; } S.m.step(); }
  /* plan the highlights the shadow can see coming */
  for (let i = S.m.ev.length - 1; i >= 0; i--) { const ev = S.m.ev[i]; if (ev.tick == null || ev.tick <= m.tick + 12) break;
    if (ev.k !== 'goal' && ev.k !== 'save') continue; const id = ev.k + ':' + ev.tick; if (Cn.done.has(id) || Cn.plan.some(x => x.id === id)) continue;
    if (ev.k === 'save' && (ev.tick - Cn.last < 500 || Cn.plan.some(x => x.k === 'save'))) continue;
    Cn.plan.push({ id, k: ev.k, tick: ev.tick, side: ev.k === 'goal' ? ev.side : 1 - ev.side, pid: ev.pid, start: ev.tick - (ev.k === 'goal' ? 64 : 50), end: ev.tick + (ev.k === 'goal' ? 58 : 22) }); }
  Cn.plan.sort((a, b) => a.start - b.start);
  if (!Cn.cur && Cn.plan.length && m.tick >= Cn.plan[0].start) { const c = Cn.plan.shift(); Cn.done.add(c.id);
    /* still coming? (an order can change the future) */
    if (c.tick > m.tick + 6 && S.m.ev.some(ev => ev.tick === c.tick && (ev.k === 'goal' || ev.k === 'save'))) W.cineStart(c, m, live); }
};
W.cineStart = function (c, m, live) {
  const host = document.getElementById('w11'), cv = document.getElementById('w11c'); if (!host || !cv || !G3.ok()) return;
  const r = cv.getBoundingClientRect(), hr = host.getBoundingClientRect(), D = W.dress(live), sh = [D.sh[0], D.sh[1]];
  const el = document.createElement('div'); el.id = 'w11cine';
  el.style.cssText = `position:absolute;z-index:25;left:${r.left - hr.left}px;top:${r.top - hr.top}px;width:${r.width}px;height:${r.height}px;opacity:.15;border-radius:14px;overflow:hidden;background:#070b18;transition:left .6s cubic-bezier(.2,.8,.2,1),top .6s cubic-bezier(.2,.8,.2,1),width .6s cubic-bezier(.2,.8,.2,1),height .6s cubic-bezier(.2,.8,.2,1),opacity .45s,border-radius .6s`;
  el.innerHTML = `<div id="w11cineb" style="position:absolute;inset:0"></div>
    <div style="position:absolute;left:0;right:0;top:0;display:flex;align-items:center;gap:8px;padding:10px 12px;padding-top:max(10px,env(safe-area-inset-top));background:linear-gradient(180deg,rgba(7,11,24,.85),rgba(7,11,24,0))"><span style="padding:3px 8px;border-radius:999px;font-size:9px;font-weight:900;letter-spacing:.1em;background:#ff2d95;color:#fff">● LIVE</span><b style="font-size:13px">${esc(sh[0])}</b><b id="w11cinesc" style="font-size:18px"></b><b style="font-size:13px">${esc(sh[1])}</b><span id="w11cinemn" style="margin-left:auto;font-size:11px;font-weight:900;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,.12)"></span></div>
    <div id="w11cinec" style="position:absolute;left:0;right:0;bottom:64px;text-align:center;pointer-events:none"></div>
    ${W.my === 0 || W.my === 1 ? `<div style="position:absolute;left:8px;right:8px;bottom:max(10px,env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${[['attack', '📣'], ['tight', '🧱'], ['press', '⚡'], ['calm', '🧘']].map(([k, l]) => `<button onclick="W11.shout('${k}')" style="padding:9px 0;border-radius:12px;font-size:15px;background:rgba(7,11,24,.6);border:1px solid rgba(255,255,255,.2)">${l}</button>`).join('')}</div>` : ''}`;
  host.appendChild(el);
  void el.offsetWidth; setTimeout(() => { Object.assign(el.style, { left: '0px', top: '0px', width: hr.width + 'px', height: hr.height + 'px', opacity: '1', borderRadius: '0px' }); }, 20);
  const st = {}; let cam = null, spin = 0;
  const v = { cine: true, alive: () => W.cine.cur === c && document.body.contains(el),
    step(dt) { const mm = W.m; if (!mm) return null; v.m = mm; v.dt = dt; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(v.D.sd.lv, v.D.k[0].c1, v.D.k[1].c1);
      const a = clamp(W._alpha == null ? 1 : W._alpha, 0, 1), b = mm.ball, L = (p, k) => p[k === 'x' ? 'px' : 'py'] + (p[k] - p[k === 'x' ? 'px' : 'py']) * a;
      let bx, by; if (b.owner) { bx = L(b.owner, 'x') + mm.dir(b.owner.side) * 0.9; by = L(b.owner, 'y'); } else { bx = b.px + (b.x - b.px) * a; by = b.py + (b.y - b.py) * a; }
      v.bx = bx; v.by = by; v.bh = b.h || 0; spin += dt * (b.fl ? 14 : 6);
      const atk = c.side, gx = atk === 0 ? 52.5 : -52.5, dirx = atk === 0 ? 1 : -1;
      const X = PX(bx), Z = PZ(by), scored = mm.ev.some(e => e.k === 'goal' && e.tick >= c.start), shot = b.fl && b.fl.kind === 'shot';
      let tg;
      if (scored && c.k === 'goal') { const sp = mm.P.find(p => p.id === c.pid) || b.owner || mm.P[0], th = performance.now() / 1000 * 0.7, px = PX(L(sp, 'x')), pz = PZ(L(sp, 'y')); tg = { eye: [px + Math.sin(th) * 11, 3.6, pz + Math.cos(th) * 11], at: [px, 1.2, pz] }; }
      else if (shot || Math.abs(gx - X) < 9) tg = { eye: [gx + dirx * 7.5, 2.3, (Z > 0 ? 1 : -1) * 8.5], at: [X * 0.5 + gx * 0.5, 1.1, Z * 0.6] };
      else { const cx = b.owner ? PX(L(b.owner, 'x')) : X, cz = b.owner ? PZ(L(b.owner, 'y')) : Z; tg = { eye: [cx - dirx * 8.5, 3.4, cz + (cz > 0 ? -3.5 : 3.5)], at: [cx + dirx * 9, 1.0, cz * 0.7] }; }
      const k = cam ? 1 - Math.exp(-dt * 3.2) : 1; cam = { eye: sm(cam && cam.eye, tg.eye, k), at: sm(cam && cam.at, tg.at, k), fov: 46 };
      const scE = document.getElementById('w11cinesc'), mnE = document.getElementById('w11cinemn'), cpE = document.getElementById('w11cinec');
      if (scE) scE.textContent = `${mm.T[0].score}–${mm.T[1].score}`; if (mnE) mnE.textContent = mm.minute() + "'";
      const hit = mm.ev.filter(e => (e.k === 'goal' || e.k === 'save') && e.tick >= c.start).pop();
      if (cpE && hit && cpE.dataset.on !== hit.k + hit.tick) { cpE.dataset.on = hit.k + hit.tick; const pl = hit.k === 'goal' && hit.pid ? W.player(hit.pid, D.S) : null;
        cpE.innerHTML = hit.k === 'goal' ? `<p style="font-size:40px;font-weight:900;letter-spacing:.06em;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent;animation:w11p 1s ease-in-out 3">GOAL!</p><p style="font-size:14px;font-weight:900">⚽ ${pl ? esc(pl.name) : ''} · ${esc(sh[hit.side])}</p>` : `<p style="font-size:30px;font-weight:900;color:#facc15">🧤 SAVE!</p><p style="font-size:13px;font-weight:900">${esc(String(hit.txt).replace(/^🧤 /, ''))}</p>`; }
      return cam; },
    draw() { const mm = v.m, a = clamp(W._alpha == null ? 1 : W._alpha, 0, 1), lo = W.liveOpts(mm), byId = {}; mm.P.forEach(p => { byId[p.id] = p; });
      const scored = mm.ev.some(e => e.k === 'goal' && e.tick >= c.start); G3.drawWorld(v.Wd, scored ? Math.abs(Math.sin(performance.now() / 120)) * 0.35 : 0);
      drawPlayers(v.D, mm.P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.px + (p.x - p.px) * a, y: p.py + (p.y - p.py) * a, id: p.id, num: p.num })), st, v.dt, (q) => lo(byId[q.id]));
      G3.ball(PX(v.bx), PZ(v.by), v.bh, spin); } };
  if (W.__dbg) console.warn('START', JSON.stringify({ k: c.k, tick: c.tick, start: c.start, end: c.end, mt: m.tick }));
  W.cine.cur = c; c.el = el; c.t0 = performance.now(); W.cine.last = c.tick;
  if (!G3.run(document.getElementById('w11cineb'), v)) { W.cine.cur = null; el.remove(); }
};
W.cineStep = function (m) {
  const c = W.cine.cur; if (!c || c.closing) return;
  /* another big moment right after this one? keep the 3D camera rolling */
  const nx = W.cine.plan[0]; if (nx && nx.start <= c.end + 40 && nx.tick > m.tick + 6) { W.cine.plan.shift(); W.cine.done.add(nx.id); Object.assign(c, { k: nx.k, tick: nx.tick, side: nx.side, pid: nx.pid, end: nx.end }); c.t0 = performance.now(); }
  const real = (performance.now() - c.t0) / 1000;
  if (!((m.tick >= c.end && m.pauseT <= 0) || real > 12 || m.over)) return;
  if (W.__dbg) console.warn('CLOSE', JSON.stringify({ k: c.k, tick: c.tick, end: c.end, mt: m.tick, pause: m.pauseT, real, over: m.over }));
  c.closing = 1; const el = c.el, cv = document.getElementById('w11c'), host = document.getElementById('w11');
  if (el && cv && host) { const r = cv.getBoundingClientRect(), hr = host.getBoundingClientRect(); Object.assign(el.style, { left: (r.left - hr.left) + 'px', top: (r.top - hr.top) + 'px', width: r.width + 'px', height: r.height + 'px', opacity: '0', borderRadius: '14px' }); }
  setTimeout(() => { if (W.cine.cur === c) W.cine.cur = null; if (G3.view && G3.view.cine) G3.stop(G3.view); if (el) el.remove(); if (W.v3.on && document.getElementById('w11l3')) W.v3set(true); }, 620);
};
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🎬 <b>Big moments live in 3D</b>: just before a goal or a big save, the radar turns into a full-screen 3D camera: the run-up, the shot, the net, the celebration. Then it goes back to the radar when play restarts. It is the live match itself, so you never miss anything, and your shout buttons stay on screen.</p>`); }; })(W.helpL);

})();
