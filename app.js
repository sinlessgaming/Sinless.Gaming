window.myGGCoins = parseInt(localStorage.getItem('sinless_gg_coins') || '100');

window.showToast = function(msg) {
    const banner = document.getElementById('toastBanner');
    if (!banner) return;
    banner.innerText = msg;
    banner.style.opacity = '1';
    banner.style.pointerEvents = 'auto';
    setTimeout(() => {
        banner.style.opacity = '0';
        banner.style.pointerEvents = 'none';
    }, 3000);
};

window.openSideDrawer = function() {
    document.getElementById('sideDrawerOverlay')?.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('sideDrawerPanel')?.classList.remove('-translate-x-full');
    }, 10);
};

window.closeSideDrawer = function() {
    document.getElementById('sideDrawerPanel')?.classList.add('-translate-x-full');
    setTimeout(() => {
        document.getElementById('sideDrawerOverlay')?.classList.add('hidden');
    }, 300);
};

window.switchView = function(viewName) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));

    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.remove('hidden');

    ['fyp', 'trending', 'tournaments', 'clans', 'chat'].forEach(name => {
        const btn = document.getElementById(`nav-${name}`);
        if (btn) {
            btn.className = (name === viewName)
                ? 'flex-1 py-2 px-3 text-[10px] rounded-xl bg-magenta text-white font-extrabold transition shadow-lg whitespace-nowrap'
                : 'flex-1 py-2 px-3 text-[10px] rounded-xl text-gray-400 font-bold transition hover:text-white whitespace-nowrap';
        }
    });

    if (viewName === 'trending') renderTrending();
    if (viewName === 'tournaments') renderTournaments();
    if (viewName === 'clans') renderSquads();
    if (viewName === 'chat') renderLobbies();
};

window.fypposts = [
    { id: '1', user: 'SinlessGaming', game: 'FC MOBILE', caption: '🏆 SINLESS SUPER LEAGUE SEASON 8 IS LIVE!' },
    { id: '2', user: 'AceKhyd', game: 'EA SPORTS FC', caption: 'Who is ready for the tournament this weekend?' }
];

function renderFeed() {
    const container = document.getElementById('fypFeedContainer');
    if (!container) return;
    container.innerHTML = window.fypposts.map(p => `
        <div class="glass-panel p-4 rounded-2xl space-y-2 border border-cyan-500/20">
            <div class="flex justify-between items-center">
                <span class="font-extrabold text-xs text-white">@${p.user}</span>
                <span class="text-[9px] text-cyan-400 font-bold">${p.game}</span>
            </div>
            <p class="text-xs text-gray-200">${p.caption}</p>
        </div>
    `).join('');
}

function renderTrending() {
    const container = document.getElementById('dynamicTrendingTopicsList');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-panel p-3 bg-gg-900 rounded-xl flex justify-between">
            <h4 class="text-xs font-bold text-white">#SinlessSuperLeague</h4>
            <span class="text-[9px] text-cyan-400">4,320 posts</span>
        </div>`;
}

function renderTournaments() {
    const container = document.getElementById('tournamentsDedicatedContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-panel p-4 rounded-2xl border border-cyan-500/20 space-y-1">
            <h3 class="font-black text-white text-sm">SINLESS SUPER LEAGUE - SEASON 8</h3>
            <p class="text-[10px] text-cyan-400">Game: EA SPORTS FC MOBILE • Prize: 10,000 GG Coins</p>
        </div>`;
}

function renderSquads() {
    const container = document.getElementById('clansContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-panel p-4 rounded-2xl border border-cyan-500/20">
            <h3 class="font-black text-white text-sm">Sinless Esports Elite</h3>
            <p class="text-[10px] text-gray-400">Official Accra tournament competitive squad.</p>
        </div>`;
}

function renderLobbies() {
    const container = document.getElementById('chatLobbiesContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-panel p-4 rounded-2xl border border-cyan-500/20">
            <h3 class="font-black text-white text-sm">Global Matchmaking Lobby</h3>
            <p class="text-[10px] text-cyan-400">Challenge local players live.</p>
        </div>`;
}

window.openUniversalCreateModal = () => document.getElementById('universalCreateModal')?.classList.remove('hidden');
window.closeUniversalCreateModal = () => document.getElementById('universalCreateModal')?.classList.add('hidden');

window.submitNewPost = function() {
    const input = document.getElementById('postCaptionInput');
    const caption = input ? input.value.trim() : '';
    if (!caption) return window.showToast('⚠️ Please write something first!');

    window.fypposts.unshift({ id: Date.now().toString(), user: 'AceKhyd', game: 'FC MOBILE', caption });
    input.value = '';
    window.closeUniversalCreateModal();
    renderFeed();
    window.showToast('🚀 Post published!');
};

document.addEventListener('DOMContentLoaded', () => {
    renderFeed();
});
