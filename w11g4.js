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
  D.comp = M ? (M.cup ? CC.CUP_NAME[M.cup] + ' · ' + (M.rn || '') : 'League · Division ' + M.t + ' · Matchday ' + M.md) : live.kind === 'boot' ? '🏕️ Boot Camp · Match ' + ((live.boot || 0) + 1) : '🤝 Friendly';
  live._dr = D; return D;
};
const crestHtml = (D, i, s) => D.cr[i] ? W.crestSvg(D.cr[i], D.sh[i], s) : D.ci[i] != null ? badge(W.club(D.ci[i]), D.sh[i]).replace('class="w11crest"', `class="w11crest" style="width:${s}px;height:${Math.round(s * 52 / 46)}px"`) : '';
const REF_COLS = ['#111827', '#facc15', '#a3e635', '#f97316', '#e2e8f0', '#38bdf8', '#ff2d95'];
const cdist = (a, b) => { const A = rgb(a), B = rgb(b); return Math.abs(A[0] - B[0]) + Math.abs(A[1] - B[1]) + Math.abs(A[2] - B[2]); };
W.refColor = (D) => { const avoid = [D.k[0].c1, D.k[1].c1, D.k[0].sho, D.k[1].sho, D.gk[0], D.gk[1]].filter(Boolean); let best = REF_COLS[0], bs = -1; for (const c of REF_COLS) { const sc = Math.min(...avoid.map(a => cdist(a, c))); if (sc > bs) { bs = sc; best = c; } } return best; };
const refOf = (D) => { if (!D.RT || D.RTbe !== G3.be) { const c = W.refColor(D); D.RT = G3.team({ c1: c, c2: '#0b0f24', pat: 'plain', col: '#0b0f24', slv: c, sho: '#0b0f24', soc: '#0b0f24' }, c); D.RTbe = G3.be; } return D.RT; };
const drawRef = (D, x, y) => { if (x == null) return; G3.fig(refOf(D), false, 'ref', PX(x), PZ(y), { num: '', run: 1 }); };
W.cerDur = (live) => live && live.kind === 'league' ? { open: 45, close: 15 } : { open: 12, close: 10 };
const teamsOf = (live) => { const D = W.dress(live); if (!D.T || D.Tbe !== G3.be) { D.T = [G3.team(D.k[0], D.gk[0], D.cr[0], D.sh[0]), G3.team(D.k[1], D.gk[1], D.cr[1], D.sh[1])]; D.Tbe = G3.be; } return D; };
/* draw everybody from an engine-like list: [{ side, gk, x, y, id }] (engine metres) */
const drawPlayers = (D, list, st, dt, opt) => { for (const p of list) { const x = PX(p.x), z = PZ(p.y), o = opt ? opt(p) : null, face = o && o.face != null ? o.face : null, a = anim(st, p.id, x, z, dt, face);
  G3.fig(D.T[p.side], p.gk, p.id, x, z, { phase: a.phase, run: o && o.run != null ? o.run : a.run, yaw: o && o.yaw != null ? o.yaw : a.yaw, jump: o && o.jump, arms: o && o.arms, lean: o && o.lean, kick: o && o.kick, dive: o && o.dive, num: p.num, throwIn: o && o.throwIn, wall: o && o.wall, slide: o && o.slide, header: o && o.header, catch: o && o.catch }); } };
/* what each player is doing right now in the live engine: kicking, diving, celebrating */
W.liveOpts = function (m) {
  const b = m.ball, f = b.fl, g = m.ev.length && m.ev[m.ev.length - 1], cel = m.hug >= 0 ? m.hug : g && g.k === 'goal' && m.pauseT > 0 && m.tick - g.tick < 60 ? g.side : -1;
  /* recent moments (last ~0.8 s): slide tackles, headers, keeper catches */
  const rec = {}; for (let i = m.ev.length - 1; i >= 0 && i > m.ev.length - 12; i--) { const e = m.ev[i]; if (e.tick == null || m.tick - e.tick > 16) break; if (e.pid != null && !rec[e.pid]) rec[e.pid] = e; }
  const sp = m.sp, wall = sp && sp.wall ? new Set(sp.wall.map(p => p.id)) : null, gxOf = (s) => s === 0 ? 105 : 0;
  return (p) => { if (f && f.from && f.from.id === p.id && f.k < 0.35) return f.kind === 'throw' ? { throwIn: 1 - f.k / 0.35 } : f.header ? { header: 1 } : { kick: (f.kind === 'shot' ? 1 : 0.55) * (1 - f.k / 0.35) };
    if (f && f.kind === 'shot' && f.gk && f.gk.id === p.id && f.k > 0.15) { const d = clamp((f.y1 - p.y) / 3.2, -1, 1); return { dive: d * Math.min(1, (f.k - 0.15) * 2.5) * (Math.abs(f.y1 - p.y) > 0.8 ? 1 : 0.3), run: 0 }; }
    if (wall && wall.has(p.id)) return { wall: 1, run: 0, face: Math.atan2(sp.x - p.x, sp.y - p.y) };
    if (sp && sp.taker && sp.taker.id === p.id) { if (sp.kind === 'throw') return { throwIn: 0.01, run: 0 }; const gx = gxOf(p.side); return { face: Math.atan2(gx - p.x, 34 - p.y) }; }
    const e = rec[p.id];
    if (e && (e.k === 'tackle' || e.k === 'foul') && e.sl) return { slide: 1 };
    if (e && (e.k === 'header' || e.header)) return { header: 1, jump: 0.4 };
    if (e && e.k === 'save' && e.catch && p.role === 'GK') return { catch: 1, run: 0 };
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
W.W3D_V = 2;
W.w3d = { st: 0 };
W.w3dLoad = function () {
  if (W.w3d.st || !G3.ok() || typeof window === 'undefined') return;
  try { if (localStorage.getItem('w11_3dq') === 'lite') return; const c = document.createElement('canvas'); if (!c.getContext('webgl2')) return; } catch (e) { return; }
  if (navigator.deviceMemory && navigator.deviceMemory < 2) return;
  W.w3d.st = 1; const base = new URL('./', document.baseURI).href;
  import(base + 'w3d.js?v=' + W.W3D_V).then(() => window.W3D.load({ G3, base, v: W.W3D_V, weak: W.weak, hash, hx, kitN: W.kitN, crestSvg: W.crestSvg, numOf: (id) => { const p = W.player(id, W.S); return p ? p.num : null; } }))
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
  setTimeout(() => { if (W.cine.cur === c) W.cine.cur = null; if (G3.view && G3.view.cine) G3.stop(G3.view); if (el) el.remove(); if (W.v3.on && document.getElementById('w11l3')) W.v3set(true); }, 620);
};
W.helpL = (function (b) { return function () { b.apply(this, arguments); const el = document.querySelector('#w11b .card'); if (!el) return;
  el.insertAdjacentHTML('beforeend', `<p style="margin-top:6px">🎬 <b>Big moments live in 3D</b>: just before a goal or a big save, the radar turns into a full-screen 3D camera: the run-up, the shot, the net, the celebration. Then it goes back to the radar when play restarts. It is the live match itself, so you never miss anything, and your shout buttons stay on screen.</p>`); }; })(W.helpL);
/* the 2D radar refits when the phone turns or the window changes size */
W.g4match = (function (b) { return function () { b.apply(this, arguments); const box = document.querySelector('#w11 .w11pitch'); if (!box || box._ro || typeof ResizeObserver === 'undefined') return; box._ro = new ResizeObserver(() => { if (W._pitch && document.body.contains(box)) W._pitch.size(); }); box._ro.observe(box); }; })(W.g4match);
