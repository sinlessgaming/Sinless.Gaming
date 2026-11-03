// =====================================================================
// ⚽ G2 · 11 WONDERS LEAGUE (worker side). The worker never plays matches (too heavy for the free plan).
// It: puts clubs in groups, locks team sheets 15 min before kick-off, counts result "votes" from phones
// (2 different phones must agree), pays coins, updates fitness / cards / injuries, and runs the season change.
// =====================================================================
const C11 = W11C;
const W11_META = 'w11meta/season';
function w11v(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(w11v) } };
  return { mapValue: { fields: w11f(v) } };
}
function w11f(o) { const f = {}; for (const k in o) if (o[k] !== undefined) f[k] = w11v(o[k]); return f; }
const w11fp = (k) => /^[A-Za-z_][A-Za-z_0-9]*$/.test(k) ? k : '`' + String(k).replace(/`/g, '') + '`';
function w11name(env, path) { return `projects/${sa(env).project_id}/databases/(default)/documents/${path}`; }
async function w11get(env, path) {
  const r = await fetch(`${fsBase(env)}/${path}`, { headers: { Authorization: `Bearer ${await accessToken(env)}` } });
  if (!r.ok) return null; const j = await r.json(); return { data: decodeFields(j.fields || {}), ut: j.updateTime };
}
async function w11batchGet(env, paths) {
  const out = {}; if (!paths.length) return out;
  const r = await fetch(`${fsBase(env)}:batchGet`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ documents: paths.map(p => w11name(env, p)) }) });
  if (!r.ok) return out; const j = await r.json();
  for (const x of j || []) if (x.found) { const p = x.found.name.split('/documents/')[1]; out[p] = { data: decodeFields(x.found.fields || {}), ut: x.found.updateTime }; }
  return out;
}
async function w11query(env, coll, filters, limit) {
  const where = filters.length === 1 ? { fieldFilter: filters[0] } : { compositeFilter: { op: 'AND', filters: filters.map(f => ({ fieldFilter: f })) } };
  const r = await fetch(`${fsBase(env)}:runQuery`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ structuredQuery: { from: [{ collectionId: coll }], where, limit: limit || 50 } }) });
  if (!r.ok) return []; const j = await r.json();
  return (j || []).filter(x => x.document).map(x => ({ id: x.document.name.split('/').pop(), data: decodeFields(x.document.fields || {}), ut: x.document.updateTime }));
}
const w11eq = (field, v) => ({ field: { fieldPath: field }, op: 'EQUAL', value: w11v(v) });
/* writes: [{ path, data, mask?: [fields], pre?: { ut } | { exists }, inc?: {field: n}, push?: {field: [values]} }] */
async function w11commit(env, writes) {
  const body = { writes: writes.map(w => {
    const o = { update: { name: w11name(env, w.path), fields: w11f(w.data || {}) } };
    if (w.mask) o.updateMask = { fieldPaths: w.mask.map(m => m.split('.').map(w11fp).join('.')) };
    if (w.pre) o.currentDocument = w.pre.ut ? { updateTime: w.pre.ut } : { exists: !!w.pre.exists };
    const tr = [];
    for (const k in (w.inc || {})) tr.push({ fieldPath: k.split('.').map(w11fp).join('.'), increment: w11v(w.inc[k]) });
    for (const k in (w.push || {})) tr.push({ fieldPath: w11fp(k), appendMissingElements: { values: w.push[k].map(w11v) } });
    if (tr.length) o.updateTransforms = tr;
    return o;
  }) };
  const r = await fetch(`${fsBase(env)}:commit`, { method: 'POST', headers: { Authorization: `Bearer ${await accessToken(env)}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return r.ok;
}
async function w11meta(env, s) {
  const m = await w11get(env, W11_META), d = (m && m.data) || {};
  return { s: d.s || s, d6: d.d6 || 32, ph: d.ph || '', cur: d.cur || 0, plan: d.plan || '', ut: m && m.ut };
}
const w11groups = (d6) => { const L = []; for (let t = 1; t <= 6; t++) { const n = t === 6 ? d6 : C11.groupsIn(t); for (let g = 0; g < n; g++) L.push([t, g]); } return L; };
const w11pristine = (s, t, g) => ({ s, t, g, clubs: C11.initClubs(t, g), users: {}, res: {} });

// ---------- 🧭 join a Division 6 group (takes over a computer club mid-season) ----------
async function w11join(env, uid, sl) {
  const now = Date.now(), { s, day } = C11.clock(now);
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const club = cd.data;
  if (club.lg && club.lg.s === s) return { ok: true, already: true, lg: club.lg };
  if (!(sl >= 0 && sl <= 3)) sl = 2;
  if (!(sl >= 0 && sl <= 3)) sl = 2;
  let from = 0; for (let md = Math.max(1, day); md <= C11.MDS; md++) if (Math.min(C11.ko(s, md, sl), C11.ko(s, md, 2)) - 20 * 60000 > now) { from = md; break; }
  const meta = await w11meta(env, s);
  if (!from || meta.s !== s) {
    const w = meta.s !== s ? meta.s + 1 : s + 1;
    await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { wait: w, sl }, mask: ['wait', 'sl'] }]);
    return { ok: true, wait: w };
  }
  for (let attempt = 0; attempt < 2; attempt++) {
    const rows = await w11query(env, 'w11g', [w11eq('s', s), w11eq('t', 6)], 300), have = {};
    rows.forEach(r => { have[r.data.g] = r; });
    let best = null;
    for (let g = 0; g < meta.d6 + 1; g++) {
      const extra = g >= meta.d6, row = have[g], G = row ? row.data : w11pristine(s, 6, g), users = G.users || {};
      const free = []; for (let p = 0; p < 14; p++) if (!users[p]) free.push(p);
      if (!free.length) continue;
      const same = Object.values(users).filter(u => u.sl === sl).length, n = Object.keys(users).length;
      const score = (extra ? -1000 : 0) + same * 10 + (n ? 3 : 0) - g * 0.001;
      if (!best || score > best.score) best = { g, G, row, free, score, extra };
      if (extra) break;
    }
    if (!best) return { ok: false, error: 'league full' };
    const { g, G, row, free } = best, pos = free[C11.hash(uid + ':' + s) % free.length];
    const users = { ...(G.users || {}) }, o = C11.avg(club.ids || C11.squadIds(club.club), s);
    users[pos] = { u: uid, c: club.club, n: club.name || 'My Club', sh: club.short || 'MYC', o, sl, from, ai: G.clubs[pos] };
    const clubs = G.clubs.slice(); clubs[pos] = club.club;
    const writes = [{ path: `w11g/${C11.gkey(s, 6, g)}`, data: { s, t: 6, g, clubs, users, res: G.res || {}, at: now }, pre: row ? { ut: row.ut } : { exists: false } }];
    const Gn = { ...G, users, clubs };
    for (let md = from; md <= C11.MDS; md++) {
      const pr = C11.pairs(md).find(([h, a]) => h === pos || a === pos), [hp, ap] = pr, home = hp === pos, oth = home ? ap : hp, id = C11.mid(s, 6, g, md, hp);
      if (C11.isUserAt(Gn, oth, md)) writes.push(home ? { path: `w11m/${id}`, data: { hu: uid, h: club.club, ko: C11.ko(s, md, sl) }, mask: ['hu', 'h', 'ko'] } : { path: `w11m/${id}`, data: { au: uid, a: club.club }, mask: ['au', 'a'] });
      else writes.push({ path: `w11m/${id}`, data: { s, t: 6, g, md, hp, ap, h: C11.seatClub(Gn, hp, md), a: C11.seatClub(Gn, ap, md), hu: home ? uid : '', au: home ? '' : uid, ko: C11.ko(s, md, sl), st: 'sched', nv: 0, jobs: {} } });
    }
    if (best.extra) writes.push({ path: W11_META, data: { s, d6: g + 1 }, mask: ['s', 'd6'] });
    writes.push({ path: `w11Clubs/${uid}`, data: { lg: { s, t: 6, g, pos, sl }, sl, wait: 0, cond: {}, cd: C11.absDay(now), tr: {}, trd: 0, yc: {}, ban: {}, inj: {} }, mask: ['lg', 'sl', 'wait', 'cond', 'cd', 'tr', 'trd', 'yc', 'ban', 'inj'] });
    if (await w11commit(env, writes)) { await w11cupTake(env, s, G.clubs[pos], club, uid, sl, o).catch(() => {}); return { ok: true, lg: { s, t: 6, g, pos, sl }, from }; }
  }
  return { ok: false, error: 'busy, try again' };
}

// ---------- 🔒 lock team sheets 15 minutes before kick-off ----------
async function w11lock(env, budget) {
  const now = Date.now(), { s, day } = C11.clock(now), K = new Set(), cupOf = {};
  const inWin = (k) => k - 15 * 60000 <= now && k > now - 6 * 3600000;
  for (const d of [day - 1, day]) { if (d < 1 || d > C11.MDS) continue; for (let sl = 0; sl < 4; sl++) { const k = C11.ko(s, d, sl); if (inWin(k)) K.add(k); } }
  /* G4: cup kick-offs differ per match; the cup doc lists them (kt) and remembers which are locked (lk) */
  if (C11.isCupDay(s, day) || (day > 1 && C11.isCupDay(s, day - 1))) {
    const ks = ['oc', 'cl'].filter(k => C11.cupOn(s, k)), cd = await w11batchGet(env, ks.map(k => CUPP(s, k))); budget.n--;
    for (const k of ks) { const C = cd[CUPP(s, k)]; if (!C) continue; const kt = C.data.kt || {}, lk = C.data.lk || {};
      for (const r in kt) for (const t of kt[r] || []) if (inWin(t) && !lk[t]) { K.add(t); cupOf[t] = CUPP(s, k); } }
  }
  let done = 0;
  for (const k of K) {
    if (budget.n < 6) break;
    const rows = (await w11query(env, 'w11m', [w11eq('ko', k), w11eq('st', 'sched')], 100)).filter(r => r.data.st === 'sched'); budget.n--;
    if (cupOf[k] && rows.length < 100) { await w11commit(env, [{ path: cupOf[k], data: { lk: { [k]: 1 } }, mask: ['lk.' + k] }]); budget.n--; }
    if (!rows.length) continue;
    const need = new Set(); rows.forEach(r => { if (r.data.hu) need.add(r.data.hu); if (r.data.au) need.add(r.data.au); });
    const clubs = await w11batchGet(env, [...need].map(u => `w11Clubs/${u}`)); budget.n--;
    const today = C11.absDay(now), writes = [], alert = [];
    for (const r of rows) {
      const M = r.data, sd = (u, ci) => { const c = u && clubs[`w11Clubs/${u}`]; return c ? C11.sheetOf(c.data, today, M.s) : C11.aiSheet(ci, r.id, M.s); };
      writes.push({ path: `w11m/${r.id}`, data: { st: 'locked', s0: sd(M.hu, M.h), s1: sd(M.au, M.a), lockAt: now }, mask: ['st', 's0', 's1', 'lockAt'], pre: { ut: r.ut } });
      if (M.hu) alert.push(M.hu); if (M.au) alert.push(M.au);
    }
    for (let i = 0; i < writes.length; i += 400) { await w11commit(env, writes.slice(i, i + 400)); budget.n--; }
    done += rows.length;
    for (const u of alert.slice(0, 5)) { if (budget.n < 10) break; budget.n -= 4; await pushToUser(env, u, '⚽ 11 Wonders: kick-off in 15 min', 'Your match is about to start. Come and shout from the touchline!', SITE + '#11wonders', 'w11ko').catch(() => {}); }
  }
  return done;
}

// ---------- ✅ a phone sends the result it worked out ----------
const w11agreed = (v) => { const c = {}; for (const u in v || {}) { const x = v[u]; c[x] = (c[x] || 0) + 1; if (c[x] >= 2) return x; } return null; };
async function w11result(env, uid, mid, r) {
  if (!/^[\w-]{5,60}$/.test(mid) || typeof r !== 'string' || r.length > 2000 || !C11.RES_RE.test(r)) return { ok: false, error: 'bad result' };
  const m = await w11get(env, `w11m/${mid}`); if (!m) return { ok: false, error: 'no match' };
  const M = m.data; if (M.st === 'final') return { ok: true, final: M.r };
  if (M.st !== 'locked') return { ok: false, error: 'not played yet' };
  if (Date.now() < M.ko + C11.MATCH_MS + 3000) return { ok: false, error: 'still playing' };
  if (uid !== M.hu && uid !== M.au && !(M.jobs && M.jobs[uid])) return { ok: false, error: 'not your match' };
  const vd = await w11get(env, `w11v/${mid}`), v = { ...((vd && vd.data.v) || {}) }; v[uid] = r;
  const win = w11agreed(v);
  if (!win) { await w11commit(env, [{ path: `w11v/${mid}`, data: { v: { [uid]: r } }, mask: ['v.' + uid] }, { path: `w11m/${mid}`, data: { nv: Object.keys(v).length }, mask: ['nv'], pre: { ut: m.ut } }]); return { ok: true, waiting: true }; }
  const ok = await w11final(env, mid, M, m.ut, win, v);
  return { ok, final: win };
}
/* apply a confirmed result: table, coins, fitness, cards, bans, injuries */
async function w11final(env, mid, M, ut, r, v, quickSettled) {
  const P = C11.parseRes(r), day = C11.absDay(Date.now()), side = [M.hu, M.au], writes = [];
  const clubs = await w11batchGet(env, side.filter(Boolean).map(u => `w11Clubs/${u}`));
  for (let i = 0; i < 2; i++) {
    const u = side[i]; if (!u) continue; const cd = clubs[`w11Clubs/${u}`]; if (!cd) continue;
    const c = cd.data, sh = M['s' + i] || C11.sheetOf(c, day, M.s), gf = i ? P.a : P.h, ga = i ? P.h : P.a, res = gf > ga ? 'w' : gf < ga ? 'l' : 'd', phy = C11.hasStaff(c, 'ph', M.s);
    const cond = {}, ids = sh.ids || [], subs = P.subs[i] || [], ban = { ...(c.ban || {}) }, inj = { ...(c.inj || {}) }, yc = { ...(c.yc || {}) };
    (c.ids || []).forEach(id => { cond[id] = C11.condNow(c, id, day); });
    const played = {}; ids.slice(0, 11).forEach(id => { played[id] = 1; });
    subs.forEach(([o, n, k]) => { if (played[o] != null) played[o] = Math.min(played[o], k / C11.ENGINE_TICKS); played[n] = 1 - k / C11.ENGINE_TICKS; });
    for (const id in played) { if (cond[id] == null) continue; const before = cond[id]; cond[id] = Math.max(0, Math.round(before - C11.DRAIN * played[id]));
      const rr = C11.rng(C11.hash(mid + ':inj:' + id)); if (!quickSettled && played[id] > 0.2 && rr() < (0.03 + (100 - before) * 0.0006) * (phy ? 0.6 : 1)) inj[id] = Math.max(Number(inj[id]) || 0, Math.max(1, 1 + Math.floor(rr() * 3) - (phy ? 1 : 0))); }
    (sh.bo || []).forEach(id => { ban[id] = Math.max(0, (Number(ban[id]) || 0) - 1); if (!ban[id]) delete ban[id]; });
    (sh.io || []).forEach(id => { inj[id] = Math.max(0, (Number(inj[id]) || 0) - 1); if (!inj[id]) delete inj[id]; });
    (P.cards[i] || []).forEach(([id, k]) => { if (k === 'r') ban[id] = (Number(ban[id]) || 0) + 1; else { yc[id] = (Number(yc[id]) || 0) + 1; if (yc[id] >= 5) { yc[id] = 0; ban[id] = (Number(ban[id]) || 0) + 1; } } });
    const extra = C11.matchExtra(c, M.s, i === 0, gf, ga);
    if (M.cup) {
      const coins = C11.cupCoins(M.cup, M.cr, P.h, P.a, mid, i) + extra;
      writes.push({ path: `w11Clubs/${u}`, data: { cond, cd: day, ban, inj, yc }, mask: ['cond', 'cd', 'ban', 'inj', 'yc'], inc: coins ? { coins } : null });
      continue;
    }
    const lst = { ...(c.lst || {}) }; lst.p = (lst.p || 0) + 1; lst[res] = (lst[res] || 0) + 1; lst.gf = (lst.gf || 0) + gf; lst.ga = (lst.ga || 0) + ga;
    const coins = (res === 'w' ? C11.winCoins(M.t) : res === 'd' ? C11.drawCoins(M.t) : 0) + extra;
    writes.push({ path: `w11Clubs/${u}`, data: { cond, cd: day, ban, inj, yc, lst }, mask: ['cond', 'cd', 'ban', 'inj', 'yc', 'lst'], inc: coins ? { coins } : null });
  }
  if (M.cup) { const k = M.cr + '_' + M.ck; writes.push({ path: CUPP(M.s, M.cup), data: { ur: { [k]: C11.cupResStr(M.cup, M.cr, P.h, P.a, mid) } }, mask: ['ur.' + k] }); }
  else writes.push({ path: `w11g/${C11.gkey(M.s, M.t, M.g)}`, data: { res: { [M.md + '_' + M.hp]: P.h + '-' + P.a } }, mask: ['res.' + M.md + '_' + M.hp] });
  writes.unshift({ path: `w11m/${mid}`, data: { st: 'final', r, nv: Object.keys(v || {}).length, fin: Date.now(), q: !!quickSettled }, mask: ['st', 'r', 'nv', 'fin', 'q'], pre: ut ? { ut } : undefined });
  if (v) writes.push({ path: `w11v/${mid}`, data: { v } });
  return await w11commit(env, writes);
}
/* matches nobody checked within 24 hours get the quick result (no cards, no injuries) */
async function w11settle(env, budget, all) {
  const now = Date.now(), rows = (await w11query(env, 'w11m', [w11eq('st', 'locked')], 60)).filter(r => { const M = r.data; if (M.ko + C11.MATCH_MS + 60000 > now) return false; return all ? !M.cup : M.ko < now - (M.cup ? 6 : 24) * 3600000; }); budget.n--;
  let n = 0;
  for (const r of rows.slice(0, all ? 20 : 4)) {
    if (budget.n < 4) break; const M = r.data, S = M.s;
    const o0 = C11.avg((M.s0 && M.s0.ids) || C11.squadIds(M.h), S), o1 = C11.avg((M.s1 && M.s1.ids) || C11.squadIds(M.a), S), q = C11.quick(M.cup ? r.id : C11.gkey(M.s, M.t, M.g) + ':' + M.md + ':' + M.hp, o0, o1);
    budget.n -= 2; if (await w11final(env, r.id, M, r.ut, q[0] + '-' + q[1] + '|;|;', null, true)) n++;
  }
  return n;
}
// ---------- 🔍 hand out a match for this phone to double-check ----------
async function w11jobs(env, uid) {
  const now = Date.now(), rows = (await w11query(env, 'w11m', [w11eq('st', 'locked')], 40)).filter(r => r.data.ko + C11.MATCH_MS + 10000 < now && r.data.hu !== uid && r.data.au !== uid && !(r.data.jobs || {})[uid]);
  rows.sort((a, b) => (b.data.nv || 0) - (a.data.nv || 0) || a.data.ko - b.data.ko);
  const pick = rows.slice(0, 2); if (!pick.length) return [];
  await w11commit(env, pick.map(r => ({ path: `w11m/${r.id}`, data: { jobs: { [uid]: now } }, mask: ['jobs.' + uid] })));
  return pick.map(r => ({ id: r.id, ...r.data }));
}
// ---------- 🏋️ training (once a day) and packs ----------
async function w11train(env, uid, f) {
  if (!['att', 'def', 'fit'].includes(f)) return { ok: false, error: 'pick attack, defence or fitness' };
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, day = C11.absDay(Date.now()); if (!c.lg) return { ok: false, error: 'join the league first' };
  if (c.trd === day) return { ok: false, error: 'Already trained today. Come back tomorrow!' };
  const tr = { att: 0, def: 0, fit: 0, ...(c.tr || {}) }; if (tr[f] >= C11.TR_MAX) return { ok: false, error: 'That training is maxed out this season' };
  tr[f]++;
  const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { tr, trd: day }, mask: ['tr', 'trd'], pre: { ut: cd.ut } }]);
  return ok ? { ok: true, tr, trd: day } : { ok: false, error: 'try again' };
}
async function w11pack(env, uid, k, id) {
  const cd = await w11get(env, `w11Clubs/${uid}`); if (!cd) return { ok: false, error: 'no club' };
  const c = cd.data, day = C11.absDay(Date.now());
  if (k === 'energy') {
    if (!(c.energy > 0)) return { ok: false, error: 'No Energy Packs left' };
    const cond = {}; (c.ids || []).forEach(x => { cond[x] = Math.min(100, C11.condNow(c, x, day) + C11.PACK_FIT); });
    const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { cond, cd: day, energy: c.energy - 1 }, mask: ['cond', 'cd', 'energy'], pre: { ut: cd.ut } }]);
    return ok ? { ok: true, cond, cd: day, energy: c.energy - 1 } : { ok: false, error: 'try again' };
  }
  if (k === 'med') {
    if (!(c.med > 0)) return { ok: false, error: 'No Med-Packs left' };
    const inj = { ...(c.inj || {}) }; if (!(inj[id] > 0)) return { ok: false, error: 'That player is not injured' };
    delete inj[id];
    const ok = await w11commit(env, [{ path: `w11Clubs/${uid}`, data: { inj, med: c.med - 1 }, mask: ['inj', 'med'], pre: { ut: cd.ut } }]);
    return ok ? { ok: true, inj, med: c.med - 1 } : { ok: false, error: 'try again' };
  }
  return { ok: false, error: 'unknown pack' };
}

// ---------- 🔁 season change (day 28): final tables → prizes → new groups ----------
async function w11season(env, budget) {
  const now = Date.now(), { s: cs, day } = C11.clock(now);
  const meta = await w11meta(env, cs); budget.n--;
  const S = meta.s; if (S > cs || (S === cs && day < C11.SDAYS)) return 'not yet';
  const L = w11groups(meta.d6);
  if (meta.ph === '' || meta.ph === 'fin') {
    if (meta.ph === '' ) { await w11settle(env, budget, true); }
    let cur = meta.cur;
    while (cur < L.length && budget.n > 8) {
      const [t, g] = L[cur], key = C11.gkey(S, t, g), row = await w11get(env, `w11g/${key}`); budget.n--;
      const G = row ? { ...w11pristine(S, t, g), ...row.data } : w11pristine(S, t, g), res = { ...(G.res || {}) };
      const closeM = [];
      for (let md = 1; md <= C11.MDS; md++) for (const [h, a] of C11.pairs(md)) if ((C11.isUserAt(G, h, md) || C11.isUserAt(G, a, md)) && !res[md + '_' + h]) { const q = C11.quick(key + ':' + md + ':' + h, C11.strength(G, h, md), C11.strength(G, a, md)); res[md + '_' + h] = q[0] + '-' + q[1]; closeM.push({ path: `w11m/${C11.mid(S, t, g, md, h)}`, data: { st: 'final', q: true, r: q[0] + '-' + q[1] + '|;|;' }, mask: ['st', 'q', 'r'] }); }
      const tb = C11.table({ ...G, res }), fin = tb.map(r => G.clubs[r.pos]);
      const writes = [{ path: `w11g/${key}`, data: { s: S, t, g, clubs: G.clubs, users: G.users || {}, res, fin, at: now } }, ...closeM];
      writes.push(...w11hofWrites(S, 'd', t + '-' + g, fin[0], (Object.values(G.users || {}).find(u => u.c === fin[0]) || {}).n, t, g));
      const top2 = tb.slice(0, 2).map(r => (G.users || {})[r.pos]).filter(Boolean), bonus = {};
      if (top2.length && budget.n > 10) { const cs2 = await w11batchGet(env, top2.map(u => `w11Clubs/${u.u}`)); budget.n--; top2.forEach(u => { const k = cs2[`w11Clubs/${u.u}`], bo = k && C11.spOf(k.data, S, 'bo'); if (bo && bo.top2) bonus[u.u] = bo.top2; }); }
      tb.forEach((r, place) => { const u = (G.users || {})[r.pos]; if (!u) return; const up = t > 1 && place < C11.UP && !!C11.parentOf(t, g), down = t < 6 && place >= 14 - C11.DOWN;
        const tok = (up ? C11.TOK.promo : 0) + (place === 0 ? C11.TOK.title : 0), inc = { coins: C11.prize(t, place + 1) + (up ? C11.PROMO_BONUS : 0) + (bonus[u.u] || 0) }; if (tok) inc.gems = tok;
        writes.push({ path: `w11Clubs/${u.u}`, data: {}, mask: [], inc, push: { hist: [{ s: S, t, p: place + 1, pts: r.pts, up, down }] } }); });
      await w11commit(env, writes); budget.n--; cur++;
      await w11commit(env, [{ path: W11_META, data: { s: S, d6: meta.d6, ph: 'fin', cur }, mask: ['s', 'd6', 'ph', 'cur'] }]); budget.n--;
      break;
    }
    if (cur < L.length) return 'fin ' + cur + '/' + L.length;
    meta.ph = 'plan';
  }
  if (meta.ph === 'plan') {
    const docs = await w11batchGet(env, L.map(([t, g]) => `w11g/${C11.gkey(S, t, g)}`)); budget.n--;
    const fins = {}, users = {};
    for (const [t, g] of L) { const d = docs[`w11g/${C11.gkey(S, t, g)}`]; const G = d ? d.data : w11pristine(S, t, g); fins[t + '-' + g] = G.fin || G.clubs; for (const p in (G.users || {})) { const u = G.users[p]; users[u.c] = u; } }
    const plan = L.map(([t, g]) => [t, g, C11.nextClubs(t, g, S, (a, b) => fins[a + '-' + b] || C11.initClubs(a, b))]);
    const isU = (ci) => ci >= 100000;
    // extra Div 6 groups: their top 2 managers swap with computer clubs in Div 5
    plan.filter(([t, g]) => t === 6 && g >= 32).forEach(([t, g]) => {
      const top = (fins['6-' + g] || []).slice(0, C11.UP).filter(isU), tgt = plan.find(([a, b]) => a === 5 && b === (g - 32) % 16), me = plan.find(([a, b]) => a === 6 && b === g);
      top.forEach(ci => { const k = tgt[2].map((x, i) => [x, i]).filter(([x]) => !isU(x)).pop(); if (!k) return; const j = me[2].indexOf(ci); me[2][j] = k[0]; tgt[2][k[1]] = ci; });
    });
    // managers waiting to join go into Division 6 (same kick-off time first)
    const waiting = await w11query(env, 'w11Clubs', [w11eq('wait', S + 1)], 200); budget.n--;
    for (const w of waiting) {
      const c = w.data; if (users[c.club]) continue;
      let best = null; plan.forEach((p, i) => { if (p[0] !== 6) return; const aiAt = p[2].findIndex(x => !isU(x)); if (aiAt < 0) return; const same = p[2].filter(x => isU(x) && users[x] && users[x].sl === c.sl).length; const sc = same * 10 + (p[2].some(isU) ? 3 : 0) - p[1] * 0.001; if (!best || sc > best.sc) best = { i, aiAt, sc }; });
      if (!best) { const g = plan.filter(p => p[0] === 6).length; plan.push([6, g, C11.initClubs(6, g)]); best = { i: plan.length - 1, aiAt: 0 }; }
      plan[best.i][2][best.aiAt] = c.club; users[c.club] = { u: c.uid || w.id, c: c.club, n: c.name || 'My Club', sh: c.short || 'MYC', sl: c.sl == null ? 2 : c.sl };
    }
    const d6 = plan.filter(p => p[0] === 6).length;
    const usersOut = {}; plan.forEach(([t, g, cl]) => cl.forEach(ci => { if (users[ci]) usersOut[ci] = users[ci]; }));
    const champs = L.map(([t, g]) => (fins[t + '-' + g] || [])[0]), runners = L.map(([t, g]) => (fins[t + '-' + g] || [])[1]);
    const cl = [...new Set(champs.concat(runners).filter(x => x != null))].slice(0, 64);
    await w11commit(env, [{ path: W11_META, data: { s: S, d6: meta.d6, ph: 'build', cur: 0, plan: JSON.stringify({ plan, users: usersOut, d6, cl }) }, mask: ['s', 'd6', 'ph', 'cur', 'plan'] }]); budget.n--;
    return 'planned';
  }
  if (meta.ph === 'build') {
    const P = JSON.parse(meta.plan || '{}'), N = S + 1; let cur = meta.cur;
    while (cur < P.plan.length && budget.n > 6) {
      const [t, g, cl] = P.plan[cur], users = {}, writes = [];
      cl.forEach((ci, pos) => { const u = P.users[ci]; if (u) users[pos] = { u: u.u, c: ci, n: u.n, sh: u.sh, sl: u.sl, o: C11.avg(C11.squadIds(ci), N), from: 1 }; });
      writes.push({ path: `w11g/${C11.gkey(N, t, g)}`, data: { s: N, t, g, clubs: cl, users, res: {}, at: Date.now() } });
      const G = { s: N, t, g, clubs: cl, users };
      for (let md = 1; md <= C11.MDS; md++) for (const [h, a] of C11.pairs(md)) {
        const hu = users[h], au = users[a]; if (!hu && !au) continue;
        writes.push({ path: `w11m/${C11.mid(N, t, g, md, h)}`, data: { s: N, t, g, md, hp: h, ap: a, h: cl[h], a: cl[a], hu: hu ? hu.u : '', au: au ? au.u : '', ko: C11.ko(N, md, (hu || au).sl), st: 'sched', nv: 0, jobs: {} } });
      }
      for (const pos in users) { const u = users[pos]; writes.push({ path: `w11Clubs/${u.u}`, data: { lg: { s: N, t, g, pos: Number(pos), sl: u.sl }, wait: 0, cond: {}, cd: C11.absDay(Date.now()), tr: {}, trd: 0, yc: {}, ban: {}, inj: {} }, mask: ['lg', 'wait', 'cond', 'cd', 'tr', 'trd', 'yc', 'ban', 'inj'] }); }
      for (let i = 0; i < writes.length; i += 450) { await w11commit(env, writes.slice(i, i + 450)); budget.n--; }
      cur++;
    }
    const done = cur >= P.plan.length;
    if (done && N >= C11.CUP_FIRST) { await w11commit(env, w11cupDocs(N, P)); budget.n--; }
    await w11commit(env, [{ path: W11_META, data: done ? { s: N, d6: P.d6, ph: '', cur: 0, plan: '' } : { s: S, d6: meta.d6, ph: 'build', cur, plan: meta.plan }, mask: ['s', 'd6', 'ph', 'cur', 'plan'] }]); budget.n--;
    return done ? 'season ' + N + ' ready' : 'build ' + cur + '/' + P.plan.length;
  }
  return 'idle';
}

// ---------- ⏱️ every 5 minutes ----------
async function w11cron(env) {
  const budget = { n: 44 }, out = {}; try { await w11epoch(env); budget.n--; } catch (e) {}
  try { out.locked = await w11lock(env, budget); } catch (e) { out.lockErr = String(e); }
  try { out.settled = await w11settle(env, budget, false); } catch (e) { out.settleErr = String(e); }
  try { if (budget.n > 10) out.cups = await w11cups(env, budget); } catch (e) { out.cupErr = String(e); }
  try { out.season = await w11season(env, budget); } catch (e) { out.seasonErr = String(e); }
  try { if (budget.n > 4) out.market = await w11mkSettle(env, budget); } catch (e) { out.mkErr = String(e); }
  return out;
}

// ---------- 🌐 routes ----------
async function w11route(req, env, ctx, url, json) {
  const uid = await firebaseUid(req, env); if (!uid) return json({ ok: false, error: 'sign in' }, 401);
  if (tooFast('w11:' + uid, 30, 60000)) return json({ ok: false, error: 'slow down' }, 429);
  let b = {}; if (req.method === 'POST') { try { b = await req.json(); } catch (e) {} }
  const p = url.pathname; await w11epoch(env);
  const g5 = await w11g5route(p, env, uid, b); if (g5) return json(g5);
  if (p === '/w11/join') return json(await w11join(env, uid, Number(b.sl)));
  if (p === '/w11/result') return json(await w11result(env, uid, String(b.mid || ''), b.r));
  if (p === '/w11/job') return json({ ok: true, jobs: await w11jobs(env, uid) });
  if (p === '/w11/train') return json(await w11train(env, uid, String(b.f || '')));
  if (p === '/w11/pack') return json(await w11pack(env, uid, String(b.k || ''), String(b.id || '')));
  const g3 = await w11g3route(p, env, uid, b) || await w11g3broute(p, env, uid, b) || await w11g4route(p, env, uid, b); if (g3) return json(g3);
  if (p === '/w11/run' && await isAdminUid(env, uid)) return json({ ok: true, ...(await w11cron(env)) });
  return json({ ok: false, error: 'unknown' }, 404);
}
