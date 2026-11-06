/* SINLESS GG · 11 Wonders · Step 4 + Step 5: MakeHuman players in the live game (built by tools3d/mh/build_step4.mjs, kit refit by fit_kit.mjs).
   Step 5: athletic fitted kit (crew neck, straight trims), shared hi-res team crest, anisotropic filtering on every player texture,
   hi-res print for close-ups, cloth second-skin skipped when the files no longer carry it.
   One merged mesh per player version (skin + eyes + shirt + shorts + socks + boots) = 1 draw call, hair + brows = 1 draw call.
   Versions by phone tier: High = hero close-ups (< 6 m, separate file loaded after the match version) + match version,
   Mid = match version, Low = far version + blob shadows. Textures are KTX2 (Basis), transcoded on the phone to its own GPU format.
   Looks (skin, head shape, face, build, height, hair, eyes) come from the player's id, so the same player looks the same on every phone.
   Cloth in extreme poses: a second skin per shirt / shorts vertex is blended in by the arm / knee angle (fixes shoulder ridges with
   arms overhead and the shorts opening at the front on a high knee lift). */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const V3 = THREE.Vector3, Q = THREE.Quaternion;
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const sst = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
export const MH_H = 1.9405;
/* ball contact time inside each kick clip (seconds): the clip starts AT contact, so the foot meets the ball on the very frame the engine kicks */
const META = { Pass: { dur: 0.6, contact: 0.18 }, Shoot: { dur: 0.85, contact: 0.22 }, Tackle: { dur: 1.3, contact: 0.3 }, Celebrate_KneeSlide: { dur: 2, hold: 1 }, Celebrate_Jump: { dur: 1.1 } };
const SKIN_MEAN = { af: [90.6, 58.4, 42], ca: [223.7, 168.5, 136.8], as: [199.2, 155.4, 129.5] };
const PATS = { plain: 0, stripes: 1, hoops: 2, halves: 3, sash: 4, pinstripes: 5, chevron: 6, gradient: 7, checker: 8, centre: 9 };
/* crest box in print-UV space (front region, 72 x 80 mm at 85 mm left of centre, 1.42 m high) – same place the step-4 canvas drew it */
const CREST_R = (() => { const Rg = { s0: -0.2, s1: 0.2, z0: 1.15, z1: 1.55, u0: 0, u1: 0.5, v0: 0, v1: 0.4 }, a = (Rg.u1 - Rg.u0) / (Rg.s1 - Rg.s0) / 1000, e = Rg.u0 - Rg.s0 / (Rg.s1 - Rg.s0) * (Rg.u1 - Rg.u0), k = (Rg.v1 - Rg.v0) / (Rg.z1 - Rg.z0), d = k / 1000, f = 1 - Rg.v0 + Rg.z0 * k;
  const U = (x) => a * x + e, V = (y) => d * y + f; return new THREE.Vector4(U(85 - 36), V(-(1420 + 40)), U(85 + 36), V(-(1420 - 40))); })();
const MORPHS = ['as', 'ca', 'lean', 'stocky', 'f_nose_w', 'f_nose_l', 'f_nose_hump', 'f_chin', 'f_chin_w', 'f_jaw', 'f_cheek', 'f_lips', 'f_head_sq', 'f_head_ov', 'f_brow'];
/* old look styles -> card styles; '' = no cards (scalp only) */
const HAIR_AF = { shaved: ['', 0], buzz: ['', 0.9], fade: ['crop', 1], crew: ['crop', 1], afro: ['afro', 1], top: ['afro', 1], twist: ['afro', 1], dread: ['afro', 1], locks: ['afro', 1], locksL: ['afro', 1], bleach: ['afro', 1], corn: ['crop', 1], hawk: ['crop', 1], under: ['crop', 1], curl: ['afro', 1] };
const HAIR_ST = { shaved: ['', 0], buzz: ['', 0.85], crew: ['short', 1], fade: ['short', 1], short: ['short', 1], part: ['slick', 1], quiff: ['messy', 1], slick: ['slick', 1], curl: ['wavy', 1], bun: ['wavy', 1], pony: ['wavy', 1], long: ['wavy', 1], hawk: ['messy', 1], under: ['messy', 1], bleach: ['short', 1] };

const VERT_HEAD = `attribute float _part; attribute vec2 aPrint; attribute vec2 aPat; attribute vec4 aZone; attribute vec4 _cloth; attribute vec4 _skin2; attribute vec4 _w2;
uniform vec4 uClothF; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA;
`;
const FRAG_HEAD = `uniform vec3 uTint, uHairC, uIris, uP1, uP2, uTrim, uSlv, uSho, uSoc, uSocT, uBoot, uBoot2, uGlove; uniform float uPat, uPatW, uSlvOn, uScalp, uErase, uGK, uBeard;
uniform sampler2D uPrint, uData, uKnit, uCrest; uniform vec4 uCrestR; uniform float uCrestOn; varying float vPart; varying vec2 vPrint; varying vec2 vPat; varying vec4 vZone; varying vec2 vUvA;
float mhBand(float t){ float aa = clamp(fwidth(t) * 1.5, 1e-4, 0.25); float d = abs(fract(t) - 0.5) * 2.0; return smoothstep(0.5 - aa, 0.5 + aa, d); }
float mhPattern(vec2 p){
  if (uPat < 0.5) return 0.0;
  if (uPat < 1.5) return mhBand(p.x / uPatW);
  if (uPat < 2.5) return mhBand((p.y - 1.0) / uPatW);
  if (uPat < 3.5) { float aa = fwidth(p.x) * 1.5; return smoothstep(-aa, aa, p.x); }
  if (uPat < 4.5) { float d = p.x * 0.9 + (p.y - 1.30); float aa = fwidth(d) * 1.5; return 1.0 - smoothstep(uPatW - aa, uPatW + aa, abs(d)); }
  if (uPat < 5.5) { float t = p.x / uPatW; float aa = clamp(fwidth(t), 1e-4, 0.25); float d = abs(fract(t) - 0.5); return 1.0 - smoothstep(0.035 - aa, 0.035 + aa, d); }
  if (uPat < 6.5) { float d = p.y - 1.36 + abs(p.x) * 0.55; float aa = fwidth(d) * 1.5; return 1.0 - smoothstep(0.045 - aa, 0.045 + aa, abs(d)); }
  if (uPat < 7.5) return smoothstep(1.5, 0.95, p.y);
  if (uPat < 8.5) { float w = uPatW * 1.4; return mod(floor(p.x / w) + floor(p.y / w), 2.0); }
  float aa = fwidth(p.x) * 1.5; return 1.0 - smoothstep(0.05 - aa, 0.05 + aa, abs(p.x));
}
`;

