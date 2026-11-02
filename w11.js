// =====================================================================
// ⚽ 11 WONDERS · Score Manager — G1 (loaded only when you open it)
// Your club · procedural world · 15 formations · 4-minute live match (2D radar, 60 fps, no pauses)
// · 30-second touchline shouts · subs · 5-match Boot Camp · friendlies + 15-minute lockdown · Pioneer 50
// Everything about players comes from their ID, so thousands of players cost no storage.
// =====================================================================
(function () {
'use strict';
const W = window.W11 = window.W11 || {};
/* =====================================================================
   ⚽ 11 WONDERS · shared core (G2). build.sh pastes this SAME block into w11.js and worker.js,
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
const player = function (id, S) {
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
const condNow = (club, id, day) => { const c = club && club.cond && club.cond[id] != null ? Number(club.cond[id]) : 100, cd = club && club.cd != null ? club.cd : day; return clamp(Math.round(c + Math.max(0, day - cd) * (REC + (Number(club && club.tr && club.tr.fit) || 0))), 0, 100); };
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
  const cond = {}; ids.forEach(id => { cond[id] = condNow(club, id, day); });
  return { ids, form: FORM_NAMES.includes(club.form) ? club.form : '4-4-2', cond, tr: { att: Number(club.tr && club.tr.att) || 0, def: Number(club.tr && club.tr.def) || 0, fit: Number(club.tr && club.tr.fit) || 0 }, bo, io, n: club.name || 'My Club', sh: club.short || 'MYC', kit: ((club.kits || [])[0] || {}).c1 || '', kits: (club.kits || []).map(k => k && k.c1).filter(Boolean) };
};
const aiSheet = (ci, key, S) => { const c = club(ci); return { ai: ci, ids: squadIds(ci), form: FORM_NAMES[hash(key + ':f') % 15], cond: {}, tr: {}, bo: [], io: [], n: c.name, sh: c.short, aiCond: AI_COND }; };
const ENGINE_TICKS = 4200;
/* parse "2-1|ids y/r;…|out>in@tick;…" */
const parseRes = (r) => { const [sc, cards, subs] = String(r || '').split('|'); const [h, a] = String(sc).split('-').map(Number); const C = String(cards || '').split(';'), U = String(subs || '').split(';');
  return { h, a, cards: [0, 1].map(i => (C[i] || '').split(',').filter(Boolean).map(x => [x.slice(0, -1), x.slice(-1)])), subs: [0, 1].map(i => (U[i] || '').split(',').filter(Boolean).map(x => { const m = x.match(/^(.+)>(.+)@(\d+)$/); return m ? [m[1], m[2], Number(m[3])] : null; }).filter(Boolean)) }; };
const RES_RE = /^\d{1,2}-\d{1,2}\|[\w~,;-]*\|[\w~,;>@-]*$/;

return { absDay, REC, DRAIN, AI_COND, TR_MAX, PACK_FIT, condNow, FORM_NAMES, sheetOf, aiSheet, ENGINE_TICKS, parseRes, RES_RE, WORLD, hash, rng, pick, clamp, CULT, POS_TEMPLATE, club, base, youth, player, squadIds, avg, DAY, EPOCH, SDAYS, MDS, SLOTS, AI_HOUR, MATCH_MS, clock, dayStart, ko, aiKo, TIER_START, groupsIn, gkey, initClubs, pairs, mid, quick, seatClub, isUserAt, strength, result, table, UP, DOWN, parentOf, childrenOf, nextClubs, winCoins, drawCoins, prize, PROMO_BONUS };
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
  try { await f.updateDoc(f.doc(db(), 'w11Clubs', window.uidNow()), patch); } catch (e) { console.warn('11W save', e); toast('⚠️ Not saved. Check your internet.'); }
};
W.create = async function (o) {
  const f = await fbLoad(), uid = window.uidNow(), ci = 100000 + (hash(uid + ':' + Date.now()) % 899000), ids = W.squadIds(ci);
  const base = { uid, tag: String(window.me ? window.me() : '').toLowerCase(), club: ci, name: o.name, short: o.short, crest: o.crest, kits: o.kits, form: '4-4-2', ids, ovr: W.avg(ids), stats: { p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0 }, boot: [], fr: 0, createdAt: Date.now() };
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
  const doc = await W.create({ name, short, crest: d.crest, kits: d.kits }); if (!doc) return W.createScreen();
  const P = doc.ids.map(id => W.player(id)), best = P.slice().sort((a, b) => b.ovr - a.ovr).slice(0, 3), young = P.filter(p => p.age <= 20).length;
  W.ui(`<div class="card" style="text-align:center">${W.crestSvg(doc.crest, doc.short, 72)}<p style="font-size:20px;font-weight:900;margin-top:8px">Welcome to ${esc(doc.name)}!</p>
    ${doc.pioneer ? `<p style="margin-top:8px;font-size:13px;font-weight:900;color:#facc15">🛡️ FOUNDER SHIELD · Pioneer #${doc.pioneerNo} of 50</p>` : ''}
    <p style="font-size:12px;color:#94a3b8;margin-top:8px">Your squad: 18 players · Team ${doc.ovr} OVR · ${young} youngsters</p>
    <div style="text-align:left;margin-top:8px;font-size:12px">${best.map(p => `<p>⭐ ${p.flag} <b>${esc(p.name)}</b> · ${p.pos} · ${p.age}y · <b>${p.ovr}</b></p>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;font-size:13px;font-weight:900"><div class="card" style="margin:0">🪙 ${fmt(doc.coins)}<br><span style="font-size:10px;color:#94a3b8">GG Coins</span></div><div class="card" style="margin:0">💎 ${doc.gems}<br><span style="font-size:10px;color:#94a3b8">Gems</span></div><div class="card" style="margin:0">⚡ ${doc.energy}<br><span style="font-size:10px;color:#94a3b8">Energy Packs</span></div><div class="card" style="margin:0">🩹 ${doc.med}<br><span style="font-size:10px;color:#94a3b8">Med-Packs</span></div></div>
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
  el.innerHTML = `<div class="hd"><button class="bk" onclick="${back || 'W11.close()'}">←</button><b>${esc(title || '11 WONDERS')}</b>${me ? `<div class="chips"><span>🪙 ${fmt(me.coins)}</span><span>💎 ${fmt(me.gems)}</span></div>` : ''}</div><div class="bd" id="w11b">${html}</div>`;
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
  const row = (p, i) => `<div class="row ${sel === i ? 'sel' : ''}" onclick="W11.swap(${i})"><span class="pos">${i < 11 ? W.shape(me.form)[i].role : 'SUB'}</span><span class="ovr" style="background:${ovrColor(p.ovr)}">${p.ovr}</span><span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.flag} <b>${esc(p.name)}</b> <span style="color:#94a3b8">· ${p.pos} · ${p.age}y</span></span>${st(p.id) || `<span style="font-size:10px;color:#94a3b8">#${p.num}</span>`}</div>`;
  W.ui(`<div class="card"><p style="font-weight:900">📐 Formation</p><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${Object.keys(W.FORMS).map(f => `<button onclick="W11.setForm('${f}')" style="padding:7px 10px;border-radius:10px;font-size:11px;font-weight:900;${f === me.form ? 'background:linear-gradient(90deg,#22d3ee,#a855f7);color:#0b0f24' : 'background:rgba(255,255,255,.06)'}">${f}</button>`).join('')}</div></div>
    <div class="card">${inLg ? `<p style="font-size:11px;color:#94a3b8;margin-bottom:6px">Bars = fitness. 🤕 injured (tap to use a 🩹 Med-Pack) · 🚫 banned · 🟨 yellows (5 = ban). Your team sheet locks 15 minutes before kick-off; injured or banned starters are swapped for the best bench player.</p>` : ''}<p style="font-weight:900">Starting XI <span style="font-size:10px;color:#94a3b8;font-weight:700">· tap a player, then another to swap</span></p>${P.slice(0, 11).map(row).join('')}<p style="font-weight:900;margin-top:10px">Bench</p>${P.slice(11).map((p, k) => row(p, k + 11)).join('')}</div>`, '👕 Squad', 'W11.home()');
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
  const live = { kind, seed: (Math.random() * 4294967295) >>> 0, startAt: Date.now() + 3000, home: W.teamInfo(me, 0, hc), away: W.teamInfo(o, 1, ac), cmds: [], boot: kind === 'boot' ? W.bootNext().i : null, opp: { uid: o.uid || null, tag: o.tag || null } };
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
  } else if (day >= 27) nx = `<div class="card"><p style="font-weight:900">🏁 Season ${cs} is over</p><p style="font-size:12px;color:#cbd5e1;margin-top:6px">Last results are checked today. Promotion, relegation and prize coins are worked out on day 28. Season ${cs + 1} starts ${localT(CC.dayStart(cs + 1, 1), true)}.</p></div>`;
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
    <p style="margin-top:8px">📅 <b>1 season = 28 days = 1 year.</b> Days 1–26: one match a day. Day 27: last results are checked. Day 28: promotion, relegation and prize coins.</p>
    <p style="margin-top:6px">🏔️ <b>6 divisions</b>, 14 clubs in each group. Top 2 go up, bottom 4 go down.</p>
    <p style="margin-top:6px">📋 <b>Team sheet</b> locks 15 minutes before kick-off. Injured or banned starters are swapped for the best player on the bench.</p>
    <p style="margin-top:6px">📢 <b>Live:</b> both managers can shout, change shape and make subs. Your orders reach the pitch 2 seconds later, so both phones see the same match. Not there? GG AI shouts for you.</p>
    <p style="margin-top:6px">✅ <b>Results</b> are worked out on phones. A result counts when 2 different phones get exactly the same score. When you open 11 Wonders, your phone may quietly check one or two other matches. Nobody checked within a day? The match gets a quick result.</p>
    <p style="margin-top:6px">💪 <b>Fitness:</b> a full match costs 24, each day back gives +15. ⚡ An Energy Pack gives +25 to the whole squad. Tired players play worse and get injured more.</p>
    <p style="margin-top:6px">🤕 <b>Injuries</b> last 1–3 matches. 🩹 One Med-Pack heals one player. 🟨 5 yellows or 🟥 a red = 1-match ban.</p>
    <p style="margin-top:6px">🏋️ <b>Training:</b> once a day, pick attack, defence or fitness. Max 15 of each per season. Resets every season.</p>
    <p style="margin-top:6px">🎂 <b>Ageing:</b> every season players get a year older. They improve until about 27 and drop after about 31. They retire at 34–37 and a 17-year-old takes their place.</p>
    <p style="margin-top:6px">🪙 <b>Coins</b> come only from the server: for every win and draw, a prize for your final place, and +${fmt(CC.PROMO_BONUS)} for promotion.</p></div>`, '❓ How it works', 'W11.home()');
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
  const onRaw = () => { cmds = W.cmdsFrom(live, raw); if (!m) return; const a = JSON.stringify(cmds.filter(c => c.tick < m.tick)); if (a !== applied) rebuild(); else { ci = cmds.findIndex(c => c.tick >= m.tick); if (ci < 0) ci = cmds.length; } };
  if (R) { try { const sn = await R.D.get(R.D.ref(R.d, 'w11live/' + live.mid)); raw = sn.val() || {}; } catch (e) {} }
  cmds = W.cmdsFrom(live, raw); rebuild();
  if (R) { const ref = R.D.ref(R.d, 'w11live/' + live.mid); const u1 = R.D.onChildAdded(ref, (s) => { raw[s.key] = s.val(); onRaw(); }), u2 = R.D.onChildChanged(ref, (s) => { raw[s.key] = s.val(); onRaw(); }); W._unsub = () => { try { u1(); u2(); } catch (e) {} }; }
  const M = live.M, ctl = my >= 0;
  W.ui(`<div style="position:relative"><div class="sb"><span style="font-weight:900;color:${m.T[0].color}">${esc(m.T[0].short)}</span><span class="sc" id="w11sc">0–0</span><span style="font-weight:900;color:${m.T[1].color}">${esc(m.T[1].short)}</span><span class="tm" id="w11tm">1'</span></div>
    <canvas id="w11c"></canvas>
    ${ctl ? `<div class="alert" id="w11al">📢 TOUCHLINE MOMENT · shout now!</div>
    <div class="shouts" id="w11sh">${[['attack', '📣 Attack'], ['tight', '🧱 Tight'], ['press', '⚡ Press'], ['calm', '🧘 Calm']].map(([k, l]) => `<button data-k="${k}" onclick="W11.shout('${k}')">${l}</button>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px"><button class="btn2" onclick="W11.subMenu()">🔁 Subs (<span id="w11subs">5</span>)</button><button class="btn2" onclick="W11.formMenu()">📐 Formation</button></div>` : '<p style="font-size:11px;color:#94a3b8;margin-top:8px;text-align:center">👀 Watching</p>'}
    <div class="tick" id="w11tk"></div><div class="tip">League · Division ${M.t} · Matchday ${M.md}. You are ${my === 0 ? 'the home side (left → right)' : my === 1 ? 'the away side (right → left)' : 'watching'}. Orders reach the pitch 2 seconds after you tap.</div><div id="w11ov"></div></div>`, '🏆 League', 'W11.leaveMatch()');
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
    if (m.over && e > TOTAL + 6) { W.stopLoop(); return W.finishL(live); }
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
  const res = my < 0 ? '' : mineGf > mineGa ? 'w' : mineGf < mineGa ? 'l' : 'd', coins = res === 'w' ? CC.winCoins(live.M.t) : res === 'd' ? CC.drawCoins(live.M.t) : 0;
  const status = j.final ? (j.final === r ? `✅ Result confirmed${coins ? ` · +${fmt(coins)} 🪙` : ''}` : `✅ Confirmed by other phones: ${esc(String(j.final).split('|')[0])}`) : j.ok ? '⏳ Waiting for a second phone to check the result. Coins arrive once it is confirmed.' : '⚠️ ' + esc(j.error || 'Could not send the result. It will be sent next time you open 11 Wonders.');
  W.G = null; await W.load();
  W.ui(`<div class="card" style="text-align:center">${res ? `<p style="font-size:12px;font-weight:900;color:${res === 'w' ? '#a3e635' : res === 'l' ? '#ff2d95' : '#facc15'}">${res === 'w' ? 'WIN' : res === 'l' ? 'DEFEAT' : 'DRAW'}</p>` : ''}
    <p style="font-size:34px;font-weight:900">${a.score}–${b.score}</p><p style="font-size:12px;color:#94a3b8">${esc(a.name)} vs ${esc(b.name)}</p>
    <div style="text-align:left;margin-top:10px;font-size:12px">${goals.map(g => `<p>${g.min}' ${esc(g.txt.replace(/ \d+–\d+$/, ''))}</p>`).join('') || '<p style="color:#94a3b8">No goals</p>'}</div>
    <p style="font-size:11px;color:#94a3b8;margin-top:8px">Possession ${Math.round(a.poss / pt * 100)}% · Shots ${a.shots}–${b.shots} · On target ${a.onT}–${b.onT}</p>
    <div class="tip" style="text-align:left">${status}</div>
    <button class="btn" style="margin-top:14px" onclick="W11.home()">Back to the league</button></div>`, 'Full time');
};
W.resultL = async function (mid, M) {
  const [sc] = String(M.r || '').split('|');
  let goals = ''; if (!M.q && M.s0 && M.s1) { const live = W.liveFrom(mid, M), m = W.simL(live, await W.cmdsOnce(live)); goals = m.ev.filter(e => e.k === 'goal').map(g => `<p>${g.min}' ${esc(g.txt.replace(/ \d+–\d+$/, ''))}</p>`).join(''); }
  W.ui(`<div class="card" style="text-align:center"><p style="font-size:11px;color:#94a3b8">Matchday ${M.md} · ${M.q ? '⚡ quick result (nobody checked it in time)' : '✅ confirmed'}</p><p style="font-size:34px;font-weight:900">${esc(sc)}</p><p style="font-size:12px;color:#94a3b8">${esc((M.s0 && M.s0.n) || '')} vs ${esc((M.s1 && M.s1.n) || '')}</p><div style="text-align:left;margin-top:10px;font-size:12px">${goals}</div><button class="btn" style="margin-top:14px" onclick="W11.home()">Back</button></div>`, 'Result');
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
})();
