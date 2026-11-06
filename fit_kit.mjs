// 11 Wonders – MakeHuman pipeline, Step 5: athletic kit fit (post-process of the step-4 game files).
// node fit_kit.mjs <step1 A_step1.glb> <step4 data dir (morphs.json/f32)> <in dir with w3d-mh.glb + w3d-mh-hero.glb> <out dir>
//
// What it does, per player version (match, far, hero):
//  1. Recovers the quantisation (scale + offset) of the shipped mesh by matching its body to the full step-1 body (ICP).
//  2. Fits shirt + shorts to the athlete's body: every kit vertex moves along the body normal so the fabric sits a set
//     distance ("ease") off the skin – tight on chest/shoulders/upper arm (modern athletic cut), a little room at the
//     waist and hem, shorts snug at the waist and slightly open at the leg (not a skirt). Large drape folds are mostly
//     removed (30 % kept as soft ripples); hem / collar thickness and fine detail are kept exactly.
//  3. Pulls the wide scoop neckline in to a crew neck (collar vertices slide along the shoulders toward the neck).
//  4. Copies skin weights from the body under each kit vertex (barycentric, 23 game bones) so the kit deforms exactly like
//     the skin: no poke-through in any animation. The runtime "second skin" cloth fix is switched off for shirt + shorts.
//  5. Re-derives build morphs (lean / stocky) for the kit from the MakeHuman base mesh, recomputes kit normals.
// Textures (KTX2), hair, eyes, socks, boots and every other attribute are left untouched.
import { io, getA } from './lib.mjs';
import fs from 'fs';

const [, , STEP1, DATA, IN, OUT] = process.argv;
fs.mkdirSync(OUT, { recursive: true });
const sst = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const FING = /^(index|middle|ring|pinky|thumb)_0\d_([lr])$/;

/* ---------------- reference body (step 1: full body, nothing cut away) ---------------- */
const s1 = await io.read(STEP1), s1R = s1.getRoot();
const bodyPrim = s1R.listMeshes().flatMap((m) => m.listPrimitives()).find((p) => /m_body/.test(p.getMaterial()?.getName() || ''));
const BP = getA(bodyPrim, 'POSITION').arr, BJ = getA(bodyPrim, 'JOINTS_0').arr, BW = getA(bodyPrim, 'WEIGHTS_0').arr, BI = bodyPrim.getIndices().getArray();
const BN_ = BP.length / 3, BT = BI.length / 3;
const s1Joints = s1R.listSkins()[0].listJoints();
console.log('reference body', BN_, 'verts', BT, 'tris');
// smooth normals, welded by position (UV seams share a normal)
const BN = new Float32Array(BN_ * 3);
{ const key = (i) => `${Math.round(BP[i * 3] * 1e5)},${Math.round(BP[i * 3 + 1] * 1e5)},${Math.round(BP[i * 3 + 2] * 1e5)}`, grp = new Map(), rep = new Int32Array(BN_);
  for (let i = 0; i < BN_; i++) { const k = key(i); if (!grp.has(k)) grp.set(k, i); rep[i] = grp.get(k); }
  const acc = new Float64Array(BN_ * 3);
  for (let t = 0; t < BT; t++) { const a = BI[t * 3], b = BI[t * 3 + 1], c = BI[t * 3 + 2];
    const ux = BP[b * 3] - BP[a * 3], uy = BP[b * 3 + 1] - BP[a * 3 + 1], uz = BP[b * 3 + 2] - BP[a * 3 + 2], vx = BP[c * 3] - BP[a * 3], vy = BP[c * 3 + 1] - BP[a * 3 + 1], vz = BP[c * 3 + 2] - BP[a * 3 + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; for (const v of [a, b, c]) { const r = rep[v]; acc[r * 3] += nx; acc[r * 3 + 1] += ny; acc[r * 3 + 2] += nz; } }
  for (let i = 0; i < BN_; i++) { const r = rep[i], l = Math.hypot(acc[r * 3], acc[r * 3 + 1], acc[r * 3 + 2]) || 1; BN[i * 3] = acc[r * 3] / l; BN[i * 3 + 1] = acc[r * 3 + 1] / l; BN[i * 3 + 2] = acc[r * 3 + 2] / l; } }

// vertex spatial hash (for ICP + nearest)
function vgrid(P, n, cell) { const g = new Map(); for (let i = 0; i < n; i++) { const k = `${Math.floor(P[i * 3] / cell)},${Math.floor(P[i * 3 + 1] / cell)},${Math.floor(P[i * 3 + 2] / cell)}`; (g.get(k) || g.set(k, []).get(k)).push(i); } return { g, cell }; }
function knn(G, P, x, y, z, k, maxR, filt) { const out = [], c = G.cell, cx = Math.floor(x / c), cy = Math.floor(y / c), cz = Math.floor(z / c);
  for (let r = 0; r <= Math.ceil(maxR / c); r++) { for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) for (let d = -r; d <= r; d++) { if (Math.max(Math.abs(a), Math.abs(b), Math.abs(d)) !== r) continue;
      for (const i of G.g.get(`${cx + a},${cy + b},${cz + d}`) || []) { if (filt && !filt(i)) continue; const dx = P[i * 3] - x, dy = P[i * 3 + 1] - y, dz = P[i * 3 + 2] - z; out.push([dx * dx + dy * dy + dz * dz, i]); } }
    if (out.length >= k && r >= 1) break; }
  return out.sort((p, q) => p[0] - q[0]).slice(0, k); }
const BG = vgrid(BP, BN_, 0.02);

// triangle grid for closest-point queries
const TC = 0.03, TG = new Map();
for (let t = 0; t < BT; t++) { let mn = [9, 9, 9], mx = [-9, -9, -9]; for (let k = 0; k < 3; k++) { const v = BI[t * 3 + k]; for (let j = 0; j < 3; j++) { mn[j] = Math.min(mn[j], BP[v * 3 + j]); mx[j] = Math.max(mx[j], BP[v * 3 + j]); } }
  for (let x = Math.floor(mn[0] / TC); x <= Math.floor(mx[0] / TC); x++) for (let y = Math.floor(mn[1] / TC); y <= Math.floor(mx[1] / TC); y++) for (let z = Math.floor(mn[2] / TC); z <= Math.floor(mx[2] / TC); z++) { const k = `${x},${y},${z}`; (TG.get(k) || TG.set(k, []).get(k)).push(t); } }
function closestOnTri(px, py, pz, t) { // Ericson, returns [x,y,z,u,v,w,d2]
  const ia = BI[t * 3] * 3, ib = BI[t * 3 + 1] * 3, ic = BI[t * 3 + 2] * 3;
  const ax = BP[ia], ay = BP[ia + 1], az = BP[ia + 2], bx = BP[ib], by = BP[ib + 1], bz = BP[ib + 2], cx = BP[ic], cy = BP[ic + 1], cz = BP[ic + 2];
  const abx = bx - ax, aby = by - ay, abz = bz - az, acx = cx - ax, acy = cy - ay, acz = cz - az, apx = px - ax, apy = py - ay, apz = pz - az;
  const d1 = abx * apx + aby * apy + abz * apz, d2 = acx * apx + acy * apy + acz * apz; let u, v, w;
  if (d1 <= 0 && d2 <= 0) { u = 1; v = 0; w = 0; } else {
    const bpx = px - bx, bpy = py - by, bpz = pz - bz, d3 = abx * bpx + aby * bpy + abz * bpz, d4 = acx * bpx + acy * bpy + acz * bpz;
    if (d3 >= 0 && d4 <= d3) { u = 0; v = 1; w = 0; } else { const vc = d1 * d4 - d3 * d2;
      if (vc <= 0 && d1 >= 0 && d3 <= 0) { const s = d1 / (d1 - d3); u = 1 - s; v = s; w = 0; } else {
        const cpx = px - cx, cpy = py - cy, cpz = pz - cz, d5 = abx * cpx + aby * cpy + abz * cpz, d6 = acx * cpx + acy * cpy + acz * cpz;
        if (d6 >= 0 && d5 <= d6) { u = 0; v = 0; w = 1; } else { const vb = d5 * d2 - d1 * d6;
          if (vb <= 0 && d2 >= 0 && d6 <= 0) { const s = d2 / (d2 - d6); u = 1 - s; v = 0; w = s; } else { const va = d3 * d6 - d5 * d4;
            if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) { const s = (d4 - d3) / ((d4 - d3) + (d5 - d6)); u = 0; v = 1 - s; w = s; } else { const dn = 1 / (va + vb + vc); v = vb * dn; w = vc * dn; u = 1 - v - w; } } } } } }
  const x = ax * u + bx * v + cx * w, y = ay * u + by * v + cy * w, z = az * u + bz * v + cz * w; return [x, y, z, u, v, w, (x - px) ** 2 + (y - py) ** 2 + (z - pz) ** 2]; }
