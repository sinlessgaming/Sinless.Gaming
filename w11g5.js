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
