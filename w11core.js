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
const lotT0 = (i) => EPOCH0 + i * 4000;
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
const DAY = 86400000, EPOCH0 = Date.UTC(2026, 10, 2), SDAYS = 28, MDS = 26, ENGINE = 2;
/* G5: the season clock can be restarted (fresh Season 1): the start day is kept in w11meta/season.ep; the market keeps EPOCH0 */
let EPOCH = EPOCH0;
const setEpoch = (ms) => { ms = Number(ms) || 0; if (ms > Date.UTC(2026, 0, 1) && ms < Date.UTC(2040, 0, 1)) EPOCH = Math.floor(ms / DAY) * DAY; return EPOCH; };
const epoch = () => EPOCH;
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
  const tk = {}; for (const k of ['cap', 'pen', 'fk', 'ck']) { const v = club.tk && club.tk[k]; if (typeof v === 'string' && ids.includes(v)) tk[k] = v; }
  return { tk, ids, form: FORM_NAMES.includes(club.form) ? club.form : '4-4-2', cond, tr: { att: Number(club.tr && club.tr.att) || 0, def: Number(club.tr && club.tr.def) || 0, fit: Number(club.tr && club.tr.fit) || 0 }, bo, io, n: club.name || 'My Club', sh: club.short || 'MYC', kit: ((club.kits || [])[0] || {}).c1 || '', kits: (club.kits || []).map(k => k && k.c1).filter(Boolean), kf: (club.kits || []).slice(0, 3).map(cleanKit), cr: cleanCrest(club.crest), sd: { lv: stdLv(club), nm: String((club.std && club.std.nm) || ((club.name || 'My Club') + ' Park')).slice(0, 30) } };
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

return { EPOCH0, ENGINE, setEpoch, epoch, OC_FIRST, CL_FIRST, cupOn, CUP_TIMES, cupKoAt, TOK, COLORS, SHAPES, SYMS, PATS, BANDS, cleanKit, cleanCrest, STAFF, PHYSIO_REC, SCOUT_N, hasStaff, STD_SEATS, STD_TICKET, STD_COST, stdLv, SP_KINDS, spOffers, spOf, matchExtra, OC_DAYS, CL_DAYS, CL_GR, CUP_GAP, CUP_FIRST, OC_WIN, CL_WIN, CL_DRAW, CUP_PRIZE, CUP_NAME, cupDays, cupDay, cupKo, cupAiKo, cupMid, isCupDay, isKO, seat, cupUser, roundName, pens, cupScore, cupWin, winSide, cupStr, cupResStr, cupCoins, clTable, cupPairs, cupQuick, cupKoOf, ocBracket, clGroups, r500, NEW_RE, isNew, POS15, LEGEND_OVR, MAX_SQUAD, MIN_SQUAD, PLAYABLE, PIONEERS, nplayer, oplayer, value, releaseValue, youthIds, legendId, MK_N, MK_LEN, MK_EXT, MK_AI, lotT0, lotPid, stepOf, lotInfo, lotEff, lotCur, absDay, REC, DRAIN, AI_COND, TR_MAX, PACK_FIT, condNow, FORM_NAMES, sheetOf, aiSheet, ENGINE_TICKS, parseRes, RES_RE, WORLD, hash, rng, pick, clamp, CULT, POS_TEMPLATE, club, base, youth, player, squadIds, avg, DAY, EPOCH, SDAYS, MDS, SLOTS, AI_HOUR, MATCH_MS, clock, dayStart, ko, aiKo, TIER_START, groupsIn, gkey, initClubs, pairs, mid, quick, seatClub, isUserAt, strength, result, table, UP, DOWN, parentOf, childrenOf, nextClubs, winCoins, drawCoins, prize, PROMO_BONUS };
})();
