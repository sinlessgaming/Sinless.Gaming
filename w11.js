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
/* G8 legal check: a random first + last name must never spell a real footballer (found by the name audit: tests/g8_names.mjs).
   Same random numbers are used, so every other player stays exactly the same; a clash just takes the next surname. */
const REAL_NAMES = new Set(['kyle walker', 'thiago silva']);
const named = (r) => { const cult = pickCult(r), C = CULT[cult], L = C[2].split(' '), first = pick(r, C[1].split(' ')); let li = Math.floor(r() * L.length); if (REAL_NAMES.has((first + ' ' + L[li]).toLowerCase())) li = (li + 1) % L.length; const last = L[li]; return { cult, flag: C[0], name: first + ' ' + last, short: last.length > 11 ? last.slice(0, 10) + '.' : last }; };
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
const NEW_RE = /^([aybL])(\d+)x(\d+)(?:x(\d+))?$/;
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
/* G12 market lots ('b'): any position, picked from the lot (not the slot) */
const POSB = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'FWD'];
const posOfNew = (m) => m[1] === 'L' ? LEG_POS[Number(m[3]) % 10] : m[1] === 'b' ? POSB[hash('pb:' + m[0]) % 16] : POS15[Number(m[1] === 'a' ? m[3] : m[4]) % 15];
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
  if (k === 'b') return bplayer(id, k, nm, pos, r, num);
  return { id, k, ...nm, pos, age, ovr, pot, wk, ...attrs(r, pos, ovr), num };
};
/* G12: market players with heavy variety: every age 16–35, OVR 42–93, and a profile that makes him special
   (a sprinter, a pure finisher, a passer, a dribbler, a rock at the back...), not just 'good at everything a bit' */
const B_PROF = { GK: [{ gk: 8, pas: -6 }, { pas: 12, pac: 6, gk: -2 }, { gk: 4, def: 6 }],
  DEF: [{ def: 9, pac: -6 }, { pac: 14, def: -2, dri: 4 }, { pas: 12, def: 2 }, { def: 5, sho: 10 }, { dri: 10, pac: 8, def: -4 }],
  MID: [{ pas: 12, def: -4 }, { def: 10, pas: 4, sho: -8 }, { sho: 12, pas: -2 }, { dri: 12, pac: 6, def: -8 }, { pac: 12, pas: 3 }, { pas: 6, def: 6, pac: 4, sho: -6 }],
  FWD: [{ sho: 12, pac: -4, pas: -6 }, { pac: 16, sho: 2, pas: -6 }, { dri: 13, sho: 4 }, { pas: 10, dri: 4, sho: -2 }, { sho: 6, def: 8, pac: -6 }] };
const bplayer = function (id, k, nm, pos, r, num) {
  const age = 16 + Math.floor(r() * 20), x = r();
  let ovr = x < 0.18 ? 42 + Math.floor(r() * 12) : x < 0.45 ? 54 + Math.floor(r() * 10) : x < 0.72 ? 64 + Math.floor(r() * 10) : x < 0.9 ? 74 + Math.floor(r() * 9) : x < 0.98 ? 83 + Math.floor(r() * 6) : 89 + Math.floor(r() * 5);
  if (age <= 19) ovr = Math.min(ovr, 50 + (age - 16) * 7); if (age >= 33) ovr = Math.max(48, ovr - (age - 32) * 2);
  let wk = false; if (age <= 19 && r() < 0.07) { wk = true; ovr = 64 + Math.floor(r() * 12); }
  const pot = wk ? 90 + Math.floor(r() * 8) : age < 27 ? clamp(ovr + 2 + Math.floor(r() * (age < 22 ? 22 : 12)), ovr, 94) : ovr;
  const A = attrs(r, pos, ovr), P = B_PROF[pos][Math.floor(r() * B_PROF[pos].length)], sp = 0.8 + r() * 0.7;
  for (const q in P) A[q] = clamp(Math.round(A[q] + P[q] * sp), 25, 99);
  return { id, k, ...nm, pos, age, ovr, pot, wk, ...A, num };
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
/* G12: from MK_T2 every auction lasts 2 min 30 s (MK_LEN2) and sells a 'b' player (any position, much more variety).
   Lots that started before MK_T2 keep 60 s and their 'a' players, so nothing already sold or owned ever changes. */
const MK_T2 = Date.UTC(2026, 10, 6, 0, 0), MK_LEN2 = 150000;
const mkLen = (st) => st >= MK_T2 ? MK_LEN2 : MK_LEN;
const lotT0 = (i) => EPOCH0 + i * 4000;
const lotPid = (i, n, st) => (st >= MK_T2 ? 'b' : 'a') + clock(st).s + 'x' + i + 'x' + n;
const stepOf = (p) => Math.max(500, r500(p * 0.05));
const lotInfo = (i, n, st) => {
  const pid = lotPid(i, n, st), p = player(pid, clock(st).s), v = value(p), start = Math.max(1000, r500(v * 0.4)), r = rng(hash('mkai:' + pid));
  const aiMax = r() < 0.35 ? 0 : Math.max(start, r500(v * (0.7 + r() * 0.9))), aiClub = Math.floor(r() * 434);
  return { i, n, st, pid, v, start, aiMax, aiClub };
};
/* L = a stored lot { i, n, st, end, p, u, un, c, nb } (or a fresh one { i, n, st }); answers how it stands at time `now` */
const lotEff = (L, now) => {
  const I = lotInfo(L.i, L.n, L.st);
  if (!L.u) { const end = L.st + mkLen(L.st); return { ...I, top: null, price: I.start, end, closed: now >= end, winner: now >= end ? (I.aiMax >= I.start ? 'ai' : null) : null, minNext: I.start }; }
  const e = L.end, aiNext = L.p + stepOf(L.p);
  if (aiNext <= I.aiMax && now >= e - MK_AI) { const end = e - MK_AI + MK_EXT; return { ...I, top: 'ai', price: aiNext, end, closed: now >= end, winner: now >= end ? 'ai' : null, minNext: aiNext + stepOf(aiNext), aiAt: e - MK_AI }; }
  return { ...I, top: 'u', price: L.p, end: e, closed: now >= e, winner: now >= e ? 'u' : null, minNext: L.p + stepOf(L.p) };
};
/* which lot is running in slot i right now, given the last stored lot of that slot (or none) */
/* the n-th lot after a lot that started at st0 (60 s lots before MK_T2, 150 s lots from the first start after it) */
const lotChain = (i, n0, st0, now) => {
  if (st0 >= MK_T2) { const k = Math.max(0, Math.floor((now - st0) / MK_LEN2)); return { i, n: n0 + k, st: st0 + k * MK_LEN2 }; }
  const k1 = Math.max(0, Math.floor((now - st0) / MK_LEN)); if (st0 + k1 * MK_LEN < MK_T2) return { i, n: n0 + k1, st: st0 + k1 * MK_LEN };
  const nB = Math.ceil((MK_T2 - st0) / MK_LEN), tB = st0 + nB * MK_LEN, k = Math.max(0, Math.floor((now - tB) / MK_LEN2)); return { i, n: n0 + nB + k, st: tB + k * MK_LEN2 };
};
/* which lot is running in slot i right now, given the last stored lot of that slot (or none) */
const lotCur = (i, L, now) => {
  if (!L) return lotChain(i, 0, lotT0(i), now);
  const E = lotEff(L, now); if (!E.closed) return L;
  return lotChain(i, L.n + 1, E.end, now);
};
const squadIds = (ci) => POS_TEMPLATE.map((_, s) => ci + '-' + s);
const avg = (ids, S) => Math.round(ids.slice(0, 11).map(id => player(id, S)).reduce((s, p) => s + p.ovr, 0) / 11);

/* 📅 season clock: 28 days = 1 year. Days 1–26 one matchday each, day 27 last checks, day 28 promotion & prizes. */
const DAY = 86400000, EPOCH0 = Date.UTC(2026, 10, 2), SDAYS = 28, MDS = 26, ENGINE = 10;
/* G5: the season clock can be restarted (fresh Season 1): the start day is kept in w11meta/season.ep; the market keeps EPOCH0 */
let EPOCH = EPOCH0;
const setEpoch = (ms) => { ms = Number(ms) || 0; if (ms > Date.UTC(2026, 0, 1) && ms < Date.UTC(2040, 0, 1)) EPOCH = Math.floor(ms / DAY) * DAY; return EPOCH; };
const epoch = () => EPOCH;
/* 🌍 G6: 6 world zones, each with its own league ladder. A manager's zone comes from his phone's time zone (minutes east of GMT). */
const ZONES = 6, ZONE_NAME = ['Americas West', 'Americas East', 'Europe & Africa', 'Middle East & South Asia', 'East Asia', 'Oceania'], ZONE_FLAG = ['🌎', '🌎', '🌍', '🌏', '🌏', '🌏'];
const ZONE_OF = [-480, -300, 60, 300, 480, 600];
const cleanOf = (of) => { of = Math.round((Number(of) || 0) / 15) * 15; return of < -720 ? -720 : of > 840 ? 840 : of; };
const zoneOf = (of) => { of = cleanOf(of); return of <= -420 ? 0 : of <= -91 ? 1 : of <= 180 ? 2 : of <= 390 ? 3 : of < 600 ? 4 : 5; };
/* G6: kick-off slots are LOCAL times (10:00, 14:00, 18:00, 21:00 on the home manager's phone); computer games 18:00 zone time */
const SLOTS = [10, 14, 18, 21], AI_HOUR = 18, MATCH_MS = 4 * 60000;
const clock = (t) => { const e = Math.max(0, t - EPOCH), s = Math.floor(e / (SDAYS * DAY)) + 1, day = Math.floor((e % (SDAYS * DAY)) / DAY) + 1; return { s, day }; };
const dayStart = (s, day) => EPOCH + ((s - 1) * SDAYS + (day - 1)) * DAY;
const ko = (s, md, slot, of) => dayStart(s, md) + SLOTS[slot] * 3600000 - cleanOf(of) * 60000;
const aiKo = (s, md, z) => dayStart(s, md) + AI_HOUR * 3600000 - ZONE_OF[z == null ? 2 : z] * 60000;

/* 🏔️ pyramid per zone: Div 1 = 1 group … Div 5 = 16 groups, Div 6 = 32 groups (+ extra ones when full); 14 clubs a group.
   G6: group g of division t belongs to zone g >> (t-1) (zone z owns groups z·2^(t-1) … (z+1)·2^(t-1) − 1).
   Extra Div 6 groups have g >= 192: zone = (g − 192) % 6, k-th extra of that zone = floor((g − 192) / 6). */
const TIER_START = [0, 84, 252, 588, 1260, 2604];
const groupsIn = (t) => 1 << (t - 1);
const NG = (t) => ZONES << (t - 1), X6 = ZONES << 5;
const zoneOfG = (t, g) => t === 6 && g >= X6 ? (g - X6) % ZONES : g >> (t - 1);
const extraG = (z, k) => X6 + k * ZONES + z;
const groupNo = (t, g) => t === 6 && g >= X6 ? 33 + Math.floor((g - X6) / ZONES) : (g % groupsIn(t)) + 1;
const aiZone = (ci) => { ci = Number(ci); if (!(ci >= 0) || ci >= 100000) return 2; let t = 6; for (let i = 1; i < 6; i++) if (ci < TIER_START[i]) { t = i; break; } return zoneOfG(t, Math.floor((ci - TIER_START[t - 1]) / 14)); };
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
/* G6: a computer club's strength is its base rating (cheap: the season change must fit the free plan) */
const strength = (G, pos, md) => {
  if (isUserAt(G, pos, md)) return G.users[pos].o || 55;
  const ci = seatClub(G, pos, md);
  if (strengthCache[ci] == null) strengthCache[ci] = club(ci).base;
  return strengthCache[ci];
};
/* result of one fixture: [h, a] or null (waiting) */
const result = (G, md, hp, ap, now) => {
  const k = md + '_' + hp, R = G.res && G.res[k];
  if (R) { const [h, a] = String(R).split('-').map(Number); return [h, a]; }
  if (isUserAt(G, hp, md) || isUserAt(G, ap, md)) return null;
  if (now != null && now < aiKo(G.s, md, zoneOfG(G.t, G.g)) + MATCH_MS) return null;
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
const parentOf = (t, g) => t > 1 && !(t === 6 && g >= X6) ? [t - 1, g >> 1] : null;
const childrenOf = (t, g) => t < 6 && g < NG(t) ? [[t + 1, 2 * g], [t + 1, 2 * g + 1]] : [];
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

/* G13 (engine 6): 📍 free positions like Top Eleven. 35 spots on the board (5 lines from defence to attack x 7 lanes);
   a club may put its 10 outfield starters on any 10 different spots (keeper fixed). Stored as club.fp = [spot for slot 1..10].
   Spot k: line = floor(k / 7) (0 defence, 1 holding mid, 2 midfield, 3 attacking mid, 4 attack), lane = k % 7 (0 = left touchline side). */
const FP_X = [16, 25, 33, 40, 47], FP_Y = [8, 17, 26, 34, 42, 51, 60], FP_N = 35;
const fpSpot = (k) => { const ln = Math.floor(k / 7), la = k % 7, side = la <= 1 ? 'L' : la >= 5 ? 'R' : 'C';
  const dp = ln === 0 ? (side === 'C' ? 'DC' : 'D' + side) : ln <= 2 ? (side === 'C' ? 'MC' : 'M' + side) : ln === 3 ? (side === 'C' ? 'AMC' : 'AM' + side) : (side === 'C' ? 'ST' : 'AM' + side);
  return { x: FP_X[ln], y: FP_Y[la], role: ln === 0 ? 'DEF' : ln === 4 ? 'FWD' : 'MID', dp, ln, la }; };
/* valid = 10 different whole spots, 3 to 5 defenders, at least one player in the two attacking lines, max 4 in one line besides defence */
const fpOk = (fp) => { if (!Array.isArray(fp) || fp.length !== 10) return false; const seen = new Set(), per = [0, 0, 0, 0, 0];
  for (const k of fp) { if (!Number.isInteger(k) || k < 0 || k >= FP_N || seen.has(k)) return false; seen.add(k); per[Math.floor(k / 7)]++; }
  return per[0] >= 3 && per[0] <= 5 && per[3] + per[4] >= 1 && per[1] <= 4 && per[2] <= 5 && per[3] <= 4 && per[4] <= 4; };
const fpClean = (fp) => fpOk(fp) ? fp.map(Number) : null;
/* the formation name that is closest to a set of spots (shown on phones as "Custom (4-2-3-1)") */
const fpForm = (fp) => { if (!fpOk(fp)) return ''; const per = [0, 0, 0, 0, 0]; fp.forEach(k => per[Math.floor(k / 7)]++); return per.filter(Boolean).join('-'); };
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
  const sh = { tk, ids, form: FORM_NAMES.includes(club.form) ? club.form : '4-4-2', cond, tr: { att: Number(club.tr && club.tr.att) || 0, def: Number(club.tr && club.tr.def) || 0, fit: Number(club.tr && club.tr.fit) || 0 }, bo, io, n: club.name || 'My Club', sh: club.short || 'MYC', kit: ((club.kits || [])[0] || {}).c1 || '', kits: (club.kits || []).map(k => k && k.c1).filter(Boolean), kf: (club.kits || []).slice(0, 3).map(cleanKit), cr: cleanCrest(club.crest), sd: { lv: stdLv(club), nm: String((club.std && club.std.nm) || ((club.name || 'My Club') + ' Park')).slice(0, 30) } }
  /* G4c: learned positions + renamed players travel with the team sheet (only when there are any) */
  const lp = learnedMap(club, ids, S, Date.now()), rn = rnMap(club, ids, S); if (Object.keys(lp).length) sh.lp = lp; if (Object.keys(rn).length) sh.rn = rn;
  /* G13: free positions travel with the sheet (only when set) */
  if (fpOk(club.fp)) sh.fp = club.fp.map(Number);
  /* G6: climate + time zone (weather, day/night) and the touchline manager's look */
  sh.cz = climOk(club.cz); sh.of = cleanOf(club.of); if (club.mgr) sh.mg = cleanMgr(club.mgr);
  return sh;
};
const aiSheet = (ci, key, S) => { const c = club(ci), z = aiZone(ci); return { ai: ci, ids: squadIds(ci), form: FORM_NAMES[hash(key + ':f') % 15], cond: {}, tr: {}, bo: [], io: [], n: c.name, sh: c.short, aiCond: AI_COND, cz: aiClim(ci), of: ZONE_OF[z] }; };
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
/* G6: cup times are LOCAL quarter hours 09:15–22:45 (of = the manager's minutes east of GMT) */
const CUP_TIMES = (() => { const o = []; for (let m = 555; m <= 1365; m += 15) { if (SLOTS.some(h => m > h * 60 - 25 && m < h * 60 + 15)) continue; o.push(m); } return o; })();
const cupKoAt = (s, d, key, of) => dayStart(s, d) + (CUP_TIMES[hash('ckt:' + key) % CUP_TIMES.length] - cleanOf(of)) * 60000;
/* G6: a Champions League tie between two zones kicks off at the fairest hour for both (10:00–22:00 local if it can) */
const badMin = (l) => { l = ((l % 1440) + 1440) % 1440; return l >= 600 && l <= 1320 ? 0 : l > 1320 ? l - 1320 : 600 - l; };
const nearSlot = (l) => { l = ((l % 1440) + 1440) % 1440; return SLOTS.some(h => l > h * 60 - 25 && l < h * 60 + 15); };
const fairKo = (s, d, key, a, b) => { a = cleanOf(a); b = cleanOf(b); let best = 1e9; const ok = [];
  for (let u = 0; u < 1440; u += 15) { const x = badMin(u + a), y = badMin(u + b), sc = Math.max(x, y) * 2 + x + y + (nearSlot(u + a) || nearSlot(u + b) ? 30 : 0);
    if (sc < best - 0.5) { best = sc; ok.length = 0; } if (sc <= best + 0.5) ok.push(u); }
  return dayStart(s, d) + ok[hash('cft:' + key) % ok.length] * 60000; };
const OC_WIN = 5000, CL_WIN = 15000, CL_DRAW = 5000, CUP_PRIZE = { oc: [300000, 100000], cl: [1000000, 300000] };
const CUP_NAME = { oc: '🏆 Open Cup', cl: '⭐ Champions League' };
const cupDays = (C) => C.k === 'cl' ? CL_DAYS : OC_DAYS.slice(OC_DAYS.length - C.R);
const cupDay = (C, r) => cupDays(C)[r - 1];
const cupKo = (s, d, sl) => ko(s, d, sl) + CUP_GAP;
const cupAiKo = (s, d, z) => dayStart(s, d) + CUP_AI_HOUR * 3600000 - (z == null ? 0 : ZONE_OF[z]) * 60000;
/* G6: each zone has its own Open Cup (doc w11c/{S}-oc{z}); the Champions League is worldwide (w11c/{S}-cl) */
const cupId = (C) => C.k === 'oc' && C.z != null ? 'oc' + C.z : C.k;
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
const cupQuick = (C, r, k, p) => { const key = cupMid(C.s, cupId(C), r, k), q = quick(key, cupStr(C, p[0]), cupStr(C, p[1])); return q[0] + '-' + q[1] + (isKO(C, r) && q[0] === q[1] ? '/' + pens(key).join('-') : ''); };
/* kick-off of pair k in round r: a match with a manager gets its own time (see CUP_TIMES); computer games 20:00 GMT */
const cupOfs = (C, ci) => { const u = cupUser(C, ci); return u && u.of != null ? cleanOf(u.of) : ZONE_OF[ci >= 0 ? aiZone(seat(C, ci)) : 2]; };
const cupKoOf = (C, r, p, k) => { const h = cupUser(C, p[0]), a = cupUser(C, p[1]), d = cupDay(C, r), key = cupMid(C.s, cupId(C), r, k);
  if (!h && !a) return cupAiKo(C.s, d, C.k === 'oc' ? C.z : null);
  if (C.k === 'cl') return fairKo(C.s, d, key, cupOfs(C, p[0]), cupOfs(C, p[1]));
  return cupKoAt(C.s, d, key, h && h.of != null ? h.of : a && a.of != null ? a.of : ZONE_OF[C.z == null ? 2 : C.z]); };
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

/* ===================== G4c: detailed positions, learning new positions, renaming ===================== */
/* every player has a main spot (from his id, same on every phone); he can learn up to 2 nearby spots */
const DPOS = ['GK', 'DL', 'DC', 'DR', 'ML', 'MC', 'MR', 'AML', 'AMC', 'AMR', 'ST'];
const DLINE = { GK: 0, DL: 1, DC: 1, DR: 1, ML: 2, MC: 2, MR: 2, AML: 3, AMC: 3, AMR: 3, ST: 4 };
const DPOS_NAME = { GK: 'Goalkeeper', DL: 'Left back', DC: 'Centre back', DR: 'Right back', ML: 'Left midfield', MC: 'Centre midfield', MR: 'Right midfield', AML: 'Left wing', AMC: 'Attacking midfield', AMR: 'Right wing', ST: 'Striker' };
const dpOf = (p) => { if (!p) return 'MC'; const h = (hash('dp:' + (p.gid || p.id)) >>> 9) % 100;
  return p.pos === 'GK' ? 'GK' : p.pos === 'DEF' ? (h < 50 ? 'DC' : h < 75 ? 'DL' : 'DR') : p.pos === 'MID' ? (h < 35 ? 'MC' : h < 50 ? 'ML' : h < 65 ? 'MR' : h < 85 ? 'AMC' : h < 93 ? 'AML' : 'AMR') : (h < 60 ? 'ST' : h < 80 ? 'AML' : 'AMR'); };
/* nearby = same line (any side), or midfield <-> attacking midfield <-> striker. Never into defence or goal, never out of them. */
const canLearn = (from, to) => { const a = DLINE[from], b = DLINE[to]; if (a == null || b == null || from === to || !a || !b) return false; if (a === b) return true; return a >= 2 && b >= 2 && Math.abs(a - b) === 1; };
const LEARN_MAX = 2, LEARN_FAST = 3, LEARN_FAST_DAYS = 3;
/* how fast he adapts: half a season (14 days) to a full season (28 days) */
const learnDays = (gid) => 14 + hash('adapt:' + gid) % 15;
const gidOf = (id, S) => { const p = player(id, S); return (p && p.gid) || String(id); };
/* positions a player knows now: main + learned (+ the one in training once it is finished) */
const knownPos = (club, id, S, now) => { const p = player(id, S), g = (p && p.gid) || String(id), out = [dpOf(p)], lp = (club && club.lp && club.lp[g]) || [];
  for (const x of lp) if (DPOS.includes(x) && !out.includes(x)) out.push(x);
  const t = club && club.trn; if (t && t.g === g && Number(t.end) <= (now == null ? Date.now() : now) && DPOS.includes(t.to) && !out.includes(t.to)) out.push(t.to);
  return out; };
/* learned positions of the top 18 for a team sheet / friendly ({id: [pos…]}, only players who learned something) */
const learnedMap = (club, ids, S, now) => { const o = {}; for (const id of (ids || []).slice(0, 18)) { const k = knownPos(club, id, S, now); if (k.length > 1) o[id] = k.slice(1); } return o; };
/* how well he plays in a spot: 1 = his own spot, a little less on the other side of the same line, a lot less far away */
const posFit = (have, slot) => { if (!slot || have.includes(slot)) return 1; if (slot === 'GK' || have[0] === 'GK') return 0.45; let best = 0.72;
  for (const h of have) { const a = DLINE[h], b = DLINE[slot]; const f = a === b ? 0.93 : Math.abs(a - b) === 1 ? (Math.min(a, b) >= 2 ? 0.86 : 0.8) : 0.72; if (f > best) best = f; } return best; };
/* ✏️ rename: once per player (name + country). Letters only, no bad words, no famous footballers. */
const COUNTRIES = 'AF AL DZ AD AO AG AR AM AU AT AZ BS BH BD BB BY BE BZ BJ BT BO BA BW BR BN BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GD GT GN GW GY HT HN HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KI XK KW KG LA LV LB LS LR LY LI LT LU MG MW MY MV ML MT MH MR MU MX FM MD MC MN ME MA MZ MM NA NR NP NL NZ NI NE NG KP MK NO OM PK PW PS PA PG PY PE PH PL PT QA RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SK SI SB SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW HK PR CW FO GI EN SC2 WA NIR'.split(' ');
/* bad words: whole words, plus a few that are never part of a real name anywhere inside */
const BAD_W = 'fuck fuk fck shit sh1t bitch cunt dick cock pussy whore slut bastard asshole arsehole wank wanker twat nigger nigga faggot fag retard rape rapist nazi hitler porn penis vagina anus sex xxx kkk isis jihad terrorist pedo paedo molest boob boobs tits titty cum jizz dildo motherfucker mofo bollocks prick spastic tranny chink gook spic kike wetback coon paki crap piss'.split(' ');
const BAD_IN = 'fuck cunt nigg fagg hitler whore porn bitch motherf rapist paedo pussy dildo jizz shit wank twat'.split(' '), BAD_ALL = 'fuck cunt nigg fagg hitler'.split(' ');
/* unmistakable surnames block on their own; common ones only as a full name */
const FAMOUS = 'messi ronaldo ronaldinho neymar mbappe haaland lewandowski modric debruyne vandijk pele maradona zidane beckham rooney ibrahimovic suarez griezmann pogba hazard bellingham rodrygo osimhen drogba okocha etoo kante kroos neuer buffon casillas iniesta puyol totti pirlo maldini baggio kaka rivaldo eusebio cruyff beckenbauer platini gerrard lampard cantona alisson courtois oblak donnarumma dibala lukaku foden rashford grealish odegaard kvaratskhelia hakimi mahrez aubameyang adebayor yamal mitoma heungmin'.split(' ').concat('mohamed salah|mo salah|harry kane|thierry henry|sadio mane|yaya toure|kolo toure|xavi hernandez|sergio ramos|gerard pique|toni kroos|thomas muller|manuel neuer|luka modric|kevin de bruyne|son heungmin|heung min son|gareth bale|frank lampard|john terry|paul scholes|ryan giggs|roberto carlos|luis figo|bukayo saka|declan rice|cole palmer|raheem sterling|jamie vardy|lautaro martinez|emiliano martinez|julian alvarez|fede valverde|federico valverde|alphonso davies|christian pulisic|takefusa kubo|michael essien|asamoah gyan|andre ayew|jordan ayew|thomas partey|mohammed kudus|tony yeboah|abedi pele|nwankwo kanu|george weah|samuel etoo|didier drogba|riyad mahrez|achraf hakimi|victor osimhen|rafael leao|lamine yamal|pedri gonzalez|vinicius junior|vini jr|gavi paez|lionel messi|cristiano ronaldo|kylian mbappe|erling haaland|abedi ayew|sulley muntari|kevin prince boateng|jerome boateng|inaki williams|nico williams|ademola lookman|alex iwobi|wilfred ndidi|samuel chukwueze|kelechi iheanacho|jay jay okocha|john obi mikel|joseph yobo|vincent enyeama|odion ighalo|ahmed musa|taiwo awoniyi|calvin bassey|kalidou koulibaly|edouard mendy|idrissa gueye|ismaila sarr|hakim ziyech|yassine bounou|sofyan amrabat|ismael bennacer|wilfried zaha|nicolas pepe|franck kessie|sebastien haller|andre onana|vincent aboubakar|bryan mbeumo|pierre emerick aubameyang|naby keita|serhou guirassy|mohamed elneny|omar marmoush|percy tau|teboho mokoena|ronwen williams|benni mccarthy|lucas radebe|steven pienaar|jude bellingham|phil foden|marcus rashford|jack grealish|john stones|kyle walker|jordan pickford|harry maguire|mason mount|trent alexander arnold|jordan henderson|wayne rooney|steven gerrard|david beckham|alan shearer|michael owen|gary neville|rio ferdinand|ashley cole|ollie watkins|ivan toney|antoine griezmann|ousmane dembele|kingsley coman|paul pogba|ngolo kante|olivier giroud|hugo lloris|mike maignan|theo hernandez|lucas hernandez|raphael varane|aurelien tchouameni|eduardo camavinga|william saliba|dayot upamecano|jules kounde|karim benzema|zinedine zidane|patrick vieira|claude makelele|franck ribery|marcus thuram|randal kolo muani|michael olise|desire doue|bradley barcola|robert lewandowski|wojciech szczesny|joshua kimmich|leon goretzka|jamal musiala|florian wirtz|kai havertz|leroy sane|serge gnabry|antonio rudiger|ilkay gundogan|marc andre ter stegen|mario gotze|miroslav klose|michael ballack|bastian schweinsteiger|philipp lahm|mats hummels|pedri|gavi|rodri|alvaro morata|dani olmo|ferran torres|mikel oyarzabal|unai simon|dani carvajal|carles puyol|andres iniesta|iker casillas|david villa|fernando torres|sergio busquets|jordi alba|cesc fabregas|david silva|isco alarcon|marco asensio|raul gonzalez|luis suarez|edinson cavani|darwin nunez|ronald araujo|jose gimenez|diego godin|rodrigo bentancur|angel di maria|paulo dybala|rodrigo de paul|enzo fernandez|alexis mac allister|sergio aguero|gonzalo higuain|carlos tevez|javier mascherano|gabriel batistuta|juan roman riquelme|neymar junior|rodrygo goes|raphinha|casemiro|marquinhos|alisson becker|ederson moraes|gabriel jesus|gabriel martinelli|gabriel magalhaes|richarlison|bruno guimaraes|lucas paqueta|thiago silva|dani alves|ronaldinho gaucho|ricardo kaka|endrick felipe|bruno fernandes|bernardo silva|joao felix|ruben dias|joao cancelo|diogo jota|joao neves|vitinha|nuno mendes|pepe|rui costa|ricardo quaresma|gianluigi buffon|gianluigi donnarumma|francesco totti|alessandro del piero|andrea pirlo|paolo maldini|fabio cannavaro|roberto baggio|giorgio chiellini|leonardo bonucci|federico chiesa|nicolo barella|sandro tonali|lorenzo insigne|ciro immobile|marco verratti|jorginho|gianluca scamacca|mateo retegui|virgil van dijk|frenkie de jong|matthijs de ligt|memphis depay|cody gakpo|xavi simons|denzel dumfries|nathan ake|arjen robben|robin van persie|wesley sneijder|johan cruyff|ruud gullit|marco van basten|dennis bergkamp|clarence seedorf|edwin van der sar|patrick kluivert|son heung min|heungmin son|kim min jae|lee kang in|hwang hee chan|park ji sung|kaoru mitoma|wataru endo|takumi minamino|daichi kamada|takehiro tomiyasu|ritsu doan|shinji kagawa|keisuke honda|hidetoshi nakata|wu lei|sunil chhetri|arda guler|hakan calhanoglu|kenan yildiz|ferdi kadioglu|burak yilmaz|arda turan|jonathan david|weston mckennie|tyler adams|gio reyna|timothy weah|folarin balogun|landon donovan|clint dempsey|tim howard|hirving lozano|raul jimenez|edson alvarez|guillermo ochoa|santiago gimenez|javier hernandez|james rodriguez|luis diaz|radamel falcao|juan cuadrado|jhon duran|moises caicedo|enner valencia|piero hincapie|alexis sanchez|arturo vidal|claudio bravo|khvicha kvaratskhelia|ivan rakitic|mateo kovacic|josko gvardiol|dominik livakovic|zlatan ibrahimovic|alexander isak|viktor gyokeres|dejan kulusevski|martin odegaard|christian eriksen|kasper schmeichel|peter schmeichel|rasmus hojlund|aaron ramsey|eden hazard|thibaut courtois|romelu lukaku|jeremy doku|leandro trossard|youri tielemans|dusan vlahovic|aleksandar mitrovic|victor wanyama|dennis oliech|mbwana samatta|roger milla|emmanuel adebayor|frederic kanoute|seydou keita|abdul rahman baba|inaki williams|antoine semenyo|tariq lamptey|mohammed salisu|daniel amartey|kamaldeen sulemana|ernest nuamah|joseph paintsil|fatawu issahaku|jeremie frimpong|christopher wreh|diego maradona'.split('|'));
const normName = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const nameProblem = (n) => { const raw = String(n || '').normalize('NFC').replace(/\s+/g, ' ').trim();
  if (raw.length < 2 || raw.length > 24) return 'Use 2 to 24 letters';
  if (!/^[\p{L}][\p{L}\p{M} .'\u2019\-]*$/u.test(raw)) return 'Use letters only (spaces, - . and ’ are fine)';
  const flat = normName(raw).replace(/[^a-z]/g, ''), leet = normName(raw).replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's').replace(/[^a-z]/g, '');
  const words = normName(raw).replace(/[^a-z ]/g, ' ').split(' ').filter(Boolean), lw = normName(raw).replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's').replace(/[^a-z ]/g, ' ').split(' ').filter(Boolean);
  if (words.concat(lw).some(w => BAD_W.includes(w) || BAD_IN.some(b => w.includes(b))) || BAD_ALL.some(w => flat.includes(w) || leet.includes(w))) return 'Please choose a different name';
  const sp = words.join(' ');
  if (FAMOUS.some(f => f.includes(' ') ? (' ' + sp + ' ').includes(' ' + f + ' ') || flat === f.replace(/ /g, '') : words.includes(f.replace(/'/g, '')) || flat === f)) return 'Real footballers’ names can’t be used';
  return ''; };
const rnMap = (club, ids, S) => { const o = {}, R = (club && club.rn) || {}; for (const id of (ids || []).slice(0, 18)) { const g = gidOf(id, S), r = R[g]; if (r && r.n) o[g] = { n: String(r.n).slice(0, 24), c: String(r.c || '').slice(0, 4) }; } return o; };
const cleanPName = (n) => String(n || '').normalize('NFC').replace(/\s+/g, ' ').trim().slice(0, 24);

/* ===================== 🌍 G6 · zones, climate + weather, touchline managers, balls ===================== */
/* climate: 0 temperate north, 1 temperate south, 2 tropical, 3 dry/desert, 4 cold north (phone picks it from its time zone name) */
const CLIM_NAME = ['Temperate', 'Temperate (south)', 'Tropical', 'Dry', 'Cold'];
const climOk = (c) => { c = Math.floor(Number(c)); return c >= 0 && c <= 4 ? c : 0; };
const CLIM_AI = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 4, 4, 4, 2, 2, 2], [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 4, 4, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2]];
const aiClim = (ci) => CLIM_AI[aiZone(ci)][hash('clim:' + ci) % 20];
const climFromTz = (tz) => { tz = String(tz || '');
  if (/^(Australia\/|Pacific\/(Auckland|Chatham)|Antarctica|Atlantic\/(Stanley|South_Georgia)|America\/(Argentina|Santiago|Montevideo|Punta_Arenas|Asuncion|Sao_Paulo)|Africa\/(Johannesburg|Maseru|Mbabane|Windhoek|Gaborone))/.test(tz)) return 1;
  if (/^(Asia\/(Dubai|Riyadh|Qatar|Kuwait|Bahrain|Muscat|Aden|Baghdad|Karachi|Tehran|Kabul|Ashgabat)|Africa\/(Cairo|Tripoli|Khartoum|Algiers|Tunis|Casablanca|El_Aaiun|Nouakchott|Niamey|Ndjamena|Bamako)|America\/(Phoenix|Hermosillo))/.test(tz)) return 3;
  if (/^(Europe\/(Moscow|Helsinki|Stockholm|Oslo|Tallinn|Riga|Vilnius|Kirov|Samara|Volgograd)|Atlantic\/Reykjavik|Asia\/(Novosibirsk|Yekaterinburg|Omsk|Krasnoyarsk|Irkutsk|Yakutsk|Vladivostok|Magadan|Almaty|Astana|Ulaanbaatar)|America\/(Anchorage|Edmonton|Winnipeg|Regina|Montreal|Juneau|Nome))/.test(tz)) return 4;
  if (/^(Africa\/|Indian\/|Asia\/(Singapore|Jakarta|Makassar|Jayapura|Manila|Kolkata|Calcutta|Dhaka|Colombo|Bangkok|Ho_Chi_Minh|Saigon|Kuala_Lumpur|Yangon|Rangoon|Phnom_Penh|Vientiane|Brunei|Dili)|America\/(Bogota|Caracas|Lima|Guayaquil|Panama|Jamaica|Santo_Domingo|Port_of_Spain|Port-au-Prince|Havana|Puerto_Rico|Barbados|Martinique|Guadeloupe|Belize|Guatemala|Tegucigalpa|Managua|El_Salvador|Costa_Rica|Cancun|Merida|Bahia|Belem|Fortaleza|Manaus|Recife|Maceio|Cuiaba|Porto_Velho|Rio_Branco|La_Paz|Paramaribo|Cayenne|Guyana)|Pacific\/(Fiji|Port_Moresby|Guadalcanal|Noumea|Tahiti|Apia|Tongatapu|Honolulu))/.test(tz)) return 2;
  return 0; };
/* 🌦️ weather of one match: same on every phone (match id + home climate + month of the kick-off).
   k: clear · cloudy · rain · storm (heavy rain) · fog · snow.  t = temperature (°C), w = wind (m/s), dx/dy = wind direction on the pitch. */
const WX_KINDS = ['clear', 'cloudy', 'rain', 'storm', 'fog', 'snow'];
const WX_NAME = { clear: '☀️ Clear', cloudy: '☁️ Cloudy', rain: '🌧️ Rain', storm: '⛈️ Heavy rain', fog: '🌫️ Fog', snow: '❄️ Snow' };
const WIND_DIR = [[1, 0], [0.7071, 0.7071], [0, 1], [-0.7071, 0.7071], [-1, 0], [-0.7071, -0.7071], [0, -1], [0.7071, -0.7071]];
/* season by climate: 0 winter, 1 spring/autumn, 2 summer; tropics: 3 wet, 4 dry */
const seasonOf = (cz, ko) => { const m = new Date(Number(ko) || 0).getUTCMonth();
  if (cz === 2) return (m >= 4 && m <= 9) ? 3 : 4;
  const n = (m === 11 || m <= 1) ? 0 : (m >= 5 && m <= 7) ? 2 : 1; return cz === 1 ? (n === 0 ? 2 : n === 2 ? 0 : 1) : n; };
/* odds (out of 100) for clear, cloudy, rain, storm, fog, snow + temperature base and spread */
const WX_ODDS = {
  0: [[24, 26, 22, 7, 9, 12, 4, 8], [32, 30, 24, 6, 8, 0, 14, 9], [56, 22, 13, 8, 1, 0, 24, 8]],
  1: [[30, 30, 26, 7, 7, 0, 10, 7], [36, 30, 24, 5, 5, 0, 16, 8], [58, 22, 12, 8, 0, 0, 25, 8]],
  3: [[70, 18, 7, 2, 3, 0, 18, 8], [76, 14, 6, 2, 2, 0, 27, 8], [84, 10, 3, 3, 0, 0, 37, 6]],
  4: [[16, 22, 8, 4, 10, 40, -6, 8], [30, 32, 22, 6, 6, 4, 8, 9], [50, 26, 16, 7, 1, 0, 20, 7]],
  2: { 3: [26, 22, 26, 22, 4, 0, 28, 5], 4: [56, 26, 11, 4, 3, 0, 30, 5] } };
const wxOf = (key, cz, ko) => { cz = climOk(cz); const sn = seasonOf(cz, ko), O = cz === 2 ? WX_ODDS[2][sn] : WX_ODDS[cz][sn], r = rng(hash('wx:' + key));
  let x = r() * 100, k = 0; for (; k < 5; k++) { x -= O[k]; if (x < 0) break; }
  let kind = WX_KINDS[k]; const t = Math.round(O[6] + (r() * 2 - 1) * O[7]);
  if (kind === 'snow' && t > 3) kind = 'rain'; const temp = kind === 'snow' ? Math.min(t, 1) : kind === 'storm' || kind === 'rain' ? Math.min(t, 26) : t;
  const wind = Math.round((r() * r() * 14 + (kind === 'storm' ? 6 : 0)) * 10) / 10, d = WIND_DIR[Math.floor(r() * 8)];
  return { k: kind, t: temp, w: wind, dx: d[0], dy: d[1], cz, sn }; };
/* how the weather changes play (engine 4): all plain numbers */
const wxFx = (W) => { W = W || {}; const k = W.k, wet = k === 'rain' ? 1 : k === 'storm' ? 2 : 0, snow = k === 'snow' ? 1 : 0, heat = W.t >= 30 ? (W.t >= 35 ? 2 : 1) : 0, wind = W.w >= 7 ? (W.w - 6) / 8 : 0;
  return { wet, snow, heat, wind: wind > 1 ? 1 : wind,
    pass: 1 - 0.035 * wet - 0.03 * snow,
    touch: 1 - 0.05 * wet - 0.04 * snow,
    speed: 1 - 0.015 * wet - 0.06 * snow - 0.015 * heat,
    skid: 1 + 0.12 * wet - 0.25 * snow,
    slip: 0.0016 * wet + 0.0012 * snow,
    foul: 1 + 0.12 * wet + 0.08 * snow,
    tire: 1 + 0.18 * heat,
    drain: 1 + 0.12 * heat }; };
const wxLabel = (W) => W ? (WX_NAME[W.k] || '') + ' · ' + W.t + '°C' + (W.w >= 7 ? ' · 💨 windy' : '') : '';
/* 🧥 touchline manager look (designer): first design free, then 2 🪙 GG Coins */
const MGR_LIMITS = { sk: 8, hr: 12, hc: 8, bd: 5, gl: 3, fit: 4, col: COLORS.length, bu: 3, ag: 3 };
const MGR_FIT = ['Suit', 'Tracksuit', 'Long coat', 'Polo + trousers'];
const mgrOf = (ci) => { const r = rng(hash('mgr:' + ci)), o = {}; for (const k in MGR_LIMITS) o[k] = Math.floor(r() * MGR_LIMITS[k]); o.col = [10, 17, 8, 11, 0, 1, 23][Math.floor(r() * 7)]; return o; };
const cleanMgr = (m) => { m = m || {}; const o = {}; for (const k in MGR_LIMITS) { const v = Math.floor(Number(m[k])); o[k] = v >= 0 && v < MGR_LIMITS[k] ? v : 0; } return o; };
TOK.mgr = 2;
/* ⚽ tournament balls (looks only): new designs every season */
const ballOf = (kind, S, fin) => ({ kind: fin ? 'final' : kind, d: hash('ball:' + kind + ':' + S) % 4 });
/* G6: league + cup kick-off times are listed per GMT day in w11kt/{day} (the lock reads only that small doc) */
const ktDay = (t) => Math.floor(Number(t) / DAY);

return { ZONES, ZONE_NAME, ZONE_FLAG, ZONE_OF, cleanOf, zoneOf, NG, X6, zoneOfG, extraG, groupNo, aiZone, fairKo, cupId, cupOfs, CLIM_NAME, climOk, aiClim, climFromTz, WX_KINDS, WX_NAME, seasonOf, wxOf, wxFx, wxLabel, MGR_LIMITS, MGR_FIT, mgrOf, cleanMgr, ballOf, ktDay,  rnMap, DPOS, DLINE, DPOS_NAME, dpOf, canLearn, LEARN_MAX, LEARN_FAST, LEARN_FAST_DAYS, learnDays, gidOf, knownPos, learnedMap, posFit, COUNTRIES, nameProblem, cleanPName, normName, FAMOUS, EPOCH0, ENGINE, setEpoch, epoch, OC_FIRST, CL_FIRST, cupOn, CUP_TIMES, cupKoAt, TOK, COLORS, SHAPES, SYMS, PATS, BANDS, cleanKit, cleanCrest, STAFF, PHYSIO_REC, SCOUT_N, hasStaff, STD_SEATS, STD_TICKET, STD_COST, stdLv, SP_KINDS, spOffers, spOf, matchExtra, OC_DAYS, CL_DAYS, CL_GR, CUP_GAP, CUP_FIRST, OC_WIN, CL_WIN, CL_DRAW, CUP_PRIZE, CUP_NAME, cupDays, cupDay, cupKo, cupAiKo, cupMid, isCupDay, isKO, seat, cupUser, roundName, pens, cupScore, cupWin, winSide, cupStr, cupResStr, cupCoins, clTable, cupPairs, cupQuick, cupKoOf, ocBracket, clGroups, r500, NEW_RE, isNew, POS15, LEGEND_OVR, MAX_SQUAD, MIN_SQUAD, PLAYABLE, PIONEERS, nplayer, oplayer, value, releaseValue, youthIds, legendId, MK_N, MK_LEN, MK_LEN2, MK_T2, mkLen, MK_EXT, MK_AI, lotT0, lotPid, stepOf, lotInfo, lotEff, lotCur, absDay, REC, DRAIN, AI_COND, TR_MAX, PACK_FIT, condNow, FORM_NAMES, FP_X, FP_Y, FP_N, fpSpot, fpOk, fpClean, fpForm, sheetOf, aiSheet, ENGINE_TICKS, parseRes, RES_RE, WORLD, hash, rng, pick, clamp, CULT, POS_TEMPLATE, club, base, youth, player, squadIds, avg, DAY, EPOCH, SDAYS, MDS, SLOTS, AI_HOUR, MATCH_MS, clock, dayStart, ko, aiKo, TIER_START, groupsIn, gkey, initClubs, pairs, mid, quick, seatClub, isUserAt, strength, result, table, UP, DOWN, parentOf, childrenOf, nextClubs, winCoins, drawCoins, prize, PROMO_BONUS };
})();

const { WORLD, hash, rng, pick, clamp } = W11C;
const db = () => window.db;
const esc = (s) => window.escapeHTML ? window.escapeHTML(String(s == null ? '' : s)) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const toast = (t) => window.showToast ? window.showToast(t) : console.log(t);
const fmt = (n) => Number(n || 0).toLocaleString();

// ---------- 🧑 players & clubs come from their IDs (shared core; 1 season = 1 year) ----------
try { const e = +localStorage.getItem('w11_ep'); if (e) W11C.setEpoch(e); } catch (e) {}
W.C = W11C; W.S = W11C.clock(Date.now()).s;
W.club = W11C.club;
W.player = (id, S) => { const p = W11C.player(id, S || W.S), o = p && W.RNM[p.gid || p.id]; return o ? Object.assign({}, p, { name: o.n, short: W.shortOf(o.n), flag: W.flagOf(o.c) || p.flag, renamed: 1 }) : p; };
/* G4c: renamed players (own club, team sheets, opponents) · flags from country codes */
W.RNM = {};
W.addRN = (rn) => { if (rn && typeof rn === 'object') for (const g in rn) if (rn[g] && rn[g].n) W.RNM[g] = rn[g]; return rn || {}; };
W.shortOf = (n) => { const w = String(n || '').trim().split(/\s+/), l = w[w.length - 1] || ''; return l.length > 11 ? l.slice(0, 10) + '.' : l; };
W.flagOf = (c) => { c = String(c || '').toUpperCase(); if (c === 'EN') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}'; if (c === 'SC2') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}'; if (c === 'WA') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}'; if (c === 'NIR') return '\u{1F1EC}\u{1F1E7}';
  if (!/^[A-Z]{2}$/.test(c)) return ''; return String.fromCodePoint(...[...c].map(ch => 0x1F1E6 + ch.charCodeAt(0) - 65)); };
W.lpOf = (club) => { try { return club && club.ids ? W11C.learnedMap(club, club.ids, W.S, W.nowS ? W.nowS() : Date.now()) : {}; } catch (e) { return {}; } };
W.squadIds = W11C.squadIds;
W.avg = (ids, S) => W11C.avg(ids, S || W.S);
const hyp = (a, b) => Math.sqrt(a * a + b * b), sq = (a) => a * a;

// ---------- 📐 15 formations ----------
W.FORMS = { '4-4-2': [4, 4, 2], '4-3-3': [4, 3, 3], '4-2-3-1': [4, 2, 3, 1], '4-1-4-1': [4, 1, 4, 1], '4-4-1-1': [4, 4, 1, 1], '4-3-2-1': [4, 3, 2, 1], '4-5-1': [4, 5, 1], '4-1-2-1-2': [4, 1, 2, 1, 2], '4-2-4': [4, 2, 4], '3-5-2': [3, 5, 2], '3-4-3': [3, 4, 3], '3-4-2-1': [3, 4, 2, 1], '3-3-3-1': [3, 3, 3, 1], '5-3-2': [5, 3, 2], '5-4-1': [5, 4, 1] };
W.shape = function (form, fp) {
  /* G13: free positions (club.fp) put every outfield player on his own spot of the 35-spot board */
  if (fp && W11C.fpOk(fp)) return [{ x: 4, y: 34, role: 'GK', dp: 'GK' }].concat(fp.map(k => { const q = W11C.fpSpot(Number(k)); return { x: q.x, y: q.y, role: q.role, dp: q.dp, k: Number(k) }; }));
  const L = W.FORMS[form] || W.FORMS['4-4-2'], out = [{ x: 4, y: 34, role: 'GK', dp: 'GK' }], n = L.length, x0 = 17, x1 = n >= 4 ? 47 : 44;
  L.forEach((k, li) => { const x = n === 1 ? 30 : x0 + (x1 - x0) * li / (n - 1), role = li === 0 ? 'DEF' : li === n - 1 ? 'FWD' : 'MID';
    /* G4c: the exact spot of every slot (DL DC DR · ML MC MR · AML AMC AMR · ST) */
    const am = role === 'MID' && n >= 4 && li === n - 2;
    for (let i = 0; i < k; i++) { const y = 8 + 52 * (i + 1) / (k + 1), side = y < 34 - 12 ? 'L' : y > 34 + 12 ? 'R' : 'C';
      const dp = role === 'DEF' ? (k <= 3 || side === 'C' ? 'DC' : 'D' + side) : role === 'FWD' ? (k >= 3 && side !== 'C' ? 'AM' + side : 'ST') : am ? (k >= 3 && side !== 'C' ? 'AM' + side : 'AMC') : (k <= 3 || side === 'C' ? 'MC' : 'M' + side);
      out.push({ x, y, role, dp }); } });
  out[0].dp = 'GK';
  return out;
};

// ---------- ⚙️ match engine v2 (G5: full rules, set pieces, player styles; fixed 20 steps per second, same seed = same match) ----------
const DT = 0.05, HALF = 105, BREAK = 30, LEN = HALF * 2, TOTAL = HALF * 2 + BREAK;
W.TIMING = { HALF, BREAK, LEN, TOTAL };
W.ENGINE = 10;
/* G8 (engine 5): 🧭 mentality (-2 hard defending … +2 hard attacking) and 🤝 teamplay points (attack, defence, possession, condition; 0–10 each, 20 in total, 5 each = neutral) */
W.MEN = [['-2', '🛡️ Hard defending'], ['-1', '🧱 Defensive'], ['0', '⚖️ Normal'], ['1', '⚔️ Attacking'], ['2', '🔥 Hard attacking']];
W.TP_KEYS = ['att', 'def', 'pos', 'con']; W.TP_MAX = 10; W.TP_SUM = 20;
W.tpOk = (v) => Array.isArray(v) && v.length === 4 && v.every(x => Number.isInteger(x) && x >= 0 && x <= 10) && v.reduce((a, b) => a + b, 0) <= 20;
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
/* ---------- ONE player style ---------- */
W.STYLE1 = {
  poacher: ['🦊', 'Box poacher', 'Lives in the box and finishes chances from close range.', '#fb7185'],
  screamer: ['💥', 'Long-range screamer', 'Shoots from far out with real power.', '#f59e0b'],
  curler: ['🌀', 'Finesse curler', 'Curls shots and free kicks into the corners.', '#a78bfa'],
  dribbler: ['🪄', 'Dribbler', 'Beats defenders one-on-one with close control.', '#22d3ee'],
  maestro: ['🎩', 'Playmaker', 'Short, sharp passes that keep the ball moving.', '#34d399'],
  longball: ['🎯', 'Long passer', 'Switches play and finds runners with long balls.', '#2dd4bf'],
  speed: ['⚡', 'Speedster', 'Explosive pace. Runs in behind the defence.', '#fde047'],
  engine: ['🔋', 'Box-to-box engine', 'Never stops running. Helps in attack and defence.', '#4ade80'],
  wall: ['🧱', 'Wall', 'Wins tackles and blocks shots.', '#60a5fa'],
  aerial: ['🦅', 'Aerial threat', 'Wins headers in both boxes.', '#c084fc'],
  stopper: ['🧤', 'Shot stopper', 'Lightning reflexes on his line.', '#facc15'],
  sweeper: ['🧹', 'Sweeper keeper', 'Comes off his line and starts attacks with his feet.', '#fbbf24']
};
W.oneStyle = function (p) {
  if (!p) return 'engine'; if (p._s1) return p._s1;
  const st = W.styleOf(p), pos = p.pos; let k;
  if (pos === 'GK') k = st.pass === 'short' || (p.pas || 0) >= (p.gk || 0) - 6 ? 'sweeper' : 'stopper';
  else { const F = pos === 'FWD', M = pos === 'MID', D = pos === 'DEF';
    const dp = W11C.dpOf(p), FB = dp === 'DL' || dp === 'DR', WG = /^(AM|M)[LR]$/.test(dp);
    const sc = { poacher: p.sho + (F ? 6 : -10) + (st.shot === 'poacher' ? 7 : 0), screamer: p.sho - 2 + (M ? 3 : 0) + (st.shot === 'screamer' ? 7 : 0), curler: (p.sho + p.dri) / 2 + (st.shot === 'curler' ? 7 : 0),
      dribbler: p.dri + (D ? -10 : 0) + (st.shot === 'dribbler' ? 9 : 0), maestro: p.pas + (M ? 4 : -5) + (st.pass !== 'long' ? 4 : 0), longball: p.pas - 2 + (D ? 3 : 0) + (st.pass === 'long' ? 6 : 0),
      speed: p.pac - 1 + (st.pace === 'burst' ? 7 : 0) + (FB || WG ? 5 : 0), engine: (p.pac + p.def + p.pas) / 3 + (M ? 4 : FB ? 3 : -6) + (st.pace === 'engine' ? 7 : 0), wall: p.def + (D ? (FB ? 0 : 8) : -12), aerial: st.head - 5 + (D || F ? 2 : -6) };
    k = Object.keys(sc).reduce((a, b) => sc[b] > sc[a] ? b : a, 'engine'); }
  try { Object.defineProperty(p, '_s1', { value: k, enumerable: false }); } catch (e) {}
  return k;
};

/* G13 · engine 6: ONE style per player drives his play. The old style mix (shot/pass/pace) now comes only from that one style,
   so a 🦊 poacher finishes in the box, a 🎩 playmaker strings short passes, a 🧱 wall wins tackles, a 🧤 shot stopper saves more … */
W.style6 = function (p) {
  if (!p) return {}; if (p._st6) return p._st6;
  const b = W.styleOf(p), s1 = W.oneStyle(p);
  const st = Object.assign({}, b, { s1, shot: ['poacher', 'screamer', 'curler', 'dribbler'].includes(s1) ? s1 : '', pass: s1 === 'maestro' ? 'tempo' : s1 === 'longball' ? 'long' : 'mixed', pace: s1 === 'speed' ? 'burst' : s1 === 'engine' ? 'engine' : 'steady', head: s1 === 'aerial' ? Math.min(99, b.head + 12) : b.head });
  try { Object.defineProperty(p, '_st6', { value: st, enumerable: false }); } catch (e) {}
  return st;
};
/* G4c: how well a player fits a spot (1 = his own or a learned spot) */
W.fitOf = function (p, slot, lp) { const have = [W11C.dpOf(p)].concat((lp && lp[p.id]) || []); return W11C.posFit(have, slot); };
/* best order of the 11 starters for a formation (keeper stays first); used by computer clubs and the "Best fit" button */
W.bestFit = function (ids, form, S, lp, fp) {
  const sh = W.shape(form, fp), xi = ids.slice(0, 11), P = xi.map(id => W.player(id, S)), out = xi.slice(), used = new Set([0]);
  const gk = P.findIndex(p => p && p.pos === 'GK'); if (gk > 0) { out[0] = xi[gk]; used.clear(); used.add(gk); } else used.add(0);
  const order = sh.map((s, i) => i).slice(1).sort((a, b) => (sh[a].dp === 'ST' ? 0 : 1) - (sh[b].dp === 'ST' ? 0 : 1));
  for (const si of order) { let best = -1, bs = -1; for (let j = 0; j < 11; j++) { if (used.has(j)) continue; const sc = W.fitOf(P[j], sh[si].dp, lp) * 100 + (P[j].ovr || 0) * 0.01; if (sc > bs) { bs = sc; best = j; } } if (best >= 0) { used.add(best); out[si] = xi[best]; } }
  return out.concat(ids.slice(11));
};
function Team(side, info) {
  this.side = side; this.name = info.name; this.short = info.short; this.color = info.color; this.gkColor = info.gkColor;
  this.form = info.form || '4-4-2'; this.fp = W11C.fpOk(info.fp) ? info.fp.map(Number) : null; this.ids = info.ids.slice(0, 18); this.subsLeft = 5; this.mods = { attack: 0, tight: 0, press: 0, calm: 0 }; this.men = 0; this.tp = [5, 5, 5, 5];
  this.score = 0; this.shots = 0; this.onT = 0; this.passes = 0; this.poss = 0; this.cards = 0; this.corners = 0; this.offs = 0; this.fouls = 0;
  /* G2: fitness (0–100 per player), training points, who can't play, manager present or not · G5: set-piece takers */
  this.ai = info.ai; this.cond = info.cond || {}; this.tr = info.tr || {}; this.out = new Set(info.out || []); this.tk = info.tk || {};
  /* G4c: learned positions ({id: [pos]}); computer clubs line up their starters in their best spots */
  this.lp = info.lp || {}; if (info.auto) this.ids = W.bestFit(this.ids, this.form, info.S || W.S, this.lp, this.fp);
  this.off = new Set(); this.used = new Set(); this.subLog = []; this.cardLog = [];
}
function Match(home, away, seed) {
  this.S = home.S || W.S; this.league = !!home.league;
  this.r = rng(seed); this.seed = seed; this.t = 0; this.tick = 0; this.pSide = -1; this.gainT = -9; this.ev = []; this.over = false; this.pauseT = 0;
  this.T = [new Team(0, home), new Team(1, away)]; this.P = []; this.ball = { x: 52.5, y: 34, h: 0, owner: null, fl: null, px: 52.5, py: 34 };
  this.lastAlert = 0; this.cmds = []; this.sp = null; this.pend = []; this.stops = [0, 0]; this.added = [0, 0]; this.hug = -1; this.ln = [105, 0];
  this.ref = { x: 45, y: 30 };
  /* G6 (engine 4): weather changes play (same numbers on every phone): rain/snow slips + skids, wind on long balls, heat tires */
  this.wx = home.wx || null; this.fx = W11C.wxFx(this.wx);
  this.T.forEach(t => this.layTeam(t));
  this.kickoff(0, true);
}
Match.prototype.dir = function (side) { return side === 0 ? 1 : -1; };
Match.prototype.goalX = function (side) { return side === 0 ? 105 : 0; };
Match.prototype.layTeam = function (t) {
  const sh = W.shape(t.form, t.fp), old = this.P.filter(p => p.side === t.side);
  this.P = this.P.filter(p => p.side !== t.side);
  const tr = t.tr, at = Number(tr.att) || 0, df = Number(tr.def) || 0, ft = Number(tr.fit) || 0, ta = (t.tp[0] - 5) * 1.1, td = (t.tp[1] - 5) * 1.1, tq = (t.tp[2] - 5) * 0.9, tc = (t.tp[3] - 5) * 0.7;
  t.ids.slice(0, 11).forEach((id, i) => {
    if (t.off.has(id)) return;
    const p0 = W.player(id, this.S), c = t.cond[id] == null ? 100 : clamp(Number(t.cond[id]) || 0, 0, 100), k = 0.8 + 0.2 * c / 100;
    const s = sh[i] || sh[sh.length - 1], f = W.fitOf(p0, i === 0 ? 'GK' : s.dp, t.lp), kf = k * f;
    const pl = { ...p0, pac: (p0.pac + 0.4 * ft + tc) * kf, sho: (p0.sho + 0.4 * at + ta) * kf, dri: (p0.dri + 0.4 * at + ta) * kf, pas: (p0.pas + tq) * kf, def: (p0.def + 0.4 * df + td) * kf, gk: (p0.gk + (p0.pos === 'GK' ? 0.4 * df + td * 0.6 : 0)) * kf, cond: c, fit: f };
    const prev = old.find(o => o.id === id), st = W.style6(p0);
    const bx = t.side === 0 ? s.x : 105 - s.x;
    this.P.push({ ...pl, st, s1: st.s1, side: t.side, role: i === 0 ? 'GK' : s.role, bx, by: t.side === 0 ? s.y : 68 - s.y, x: prev ? prev.x : bx, y: prev ? prev.y : (t.side === 0 ? s.y : 68 - s.y), px: 0, py: 0, vx: prev ? prev.vx : 0, vy: prev ? prev.vy : 0, cd: 0, ycard: prev ? prev.ycard : 0, ofs: -0.8, ofT: 0, wind: null, rcv: 0, bux: null, buy: null, beat: 0, dribT: 0, hnd: 0, run: 0 }); /* G15: every field exists from the start (same object shape = fast). G16: hnd = keeper holding the ball in his hands (s), run = run in behind (s) */
  });
};
/* kick-off: instant at the start and after half time, otherwise the players walk back first */
Match.prototype.kickoff = function (side, first) {
  if (first) { this.P.forEach(p => { p.x = p.side === 0 ? Math.min(p.bx, 49) : Math.max(p.bx, 56); p.y = p.by; p.dribT = 0; p.vx = p.vy = 0; p.px = p.x; p.py = p.y; });
    const tk = this.koTaker(side); tk.x = 52.5 - this.dir(side) * 0.8; tk.y = 34; this.give(tk); this.ball.x = 52.5; this.ball.y = 34; this.ball.fl = null; this.dec = 0.6; return; }
  this.restart('ko', side, 52.5, 34);
};
Match.prototype.koTaker = function (side) { return this.P.filter(p => p.side === side && p.role !== 'GK').sort((a, b) => Math.abs(a.x - 52.5) + Math.abs(a.y - 34) - (Math.abs(b.x - 52.5) + Math.abs(b.y - 34)))[0]; };
Match.prototype.give = function (p) { if (!p) return; p.wind = null; p.hnd = 0; if (p.side !== this.pSide) { this.pSide = p.side; this.gainT = this.t; } /* G17: when possession changed (transitions) */ p.bux = null; p.rcv = p.role === 'GK' || this.sp ? 0 : 0.28; this.ball.owner = p; this.ball.fl = null; this.poss = p.side; p.cd = 0.55; this.dec = 0.3 + this.r() * 0.5; };
Match.prototype.say = function (k, txt, side, pid, x) { const e = { t: this.t, k, txt, side, min: this.minute(), pid }; if (x) Object.assign(e, x); this.ev.push(e); return e; };
/* the clock: 45 minutes per half, then added time (the last 8% of each half), announced like on TV */
Match.prototype.minute = function () { const h = this.t >= HALF ? 1 : 0, th = this.t - h * HALF, base = h * 45; return Math.min(base + 45, base + Math.floor(th / (HALF * 0.92) * 45) + 1); };
Match.prototype.minLabel = function () { const h = this.t >= HALF ? 1 : 0, th = this.t - h * HALF, base = h * 45, n = 45 * 0.92;
  if (th < HALF * 0.92) return (base + Math.floor(th / (HALF * 0.92) * 45) + 1) + "'"; const a = this.added[h] || 1; return (base + 45) + '+' + Math.min(a, Math.floor((th - HALF * 0.92) / (HALF * 0.08) * a) + 1) + "'"; };
W.minLabel = (m) => m && m.minLabel ? m.minLabel() : (m ? m.minute() + "'" : '');
Match.prototype.cmd = function (side, c) { this.cmds.push({ tick: this.tick, side, c }); this.applyCmd(side, c); };
Match.prototype.applyCmd = function (side, c) {
  /* G13: a league order must have reached the server at least 8 steps (wall clock, broadcast pauses included) before its tick */
  if (c && c._w != null && !(c._w <= this.wallAt(Math.max(0, this.tick - 8)))) return;
  const t = this.T[side];
  if (c.here) t.ai = false;
  if (c.shout) { t.mods = { attack: 0, tight: 0, press: 0, calm: 0 }; if (c.shout !== 'none') t.mods[c.shout] = 1; this.say('shout', { attack: '📣 ALL OUT ATTACK!', tight: '🧱 KEEP IT TIGHT!', press: '⚡ PRESS HIGH!', calm: '🧘 CALM DOWN, KEEP THE BALL!' }[c.shout] || '', side); }
  if (c.men != null) { const v = Number(c.men); if (Number.isInteger(v) && v >= -2 && v <= 2 && v !== t.men) { t.men = v; this.say('men', '🧭 ' + t.short + ': ' + W.MEN[v + 2][1].replace(/^\S+ /, '').toUpperCase(), side); } }
  if (c.tp != null && W.tpOk(c.tp) && c.tp.join() !== t.tp.join()) { t.tp = c.tp.slice(); this.layTeam(t); this.say('tp', '🤝 ' + t.short + ' teamplay: ' + W.TP_KEYS.map((k, i) => k.toUpperCase() + ' ' + t.tp[i]).join(' · '), side); }
  if (c.fp != null && W11C.fpOk(c.fp) && (!t.fp || c.fp.join() !== t.fp.join())) { t.fp = c.fp.map(Number); this.layTeam(t); this.say('form', '📍 ' + t.short + ' move players to new spots (' + W11C.fpForm(t.fp) + ')', side); }
  if (c.form && W.FORMS[c.form]) { t.form = c.form; t.fp = null; this.layTeam(t); this.say('form', '📐 ' + t.short + ' switch to ' + c.form, side); }
  if (c.sub && t.subsLeft > 0) { const [o, n] = c.sub; const i = t.ids.indexOf(o), j = t.ids.indexOf(n); if (i >= 0 && i < 11 && j >= 11 && !t.off.has(o) && !t.used.has(n) && !t.out.has(n)) { t.used.add(o); t.subLog.push([o, n, this.tick]); const own = this.ball.owner && this.ball.owner.id === o, wasTk = this.sp && this.sp.taker && this.sp.taker.id === o; t.ids[i] = n; t.ids[j] = o; t.subsLeft--; this.layTeam(t); const np = this.P.find(p => p.id === n); if (own && np) this.give(np); if (wasTk && np) this.sp.taker = np; this.stops[this.t >= HALF ? 1 : 0]++; this.say('sub', `🔁 ${W.player(n).short} on for ${W.player(o).short}`, side); } }
};
Match.prototype.nearest = function (list, x, y) { let b = null, bd = 1e9; for (const p of list) { const d = sq(p.x - x) + sq(p.y - y); if (d < bd) { bd = d; b = p; } } return b; };
const inBoxOf = (gx, x, y) => Math.abs(gx - x) < BOX_X && Math.abs(y - 34) < BOX_Y;
Match.prototype.step = function () { this._step6(); this.bcScan(); };
Match.prototype._step6 = function () {
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
    const ke = f.kind === 'pass' && f.arc < 0.5 ? 1 - Math.pow(1 - k, 1.35) : k; /* G15: ground passes slow as they arrive */
    b.x = f.x0 + (f.x1 - f.x0) * ke; b.y = f.y0 + (f.y1 - f.y0) * ke + (f.curve || 0) * Math.sin(Math.PI * k); b.h = f.arc * 4 * k * (1 - k) + (f.h0 ? f.h0 * (1 - k) : 0);
    if (k >= 1) this.land();
  } else if (b.owner) {
    const o = b.owner, d = this.dir(o.side), vv = hyp(o.vx || 0, o.vy || 0); let ux = vv > 1.2 ? o.vx / vv : d, uy = vv > 1.2 ? o.vy / vv : 0;
    /* G15 ball control: the ball is dragged round with the player when he turns (no jumping to his new direction) */
    if (o.bux != null) { ux = o.bux + (ux - o.bux) * 0.2; uy = o.buy + (uy - o.buy) * 0.2; const un = hyp(ux, uy) || 1; ux /= un; uy /= un; } o.bux = ux; o.buy = uy; const tch = vv > 3.2 ? 0.65 + 0.75 * (0.5 + 0.5 * Math.sin(this.t * 12.6 + o.num)) : vv > 1.5 ? 0.6 : 0.5; b.x = o.x + ux * tch; b.y = o.y + uy * tch; b.h = 0; /* G15: touches ahead when running */
    if (o.hnd > 0) { b.x = o.x + d * 0.32; b.y = o.y; b.h = 1.05; } /* G16: in the keeper's hands */
    this.carrier(o);
  } else {
    const p = this.nearest(this.P, b.x, b.y); if (p && sq(p.x - b.x) + sq(p.y - b.y) < 1.7) { if (p.role === 'GK' && this.lastTouch !== p.side && inBoxOf(this.goalX(1 - p.side), p.x, p.y)) this.gkHands(p); else this.give(p); }
    if (b.x < -0.5 || b.x > 105.5 || b.y < -0.5 || b.y > 68.5) this.outOfPlay(this.lastTouch || 0);
  }
  this.moveAll('play');
};
/* offside lines: the second-last defender (or the ball, or halfway) */
Match.prototype.lines = function () {
  for (let s = 0; s < 2; s++) { const d = this.dir(s); let m1 = null, m2 = null, n = 0; /* the second-last opponent, found without sorting a new array every step */
    for (const p of this.P) { if (p.side === s) continue; n++; const v = d > 0 ? p.x : -p.x; if (m1 == null || v > m1) { m2 = m1; m1 = v; } else if (m2 == null || v > m2) m2 = v; }
    const sl = n > 1 ? (d > 0 ? m2 : -m2) : (d > 0 ? 105 : 0);
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
  const df = t.score - o.score, mn = df < 0 ? (m > 75 ? 2 : m > 55 ? 1 : 0) : df > 0 ? (m > 80 && df === 1 ? -2 : m > 65 ? -1 : 0) : 0; if (mn !== t.men) this.applyCmd(side, { men: mn });
};
Match.prototype.carrier = function (o) {
  const r = this.r, d = this.dir(o.side), gx = this.goalX(o.side), T = this.T[o.side], mods = T.mods, st = o.st || {};
  const opp = this.P.filter(p => p.side !== o.side), mates = this.P.filter(p => p.side === o.side && p !== o);
  /* G16 · engine 9: a keeper with the ball in his HANDS can't be tackled. He walks forward, looks, then throws / drop-kicks / places it */
  if (o.hnd > 0) { o.hnd += DT; if (o.wind) { const w = o.wind; w.t += DT; if (w.t < w.T) return; o.wind = null; this.gkRelease(o, w, mates, opp); return; }
    this.dec -= DT; if (this.dec > 0 && o.hnd < 5.5) return; this.gkDist(o, mates, opp); return; }
  /* duels: standing tackles, slide tackles, shoulder battles */
  const presser = this.nearest(opp, o.x, o.y), pd = presser ? hyp(presser.x - o.x, presser.y - o.y) : 99, fx = this.fx;
  if (fx.slip && o.role !== 'GK' && o.cd <= 0 && r() < fx.slip) { this.say('slip', `🫠 ${o.short} slips on the ${fx.snow ? 'snow' : 'wet grass'}`, o.side, o.id); this.ball.owner = null; this.ball.x = clamp(o.x + d * 1.4, 1, 104); this.ball.y = clamp(o.y + (r() - 0.5) * 2, 1, 67); o.cd = 0.9; return; }
  if (presser && pd < 1.6 && o.cd <= 0 && r() < 0.045 * (1 + this.T[presser.side].mods.press * 0.5) * (o.wind ? 0.12 + presser.def / 220 : 1)) {
    const behind = this.dir(presser.side) * (presser.x - o.x) > 0.3, slide = behind || r() < 0.22;
    const win = 0.34 + (presser.def - o.dri) / 160 + this.T[presser.side].mods.tight * 0.05 - this.T[presser.side].men * 0.035 - (st.shot === 'dribbler' ? 0.08 : 0) + (slide ? 0.06 : 0) + (presser.s1 === 'wall' ? 0.07 : 0) + (presser.s1 === 'engine' ? 0.025 : 0);
    if (r() < (slide ? 0.62 : 0.4) * fx.foul * (inBoxOf(this.goalX(o.side), o.x, o.y) ? 0.2 : 1)) { this.foul(presser, o, slide); return; }
    if (r() < win) { if (Math.abs(this.goalX(o.side) - o.x) < 30 && r() < 0.2) { this.say('tackle', `🦵 ${presser.short} pokes it out`, presser.side, presser.id, { sl: slide ? 1 : 0, on: o.id }); this.lastTouch = presser.side; this.ball.owner = null; const gl = Math.abs(this.goalX(o.side) - o.x) < 14 && r() < 0.6; if (gl) { this.T[o.side].corners++; return this.restart('corner', o.side, this.goalX(o.side), o.y < 34 ? 0 : 68); } return this.restart('throw', o.side, clamp(o.x, 1, 104), o.y < 34 ? 0 : 68); }
      this.say('tackle', `${slide ? '🛷 Slide tackle' : '🦵 Tackle'}: ${presser.short} wins it`, presser.side, presser.id, { sl: slide ? 1 : 0, on: o.id }); this.ball.owner = null; this.ball.x += (r() - 0.5) * 2; this.give(presser); return; }
    o.beat = this.t; if (st.shot === 'dribbler' && r() < 0.3) this.say('skill', `🌀 ${o.short} skips past ${presser.short}`, o.side, o.id, { on: presser.id });
    o.cd = 0.5;
  }
  if (o.rcv > 0) { o.rcv -= DT; return; } /* G15 first touch */
  /* G14 · engine 7: every pass / shot / cross has a wind-up (plant, face the target, back-swing); the ball leaves on the foot strike */
  if (o.wind) { const w = o.wind; w.t += DT; if (w.t < w.T) return; o.wind = null;
    if (w.k === 'shot') this.shoot(o, hyp(gx - o.x, 34 - o.y), { tech: w.tech });
    else if (w.k === 'cross') { if (!this.cross(o)) { const t2 = this.bestPass(o, mates, opp, false); if (t2) this.passTo(o, t2); } }
    else { const tg = w.to && this.P.includes(w.to) ? w.to : this.bestPass(o, mates, opp, w.safe); if (tg) this.passTo(o, tg); }
    return; }
  this.dec -= DT; if (this.dec > 0) return;
  this.dec = (0.3 + r() * 0.7) * (1 + mods.calm * 0.35) * (1 - mods.attack * 0.2) * (st.pass === 'tempo' ? 0.8 : 1) * (1 - T.men * 0.05) * (1 - (T.tp[2] - 5) * -0.012);
  if (o.role === 'GK') { const tg = this.bestPass(o, mates, opp, true); if (tg) this.windUp(o, 'pass', tg, true); return; }
  const dg = hyp(gx - o.x, 34 - o.y);
  /* G17 · engine 10: THROUGH ON GOAL. No outfield defender between him and the goal: he never passes back. Close in → shoot
     (chip / power / placed by the engine's techniques); further out → carry the ball at the keeper. A square ball only to a
     team-mate who is closer, unmarked and in front of goal (the tap-in). */
  if (dg < 34 && Math.abs(o.y - 34) < 22) { let blk = 0; const ux = (gx - o.x) / (dg || 1), uy = (34 - o.y) / (dg || 1);
    for (const q of opp) { if (q.role === 'GK') continue; const ax = q.x - o.x, ay = q.y - o.y, along = ax * ux + ay * uy; if (along < -1 || along > dg) continue; if (Math.abs(ax * uy - ay * ux) < 2.6 + along * 0.12) { blk = 1; break; } }
    if (!blk) { const gk = opp.find(q => q.role === 'GK'), gkd = gk ? hyp(gk.x - o.x, gk.y - o.y) : 99;
      const sq2 = dg < 20 ? mates.find(m => m.role !== 'GK' && !this.isOff(m) && hyp(gx - m.x, 34 - m.y) < dg - 4 && hyp(gx - m.x, 34 - m.y) < 11 && hyp(m.x - o.x, m.y - o.y) < 14 && Math.min(...opp.map(q => hyp(q.x - m.x, q.y - m.y))) > 4 && gkd < 7) : null;
      if (sq2 && r() < 0.5) { this.windUp(o, 'pass', sq2); return; }
      if (dg < 15 + (st.shot === 'screamer' ? 6 : 0) || gkd < 6 || r() < 0.12) { this.windUp(o, 'shot'); return; }
      o.dribT = 0.35 + r() * 0.3; this.dec = o.dribT; return; } }
  /* shoot? each scoring style has its own range */
  const range = (st.shot === 'screamer' ? 33 : st.shot === 'poacher' ? 21 : st.shot === 'curler' ? 28 : 25) + Math.max(0, T.men) * 1.6 + mods.attack * 1.5 + Math.max(0, -this.T[1 - o.side].men) * 2.5; /* a team parking the bus invites long shots */
  if (dg < range && Math.abs(o.y - 34) < 21) {
    let want = 0.2 + (range - dg) / (range + 1) + mods.attack * 0.12 - mods.calm * 0.06 + T.men * 0.05 + Math.max(0, this.T[1 - o.side].men) * 0.03 + Math.max(0, -this.T[1 - o.side].men) * 0.05; if (st.shot === 'poacher' && dg > 13) want *= 0.45; if (st.shot === 'dribbler' && o.beat && this.t - o.beat < 2.5) want += 0.25;
    if (r() < want) { this.windUp(o, 'shot'); return; }
  }
  const space = pd > 4, room = Math.abs(gx - o.x) > 6;
  const dribW = (space ? 0.5 : 0.12) + (o.dri - 60) / 160 + mods.attack * 0.1 - mods.calm * 0.12 + T.men * 0.03 + (o.role === 'FWD' ? 0.12 : o.role === 'DEF' ? -0.15 : 0) + (st.shot === 'dribbler' ? 0.15 : 0);
  /* G17 build-up: in his own half a defender / midfielder plays it (short, open passes, the team moves the ball); carrying is
     for real space ahead. Attackers in the last third still take people on. */
  const own = this.dir(o.side) * (o.x - 52.5) < 0, bu = own && o.role !== 'FWD' ? (pd > 9 ? 0.75 : 0.45) : 1;
  if (room && r() < dribW * bu) { o.dribT = 0.5 + r() * 0.7; this.dec = o.dribT; return; }
  /* a cross from the wing into the box */
  if (Math.abs(gx - o.x) < 30 && Math.abs(o.y - 34) > 11 && r() < 0.5 + (o.pas - 60) / 200 && this.P.some(p => p.side === o.side && p !== o && p.role !== 'GK' && inBoxOf(gx, p.x, p.y))) { this.windUp(o, 'cross'); return; }
  const tgt = this.bestPass(o, mates, opp, false); if (tgt) this.windUp(o, 'pass', tgt); else { o.dribT = 0.6; this.dec = 0.6; }
};
/* G16 · keeper distribution. Hold times are short (4-minute matches) but real: walk to the edge of the box, look, release.
   gko = quick overarm throw (≤30 m), gkt = long throw (30-44 m), gkd = drop kick (45-72 m, aerial duel where it lands),
   gkp = he places the ball on the grass and plays out with his feet. Release times match the keeper clips (played ×1.25). */
const GK_REL = { gko: 1.18, gkt: 1.31, gkd: 1.68, gkp: 1.0 };
Match.prototype.gkHands = function (gk) { if (!gk) return; this.give(gk); gk.hnd = DT; gk.rcv = 0; gk.cd = 0; const T = this.T[gk.side], O = this.T[1 - gk.side], m = this.minute();
  this.dec = Math.max(0.5, 0.9 + this.r() * 1.3 - T.men * 0.25 - T.mods.attack * 0.3 + T.mods.calm * 0.5 + (T.score > O.score && m > 70 ? 1.5 : 0) - (T.score < O.score && m > 60 ? 0.4 : 0)); };
Match.prototype.gkDist = function (o, mates, opp) {
  const r = this.r, d = this.dir(o.side), T = this.T[o.side], O = this.T[1 - o.side], st = o.st || {}, sweep = o.s1 === 'sweeper', longK = st.pass === 'long', mn = this.minute();
  let press = 0; for (const q of opp) if (hyp(q.x - o.x, q.y - o.y) < 22) press++;
  /* how he restarts play (real keepers: ~40 % short throws, ~15 % long throws, ~35 % drop kicks, ~10 % placed and played) */
  const lateL = T.score < O.score && mn > 70 ? 0.25 : 0;
  const w = { gko: (sweep ? 0.45 : 0.33) + T.mods.calm * 0.1, gkt: 0.16, gkd: (longK ? 0.46 : sweep ? 0.16 : 0.32) + T.men * 0.07 + T.mods.attack * 0.08 + lateL, gkp: press ? 0 : (sweep ? 0.26 : 0.12) + T.mods.calm * 0.1 };
  let x = r() * (w.gko + w.gkt + w.gkd + w.gkp), kind = 'gkd'; for (const k of ['gko', 'gkt', 'gkd', 'gkp']) { x -= w[k]; if (x <= 0) { kind = k; break; } }
  if (kind === 'gkp') { o.wind = { k: 'gkp', tech: '', to: null, safe: true, t: 0, T: GK_REL.gkp, fx: o.x + d * 20, fy: 34 }; o.dribT = 0; return; }
  const R = { gko: [7, 30], gkt: [26, 45], gkd: [42, 72] };
  const pickIn = (k) => { let best = null, bs = -1e9; for (const m of mates) { if (m.role === 'GK') continue; const dist = hyp(m.x - o.x, m.y - o.y); if (dist < R[k][0] || dist > R[k][1]) continue;
      let open = 12; for (const q of opp) { const dd = hyp(q.x - m.x, q.y - m.y); if (dd < open) open = dd; } if (k !== 'gkd' && open < 4) continue;
      const sc = open * (k === 'gkd' ? 0.1 : 0.25) - this.lineRisk(o, m, opp) * (k === 'gkd' ? 0.2 : 1.1) + d * (m.x - o.x) * (k === 'gkd' ? 0.04 : 0.02) + (k === 'gkd' && m.role === 'FWD' ? 0.5 : 0) + (k === 'gko' && m.role === 'DEF' ? 0.3 : 0) - (this.isOff(m) ? 3 : 0) + r() * 0.8;
      if (sc > bs) { bs = sc; best = m; } } return best; };
  let to = pickIn(kind); if (!to && kind === 'gko') { kind = 'gkt'; to = pickIn(kind); } if (!to && kind !== 'gkd') { kind = 'gkd'; to = pickIn(kind); }
  if (!to) { let fg = -1e9; for (const m of mates) if (m.role !== 'GK' && d * m.x > fg) { fg = d * m.x; to = m; } kind = 'gkd'; }
  o.wind = { k: kind, tech: '', to, safe: true, t: 0, T: GK_REL[kind], fx: to ? to.x : o.x + d * 20, fy: to ? to.y : 34 }; o.dribT = 0; };
Match.prototype.gkRelease = function (o, w, mates, opp) { const b = this.ball, d = this.dir(o.side); o.hnd = 0;
  if (w.k === 'gkp') { b.h = 0; b.x = o.x + d * 0.6; b.y = o.y; o.cd = 0.3; this.dec = 0.35 + this.r() * 0.4; return; }
  const tg = w.to && this.P.includes(w.to) ? w.to : this.bestPass(o, mates, opp, true, 60); if (tg) this.passTo(o, tg, w.k); };
Match.prototype.windUp = function (o, k, to, safe) { const gx = this.goalX(o.side), pr = this.nearest(this.P.filter(p => p.side !== o.side), o.x, o.y), tight = pr && hyp(pr.x - o.x, pr.y - o.y) < 3;
  /* under pressure: a quick, short back-swing (first-time pass / snap shot) */
  /* G14: how he finishes (only the look + ball flight change; the chance of scoring does not) */
  let tech = ''; if (k === 'shot') { const dg = hyp(gx - o.x, 34 - o.y), gk = this.P.find(p => p.side !== o.side && p.role === 'GK'), st = o.st || {};
    tech = dg < 6 ? 'tap' : gk && Math.abs(gk.x - gx) > 2.2 && dg > 9 && dg < 22 && this.r() < 0.3 ? 'chip' : st.shot === 'dribbler' && o.beat && this.t - o.beat < 2.5 ? 'solo'
      : st.shot === 'curler' && dg > 13 && dg < 25 && Math.abs(o.y - 34) > 4 ? 'curl' : dg > 22 ? 'long' : 'power'; }
  o.wind = { k, tech, to: to || null, safe: !!safe, t: 0, T: (k === 'pass' ? 0.36 : 0.42) * (tight ? 0.6 : 1), fx: k === 'shot' ? gx : to ? to.x : gx, fy: k === 'shot' || !to ? 34 : to.y }; o.dribT = 0; };
Match.prototype.bestPass = function (o, mates, opp, safe, maxD) {
  const r = this.r, d = this.dir(o.side), st = o.st || {}, far = maxD || (st.pass === 'short' ? 30 : st.pass === 'long' ? 50 : 42); let best = null, bs = -1e9;
  for (const m of mates) {
    const dist = hyp(m.x - o.x, m.y - o.y); if (dist < 5 || dist > far) continue;
    const gain = d * (m.x - o.x), open = Math.min(10, Math.min(...opp.map(p => hyp(p.x - m.x, p.y - m.y)))), risk = this.lineRisk(o, m, opp);
    const TT = this.T[o.side]; let sc = (safe ? 0.03 : 0.14 + TT.mods.attack * 0.05 + TT.men * 0.02) * gain + open * 0.12 - risk * (0.9 + TT.mods.calm * 0.6 - TT.men * 0.07 + (TT.tp[2] - 5) * 0.03) - dist * 0.01 + r() * 0.7 + (m.role === 'GK' ? -4 : 0) + (gain < -3 && !safe ? -1.2 : 0);
    if (st.pass === 'long' && dist > 28) sc += 0.6 + Math.abs(m.y - o.y) * 0.02; else if (dist > 28) sc -= 0.55 + (dist - 28) * 0.03; /* G15: short, open passes first; hopeful long balls are rarer */ if (st.pass === 'tempo' && gain > 3 && dist < 25) sc += 0.4;
    if (this.isOff(m)) sc -= 0.1 + o.pas / 260;
    if (this.t - (this.gainT == null ? -9 : this.gainT) < 3 && gain > 8 && !safe && !this.isOff(m)) sc += 0.35 + gain * 0.01 + Math.max(0, this.T[1 - o.side].men) * 0.25 + this.T[1 - o.side].mods.attack * 0.2; /* G17: counter-attack (more so against a team that has pushed up): just won it → look forward first */
    else if (m.run > 0 && !safe && gain > 4 && !this.isOff(m)) sc += 0.55 + (o.pas - 60) / 70 + (st.pass === 'tempo' || o.s1 === 'maestro' ? 0.35 : 0) - risk * 0.3; /* G16: through ball to a runner */
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
  /* G14: real pass speeds (ground 12-23 m/s, lofted 15-21) played into the receiver's run */
  const G = kind === 'gko' || kind === 'gkt' || kind === 'gkd', lob = !G && kind !== 'throw' && hyp(m.x - o.x, m.y - o.y) > 28; let tx = m.x, ty = m.y, dist = hyp(tx - o.x, ty - o.y), v = 14;
  const lim = m.run > 0 && !G ? 13 : 7; /* G16: a through ball is played into the runner's path, into the space behind the line */
  for (let it = 0; it < 2; it++) { v = kind === 'throw' ? 14 : kind === 'gko' ? clamp(11 + dist * 0.3, 13, 19) : kind === 'gkt' ? clamp(13 + dist * 0.2, 16, 21) : kind === 'gkd' ? clamp(15 + dist * 0.12, 20, 26) : lob ? clamp(13 + dist * 0.18, 15, 21) : clamp(10 + dist * 0.42, 12, 23); const tt = dist / v;
    tx = clamp(m.x + clamp((m.vx || 0) * tt * 0.9 + this.dir(o.side) * 0.6, -lim, lim), 1, 104); ty = clamp(m.y + clamp((m.vy || 0) * tt * 0.9, -7, 7), 2, 66); dist = hyp(tx - o.x, ty - o.y); }
  T.passes++; this.lastTouch = o.side;
  const b = this.ball, off = kind !== 'throw' && this.isOff(m) ? m : null; b.owner = null;
  let cut = null; const dx = tx - o.x, dy = ty - o.y, L2 = dx * dx + dy * dy || 1;
  for (const p of opp) { const k = ((p.x - o.x) * dx + (p.y - o.y) * dy) / L2; if (k < 0.15 || k > 0.92) continue; const ex = o.x + dx * k - p.x, ey = o.y + dy * k - p.y; if (ex * ex + ey * ey < 5 && r() < 0.16 + (p.def - o.pas) / 260 + this.T[p.side].mods.press * 0.04 - (o.s1 === 'maestro' ? 0.04 : 0) + (p.s1 === 'wall' ? 0.02 : 0)) { cut = { p, k }; break; } }
  const fx = this.fx, wl = fx.wind && dist > 28 ? fx.wind : 0, miss = !cut && r() < 0.032 + (75 - o.pas) / 650 - T.mods.calm * 0.02 + (1 - fx.pass) + wl * 0.06 - (o.s1 === 'maestro' ? 0.025 : 0) - (o.s1 === 'longball' && dist > 28 ? 0.035 : 0);
  const wdx = wl && this.wx ? this.wx.dx * wl * 5 : 0, wdy = wl && this.wx ? this.wx.dy * wl * 5 : 0;
  const ex = miss ? tx + (r() - 0.5) * 12 + wdx : cut ? o.x + dx * cut.k : tx, ey = miss ? clamp(ty + (r() - 0.5) * 12 + wdy, -1, 69) : cut ? o.y + dy * cut.k : ty;
  b.fl = { x0: o.x, y0: o.y, x1: ex, y1: ey, k: 0, dur: Math.max(0.35, hyp(ex - o.x, ey - o.y) / v), arc: kind === 'throw' ? 1.1 : kind === 'gko' ? 0.45 + dist * 0.025 : kind === 'gkt' ? 0.9 + dist * 0.035 : kind === 'gkd' ? 2.4 + dist * 0.05 : lob ? 1.2 + dist * 0.06 : 0.15, to: cut ? cut.p : miss ? null : m, from: o, kind: G ? 'pass' : kind || 'pass', off: cut || miss ? null : off, aer: dist > 30, gd: G ? kind : '', h0: G ? (kind === 'gkd' ? 0.35 : 2.0) : 0 };
};
/* 🎯 crosses (open play, corners, wide free kicks, long throws): an aerial duel in the box */
Match.prototype.cross = function (o, kind, spot) {
  const r = this.r, d = this.dir(o.side), gx = this.goalX(o.side), att = this.P.filter(p => p.side === o.side && p !== o && p.role !== 'GK' && inBoxOf(gx, p.x, p.y));
  if (!att.length) return false;
  let tot = 0; att.forEach(p => { tot += sq(p.st.head || 50); }); let x = r() * tot, tgt = att[0]; for (const p of att) { x -= sq(p.st.head || 50); if (x <= 0) { tgt = p; break; } }
  const near = spot === 'near', tx = clamp(tgt.x + d * (near ? 1.5 : 0.5), 1, 104), ty = clamp(tgt.y + (r() - 0.5) * 2.5, 6, 62);
  this.lastTouch = o.side; this.ball.owner = null; this.T[o.side].passes++;
  const curve = (kind === 'corner' ? (o.st.fk === 'curl' ? 1 : 0.6) : 0.4) * (o.y < 34 ? 1 : -1) * (r() < 0.5 ? 1 : -1) * 1.6;
  /* G14: decided when the cross is struck, so the striker can start his volley / scissor kick before the ball arrives */
  const vol = (tgt.st.head || 50) < 70 && r() < 0.5 ? (r() < 0.25 ? 'scissor' : 'volley') : '';
  this.ball.fl = { x0: o.x, y0: o.y, x1: tx, y1: ty, k: 0, dur: Math.max(0.7, hyp(tx - o.x, ty - o.y) / 25), arc: 3.2, kind: 'cross', from: o, tgt, curve, ck: kind, vol };
  return true;
};
Match.prototype.aerial = function (f) {
  const r = this.r, b = this.ball, o = f.from, gx = this.goalX(o.side), dside = 1 - o.side, gk = this.P.find(p => p.side === dside && p.role === 'GK');
  const tgt = f.tgt && this.P.includes(f.tgt) ? f.tgt : this.nearest(this.P.filter(p => p.side === o.side && p !== o), b.x, b.y);
  const def = this.nearest(this.P.filter(p => p.side === dside && p.role !== 'GK'), b.x, b.y);
  const fx = this.fx;
  if (gk && Math.abs(gx - b.x) < 6.5 && Math.abs(b.y - 34) < 10 && r() < 0.3 * (gk.s1 === 'sweeper' ? 1.35 : 1) * (gk.gk / 75) * (1 - 0.15 * fx.wet - 0.2 * fx.wind)) { this.say('save', `🧤 ${gk.short} claims the cross`, dside, gk.id, { catch: 1, claim: 1 }); this.pauseT = 0.8; this._after = () => this.gkHands(gk); return; }
  const ah = tgt ? (tgt.st.head || 50) + (tgt.ovr || 60) * 0.3 : 0, dh = def ? ((def.st.head || 50) + def.def * 0.4) * 1.12 * (1 + fx.wind * 0.2) : 0;
  if (tgt && (!def || r() < ah / (ah + dh))) {
    this.say('header', `🗣️ ${tgt.short} rises highest`, o.side, tgt.id);
    if (inBoxOf(gx, tgt.x, tgt.y) && Math.abs(gx - tgt.x) < 13) { const vol = tgt === f.tgt ? f.vol : '';
      this.shoot(tgt, hyp(gx - tgt.x, 34 - tgt.y), vol ? { volley: 1, tech: vol } : { header: 1 }); return; }
    this.give(tgt); return;
  }
  if (def) { this.say('clear', `🧱 ${def.short} heads it clear`, dside, def.id, { header: 1 }); this.lastTouch = dside;
    if (r() < 0.43) { this.T[o.side].corners++; return this.restart('corner', o.side, gx, b.y < 34 ? 0 : 68); }
    const ex = clamp(b.x - this.dir(o.side) * (14 + r() * 16), 3, 102), ey = clamp(b.y + (r() - 0.5) * 30, 3, 65); b.fl = { x0: b.x, y0: b.y, x1: ex, y1: ey, k: 0, dur: 1.1, arc: 2.6, kind: 'pass', from: def, to: null, aer: true }; return; }
  b.owner = null;
};
Match.prototype.shoot = function (o, dg, x) {
  x = x || {}; const r = this.r, T = this.T[o.side], gx = this.goalX(o.side), gk = this.P.find(p => p.side !== o.side && p.role === 'GK'), st = o.st || {};
  T.shots++; this.lastTouch = o.side;
  /* a defender in the way can block it */
  if (!x.pen && !x.fk) { const opp = this.P.filter(p => p.side !== o.side && p.role !== 'GK'), bl = opp.find(p => { const k = (p.x - o.x) / (gx - o.x); if (k < 0.08 || k > 0.6) return false; const ly = o.y + (34 - o.y) * k; return Math.abs(p.y - ly) < 1.3; });
    if (bl && r() < 0.28 - Math.min(0, this.T[bl.side].men) * 0.06 + (bl.s1 === 'wall' ? 0.1 : 0)) { this.say('block', `🛡️ ${bl.short} blocks ${o.short}'s shot`, bl.side, bl.id); this.ball.owner = null; this.lastTouch = bl.side;
      if (r() < 0.55) { T.corners++; this.restart('corner', o.side, gx, o.y < 34 ? 0 : 68); return; } this.ball.x = bl.x - this.dir(o.side) * 2; this.ball.y = clamp(bl.y + (r() - 0.5) * 6, 2, 66); return; } }
  let q = clamp(0.112 + (o.sho / 100) * 0.42 * (1 - dg / 36) - (gk ? gk.gk / 100 : 0.6) * 0.16 + T.mods.attack * 0.03 + T.men * 0.016 + Math.min(0, this.T[1 - o.side].men) * 0.03 + Math.max(0, this.T[1 - o.side].men) * 0.045 + (r() - 0.5) * 0.05, 0.02, 0.55);
  if (st.shot === 'screamer' && dg > 20) q += 0.035; if (st.shot === 'poacher') q += dg < 11 ? 0.06 : -0.04; if (st.shot === 'curler' && dg > 13 && dg < 25 && Math.abs(o.y - 34) > 4) q += 0.045; if (st.shot === 'dribbler' && o.beat && this.t - o.beat < 2.5) q += 0.04;
  if (x.header) q = clamp(0.15 + ((st.head || 50) - 50) / 220 - (gk ? gk.gk / 100 : 0.6) * 0.05, 0.04, 0.3);
  if (x.volley) q = clamp(0.15 + ((o.sho || 60) - 60) / 240 - (gk ? gk.gk / 100 : 0.6) * 0.05, 0.04, 0.3);
  if (x.q != null) q = x.q;
  const fx = this.fx; if (fx.wet && !x.header) q += 0.012 * fx.wet; if (gk && gk.s1 === 'stopper' && !x.pen) q -= 0.02;
  const onT = x.onT != null ? x.onT : r() < (x.header || x.volley ? 0.42 : 0.38 + o.sho / 260) - (fx.wind ? fx.wind * (dg > 18 ? 0.08 : 0.02) : 0), goal = x.goal != null ? x.goal : onT && r() < q / 0.45;
  if (onT) T.onT++;
  const ty = goal ? 34 + (r() - 0.5) * 6.4 : onT ? 34 + (r() - 0.5) * 5 : 34 + (r() < 0.5 ? -1 : 1) * (4.5 + r() * 6);
  const curve = st.shot === 'curler' && !x.header ? (o.y < 34 ? -1 : 1) * 1.4 : x.fk && o.st.fk === 'curl' ? (o.y < 34 ? -1 : 1) * 2.2 : 0;
  this.ball.owner = null;
  this.ball.fl = { x0: o.x, y0: o.y, x1: gx + this.dir(o.side) * (goal ? 1.2 : 0.2), y1: ty - curve * 0.0, k: 0, dur: x.tech === 'tap' ? Math.max(0.3, dg / 20) : x.tech === 'chip' ? Math.max(0.65, dg / 15) : Math.max(0.3, dg / (st.shot === 'screamer' || x.pen || x.volley || x.tech === 'long' ? 42 : 36)), arc: x.fk ? 2.4 : x.header ? 0.9 : x.tech === 'chip' ? 2.8 + dg * 0.05 : x.tech === 'tap' ? 0.2 : x.volley ? 0.5 : x.tech === 'long' ? 1.9 : dg > 18 ? 1.4 : 0.6, tech: x.tech || '', volley: x.volley ? 1 : 0, kind: 'shot', goal, onT, from: o, gk, curve, pen: x.pen ? 1 : 0, fk: x.fk ? 1 : 0, header: x.header ? 1 : 0, wide: !onT };
};
Match.prototype.land = function () {
  const b = this.ball, f = b.fl, r = this.r; b.fl = null;
  if (f.kind === 'shot') {
    const sh = f.from, T = this.T[sh.side], gx = this.goalX(sh.side);
    if (f.goal) { T.score++; const e = this.say('goal', `⚽ GOAL! ${sh.name} (${T.short}) ${this.T[0].score}–${this.T[1].score}`, sh.side, undefined, { how: f.pen ? 'pen' : f.fk ? 'fk' : f.header ? 'header' : f.tech && f.tech !== 'power' ? f.tech : (sh.st || {}).shot || '' }); void e;
      this.stops[this.t >= HALF ? 1 : 0]++; this.hug = sh.side; this.hugBy = sh; this.pauseT = 2.6; this._after = () => { this.hug = -1; this.kickoff(1 - sh.side); }; return; }
    if (f.onT && f.gk && this.P.includes(f.gk)) {
      const hold = r() < 0.5 + (f.gk.s1 === 'stopper' ? 0.06 : 0) + (f.gk.gk - 60) / 200 - (sh.st && sh.st.fk === 'knuckle' && f.fk ? 0.2 : 0) - (f.pen ? 0.25 : 0) - 0.09 * this.fx.wet - 0.05 * this.fx.snow;
      const sd = hyp(f.x0 - gx, f.y0 - 34); /* G16: close-range shots are smothered with the body (block), not dived at */
      this.say('save', `🧤 ${hold ? 'Great save' : 'Save'} by ${f.gk.short}!`, f.gk.side, f.gk.id, { catch: hold ? 1 : 0, blk: sd < 10 && !f.pen ? 1 : 0 });
      if (hold) { this.pauseT = 0.8; this._after = () => { this.gkHands(f.gk); }; return; }
      this.lastTouch = f.gk.side;
      if (r() < 0.55) { T.corners++; this.restart('corner', sh.side, gx, b.y < 34 ? 0 : 68); return; }
      b.x = f.gk.x + this.dir(f.gk.side) * 5; b.y = clamp(f.gk.y + (r() - 0.5) * 14, 4, 64); b.owner = null; return;
    }
    if (!f.pen && !f.fk && r() < 0.4) { const dfn = this.nearest(this.P.filter(p => p.side !== sh.side && p.role !== 'GK'), b.x, b.y); this.say('miss', `💨 ${sh.short}'s shot deflects wide`, sh.side, sh.id, { near: 1 }); this.lastTouch = 1 - sh.side; T.corners++; return this.restart('corner', sh.side, gx, f.y1 < 34 ? 0 : 68); }
    this.say('miss', f.pen ? `😱 ${sh.short} misses the penalty!` : `💨 ${sh.short} ${f.fk || f.header ? 'puts it over' : 'shoots wide'}`, sh.side, sh.id, { near: Math.abs(f.y1 - 34) < 5.2 ? 1 : 0 });
    this.restart('gk', 1 - sh.side, gx, 34); return;
  }
  if (f.kind === 'cross') return this.aerial(f);
  if (b.y < 0 || b.y > 68 || b.x < 0 || b.x > 105) return this.outOfPlay(f.from ? f.from.side : this.lastTouch || 0);
  if (f.off && f.to === f.off && this.P.includes(f.off)) { const p = f.off; this.T[p.side].offs++; this.say('off', `🚩 Offside: ${p.short}`, p.side, p.id); return this.restart('ifk', 1 - p.side, p.x, p.y); }
  if (f.to && this.P.includes(f.to)) {
    const tp = f.to; if (hyp(tp.x - b.x, tp.y - b.y) > 3.2) { b.owner = null; return; }
    if (f.aer) { const opp = this.nearest(this.P.filter(p => p.side !== tp.side && p.role !== 'GK'), b.x, b.y); if (opp && sq(opp.x - b.x) + sq(opp.y - b.y) < 4 && r() < 0.85 * ((opp.st.head || 50) + opp.def * 0.3) / ((opp.st.head || 50) + opp.def * 0.3 + (tp.st.head || 50) + tp.ovr * 0.3)) { this.say('duel', `💪 ${opp.short} wins the header`, opp.side, opp.id, { header: 1 }); this.give(opp); return; } }
    const fx = this.fx; if (fx.touch < 1 && tp.role !== 'GK' && f.kind === 'pass' && r() < (1 - fx.touch) * 1.05) { this.say('skid', `💦 The ball skids away from ${tp.short}`, tp.side, tp.id); b.owner = null; b.x = clamp(b.x + this.dir(f.from.side) * 2.4, 1, 104); b.y = clamp(b.y + (r() - 0.5) * 3, 1, 67); return; }
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
  if (p.role === 'GK') { const sw = p.s1 === 'sweeper' ? 1.6 : 1; tx = p.side === 0 ? 3.5 + clamp((bx - 10) / 30, 0, 4 * sw) : 101.5 - clamp((95 - bx) / 30, 0, 4 * sw); ty = clamp(34 + (by - 34) * 0.35, 29, 39); return [tx, ty]; }
  /* G15 · engine 8: the team moves as ONE block. Everything is worked out in the team's own direction (0 = own goal line):
     the block's centre follows the ball, the shape is stretched when attacking and squeezed when defending (length AND width),
     and it slides across to the ball's side. Nobody but the pressers is pulled onto the ball any more. */
  const s0 = p.side === 0, bO = s0 ? bx : 105 - bx;
  const rx = (s0 ? p.bx : 105 - p.bx) - 32, ry = p.by - 34, pr = T.mods.press ? 1 : 0;
  const anchor = att ? clamp(bO - 7 + T.mods.attack * 5 + T.men * 2.5 - T.mods.calm * 3 + (T.tp[0] - 5) * 0.9, 28, 76) : clamp(bO * 0.6 + 7 + pr * 7 + T.men * 3 - T.mods.tight * 6 - (b.owner && b.owner.hnd > 0 ? 12 : 0), 21, 60);
  let ox = anchor + rx * (att ? 1.3 : 0.95);
  ty = 34 + ry * (att ? 1.38 : 0.92 - T.mods.tight * 0.1) + (by - 34) * (att ? 0.12 : 0.36);
  if (att && p.role === 'FWD') { ox = Math.max(ox, bO + 9 + (p.num % 3) * 3); if (p.st.shot === 'poacher' && bO > 62) { ox = 105 - 8 - (p.num % 3) * 2; ty = 34 + (p.by - 34) * 0.35; } }
  if (!att && p.s1 === 'engine' && p.role !== 'FWD') ox -= 2;
  tx = s0 ? ox : 105 - ox;
  /* defenders always stay goal-side of the ball */
  if (!att && p.role === 'DEF') { const depth = Math.max(8, 15 + T.mods.tight * 8 - T.men * 2.5 + (poss == null ? 4 : 0)); tx = d > 0 ? clamp(tx, bx - depth - 12, bx - 6) : clamp(tx, bx + 6, bx + depth + 12); }
  /* marking (like eFootball / FC): out of possession each player picks up the nearest opponent in his zone and stands
     2-3 m goal-side of him; the spacing below stops two players marking the same man */
  if (!att && this._mates && poss != null) { let best = null, bd = 22 * 22; for (const q of this._mates[1 - p.side]) { if (q === b.owner) continue; const dd = sq(q.x - tx) + sq(q.y - ty); if (dd < bd) { bd = dd; best = q; } }
    if (best) { const near = clamp(1.25 - hyp(best.x - bx, best.y - by) / 32, 0.3, 1), w = (p.role === 'FWD' ? 0.3 : 0.88) * near; tx += (best.x - d * 2.4 - tx) * w; ty += (best.y + (34 - best.y) * 0.08 - ty) * w; } }
  /* space: never stand on top of a team-mate (keeps ~9 m between players, opens passing angles) */
  const MS = this._mates ? this._mates[p.side] : this.P; for (let i = 0; i < MS.length; i++) { const q = MS[i]; if (q === p || q.side !== p.side || q.role === 'GK' || q === b.owner) continue; const ex = tx - q.x, ey = ty - q.y, d2 = ex * ex + ey * ey; const R = att ? 9 : 5.5; if (d2 < R * R && d2 > 1e-4) { const dd = Math.sqrt(d2), k = (R - dd) / dd * 0.55; tx += ex * k; ty += ey * k; } }
  /* support: the two nearest team-mates of the man on the ball show for it 10-15 m away (triangles) */
  if (att && b.owner && b.owner.side === p.side && this._sup && this._sup.includes(p)) { const o = b.owner, ex = tx - o.x, ey = ty - o.y, dd = Math.sqrt(ex * ex + ey * ey) || 1, want = clamp(dd, 10, 15); tx = o.x + ex / dd * want; ty = o.y + ey / dd * want; }
  /* attackers try to stay onside (good timing most of the time) */
  if (att && p.run > 0) { const L = this.ln[p.side], go = b.owner && b.owner.wind && b.owner.wind.to === p; tx = go ? L + d * 14 : L - d * 2.2; ty = clamp(ty + (34 - ty) * 0.15, 6, 62); return [clamp(tx, 2, 103), clamp(ty, 2, 66)]; }
  if (att && p.role !== 'DEF') { const L = this.ln[p.side] + d * p.ofs; if (p.role === 'FWD' && d * (bx - 52.5) > -14) tx = d > 0 ? Math.max(tx, L - 2) : Math.min(tx, L + 2); tx = d > 0 ? Math.min(tx, L) : Math.max(tx, L); }
  return [clamp(tx, 2, 103), clamp(ty, 2, 66)];
};
/* G15: the n nearest players to a point, without building and sorting new arrays every step */
const nearestN = (L, x, y, n) => { if (n <= 0) return []; if (n === 1) { let b = null, bd = 1e18; for (let i = 0; i < L.length; i++) { const p = L[i], d = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y); if (d < bd) { bd = d; b = p; } } return b ? [b] : []; }
  let a = null, b = null, da = 1e18, db = 1e18; for (let i = 0; i < L.length; i++) { const p = L[i], d = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y); if (d < da) { b = a; db = da; a = p; da = d; } else if (d < db) { b = p; db = d; } } return [a, b].filter(Boolean).slice(0, n); };
Match.prototype.moveAll = function (mode) {
  if (this._matesRef !== this.P) { this._matesRef = this.P; this._mates = [this.P.filter(p => p.side === 0 && p.role !== 'GK'), this.P.filter(p => p.side === 1 && p.role !== 'GK')]; }
  const b = this.ball, sp = this.sp, poss = sp ? sp.side : this.ball.owner ? this.ball.owner.side : (b.fl && b.fl.from ? b.fl.from.side : null), r = this.r;
  const bx = sp ? sp.x : b.fl ? b.fl.x1 : b.x, by = sp ? sp.y : b.fl ? b.fl.y1 : b.y;
  const fx = this.fx, wxk = fx.speed * (fx.heat ? 1 - 0.04 * fx.heat * this.t / (2 * HALF) * (1 + (fx.tire - 1)) : 1);
  this._sup = null; if (mode === 'play' && b.owner) { const o = b.owner; let a1 = null, a2 = null, d1 = 1e9, d2 = 1e9; for (const p of this._mates[o.side]) { if (p === o) continue; const dd = sq(p.x - o.x) + sq(p.y - o.y); if (dd < d1) { a2 = a1; d2 = d1; a1 = p; d1 = dd; } else if (dd < d2) { a2 = p; d2 = dd; } } this._sup = [a1, a2]; }
  const chasers = {}; if (mode === 'play') [0, 1].forEach(s => { const L = this._mates[s]; const T = this.T[s], n = b.owner && b.owner.hnd > 0 ? 0 : poss === s ? (b.owner ? 0 : 1) : poss == null ? 1 : 1 + (T.mods.press || T.men >= 1 ? 1 : 0) - (T.men === -2 && !T.mods.press ? 0 : 0); chasers[s] = nearestN(L, bx, by, n); });
  for (const p of this.P) {
    p.px = p.x; p.py = p.y;
    if (mode === 'frozen') { p.vx *= 0.8; p.vy *= 0.8; continue; }
    p.ofT -= DT; if (p.ofT <= 0) { p.ofT = 2 + r() * 2.5; p.ofs = -0.8 + r() * 4 + ((p.pas || 60) < 55 ? 0.3 : 0); }
    /* G16: runs in behind. A forward (or a quick midfielder) times a run off the last defender's shoulder while a team-mate
       has the ball in the other half; the passer can slide a through ball into the space behind (bestPass + passTo) */
    if (mode === 'play') { if (p.run > 0) { p.run -= DT; if (p.run <= 0 || (b.owner ? b.owner.side !== p.side : !(b.fl && b.fl.to === p))) p.run = -2.5; } else if (p.run < 0) p.run = Math.min(0, p.run + DT);
      else if (b.owner && b.owner.side === p.side && b.owner !== p && b.owner.hnd === 0 && (p.role === 'FWD' || p.role === 'MID' && (p.s1 === 'speed' || p.st.pace === 'burst')) && this.dir(p.side) * (b.owner.x - 52.5) > -12 && this.dir(p.side) * (this.ln[p.side] - p.x) < 16) {
        const TP = this.T[p.side], TO = this.T[1 - p.side]; if (r() < 0.016 * (1 + TP.men * 0.3 + TP.mods.attack * 0.4 + (p.s1 === 'speed' ? 0.5 : 0) + Math.max(0, TO.men) * 0.35 + TO.mods.attack * 0.35) /* G17: a high line invites runs in behind */ * (p.role === 'FWD' ? 1 : 0.45)) p.run = 1.5 + r() * 0.9; } }
    const d = this.dir(p.side); let tx, ty, slow = 1;
    if (mode === 'setup') {
      if (this.hug >= 0) { const sc = this.hugBy; if (p.side === this.hug && sc && this.P.includes(sc) && p !== sc && sq(p.x - sc.x) + sq(p.y - sc.y) < 900) { tx = sc.x; ty = sc.y; } else if (p === sc) { tx = clamp(p.x + d * 2, 2, 103); ty = clamp(p.y + (p.y < 34 ? -3 : 3), 2, 66); } else { tx = p.x; ty = p.y; slow = 0.4; } }
      else if (sp && sp.pos.has(p)) { [tx, ty] = sp.pos.get(p); }
      else [tx, ty] = this.target(p, bx, by, poss);
      if (sp) slow = sp.kind === 'ko' ? 0.75 : 0.6;
    } else if (mode === 'play' && b.fl && b.fl.to === p && b.fl.kind === 'pass') { tx = bx; ty = by; }
    else if (b.owner === p && p.hnd > 0) { if (p.wind) { tx = p.x + d * 0.05; ty = p.y; } else { tx = p.side === 0 ? Math.min(13.5, Math.max(p.x, 4) + 2) : Math.max(91.5, Math.min(p.x, 101) - 2); ty = p.y + (34 - p.y) * 0.05; slow = 0.42; } }
    else if (p.role === 'GK') [tx, ty] = this.target(p, bx, by, poss);
    else if (b.owner === p && (p.wind || p.rcv > 0)) { tx = p.x + d * (p.wind ? 0.1 : 0.5); ty = p.y; }
    else if (b.owner === p) { const gx = this.goalX(p.side); if (p.dribT > 0) { p.dribT -= DT; tx = p.x + d * 3; ty = p.y + (34 - p.y) * 0.08; } else { tx = p.x + d * 0.6; ty = p.y; } if (Math.abs(gx - p.x) < 4) tx = p.x; }
    else if (chasers[p.side].includes(p)) { const ci = chasers[p.side].indexOf(p); if (ci === 0 || poss === p.side) { tx = bx - d * (poss === p.side ? 0 : 1.1); ty = by; } else { tx = bx - d * 6.5; ty = by + (34 - by) * 0.25; } }
    else [tx, ty] = this.target(p, bx, by, poss);
    /* acceleration: explosive starters get going fast, engines reach a higher top speed */
    const TP = this.T[p.side], fade = 1 - (p.s1 === 'engine' ? 0 : Math.max(0, 0.015 * Math.abs(TP.men) - 0.004 * (TP.tp[3] - 5))) * this.t / LEN, ps = p.st.pace, top = (6.2 + p.pac * 0.075) * (b.owner === p ? (p.s1 === 'dribbler' ? 0.78 : 0.72) : 1) * (ps === 'engine' ? 1.05 : ps === 'burst' ? 0.97 : 1) * (p.s1 === 'speed' ? 1.035 : 1) * slow * wxk * fade, acc = ps === 'burst' ? 13 : ps === 'engine' ? 7 : 9.5;
    const dx = tx - p.x, dy = ty - p.y, dist = hyp(dx, dy), want = dist < 0.05 ? 0 : Math.min(top, dist / 0.32), dvx = dist > 0.001 ? dx / dist * want : 0, dvy = dist > 0.001 ? dy / dist * want : 0;
    let ax = dvx - p.vx, ay = dvy - p.vy; const al = hyp(ax, ay), mx = acc * DT * (al > 0 && want < hyp(p.vx, p.vy) ? 1.6 : 1); if (al > mx) { ax *= mx / al; ay *= mx / al; }
    p.vx += ax; p.vy += ay; p.x = clamp(p.x + p.vx * DT, -1, 106); p.y = clamp(p.y + p.vy * DT, -1, 69);
  }
};

/* ======================= ⏱️ G13 · broadcast clock (dynamic match length) =======================
   The simulation is unchanged (210 s of play, 20 steps per second). What changes is the WALL clock: after big moments the
   match stops for a broadcast pause (slow-mo replay, card scene, substitution, penalty call), then play goes on.
   Every pause comes ONLY from the match events, so both managers' phones (and spectators) pause at the very same moments.
   Base 4:00 (incl. the 30 s half time); with many highlights ~4:40–5:20; never more than 4:00 + CAP. */
const BC_CAP = 105, HT_TICK = Math.round(HALF / DT), END_TICK = Math.round(LEN / DT);
W.BC = { CAP: BC_CAP, HT_TICK, END_TICK, MAX: TOTAL + BC_CAP };
/* what each event costs: d = ticks after the event, len = seconds, pri = merges (a goal or a red card is never dropped) */
W.bcRule = function (e) {
  switch (e.k) {
    case 'goal': return { k: 'goal', d: 52, len: 9, pri: 3 };
    case 'save': return { k: 'save', d: 18, len: 5.5, pri: 1 };
    case 'miss': return e.near ? { k: 'miss', d: 14, len: 5, pri: 1 } : null;
    case 'red': return { k: 'red', d: 3, len: 5.5, pri: 3 };
    case 'yellow': return { k: 'yellow', d: 3, len: 3.2, pri: 2 };
    case 'pen': return { k: 'pen', d: 4, len: 3, pri: 2 };
    case 'sub': return { k: 'sub', d: 2, len: 3.5, pri: 2 };
    default: return null;
  }
};
Match.prototype.bcScan = function () {
  const B = this.bc || (this.bc = { L: [], used: 0, seen: 0, lastT: -1e9 });
  for (; B.seen < this.ev.length; B.seen++) {
    const e = this.ev[B.seen], R = W.bcRule(e); if (!R) continue;
    const et = Math.round(e.t / DT); if (et >= END_TICK - 1) continue;
    let P = Math.min(et + R.d, END_TICK - 1); if (et < HT_TICK && P > HT_TICK) P = HT_TICK;
    if (P - B.lastT < 40 && R.pri < 3) continue;
    if (R.pri < 3 && B.used + R.len > BC_CAP) continue;
    P = Math.max(P, B.lastT + 1, this.tick + 1); if (P >= END_TICK) continue;
    B.L.push({ tick: P, len: R.len, k: R.k, ev: B.seen, et, pid: e.pid, side: e.side }); B.used += R.len; B.lastT = P;
  }
};
/* seconds after kick-off when the simulation reaches tick T (all pauses before T included; half time = 30 s at tick 2100) */
Match.prototype.wallAt = function (T) { let w = T * DT + (T > HT_TICK ? BREAK : 0); const L = this.bc ? this.bc.L : []; for (const q of L) { if (q.tick < T) w += q.len; else break; } return w; };
/* move the simulation to wall time e (seconds after kick-off). onTick(m) runs before every step (live orders). Returns 0..1 = how far into the current step */
Match.prototype.advanceTo = function (e, onTick) {
  let guard = 0; this.bcScan();
  while (!this.over && guard++ < 6000 && this.wallAt(this.tick + 1) <= e) { if (onTick) onTick(this); this.step(); }
  return clamp((e - this.wallAt(this.tick)) / DT, 0, 1);
};
/* the broadcast pause (if any) at wall time e: { k, q (pause), t0, t1 } or { k: 'ht' } */
Match.prototype.bcAt = function (e) {
  if (this.over) return null; const T = this.tick, w0 = this.wallAt(T) + DT * 0; let w = w0;
  const L = this.bc ? this.bc.L : []; for (const q of L) { if (q.tick !== T) continue; if (e >= w && e < w + q.len) return { k: q.k, q, t0: w, t1: w + q.len }; w += q.len; }
  if (T === HT_TICK && e >= w && e < w + BREAK) return { k: 'ht', t0: w, t1: w + BREAK };
  return null;
};
/* the tick the match will be at, at wall time e (for stamping orders, even when this phone's drawing lags behind) */
Match.prototype.tickAtWall = function (e) { const w1 = this.wallAt(this.tick + 1); return e < w1 ? this.tick : Math.min(END_TICK, this.tick + 1 + Math.floor((e - w1) / DT)); };
/* the wall time the final whistle blows (only exact once the match is over) */
Match.prototype.endWall = function () { return this.wallAt(END_TICK); };
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
Pitch.prototype.size = function () { const bx = this.c.closest && this.c.closest('.w11pitch'); if (bx) this.c.style.width = Math.max(120, Math.floor(Math.min(bx.clientWidth - 4, (bx.clientHeight - 4) * 105 / 68))) + 'px'; const w = this.c.clientWidth || 360, dpr = Math.min(2, window.devicePixelRatio || 1); this.w = w; this.h = Math.round(w * 68 / 105); this.c.width = w * dpr; this.c.height = this.h * dpr; this.c.style.height = this.h + 'px'; this.g.setTransform(dpr * w / 105, 0, 0, dpr * w / 105, 0, 0); };
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
  if (W.me) W.addRN(W.me.rn); return W.me;
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
  try { await W.syncEpoch(); } catch (e) {}
  await W.load();
  if (W.resumeLive()) return;
  W.me ? W.home() : W.createScreen();
};

W.home = function () {
  const me = W.me, n = W.bootNext(), s = me.stats || {};
  if ((!n || !W._boot) && W.leagueHome) return W.leagueHome();
  const boot = (me.boot || []).length;
  W.ui(`<div class="card" style="display:flex;gap:12px;align-items:center">${me.crest ? W.crestSvg(me.crest, me.short) : badge(W.club(me.club), me.short)}<div style="flex:1"><p style="font-weight:900;font-size:16px">${esc(me.name)} ${me.pioneer ? '<span style="font-size:10px;color:#facc15">🛡️ Founder</span>' : ''}</p><p style="font-size:11px;color:#94a3b8">Team ${W.avg(me.ids)} OVR · ${esc(me.form)} · P${s.p || 0} W${s.w || 0} D${s.d || 0} L${s.l || 0}</p><p style="font-size:11px;color:#94a3b8">⚡ ${me.energy} · 🩹 ${me.med}</p></div></div>
    <div class="card"><p style="font-weight:900">🏕️ Boot Camp · ${boot}/5</p><div class="steps">${[0, 1, 2, 3, 4].map(i => `<i class="${i < boot ? 'done' : i === boot ? 'now' : ''}"></i>`).join('')}</div>
      ${n ? `<div class="tip">${esc(n.tip)}</div>${n.ready ? `<button class="btn" style="margin-top:10px" onclick="W11.prematch('boot')">▶ Play Boot Camp match ${n.i + 1}</button>` : `<button class="btn" style="margin-top:10px" disabled id="w11cd">Unlocks in …</button>`}`
        : `<p style="font-size:12px;color:#a3e635;margin-top:6px">🎓 Graduated! Your club joins a Division 6 group in the live league pyramid. Tap to pick your kick-off time.</p>`}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="btn2" onclick="W11.squad()">👕 Squad & tactics</button><button class="btn2" onclick="W11.friendly()">🤝 Friendly</button></div>`);
  if (n && !n.ready) { const tick = () => { const b = document.getElementById('w11cd'); if (!b) return; const ms = n.at - Date.now(); if (ms <= 0) return W.bootHome ? W.bootHome() : W.home(); b.textContent = `Unlocks in ${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`; setTimeout(tick, 1000); }; tick(); }
};

W.squad = function (sel) {
  const me = W.me, P = me.ids.map(id => W.player(id));
  const day = W11C.absDay(Date.now()), inLg = !!(me.lg && me.lg.s === W.S);
  const st = (id) => { if (!inLg) return ''; const c = W11C.condNow(me, id, day), inj = (me.inj || {})[id] || 0, ban = (me.ban || {})[id] || 0, yc = (me.yc || {})[id] || 0;
    return `<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:900">${inj ? `<button onclick="event.stopPropagation();W11.med('${id}')" style="padding:2px 6px;border-radius:8px;background:rgba(255,45,149,.2)">🤕 ${inj}</button>` : ''}${ban ? `<span title="banned">🚫${ban}</span>` : ''}${yc ? `<span>🟨${yc}</span>` : ''}<span style="width:34px;height:6px;border-radius:9px;background:rgba(255,255,255,.1);overflow:hidden;display:inline-block"><i style="display:block;height:100%;width:${c}%;background:${c >= 75 ? '#22d3ee' : c >= 50 ? '#facc15' : '#ff2d95'}"></i></span>${c}</span>`; };
  const SH = W.shape(me.form, me.fp), LP = W.lpOf(me), fitC = (f) => f >= 1 ? '#22d3ee' : f >= 0.9 ? '#facc15' : '#ff2d95';
  const row = (p, i) => { const f = i < 11 ? W.fitOf(p, SH[i].dp, LP) : 1; return `<div class="row ${sel === i ? 'sel' : ''}" onclick="W11.swap(${i})"><span class="pos" style="${i < 11 ? 'color:' + fitC(f) : ''}" title="${i < 11 ? 'Spot ' + SH[i].dp + (f < 1 ? ' · plays at ' + Math.round(f * 100) + '%' : '') : ''}">${i < 11 ? SH[i].dp : 'SUB'}</span><span class="ovr" style="${p.legend ? 'background:linear-gradient(135deg,#facc15,#ff2d95,#a855f7);color:#fff' : 'background:' + ovrColor(p.ovr)}">${p.ovr}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.legend ? '👑 ' : p.wk && p.age <= 21 ? '🌟 ' : ''}${p.flag} <b>${esc(p.name)}</b> <span style="color:#94a3b8">· ${[W11C.dpOf(p)].concat(LP[p.id] || []).join('/')} · ${p.age}y</span></span>${st(p.id) || `<span style="font-size:10px;color:#94a3b8">#${p.num}</span>`}<button onclick="event.stopPropagation();W11.pMenu('${p.id}')" style="margin-left:6px;padding:4px 9px;border-radius:9px;background:rgba(255,255,255,.08);font-weight:900" title="Player options">⋯</button></div>`; };
  W.ui(`<div class="card"><p style="font-weight:900">📐 Formation</p><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${Object.keys(W.FORMS).map(f => `<button onclick="W11.setForm('${f}')" style="padding:7px 10px;border-radius:10px;font-size:11px;font-weight:900;${f === me.form ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.06)'}">${f}</button>`).join('')}</div></div>
    <div class="card">${inLg ? `<p style="font-size:11px;color:#94a3b8;margin-bottom:6px">Bars = fitness. 🤕 injured (tap to use a 🩹 Med-Pack) · 🚫 banned · 🟨 yellows (5 = ban). Your team sheet locks 15 minutes before kick-off; injured or banned starters are swapped for the best bench player.</p>` : ''}<p style="font-weight:900">Starting XI <span style="font-size:10px;color:#94a3b8;font-weight:700">· tap a player, then another to swap</span></p>${P.slice(0, 11).map(row).join('')}<p style="font-weight:900;margin-top:10px">Bench</p>${P.slice(11, 18).map((p, k) => row(p, k + 11)).join('')}${P.length > 18 ? `<p style="font-weight:900;margin-top:10px">Reserves <span style="font-size:10px;color:#94a3b8;font-weight:700">· can't play in matches. Swap them into the top 18 to use them.</span></p>${P.slice(18).map((p, k) => row(p, k + 18)).join('')}` : ''}<p style="font-size:11px;color:#94a3b8;margin-top:10px">Squad: ${P.length}/25 players</p><button class="btn2" style="margin-top:8px" onclick="W11.releaseMenu()">🗑️ Release a player</button></div>`, '👕 Squad', 'W11.home()');
};
W.swap = async function (i) {
  if (W._sel == null) { W._sel = i; return W.squad(i); }
  const j = W._sel; W._sel = null; if (i === j) return W.squad();
  const ids = W.me.ids.slice(); [ids[i], ids[j]] = [ids[j], ids[i]];
  await W.save({ ids, ovr: W.avg(ids) }); W.squad();
};
W.setForm = async function (f) { await W.save({ form: f, fp: null }); W.squad(); };

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
W.teamInfo = (src, side, color) => ({ name: src.name, short: src.short || W.club(src.club != null ? src.club : src.idx).short, color: color || (side === 0 ? '#22d3ee' : '#ff2d95'), gkColor: side === 0 ? '#facc15' : '#a3e635', form: src.form || '4-4-2', fp: W11C.fpOk(src.fp) ? src.fp : null, ids: src.ids, tk: src.tk || {}, lp: W.lpOf(src), auto: !src.uid, rn: W.addRN(src.rn) });
W.prematch = function (kind, opp) {
  const me = W.me; let o;
  if (kind === 'boot') { const n = W.bootNext(); if (!n || !n.ready) return W.home(); const c = W.club([700, 650, 500, 330, 260][n.i] + (me.club % 50)); o = { name: c.name, short: c.short, club: c.idx, ids: W.squadIds(c.idx), form: ['4-4-2', '4-3-3', '4-2-3-1', '4-4-2', '4-3-3'][n.i] }; }
  else if (kind === 'friend') o = { name: opp.name, short: opp.short, club: opp.club, ids: opp.ids, form: opp.form, uid: opp.uid, tag: opp.tag, kits: opp.kits };
  else { const ci = 210 + Math.floor(Math.random() * 1100); const c = W.club(ci); o = { name: c.name, short: c.short, club: ci, ids: W.squadIds(ci), form: pick(Math.random, Object.keys(W.FORMS)) }; }
  if (kind !== 'boot' && W.lockdown()) { toast('🔒 ' + W.lockdown()); return; }
  const [hc, ac] = W.pickKits(me.kits, o.kits || W.aiKits(o.club));
  const live = { kind, seed: (Math.random() * 4294967295) >>> 0, startAt: Date.now() + 25000, home: W.teamInfo(me, 0, hc), away: W.teamInfo(o, 1, ac), cmds: [], boot: kind === 'boot' ? W.bootNext().i : null, opp: { uid: o.uid || null, tag: o.tag || null } };
  try { localStorage.setItem('w11_live', JSON.stringify(live)); } catch (e) {}
  W.play(live);
};
W.resumeLive = function () {
  let live = null; try { live = JSON.parse(localStorage.getItem('w11_live') || 'null'); } catch (e) {}
  if (!live || !W.me) return false;
  if (Date.now() > live.startAt + TOTAL * 1000 + 5000) { const m = W.simulate(live.home, live.away, live.seed, live.cmds); if (Date.now() > live.startAt + (m.endWall() + 5) * 1000) { W.finish(live, m, true); return true; } }
  W.play(live); return true;
};
// real time → engine steps (the 30-second half-time break is part of the 4 minutes; nothing ever pauses)
const playedAt = (live) => { const e = (Date.now() - live.startAt) / 1000; if (e <= 0) return 0; if (e <= HALF) return e; if (e <= HALF + BREAK) return HALF; return Math.min(LEN, e - BREAK); };
W.stopLoop = function () { if (W._raf) cancelAnimationFrame(W._raf); W._raf = null; clearInterval(W._iv); };
W.play = function (live) {
  W.stopLoop(); W.live = live; W.my = 0;
  /* G13: the match moves with the broadcast clock (pauses for replays, cards, subs; half time is one of them) */
  const m = W.simulate(live.home, live.away, live.seed, [], 0);
  /* orders at this exact tick (saved orders after a reopen, the teamplay sent at kick-off); orders made now are applied by W.command */
  const onT = (mm) => { for (const c of live.cmds || []) if (c && c.tick === mm.tick && !mm.cmds.includes(c) && !mm.cmds.some(x => x.tick === c.tick && JSON.stringify(x.c) === JSON.stringify(c.c))) { mm.applyCmd(c.side, c.c); mm.cmds.push(c); } };
  m.advanceTo((Date.now() - live.startAt) / 1000, onT);
  m.T[0].ai = false; W.m = m;
  const n = live.boot != null ? W.BOOT[live.boot] : null;
  W.ui(`<div class="w11match"><div class="w11side"><div class="sb"><span style="font-weight:900;color:${m.T[0].color}">${esc(m.T[0].short)}</span><span class="sc" id="w11sc">0–0</span><span style="font-weight:900;color:${m.T[1].color}">${esc(m.T[1].short)}</span><span class="tm" id="w11tm">1'</span></div>
    </div><div class="w11pitch"><canvas id="w11c"></canvas></div><div class="w11side w11side2">
    <div class="alert" id="w11al">📢 TOUCHLINE MOMENT · shout now!</div>
    <div class="shouts" id="w11sh">${[['attack', '📣 Attack'], ['tight', '🧱 Tight'], ['press', '⚡ Press'], ['calm', '🧘 Calm']].map(([k, l]) => `<button data-k="${k}" onclick="W11.shout('${k}')">${l}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px"><button class="btn2" onclick="W11.subMenu()">🔁 Subs (<span id="w11subs">5</span>)</button><button class="btn2" onclick="W11.formMenu()">📐 Formation</button></div>
    <div class="tick" id="w11tk"></div>${n ? `<div class="tip">${esc(n.tip)}</div>` : ''}</div><div id="w11ov"></div></div>`, live.kind === 'boot' ? '🏕️ Boot Camp' : '🤝 Friendly', 'W11.leaveMatch()');
  const pitch = new Pitch(document.getElementById('w11c')); pitch.size(); W._pitch = pitch; window.addEventListener('resize', () => pitch.size(), { once: true });
  let acc = 0, last = performance.now(), seenEv = 0;
  const frame = (now) => {
    if (!document.getElementById('w11c')) return W.stopLoop();
    /* catch up (e.g. after the phone was locked) without drawing every step; new orders made on this phone are applied by W.command */
    const el0 = (Date.now() - live.startAt) / 1000, al = m.advanceTo(el0, onT);
    pitch.draw(m, al); W.bcTick && W.bcTick(m, el0, live);
    const sc = document.getElementById('w11sc'); if (sc) sc.textContent = `${m.T[0].score}–${m.T[1].score}`;
    const el = (Date.now() - live.startAt) / 1000, tm = document.getElementById('w11tm');
    const bcq = m.bcAt(el); if (tm) tm.textContent = el < 0 ? 'Kick-off ' + Math.ceil(-el) + 's' : bcq && bcq.k === 'ht' ? `HT · ${Math.ceil(bcq.t1 - el)}s` : m.over ? 'FT' : W.minLabel(m);
    if (m.ev.length !== seenEv) { const news = m.ev.slice(seenEv); seenEv = m.ev.length; W.feed(m); if (news.some(e => e.k === 'alert')) W.pulse(); if (news.some(e => e.k === 'goal' && e.side === 0) && navigator.vibrate) try { navigator.vibrate([80, 40, 120]); } catch (e) {} }
    W.halfTime(!!(bcq && bcq.k === 'ht'), m, bcq ? bcq.t1 - el : 0);
    const subs = document.getElementById('w11subs'); if (subs) subs.textContent = m.T[0].subsLeft;
    if (m.over && el > m.endWall() + W.cerDur(live).close && !W.hold()) { W.stopLoop(); return W.finish(live, m, false); }
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
W.halfTime = function (on, m, left) {
  const ov = document.getElementById('w11ov'); if (!ov) return;
  /* G11: the break counts down live (30, 29, 28 …) with a draining bar */
  const tick = () => { const s = ov.querySelector('[data-hts]'), bar = ov.querySelector('[data-htb]'); if (!s || left == null) return; const n = Math.max(0, Math.ceil(left)); if (s.textContent !== String(n)) s.textContent = n; if (bar) bar.style.width = Math.max(0, Math.min(100, n / 30 * 100)) + '%'; };
  if (on && !ov.querySelector('[data-ht]') && !ov.innerHTML) {
    const a = m.T[0], b = m.T[1], pt = a.poss + b.poss || 1;
    ov.innerHTML = `<div class="ov" data-ht><p style="font-size:12px;color:#94a3b8;font-weight:900">HALF TIME · second half in <b data-hts style="color:#22d3ee;font-size:16px">30</b>s</p><div style="width:100%;max-width:300px;height:5px;border-radius:9px;background:rgba(255,255,255,.08);margin-top:6px;overflow:hidden"><i data-htb style="display:block;height:100%;width:100%;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);transition:width .25s linear"></i></div><p style="font-size:30px;font-weight:900;margin:6px 0">${a.score}–${b.score}</p>
      <table style="width:100%;max-width:300px;font-size:12px;margin:8px 0"><tr><td>${Math.round(a.poss / pt * 100)}%</td><td style="color:#94a3b8">Possession</td><td>${Math.round(b.poss / pt * 100)}%</td></tr><tr><td>${a.shots}</td><td style="color:#94a3b8">Shots</td><td>${b.shots}</td></tr><tr><td>${a.onT}</td><td style="color:#94a3b8">On target</td><td>${b.onT}</td></tr><tr><td>${a.passes}</td><td style="color:#94a3b8">Passes</td><td>${b.passes}</td></tr></table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;max-width:300px"><button class="btn2" onclick="W11.subMenu()">🔁 Subs</button><button class="btn2" onclick="W11.formMenu()">📐 Formation</button></div></div>`;
  } else if (!on && ov.querySelector('[data-ht]')) ov.innerHTML = '';
  if (on) tick();
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
/* G6: kick-off slots are your own local times */
const slotTxt = (sl) => String(CC.SLOTS[sl]).padStart(2, '0') + ':00';
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
const koOf = (G, md, hp, ap) => { const U = G.users || {}, hu = CC.isUserAt(G, hp, md) && U[hp], au = CC.isUserAt(G, ap, md) && U[ap]; return hu ? CC.ko(G.s, md, hu.sl, hu.of) : au ? CC.ko(G.s, md, au.sl, au.of) : CC.aiKo(G.s, md, CC.zoneOfG(G.t, G.g)); };
const mini = (hue, sh) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:7px;font-size:8px;font-weight:900;color:#fff;background:linear-gradient(135deg,hsl(${hue},80%,55%),hsl(${(hue + 60) % 360},80%,35%));flex-shrink:0">${esc(String(sh || '').slice(0, 3))}</span>`;
W.myFixtures = (G) => { const pos = W.me.lg.pos, out = []; for (let md = 1; md <= CC.MDS; md++) { const [hp, ap] = CC.pairs(md).find(([h, a]) => h === pos || a === pos); out.push({ md, hp, ap, home: hp === pos, mine: CC.isUserAt(G, pos, md), ko: koOf(G, md, hp, ap), id: CC.mid(G.s, G.t, G.g, md, hp), res: G.res && G.res[md + '_' + hp] }); } return out; };
W.nextMatch = (G) => W.myFixtures(G).find(f => f.mine && !f.res && W.nowS() < f.ko + W.BC.MAX * 1000 + 15 * 60000);
W.leagueLock = () => { if (!W.inLeague() || !W.G) return null; const n = W.nextMatch(W.G); if (!n) return null; const ms = n.ko - W.nowS(); if (ms < 15 * 60000 && ms > -W.BC.MAX * 1000 - 30000) return ms > 0 ? `Your league match starts in ${Math.ceil(ms / 60000)} min. Friendlies are locked 15 minutes before official matches.` : 'Your league match is being played right now!'; return null; };
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
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">${[0, 1, 2, 3].map(sl => `<button class="btn2" onclick="W11.joinL(${sl})" style="padding:14px 6px"><b style="font-size:15px">${slotTxt(sl)}</b><br><span style="font-size:10px;color:#94a3b8">your time</span></button>`).join('')}</div></div>` + grid([`<button class="btn2" onclick="W11.squad()">👕 Squad & tactics</button>`, `<button class="btn2" onclick="W11.friendly()">🤝 Friendly</button>`]));
    return;
  }
  const G = await W.loadG(); if (!G) return;
  const tb = CC.table(G, now), rank = tb.findIndex(r => r.pos === me.lg.pos), row = tb[rank], n = W.nextMatch(G), z = zone(G.t, rank);
  let nx = '';
  if (n) {
    const ms = n.ko - now, live = ms <= 0 && now < n.ko + (W.BC.MAX * 1000) + 15000, opp = seatName(G, n.home ? n.ap : n.hp, n.md);
    nx = `<div class="card"><p style="font-weight:900">${live ? '<span style="color:#ff2d95">● LIVE NOW</span>' : '⚽ Next match'} · Matchday ${n.md}</p>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px">${mini(opp.hue, opp.sh)}<p style="flex:1;font-weight:900">${n.home ? 'vs' : '@'} ${esc(opp.n)} ${opp.user ? '<span style="font-size:10px;color:#67e8f9">👤 manager</span>' : ''}</p></div>
      <p style="font-size:11px;color:#94a3b8;margin-top:6px">${n.home ? 'Home' : 'Away'} · ${localT(n.ko, true)} · <span id="w11lc">${live ? 'playing' : 'in ' + left(ms)}</span></p>
      ${ms < 15 * 60000 ? `<button class="btn" style="margin-top:10px" onclick="W11.openL('${n.id}')">${live ? '▶ Go to the touchline' : '🔒 Team sheet locked · open match'}</button>` : `<p style="font-size:11px;color:#cbd5e1;margin-top:8px">📋 Your team sheet locks 15 minutes before kick-off. Not there? GG AI shouts for you.</p>`}</div>`;
  } else if (day >= 27) nx = `<div class="card"><p style="font-weight:900">🏁 Season ${cs} is over</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">Last results are checked today. Promotion, relegation and prizes are worked out on day 28. Season ${cs + 1} starts ${localT(CC.dayStart(cs + 1, 1), true)}.</p></div>`;
  else nx = `<div class="card"><p style="font-weight:900">⚽ No match right now</p><p style="font-size:12px;color:#94a3b8;margin-top:6px">Your next league match will show here.</p></div>`;
  const trained = me.trd === CC.absDay(Date.now());
  W.ui(top + `<div class="card" onclick="W11.tableL()" style="cursor:pointer"><p style="font-size:10px;font-weight:900;letter-spacing:.1em;color:#67e8f9">DIVISION ${G.t} · GROUP ${CC.groupNo(G.t, G.g)} · ${CC.ZONE_FLAG[CC.zoneOfG(G.t, G.g)]} ${CC.ZONE_NAME[CC.zoneOfG(G.t, G.g)].toUpperCase()}</p><p style="font-size:26px;font-weight:900;margin-top:2px">${ord(rank + 1)} <span style="font-size:13px;color:#94a3b8">· ${row.pts} pts · P${row.p} W${row.w} D${row.d} L${row.l}</span></p>
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
  W.ui(`<div class="card"><p style="font-weight:900">📊 Division ${G.t} · Group ${CC.groupNo(G.t, G.g)} · ${CC.ZONE_NAME[CC.zoneOfG(G.t, G.g)]} · Season ${G.s}</p><div class="row" style="font-size:10px;color:#94a3b8;font-weight:900"><span style="width:18px">#</span><span style="flex:1;padding-left:30px">Club</span><span style="width:22px;text-align:center">P</span><span style="width:30px;text-align:center">GD</span><span style="width:26px;text-align:right">Pts</span></div>${rows}
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
/* G13: an order counts only if it reached the server before the match was 8 steps short of its tick (wall clock with the broadcast pauses; checked by the engine) */
const CMD_LEAD = 24;
const CMD_KEYS = { shout: 1, form: 1, sub: 1, here: 1, men: 1, tp: 1, fp: 1 };
W.cmdsFrom = function (live, raw) {
  const per = [0, 0], M = live.M, out = [];
  for (const k of Object.keys(raw || {}).sort()) {
    const x = raw[k]; if (!x || (x.s !== 0 && x.s !== 1) || typeof x.t !== 'number' || typeof x.at !== 'number') continue;
    if (!x.by || x.by !== (x.s ? M.au : M.hu)) continue;
    if (x.t < tickAtMs(live.startAt, x.at) - Math.ceil(W.BC.CAP / DT) || x.t >= LEN / DT || x.at > live.startAt + W.BC.MAX * 1000) continue;
    let c; try { c = JSON.parse(x.c); } catch (e) { continue; }
    if (!c || typeof c !== 'object' || Object.keys(c).some(q => !CMD_KEYS[q])) continue;
    if (++per[x.s] > 80) continue;
    c._w = (x.at - live.startAt) / 1000; out.push({ tick: x.t, side: x.s, c, k });
  }
  return out.sort((a, b) => a.tick - b.tick || (a.k < b.k ? -1 : 1));
};
W.teamL = (sh, side, color, S) => ({ name: sh.n, short: sh.sh, color, gkColor: side ? '#a3e635' : '#facc15', form: sh.form, fp: W11C.fpOk(sh.fp) ? sh.fp : null, ids: sh.ids, cond: sh.aiCond ? Object.fromEntries(sh.ids.map(i => [i, sh.aiCond])) : (sh.cond || {}), tr: sh.tr || {}, out: (sh.bo || []).concat(sh.io || []), tk: sh.tk || {}, lp: sh.lp || {}, auto: !!sh.aiCond, rn: W.addRN(sh.rn), S, league: true });
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
  const t = W.m.tickAtWall((W.nowS() - live.startAt) / 1000) + CMD_LEAD;
  try { await R.D.push(R.D.ref(R.d, 'w11live/' + live.mid), { by: uidNow(), s: W.my, t, c: JSON.stringify(c), at: R.D.serverTimestamp() }); if (!c.here && !W._quiet) toast('📣 Order sent: on the pitch in 1 second'); } catch (e) { toast('⚠️ Order not sent. Check your internet.'); }
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
  const wallNow = () => (W.nowS() - live.startAt) / 1000, apply = (mm) => { while (ci < cmds.length && cmds[ci].tick === mm.tick) { mm.applyCmd(cmds[ci].side, cmds[ci].c); mm.cmds.push(cmds[ci]); ci++; } };
  const rebuild = () => { if (m) m = W.simL(live, cmds, m.tick); else { m = W.simL(live, [], 0); ci = 0; m.advanceTo(wallNow(), apply); } m.P.forEach(p => { p.px = p.x; p.py = p.y; }); W.m = m; ci = cmds.findIndex(c => c.tick >= m.tick); if (ci < 0) ci = cmds.length; applied = JSON.stringify(cmds.filter(c => c.tick < m.tick)); };
  const onRaw = () => { cmds = W.cmdsFrom(live, raw); W._cmds = cmds; if (!m) return; const a = JSON.stringify(cmds.filter(c => c.tick < m.tick)); if (a !== applied) rebuild(); else { ci = cmds.findIndex(c => c.tick >= m.tick); if (ci < 0) ci = cmds.length; } };
  if (R) { try { const sn = await R.D.get(R.D.ref(R.d, 'w11live/' + live.mid)); raw = sn.val() || {}; } catch (e) {} }
  cmds = W.cmdsFrom(live, raw); W._cmds = cmds; rebuild();
  if (R) { const ref = R.D.ref(R.d, 'w11live/' + live.mid); const u1 = R.D.onChildAdded(ref, (s) => { raw[s.key] = s.val(); onRaw(); }), u2 = R.D.onChildChanged(ref, (s) => { raw[s.key] = s.val(); onRaw(); }); W._unsub = () => { try { u1(); u2(); } catch (e) {} }; }
  const M = live.M, ctl = my >= 0;
  W.ui(`<div class="w11match"><div class="w11side"><div class="sb"><span style="font-weight:900;color:${m.T[0].color}">${esc(m.T[0].short)}</span><span class="sc" id="w11sc">0–0</span><span style="font-weight:900;color:${m.T[1].color}">${esc(m.T[1].short)}</span><span class="tm" id="w11tm">1'</span></div>
    </div><div class="w11pitch"><canvas id="w11c"></canvas></div><div class="w11side w11side2">
    ${ctl ? `<div class="alert" id="w11al">📢 TOUCHLINE MOMENT · shout now!</div>
    <div class="shouts" id="w11sh">${[['attack', '📣 Attack'], ['tight', '🧱 Tight'], ['press', '⚡ Press'], ['calm', '🧘 Calm']].map(([k, l]) => `<button data-k="${k}" onclick="W11.shout('${k}')">${l}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px"><button class="btn2" onclick="W11.subMenu()">🔁 Subs (<span id="w11subs">5</span>)</button><button class="btn2" onclick="W11.formMenu()">📐 Formation</button></div>` : '<p style="font-size:11px;color:#94a3b8;margin-top:8px;text-align:center">👀 Watching</p>'}
    <div class="tick" id="w11tk"></div><div class="tip">${M.cup ? CC.CUP_NAME[M.cup] + ' · ' + esc(M.rn || '') + (CC.isKO({ k: M.cup }, M.cr) ? ' · a draw goes to penalties' : '') : 'League · Division ' + M.t + ' · Matchday ' + M.md}. You are ${my === 0 ? 'the home side (left → right)' : my === 1 ? 'the away side (right → left)' : 'watching'}. Orders reach the pitch 2 seconds after you tap.</div></div><div id="w11ov"></div></div>`, M.cup ? '🏆 CUP MATCH' : '🏆 League', 'W11.leaveMatch()');
  if (ctl && !Object.values(raw).some(x => x && x.by === uidNow() && /here/.test(x.c || ''))) W.sendL({ here: 1 });
  const pitch = new Pitch(document.getElementById('w11c')); pitch.size(); W._pitch = pitch; window.addEventListener('resize', () => pitch.size(), { once: true });
  let seenEv = 0;
  const frame = () => {
    if (!document.getElementById('w11c')) return W.stopLoop();
    const e = wallNow(), al = m.advanceTo(e, apply);
    applied = JSON.stringify(cmds.filter(c => c.tick < m.tick));
    pitch.draw(m, al); W.bcTick && W.bcTick(m, e, live);
    const sc = document.getElementById('w11sc'); if (sc) sc.textContent = `${m.T[0].score}–${m.T[1].score}`;
    const bcq = m.bcAt(e), tm = document.getElementById('w11tm'); if (tm) tm.textContent = e < 0 ? 'Kick-off ' + left(-e * 1000) : bcq && bcq.k === 'ht' ? `HT · ${Math.ceil(bcq.t1 - e)}s` : m.over ? 'FT' : W.minLabel(m);
    if (m.ev.length !== seenEv) { const news = m.ev.slice(seenEv); seenEv = m.ev.length; W.feed(m); if (ctl && news.some(x => x.k === 'alert')) W.pulse(); if (news.some(x => x.k === 'goal' && x.side === my) && navigator.vibrate) try { navigator.vibrate([80, 40, 120]); } catch (er) {} }
    if (ctl) { W.halfTime(!!(bcq && bcq.k === 'ht'), m, bcq ? bcq.t1 - e : 0); const subs = document.getElementById('w11subs'); if (subs) subs.textContent = m.T[my].subsLeft; }
    if (m.over && e > m.endWall() + Math.max(6, W.cerDur(live).close) && !W.hold()) { W.stopLoop(); return W.finishL(live); }
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
      if (G && W.inLeague()) W.myFixtures(G).filter(x => x.mine && !x.res && now > x.ko + W.BC.MAX * 1000 + 15000 && !W.voted(x.id)).slice(0, 3).forEach(x => todo.push(x.id));
      for (const id of todo) { try { const sn = await f.getDoc(f.doc(db(), 'w11m', id)); const M = sn.exists() ? sn.data() : null; if (M && M.st === 'locked') { await W.checkL(id, M); await new Promise(r => setTimeout(r, 400)); } } catch (e) {} }
      const j = await W.api('/w11/job', {}); for (const M of (j && j.jobs) || []) { if (!M.s0 || !M.s1) continue; await W.checkL(M.id, M); await new Promise(r => setTimeout(r, 400)); }
    } catch (e) { console.warn('11W check', e); }
  }, 4000);
};
W.open = (function (b) { return async function () { await b(); if (W.inLeague() && document.getElementById('w11') && !W.live) { const G = await W.loadG(); const n = G && W.nextMatch(G); if (n && W.nowS() > n.ko - 60000 && W.nowS() < n.ko + W.BC.MAX * 1000) W.openL(n.id); } }; })(W.open);
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
  else { const PL = !same && L && L.n === cur.n - 1 ? L : { i, n: cur.n - 1, st: cur.st - (cur.st - CC.MK_LEN2 >= CC.MK_T2 ? CC.MK_LEN2 : CC.MK_LEN) }, E = CC.lotEff(PL, now); w = E.winner || ''; un = PL.un; pr = E.price; ai = E.aiClub; pid = E.pid; }
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
  if (S >= CC.CUP_FIRST) { const f = await fbLoad(); for (const k of ['oc', 'cl']) { if (!CC.cupOn(S, k)) continue; try { const sn = await f.getDoc(f.doc(db(), 'w11c', S + '-' + (k === 'oc' ? 'oc' + (W.myZone ? W.myZone() : 2) : k))); out[k] = sn.exists() ? sn.data() : null; } catch (e) {} } }
  W._cups = out; W._nextCup = W.nextCup(); return out;
};
/* my cup matches (rounds that are drawn so far) */
W.myCupFix = function (C) {
  const out = []; if (!C || !W.me) return out;
  for (let r = 1; r <= C.R; r++) { const P = CC.cupPairs(C, r); if (!P) { if (C.k === 'cl' && r <= CC.CL_GR) continue; break; }
    P.forEach((p, k) => { const h = cupSeatMine(C, p[0]), a = cupSeatMine(C, p[1]); if (!h && !a) return;
      const ready = (C.pr || 0) >= r, real = !ready || ((C.pu && C.pu[r]) || []).includes(k);
      out.push({ C, k: C.k, r, i: k, p, home: h, opp: p[h ? 1 : 0], ko: p[0] < 0 || p[1] < 0 ? 0 : CC.cupKoOf(C, r, p, k), mid: CC.cupMid(C.s, CC.cupId(C), r, k), x: (C.rr && C.rr[r] && C.rr[r][k]) || (C.ur && C.ur[r + '_' + k]) || null, done: !!(C.rr && C.rr[r]), real }); }); }
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
  if (ms < 15 * 60000 && ms > -W.BC.MAX * 1000 - 30000) return ms > 0 ? `Your cup match starts in ${Math.ceil(ms / 60000)} min. Friendlies are locked 15 minutes before official matches.` : 'Your cup match is being played right now!'; return null; }; })(W.leagueLock);
W.open = (function (b) { return async function () { await b.apply(this, arguments); if (!W.me || W.live || !document.getElementById('w11')) return; await W.loadCups(); const n = W._nextCup; if (n && W.nowS() > n.ko - 60000 && W.nowS() < n.ko + W.BC.MAX * 1000) W.openL(n.mid); }; })(W.open);
/* quietly send results of my own finished cup matches */
W.cupCheck = function () { if (W._cupBg) return; W._cupBg = 1;
  setTimeout(async () => { try { const D = await W.loadCups(), f = await fbLoad(), now = W.nowS();
    for (const k of ['oc', 'cl']) for (const x of W.myCupFix(D[k])) { if (x.x || !x.ko || !x.real || now < x.ko + W.BC.MAX * 1000 + 15000 || W.voted(x.mid)) continue;
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
  if (s == null) { s = S - 1; try { const sn = await f.getDoc(f.doc(db(), 'w11hof', String(S))); if (sn.exists() && Object.keys(sn.data()).some(k => /^(oc|cl)/.test(k))) { s = S; H = sn.data(); } } catch (e) {} }
  s = clamp(s, 1, S);
  if (!H) { try { const sn = await f.getDoc(f.doc(db(), 'w11hof', String(s))); H = sn.exists() ? sn.data() : null; } catch (e) {} }
  const nav = `<div style="display:flex;align-items:center;gap:8px"><button class="btn2" style="width:44px" onclick="W11.hof(${s - 1})" ${s <= 1 ? 'disabled' : ''}>◀</button><p style="flex:1;text-align:center;font-weight:900">Season ${s}</p><button class="btn2" style="width:44px" onclick="W11.hof(${s + 1})" ${s >= S ? 'disabled' : ''}>▶</button></div>`;
  const ent = (ic, label, e) => e ? `<div class="row"><span style="font-size:18px">${ic}</span><span style="flex:1"><span style="font-size:10px;color:#94a3b8">${label}</span><br><b>${esc(e.n)}</b>${e.u ? ' <span style="font-size:10px;color:#67e8f9">👤</span>' : ''}${e.ru ? `<br><span style="font-size:10px;color:#94a3b8">Runner-up: ${esc(e.ru.n)}</span>` : ''}</span></div>` : '';
  let season = '';
  if (!H) season = `<p style="font-size:12px;color:#94a3b8;margin-top:10px">${s >= S ? 'This season is still being played. Champions are added on day 28 (cups when their final is played).' : 'No champions saved for this season.'}</p>`;
  else { const d = Object.values(H.d || {}).sort((a, b) => a.t - b.t || a.g - b.g), by = {}; d.forEach(e => { (by[e.t] = by[e.t] || []).push(e); });
    season = ent('⭐', 'Champions League', H.cl) + (H.oc ? ent('🏆', 'Open Cup', H.oc) : '') + CC.ZONE_NAME.map((zn, z) => H['oc' + z] ? ent('🏆', 'Open Cup · ' + zn, H['oc' + z]) : '').join('') + Object.keys(by).map(t => `<p style="font-size:10px;font-weight:900;color:#67e8f9;letter-spacing:.1em;margin-top:10px">DIVISION ${t} CHAMPIONS</p>${by[t].map(e => `<div class="row"><span style="width:62px;color:#94a3b8;font-size:10px">${Number(t) > 1 ? 'Group ' + (e.g + 1) : ''}</span><span style="flex:1;font-weight:${e.u ? 900 : 700}">🥇 ${esc(e.n)}${e.u ? ' <span style="font-size:10px;color:#67e8f9">👤</span>' : ''}</span></div>`).join('')}`).join(''); }
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
const snap = (m) => ({ k: m.tick, b: [m.ball.x, m.ball.y, m.ball.h || 0], p: m.P.map(p => [p.side, p.role === 'GK' ? 1 : 0, p.x, p.y, p.id, p.num]), rf: m.ref ? [m.ref.x, m.ref.y] : null });
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
  /* G13: keepers never clash with either outfield kit (or with each other) */
  D.gk = W.gkPick ? W.gkPick(D) : D.gk;
  D.comp = M ? (M.cup ? CC.CUP_NAME[M.cup] + ' · ' + (M.rn || '') : 'League · Division ' + M.t + ' · Matchday ' + M.md) : live.kind === 'boot' ? '🏕️ Boot Camp · Match ' + ((live.boot || 0) + 1) : '🤝 Friendly';
  live._dr = D; return D;
};
const crestHtml = (D, i, s) => D.cr[i] ? W.crestSvg(D.cr[i], D.sh[i], s) : D.ci[i] != null ? badge(W.club(D.ci[i]), D.sh[i]).replace('class="w11crest"', `class="w11crest" style="width:${s}px;height:${Math.round(s * 52 / 46)}px"`) : '';
const REF_COLS = ['#111827', '#facc15', '#a3e635', '#f97316', '#e2e8f0', '#38bdf8', '#ff2d95'];
const cdist = (a, b) => { const A = rgb(a), B = rgb(b); return Math.abs(A[0] - B[0]) + Math.abs(A[1] - B[1]) + Math.abs(A[2] - B[2]); };
W.refColor = (D) => { const avoid = [D.k[0].c1, D.k[1].c1, D.k[0].sho, D.k[1].sho, D.gk[0], D.gk[1]].filter(Boolean); let best = REF_COLS[0], bs = -1; for (const c of REF_COLS) { const sc = Math.min(...avoid.map(a => cdist(a, c))); if (sc > bs) { bs = sc; best = c; } } return best; };
const refOf = (D) => { if (!D.RT || D.RTbe !== G3.be) { const c = W.refColor(D); D.RT = G3.team({ c1: c, c2: '#0b0f24', pat: 'plain', col: '#0b0f24', slv: c, sho: '#0b0f24', soc: '#0b0f24' }, c); D.RTbe = G3.be; } return D.RT; };
/* G13: the referee can hold a card / point to the spot (W._refO), and his two assistants + the 4th official follow the play (W.officials) */
const drawRef = (D, x, y) => { if (x == null) return; G3.fig(refOf(D), false, 'ref', PX(x), PZ(y), Object.assign({ num: '', run: 1 }, W._refO || {})); if (W.officials) try { W.officials(D, W._lastList, refOf(D)); } catch (e) {} };
W.cerDur = (live) => live && live.kind === 'league' ? { open: 45, close: 24 } : { open: 24, close: 18 };
const teamsOf = (live) => { const D = W.dress(live); if (!D.T || D.Tbe !== G3.be) { D.T = [G3.team(D.k[0], D.gk[0], D.cr[0], D.sh[0]), G3.team(D.k[1], D.gk[1], D.cr[1], D.sh[1])]; D.Tbe = G3.be; } return D; };
/* draw everybody from an engine-like list: [{ side, gk, x, y, id }] (engine metres) */
const drawPlayers = (D, list, st, dt, opt) => { W._lastList = list; for (const p of list) { const x = PX(p.x), z = PZ(p.y), o = opt ? opt(p) : null, face = o && o.face != null ? o.face : null, a = anim(st, p.id, x, z, dt, face);
  /* G12: a diving keeper moves across his line towards the ball (he used to dive on the spot, metres away from it) */
  const zs = o && o.sh ? PZ(p.y + o.sh) : z;
  G3.fig(D.T[p.side], p.gk, p.id, x, zs, { phase: a.phase, run: o && o.run != null ? o.run : a.run, yaw: o && o.yaw != null ? o.yaw : a.yaw, jump: o && o.jump, cel: o && o.cel, arms: o && o.arms, lean: o && o.lean, kick: o && o.kick, kickLead: o && o.kickLead, kickClip: o && o.kickClip, dive: o && o.dive, num: p.num, throwIn: o && o.throwIn, wall: o && o.wall, slide: o && o.slide, header: o && o.header, catch: o && o.catch, mhClip: o && o.mhClip, card: o && o.card, point: o && o.point, shake: o && o.shake, clap: o && o.clap, wave: o && o.wave, hands: o && o.hands, fierce: o && o.fierce, y: o && o.y, holdB: o && o.holdB }); } };
/* G11: who celebrates how. Scorer: knee slide or jump; team-mates: jumps and fist pumps (mixed per player, never in step).
   jump is still passed for the old block engine (no mocap there). */
W.celOf = (id, star, t) => { const h = hash(String(id)); const k = star ? (h % 3 === 0 ? 'jump' : 'slide') : (h % 5 < 3 ? 'jump' : 'arms');
  return { cel: k, arms: 'up', jump: k === 'arms' ? 0 : Math.abs(Math.sin((t || performance.now() / 1000) * 5 + h % 7)) * 0.4, run: star && k === 'slide' ? 0 : undefined }; };
/* what each player is doing right now in the live engine: kicking, diving, celebrating */
W.liveOpts = function (m) {
  const b = m.ball, f = b.fl, g = m.ev.length && m.ev[m.ev.length - 1], cel = m.hug >= 0 ? m.hug : g && g.k === 'goal' && m.pauseT > 0 && m.tick - g.tick < 60 ? g.side : -1;
  /* recent moments (last ~0.8 s): slide tackles, headers, keeper catches */
  const rec = {}; for (let i = m.ev.length - 1; i >= 0 && i > m.ev.length - 12; i--) { const e = m.ev[i]; if (e.tick == null || m.tick - e.tick > 16) break; if (e.pid != null && !rec[e.pid]) rec[e.pid] = e; }
  const sp = m.sp, wall = sp && sp.wall ? new Set(sp.wall.map(p => p.id)) : null, gxOf = (s) => s === 0 ? 105 : 0;
  const KC = { chip: 'MX_Chip', tap: 'MX_Pass', scissor: 'MX_Scissor', volley: 'MX_Kick' };
  return (p) => { if (b.owner === p && p.wind) { const w = p.wind; return { kick: w.k === 'pass' ? 0.55 : 1, kickLead: Math.max(0, w.T - w.t), kickClip: KC[w.tech], run: 0.1, face: Math.atan2(w.fx - p.x, w.fy - p.y) }; }
    /* G14: volley / scissor kick starts before the cross arrives (the foot meets it as it lands) */
    if (f && f.kind === 'cross' && f.vol && f.tgt && f.tgt.id === p.id) { const left = (1 - Math.min(1, f.k)) * f.dur, lim = f.vol === 'scissor' ? 0.75 : 0.42; if (left < lim) return { kick: 1, kickLead: left, kickClip: KC[f.vol], run: 0, face: Math.atan2(gxOf(p.side) - p.x, 34 - p.y) }; }
    if (f && f.from && f.from.id === p.id && f.k < 0.35) return f.kind === 'throw' ? { throwIn: 1 - f.k / 0.35 } : f.header ? { header: 1 } : { kick: (f.kind === 'shot' ? 1 : 0.55) * (1 - f.k / 0.35) };
    if (f && f.kind === 'shot' && f.gk && f.gk.id === p.id && f.k > 0.05) { const gap = f.y1 - p.y, pr = Math.min(1, (f.k - 0.05) * 2.2), sh = Math.sign(gap) * Math.max(0, Math.abs(gap) - (f.goal ? 2.1 : f.wide ? 3 : 0.9)) * pr, rest = gap - sh, d = clamp(rest / 1.6, -1, 1); /* G14 fix: the dive is to the keeper's OWN left/right — the away keeper faces the other way (he used to dive the wrong way) */ return { dive: (p.side === 0 ? 1 : -1) * d * Math.min(1, pr * 1.3) * (Math.abs(gap) > 0.8 ? 1 : 0.3), sh, run: 0 }; }
    if (wall && wall.has(p.id)) return { wall: 1, run: 0, face: Math.atan2(sp.x - p.x, sp.y - p.y) };
    if (sp && sp.taker && sp.taker.id === p.id) { if (sp.kind === 'throw') return { throwIn: 0.01, run: 0 }; const gx = gxOf(p.side); return { face: Math.atan2(gx - p.x, 34 - p.y) }; }
    const e = rec[p.id];
    if (e && (e.k === 'tackle' || e.k === 'foul') && e.sl) return { slide: 1 };
    if (e && (e.k === 'header' || e.header)) return { header: 1, jump: 0.4 };
    if (e && e.k === 'save' && e.catch && p.role === 'GK') return { catch: 1, run: 0 };
    if (cel >= 0) { if (p.side !== cel) return { lean: 0.3, run: 0 }; let sc = null; for (let i = m.ev.length - 1; i >= 0; i--) if (m.ev[i].k === 'goal') { sc = m.ev[i].pid; break; } return W.celOf(p.id, p.id === sc); }
    return null; };
};
/* G12: the TV camera is much lower and closer and follows the ball across the pitch (was 21 m high, 38 m behind the touchline) */
const tvCam = (bx, bz, k) => k ? { eye: [bx * 0.8, 21 * k, 34 + 38 * k], at: [bx * 0.93, 0, bz * 0.55] } : { eye: [bx * 0.9, 13, 51], at: [bx * 0.97, 0.6, bz * 0.72] };

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
      if (m.ref) drawRef(v.D, m.ref.px + (m.ref.x - m.ref.px) * a, m.ref.py + (m.ref.y - m.ref.py) * a);
      G3.ball(PX(v.bx), PZ(v.by), v.bh, spin); } };
  return v;
};

// ---------- 🎬 goal replay (no skip). Live: a small live radar stays in the corner and your shouts keep working ----------
const frameAt = (F, fi) => { const i0 = clamp(Math.floor(fi), 0, F.length - 1), i1 = Math.min(F.length - 1, i0 + 1), u = clamp(fi - i0, 0, 1), A = F[i0], B = F[i1];
  if (!B._m) { B._m = {}; B.p.forEach(q => { B._m[q[4]] = q; }); }
  return { rf: A.rf && B.rf ? [lerp(A.rf[0], B.rf[0], u), lerp(A.rf[1], B.rf[1], u)] : null, b: [lerp(A.b[0], B.b[0], u), lerp(A.b[1], B.b[1], u), lerp(A.b[2], B.b[2], u)], p: A.p.map(q => { const r = B._m[q[4]] || q; return { side: q[0], gk: !!q[1], x: lerp(q[2], r[2], u), y: lerp(q[3], r[3], u), id: q[4], num: q[5] }; }) }; };
W.replay = function (F, g, live, liveMode) {
  return new Promise((done) => {
    W._rp = 1; const D = W.dress(live), sc = W.player(g.pid || '', D.S), gi = Math.max(0, F.findIndex(f => f.k >= g.tick)), side = g.side, gx = side === 0 ? 52.5 : -52.5;
    const a0 = Math.max(0, gi - 110), a1 = Math.max(a0, gi - 40), c1 = Math.min(F.length - 1, gi + 30);
    const SEG = [[a0, a1, 1, 'tv'], [a1, gi + 4, 0.55, 'goal'], [gi + 4, c1, 0.9, 'orbit']].filter(s => s[1] > s[0]), dur = SEG.reduce((t, s) => t + (s[1] - s[0]) * 0.05 / s[2], 0);
    const scorerTxt = g.pid ? `${esc(sc.name)} (${esc(D.sh[side])})` : esc(D.sh[side]);
    let host, box; const wrap = document.querySelector('[data-g4]'), sb = document.querySelector('#w11 .sb');
    if (liveMode && wrap) { const top = sb && !sb.closest('.w11side') ? sb.offsetHeight + 8 : 0; host = document.createElement('div'); host.style.cssText = `position:absolute;left:0;right:0;top:${-top}px;height:${wrap.offsetHeight + top}px;z-index:6;border-radius:14px;overflow:hidden;background:#070b18;box-shadow:0 0 26px rgba(255,45,149,.35)`; wrap.appendChild(host); }
    else { host = document.createElement('div'); host.style.cssText = 'position:absolute;inset:0;z-index:40;background:#070b18'; (document.getElementById('w11') || document.body).appendChild(host); }
    host.id = 'w11rp';
    host.innerHTML = `<div id="w11rpb" style="position:absolute;inset:0"></div><div style="position:absolute;left:8px;top:8px;padding:4px 10px;border-radius:999px;font-size:10px;font-weight:900;letter-spacing:.12em;color:#0b0f24;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95)">🎬 REPLAY</div>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:10px 12px;background:linear-gradient(0deg,rgba(7,11,24,.92),rgba(7,11,24,0))"><p style="font-size:16px;font-weight:900">⚽ GOAL! ${scorerTxt} · ${g.min}'</p><p style="font-size:11px;color:#cbd5e1">${esc(D.n[0])} vs ${esc(D.n[1])}</p></div>
      ${liveMode ? '<div style="position:absolute;right:8px;bottom:52px;width:36%;max-width:180px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,.35);box-shadow:0 0 12px rgba(0,0,0,.6)"><canvas id="w11mini" style="border-radius:0;box-shadow:none"></canvas><p style="position:absolute;left:4px;top:2px;font-size:8px;font-weight:900;color:#ff2d95">● LIVE</p></div>' : ''}`;
    box = document.getElementById('w11rpb');
    /* G11: camera changes inside a replay dip through a quick dissolve instead of a hard cut */
    const dip = document.createElement('div'); dip.style.cssText = 'position:absolute;inset:0;background:#070b18;opacity:0;pointer-events:none;transition:opacity .22s ease-out;z-index:2'; host.appendChild(dip);
    const dipNow = () => { dip.style.transition = 'none'; dip.style.opacity = '0.85'; void dip.offsetWidth; dip.style.transition = 'opacity .26s ease-out'; dip.style.opacity = '0'; };
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
        if (cam && s[3] !== cam.m) dipNow(); const k = s[3] === cam?.m ? 1 - Math.exp(-dt * 5) : 1; cam = { eye: sm(k < 1 && cam ? cam.eye : null, tg.eye, k), at: sm(k < 1 && cam ? cam.at : null, tg.at, k), fov: 42, m: s[3] }; return cam; },
      draw() { const f = v3.f; G3.drawWorld(v3.Wd, v3.cel ? Math.abs(Math.sin(v3.t * 9)) * 0.35 : 0);
        drawPlayers(v3.D, f.p, st, v3.dt, (p) => v3.cel && p.side === side && !p.gk ? W.celOf(p.id, p.id === g.pid, v3.t) : null);
        if (f.rf) drawRef(v3.D, f.rf[0], f.rf[1]);
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
        else if (t < P[2]) { const u = (t - P[1]) / (P[2] - P[1]), z0 = Math.min(26, 1.5 * (P[2] - P[1])); at = [0, 1.2, lerp(z0, 2, u)]; eye = [9, 4.5, at[2] + 15]; if (!fired) { fired = 1; G3.burst(parts3, 80, [0, 2, 34], 5); } }
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
          /* G11: the walk-out is a WALK (≈1.5 m/s, walking animation): each player walks straight from the tunnel line to his spot;
             when the walk-out is short (friendlies) they are already on their way in, never sprinting */
          const tx = s ? 1.2 : -1.2, tz = 26 + i * 1.1, dx0 = lx - tx, dist = Math.hypot(dx0, tz), dmax = 1.35 * (P[2] - P[1]) * 0.92, kw = Math.max(0, 1 - dmax / dist), sx = tx + dx0 * kw, sz = tz * (1 - kw);
          let x, z, face = 0, walk = 0; if (t < P[1]) { x = sx; z = sz; }
          else if (t < P[2]) { const u = clamp((t - P[1]) / ((P[2] - P[1]) * 0.92), 0, 1), e = u < 0.1 ? u * u / 0.18 : u > 0.9 ? 1 - (1 - u) * (1 - u) / 0.18 : (u - 0.05) / 0.9; x = lerp(sx, lx, e); z = lerp(sz, 0, e); walk = u < 1 ? 1 : 0; }
          else if (t < P[4]) { x = lx; z = 0; }
          else { /* G11: break from the line and WALK towards the kick-off spot (≤1.6 m/s); the cut to the live match camera does the rest, like TV */
            const gx = PX(k0.x), gz = PZ(k0.y), dd = Math.hypot(gx - lx, gz), tt = Math.max(0, t - P[4] - 0.3), go = Math.min(dd, 1.6 * tt) / Math.max(0.001, dd);
            x = lerp(lx, gx, go); z = lerp(0, gz, go); walk = go > 0 && go < 1 ? 1 : 0; face = go >= 1 ? (s ? -Math.PI / 2 : Math.PI / 2) : 0; }
          list.push({ side: s, gk: i === 0, x: x + 52.5, y: z + 34, id, face, num: p.num, walk }); });
        drawPlayers(v.D, list, st, v.dt, (p) => (p.walk ? { run: 0.2 } : { face: p.face })); if (t >= P[4]) G3.ball(0, 0, 0, 0);
      } else if (mEnd) {
        drawPlayers(v.D, mEnd.P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.x, y: p.y, id: p.id, num: p.num })), st, v.dt, (p) => { const win = ws === p.side, ph = hash(p.id) % 7;
          return win ? Object.assign(W.celOf(p.id, best && p.id === best.id, t), { run: 0 }) : ws === -1 ? { cel: ph % 2 ? 'arms' : null, arms: ph % 2 ? 'up' : '', run: 0 } : { lean: 0.35, run: 0 }; });
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
      drawPlayers(v.D, ids.map((id, i) => { const a = (i - 5) / 5 * 1.25; return { side: 0, gk: i === 0, x: 52.5 + (i === 10 ? 0 : Math.sin(a) * 4.2), y: 34 + (i === 10 ? 1.4 : -Math.cos(a) * 4.2 + 3), id }; }), st, v.dt, (p) => ({ face: 0, cel: p.id === ids[10] ? 'trophy' : 'jump', jump: Math.abs(Math.sin(t * 5 + hash(p.id) % 5)) * 0.45, arms: 'up', run: 0 }));
      const lift = 2.75 + Math.sin(t * 1.6) * 0.12; G3.trophy(0, lift, 1.4, t * 1.2, 0.9);
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
W.W3D_V = 13;
W.w3d = { st: 0 };
W.w3dLoad = function () {
  if (W.w3d.st || !G3.ok() || typeof window === 'undefined') return;
  try { if (localStorage.getItem('w11_3dq') === 'lite') return; const c = document.createElement('canvas'); if (!c.getContext('webgl2')) return; } catch (e) { return; }
  if (navigator.deviceMemory && navigator.deviceMemory < 2) return;
  W.w3d.st = 1; const base = new URL('./', document.baseURI).href;
  import(base + 'w3d.js?v=' + W.W3D_V).then(() => window.W3D.load({ G3, base, v: W.W3D_V, weak: W.weak, tier: W.dev && W.dev.tier, hash, hx, kitN: W.kitN, crestSvg: W.crestSvg, numOf: (id) => { const p = W.player(id, W.S); return p ? p.num : null; }, nameOf: (id) => { const p = W.player(id, W.S); return p ? p.short.replace(/\.$/, '') : ''; }, lookOf: (id) => { const p = W11C.player(id, W.S); return p ? { cult: p.cult } : null; }, atmo: () => (W.atmoNow ? W.atmoNow() : null), mx16: !!W.MX16 }))
    .then(B => { G3.B3 = B; W.w3d.st = 2; }).catch(e => { W.w3d.st = -1; console.warn('3D load', e); });
};


// ---------- 🖥️ G4b · 11 Wonders is played in landscape (16:9). Android: full screen + orientation lock.
// Phones held upright (and iPhones, which never allow a lock) see a "turn your phone" card. The social app stays upright.
const LAND_CSS = `
#w11{padding-left:env(safe-area-inset-left);padding-right:env(safe-area-inset-right)}
#w11 .hd{padding:6px 14px;padding-top:max(6px,env(safe-area-inset-top));min-height:46px}
#w11 .hd b{font-size:15px}#w11 .bk{width:40px;height:40px;font-size:18px}#w11 .chips{font-size:12px;gap:8px}#w11 .chips span{padding:6px 12px}
#w11 .bd{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:12px;align-content:start;align-items:start;padding:12px 16px}
#w11 .bd>*{min-width:0}#w11 .bd>.card{margin-bottom:0}#w11 .bd>:only-child{grid-column:1/-1}
#w11 .btn{padding:15px;font-size:14px}#w11 .btn2{padding:13px;font-size:13px}#w11 .row{padding:10px 6px;font-size:13px}
#w11 .bd>.btn,#w11 .bd>.btn2{align-self:end}
#w11 .bd.mt{display:block;padding:8px 12px;overflow:hidden}
#w11 .w11match{position:relative;display:grid;grid-template-columns:minmax(0,1fr) clamp(190px,24vw,260px);grid-template-rows:auto minmax(0,1fr);gap:8px 10px;height:100%}
#w11 .w11pitch{grid-column:1;grid-row:1/3;position:relative;min-height:0;display:flex;align-items:center;justify-content:center}
#w11 .w11pitch>[data-g4]{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
#w11 .w11pitch canvas{margin:0 auto}
#w11 .w11side{grid-column:2;grid-row:1}#w11 .w11side .sb{margin-bottom:0;padding:8px 12px}
#w11 .w11side2{grid-row:2;display:flex;flex-direction:column;min-height:0;overflow-y:auto}
#w11 .w11side2 .shouts{grid-template-columns:1fr 1fr;gap:8px;margin-top:0}#w11 .w11side2 .shouts button{padding:13px 4px;font-size:12px;border-radius:14px}
#w11 .w11side2 .alert{margin:0 0 8px}#w11 .w11side2 .tick{font-size:11px;flex:1;min-height:40px}#w11 .w11side2 .tip{font-size:10px}
#w11 .w11side2>div[style*="grid-template-columns:1fr 1fr"]{margin-top:8px!important}
#w11cert{align-items:flex-start}#w11cert>div{max-width:min(460px,60vw)}
#w11rot{position:fixed;inset:0;z-index:2147483000;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;background:radial-gradient(circle at 50% 35%,rgba(168,85,247,.35),#070b18 70%);color:#e2e8f0}
#w11rot .ph{width:62px;height:104px;border:4px solid #22d3ee;border-radius:14px;box-shadow:0 0 24px rgba(34,211,238,.5);animation:w11rt 2.2s ease-in-out infinite}
@keyframes w11rt{0%,25%{transform:rotate(0)}55%,100%{transform:rotate(-90deg)}}
@media (orientation:portrait){#w11rot.on{display:flex}}`;
W.land = function () {
  if (!document.getElementById('w11land')) { const st = document.createElement('style'); st.id = 'w11land'; st.textContent = LAND_CSS; document.head.appendChild(st); }
  let r = document.getElementById('w11rot');
  if (!r) { document.body.insertAdjacentHTML('beforeend', `<div id="w11rot"><div class="ph"></div><p style="font-size:20px;font-weight:900;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent">Turn your phone sideways</p><p style="font-size:13px;color:#cbd5e1;max-width:300px">11 Wonders is played in landscape, like a console game. Your match keeps playing.</p><button onclick="W11.landLock()" style="margin-top:6px;padding:12px 18px;border-radius:14px;font-weight:900;color:#0b0f24;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95)">⛶ Full screen</button><button onclick="W11.close()" style="padding:8px 14px;border-radius:12px;font-size:12px;background:rgba(255,255,255,.08)">← Back to SINLESS GG</button></div>`); r = document.getElementById('w11rot'); }
  r.classList.add('on'); W.landLock();
};
W.landLock = function () {
  try { const d = document.documentElement, fs = document.fullscreenElement || document.webkitFullscreenElement;
    const lock = () => { try { const o = screen.orientation; if (o && o.lock) o.lock('landscape').catch(() => {}); } catch (e) {} };
    if (!fs && /Android/i.test(navigator.userAgent || '') && (d.requestFullscreen || d.webkitRequestFullscreen)) { const pr = (d.requestFullscreen || d.webkitRequestFullscreen).call(d, { navigationUI: 'hide' }); if (pr && pr.then) pr.then(lock).catch(() => {}); else lock(); }
    else lock(); } catch (e) {}
};
W.landOff = function () {
  const r = document.getElementById('w11rot'); if (r) r.classList.remove('on');
  try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) {}
  try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (e) {}
};
W.ui = (function (b) { return function () { const first = !document.getElementById('w11'); const r = b.apply(this, arguments); if (first || !document.getElementById('w11land')) W.land(); const bd = document.getElementById('w11b'); if (bd) bd.classList.toggle('mt', !!bd.querySelector('.w11match')); return r; }; })(W.ui);
W.close = (function (b) { return function () { W.landOff(); return b.apply(this, arguments); }; })(W.close);

// ---------- 🔌 hooks into the match screens, home, Club HQ ----------
const _pdraw = Pitch.prototype.draw;
Pitch.prototype.draw = function (m, a) {
  if (this === W._mini) return _pdraw.call(this, m, a);
  if (this === W._pitch) { try { W.g4tick(m, a); } catch (e) { console.warn('G4', e); } if (W._mini) W._mini.draw(m, a); if (W.v3.on && G3.view && G3.view.live) return; }
  return _pdraw.call(this, m, a);
};
W.hold = () => !!(W._cer || W._rp || W._bc || (W.cine && W.cine.cur));
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
  if (e >= 0 && !m.over && !W._cer && !W._bc) W.cineTick(m, live);
  if (W.cine.cur) W.cineStep(m);
  if (m.over && e >= m.endWall() && !W._closeDone && !W._cer && !W._rp && !W._bc && !W.cine.cur) { W._closeDone = true; if (e < m.endWall() + 120) W.ceremony('close', live); }
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
      else if (shot || Math.abs(gx - X) < 9) tg = { eye: [gx - dirx * 7, 2.6, (Z > 0 ? 1 : -1) * 15], at: [X * 0.45 + gx * 0.55, 1.0, Z * 0.5] };
      else { const cx = b.owner ? PX(L(b.owner, 'x')) : X, cz = b.owner ? PZ(L(b.owner, 'y')) : Z; tg = { eye: [cx - dirx * 8.5, 3.4, cz + (cz > 0 ? -3.5 : 3.5)], at: [cx + dirx * 9, 1.0, cz * 0.7] }; }
      const k = cam ? 1 - Math.exp(-dt * 3.2) : 1; cam = { eye: sm(cam && cam.eye, tg.eye, k), at: sm(cam && cam.at, tg.at, k), fov: 46 };
      const scE = document.getElementById('w11cinesc'), mnE = document.getElementById('w11cinemn'), cpE = document.getElementById('w11cinec');
      if (scE) scE.textContent = `${mm.T[0].score}–${mm.T[1].score}`; if (mnE) mnE.textContent = W.minLabel(mm);
      const hit = mm.ev.filter(e => (e.k === 'goal' || e.k === 'save') && e.tick >= c.start).pop();
      if (cpE && hit && cpE.dataset.on !== hit.k + hit.tick) { cpE.dataset.on = hit.k + hit.tick; const pl = hit.k === 'goal' && hit.pid ? W.player(hit.pid, D.S) : null;
        cpE.innerHTML = hit.k === 'goal' ? `<p style="font-size:40px;font-weight:900;letter-spacing:.06em;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent;animation:w11p 1s ease-in-out 3">GOAL!</p><p style="font-size:14px;font-weight:900">⚽ ${pl ? esc(pl.name) : ''} · ${esc(sh[hit.side])}</p>` : `<p style="font-size:30px;font-weight:900;color:#facc15">🧤 SAVE!</p><p style="font-size:13px;font-weight:900">${esc(String(hit.txt).replace(/^🧤 /, ''))}</p>`; }
      return cam; },
    draw() { const mm = v.m, a = clamp(W._alpha == null ? 1 : W._alpha, 0, 1), lo = W.liveOpts(mm), byId = {}; mm.P.forEach(p => { byId[p.id] = p; });
      const scored = mm.ev.some(e => e.k === 'goal' && e.tick >= c.start); G3.drawWorld(v.Wd, scored ? Math.abs(Math.sin(performance.now() / 120)) * 0.35 : 0);
      drawPlayers(v.D, mm.P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.px + (p.x - p.px) * a, y: p.py + (p.y - p.py) * a, id: p.id, num: p.num })), st, v.dt, (q) => lo(byId[q.id]));
      if (mm.ref) drawRef(v.D, mm.ref.px + (mm.ref.x - mm.ref.px) * a, mm.ref.py + (mm.ref.y - mm.ref.py) * a);
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
  /* G13: in 3D mode the live 3D view takes over at once (no flash of the 2D radar while the close-up fades out) */
  if (W.v3.on && document.getElementById('w11l3')) { if (G3.view && G3.view.cine) G3.stop(G3.view); W.v3set(true); if (el) el.style.background = 'transparent'; }
  setTimeout(() => { if (W.cine.cur === c) W.cine.cur = null; if (G3.view && G3.view.cine) G3.stop(G3.view); if (el) el.remove(); if (W.v3.on && document.getElementById('w11l3') && !(G3.view && G3.view.live)) W.v3set(true); }, 620);
};
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🎬 <b>Big moments live in 3D</b>: just before a goal or a big save, the radar turns into a full-screen 3D camera: the run-up, the shot, the net, the celebration. Then it goes back to the radar when play restarts. It is the live match itself, so you never miss anything, and your shout buttons stay on screen.</p>`); }; })(W.helpL);
/* the 2D radar refits when the phone turns or the window changes size */
W.g4match = (function (b) { return function () { b.apply(this, arguments); const box = document.querySelector('#w11 .w11pitch'); if (!box || box._ro || typeof ResizeObserver === 'undefined') return; box._ro = new ResizeObserver(() => { if (W._pitch && document.body.contains(box)) W._pitch.size(); }); box._ro.observe(box); }; })(W.g4match);

// =====================================================================
// ⚽ G5 · new match engine v2 (src/w11eng.js), fresh Season 1, instant join, set-piece takers, player styles.
// build.sh pastes this file into w11.js at the G5 marker.
// =====================================================================
/* 📅 the season start day (fresh Season 1) comes from w11meta/season.ep; cached for a fast start */
W.syncEpoch = async function () {
  try { const f = await fbLoad(), sn = await f.getDoc(f.doc(db(), 'w11meta', 'season')), d = sn.exists() ? sn.data() : {};
    if (d.ep) { CC.setEpoch(d.ep); try { localStorage.setItem('w11_ep', String(d.ep)); } catch (e) {} }
    W.S = CC.clock(W.nowS ? W.nowS() : Date.now()).s; W.meta = d;
    if (d.eng && d.eng > W.ENGINE) toast('🆕 A new 11 Wonders engine is out. Close and reopen SINLESS GG to update.'); } catch (e) {}
};
/* results carry the engine version; old phones are asked to update */
W.api = (function (b) { return async function (path, body) { if (path === '/w11/result') body = { ...(body || {}), ev: W.ENGINE }; const r = await b.call(this, path, body); if (r && r.update && !W._updT) { W._updT = 1; toast('🆕 ' + (r.error || 'Please update 11 Wonders')); } return r; }; })(W.api);

/* 🏠 no waiting: the league home is the home; Boot Camp is optional practice */
W.bootHome = function () { W._boot = 1; try { return W.home(); } finally { W._boot = 0; } };
W.leagueHome = (function (b) { return async function () { const r = await b.apply(this, arguments); try {
  const card = [...document.querySelectorAll('#w11b .card')].find(c => /Join the league/.test(c.innerText));
  if (card) { const h = card.querySelector('p'); if (h) h.textContent = '⚽ Join the league now'; const t = card.querySelectorAll('p')[1]; if (t) t.textContent = "You take over a computer club in a Division 6 group straight away (you keep its points) and play your first league match at your next kick-off time. Top 2 go up, bottom 4 go down. 6 divisions. 1 season = 28 days.";
    if (!(W.me.boot || []).length || (W.me.boot || []).length < 5) card.insertAdjacentHTML('afterend', `<div class="card"><p style="font-weight:900">🏕️ Boot Camp (optional)</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">Five practice matches that teach shouts, subs, formations and cards. You can do them any time, even after joining.</p><button class="btn2" style="margin-top:10px" onclick="W11.bootHome()">🏕️ Open Boot Camp</button></div>`); }
  else if (W.inLeague() && (W.me.boot || []).length < 5) { const last = [...document.querySelectorAll('#w11b .card')].pop(); if (last) last.insertAdjacentHTML('afterend', `<button class="btn2" onclick="W11.bootHome()">🏕️ Boot Camp practice (${(W.me.boot || []).length}/5)</button>`); }
} catch (e) {} return r; }; })(W.leagueHome);
W.createGo = (function (b) { return async function () { const r = await b.apply(this, arguments); const btn = [...document.querySelectorAll('#w11b button')].find(x => /Start Boot Camp/.test(x.textContent)); if (btn) btn.textContent = '⚽ Join the league now'; return r; }; })(W.createGo);

/* 🎯 player styles + set-piece takers (captain, penalties, free kicks, corners) */
const TK = [['cap', '©️ Captain'], ['pen', '🎯 Penalties'], ['fk', '🦶 Free kicks'], ['ck', '🚩 Corners']];
const autoTaker = (ids, k) => { const P = ids.slice(0, 11).map(id => W.player(id)).filter(p => p.pos !== 'GK'); const sc = (p) => { const st = W.styleOf(p); return k === 'pen' ? p.sho + p.ovr * 0.3 : k === 'ck' ? p.pas + (st.fk === 'curl' ? 6 : 0) : k === 'cap' ? p.ovr + p.age * 0.5 : st.set; }; return P.sort((a, b) => sc(b) - sc(a))[0]; };
W.stylesCard = function () {
  const me = W.me; if (!me) return ''; const ids = me.ids || [], tk = me.tk || {}, top = ids.slice(0, 18).map(id => W.player(id));
  const sel = (k, l) => { const auto = autoTaker(ids, k); return `<label style="display:flex;align-items:center;gap:8px;font-size:12px;margin-top:6px"><span style="min-width:96px;font-weight:900">${l}</span><select onchange="W11.setTk('${k}', this.value)" style="flex:1;padding:8px;border-radius:10px;background:#0b1024;color:#fff;border:1px solid rgba(34,211,238,.3)"><option value="">Auto${auto ? ' · ' + esc(auto.short) : ''}</option>${top.filter(p => p.pos !== 'GK' || k === 'cap').map(p => `<option value="${p.id}" ${tk[k] === p.id ? 'selected' : ''}>${esc(p.short)} · ${p.pos} ${p.ovr}${k === 'fk' ? ' · ' + W.styleOf(p).fk : k === 'pen' ? ' · ' + W.STYLE_NAME[W.styleOf(p).pen] : ''}</option>`).join('')}</select></label>`; };
  const st = ids.slice(0, 11).map(id => W.player(id)).filter(p => p.pos !== 'GK').map(p => { const s = W.styleOf(p); return `<p style="font-size:11px;padding:3px 0"><b>${esc(p.short)}</b> <span style="color:#94a3b8">${p.pos}</span> · ${W.STYLE_NAME[s.shot] || ''} · ${W.STYLE_NAME[s.pass] || ''} · ${W.STYLE_NAME[s.pace] || ''}${s.lt ? ' · 💪 Long throw' : ''}</p>`; }).join('');
  return `<div class="card" id="w11tk"><p style="font-weight:900">🎯 Set pieces</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">Pick your takers (only players in your top 18). "Auto" uses your best player for it.</p>${TK.map(([k, l]) => sel(k, l)).join('')}</div>
    <div class="card"><p style="font-weight:900">🧬 Player styles</p><p style="font-size:11px;color:#94a3b8;margin:4px 0 6px">Every player has his own way to score, pass and run. It comes from his stats and never changes.</p>${st}</div>`;
};
W.setTk = async function (k, v) { const me = W.me, tk = { ...(me.tk || {}) }; if (v) tk[k] = v; else delete tk[k]; const r = await W.api('/w11/tk', { tk }); if (r && r.ok) { me.tk = r.tk; toast('✅ Saved'); } else toast('⚠️ ' + ((r && r.error) || 'Try again')); };
W.squad = (function (b) { return function () { const r = b.apply(this, arguments); try { const cards = document.querySelectorAll('#w11b .card'); const last = cards[cards.length - 1]; if (last && !document.getElementById('w11tk')) last.insertAdjacentHTML('afterend', W.stylesCard()); } catch (e) {} return r; }; })(W.squad);

/* 📊 full-time and half-time: corners, offsides, fouls too */
const moreStats = (m) => { if (!m || !m.T) return ''; const a = m.T[0], b = m.T[1]; return ` · Corners ${a.corners || 0}–${b.corners || 0} · Offsides ${a.offs || 0}–${b.offs || 0} · Fouls ${a.fouls || 0}–${b.fouls || 0}`; };
const addStats = (m) => { try { const p = [...document.querySelectorAll('#w11b p')].find(x => /^Possession \d+%/.test(x.textContent) && !x.dataset.g5); if (p) { p.dataset.g5 = 1; p.textContent += moreStats(m); } } catch (e) {} };
W.finish = (function (b) { return async function (live, m) { const r = await b.apply(this, arguments); addStats(m); return r; }; })(W.finish);
W.finishL = (function (b) { return async function (live) { const r = await b.apply(this, arguments); addStats(W.m); return r; }; })(W.finishL);

/* 🛠️ owner only: start a fresh Season 1 with the new engine (admin list checked by the worker too) */
W.isOwner = async function () { if (/w11admin/.test(location.hash || '')) return true; try { const f = await fbLoad(), sn = await f.getDoc(f.doc(db(), 'config', 'admins')); return !!(sn.exists() && (sn.data().uids || []).includes(uidNow())); } catch (e) { return false; } };
W.freshSeason = async function () {
  if (!confirm('Start a FRESH Season 1 now? All league tables, results, cups and the Hall of Fame are wiped. Clubs, squads, money, GG Coins and Pioneers stay.')) return;
  toast('⏳ Starting fresh Season 1…'); let r = null; for (let i = 0; i < 8; i++) { r = await W.api('/w11/fresh', {}); if (!r || !r.ok || !r.more) break; }
  if (!r || !r.ok) return toast('⚠️ ' + ((r && r.error) || 'Failed, try again'));
  toast('✅ Fresh Season 1 has started! Everyone can join now.'); try { localStorage.removeItem('w11_ep'); } catch (e) {} await W.syncEpoch(); await W.load(); W.G = null; W.leagueHome();
};
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">⚖️ <b>Full football rules</b>: throw-ins, corners, goal kicks, offside, direct and indirect free kicks (with walls), penalties, advantage, yellow and red cards (last-man fouls), added time. Pick your penalty, free-kick and corner takers and your captain in 👕 Squad.</p>
    <p style="margin-top:6px">🧬 <b>Player styles</b>: 💥 screamers shoot from distance, 🦊 poachers live in the box, 🌀 curlers bend it in, ⚡ dribbler-finishers beat a man and shoot. Passers, tempo controllers and runners differ too.</p>`);
  W.isOwner().then(ok => { if (ok && document.getElementById('w11b')) document.getElementById('w11b').insertAdjacentHTML('beforeend', `<div class="card"><p style="font-weight:900">🛠️ Owner</p><button class="btn2" style="margin-top:8px" onclick="W11.freshSeason()">🔄 Start a fresh Season 1 (new engine)</button></div>`); }); }; })(W.helpL);
/* Boot Camp is optional now: it never blocks friendlies; league and cup locks still apply */
W.lockdown = function () { return W.leagueLock ? W.leagueLock() : null; };

// =====================================================================
// 🧬 G4c · looks, positions, renames, device profiling (build.sh pastes this file into w11.js at the G4c marker).
// =====================================================================

/* ---------- ⚙️ device check: graphics chip, CPU cores, memory + a short speed test → quality tier ---------- */
W.dev = (function () {
  const d = { cores: 0, mem: 0, gpu: '', bench: 0, tier: 'mid', auto: 'mid', pick: 'auto' };
  try { d.cores = navigator.hardwareConcurrency || 0; d.mem = navigator.deviceMemory || 0; } catch (e) {}
  try { const c = document.createElement('canvas'), gl = c.getContext('webgl2') || c.getContext('webgl'); if (gl) { const x = gl.getExtension('WEBGL_debug_renderer_info'); d.gpu = String(x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || ''); const lc = gl.getExtension('WEBGL_lose_context'); if (lc) lc.loseContext(); } } catch (e) {}
  /* a quick speed test (~120 ms of maths): phones that hide their chip or memory are judged by this */
  try { const t0 = performance.now(); let n = 0, a = 1.0001; while (performance.now() - t0 < 120) { for (let i = 0; i < 20000; i++) a = Math.sqrt(a * 1.0001 + i) * 0.5 + 1; n++; } d.bench = n; d._a = a; } catch (e) {}
  const g = d.gpu.toLowerCase();
  const gHigh = /adreno[^0-9]*(7[3-9]\d|8\d\d)|mali-g(7[1-9]|[89]\d|\d{3})|immortalis|xclipse|apple (m\d|a1[5-9])|geforce|radeon (rx|pro)|nvidia/.test(g);
  const gLow = /adreno[^0-9]*([2-5]\d\d|6[0-1]\d)|mali-(4|t|g[0-5]\d\b)|powervr|swiftshader|llvmpipe|softpipe|intel\(r\) hd graphics [2-5]/.test(g);
  let score = 0;
  score += d.cores >= 8 ? 2 : d.cores >= 6 ? 1 : d.cores && d.cores <= 4 ? -2 : 0;
  score += d.mem >= 6 ? 2 : d.mem >= 4 ? 1 : d.mem && d.mem <= 2 ? -3 : d.mem && d.mem <= 3 ? -1 : 0;
  score += gHigh ? 2 : gLow ? -3 : 0;
  score += d.bench >= 40 ? 2 : d.bench >= 22 ? 1 : d.bench && d.bench < 10 ? -2 : 0;
  d.auto = score >= 5 ? 'high' : score >= 0 ? 'mid' : 'low';
  try { d.pick = localStorage.getItem('w11_gfx') || 'auto'; } catch (e) {}
  d.tier = ['high', 'mid', 'low'].includes(d.pick) ? d.pick : d.auto;
  return d;
})();
/* the cheapest phones keep the 2D radar by default and draw at 30 fps; everything else stays the same for everyone */
W.weak = W.dev.tier === 'low';
W.gfxName = { auto: '🤖 Auto', high: '🔥 High', mid: '⚖️ Mid', low: '🔋 Low' };
W.gfxSet = function (k) { try { localStorage.setItem('w11_gfx', k); } catch (e) {} toast(`${W.gfxName[k]} graphics. Close and reopen 11 Wonders to use it.`); W.hq && W.hq(); };
W.gfxCard = () => `<div class="card" id="w11gfx"><p style="font-weight:900">⚙️ Graphics</p><p style="font-size:11px;color:#94a3b8;margin:4px 0 8px">Auto checks your phone (chip, memory, a quick speed test) and keeps adjusting while you play. Matches, rules, kits and players are the same on every setting; only background detail changes (crowd, shadows, sharpness). This phone: <b>${W.gfxName[W.dev.auto]}</b>.</p>${W.gfxStatus()}<div style="display:flex;gap:6px;flex-wrap:wrap">${['auto', 'high', 'mid', 'low'].map(k => `<button onclick="W11.gfxSet('${k}')" style="flex:1;padding:8px;border-radius:10px;font-size:12px;font-weight:900;${W.dev.pick === k || (k === 'auto' && !['high', 'mid', 'low'].includes(W.dev.pick)) ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.06)'}">${W.gfxName[k]}</button>`).join('')}</div></div>`;
/* G11: which players does this phone show? New MakeHuman athletes, or the old ones (with the reason and a retry) */
W.gfxStatus = () => { const st = W.w3d.st, B = G3.B3, I = st === 2 && B && B.mhInfo ? B.mhInfo() : null;
  const line = (ok, t) => `<p style="font-size:11px;margin:0 0 8px;padding:6px 8px;border-radius:10px;background:${ok ? 'rgba(34,211,238,.1)' : 'rgba(250,204,21,.1)'}">${t}</p>`;
  if (st === 1 || st === 0) return line(true, '⏳ Players: loading the 3D athletes…');
  if (st === -1 || !I) return line(false, `⚠️ 3D is off on this phone, matches use the 2D radar. <button onclick="W11.mhRetry()" style="margin-left:6px;padding:3px 8px;border-radius:8px;background:rgba(255,255,255,.1);font-weight:900">Retry</button>`);
  return I.ok ? line(true, `✅ Players: new athletes${I.hero ? ' + close-ups' : ''}`) : line(false, `⚠️ Players: old version. The new files didn't load (${esc(I.err || 'unknown')}). <button onclick="W11.mhRetry()" style="margin-left:6px;padding:3px 8px;border-radius:8px;background:rgba(255,255,255,.1);font-weight:900">Retry</button>`); };
W.mhRetry = async () => { try { const ks = await caches.keys(); for (const k of ks) { const c = await caches.open(k); for (const q of await c.keys()) if (/w3d|basis_transcoder/.test(q.url)) await c.delete(q); } } catch (e) {} try { localStorage.removeItem('w11_3dq'); } catch (e) {} location.reload(); };
W.hq = (function (b) { return function () { const r = b.apply(this, arguments); try { const bd = document.querySelector('#w11b'); if (bd && !document.getElementById('w11gfx')) bd.insertAdjacentHTML('beforeend', W.gfxCard()); } catch (e) {} return r; }; })(W.hq);

/* ---------- 😤 reactions in 3D: near-miss disbelief, keeper shouting, fierce duels, despair ---------- */
W.liveOpts = (function (b) { return function (m) { const f0 = b(m), hsh = (s) => hash(String(s)), R = {};
  for (let i = m.ev.length - 1; i >= 0 && i > m.ev.length - 16; i--) { const e = m.ev[i]; if (e.tick == null || m.tick - e.tick > 60) break;
    if (e.k === 'miss' && e.near) { R['h' + e.side] = R['h' + e.side] || e; R['y' + (1 - e.side)] = R['y' + (1 - e.side)] || e; }
    if (e.k === 'goal') R['y' + (1 - e.side)] = R['y' + (1 - e.side)] || e;
    if ((e.k === 'tackle' || e.k === 'duel' || e.k === 'foul') && e.pid != null && m.tick - e.tick < 24) R['f' + e.pid] = 1; }
  return (p) => { const o = f0(p); if (o && (o.kick || o.dive || o.throwIn != null || o.catch || o.slide || o.header || o.arms)) return o;
    const t = m.tick;
    if (R['f' + p.id]) return Object.assign({}, o || {}, { fierce: 1 });
    const hm = R['h' + p.side]; if (hm && p.role !== 'GK' && (p.id === hm.pid || hsh(p.id + ':nm') % 3 === 0)) return Object.assign({}, o || {}, { hands: Math.min(1, (t - hm.tick) / 10) });
    const ye = R['y' + p.side]; if (ye && (p.role === 'GK' && hsh(p.id + ':' + ye.tick) % 3 !== 0 || p.id === (W._capOf && W._capOf(p.side)))) return Object.assign({}, o || {}, { yell: 1 });
    return o; }; }; })(W.liveOpts);

/* ---------- 🧩 Squad: best fit + player menu (positions, training, rename) ---------- */
W.bestFitGo = async function () { const me = W.me, ids = W.bestFit(me.ids, me.form, W.S, W.lpOf(me), me.fp); if (ids.join() === me.ids.join()) return toast('✅ Everyone is already in his best spot'); await W.save({ ids, ovr: W.avg(ids) }); toast('🧩 Starters moved to their best spots'); W.squad(); };
W.squad = (function (b) { return function () { const r = b.apply(this, arguments); try { const cards = document.querySelectorAll('#w11b .card'); const xi = [...cards].find(c => /Starting XI/.test(c.innerText));
  if (xi && !document.getElementById('w11bf')) xi.insertAdjacentHTML('afterbegin', `<div id="w11bf" style="display:flex;gap:6px;align-items:center;margin-bottom:8px"><button class="btn2" style="flex:1;padding:9px" onclick="W11.bestFitGo()">🧩 Best fit</button><span style="flex:2;font-size:10px;color:#94a3b8">Spot colour: <b style="color:#22d3ee">own spot</b> · <b style="color:#facc15">a bit weaker</b> · <b style="color:#ff2d95">much weaker</b>. Tap ⋯ to train a new position or rename.</span></div>`); } catch (e) {} return r; }; })(W.squad);
W.trnLeft = (t) => { const ms = Math.max(0, Number(t.end) - W.nowS()), d = Math.floor(ms / 86400000), h = Math.ceil((ms % 86400000) / 3600000); return d ? `${d} day${d > 1 ? 's' : ''} ${h} h` : `${h} h`; };
W.pMenu = function (id) {
  const me = W.me, p = W.player(id), main = W11C.dpOf(p), known = W11C.knownPos(me, id, W.S, W.nowS()), extra = known.slice(1), t = me.trn && Number(me.trn.end) > W.nowS() ? me.trn : null, mine = t && t.id === id;
  const can = W11C.DPOS.filter(x => W11C.canLearn(main, x) && !known.includes(x)), full = extra.length >= W11C.LEARN_MAX, g = W11C.gidOf(id, W.S), renamed = !!(me.rn && me.rn[g]);
  const chip = (x, on) => `<span style="display:inline-block;padding:4px 9px;margin:2px;border-radius:9px;font-size:11px;font-weight:900;background:${on ? 'linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'rgba(255,255,255,.08)'}" title="${W11C.DPOS_NAME[x]}">${x}</span>`;
  const days = W11C.learnDays(g);
  let train = '';
  if (mine) train = `<p style="font-size:12px;margin-top:6px">📚 Learning <b>${t.to}</b> · ready in <b>${W.trnLeft(t)}</b></p>${Number(t.end) - W.nowS() > W11C.LEARN_FAST_DAYS * 86400000 ? `<button class="btn" style="margin-top:8px" onclick="W11.learnFast()">⚡ Finish in ${W11C.LEARN_FAST_DAYS} days · ${W11C.LEARN_FAST} 🪙</button>` : ''}<button class="btn2" style="margin-top:6px" onclick="W11.learnCancel()">Stop training</button>`;
  else if (p.pos === 'GK') train = `<p style="font-size:11px;color:#94a3b8;margin-top:6px">Goalkeepers stay in goal.</p>`;
  else if (full) train = `<p style="font-size:11px;color:#94a3b8;margin-top:6px">He already knows ${W11C.LEARN_MAX} extra positions (the most).</p>`;
  else if (t) train = `<p style="font-size:11px;color:#94a3b8;margin-top:6px">${esc(W.player(t.id).name)} is training now (one player at a time). Ready in ${W.trnLeft(t)}.</p>`;
  else if (!can.length) train = `<p style="font-size:11px;color:#94a3b8;margin-top:6px">No nearby position left to learn.</p>`;
  else train = `<p style="font-size:11px;color:#94a3b8;margin-top:6px">Free training takes about <b>${days} days</b> for him (some players learn faster than others). You can finish it in ${W11C.LEARN_FAST_DAYS} days for ${W11C.LEARN_FAST} 🪙 GG Coins.</p><div style="margin-top:6px">${can.map(x => `<button onclick="W11.learn('${id}','${x}')" style="padding:7px 11px;margin:3px;border-radius:10px;font-weight:900;background:rgba(34,211,238,.15)" title="${W11C.DPOS_NAME[x]}">📚 ${x}</button>`).join('')}</div>`;
  let ov = document.getElementById('w11pm'); if (!ov) { ov = document.createElement('div'); ov.id = 'w11pm'; (document.getElementById('w11') || document.body).appendChild(ov); }
  ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(5,7,18,.94);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:max(14px,env(safe-area-inset-top)) 14px 24px';
  ov.innerHTML = `<div class="card" style="max-width:560px;margin:0 auto;text-align:left"><p style="font-weight:900;font-size:15px">${p.flag} ${esc(p.name)} <span style="color:#94a3b8;font-size:12px">· ${p.ovr} · ${p.age}y · #${p.num}</span></p>
    <p style="font-size:12px;margin-top:8px;font-weight:900">Positions</p><div>${known.map((x, i) => chip(x, i === 0)).join('')}</div><p style="font-size:10px;color:#94a3b8">${W11C.DPOS_NAME[main]} is his own spot. He can learn up to ${W11C.LEARN_MAX} nearby spots, one at a time. Never to a far line (a winger can't become a defender).</p>
    ${train}
    <p style="font-size:12px;margin-top:12px;font-weight:900">✏️ Name & country</p>${renamed ? `<p style="font-size:11px;color:#94a3b8">Already renamed (once per player).</p>` : `<p style="font-size:11px;color:#94a3b8">You can change his name and country once. Real footballers' names can't be used.</p><input id="w11rnN" maxlength="24" value="${esc(p.name)}" style="width:100%;margin-top:6px;padding:10px;border-radius:10px;background:rgba(255,255,255,.06);color:#fff;border:1px solid rgba(255,255,255,.15)"><select id="w11rnC" style="width:100%;margin-top:6px;padding:10px;border-radius:10px;background:#0f172a;color:#fff">${W.countryOpts(W.cultCountry[p.cult])}</select><button class="btn" style="margin-top:8px" onclick="W11.renameGo('${id}')">Save name (once)</button>`}
    <button class="btn2" style="margin-top:12px" onclick="W11.ovClose()">Close</button></div>`;
};
W.ovClose = () => { const o = document.getElementById('w11pm'); if (o) o.remove(); };
W.cultCountry = { gh: 'GH', ng: 'NG', ea: 'KE', za: 'ZA', fr: 'FR', ar: 'MA', cn: 'CN', jp: 'JP', kr: 'KR', in: 'IN', en: 'EN', es: 'ES', pt: 'BR', it: 'IT', de: 'DE', nl: 'NL', ee: 'PL', la: 'MX', ca: 'JM', tr: 'TR' };
W.countryOpts = function (sel) { let dn = null; try { dn = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) {}
  const special = { EN: 'England', SC2: 'Scotland', WA: 'Wales', NIR: 'Northern Ireland', XK: 'Kosovo' };
  return W11C.COUNTRIES.map(c => [c, special[c] || (dn ? (() => { try { return dn.of(c); } catch (e) { return c; } })() : c)]).sort((a, b) => a[1].localeCompare(b[1])).map(([c, n]) => `<option value="${c}"${c === sel ? ' selected' : ''}>${W.flagOf(c)} ${esc(n)}</option>`).join(''); };
W.learnApply = function (r) { if (!r || !r.ok) { toast('⚠️ ' + ((r && r.error) || 'Try again')); return false; } if (r.lp) W.me.lp = r.lp; if ('trn' in r) W.me.trn = r.trn; if (r.gems != null) W.me.gems = r.gems; W.chips && W.chips(); return true; };
W.learn = async function (id, pos) { if (!confirm(`Start training ${W.player(id).name} as ${W11C.DPOS_NAME[pos]} (${pos})? It's free and takes about ${W11C.learnDays(W11C.gidOf(id, W.S))} days.`)) return; if (W.learnApply(await W.api('/w11/learn', { id, pos }))) { toast('📚 Training started'); W.ovClose(); W.squad(); } };
W.learnFast = async function () { if ((W.me.gems || 0) < W11C.LEARN_FAST) return toast(`⚠️ You need ${W11C.LEARN_FAST} 🪙 GG Coins`); if (!confirm(`Use ${W11C.LEARN_FAST} 🪙 GG Coins to finish the training in ${W11C.LEARN_FAST_DAYS} days?`)) return; if (W.learnApply(await W.api('/w11/learn', { fast: 1 }))) { toast(`⚡ Ready in ${W11C.LEARN_FAST_DAYS} days`); W.ovClose(); W.squad(); } };
W.learnCancel = async function () { if (!confirm('Stop this training? The days already done are lost.')) return; if (W.learnApply(await W.api('/w11/learn', { cancel: 1 }))) { W.ovClose(); W.squad(); } };
W.renameGo = async function (id) {
  const n = W11C.cleanPName(document.getElementById('w11rnN').value), c = document.getElementById('w11rnC').value, bad = W11C.nameProblem(n); if (bad) return toast('⚠️ ' + bad);
  if (!confirm(`Rename to "${n}" ${W.flagOf(c)}? You can only do this once for this player.`)) return;
  const r = await W.api('/w11/rename', { id, n, c }); if (!r || !r.ok) return toast('⚠️ ' + ((r && r.error) || 'Try again'));
  W.me.rn = r.rn; W.addRN(r.rn); toast('✏️ Saved'); W.ovClose(); W.squad();
};
/* help */
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (el) el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🧩 <b>Positions</b>: every player has his own spot (DL DC DR · ML MC MR · AML AMC AMR · ST). Out of his spot he plays weaker. He can learn 2 nearby spots (free, half to a full season; or ${W11C.LEARN_FAST} 🪙 to finish in ${W11C.LEARN_FAST_DAYS} days). "🧩 Best fit" puts your starters in their best spots.</p>`); }; })(W.helpL);

// =====================================================================
// 🌍 G6 · 11 WONDERS: world zones + local kick-off times, weather that changes play (engine 4), atmosphere
// (crowd reactions, touchline managers, weather, lighting, tournament balls), TV graphics, manager designer.
// build.sh pastes this file into w11.js at the G6 marker. The 3D side lives in src3d/w3d.js (section "G6").
// =====================================================================
/* 🌍 this phone's time zone (minutes east of GMT) and climate (from the time zone name) */
W.myOf = () => { try { return CC.cleanOf(-new Date().getTimezoneOffset()); } catch (e) { return 0; } };
W.myTz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { return ''; } };
W.myCz = () => CC.climFromTz(W.myTz());
W.myZone = () => { const me = W.me, S = W.S; if (me && me.lg && me.lg.s === S && me.lg.z != null) return Number(me.lg.z); if (me && me.zn != null) return Number(me.zn); return CC.zoneOf(W.myOf()); };
const zoneTxt = (z) => CC.ZONE_FLAG[z] + ' ' + CC.ZONE_NAME[z];
/* join with the phone's time zone (your zone decides your league ladder) */
W.joinL = async function (sl) {
  toast('⏳ Finding your group…');
  const r = await W.api('/w11/join', { sl, of: W.myOf(), cz: W.myCz() });
  if (!r.ok) return toast('⚠️ ' + (r.error || 'Could not join. Try again.'));
  await W.load(); W.G = null;
  const zt = r.z != null ? ' · ' + zoneTxt(r.z) : '';
  if (r.wait) toast(`✅ You're in${zt}! Your league starts in Season ${r.wait}.`); else toast(`✅ Welcome to Division 6${zt}! First match: matchday ${r.from}.`);
  W.leagueHome();
};
/* the phone tells the server quietly when its time zone or climate changed (used for your next matches) */
W.load = (function (b) { return async function () { const r = await b.apply(this, arguments); try {
  const me = W.me; if (me && !W._tzSent && (me.of !== W.myOf() || me.cz !== W.myCz())) { W._tzSent = 1; W.api('/w11/tz', { of: W.myOf(), cz: W.myCz() }).then(x => { if (x && x.ok) { me.of = x.of; me.cz = x.cz; } }).catch(() => {}); }
} catch (e) {} return r; }; })(W.load);

/* 🌦️ weather + local time of a league / cup match (same on every phone) */
const hourAt = (ms, of) => ((((Number(ms) / 60000 + (Number(of) || 0)) % 1440) + 1440) % 1440) / 60;
const hourHere = (ms) => { const d = new Date(ms || Date.now()); return d.getHours() + d.getMinutes() / 60; };
const hhmm = (h) => String(Math.floor(h)).padStart(2, '0') + ':' + String(Math.round((h % 1) * 60) % 60).padStart(2, '0');
W.liveFrom = (function (b) { return function (mid, M) { const live = b.apply(this, arguments); try {
  const s0 = M.s0 || {}, wx = CC.wxOf(mid, s0.cz, M.ko); live.home.wx = wx; live.wx = wx; live.tod = hourAt(M.ko, s0.of != null ? s0.of : CC.ZONE_OF[CC.aiZone(M.h)]);
} catch (e) {} return live; }; })(W.liveFrom);
/* friendlies + Boot Camp: your own weather and your own clock */
W.play = (function (b) { return function (live) { try { if (live && !live.M && live.home && live.home.wx === undefined) {
  live.home.wx = CC.wxOf('fr:' + live.seed, W.myCz(), live.startAt || Date.now()); live.wx = live.home.wx; live.tod = hourHere(live.startAt);
  try { localStorage.setItem('w11_live', JSON.stringify(live)); } catch (e) {} } } catch (e) {} return b.apply(this, arguments); }; })(W.play);
/* forecast for a league fixture (before the lock): home club's climate */
W.forecast = function (G, md, hp, id, ko) { const u = G.users && G.users[hp], ci = CC.seatClub(G, hp, md), cz = u && CC.isUserAt(G, hp, md) && u.cz != null ? u.cz : CC.aiClim(ci); return CC.wxOf(id, cz, ko); };
W.leagueHome = (function (b) { return async function () { const r = await b.apply(this, arguments); try {
  const bd = document.getElementById('w11b'); if (!bd) return r;
  if (!W.inLeague()) { const card = [...bd.querySelectorAll('.card')].find(c => /kick-off time/i.test(c.innerText)); if (card && !card.dataset.g6) { card.dataset.g6 = 1; const z = CC.zoneOf(W.myOf());
      card.insertAdjacentHTML('beforeend', `<p style="font-size:11px;color:#67e8f9;margin-top:10px">🌍 Your zone: <b>${zoneTxt(z)}</b> (from your phone's time zone). You play managers near your time, at your own local kick-off time.</p>`); } return r; }
  const G = W.G, n = G && W.nextMatch(G), lc = document.getElementById('w11lc');
  if (n && lc && !document.getElementById('w11fc')) { const wx = W.forecast(G, n.md, n.hp, n.id, n.ko); lc.parentNode.insertAdjacentHTML('afterend', `<p id="w11fc" style="font-size:11px;color:#cbd5e1;margin-top:4px">🌦️ Forecast: <b>${CC.wxLabel(wx)}</b>${wxTip(wx)}</p>`); }
} catch (e) {} return r; }; })(W.leagueHome);
const wxTip = (wx) => { const F = CC.wxFx(wx); return F.wet ? ' · slippery: passes and first touches go wrong more often' : F.snow ? ' · slow, heavy pitch' : F.wind ? ' · long balls and long shots drift' : F.heat ? ' · players tire faster: rotate your squad' : ''; };

/* =================== 🏟️ atmosphere for the 3D (read every frame by w3d.js through ctx.atmo) =================== */
const B6 = { mgSpec: (raw, kit, ci) => { const m = CC.cleanMgr(raw || CC.mgrOf(ci == null ? 0 : ci)); return { ...m, c: CC.COLORS[m.col] || '#0b1f4d', c1: (kit && kit.c1) || '#22d3ee', c2: (kit && kit.c2) || '#ffffff', seed: ci == null ? 0 : ci }; } };
W.mgSpec = B6.mgSpec;
const atBase = (live) => {
  if (live._at) return live._at; const D = W.dress(live), M = live.M;
  const fin = !!(M && M.cup && M.rn === 'Final'), big = fin || !!(M && M.cup === 'cl' && M.cr > CC.CL_GR), kind = M ? (M.cup || 'lg') : 'fr';
  const mg = [0, 1].map(i => { const sh = M && M['s' + i], ci = D.ci[i]; const raw = sh && sh.mg ? sh.mg : !M && i === 0 && W.me && W.me.mgr ? W.me.mgr : null; return B6.mgSpec(raw, D.k[i], ci); });
  live._at = { tod: live.tod != null ? live.tod : hourHere(live.startAt), wx: (live.home && live.home.wx) || null, ball: CC.ballOf(kind, D.S, fin), mg, mc: [D.k[0], D.k[1]].map(k => ({ c1: k.c1, c2: k.c2 })), rc: W.refColor(D),
    tifo: big ? { c1: D.k[0].c1, c2: D.k[0].c2 || '#ffffff', sh: D.sh[0] } : null, fin, big };
  return live._at;
};
const evScan = (m) => { const T = m.tick, o = { shout: [null, null] }; for (let i = m.ev.length - 1; i >= 0; i--) { const e = m.ev[i], d = T - (e.tick == null ? T : e.tick); if (d > 240) break;
    if (!o.goal && e.k === 'goal' && d < 170) o.goal = [e, d]; if (!o.near && ((e.k === 'miss' && e.near) || e.k === 'save') && d < 45) o.near = [e, d];
    if (!o.card && (e.k === 'yellow' || e.k === 'red') && d < 70) o.card = [e, d]; if (e.k === 'shout' && d < 50 && e.side != null && !o.shout[e.side]) o.shout[e.side] = [e, d]; if (!o.sub && e.k === 'sub' && d < 140) o.sub = [e, d]; } return o; };
const calmCrowd = () => ({ st: [0.08, 0.08], ar: [0, 0], jp: [0, 0], hd: [0, 0], sc: [0, 0], wave: 0, tifo: null });
W.atmoNow = function () {
  const live = W.live, v = G3.view, match = live && (W._cer || W._rp || (v && (v.live || v.cine)));
  if (!match) return { tod: hourHere(), wx: null, key: 'hq' };
  const A = atBase(live), m = W.m, crowd = calmCrowd(), ma = [{ k: 'idle' }, { k: 'idle' }]; let sub = null, smoke = null, plinth = false;
  if (W._cer === 'open') { const t = (performance.now() - (W._cerT0 || 0)) / 1000, long = live.kind === 'league'; crowd.st = [1, 1]; crowd.sc = [1, 1]; crowd.ar = [0.35, 0.35];
    if (A.big && t < (long ? 36 : 9)) { crowd.tifo = A.tifo; smoke = { t: W._cerWall || Date.now(), end: 2 }; } plinth = A.fin && t < (long ? 28 : 7.5); ma[0].k = ma[1].k = 'clap'; }
  else if (W._cer === 'close' && m) { const ws = m.T[0].score > m.T[1].score ? 0 : m.T[1].score > m.T[0].score ? 1 : -1;
    for (let s = 0; s < 2; s++) { if (ws === s) { crowd.st[s] = 1; crowd.jp[s] = 1; crowd.ar[s] = 1; crowd.sc[s] = 1; ma[s].k = 'cheer'; } else if (ws === -1) { crowd.st[s] = 0.7; crowd.ar[s] = 0.4; ma[s].k = 'clap'; } else { crowd.st[s] = 0.1; crowd.hd[s] = 0.5; ma[s].k = 'despair'; } } }
  else if (W._rp && v && v.cel != null && W._rpG) { const s = W._rpG.side; if (v.cel) { crowd.st[s] = 1; crowd.jp[s] = 1; crowd.ar[s] = 1; crowd.sc[s] = 1; crowd.hd[1 - s] = 0.7; ma[s].k = 'cheer'; ma[1 - s].k = 'despair'; } else crowd.st[s] = 0.7; }
  else if (m) {
    const E = evScan(m), b = m.ball, poss = b.owner ? b.owner.side : null;
    if (poss === 0 && b.x > 80) crowd.st[0] = 0.6; if (poss === 1 && b.x < 25) crowd.st[1] = 0.6;
    if (E.near) { const e = E.near[0], s = e.k === 'save' ? 1 - e.side : e.side; crowd.st[s] = 1; crowd.hd[s] = 1; crowd.st[1 - s] = 0.5; if (E.near[1] < 30) ma[s].k = 'despair'; }
    if (E.card) { const e = E.card[0]; crowd.st[1 - e.side] = Math.max(crowd.st[1 - e.side], 0.6); crowd.ar[1 - e.side] = 0.3; ma[e.side].k = 'argue'; }
    for (let s = 0; s < 2; s++) if (E.shout[s]) ma[s].k = 'shout';
    if (E.goal) { const [e, d] = E.goal, s = e.side; crowd.st[s] = 1; crowd.jp[s] = 1; crowd.ar[s] = 1; crowd.sc[s] = 1; crowd.st[1 - s] = 0.12; crowd.hd[1 - s] = d < 50 ? 0.8 : 0; crowd.hd[s] = 0;
      ma[s].k = d < 90 ? 'cheer' : 'clap'; ma[1 - s].k = d < 70 ? 'despair' : ma[1 - s].k; if (A.big || A.fin) smoke = { t: Date.now() - d * 50, end: s === 1 ? 1 : 0 }; }
    if (E.sub) { const e = E.sub[0], L = m.T[e.side] && m.T[e.side].subLog, x = L && L[L.length - 1]; if (x) { const po = W.player(x[0], m.S), pn = W.player(x[1], m.S); sub = { out: (po && po.num) || '', inn: (pn && pn.num) || '' }; } }
    const mn = m.minute ? m.minute() : 0, lead = m.T[0].score - m.T[1].score; if (!E.goal && ((mn >= 70 && lead >= 2) || (mn >= 84 && lead >= 1))) crowd.wave = 1;
  }
  return { key: String(live.mid || live.seed || ''), tod: A.tod, wx: A.wx, ball: A.ball, mg: A.mg, mc: A.mc, rc: A.rc, crowd, ma, sub, smoke, plinth };
};
/* ceremonies: remember when they started (for the tifo, smoke and the ball on its stand); weather + local time chip */
const ballName = (b) => b ? ({ lg: '⚽ League ball', oc: '🏆 Open Cup ball', cl: '⭐ Champions League ball', fr: '⚽ Friendly ball', final: '🥇 Gold final ball' }[b.kind] || '') : '';
W.ceremony = (function (b) { return function (kind, live) { W._cerT0 = performance.now(); W._cerWall = Date.now(); const r = b.apply(this, arguments); try {
  if (kind === 'open') { const o = document.getElementById('w11cer'), A = atBase(live); if (o && !document.getElementById('w11cwx')) o.insertAdjacentHTML('beforeend', `<div id="w11cwx" style="position:absolute;right:12px;top:12px;padding:7px 12px;border-radius:999px;font-size:11px;font-weight:900;background:rgba(7,11,24,.7);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.14);pointer-events:none">${A.wx ? CC.wxLabel(A.wx) + ' · ' : ''}🕘 ${hhmm(A.tod)} local · ${ballName(A.ball)}</div>`); }
} catch (e) {} return r; }; })(W.ceremony);

/* =================== 📺 TV graphics: score box, added time, pop-ups (goals, cards, subs), replay wipe =================== */
const TV_CSS = `
.w11bug{position:absolute;z-index:8;display:flex;align-items:center;gap:6px;padding:4px 8px 4px 4px;border-radius:10px;background:rgba(7,11,24,.82);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.14);box-shadow:0 0 14px rgba(0,0,0,.45);font-size:12px;font-weight:900;pointer-events:none;color:#fff}
.w11bug .cp{font-size:8px;letter-spacing:.12em;padding:3px 6px;border-radius:7px;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);color:#070b18}
.w11bug .sc{min-width:40px;text-align:center;font-size:15px;padding:0 4px;border-radius:6px;background:rgba(255,255,255,.1)}
.w11bug .mn{font-size:11px;color:#67e8f9}.w11bug .at{font-size:10px;padding:1px 5px;border-radius:5px;background:#a3e635;color:#070b18}.w11bug .wx{font-size:10px;color:#cbd5e1}
.w11bug .cr{width:16px;height:18px;display:inline-flex}.w11bug .cr svg,.w11bug .cr .w11crest{width:16px!important;height:18px!important}
#w11lt{position:absolute;left:12px;bottom:14px;z-index:28;display:flex;flex-direction:column;gap:6px;pointer-events:none;max-width:min(420px,60vw)}
#w11lt .lt{display:flex;align-items:center;gap:8px;padding:7px 12px 7px 0;border-radius:10px;background:rgba(7,11,24,.86);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.12);box-shadow:0 0 16px rgba(0,0,0,.5);font-size:12px;font-weight:800;animation:w11lti .35s cubic-bezier(.2,.8,.2,1)}
#w11lt .lt i{align-self:stretch;width:5px;border-radius:10px 0 0 10px}#w11lt .lt b{font-size:13px}#w11lt .lt small{color:#94a3b8;font-weight:700}
@keyframes w11lti{from{transform:translateX(-30px);opacity:0}to{transform:none;opacity:1}}
#w11wipe{position:absolute;inset:0;z-index:45;pointer-events:none;overflow:hidden}
#w11wipe div{position:absolute;top:-20%;bottom:-20%;width:70%;left:-80%;transform:skewX(-18deg);background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);display:flex;align-items:center;justify-content:center;animation:w11wp .75s cubic-bezier(.6,.05,.3,1) forwards}
#w11wipe span{transform:skewX(18deg);font-weight:900;font-size:22px;letter-spacing:.14em;color:#070b18;white-space:nowrap}
@keyframes w11wp{from{left:-80%}to{left:120%}}`;
const tvCss = () => { if (!document.getElementById('w11tvcss')) { const s = document.createElement('style'); s.id = 'w11tvcss'; s.textContent = TV_CSS; document.head.appendChild(s); } };
const crestMini = (D, i) => { try { return D.cr[i] ? W.crestSvg(D.cr[i], D.sh[i], 16) : ''; } catch (e) { return ''; } };
const compTag = (live) => { const M = live && live.M; return !M ? (live && live.kind === 'boot' ? 'BOOT CAMP' : 'FRIENDLY') : M.cup === 'cl' ? 'CHAMPIONS LEAGUE' : M.cup ? 'OPEN CUP' : 'DIV ' + M.t; };
W.tvBug = function () {
  const live = W.live, m = W.m; tvCss(); const host = document.getElementById('w11rp') || document.getElementById('w11cine') || (W.v3 && W.v3.on ? document.getElementById('w11l3') : null);
  document.querySelectorAll('.w11bug').forEach(x => { if (!host || x.parentNode !== host) x.remove(); }); if (!host || !live || !m || W._cer) return;
  let el = host.querySelector('.w11bug'); const D = W.dress(live), A = atBase(live), rp = host.id === 'w11rp';
  if (!el) { el = document.createElement('div'); el.className = 'w11bug'; el.style.cssText = rp ? 'right:8px;top:8px' : host.id === 'w11cine' ? 'left:10px;top:max(10px,env(safe-area-inset-top))' : 'left:8px;top:8px'; host.appendChild(el);
    if (host.id === 'w11cine') { const bar = host.children[1]; if (bar && bar.querySelector('#w11cinesc')) bar.style.visibility = 'hidden'; } }
  const h = m.t >= W.TIMING.HALF ? 1 : 0, th = m.t - h * W.TIMING.HALF, inAdd = th >= W.TIMING.HALF * 0.92 && m.added[h];
  const html = `<span class="cp">${compTag(live)}</span><span class="cr">${crestMini(D, 0)}</span><span>${esc(D.sh[0])}</span><span class="sc">${m.T[0].score}–${m.T[1].score}</span><span>${esc(D.sh[1])}</span><span class="cr">${crestMini(D, 1)}</span><span class="mn">${W.minLabel ? W.minLabel(m) : m.minute() + "'"}</span>${inAdd ? `<span class="at">+${m.added[h]}</span>` : ''}${A.wx && A.wx.k !== 'clear' ? `<span class="wx">${(CC.WX_NAME[A.wx.k] || '').split(' ')[0]} ${A.wx.t}°</span>` : ''}`;
  if (el._h !== html) { el._h = html; el.innerHTML = html; }
};
/* lower-third pop-ups for goals, cards and subs (only new moments, no flood after catching up) */
W.tvPop = function (h, color, ms) { tvCss(); const host = document.getElementById('w11'); if (!host) return; let box = document.getElementById('w11lt'); if (!box) { box = document.createElement('div'); box.id = 'w11lt'; host.appendChild(box); }
  const d = document.createElement('div'); d.className = 'lt'; d.innerHTML = `<i style="background:${color}"></i>${h}`; box.appendChild(d); while (box.children.length > 2) box.firstChild.remove(); setTimeout(() => d.remove(), ms || 4200); };
W.tvTick = function () {
  const m = W.m, live = W.live; if (!m || !live || !document.getElementById('w11')) { W._tvM = null; return; }
  if (W._tvM !== m) { W._tvM = m; W._tvN = m.ev.length; } if (W._cer) { W._tvN = m.ev.length; return; }
  const D = W.dress(live); for (; W._tvN < m.ev.length; W._tvN++) { const e = m.ev[W._tvN]; if (e.tick != null && m.tick - e.tick > 60) continue; const tc = (s) => (D.k[s] && D.k[s].c1) || '#22d3ee', p = e.pid ? W.player(e.pid, m.S) : null;
    if (e.k === 'goal') { const sc = (String(e.txt).match(/(\d+–\d+)\s*$/) || [])[1] || ''; W.tvPop(`<span>⚽</span><span><b>GOAL! ${p ? p.flag + ' ' + esc(p.name) : esc(D.sh[e.side])}</b><br><small>${e.min}' · ${esc(D.sh[e.side])} · ${sc}${e.how === 'pen' ? ' · penalty' : e.how === 'fk' ? ' · free kick' : e.how === 'header' ? ' · header' : ''}</small></span>`, tc(e.side), 5200); }
    else if (e.k === 'yellow' || e.k === 'red') W.tvPop(`<span>${e.k === 'red' ? '🟥' : '🟨'}</span><span><b>${p ? p.flag + ' ' + esc(p.name) : ''}</b><br><small>${e.k === 'red' ? 'Red card' : 'Yellow card'} · ${esc(D.sh[e.side])} · ${e.min}'</small></span>`, e.k === 'red' ? '#ff2d95' : '#facc15');
    else if (e.k === 'sub') { const L = m.T[e.side].subLog, x = L[L.length - 1]; if (x) { const po = W.player(x[0], m.S), pn = W.player(x[1], m.S); W.tvPop(`<span>🔁</span><span><b><span style="color:#22d3ee">⬆ ${pn.num} ${esc(pn.short)}</span> · <span style="color:#ff2d95">⬇ ${po.num} ${esc(po.short)}</span></b><br><small>Substitution · ${esc(D.sh[e.side])} · ${e.min}'</small></span>`, tc(e.side)); } }
    else if (e.k === 'added') W.tvPop(`<span>⏱️</span><span><b>${esc(String(e.txt).replace(/^⏱️\s*/, ''))}</b></span>`, '#a3e635', 3200);
  }
  W.tvBug();
};
setInterval(() => { try { W.tvTick(); } catch (e) {} }, 300);
/* SINLESS GG wipe into and out of every replay */
W.tvWipe = function () { tvCss(); const host = document.getElementById('w11'); if (!host) return; const o = document.createElement('div'); o.id = 'w11wipe'; o.innerHTML = '<div><span>SINLESS GG · REPLAY</span></div>'; host.appendChild(o); setTimeout(() => o.remove(), 800); };
W.replay = (function (b) { return function (F, g, live, liveMode) { W._rpG = g; W.tvWipe(); return b.apply(this, arguments).then((x) => { W.tvWipe(); W._rpG = null; return x; }); }; })(W.replay);

/* =================== 🧥 touchline manager designer (Club HQ). First design free, then 2 🪙 GG Coins =================== */
const MG_OPTS = { sk: ['#3f2618', '#5c3822', '#70442a', '#83512f', '#a8724a', '#b9835a', '#d9ab86', '#e0b590'], hr: ['Bald', 'Buzz', 'Crew', 'Short', 'Side part', 'Slicked', 'Quiff', 'Curls', 'Afro', 'Locks', 'Fade', 'High top'],
  hc: ['#0a0a0c', '#24170f', '#5a3a20', '#a07a44', '#c9a55a', '#6b2f1a', '#8a8f96', '#d8dadd'], bd: ['None', 'Stubble', 'Short beard', 'Goatee', 'Full beard'], gl: ['None', 'Glasses', 'Sunglasses'], fit: CC.MGR_FIT, bu: ['Slim', 'Medium', 'Big'], ag: ['30s', '40s', '50s+'] };
W.mgrCard = function () { const me = W.me; if (!me) return ''; const first = !me.mgr;
  return `<div class="card" id="w11mgc"><p style="font-weight:900">🧥 Touchline manager</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">Your manager stands in the technical area at every match: he shouts when you shout, celebrates your goals and argues with the 4th official. Design his face, hair, outfit and colours.</p>
    <button class="btn2" style="margin-top:8px" onclick="W11.mgrUI()">✏️ Design your manager ${first ? '(first time free)' : '(' + CC.TOK.mgr + ' 🪙)'}</button></div>`; };
W.hq = (function (b) { return function () { const r = b.apply(this, arguments); try { const bd = document.querySelector('#w11b'); if (bd && !document.getElementById('w11mgc')) bd.insertAdjacentHTML('beforeend', W.mgrCard()); } catch (e) {} return r; }; })(W.hq);
W.mgrUI = function () {
  const me = W.me; if (!me) return; W._mgrD = W._mgrD || CC.cleanMgr(me.mgr || CC.mgrOf(me.club));
  const d = W._mgrD, kit = W.kitN((me.kits || [])[0]), cost = me.mgr ? CC.TOK.mgr : 0;
  const sw = (k, list) => `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${list.map((c, i) => `<button onclick="W11.mgrSet('${k}',${i})" aria-label="${k} ${i}" style="width:28px;height:28px;border-radius:999px;background:${c};border:${d[k] === i ? '3px solid #22d3ee' : '1px solid rgba(255,255,255,.25)'}"></button>`).join('')}</div>`;
  const ch = (k, list) => `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">${list.map((t, i) => `<button onclick="W11.mgrSet('${k}',${i})" style="padding:6px 10px;border-radius:999px;font-size:11px;font-weight:800;background:${d[k] === i ? 'linear-gradient(90deg,#22d3ee,#a855f7)' : 'rgba(255,255,255,.08)'};color:${d[k] === i ? '#070b18' : '#e2e8f0'};border:1px solid rgba(255,255,255,.15)">${t}</button>`).join('')}</div>`;
  const row = (t, h) => `<p style="font-size:11px;font-weight:900;color:#67e8f9;margin-top:10px">${t}</p>${h}`;
  W.ui(`<div class="card" style="grid-row:span 2"><p style="font-weight:900">🧥 Your touchline manager</p><div id="w11mgp" style="position:relative;height:300px;margin-top:8px;border-radius:14px;overflow:hidden;background:radial-gradient(circle at 50% 30%,rgba(168,85,247,.3),#070b18 70%)"></div>
      <p style="font-size:11px;color:#94a3b8;margin-top:8px">Generic, made-up person (never a real manager). Shown in every match of your club.</p>
      <button class="btn" style="margin-top:10px" onclick="W11.mgrSave()">💾 Save ${cost ? '(' + cost + ' 🪙 · you have ' + (me.gems || 0) + ')' : '(free)'}</button></div>
    <div class="card">${row('Skin', sw('sk', MG_OPTS.sk))}${row('Hair', ch('hr', MG_OPTS.hr))}${row('Hair colour', sw('hc', MG_OPTS.hc))}${row('Beard', ch('bd', MG_OPTS.bd))}${row('Glasses', ch('gl', MG_OPTS.gl))}</div>
    <div class="card">${row('Outfit', ch('fit', MG_OPTS.fit))}${row('Outfit colour', sw('col', CC.COLORS))}${row('Build', ch('bu', MG_OPTS.bu))}${row('Age', ch('ag', MG_OPTS.ag))}<p style="font-size:10px;color:#94a3b8;margin-top:10px">Tracksuits and polos use your club colours (${esc(kit.c1)}).</p></div>`, '🧥 Manager', 'W11.hq()');
  W.mgrPreview(document.getElementById('w11mgp'));
};
W.mgrSet = function (k, i) { if (!W._mgrD) return; W._mgrD[k] = i; W._mgrD = CC.cleanMgr(W._mgrD); const sc = document.querySelector('#w11b') && document.querySelector('#w11b').scrollTop; W.mgrUI(); try { if (sc) document.querySelector('#w11b').scrollTop = sc; } catch (e) {} };
W.mgrSave = async function () { const me = W.me, cost = me.mgr ? CC.TOK.mgr : 0; if (cost && !confirm(`Save this look for ${cost} 🪙 GG Coins?`)) return;
  const r = await W.api('/w11/mgr', { mgr: W._mgrD }); if (!r || !r.ok) return toast('⚠️ ' + ((r && r.error) || 'Try again'));
  me.mgr = r.mgr; me.gems = r.gems; W._mgrD = null; toast('🧥 Your manager is ready for the touchline!'); W.hq(); };
W.mgrPreview = function (box) {
  if (!box) return; if (!G3.ok() || G3.be !== 'b3' || !G3.B3 || !G3.B3.mgrFig) { box.innerHTML = '<p style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;color:#94a3b8;padding:16px;text-align:center">The 3D preview appears when 3D graphics are ready on this phone. Your choices are saved either way.</p>'; if (W.w3d && W.w3d.st === 1) setTimeout(() => { if (document.body.contains(box)) W.mgrPreview(box); }, 1500); return; }
  const v = { alive: () => document.body.contains(box) && G3.view === v,
    step(dt, now) { v.t = now / 1000; return { eye: [0, 1.45, 3.3], at: [0, 1.08, 0], fov: 36, fog: 0.001, bg: [0.03, 0.05, 0.11] }; },
    draw() { const me = W.me, spec = B6.mgSpec(W._mgrD || me.mgr, W.kitN((me.kits || [])[0]), me.club); G3.floor(); G3.B3.mgrFig(spec, 0, 0, { yaw: Math.sin(v.t * 0.6) * 0.9 }); } };
  G3.run(box, v);
};
/* help: zones, weather, managers */
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🌍 <b>World zones</b>: Americas West, Americas East, Europe & Africa, Middle East & South Asia, East Asia and Oceania each have their own 6 divisions, so you play people near your time. Kick-off slots are your <b>local</b> times (10:00, 14:00, 18:00, 21:00). Each zone has its own Open Cup; the Champions League is worldwide, at a fair hour for both clubs.</p>
    <p style="margin-top:6px">🌦️ <b>Weather changes play</b>: rain and snow make players slip and the ball skid, wind moves long balls, crosses and long shots, heat tires players faster. The forecast shows before the team sheet locks. Day, sunset or night follows the home club's local time.</p>
    <p style="margin-top:6px">🧥 <b>Your manager</b> stands on the touchline at every match (design him in 🏟️ Club HQ: first time free, then ${CC.TOK.mgr} 🪙).</p>`); }; })(W.helpL);

// =====================================================================
// 🔊 G7 · 11 WONDERS SOUND: stadium (kicks, net, post, gloves, tackles, referee whistle), a crowd that follows the game,
// weather, muffled replays + wipe whoosh, ceremonies (walk-out anthem, fireworks, trophy fanfare), touchline answers,
// menu music, menu / coin / auction sounds, ⚙️ Club HQ → 🔊 Sound (on/off + crowd / effects / music).
// build.sh pastes this file into w11.js at the G7 marker. Sounds never change results (no engine change).
// Recordings: ONE file w11snd.mp3 (crowd: Gregor Quendel, CC BY 4.0 · rain, thunder, fireworks: CC0), built by
// tools3d/make_sound.py. Everything else (kicks, whistle, net, crowd "ooh"/whistles/claps/drums, music) is made in code.
// =====================================================================
const SND_V = 1;
const SND_MAP = {"bed":[0.5,26.0],"swell":[27.0,10.0],"cheer":[37.5,9.5],"roar":[47.5,13.0],"roar2":[61.0,11.5],"chant":[73.0,10.0],"rain":[83.5,18.0],"thunder":[102.0,5.265],"fw1":[107.765,1.2],"fw3":[109.465,1.3],"fw6":[111.265,1.374]};
const S7 = W.snd = { st: 0, ctx: null, buf: null, log: [], N: {}, tx: {}, act: 0, mode: '' };
/* settings (saved on this phone): on/off + 0–100 for crowd, effects, music */
S7.cfg = (() => { const d = { on: 1, cr: 80, fx: 80, mu: 60 }; try { const j = JSON.parse(localStorage.getItem('w11_snd') || 'null'); if (j && typeof j === 'object') for (const k in d) if (typeof j[k] === 'number') d[k] = Math.max(0, Math.min(k === 'on' ? 1 : 100, j[k])); } catch (e) {} return d; })();
S7.save = () => { try { localStorage.setItem('w11_snd', JSON.stringify(S7.cfg)); } catch (e) {} };
const lo7 = () => !!(W.dev && W.dev.tier === 'low');
const rnd7 = Math.random, rr = (a, b) => a + rnd7() * (b - a);
const sq7 = (v) => (v / 100) * (v / 100);
/* ---------- 🎛️ mixer: master → limiter; buses for music, effects, crowd, menu; a match filter for replays / snow ---------- */
S7.init = function () {
  if (S7.ctx) return S7.ctx; const AC = window.AudioContext || window.webkitAudioContext; if (!AC) { S7.st = -1; return null; }
  let c; try { c = new AC({ latencyHint: 'interactive' }); } catch (e) { try { c = new AC(); } catch (e2) { S7.st = -1; return null; } }
  S7.ctx = c; const N = S7.N;
  N.lim = c.createDynamicsCompressor(); N.lim.threshold.value = -9; N.lim.knee.value = 6; N.lim.ratio.value = 10; N.lim.attack.value = 0.003; N.lim.release.value = 0.25; N.lim.connect(c.destination);
  N.master = c.createGain(); N.master.connect(N.lim);
  N.match = c.createBiquadFilter(); N.match.type = 'lowpass'; N.match.frequency.value = 20000; N.match.Q.value = 0.5; N.mg = c.createGain(); N.match.connect(N.mg); N.mg.connect(N.master);
  N.fx = c.createGain(); N.fx.connect(N.match); N.crowd = c.createGain(); N.crowd.connect(N.match);
  N.ui = c.createGain(); N.ui.connect(N.master); N.mus = c.createGain(); N.mus.connect(N.master);
  if (!lo7()) { N.rev = c.createConvolver(); N.rev.buffer = impulse(c, 2.2, 3.2); N.revG = c.createGain(); N.revG.gain.value = 0.22; N.rev.connect(N.revG); N.revG.connect(N.match); N.revM = c.createGain(); N.revM.gain.value = 0.5; N.rev.connect(N.revM); N.revM.connect(N.mus); }
  S7.apply(); return c;
};
S7.apply = function () {
  const N = S7.N, C = S7.cfg; if (!S7.ctx) return; const t = S7.ctx.currentTime;
  N.master.gain.setTargetAtTime(C.on ? 0.9 : 0, t, 0.05); N.fx.gain.setTargetAtTime(sq7(C.fx) * 1.3, t, 0.05); N.ui.gain.setTargetAtTime(sq7(C.fx) * 0.8, t, 0.05);
  N.crowd.gain.setTargetAtTime(sq7(C.cr) * 1.4, t, 0.05); N.mus.gain.setTargetAtTime(sq7(C.mu) * 0.9, t, 0.05);
};
S7.resume = function () { const c = S7.ctx; if (c && c.state === 'suspended' && document.visibilityState !== 'hidden' && document.getElementById('w11')) { try { c.resume(); } catch (e) {} } };
const impulse = (c, sec, decay) => { const n = Math.floor(c.sampleRate * sec), b = c.createBuffer(2, n, c.sampleRate); for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < n; i++) d[i] = (rnd7() * 2 - 1) * Math.pow(1 - i / n, decay) * (i < 400 ? i / 400 : 1); } return b; };
const noiseBuf = (c) => { if (c._nb) return c._nb; const n = c.sampleRate * 2, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = rnd7() * 2 - 1; c._nb = b; return b; };
/* ---------- 📦 the recordings (one file, downloaded once when 11 Wonders opens; cached by the app) ---------- */
S7.load = function () {
  if (S7.st) return; const c = S7.init(); if (!c) return; S7.st = 1;
  const base = new URL('./', document.baseURI).href;
  fetch(base + 'w11snd.mp3?v=' + SND_V).then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.arrayBuffer(); })
    .then(ab => new Promise((res, rej) => { const p = c.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); }))
    .then(b => { S7.buf = b; S7.st = 2; }).catch(e => { S7.st = -1; console.warn('sound load', e); });
};
/* ---------- helpers ---------- */
const panTo = (c, d, p) => { if (!p || !c.createStereoPanner) return d; const n = c.createStereoPanner(); n.pan.value = Math.max(-1, Math.min(1, p)); n.connect(d); return n; };
const gainTo = (c, d, v) => { const g = c.createGain(); g.gain.value = v; g.connect(d); return g; };
const envG = (c, d, t, a, peak, dec, hold) => { const g = c.createGain(); g.gain.value = 0.0001; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a); if (hold) g.gain.setValueAtTime(peak, t + a + hold); g.gain.exponentialRampToValueAtTime(0.0001, t + a + (hold || 0) + dec); g.connect(d); return g; };
const noiseSrc = (c, t, dur) => { const s = c.createBufferSource(); s.buffer = noiseBuf(c); s.loop = true; s.start(t, rnd7() * 1.5); s.stop(t + dur + 0.05); return s; };
const bp = (c, d, type, f, q) => { const n = c.createBiquadFilter(); n.type = type; n.frequency.value = f; if (q != null) n.Q.value = q; n.connect(d); return n; };
const tone = (c, d, t, type, f0, f1, dur, ft) => { const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + (ft || dur)); o.connect(d); o.start(t); o.stop(t + dur + 0.05); return o; };
const revSend = (c, src, amt) => { const N = S7.N; if (c === S7.ctx && N.rev && amt) { const g = c.createGain(); g.gain.value = amt; src.connect(g); g.connect(N.rev); } };
/* ---------- 🎚️ sound recipes: every one is (context, destination, time, options) so tests can render them offline ---------- */
const SY = S7.SY = {
  /* ⚽ ball: leather thump (pitch drop) + click; harder = louder and lower; header = duller; wet = splash */
  kick(c, d, t, o) { const p = o.p == null ? 0.5 : o.p, hd = !!o.head, v = 0.35 + 0.65 * p;
    const g = envG(c, d, t, 0.002, v * (hd ? 0.55 : 0.8), hd ? 0.09 : 0.11 + 0.05 * p); tone(c, g, t, 'sine', hd ? 150 : 190 + 60 * p, hd ? 80 : 55, 0.18, 0.07);
    const n = envG(c, bp(c, d, 'bandpass', hd ? 900 : 1700 + 900 * p, 1.1), t, 0.001, v * (hd ? 0.25 : 0.55), 0.02 + 0.015 * p); noiseSrc(c, t, 0.06).connect(n);
    const s = envG(c, bp(c, d, 'highpass', 4200), t, 0.001, v * 0.18, 0.012); noiseSrc(c, t, 0.03).connect(s);
    if (o.wet) { const w = envG(c, bp(c, d, 'bandpass', 1300, 0.7), t + 0.005, 0.01, 0.22 * o.wet, 0.14); noiseSrc(c, t, 0.2).connect(w); } return t + 0.25; },
  touch(c, d, t, o) { const g = envG(c, d, t, 0.002, 0.18, 0.06); tone(c, g, t, 'sine', 140, 70, 0.08, 0.05); const n = envG(c, bp(c, d, 'bandpass', 1200, 1), t, 0.001, 0.07, 0.015); noiseSrc(c, t, 0.03).connect(n); if (o && o.wet) { const w = envG(c, bp(c, d, 'bandpass', 1400, 0.8), t, 0.01, 0.12, 0.1); noiseSrc(c, t, 0.15).connect(w); } return t + 0.12; },
  /* 🥅 net: swish of the mesh + rattle */
  net(c, d, t) { const f = bp(c, d, 'bandpass', 1100, 0.8); f.frequency.setValueAtTime(1600, t); f.frequency.exponentialRampToValueAtTime(420, t + 0.5); const g = envG(c, f, t, 0.01, 0.42, 0.55); noiseSrc(c, t, 0.7).connect(g);
    const h = envG(c, bp(c, d, 'highpass', 3500), t + 0.02, 0.02, 0.18, 0.35); noiseSrc(c, t, 0.5).connect(h); const r = envG(c, d, t, 0.005, 0.3, 0.25); tone(c, r, t, 'triangle', 95, 70, 0.3); return t + 0.8; },
  /* 🔔 post / bar: metal ring (inharmonic partials) + the ball's thump */
  post(c, d, t) { SY.kick(c, d, t, { p: 0.9 }); [[520, 1.1, 0.26], [1290, 0.7, 0.16], [2110, 0.45, 0.1], [3020, 0.3, 0.06], [4170, 0.2, 0.04]].forEach(([f, dec, v]) => { const g = envG(c, d, t, 0.001, v, dec); tone(c, g, t, 'sine', f, f * 0.995, dec + 0.1); }); return t + 1.3; },
  /* 🧤 keeper: catch = glove smack; parry = slap */
  gloves(c, d, t, o) { const g = envG(c, bp(c, d, 'bandpass', o && o.catch ? 750 : 1500, 1.2), t, 0.001, 0.6, o && o.catch ? 0.07 : 0.045); noiseSrc(c, t, 0.12).connect(g); const b = envG(c, d, t, 0.002, 0.35, 0.1); tone(c, b, t, 'sine', 120, 70, 0.14); return t + 0.2; },
  /* 🦵 tackle: body thud, slide = grass scrape */
  tackle(c, d, t, o) { const g = envG(c, bp(c, d, 'lowpass', 420), t, 0.003, 0.7, 0.14); noiseSrc(c, t, 0.2).connect(g); const b = envG(c, d, t, 0.002, 0.3, 0.1); tone(c, b, t, 'sine', 90, 55, 0.12);
    if (o && o.sl) { const f = bp(c, d, 'bandpass', 2600, 0.9); f.frequency.setValueAtTime(3200, t); f.frequency.exponentialRampToValueAtTime(900, t + 0.4); const s = envG(c, f, t, 0.03, 0.28, 0.35, 0.05); noiseSrc(c, t, 0.5).connect(s); } return t + 0.5; },
  splash(c, d, t, o) { const v = o && o.v || 0.3; const f = bp(c, d, 'bandpass', 1500, 0.6); f.frequency.setValueAtTime(2200, t); f.frequency.exponentialRampToValueAtTime(700, t + 0.25); const g = envG(c, f, t, 0.01, v, 0.25); noiseSrc(c, t, 0.35).connect(g); return t + 0.3; },
  /* 🗣️ the referee's pea whistle: ~2.9 kHz tone, the pea makes a fast warble; o.ls = lengths of the blasts */
  whistle(c, d, t, o) { const ls = (o && o.ls) || [0.22], gap = (o && o.gap) || 0.13, v = (o && o.v) || 0.32, f = (o && o.f) || rr(2750, 3050); let at = t;
    ls.forEach((L) => { const g = c.createGain(); g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(v, at + 0.012); g.gain.setValueAtTime(v * (L > 0.4 ? 0.85 : 1), at + L - 0.04); g.gain.exponentialRampToValueAtTime(0.0001, at + L + 0.04); g.connect(d);
      const lfo = c.createOscillator(), ld = c.createGain(); lfo.type = 'triangle'; lfo.frequency.value = rr(26, 34); ld.gain.value = 150; lfo.connect(ld);
      [[1, 1], [2, 0.12], [3, 0.03]].forEach(([h, a]) => { const o2 = c.createOscillator(), ag = c.createGain(); o2.frequency.value = f * h; ld.connect(o2.frequency); ag.gain.value = a; o2.connect(ag); ag.connect(g); o2.start(at); o2.stop(at + L + 0.08); });
      lfo.start(at); lfo.stop(at + L + 0.08); const br = envG(c, bp(c, d, 'bandpass', f, 2), at, 0.01, v * 0.12, 0.05, L - 0.04); noiseSrc(c, at, L + 0.1).connect(br); revSend(c, g, 0.6); at += L + gap; });
    return at; },
  /* 🙌 crowd voices made in code: many singers through vowel filters ("ooh" near miss, "aww" groan, "boo"), panned wide */
  vowel(c, d, t, o) { const kind = (o && o.k) || 'ooh', v = (o && o.v) || 0.4, n = lo7() ? 6 : 14, dur = kind === 'boo' ? 1.8 : kind === 'aww' ? 1.7 : 1.5;
    const F = { ooh: [[330, 5], [820, 6]], aww: [[680, 5], [1100, 6]], boo: [[300, 5], [640, 6]], aah: [[760, 5], [1250, 6]] }[kind] || [[330, 5], [820, 6]];
    const L = c.createGain(); L.gain.value = 1; const lp = bp(c, d, 'lowpass', 2600); const fs = F.map(([f, q]) => bp(c, lp, 'bandpass', f, q)); fs.forEach(x => L.connect(x)); const bus = envG(c, L, t, kind === 'ooh' ? 0.22 : 0.15, v * 3.2, dur * 0.75, dur * 0.2);
    for (let i = 0; i < n; i++) { const f0 = kind === 'boo' ? rr(95, 180) : rr(120, 320), s = c.createOscillator(); s.type = 'sawtooth'; const st = t + rr(0, 0.12); s.frequency.setValueAtTime(f0 * (kind === 'aww' ? 1.08 : 0.94), st);
      if (kind === 'ooh') { s.frequency.linearRampToValueAtTime(f0 * 1.12, st + 0.35); s.frequency.linearRampToValueAtTime(f0 * 0.9, st + dur); } else if (kind === 'aww') s.frequency.linearRampToValueAtTime(f0 * 0.8, st + dur); else s.frequency.linearRampToValueAtTime(f0 * 0.97, st + dur);
      const vg = c.createGain(); vg.gain.value = 1 / n; s.connect(vg); vg.connect(panTo(c, bus, rr(-0.8, 0.8))); s.start(st); s.stop(t + dur + 0.2); }
    const ns = envG(c, bp(c, d, 'bandpass', F[0][0] * 1.5, 0.8), t, 0.2, v * 0.25, dur * 0.7, dur * 0.2); noiseSrc(c, t, dur + 0.2).connect(ns); revSend(c, lp, 0.5); return t + dur + 0.2; },
  /* 😤 fans whistling at a foul or the referee */
  fanWhistle(c, d, t, o) { const n = lo7() ? 4 : 9, v = (o && o.v) || 0.25; for (let i = 0; i < n; i++) { const st = t + rr(0, 0.5), L = rr(0.5, 1.3), f = rr(1900, 3400), g = envG(c, panTo(c, d, rr(-0.9, 0.9)), st, 0.05, v / Math.sqrt(n), 0.25, L - 0.3);
      const s = c.createOscillator(); s.frequency.setValueAtTime(f, st); s.frequency.linearRampToValueAtTime(f * rr(0.9, 1.12), st + L); const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = rr(4, 8); lg.gain.value = f * 0.02; lfo.connect(lg); lg.connect(s.frequency); s.connect(g); s.start(st); s.stop(st + L + 0.1); lfo.start(st); lfo.stop(st + L + 0.1); } return t + 1.9; },
  /* 👏 crowd claps: o.beats = times of each clap (s), many people slightly out of time */
  claps(c, d, t, o) { const beats = (o && o.beats) || [0], v = (o && o.v) || 0.35, n = lo7() ? 5 : 12; beats.forEach((b) => { for (let i = 0; i < n; i++) { const st = Math.max(t, t + b + rr(-0.025, 0.035)), g = envG(c, panTo(c, bp(c, d, 'bandpass', rr(1000, 2100), 1.3), rr(-0.9, 0.9)), st, 0.001, v * 1.6 / Math.sqrt(n), rr(0.03, 0.06)); noiseSrc(c, st, 0.08).connect(g); } }); return t + beats[beats.length - 1] + 0.2; },
  /* 🥁 big drum in the stands */
  drum(c, d, t, o) { const beats = (o && o.beats) || [0], v = (o && o.v) || 0.45; beats.forEach((b) => { const st = t + b, g = envG(c, d, st, 0.003, v, 0.32); tone(c, g, st, 'sine', 95, 48, 0.4, 0.12); const n = envG(c, bp(c, d, 'lowpass', 700), st, 0.002, v * 0.4, 0.07); noiseSrc(c, st, 0.1).connect(n); revSend(c, g, 0.5); }); return t + beats[beats.length - 1] + 0.4; },
  /* 💨 replay wipe */
  whoosh(c, d, t) { const f = bp(c, d, 'bandpass', 600, 1.4); f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(4200, t + 0.38); f.frequency.exponentialRampToValueAtTime(900, t + 0.75); const p = c.createStereoPanner ? c.createStereoPanner() : null;
    const g = envG(c, p || f, t, 0.3, 0.5, 0.45); if (p) { p.pan.setValueAtTime(-0.8, t); p.pan.linearRampToValueAtTime(0.8, t + 0.75); p.connect(f); } noiseSrc(c, t, 0.85).connect(g); const s = envG(c, d, t + 0.25, 0.05, 0.12, 0.5); tone(c, s, t + 0.25, 'sine', 180, 520, 0.6); return t + 0.9; },
  /* 🔨 menus: tap, coins in, coins out, auction tick / outbid / win, touchline alert */
  tap(c, d, t) { const g = envG(c, d, t, 0.002, 0.16, 0.05); tone(c, g, t, 'sine', 1250, 850, 0.06); return t + 0.08; },
  coin(c, d, t) { [[1568, 0], [2093, 0.07], [2637, 0.13]].forEach(([f, dt]) => { const g = envG(c, d, t + dt, 0.002, 0.16, 0.35); tone(c, g, t + dt, 'triangle', f, f, 0.4); const h = envG(c, d, t + dt, 0.001, 0.05, 0.15); tone(c, h, t + dt, 'sine', f * 2.01, f * 2.01, 0.2); }); return t + 0.6; },
  spend(c, d, t) { [[1175, 0], [880, 0.08]].forEach(([f, dt]) => { const g = envG(c, d, t + dt, 0.002, 0.13, 0.22); tone(c, g, t + dt, 'triangle', f, f, 0.3); }); return t + 0.4; },
  tick(c, d, t, o) { const hi = o && o.hi, g = envG(c, d, t, 0.001, hi ? 0.22 : 0.15, 0.05); tone(c, g, t, 'sine', hi ? 1600 : 1050, hi ? 1500 : 980, 0.06); const n = envG(c, bp(c, d, 'bandpass', 2400, 3), t, 0.001, 0.08, 0.02); noiseSrc(c, t, 0.03).connect(n); return t + 0.08; },
  outbid(c, d, t) { [[660, 0], [440, 0.12]].forEach(([f, dt]) => { const g = envG(c, d, t + dt, 0.005, 0.18, 0.2); tone(c, g, t + dt, 'square', f, f * 0.98, 0.25); }); return t + 0.4; },
  win(c, d, t) { [523, 659, 784, 1047].forEach((f, i) => { const g = envG(c, d, t + i * 0.09, 0.004, 0.17, 0.5); tone(c, g, t + i * 0.09, 'triangle', f, f, 0.55); }); SY.coin(c, d, t + 0.36); return t + 1; },
  alert(c, d, t) { [[988, 0], [1319, 0.11]].forEach(([f, dt]) => { const g = envG(c, d, t + dt, 0.004, 0.17, 0.3); tone(c, g, t + dt, 'sine', f, f, 0.32); }); return t + 0.45; },
  /* 💨 a gust of wind (the continuous wind is in the weather layer) */
  thunderSyn(c, d, t) { const f = bp(c, d, 'lowpass', 300, 0.7); const g = envG(c, f, t, 0.08, 0.9, 3.2, 0.2); noiseSrc(c, t, 3.6).connect(g); return t + 3.6; },
  firework(c, d, t) { const g = envG(c, d, t, 0.002, 0.4, 0.4); const s = noiseSrc(c, t, 0.5); s.connect(bp(c, g, 'lowpass', 1800)); const cr = envG(c, bp(c, d, 'highpass', 3000), t + 0.25, 0.05, 0.25, 1.2); noiseSrc(c, t + 0.2, 1.5).connect(cr); return t + 1.6; }
};
/* ---------- ▶️ play a recipe or a recording now (respects the voice limit; logs for the tests) ---------- */
const MAXV = () => lo7() ? 12 : 26;
S7.ok = () => !!(S7.ctx && S7.cfg.on && S7.ctx.state !== 'closed');
S7.play = function (name, o, bus, at) {
  o = o || {}; S7.log.push(name); if (S7.log.length > 200) S7.log.shift(); const c = S7.ctx; if (!S7.ok() || !SY[name]) return;
  if (S7.act >= MAXV() && !o.must) return; const t = Math.max(c.currentTime, at || 0) + 0.005, out = gainTo(c, S7.N[bus || 'fx'], o.g == null ? 1 : o.g), d = panTo(c, out, o.pan);
  if (o.rv) revSend(c, out, o.rv); let end = t + 1; try { end = SY[name](c, d, t, o); } catch (e) { console.warn('snd', name, e); }
  S7.act++; setTimeout(() => { S7.act = Math.max(0, S7.act - 1); try { out.disconnect(); } catch (e) {} }, Math.max(200, (end - c.currentTime) * 1000 + 300));
};
/* a piece of the recordings (one-shot): o.g gain, o.pan, o.rate, o.off (start inside the clip), o.len, o.fade */
S7.clip = function (name, o, bus, at) {
  o = o || {}; S7.log.push('clip:' + name); if (S7.log.length > 200) S7.log.shift(); const c = S7.ctx, M = SND_MAP[name]; if (!S7.ok() || !S7.buf || !M) return null;
  const t = Math.max(c.currentTime, at || 0) + 0.01, rate = o.rate || 1, off = Math.min(M[1] - 0.3, o.off || 0), len = Math.min(M[1] - off, o.len || M[1]), fd = o.fade || 0.04;
  const s = c.createBufferSource(); s.buffer = S7.buf; s.playbackRate.value = rate; const g = c.createGain(), v = o.g == null ? 1 : o.g; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + fd);
  g.gain.setValueAtTime(v, t + Math.max(fd, len / rate - (o.out || 0.4))); g.gain.linearRampToValueAtTime(0.0001, t + len / rate); s.connect(g); g.connect(panTo(c, S7.N[bus || 'crowd'], o.pan));
  if (o.lp) { s.disconnect(); const f = bp(c, g, 'lowpass', o.lp, 0.6); s.connect(f); }
  s.start(t, M[0] + off, len + 0.02); S7.act++; s.onended = () => { S7.act = Math.max(0, S7.act - 1); try { g.disconnect(); } catch (e) {} }; return { s, g };
};
/* ---------- 🌊 endless textures from the recordings (crowd bed, chant, rain): random pieces cross-faded, so they never sound looped ---------- */
const TXP = (name, bus, pan) => ({ name, bus, pan, g: null, next: 0, want: 0, on: false });
S7.tex = function (key, name, bus, pan) { if (!S7.tx[key]) S7.tx[key] = TXP(name, bus, pan); return S7.tx[key]; };
S7.texTick = function () {
  const c = S7.ctx; if (!c || !S7.buf) return; const now = c.currentTime;
  for (const k in S7.tx) { const X = S7.tx[k], M = SND_MAP[X.name]; if (!M) continue;
    if (!X.g) { X.g = c.createGain(); X.g.gain.value = 0; X.g.connect(panTo(c, S7.N[X.bus], X.pan)); }
    X.g.gain.setTargetAtTime(X.want, now, X.want > X.cur ? 0.25 : 0.6); X.cur = X.want;
    if (X.want < 0.002) { if (X.next && now > X.next + 1) X.next = 0; continue; }
    if (X.next && now < X.next - 0.6) continue;
    const XF = 1.4, L = Math.min(M[1] - 0.6, rr(6, 9)), off = rr(0.3, Math.max(0.31, M[1] - L - 0.3)), t = Math.max(now + 0.02, X.next || now + 0.02);
    const s = c.createBufferSource(); s.buffer = S7.buf; const sg = c.createGain(); sg.gain.setValueAtTime(0.0001, t); sg.gain.linearRampToValueAtTime(1, t + XF); sg.gain.setValueAtTime(1, t + L - XF); sg.gain.linearRampToValueAtTime(0.0001, t + L);
    s.connect(sg); sg.connect(X.g); s.start(t, M[0] + off, L + 0.05); s.onended = () => { try { sg.disconnect(); } catch (e) {} }; X.next = t + L - XF; }
};
S7.texAll = (v) => { for (const k in S7.tx) S7.tx[k].want = v; };
/* ---------- 🎵 music made in code: calm menu loop, walk-out anthem, trophy fanfare (all original) ---------- */
const MIDI = (n) => 440 * Math.pow(2, (n - 69) / 12);
const MUS = {
  menu: { bpm: 84, bars: 8, loop: true, chords: [[57, 60, 64, 67, 71], [53, 57, 60, 64, 67], [48, 52, 55, 59, 62], [55, 59, 62, 64, 66], [57, 60, 64, 67, 71], [53, 57, 60, 64, 69], [50, 53, 57, 60, 64], [52, 56, 59, 62, 64]] },
  anthem: { bpm: 72, bars: 8, loop: false, chords: [[50, 54, 57], [47, 50, 54], [43, 47, 50], [45, 49, 52], [50, 54, 57], [43, 47, 50], [45, 49, 52], [50, 54, 57]],
    mel: [[74, 0, 2], [78, 2, 1], [81, 3, 1], [83, 4, 2], [81, 6, 1], [78, 7, 1], [79, 8, 2], [83, 10, 1], [86, 11, 1], [85, 12, 3], [81, 15, 1], [86, 16, 2], [81, 18, 1], [78, 19, 1], [79, 20, 1], [83, 21, 1], [88, 22, 1], [86, 23, 1], [85, 24, 1], [83, 25, 1], [81, 26, 1], [85, 27, 1], [86, 28, 4]] },
  fanfare: { bpm: 120, bars: 3, loop: false, chords: [[48, 55, 60, 64], [53, 57, 60, 65], [48, 55, 60, 64]], mel: [[67, 0, 0.33], [67, 0.33, 0.33], [67, 0.66, 0.34], [72, 1, 1.5], [76, 2.5, 0.5], [79, 3, 0.5], [76, 3.5, 0.5], [84, 4, 4]] }
};
const pad = (c, d, t, notes, dur, br) => { const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(br ? 0.09 : 0.06, t + (br ? 0.12 : 0.9)); g.gain.setValueAtTime(br ? 0.08 : 0.06, t + dur - 0.3); g.gain.linearRampToValueAtTime(0.0001, t + dur + (br ? 0.3 : 0.8)); const f = bp(c, d, 'lowpass', br ? 2200 : 1100, 0.7); g.connect(f);
  notes.forEach(n => [-6, 6].forEach(dt => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = MIDI(n); o.detune.value = dt + rr(-2, 2); const og = c.createGain(); og.gain.value = 0.5 / notes.length; o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 1); })); revSend(c, f, 0.9); };
const pluck = (c, d, t, n, v, dec) => { const g = envG(c, d, t, 0.004, v, dec); const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = MIDI(n); o.connect(g); o.start(t); o.stop(t + dec + 0.1); revSend(c, g, 0.6); };
const lead = (c, d, t, n, L) => { const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.11, t + 0.04); g.gain.setValueAtTime(0.09, t + Math.max(0.05, L - 0.08)); g.gain.exponentialRampToValueAtTime(0.0001, t + L + 0.25); const f = bp(c, d, 'lowpass', 2600, 1.2); g.connect(f);
  [0, 7].forEach(dt => { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = MIDI(n); o.detune.value = dt; const v = c.createOscillator(), vg = c.createGain(); v.frequency.value = 5.2; vg.gain.value = 6; v.connect(vg); vg.connect(o.detune); o.connect(g); o.start(t); o.stop(t + L + 0.3); v.start(t); v.stop(t + L + 0.3); }); revSend(c, f, 0.8); };
const timp = (c, d, t, n, v) => { const g = envG(c, d, t, 0.004, v, 0.9); tone(c, g, t, 'sine', MIDI(n) * 1.03, MIDI(n), 1, 0.08); const h = envG(c, bp(c, d, 'lowpass', 500), t, 0.002, v * 0.4, 0.15); noiseSrc(c, t, 0.2).connect(h); revSend(c, g, 0.5); };
/* schedules the piece bar by bar a little ahead; returns the end time */
S7.music = function (name) {
  const c = S7.ctx; if (!c) return; if (S7.mu && S7.mu.name === name) return; S7.musicOff(); const P = MUS[name]; if (!P) return; S7.log.push('music:' + name);
  const g = c.createGain(); g.gain.value = 0.0001; g.gain.setTargetAtTime(1, c.currentTime, 0.6); g.connect(S7.N.mus); S7.mu = { name, P, g, bar: 0, t: c.currentTime + 0.15 };
};
S7.musicOff = function () { const c = S7.ctx, M = S7.mu; if (!c || !M) return; S7.mu = null; M.g.gain.setTargetAtTime(0.0001, c.currentTime, 0.5); setTimeout(() => { try { M.g.disconnect(); } catch (e) {} }, 3500); };
S7.musTick = function () {
  const c = S7.ctx, M = S7.mu; if (!c || !M) return; const P = M.P, B = 240 / P.bpm, d = M.g;
  while (M.t < c.currentTime + 0.5) {
    if (M.bar >= P.bars) { if (!P.loop) { if (c.currentTime > M.t + 2.5) S7.mu = null; return; } M.bar = 0; }
    const t = M.t, ch = P.chords[M.bar], bar = M.bar;
    if (M.name === 'menu') { pad(c, d, t, ch.slice(0, 4), B); const arp = [0, 2, 1, 3, 2, 4, 3, 1]; arp.forEach((k, i) => pluck(c, d, t + i * B / 8, ch[k % ch.length] + 12, i % 2 ? 0.05 : 0.07, 0.35));
      const bg = envG(c, d, t, 0.01, 0.16, B * 0.4); tone(c, bg, t, 'sine', MIDI(ch[0] - 12), MIDI(ch[0] - 12), B * 0.45); const bg2 = envG(c, d, t + B / 2, 0.01, 0.12, B * 0.3); tone(c, bg2, t + B / 2, 'sine', MIDI(ch[0] - 12), MIDI(ch[0] - 12), B * 0.35);
      for (let i = 0; i < 4; i++) { const hg = envG(c, bp(c, d, 'highpass', 7500), t + (i + 0.5) * B / 4, 0.001, 0.025, 0.04); noiseSrc(c, t + (i + 0.5) * B / 4, 0.06).connect(hg); } }
    else { pad(c, d, t, ch.concat(ch.map(n => n + 12)), B, true); timp(c, d, t, ch[0] - 12, M.name === 'fanfare' ? 0.35 : 0.3); if (M.name === 'anthem' && bar % 2 === 1) timp(c, d, t + B * 0.75, ch[0] - 12, 0.18);
      (P.mel || []).forEach(([n, at, L]) => { const b0 = at / 4; if (b0 >= bar && b0 < bar + 1) lead(c, d, t + (b0 - bar) * B, n, L * B / 4); });
      if (bar === P.bars - 1) { const cy = envG(c, bp(c, d, 'highpass', 5000), t, B * 0.6, 0.12, 1.6); noiseSrc(c, t, B + 1.8).connect(cy); } }
    M.bar++; M.t += B; }
};
/* ---------- 🏟️ the match soundscape: read from the live match every frame ---------- */
const HOME = 0.82;
const mt7 = { m: null, ev: 0, fl: null, own: null, sp: null, lastShot: null, chantAt: 0, waveAt: 0, thAt: 0, gust: 0, wind: null, rpCel: false, cerT: 0, fw: 0, kicks: 0 };
S7._mt = mt7;
const panX = (x) => Math.max(-0.75, Math.min(0.75, ((x || 52.5) - 52.5) / 52.5 * 0.75));
const shareOf = (side) => side === 0 ? 1 : 0.42;
const stage7 = () => {
  if (!document.getElementById('w11')) return 'off';
  if (W._tro) return 'trophy'; if (W._cer) return 'cer'; if (W._rp) return 'replay';
  const live = W.live, m = W.m, onMatch = !!document.querySelector('#w11 .w11match') || !!document.getElementById('w11cine');
  if (live && m && onMatch) return 'match'; return 'menu';
};
S7.frame = function () {
  const c = S7.ctx; if (!c || c.state !== 'running') return; S7.texTick(); S7.musTick();
  const st = stage7(); if (st !== S7.mode) { S7.enter(st, S7.mode); S7.mode = st; }
  const N = S7.N, now = c.currentTime;
  N.match.frequency.setTargetAtTime(st === 'replay' ? 1500 : S7.muffle || 20000, now, 0.15); N.mg.gain.setTargetAtTime(st === 'replay' ? 0.75 : 1, now, 0.2);
  if (st === 'match') S7.matchFrame(); else if (st === 'cer') S7.cerFrame(); else if (st === 'replay') S7.rpFrame(); else if (st === 'trophy') S7.troFrame();
  if (st !== 'match' && st !== 'cer' && st !== 'replay' && st !== 'trophy') { S7.texAll(0); S7.weather(null, 0); }
};
S7.enter = function (st, old) {
  if (st === 'menu') S7.music('menu'); else if (st !== 'cer' && st !== 'trophy') S7.musicOff();
  if (st === 'trophy') { S7.music('fanfare'); mt7.fw = 0; mt7.cerT = performance.now(); S7.clip('roar', { g: 0.7 }); }
  if (st === 'cer') { mt7.cerT = performance.now(); mt7.fw = 0; if (W._cer === 'open') { S7.music('anthem'); S7.clip('cheer', { g: 0.5 }); } else S7.musicOff(); }
  if (st === 'replay') { mt7.rpCel = false; }
  if (st === 'off') { S7.musicOff(); S7.texAll(0); }
};
/* stadium size → crowd loudness and echo */
const sizeOf = (live) => { try { const lv = Math.max(1, Math.min(5, (W.dress(live).sd || {}).lv || 1)); return [0.6, 0.72, 0.84, 0.93, 1][lv - 1]; } catch (e) { return 0.7; } };
S7.weather = function (wx, sz) {
  const c = S7.ctx, F = wx ? CC.wxFx(wx) : null, rain = S7.tex('rain', 'rain', 'fx'), now = c.currentTime;
  rain.want = F && F.wet ? (wx.k === 'storm' ? 0.55 : 0.32) * (F.wet > 1 ? 1.25 : 1) : 0;
  S7.muffle = F && F.snow ? 6500 : wx && wx.k === 'fog' ? 11000 : 20000;
  /* wind: filtered noise with gusts */
  const wv = F ? F.wind : 0;
  if (wv > 0.05 && !mt7.wind) { const s = c.createBufferSource(); s.buffer = noiseBuf(c); s.loop = true; const f = bp(c, S7.N.fx, 'bandpass', 480, 0.7), g = c.createGain(); g.gain.value = 0; s.connect(g); g.connect(f); s.start(); mt7.wind = { s, g, f }; }
  if (mt7.wind) { if (rnd7() < 0.01) mt7.gust = rr(0.4, 1); mt7.gust *= 0.995; const tgt = wv > 0.05 ? wv * (0.12 + 0.22 * mt7.gust) : 0; mt7.wind.g.gain.setTargetAtTime(tgt, now, 0.4); mt7.wind.f.frequency.setTargetAtTime(380 + 500 * mt7.gust, now, 0.5);
    if (wv <= 0.05 && tgt === 0 && rnd7() < 0.02) { const W0 = mt7.wind; mt7.wind = null; setTimeout(() => { try { W0.s.stop(); W0.g.disconnect(); } catch (e) {} }, 2500); } }
  if (wx && wx.k === 'storm' && performance.now() > mt7.thAt) { mt7.thAt = performance.now() + rr(9000, 26000); if (S7.buf) S7.clip('thunder', { g: rr(0.5, 0.85), rate: rr(0.8, 1.05), pan: rr(-0.5, 0.5), lp: 1600 }, 'fx'); else S7.play('thunderSyn', { g: 0.6 }); }
};
S7.matchFrame = function () {
  const live = W.live, m = W.m, c = S7.ctx; if (!m || !live) return; const A = W.atmoNow ? W.atmoNow() : null, sz = sizeOf(live), b = m.ball;
  if (mt7.m !== m) { mt7.m = m; mt7.ev = m.ev.length; mt7.fl = b.fl; mt7.own = b.owner; mt7.sp = m.sp; mt7.ko0 = m.tick < 60 ? 1 : 0; mt7.chantAt = performance.now() + rr(15000, 30000); }
  if (mt7.ko0 && m.tick > 0) { mt7.ko0 = 0; S7.play('whistle', { ls: [0.6], v: 0.32, must: 1 }); }
  const wx = (live.home && live.home.wx) || (A && A.wx) || null, F = wx ? CC.wxFx(wx) : null, wet = F ? F.wet : 0;
  S7.weather(wx, sz);
  /* crowd bed: louder when attacks build, goals, big games; quieter at half time / before kick-off */
  const el = ((live.kind === 'league' && W.nowS ? W.nowS() : Date.now()) - live.startAt) / 1000, bq7 = m.bcAt ? m.bcAt(el) : null, ht = !!(bq7 && bq7.k === 'ht'), pre = el < 0;
  const cr = A && A.crowd ? A.crowd : { st: [0.08, 0.08] }, poss = b.owner ? b.owner.side : null;
  const dz = poss === 0 ? Math.max(0, (b.x - 62) / 43) : poss === 1 ? Math.max(0, (43 - b.x) / 43) * 0.6 : 0;
  const ex = Math.min(1, HOME * cr.st[0] + (1 - HOME) * cr.st[1] + dz * 0.35), big = !!(A && A.ball && (A.ball.kind === 'final' || A.ball.kind === 'cl'));
  const bedV = sz * (pre || ht ? 0.32 : m.over ? 0.3 : 0.42 + 0.38 * ex) * (big ? 1.12 : 1);
  const L = S7.tex('bedL', 'bed', 'crowd', lo7() ? 0 : -0.55), R = lo7() ? null : S7.tex('bedR', 'bed', 'crowd', 0.55); L.want = bedV * (R ? 0.75 : 1); if (R) R.want = bedV * 0.75;
  if (S7.N.revG) S7.N.revG.gain.setTargetAtTime(0.12 + 0.18 * sz, c.currentTime, 1);
  /* chants + drums + claps every so often while the game is calm (home end), waves when leading late */
  const ch = S7.tex('chant', 'chant', 'crowd', -0.2), nowMs = performance.now();
  if (!pre && !ht && !m.over && nowMs > mt7.chantAt && ex < 0.5) { mt7.chantAt = nowMs + rr(35000, 70000); mt7.chantEnd = nowMs + rr(8000, 13000); if (big || sz > 0.8 || rnd7() < 0.5) S7.play('drum', { beats: [0, 0.5, 1, 1.25, 1.5, 2, 2.5, 3, 3.25, 3.5, 4, 4.5, 5, 5.25, 5.5], v: 0.32, g: sz }, 'crowd'); }
  ch.want = nowMs < (mt7.chantEnd || 0) ? 0.5 * sz : 0;
  if (cr.wave && nowMs > mt7.waveAt) { mt7.waveAt = nowMs + 6500; S7.clip('swell', { g: 0.4 * sz, off: 2, len: 5, pan: rr(-0.5, 0.5) }); }
  /* ⚽ ball: a new flight = a kick (pass / long ball / cross / shot / header); the ball arriving at a player = a touch */
  if (b.fl !== mt7.fl) { const f = b.fl; if (f && f.kind !== 'throw') { const dist = Math.sqrt((f.x1 - f.x0) * (f.x1 - f.x0) + (f.y1 - f.y0) * (f.y1 - f.y0)), sh = f.kind === 'shot';
      const p = sh ? (f.from && f.from.st && f.from.st.shot === 'screamer' ? 1 : f.pen ? 0.85 : 0.82) : f.kind === 'cross' ? 0.62 : Math.min(0.7, 0.25 + dist / 60);
      if (!f.header || !sh) S7.play('kick', { p, wet, pan: panX(f.x0), g: sh ? 1 : 0.8, rv: sh ? 0.3 : 0 }); else S7.play('kick', { p: 0.5, head: 1, pan: panX(f.x0) });
      if (sh) mt7.lastShot = f; mt7.kicks++; }
    else if (!f && mt7.fl && b.owner) S7.play('touch', { wet, pan: panX(b.x), g: 0.6 }); mt7.fl = f; }
  /* 🗣️ whistle when the kick-off / penalty / big free kick is taken */
  if (m.sp !== mt7.sp) { const o = mt7.sp; if (o && !m.sp && ((o.kind === 'ko' && m.tick > 100) || o.kind === 'pen' || o.kind === 'fkd')) S7.play('whistle', { ls: [o.kind === 'ko' ? 0.6 : 0.3], v: 0.3 }, 'fx'); mt7.sp = m.sp; }
  /* match events (only fresh ones: no flood after catching up) */
  if (m.ev.length < mt7.ev) mt7.ev = 0; const news = m.ev.slice(mt7.ev); mt7.ev = m.ev.length; if (news.length > 25) return;
  for (const e of news) { if (e.t != null && m.t - e.t > 0.8) continue; S7.event(e, m, sz, wet); }
};
S7.event = function (e, m, sz, wet) {
  const s = e.side, k = e.k, home = s === 0, sh = shareOf(s), ft = W.TIMING;
  if (k === 'goal') { S7.play('net', { pan: panX(s === 0 ? 103 : 2), g: 0.9 });
    if (home) { S7.clip(rnd7() < 0.5 ? 'roar' : 'roar2', { g: 0.95 * sz, rate: rr(0.97, 1.03) }); setTimeout(() => S7.play('claps', { beats: [0, 0.45, 0.9, 1.2, 1.5], v: 0.4, g: sz }, 'crowd'), 6500); mt7.chantEnd = performance.now() + 14000; }
    else { S7.clip('cheer', { g: 0.55 * sz, pan: 0.55, rate: 1.04 }); S7.play('vowel', { k: 'aww', v: 0.45 * sz }, 'crowd'); } return; }
  if (k === 'save') { const att = 1 - s, sa = shareOf(att); S7.play('gloves', { catch: e.catch, pan: panX(s === 0 ? 3 : 102) }); S7.play('vowel', { k: 'ooh', v: 0.5 * sa * sz }, 'crowd'); S7.clip('swell', { g: 0.45 * sa * sz, off: 4, len: 4.5 }); if (att === 1) S7.clip('cheer', { g: 0.25 * sz, off: 1, len: 3, pan: -0.2 }); return; }
  if (k === 'miss') { const f = mt7.lastShot, near = e.near; let post = false;
    if (near && f && f.y1 != null && !/deflect/.test(e.txt || '')) { const dy = Math.abs(f.y1 - 34); post = dy > 3.2 && dy < 4.3 && (hash('post:' + (m.seed || 0) + ':' + m.tick) % 100) < 55; }
    if (post) S7.play('post', { pan: panX(s === 0 ? 104 : 1), g: 0.9 });
    if (near) { S7.play('vowel', { k: 'ooh', v: (post ? 0.7 : 0.55) * sh * sz }, 'crowd'); S7.clip('swell', { g: 0.4 * sh * sz, off: 3, len: 4 }); } else S7.play('vowel', { k: 'aww', v: 0.2 * sh * sz }, 'crowd'); return; }
  if (k === 'foul') { S7.play('whistle', { ls: [0.2], v: 0.32 }); if (e.sl) S7.play('tackle', { sl: 1, pan: 0 });
    const fouled = 1 - s; if (fouled === 0) { S7.play('fanWhistle', { v: 0.28 * sz }, 'crowd'); S7.play('vowel', { k: 'boo', v: 0.3 * sz }, 'crowd'); } else S7.play('fanWhistle', { v: 0.12 * sz, pan: 0.5 }, 'crowd'); return; }
  if (k === 'yellow' || k === 'red') { S7.play('whistle', { ls: [0.12, 0.35], gap: 0.09, v: 0.34 }); if (s === 1) S7.clip('cheer', { g: (k === 'red' ? 0.5 : 0.3) * sz, off: 1.5, len: 3.5 }); else S7.play('vowel', { k: 'boo', v: (k === 'red' ? 0.6 : 0.4) * sz }, 'crowd'); return; }
  if (k === 'off') { S7.play('whistle', { ls: [0.18], v: 0.3 }); return; }
  if (k === 'pen') { S7.play('whistle', { ls: [0.45], v: 0.4 }); if (s === 0) S7.clip('swell', { g: 0.7 * sz, off: 2, len: 6 }); else S7.play('vowel', { k: 'boo', v: 0.55 * sz }, 'crowd'); return; }
  if (k === 'corner' || (k === 'fk' && /m out/.test(e.txt || ''))) { if (home) S7.play('claps', { beats: [0, 0.4, 0.8], v: 0.3 * sz }, 'crowd'); return; }
  if (k === 'tackle') { S7.play('tackle', { sl: e.sl, pan: 0, g: 0.75 }); return; }
  if (k === 'block') { S7.play('kick', { p: 0.7, pan: 0, g: 0.8 }); if (home === false) S7.clip('cheer', { g: 0.2 * sz, off: 2, len: 2.5 }); return; }
  if (k === 'header' || k === 'duel') { S7.play('kick', { p: 0.45, head: 1 }); return; }
  if (k === 'slip' || k === 'skid') { S7.play('splash', { v: wet ? 0.35 : 0.15 }); if (k === 'slip') S7.play('vowel', { k: 'ooh', v: 0.18 * sz }, 'crowd'); return; }
  if (k === 'skill') { S7.play('vowel', { k: 'aah', v: 0.25 * sh * sz }, 'crowd'); return; }
  if (k === 'ht') { S7.play('whistle', { ls: [0.3, 0.75], gap: 0.15, v: 0.36, must: 1 }); S7.clip('cheer', { g: 0.35 * sz }); return; }
  if (k === 'ft') { S7.play('whistle', { ls: [0.3, 0.3, 0.95], gap: 0.15, v: 0.38, must: 1 }); const d = m.T[0].score - m.T[1].score;
    if (d > 0) S7.clip('roar2', { g: 0.75 * sz, off: 1 }); else if (d === 0) S7.clip('cheer', { g: 0.4 * sz }); else { S7.play('vowel', { k: 'aww', v: 0.4 * sz }, 'crowd'); S7.play('fanWhistle', { v: 0.25 * sz }, 'crowd'); S7.clip('cheer', { g: 0.45 * sz, pan: 0.55 }); } return; }
  if (k === 'shout') { if (s === (W.my > 0 ? 1 : 0)) { S7.play('claps', { beats: [0, 0.35, 0.7, 0.9, 1.1], v: 0.35 * (s === 0 ? 1 : 0.5) * sz, pan: s === 0 ? -0.2 : 0.5 }, 'crowd'); S7.clip('swell', { g: (s === 0 ? 0.4 : 0.2) * sz, off: 2, len: 3.5 }); } return; }
  if (k === 'sub') { S7.clip('cheer', { g: 0.22 * sz, off: 2, len: 3, pan: s === 0 ? -0.3 : 0.5 }); return; }
  if (k === 'alert') { S7.play('alert', {}, 'ui'); return; }
  void ft;
};
/* 🎬 ceremonies: anthem + cheering on the walk-out (fireworks in finals / big nights), the winners' end after full time */
S7.cerFrame = function () {
  const live = W.live, sz = live ? sizeOf(live) : 0.8, t = (performance.now() - mt7.cerT) / 1000, A = W.atmoNow ? W.atmoNow() : null;
  const L = S7.tex('bedL', 'bed', 'crowd', lo7() ? 0 : -0.55), R = lo7() ? null : S7.tex('bedR', 'bed', 'crowd', 0.55); const v = sz * (W._cer === 'open' ? 0.6 : 0.5); L.want = v * (R ? 0.75 : 1); if (R) R.want = v * 0.75;
  S7.tex('chant', 'chant', 'crowd', -0.2).want = W._cer === 'open' && t > 6 ? 0.45 * sz : 0; S7.weather(live && live.home && live.home.wx, sz);
  if (W._cer === 'open' && A && (A.smoke || (A.ball && A.ball.kind === 'final')) && mt7.fw < 6 && t > 1 + mt7.fw * 1.6) { mt7.fw++; S7.clip(['fw1', 'fw3', 'fw6'][mt7.fw % 3], { g: 0.6, pan: rr(-0.7, 0.7), rate: rr(0.9, 1.1) }, 'fx') || S7.play('firework', { pan: rr(-0.7, 0.7) }); }
  if (W._cer === 'close' && mt7.fw === 0 && t > 0.5) { mt7.fw = 1; S7.play('claps', { beats: [0, 0.5, 1, 1.5, 2, 2.5], v: 0.3 * sz }, 'crowd'); }
};
S7.rpFrame = function () {
  const v = G3.view, live = W.live, sz = live ? sizeOf(live) : 0.8; const L = S7.tex('bedL', 'bed', 'crowd', lo7() ? 0 : -0.55), R = S7.tx.bedR; L.want = 0.4 * sz; if (R) R.want = 0.3 * sz; if (S7.tx.chant) S7.tx.chant.want = 0;
  if (v && v.cel && !mt7.rpCel) { mt7.rpCel = true; S7.play('net', { g: 0.7 }); S7.clip('roar', { g: 0.7 * sz, rate: 0.85, off: 1, len: 7 }); }
};
S7.troFrame = function () {
  const t = (performance.now() - mt7.cerT) / 1000; S7.tex('bedL', 'bed', 'crowd', 0).want = 0.5; if (S7.tx.bedR) S7.tx.bedR.want = 0.4;
  if (mt7.fw < 8 && t > 0.6 + mt7.fw * 0.9) { mt7.fw++; S7.clip(['fw1', 'fw3', 'fw6'][mt7.fw % 3], { g: 0.55, pan: rr(-0.8, 0.8), rate: rr(0.9, 1.12) }, 'fx') || S7.play('firework', { pan: rr(-0.8, 0.8) }); }
};
/* ---------- 🔁 the loop: runs while 11 Wonders is open (stops in the background) ---------- */
S7.loop = function () { if (S7._raf) return; const f = () => { S7._raf = null; if (!document.getElementById('w11')) { S7.enter('off'); S7.mode = 'off'; return; } try { S7.frame(); } catch (e) { if (!S7._err++) console.warn('snd', e); } S7._raf = requestAnimationFrame(f); }; S7._err = 0; S7._raf = requestAnimationFrame(f); };
S7.start = function () { if (!S7.init()) return; S7.resume(); S7.load(); S7.loop(); };
document.addEventListener('visibilitychange', () => { const c = S7.ctx; if (!c) return; try { if (document.visibilityState === 'hidden') c.suspend(); else if (document.getElementById('w11')) { c.resume(); S7.loop(); } } catch (e) {} });
/* phones only allow sound after a tap: every tap inside 11 Wonders wakes it (and plays a soft tick on buttons) */
['pointerdown', 'touchend'].forEach(ev => document.addEventListener(ev, (e) => { if (!document.getElementById('w11')) return; S7.resume(); }, true));
document.addEventListener('click', (e) => { const b = e.target && e.target.closest && e.target.closest('#w11 button'); if (!b || b.disabled) return; if (b.closest('#w11sh')) S7.play('tap', { g: 1.3 }, 'ui'); else S7.play('tap', {}, 'ui'); }, true);
W.open = (function (b) { return async function () { try { S7.start(); } catch (e) {} return b.apply(this, arguments); }; })(W.open);
W.close = (function (b) { return function () { const r = b.apply(this, arguments); try { S7.enter('off'); S7.mode = 'off'; if (mt7.wind) { try { mt7.wind.s.stop(); } catch (e) {} mt7.wind = null; } setTimeout(() => { if (!document.getElementById('w11') && S7.ctx) try { S7.ctx.suspend(); } catch (e) {} }, 1800); } catch (e) {} return r; }; })(W.close);
W.tvWipe = (function (b) { return function () { S7.play('whoosh', { g: 0.8 }, 'ui'); return b.apply(this, arguments); }; })(W.tvWipe);
/* 💎 / 🪙: a coin sound when they go up, a softer one when you spend */
W.chips = (function (b) { return function () { const me = W.me, r = b.apply(this, arguments); try { if (me) { const k = [me.coins || 0, me.gems || 0]; if (S7._money && (k[0] !== S7._money[0] || k[1] !== S7._money[1])) S7.play(k[0] > S7._money[0] || k[1] > S7._money[1] ? 'coin' : 'spend', {}, 'ui'); S7._money = k; } } catch (e) {} return r; }; })(W.chips);
W.ui = (function (b) { return function () { const r = b.apply(this, arguments); try { if (W.me && !S7._money) S7._money = [W.me.coins || 0, W.me.gems || 0]; } catch (e) {} return r; }; })(W.ui);
/* 🔨 auctions: ticking in the last 10 s of a lot you lead, a buzz when someone outbids you, a fanfare when you win */
W.mkDraw = (function (b) { return function () { const r = b.apply(this, arguments); try {
  const me = uidNow(), now = W.nowS(), L = W._lots || {}, lead = S7._lead = S7._lead || {}; let tick = 0;
  for (let i = 0; i < CC.MK_N; i++) { const x = L[i]; if (!x) continue; const k = i + ':' + x.n, E = CC.lotEff(x, now), mine = x.u === me && E.top === 'u';
    if (mine && !E.closed) { const ms = E.end - now; if (ms < 10000) tick = Math.max(tick, ms < 3500 ? 2 : 1); }
    if (lead[k] && !mine && !E.closed) S7.play('outbid', {}, 'ui'); if (lead[k] && E.closed && E.winner === 'u' && x.u === me && !S7._won[k]) { S7._won[k] = 1; S7.play('win', {}, 'ui'); } lead[k] = mine && !E.closed ? 1 : (E.closed ? lead[k] : 0); }
  if (tick) S7.play('tick', { hi: tick === 2 }, 'ui');
} catch (e) {} return r; }; })(W.mkDraw);
S7._won = {};
/* ---------- ⚙️ Club HQ → 🔊 Sound ---------- */
W.sndCard = function () { const C = S7.cfg, sl = (k, t) => `<label style="display:flex;align-items:center;gap:10px;margin-top:8px;font-size:12px;font-weight:800"><span style="width:76px">${t}</span><input type="range" min="0" max="100" step="5" value="${C[k]}" oninput="W11.sndSet('${k}',this.value)" style="flex:1;accent-color:#22d3ee" aria-label="${t} volume"><span id="w11sv_${k}" style="width:30px;text-align:right;color:#67e8f9">${C[k]}</span></label>`;
  return `<div class="card" id="w11snd"><p style="font-weight:900">🔊 Sound</p><p style="font-size:11px;color:#94a3b8;margin-top:4px">Stadium sounds, a crowd that follows the game, the referee's whistle, weather, ceremonies and menu music. Your phone's volume buttons work too.</p>
    <button class="${C.on ? 'btn' : 'btn2'}" id="w11son" style="margin-top:8px" onclick="W11.sndToggle()">${C.on ? '🔊 Sound is ON · tap to mute' : '🔇 Sound is OFF · tap to turn on'}</button>
    ${sl('cr', '🏟️ Crowd')}${sl('fx', '⚽ Effects')}${sl('mu', '🎵 Music')}
    <p style="font-size:10px;color:#64748b;margin-top:10px">Crowd recordings: “Free Crowd Cheering Sounds” by Gregor Quendel, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener" style="color:#67e8f9">CC BY 4.0</a> (cut and mixed). Rain, thunder and fireworks: free CC0 recordings. Music, whistle, ball and all other sounds are made by SINLESS GG.</p></div>`; };
W.sndToggle = function () { S7.cfg.on = S7.cfg.on ? 0 : 1; S7.save(); S7.start(); S7.apply(); const el = document.getElementById('w11snd'); if (el) el.outerHTML = W.sndCard(); if (S7.cfg.on) setTimeout(() => S7.play('coin', {}, 'ui'), 120); };
W.sndSet = function (k, v) { S7.cfg[k] = Math.max(0, Math.min(100, Number(v) || 0)); S7.save(); S7.start(); S7.apply(); const o = document.getElementById('w11sv_' + k); if (o) o.textContent = S7.cfg[k];
  clearTimeout(S7._prv); S7._prv = setTimeout(() => { if (k === 'cr') S7.clip('swell', { g: 0.5, off: 4, len: 2.5 }); else if (k === 'fx') S7.play('kick', { p: 0.8 }); }, 180); };
W.hq = (function (b) { return function () { const r = b.apply(this, arguments); try { const bd = document.querySelector('#w11b'); if (bd && !document.getElementById('w11snd')) bd.insertAdjacentHTML('beforeend', W.sndCard()); } catch (e) {} return r; }; })(W.hq);
/* help text */
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🔊 <b>Sound</b>: the crowd reacts to every chance, the referee whistles fouls, half time and full time, and the weather can be heard. Mute it or set the crowd, effects and music volume in 🏟️ Club HQ → 🔊 Sound.</p>`); }; })(W.helpL);
/* tests: render one recipe offline and measure it (peak, loudness) */
S7.offline = async function (name, o, sec) { const OC = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (!OC) return null; const c = new OC(2, Math.floor(44100 * (sec || 2)), 44100); SY[name](c, c.destination, 0.02, o || {}); const b = await c.startRendering(); let pk = 0, ss = 0; const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > pk) pk = v; ss += v * v; } return { peak: pk, rms: Math.sqrt(ss / d.length) }; };

// ---------- 🖥️ G8 · full-screen match (like a console manager game) ----------
/* The match fills the whole screen (100vw × 100vh). Small buttons sit on the left and right edges and open glass
   panels that slide over the pitch: ⭐ Highlights, 📐 Formation (left) and 📣 Tactics, 🧭 Mentality, 🤝 Teamplay (right).
   A camera button switches between 📺 TV, 🏃 Sideline, ⚖️ Balanced and 🗺️ 2D Radar at any time (every match starts on TV).
   Match news and your own orders scroll along the bottom third (white bold text with a shadow).
   Engine 5 (w11eng.js): 🧭 mentality and 🤝 teamplay are real orders (same on every phone, sent like shouts). */
const G8_CSS = `
#w11.fs{padding:0!important}
#w11.fs>.hd{display:none}
#w11.fs .bd.mt{padding:0!important;overflow:hidden}
#w11.fs .w11match{display:block!important;position:absolute;inset:0;width:100vw;height:100vh;height:100dvh;gap:0}
#w11.fs .w11pitch{position:absolute!important;inset:0;display:flex;align-items:center;justify-content:center}
#w11.fs .w11pitch>[data-g4]{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
#w11.fs .w11pitch canvas{border-radius:10px}
#w11.fs #w11l3{border-radius:0!important;box-shadow:none!important}
#w11.fs .w11side{display:none!important}
#w11.fs #w11v3b,#w11.fs .w11bug{display:none!important}
#w11.fs #w11ov .ov{position:fixed;z-index:29;background:rgba(5,8,20,.9)}
#w11.fs #w11ov .ov[data-ht]{background:rgba(5,8,20,.72);backdrop-filter:blur(4px)}
#w11.fs #w11rp>div:nth-child(2){top:62px!important;left:max(14px,env(safe-area-inset-left))!important}
#w11.fs #w11lt{left:max(78px,calc(env(safe-area-inset-left) + 70px));bottom:calc(max(12px,env(safe-area-inset-bottom)) + 70px)}
#g8ui{position:absolute;inset:0;z-index:28;pointer-events:none;color:#fff;font-family:inherit}
#g8ui button{pointer-events:auto;font-family:inherit;color:#fff}
#g8top{position:absolute;left:0;right:0;top:max(8px,env(safe-area-inset-top));display:flex;align-items:flex-start;justify-content:center;padding:0 max(10px,env(safe-area-inset-right)) 0 max(10px,env(safe-area-inset-left))}
#g8top .g8b{position:absolute;top:0;width:42px;height:42px;border-radius:13px;font-size:17px;background:rgba(7,11,24,.72);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.18);box-shadow:0 2px 10px rgba(0,0,0,.45)}
#g8top .g8back{left:max(10px,env(safe-area-inset-left))}
#g8top .g8cam{right:max(10px,env(safe-area-inset-right));width:auto;padding:0 12px;font-size:12px;font-weight:900;letter-spacing:.04em}
#g8top .sb{pointer-events:none;display:flex;align-items:center;gap:10px;margin:0;padding:6px 8px 6px 6px;border-radius:12px;background:rgba(7,11,24,.8);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.16);box-shadow:0 2px 14px rgba(0,0,0,.55);font-size:13px;text-shadow:0 1px 3px #000;max-width:62vw}
#g8top .sb>span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#g8top .sb .sc{font-size:19px;min-width:52px;text-align:center;padding:1px 6px;border-radius:8px;background:rgba(255,255,255,.1)}
#g8top .sb .tm{order:-1;font-size:11px;padding:4px 8px;border-radius:8px;color:#070b18;background:linear-gradient(90deg,#22d3ee,#a855f7)}
#g8al{position:absolute;left:50%;top:calc(max(8px,env(safe-area-inset-top)) + 48px);transform:translateX(-50%);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:900;letter-spacing:.06em;background:linear-gradient(90deg,#ff2d95,#a855f7);box-shadow:0 0 18px rgba(255,45,149,.6);text-shadow:0 1px 3px rgba(0,0,0,.6);display:none;white-space:nowrap}
#g8al.on{display:block;animation:w11p 1s ease-in-out 4}
.g8rail{position:absolute;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:8px}
#g8L{left:max(8px,env(safe-area-inset-left))}#g8R{right:max(8px,env(safe-area-inset-right))}
.g8rail button{width:58px;min-height:54px;padding:6px 2px 5px;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:19px;line-height:1;background:rgba(7,11,24,.7);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.16);box-shadow:0 2px 10px rgba(0,0,0,.45);transition:transform .15s,background .15s}
.g8rail button small{font-size:8px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#cbd5e1;max-width:56px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.g8rail button.on{background:linear-gradient(135deg,rgba(34,211,238,.9),rgba(168,85,247,.9));border-color:transparent}.g8rail button.on small{color:#070b18}
.g8rail button.hot{animation:w11p 1s ease-in-out 4;border-color:#ff2d95}
.g8rail button:active{transform:scale(.94)}
.g8p{position:absolute;top:calc(max(8px,env(safe-area-inset-top)) + 52px);bottom:calc(max(10px,env(safe-area-inset-bottom)) + 62px);width:min(46vw,370px);overflow-y:auto;pointer-events:auto;padding:12px;border-radius:18px;background:rgba(7,11,24,.86);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.14);box-shadow:0 8px 30px rgba(0,0,0,.6);transition:transform .28s cubic-bezier(.2,.8,.2,1),opacity .28s;opacity:0}
.g8p.l{left:calc(max(8px,env(safe-area-inset-left)) + 66px);transform:translateX(-30px)}.g8p.r{right:calc(max(8px,env(safe-area-inset-right)) + 66px);transform:translateX(30px)}
.g8p.open{opacity:1;transform:none}.g8p:not(.open){pointer-events:none}
.g8p h4{font-size:11px;font-weight:900;letter-spacing:.14em;color:#67e8f9;margin:0 0 8px}
.g8p p.g8h{font-size:11px;color:#94a3b8;margin:8px 0 0;line-height:1.35}
.g8p .g8g{display:grid;gap:7px}
.g8p .g8o{width:100%;padding:11px 10px;border-radius:13px;font-size:13px;font-weight:900;text-align:left;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12)}
.g8p .g8o.on{background:linear-gradient(90deg,#22d3ee,#a855f7);color:#070b18;border-color:transparent}
.g8p .g8o small{display:block;font-size:10px;font-weight:700;opacity:.75;margin-top:2px}
.g8p .g8f{display:flex;flex-wrap:wrap;gap:6px}.g8p .g8f button{padding:8px 10px;border-radius:10px;font-size:12px;font-weight:900;background:rgba(255,255,255,.08)}.g8p .g8f button.on{background:linear-gradient(90deg,#22d3ee,#a855f7);color:#070b18}
.g8tp{display:grid;grid-template-columns:1fr auto 30px auto;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:12px;font-weight:800}
.g8tp button{width:34px;height:34px;border-radius:10px;font-size:18px;font-weight:900;background:rgba(255,255,255,.1)}
.g8tp b{text-align:center;font-size:16px}.g8tp i{grid-column:1/-1;height:6px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;font-style:normal}.g8tp i u{display:block;height:100%;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95)}
.g8st{width:100%;font-size:12px;border-collapse:collapse;margin-top:4px}.g8st td{padding:4px 2px;text-align:center}.g8st td:nth-child(2){color:#94a3b8;font-size:11px}
.g8hl{display:flex;gap:8px;align-items:baseline;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:12px}.g8hl em{font-style:normal;color:#67e8f9;font-weight:900;min-width:34px}
#g8tk{position:absolute;left:50%;transform:translateX(-50%);bottom:max(12px,env(safe-area-inset-bottom));width:min(62vw,640px);pointer-events:none;text-align:center}
#g8tk .tick{margin:0;min-height:0;font-size:inherit}
#g8tk .tick p{margin:0 auto;padding:0;color:#fff;font-weight:900;text-shadow:0 2px 4px #000,0 0 10px rgba(0,0,0,.85)}
#g8tk .tick p:first-child{display:inline-block;max-width:100%;font-size:15px;padding:8px 16px;border-radius:12px;background:linear-gradient(90deg,rgba(7,11,24,.15),rgba(7,11,24,.78) 12%,rgba(7,11,24,.78) 88%,rgba(7,11,24,.15));border-bottom:2px solid #22d3ee}
#g8tk .tick p:first-child.new{animation:g8in .45s cubic-bezier(.2,.8,.2,1)}
#g8tk .tick p:nth-child(2){font-size:12px;opacity:.78;margin-bottom:6px;order:-1}
#g8tk .tick{display:flex;flex-direction:column-reverse}
#g8tk .tick p:nth-child(n+3){display:none}
#g8tk .tick p span{color:#67e8f9!important;margin-right:4px}
@keyframes g8in{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}
#g8cm{position:absolute;right:max(10px,env(safe-area-inset-right));top:calc(max(8px,env(safe-area-inset-top)) + 48px);display:none;flex-direction:column;gap:6px;pointer-events:auto;padding:8px;border-radius:14px;background:rgba(7,11,24,.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.16)}
#g8cm.open{display:flex}#g8cm button{padding:9px 14px;border-radius:10px;font-size:12px;font-weight:900;text-align:left;background:rgba(255,255,255,.07)}#g8cm button.on{background:linear-gradient(90deg,#22d3ee,#a855f7);color:#070b18}
#w11.fs.g8cer #g8ui,#w11.fs.g8tro #g8ui{display:none}
#w11.fs.g8rp #g8tk{display:none}
@media (max-height:340px){.g8rail button{min-height:46px;width:52px;font-size:16px}.g8rail{gap:5px}#g8tk .tick p:first-child{font-size:13px;padding:6px 12px}}`;
const g8css = () => { if (!document.getElementById('w11g8')) { const s = document.createElement('style'); s.id = 'w11g8'; s.textContent = G8_CSS; document.head.appendChild(s); } };

/* 🎥 cameras: every match starts on the TV camera */
W.CAMS = [['tv', '📺', 'TV'], ['side', '🏃', 'Sideline'], ['bal', '⚖️', 'Balanced'], ['radar', '🗺️', '2D Radar']];
W.cam = 'tv';
/* G8: every phone (Low too) starts the live match in 3D; Low runs it at the lowest quality (fewer fans, no shadows, 30 fps) */
W.v3pref = () => G3.ok();
/* G12: closer cameras (owner: "cameras are just too far") */
const camTarget = (mode, X, Z) => mode === 'side' ? { eye: [X * 0.94, 3.2, Math.min(40, Math.max(37, Z + 14))], at: [X, 1.0, Z * 0.9], fov: 38 }
  : mode === 'bal' ? { eye: [X * 0.9, 8, Math.min(46, Z * 0.35 + 43)], at: [X * 0.97, 0.6, Z * 0.8], fov: 42 } : null;
W.v3live = (function (b) { return function (box) {
  const v = b(box), s0 = v.step; let c2 = null, lastMode = 'tv';
  v.step = function (dt, now) { const cam = s0.call(this, dt, now); if (!cam) return cam; const mode = W.cam;
    const tg = camTarget(mode, PX(v.bx), PZ(v.by)); if (!tg) { lastMode = mode; c2 = null; return cam; }
    const k = c2 && lastMode === mode ? 1 - Math.exp(-dt * 3) : 1; lastMode = mode;
    c2 = { eye: sm(c2 && k < 1 ? c2.eye : null, tg.eye, k), at: sm(c2 && k < 1 ? c2.at : null, tg.at, Math.min(1, k * 1.4)), fov: tg.fov }; return c2; };
  return v; }; })(W.v3live);
W.camSet = function (mode) {
  if (!W.CAMS.some(c => c[0] === mode)) return; W.cam = mode;
  if (mode === 'radar') W.v3set(false); else if (!W.v3.on) W.v3set(true);
  if (mode !== 'radar' && !W.v3.on) { W.cam = 'radar'; toast('🗺️ 3D is not available on this phone, showing the 2D radar'); }
  const cm = document.getElementById('g8cm'); if (cm) cm.classList.remove('open'); W.g8sync(true);
};
W.camMenu = function () { const cm = document.getElementById('g8cm'); if (!cm) return; cm.innerHTML = W.CAMS.map(([k, i, n]) => `<button class="${W.cam === k ? 'on' : ''}" onclick="W11.camSet('${k}')">${i} ${n}</button>`).join(''); cm.classList.toggle('open'); W.g8panel(null); };

/* 🧭 mentality + 🤝 teamplay: your choice is kept on this phone and sent at kick-off of every match */
const TP_NAME = [['⚔️', 'Attack', 'Sharper shooting and dribbling'], ['🛡️', 'Defence', 'Stronger tackles, keeper and blocks'], ['🔁', 'Possession', 'Cleaner, calmer passing'], ['🔋', 'Condition', 'Faster legs, less tiring late on']];
W.tpSaved = () => { try { const v = JSON.parse(localStorage.getItem('w11_tp') || 'null'); if (W.tpOk(v)) return v; } catch (e) {} return [5, 5, 5, 5]; };
const myT = () => (W.m && W.my >= 0 ? W.m.T[W.my > 0 ? 1 : 0] : null);
const ctlOn = () => W.my === 0 || W.my === 1;
W.menSet = function (v) { const t = myT(); if (!t || !W.m || W.m.over) return; v = Number(v); W._menWant = v; W.command({ men: v }); W.g8sync(true); };
W.tpDraft = null;
W.tpAdj = function (i, d) { const t = myT(); if (!t) return; const v = (W.tpDraft || t.tp).slice(), left = W.TP_SUM - v.reduce((a, b) => a + b, 0);
  if (d > 0 && (left <= 0 || v[i] >= W.TP_MAX)) return; if (d < 0 && v[i] <= 0) return; v[i] += d; W.tpDraft = v; W.g8panel('tp', true); };
W.tpApply = function () { const v = W.tpDraft; if (!v || !W.tpOk(v)) return; try { localStorage.setItem('w11_tp', JSON.stringify(v)); } catch (e) {} W._tpWant = v.join(); W.command({ tp: v }); W.tpDraft = null; W.g8panel('tp', true); };
W.tpReset = function () { W.tpDraft = [5, 5, 5, 5]; W.g8panel('tp', true); };

/* panels */
const PANELS = { hl: ['l', '⭐', 'Highlights'], form: ['l', '📐', 'Formation'], tac: ['r', '📣', 'Tactics'], men: ['r', '🧭', 'Mentality'], tp: ['r', '🤝', 'Teamplay'] };
const HL_K = { goal: 1, save: 1, pen: 1, red: 1, yellow: 1, sub: 1, miss: 1, ht: 1, ft: 1, added: 1, men: 1, tp: 1, form: 1, shout: 1, off: 1 };
W.g8open = null;
W.g8panel = function (k, refresh) {
  const ui = document.getElementById('g8ui'); if (!ui) return;
  if (!refresh) { W.g8open = W.g8open === k ? null : k; if (k !== 'tp') W.tpDraft = null; const cm = document.getElementById('g8cm'); if (cm && k) cm.classList.remove('open'); }
  ['l', 'r'].forEach(side => { const p = document.getElementById('g8p' + side); if (!p) return; const cur = W.g8open && PANELS[W.g8open][0] === side ? W.g8open : null;
    p.classList.toggle('open', !!cur); if (cur) { const sh0 = document.getElementById('w11sh'), pk = document.getElementById('g8park'); if (sh0 && pk && p.contains(sh0)) pk.appendChild(sh0); p.innerHTML = W.g8body(cur); const sh = document.getElementById('w11sh'); if (cur === 'tac' && sh && !p.contains(sh)) p.querySelector('[data-sh]').appendChild(sh); } });
  ui.querySelectorAll('.g8rail button[data-p]').forEach(b => b.classList.toggle('on', b.dataset.p === W.g8open));
  /* the shout buttons live in the Tactics panel; park them when it closes so W.feed can still mark the active one */
  const sh = document.getElementById('w11sh'), park = document.getElementById('g8park'); if (sh && park && W.g8open !== 'tac' && !park.contains(sh)) park.appendChild(sh);
};
W.g8body = function (k) {
  const m = W.m, t = myT(), live = W.live; if (!m) return '';
  if (k === 'hl') {
    const a = m.T[0], b = m.T[1], pt = a.poss + b.poss || 1, row = (x, y, n) => `<tr><td>${x}</td><td>${n}</td><td>${y}</td></tr>`;
    const ev = m.ev.filter(e => HL_K[e.k] && e.txt).slice(-14).reverse();
    const tip = document.querySelector('#w11 .w11side2 .tip');
    return `<h4>⭐ HIGHLIGHTS</h4><table class="g8st"><tr><td style="color:${a.color};font-weight:900">${esc(a.short)}</td><td></td><td style="color:${b.color};font-weight:900">${esc(b.short)}</td></tr>${row(Math.round(a.poss / pt * 100) + '%', Math.round(b.poss / pt * 100) + '%', 'Possession')}${row(a.shots, b.shots, 'Shots')}${row(a.onT, b.onT, 'On target')}${row(a.corners || 0, b.corners || 0, 'Corners')}${row(a.fouls || 0, b.fouls || 0, 'Fouls')}${row(W.MEN[a.men + 2][0], W.MEN[b.men + 2][0], 'Mentality')}</table>
      <div style="margin-top:8px">${ev.length ? ev.map(e => `<div class="g8hl"><em>${esc(String(e.min))}'</em><span>${esc(e.txt)}</span></div>`).join('') : '<p class="g8h">Big moments show up here.</p>'}</div>${tip ? `<p class="g8h">${esc(tip.textContent)}</p>` : ''}<p class="g8h">🎬 Goals replay in 3D after they happen. All goal replays are on the full-time screen.</p>`;
  }
  if (!t) return '<p class="g8h">👀 You are watching this match.</p>';
  if (k === 'form') return `<h4>📐 FORMATION</h4><div class="g8f">${Object.keys(W.FORMS).map(f => `<button class="${f === t.form ? 'on' : ''}" onclick="W11.command({form:'${f}'}); setTimeout(() => W11.g8panel('form', true), 60)">${f}</button>`).join('')}</div>
    <button class="g8o" style="margin-top:12px" onclick="W11.subMenu()">🔁 Substitutions <small>${t.subsLeft} left</small></button><p class="g8h">Formation changes and subs reach the pitch ${live && live.kind === 'league' ? '2 seconds after you tap' : 'straight away'}.</p>`;
  if (k === 'tac') return `<h4>📣 TACTICS · TOUCHLINE SHOUTS</h4><div data-sh></div><p class="g8h">📣 Attack: more men forward · 🧱 Tight: hold your shape · ⚡ Press: hunt the ball · 🧘 Calm: keep the ball. Tap again to stop shouting. Every 30 seconds a touchline moment lights this button up.</p>`;
  if (k === 'men') { const want = W._menWant != null ? W._menWant : t.men;
    return `<h4>🧭 MENTALITY</h4><div class="g8g">${W.MEN.slice().reverse().map(([v, n]) => `<button class="g8o ${Number(v) === t.men ? 'on' : ''}" onclick="W11.menSet(${v})">${n}${Number(v) === want && want !== t.men ? ' <small>⏳ on the pitch in a moment</small>' : ''}<small>${{ 2: 'All in: more goals for you, and more against', 1: 'Push up and shoot more', 0: 'Balanced', '-1': 'Drop deeper, fewer risks', '-2': 'Park the bus: hard to score against, hard to score' }[v]}</small></button>`).join('')}</div><p class="g8h">Changes how your whole team plays, right now. Hard attacking tires legs faster.</p>`; }
  if (k === 'tp') { const v = W.tpDraft || t.tp, used = v.reduce((a, b) => a + b, 0), dirty = W.tpDraft && W.tpDraft.join() !== t.tp.join();
    return `<h4>🤝 TEAMPLAY · ${W.TP_SUM - used} POINTS LEFT</h4>${TP_NAME.map(([i, n, d], k2) => `<div class="g8tp"><span>${i} ${n}<br><small style="color:#94a3b8;font-weight:700;font-size:10px">${d}</small></span><button onclick="W11.tpAdj(${k2},-1)">−</button><b>${v[k2]}</b><button onclick="W11.tpAdj(${k2},1)">+</button><i><u style="width:${v[k2] * 10}%"></u></i></div>`).join('')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px"><button class="g8o" style="text-align:center" onclick="W11.tpReset()">↺ Even (5 each)</button><button class="g8o ${dirty ? 'on' : ''}" style="text-align:center" ${dirty ? '' : 'disabled'} onclick="W11.tpApply()">✅ Apply</button></div>
      <p class="g8h">You have ${W.TP_SUM} points for 4 areas (max ${W.TP_MAX} each). 5 each is even. Points you add to one area come from another. Your split is saved and used at the start of your next matches too.</p>`; }
  return '';
};

/* build the full-screen layer once the match screen is on */
W.g8build = function () {
  const host = document.getElementById('w11'), mt = host && host.querySelector('.w11match'); if (!mt) return;
  g8css(); host.classList.add('fs'); if (document.getElementById('g8ui')) return;
  const back = host.querySelector('.hd .bk'), bk = back ? back.getAttribute('onclick') : 'W11.leaveMatch()', ctl = ctlOn();
  const ui = document.createElement('div'); ui.id = 'g8ui';
  ui.innerHTML = `<div id="g8top"><button class="g8b g8back" onclick="${bk}" aria-label="Back">←</button><button class="g8b g8cam" id="g8camb" onclick="W11.camMenu()"></button></div><div id="g8al">📢 TOUCHLINE MOMENT · SHOUT NOW!</div><div id="g8cm"></div>
    <div class="g8rail" id="g8L">${['hl', ctl ? 'form' : null].filter(Boolean).map(k => `<button data-p="${k}" onclick="W11.g8panel('${k}')">${PANELS[k][1]}<small>${PANELS[k][2]}</small></button>`).join('')}</div>
    ${ctl ? `<div class="g8rail" id="g8R">${['tac', 'men', 'tp'].map(k => `<button data-p="${k}" onclick="W11.g8panel('${k}')">${PANELS[k][1]}<small>${PANELS[k][2]}</small></button>`).join('')}</div>` : ''}
    <div class="g8p l" id="g8pl"></div><div class="g8p r" id="g8pr"></div><div id="g8tk"></div><div id="g8park" style="display:none"></div>`;
  host.appendChild(ui);
  const sb = mt.querySelector('.sb'); if (sb) ui.querySelector('#g8top').insertBefore(sb, ui.querySelector('.g8cam'));
  const tk = document.getElementById('w11tk'); if (tk) ui.querySelector('#g8tk').appendChild(tk);
  const sh = document.getElementById('w11sh'); if (sh) ui.querySelector('#g8park').appendChild(sh);
  W.g8open = null; W.tpDraft = null; W._menWant = null; W._tpWant = null; W.cam = W.v3.on ? (W.camPref ? W.camPref() : 'tv') : 'radar';
  clearInterval(W._g8iv); W._g8iv = setInterval(() => { if (!document.getElementById('g8ui')) { clearInterval(W._g8iv); return; } W.g8sync(); }, 250);
  W.g8sync(true);
};
W.g8sync = function (force) {
  const host = document.getElementById('w11'), ui = document.getElementById('g8ui'); if (!host || !ui) return;
  host.classList.toggle('g8cer', !!W._cer); host.classList.toggle('g8rp', !!W._rp); host.classList.toggle('g8tro', !!W._tro);
  if (W.cam !== 'radar' && !W.v3.on && !W._cer && !W._rp && !(W.cine && W.cine.cur)) W.cam = 'radar';
  const cb = document.getElementById('g8camb'), c = W.CAMS.find(x => x[0] === W.cam); if (cb && c) cb.textContent = c[1] + ' ' + c[2] + ' ▾';
  const t = myT(), mb = ui.querySelector('[data-p="men"]'); if (t && mb) { const n = W.MEN[t.men + 2]; mb.innerHTML = `${n[1].split(' ')[0]}<small>${n[1].replace(/^\S+ /, '')}</small>`; }
  if (t && W._menWant === t.men) W._menWant = null;
  const fb = ui.querySelector('[data-p="form"] small'); if (t && fb) fb.textContent = t.form;
  /* refresh the open panel now and then (stats, subs left, pending orders) — never the teamplay draft */
  const sig = W.m ? [W.m.ev.length, t ? t.men + t.form + t.subsLeft + t.tp.join() : ''].join('|') : '';
  if (W.g8open && (force || sig !== W._g8sig) && !(W.g8open === 'tp' && W.tpDraft)) W.g8panel(W.g8open, true);
  W._g8sig = sig;
};
/* the touchline moment lights up the Tactics button + a banner under the score */
W.pulse = (function (b) { return function () { b.apply(this, arguments); const al = document.getElementById('g8al'), tb = document.querySelector('#g8R [data-p="tac"]'); if (!al) return;
  al.classList.remove('on'); void al.offsetWidth; al.classList.add('on'); if (tb) { tb.classList.remove('hot'); void tb.offsetWidth; tb.classList.add('hot'); }
  clearTimeout(W._g8pT); W._g8pT = setTimeout(() => { al.classList.remove('on'); if (tb) tb.classList.remove('hot'); }, 8000); }; })(W.pulse);
/* ticker: the newest line slides in */
W.feed = (function (b) { return function (m) { const el = document.getElementById('w11tk'), old = el && el.firstElementChild ? el.firstElementChild.textContent : ''; b.apply(this, arguments);
  if (el && !el.firstElementChild && m && m.T) el.innerHTML = `<p>⚽ GAME TIME! ${esc(m.T[0].name)} vs ${esc(m.T[1].name)}</p>`;
  if (el && el.firstElementChild && el.firstElementChild.textContent !== old) el.firstElementChild.classList.add('new'); }; })(W.feed);
/* start every match with your saved teamplay split */
W.play = (function (b) { return function (live) {
  let c0 = null; if (live && live.kind !== 'league' && Array.isArray(live.cmds) && !live.cmds.some(c => c && c.c && c.c.tp)) { const tp = W.tpSaved(); if (tp.join() !== '5,5,5,5') { c0 = { tick: 0, side: 0, c: { tp } }; live.cmds.push(c0); try { localStorage.setItem('w11_live', JSON.stringify(live)); } catch (e) {} } }
  const r = b.apply(this, arguments);
  /* before kick-off nothing has been simulated yet, so put the tick-0 order on the pitch now (resumed matches already have it) */
  if (c0 && W.m && W.m.tick === 0 && !W.m.cmds.includes(c0)) { W.m.applyCmd(0, c0.c); W.m.cmds.push(c0); }
  W.g8build(); return r; }; })(W.play);
W.playL = (function (b) { return async function (live, my) { const r = await b.apply(this, arguments); W.g8build();
  try { const tp = W.tpSaved(); if ((my === 0 || my === 1) && tp.join() !== '5,5,5,5' && W.m && W.m.tick < 4000 && !(W._cmds || []).some(c => c.side === my && c.c && c.c.tp)) { W._quiet = 1; await W.sendL({ tp }); W._quiet = 0; } } catch (e) { W._quiet = 0; }
  return r; }; })(W.playL);
W.ui = (function (b) { return function () { const r = b.apply(this, arguments); const h = document.getElementById('w11'); if (h && !h.querySelector('.w11match')) { h.classList.remove('fs', 'g8cer', 'g8rp', 'g8tro'); clearInterval(W._g8iv); } return r; }; })(W.ui);
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🖥️ <b>Full-screen match</b>: the pitch fills your screen. Buttons on the left (⭐ Highlights, 📐 Formation) and right (📣 Tactics, 🧭 Mentality, 🤝 Teamplay) open panels over the pitch; tap again to close. Match news runs along the bottom. Switch the camera at the top right: 📺 TV, 🏃 Sideline, ⚖️ Balanced or 🗺️ 2D Radar.</p>
    <p style="margin-top:6px">🧭 <b>Mentality</b> (Hard defending → Hard attacking) changes how your whole team plays at once. Hard attacking scores more but also lets in more, and tires legs faster. 🤝 <b>Teamplay</b>: share ${W.TP_SUM} points between Attack, Defence, Possession and Condition (max ${W.TP_MAX} each; 5 each is even). Both are real orders: they change the match for both managers in the same way.</p>`); }; })(W.helpL);
/* the 3D goal camera has its own row of shout buttons; in full screen the side buttons stay on top instead */
W.cineStart = (function (b) { return function () { const r = b.apply(this, arguments); const el = document.getElementById('w11cine'), h = document.getElementById('w11');
  if (el && h && h.classList.contains('fs')) [...el.children].forEach(d => { if (d.querySelector && d.querySelector('button[onclick*="shout"]')) d.remove(); }); return r; }; })(W.cineStart);

/* ================= G9 · 11 Wonders human fidelity: 📸 player profile card =================
   The 3D (w3d.js v5) now has athlete proportions, real 3D hair/beards, natural brows, skin sheen and a crowd of real people.
   Here: a studio portrait of the player (rendered once by G3.B3.portrait, kept for the session) on top of his ⋯ menu,
   with his name, position, rating and a radar of his attributes. Fictional players only (names are already checked by FAMOUS). */
W.PORTR = new Map();
W.portraitOf = function (id) {
  const B = W.G3 && W.G3.B3; if (!B || !B.ready || !B.portrait) return null;
  const me = W.me || {}, p = W.player(id), K = W.kitN((me.kits || [])[0]), key = id + '|' + JSON.stringify(K) + '|' + (p && p.name) + '|' + (p && p.num);
  if (W.PORTR.has(key)) return W.PORTR.get(key);
  let url = null; try { const T = B.team(K, null, me.crest || null, me.short || ''); url = B.portrait(T, p && p.pos === 'GK', id, p && p.num, 720, 900); } catch (e) { url = null; }
  if (url) { W.PORTR.set(key, url); if (W.PORTR.size > 12) W.PORTR.delete(W.PORTR.keys().next().value); }
  return url;
};
W.radarSvg = function (p) {
  const gk = p.pos === 'GK', L = gk ? [['Diving', p.gk], ['Pace', p.pac], ['Passing', p.pas], ['Kicking', p.sho], ['Reflexes', Math.round((p.gk * 2 + p.def) / 3)], ['Handling', p.def]]
    : [['Pace', p.pac], ['Shooting', p.sho], ['Passing', p.pas], ['Dribbling', p.dri], ['Defending', p.def], ['Physical', Math.round((p.def + p.pac + p.ovr) / 3)]];
  const cx = 110, cy = 92, R = 58, pt = (i, r) => { const a = -Math.PI / 2 + i * Math.PI / 3; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
  const ring = (f) => L.map((_, i) => pt(i, R * f).map(v => v.toFixed(1)).join(',')).join(' ');
  const val = L.map(([, v], i) => pt(i, R * Math.max(0.08, Math.min(1, (v || 0) / 99))).map(v => v.toFixed(1)).join(',')).join(' ');
  const lab = L.map(([n, v], i) => { const [x, y] = pt(i, R + 22), a = x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle'; return `<text x="${x.toFixed(1)}" y="${(y - 3).toFixed(1)}" text-anchor="${a}" font-size="10" fill="#cbd5e1">${n}</text><text x="${x.toFixed(1)}" y="${(y + 9).toFixed(1)}" text-anchor="${a}" font-size="11" font-weight="900" fill="#fff">${v || 0}</text>`; }).join('');
  return `<svg viewBox="0 0 220 190" style="width:100%;max-width:230px;display:block"><polygon points="${ring(1)}" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)"/><polygon points="${ring(0.66)}" fill="none" stroke="rgba(255,255,255,.1)"/><polygon points="${ring(0.33)}" fill="none" stroke="rgba(255,255,255,.1)"/>
    <polygon points="${val}" fill="rgba(34,211,238,.35)" stroke="#22d3ee" stroke-width="2"/>${lab}</svg>`;
};
W.profileCard = function (id) {
  const me = W.me || {}, p = W.player(id); if (!p) return '';
  let crest = ''; try { crest = W.crestSvg(me.crest, me.short, 260); } catch (e) {}
  const dp = (() => { try { return W11C.dpOf(p); } catch (e) { return p.pos; } })();
  return `<div id="w11pc" style="position:relative;overflow:hidden;border-radius:16px;margin-bottom:10px;background:radial-gradient(120% 90% at 70% 30%,#1b2140 0%,#0b0f24 60%,#060914 100%);border:1px solid rgba(255,255,255,.08);min-height:250px">
    <div style="position:absolute;right:-30px;top:10px;width:260px;opacity:.07;pointer-events:none">${crest}</div>
    <div id="w11pcImg" style="position:absolute;right:0;bottom:0;width:58%;height:100%;display:flex;align-items:flex-end;justify-content:center"><p style="font-size:11px;color:#64748b;margin:auto">📸 Making his portrait…</p></div>
    <div style="position:relative;padding:12px 12px 6px;width:52%"><div style="border-left:4px solid #22d3ee;padding-left:8px"><p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">PLAYER PROFILE</p>
      <p style="font-weight:900;font-size:17px;line-height:1.15">${esc(p.name)}</p><p style="font-size:12px;color:#cbd5e1;font-weight:900">${dp} · ${p.ovr} OVR · ${p.flag || ''}</p></div>
      <div style="margin-top:6px">${W.radarSvg(p)}</div></div>
    <p style="position:absolute;right:10px;bottom:6px;font-size:10px;font-weight:900;color:rgba(255,255,255,.55)">11 WONDERS</p></div>`;
};
W.pMenu = (function (b) { return function (id) { const r = b.apply(this, arguments);
  try { const ov = document.getElementById('w11pm'), card = ov && ov.querySelector('.card'); if (!card || document.getElementById('w11pc')) return r;
    card.insertAdjacentHTML('afterbegin', W.profileCard(id));
    const fill = () => { const box = document.getElementById('w11pcImg'); if (!box) return; const url = W.portraitOf(id);
      if (url) box.innerHTML = `<img src="${url}" alt="" style="height:100%;max-width:100%;object-fit:contain;object-position:bottom;display:block">`;
      else if (W.w3d && W.w3d.st === 1 && (fill.n = (fill.n || 0) + 1) < 40) setTimeout(fill, 500);
      else box.innerHTML = `<p style="font-size:11px;color:#64748b;margin:auto;text-align:center;padding:10px">3D portrait needs 3D graphics on this phone</p>`; };
    setTimeout(fill, 30);
  } catch (e) {} return r; }; })(W.pMenu);

/* ================================================================================================
   G11 · ONE SCREEN, NO SCROLLING. 11 Wonders is locked to the phone screen like a native game.
   Every screen is fitted after it is drawn (and again when it changes or the phone turns):
     1. a card that is taller than the screen gets its list split into pages  ‹ 1/3 ›  (tap to see more)
     2. if the cards still don't fit, they are split into tabs at the bottom (tap a tab to see the other things)
     3. a card that still can't fit (long help text) is shrunk a little, then paged by paragraph
   Match screens: the side panels (tactics, subs) get the same list pages. Nothing ever scrolls.
   Taps: every button reacts on the frame it is touched (pressed look + no 300 ms delay).
   ================================================================================================ */
const FIT_CSS = `
html.w11on,html.w11on body{overflow:hidden!important;overscroll-behavior:none}
#w11{height:100%;height:100dvh;overflow:hidden;overscroll-behavior:none;touch-action:manipulation;-webkit-user-select:none;user-select:none}
#w11 .hd{min-height:40px!important;padding:3px 12px!important;padding-top:max(3px,env(safe-area-inset-top))!important;flex:none}
#w11 .hd b{font-size:14px!important}#w11 .bk{width:36px!important;height:36px!important}
#w11 .bd{overflow:hidden!important;position:relative;min-height:0}
#w11 .bd:not(.mt){grid-template-columns:repeat(auto-fit,minmax(240px,1fr))!important;gap:8px!important;padding:8px 12px 6px!important}
#w11 .card{padding:10px 12px;border-radius:14px}
#w11 .row{padding:5px 4px!important;font-size:12px!important}
#w11 .btn{padding:11px!important;font-size:13px!important}#w11 .btn2{padding:9px!important;font-size:12px!important}
#w11 .tip{padding:6px 8px;margin-top:6px}
#w11 select,#w11 input{max-width:100%;min-width:0}
#w11 .w11two{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:14px;align-content:start}#w11 .w11two>*{min-width:0}#w11 .w11two>:not(.row){grid-column:1/-1}
#w11 .g8p,#w11 .ov,#w11 .w11side2{overflow:hidden!important}
#w11 button{touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .06s,filter .06s}
#w11 button.w11tap{transform:scale(.96);filter:brightness(1.25)}
.w11pg{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:6px}
.w11pg button{min-width:46px;height:30px;border-radius:10px;background:rgba(255,255,255,.08);font-weight:900;font-size:14px}
.w11pg button:disabled{opacity:.3}
.w11pg span{font-size:11px;font-weight:900;color:#94a3b8;min-width:44px;text-align:center}
#w11tabs{display:flex;gap:6px;padding:4px 12px;padding-bottom:max(6px,env(safe-area-inset-bottom));flex:none}
#w11tabs button{flex:1;min-width:0;padding:8px 6px;border-radius:12px;font-size:11px;font-weight:900;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#w11tabs button.on{background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24;border-color:transparent}
#w11 .w11hide,.w11hide{display:none!important}`;
W.fitCss = function () { if (document.getElementById('w11fit')) return; const st = document.createElement('style'); st.id = 'w11fit'; st.textContent = FIT_CSS; document.head.appendChild(st); };
const FIT = { busy: false, key: '', pg: {}, tab: 0, raf: 0, tm: 0, mo: null };
const visible = (e) => e && e.nodeType === 1 && !/^(STYLE|SCRIPT)$/.test(e.tagName) && getComputedStyle(e).display !== 'none' && !e.classList.contains('w11pg');
const fitsIn = (box, H) => box.getBoundingClientRect().height <= H + 1;
/* our own DOM changes must not wake the observer again */
const quiet = () => { const h = document.getElementById('w11'); if (h && h._fitMo) h._fitMo.takeRecords(); };
/* the biggest list inside a box: an element with 4+ visible children that are all row-sized */
const listIn = (box) => { let best = null, bs = 0; const scan = (e, d) => { if (d > 6) return; const ch = [...e.children].filter(visible);
    if (ch.length >= 4) { const hs = ch.map(c => c.offsetHeight), tot = hs.reduce((a, b) => a + b, 0); if (Math.max(...hs) < 130 && tot > bs) { bs = tot; best = e; } }
    for (const c of ch) scan(c, d + 1); };
  scan(box, 0); return best; };
const labelOf = (e) => { let h = null; for (const q of e.querySelectorAll('p,b,span,div,button')) { if (q.children.length > 2) continue; const t = (q.innerText || '').trim(); if (t && parseInt(getComputedStyle(q).fontWeight) >= 800 && t.length > 2) { h = t; break; } }
  const t = h || e.innerText || ''; return t.split('\n').map(s => s.trim()).filter(Boolean)[0] || '•'; };
/* split the children of list L (inside box) into pages so the box fits in H */
function pageList(box, L, H, key) {
  const items = [...L.children].filter(visible); if (items.length < 2) return false;
  const pg = document.createElement('div'); pg.className = 'w11pg'; pg.innerHTML = '<button data-d="-1">‹</button><span></span><button data-d="1">›</button>';
  if (L === box) box.appendChild(pg); else L.after(pg);
  let per = items.length; while (per > 1 && !fitsIn(box, H)) { per--; items.forEach((it, i) => it.classList.toggle('w11hide', i >= per)); }
  FIT.per = per; if (per >= items.length) { pg.remove(); items.forEach(it => it.classList.remove('w11hide')); return fitsIn(box, H); }
  const n = Math.ceil(items.length / per); let cur = Math.min(FIT.pg[key] || 0, n - 1);
  const show = () => { items.forEach((it, i) => it.classList.toggle('w11hide', Math.floor(i / per) !== cur)); pg.children[1].textContent = `${cur + 1} / ${n}`; pg.children[0].disabled = cur === 0; pg.children[2].disabled = cur === n - 1; FIT.pg[key] = cur; };
  pg.onclick = (ev) => { const d = Number(ev.target && ev.target.dataset && ev.target.dataset.d); if (!d) return; ev.stopPropagation(); cur = Math.max(0, Math.min(n - 1, cur + d)); FIT.busy = true; show(); quiet(); FIT.busy = false; };
  show(); return fitsIn(box, H);
}
function fitBox(box, H, key) {
  if (fitsIn(box, H)) return true;
  /* a wide screen with 3+ columns: let a tall card take 2 columns first (text gets shorter, lists stay long) */
  const bd = box.parentElement, cols = bd && getComputedStyle(bd).gridTemplateColumns.split(' ').length;
  if (cols >= 3 && !box.style.gridColumn) { box.style.gridColumn = 'span 2'; box.dataset.fz = 1; if (fitsIn(box, H)) return true; }
  /* a list inside: rows in two columns when there is room, then pages of at least 3 rows */
  const L = listIn(box);
  if (L) { if (L.clientWidth >= 500) L.classList.add('w11two'); if (pageList(box, L, H, key) && (FIT.per || 9) >= 3) return true; undoList(L); }
  /* forms and pictures (designers, stadium): shrink to fit, down to 60 % */
  const z0 = H / box.getBoundingClientRect().height; if (z0 >= 0.6) { box.style.zoom = String(Math.max(0.6, z0 - 0.01)); box.dataset.fz = 1; if (fitsIn(box, H)) return true; box.style.zoom = ''; }
  /* last resort: pages of the list (any size), shrink the rest */
  if (L && L.clientWidth >= 500) L.classList.add('w11two'); if (L && pageList(box, L, H, key)) return true;
  const z = Math.max(0.6, H / box.getBoundingClientRect().height); box.style.zoom = String(z); box.dataset.fz = 1; if (fitsIn(box, H)) return true;
  /* no list and too much to shrink: pages of the card's own blocks (each shrunk if needed) */
  box.style.zoom = ''; if (L) undoList(L); let host = box; while (host.children.length === 1 && host.firstElementChild.children.length) host = host.firstElementChild;
  if ([...host.children].filter(visible).length >= 2) { pageList(box, host, H, key + 'b'); if (fitsIn(box, H)) return true; }
  const z2 = Math.max(0.5, H / box.getBoundingClientRect().height); box.style.zoom = String(z2); box.dataset.fz = 1; return fitsIn(box, H);
}
function undoList(L) { L.classList.remove('w11two'); [...L.children].forEach(c => c.classList.remove('w11hide')); const g = L.nextElementSibling && L.nextElementSibling.classList.contains('w11pg') ? L.nextElementSibling : L.querySelector(':scope > .w11pg'); if (g) g.remove(); }
function reset(root) { root.querySelectorAll('.w11two').forEach(e => e.classList.remove('w11two')); root.querySelectorAll('.w11hide').forEach(e => e.classList.remove('w11hide')); root.querySelectorAll('.w11pg').forEach(e => e.remove()); root.querySelectorAll('[data-fz]').forEach(e => { e.style.zoom = ''; e.style.gridColumn = ''; delete e.dataset.fz; }); if (root.dataset && root.dataset.fz) { root.style.zoom = ''; root.style.gridColumn = ''; delete root.dataset.fz; } }
W.fit = function () {
  const h = document.getElementById('w11'), bd = document.getElementById('w11b'); if (!h || !bd || FIT.busy) return; FIT.busy = true;
  try {
    const title = (h.querySelector('.hd b') || {}).textContent || ''; if (title !== FIT.key) { FIT.key = title; FIT.pg = {}; FIT.tab = 0; }
    let tabs = document.getElementById('w11tabs');
    if (bd.classList.contains('mt')) { if (tabs) tabs.remove(); reset(h);
      /* match: side panels and pick-lists */
      h.querySelectorAll('.g8p, .ov, .w11side2').forEach((p, i) => { if (!visible(p) || p.offsetHeight < 40) return; const L = listIn(p); if (L && p.scrollHeight > p.clientHeight + 1) pageListIn(p, L, 'm' + i); });
      return; }
    reset(bd); if (tabs) tabs.remove(); tabs = null;
    const cs = getComputedStyle(bd), padV = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    let H = bd.clientHeight - padV; const items = [...bd.children].filter(visible);
    items.forEach((it, i) => { if (it.getBoundingClientRect().height > H + 1) fitBox(it, H, 'c' + i); });
    if (bd.scrollHeight <= bd.clientHeight + 1 || items.length < 2) return;
    /* tabs: groups of cards that fit together; tap a tab to see the other things */
    tabs = document.createElement('div'); tabs.id = 'w11tabs'; tabs.innerHTML = '<button>•</button>'; bd.after(tabs);
    H = bd.clientHeight - padV; items.forEach((it, i) => { reset(it); if (it.getBoundingClientRect().height > H + 1) fitBox(it, H, 'c' + i); });
    const pages = []; let page = [];
    items.forEach(it => it.classList.add('w11hide'));
    for (const it of items) { it.classList.remove('w11hide'); if (page.length && bd.scrollHeight > bd.clientHeight + 1) { page.forEach(x => x.classList.add('w11hide')); pages.push(page); page = []; } page.push(it); }
    if (page.length) pages.push(page);
    const cur = Math.min(FIT.tab, pages.length - 1); FIT.tab = cur;
    const show = (k) => { FIT.busy = true; pages.forEach((p, j) => p.forEach(x => x.classList.toggle('w11hide', j !== k))); [...tabs.children].forEach((b, j) => b.classList.toggle('on', j === k)); FIT.tab = k; quiet(); FIT.busy = false; };
    tabs.innerHTML = pages.map(p => `<button>${esc(labelOf(p[0]).slice(0, 26))}</button>`).join('');
    [...tabs.children].forEach((b, j) => { b.onclick = (ev) => { ev.stopPropagation(); show(j); }; });
    show(cur); FIT.busy = true;
  } catch (e) { console.warn('fit', e); } finally { quiet(); FIT.busy = false; }
};
/* panels inside the match keep their own height: page their list to fit */
function pageListIn(p, L, key) { const H = p.clientHeight; const items = [...L.children].filter(visible); if (items.length < 2) return;
  const pg = document.createElement('div'); pg.className = 'w11pg'; pg.innerHTML = '<button data-d="-1">‹</button><span></span><button data-d="1">›</button>'; L.after(pg);
  let per = items.length; while (per > 1 && p.scrollHeight > H + 1) { per--; items.forEach((it, i) => it.classList.toggle('w11hide', i >= per)); }
  const n = Math.ceil(items.length / per); if (n <= 1) { pg.remove(); return; } let cur = Math.min(FIT.pg[key] || 0, n - 1);
  const show = () => { items.forEach((it, i) => it.classList.toggle('w11hide', Math.floor(i / per) !== cur)); pg.children[1].textContent = `${cur + 1} / ${n}`; pg.children[0].disabled = cur === 0; pg.children[2].disabled = cur === n - 1; FIT.pg[key] = cur; };
  pg.onclick = (ev) => { const d = Number(ev.target && ev.target.dataset && ev.target.dataset.d); if (!d) return; ev.stopPropagation(); cur = Math.max(0, Math.min(n - 1, cur + d)); FIT.busy = true; show(); quiet(); FIT.busy = false; };
  show(); }
W.fitSoon = function () { if (FIT.busy || FIT.raf || FIT.tm) return; const bd = document.getElementById('w11b');
  /* live match: the ticker changes all the time; only panels/pick-lists need fitting, at most ~3 times a second */
  if (bd && bd.classList.contains('mt')) { if (!document.querySelector('#w11 .g8p, #w11 .ov')) return; FIT.tm = setTimeout(() => { FIT.tm = 0; W.fit(); }, 300); return; }
  FIT.raf = requestAnimationFrame(() => { FIT.raf = 0; W.fit(); }); };
W.ui = (function (b) { return function () { W.fitCss(); const r = b.apply(this, arguments); document.documentElement.classList.add('w11on');
  const h = document.getElementById('w11');
  if (h && !h._fitMo && typeof MutationObserver !== 'undefined') { h._fitMo = new MutationObserver(() => { if (!FIT.busy) W.fitSoon(); }); h._fitMo.observe(h, { childList: true, subtree: true }); }
  if (h && !h._tapOn) { h._tapOn = 1; h.addEventListener('pointerdown', (e) => { const bt = e.target.closest && e.target.closest('button'); if (bt) { bt.classList.add('w11tap'); setTimeout(() => bt.classList.remove('w11tap'), 140); } }, { passive: true }); }
  W.fit(); return r; }; })(W.ui);
W.close = (function (b) { return function () { document.documentElement.classList.remove('w11on'); return b.apply(this, arguments); }; })(W.close);
if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('resize', () => { if (document.getElementById('w11')) W.fitSoon(); });

/* ================================================================================================
   G12 · NEW INTERFACES (owner's 7 reference screens). Native-game look: night stadium behind every screen,
   neon glass cards, big bold numbers, nothing scrolls (every screen is laid out for a landscape phone).
     🏠 Hub (W.leagueHome when in the league): club · next match (league or cup, whichever is first) · division,
        Transfer Market, Youth Draft, then Squad / Cups · Club HQ / Hall of Fame.
     ⚽ Match centre (W.matchC): next league match, forecast, VS card with a live countdown, 8 tiles, Boot Camp bar.
     🔨 Transfer Market: filters left, the selected auction big on top, a live table of all auctions under it.
     👕 Squad: formation list · pitch with the XI + bench · player list (paged). Tab 🎯 Set pieces: takers + ONE style each.
     📇 Player profile: portrait, OVR + stars, positions, stats in groups, tabs Overview / Style / Positions / Name.
   ONE player style (owner: "players should have one player style"): W.oneStyle(p) picks a single style from his stats.
   (G13 makes the match engine use it; here it is shown everywhere a style is shown.)
   ================================================================================================ */
const G12CSS = `
#w11{background:#050816!important;isolation:isolate}
#w11::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:
 radial-gradient(38% 30% at 6% 14%,rgba(255,255,255,.22),rgba(150,190,255,.06) 45%,transparent 70%),
 radial-gradient(38% 30% at 94% 14%,rgba(255,255,255,.22),rgba(150,190,255,.06) 45%,transparent 70%),
 radial-gradient(70% 45% at 50% 100%,rgba(34,197,94,.30),transparent 70%),
 linear-gradient(180deg,transparent 18%,rgba(120,140,220,.07) 19%,rgba(120,140,220,.04) 40%,transparent 41%),
 linear-gradient(180deg,#05081a 0%,#0a1238 22%,#101a46 38%,#0c1a33 56%,#0b2e25 74%,#0a2a1c 100%)}
#w11::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(5,8,22,.25),rgba(5,8,22,.55))}
#w11 .hd{background:transparent!important;border:0!important;gap:10px}
#w11 .hd .bk{border-radius:12px!important;background:rgba(255,255,255,.07)!important;border:1px solid rgba(255,255,255,.12)!important}
#w11 .hd b{font-size:clamp(15px,5vh,22px)!important;font-weight:900;letter-spacing:.02em;background:linear-gradient(90deg,#22d3ee,#a855f7 60%,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent!important}
#w11 .chips span{padding:5px 12px!important;border-radius:99px!important;font-weight:900!important;font-size:clamp(12px,3.8vh,16px)!important;background:linear-gradient(180deg,rgba(40,70,160,.55),rgba(20,30,80,.6))!important;border:1px solid rgba(120,160,255,.35)!important}
#w11 .chips span+span{background:linear-gradient(180deg,rgba(120,90,20,.5),rgba(60,40,10,.6))!important;border-color:rgba(250,204,21,.35)!important}
#w11 .card{background:linear-gradient(160deg,rgba(42,54,120,.50),rgba(16,20,50,.66))!important;border:1px solid rgba(140,160,255,.22)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.10),0 8px 22px rgba(0,0,0,.35)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
#w11 .btn2{background:linear-gradient(160deg,rgba(42,54,120,.55),rgba(16,20,50,.7))!important;border:1px solid rgba(140,160,255,.25)!important;border-radius:14px!important;font-weight:900}
#w11b.g12bd{display:block!important;padding:4px 12px 8px!important}
.g12{height:100%;min-height:0;display:grid;gap:clamp(6px,2vh,12px);color:#fff;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.g12,.g12 *{box-sizing:border-box}.g12 p{margin:0}
.g12 .gc{position:relative;min-height:0;overflow:hidden;border-radius:18px;padding:clamp(8px,2.6vh,14px) clamp(10px,2vw,16px);background:linear-gradient(160deg,rgba(46,58,128,.52),rgba(16,20,52,.70));border:1px solid rgba(140,160,255,.24);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 10px 26px rgba(0,0,0,.38);-webkit-backdrop-filter:blur(9px);backdrop-filter:blur(9px)}
.g12 .gc.hot{border:2px solid transparent;background:linear-gradient(160deg,rgba(40,30,110,.78),rgba(14,16,48,.84)) padding-box,linear-gradient(135deg,#22d3ee,#a855f7 55%,#ff2d95) border-box;box-shadow:0 0 26px rgba(168,85,247,.35),0 10px 26px rgba(0,0,0,.4)}
.g12 button{border:0;color:#fff;font:inherit;cursor:pointer;background:none}
.g12 .tile{display:flex;align-items:center;gap:clamp(8px,1.6vw,14px);text-align:left;width:100%;height:100%;min-height:0}
.g12 .tile .ic{font-size:clamp(22px,8vh,40px);line-height:1;flex:none;filter:drop-shadow(0 4px 8px rgba(0,0,0,.4))}
.g12 .t1{font-weight:900;font-size:clamp(13px,4.6vh,20px);line-height:1.1}
.g12 .t2{font-weight:800;font-size:clamp(11px,3.4vh,15px);color:#c7d2fe}
.g12 .pk{color:#ff5fae}.g12 .cy{color:#22d3ee}.g12 .gd{color:#facc15}.g12 .mu{color:#94a3b8}.g12 .lm{color:#a3e635}
.g12 .dot{display:inline-block;width:8px;height:8px;border-radius:99px;background:#ff2d95;box-shadow:0 0 8px #ff2d95;margin-left:6px;vertical-align:middle;animation:g12b 1.4s infinite}
@keyframes g12b{50%{opacity:.35}}
.g12 .cap{font-size:clamp(9px,2.9vh,12px);font-weight:900;letter-spacing:.08em;color:#67e8f9;text-transform:uppercase}
.g12 .big{font-weight:900;font-size:clamp(30px,13vh,64px);line-height:1}
.g12 .crest{flex:none;display:grid;place-items:center}.g12 .crest svg{width:100%!important;height:100%!important}
.g12 .stat{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:14px;padding:6px;background:rgba(10,14,40,.55);border:1px solid rgba(140,160,255,.22)}
.g12 .stat b{font-size:clamp(16px,6.5vh,30px);font-weight:900;line-height:1}.g12 .stat span{font-size:clamp(10px,3vh,13px);font-weight:800}
.g12 .cta{width:100%;border-radius:14px;padding:clamp(7px,2.4vh,12px);font-weight:900;font-size:clamp(12px,4vh,17px);background:linear-gradient(90deg,#0ea5e9,#7c3aed 55%,#db2777);box-shadow:0 0 20px rgba(168,85,247,.45)}
.g12 .cta2{width:100%;border-radius:14px;padding:clamp(7px,2.4vh,12px);font-weight:900;font-size:clamp(12px,4vh,17px);background:rgba(10,14,40,.6);border:1px solid rgba(140,160,255,.3)!important}
.g12 .chip{padding:clamp(5px,1.8vh,9px) clamp(8px,1.4vw,14px);border-radius:12px;font-weight:900;font-size:clamp(11px,3.4vh,15px);background:rgba(10,14,40,.6);border:1px solid rgba(140,160,255,.22)!important;white-space:nowrap}
.g12 .chip.on{background:linear-gradient(90deg,#0ea5e9,#7c3aed);border-color:transparent!important;box-shadow:0 0 14px rgba(34,211,238,.35)}
.g12 .pgr{display:flex;align-items:center;justify-content:center;gap:10px;flex:none}
.g12 .pgr button{min-width:44px;height:clamp(24px,7vh,32px);border-radius:10px;background:rgba(255,255,255,.08);font-weight:900}
.g12 .pgr button:disabled{opacity:.3}.g12 .pgr span{font-size:11px;font-weight:900;color:#94a3b8;min-width:40px;text-align:center}
.g12 .ovr{display:inline-grid;place-items:center;min-width:clamp(26px,8vh,38px);height:clamp(22px,7vh,32px);border-radius:9px;font-weight:900;font-size:clamp(12px,3.8vh,16px);color:#0b0f24}
.g12 .rl{display:inline-block;padding:1px 6px;border-radius:6px;font-size:clamp(9px,2.8vh,11px);font-weight:900;background:rgba(250,204,21,.18);color:#fde68a;border:1px solid rgba(250,204,21,.35);margin-right:3px}
.g12 .stars{letter-spacing:1px;font-size:clamp(10px,3.2vh,14px);white-space:nowrap}
.g12 .stars i{font-style:normal;color:#facc15}.g12 .stars i.h{background:linear-gradient(90deg,#facc15 50%,rgba(255,255,255,.18) 50%);-webkit-background-clip:text;background-clip:text;color:transparent}.g12 .stars i.e{color:rgba(255,255,255,.18)}
.g12 .sty{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:9px;font-weight:900;font-size:clamp(10px,3.2vh,13px);color:#0b0f24;white-space:nowrap}
.g12 .bar{display:inline-block;flex:none;vertical-align:middle;height:clamp(6px,2vh,9px);border-radius:99px;background:rgba(255,255,255,.1);overflow:hidden}.g12 .bar i{display:block;height:100%;border-radius:99px}
.g12 .tb{width:100%;border-collapse:collapse;table-layout:fixed}
.g12 .tb th{font-size:clamp(9px,2.8vh,12px);font-weight:900;color:#67e8f9;text-align:left;padding:3px 4px;letter-spacing:.04em}
.g12 .tb td{font-size:clamp(11px,3.4vh,14px);font-weight:800;padding:0 4px;height:clamp(22px,7.2vh,32px);border-top:1px solid rgba(255,255,255,.06);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.g12 .tb tr.g12s td{background:rgba(34,211,238,.12)}.g12 .tb tr.mine td{background:rgba(163,230,53,.10)}
.g12 .tok{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;width:clamp(44px,9vw,70px)}.g12 .tok .dp{position:absolute;top:-2px;right:2px;font-size:clamp(7px,2.3vh,10px);font-weight:900;padding:0 3px;border-radius:4px;background:rgba(5,8,22,.85)}
.g12 .tok .nm{margin-top:1px;padding:1px 5px;border-radius:6px;background:rgba(5,8,22,.82);font-size:clamp(9px,2.7vh,11px);font-weight:900;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;border:1px solid rgba(255,255,255,.12)}
.g12 .tok.g12s .nm{background:#22d3ee;color:#0b0f24}.g12 .tok.g12s svg{filter:drop-shadow(0 0 8px #22d3ee)}
.g12 .tok svg{width:clamp(22px,8.2vh,34px);height:auto;filter:drop-shadow(0 3px 4px rgba(0,0,0,.5))}
.g12 .pitch{position:relative;border-radius:14px;overflow:hidden;background:repeating-linear-gradient(180deg,#1f8f43 0 10%,#22a04b 10% 20%);box-shadow:inset 0 0 40px rgba(0,0,0,.45)}
.g12 .pitch svg.ln{position:absolute;inset:0;width:100%;height:100%}
#w11pm.g12pm{position:fixed;inset:0;z-index:99999;overflow:hidden!important;padding:0!important;background:#050816}
`;
const G12 = { pg: {} };
W.g12Css = function () { if (document.getElementById('w11g12')) return; const s = document.createElement('style'); s.id = 'w11g12'; s.textContent = G12CSS; document.head.appendChild(s); };
/* every G12 screen fits by design: the G11 auto-fitter leaves it alone */
W.fit = (function (b) { return function () { const bd = document.getElementById('w11b');
  if (bd && bd.firstElementChild && bd.firstElementChild.classList.contains('g12')) { const t = document.getElementById('w11tabs'); if (t) t.remove(); return; }
  if (bd) bd.classList.remove('g12bd'); return b.apply(this, arguments); }; })(W.fit);
W.ui = (function (b) { return function () { W.g12Css(); return b.apply(this, arguments); }; })(W.ui);
/* draw a G12 screen: the usual header + one full-height grid */
const g12ui = (html, title, back, cols, rows) => { W.ui(`<div class="g12" style="grid-template-columns:${cols || '1fr'};grid-template-rows:${rows || '1fr'}">${html}</div>`, title, back); const bd = document.getElementById('w11b'); if (bd) bd.classList.add('g12bd'); requestAnimationFrame(g12pages); };

/* ---------- small pieces ---------- */
const g12hms = (ms) => { ms = Math.max(0, ms); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60; return h ? `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s` : `${m}:${String(s).padStart(2, '0')}`; };
const g12hm = (ms) => { ms = Math.max(0, ms); const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60; return h ? `${h}h ${m}m` : `${m}m ${Math.floor(ms / 1000) % 60}s`; };
const g12crest = (hue, sh, size) => `<span class="crest" style="width:${size};height:calc(${size} * 1.13)"><svg viewBox="0 0 46 52"><defs><linearGradient id="g12c${hue}${esc(sh)}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},85%,58%)"/><stop offset="1" stop-color="hsl(${(hue + 50) % 360},80%,34%)"/></linearGradient></defs><path d="M23 2 L44 9 L41 34 Q37 45 23 50 Q9 45 5 34 L2 9 Z" fill="url(#g12c${hue}${esc(sh)})" stroke="rgba(255,255,255,.9)" stroke-width="2"/><text x="23" y="31" text-anchor="middle" font-size="13" font-weight="900" fill="#fff" font-family="system-ui">${esc(sh)}</text></svg></span>`;
const g12mine = (size) => { const me = W.me; return `<span class="crest" style="width:${size};height:calc(${size} * 1.13)">${me.crest ? W.crestSvg(me.crest, me.short) : badge(W.club(me.club), me.short)}</span>`; };
W.g12stars = (ovr) => { const v = Math.max(0.5, Math.min(5, Math.round(((ovr - 35) / 11) * 2) / 2)); let s = ''; for (let i = 1; i <= 5; i++) s += v >= i ? '<i>★</i>' : v >= i - 0.5 ? '<i class="h">★</i>' : '<i class="e">★</i>'; return `<span class="stars">${s}</span>`; };
const g12ovr = (p) => `<span class="ovr" style="${p.legend ? 'background:linear-gradient(135deg,#facc15,#ff2d95,#a855f7);color:#fff' : 'background:' + ovrColor(p.ovr)}">${p.ovr}</span>`;
const g12shirt = (c1, c2, num) => `<svg viewBox="0 0 40 40"><path d="M13 3 L8 5 L1 12 L6 19 L10 16 L10 37 L30 37 L30 16 L34 19 L39 12 L32 5 L27 3 Q20 9 13 3 Z" fill="${c1}" stroke="rgba(0,0,0,.45)" stroke-width="1.4"/><path d="M13 3 Q20 9 27 3" fill="none" stroke="${c2}" stroke-width="2.4"/><text x="20" y="29" text-anchor="middle" font-size="13" font-weight="900" fill="${c2}" stroke="rgba(0,0,0,.55)" stroke-width=".7" font-family="system-ui">${num}</text></svg>`;
const g12pos = { GK: '#facc15', DEF: '#22d3ee', MID: '#a855f7', FWD: '#ff2d95' };

/* ---------- ONE player style: W.STYLE1 + W.oneStyle now live in the engine (G13, engine 6) ---------- */
W.styleChip = (p) => { const S = W.STYLE1[W.oneStyle(p)]; return `<span class="sty" style="background:${S[3]}">${S[0]} ${S[1]}</span>`; };

/* ---------- pages: a .gpg box shows as many rows of its .glist as fit, ‹ n/N › to see more ---------- */
function g12pages() {
  document.querySelectorAll('#w11 .gpg').forEach(box => {
    const L = box.querySelector('.glist'), key = box.dataset.k || 'x'; if (!L) return; const rows = [...L.children]; if (!rows.length) return;
    let pg = box.querySelector('.pgr'); rows.forEach(r => r.style.display = '');
    const avail = L.parentElement.getBoundingClientRect().bottom - L.getBoundingClientRect().top - (pg ? 0 : 0);
    const room = box.getBoundingClientRect().bottom - L.getBoundingClientRect().top - (pg ? pg.offsetHeight + 4 : 34) - 6;
    const head = L.tagName === 'TBODY' ? 0 : 0; let per = rows.length, used = 0;
    for (let i = 0; i < rows.length; i++) { used += rows[i].getBoundingClientRect().height; if (used > room + head) { per = Math.max(1, i); break; } }
    void avail;
    const n = Math.ceil(rows.length / per); let cur = Math.min(G12.pg[key] || 0, n - 1);
    if (!pg) { pg = document.createElement('div'); pg.className = 'pgr'; pg.innerHTML = '<button data-d="-1">‹</button><span></span><button data-d="1">›</button>'; box.appendChild(pg);
      pg.onclick = (e) => { const d = Number(e.target.dataset && e.target.dataset.d); if (!d) return; e.stopPropagation(); G12.pg[key] = Math.max(0, Math.min(n - 1, (G12.pg[key] || 0) + d)); g12pages(); }; }
    pg.style.visibility = n > 1 ? 'visible' : 'hidden';
    rows.forEach((r, i) => { r.style.display = Math.floor(i / per) === cur ? '' : 'none'; });
    pg.children[1].textContent = `${cur + 1} / ${n}`; pg.children[0].disabled = cur === 0; pg.children[2].disabled = cur >= n - 1; G12.pg[key] = cur;
  });
}
W.g12pages = g12pages;
if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('resize', () => { if (document.querySelector('#w11 .gpg')) requestAnimationFrame(g12pages); });

/* ================================== 🏠 HUB ================================== */
const LH0 = W.leagueHome;
W.leagueHome = async function () {
  if (!W.inLeague()) return LH0.apply(this, arguments);
  const me = W.me, now = W.nowS(), { s: cs, day } = CC.clock(now); W.S = cs;
  const G = await W.loadG(); if (!G) return LH0.apply(this, arguments);
  try { await W.loadCups(); } catch (e) {}
  if (!document.getElementById('w11') || W.live) return;
  const tb = CC.table(G, now), rank = tb.findIndex(r => r.pos === me.lg.pos), row = tb[rank] || { pts: 0, p: 0, w: 0, d: 0, l: 0 }, z = zone(G.t, rank), zt = CC.zoneOfG(G.t, G.g);
  const ln = W.nextMatch(G), cn = W._nextCup;
  const L = ln ? { ko: ln.ko, id: ln.id, title: `⚽ League · Matchday ${ln.md}`, short: `Matchday ${ln.md}`, opp: seatName(G, ln.home ? ln.ap : ln.hp, ln.md), home: ln.home } : null;
  const C = cn ? (() => { const o = cupNm(cn.C, cn.opp); return { ko: cn.ko, id: cn.mid, title: `🏆 ${CC.CUP_NAME[cn.k]} · ${CC.roundName(cn.C, cn.r)}`, short: CC.roundName(cn.C, cn.r), opp: o, home: cn.home }; })() : null;
  const A = L && C ? (C.ko < L.ko ? C : L) : (L || C), B = A === L ? C : L;
  const ydone = me.yd === cs, boot = (me.boot || []).length, gift = W.giftWaiting();
  const centre = A ? (() => { const ms = A.ko - now, live = ms <= 0, soon = ms < 15 * 60000;
    return `<div class="gc hot" style="display:flex;flex-direction:column;align-items:center;text-align:center;cursor:pointer" onclick="${A === L ? 'W11.matchC()' : 'W11.cups()'}">
      <p class="t1" style="font-size:clamp(14px,5.6vh,26px);letter-spacing:.02em">${live ? '<span class="pk">● LIVE NOW</span> · ' : ''}${esc(A.title).toUpperCase()}</p>
      <div style="height:1px;width:92%;background:rgba(255,255,255,.14);margin:clamp(4px,1.6vh,10px) 0"></div>
      <div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:clamp(10px,2vw,20px);width:100%">${g12crest(A.opp.hue, A.opp.sh, 'clamp(40px,17vh,76px)')}<div style="text-align:left;min-width:0"><p class="mu" style="font-weight:900;font-size:clamp(10px,3vh,13px)">${A.home ? 'HOME vs' : 'AWAY @'}</p><p style="font-weight:900;font-size:clamp(18px,8.4vh,40px);line-height:1.05;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:32vw">${esc(A.opp.n)}</p>${A.opp.user ? '<p class="cy" style="font-size:11px;font-weight:900">👤 real manager</p>' : ''}</div></div>
      <p class="t2" style="color:#93c5fd">🗓️ ${esc(localT(A.ko, true))}</p>
      <p style="font-weight:900;font-size:clamp(14px,5.4vh,24px);color:#22d3ee;text-shadow:0 0 14px rgba(34,211,238,.6)" id="g12cd" data-ko="${A.ko}">${live ? 'Playing now' : '⏱️ Starts in ' + g12hm(ms)}</p>
      ${soon ? `<button class="cta" style="margin-top:6px" onclick="event.stopPropagation();W11.openL('${A.id}')">${live ? '▶ Go to the touchline' : '🔒 Team sheet locked · open match'}</button>` : B ? `<button class="cta2" style="margin-top:6px;display:flex;align-items:center;gap:8px;justify-content:center" onclick="event.stopPropagation();${B === L ? 'W11.matchC()' : 'W11.cups()'}"><span>${B === L ? '⚽' : '🏆'} THEN · ${esc(B.short).toUpperCase()}</span><span class="mu" style="font-size:.8em">vs ${esc(B.opp.n)} · ${esc(localT(B.ko))}</span></button>` : `<button class="cta2" style="margin-top:6px" onclick="event.stopPropagation();W11.matchC()">⚽ MATCH CENTRE</button>`}</div>`; })()
    : `<div class="gc hot" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer" onclick="W11.matchC()"><p class="t1">${day >= 27 ? `🏁 Season ${cs} is over` : '⚽ No match right now'}</p><p class="t2" style="margin-top:6px">${day >= 27 ? `Season ${cs + 1} starts ${esc(localT(CC.dayStart(cs + 1, 1), true))}` : 'Your next match shows here.'}</p><button class="cta2" style="margin-top:12px">⚽ MATCH CENTRE</button></div>`;
  const left = `<div class="gc" style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:clamp(2px,1vh,6px)">
      ${g12mine('clamp(44px,19vh,92px)')}
      <p style="font-weight:900;font-size:clamp(15px,6.4vh,30px);line-height:1.05;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(me.name).toUpperCase()}</p>
      ${me.pioneer ? '<p class="gd" style="font-weight:900;font-size:clamp(11px,3.6vh,16px)">🛡️ Founder</p>' : ''}
      <p class="t2">Team ${W.avg(me.ids)} OVR · ${esc(me.form)}</p><p class="t2 mu">Season ${cs} · Day ${day}/28</p>
      ${gift ? `<button class="cta" onclick="W11.gift()">🎁 Claim your Pioneer wonder</button>` : `<div style="display:flex;gap:8px;width:100%;flex:1;min-height:0;max-height:16vh"><button class="stat" onclick="W11.energyL()"><b>⚡ ${me.energy}</b><span>Energy</span></button><button class="stat" onclick="W11.squad()"><b>🩹 ${me.med}</b><span>Med-Packs</span></button></div>`}</div>`;
  const right = `<div style="display:grid;grid-template-rows:1.5fr 1fr 1fr;gap:clamp(6px,2vh,12px);min-height:0">
      <div class="gc" style="cursor:pointer;display:flex;flex-direction:column;justify-content:center" onclick="W11.tableL()"><p class="cap" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Division ${G.t} · Group ${CC.groupNo(G.t, G.g)} · ${CC.ZONE_FLAG[zt]} ${esc(CC.ZONE_NAME[zt])}</p>
        <p class="big">${ord(rank + 1)}</p><p class="t2" style="color:#e2e8f0">${row.pts} pts · P${row.p} W${row.w} D${row.d} L${row.l}</p><p style="font-size:clamp(10px,3vh,13px);font-weight:800;margin-top:2px;color:${z === 'up' ? '#22d3ee' : z === 'down' ? '#ff5fae' : '#cbd5e1'}">${z === 'up' ? '⬆️ Promotion place' : z === 'down' ? '⬇️ Relegation zone' : 'Tap for the full table →'}</p></div>
      <button class="gc tile" onclick="W11.market()"><span class="ic">🔨</span><span><span class="t1" style="display:block">Transfer Market</span><span class="t2 pk">15 live auctions<span class="dot"></span></span></span></button>
      <button class="gc tile" onclick="W11.youthD()"><span class="ic">🧒</span><span><span class="t1" style="display:block">Youth Draft</span><span class="t2 ${ydone ? 'lm' : 'gd'}">${ydone ? '✅ Done this season' : '15 youngsters waiting'}${ydone ? '' : '<span class="dot" style="background:#facc15;box-shadow:0 0 8px #facc15"></span>'}</span></span></button></div>`;
  const bottom = `<div style="grid-column:1/-1;display:grid;grid-template-columns:1fr 1.35fr 1fr;gap:clamp(6px,1.4vw,12px);height:clamp(44px,16vh,66px)">
      <button class="gc tile" onclick="W11.squad()"><span style="width:clamp(26px,9vh,40px);display:block">${g12mine('100%')}</span><span class="t1">👕 Squad<span class="t2 mu" style="display:block;font-size:.72em">${esc(me.short)} · ${esc(me.form)}</span></span></button>
      <div class="gc" style="padding:0;display:grid;grid-template-columns:1fr 1fr"><button class="tile" style="justify-content:center;border-right:1px solid rgba(255,255,255,.12)!important" onclick="W11.cups()"><span class="ic" style="font-size:clamp(18px,6.5vh,30px)">🏆</span><span class="t1">Cups</span></button><button class="tile" style="justify-content:center" onclick="W11.hq()"><span class="ic" style="font-size:clamp(18px,6.5vh,30px)">🏟️</span><span class="t1">Club HQ</span></button></div>
      <button class="gc tile" style="justify-content:center" onclick="W11.hof()"><span class="ic" style="font-size:clamp(18px,6.5vh,30px)">🏛️</span><span class="t1">Hall of Fame</span></button></div>`;
  g12ui(left + centre + right + bottom, '11 WONDERS', 'W11.close()', '1fr 1.35fr 1fr', 'minmax(0,1fr) auto');
  if (boot < 5) { const b = document.querySelector('#w11 .hd'); if (b && !document.getElementById('g12boot')) b.querySelector('b').insertAdjacentHTML('afterend', `<button id="g12boot" class="chip" style="margin-left:6px;font-size:11px;padding:4px 9px;border-radius:10px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14)" onclick="W11.bootHome()">🏕️ Boot Camp ${boot}/5</button>`); }
  if (gift && !W._giftTried) { W._giftTried = 1; W.gift(true); }
  if (A) { const tick = () => { const el = document.getElementById('g12cd'); if (!el) return; const ms = A.ko - W.nowS();
      if (ms <= 15 * 60000 && ms > 15 * 60000 - 1500 && !W._lcRe) { W._lcRe = 1; setTimeout(() => { W._lcRe = 0; if (document.getElementById('g12cd')) W.leagueHome(); }, 400); return; }
      el.textContent = ms > 0 ? '⏱️ Starts in ' + g12hm(ms) : 'Playing now'; setTimeout(tick, 1000); }; tick(); }
  W.bgCheck(); W.cupCheck();
};

/* ================================== ⚽ MATCH CENTRE ================================== */
W.matchC = async function () {
  if (!W.inLeague()) return W.leagueHome();
  const me = W.me, G = await W.loadG(); if (!G) return W.home();
  const now = W.nowS(), { s: cs, day } = CC.clock(now), n = W.nextMatch(G), trained = me.trd === CC.absDay(Date.now()), boot = (me.boot || []).length;
  let info, vs, act;
  if (n) { const ms = n.ko - now, live = ms <= 0, opp = seatName(G, n.home ? n.ap : n.hp, n.md), my = { n: me.name, sh: me.short };
    let fc = ''; try { const wx = W.forecast(G, n.md, n.hp, n.id, n.ko); fc = `<p class="t2" style="color:#e2e8f0;display:flex;gap:8px;align-items:flex-start"><span style="font-size:1.5em;line-height:1">🌦️</span><span>Forecast: <b style="color:#fff">${esc(CC.wxLabel(wx))}</b>${esc(wxTip(wx))}</span></p>`; } catch (e) {}
    info = `<div class="gc" style="display:flex;flex-direction:column;gap:clamp(4px,1.8vh,10px)"><p class="t1">⚽ Next match · Matchday ${n.md}</p>
      <div style="display:flex;align-items:center;gap:10px">${g12crest(opp.hue, opp.sh, 'clamp(26px,9vh,40px)')}<p style="font-weight:900;font-size:clamp(15px,6vh,26px);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${n.home ? 'vs' : '@'} ${esc(opp.n)}</p></div>
      <p class="t2">🗓️ ${n.home ? 'Home' : 'Away'} · ${esc(localT(n.ko, true))}</p>
      <div style="height:1px;background:rgba(255,255,255,.12)"></div>${fc}<div style="height:1px;background:rgba(255,255,255,.12)"></div>
      <p class="t2" style="color:#e2e8f0;display:flex;gap:8px"><span class="pk">ⓘ</span><span>Your team sheet locks 15 minutes before kick-off. Not there? 🧠 GG AI shouts for you.</span></p></div>`;
    vs = `<div class="gc hot" style="display:flex;flex-direction:column;padding:0">
      <div style="display:flex;align-items:center;justify-content:center;gap:clamp(6px,1.4vw,14px);padding:clamp(6px,2vh,12px)">${g12mine('clamp(22px,8vh,36px)')}<b style="font-size:clamp(12px,4.6vh,20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:13vw">${esc(my.n)}</b><b style="font-size:clamp(20px,8vh,38px);font-style:italic;background:linear-gradient(90deg,#22d3ee,#a855f7);-webkit-background-clip:text;background-clip:text;color:transparent">VS</b><b style="font-size:clamp(12px,4.6vh,20px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:13vw">${esc(opp.n)}</b>${g12crest(opp.hue, opp.sh, 'clamp(22px,8vh,36px)')}</div>
      <div style="flex:1;min-height:0;position:relative;background:radial-gradient(60% 50% at 20% 0%,rgba(255,255,255,.22),transparent 60%),radial-gradient(60% 50% at 80% 0%,rgba(255,255,255,.22),transparent 60%),linear-gradient(180deg,#0b1438,#132a52 45%,#1b7a3e 46%,#156b34)">
        <svg viewBox="0 0 400 200" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><g fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.6"><path d="M70 196 L130 96 L270 96 L330 196 Z"/><path d="M100 146 L300 146"/><ellipse cx="200" cy="146" rx="34" ry="11"/><path d="M152 196 L163 172 L237 172 L248 196"/><path d="M168 96 L165 106 L235 106 L232 96"/></g><g fill="rgba(255,255,255,.12)">${Array.from({ length: 60 }, (_, i) => `<rect x="${(i * 6.7) % 400}" y="${60 + (i % 5) * 6}" width="4" height="4"/>`).join('')}</g></svg>
        <p class="cap" style="position:absolute;top:8%;left:50%;transform:translateX(-50%);padding:3px 10px;border-radius:99px;background:rgba(5,8,22,.7);color:#e2e8f0">VS MATCHUP · ${n.home ? 'HOME' : 'AWAY'}</p>
        <p style="position:absolute;bottom:6%;left:50%;transform:translateX(-50%);white-space:nowrap;padding:4px 14px;border-radius:12px;background:rgba(5,8,22,.78);font-weight:900;font-size:clamp(13px,5vh,22px)">${live ? '<span class="pk">● Playing now</span>' : `Kickoff in <span class="cy" id="g12kc">${g12hms(ms)}</span> ⏱️`}</p></div></div>`;
    act = ms < 15 * 60000 ? `<button class="cta" onclick="W11.openL('${n.id}')">${live ? '▶ Go to the touchline' : '🔒 Team sheet locked · open match'}</button>` : `<button class="cta" onclick="W11.squad()">⚽ Next match · Matchday ${n.md} · Set your team</button>`;
  } else {
    info = `<div class="gc"><p class="t1">${day >= 27 ? `🏁 Season ${cs} is over` : '⚽ No match right now'}</p><p class="t2" style="margin-top:8px">${day >= 27 ? `Last results are checked today. Promotion, relegation and prizes are worked out on day 28. Season ${cs + 1} starts ${esc(localT(CC.dayStart(cs + 1, 1), true))}.` : 'Your next league match will show here.'}</p></div>`;
    vs = `<div class="gc hot" style="display:grid;place-items:center"><p class="big">⚽</p></div>`; act = `<button class="cta" onclick="W11.friendly()">🤝 Play a friendly</button>`;
  }
  const t = (ic, l, js, extra) => `<button class="gc tile" style="padding:6px 10px;justify-content:flex-start" onclick="${js}"><span style="font-size:clamp(16px,5.6vh,24px)">${ic}</span><span class="t1" style="font-size:clamp(12px,3.9vh,17px)">${l}${extra || ''}</span></button>`;
  const tiles = `<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,minmax(0,1fr));gap:clamp(5px,1.6vh,9px);min-height:0">${t('📊', 'Table', 'W11.tableL()')}${t('🗓️', 'Fixtures', 'W11.fixturesL()')}${t('🏋️', 'Training', 'W11.trainL()', trained ? ' ✅' : ' · <span class="pk" style="font-size:.8em">1 today</span>')}${t('👕', 'Squad & fitness', 'W11.squad()')}${t('⚡', 'Energy (' + me.energy + ')', 'W11.energyL()')}${t('🤝', 'Friendly', 'W11.friendly()')}${t('📜', 'Club history', 'W11.histL()')}${t('❓', 'How it works', 'W11.helpL()')}</div>`;
  const bot = `<div style="grid-column:1/-1;display:grid;grid-template-columns:${boot < 5 ? '1.2fr 1fr' : '1fr'};gap:10px;height:clamp(40px,14vh,58px)">${boot < 5 ? `<button class="gc tile" style="padding:6px 12px" onclick="W11.bootHome()"><span style="font-size:clamp(18px,6vh,28px)">🏕️</span><span style="flex:1;min-width:0"><span class="t1" style="display:block;font-size:clamp(11px,3.6vh,15px)">Boot Camp practice (${boot}/5)</span><span class="bar" style="display:block;margin-top:4px"><i style="width:${boot * 20}%;background:linear-gradient(90deg,#22d3ee,#a855f7)"></i></span></span></button>` : ''}${act}</div>`;
  g12ui(info + vs + tiles + bot, '⚽ MATCH CENTRE', 'W11.home()', '1fr 1.25fr 1fr', 'minmax(0,1fr) auto');
  if (n && n.ko > now) { const tick = () => { const el = document.getElementById('g12kc'); if (!el) return; el.textContent = g12hms(n.ko - W.nowS()); setTimeout(tick, 1000); }; tick(); }
};

/* ================================== 🔨 TRANSFER MARKET ================================== */
W.market = async function (pos, sort) {
  const F = W._mkF = W._mkF || { pos: 'ALL', sort: 'end' }; if (pos) F.pos = pos; if (sort) F.sort = sort;
  if (document.getElementById('w11mk')) { W.mkChips(); return W.mkDraw(); }
  W.stopMk();
  g12ui(`<div class="gc" style="display:flex;flex-direction:column;gap:clamp(4px,1.4vh,8px);padding:8px 10px"><p style="font-size:clamp(9px,2.9vh,12px);line-height:1.35;color:#e2e8f0">15 auctions at once, <b>${W.nowS() >= CC.MK_T2 ? "2 min 30 s" : "60 s"}</b> each. A bid in the last 10 s resets the clock to <b>10 s</b>. 🤖 = computer club. Your 💎 are held while you lead.</p><div id="w11mkf" style="flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(4px,1.3vh,7px)"></div></div>
    <div style="display:grid;grid-template-rows:auto minmax(0,1fr);gap:clamp(6px,2vh,10px);min-height:0"><div class="gc hot" id="g12lot" style="padding:clamp(5px,1.6vh,10px) 12px"></div><div class="gc gpg" data-k="mk" style="display:flex;flex-direction:column;padding:6px 10px"><p class="t1" style="text-align:center;font-size:clamp(11px,3.6vh,16px)" id="g12mkn">LIVE AUCTIONS</p><div id="g12last" class="mu" style="text-align:center;font-size:clamp(9px,2.7vh,11px)"></div><table class="tb"><thead><tr><th style="width:25%">NAME</th><th style="width:9%">POS</th><th style="width:7%">AGE</th><th style="width:21%">STYLE</th><th style="width:16%">QLTY</th><th style="width:13%">PRICE</th><th style="width:9%">⏱</th></tr></thead><tbody class="glist" id="w11mk"></tbody></table></div></div>`, '🔨 TRANSFER MARKET', 'W11.stopMk();W11.home()', 'minmax(0,.85fr) minmax(0,2fr)');
  W.mkChips();
  try { rt(); } catch (e) {}
  W._lots = W._lots || {};
  try { const f = await fbLoad();
    W._mkUnsub = f.onSnapshot(f.collection(db(), 'w11a'), (qs) => { const me = uidNow();
      qs.forEach(d => { const i = Number(d.id), o = W._lots[i], L = { ...d.data(), i };
        if (o && o.u === me && o.n === L.n && L.u !== me) { toast(`😮 Outbid on ${W.player(CC.lotPid(i, L.n, L.st)).short}! Your ${fmt(o.p)} 💎 are back.`); W.load().then(W.chips); }
        W._lots[i] = L; });
      W.mkDraw(); }, (e) => console.warn('11W market', e));
  } catch (e) { console.warn(e); }
  W._mkIv = setInterval(W.mkDraw, 1000); W.mkDraw();
};
W.mkChips = function () {
  const el = document.getElementById('w11mkf'); if (!el) return; const F = W._mkF;
  const c = (on, l, js) => `<button class="chip ${on ? 'on' : ''}" style="padding:clamp(3px,1.2vh,7px) clamp(7px,1.2vw,11px);font-size:clamp(10px,3.1vh,14px)" onclick="${js}">${l}</button>`;
  el.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:6px">${['ALL', 'GK', 'DEF', 'MID', 'FWD'].map(p => c(F.pos === p, p === 'ALL' ? 'All' : p, `W11.market('${p}')`)).join('')}</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">${c(F.pos === 'MINE', '⭐ My bids', "W11.market('MINE')")}${[['end', '⏱️ Ending soon'], ['ovr', '📈 Best OVR'], ['price', '💎 Cheapest']].map(([k, l]) => c(F.sort === k, l, `W11.market(null,'${k}')`)).join('')}</div>
    <div class="chip" style="margin-top:auto;display:flex;align-items:center;gap:8px;padding:4px 10px;font-size:clamp(10px,3.1vh,14px)">👥 Squad ${(W.me.ids || []).length}/25</div>`;
};
W.mkPick = (i) => { W._mkSel = i; W.mkDraw(); };
W.mkDraw = function () {
  const el = document.getElementById('w11mk'); if (!el) return W.stopMk();
  const now = W.nowS(), me = uidNow(), F = W._mkF, rows = [];
  for (let i = 0; i < CC.MK_N; i++) { const L = W._lots[i] || null, cur = CC.lotCur(i, L, now), same = !!(L && L.n === cur.n), E = CC.lotEff(same ? L : { i, n: cur.n, st: cur.st }, now), p = W.player(E.pid, CC.clock(cur.st).s);
    rows.push({ i, L, cur, same, E, p, mine: same && L.u === me });
    if (L && L.u === me && !L.done && CC.lotEff(L, now).closed) W.mkClaim(L); }
  const list = rows.filter(r => F.pos === 'ALL' || (F.pos === 'MINE' ? r.mine : r.p.pos === F.pos));
  list.sort(F.sort === 'ovr' ? (a, b) => b.p.ovr - a.p.ovr : F.sort === 'price' ? (a, b) => a.E.minNext - b.E.minNext : (a, b) => a.E.end - b.E.end);
  const mm = (ms) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
  /* the big auction on top: the one you tapped, else the first in the list */
  const S = list.find(r => r.i === W._mkSel) || list[0], box = document.getElementById('g12lot'), hd = document.getElementById('g12mkn');
  const lst = document.getElementById('g12last'); if (lst && S) lst.innerHTML = prevTxt(S.i, S.L, S.cur, S.same, now).replace(/<p[^>]*>|<\/p>/g, '');
  if (hd) hd.textContent = `LIVE AUCTIONS · ${list.length} ${F.pos === 'ALL' ? 'ACTIVE' : F.pos === 'MINE' ? 'WITH YOUR BIDS' : F.pos}`;
  if (box) { if (!S) box.innerHTML = '<p class="t2" style="text-align:center;padding:8px">No players here right now. Try another filter.</p>';
    else { const { i, L, cur, same, E, p, mine } = S, ms = Math.max(0, E.end - now), hot = ms < 10000, step = CC.stepOf(E.minNext);
      const top = E.top === 'u' ? (mine ? '<b class="lm">🟢 You are the top bidder</b>' : `👤 ${esc(L.un || 'a manager')} leads`) : E.top === 'ai' ? `🤖 ${esc(CC.club(E.aiClub).name)} leads` : `No bids yet · start ${fmt(E.start)}`;
      box.innerHTML = `<div style="display:flex;align-items:center;gap:12px">${g12ovr(p)}<div style="flex:1;min-width:0"><p style="font-weight:900;font-size:clamp(14px,5.4vh,24px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.flag} ${esc(p.name)} ${ptag(p)}</p><p style="font-weight:800;font-size:clamp(10px,3.3vh,14px)"><b style="color:${g12pos[p.pos]}">${W11C.dpOf(p)}</b> · ${p.age}y · ⚡${p.pac} 🎯${p.sho} 🎩${p.pas} 🪄${p.dri} 🛡️${p.def}${p.pos === 'GK' ? ' 🧤' + p.gk : ''} · ${W.styleChip(p)}</p></div><span style="font-weight:900;font-size:clamp(15px,5.6vh,28px);padding:2px 12px;border-radius:12px;${hot ? 'background:rgba(255,45,149,.3);color:#ff8cc6' : 'background:rgba(255,45,149,.18);color:#fbcfe8'}">${mm(ms)}</span></div>
        <div style="display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px;align-items:center;margin-top:clamp(3px,1.2vh,8px)"><span style="font-size:clamp(10px,3.3vh,14px);font-weight:800;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${top}${E.top ? ' · <b>' + fmt(E.price) + ' 💎</b>' : ''}</span>${mine && E.top === 'u' ? `<button class="cta2" style="grid-column:span 2" disabled>✅ Leading</button>` : `<button class="cta" style="padding:clamp(6px,2vh,10px) clamp(12px,2.4vw,26px)" onclick="W11.bid(${i},${cur.n},${E.minNext})">Bid ${fmt(E.minNext)}</button><button class="cta2" style="padding:clamp(6px,2vh,10px) clamp(10px,2vw,20px)" onclick="W11.bid(${i},${cur.n},${E.minNext + 2 * step})">Bid ${fmt(E.minNext + 2 * step)}</button>`}</div>`; } }
  el.innerHTML = list.map(({ i, E, p, mine }) => { const ms = Math.max(0, E.end - now);
    return `<tr class="${S && S.i === i ? 'g12s' : ''} ${mine ? 'mine' : ''}" onclick="W11.mkPick(${i})" style="cursor:pointer"><td>${p.flag} ${esc(p.short)}${mine ? ' ⭐' : ''}</td><td><span class="rl" style="color:${g12pos[p.pos]}">${W11C.dpOf(p)}</span></td><td>${p.age}</td><td style="font-size:.85em">${W.STYLE1[W.oneStyle(p)][0]} ${W.STYLE1[W.oneStyle(p)][1]}</td><td>${W.g12stars(p.ovr)}</td><td class="${E.top ? 'cy' : ''}">${fmt(E.top ? E.price : E.start)}</td><td style="${ms < 10000 ? 'color:#ff5fae' : ''}">${mm(ms)}</td></tr>`; }).join('');
  g12pages();
};

/* ================================== 👕 SQUAD ================================== */
W.squad = function (sel) {
  const me = W.me, P = me.ids.map(id => W.player(id)), tab = W._sqTab || 'form';
  if (tab === 'sp') return W.setPieces();
  const SH = W.shape(me.form, me.fp), LP = W.lpOf(me), day = W11C.absDay(Date.now()), inLg = !!(me.lg && me.lg.s === W.S);
  const kit = (me.kits && me.kits[0]) || { c1: '#22d3ee', c2: '#ffffff' }, fitC = (f) => f >= 1 ? '#22d3ee' : f >= 0.9 ? '#facc15' : '#ff2d95';
  const cond = (id) => inLg ? W11C.condNow(me, id, day) : 100;
  const flags = (id) => { const inj = (me.inj || {})[id] || 0, ban = (me.ban || {})[id] || 0; return (inj ? '🤕' : '') + (ban ? '🚫' : ''); };
  const toks = P.slice(0, 11).map((p, i) => { const s = SH[i], f = W.fitOf(p, s.dp, LP), top = 90 - ((s.x - 4) / 43) * 78, lf = 9 + (s.y / 68) * 82;
    return `<div class="tok ${sel === i ? 'g12s' : ''}" style="top:${top}%;left:${lf}%" onclick="W11.swap(${i})">${g12shirt(i === 0 ? '#facc15' : kit.c1, i === 0 ? '#0b0f24' : (kit.c2 || '#fff'), p.num)}<span class="dp" style="color:${fitC(f)}">${s.dp}</span><span class="nm"><b style="color:${ovrColor(p.ovr)}">${p.ovr}</b> ${flags(p.id)}${esc(p.short)}</span></div>`; }).join('');
  const bench = P.slice(11, 18).map((p, k) => `<div onclick="W11.swap(${k + 11})" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;min-width:0;${sel === k + 11 ? 'filter:drop-shadow(0 0 8px #22d3ee)' : ''}">${g12shirt(p.pos === 'GK' ? '#facc15' : kit.c1, p.pos === 'GK' ? '#0b0f24' : (kit.c2 || '#fff'), p.num).replace('<svg', '<svg style="width:clamp(18px,6.4vh,28px)"')}<span style="font-size:clamp(8px,2.6vh,11px);font-weight:900;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;padding:0 3px;border-radius:5px;background:${sel === k + 11 ? '#22d3ee;color:#0b0f24' : 'rgba(5,8,22,.75)'}">${p.ovr} ${esc(p.short)}</span></div>`).join('');
  const lines = `<svg class="ln" viewBox="0 0 100 100" preserveAspectRatio="none"><g fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".5" vector-effect="non-scaling-stroke"><rect x="3" y="3" width="94" height="94"/><path d="M3 50 H97"/><ellipse cx="50" cy="50" rx="11" ry="9"/><rect x="25" y="3" width="50" height="15"/><rect x="38" y="3" width="24" height="6"/><rect x="25" y="82" width="50" height="15"/><rect x="38" y="91" width="24" height="6"/></g></svg>`;
  const rowsHtml = P.map((p, i) => { const c = cond(p.id), f = i < 11 ? W.fitOf(p, SH[i].dp, LP) : 1;
    return `<div onclick="W11.swap(${i})" style="display:flex;align-items:center;gap:8px;padding:3px 4px;border-radius:9px;cursor:pointer;${sel === i ? 'background:rgba(34,211,238,.16)' : ''}"><span style="width:clamp(30px,9vh,40px);font-size:clamp(9px,2.8vh,11px);font-weight:900;text-align:center;padding:2px 0;border-radius:6px;background:${i < 11 ? 'rgba(34,211,238,.16)' : i < 18 ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.03)'};color:${i < 11 ? fitC(f) : i < 18 ? '#cbd5e1' : '#64748b'}">${i < 11 ? SH[i].dp : i < 18 ? 'SUB' : 'RES'}</span>${g12ovr(p)}<span style="flex:1;min-width:0;font-weight:900;font-size:clamp(11px,3.6vh,15px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.legend ? '👑 ' : p.wk && p.age <= 21 ? '🌟 ' : ''}${flags(p.id)}${esc(p.short)}</span><span class="bar" style="width:22%"><i style="width:${c}%;background:${c >= 75 ? '#34d399' : c >= 50 ? '#facc15' : '#ff2d95'}"></i></span><span style="width:30px;font-size:11px;font-weight:900;color:${c >= 75 ? '#34d399' : c >= 50 ? '#facc15' : '#ff5fae'}">${c}%</span><button onclick="event.stopPropagation();W11.pMenu('${p.id}')" style="padding:2px 8px;border-radius:8px;background:rgba(255,255,255,.08);font-weight:900">⋯</button></div>`; }).join('');
  const forms = Object.keys(W.FORMS);
  g12ui(`<div class="gc gpg" data-k="fm" style="display:flex;flex-direction:column;gap:6px;padding:8px"><p class="t1" style="font-size:clamp(12px,4vh,17px)">📐 Formation</p><div class="glist" style="display:flex;flex-direction:column;gap:5px">${forms.map(f => `<button class="chip ${f === me.form ? 'on' : ''}" style="width:100%" onclick="W11.setForm('${f}')">${f}${f === me.form ? ' ✓' : ''}</button>`).join('')}</div></div>
    <div style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:6px;min-height:0"><div class="pitch">${lines}${toks}</div><div class="gc" style="padding:4px 8px"><p class="cap" style="text-align:center">Bench · tap a player, then another to swap</p><div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px">${bench}</div></div></div>
    <div class="gc gpg" data-k="sq" style="display:flex;flex-direction:column;gap:4px;padding:8px"><p class="t1" style="font-size:clamp(12px,4vh,17px)">👥 Players (${P.length}/25)</p><div class="glist" style="display:flex;flex-direction:column;gap:2px">${rowsHtml}</div></div>
    <div style="grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr auto auto;gap:8px;height:clamp(36px,12vh,50px)"><button class="cta" onclick="W._sqTab='form';W11.squad()">📐 Formation</button><button class="cta2" onclick="W._sqTab='sp';W11.squad()">🎯 Set pieces & styles</button><button class="cta2" style="width:auto;padding:0 14px" onclick="W11.bestFitGo()">🧩 Best fit</button><button class="cta2" style="width:auto;padding:0 14px" onclick="W11.releaseMenu()">🗑️ Release</button></div>`,
    '👕 SQUAD', W.live ? 'W11.home()' : 'W11.home()', 'minmax(0,.55fr) minmax(0,1.5fr) minmax(0,1.2fr)', 'minmax(0,1fr) auto');
};
W.setPieces = function () {
  const me = W.me, ids = me.ids || [], tk = me.tk || {}, top = ids.slice(0, 18).map(id => W.player(id));
  const sel = (k, l) => { const auto = autoTaker(ids, k); return `<div style="display:flex;align-items:center;gap:10px"><span class="t1" style="min-width:clamp(90px,16vw,150px);font-size:clamp(12px,4.2vh,18px)">${l}</span><select onchange="W11.setTk('${k}', this.value)" style="flex:1;min-width:0;padding:clamp(6px,2vh,10px);border-radius:12px;background:rgba(10,14,40,.7);color:#fff;border:1px solid rgba(140,160,255,.35);font-weight:800;font-size:clamp(12px,3.8vh,16px)"><option value="">Auto${auto ? ' · ' + esc(auto.short) : ''}</option>${top.filter(p => p.pos !== 'GK' || k === 'cap').map(p => `<option value="${p.id}" ${tk[k] === p.id ? 'selected' : ''}>${esc(p.short)} · ${p.pos} ${p.ovr}${k === 'fk' ? ' · ' + W.styleOf(p).fk : k === 'pen' ? ' · ' + W.STYLE_NAME[W.styleOf(p).pen] : ''}</option>`).join('')}</select></div>`; };
  const st = top.map((p, i) => { const S = W.STYLE1[W.oneStyle(p)];
    return `<div style="display:flex;align-items:center;gap:8px;padding:3px 6px;border-radius:10px;background:rgba(10,14,40,.45)"><span style="width:clamp(26px,8vh,34px);font-size:10px;font-weight:900;color:${i < 11 ? '#67e8f9' : '#94a3b8'}">${i < 11 ? W11C.dpOf(p) : 'SUB'}</span><b style="flex:0 0 22%;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:clamp(11px,3.6vh,15px)">${esc(p.short)}</b>${W.styleChip(p)}<span class="mu" style="flex:1;min-width:0;font-size:clamp(9px,2.8vh,12px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(S[2])}</span></div>`; }).join('');
  g12ui(`<div class="gc" style="display:flex;flex-direction:column;gap:clamp(6px,2.4vh,14px)"><p class="t1" style="font-size:clamp(15px,5.6vh,26px)">🎯 Set pieces</p><p class="t2" style="color:#e2e8f0">Pick your takers (only players in your top 18). Auto uses your best player for it.</p>${TK.map(([k, l]) => sel(k, l)).join('')}</div>
    <div class="gc hot gpg" data-k="sty" style="display:flex;flex-direction:column;gap:4px"><p class="t1" style="font-size:clamp(15px,5.6vh,26px)">🧬 Player styles</p><p class="t2" style="color:#e2e8f0">Every player has <b>one</b> style. It comes from his stats and never changes.</p><div class="glist" style="display:flex;flex-direction:column;gap:3px">${st}</div></div>
    <div style="grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:8px;height:clamp(36px,12vh,50px)"><button class="cta2" onclick="W._sqTab='form';W11.squad()">📐 Formation</button><button class="cta" onclick="W._sqTab='sp';W11.squad()">🎯 Set pieces & styles</button></div>`,
    '👕 SQUAD', 'W11.home()', 'minmax(0,1fr) minmax(0,1.25fr)', 'minmax(0,1fr) auto');
};

/* ================================== 📇 PLAYER PROFILE ================================== */
W.pMenu = function (id, tab) {
  const me = W.me, p = W.player(id), mineP = (me.ids || []).includes(id), main = W11C.dpOf(p), known = mineP ? W11C.knownPos(me, id, W.S, W.nowS()) : [main];
  tab = tab || W._pmTab || 'ov'; W._pmTab = tab;
  const st = W.styleOf(p), S1 = W.STYLE1[W.oneStyle(p)], inLg = !!(me.lg && me.lg.s === W.S), cond = mineP && inLg ? W11C.condNow(me, id, W11C.absDay(Date.now())) : null;
  const kit = (me.kits && me.kits[0]) || { c1: '#22d3ee', c2: '#fff' };
  const grp = (t, c, ic, list) => { const v = Math.round(list.reduce((a, x) => a + x[1], 0) / list.length);
    return `<div style="min-width:0"><p style="font-weight:900;font-size:clamp(12px,4vh,18px);color:${c}">${ic} ${t}</p><p style="font-weight:900;font-size:clamp(24px,10vh,46px);line-height:1;color:${c}">${v}</p>${list.map(([n, x]) => `<div style="display:flex;justify-content:space-between;padding:clamp(2px,1vh,5px) 8px;margin-top:3px;border-radius:7px;background:rgba(10,14,40,.55);border-left:3px solid ${c};font-size:clamp(11px,3.6vh,15px);font-weight:800"><span>${n}</span><b>${x}</b></div>`).join('')}</div>`; };
  const ov = p.pos === 'GK'
    ? [grp('KEEPING', '#facc15', '🧤', [['Goalkeeping', p.gk], ['Defending', p.def]]), grp('DISTRIBUTION', '#22d3ee', '🎩', [['Passing', p.pas], ['Set pieces', st.set]]), grp('PHYSICAL', '#818cf8', '💪', [['Pace', p.pac], ['Heading', st.head]].concat(cond != null ? [['Fitness', cond]] : []))]
    : [grp('DEFENCE', '#34d399', '🛡️', [['Defending', p.def], ['Heading', st.head]]), grp('ATTACK', '#fb7185', '🎯', [['Shooting', p.sho], ['Dribbling', p.dri], ['Passing', p.pas]]), grp('PHYSICAL', '#818cf8', '💪', [['Pace', p.pac], ['Set pieces', st.set]].concat(cond != null ? [['Fitness', cond]] : []))];
  let body = '';
  if (tab === 'ov') body = `<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,1.6vw,16px)">${ov.join('')}</div>`;
  else if (tab === 'sty') body = `<div style="display:flex;flex-direction:column;gap:clamp(6px,2.4vh,14px)"><p class="cap">Player style · one per player, never changes</p><div style="display:flex;align-items:center;gap:14px"><span style="font-size:clamp(34px,15vh,70px)">${S1[0]}</span><div><p style="font-weight:900;font-size:clamp(18px,7vh,32px);color:${S1[3]}">${S1[1]}</p><p class="t2" style="color:#e2e8f0">${esc(S1[2])}</p></div></div>
      ${p.pos === 'GK' ? '' : `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="stat" style="align-items:flex-start;padding:8px 12px"><span class="mu">🦶 Free kicks</span><b style="font-size:clamp(14px,5vh,22px);text-transform:capitalize">${esc(st.fk)}</b></div><div class="stat" style="align-items:flex-start;padding:8px 12px"><span class="mu">🎯 Penalties</span><b style="font-size:clamp(14px,5vh,22px);text-transform:capitalize">${esc(W.STYLE_NAME[st.pen] || st.pen)}</b></div></div>`}</div>`;
  else if (tab === 'pos') { const t = me.trn && Number(me.trn.end) > W.nowS() ? me.trn : null, mine = t && t.id === id, extra = known.slice(1), full = extra.length >= W11C.LEARN_MAX, g = W11C.gidOf(id, W.S), can = W11C.DPOS.filter(x => W11C.canLearn(main, x) && !known.includes(x)), days = W11C.learnDays(g);
    let tr; if (!mineP) tr = '<p class="t2">Only for players in your squad.</p>';
    else if (mine) tr = `<p class="t2" style="color:#e2e8f0">📚 Learning <b>${t.to}</b> · ready in <b>${W.trnLeft(t)}</b></p>${Number(t.end) - W.nowS() > W11C.LEARN_FAST_DAYS * 86400000 ? `<button class="cta" onclick="W11.learnFast()">⚡ Finish in ${W11C.LEARN_FAST_DAYS} days · ${W11C.LEARN_FAST} 🪙</button>` : ''}<button class="cta2" onclick="W11.learnCancel()">Stop training</button>`;
    else if (p.pos === 'GK') tr = '<p class="t2">Goalkeepers stay in goal.</p>';
    else if (full) tr = `<p class="t2">He already knows ${W11C.LEARN_MAX} extra positions (the most).</p>`;
    else if (t) tr = `<p class="t2">${esc(W.player(t.id).name)} is training now (one player at a time). Ready in ${W.trnLeft(t)}.</p>`;
    else if (!can.length) tr = '<p class="t2">No nearby position left to learn.</p>';
    else tr = `<p class="t2" style="color:#e2e8f0">Free training takes about <b>${days} days</b> for him. Or finish it in ${W11C.LEARN_FAST_DAYS} days for ${W11C.LEARN_FAST} 🪙.</p><div style="display:flex;flex-wrap:wrap;gap:8px">${can.map(x => `<button class="chip" onclick="W11.learn('${id}','${x}')">📚 ${x} · ${esc(W11C.DPOS_NAME[x])}</button>`).join('')}</div>`;
    body = `<div style="display:flex;flex-direction:column;gap:clamp(6px,2.2vh,12px)"><p class="cap">Positions he can play</p><div style="display:flex;flex-wrap:wrap;gap:8px">${known.map((x, i) => `<span class="chip ${i === 0 ? 'on' : ''}">${x} · ${esc(W11C.DPOS_NAME[x])}</span>`).join('')}</div><p class="t2 mu">His own spot is ${esc(W11C.DPOS_NAME[main])}. He can learn up to ${W11C.LEARN_MAX} nearby spots, one at a time. Never a far line (a winger can't become a defender).</p>${tr}</div>`; }
  else if (tab === 'nm') { const g = W11C.gidOf(id, W.S), renamed = !!(me.rn && me.rn[g]);
    body = `<div style="display:flex;flex-direction:column;gap:clamp(6px,2.2vh,12px);max-width:520px"><p class="cap">Name & country</p>${!mineP ? '<p class="t2">Only for players in your squad.</p>' : renamed ? '<p class="t2">Already renamed (once per player).</p>' : `<p class="t2" style="color:#e2e8f0">You can change his name and country once. Real footballers' names can't be used.</p><input id="w11rnN" maxlength="24" value="${esc(p.name)}" style="padding:10px;border-radius:12px;background:rgba(10,14,40,.7);color:#fff;border:1px solid rgba(140,160,255,.35);font-weight:800;font-size:15px"><select id="w11rnC" style="padding:10px;border-radius:12px;background:#0f172a;color:#fff;font-weight:800">${W.countryOpts(W.cultCountry[p.cult])}</select><button class="cta" onclick="W11.renameGo('${id}')">Save name (once)</button>`}</div>`; }
  const tabs = [['ov', 'Overview'], ['sty', 'Playstyle'], ['pos', 'Positions'], ['nm', 'Name']];
  let o = document.getElementById('w11pm'); if (!o) { o = document.createElement('div'); o.id = 'w11pm'; (document.getElementById('w11') || document.body).appendChild(o); }
  o.className = 'g12pm'; o.style.cssText = '';
  o.innerHTML = `<div class="g12" style="height:100%;padding:max(8px,env(safe-area-inset-top)) 12px 10px;grid-template-columns:minmax(0,.62fr) minmax(0,2fr);grid-template-rows:auto minmax(0,1fr);background:radial-gradient(60% 50% at 20% 0%,rgba(80,100,220,.25),transparent),linear-gradient(180deg,#070b22,#0b1236)">
    <div style="grid-column:1/-1;display:flex;align-items:center;gap:10px"><button class="chip" onclick="W11.ovClose()" style="padding:6px 12px">←</button><b style="font-size:clamp(14px,4.6vh,20px);background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent">PLAYER PROFILE</b><span style="margin-left:auto" class="chip">💎 ${fmt(me.coins)}</span><span class="chip" style="border-color:rgba(250,204,21,.4)!important">🪙 ${fmt(me.gems)}</span></div>
    <div class="gc" style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px"><div id="w11pcImg" style="flex:1;min-height:0;width:100%;display:flex;align-items:flex-end;justify-content:center;border-radius:12px;background:radial-gradient(60% 60% at 50% 40%,rgba(34,211,238,.18),transparent)">${g12shirt(kit.c1, kit.c2 || '#fff', p.num).replace('<svg', '<svg style="width:60%;opacity:.85"')}</div>
      <p style="font-weight:900;font-size:clamp(13px,4.6vh,20px);text-align:center;line-height:1.1">${p.flag} ${esc(p.name).toUpperCase()} <span class="mu">#${p.num}</span></p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%">${tabs.map(([k, l]) => `<button class="chip ${tab === k ? 'on' : ''}" style="width:100%;padding:4px 2px;font-size:clamp(9px,2.9vh,12px);white-space:normal" onclick="W11.pMenu('${id}','${k}')">${l}</button>`).join('')}</div></div>
    <div class="gc" style="display:flex;flex-direction:column;gap:clamp(6px,2vh,12px)"><div style="display:flex;align-items:center;gap:clamp(8px,2vw,18px);flex-wrap:wrap"><span class="chip">Age: ${p.age}</span><div><span class="mu" style="font-weight:900">OVR </span><b style="font-size:clamp(28px,12vh,56px);line-height:1;color:#22d3ee;text-shadow:0 0 18px rgba(34,211,238,.5)">${p.ovr}</b><div>${W.g12stars(p.ovr)}</div></div>
      <div><p class="cap">Roles</p><div>${known.map(x => `<span class="rl" style="font-size:clamp(11px,3.6vh,15px);padding:3px 9px">${x}</span>`).join('')}</div></div>${W.styleChip(p)}${mineP ? `<span class="chip" style="margin-left:auto">${g12mine('22px').replace('class="crest"', 'class="crest" style="display:inline-grid;vertical-align:middle;width:18px;height:20px"')} ${esc(me.name)}</span>` : ''}</div>
      <div style="height:1px;background:rgba(255,255,255,.12)"></div><div style="flex:1;min-height:0;overflow:hidden">${body}</div>${tab === 'ov' ? '<p class="t2 mu" style="padding:6px 10px;border-radius:10px;background:rgba(10,14,40,.5);border:1px solid rgba(140,160,255,.2)">Train in the league to improve your whole squad. Players grow until about 27.</p>' : ''}</div></div>`;
  const fill = () => { const box = document.getElementById('w11pcImg'); if (!box || !W.portraitOf) return; const url = W.portraitOf(id);
    if (url) box.innerHTML = `<img src="${url}" alt="" style="height:100%;max-width:100%;object-fit:contain;object-position:bottom;display:block">`;
    else if (W.w3d && W.w3d.st === 1 && (fill.n = (fill.n || 0) + 1) < 40) setTimeout(fill, 500); };
  setTimeout(fill, 30);
};
/* the old home extras (market/youth/cups buttons) are part of the hub now */
W.g3Bar = (function (b) { return function () { if (document.querySelector('#w11b > .g12')) return; return b.apply(this, arguments); }; })(W.g3Bar);

// =====================================================================
// 📺 G13 · broadcast match: dynamic length (broadcast pauses), slow-mo replays of every big chance, card / penalty / sub scenes,
// tunnel walk-out (line-ups, handshakes, coin toss) and walk-off (reactions, stats, table), half-time tunnel + stats board,
// referee + 2 assistants + 4th official, player previews (captain, stars, one to watch), ratings, momentum bar,
// live commentary ticker, full-time highlights reel, free positions editor (engine 6), keeper kit clash fix.
// build.sh pastes this file into w11.js at the G13 marker. Nothing here changes a result.
// =====================================================================
const G13CSS = `
#w13bc{position:absolute;inset:0;z-index:27;background:#070b18;overflow:hidden;animation:w13in .35s ease-out}
@keyframes w13in{from{opacity:0}to{opacity:1}}
#w13bc .bx{position:absolute;inset:0}
#w13bc .tag{position:absolute;left:12px;top:max(56px,calc(env(safe-area-inset-top) + 48px));display:flex;gap:6px;z-index:3}
#w13bc .tag b{padding:4px 10px;border-radius:999px;font-size:10px;font-weight:900;letter-spacing:.14em;color:#070b18;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95)}
#w13bc .tag i{font-style:normal;padding:4px 9px;border-radius:999px;font-size:10px;font-weight:900;letter-spacing:.12em;background:rgba(7,11,24,.7);border:1px solid rgba(255,255,255,.25)}
#w13bc .cap{position:absolute;left:calc(76px + env(safe-area-inset-left));right:auto;bottom:max(70px,calc(env(safe-area-inset-bottom) + 62px));display:flex;justify-content:flex-start;pointer-events:none;z-index:3}
#w13bc .cap>div{max-width:min(46vw,380px);padding:8px 14px;border-radius:16px;background:linear-gradient(90deg,rgba(7,11,24,.2),rgba(7,11,24,.86) 10%,rgba(7,11,24,.86) 90%,rgba(7,11,24,.2));text-align:center;animation:w13up .45s cubic-bezier(.2,.8,.2,1)}
@keyframes w13up{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}
#w13bc .cap.r{left:auto;right:calc(76px + env(safe-area-inset-right));justify-content:flex-end}
#w13bc .dip{position:absolute;inset:0;background:#070b18;opacity:0;pointer-events:none;z-index:2}
#w13bc .bar{position:absolute;left:0;bottom:0;height:3px;background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);z-index:3}
.w13card{width:clamp(30px,6vh,46px);height:clamp(42px,8.4vh,64px);border-radius:6px;margin:0 auto 4px;box-shadow:0 0 28px rgba(0,0,0,.6);animation:w13flip .6s cubic-bezier(.2,.8,.2,1)}
@keyframes w13flip{from{transform:rotateY(90deg) scale(.6)}to{transform:none}}
.w13big{font-size:clamp(20px,6vh,34px);font-weight:900;letter-spacing:.06em;line-height:1.05}
.w13grad{background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95);-webkit-background-clip:text;background-clip:text;color:transparent}
.w13pv{display:flex;gap:10px;align-items:stretch;justify-content:center;flex-wrap:nowrap}
.w13p{position:relative;width:clamp(120px,21vw,170px);border-radius:14px;overflow:hidden;background:radial-gradient(120% 90% at 70% 20%,#1b2140,#0b0f24 60%,#060914);border:1px solid rgba(255,255,255,.12);box-shadow:0 0 22px rgba(168,85,247,.28);animation:w13up .5s cubic-bezier(.2,.8,.2,1) both}
.w13p .pi{height:clamp(84px,24vh,150px);display:flex;align-items:flex-end;justify-content:center;background:linear-gradient(180deg,rgba(34,211,238,.12),rgba(0,0,0,0))}
.w13p .pi img{height:100%;object-fit:cover}
.w13p .pi span{font-size:clamp(34px,9vh,56px);margin:auto}
.w13p .pl{position:absolute;left:6px;top:6px;padding:2px 7px;border-radius:999px;font-size:8px;font-weight:900;letter-spacing:.12em;color:#070b18}
.w13p .po{position:absolute;right:6px;top:6px;font-size:16px;font-weight:900;text-shadow:0 2px 6px #000}
.w13p .pn{padding:6px 8px 8px;text-align:left}
.w13p .pn b{display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.w13p .pn small{font-size:10px;color:#94a3b8}
.w13st{width:100%;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:2px 14px;font-size:11px;margin:4px 0}
.w13st>div{display:grid;grid-template-columns:34px 1fr 34px;align-items:center;gap:6px}
.w13st b{font-weight:900;text-align:center}
.w13st span{color:#94a3b8;font-size:10px;text-align:center;display:block;line-height:1.1}
.w13st .sb{height:4px;border-radius:9px;background:rgba(255,255,255,.08);overflow:hidden;display:flex;margin-top:2px}
.w13st .sb i{display:block;height:100%}
#w11.w13ht #w11ov{visibility:hidden}
#w11cert .w13st,#w11ov .w13st{grid-template-columns:1fr 1fr;width:min(440px,58vw)}
#w13mo{position:absolute;left:50%;transform:translateX(-50%);top:calc(max(8px,env(safe-area-inset-top)) + 44px);width:min(40vw,260px);height:6px;border-radius:9px;background:rgba(7,11,24,.6);border:1px solid rgba(255,255,255,.15);overflow:hidden;z-index:29;pointer-events:none}
#w13mo i{position:absolute;top:0;bottom:0;transition:all .6s ease}
#w13mo em{position:absolute;left:50%;top:-1px;bottom:-1px;width:2px;background:#fff;opacity:.7}
#w11.g8cer #w13mo,#w11.g8rp #w13mo{display:none}
.w13fp{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;background:linear-gradient(180deg,#14532d,#166534);border-radius:12px;padding:8px;border:2px solid rgba(255,255,255,.35)}
.w13fp button{aspect-ratio:1.6;border-radius:8px;background:rgba(255,255,255,.06);border:1px dashed rgba(255,255,255,.22);font-size:10px;font-weight:900;color:#fff;padding:0;min-height:22px}
.w13fp button.on{background:rgba(7,11,24,.8);border:1px solid #22d3ee}
.w13fp button.sel{background:linear-gradient(90deg,#22d3ee,#a855f7);color:#070b18}
/* G13: tactics panels narrower + see-through, so the goal at that end stays visible */
#w11 .g8p{width:min(34vw,290px);background:rgba(7,11,24,.72)}
.w13rt{display:inline-block;min-width:30px;padding:1px 6px;border-radius:7px;font-weight:900;font-size:11px;color:#070b18;text-align:center}
`;
const css13 = () => { if (!document.getElementById('w13css')) { const s = document.createElement('style'); s.id = 'w13css'; s.textContent = G13CSS; document.head.appendChild(s); } };
const ease13 = (u) => u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u);
const rtCol = (r) => r >= 8 ? '#a3e635' : r >= 7 ? '#22d3ee' : r >= 6 ? '#facc15' : '#ff2d95';

// ---------- 🧤 keepers never clash with an outfield kit (or with each other) ----------
const GK_COLS = ['#facc15', '#a3e635', '#f97316', '#38bdf8', '#e2e8f0', '#111827', '#ff2d95', '#a855f7', '#14b8a6', '#fde047'];
W.gkPick = function (D) {
  const out = []; for (let s = 0; s < 2; s++) { const avoid = [D.k[0].c1, D.k[1].c1, D.k[0].sho, D.k[1].sho, D.k[0].c2, D.k[1].c2].concat(out).filter(Boolean); let best = D.gk[s] || GK_COLS[s], bs = -1;
    for (const c of [D.gk[s]].concat(GK_COLS)) { if (!c) continue; const sc = Math.min(...avoid.map(a => cdist(a, c))) + (c === D.gk[s] ? 40 : 0); if (sc > bs) { bs = sc; best = c; } } out.push(best); }
  return out;
};

// ---------- 👥 who is who: captain, star players, one to watch ----------
const sideIds = (live, s) => ((s ? live.away : live.home).ids || []).slice(0, 11);
W.capOf = function (live, s) { const t = s ? live.away : live.home, ids = sideIds(live, s), c = t.tk && t.tk.cap; if (c && ids.includes(c)) return c; const S = W.dress(live).S;
  return ids.slice(1).map(id => W.player(id, S)).filter(Boolean).sort((a, b) => (b.ovr + (b.age || 25) * 0.3) - (a.ovr + (a.age || 25) * 0.3))[0]?.id || ids[1]; };
W.starOf = function (live, s, not) { const S = W.dress(live).S; return sideIds(live, s).filter(id => !(not || []).includes(id)).map(id => W.player(id, S)).filter(Boolean).sort((a, b) => b.ovr - a.ovr)[0]?.id; };
W.watchOf = function (live, s, not) { const ids = sideIds(live, s).filter(id => !(not || []).includes(id)); return ids[hash('watch:' + live.seed + ':' + s) % Math.max(1, ids.length)]; };
/* a studio portrait in the player's OWN team kit (cached) */
W.PORT13 = new Map();
W.portraitFor = function (id, live, s) {
  const B = G3.B3; if (!B || !B.ready || !B.portrait || !id) return null; const D = W.dress(live), key = id + '|' + JSON.stringify(D.k[s]);
  if (W.PORT13.has(key)) return W.PORT13.get(key); const p = W.player(id, D.S);
  let url = null; try { const T = B.team(D.k[s], D.gk[s], D.cr[s], D.sh[s]); url = B.portrait(T, p && p.pos === 'GK', id, p && p.num, 360, 450); } catch (e) { url = null; }
  if (url) { W.PORT13.set(key, url); if (W.PORT13.size > 24) W.PORT13.delete(W.PORT13.keys().next().value); } return url;
};
W.pvCard = function (id, live, s, label, color, extra, delay) {
  const D = W.dress(live), p = W.player(id, D.S); if (!p) return '';
  const S1 = W.STYLE1[W.oneStyle(p)] || ['', '', '', '#334155'];
  return `<div class="w13p" data-pv="${esc(id)}" data-s="${s}" style="animation-delay:${delay || 0}s"><div class="pi"><span>${p.pos === 'GK' ? '🧤' : '⚽'}</span></div><span class="pl" style="background:${color || '#22d3ee'}">${esc(label)}</span><span class="po">${p.ovr}</span>
    <div class="pn"><b>${p.flag} ${esc(p.name)}</b><small>${esc(D.sh[s])} · #${p.num} · ${p.pos}</small><br><small style="color:${S1[3]}">${S1[0]} ${esc(S1[1])}</small>${extra ? `<br><small style="color:#e2e8f0">${extra}</small>` : ''}</div></div>`;
};
/* fill the portraits a little later (one per frame, the 3D is busy) */
W.pvFill = function (root) { if (!root) return; const list = [...root.querySelectorAll('[data-pv]')]; let i = 0; const live = W.live || W._pvLive;
  const go = () => { if (i >= list.length || !live) return; const el = list[i++], url = W.portraitFor(el.dataset.pv, live, +el.dataset.s); if (url) { const im = el.querySelector('.pi'); if (im) im.innerHTML = `<img src="${url}" alt="">`; } setTimeout(go, 120); };
  setTimeout(go, 60); };

// ---------- ⭐ player ratings (6.0 base, moved by what he did) ----------
W.ratings = function (m) {
  const R = {}, add = (id, v) => { if (id != null && R[id] != null) R[id] += v; }, all = new Set();
  m.T.forEach(t => t.ids.slice(0, 11).concat(t.subLog.map(x => x[1])).forEach(id => { R[id] = 6.0; all.add(id); }));
  const roleOf = {}; m.T.forEach((t, s) => t.ids.forEach((id, i) => { const p = W.player(id, m.S); roleOf[id] = { s, pos: p ? p.pos : 'MID' }; }));
  for (const e of m.ev) { const id = e.pid;
    if (e.k === 'goal') { add(id, 1.15); m.T[1 - e.side].ids.slice(0, 11).forEach(q => { const r = roleOf[q]; if (r && (r.pos === 'GK' || r.pos === 'DEF')) add(q, r.pos === 'GK' ? -0.35 : -0.15); }); }
    else if (e.k === 'save') add(id, e.catch ? 0.45 : 0.35); else if (e.k === 'tackle') add(id, 0.12); else if (e.k === 'block') add(id, 0.2); else if (e.k === 'clear') add(id, 0.1);
    else if (e.k === 'header' || e.k === 'duel') add(id, 0.08); else if (e.k === 'skill') add(id, 0.15); else if (e.k === 'miss') add(id, e.near ? -0.05 : -0.12); else if (e.k === 'foul') add(id, -0.12);
    else if (e.k === 'yellow') add(id, -0.4); else if (e.k === 'red') add(id, -1.6); else if (e.k === 'off') add(id, -0.08); else if (e.k === 'slip') add(id, -0.1); }
  m.T.forEach((t, s) => { const res = Math.sign(t.score - m.T[1 - s].score); t.ids.slice(0, 11).forEach(id => { add(id, res * 0.3); const r = roleOf[id]; if (m.T[1 - s].score === 0 && r && (r.pos === 'GK' || r.pos === 'DEF')) add(id, 0.5); }); });
  for (const id in R) R[id] = Math.round(clamp(R[id], 3, 10) * 10) / 10; return R;
};
W.potm = function (m) { const R = W.ratings(m); let best = null; for (const id in R) if (!best || R[id] > R[best]) best = id; return best ? { id: best, r: R[best], side: m.T[0].ids.includes(best) ? 0 : 1 } : null; };

// ---------- 📈 momentum: who is on top right now (last ~25 s of play) ----------
W.momentum = function (m) {
  let v = 0; const T = m.t; for (let i = m.ev.length - 1; i >= 0; i--) { const e = m.ev[i], age = T - e.t; if (age > 25) break; if (e.side !== 0 && e.side !== 1) continue; const w = (1 - age / 25) * ({ goal: 3, save: -1.2, miss: 1, corner: 0.8, pen: 2, shot: 1, skill: 0.5, header: 0.5, block: -0.5, tackle: -0.3, int: -0.3 }[e.k] || 0); v += e.side === 0 ? w : -w; }
  const b = m.ball, own = b.owner ? b.owner.side : null; if (own != null) v += (own === 0 ? 1 : -1) * 0.6 * (own === 0 ? b.x / 105 : (105 - b.x) / 105);
  return clamp(v / 6, -1, 1);
};
W.moTick = function () {
  const host = document.getElementById('w11'), m = W.m; let el = document.getElementById('w13mo');
  if (!host || !m || !W.live || !host.querySelector('.w11match')) { if (el) el.remove(); return; } css13();
  if (!el) { el = document.createElement('div'); el.id = 'w13mo'; el.innerHTML = '<i></i><em></em>'; (document.getElementById('g8ui') || host).appendChild(el); }
  const D = W.dress(W.live), v = W._moV = (W._moV || 0) * 0.7 + W.momentum(m) * 0.3, i = el.firstChild, c = v >= 0 ? D.k[0].c1 : D.k[1].c1;
  Object.assign(i.style, v >= 0 ? { left: '50%', right: 'auto', width: (Math.abs(v) * 50) + '%' } : { right: '50%', left: 'auto', width: (Math.abs(v) * 50) + '%' }); i.style.background = c;
};
setInterval(() => { try { W.moTick(); } catch (e) {} }, 500);

// ---------- 🎙️ live commentary ticker (text, no voice) ----------
const pick13 = (seed, list) => list[hash(seed) % list.length];
W.comm = function (e, m) {
  const T = m.T, sh = (s) => T[s] ? T[s].short : '', p = e.pid ? W.player(e.pid, m.S) : null, n = p ? p.short : '', sd = e.side, k = e.k, sv = String(e.t) + k;
  switch (k) {
    case 'goal': return pick13(sv, [`⚽ GOAL! ${n || sh(sd)} finds the net for ${sh(sd)}!`, `⚽ It's in! ${n} scores for ${sh(sd)}!`, `⚽ GOAL! What a finish from ${n}!`]) + ` ${T[0].score}–${T[1].score}`;
    case 'save': return pick13(sv, [`🧤 ${n} gets down well and saves!`, `🧤 Big save from ${n}!`, `🧤 ${n} keeps it out!`, `🧤 Shot on target, ${n} is equal to it.`]);
    case 'miss': return e.near ? pick13(sv, [`😱 So close! Just wide from ${n}!`, `😱 Inches away! ${n} nearly had it.`, `😱 Off the woodwork… no, just wide from ${n}!`]) : pick13(sv, [`💨 ${n} shoots, but it's well off target.`, `💨 Ambitious from ${n}, over the bar.`]);
    case 'yellow': return `🟨 Yellow card for ${n} (${sh(sd)}).`; case 'red': return `🟥 RED CARD! ${n} is off! ${sh(sd)} down to ${T[sd].ids.slice(0, 11).filter(id => !T[sd].off.has(id)).length}.`;
    case 'pen': return `🎯 PENALTY to ${sh(sd)}! The referee points to the spot.`;
    case 'corner': return pick13(sv, [`🚩 Corner to ${sh(sd)}.`, `🚩 ${sh(sd)} win a corner.`]);
    case 'off': return `🚩 Flag up, offside: ${n}.`;
    case 'sub': { const L = T[sd].subLog, x = L[L.length - 1]; if (!x) return null; const po = W.player(x[0], m.S), pn = W.player(x[1], m.S); return `🔁 ${sh(sd)} change: ${pn ? pn.short : ''} on, ${po ? po.short : ''} off.`; }
    case 'men': return `🧭 Tactical shift: ${String(e.txt).replace(/^🧭\s*/, '')}`; case 'tp': return `🤝 ${String(e.txt).replace(/^🤝\s*/, '')}`; case 'form': return `📐 Tactical shift: ${String(e.txt).replace(/^\S+\s*/, '')}`;
    case 'shout': return `📣 ${sh(sd)} bench: ${String(e.txt).replace(/^\S+\s*/, '') || 'back to the normal plan'}`; /* G16: a blank 'none' shout no longer shows an empty line */
    case 'block': return `🛡️ Blocked! ${n} throws himself in the way.`; case 'skill': return `🌀 ${String(e.txt).replace(/^\S+\s*/, '')}`;
    case 'header': return `🗣️ ${n} wins it in the air.`; case 'slip': case 'skid': return String(e.txt);
    case 'ht': return `⏸️ Half time. ${T[0].short} ${T[0].score}–${T[1].score} ${T[1].short}`; case 'ft': return `🏁 Full time! ${T[0].short} ${T[0].score}–${T[1].score} ${T[1].short}`;
    case 'added': return String(e.txt); case 'adv': return `▶️ Advantage played.`;
    default: return null;
  }
};
W.feed = (function (b) { return function (m) { b.apply(this, arguments); const el = document.getElementById('w11tk'); if (!el || !m || !m.ev) return;
  const L = []; for (let i = m.ev.length - 1; i >= 0 && L.length < 4; i--) { const e = m.ev[i], t = W.comm(e, m); if (!t || (L[0] && L[L.length - 1].t === t)) continue; L.push({ e, t }); }
  const old = el.firstElementChild ? el.firstElementChild.textContent : '', h = L.map(x => `<p><span style="color:#94a3b8">${x.e.min}'</span> ${esc(x.t)}</p>`).join('');
  if (!L.length) return; if (el._h13 !== h) { el._h13 = h; el.innerHTML = h; if (el.firstElementChild && el.firstElementChild.textContent !== old) el.firstElementChild.classList.add('new'); } }; })(W.feed);
/* the lower thirds do not repeat what a broadcast scene is already showing */
W.tvPop = (function (b) { return function () { const m = W.m, L = m && m.bc ? m.bc.L : null, q = L && L[L.length - 1]; if (W._bc || (q && q.tick >= m.tick && q.tick - m.tick < 12)) return; return b.apply(this, arguments); }; })(W.tvPop);

// ---------- 🚩 officials: referee (W._refO pose), two assistants on the touchlines, flags up for offside ----------
W.officials = function (D, list, RT) {
  if (!list || !list.length || !RT) return; const m = W.m, lines = [52.5, 52.5];
  for (let s = 0; s < 2; s++) { const xs = list.filter(p => p.side === s).map(p => p.x).sort((a, b) => s === 0 ? a - b : b - a); lines[s] = xs.length > 1 ? xs[1] : s === 0 ? 10 : 95; }
  const off = m && m.ev.length ? m.ev.slice(-6).reverse().find(e => e.k === 'off' && m.tick - (e.tick || 0) < 50) : null;
  /* AR1 far touchline, left half (watches side 0's defence); AR2 near touchline, right half (side 1's defence) */
  const ar = [{ id: 'ref_a1', x: clamp(lines[0], 1, 52.5), y: -1.1, side: 0 }, { id: 'ref_a2', x: clamp(lines[1], 52.5, 104), y: 69.1, side: 1 }];
  ar.forEach((a, i) => { const st = W._arSt || (W._arSt = {}), o = st[a.id] || (st[a.id] = { x: a.x }), dt = 1 / 60; o.x += (a.x - o.x) * Math.min(1, dt * 4);
    const up = off && (off.side === 1 - a.side) ? 1 : 0; G3.fig(RT, false, a.id, PX(o.x), PZ(a.y), { num: '', run: Math.min(1, Math.abs(a.x - o.x) * 0.5), yaw: i ? Math.PI : 0, flag: { up, side: i ? 1 : -1 } }); });
};

// ---------- ⏱️ broadcast director: what is on screen during a broadcast pause ----------
W._bc = 0; W._bcKey = '';
const bcBox = () => { css13(); let o = document.getElementById('w13bc'); if (o) return o; o = document.createElement('div'); o.id = 'w13bc';
  o.innerHTML = '<div class="bx" id="w13bx"></div><div class="dip"></div><div class="tag" id="w13tag"></div><div class="cap" id="w13cap"></div><i class="bar" id="w13bar"></i>';
  (document.getElementById('w11') || document.body).appendChild(o); return o; };
W.cineClose = function () { const c = W.cine && W.cine.cur; if (!c) return; W.cine.cur = null; if (G3.view && G3.view.cine) G3.stop(G3.view); if (c.el) c.el.remove(); };
W.bcEnd = function () { const o = document.getElementById('w13bc'), hh = document.getElementById('w11'); if (hh) hh.classList.remove('w13ht'); if (W._bcV && G3.view === W._bcV) G3.stop(W._bcV); W._bcV = null; W._refO = null; clearInterval(W._bcIv); if (o) o.remove(); W._bc = 0;
  if (W.v3 && W.v3.on && document.getElementById('w11l3') && !W._cer) W.v3set(true); };
W.bcTick = function (m, e, live) {
  const q = e >= 0 && !W._cer ? m.bcAt(e) : null, key = q ? q.k + ':' + (q.q ? q.q.tick : 'ht') : '';
  if (key === W._bcKey) { if (q && W._bc) { const bar = document.getElementById('w13bar'); if (bar) bar.style.width = clamp((e - q.t0) / (q.t1 - q.t0) * 100, 0, 100) + '%'; } return; }
  W._bcKey = key; if (W._bc) W.bcEnd(); if (!q || q.t1 - e < 1.2) return;
  try { W.bcStart(q, m, e, live); } catch (er) { console.warn('G13 bc', er); W.bcEnd(); }
};
W.bcStart = function (q, m, e, live) {
  W.cineClose(); const ev = q.q ? m.ev[q.q.ev] : null, avail = q.t1 - e, D = W.dress(live); W._bc = 1;
  if (q.k === 'ht') return W.htScene(m, live, avail);
  const o = bcBox(), tag = o.querySelector('#w13tag'), cap = o.querySelector('#w13cap'), box = o.querySelector('#w13bx'), p = ev && ev.pid ? W.player(ev.pid, m.S) : null, sd = ev ? ev.side : 0;
  const capH = (h) => { cap.innerHTML = `<div>${h}</div>`; }; if (q.k !== 'goal' && q.k !== 'save' && q.k !== 'miss') cap.classList.add('r');
  let view = null;
  if (q.k === 'goal' || q.k === 'save' || q.k === 'miss') {
    try { W.tvWipe(); } catch (er) {}
    tag.innerHTML = `<b>🎬 REPLAY</b><i>SLOW-MO</i>`;
    const sc = q.k === 'goal' ? `<p class="w13big w13grad">GOAL!</p>${W.goalHow ? W.goalHow(ev) : ''}<p style="font-weight:900">⚽ ${p ? p.flag + ' ' + esc(p.name) : esc(D.sh[sd])} · ${esc(D.sh[sd])} · ${ev.min}'</p><p style="font-size:12px;color:#cbd5e1">${esc(D.sh[0])} ${m.T[0].score}–${m.T[1].score} ${esc(D.sh[1])}</p>`
      : q.k === 'save' ? `<p class="w13big" style="color:#facc15">🧤 WHAT A SAVE!</p><p style="font-weight:900">${p ? p.flag + ' ' + esc(p.name) : ''} · ${esc(D.sh[sd])}</p>` : `<p class="w13big" style="color:#ff2d95">😱 SO CLOSE!</p><p style="font-weight:900">${p ? p.flag + ' ' + esc(p.name) : ''} · ${esc(D.sh[sd])} · ${ev.min}'</p>`;
    setTimeout(() => { if (document.getElementById('w13cap') === cap) capH(sc); }, avail * (q.k === 'goal' ? 520 : 600));
    const F = (m.rec || []).filter(f => f.k >= ev.tick - 120 && f.k <= q.q.tick); view = F.length > 20 ? W.rpView(F, ev, live, Math.max(1.5, avail - 0.35), o) : null;
  } else if (q.k === 'yellow' || q.k === 'red') {
    const red = q.k === 'red', col = red ? '#ef233c' : '#facc15';
    tag.innerHTML = `<b style="background:${col}">${red ? '🟥 RED CARD' : '🟨 BOOKING'}</b>`;
    capH(`<div class="w13card" style="background:${col}"></div><p style="font-weight:900;font-size:16px">${p ? p.flag + ' ' + esc(p.name) : ''}</p><p style="font-size:12px;color:#cbd5e1">${esc(D.sh[sd])} · ${ev.min}' · ${red ? 'sent off' : 'yellow card'}${p && !red && (m.P.find(x => x.id === p.id) || {}).ycard >= 1 ? ' · one more and he is off' : ''}</p>`);
    view = W.cardView(m, ev, live, red);
  } else if (q.k === 'pen') {
    tag.innerHTML = `<b>🎯 PENALTY</b>`; capH(`<p class="w13big w13grad">PENALTY!</p><p style="font-weight:900">${esc(D.n[sd])}${p ? ' · ' + esc(p.short) + ' to take it' : ''}</p>`);
    view = W.penView(m, ev, live);
  } else if (q.k === 'sub') {
    const L = m.T[sd].subLog, x = L[L.length - 1], po = x && W.player(x[0], m.S), pn = x && W.player(x[1], m.S);
    tag.innerHTML = `<b>🔁 SUBSTITUTION</b>`; capH(`<p style="font-weight:900;font-size:15px"><span style="color:#22d3ee">⬆ ${pn ? pn.num + ' ' + esc(pn.name) : ''}</span></p><p style="font-weight:900;font-size:13px"><span style="color:#ff2d95">⬇ ${po ? po.num + ' ' + esc(po.name) : ''}</span></p><p style="font-size:11px;color:#94a3b8">${esc(D.n[sd])} · ${ev.min}'</p>`);
    view = x ? W.subView(m, x, sd, live) : null;
  }
  if (!view || !G3.run(box, view)) { /* no 3D: a 2D replay on the radar, or a caption card over a dark backdrop */
    if ((q.k === 'goal' || q.k === 'save' || q.k === 'miss') && m.rec) W.rp2d(box, (m.rec || []).filter(f => f.k >= ev.tick - 120 && f.k <= q.q.tick), live, avail - 0.3);
    else box.style.background = 'radial-gradient(circle at 50% 35%,rgba(168,85,247,.35),rgba(7,11,24,.96) 70%)';
  } else W._bcV = view;
};
/* camera helper: smooth moves inside a shot, a quick dissolve on every cut (wide → close-up → goal cam) */
const camRig = (host) => { let cam = null; const dip = host ? host.querySelector('.dip') : null;
  return (tg, dt, mode, fov) => { const cut = cam && cam.m !== mode; if (cut && dip) { dip.style.transition = 'none'; dip.style.opacity = '0.9'; void dip.offsetWidth; dip.style.transition = 'opacity .3s ease-out'; dip.style.opacity = '0'; }
    const k = !cam || cut ? 1 : 1 - Math.exp(-dt * 4.5); cam = { eye: sm(k < 1 ? cam.eye : null, tg.eye, k), at: sm(k < 1 ? cam.at : null, tg.at, k), fov: fov || 40, m: mode }; return cam; }; };
/* who kicked the ball (for the kick pose in replays): the nearest player of the shooting side when the ball leaves him fast */
const kickFrames = (F, side) => { const K = {}; for (let i = 2; i < F.length; i++) { const a = F[i - 1], b = F[i], v = Math.hypot(b.b[0] - a.b[0], b.b[1] - a.b[1]) / 0.05; if (v < 13) continue;
  let best = null, bd = 2.2; for (const q of a.p) { const d = Math.hypot(q[2] - a.b[0], q[3] - a.b[1]); if (d < bd) { bd = d; best = q[4]; } } if (best && !K[best]) K[best] = i; } return K; };
W.rpView = function (F, ev, live, dur, host) {
  const gi = Math.max(0, F.findIndex(f => f.k >= ev.tick)), atk = ev.k === 'save' ? 1 - ev.side : ev.side, gx = atk === 0 ? 52.5 : -52.5, dirx = atk === 0 ? 1 : -1, last = F.length - 1;
  const a0 = Math.max(0, gi - 100), a1 = Math.max(a0 + 1, gi - 34), b1 = Math.min(last, gi + 8), c1 = last;
  const third = ev.k === 'goal' ? 'orbit' : ev.k === 'save' ? 'keeper' : 'goalcam';
  let SEG = [[a0, a1, 1, 'tv'], [a1, b1, 0.38, 'close'], [b1, c1, ev.k === 'goal' ? 0.8 : 0.5, third]].filter(s => s[1] > s[0]);
  const nat = SEG.reduce((t, s) => t + (s[1] - s[0]) * 0.05 / s[2], 0), f = nat / Math.max(0.5, dur); SEG = SEG.map(s => [s[0], s[1], s[2] * f, s[3]]);
  const K = kickFrames(F.slice(0, gi + 2), atk), sc = ev.k === 'goal' ? ev.pid : null, D = W.dress(live), rig = camRig(host), st = {}, parts = []; let t0 = null, spin = 0, burst = false;
  const fiAt = (t) => { let l = t; for (const s of SEG) { const len = (s[1] - s[0]) * 0.05 / s[2]; if (l <= len) return [s[0] + l / len * (s[1] - s[0]), s]; l -= len; } const s = SEG[SEG.length - 1]; return [s[1], s]; };
  const v = { alive: () => !!W._bc && document.body.contains(host),
    step(dt, now) { if (t0 == null) t0 = now; const t = (now - t0) / 1000; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(v.D.sd.lv, v.D.k[0].c1, v.D.k[1].c1); v.dt = dt; v.t = t;
      const [fi, s] = fiAt(t), fr = frameAt(F, fi); v.f = fr; v.fi = fi; v.cel = ev.k === 'goal' && fi >= gi; spin += dt * 8 * s[2]; const bx = PX(fr.b[0]), bz = PZ(fr.b[1]);
      let tg; const md = s[3];
      if (md === 'tv') tg = { eye: [bx * 0.85, 13, 51], at: [bx, 0.5, bz * 0.7] };
      else if (md === 'close') tg = { eye: [bx - dirx * 7, 1.9, bz + (bz > 0 ? -4 : 4)], at: [bx + dirx * 9, 1.0, bz * 0.6] };
      else if (md === 'goalcam') tg = { eye: [gx + dirx * 8, 2.5, bz * 0.3], at: [bx, 1.0, bz] };
      else if (md === 'keeper') tg = { eye: [gx - dirx * 6, 2.0, (bz > 0 ? -1 : 1) * 10], at: [gx - dirx * 1.2, 1.0, bz * 0.4] };
      else { const sp = fr.p.find(q => q.id === sc) || fr.p[0], th = t * 0.8; tg = { eye: [PX(sp.x) + Math.sin(th) * 7.5, 3.0, PZ(sp.y) + Math.cos(th) * 7.5], at: [PX(sp.x), 1.3, PZ(sp.y)] }; }
      if (v.cel && !burst) { burst = true; G3.burst(parts, 60, [gx, 3, 0], 7); }
      return rig(tg, dt, md, md === 'tv' ? 40 : 44); },
    draw() { const fr = v.f, fi = v.fi; G3.drawWorld(v.Wd, v.cel ? Math.abs(Math.sin(v.t * 9)) * 0.35 : 0);
      const bx = fr.b[0], by = fr.b[1], toGoal = Math.abs((atk === 0 ? 105 : 0) - bx);
      drawPlayers(v.D, fr.p, st, v.dt, (p) => { const ki = K[p.id]; if (ki != null && fi >= ki - 1 && fi < ki + 7) return { kick: (fi < gi - 30 ? 0.55 : 1) * (1 - Math.max(0, fi - ki) / 7) };
        if (p.gk && p.side !== atk && toGoal < 12 && fi <= gi + 4) { const pr = clamp(1 - toGoal / 12, 0, 1), d = (p.side === 0 ? 1 : -1) * clamp((by - p.y) / 2.4, -1, 1); return Math.abs(by - p.y) > 0.9 ? { dive: d * pr, run: 0 } : { catch: pr > 0.6 ? 1 : 0, run: 0 }; }
        if (v.cel && p.side === ev.side && !p.gk) return W.celOf(p.id, p.id === sc, v.t);
        if (ev.k === 'miss' && fi > gi && p.id === ev.pid) return { hands: 1, run: 0 };
        if (ev.k === 'goal' && fi > gi + 4 && p.side !== ev.side) return hash(p.id) % 3 === 1 ? { mhClip: { name: 'MX_Defeated', t: Math.min(6.6, 0.4 + (fi - gi) * 0.03) }, lean: 0.35 } : { mhClip: { name: 'MX_Sad', t: 0.4 + (fi - gi) * 0.03 + (hash(p.id) % 5) * 0.15 }, lean: 0.35 };
        return null; });
      if (fr.rf) drawRef(v.D, fr.rf[0], fr.rf[1]);
      G3.ball(PX(bx), PZ(by), fr.b[2], spin); parts.splice(0, parts.length, ...G3.particles(parts, v.dt)); } };
  return v;
};
/* the same replay on the 2D radar (phones without 3D) */
W.rp2d = function (box, F, live, dur) { if (!F.length) return; const cv = document.createElement('canvas'); box.appendChild(cv); box.style.cssText += ';display:flex;align-items:center;justify-content:center';
  const P2 = new Pitch(cv); P2.w = Math.min(box.clientWidth * 0.9, box.clientHeight * 1.4); cv.style.width = P2.w + 'px'; P2.size(); const T = [{ color: live.home.color, gkColor: live.home.gkColor }, { color: live.away.color, gkColor: live.away.gkColor }], t0 = performance.now();
  const iv = setInterval(() => { if (!document.body.contains(cv)) return clearInterval(iv); const u = clamp((performance.now() - t0) / 1000 / Math.max(0.5, dur), 0, 1), f = frameAt(F, u * (F.length - 1));
    P2.draw({ P: f.p.map(q => ({ x: q.x, y: q.y, px: q.x, py: q.y, side: q.side, role: q.gk ? 'GK' : 'MID', num: q.num })), ball: { x: f.b[0], y: f.b[1], px: f.b[0], py: f.b[1], h: f.b[2], owner: null }, T, dir: (s) => s === 0 ? 1 : -1 }, 1); }, 33); };
/* frozen live positions (players + referee) for the card / penalty / sub scenes */
const frozen = (m) => m.P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.x, y: p.y, id: p.id, num: p.num }));
const lastPos = (m, id) => { const p = m.P.find(q => q.id === id); if (p) return { x: p.x, y: p.y, side: p.side, num: p.num }; const R = m.rec || []; for (let i = R.length - 1; i >= 0; i--) { const q = R[i].p.find(z => z[4] === id); if (q) return { x: q[2], y: q[3], side: q[0], num: q[5] }; } return null; };
W.cardView = function (m, ev, live, red) {
  const fp = lastPos(m, ev.pid) || { x: 52.5, y: 34, side: ev.side, num: '' }, rx = clamp(fp.x + (fp.x < 52.5 ? 1.7 : -1.7), 2, 103), ry = fp.y, st = {}, rig = camRig(document.getElementById('w13bc')); let t0 = null;
  const list = frozen(m).filter(p => p.id !== ev.pid).concat([{ side: fp.side, gk: false, x: fp.x, y: fp.y, id: ev.pid, num: fp.num }]);
  const v = { alive: () => !!W._bc, step(dt, now) { if (t0 == null) t0 = now; v.t = (now - t0) / 1000; v.dt = dt; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(v.D.sd.lv, v.D.k[0].c1, v.D.k[1].c1);
      const cx = PX((fp.x + rx) / 2), cz = PZ(ry), sz = cz > 0 ? -1 : 1, dx = v.t * 0.25; return rig({ eye: [cx + 0.8 + dx, 2.1, cz + sz * 7.2], at: [cx, 1.35, cz] }, dt, 'c', 44); },
    draw() { G3.drawWorld(v.Wd, 0); const t = v.t, walk = red && t > 2.4 ? Math.min(6, (t - 2.4) * 1.3) : 0, face = Math.atan2(PX(rx) - PX(fp.x), 0);
      drawPlayers(v.D, list.map(p => p.id === ev.pid ? Object.assign({}, p, { y: p.y + (walk ? (p.y < 34 ? -walk : walk) : 0) }) : p), st, v.dt, (p) => p.id === ev.pid ? (walk ? { run: 0.2 } : { hands: red ? 1 : 0.6, lean: red ? 0 : 0.25, run: 0, face: face, mhClip: red ? { name: 'MX_AngryPoint', t: Math.min(2.4, t) } : { name: hash(ev.pid) % 2 ? 'MX_Argue' : 'MX_Argue2', t: 1 + t } }) : null);
      W._refO = { card: t > 0.35 ? (red ? 'r' : 'y') : null, run: 0, yaw: Math.atan2(PX(fp.x) - PX(rx), 0) }; drawRef(v.D, rx, ry); W._refO = null; } };
  return v;
};
W.penView = function (m, ev, live) {
  const sp = m.sp, side = ev.side, gx = side === 0 ? 105 - 11 : 11, rx = gx + (side === 0 ? -2.5 : 2.5), st = {}, rig = camRig(document.getElementById('w13bc')); let t0 = null;
  const v = { alive: () => !!W._bc, step(dt, now) { if (t0 == null) t0 = now; v.t = (now - t0) / 1000; v.dt = dt; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(v.D.sd.lv, v.D.k[0].c1, v.D.k[1].c1);
      const X = PX(gx), dir = side === 0 ? 1 : -1; return rig({ eye: [X - dir * 9, 2.4 + v.t * 0.2, 6], at: [X + dir * 3, 0.9, 0] }, dt, 'p', 42); },
    draw() { G3.drawWorld(v.Wd, 0.1); drawPlayers(v.D, frozen(m), st, v.dt, (p) => p.side !== side && !p.gk ? { hands: 1, run: 0 } : null); W._refO = { point: 1, run: 0, yaw: side === 0 ? Math.PI / 2 : -Math.PI / 2 }; drawRef(v.D, rx, 34 + 1.5); W._refO = null; G3.ball(PX(gx), 0, 0, 0); void sp; } };
  return v;
};
W.subView = function (m, x, sd, live) {
  const st = {}, rig = camRig(document.getElementById('w13bc')), op = lastPos(m, x[0]) || { x: 50, y: 20 }; let t0 = null;
  const v = { alive: () => !!W._bc, step(dt, now) { if (t0 == null) t0 = now; v.t = (now - t0) / 1000; v.dt = dt; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(v.D.sd.lv, v.D.k[0].c1, v.D.k[1].c1);
      return rig({ eye: [-1.5 + v.t * 0.3, 2.6, -24], at: [-3.4, 1.4, -35.5] }, dt, 's', 42); },
    draw() { G3.drawWorld(v.Wd, 0); const t = v.t, u = ease13(t / 3.2), offX = 48.9 - 1.4, list = frozen(m).filter(p => p.id !== x[1] && p.id !== x[0]);
      list.push({ side: sd, gk: false, x: offX + 1.2, y: lerp(4.2, 1.2, u), id: x[0], num: op.num }); list.push({ side: sd, gk: false, x: offX - 1.0, y: lerp(-0.6, 2.2, u), id: x[1], num: (W.player(x[1], m.S) || {}).num });
      drawPlayers(v.D, list, st, v.dt, (p) => p.id === x[0] ? { run: 0.15, clap: t > 2.6 ? 1 : 0 } : p.id === x[1] ? { run: 0.35 } : null); } };
  return v;
};
/* ⏸️ half time: the players walk back to the tunnel, then the stats board (subs + formation stay one tap away) */
W.htScene = function (m, live, avail) {
  const host = document.getElementById('w11'); if (!host) return; const walkT = Math.min(9, avail - 2); W._bc = 1;
  if (!G3.ok() || walkT < 3) { W._bc = 0; return; }
  const o = bcBox(), box = o.querySelector('#w13bx'), D = W.dress(live), st = {}, rig = camRig(o), TZ = -38.9 + 34, start = (m.rec && m.rec.length ? m.rec[Math.max(0, m.rec.length - 40)].p : null);
  host.classList.add('w13ht'); o.querySelector('#w13tag').innerHTML = '<b>⏸️ HALF TIME</b>'; o.querySelector('#w13cap').innerHTML = `<div><p style="font-size:11px;font-weight:900;letter-spacing:.14em;color:#67e8f9">HALF TIME</p><p class="w13big">${esc(D.sh[0])} ${m.T[0].score}–${m.T[1].score} ${esc(D.sh[1])}</p></div>`;
  const P0 = (start || m.P.map(p => [p.side, p.role === 'GK' ? 1 : 0, p.x, p.y, p.id, p.num])).map(q => ({ side: q[0], gk: !!q[1], x: q[2], y: q[3], id: q[4], num: q[5] }));
  let t0 = null; const v = { alive: () => !!W._bc && document.body.contains(box),
    step(dt, now) { if (t0 == null) t0 = now; v.t = (now - t0) / 1000; v.dt = dt; v.D = teamsOf(live); v.Wd = v.Wd || G3.world(v.D.sd.lv, v.D.k[0].c1, v.D.k[1].c1); if (v.t > walkT) { setTimeout(() => { if (W._bcV === v) { W.bcEnd(); W._bc = 0; } }, 0); return null; }
      return rig({ eye: [Math.sin(v.t * 0.15) * 10, 6 - v.t * 0.3, 2 - v.t * 0.6], at: [0, 1.2, -30] }, dt, 'h', 44); },
    draw() { G3.drawWorld(v.Wd, 0); const t = v.t, list = P0.map((p, i) => { const sx = p.x, sy = p.y, tx = 52.5 + (p.side ? 0.6 : -0.6), d = Math.hypot(tx - sx, TZ - sy), T0 = (i % 5) * 0.2, T1 = walkT - 0.6, go = ease13(clamp((t - T0) / (T1 - T0), 0, 1)); return Object.assign({}, p, { x: lerp(sx, tx, go), y: lerp(sy, TZ, go) - (go >= 1 ? (t - T1) * 1.5 : 0), walk: go < 1 ? Math.min(1, d / (T1 - T0) / 4) + 0.15 : 0 }); }).filter(p => p.y > -9);
      drawPlayers(v.D, list, st, v.dt, (p) => ({ run: p.walk || 0.2 })); } };
  if (G3.run(box, v)) W._bcV = v; else W.bcEnd();
};
/* richer half-time board: more stats, momentum, best so far */
const statRows = (m) => { const a = m.T[0], b = m.T[1], pt = a.poss + b.poss || 1, D = W.live ? W.dress(W.live) : null, c0 = D ? D.k[0].c1 : '#22d3ee', c1 = D ? D.k[1].c1 : '#ff2d95';
  const row = (l, x, y, pc) => { const tot = (x + y) || 1, X = pc ? x : Math.round(x / tot * 100); return `<div><b>${pc ? x + '%' : x}</b><span>${l}<i class="sb"><i style="width:${X}%;background:${c0}"></i><i style="width:${100 - X}%;background:${c1}"></i></i></span><b>${pc ? y + '%' : y}</b></div>`; };
  const pa = Math.round(a.poss / pt * 100); return `<div class="w13st">${row('Possession', pa, 100 - pa, 1)}${row('Shots', a.shots, b.shots)}${row('On target', a.onT, b.onT)}${row('Corners', a.corners, b.corners)}${row('Fouls', a.fouls, b.fouls)}${row('Offsides', a.offs, b.offs)}${row('Cards', a.cards, b.cards)}${row('Passes', a.passes, b.passes)}</div>`; };
W.halfTime = (function (b) { return function (on, m, left) { b.apply(this, arguments); const ov = document.getElementById('w11ov'), x = ov && ov.querySelector('[data-ht]'); if (!x || x.dataset.g13) return; x.dataset.g13 = 1; css13();
  const tb = x.querySelector('table'); if (tb) tb.outerHTML = statRows(m); x.style.maxWidth = '640px'; x.style.margin = '0 auto'; const R = W.ratings(m), top = Object.keys(R).filter(id => m.P.some(p => p.id === id)).sort((p, q) => R[q] - R[p]).slice(0, 3);
  const best = top.map(id => { const p = W.player(id, m.S); return p ? `<span style="white-space:nowrap"><span class="w13rt" style="background:${rtCol(R[id])}">${R[id].toFixed(1)}</span> ${esc(p.short)}</span>` : ''; }).join(' · ');
  const tbl = x.querySelector('.w13st'); if (tbl) tbl.insertAdjacentHTML('afterend', `<p style="font-size:11px;margin:4px 0 6px;color:#cbd5e1">⭐ Best so far: ${best}</p>`); }; })(W.halfTime);

// ---------- 🎆 tunnel walk-out + walk-off ceremonies (no skip) ----------
const TUN = { x: 52.5, y0: 34 - 46.5, y1: 34 - 38.9 };
W.ceremony = function (kind, live) {
  const D = W.dress(live), dur = W.cerDur(live)[kind], short = live.kind !== 'league'; W._cer = kind; css13(); W._pvLive = live; W.cineClose(); if (W._bc) W.bcEnd();
  const o = cerBox(), box = document.getElementById('w11cerb'), cap = document.getElementById('w11cert'); let lastCap = '';
  const setCap = (h) => { if (h !== lastCap) { lastCap = h; cap.innerHTML = h; W.pvFill(cap); } };
  const t0 = performance.now(), clockT = () => kind === 'open' ? dur + ((live.kind === 'league' ? W.nowS() : Date.now()) - live.startAt) / 1000 : (performance.now() - t0) / 1000;
  const sd = D.sd, seats = CC.STD_SEATS[clamp(sd.lv, 1, 5) - 1], L = [lineup(D, 0), lineup(D, 1)], ids = [sideIds(live, 0), sideIds(live, 1)];
  const kick0 = (W.m && W.m.tick === 0 ? W.m : W.simulate(live.home, live.away, live.seed, [], 0)).P.map(p => ({ side: p.side, gk: p.role === 'GK', x: p.x, y: p.y, id: p.id }));
  const mEnd = kind === 'close' ? W.m : null, R = mEnd ? W.ratings(mEnd) : null, potm = mEnd ? W.potm(mEnd) : null, my = W.my;
  const pk = kind === 'close' && live.M && live.M.cup && CC.isKO({ k: live.M.cup }, live.M.cr) && mEnd.T[0].score === mEnd.T[1].score ? CC.pens(live.mid) : null;
  const ws = mEnd ? (mEnd.T[0].score > mEnd.T[1].score ? 0 : mEnd.T[1].score > mEnd.T[0].score ? 1 : pk ? (pk[0] > pk[1] ? 0 : 1) : -1) : -1;
  /* phases (seconds) */
  const PH = kind === 'open' ? (short ? { fly: 0, tun: 2.5, line: 8.5, shake: 12.5, toss: 15.5, go: 19.5 } : { fly: 0, tun: 6, line: 18, shake: 30, toss: 36, go: 41 }) : (short ? { react: 0, clap: 4, off: 7, stats: 12 } : { react: 0, clap: 5, off: 9, stats: 16 });
  const toss = hash('toss:' + live.seed) % 2, capt = [W.capOf(live, 0), W.capOf(live, 1)], star = [W.starOf(live, 0, [capt[0]]), W.starOf(live, 1, [capt[1]])], watch = [W.watchOf(live, 0, [capt[0], star[0]]), W.watchOf(live, 1, [capt[1], star[1]])];
  const vs = `<div style="display:flex;align-items:center;justify-content:center;gap:14px">${crestHtml(D, 0, 50)}<b style="font-size:14px;color:#94a3b8">VS</b>${crestHtml(D, 1, 50)}</div><p style="text-align:center;font-weight:900;font-size:15px;margin-top:4px">${esc(D.n[0])} <span style="color:#94a3b8">vs</span> ${esc(D.n[1])}</p>`;
  const captions = (t) => {
    if (kind === 'open') {
      if (t < PH.tun) return capCard(`<p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">${esc(D.comp)}</p><p style="font-size:20px;font-weight:900;margin-top:2px">🏟️ ${esc(sd.nm)}</p><p style="font-size:11px;color:#cbd5e1">Stadium level ${sd.lv} · ${fmt(seats)} seats · Season ${D.S}</p>`);
      if (t < PH.line) return capCard(vs + `<p style="text-align:center;font-size:11px;color:#cbd5e1;margin-top:4px">🚶 The teams walk out of the tunnel</p>`);
      if (t < PH.shake) { const s = short ? (t < (PH.line + PH.shake) / 2 ? 0 : 1) : (t < (PH.line + PH.shake) / 2 ? 0 : 1);
        return `<div class="w13pv">${W.pvCard(capt[s], live, s, '©️ CAPTAIN', '#facc15')}${W.pvCard(star[s], live, s, '⭐ STAR PLAYER', '#22d3ee', '', 0.1)}${short ? '' : W.pvCard(watch[s], live, s, '👀 ONE TO WATCH', '#ff2d95', '', 0.2)}</div>` + capCard(`<p style="font-weight:900">📋 ${esc(D.n[s])} · Starting XI · ${esc(s ? live.away.form : live.home.form)}${(s ? live.away.fp : live.home.fp) ? ' (custom spots)' : ''}</p>${xiList(L[s])}`); }
      if (t < PH.toss) return capCard(`<p style="text-align:center;font-weight:900">🤝 Fair play: the handshake line</p>`);
      if (t < PH.go) return capCard(`<p style="text-align:center;font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">🪙 COIN TOSS</p><p style="text-align:center;font-weight:900;font-size:15px">${t < PH.toss + 1.6 ? 'Heads or tails…' : `${esc(D.sh[toss])} win the toss` + (toss ? ` · ${esc(D.sh[0])} kick off` : ' · they kick off')}</p>`);
      const n = Math.max(0, Math.ceil(dur - t)); return `<div style="text-align:center"><p style="font-size:12px;font-weight:900;letter-spacing:.14em;color:#67e8f9">KICK-OFF IN</p><p style="font-size:64px;font-weight:900;line-height:1" class="w13grad">${n}</p></div>`; }
    const sc = mEnd ? `${mEnd.T[0].score}–${mEnd.T[1].score}` : '', me = my === 0 || my === 1 ? (ws === -1 ? 'DRAW' : ws === my ? 'WIN' : 'DEFEAT') : '';
    if (t < PH.clap) return capCard(`<p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9">🏁 FULL TIME · ${esc(D.comp)}</p><div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:6px">${crestHtml(D, 0, 40)}<b style="font-size:32px">${sc}</b>${crestHtml(D, 1, 40)}</div>${pk ? `<p style="text-align:center;font-weight:900;color:#facc15">🥅 Penalties ${pk[0]}–${pk[1]}</p>` : ''}${me ? `<p style="text-align:center;font-weight:900;color:${me === 'WIN' ? '#a3e635' : me === 'DEFEAT' ? '#ff2d95' : '#facc15'}">${me === 'WIN' ? '🎉 WIN!' : me}</p>` : ''}`);
    if (t < PH.stats && potm) { const pp = W.player(potm.id, D.S); return `<div class="w13pv">${W.pvCard(potm.id, live, potm.side, '⭐ PLAYER OF THE MATCH', '#facc15', `Rating ${potm.r.toFixed(1)}${pp ? '' : ''}`)}${W.pvCard(capt[my === 1 ? 1 : 0], live, my === 1 ? 1 : 0, '©️ CAPTAIN', '#22d3ee', R ? 'Rating ' + (R[capt[my === 1 ? 1 : 0]] || 6).toFixed(1) : '', 0.1)}</div>` + capCard(`<p style="text-align:center;font-weight:900">🚶 Back down the tunnel · ${sc}</p>`); }
    return capCard(`<p style="font-size:10px;font-weight:900;letter-spacing:.12em;color:#67e8f9;text-align:center">📊 MATCH STATS · ${esc(D.sh[0])} ${sc} ${esc(D.sh[1])}</p>${mEnd ? statRows(mEnd) : ''}`);
  };
  const finish = () => { if (W._cer !== kind) return; W._cer = null; clearInterval(iv); if (G3.view === v) G3.stop(v); o.remove(); if (W.v3.on && document.getElementById('w11l3')) W.v3set(true); };
  const st = {}, parts3 = []; let cam = null, fired = 0;
  /* engine metres: tunnel mouth at (52.5, -4.9); players come out in two lines, referees first */
  const lineX = (s, i) => 52.5 + (s ? 1 : -1) * (2.6 + i * 1.75), LY = 34;
  const v = { alive: () => W._cer === kind && document.body.contains(box),
    step(dt) { const t = clockT(); if (t >= dur || t < -7) { setTimeout(finish, 0); return null; } v.D = teamsOf(live); v.Wd = v.Wd || G3.world(sd.lv, v.D.k[0].c1, v.D.k[1].c1); v.t = t; v.dt = dt;
      let eye, at; const P = PH;
      if (kind === 'open') {
        if (t < P.tun) { const th = t * 0.22 + 0.6; eye = [Math.sin(th) * 88, 40, Math.cos(th) * 72]; at = [0, 0, 0]; }
        else if (t < P.line) { const u = (t - P.tun) / (P.line - P.tun); eye = [lerp(6, 3, u), lerp(2.0, 2.6, u), lerp(-24, -12, u)]; at = [0, 1.4, lerp(-38, -14, u)]; if (!fired) { fired = 1; G3.burst(parts3, 80, [0, 2, -36], 5); } }
        else if (t < P.shake) { const u = (t - P.line) / (P.shake - P.line), x = lerp(-18, 18, u); at = [x, 1.5, 0]; eye = [x * 0.9, 2.3, 7.5]; }
        else if (t < P.toss) { const u = (t - P.shake) / (P.toss - P.shake); at = [lerp(-10, 10, u), 1.4, 0.6]; eye = [lerp(-12, 12, u), 2.2, 6]; }
        else if (t < P.go) { at = [0, 1.0, 0]; eye = [3.2, 2.0, 3.6]; }
        else { const u = ease13((t - P.go) / (dur - P.go)); eye = [0, lerp(6, 21, u), lerp(16, 72, u)]; at = [0, lerp(1.2, 0, u), 0]; }
      } else {
        if (t < P.clap) { const u = t / P.clap; eye = [Math.sin(u * 0.6) * 30, lerp(28, 18, u), lerp(70, 55, u)]; at = [0, 0, 0]; }
        else if (t < P.off) { const bp = potm && mEnd.P.find(p => p.id === potm.id) || mEnd.P[0], th = t * 0.6; at = [PX(bp.x), 1.3, PZ(bp.y)]; eye = [at[0] + Math.sin(th) * 6.5, 2.8, at[2] + Math.cos(th) * 6.5]; }
        else if (t < P.stats) { eye = [4, 2.2, -27]; at = [0, 1.3, -38]; }
        else { const th = t * 0.25; eye = [Math.sin(th) * 70, 34, Math.cos(th) * 60]; at = [0, 0, 0]; if (fired < 6 && Math.random() < dt * 3) { fired++; G3.burst(parts3, 50, [(Math.random() - 0.5) * 90, 30 + Math.random() * 10, (Math.random() - 0.5) * 60], 9); } }
      }
      const k = 1 - Math.exp(-dt * 4), cut = cam && Math.hypot(eye[0] - cam.eye[0], eye[2] - cam.eye[2]) > 25; cam = { eye: sm(cam && !cut ? cam.eye : null, eye, cam && !cut ? k : 1), at: sm(cam && !cut ? cam.at : null, at, cam && !cut ? k : 1), fov: 42 }; return cam; },
    draw() { const t = v.t, P = PH; G3.drawWorld(v.Wd, Math.abs(Math.sin(t * (kind === 'close' ? 8 : 3))) * (kind === 'close' ? 0.3 : 0.12));
      const list = [];
      if (kind === 'open') {
        for (let s = 0; s < 2; s++) L[s].forEach((p, i) => { const id = ids[s][i] || s + ':' + i, k0 = kick0.find(q => q.id === id) || { x: 52.5, y: 34 };
          /* walk out: line s, i-th in the queue, 1.45 m/s from inside the tunnel to the halfway line */
          const tunX = 52.5 + (s ? 0.75 : -0.75), q0 = TUN.y1 - 1.2 - i * 0.95, path = (LY - q0) + Math.abs(lineX(s, i) - tunX), walked = Math.max(0, t - P.tun - 0.4) * path / Math.max(1, P.line - P.tun);
          let x, y, face = Math.PI, walk = 0, o = null;
          if (t < P.line + 1.5) { const d = Math.min(walked, path), along = d - (LY - q0); if (along <= 0) { x = tunX; y = q0 + d; face = 0; } else { x = lerp(tunX, lineX(s, i), along / Math.abs(lineX(s, i) - tunX)); y = LY; face = s ? Math.PI / 2 : -Math.PI / 2; } walk = d < path ? 1 : 0; if (!walk) face = Math.PI; }
          else if (t < P.shake) { x = lineX(s, i); y = LY; face = Math.PI; }
          else if (t < P.toss) { /* away team walks along the home line shaking hands (both lines step forward to meet) */
            const u = (t - P.shake) / (P.toss - P.shake); x = lineX(s, i); y = LY + (s ? 0.6 : -0.6) * 0; if (s === 1) { x = lerp(lineX(1, i), lineX(0, i), ease13(u)); y = LY + 0.9; face = -Math.PI / 2; walk = u < 1 ? 1 : 0; } else face = 0.001; o = { shake: Math.abs(x - lineX(0, i)) < 3 ? 1 : 0 }; }
          else if (t < P.go) { x = lineX(s, i); y = LY + (s ? 0.9 : 0); if (s === 1) x = lineX(0, i); face = Math.PI; if (id === capt[s]) { x = 52.5 + (s ? 1.1 : -1.1); y = 34; face = s ? -Math.PI / 2 : Math.PI / 2; o = { shake: t > P.go - 1.6 ? 1 : 0 }; } }
          else { const sx = id === capt[s] ? 52.5 + (s ? 1.1 : -1.1) : s === 1 ? lineX(0, i) : lineX(s, i), sy = id === capt[s] ? 34 : LY + (s ? 0.9 : 0), dd = Math.hypot(k0.x - sx, k0.y - sy), go = Math.min(dd, 1.6 * Math.max(0, t - P.go - 0.3)) / Math.max(0.001, dd);
            x = lerp(sx, k0.x, go); y = lerp(sy, k0.y, go); walk = go > 0 && go < 1 ? 1 : 0; face = go >= 1 ? (s ? -Math.PI / 2 : Math.PI / 2) : null; }
          list.push({ side: s, gk: i === 0, x, y, id, num: p.num, face, walk, o }); });
        drawPlayers(v.D, list, st, v.dt, (p) => Object.assign(p.walk ? { run: 0.2 } : { face: p.face }, p.o || {}));
        /* referees lead the teams out, then the referee does the toss in the centre circle */
        const RT = (() => { try { return v.D.RT || null; } catch (e) { return null; } })(); void RT;
        const refPath = Math.max(0, t - P.tun) * (LY - TUN.y1 + 0.5) / Math.max(1, P.line - P.tun - 0.8), ry = Math.min(LY, TUN.y1 - 0.5 + refPath);
        if (t < P.toss) drawRef(v.D, 52.5, ry); else { W._refO = { yaw: 0, run: 0, wave: t < P.toss + 1.4 ? 1 : 0 }; drawRef(v.D, 52.5, 34.9); W._refO = null; if (t < P.toss + 1.6) G3.coin && G3.coin(0, 1.6 + Math.sin((t - P.toss) / 1.6 * Math.PI) * 1.4, 0.9, (t - P.toss) * 26); else if (t < P.go) G3.coin && G3.coin(0, 0.01, 0.9, Math.PI / 2 * (toss ? 1 : -1) * 0); }
        if (t >= P.go) G3.ball(0, 0, 0, 0);
      } else if (mEnd) {
        mEnd.P.forEach((p, i) => { let x = p.x, y = p.y, walk = 0, face = null;
          if (t >= P.off) { const tx = 52.5 + (p.side ? 0.7 : -0.7), d = Math.hypot(tx - p.x, TUN.y1 - p.y), T0 = P.off + (i % 6) * 0.2, T1 = P.stats + 2.5, go = ease13(clamp((t - T0) / (T1 - T0), 0, 1)); x = lerp(p.x, tx, go); y = lerp(p.y, TUN.y1, go); walk = go < 1 ? Math.min(1, d / (T1 - T0) / 4) + 0.15 : 0; if (go >= 1) y = TUN.y1 - 1 - (t - T1) * 1.5; }
          list.push({ side: p.side, gk: p.role === 'GK', x, y, id: p.id, num: p.num, walk, face }); });
        drawPlayers(v.D, list.filter(p => p.y > TUN.y0 + 1), st, v.dt, (p) => { if (p.walk) return { run: p.walk, wave: t > P.off && hash(p.id) % 3 === 0 ? 1 : 0 };
          const ph = hash(p.id) % 7; if (t >= P.clap && t < P.off) return { clap: 1, run: 0, mhClip: { name: 'MX_Clap', t: t + ph * 0.17, loop: true } }; const win = ws === p.side;
          if (win) return Object.assign(W.celOf(p.id, potm && p.id === potm.id, t), { run: 0 }, !G3.B3 ? {} : ph === 3 ? { mhClip: { name: 'MX_Victory', t: (t * 0.9) % 8 } } : ph === 1 || ph === 5 ? { mhClip: { name: 'MX_Cheer', t: t + ph * 0.4, loop: true } } : ph === 0 ? { mhClip: { name: 'MX_VicIdle', t: t, loop: true } } : ph === 6 ? { mhClip: { name: 'MX_Happy', t: Math.min(2.9, t * 0.7) } } : {});
          return ws === -1 ? (ph % 2 ? { clap: 1, run: 0, mhClip: { name: 'MX_Clap', t: t + ph * 0.17, loop: true } } : { run: 0 }) : ph % 2 ? { mhClip: { name: 'MX_Defeated', t: Math.min(6.6, 0.2 + t * 0.8) }, run: 0 } : { mhClip: { name: 'MX_Sad', t: Math.min(4.1, 0.3 + t * 0.6 + ph * 0.2) }, run: 0 }; });
        if (t < P.off) drawRef(v.D, 52.5, 34);
      }
      parts3.splice(0, parts3.length, ...G3.particles(parts3, v.dt)); } };
  const iv = setInterval(() => { const t = clockT(); setCap(captions(Math.max(0, t))); if (!G3.ok() && (t >= dur || !document.body.contains(o))) finish(); }, 200);
  setCap(captions(Math.max(0, clockT())));
  if (!G3.run(box, v)) { box.style.background = 'radial-gradient(circle at 50% 30%,rgba(168,85,247,.35),rgba(7,11,24,0) 70%)'; cap.style.justifyContent = 'center'; }
};
G3.coin = (x, y, z, s) => { const B = G3.B3; if (G3.be === 'b3' && B && B.coin) B.coin(x, y, z, s); };

// ---------- 🏁 full-time screens: ratings, stats, table, previews, highlights ----------
W.ftExtras = function (live, m, mine) {
  const el = document.querySelector('#w11b .card'); if (!el || !m) return; css13(); W._pvLive = live;
  const D = W.dress(live), R = W.ratings(m), potm = W.potm(m), s = mine === 1 ? 1 : 0, capt = W.capOf(live, s), star = W.starOf(live, s, [capt]), watch = W.watchOf(live, s, [capt, star]);
  const XI = (k) => m.T[k].ids.slice(0, 11).concat(m.T[k].subLog.map(x => x[1])).filter((id, i, a) => a.indexOf(id) === i && R[id] != null).map(id => ({ id, p: W.player(id, m.S), r: R[id] })).filter(x => x.p).sort((a, b) => b.r - a.r);
  const rows = XI(s).slice(0, 8).map(x => `<div style="display:flex;align-items:center;gap:6px;font-size:12px;padding:2px 0"><span class="w13rt" style="background:${rtCol(x.r)}">${x.r.toFixed(1)}</span><span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.p.flag} ${esc(x.p.name)}</span><span style="color:#94a3b8">${x.p.pos}</span></div>`).join('');
  const hl = (m.bc ? m.bc.L : []).filter(q => q.k === 'goal' || q.k === 'save' || q.k === 'miss').length;
  el.insertAdjacentHTML('afterend', `<div class="card"><p style="font-weight:900">⭐ Player of the match</p><div class="w13pv" style="margin-top:8px;justify-content:flex-start">${potm ? W.pvCard(potm.id, live, potm.side, '⭐ POTM', '#facc15', 'Rating ' + potm.r.toFixed(1)) : ''}${W.pvCard(capt, live, s, '©️ CAPTAIN', '#22d3ee', 'Rating ' + (R[capt] || 6).toFixed(1), 0.08)}${W.pvCard(star, live, s, '⭐ STAR', '#a855f7', 'Rating ' + (R[star] || 6).toFixed(1), 0.16)}${W.pvCard(watch, live, s, '🎲 RANDOM', '#ff2d95', 'Rating ' + (R[watch] || 6).toFixed(1), 0.24)}</div></div>
    <div class="card"><p style="font-weight:900">📊 Match stats</p>${statRows(m)}</div>
    <div class="card"><p style="font-weight:900">⭐ Ratings · ${esc(D.n[s])}</p>${rows}${hl ? `<button class="btn2" style="margin-top:8px" onclick="W11.reel()">🎬 Highlights · ${hl} big moment${hl > 1 ? 's' : ''} in slow-mo</button>` : ''}</div><div id="w13tbl"></div>`);
  W._reelX = { live, home: live.home, away: live.away, seed: live.seed, cmds: m.cmds.slice() }; W.pvFill(el.parentNode);
};
W.finish = (function (b) { return async function (live, m) { const r = await b.apply(this, arguments); try { W.ftExtras(live, m, 0); } catch (e) { console.warn('G13 ft', e); } return r; }; })(W.finish);
W.finishL = (function (b) { return async function (live) { const my = W.my, m = W.m; const r = await b.apply(this, arguments); try { W.ftExtras(live, m, my); await W.tableAfter(live, m); } catch (e) { console.warn('G13 ftL', e); } return r; }; })(W.finishL);
/* 📊 league table update: where you were before this match and where you are now (the result counts once it is confirmed) */
W.tableAfter = async function (live, m) {
  const box = document.getElementById('w13tbl'), M = live.M; if (!box || !M || M.cup) return; const G = W.G || await W.loadG(); if (!G) return;
  const parts = String(live.mid).split('-'), md = +parts[3], hp = +parts[4], key = md + '_' + hp, now = W.nowS(), sc = m.T[0].score + '-' + m.T[1].score;
  const G0 = JSON.parse(JSON.stringify(G)), G1 = JSON.parse(JSON.stringify(G)); if (G0.res) delete G0.res[key]; G1.res = Object.assign({}, G1.res || {}, { [key]: sc });
  let A, B; try { A = CC.table(G0, now); B = CC.table(G1, now); } catch (e) { return; } const before = {}; A.forEach((r, i) => { before[r.pos] = i; });
  const rows = B.map((r, i) => { const n = seatName(G, r.pos, clamp(md, 1, CC.MDS)), mv = before[r.pos] - i; return `<div style="display:flex;align-items:center;gap:6px;font-size:12px;padding:2px 6px;border-radius:8px;${n.me ? 'background:rgba(34,211,238,.12);font-weight:900' : ''}"><span style="width:18px;color:#94a3b8">${i + 1}</span><span style="width:16px;color:${mv > 0 ? '#a3e635' : mv < 0 ? '#ff2d95' : '#64748b'}">${mv > 0 ? '▲' : mv < 0 ? '▼' : '•'}</span><span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(n.n)}</span><span style="width:28px;text-align:right">${r.p}</span><span style="width:34px;text-align:right;color:#94a3b8">${r.gf - r.ga > 0 ? '+' : ''}${r.gf - r.ga}</span><span style="width:30px;text-align:right;font-weight:900">${r.pts}</span></div>`; }).join('');
  box.innerHTML = `<div class="card"><p style="font-weight:900">📊 League table update · Division ${G.t}</p><div style="display:flex;gap:6px;font-size:10px;color:#94a3b8;font-weight:900;padding:2px 6px"><span style="width:18px">#</span><span style="width:16px"></span><span style="flex:1">Club</span><span style="width:28px;text-align:right">P</span><span style="width:34px;text-align:right">GD</span><span style="width:30px;text-align:right">Pts</span></div>${rows}<p style="font-size:10px;color:#94a3b8;margin-top:6px">Counts officially once a second phone confirms the result.</p></div>`;
};
/* 🎬 full-time highlights reel: every goal, save and near miss again, back to back in slow-mo */
W.reel = async function () {
  const X = W._reelX; if (!X || W._rp) return; const old = W._rec; W._rec = Infinity; let m; try { m = W.simulate(X.home, X.away, X.seed, X.cmds); } finally { W._rec = old; }
  const L = (m.bc ? m.bc.L : []).filter(q => q.k === 'goal' || q.k === 'save' || q.k === 'miss'); if (!L.length) return toast('No big moments in this match');
  W._rp = 1; css13(); const o = document.createElement('div'); o.id = 'w13bc'; o.style.zIndex = 40; o.innerHTML = '<div class="bx" id="w13bx"></div><div class="dip"></div><div class="tag" id="w13tag"></div><div class="cap" id="w13cap"></div><button class="btn2" style="position:absolute;right:10px;top:max(10px,env(safe-area-inset-top));z-index:5;width:auto;padding:6px 12px" onclick="W11.reelStop()">✕ Close</button>';
  (document.getElementById('w11') || document.body).appendChild(o); W._bc = 1; const D = W.dress(X.live);
  for (let i = 0; i < L.length && W._rp; i++) { const q = L[i], ev = m.ev[q.ev], p = ev.pid ? W.player(ev.pid, m.S) : null, F = m.rec.filter(f => f.k >= ev.tick - 120 && f.k <= q.tick);
    o.querySelector('#w13tag').innerHTML = `<b>🎬 HIGHLIGHTS ${i + 1}/${L.length}</b><i>${ev.min}'</i>`;
    o.querySelector('#w13cap').innerHTML = `<div><p style="font-weight:900">${q.k === 'goal' ? '⚽ GOAL' : q.k === 'save' ? '🧤 SAVE' : '😱 CHANCE'} · ${p ? p.flag + ' ' + esc(p.name) : ''} · ${esc(D.sh[ev.side])}</p></div>`;
    const box = o.querySelector('#w13bx'); box.innerHTML = ''; const dur = q.k === 'goal' ? 7 : 5;
    const v = W.rpView(F, ev, X.live, dur, o); if (!G3.run(box, v)) W.rp2d(box, F, X.live, dur); await new Promise(r => { W._reelT = setTimeout(r, dur * 1000 + 300); }); if (G3.view === v) G3.stop(v); }
  W.reelStop();
};
W.reelStop = function () { clearTimeout(W._reelT); W._rp = 0; W._bc = 0; const o = document.getElementById('w13bc'); if (G3.view && !G3.view.live) G3.stop(G3.view); if (o) o.remove(); };
W.leaveMatch = (function (b) { return function () { if (W._bc) W.bcEnd(); W._bcKey = ''; return b.apply(this, arguments); }; })(W.leaveMatch);
W.stopLoop = (function (b) { return function () { b.apply(this, arguments); if (document.getElementById('w13bc') && !W._rp) W.bcEnd(); W._bcKey = ''; }; })(W.stopLoop);

// ---------- 📍 free positions (engine 6): put each outfield player on any of the 35 spots ----------
W.fpEdit = function (live) {
  css13(); const inMatch = !!live && !!W.m, me = W.me || {}, t = inMatch ? W.m.T[W.my > 0 ? 1 : 0] : null, ids = inMatch ? t.ids.slice(0, 11) : (me.ids || []).slice(0, 11), S = inMatch ? W.m.S : W.S;
  const form = inMatch ? t.form : me.form, fp0 = inMatch ? t.fp : me.fp, sh = W.shape(form, fp0), nearest = (x, y) => { let b = 0, bd = 1e9; for (let k = 0; k < CC.FP_N; k++) { const q = CC.fpSpot(k), d = (q.x - x) ** 2 + (q.y - y) ** 2; if (d < bd) { bd = d; b = k; } } return b; };
  let fp = fp0 && CC.fpOk(fp0) ? fp0.slice() : (() => { const used = new Set(), out = []; for (let i = 1; i < 11; i++) { let k = nearest(sh[i].x, sh[i].y); if (used.has(k)) { let b = -1, bd = 1e9; for (let j = 0; j < CC.FP_N; j++) { if (used.has(j)) continue; const q = CC.fpSpot(j), d = (q.x - sh[i].x) ** 2 + (q.y - sh[i].y) ** 2; if (d < bd) { bd = d; b = j; } } k = b; } used.add(k); out.push(k); } return out; })();
  let sel = -1; const host = document.getElementById('w11'); let ov = document.getElementById('w13fpo'); if (ov) ov.remove(); ov = document.createElement('div'); ov.id = 'w13fpo';
  ov.style.cssText = 'position:absolute;inset:0;z-index:45;background:rgba(7,11,24,.92);display:flex;align-items:center;justify-content:center;padding:10px';
  const draw = () => { const ok = CC.fpOk(fp), cells = []; for (let ln = 4; ln >= 0; ln--) for (let la = 0; la < 7; la++) { const k = ln * 7 + la, slot = fp.indexOf(k), q = CC.fpSpot(k), p = slot >= 0 ? W.player(ids[slot + 1], S) : null;
      cells.push(`<button class="${slot >= 0 ? 'on' : ''} ${slot >= 0 && slot === sel ? 'sel' : ''}" onclick="W11.fpTap(${k})" title="${q.dp}">${p ? `${p.num} ${esc(p.short).slice(0, 7)}` : `<span style="opacity:.45">${q.dp}</span>`}</button>`); }
    const per = [0, 0, 0, 0, 0]; fp.forEach(k => per[Math.floor(k / 7)]++);
    ov.innerHTML = `<div style="width:min(96vw,620px);max-height:96vh;display:flex;gap:10px;align-items:stretch"><div style="flex:1"><div class="w13fp">${cells.join('')}</div><p style="text-align:center;font-size:10px;color:#94a3b8;margin-top:4px">🥅 your goal is below · keeper stays in goal</p></div>
      <div style="width:150px;display:flex;flex-direction:column;gap:6px;justify-content:center"><p style="font-weight:900">📍 Free positions</p><p style="font-size:11px;color:#cbd5e1">${sel >= 0 ? 'Now tap an empty spot.' : 'Tap a player, then an empty spot.'}</p><p style="font-size:11px;color:${ok ? '#a3e635' : '#ff2d95'}">${ok ? '✅ ' + CC.fpForm(fp) : '⚠️ Needs 3–5 defenders and someone up front'}</p>
      <button class="btn" ${ok ? '' : 'disabled'} onclick="W11.fpSave()">💾 ${inMatch ? 'Send to the pitch' : 'Save'}</button><button class="btn2" onclick="W11.fpReset()">↩️ Use ${esc(form)}</button><button class="btn2" onclick="document.getElementById('w13fpo').remove()">Cancel</button></div></div>`; };
  W.fpTap = (k) => { const slot = fp.indexOf(k); if (slot >= 0) { sel = sel === slot ? -1 : slot; } else if (sel >= 0) { fp[sel] = k; sel = -1; } draw(); };
  W.fpSave = async () => { if (!CC.fpOk(fp)) return; ov.remove(); if (inMatch) { W.command({ fp: fp.slice() }); toast('📍 New spots: on the pitch in a moment'); } else { await W.save({ fp: fp.slice() }); toast('📍 Positions saved'); W.squad(); } };
  W.fpReset = async () => { ov.remove(); if (inMatch) W.command({ form }); else { await W.save({ fp: null }); W.squad(); } };
  (host || document.body).appendChild(ov); draw();
};
W.g8body = (function (b) { return function (k) { const h = b.apply(this, arguments); if (k !== 'form' || !h) return h; return h + `<button class="btn2" style="margin-top:8px" onclick="W11.fpEdit(W11.live)">📍 Free positions</button>`; }; })(W.g8body);
W.squad = (function (b) { return function () { const r = b.apply(this, arguments); Promise.resolve(r).then(() => { const fm = document.querySelector('[data-k="fm"]'); if (fm && !fm.querySelector('[data-fp]')) fm.insertAdjacentHTML('beforeend', `<button class="gc" data-fp style="padding:6px;font-weight:900;font-size:clamp(11px,3.4vh,14px)" onclick="W11.fpEdit()">📍 Free positions${W.me && CC.fpOk(W.me.fp) ? ' · ' + CC.fpForm(W.me.fp) : ''}</button>`); }); return r; }; })(W.squad);
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">📺 <b>Broadcast matches</b>: 4 minutes of play, plus slow-mo replays of every goal, big save and near miss, card and substitution scenes, so a match lasts about 4½–5½ minutes. Both managers see the very same pauses. Walk-out from the tunnel with line-ups, handshakes and the coin toss; walk-off with ratings, stats and the table.</p>
    <p style="margin-top:6px">🧬 <b>One style</b> per player now drives his play (engine 6). 📍 <b>Free positions</b>: put each outfield player on any of 35 spots (Squad → Free positions, or during a match in Formation).</p>`); }; })(W.helpL);

// =====================================================================
// ⚽ G14 · gameplay look (owner: "compared with Top Eleven we're far behind, focus on the game play"):
// close ball-follow camera (default) + Medium, name tags over the ball carrier and his marker,
// players face the ball / defenders jockey the carrier (with the 3D backpedal + side-step), no dancing,
// ceremony starts with the match screen hidden, walk-out queue at the tunnel mouth, wider card shot.
// build.sh pastes this file into w11.js at the G14 marker. Nothing here changes a result.
// =====================================================================
const G14CSS = `
.w14tag{position:absolute;left:0;top:0;transform:translate(-50%,-100%);pointer-events:none;z-index:4;text-align:center;white-space:nowrap;transition:opacity .2s}
.w14tag b{display:block;font-size:11px;font-weight:900;letter-spacing:.03em;color:#fff;text-shadow:0 1px 3px #000,0 0 6px rgba(0,0,0,.8)}
.w14tag i{display:block;width:0;height:0;margin:2px auto 0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #fff;filter:drop-shadow(0 1px 2px #000)}
.w14tag.ball b{font-size:12px}
`;
const css14 = () => { if (!document.getElementById('w14css')) { const s = document.createElement('style'); s.id = 'w14css'; s.textContent = G14CSS; document.head.appendChild(s); } };

// ---------- 🎥 cameras: Close (follows the ball like Top Eleven) is the new default; Medium; the old TV wide stays ----------
W.CAMS = [['bc', '📡', 'Broadcast'], ['close', '🎥', 'Close'], ['med', '🎬', 'Medium'], ['tv', '📺', 'Wide'], ['side', '🏃', 'Sideline'], ['bal', '⚖️', 'Balanced'], ['radar', '🗺️', '2D Radar']];
/* G17: everyone starts on the new FC Mobile-style broadcast camera once (new key), then their own choice is remembered */
W.camPref = () => { try { const c = localStorage.getItem('w11_cam2'); return W.CAMS.some(x => x[0] === c && c !== 'radar') ? c : 'bc'; } catch (e) { return 'bc'; } };
W.cam = W.camPref();
W.camSet = (function (b) { return function (mode) { b.apply(this, arguments); try { if (W.CAMS.some(c => c[0] === mode)) localStorage.setItem('w11_cam2', mode); } catch (e) {} }; })(W.camSet);
const camFollow = (mode, F) => { const X = clamp(F.x, -44, 44), Z = clamp(F.z, -30, 30);
  /* G17 broadcast (FC Mobile style): side-on from the main stand, medium-low (~24° down), ~26 m from the action, tight lens →
     players about twice as big as 'close'. Pans along the pitch with the ball, follows the width only partly (keeps the
     camera out of the stand), leads a few metres towards where the attack is going, opens up a little for high balls. */
  if (mode === 'bc') { const Zt = clamp(Z * 0.7, -24, 18), D = 26 + F.w * 4, el = 0.42, h = D * Math.sin(el), back = D * Math.cos(el);
    return { eye: [X - F.dx * 0.4, h, Zt + back], at: [X + F.dx * 0.3, 0.7, Zt + F.dz * 0.6], fov: 32 + F.w * 4 }; }
  /* G15: framed like eFootball / FC Mobile — higher and further back so you see the team shape and the passing options (10-14 players) */
  return mode === 'close' ? { eye: [X - F.dx * 3.5, 21, Z * 0.5 + 31], at: [X + F.dx * 2.2, 0, Z * 0.8 + F.dz * 1.2], fov: 38 }
    : { eye: [X * 0.96 - F.dx * 2, 27, Z * 0.45 + 42], at: [X + F.dx * 1.5, 0, Z * 0.8], fov: 40 }; };
W.v3live = (function (b) { return function (box) {
  const v = b(box), s0 = v.step, d0 = v.draw; let F = null, c3 = null, lastM = '';
  v.step = function (dt, now) { const cam = s0.call(this, dt, now); if (!cam) return cam; const mode = W.cam; if (mode !== 'close' && mode !== 'med' && mode !== 'bc') { F = null; c3 = null; lastM = mode; return cam; }
    const m = W.m, bx = PX(v.bx), bz = PZ(v.by), own = m && m.ball && m.ball.owner, dir = own ? (own.side === 0 ? 1 : -1) : 0;
    /* the focus trails the ball softly and leans a few metres towards where the attack is going */
    if (!F) F = { x: bx, z: bz, dx: 0, dz: 0, w: 0 }; const bc = mode === 'bc', k = 1 - Math.exp(-dt * (bc ? 2.2 : 2.6)), kz = 1 - Math.exp(-dt * (bc ? 1.5 : 2.6)), kd = 1 - Math.exp(-dt * 0.9);
    const fl = m && m.ball && m.ball.fl, wide = fl && (fl.arc > 1.5 || fl.aer) ? 1 : 0; F.w += (wide - F.w) * (1 - Math.exp(-dt * 1.2)); /* opens up for crosses / long balls */
    F.dx += ((dir * (bc ? 5.5 : 4)) - F.dx) * kd; F.x += (bx + F.dx - F.x) * k; F.z += (bz - F.z) * kz; F.dz += (0 - F.dz) * kd;
    const tg = camFollow(mode, F), kk = c3 && lastM === mode ? 1 - Math.exp(-dt * 5) : 1; lastM = mode;
    c3 = { eye: sm(c3 && kk < 1 ? c3.eye : null, tg.eye, kk), at: sm(c3 && kk < 1 ? c3.at : null, tg.at, kk), fov: tg.fov }; return c3; };
  v.draw = function () { d0.apply(this, arguments); try { W.tags14(box); } catch (e) {} };
  return v; }; })(W.v3live);

// ---------- 🏷️ name tags: "number | NAME" + arrow over the ball carrier and the nearest opponent ----------
W.tags14 = function (box) {
  const m = W.m, B = G3.B3; if (!m || !B || !B.project || G3.be !== 'b3' || W._bc || W._cer || (W.cine && W.cine.cur)) return W.tagsOff();
  css14(); const b = m.ball; let a = b.owner;
  if (!a) { let bd = 4; for (const p of m.P) { const d = Math.hypot(p.x - b.x, p.y - b.y); if (d < bd) { bd = d; a = p; } } }
  if (!a) return W.tagsOff(); let mk = null, md = 9; for (const p of m.P) if (p.side !== a.side) { const d = Math.hypot(p.x - a.x, p.y - a.y); if (d < md) { md = d; mk = p; } }
  const D = W.live ? W.dress(W.live) : null, list = [[a, 'ball'], [mk, 'mk']]; let prevQ = null;
  list.forEach(([p, k], i) => { let el = box.querySelector('.w14tag.t' + i); if (!p) { if (el) el.style.opacity = 0; return; }
    if (!el) { el = document.createElement('div'); el.className = 'w14tag t' + i; el.innerHTML = '<b></b><i></i>'; box.appendChild(el); }
    const pl = W.player(p.id, m.S), nm = pl ? pl.short || pl.name : '', txt = `${p.num} | ${String(nm).toUpperCase()}`; if (el._t !== txt) { el._t = txt; el.firstChild.textContent = txt; }
    el.className = 'w14tag t' + i + ' ' + k; const col = D ? D.k[p.side].c1 : '#fff'; el.lastChild.style.borderTopColor = col;
    const q = B.project(PX(p.x), 2.25, PZ(p.y)); if (!q) { el.style.opacity = 0; return; } el.style.opacity = 1;
    /* keep the tag on screen and clear of the side buttons (it was cut off at the edge) */
    const bw = box.clientWidth || 800, bh = box.clientHeight || 400, hw = (el.offsetWidth || 70) / 2 + 4, qx = clamp(q.x, 72 + hw, bw - 72 - hw); let qy = clamp(q.y, 64, bh - 8);
    /* G15: two tags never sit on top of each other (the marker's tag steps up a line) */
    if (prevQ && Math.abs(qx - prevQ.x) < (el.offsetWidth || 70) && Math.abs(qy - prevQ.y) < 22) qy = prevQ.y - 22; prevQ = { x: qx, y: qy };
    el.style.transform = `translate(${qx}px,${qy}px) translate(-50%,-100%)`; });
};
W.tagsOff = function () { document.querySelectorAll('.w14tag').forEach(e => { e.style.opacity = 0; }); };

// ---------- 🛡️ players watch the ball, the nearest defender jockeys the ball carrier ----------
const DRIB14 = {};
W.liveOpts = (function (b) { return function (m) { const f0 = b.apply(this, arguments), bl = m.ball, own = bl.owner, DTs = W.TIMING.DT || 0.05;
  let jk = null; if (own) { let bd = 6; for (const p of m.P) if (p.side !== own.side && p.role !== 'GK') { const d = Math.hypot(p.x - own.x, p.y - own.y); if (d < bd) { bd = d; jk = p; } } }
  /* the fouled player goes down (Mixamo Falling Down) and gets back up (Stand Up) */
  let lastGoal = null; for (let i = m.ev.length - 1; i >= 0 && i > m.ev.length - 30; i--) if (m.ev[i].k === 'goal') { lastGoal = (m.tick - (m.ev[i].tick || m.tick)) * DTs; break; }
  const down = {}, stum = {}, gest = {}, spin = {}; for (let i = m.ev.length - 1; i >= 0 && i > m.ev.length - 14; i--) { const e = m.ev[i]; if (e.tick == null || m.tick - e.tick > 60) break; if (e.k === 'foul' && e.on && down[e.on] == null) down[e.on] = (m.tick - e.tick) * DTs;
    if ((e.k === 'skill' || (e.k === 'tackle' && e.sl)) && e.on && stum[e.on] == null && m.tick - e.tick < 24) stum[e.on] = (m.tick - e.tick) * DTs;
    /* G14: reactions (Mixamo gestures): the fouler protests, a shooter who misses shakes his head, a flagged attacker points at the linesman */
    const ge = e.k === 'foul' ? (hash(e.pid) % 2 ? 'MX_Dismiss' : 'MX_ShakeNo') : e.k === 'miss' ? (hash(e.pid + e.tick) % 2 ? 'MX_Annoyed' : 'MX_AngryG') : e.k === 'off' ? 'MX_AngryPoint' : null;
    if (ge && e.pid && gest[e.pid] == null && m.tick - e.tick < 56) gest[e.pid] = { name: ge, t: 0.1 + (m.tick - e.tick) * DTs };
    if (e.k === 'skill' && e.pid && spin[e.pid] == null && m.tick - e.tick < 25) spin[e.pid] = (m.tick - e.tick) * DTs; }
  return (p) => { const dn = down[p.id]; if (dn != null) { return dn < 1.5 ? { mhClip: { name: 'MX_Fall', t: 0.15 + dn }, run: 0 } : { mhClip: { name: 'MX_GetUp', t: Math.min((dn - 1.5) * 1.75, 2.65) }, run: 0 }; }
    if (stum[p.id] != null && p !== own) return { mhClip: { name: 'MX_Stumble', t: 0.1 + stum[p.id] * 1.2 } };
    /* G15 first touch: the receiver controls the ball (Mixamo receive) as it arrives, unless he is running onto it */
    { const f = bl.fl, still = Math.hypot(p.vx || 0, p.vy || 0) < 3;
      if (still && f && f.kind === 'pass' && f.to && f.to.id === p.id && f.from && f.to.side === f.from.side) { const left = (1 - Math.min(1, f.k)) * f.dur; if (left < 0.35) return { mhClip: { name: 'MX_Receive', t: 0.45 - left }, run: 0, face: Math.atan2(f.x0 - p.x, f.y0 - p.y) }; }
      if (still && own === p && p.rcv > 0) return { mhClip: { name: 'MX_Receive', t: 0.45 + (0.28 - p.rcv) }, run: 0 };
      /* skill: the dribbler spins past his man (Mixamo spin move) */
      if (own === p && spin[p.id] != null) return { mhClip: { name: 'MX_Spin', t: 0.05 + spin[p.id] } };
      /* dribbling: the real dribble move, scrubbed by the distance he covers, so his feet play the ball */
      if (own === p && !p.wind && !(p.rcv > 0)) { const sp = Math.hypot(p.vx || 0, p.vy || 0), dp = DRIB14[p.id] || (DRIB14[p.id] = { t: 0, x: p.x, y: p.y }), st = Math.hypot(p.x - dp.x, p.y - dp.y); dp.x = p.x; dp.y = p.y; if (st < 2) dp.t += st / 2.84;
        if (sp > 1.4 && sp < 5.6) return { mhClip: { name: 'MX_Dribble', t: dp.t, loop: true } }; } }
    if (gest[p.id] && p !== own) { const sp0 = Math.hypot(p.x - (p.px == null ? p.x : p.px), p.y - (p.py == null ? p.y : p.py)) / DTs; if (sp0 < 1.4 || m.pauseT > 0) return { mhClip: gest[p.id], run: 0 }; }
    const o = f0(p); if (o && o.lean >= 0.3 && o.run === 0 && lastGoal != null) return Object.assign(o, { mhClip: hash(p.id) % 3 === 1 ? { name: 'MX_Defeated', t: Math.min(6.6, 0.3 + lastGoal * 0.9) } : { name: 'MX_Sad', t: Math.min(4.1, 0.3 + lastGoal + (hash(p.id) % 5) * 0.2) } });
    if (o) return o; if (p === own || m.pauseT > 0) return o;
    const sp = Math.hypot(p.x - (p.px == null ? p.x : p.px), p.y - (p.py == null ? p.y : p.py)) / DTs;
    if (jk && p === jk) return { face: Math.atan2(own.x - p.x, own.y - p.y) };
    if (sp < 3.2) return { face: Math.atan2(bl.x - p.x, bl.y - p.y) };
    return o; }; }; })(W.liveOpts);

// ---------- 🔧 fixes from the owner's video ----------
/* the walk-out starts the moment the match opens (no match screen with standing players first) */
W.g4tick = (function (b) { return function (m) { const live = W.live, e = ((live && live.kind === 'league' && W.nowS ? W.nowS() : Date.now()) - (live ? live.startAt : 0)) / 1000;
  if (live && e < -0.3 && e > -W.cerDur(live).open - 4 && !W._cer && !W._rp) W.ceremony('open', live); return b.apply(this, arguments); }; })(W.g4tick);
/* the lower-third that was sliding in when a broadcast scene starts goes away (it was cut off at the screen edge in replays) */
W.bcStart = (function (b) { return function () { const lt = document.getElementById('w11lt'); if (lt) lt.innerHTML = ''; return b.apply(this, arguments); }; })(W.bcStart);

// ---------- the side buttons step back (fade + shrink) while the ball is in play; any touch brings them back ----------
const G14CSS2 = `
#g8ui .g8rail button{transition:opacity .35s,transform .35s}
#g8ui.w14idle .g8rail button:not(.on){opacity:.34;transform:scale(.84)}
`;
W.idle14 = (function () { let last = Date.now(), hooked = false;
  return function () { const ui = document.getElementById('g8ui'); if (!ui) return;
    if (!document.getElementById('w14css2')) { const s2 = document.createElement('style'); s2.id = 'w14css2'; s2.textContent = G14CSS2; document.head.appendChild(s2); }
    if (!hooked) { hooked = true; const wake = () => { last = Date.now(); const u = document.getElementById('g8ui'); if (u) u.classList.remove('w14idle'); };
      document.addEventListener('pointerdown', wake, true); document.addEventListener('keydown', wake, true); }
    const shout = !!document.querySelector('.g8rail button.pulse, #w11sh.hot'), busy = !!W.g8open || shout || W._bc || W._cer;
    ui.classList.toggle('w14idle', !busy && Date.now() - last > 3500); }; })();
W.v3live = (function (b) { return function (box) { const v = b(box), d0 = v.draw;
  v.draw = function () { d0.apply(this, arguments); try { W.idle14(); } catch (e) {} }; return v; }; })(W.v3live);


// ---------- ⚽ goal types + celebrations (owner's goal videos: tap-ins, headers, volleys, scissor kicks, chips, screamers, curlers, solo goals) ----------
const HOW14 = { tap: '👟 TAP-IN', chip: '🪶 WHAT A CHIP!', volley: '💥 VOLLEY!', scissor: '🚲 SCISSOR KICK!', long: '🚀 FROM DISTANCE!', screamer: '🚀 SCREAMER!', curl: '🌀 CURLER!', curler: '🌀 CURLER!',
  solo: '🏃 SOLO GOAL!', dribbler: '🏃 SOLO GOAL!', header: '🗣️ HEADER!', fk: '🎯 FREE KICK!', pen: '⚽ PENALTY', poacher: "🦊 POACHER'S FINISH" };
W.goalHow = (ev) => { const h = ev && HOW14[ev.how]; return h ? `<p style="font-size:13px;font-weight:900;letter-spacing:.08em;color:#facc15;margin:2px 0 4px;text-shadow:0 1px 4px #000">${h}</p>` : ''; };
/* the scorer picks a celebration (different each goal): knee slide, jump, backflip, rallying the crowd, fist pump, cheering;
   team-mates jump, pump fists, cheer. One-shot moves are timed from the first frame each player celebrates. */
const celT14 = {};
W.celOf = (function (b) { return function (id, star, t) { const o = b.apply(this, arguments), m = W.m, now = performance.now();
  let c = celT14[id]; if (!c || now - c.last > 1200) c = celT14[id] = { t0: now, last: now }; c.last = now; const tc = (now - c.t0) / 1000;
  if (!G3.B3 || G3.be !== 'b3') return o; const g = m ? m.T[0].score + m.T[1].score : 0, h = hash(id + ':' + g);
  if (star) { const k = h % 6; if (k < 2) return o; /* knee slide / jump (the old moves) */
    const name = ['MX_Backflip', 'MX_Rally', 'MX_Victory', 'MX_Cheer'][k - 2]; return { mhClip: name === 'MX_Cheer' ? { name, t: tc, loop: true } : { name, t: tc + 0.1 }, run: 0 }; }
  const k = h % 8; if (k === 1) return { mhClip: { name: 'MX_Cheer', t: tc + (h % 5) * 0.3, loop: true }, run: 0 }; if (k === 4) return { mhClip: { name: 'MX_Happy', t: Math.min(2.9, tc * 0.8) }, run: 0 };
  return o; }; })(W.celOf);

// ---------- 🎆 trophy lift only (cup finals + league titles): owner's Lottie fireworks + confetti over the 3D scene ----------
/* the Lottie player (w11lottie.js, MIT) and the two animations load only when a trophy is lifted; if any file is missing nothing shows */
const LOT14 = { js: null, data: {} }, lotBase = () => new URL('./', document.baseURI).href;
const lotLib = () => LOT14.js || (LOT14.js = new Promise((res, rej) => { if (window.lottie) return res(window.lottie); const s = document.createElement('script'); s.src = lotBase() + 'w11lottie.js?v=1';
  s.onload = () => window.lottie ? res(window.lottie) : rej(new Error('no lottie')); s.onerror = () => { LOT14.js = null; rej(new Error('lottie load')); }; document.head.appendChild(s); }));
const lotData = (n) => LOT14.data[n] || (LOT14.data[n] = fetch(lotBase() + 'w11-' + n + '.json?v=1').then(r => r.ok ? r.json() : Promise.reject(new Error(n))).catch(e => { delete LOT14.data[n]; throw e; }));
W.troFx = async function (box) {
  if (!box || box.querySelector('.w14lot')) return; let L, fw, cf; try { [L, fw, cf] = await Promise.all([lotLib(), lotData('fireworks'), lotData('confetti')]); } catch (e) { return; }
  if (!W._tro || !document.body.contains(box)) return;
  if (!document.getElementById('w14lotcss')) { const c = document.createElement('style'); c.id = 'w14lotcss'; c.textContent = '#w11 .w14lot canvas{box-shadow:none!important;border-radius:0!important;background:none!important}'; document.head.appendChild(c); }
  const layer = document.createElement('div'); layer.className = 'w14lot'; layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:3;overflow:hidden'; box.appendChild(layer);
  const anims = [], play = (data, css, loop, delay) => setTimeout(() => { if (!W._tro || !layer.isConnected) return; const d = document.createElement('div'); d.style.cssText = 'position:absolute;' + css; layer.appendChild(d);
    try { anims.push(L.loadAnimation({ container: d, renderer: 'canvas', loop, autoplay: true, animationData: JSON.parse(JSON.stringify(data)), rendererSettings: { preserveAspectRatio: 'xMidYMid slice', clearCanvas: true } })); } catch (e) {} }, delay);
  /* fireworks bursting over the stands (three spots, staggered, they keep going), confetti raining twice */
  play(fw, 'left:-4%;top:-6%;width:46%;aspect-ratio:1', true, 300); play(fw, 'right:-4%;top:-2%;width:42%;aspect-ratio:1', true, 1300); play(fw, 'left:30%;top:-12%;width:40%;aspect-ratio:1', true, 2400);
  play(cf, 'inset:0', false, 200); play(cf, 'inset:0', false, 5600);
  const iv = setInterval(() => { if (W._tro && layer.isConnected) return; clearInterval(iv); anims.forEach(a => { try { a.destroy(); } catch (e) {} }); layer.remove(); }, 400);
};
W.trophyLift = (function (b) { return function () { const r = b.apply(this, arguments); try { if (W._tro) W.troFx(document.getElementById('w11cerb')); } catch (e) {} return r; }; })(W.trophyLift);

/* ======================= 🧤 G16 · keeper distribution, keeper moves, running turns (engine 9) =======================
   The 3D side of engine 9: a keeper holding the ball carries it in his hands (arms pose + ball on the hands), then
   throws it (Mixamo overarm throws), drop-kicks it or places it on the grass, each clip timed so the ball leaves on the
   release frame. Close-range saves are body blocks (Mixamo Body Block 1-3), and the keeper organises his defence
   (Mixamo Directing) while the other team sets up a corner or a free kick near his box. */
/* running-turn pack w3d-mx-g16.glb (owner's Running Right Turn / Backward Right Turn, baked with yawFix): set true once uploaded */
W.MX16 = true;
const GK16 = { gko: ['MX_GK_Overhand', 1.48], gkt: ['MX_GK_Throw', 1.64], gkd: ['MX_GK_DropKick_R', 2.1], gkp: ['MX_GK_Place', 1.25] }, GK_SP = 1.25;
const BLK16 = [['MX_GK_Block', 1.1], ['MX_GK_Block2', 0.82], ['MX_GK_Block3', 1.1]];
W.liveOpts = (function (b) { return function (m) { const f0 = b.apply(this, arguments), bl = m.ball, own = bl.owner, f = bl.fl, sp = m.sp, DTs = (W.TIMING && W.TIMING.DT) || 0.05;
  const rec = {}; for (let i = m.ev.length - 1; i >= 0 && i > m.ev.length - 10; i--) { const e = m.ev[i]; if (e.tick == null || m.tick - e.tick > 50) break; if (e.k === 'save' && e.blk && e.pid != null && rec[e.pid] == null) rec[e.pid] = (m.tick - e.tick) * DTs; }
  const gxOf = (s) => s === 0 ? 105 : 0;
  return (p) => { if (p.role !== 'GK') return f0(p);
    const face = (x, y) => Math.atan2(x - p.x, y - p.y);
    /* in his hands: walking to the edge of the box, then the throw / drop kick / place, released on the clip's frame */
    if (own === p && p.hnd > 0) { if (p.wind && GK16[p.wind.k]) { const [nm, rel] = GK16[p.wind.k], left = Math.max(0, p.wind.T - p.wind.t), t = Math.max(0.05, rel - left * GK_SP), name = nm === 'MX_GK_DropKick_R' && W.footOf && W.footOf(p) === 'l' ? 'MX_GK_DropKick_L' : nm;
        return { mhClip: { name, t }, holdB: p.wind.k !== 'gkd' || t < rel - 0.2 ? 1 : 0, run: 0, face: face(p.wind.fx, p.wind.fy) }; }
      return { holdB: 1, catch: 0, run: 0.35, face: face(gxOf(p.side), 34) }; }
    /* the follow-through after the release */
    if (f && f.from === p && f.gd && GK16[f.gd]) { const [nm, rel] = GK16[f.gd], el = Math.min(1, f.k) * f.dur, t = rel + el * GK_SP; if (t < rel + 1.1) return { mhClip: { name: nm === 'MX_GK_DropKick_R' && W.footOf && W.footOf(p) === 'l' ? 'MX_GK_DropKick_L' : nm, t }, run: 0 }; }
    /* a close-range shot: the keeper spreads himself (body block) instead of diving */
    if (f && f.kind === 'shot' && f.gk === p && !f.pen && Math.hypot(f.x0 - gxOf(1 - p.side), f.y0 - 34) < 10) { const [nm, c] = BLK16[(p.num || 1) % 3], left = (1 - Math.min(1, f.k)) * f.dur; return { mhClip: { name: nm, t: Math.max(0.15, c - left) }, run: 0, face: face(f.x0, f.y0) }; }
    if (rec[p.id] != null) { const [nm, c] = BLK16[(p.num || 1) % 3]; return { mhClip: { name: nm, t: c + rec[p.id] }, run: 0 }; }
    /* directing the wall / the marking while the other team sets up a corner or a free kick near his goal */
    if (sp && sp.side !== p.side && (sp.kind === 'corner' || sp.kind === 'fkd' || (sp.kind === 'fk' || sp.kind === 'ifk') && Math.abs(gxOf(1 - p.side) - sp.x) < 35) && m.pauseT > 0.6) return { mhClip: { name: 'MX_GK_Direct', t: 1 + (m.t * 1.0) % 6, loop: 1 }, run: 0, face: face(sp.x, sp.y) };
    return f0(p); }; }; })(W.liveOpts);

})();