export function MHplayers(env) {
  const { scene, tier, ctx, F, url, used, SC, getR, cvs, blobTex, SKINS } = env;
  const MH = { ok: false, chars: [], byId: new Map(), heroOk: false };
  const glt = new GLTFLoader(); glt.setMeshoptDecoder(MeshoptDecoder);
  let ktx = null;
  const isPlayer = (id) => !/^(mgr|off4|ref|fan)/.test(String(id));
  MH.isPlayer = isPlayer;

  /* ---------- shared pieces from the files ---------- */
  const T = { bones: null, lod: {}, cards: {}, skins: {}, clips: {}, knit: null };
  const prep = (mesh) => { const g = mesh.geometry;
    for (const [a, b] of [['uv1', 'aPrint'], ['uv2', 'aPat'], ['color', 'aZone']]) if (g.attributes[a]) { g.setAttribute(b, g.attributes[a]); g.deleteAttribute(a); }
    g.boundingSphere = new THREE.Sphere(new V3(0, 0, 0), 4); return { geo: g, inv: mesh.skeleton.boneInverses, bind: mesh.bindMatrix.clone(), names: mesh.skeleton.bones.map(b => b.name), mat: mesh.material, dict: mesh.morphTargetDictionary }; };
  const cardPrep = (mesh) => { const g = mesh.geometry, hi = mesh.skeleton.bones.findIndex(b => b.name === 'Head');
    g.boundingSphere = new THREE.Sphere(new V3(0, 0, 0), 4); return { geo: g, m: new THREE.Matrix4().multiplyMatrices(mesh.skeleton.boneInverses[hi], mesh.bindMatrix), map: mesh.material.map }; };
  function knit() { if (T.knit) return T.knit; const size = 128, h = new Float32Array(size * size), cells = 8, cs = size / cells;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) { const row = Math.floor(y / cs), ox = (row % 2) * cs / 2, cx = ((x + ox) % cs) - cs / 2, cy = (y % cs) - cs / 2, r = Math.hypot(cx * 0.9, cy) / (cs * 0.5);
      h[y * size + x] = -Math.exp(-Math.pow(r / 0.42, 2)) * 0.9 + (0.5 + 0.5 * Math.cos((x / size) * cells * 4 * Math.PI + (y / size) * 2 * Math.PI * cells)) * 0.25; }
    const d = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) { const H = (xx, yy) => h[((yy + size) % size) * size + ((xx + size) % size)], dx = (H(x + 1, y) - H(x - 1, y)) * 1.1, dy = (H(x, y - 1) - H(x, y + 1)) * 1.1, l = Math.hypot(dx, dy, 1), i = (y * size + x) * 4;
      d[i] = (-dx / l * 0.5 + 0.5) * 255; d[i + 1] = (-dy / l * 0.5 + 0.5) * 255; d[i + 2] = (1 / l * 0.5 + 0.5) * 255; d[i + 3] = 255; }
    const t = new THREE.DataTexture(d, size, size, THREE.RGBAFormat); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter; t.anisotropy = ANI; t.needsUpdate = true; return (T.knit = t); }

  /* anisotropic filtering: sharp kit prints, skin and hair at grazing angles (TV camera looks across the pitch) */
  let ANI = 1; const aniso = (t) => { if (t && t.anisotropy !== ANI) { t.anisotropy = ANI; t.needsUpdate = true; } return t; };
  MH.ready = (async () => {
    const R = getR(); if (!R) throw new Error('no renderer');
    ANI = Math.min(R.capabilities.getMaxAnisotropy ? R.capabilities.getMaxAnisotropy() : 1, tier === 'high' ? 8 : tier === 'mid' ? 4 : 2);
    ktx = new KTX2Loader().setTranscoderPath(ctx.base).detectSupport(R); glt.setKTX2Loader(ktx);
    const [m, a] = await Promise.all([glt.loadAsync(url('w3d-mh.glb')), glt.loadAsync(url('w3d-mh-anims.glb'))]);
    m.scene.updateMatrixWorld(true);
    m.scene.traverse((o) => {
      if (o.isSkinnedMesh && /^P_/.test(o.name)) T.lod[o.name.slice(2)] = prep(o);
      else if (o.isSkinnedMesh && /^C_/.test(o.name)) T.cards[o.name.slice(2)] = cardPrep(o);
      else if (o.isMesh && /^tex_/.test(o.name)) T.skins[o.name.slice(9)] = o.material.map;
      if (o.isBone && o.name === 'root' && !T.bones) T.bones = o.parent && !o.parent.isBone ? o.parent : o; });
    T.skins.af = T.lod.match.mat.map; T.normal = T.lod.match.mat.normalMap; T.data = T.lod.match.mat.aoMap;
    for (const t of [T.skins.af, T.skins.ca, T.skins.as, T.normal, T.data, ...Object.values(T.cards).map((c) => c.map)]) aniso(t);
    /* step-5 files: kit is skinned like the body, so the per-frame cloth correction has nothing to do */
    { const a = T.lod.match.geo.attributes._cloth; let on = 0; if (a) for (let i = 0; i < a.count; i++) if (a.getZ(i) > 0.5) { on = 1; break; } MH.clothFix = !!on; }
    for (const c of a.animations) T.clips[c.name] = c;
    if (!T.lod.match || !T.lod.far || !T.clips.Idle_Loop) throw new Error('mh files incomplete');
    MH.ok = true;
    /* warm-up at load (not during play): upload every mesh + texture to the GPU and compile the player shaders now,
       so the first kick-off, the first close-up and the first pass or shot never stall */
    try { const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100); cam.position.set(0, 1, 4); cam.lookAt(0, 1, 0); const rt = new THREE.WebGLRenderTarget(8, 8);
      R.setRenderTarget(rt); R.render(m.scene, cam); R.setRenderTarget(null); rt.dispose();
      const c = makeChar(); for (const k in c.lod) c.lod[k].visible = true; c.hair.visible = true; c.root.visible = true; R.compile(scene, cam); for (const k in c.lod) c.lod[k].visible = false; c.hair.visible = false; } catch (e) { console.warn('3D mh warm', e); }
    /* High phones: the hero close-up version arrives later (bigger file); match version is used until then */
    if (tier === 'high') glt.loadAsync(url('w3d-mh-hero.glb')).then((h) => { h.scene.updateMatrixWorld(true); const hc = {};
      h.scene.traverse((o) => { if (o.isSkinnedMesh && o.name === 'P_hero') T.lod.hero = prep(o); else if (o.isSkinnedMesh && /^H_/.test(o.name)) hc[o.name.slice(2)] = cardPrep(o); else if (o.isMesh && /^tex_/.test(o.name)) T['h_' + o.name.slice(9)] = o.material.map; });
      T.hcards = hc; T.hskins = { af: T.lod.hero.mat.map, ca: T.h_ca, as: T.h_as }; T.hnormal = T.lod.hero.mat.normalMap;
      for (const t of [T.hskins.af, T.hskins.ca, T.hskins.as, T.hnormal, ...Object.values(hc).map((c) => c.map)]) aniso(t);
      try { const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100); cam.position.set(0, 1, 4); cam.lookAt(0, 1, 0); const rt = new THREE.WebGLRenderTarget(8, 8); R.setRenderTarget(rt); R.render(h.scene, cam); R.setRenderTarget(null); rt.dispose(); } catch (e) {}
      MH.heroOk = !!T.lod.hero; }).catch((e) => console.warn('3D hero', e));
    return MH;
  })();

  /* ---------- material: skin + eyes + kit in one shader ---------- */
  function material(lod) {
    const src = T.lod[lod].mat, m = new THREE.MeshStandardMaterial({ map: src.map, normalMap: src.normalMap, normalScale: new THREE.Vector2(0.6, 0.6), roughness: 0.6, metalness: 0, envMapIntensity: 0.45 });
    const C = () => ({ value: new THREE.Color() });
    const u = m.userData.u = { uTint: C(), uHairC: C(), uIris: C(), uP1: C(), uP2: C(), uTrim: C(), uSlv: C(), uSho: C(), uSoc: C(), uSocT: C(), uBoot: C(), uBoot2: C(), uGlove: C(),
      uBeard: { value: 0 }, uPat: { value: 0 }, uPatW: { value: 0.07 }, uSlvOn: { value: 0 }, uScalp: { value: 0 }, uErase: { value: 0 }, uGK: { value: 0 }, uPrint: { value: null }, uCrest: { value: null }, uCrestR: { value: CREST_R }, uCrestOn: { value: 0 }, uData: { value: src.aoMap }, uKnit: { value: knit() }, uClothF: { value: new THREE.Vector4() } };
    m.onBeforeCompile = (s) => { Object.assign(s.uniforms, u);
      s.vertexShader = VERT_HEAD + s.vertexShader
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPart = _part; vPrint = aPrint; vPat = aPat; vZone = aZone; vUvA = uv;')
        .replace('#include <skinning_vertex>', `vec3 mhPre = transformed;
#include <skinning_vertex>
#ifdef USE_SKINNING
{ float cf = _cloth.z > 0.5 ? (_cloth.x < 1.5 ? (_cloth.y > 0.0 ? uClothF.x : uClothF.y) : (_cloth.y > 0.0 ? uClothF.z : uClothF.w)) : 0.0;
  if (cf > 0.001) { vec4 sv = bindMatrix * vec4(mhPre, 1.0); vec4 s2 = getBoneMatrix(_skin2.x) * sv * _w2.x + getBoneMatrix(_skin2.y) * sv * _w2.y + getBoneMatrix(_skin2.z) * sv * _w2.z;
    transformed = mix(transformed, (bindMatrixInverse * s2).xyz, cf); } }
#endif`);
      s.fragmentShader = FRAG_HEAD + s.fragmentShader
        .replace('#include <map_fragment>', `float mhRough = 0.6;
{ vec3 col;
  if (vPart < 0.5) {
    vec4 tx = texture2D(map, vUvA); vec4 dd = texture2D(uData, vUvA); col = tx.rgb * uTint; mhRough = clamp(dd.r * 1.05, 0.38, 0.75);
    vec3 avg = uTint * vec3(0.32);
    col = mix(col, mix(col, avg * 0.9, 0.85), dd.g * uErase);
    col = mix(col, uHairC * (0.55 + 0.45 * tx.g / max(0.05, tx.r)), dd.g * uScalp);
    if (uBeard > 0.5) { float n = fract(sin(dot(floor(vUvA * 900.0), vec2(127.1, 311.7))) * 43758.5453);
      float bm = uBeard < 1.5 ? dd.b * 0.4 : uBeard < 2.5 || uBeard > 4.5 && uBeard < 5.5 ? dd.b * (uBeard > 4.5 ? 0.95 : 0.78) : uBeard < 3.5 || uBeard > 5.5 ? dd.a * 0.9 : dd.b * 0.7 * (1.0 - dd.a * 0.8);
      col = mix(col, uHairC * (0.55 + 0.6 * n), clamp(bm * (0.65 + 0.5 * n), 0.0, 1.0)); mhRough = mix(mhRough, 0.8, bm); }
    if (uGK > 0.5 && vUvA.y > 0.80 && vUvA.x < 0.70) { col = uGlove; mhRough = 0.7; }
  } else if (vPart < 1.5) {
    vec2 c1 = vec2(0.705, 0.296), c2 = vec2(0.290, 0.708); float r = min(distance(vUvA, c1), distance(vUvA, c2));
    float ir = 1.0 - smoothstep(0.098, 0.108, r), pu = 1.0 - smoothstep(0.034, 0.042, r);
    vec3 scl = mix(vec3(0.86, 0.84, 0.82), vec3(0.72, 0.6, 0.58), smoothstep(0.2, 0.32, r));
    vec3 irc = uIris * (0.65 + 0.6 * smoothstep(0.1, 0.05, r)) * (0.85 + 0.15 * sin(atan(vUvA.y - 0.5, vUvA.x - 0.5) * 40.0));
    col = mix(scl, irc, ir); col = mix(col, vec3(0.02), pu); col = mix(col, col * 0.55, smoothstep(0.09, 0.105, r) * ir); mhRough = 0.12;
  } else {
    float trim = smoothstep(0.5 - max(fwidth(vZone.r), 1e-3), 0.5 + max(fwidth(vZone.r), 1e-3), vZone.r), zb = smoothstep(0.45, 0.55, vZone.b);
    if (vPart < 2.5) { col = mix(uP1, uP2, mhPattern(vec2(vPat.x, 1.0 - vPat.y)) * (1.0 - zb * uSlvOn)); col = mix(col, uSlv, zb * uSlvOn); col = mix(col, uTrim, trim); mhRough = 0.8; }
    else if (vPart < 3.5) { col = mix(uSho, uTrim, trim); mhRough = 0.82; }
    else if (vPart < 4.5) { col = mix(uSoc, uSocT, trim); mhRough = 0.95; }
    else { col = mix(uBoot, uBoot2, max(trim, zb * 0.85)); mhRough = 0.4; }
    if (vPart < 3.5 && vPrint.x >= 0.0 && vPrint.x <= 1.0 && vPrint.y >= 0.0 && vPrint.y <= 1.0) { vec4 pr = texture2D(uPrint, vPrint); col = mix(col, pr.rgb / max(pr.a, 1e-3), pr.a);
      vec2 cu = (vPrint - uCrestR.xy) / (uCrestR.zw - uCrestR.xy);
      if (uCrestOn > 0.5 && cu.x >= 0.0 && cu.x <= 1.0 && cu.y >= 0.0 && cu.y <= 1.0) { vec4 cr = texture2D(uCrest, cu); col = mix(col, cr.rgb / max(cr.a, 1e-3), cr.a); } }
    col *= mix(1.0, vZone.g, 0.75);
  }
  diffuseColor.rgb = col; }`)
        .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = mhRough;')
        .replace('#include <normal_fragment_maps>', `#ifdef USE_NORMALMAP_TANGENTSPACE
{ vec3 mapN = vec3(0.0, 0.0, 1.0);
  if (vPart < 0.5) { mapN = texture2D(normalMap, vNormalMapUv).xyz * 2.0 - 1.0; mapN.xy *= normalScale; }
  else if (vPart > 1.5 && vPart < 4.5) { mapN = texture2D(uKnit, vUvA * (vPart < 2.5 ? 90.0 : 70.0)).xyz * 2.0 - 1.0; mapN.xy *= 0.35; }
  normal = normalize(tbn * mapN); }
#endif`)
        .replace('#include <aomap_fragment>', '');
    };
    m.customProgramCacheKey = () => 'w3dmh5';
    return m;
  }
  function cardMaterial() {
    const m = new THREE.MeshStandardMaterial({ color: 0x1a1410, roughness: 0.62, metalness: 0, alphaTest: 0.3, side: THREE.DoubleSide, envMapIntensity: 0.3 });
    if (tier !== 'low') m.alphaToCoverage = true;
    return m;
  }

  /* ---------- characters ---------- */
  const MAXC = 30;
  function makeChar() {
    const root = new THREE.Group(), rig = T.bones.clone(true); root.add(rig);
    const bones = {}; rig.traverse((o) => { if (o.isBone) bones[o.name] = o; });
    const c = { mh: true, root, bones, mixer: new THREE.AnimationMixer(root), act: {}, w: {}, id: null, lastN: -9, mod: new Map(), ph: 0, look: 0, lookP: 0, lean: 0, lod: {}, mats: {}, FU: { uExpr: { value: new THREE.Vector4() } }, pivots: [], ex: new THREE.Vector4(), cf: new THREE.Vector4() };
    const mk = (lod) => { const L = T.lod[lod], mat = c.mats[lod] = material(lod), sk = new THREE.SkinnedMesh(L.geo, mat);
      sk.bind(new THREE.Skeleton(L.names.map(n => bones[n]), L.inv), L.bind); sk.castShadow = lod !== 'far' && tier !== 'low'; sk.receiveShadow = false; sk.visible = false; sk.frustumCulled = true;
      sk.morphTargetInfluences = new Array(MORPHS.length).fill(0); sk.morphTargetDictionary = L.dict; sk.boundingSphere = new THREE.Sphere(new V3(0, 0.95, 0), 1.6); root.add(sk); c.lod[lod] = sk; return sk; };
    mk('match'); mk('far');
    c.hair = new THREE.Mesh(T.cards.none.geo, cardMaterial()); c.hair.matrixAutoUpdate = false; c.hair.morphTargetInfluences = new Array(MORPHS.length).fill(0); c.hair.castShadow = tier === 'high'; bones.Head.add(c.hair);
    const CL = { idle: 'Idle_Loop', walk: 'Walk_Loop', jog: 'Jog_Fwd_Loop', sprint: 'Sprint_Loop', dance: 'Dance_Loop', air: 'Jump_Loop', crouch: 'Crouch_Idle_Loop', talk: 'Idle_Talking_Loop' };
    for (const k in CL) { const clip = T.clips[CL[k]]; if (!clip) continue; const a = c.mixer.clipAction(clip); a.play(); a.setEffectiveWeight(0); c.act[k] = a; c.w[k] = 0; }
    /* one-shot moves, pre-warmed (bound + evaluated once now, so a pass or shot never allocates or compiles anything when it fires) */
    c.one = {}; for (const n of ['Pass', 'Shoot', 'Tackle', 'Celebrate_KneeSlide', 'Celebrate_Jump']) { const clip = T.clips[n]; if (!clip) continue; const a = c.mixer.clipAction(clip); a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; a.play(); a.setEffectiveWeight(0); c.one[n] = a; }
    c.mixer.update(0); for (const a of Object.values(c.one)) a.stop();
    c.w.idle = 1; c.shot = null; c.shotW = 0; scene.add(root); MH.chars.push(c); env.chars.push(c); return c;
  }
  function heroMesh(c) { if (c.lod.hero || !MH.heroOk) return c.lod.hero; const L = T.lod.hero, mat = c.mats.hero = material('hero'), sk = new THREE.SkinnedMesh(L.geo, mat);
    mat.map = c.mats.match.map === T.skins.af ? T.hskins.af : c.mats.match.map === T.skins.ca ? T.hskins.ca : T.hskins.as; mat.normalMap = T.hnormal;
    sk.bind(new THREE.Skeleton(L.names.map(n => c.bones[n]), L.inv), L.bind); sk.castShadow = true; sk.visible = false; sk.morphTargetInfluences = c.lod.match.morphTargetInfluences.slice(); sk.morphTargetDictionary = L.dict; sk.boundingSphere = new THREE.Sphere(new V3(0, 0.95, 0), 1.6); c.root.add(sk); c.lod.hero = sk;
    c.hairH = new THREE.Mesh(T.hcards.none.geo, cardMaterial()); c.hairH.matrixAutoUpdate = false; c.hairH.morphTargetInfluences = c.hair.morphTargetInfluences; c.hairH.visible = false; c.bones.Head.add(c.hairH); c.dk = null; return sk; }
  MH.getChar = function (id) {
    let c = MH.byId.get(id); if (c) return c;
    c = MH.chars.filter(x => x.lastN < F.n - 1 && !x.port).sort((a, b) => a.lastN - b.lastN)[0];
    if (!c && MH.chars.length < MAXC) c = makeChar(); if (!c) c = MH.chars.filter(x => !x.port).sort((a, b) => a.lastN - b.lastN)[0];
    if (c.id != null) MH.byId.delete(c.id); c.id = id; MH.byId.set(id, c); c.dk = null; c.lastN = -9; c.shot = null; c.shotW = 0; for (const a of Object.values(c.one)) a.stop(); return c;
  };

  /* ---------- look ---------- */
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function mhLook(id, L) {
    const R = rng(ctx.hash('mh4:' + id)), r2 = () => R() * 2 - 1, g = L.grp;
    /* head shape by roots (blends, so mixed roots get in-between faces) */
    let as = 0, ca = 0, base = 'ca';
    if (g === 'af' || g === 'af2') { base = 'af'; as = R() * 0.15; ca = g === 'af2' ? R() * 0.35 : R() * 0.15; }
    else if (g === 'ea') { base = 'as'; as = 0.75 + R() * 0.25; ca = R() * 0.15; }
    else if (g === 'eu') { base = 'ca'; ca = 0.8 + R() * 0.2; as = R() * 0.08; }
    else if (g === 'mix') { base = L.si < 6 ? 'af' : 'ca'; ca = 0.3 + R() * 0.5; as = R() * 0.2; }
    else { base = L.si < 6 ? 'af' : 'ca'; ca = 0.55 + R() * 0.35; as = R() * 0.25; }
    const w = { as, ca, lean: L.arch === 'lean' ? 0.6 + R() * 0.4 : 0, stocky: L.arch === 'stocky' ? 0.4 + R() * 0.6 : 0 };
    for (const k of MORPHS.slice(4)) w[k] = r2() * (k === 'f_brow' ? 0.25 : 0.7);
    const st = (base === 'af' ? HAIR_AF : HAIR_ST)[L.st] || (base === 'af' ? ['crop', 1] : ['short', 1]);
    return { w, base, hair: st[0], scalp: st[1] };
  }
  MH.lookOf = (id, L) => mhLook(String(id), L);

  /* ---------- 👕 print (names, numbers, crest): one canvas per player, repainted only when the player changes ---------- */
  const PS = tier === 'high' ? 512 : tier === 'mid' ? 384 : 256, PSH = 1024;
  /* team crest: ONE shared texture per team (512 px, mipmapped, anisotropic) instead of ~40 px painted into every player's print */
  const crestTex = new Map();
  function teamCrest(img) { if (!img) return null; let t = crestTex.get(img); if (t) return t;
    const S = tier === 'low' ? 128 : tier === 'mid' ? 256 : 512, cv = cvs(S, S, () => {}), x = cv.getContext('2d'); x.clearRect(0, 0, S, S);
    try { const iw = img.naturalWidth || img.width || S, ih = img.naturalHeight || img.height || S, k = Math.min(S / iw, S / ih) * 0.94; x.drawImage(img, (S - iw * k) / 2, (S - ih * k) / 2, iw * k, ih * k); } catch (e) { return null; }
    t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; t.premultiplyAlpha = true; t.anisotropy = ANI; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; crestTex.set(img, t); return t; }
  const REG = { back: { s0: -0.2, s1: 0.2, z0: 1.08, z1: 1.62, u0: 0, u1: 1, v0: 0.4, v1: 1 }, front: { s0: -0.2, s1: 0.2, z0: 1.15, z1: 1.55, u0: 0, u1: 0.5, v0: 0, v1: 0.4 }, shorts: { s0: 0.03, s1: 0.23, z0: 0.74, z1: 0.94, u0: 0.5, u1: 1, v0: 0, v1: 0.4 } };
  const regT = (x, Rg, W, H) => { const a = (Rg.u1 - Rg.u0) / (Rg.s1 - Rg.s0) / 1000 * W, e = (Rg.u0 - Rg.s0 / (Rg.s1 - Rg.s0) * (Rg.u1 - Rg.u0)) * W, k = (Rg.v1 - Rg.v0) / (Rg.z1 - Rg.z0); x.setTransform(a, 0, 0, k / 1000 * H, e, (1 - Rg.v0 + Rg.z0 * k) * H); };
  const txt = (x, s, sMM, zMM, hMM, sp) => { x.font = `800 ${hMM * 1.25}px "Arial Narrow", Arial, Helvetica, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
    x.lineWidth = Math.max(5, hMM * (hMM < 100 ? 0.16 : 0.08)); x.strokeStyle = '#0b0f24'; x.strokeText(s, sMM, -zMM); x.fillStyle = '#ffffff'; x.fillText(s, sMM, -zMM); };
  function paintPrint(cv, name, num, crest) {
    const W = cv.width, H = cv.height, x = cv.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, W, H);
    regT(x, REG.back, W, H);
    if (name) { x.font = '800 78px "Arial Narrow", Arial, sans-serif'; const wd = x.measureText(name).width; x.save(); x.scale(Math.min(1, 330 / Math.max(1, wd)) * (wd < 200 ? 1.1 : 1), 1); txt(x, name, 0, 1530, 62); x.restore(); }
    if (num !== '') { x.save(); x.scale(0.82, 1); txt(x, num, 0, 1300, 250); x.restore(); }
    /* crest: drawn by the shader from the shared team texture (CREST_R) */
    regT(x, REG.shorts, W, H); if (num !== '') txt(x, num, 125, 815, 70);
    x.setTransform(1, 0, 0, 1, 0, 0); }
  let printBudget = 3;
  MH.frameStart = () => { printBudget = 3; };

  /* ---------- dress: kit colours, look, print ---------- */
  MH.dress = function (c, Tm, gk, id, num, L, nm) {
    const K = Tm.K, dk = Tm.key + (gk ? 'g' : 'o') + id + ':' + num + ':' + nm + ':' + (Tm.crestImg ? 1 : 0) + ':' + (c.lod.hero ? 1 : 0); if (c.dk === dk && !c.printWait) return;
    const first = c.dk !== dk; c.dk = dk;
    if (first) {
      const M = c.mh4 && c.mhId === id ? c.mh4 : (c.mhId = id, c.mh4 = mhLook(id, L));
      const hex = (h) => new THREE.Color(h), skin = new THREE.Color(SKINS[Math.min(SKINS.length - 1, L.si)]), mean = SKIN_MEAN[M.base];
      const tint = new THREE.Color().setRGB(clamp(skin.r * 255 / mean[0] * 1.05, 0.4, 2.2), clamp(skin.g * 255 / mean[1] * 1.05, 0.4, 2.2), clamp(skin.b * 255 / mean[2] * 1.05, 0.4, 2.2));
      /* convert the tone colour (sRGB) into a linear multiplier */
      const lin = (v) => Math.pow(v, 2.2), sh = SKINS[Math.min(SKINS.length - 1, L.si)], sv = [1, 3, 5].map(i => parseInt(sh.slice(i, i + 2), 16) / 255), tg = [0, 1, 2].map(i => (0.45 * mean[i] / 255 + 0.55 * sv[i])), lift = M.base === 'af' ? 1.12 : 1; tint.setRGB(clamp(lin(tg[0]) / lin(mean[0] / 255) * lift, 0.45, 1.8), clamp(lin(tg[1]) / lin(mean[1] / 255) * lift, 0.45, 1.8), clamp(lin(tg[2]) / lin(mean[2] / 255) * lift, 0.45, 1.8));
      const pw = 0.07, CIRC = 2 * Math.PI * 0.16, stripe = K.pat === 'stripes' || K.pat === 'pinstripes';
      for (const lod of Object.keys(c.mats)) { const m = c.mats[lod], u = m.userData.u;
        m.map = lod === 'hero' ? T.hskins[M.base] : T.skins[M.base];
        u.uTint.value.copy(tint); u.uHairC.value.set(L.st === 'bleach' ? L.tip : L.hair); u.uBeard.value = L.beard || 0; u.uIris.value.set(L.iris); u.uScalp.value = M.scalp; u.uErase.value = M.base === 'af' && !M.hair ? 1 : 0;
        u.uGK.value = gk ? 1 : 0; u.uGlove.value.set('#f1f5f9');
        if (gk) { u.uP1.value.set(Tm.g); u.uP2.value.set(Tm.g); u.uTrim.value.set('#111827'); u.uSlv.value.set(Tm.g); u.uSlvOn.value = 0; u.uPat.value = 0; u.uSho.value.set('#111827'); u.uSoc.value.set(Tm.g); u.uSocT.value.set('#111827'); }
        else { u.uP1.value.set(K.c1); u.uP2.value.set(K.c2); u.uTrim.value.set(K.col); u.uSlv.value.set(K.slv); u.uSlvOn.value = K.slv && K.slv.toLowerCase() !== String(K.c1).toLowerCase() ? 1 : 0;
          u.uPat.value = PATS[K.pat] || 0; u.uPatW.value = stripe ? CIRC / Math.max(2, Math.round(CIRC / pw)) : pw; u.uSho.value.set(K.sho); u.uSoc.value.set(K.soc); u.uSocT.value.set(K.c2 === K.soc ? K.c1 : K.c2); }
        u.uBoot.value.set(L.boot); u.uBoot2.value.set(L.boot2 === L.boot ? '#f8fafc' : L.boot2); }
      /* morphs: head, build, face */
      const inf = c.lod.match.morphTargetInfluences; MORPHS.forEach((k, i) => { inf[i] = M.w[k] || 0; });
      for (const lod of ['far', 'hero']) if (c.lod[lod]) { const a = c.lod[lod].morphTargetInfluences; for (let i = 0; i < a.length; i++) a[i] = lod === 'far' && i >= 4 ? 0 : inf[i]; }
      const hi = c.hair.morphTargetInfluences; for (let i = 0; i < hi.length; i++) hi[i] = inf[i];
      /* hair */
      const cs = T.cards[M.hair || 'none'] || T.cards.none; c.hair.geometry = cs.geo; c.hair.matrix.copy(cs.m); c.hair.material.map = cs.map; c.hair.material.color.set(L.st === 'bleach' ? L.tip : L.hair); c.hair.material.needsUpdate = true;
      if (c.hairH) { const hs = T.hcards[M.hair || 'none'] || T.hcards.none; c.hairH.geometry = hs.geo; c.hairH.matrix.copy(hs.m); c.hairH.material.map = hs.map; c.hairH.material.color.set(L.st === 'bleach' ? L.tip : L.hair); c.hairH.material.needsUpdate = true; }
      c.hgt = Math.min(1.92, L.h + (gk ? 0.04 : 0)) / MH_H; c.style = L; c.hstyle = M.hair || L.st;
      c.printWait = true; }
    /* print: at most 3 repaints per frame (no hitch when 22 players appear at once) */
    if (c.printWait && printBudget > 0) { printBudget--; c.printWait = false;
      if (!c.pcv) { c.pcv = cvs(PS, PS, () => {}); c.ptex = new THREE.CanvasTexture(c.pcv); c.ptex.colorSpace = THREE.SRGBColorSpace; c.ptex.flipY = false; c.ptex.premultiplyAlpha = true; c.ptex.anisotropy = ANI; }
      const numS = num == null || num === '' ? '' : String(Math.max(0, Math.min(99, Math.floor(+num) || 0)));
      paintPrint(c.pcv, nm, numS); c.ptex.needsUpdate = true;
      /* hero close-up (High, max 2 players): its own 1024 px print so names and numbers stay crisp full-screen */
      if (c.lod.hero && tier === 'high') { if (!c.pcvH) { c.pcvH = cvs(PSH, PSH, () => {}); c.ptexH = new THREE.CanvasTexture(c.pcvH); c.ptexH.colorSpace = THREE.SRGBColorSpace; c.ptexH.flipY = false; c.ptexH.premultiplyAlpha = true; c.ptexH.anisotropy = ANI; }
        paintPrint(c.pcvH, nm, numS); c.ptexH.needsUpdate = true; }
      const ct = gk ? null : teamCrest(Tm.crestImg);
      for (const [lod, m] of Object.entries(c.mats)) { const u = m.userData.u; u.uPrint.value = lod === 'hero' && c.ptexH ? c.ptexH : c.ptex; u.uCrest.value = ct; u.uCrestOn.value = ct ? 1 : 0; } }
  };

  /* ---------- one-shot moves (pass / shot / tackle) ---------- */
  MH.pre = function (c, o, dt, kickRise, slideRise) {
    c.noCloth = !!o.noCloth;
    if (o.mhClip) { if (!c.shot || c.shotName !== o.mhClip.name) MH.play(c, o.mhClip.name); c.shot.timeScale = 0; c.shot.time = o.mhClip.t; c.shotAge = 1; c.shot.setEffectiveWeight(1); c.shotW = 1; for (const k in c.act) c.act[k].setEffectiveWeight(0); return; }
    if (kickRise) MH.play(c, (o.kick || 0) > 0.8 ? 'Shoot' : 'Pass');
    if (slideRise) MH.play(c, 'Tackle');
    let w1 = 0; const s = c.shot;
    if (s) { const m = META[c.shotName] || {}, dur = m.dur || s.getClip().duration; c.shotT = s.time;
      const fin = Math.min(1, (c.shotAge += dt) / 0.06 + 0.35), out = clamp((dur - s.time) / 0.16, 0, 1); w1 = Math.min(fin, out);
      if (s.time >= dur - 1e-3 || w1 <= 0.001) { s.stop(); c.shot = null; w1 = 0; } else s.setEffectiveWeight(w1); }
    c.shotW = w1; if (w1 > 0) for (const k in c.act) c.act[k].setEffectiveWeight(c.act[k].getEffectiveWeight() * (1 - w1));
  };
  MH.play = function (c, name) { const a = c.one[name]; if (!a) return; if (c.shot && c.shot !== a) c.shot.stop();
    const m = META[name] || {}; a.reset(); a.time = m.contact != null ? Math.max(0, m.contact - 0.02) : 0; a.setEffectiveWeight(1); a.play(); c.shot = a; c.shotName = name; c.shotAge = 0; };

  /* ---------- after posing: cloth correction factors from the arm / knee angles ---------- */
  const _a = new V3(), _b = new V3(), _d = new V3(), _q = new Q();
  MH.post = function (c) {
    if (MH.clothFix === false) return;
    /* far away (or far version): the fix can't be seen, skip the work */
    if (c.cur === 'far' || (c.dist || 0) > 26) { if (c.cf.lengthSq()) { c.cf.set(0, 0, 0, 0); for (const m of Object.values(c.mats)) m.userData.u.uClothF.value.set(0, 0, 0, 0); } return; }
    _q.copy(c.root.quaternion); const down = _d.set(0, -1, 0).applyQuaternion(_q);
    const ang = (b1, b2) => { c.bones[b2].updateWorldMatrix(true, false); _b.setFromMatrixPosition(c.bones[b2].matrixWorld); _a.setFromMatrixPosition(c.bones[b1].matrixWorld); return Math.acos(clamp(_b.sub(_a).normalize().dot(down), -1, 1)); };
    c.cf.set(sst(1.4, 2.3, ang('upperarm_l', 'lowerarm_l')), sst(1.4, 2.3, ang('upperarm_r', 'lowerarm_r')), sst(0.45, 1.0, ang('thigh_l', 'calf_l')), sst(0.45, 1.0, ang('thigh_r', 'calf_r'))); if (c.noCloth) c.cf.set(0, 0, 0, 0);
    for (const m of Object.values(c.mats)) m.userData.u.uClothF.value.copy(c.cf);
  };

  /* ---------- version per phone tier + distance ---------- */
  /* hero close-ups for the 2 nearest players only (a line-up of 22 at close range stays light) */
  let heroN = -1; const heroSet = new Set();
  MH.lod = function (ch, Qlv) {
    if (heroN !== F.n) { heroN = F.n; heroSet.clear(); MH.chars.filter(c => used.has(c.root) && (c.dist || 0) < 6.5).sort((a, b) => a.dist - b.dist).slice(0, 2).forEach(c => heroSet.add(c)); }
    const d = ch.dist || 0, strug = Qlv >= 2;
    /* Low: far version always. Mid: match version where it can be seen (< 24 m), far version behind that. High: hero < 6.5 m, match < 40 m */
    let want = tier === 'low' ? 'far' : d > (strug ? 16 : tier === 'high' ? 40 : 24) ? 'far' : 'match';
    if (tier === 'high' && !strug && d < 6.5 && MH.heroOk && (heroSet.has(ch) || ch.port)) { heroMesh(ch); if (ch.lod.hero) want = 'hero'; }
    for (const k in ch.lod) ch.lod[k].visible = k === want;
    ch.hair.visible = want === 'match' || (want === 'far' && d < 9); if (ch.hairH) ch.hairH.visible = want === 'hero'; if (want === 'hero') ch.hair.visible = false;
    ch.cur = want;
  };

  /* ---------- Low phones: one soft blob shadow per player (all in one draw) ---------- */
  let BLOB = null;
  MH.blobs = function () {
    if (tier !== 'low') return;
    if (!BLOB) { BLOB = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: blobTex(), transparent: true, depthWrite: false, opacity: 0.5, polygonOffset: true, polygonOffsetFactor: -3 }), MAXC); BLOB.frustumCulled = false; scene.add(BLOB); }
    const m4 = new THREE.Matrix4(), q = new Q(), s = new V3(), p = new V3(); let n = 0;
    for (const ch of MH.chars) { if (!used.has(ch.root) || n >= MAXC) continue; const r = 0.75 * (ch.root.scale.x / SC), y = ch.root.position.y; m4.compose(p.set(ch.root.position.x, 0.015, ch.root.position.z), q, s.set(r * (1 + y * 0.3), 1, r * (1 + y * 0.3))); BLOB.setMatrixAt(n++, m4); }
    BLOB.count = n; BLOB.instanceMatrix.needsUpdate = true; if (n) used.add(BLOB);
  };
  MH.stats = () => { let draws = 0, tris = 0; for (const c of MH.chars) { if (!used.has(c.root)) continue; for (const k in c.lod) if (c.lod[k].visible) { draws++; tris += c.lod[k].geometry.index.count / 3; } for (const h of [c.hair, c.hairH]) if (h && h.visible) { draws++; tris += h.geometry.index.count / 3; } }
    return { players: MH.chars.filter(c => used.has(c.root)).length, draws, tris, tier, hero: MH.heroOk, lods: MH.chars.filter(c => used.has(c.root)).map(c => c.cur) }; };
  return MH;
}