function closest(px, py, pz, triOk, maxR = 0.25) { let best = null, bt = -1;
  const cx = Math.floor(px / TC), cy = Math.floor(py / TC), cz = Math.floor(pz / TC), seen = new Set();
  for (let r = 0; r <= Math.ceil(maxR / TC); r++) { for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) for (let d = -r; d <= r; d++) { if (Math.max(Math.abs(a), Math.abs(b), Math.abs(d)) !== r) continue;
      for (const t of TG.get(`${cx + a},${cy + b},${cz + d}`) || []) { if (seen.has(t)) continue; seen.add(t); if (triOk && !triOk(t)) continue; const c = closestOnTri(px, py, pz, t); if (!best || c[6] < best[6]) { best = c; bt = t; } } }
    if (best && Math.sqrt(best[6]) < r * TC) break; }
  return best ? { p: best, t: bt } : null; }

/* ---------------- morph deltas from the MakeHuman base mesh ---------------- */
const MJ = JSON.parse(fs.readFileSync(DATA + '/morphs.json')), MF = new Float32Array(fs.readFileSync(DATA + '/morphs.f32').buffer.slice(0));
const NB = MJ.n, BASE = MF.subarray(0, NB * 3), MNAMES = MJ.names, MDEL = MNAMES.map((_, i) => MF.subarray((i + 1) * NB * 3, (i + 2) * NB * 3));
const BASEG = vgrid(BASE, NB, 0.02);

/* ---------------- per version ---------------- */
function mapJoints(names) { // step-1 joint index -> game joint index (fingers fold into the hand; anything else walks up to a game bone)
  return s1Joints.map((j) => { let n = j; while (n) { const nm = n.getName(), m = FING.exec(nm), t = names.indexOf(m ? 'hand_' + m[2] : nm); if (t >= 0) return t; n = n.getParentNode && n.getParentNode(); } return names.indexOf('pelvis'); }); }

