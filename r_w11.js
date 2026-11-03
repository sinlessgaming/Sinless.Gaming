
// ======================================================================
// G1 · ⚽ 11 Wonders entry (the game itself lives in w11.js and loads only when opened)
// ======================================================================
window.SG_BUILD = 69;
window.open11W = async function() {
    if (window.needSignIn && window.needSignIn('play 11 Wonders')) return;
    try { if (!window.W11 || !window.W11.open) await new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'w11.js?v=8'; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); window.W11.open(); }
    catch (e) { showToast('⚠️ Could not open 11 Wonders. Check your internet.'); }
};
window.sg11Card = function() {
    const v = document.getElementById('view-play'); if (!v || v.querySelector('[data-w11card]')) return;
    v.insertAdjacentHTML('afterbegin', `<button data-w11card onclick="window.open11W()" class="w-full text-left rounded-2xl p-4 relative overflow-hidden" style="background:linear-gradient(135deg,#0b3a2a,#0c1228 55%,#2a0a2a);border:1px solid rgba(34,211,238,.45);box-shadow:0 0 22px rgba(168,85,247,.25)">
        <span style="position:absolute;right:-10px;top:-6px;font-size:84px;opacity:.18">⚽</span>
        <span class="text-[10px] font-black tracking-widest" style="color:#67e8f9">NEW · SCORE MANAGER</span>
        <span class="block text-xl font-black text-white mt-1">11 WONDERS</span>
        <span class="block text-xs text-gray-300 mt-1">Take over a club mid-season, pick your tactics and shout from the touchline in live 4-minute matches.</span>
        <span class="inline-block mt-3 px-4 py-2 rounded-xl text-xs font-black text-slate-950" style="background:linear-gradient(90deg,#22d3ee,#a855f7,#ff2d95)">▶ Play now</span></button>`);
};
setTimeout(window.sg11Card, 0); document.addEventListener('DOMContentLoaded', window.sg11Card); setTimeout(window.sg11Card, 1500);
window.switchView = (function(b) { return function(v, ...r) { const o = b.call(this, v, ...r); if (v === 'play') setTimeout(window.sg11Card, 30); return o; }; })(window.switchView);
window.addEventListener('hashchange', () => { if (location.hash === '#11wonders') window.open11W(); });
setTimeout(() => { if (location.hash === '#11wonders') window.open11W(); }, 3000);
