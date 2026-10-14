import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, updateDoc, increment, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBDWeHQpmCVfJVXj5Dmu_ZuGmKvlqI4wek",
    authDomain: "sinlessgg.firebaseapp.com",
    projectId: "sinlessgg",
    storageBucket: "sinlessgg.firebasestorage.app",
    messagingSenderId: "774543139920",
    appId: "1:774543139920:web:b17fb4caa96a555dc81d55"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

window.myGGCoins = parseInt(localStorage.getItem('sinless_gg_coins') || '100');
window.fypposts = [];

window.showToast = function(msg) {
    const banner = document.getElementById('toastBanner');
    if(!banner) return;
    banner.innerText = msg;
    banner.style.opacity = '1';
    banner.style.pointerEvents = 'auto';
    setTimeout(() => {
        banner.style.opacity = '0';
        banner.style.pointerEvents = 'none';
    }, 3000);
};

window.openSideDrawer = function() {
    document.getElementById('sideDrawerOverlay').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('sideDrawerPanel').classList.remove('-translate-x-full');
    }, 10);
};

window.closeSideDrawer = function() {
    document.getElementById('sideDrawerPanel').classList.add('-translate-x-full');
    setTimeout(() => {
        document.getElementById('sideDrawerOverlay').classList.add('hidden');
    }, 300);
};

window.switchView = function(viewName) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    const target = document.getElementById('view-' + viewName);
    if(target) target.classList.remove('hidden');

    if(viewName === 'trending') renderTrendingHashtags();
};

window.renderTrendingHashtags = function() {
    const list = document.getElementById('dynamicTrendingTopicsList');
    if(!list) return;

    const hashtags = [
        { tag: "#SinlessSuperLeague", posts: "4,320 posts" },
        { tag: "#FCMobileGhana", posts: "2,850 posts" },
        { tag: "#EAFCMobile26", posts: "1,940 posts" },
        { tag: "#AccraEsports", posts: "1,120 posts" }
    ];

    list.innerHTML = hashtags.map(h => `
        <div class="p-3 bg-gg-950 rounded-xl border border-cyan-500/10 flex justify-between items-center cursor-pointer hover:border-cyan-400 transition">
            <div>
                <h4 class="text-xs font-black text-white">${h.tag}</h4>
                <p class="text-[9px] text-cyan-400">${h.posts}</p>
            </div>
            <i class="fa-solid fa-chevron-right text-gray-500 text-xs"></i>
        </div>
    `).join('');
};

window.tipCreator = async function(postId, creatorUsername) {
    const tipAmount = prompt(`How many GG Coins would you like to give as a Gamer Tip to @${creatorUsername}? (Available Balance: ${window.myGGCoins} GG Coins):`, "10");
    const amount = parseInt(tipAmount);

    if (isNaN(amount) || amount <= 0) return;

    if (window.myGGCoins < amount) {
        showToast("⚠️ Insufficient GG Coins!");
        return;
    }

    window.myGGCoins -= amount;
    localStorage.setItem('sinless_gg_coins', window.myGGCoins);
    document.getElementById('drawerCoinBalanceText').innerText = `${window.myGGCoins} GG Coins`;

    showToast(`🪙 Gamer Tip sent! ${amount} GG Coins sent to @${creatorUsername}!`);
};

// Listen to Firestore Posts
const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(30));
onSnapshot(q, (snapshot) => {
    let cloudPosts = [];
    snapshot.forEach((docSnap) => {
        cloudPosts.push({ id: docSnap.id, docId: docSnap.id, ...docSnap.data() });
    });
    window.fypposts = cloudPosts;
    renderFypFeed();
});

function renderFypFeed() {
    const container = document.getElementById('fypFeedContainer');
    if(!container) return;
    container.innerHTML = '';

    if (window.fypposts.length === 0) {
        container.innerHTML = `<div class="glass-panel p-4 rounded-2xl text-center text-xs text-gray-400">No posts in feed yet!</div>`;
        return;
    }

    window.fypposts.forEach((post) => {
        container.innerHTML += `
            <div class="glass-panel rounded-2xl p-4 space-y-3 shadow-xl relative">
                <div class="flex items-center justify-between">
                    <span class="font-bold text-xs text-white">@${post.user}</span>
                    <span class="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-extrabold uppercase">${post.game || 'GAMING'}</span>
                </div>

                <p class="text-xs text-gray-200 leading-relaxed">${post.caption || ''}</p>

                <div class="flex items-center justify-between pt-2 border-t border-cyan-500/10 text-xs">
                    <button onclick="tipCreator('${post.id}', '${post.user}')" class="text-amber-400 font-extrabold hover:text-amber-300 transition">
                        <i class="fa-solid fa-coins"></i> Gamer Tip
                    </button>
                </div>
            </div>
        `;
    });
}