let NECKC = null;
function fitPrim(prim, joints, lodName) {
  const names = joints.map((j) => j.getName()), JM = mapJoints(names);
  const n = prim.getAttribute('POSITION').getCount(), Q = getA(prim, 'POSITION').arr, PART = getA(prim, '_PART').arr, I = prim.getIndices().getArray();
  const JW = getA(prim, 'JOINTS_0').arr, WW = getA(prim, 'WEIGHTS_0').arr, CL = getA(prim, '_CLOTH').arr;
  /* 1. quantisation: m = s * q + o  (ICP on the body vertices) */
  let s = 0.9859, o = [0, 0.954, 0.159];
  const body = []; for (let i = 0; i < n; i++) if (PART[i] === 0) body.push(i);
  for (let it = 0; it < 6; it++) { let S = 0, Sq = [0, 0, 0], Sm = [0, 0, 0], Sqq = 0, Sqm = 0, N = 0, err = 0;
    for (const i of body) { const m = [0, 1, 2].map((k) => s * Q[i * 3 + k] + o[k]), nb = knn(BG, BP, m[0], m[1], m[2], 1, 0.06); if (!nb.length) continue; const j = nb[0][1]; err = Math.max(err, Math.sqrt(nb[0][0]));
      for (let k = 0; k < 3; k++) { const q = Q[i * 3 + k], mm = BP[j * 3 + k]; Sq[k] += q; Sm[k] += mm; Sqq += q * q; Sqm += q * mm; } N++; }
    // shared scale, per-axis offset
    let num = Sqm, den = Sqq; for (let k = 0; k < 3; k++) { num -= Sq[k] * Sm[k] / N; den -= Sq[k] * Sq[k] / N; } s = num / den; o = [0, 1, 2].map((k) => (Sm[k] - s * Sq[k]) / N);
    if (it === 5) console.log(lodName, 'quantisation s', s.toFixed(6), 'o', o.map((v) => v.toFixed(5)).join(','), 'max match err before last solve (mm)', (err * 1000).toFixed(2)); }
  const M = new Float64Array(n * 3); for (let i = 0; i < n * 3; i++) M[i] = s * Q[i] + o[i % 3];

  /* triangle joint sets (game joints with weight > 0.1) to keep kit vertices on the right limb */
  const triJ = new Array(BT); for (let t = 0; t < BT; t++) { let mask = 0; for (let k = 0; k < 3; k++) { const v = BI[t * 3 + k]; for (let c = 0; c < 4; c++) if (BW[v * 4 + c] > 0.1) mask |= 1 << JM[BJ[v * 4 + c]]; } triJ[t] = mask; }
  const J = (nm) => names.indexOf(nm), ARM = (1 << J('upperarm_l')) | (1 << J('upperarm_r')) | (1 << J('lowerarm_l')) | (1 << J('lowerarm_r'));
  const LIFT = { match: 0.0025, far: 0.005, hero: 0 }[lodName];

  /* 2. gap of every kit vertex above the skin */
  const kit = []; for (let i = 0; i < n; i++) if (PART[i] === 2 || PART[i] === 3) kit.push(i);
  const G = new Float64Array(n), NRM = new Float64Array(n * 3), HIT = new Array(n), TGT = new Float64Array(n), ARMW = new Float64Array(n);
  for (const i of kit) { let mask = 0, wa = 0; for (let c = 0; c < 4; c++) { const w = WW[i * 4 + c]; if (w > 0.1) mask |= 1 << JW[i * 4 + c]; if ((ARM >> JW[i * 4 + c]) & 1) wa += w; } ARMW[i] = wa;
    const h = closest(M[i * 3], M[i * 3 + 1], M[i * 3 + 2], (t) => (triJ[t] & mask) !== 0) || closest(M[i * 3], M[i * 3 + 1], M[i * 3 + 2]);
    const [x, y, z, u, v, w] = h.p, ia = BI[h.t * 3], ib = BI[h.t * 3 + 1], ic = BI[h.t * 3 + 2];
    let nx = BN[ia * 3] * u + BN[ib * 3] * v + BN[ic * 3] * w, ny = BN[ia * 3 + 1] * u + BN[ib * 3 + 1] * v + BN[ic * 3 + 1] * w, nz = BN[ia * 3 + 2] * u + BN[ib * 3 + 2] * v + BN[ic * 3 + 2] * w; const l = Math.hypot(nx, ny, nz) || 1;
    NRM[i * 3] = nx / l; NRM[i * 3 + 1] = ny / l; NRM[i * 3 + 2] = nz / l; HIT[i] = h;
    G[i] = (M[i * 3] - x) * NRM[i * 3] + (M[i * 3 + 1] - y) * NRM[i * 3 + 1] + (M[i * 3 + 2] - z) * NRM[i * 3 + 2];
    /* ease (metres off the skin) – modern athletic cut */
    const Y = M[i * 3 + 1];
    let t;
    if (PART[i] === 2) { const torso = Y > 1.3 ? 0.006 : Y > 1.1 ? lerp(0.022, 0.006, sst(1.1, 1.3, Y)) : lerp(0.027, 0.022, sst(0.9, 1.1, Y));
      const sleeve = lerp(0.006, 0.011, sst(0.0, 0.16, Math.abs(M[i * 3]) - 0.24)); t = lerp(torso, sleeve, sst(0.3, 0.8, wa)); if (Y > 1.52) t = lerp(t, 0.003, sst(1.52, 1.6, Y)); }
    else { t = Y > 1.0 ? 0.004 : lerp(0.019, 0.004, sst(0.78, 1.0, Y)); }
    TGT[i] = t + LIFT; }
  /* 3. split the gap into scales: base (removed), folds (30 % kept), fine detail + hem thickness (kept) */
    const gsm = (r) => { const out = new Float64Array(n), C = r * 1.5, g = new Map(), kk = (a, b, c) => a + ',' + b + ',' + c;
    for (const j of kit) { const k = kk(Math.floor(M[j * 3] / C), Math.floor(M[j * 3 + 1] / C), Math.floor(M[j * 3 + 2] / C)); (g.get(k) || g.set(k, []).get(k)).push(j); }
    const r2 = C * C, inv = 1 / (r * r * 0.5);
    for (const i of kit) { let a = 0, b = 0; const x = M[i * 3], y = M[i * 3 + 1], z = M[i * 3 + 2], cx = Math.floor(x / C), cy = Math.floor(y / C), cz = Math.floor(z / C);
      for (let p = -1; p <= 1; p++) for (let q = -1; q <= 1; q++) for (let w = -1; w <= 1; w++) for (const j of g.get(kk(cx + p, cy + q, cz + w)) || []) { if (PART[j] !== PART[i]) continue;
        const d2 = (M[j * 3] - x) ** 2 + (M[j * 3 + 1] - y) ** 2 + (M[j * 3 + 2] - z) ** 2; if (d2 > r2) continue; const wt = Math.exp(-d2 * inv); a += G[j] * wt; b += wt; }
      out[i] = b ? a / b : G[i]; } return out; };
  const gS = gsm(0.012), gB = gsm(lodName === 'far' ? 0.07 : 0.055);
  let moved = 0, mx = 0;
  const NEWM = Float64Array.from(M);
  for (const i of kit) { let ng = TGT[i] + (PART[i] === 2 ? lerp(0.3, 0.38, (1 - sst(1.22, 1.32, M[i * 3 + 1])) * (1 - sst(0.2, 0.5, ARMW[i]))) : 0.3) * (gS[i] - gB[i]) + (G[i] - gS[i]) * (G[i] < gS[i] - 0.0015 ? 1 : lodName === 'hero' ? 0.45 : 0.75); ng = Math.max(ng, G[i] >= gS[i] ? TGT[i] * 0.6 + 0.001 : 0.0015);
    const d = ng - G[i]; for (let k = 0; k < 3; k++) NEWM[i * 3 + k] += NRM[i * 3 + k] * d; moved += Math.abs(d); mx = Math.max(mx, Math.abs(d)); }
  console.log(lodName, 'kit verts', kit.length, 'mean move (mm)', (moved / kit.length * 1000).toFixed(1), 'max (mm)', (mx * 1000).toFixed(1));

  /* 3b. below the chest the shirt FALLS from the chest (convex outline, limited taper), it does not shrink-wrap the waist or abs */
  { const Y0 = 0.8, Y1 = 1.42, DY = 0.01, NT = 48, NYb = Math.round((Y1 - Y0) / DY) + 1, zc = new Float64Array(NYb), zn = new Float64Array(NYb);
    const armOf = (v) => { let wa = 0; for (let k = 0; k < 4; k++) { const j = JM[BJ[v * 4 + k]]; if ((ARM >> j) & 1) wa += BW[v * 4 + k]; if (j === J('thigh_l') || j === J('thigh_r')) wa += BW[v * 4 + k] * 0; } return wa; };
    const tv = []; for (let v = 0; v < BN_; v++) { const y = BP[v * 3 + 1]; if (y < Y0 || y > Y1 || armOf(v) > 0.15 || Math.abs(BP[v * 3]) > 0.24) continue; tv.push(v); const b = Math.round((y - Y0) / DY); zc[b] += BP[v * 3 + 2]; zn[b]++; }
    for (let b = 0; b < NYb; b++) zc[b] = zn[b] ? zc[b] / zn[b] : NaN; for (let b = 0; b < NYb; b++) if (isNaN(zc[b])) zc[b] = b ? zc[b - 1] : 0.02;
    const Zc = (y) => { const f = Math.max(0, Math.min(NYb - 1.001, (y - Y0) / DY)), b = Math.floor(f); return zc[b] + (zc[b + 1] - zc[b]) * (f - b); };
    // the FITTED shirt may not narrow faster than TAPER going down from the chest (no hourglass, no abs): push outward only
    const TAPER = 0.16, Tr = new Float64Array(n), act = new Uint8Array(n);
    const wkey = (i) => Math.round(M[i * 3] * 2e4) + ',' + Math.round(M[i * 3 + 1] * 2e4) + ',' + Math.round(M[i * 3 + 2] * 2e4), wr = new Map(), W_ = new Int32Array(n);
    for (const i of kit) { const k = wkey(i); if (!wr.has(k)) wr.set(k, i); W_[i] = wr.get(k); }
    const rad = (i) => Math.hypot(NEWM[i * 3], NEWM[i * 3 + 2] - Zc(NEWM[i * 3 + 1]));
    for (const i of kit) { if (PART[i] !== 2) continue; Tr[i] = rad(i); act[i] = M[i * 3 + 1] < 1.30 && ARMW[i] < 0.05 && G[i] >= gS[i] - 0.001 ? 1 : 0; }
    const E = []; for (let t = 0; t < I.length; t += 3) for (let k = 0; k < 3; k++) { const a = W_[I[t + k]], b = W_[I[t + (k + 1) % 3]]; if (PART[a] === 2 && act[a] && act[b] && a !== b) E.push(a, b); }
    const T0 = Float64Array.from(Tr);
    for (let it = 0; it < 300; it++) { let ch = 0; for (let e = 0; e < E.length; e += 2) { let a = E[e], b = E[e + 1]; const ya = NEWM[a * 3 + 1], yb = NEWM[b * 3 + 1]; if (ya > yb) [a, b] = [b, a];
        const dy = Math.abs(yb - ya), dh = Math.hypot(NEWM[a * 3] - NEWM[b * 3], NEWM[a * 3 + 2] - NEWM[b * 3 + 2]); if (dy < dh * 0.5) continue; // only roughly vertical edges
        const lim = Tr[b] - TAPER * dy; if (Tr[a] < lim - 1e-6) { Tr[a] = lim; ch++; } } if (!ch) break; }
    // smooth the outward push so it has no edges
    const push = new Float64Array(n); for (const i of kit) push[i] = act[W_[i]] ? Tr[W_[i]] - T0[W_[i]] : 0;
    { const E2 = []; for (let t = 0; t < I.length; t += 3) for (let k = 0; k < 3; k++) { const a = W_[I[t + k]], b = W_[I[t + (k + 1) % 3]]; if (PART[a] === 2 && a !== b) E2.push(a, b); }
      for (let it = 0; it < 8; it++) { const acc = new Float64Array(n), cn = new Float64Array(n); for (let e = 0; e < E2.length; e += 2) { const a = E2[e], b = E2[e + 1]; acc[a] += push[b]; cn[a]++; acc[b] += push[a]; cn[b]++; }
        for (const i of kit) if (W_[i] === i && cn[i]) push[i] = 0.5 * push[i] + 0.5 * acc[i] / cn[i]; for (const i of kit) push[i] = push[W_[i]]; } }
    let nh = 0, pmax = 0;
    for (const i of kit) { if (PART[i] !== 2 || push[i] <= 1e-5) continue; const y = NEWM[i * 3 + 1], x = NEWM[i * 3], z = NEWM[i * 3 + 2] - Zc(y), r = Math.hypot(x, z), k = (r + push[i]) / (r || 1);
      NEWM[i * 3] = x * k; NEWM[i * 3 + 2] = z * k + Zc(y); nh++; pmax = Math.max(pmax, push[i]); }
    console.log(lodName, 'waist taper push max (mm)', (pmax * 1000).toFixed(1));
    console.log(lodName, 'torso falls from chest: verts', nh); }

  /* 4. crew neck: collar band slides toward the neck (on the skin surface, at the collar ease) */
  { const NECK = J('neck_01'); let cx = 0, cz = 0, cy = 0, c = 0; const nv = [];
    for (let v = 0; v < BN_; v++) { let wn = 0; for (let k = 0; k < 4; k++) if (JM[BJ[v * 4 + k]] === NECK) wn += BW[v * 4 + k]; if (wn > 0.3 && BP[v * 3 + 1] < 1.75) nv.push(v); }
    const minY = Math.min(...nv.map((v) => BP[v * 3 + 1]));
    for (const v of nv) if (BP[v * 3 + 1] < minY + 0.025) { cx += BP[v * 3]; cy += BP[v * 3 + 1]; cz += BP[v * 3 + 2]; c++; }
    cx /= c; cz /= c; cy /= c; console.log(lodName, 'neck verts', c, cx, cy, cz);
    // current collar edge per angle around the neck: lowest-reaching shirt boundary
    const bnd = new Map(); for (let t = 0; t < I.length; t += 3) for (let k = 0; k < 3; k++) { const a = I[t + k], b = I[t + (k + 1) % 3]; if (PART[a] !== 2) continue; const key = a < b ? a + ',' + b : b + ',' + a; bnd.set(key, (bnd.get(key) || 0) + 1); }
    const isB = new Uint8Array(n); for (const [k, cnt] of bnd) if (cnt === 1) { const [a, b] = k.split(',').map(Number); isB[a] = isB[b] = 1; }
    const collar = kit.filter((i) => PART[i] === 2 && isB[i] && NEWM[i * 3 + 1] > 1.42 && Math.hypot(NEWM[i * 3] - cx, NEWM[i * 3 + 2] - cz) < 0.17);
    console.log(lodName, 'collar boundary verts', collar.length, 'boundary verts', isB.reduce((a, b) => a + b, 0)); if (!collar.length) throw new Error('no collar');
    const NB_ = 24, edge = new Array(NB_).fill(0), ecount = new Array(NB_).fill(0);
    const ang = (x, z) => Math.floor(((Math.atan2(x - cx, z - cz) + Math.PI) / (2 * Math.PI)) * NB_) % NB_;
    for (const i of collar) { const r = Math.hypot(NEWM[i * 3] - cx, NEWM[i * 3 + 2] - cz), b = ang(NEWM[i * 3], NEWM[i * 3 + 2]); edge[b] += r; ecount[b]++; }
    for (let b = 0; b < NB_; b++) edge[b] = ecount[b] ? edge[b] / ecount[b] : NaN;
    for (let b = 0; b < NB_; b++) if (isNaN(edge[b])) { let l = b, r = b; while (isNaN(edge[l])) l = (l + NB_ - 1) % NB_; while (isNaN(edge[r])) r = (r + 1) % NB_; edge[b] = (edge[l] + edge[r]) / 2; }
    // target radius: a crew neck sits ~1.5 cm off the neck base all round (a touch lower at the front)
    let pulled = 0; if (!process.env.NECKPULL) { /* replaced by addCollar() */ } else
    for (const i of kit) { if (PART[i] !== 2) continue; const x = NEWM[i * 3], y = NEWM[i * 3 + 1], z = NEWM[i * 3 + 2]; if (y < 1.36) continue;
      const r = Math.hypot(x - cx, z - cz), b = ang(x, z), front = Math.max(0, (z - cz) / (r || 1)), e = edge[b], want = 0.075 + 0.02 * front;
      if (e <= want + 0.004) continue; const band = 0.07; if (r > e + band) continue;
      const f = 1 - Math.max(0, (r - e) / band); const nr = r - (e - want) * f * f * (3 - 2 * f) * (r - want > 0 ? 1 : 0);
      const k = nr / (r || 1); let px = cx + (x - cx) * k, pz = cz + (z - cz) * k, py = y;
      const h = closest(px, py, pz, null, 0.2); if (!h) continue; const [hx, hy, hz, u, v, w] = h.p, ia = BI[h.t * 3], ib = BI[h.t * 3 + 1], ic = BI[h.t * 3 + 2];
      let nx = BN[ia * 3] * u + BN[ib * 3] * v + BN[ic * 3] * w, ny = BN[ia * 3 + 1] * u + BN[ib * 3 + 1] * v + BN[ic * 3 + 1] * w, nz = BN[ia * 3 + 2] * u + BN[ib * 3 + 2] * v + BN[ic * 3 + 2] * w; const l = Math.hypot(nx, ny, nz) || 1;
      const gap = Math.max(0.0015, (G[i] - gS[i]) + 0.004 + LIFT); NEWM[i * 3] = hx + nx / l * gap; NEWM[i * 3 + 1] = hy + ny / l * gap; NEWM[i * 3 + 2] = hz + nz / l * gap; NRM[i * 3] = nx / l; NRM[i * 3 + 1] = ny / l; NRM[i * 3 + 2] = nz / l; HIT[i] = h; pulled++; }
    NECKC = [cx, cy, cz];
    console.log(lodName, 'neck centre', [cx, cy, cz].map((v) => v.toFixed(3)).join(','), 'collar radius by angle (cm)', edge.map((e) => (e * 100).toFixed(0)).join(' '), 'pulled', pulled); }

  /* 5. weights from the skin under each vertex (re-query at the final position) */
  const pos = prim.getAttribute('POSITION'), jA = prim.getAttribute('JOINTS_0'), wA = prim.getAttribute('WEIGHTS_0'), cA = prim.getAttribute('_CLOTH');
  // which side is "_l": mean x of skin weighted to thigh_l
  let lx = 0, lc = 0; for (let v = 0; v < BN_; v++) for (let c = 0; c < 4; c++) if (JM[BJ[v * 4 + c]] === J('thigh_l') && BW[v * 4 + c] > 0.5) { lx += BP[v * 3]; lc++; }
  const LSIGN = Math.sign(lx / lc), LEG_L = (1 << J('thigh_l')) | (1 << J('calf_l')), LEG_R = (1 << J('thigh_r')) | (1 << J('calf_r'));
  const triAny = new Array(BT); for (let t = 0; t < BT; t++) { let m = 0; for (let k = 0; k < 3; k++) { const v = BI[t * 3 + k]; for (let c = 0; c < 4; c++) if (BW[v * 4 + c] > 0.02) m |= 1 << JM[BJ[v * 4 + c]]; } triAny[t] = m; }
  const wkey2 = (i) => PART[i] + ':' + Math.round(NEWM[i * 3] * 2e4) + ',' + Math.round(NEWM[i * 3 + 1] * 2e4) + ',' + Math.round(NEWM[i * 3 + 2] * 2e4), done = new Map();
  for (const i of kit) { let mask = 0; for (let c = 0; c < 4; c++) if (WW[i * 4 + c] > 0.1) mask |= 1 << JW[i * 4 + c];
    const key = wkey2(i); if (done.has(key)) { const [jj, ww] = done.get(key); jA.setElement(i, jj); wA.setElement(i, ww); cA.setElement(i, [CL[i * 4], CL[i * 4 + 1], 0, CL[i * 4 + 3]]); pos.setElement(i, [0, 1, 2].map((k) => Math.max(-1, Math.min(1, (NEWM[i * 3 + k] - o[k]) / s)))); continue; }
    const legSide = PART[i] === 3 && NEWM[i * 3 + 1] < 0.875 && Math.abs(NEWM[i * 3]) > 0.004 ? Math.sign(NEWM[i * 3]) : 0, OPP = legSide === 0 ? 0 : legSide === LSIGN ? LEG_R : LEG_L;
    const h = closest(NEWM[i * 3], NEWM[i * 3 + 1], NEWM[i * 3 + 2], (t) => (triJ[t] & mask) !== 0 && !(triAny[t] & OPP)) || closest(NEWM[i * 3], NEWM[i * 3 + 1], NEWM[i * 3 + 2], (t) => !(triAny[t] & OPP)) || HIT[i]; const [, , , u, v, w] = h.p, acc = new Map();
    [[BI[h.t * 3], u], [BI[h.t * 3 + 1], v], [BI[h.t * 3 + 2], w]].forEach(([bv, bw]) => { for (let c = 0; c < 4; c++) { const ww = BW[bv * 4 + c] * bw; if (ww > 0) { const j = JM[BJ[bv * 4 + c]]; acc.set(j, (acc.get(j) || 0) + ww); } } });
    let top = [...acc].sort((a, b) => b[1] - a[1]).slice(0, 4), sum = top.reduce((a, b) => a + b[1], 0);
    // uint8 weights must sum to 255 exactly
    let q8 = top.map(([, w]) => Math.round(w / sum * 255)); q8[0] += 255 - q8.reduce((a, b) => a + b, 0);
    const jj = [0, 0, 0, 0], ww = [0, 0, 0, 0]; top.forEach(([j], k) => { jj[k] = j; ww[k] = q8[k] / 255; });
    jA.setElement(i, jj); wA.setElement(i, ww); done.set(key, [jj, ww]);
    const cl = [CL[i * 4], CL[i * 4 + 1], 0, CL[i * 4 + 3]]; cA.setElement(i, cl);
    pos.setElement(i, [0, 1, 2].map((k) => Math.max(-1, Math.min(1, (NEWM[i * 3 + k] - o[k]) / s)))); }

  /* 6. build morphs for the kit (lean / stocky only, as before), from the base mesh around each vertex */
  const tgts = prim.listTargets(), mi = (nm) => MNAMES.indexOf(nm);
  for (const nm of ['lean', 'stocky']) { const m = mi(nm), d = MDEL[m], ta = tgts[m].getAttribute('POSITION'); let diff = 0, cnt = 0;
    for (const i of kit) { const x = NEWM[i * 3], y = NEWM[i * 3 + 1], z = NEWM[i * 3 + 2], nb = knn(BASEG, BASE, x, y, z, 4, 0.25); let ws = 0, dx = 0, dy = 0, dz = 0;
      for (const [d2, b] of nb) { const q = 1 / (Math.sqrt(d2) + 0.004); ws += q; dx += d[b * 3] * q; dy += d[b * 3 + 1] * q; dz += d[b * 3 + 2] * q; }
      const mk = 1 - sst(1.6, 1.7, y), nv = [dx / ws * mk / s, dy / ws * mk / s, dz / ws * mk / s], old = []; ta.getElement(i, old); diff += Math.hypot(nv[0] - old[0], nv[1] - old[1], nv[2] - old[2]) * s; cnt++; ta.setElement(i, nv); }
    console.log(lodName, 'morph', nm, 'mean change vs before (mm)', (diff / cnt * 1000).toFixed(2)); }

  /* 7. normals for the kit from the new shape (welded by position inside each garment) */
  { const NA = prim.getAttribute('NORMAL'), acc = new Float64Array(n * 3), key = (i) => PART[i] + ':' + Math.round(NEWM[i * 3] * 2e4) + ',' + Math.round(NEWM[i * 3 + 1] * 2e4) + ',' + Math.round(NEWM[i * 3 + 2] * 2e4), rep = new Int32Array(n).fill(-1), grp = new Map();
    for (const i of kit) { const k = key(i); if (!grp.has(k)) grp.set(k, i); rep[i] = grp.get(k); }
    for (let t = 0; t < I.length; t += 3) { const a = I[t], b = I[t + 1], c = I[t + 2]; if (rep[a] < 0 || rep[b] < 0 || rep[c] < 0) continue;
      const ux = NEWM[b * 3] - NEWM[a * 3], uy = NEWM[b * 3 + 1] - NEWM[a * 3 + 1], uz = NEWM[b * 3 + 2] - NEWM[a * 3 + 2], vx = NEWM[c * 3] - NEWM[a * 3], vy = NEWM[c * 3 + 1] - NEWM[a * 3 + 1], vz = NEWM[c * 3 + 2] - NEWM[a * 3 + 2];
      const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; for (const v of [a, b, c]) { const r = rep[v]; acc[r * 3] += nx; acc[r * 3 + 1] += ny; acc[r * 3 + 2] += nz; } }
    for (const i of kit) { const r = rep[i], l = Math.hypot(acc[r * 3], acc[r * 3 + 1], acc[r * 3 + 2]); if (l > 0) NA.setElement(i, [acc[r * 3] / l, acc[r * 3 + 1] / l, acc[r * 3 + 2] / l]); } }

  /* 8. crew-neck collar band + 9. clean trims */
  addCollar(prim, { s, o, lodName, JM, LIFT });
  trimRamp(prim, { s, o, lodName, ARM });
}

/* ---------------- helpers to rewrite whole attributes (adding vertices) ---------------- */
const FT = { 5126: Float32Array, 5122: Int16Array, 5121: Uint8Array, 5123: Uint16Array, 5125: Uint32Array, 5120: Int8Array };
function setFloats(acc, f) {
  const ct = acc.getComponentType(), T = FT[ct], norm = acc.getNormalized();
  if (T === Float32Array) return acc.setArray(Float32Array.from(f));
  const max = { 5122: 32767, 5121: 255, 5123: 65535, 5120: 127 }[ct], lo = ct === 5121 || ct === 5123 ? 0 : -1, a = new T(f.length);
  for (let i = 0; i < f.length; i++) a[i] = norm ? Math.round(Math.max(lo, Math.min(1, f[i])) * max) : Math.round(f[i]);
  acc.setArray(a);
}
function loopsOf(I, PART, part, Pq) { // boundary loops of one garment (welded by position, so UV seams are not edges), ordered, directed as in the triangles
  const rep = new Map(), R = (v) => { const k = Math.round(Pq[v * 3] * 3e4) + ',' + Math.round(Pq[v * 3 + 1] * 3e4) + ',' + Math.round(Pq[v * 3 + 2] * 3e4); if (!rep.has(k)) rep.set(k, v); return rep.get(k); };
  const cnt = new Map(), dir = new Map();
  for (let t = 0; t < I.length; t += 3) { if (PART[I[t]] !== part) continue; for (let k = 0; k < 3; k++) { const a = R(I[t + k]), b = R(I[t + (k + 1) % 3]); if (a === b) continue; const key = a < b ? a + ',' + b : b + ',' + a; cnt.set(key, (cnt.get(key) || 0) + 1); dir.set(key, [a, b]); } }
  const next = new Map(); for (const [k, c] of cnt) if (c === 1) { const [a, b] = dir.get(k); next.set(a, b); }
  const seen = new Set(), loops = [];
  for (const st of next.keys()) { if (seen.has(st)) continue; const L = []; let v = st; while (v != null && !seen.has(v)) { seen.add(v); L.push(v); v = next.get(v); } if (L.length > 2) loops.push(L); }
  return loops;
}
// as/ca head morphs: remove the whole-body height shift exactly like build_step4 did
const HEADSHIFT = {}; MNAMES.forEach((nm, m) => { if (nm !== 'as' && nm !== 'ca') return; const d = MDEL[m]; let sx = 0, sy = 0, sz = 0, c = 0;
  for (let i = 0; i < NB; i++) { const y = BASE[i * 3 + 1]; if (y > 1.6 && y < 1.68 && Math.abs(BASE[i * 3]) < 0.15) { sx += d[i * 3]; sy += d[i * 3 + 1]; sz += d[i * 3 + 2]; c++; } } HEADSHIFT[nm] = [sx / c, sy / c, sz / c]; });
const MASKF = (nm, y) => nm === 'as' || nm === 'ca' ? sst(1.56, 1.66, y) : nm === 'lean' || nm === 'stocky' ? 1 - sst(1.6, 1.7, y) : 1;

function addCollar(prim, { s, o, lodName, JM, LIFT }) {
  const n = prim.getAttribute('POSITION').getCount(), Q = getA(prim, 'POSITION').arr, PART = getA(prim, '_PART').arr, I = Array.from(prim.getIndices().getArray());
  const M = new Float64Array(n * 3); for (let i = 0; i < n * 3; i++) M[i] = s * Q[i] + o[i % 3];
  const [cx, cy, cz] = NECKC;
  const loops = loopsOf(I, PART, 2, Q).map((L) => { let y = 0, r = 0; for (const v of L) { y += M[v * 3 + 1]; r += Math.hypot(M[v * 3] - cx, M[v * 3 + 2] - cz); } return { L, y: y / L.length, r: r / L.length }; });
  const col = loops.filter((l) => l.y > 1.42 && l.r < 0.2).sort((a, b) => b.y - a.y)[0];
  if (!col) { console.log(lodName, 'no collar loop found', loops.map((l) => [l.L.length, l.y.toFixed(2), l.r.toFixed(2)])); return; }
  const L = col.L, NL = L.length, K = { far: 2, match: 3, hero: 6 }[lodName];
  // pattern y vs height (LSQ over the shirt) and fabric-uv per metre, to continue them up the band
  const U0 = getA(prim, 'TEXCOORD_0').arr, U2 = getA(prim, 'TEXCOORD_2').arr;
  let a0 = 0, a1 = 0, a2 = 0, b1 = 0, b2 = 0, cN = 0; for (let i = 0; i < n; i++) if (PART[i] === 2) { const y = M[i * 3 + 1], p = U2[i * 2 + 1]; a0++; a1 += y; a2 += y * y; b1 += p; b2 += p * y; }
  const patSlope = (a0 * b2 - a1 * b1) / (a0 * a2 - a1 * a1);
  let uvm = 0; for (let t = 0; t < I.length; t += 3) { const a = I[t], b = I[t + 1]; if (PART[a] !== 2) continue; const dp = Math.hypot(M[a * 3] - M[b * 3], M[a * 3 + 1] - M[b * 3 + 1], M[a * 3 + 2] - M[b * 3 + 2]); if (dp < 1e-4) continue; uvm += Math.hypot(U0[a * 2] - U0[b * 2], U0[a * 2 + 1] - U0[b * 2 + 1]) / dp; cN++; } uvm /= cN;
  console.log(lodName, 'collar loop', NL, 'verts, mean radius (cm)', (col.r * 100).toFixed(1), 'rows', K, 'pattern dy/dY', patSlope.toFixed(3), 'uv/m', uvm.toFixed(3));

  const sem = prim.listSemantics(), A = {}; for (const sm of sem) A[sm] = getA(prim, sm);
  const tg = prim.listTargets(), TA = tg.map((t) => getA(t, 'POSITION').arr);
  const add = { P: [], N: [], src: [], J: [], W: [], morph: tg.map(() => []), u0: [], u2y: [] };
  const surf = (x, y, z) => { const h = closest(x, y, z, null, 0.2), [hx, hy, hz, u, v, w] = h.p, ia = BI[h.t * 3], ib = BI[h.t * 3 + 1], ic = BI[h.t * 3 + 2];
    let nx = BN[ia * 3] * u + BN[ib * 3] * v + BN[ic * 3] * w, ny = BN[ia * 3 + 1] * u + BN[ib * 3 + 1] * v + BN[ic * 3 + 1] * w, nz = BN[ia * 3 + 2] * u + BN[ib * 3 + 2] * v + BN[ic * 3 + 2] * w; const l = Math.hypot(nx, ny, nz) || 1;
    return { p: [hx, hy, hz], n: [nx / l, ny / l, nz / l], h }; };
  for (const b of L) {
    const B = [M[b * 3], M[b * 3 + 1], M[b * 3 + 2]], th = Math.atan2(B[0] - cx, B[2] - cz), rB = Math.hypot(B[0] - cx, B[2] - cz), fr = Math.max(0, Math.cos(th)) ** 2;
    const yR = cy - 0.004 - 0.04 * fr, sdf = (r) => { const q = [cx + Math.sin(th) * r, yR, cz + Math.cos(th) * r], sp = surf(...q); return (q[0] - sp.p[0]) * sp.n[0] + (q[1] - sp.p[1]) * sp.n[1] + (q[2] - sp.p[2]) * sp.n[2]; };
    let lo = 0.02, hi = 0.2; for (let it = 0; it < 22; it++) { const mid = (lo + hi) / 2; if (sdf(mid) < 0) lo = mid; else hi = mid; }
    const rw = hi + 0.004, T0 = [cx + Math.sin(th) * rw, yR, cz + Math.cos(th) * rw];
    const sb = surf(...B), gB = (B[0] - sb.p[0]) * sb.n[0] + (B[1] - sb.p[1]) * sb.n[1] + (B[2] - sb.p[2]) * sb.n[2];
    let prev = B, run = 0;
    for (let k = 1; k <= K; k++) { const f = k / K, g = [0, 1, 2].map((j) => B[j] + (T0[j] - B[j]) * f), sp = surf(...g), gap = Math.max(0.0015, gB + (0.0045 + LIFT * 1.6 - gB) * f);
      const P = [0, 1, 2].map((j) => sp.p[j] + sp.n[j] * gap); run += Math.hypot(P[0] - prev[0], P[1] - prev[1], P[2] - prev[2]); prev = P;
      add.P.push(P); add.N.push(sp.n); add.src.push(b); add.u0.push(run * uvm); add.u2y.push(patSlope * (P[1] - B[1]));
      // weights from the skin under the point
      const [, , , u, v, w] = sp.h.p, acc = new Map(); [[BI[sp.h.t * 3], u], [BI[sp.h.t * 3 + 1], v], [BI[sp.h.t * 3 + 2], w]].forEach(([bv, bw]) => { for (let c = 0; c < 4; c++) { const ww = BW[bv * 4 + c] * bw; if (ww > 0) { const j = JM[BJ[bv * 4 + c]]; acc.set(j, (acc.get(j) || 0) + ww); } } });
      const top = [...acc].sort((x, y) => y[1] - x[1]).slice(0, 4), sum = top.reduce((x, y) => x + y[1], 0), q8 = top.map(([, x]) => Math.round(x / sum * 255)); q8[0] += 255 - q8.reduce((x, y) => x + y, 0);
      const jj = [0, 0, 0, 0], ww = [0, 0, 0, 0]; top.forEach(([j], i) => { jj[i] = j; ww[i] = q8[i] / 255; }); add.J.push(jj); add.W.push(ww);
      // all morphs (the band reaches the neck, which the head shapes move)
      const nb = knn(BASEG, BASE, P[0], P[1], P[2], 4, 0.25); let wsum = 0; const wts = nb.map(([d2]) => { const q = 1 / (Math.sqrt(d2) + 0.004); wsum += q; return q; });
      MNAMES.forEach((nm, m) => { const mk = MASKF(nm, P[1]), d = MDEL[m], sh = HEADSHIFT[nm] || [0, 0, 0], out = [0, 0, 0]; if (mk) for (let j = 0; j < 3; j++) { let a = 0; nb.forEach(([, bi], q) => a += (d[bi * 3 + j] - sh[j]) * wts[q]); out[j] = a / wsum * mk / s; } add.morph[m].push(out); });
    }
  }
  const nn = add.P.length, N2 = n + nn, row = (k, i) => (k === 0 ? L[i] : n + i * K + (k - 1));
  // triangles, oriented to face away from the body
  const tris = []; for (let i = 0; i < NL; i++) { const j = (i + 1) % NL; for (let k = 0; k < K; k++) { tris.push([row(k, i), row(k, j), row(k + 1, j)], [row(k, i), row(k + 1, j), row(k + 1, i)]); } }
  const posOf = (v) => v < n ? [M[v * 3], M[v * 3 + 1], M[v * 3 + 2]] : add.P[v - n];
  { let pos = 0, neg = 0; for (let q = 0; q < tris.length; q++) { const [a, b, c] = tris[q].map(posOf), u = [0, 1, 2].map((j) => b[j] - a[j]), v = [0, 1, 2].map((j) => c[j] - a[j]), nrm = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const vi = tris[q].find((x) => x >= n); if (vi == null) continue; const bn = add.N[vi - n], d = nrm[0] * bn[0] + nrm[1] * bn[1] + nrm[2] * bn[2]; if (d > 0) pos++; else if (d < 0) { neg++; tris[q].reverse(); } }
    console.log(lodName, 'band winding votes out/in', pos, neg); }
  // write every attribute back with the new vertices appended
  for (const sm of sem) { const { arr, e } = A[sm], out = new Float32Array(N2 * e); out.set(arr);
    for (let q = 0; q < nn; q++) { const src = add.src[q], d = (n + q) * e;
      for (let k = 0; k < e; k++) out[d + k] = arr[src * e + k];
      if (sm === 'POSITION') for (let k = 0; k < 3; k++) out[d + k] = Math.max(-1, Math.min(1, (add.P[q][k] - o[k]) / s));
      else if (sm === 'NORMAL') for (let k = 0; k < 3; k++) out[d + k] = add.N[q][k];
      else if (sm === 'JOINTS_0') for (let k = 0; k < 4; k++) out[d + k] = add.J[q][k];
      else if (sm === 'WEIGHTS_0') for (let k = 0; k < 4; k++) out[d + k] = add.W[q][k];
      else if (sm === '_SKIN2') for (let k = 0; k < 4; k++) out[d + k] = add.J[q][k];
      else if (sm === '_W2') for (let k = 0; k < 4; k++) out[d + k] = add.W[q][k];
      else if (sm === '_CLOTH') out[d + 2] = 0;
      else if (sm === 'TEXCOORD_0') out[d + 1] += add.u0[q];
      else if (sm === 'TEXCOORD_1') { out[d] = -2; out[d + 1] = 3; }
      else if (sm === 'TEXCOORD_2') out[d + 1] += add.u2y[q];
      else if (sm === 'COLOR_0') { out[d] = 0; out[d + 2] = 0; out[d + 1] = Math.max(out[d + 1], 0.85); } }
    setFloats(prim.getAttribute(sm), out); }
  tg.forEach((t, m) => { const out = new Float32Array(N2 * 3); out.set(TA[m]); add.morph[m].forEach((v, q) => out.set(v, (n + q) * 3)); setFloats(t.getAttribute('POSITION'), out); });
  // skin now hidden under the band: drop those triangles (no poke-through, fewer triangles)
  const ringR = new Array(36).fill(0), ringY = new Array(36).fill(0), rc = new Array(36).fill(0);
  for (let q = K - 1; q < add.P.length; q += K) { const P = add.P[q], th = Math.atan2(P[0] - cx, P[2] - cz), k = Math.floor(((th + Math.PI) / (2 * Math.PI)) * 36) % 36; ringR[k] += Math.hypot(P[0] - cx, P[2] - cz); ringY[k] += P[1]; rc[k]++; }
  for (let k = 0; k < 36; k++) if (rc[k]) { ringR[k] /= rc[k]; ringY[k] /= rc[k]; } for (let k = 0; k < 36; k++) if (!rc[k]) { let l = k, r = k; while (!rc[l]) l = (l + 35) % 36; while (!rc[r]) r = (r + 1) % 36; ringR[k] = (ringR[l] + ringR[r]) / 2; ringY[k] = (ringY[l] + ringY[r]) / 2; }
  const covered = (v) => { if (PART[v] !== 0) return false; const x = M[v * 3] - cx, z = M[v * 3 + 2] - cz, y = M[v * 3 + 1], th = Math.atan2(x, z), r = Math.hypot(x, z), k = Math.floor(((th + Math.PI) / (2 * Math.PI)) * 36) % 36, fr = Math.max(0, Math.cos(th)) ** 2;
    return y > 1.42 && y < ringY[k] - 0.015 && r > ringR[k] + 0.016 && r < 0.24; };
  let dropped = 0; const keepI = []; for (let t = 0; t < I.length; t += 3) { if (covered(I[t]) && covered(I[t + 1]) && covered(I[t + 2])) { dropped++; continue; } keepI.push(I[t], I[t + 1], I[t + 2]); }
  console.log(lodName, 'skin triangles under the band removed', dropped);
  const idx = prim.getIndices(), allI = keepI.concat(tris.flat()); idx.setArray(N2 > 65535 ? Uint32Array.from(allI) : Uint16Array.from(allI));
  prim.__bandStart = n;
  prim.__collarTop = new Set(L.map((_, i) => n + i * K + (K - 1)));
  console.log(lodName, 'collar band added', nn, 'verts', tris.length, 'tris');
}

/* trims (collar, cuffs, waistband, leg hems) as a linear distance-to-edge ramp: the shader's 0.5 threshold then gives
   a clean, straight edge at any mesh density, instead of the per-vertex zig-zag of the old 0/1 values */
function trimRamp(prim, { s, o, lodName, ARM }) {
  const RAMP = 0.25, ramp = (d, W) => Math.max(0, Math.min(1, 0.5 + (W - d) / RAMP));
  const n = prim.getAttribute('POSITION').getCount(), Q = getA(prim, 'POSITION').arr, PART = getA(prim, '_PART').arr, I = Array.from(prim.getIndices().getArray()), C = getA(prim, 'COLOR_0').arr;
  const M = new Float64Array(n * 3); for (let i = 0; i < n * 3; i++) M[i] = s * Q[i] + o[i % 3];
  const R0 = new Float32Array(n); for (let i = 0; i < n; i++) R0[i] = C[i * 4];
  const JJ = getA(prim, 'JOINTS_0').arr, WWt = getA(prim, 'WEIGHTS_0').arr, armW = new Float32Array(n); for (let i = 0; i < n; i++) for (let k = 0; k < 4; k++) if ((ARM >> JJ[i * 4 + k]) & 1) armW[i] += WWt[i * 4 + k];
  const dSeg = (i, a, b) => { const ax = M[a * 3], ay = M[a * 3 + 1], az = M[a * 3 + 2], ux = M[b * 3] - ax, uy = M[b * 3 + 1] - ay, uz = M[b * 3 + 2] - az, px = M[i * 3] - ax, py = M[i * 3 + 1] - ay, pz = M[i * 3 + 2] - az, ll = ux * ux + uy * uy + uz * uz;
    const t = ll > 0 ? Math.max(0, Math.min(1, (px * ux + py * uy + pz * uz) / ll)) : 0; return Math.hypot(px - ux * t, py - uy * t, pz - uz * t); };
  let clamped = 0;
  for (const part of [2, 3, 4]) {
    const verts = []; for (let i = 0; i < n; i++) if (PART[i] === part) verts.push(i);
    const newR = new Float32Array(n), info = [];
    for (const L of loopsOf(I, PART, part, Q)) {
      const isCollar = prim.__collarTop && L.some((v) => prim.__collarTop.has(v)); let mean = 0; for (const v of L) mean += R0[v]; mean /= L.length;
      if (isCollar) { for (const i of verts) { if (i < prim.__bandStart) continue; let d = 9; for (let k = 0; k < L.length; k++) { const a = L[k], b = L[(k + 1) % L.length]; if (Math.abs(M[i * 3 + 1] - M[a * 3 + 1]) > 0.1) continue; d = Math.min(d, dSeg(i, a, b)); } newR[i] = Math.max(newR[i], ramp(d, 0.016)); } info.push(L.length + ':collar'); continue; }
      // cut plane of this opening (PCA of the loop), normal pointing out of the garment
      const c = [0, 0, 0]; for (const v of L) for (let k = 0; k < 3; k++) c[k] += M[v * 3 + k] / L.length;
      const cov = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; let rmax = 0; for (const v of L) { const d = [0, 1, 2].map((k) => M[v * 3 + k] - c[k]); rmax = Math.max(rmax, Math.hypot(...d)); for (let p = 0; p < 3; p++) for (let q = 0; q < 3; q++) cov[p][q] += d[p] * d[q]; }
      // smallest eigenvector by inverse iteration
      let nv = [0.3, 0.5, 0.8]; const sh = 1e-9; for (let it = 0; it < 30; it++) { const A = cov.map((r, p) => r.map((x, q) => x + (p === q ? sh : 0))), det = (m) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
        const D = det(A), x = [0, 1, 2].map((k) => { const B = A.map((r, p) => r.map((v, q) => (q === k ? nv[p] : v))); return det(B) / D; }), l = Math.hypot(...x); nv = x.map((v) => v / l); }
      const sleeve = part === 2 && Math.abs(c[0]) > 0.15, near = verts.filter((i) => Math.hypot(M[i * 3] - c[0], M[i * 3 + 1] - c[1], M[i * 3 + 2] - c[2]) < rmax + 0.06 && (!sleeve || armW[i] > 0.3));
      let g = [0, 0, 0]; for (const i of near) for (let k = 0; k < 3; k++) g[k] += M[i * 3 + k] / near.length; if ((g[0] - c[0]) * nv[0] + (g[1] - c[1]) * nv[1] + (g[2] - c[2]) * nv[2] > 0) nv = nv.map((v) => -v);
      const sd = (i) => (M[i * 3] - c[0]) * nv[0] + (M[i * 3 + 1] - c[1]) * nv[1] + (M[i * 3 + 2] - c[2]) * nv[2];
      // fold line = typical outermost point: clamp the teeth that stick out past it (straight hem)
      const NS = 16, smax = new Array(NS).fill(-9), e1 = Math.abs(nv[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0], u = [nv[1] * e1[2] - nv[2] * e1[1], nv[2] * e1[0] - nv[0] * e1[2], nv[0] * e1[1] - nv[1] * e1[0]], ul = Math.hypot(...u), U = u.map((x) => x / ul), V = [nv[1] * U[2] - nv[2] * U[1], nv[2] * U[0] - nv[0] * U[2], nv[0] * U[1] - nv[1] * U[0]];
      const sec = (i) => { const d = [0, 1, 2].map((k) => M[i * 3 + k] - c[k]); return Math.floor(((Math.atan2(d[0] * V[0] + d[1] * V[1] + d[2] * V[2], d[0] * U[0] + d[1] * U[1] + d[2] * U[2]) + Math.PI) / (2 * Math.PI)) * NS) % NS; };
      for (const i of near) { const k = sec(i); smax[k] = Math.max(smax[k], sd(i)); }
      const sorted = smax.filter((x) => x > -9).sort((a, b) => a - b), sFold = sorted[Math.floor(sorted.length * 0.3)];
      for (const i of near) { const d = sd(i); if (d > sFold) { for (let k = 0; k < 3; k++) M[i * 3 + k] -= nv[k] * (d - sFold); clamped++; } }
      if (mean < 0.5) { info.push(L.length + ':plain'); continue; }
      let W; const ds = near.filter((i) => R0[i] > 0.5).map((i) => sFold - sd(i)).sort((a, b) => a - b); W = part === 4 ? 0.018 : part === 2 ? 0.012 : c[1] > 1.0 ? 0.025 : 0.014;
      for (const i of near) newR[i] = Math.max(newR[i], ramp(sFold - sd(i), W));
      // sleeve colour zone (COLOR_0.B) as a straight seam: a plane parallel to the cuff, placed where the old zone changed
      if (part === 2 && Math.abs(c[0]) > 0.15) { const B0 = (i) => C[i * 4 + 2]; const sv = verts.filter((i) => Math.sign(M[i * 3]) === Math.sign(c[0]) && Math.abs(M[i * 3]) > 0.1 && armW[i] > 0.05);
        const tr = []; for (let t = 0; t < I.length; t += 3) for (let k = 0; k < 3; k++) { const a = I[t + k], b = I[t + (k + 1) % 3]; if (PART[a] !== 2 || Math.sign(M[a * 3]) !== Math.sign(c[0])) continue; const ba = B0(a), bb = B0(b); if ((ba - 0.5) * (bb - 0.5) < 0) { const f = (0.5 - ba) / (bb - ba); tr.push(sd(a) + (sd(b) - sd(a)) * f); } }
        tr.sort((a, b) => a - b); const s0 = tr.length ? sFold - 0.078 : null; // same seam on both arms and every version
        if (s0 != null) { for (const i of sv) C[i * 4 + 2] = Math.max(0, Math.min(1, 0.5 + (sd(i) - s0) / RAMP)); info.push('sleeve seam ' + ((sFold - s0) * 100).toFixed(1) + 'cm from cuff'); } }
      info.push(L.length + ':trim ' + (W * 100).toFixed(1) + 'cm'); }
    for (const i of verts) C[i * 4] = newR[i];
    console.log(lodName, 'part', part, 'edges', info.join(' | ')); }
  setFloats(prim.getAttribute('COLOR_0'), C);
  const P = new Float32Array(n * 3); for (let i = 0; i < n * 3; i++) P[i] = Math.max(-1, Math.min(1, (M[i] - o[i % 3]) / s)); setFloats(prim.getAttribute('POSITION'), P);
  console.log(lodName, 'hem teeth clamped', clamped);
}

for (const [file, lods] of JSON.parse(process.env.FILES || '[["w3d-mh.glb",["match","far"]],["w3d-mh-hero.glb",["hero"]]]')) {
  const doc = await io.read(IN + '/' + file), R = doc.getRoot();
  for (const lod of lods) { const node = R.listNodes().find((x) => x.getMesh()?.getName() === 'P_' + lod), prim = node.getMesh().listPrimitives()[0];
    fitPrim(prim, node.getSkin().listJoints(), lod); }
  await io.write(OUT + '/' + file, doc); console.log('wrote', file, (fs.statSync(OUT + '/' + file).size / 1e6).toFixed(2), 'MB');
}
