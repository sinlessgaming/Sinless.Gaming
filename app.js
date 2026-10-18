// ======================================================================
// SINLESS GG - APP LOGIC (MODULE VERSION - PART 1)
// ======================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, doc, deleteDoc, updateDoc, 
    arrayUnion, arrayRemove, increment, query, orderBy, limit, 
    onSnapshot, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getMessaging, getToken, onMessage 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

// GG Coins Local Initialization
window.myGGCoins = parseInt(localStorage.getItem('sinless_gg_coins') || '100');

window.updateCoinDisplay = function() {
    const coinBadge = document.getElementById('headerCoinBalanceText');
    const drawerBadge = document.getElementById('drawerCoinBadge');
    if (coinBadge) {
        coinBadge.innerText = `${window.myGGCoins} GG Coins`;
    }
    if (drawerBadge) {
        drawerBadge.innerText = window.myGGCoins;
    }
    localStorage.setItem('sinless_gg_coins', window.myGGCoins);
};

window.toggleDrawer = function(open) {
    const sideDrawer = document.getElementById('sideDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (open) {
        if (sideDrawer) sideDrawer.classList.add('active');
        if (drawerOverlay) drawerOverlay.classList.add('active');
    } else {
        if (sideDrawer) sideDrawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
    }
};

window.showToast = function(msg) {
    const toast = document.getElementById('toastBanner');
    if(toast) {
        toast.innerText = msg;
        toast.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => { toast.classList.add('opacity-0', 'pointer-events-none'); }, 3000);
    }
};

window.tipCreator = async function(postId, creatorUsername) {
    const tipAmount = prompt(`How many GG Coins would you like to tip @${creatorUsername}? (Available Balance: ${window.myGGCoins} coins):`, "10");
    const amount = parseInt(tipAmount);

    if (isNaN(amount) || amount <= 0) return;

    if (window.myGGCoins < amount) {
        showToast("⚠️ Insufficient GG Coins! Top up your wallet first.");
        return;
    }

    window.myGGCoins -= amount;
    window.updateCoinDisplay();

    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
    if (post) {
        post.tipsTotal = (post.tipsTotal || 0) + amount;
        if (window.renderFypFeed) window.renderFypFeed();
    }

    showToast(`🪙 Successfully tipped ${amount} GG Coins to @${creatorUsername}!`);

    const targetId = post ? (post.docId || post.id) : postId;
    if (window.db && targetId && !String(targetId).startsWith('local_')) {
        try {
            const postRef = doc(window.db, "posts", targetId);
            await updateDoc(postRef, { tipsTotal: increment(amount) });
        } catch (e) { console.error("Cloud tip update error:", e); }
    }
};

window.setupPushNotifications = async function() {
    if (!window.messaging) {
        showToast("Push notifications not supported on this device.");
        return;
    }
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(window.messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE' }).catch(() => null);
            if (token) {
                showToast("🔔 Push Notifications Enabled!");
                if (window.currentUser && window.db) {
                    await updateDoc(doc(window.db, "users", window.currentUser.uid), { fcmToken: token });
                }
            } else {
                showToast("🔔 Notifications Permission Granted!");
            }
        } else {
            showToast("⚠️ Notification permission denied.");
        }
    } catch (err) {
        console.error("FCM Token Error:", err);
    }
};

if (window.messaging) {
    onMessage(window.messaging, (payload) => {
        showToast(`💬 ${payload.notification?.title || 'New Alert'}: ${payload.notification?.body || ''}`);
    });
}

window.loginWithGoogle = async function() {
    try {
        const result = await signInWithPopup(window.auth, window.googleProvider);
        const user = result.user;
        showToast(`Welcome, ${user.displayName || 'Gamer'}!`);
        window.closeAccountModal();
    } catch (error) {
        console.error("Auth error:", error);
        showToast("Sign-in failed. Please try again.");
    }
};

window.logoutUser = async function() {
    try {
        await signOut(window.auth);
        showToast("Signed out successfully.");
        window.closeAccountModal();
    } catch (error) {
        console.error("Sign-out error:", error);
    }
};

if (window.auth) {
    onAuthStateChanged(window.auth, (user) => {
        const authModalBtn = document.getElementById('googleAuthBtn');
        const authModalStatus = document.getElementById('accountModalStatusText');

        if (user) {
            const displayName = user.displayName || user.email.split('@')[0];
            window.myUsername = `@${displayName.replace(/\s+/g, '')}`;
            window.myDisplayName = displayName;
            window.currentUser = user;

            const headerTag = document.getElementById('headerUserTag');
            if (headerTag) headerTag.innerText = window.myUsername;

            if (authModalStatus) authModalStatus.innerText = `Logged in as ${displayName}`;
            if (authModalBtn) {
                authModalBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket text-red-500 text-sm"></i><span>Sign Out</span>`;
                authModalBtn.onclick = window.logoutUser;
            }
        } else {
            window.myUsername = '@SinlessGaming';
            window.myDisplayName = 'Sinless Gaming';
            window.currentUser = null;

            const headerTag = document.getElementById('headerUserTag');
            if (headerTag) headerTag.innerText = '@SinlessGaming';

            if (authModalStatus) authModalStatus.innerText = 'Connect with your Google account to post under your real Gamertag.';
            if (authModalBtn) {
                authModalBtn.innerHTML = `<i class="fa-brands fa-google text-red-500 text-sm"></i><span>Continue with Google Cloud</span>`;
                authModalBtn.onclick = window.loginWithGoogle;
            }
        }
        if(window.renderClansList) window.renderClansList();
    });
}

function openPostDB() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("SinlessPostDB", 2);
        request.onupgradeneeded = (e) => {
            let db = e.target.result;
            if (!db.objectStoreNames.contains("local_posts")) {
                db.createObjectStore("local_posts", { keyPath: "id", autoIncrement: false });
            }
            if (!db.objectStoreNames.contains("local_stories")) {
                db.createObjectStore("local_stories", { keyPath: "id", autoIncrement: false });
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e);
    });
}

async function savePostToIndexedDB(post) {
    try {
        let db = await openPostDB();
        let tx = db.transaction("local_posts", "readwrite");
        let store = tx.objectStore("local_posts");
        store.put(post);
    } catch(e) { console.error("IndexedDB save failed:", e); }
}

async function removePostFromIndexedDB(id) {
    try {
        let db = await openPostDB();
        let tx = db.transaction("local_posts", "readwrite");
        let store = tx.objectStore("local_posts");
        store.delete(id);
    } catch(e) { console.error("IndexedDB delete failed:", e); }
}

async function saveStoryToIndexedDB(story) {
    try {
        let db = await openPostDB();
        let tx = db.transaction("local_stories", "readwrite");
        let store = tx.objectStore("local_stories");
        store.put(story);
    } catch(e) { console.error("IndexedDB story save failed:", e); }
}

window.loadLocalPostsFromDB = async function() {
    try {
        let db = await openPostDB();
        let tx = db.transaction("local_posts", "readonly");
        let store = tx.objectStore("local_posts");
        let request = store.getAll();
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => resolve([]);
        });
    } catch(e) { return []; }
};

window.loadLocalStoriesFromDB = async function() {
    try {
        let db = await openPostDB();
        let tx = db.transaction("local_stories", "readonly");
        let store = tx.objectStore("local_stories");
        let request = store.getAll();
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => resolve([]);
        });
    } catch(e) { return []; }
};

window.submitUniversalPost = async function() {
    const publishBtn = document.getElementById('publishPostBtn');
    let text = document.getElementById('postTextContent').value.trim();
    let cat = document.getElementById('postCategorySelect').value;
    let audioTrack = window.selectedAudioTrack || null;
    let mediaList = (window.uploadedMediaBlobs || []).map(m => ({ type: m.type, url: m.url }));

    if(!text && mediaList.length === 0) {
        showToast("⚠️ Write a caption or select media to post!");
        return;
    }

    if (publishBtn) {
        publishBtn.disabled = true;
        publishBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Publishing...`;
    }

    const meClean = (window.myUsername || '@SinlessGaming').replace('@','');
    const isVerifiedUser = meClean.toLowerCase() === 'sinlessgaming';

    let postPayload = {
        id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        user: meClean,
        displayName: window.myDisplayName || 'Sinless Gaming',
        uid: window.currentUser ? window.currentUser.uid : 'guest',
        verified: isVerifiedUser,
        game: cat,
        caption: text,
        mediaList: mediaList,
        audioTrack: audioTrack,
        ggsCount: 0,
        ggsBy: [],
        tipsTotal: 0,
        viewsCount: 1,
        commentsCount: 0,
        createdAt: new Date().toISOString()
    };

    try {
        if(window.db && typeof addDoc === 'function' && typeof collection === 'function') {
            const docRef = await addDoc(collection(window.db, "posts"), {
                ...postPayload,
                createdAt: serverTimestamp()
            });
            postPayload.id = docRef.id;
            postPayload.docId = docRef.id;
            showToast("Published to Cloud Feed!");
        } else {
            await publishLocallyFallback(postPayload);
        }
        resetPostForm();
    } catch(e) {
        console.error("Firestore Error:", e);
        showToast("Cloud sync failed. Saving locally...");
        await publishLocallyFallback(postPayload);
    } finally {
        if (publishBtn) {
            publishBtn.disabled = false;
            publishBtn.innerHTML = `🚀 Publish Post with Media`;
        }
    }
};

async function publishLocallyFallback(payload) {
    if(!window.fypposts) window.fypposts = [];
    payload.isLocalFallback = true;
    window.fypposts.unshift(payload);
    await savePostToIndexedDB(payload);
    if(window.renderFypFeed) window.renderFypFeed();
    if(window.renderLadder) window.renderLadder();
    resetPostForm();
    showToast("Published to Feed!");
}

function resetPostForm() {
    document.getElementById('postTextContent').value = '';
    window.uploadedMediaBlobs = [];
    window.selectedAudioTrack = null;
    document.getElementById('mediaFileInput').value = '';
    document.getElementById('mediaPreviewThumbnails').innerHTML = '';
    document.getElementById('mediaCountIndicator').innerText = '0 / 10 selected';
    document.getElementById('selectedSoundLabel').innerText = '🎵 Choose Background Music';
    if(window.stopAudioPreview) window.stopAudioPreview();
    window.closeCreatePostModal();
}

window.activeDeletePostId = null;
window.deletePost = function(postId) {
    window.activeDeletePostId = postId;
    document.getElementById('deletePostModal').classList.remove('hidden');
};

window.closeDeletePostModal = function() {
    document.getElementById('deletePostModal').classList.add('hidden');
    window.activeDeletePostId = null;
};

window.confirmDeletePost = async function() {
    const postId = window.activeDeletePostId;
    if (!postId) return;

    window.fypposts = (window.fypposts || []).filter(p => p.id !== postId && p.docId !== postId);
    if(window.renderFypFeed) window.renderFypFeed();
    window.closeDeletePostModal();

    try {
        await removePostFromIndexedDB(postId);
        if (window.db && !String(postId).startsWith('local_')) {
            await deleteDoc(doc(window.db, "posts", postId));
        }
        showToast("Post deleted successfully!");
    } catch(e) {
        console.error("Delete post error:", e);
        showToast("Post removed.");
    }
};

window.editingPostId = null;
window.openEditPostModal = function(postId) {
    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
    if (!post) return;

    window.editingPostId = postId;
    document.getElementById('editPostCaptionInput').value = post.caption || '';
    document.getElementById('editPostCategorySelect').value = post.game || 'FOOTBALL';
    document.getElementById('editPostModal').classList.remove('hidden');
};

window.closeEditPostModal = function() {
    document.getElementById('editPostModal').classList.add('hidden');
    window.editingPostId = null;
};

window.submitEditPost = async function() {
    const postId = window.editingPostId;
    if (!postId) return;

    const newCaption = document.getElementById('editPostCaptionInput').value.trim();
    const newGame = document.getElementById('editPostCategorySelect').value;

    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
    if (post) {
        post.caption = newCaption;
        post.game = newGame;
    }

    if(window.renderFypFeed) window.renderFypFeed();
    window.closeEditPostModal();

    if (window.db && !String(postId).startsWith('local_')) {
        try {
            await updateDoc(doc(window.db, "posts", postId), {
                caption: newCaption,
                game: newGame
            });
        } catch(e) { console.error("Edit post cloud sync error:", e); }
    }
    showToast("Post updated!");
};

window.shareContent = function(title, text, url) {
    const shareData = {
        title: title || 'Sinless GG Gaming',
        text: text || 'Check this out on Sinless GG!',
        url: url || window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch((err) => console.log('Share canceled:', err));
    } else {
        navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        showToast("📋 Link copied to clipboard!");
    }
};

window.toggleGGPost = async function(postId) {
    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId || String(p.id) === String(postId));
    if (!post) {
        showToast("⚠️ Unable to interact with this post.");
        return;
    }

    const uid = window.currentUser ? window.currentUser.uid : 'guest_user';
    if (!post.ggsBy) post.ggsBy = [];
    const hasGGed = post.ggsBy.includes(uid);

    if (hasGGed) {
        post.ggsCount = Math.max(0, (post.ggsCount || 1) - 1);
        post.ggsBy = post.ggsBy.filter(id => id !== uid);
    } else {
        post.ggsCount = (post.ggsCount || 0) + 1;
        post.ggsBy.push(uid);
        if(window.boostCategoryInterest) window.boostCategoryInterest(post.game);
    }

    if(window.renderFypFeed) window.renderFypFeed();
    if(window.renderLadder) window.renderLadder();
    if(window.activeZoomPostId === postId && typeof window.renderZoomInteractions === 'function') {
        window.renderZoomInteractions(postId);
    }

    const targetId = post.docId || post.id;
    if (window.db && targetId && !post.isLocalFallback && !String(targetId).startsWith('local_')) {
        try {
            const postRef = doc(window.db, "posts", targetId);
            await updateDoc(postRef, {
                ggsCount: increment(hasGGed ? -1 : 1),
                ggsBy: hasGGed ? arrayRemove(uid) : arrayUnion(uid)
            });
        } catch (error) { console.error("Error updating GGs:", error); }
    }
};

window.activeCommentPostId = null;
window.unsubscribeCommentsListener = null;

window.openCommentsModal = function(postId) {
    window.activeCommentPostId = postId;
    document.getElementById('commentsModal').classList.remove('hidden');

    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
    document.getElementById('commentsPostUser').innerText = post ? `@${post.user}` : '';

    loadCommentsForPost(postId);
};

window.closeCommentsModal = function() {
    document.getElementById('commentsModal').classList.add('hidden');
    window.activeCommentPostId = null;
    if (window.unsubscribeCommentsListener) {
        window.unsubscribeCommentsListener();
        window.unsubscribeCommentsListener = null;
    }
};

function loadCommentsForPost(postId) {
    const container = document.getElementById('commentsListContainer');
    container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading replies...</p>`;

    if (window.unsubscribeCommentsListener) {
        window.unsubscribeCommentsListener();
    }

    if (window.db && postId && !String(postId).startsWith('local_')) {
        const commentsRef = collection(window.db, "posts", postId, "comments");
        const q = query(commentsRef, orderBy("createdAt", "asc"), limit(50));

        window.unsubscribeCommentsListener = onSnapshot(q, (snapshot) => {
            container.innerHTML = '';
            if (snapshot.empty) {
                container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4">No replies yet. Be the first to reply!</p>`;
                return;
            }

            snapshot.forEach(docSnap => {
                const c = docSnap.data();
                container.innerHTML += `
                    <div class="bg-gg-900/80 p-2.5 rounded-xl space-y-1 border border-cyan-500/10">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-1">
                                <span class="text-xs font-bold text-cyan-400 cursor-pointer" onclick="openUserProfileModal('${c.user}', event)">@${c.user}</span>
                            </div>
                            <span class="text-[9px] text-gray-400">Reply</span>
                        </div>
                        <p class="text-xs text-gray-200">${formatMentions(c.text)}</p>
                    </div>
                `;
            });
            container.scrollTop = container.scrollHeight;
        });
    } else {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4">Local mode replies active.</p>`;
    }
}

function formatMentions(text) {
    if (!text) return '';
    return text.replace(/@(\w+)/g, '<span class="text-cyan-400 font-bold cursor-pointer hover:underline" onclick="openUserProfileModal(\'$1\', event)">@$1</span>');
}

window.submitCommentReply = async function() {
    const input = document.getElementById('commentInputText');
    const text = input.value.trim();
    const postId = window.activeCommentPostId;

    if (!text || !postId) return;

    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
    if(post && window.boostCategoryInterest) window.boostCategoryInterest(post.game);

    const payload = {
        user: (window.myUsername || '@SinlessGaming').replace('@', ''),
        uid: window.currentUser ? window.currentUser.uid : 'guest_user',
        text: text,
        createdAt: typeof serverTimestamp === 'function' ? serverTimestamp() : new Date().toISOString()
    };

    input.value = '';

    try {
        if (window.db && !String(postId).startsWith('local_')) {
            const commentsRef = collection(window.db, "posts", postId, "comments");
            await addDoc(commentsRef, payload);

            const postRef = doc(window.db, "posts", postId);
            await updateDoc(postRef, { commentsCount: increment(1) });
        }
        showToast("Reply published!");
    } catch (error) {
        console.error("Error posting reply:", error);
        showToast("Failed to post reply.");
    }
};

window.userFollowsState = window.userFollowsState || {};
window.userProfiles = JSON.parse(localStorage.getItem('sinless_user_profiles') || '{}');

window.getProfileBadges = function(username) {
    const clean = (username || '').replace('@','').toLowerCase();
    const userPosts = (window.fypposts || []).filter(p => p.user && p.user.toLowerCase() === clean);
    let totalGGs = 0;
    userPosts.forEach(p => totalGGs += (p.ggsCount || 0));

    let badges = [];
    if (clean === 'sinlessgaming') badges.push('<span class="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded font-black" title="Verified League Host">⭐ Verified Legend</span>');
    if (userPosts.length >= 5) badges.push('<span class="text-[8px] bg-magenta/20 text-magenta border border-magenta/40 px-1.5 py-0.5 rounded font-black" title="Published over 5 clips">🔥 Top Creator</span>');
    if (totalGGs >= 20) badges.push('<span class="text-[8px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-1.5 py-0.5 rounded font-black" title="Community Favorite">⚡ Viral Streak</span>');
    
    let isChamp = false;
    (window.tournamentsList || []).forEach(t => {
        (t.matches || []).forEach(m => {
            if (m.round >= 2 && m.winner && m.winner.toLowerCase() === clean) isChamp = true;
        });
    });
    if (isChamp) badges.push('<span class="text-[8px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded font-black" title="Tournament Winner"><i class="fa-solid fa-trophy mr-1 text-[7px]"></i> Champion</span>');

    return badges.join(' ');
};

function calculateGlobalRanks() {
    let statsMap = {};
    (window.fypposts || []).forEach(p => {
        let u = (p.user || 'Unknown').toLowerCase();
        if (!statsMap[u]) statsMap[u] = { gamertag: p.user, totalGGs: 0, postsCount: 0 };
        statsMap[u].totalGGs += (p.ggsCount || 0);
        statsMap[u].postsCount += 1;
    });

    let sortedCreators = Object.values(statsMap).sort((a, b) => b.totalGGs - a.totalGGs);
    let rankMap = {};
    sortedCreators.forEach((creator, index) => {
        rankMap[creator.gamertag.toLowerCase()] = index + 1;
    });

    return { rankMap, sortedCreators };
}

window.activeProfileUser = null;

window.openMyProfile = function(e = null) {
    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    window.openUserProfileModal(me, e);
};

window.openUserProfileModal = function(username, e = null) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const cleanUser = username.replace('@', '');
    window.activeProfileUser = cleanUser;

    const profileData = window.userProfiles[cleanUser.toLowerCase()] || {
        displayName: cleanUser === 'SinlessGaming' ? 'Sinless Gaming' : cleanUser,
        bio: cleanUser === 'SinlessGaming' 
            ? 'Official Esports Hub | EA Sports FC, Football, Wrestling & Gaming Leagues' 
            : 'Competitive gamer & creator on Sinless GG!',
        website: 'https://sinlessgg.com',
        pfp: null, cover: null
    };

    const userPosts = (window.fypposts || []).filter(p => p.user && p.user.toLowerCase() === cleanUser.toLowerCase());

    let totalGGs = 0;
    userPosts.forEach(p => totalGGs += (p.ggsCount || 0));

    const { rankMap } = calculateGlobalRanks();
    const userRank = rankMap[cleanUser.toLowerCase()] || '--';

    document.getElementById('profileDisplayName').innerText = profileData.displayName;
    document.getElementById('profileGamertag').innerText = `@${cleanUser}`;
    document.getElementById('profileBioText').innerText = profileData.bio;

    const badgeContainer = document.getElementById('profileDynamicBadgesBox');
    if (badgeContainer) {
        badgeContainer.innerHTML = window.getProfileBadges(cleanUser);
    }

    const linkElem = document.getElementById('profileLinkUrl');
    linkElem.innerText = (profileData.website || 'sinlessgg.com').replace(/^https?:\/\//, '');
    linkElem.href = profileData.website && profileData.website.startsWith('http') ? profileData.website : `https://${profileData.website || 'sinlessgg.com'}`;

    const pfpContainer = document.getElementById('profileAvatarBox');
    if (profileData.pfp) {
        pfpContainer.innerHTML = `<img src="${profileData.pfp}" class="w-full h-full object-cover">`;
    } else {
        const initials = cleanUser.substring(0, 2).toUpperCase();
        pfpContainer.innerHTML = `<div class="w-full h-full bg-gradient-to-tr from-cyan-400 to-magenta flex items-center justify-center font-black text-slate-950 text-2xl">${initials}</div>`;
    }

    const bannerContainer = document.getElementById('profileBannerHeader');
    if (profileData.cover) {
        bannerContainer.style.backgroundImage = `url('${profileData.cover}')`;
    } else {
        bannerContainer.style.backgroundImage = `linear-gradient(135deg, #070f1e 0%, #00f3ff 50%, #ff007f 100%)`;
    }

    document.getElementById('profilePostCount').innerText = userPosts.length;
    document.getElementById('profileGGsCount').innerText = totalGGs;
    document.getElementById('profileRankBadge').innerText = `#${userRank}`;

    let baseFollowers = Math.max(12, userPosts.length * 14 + totalGGs * 8);
    let isFollowing = !!window.userFollowsState[cleanUser.toLowerCase()];
    if (isFollowing) baseFollowers += 1;

    document.getElementById('profileFollowersCount').innerText = baseFollowers;

    const isMyOwnProfile = window.currentUser && (window.myUsername.replace('@','').toLowerCase() === cleanUser.toLowerCase());
    const followBtn = document.getElementById('profileFollowBtn');
    const editBtn = document.getElementById('profileEditBtn');

    if (isMyOwnProfile || cleanUser.toLowerCase() === 'sinlessgaming') {
        if (followBtn) followBtn.classList.add('hidden');
        if (editBtn) editBtn.classList.remove('hidden');
    } else {
        if (editBtn) editBtn.classList.add('hidden');
        if (followBtn) {
            followBtn.classList.remove('hidden');
            followBtn.innerHTML = isFollowing 
                ? `<i class="fa-solid fa-user-check mr-1"></i> Following` 
                : `<i class="fa-solid fa-user-plus mr-1"></i> Follow`;
            followBtn.onclick = () => window.toggleFollowUser(cleanUser);
        }
    }

    const postsContainer = document.getElementById('profileUserPostsList');
    postsContainer.innerHTML = '';

    if (userPosts.length === 0) {
        postsContainer.innerHTML = `<div class="col-span-3 text-xs text-gray-400 text-center py-10">No clips or posts published yet.</div>`;
    } else {
        userPosts.forEach(p => {
            let mediaThumbnail = '';
            let firstMediaUrl = (p.mediaList && p.mediaList.length > 0) ? p.mediaList[0].url : null;
            let firstMediaType = (p.mediaList && p.mediaList.length > 0) ? p.mediaList[0].type : 'image';
            const pId = p.id || p.docId;

            if (p.mediaList && p.mediaList.length > 0) {
                const m = p.mediaList[0];
                if (m.type === 'video') {
                    mediaThumbnail = `<video src="${m.url}" class="w-full h-full object-cover pointer-events-none"></video>`;
                } else {
                    mediaThumbnail = `<img src="${m.url}" class="w-full h-full object-cover">`;
                }
                postsContainer.innerHTML += `
                    <div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-gg-950 border border-cyan-500/20 group cursor-pointer hover:border-cyan-400 transition" onclick="event.stopPropagation(); window.openMediaZoomModal('${firstMediaType}', '${firstMediaUrl}', '${pId}')">
                        ${mediaThumbnail}
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-90 pointer-events-none"></div>
                        <div class="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px] text-white font-extrabold z-10">
                            <span class="flex items-center text-cyan-400"><i class="fa-solid fa-thumbs-up mr-1 text-[8px]"></i>${p.ggsCount || 0}</span>
                            <span class="text-[8px] text-gray-300 uppercase">${p.game || 'POST'}</span>
                        </div>
                    </div>
                `;
            } else {
                mediaThumbnail = `<div class="w-full h-full bg-gg-900 border border-cyan-500/20 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                    <span class="text-[8px] text-cyan-400 font-bold uppercase truncate">${p.game || 'GAMING'}</span>
                    <p class="text-[9px] text-gray-300 line-clamp-3 mt-1 font-semibold">${p.caption || 'Text Post'}</p>
                </div>`;
                let safeCaption = p.caption ? p.caption.replace(/'/g, "\\'").replace(/"/g, '&quot;') : '';
                postsContainer.innerHTML += `
                    <div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-gg-950 border border-cyan-500/20 group cursor-pointer hover:border-cyan-400 transition" onclick="event.stopPropagation(); window.openMediaZoomModal('text', '', '${pId}', '${safeCaption}')">
                        ${mediaThumbnail}
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-90 pointer-events-none"></div>
                        <div class="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px] text-white font-extrabold z-10">
                            <span class="flex items-center text-cyan-400"><i class="fa-solid fa-thumbs-up mr-1 text-[8px]"></i>${p.ggsCount || 0}</span>
                            <span class="text-[8px] text-gray-300 uppercase">${p.game || 'POST'}</span>
                        </div>
                    </div>
                `;
            }
        });
    }

    document.getElementById('userProfileModal').classList.remove('hidden');
};

window.tempProfilePfp = null;
window.tempProfileCover = null;

window.openEditProfileModal = function() {
    const cleanUser = window.activeProfileUser || (window.myUsername || '@SinlessGaming').replace('@','');
    const data = window.userProfiles[cleanUser.toLowerCase()] || {
        displayName: cleanUser === 'SinlessGaming' ? 'Sinless Gaming' : cleanUser,
        bio: 'Passionate gamer & creator on Sinless GG!',
        website: 'https://sinlessgg.com'
    };

    document.getElementById('editDisplayNameInput').value = data.displayName || '';
    document.getElementById('editBioInput').value = data.bio || '';
    document.getElementById('editWebsiteInput').value = data.website || '';
    window.tempProfilePfp = data.pfp || null;
    window.tempProfileCover = data.cover || null;

    document.getElementById('editProfileModal').classList.remove('hidden');
};

window.closeEditProfileModal = function() {
    document.getElementById('editProfileModal').classList.add('hidden');
};

function compressImage(file, maxWidth, maxHeight, quality) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
        };
    });
}

window.handlePfpUpload = async function(input) {
    if (input.files && input.files[0]) {
        const compressed = await compressImage(input.files[0], 500, 500, 0.85);
        window.tempProfilePfp = compressed;
        showToast("Profile Picture Selected!");
    }
};

window.handleCoverUpload = async function(input) {
    if (input.files && input.files[0]) {
        const compressed = await compressImage(input.files[0], 1200, 600, 0.85);
        window.tempProfileCover = compressed;
        showToast("Cover Photo Selected!");
    }
};

window.saveUserProfileChanges = function() {
    const cleanUser = window.activeProfileUser || (window.myUsername || '@SinlessGaming').replace('@','');
    const key = cleanUser.toLowerCase();

    const updated = {
        displayName: document.getElementById('editDisplayNameInput').value.trim() || cleanUser,
        bio: document.getElementById('editBioInput').value.trim(),
        website: document.getElementById('editWebsiteInput').value.trim(),
        pfp: window.tempProfilePfp,
        cover: window.tempProfileCover
    };

    window.userProfiles[key] = updated;
    localStorage.setItem('sinless_user_profiles', JSON.stringify(window.userProfiles));

    showToast("Profile Saved!");
    window.closeEditProfileModal();
    window.openUserProfileModal(cleanUser);
};

window.deleteAccountData = async function() {
    if (!confirm("⚠️ PERMANENT DELETION: Are you sure you want to delete your account data and reset your profile?")) return;

    const cleanUser = (window.myUsername || '@SinlessGaming').replace('@','').toLowerCase();
    delete window.userProfiles[cleanUser];
    localStorage.setItem('sinless_user_profiles', JSON.stringify(window.userProfiles));

    if (window.currentUser) {
        try { await signOut(window.auth); } catch(e) {}
    }

    showToast("Account data reset.");
    window.closeAccountModal();
    location.reload();
};

window.toggleFollowUser = function(cleanUser) {
    let key = cleanUser.toLowerCase();
    window.userFollowsState[key] = !window.userFollowsState[key];
    if (window.userFollowsState[key]) {
        showToast(`Started following @${cleanUser}!`);
    } else {
        showToast(`Unfollowed @${cleanUser}.`);
    }
    window.openUserProfileModal(cleanUser);
};

window.closeUserProfileModal = function(e = null) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    document.getElementById('userProfileModal').classList.add('hidden');
};

// Official public squads start with empty members list so users start non-members
window.defaultPublicCategorySquads = [
    { id: 'cat_squad_fcmobile', name: 'FC MOBILE OFFICIAL HUB', tag: 'FCM', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'FC MOBILE', isOfficial: true, isPublic: true, inviteCode: 'SQ-FCM01', members: [], subRooms: ['Rules/Announcements', 'chat', 'tactics', 'highlights', 'transfers', 'Matchmaking'], bio: 'Official public hub for FC Mobile players, leagues & transfers.', rooms: { 'Rules/Announcements': [{ sender: 'SinlessGaming', text: 'Welcome to the FC Mobile Public Squad!' }], 'chat': [], 'tactics': [], 'highlights': [], 'transfers': [], 'Matchmaking': [] } },
    { id: 'cat_squad_football', name: 'FOOTBALL NEWS HUB', tag: 'FTB', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'FOOTBALL', isOfficial: true, isPublic: true, inviteCode: 'SQ-FTB01', members: [], subRooms: ['Rules/Announcements', 'chat', 'tactics', 'Matchmaking'], bio: 'Public community for tactic discussions, news updates and fantasy lineups.', rooms: { 'Rules/Announcements': [], 'chat': [], 'tactics': [], 'Matchmaking': [] } },
    { id: 'cat_squad_eafc', name: 'EA SPORTS FC HUB', tag: 'EAFC', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'EA SPORTS FC', isOfficial: true, isPublic: true, inviteCode: 'SQ-EFC01', members: [], subRooms: ['Rules/Announcements', 'chat', 'highlights', 'Matchmaking'], bio: 'Ultimate Team, Pro Clubs and local tournament match hub.', rooms: { 'Rules/Announcements': [], 'chat': [], 'highlights': [], 'Matchmaking': [] } },
    { id: 'cat_squad_efootball', name: 'EFOOTBALL GLOBAL HUB', tag: 'EFTB', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'EFOOTBALL', isOfficial: true, isPublic: true, inviteCode: 'SQ-EFT01', members: [], subRooms: ['Rules/Announcements', 'chat', 'tactics', 'Matchmaking'], bio: 'eFootball match strategy, squad builds and eLeagues.', rooms: { 'Rules/Announcements': [], 'chat': [], 'tactics': [], 'Matchmaking': [] } },
    { id: 'cat_squad_dls', name: 'DREAM LEAGUE SOCCER HUB', tag: 'DLS', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'DLS', isOfficial: true, isPublic: true, inviteCode: 'SQ-DLS01', members: [], subRooms: ['Rules/Announcements', 'chat', 'transfers', 'Matchmaking'], bio: 'Dream League Soccer tips, kits, and multiplayer hubs.', rooms: { 'Rules/Announcements': [], 'chat': [], 'transfers': [], 'Matchmaking': [] } },
    { id: 'cat_squad_wrestling', name: 'WWE & WRESTLING HUB', tag: 'WWE', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'WRESTLING', isOfficial: true, isPublic: true, inviteCode: 'SQ-WWE01', members: [], subRooms: ['Rules/Announcements', 'chat', 'matches', 'Matchmaking'], bio: 'WWE 2K, wrestling simulation, match cards & discussion.', rooms: { 'Rules/Announcements': [], 'chat': [], 'matches': [], 'Matchmaking': [] } },
    { id: 'cat_squad_cod', name: 'CALL OF DUTY HUB', tag: 'COD', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'CALL OF DUTY', isOfficial: true, isPublic: true, inviteCode: 'SQ-COD01', members: [], subRooms: ['Rules/Announcements', 'chat', 'loadouts', 'Matchmaking'], bio: 'COD Mobile, Warzone & multiplayer competitive team up.', rooms: { 'Rules/Announcements': [], 'chat': [], 'loadouts': [], 'Matchmaking': [] } },
    { id: 'cat_squad_other', name: 'VARIETY GAMING HUB', tag: 'VAR', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'OTHER GAMES', isOfficial: true, isPublic: true, inviteCode: 'SQ-VAR01', members: [], subRooms: ['Rules/Announcements', 'chat', 'Matchmaking'], bio: 'All other mobile, console & PC games community chat.', rooms: { 'Rules/Announcements': [], 'chat': [], 'Matchmaking': [] } }
];

let savedClans = JSON.parse(localStorage.getItem('sinless_clans_data') || 'null');
if (!savedClans) {
    window.clansData = [...window.defaultPublicCategorySquads];
} else {
    let mergedMap = {};
    window.defaultPublicCategorySquads.forEach(s => mergedMap[s.id] = s);
    savedClans.forEach(s => { if(s.id) mergedMap[s.id] = s; });
    window.clansData = Object.values(mergedMap);
}

window.activeSquadDetails = null;
window.activeSquadSubRoom = 'chat';
window.squadsFilterTab = 'my_squads';

window.listenToFirestoreSquads = function() {
    if(!window.db || typeof query !== 'function') return;
    const q = query(collection(window.db, "squads"), limit(50));
    onSnapshot(q, (snapshot) => {
        if(!snapshot.empty) {
            let cloudSquads = [];
            snapshot.forEach((docSnap) => {
                cloudSquads.push({ id: docSnap.id, docId: docSnap.id, ...docSnap.data() });
            });
            
            let mergedMap = {};
            window.defaultPublicCategorySquads.forEach(s => mergedMap[s.id] = s);
            (window.clansData || []).forEach(s => { if(s.id) mergedMap[s.id] = s; });
            cloudSquads.forEach(s => { if(s.id) mergedMap[s.id] = s; });
            
            window.clansData = Object.values(mergedMap);
            localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
            if(window.renderClansList) window.renderClansList();
        }
    }, (error) => { console.warn("Squads listener error:", error); });
};

window.setSquadFilterTab = function(tab) {
    window.squadsFilterTab = tab;
    document.getElementById('squadTabBtn_My').className = `px-3 py-1.5 rounded-xl text-[10px] font-extrabold ${tab === 'my_squads' ? 'bg-cyan-400 text-slate-950 shadow' : 'bg-gg-900 text-gray-400 border border-cyan-500/20'}`;
    document.getElementById('squadTabBtn_Public').className = `px-3 py-1.5 rounded-xl text-[10px] font-extrabold ${tab === 'public_hubs' ? 'bg-cyan-400 text-slate-950 shadow' : 'bg-gg-900 text-gray-400 border border-cyan-500/20'}`;
    window.renderClansList();
};

window.renderClansList = function() {
    let box = document.getElementById('clansListContainer');
    if(!box) return;
    box.innerHTML = '';

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    const searchQ = (document.getElementById('squadSearchInput')?.value || '').trim().toLowerCase();

    let displaySquads = (window.clansData || []).filter(c => {
        const members = c.members || [];
        const isMember = members.some(m => m.toLowerCase() === me);

        if (searchQ) {
            return c.name.toLowerCase().includes(searchQ) || 
                   c.tag.toLowerCase().includes(searchQ) || 
                   (c.inviteCode && c.inviteCode.toLowerCase() === searchQ);
        }

        if (window.squadsFilterTab === 'my_squads') {
            return isMember;
        } else {
            return c.isOfficial || c.isPublic;
        }
    });

    if(displaySquads.length === 0) {
        box.innerHTML = `<div class="glass-panel p-4 rounded-2xl text-center text-xs text-gray-400">
            ${window.squadsFilterTab === 'my_squads' ? 'You have not joined any squads yet. Browse Public Hubs or search with an Invite Code!' : 'No public squads found.'}
        </div>`;
        return;
    }

    displaySquads.forEach(c => {
        const members = c.members || [];
        const isMember = members.some(m => m.toLowerCase() === me);

        box.innerHTML += `
            <div class="glass-panel p-3.5 rounded-2xl flex justify-between items-center text-xs shadow-lg border border-cyan-500/20 hover:border-cyan-400/50 transition cursor-pointer" onclick="window.openSquadDetailsModal('${c.id}')">
                <div class="space-y-1">
                    <div class="flex items-center space-x-1.5">
                        <h4 class="font-extrabold text-white">${c.name}</h4>
                        <span class="text-[9px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-black px-1.5 py-0.5 rounded uppercase">[${c.tag}]</span>
                        ${c.isOfficial ? '<span class="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded font-black">Official</span>' : ''}
                        ${!c.isPublic ? '<span class="text-[8px] bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded font-black"><i class="fa-solid fa-lock mr-0.5"></i>Private</span>' : ''}
                    </div>
                    <p class="text-[9px] text-gray-400">Owner: <span class="text-cyan-400 font-bold" onclick="event.stopPropagation(); window.openUserProfileModal('${c.owner || c.leader}', event)">@${c.owner || c.leader}</span> • ${members.length} Members ${c.inviteCode ? `• Code: ${c.inviteCode}` : ''}</p>
                </div>
                <button onclick="event.stopPropagation(); window.toggleSquadMembership('${c.id}')" class="px-3.5 py-1.5 rounded-xl font-black text-[10px] uppercase transition shadow ${isMember ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'}">
                    ${isMember ? 'Leave' : 'Join'}
                </button>
            </div>
        `;
    });
};

window.toggleSquadMembership = async function(squadId) {
    const squad = window.clansData.find(c => c.id === squadId);
    if (!squad) return;

    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    if (!squad.members) squad.members = [];

    const memberIndex = squad.members.findIndex(m => m.toLowerCase() === me.toLowerCase());
    const isMember = memberIndex !== -1;

    if (isMember) {
        // Enforce owner check only for custom user squads, not official category hubs
        if (!squad.isOfficial && (squad.owner || squad.leader).toLowerCase() === me.toLowerCase() && squad.members.length > 1) {
            showToast("⚠️ Squad Owner cannot leave with active members! Transfer ownership first.");
            return;
        }
        squad.members.splice(memberIndex, 1);
        showToast(`Left squad ${squad.name}`);
    } else {
        squad.members.push(me);
        showToast(`Joined squad ${squad.name}!`);
    }

    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
    window.renderClansList();

    if (window.db && squad.docId) {
        try {
            const squadRef = doc(window.db, "squads", squad.docId);
            await updateDoc(squadRef, {
                members: isMember ? arrayRemove(me) : arrayUnion(me)
            });
        } catch (e) { console.error("Error updating squad members on cloud:", e); }
    }
};

window.openCreateClanModal = function() {
    document.getElementById('createSquadModal').classList.remove('hidden');
};

window.closeCreateClanModal = function() {
    document.getElementById('createSquadModal').classList.add('hidden');
};

window.submitNewSquad = async function() {
    const name = document.getElementById('squadNameInput').value.trim();
    const tag = document.getElementById('squadTagInput').value.trim().toUpperCase();
    const game = document.getElementById('squadGameSelect').value;
    const isPublic = document.getElementById('squadPrivacySelect').value === 'public';
    const bio = document.getElementById('squadBioInput').value.trim();
    const owner = (window.myUsername || '@SinlessGaming').replace('@', '');
    const inviteCode = 'SQ-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    if (!name || !tag) {
        showToast("⚠️ Please enter a squad name and tag!");
        return;
    }

    const squadId = 'squad_' + Date.now();
    const newSquad = {
        id: squadId,
        name: name,
        tag: tag,
        game: game,
        isPublic: isPublic,
        isOfficial: false,
        inviteCode: inviteCode,
        bio: bio || 'Custom squad community on Sinless GG!',
        owner: owner,
        leader: owner,
        admins: [owner],
        members: [owner],
        subRooms: ['Rules/Announcements', 'chat', 'tactics', 'Matchmaking'],
        rooms: {
            'Rules/Announcements': [{ sender: owner, text: `Welcome to ${name}! Check back here for updates.`, timestamp: Date.now() }],
            'chat': [],
            'tactics': [],
            'Matchmaking': []
        },
        createdAt: new Date().toISOString()
    };

    if (!window.clansData.some(c => c.id === squadId)) {
        window.clansData.unshift(newSquad);
    }
    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));

    if (window.db && typeof addDoc === 'function') {
        try {
            const docRef = await addDoc(collection(window.db, "squads"), {
                ...newSquad,
                createdAt: serverTimestamp()
            });
            newSquad.docId = docRef.id;
        } catch(e) { console.error("Cloud squad creation error:", e); }
    }

    showToast(`🔥 Squad [${tag}] ${name} Created! Invite Code: ${inviteCode}`);
    document.getElementById('squadNameInput').value = '';
    document.getElementById('squadTagInput').value = '';
    document.getElementById('squadBioInput').value = '';
    window.closeCreateClanModal();
    window.renderClansList();
};

window.openSquadDetailsModal = function(squadId) {
    const squad = window.clansData.find(c => c.id === squadId);
    if (!squad) return;

    window.activeSquadDetails = squad;
    if (!squad.subRooms) squad.subRooms = ['Rules/Announcements', 'chat', 'Matchmaking'];
    if (!squad.admins) squad.admins = [squad.owner || squad.leader];

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    const isOwner = (squad.owner || squad.leader).toLowerCase() === me;
    const isAdmin = isOwner || squad.admins.some(a => a.toLowerCase() === me);

    document.getElementById('squadDetailTitle').innerText = `${squad.name} [${squad.tag}]`;
    document.getElementById('squadDetailLeader').innerText = `@${squad.owner || squad.leader}`;

    const addBtn = document.getElementById('addCustomSubRoomBtn');
    if (addBtn) addBtn.className = isAdmin ? 'px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[9px] font-black rounded-xl hover:bg-cyan-500/30' : 'hidden';

    const hostTournBtn = document.getElementById('hostSquadTournamentBtn');
    if (hostTournBtn) hostTournBtn.className = isAdmin ? 'px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px] font-black rounded-xl hover:bg-amber-500/30' : 'hidden';

    const disbandBtn = document.getElementById('disbandSquadBtn');
    if (disbandBtn) disbandBtn.className = (isOwner && !squad.isOfficial) ? 'px-2 py-1 bg-red-600/20 text-red-400 border border-red-500/40 text-[9px] font-black rounded-xl hover:bg-red-600/30' : 'hidden';

    renderSquadSubRoomsNav();
    window.switchSquadSubRoom(squad.subRooms[0] || 'chat');

    document.getElementById('squadDetailsModal').classList.remove('hidden');
};

window.closeSquadDetailsModal = function() {
    document.getElementById('squadDetailsModal').classList.add('hidden');
    window.activeSquadDetails = null;
};

window.openCreateSquadSquadTournamentModal = function() {
    const squad = window.activeSquadDetails;
    if (!squad) return;
    
    document.getElementById('tournTitleInput').value = `${squad.name} Championship`;
    document.getElementById('tournGameSelect').value = squad.game || 'FC MOBILE';
    window.activeSquadForTournament = squad.id;
    window.openCreateTournamentModal();
};

function renderSquadSubRoomsNav() {
    const squad = window.activeSquadDetails;
    if (!squad) return;

    const nav = document.getElementById('squadSubRoomsNav');
    if (!nav) return;
    nav.innerHTML = '';

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    const isOwner = (squad.owner || squad.leader).toLowerCase() === me;
    const isAdmin = isOwner || squad.admins.some(a => a.toLowerCase() === me);

    squad.subRooms.forEach(room => {
        const isActive = window.activeSquadSubRoom === room;
        const isLocked = room === 'Rules/Announcements';
        const isMatchmaking = room === 'Matchmaking';

        nav.innerHTML += `
            <div class="flex items-center space-x-1 shrink-0">
                <button onclick="window.switchSquadSubRoom('${room}')" class="px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition ${isActive ? 'bg-cyan-400 text-slate-950 shadow-md' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">
                    ${isLocked ? '📢 ' : (isMatchmaking ? '⚔️ ' : '# ')}${room}
                </button>
                ${(isAdmin && !isLocked && room !== 'chat' && !isMatchmaking) ? `<button onclick="window.deleteSubRoom('${room}')" class="text-red-400 text-xs px-1 hover:text-red-300 font-bold" title="Delete Channel">✕</button>` : ''}
            </div>
        `;
    });

    nav.innerHTML += `
        <button onclick="window.switchSquadSubRoom('Roster')" class="px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            👥 Roster & Roles
        </button>
    `;
}

window.promptCreateSubRoom = function() {
    const squad = window.activeSquadDetails;
    if (!squad) return;

    const name = prompt("Enter new sub-channel name (e.g. tactics, highlights, transfers):");
    if (!name) return;

    const cleanName = name.trim().toLowerCase().replace(/\s+/g, '-');
    if (squad.subRooms.includes(cleanName)) {
        showToast("⚠️ Sub-room already exists!");
        return;
    }

    squad.subRooms.push(cleanName);
    if (!squad.rooms) squad.rooms = {};
    squad.rooms[cleanName] = [];

    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
    renderSquadSubRoomsNav();
    window.switchSquadSubRoom(cleanName);
    showToast(`Sub-channel #${cleanName} created!`);
};

window.deleteSubRoom = function(room) {
    const squad = window.activeSquadDetails;
    if (!squad || !confirm(`Delete sub-channel #${room}?`)) return;

    squad.subRooms = squad.subRooms.filter(r => r !== room);
    if (squad.rooms) delete squad.rooms[room];

    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
    renderSquadSubRoomsNav();
    window.switchSquadSubRoom('chat');
    showToast(`Sub-channel #${room} deleted.`);
};

window.switchSquadSubRoom = function(room) {
    window.activeSquadSubRoom = room;
    renderSquadSubRoomsNav();

    const squad = window.activeSquadDetails;
    if (!squad) return;

    const msgsBox = document.getElementById('squadRoomMsgsBox');
    const inputContainer = document.getElementById('squadInputContainer');
    msgsBox.innerHTML = '';

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    const members = squad.members || [];
    const isMember = members.some(m => m.toLowerCase() === me);

    const isOwner = (squad.owner || squad.leader).toLowerCase() === me;
    const isAdmin = isOwner || (squad.admins && squad.admins.some(a => a.toLowerCase() === me));

    if (room === 'Matchmaking') {
        if (inputContainer) inputContainer.style.display = 'none';
        let mmHtml = `
            <div class="space-y-3 max-w-lg mx-auto w-full pt-2">
                <div class="glass-panel p-4 rounded-2xl border border-cyan-500/30 space-y-3 bg-gradient-to-r from-gg-900 via-cyan-950/20 to-gg-900 text-center">
                    <h4 class="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center justify-center">
                        <i class="fa-solid fa-shield-halved mr-1.5"></i> Squad Matchmaking & Challenge Queue
                    </h4>
                    <p class="text-[10px] text-gray-300">Book 1v1 or 5v5 fixtures directly with rival clans and members instantly.</p>
                    <button onclick="window.bookSquadMatchmakingFixture()" class="px-4 py-2 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase shadow hover:bg-emerald-400 transition">
                        ⚔️ Queue for Match / Challenge Rival
                    </button>
                </div>
                <div class="space-y-2" id="squadMatchmakingQueueList">
        `;
        
        if (!squad.matchmakingQueue || squad.matchmakingQueue.length === 0) {
            mmHtml += `<p class="text-xs text-gray-400 text-center py-6">No active challenge queues. Click above to queue your squad!</p>`;
        } else {
            squad.matchmakingQueue.forEach(q => {
                mmHtml += `
                    <div class="glass-panel p-3 rounded-xl flex items-center justify-between text-xs border border-cyan-500/20">
                        <div>
                            <span class="font-extrabold text-white">@${q.challenger}</span>
                            <span class="text-[9px] text-cyan-400 block">${q.format} Fixture • Status: ${q.status}</span>
                        </div>
                        <button onclick="window.acceptSquadChallenge('${q.id}')" class="px-3 py-1.5 bg-cyan-400 text-slate-950 font-black text-[10px] rounded-xl uppercase shadow">Accept Match</button>
                    </div>
                `;
            });
        }
        mmHtml += `</div></div>`;
        msgsBox.innerHTML = mmHtml;
        return;
    }

    if (room === 'Roster') {
        let rosterHtml = `<div class="space-y-2 max-w-lg mx-auto w-full pt-2">`;
        members.forEach(m => {
            const memberIsOwner = m.toLowerCase() === (squad.owner || squad.leader).toLowerCase();
            const memberIsAdmin = squad.admins && squad.admins.some(a => a.toLowerCase() === m.toLowerCase());

            rosterHtml += `
                <div class="flex items-center justify-between p-3 bg-gg-900 rounded-2xl border border-cyan-500/15 text-xs shadow-md">
                    <div class="flex items-center space-x-2">
                        <span class="font-bold text-white cursor-pointer hover:text-cyan-400" onclick="window.closeSquadDetailsModal(); window.openUserProfileModal('${m}', event)">@${m}</span>
                        ${memberIsOwner ? '<span class="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded font-black">👑 Owner</span>' : (memberIsAdmin ? '<span class="text-[8px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded font-black">🛡️ Admin</span>' : '<span class="text-[8px] text-gray-400">Member</span>')}
                    </div>
                    <div class="flex items-center space-x-2">
                        ${isOwner && !memberIsOwner ? `
                            <button onclick="window.toggleSquadAdmin('${m}')" class="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-[9px] font-bold">
                                ${memberIsAdmin ? 'Demote Admin' : 'Make Admin'}
                            </button>
                            <button onclick="window.transferOwnership('${m}')" class="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl text-[9px] font-bold">
                                Transfer Ownership
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });
        rosterHtml += `</div>`;
        msgsBox.innerHTML = rosterHtml;
        if (inputContainer) inputContainer.style.display = 'none';
        return;
    }

    if (!isMember) {
        if (inputContainer) inputContainer.style.display = 'none';
        msgsBox.innerHTML = `
            <div class="flex flex-col items-center justify-center text-center p-8 space-y-3 my-auto">
                <i class="fa-solid fa-lock text-3xl text-cyan-400 opacity-80"></i>
                <p class="text-xs font-black text-white">Join Squad to Chat</p>
                <p class="text-[10px] text-gray-400 max-w-xs">You must join this squad to read and participate in #${room}.</p>
                <button onclick="window.toggleSquadMembership('${squad.id}')" class="px-5 py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl uppercase shadow-lg">Join Squad Now</button>
            </div>
        `;
        return;
    }

    if (inputContainer) inputContainer.style.display = 'flex';

    let msgs = (squad.rooms && squad.rooms[room]) ? squad.rooms[room] : [];
    if (msgs.length === 0) {
        msgsBox.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">No messages in #${room} yet. Be the first to start the discussion!</p>`;
    } else {
        msgs.forEach(m => {
            if (m.isImage) {
                const timerBadge = getRemainingTimeBadge(m.timestamp);
                msgsBox.innerHTML += `
                    <div class="bg-gg-900 p-3 rounded-2xl border border-cyan-500/20 space-y-1.5 max-w-sm">
                        <div class="flex justify-between items-center text-[10px]">
                            <span class="text-cyan-400 font-bold cursor-pointer" onclick="window.closeSquadDetailsModal(); window.openUserProfileModal('${m.sender}', event)">@${m.sender}</span>
                            <span class="text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">${timerBadge}</span>
                        </div>
                        <img src="${m.imageUrl}" class="max-h-60 rounded-xl object-contain bg-black w-full border border-cyan-500/10 cursor-pointer" onclick="window.openMediaZoomModal('image', '${m.imageUrl}')">
                    </div>
                `;
            } else {
                msgsBox.innerHTML += `
                    <div class="bg-gg-900 p-2.5 rounded-2xl border border-cyan-500/10 space-y-0.5 max-w-xl">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-bold text-cyan-400 cursor-pointer" onclick="window.closeSquadDetailsModal(); window.openUserProfileModal('${m.sender}', event)">@${m.sender}</span>
                            <span class="text-[8px] text-gray-500">${m.time || 'Today'}</span>
                        </div>
                        <p class="text-xs text-gray-200">${formatMentions(m.text)}</p>
                    </div>
                `;
            }
        });
    }

    if (room === 'Rules/Announcements' && !isAdmin) {
        if (inputContainer) inputContainer.style.display = 'none';
        msgsBox.innerHTML += `<p class="text-[10px] text-amber-400 text-center font-bold py-2">🔒 Only Squad Owner and Admins can post in #${room}.</p>`;
    }

    msgsBox.scrollTop = msgsBox.scrollHeight;
};

window.bookSquadMatchmakingFixture = function() {
    const squad = window.activeSquadDetails;
    if (!squad) return;
    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    if (!squad.matchmakingQueue) squad.matchmakingQueue = [];
    
    const newChallenge = {
        id: 'match_' + Date.now(),
        challenger: me,
        format: squad.game || 'FC MOBILE 1v1',
        status: 'Searching for Opponent'
    };
    squad.matchmakingQueue.unshift(newChallenge);
    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
    window.switchSquadSubRoom('Matchmaking');
    showToast("⚔️ Queued for match successfully!");
};

window.acceptSquadChallenge = function(matchId) {
    showToast("🎮 Match fixture booked! Entering lobby...");
};

window.toggleSquadAdmin = function(member) {
    const squad = window.activeSquadDetails;
    if (!squad) return;

    if (!squad.admins) squad.admins = [squad.owner || squad.leader];

    const index = squad.admins.findIndex(a => a.toLowerCase() === member.toLowerCase());
    if (index !== -1) {
        squad.admins.splice(index, 1);
        showToast(`Demoted @${member} from Admin.`);
    } else {
        squad.admins.push(member);
        showToast(`Promoted @${member} to Squad Admin!`);
    }

    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
    window.switchSquadSubRoom('Roster');
};

window.transferOwnership = function(newOwner) {
    const squad = window.activeSquadDetails;
    if (!squad || !confirm(`⚠️ TRANSFER OWNERSHIP: Transfer complete ownership of squad ${squad.name} to @${newOwner}?`)) return;

    squad.owner = newOwner;
    squad.leader = newOwner;
    if (!squad.admins.includes(newOwner)) squad.admins.push(newOwner);

    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
    window.openSquadDetailsModal(squad.id);
    showToast(`👑 Ownership transferred to @${newOwner}!`);
};

window.sendSquadRoomMessage = function() {
    const input = document.getElementById('squadSubRoomInput');
    if (!input) return;
    const text = input.value.trim();
    const squad = window.activeSquadDetails;
    const room = window.activeSquadSubRoom;

    if (!text || !squad || !room) return;

    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    if (!squad.rooms) squad.rooms = {};
    if (!squad.rooms[room]) squad.rooms[room] = [];

    if (!squad.members) squad.members = [];
    if (!squad.members.some(m => m.toLowerCase() === me.toLowerCase())) {
        squad.members.push(me);
    }

    squad.rooms[room].push({ sender: me, text: text, time: 'Now', timestamp: Date.now() });
    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));

    input.value = '';
    window.switchSquadSubRoom(room);

    if (window.db && squad.docId) {
        try {
            const squadRef = doc(window.db, "squads", squad.docId);
            updateDoc(squadRef, { rooms: squad.rooms, members: squad.members });
        } catch(e){}
    }
};

window.deleteActiveSquad = async function() {
    const squad = window.activeSquadDetails;
    if (!squad || !confirm(`Disband squad ${squad.name}? This cannot be undone.`)) return;

    window.clansData = window.clansData.filter(c => c.id !== squad.id);
    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));

    if (window.db && squad.docId) {
        try { await deleteDoc(doc(window.db, "squads", squad.docId)); } catch(e){}
    }

    showToast("Squad disbanded.");
    window.closeSquadDetailsModal();
    window.renderClansList();
};

function pruneExpiredEphemeralData() {
    const now = Date.now();
    const EXPIRATION_MS = 86400000;

    window.profileStories = (window.profileStories || []).filter(s => (now - s.timestamp) < EXPIRATION_MS);

    (window.clansData || []).forEach(squad => {
        if (squad.rooms) {
            Object.keys(squad.rooms).forEach(room => {
                squad.rooms[room] = squad.rooms[room].filter(msg => {
                    if (msg.isImage) {
                        return (now - msg.timestamp) < EXPIRATION_MS;
                    }
                    return true;
                });
            });
        }
    });
    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
}

function getRemainingTimeBadge(timestamp) {
    const now = Date.now();
    const msLeft = 86400000 - (now - timestamp);
    if (msLeft <= 0) return 'Expired';
    const hours = Math.floor(msLeft / 3600000);
    const mins = Math.floor((msLeft % 3600000) / 60000);
    return `⏳ ${hours}h ${mins}m remaining`;
}

window.sendInChatImage = async function(context) {
    const input = context === 'squad' ? document.getElementById('squadChatImageInput') : document.getElementById('dmChatImageInput');
    if (input && input.files && input.files[0]) {
        const compressedDataUrl = await compressImage(input.files[0], 1200, 1200, 0.85);
        const me = (window.myUsername || '@SinlessGaming').replace('@', '');

        const imgPayload = {
            sender: me,
            isImage: true,
            imageUrl: compressedDataUrl,
            timestamp: Date.now()
        };

        if (context === 'squad') {
            const squad = window.activeSquadDetails;
            const room = window.activeSquadSubRoom;
            if (!squad.rooms[room]) squad.rooms[room] = [];

            if (!squad.members) squad.members = [];
            if (!squad.members.some(m => m.toLowerCase() === me.toLowerCase())) {
                squad.members.push(me);
            }

            squad.rooms[room].push(imgPayload);
            localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
            window.switchSquadSubRoom(room);
        } else if (context === 'dm') {
            const partner = window.activeDmUser;
            if (partner) {
                const threadKey = [me.toLowerCase(), partner.toLowerCase()].sort().join('_');
                if (!window.dmMessagesList[threadKey]) window.dmMessagesList[threadKey] = [];
                window.dmMessagesList[threadKey].push(imgPayload);
                localStorage.setItem('sinless_dm_messages', JSON.stringify(window.dmMessagesList));
                if(window.renderDmThread) window.renderDmThread();
            }
        }

        input.value = '';
        showToast("📷 24h Ephemeral Image Sent!");
    }
};

window.profileStories = [];

window.triggerStoryUpload = function() {
    document.getElementById('storyFileInput').click();
};

window.uploadProfileStory = async function(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const isVideo = file.type.includes('video');
        const caption = prompt("Add a caption to your 24-hour Story (optional):") || '';

        const saveStory = async (mediaUrl, type) => {
            const newStory = {
                id: 'story_' + Date.now(),
                user: (window.myUsername || '@SinlessGaming').replace('@', ''),
                type: type,
                mediaUrl: mediaUrl,
                caption: caption,
                timestamp: Date.now()
            };
            window.profileStories.unshift(newStory);
            await saveStoryToIndexedDB(newStory);
            window.renderStoriesBar();
            input.value = '';
            showToast(`✨ Profile Story Posted (${type === 'video' ? 'Video' : 'Image'})!`);
        };

        if (isVideo) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => saveStory(reader.result, 'video');
        } else {
            const compressedUrl = await compressImage(file, 1080, 1920, 0.85);
            saveStory(compressedUrl, 'image');
        }
    }
};

window.renderStoriesBar = function() {
    const container = document.getElementById('activeStoriesContainer');
    if (!container) return;
    container.innerHTML = '';

    window.profileStories.forEach(story => {
        let thumbContent = story.type === 'video'
            ? `<video src="${story.mediaUrl}" class="w-12 h-12 rounded-full object-cover border-2 border-slate-950 pointer-events-none" autoplay loop muted></video>`
            : `<img src="${story.mediaUrl}" class="w-12 h-12 rounded-full object-cover border-2 border-slate-950">`;

        container.innerHTML += `
            <div class="flex flex-col items-center shrink-0 cursor-pointer space-y-1 group" onclick="window.openStoryViewer('${story.id}')">
                <div class="w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-magenta to-amber-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    ${thumbContent}
                </div>
                <span class="text-[8px] font-extrabold text-gray-300 truncate max-w-[60px]">@${story.user}</span>
            </div>
        `;
    });
};

window.openStoryViewer = function(storyId) {
    const story = window.profileStories.find(s => s.id === storyId);
    if (!story) return;

    const timerBadge = getRemainingTimeBadge(story.timestamp);
    window.openMediaZoomModal(story.type || 'image', story.mediaUrl);

    const title = document.getElementById('mediaZoomTitle');
    if (title) title.innerText = `@${story.user}'s Story • ${timerBadge}`;
};
// ======================================================================
// SINLESS GG - APP LOGIC (MODULE VERSION - PART 2)
// ======================================================================

window.tournamentsList = JSON.parse(localStorage.getItem('sinless_tournaments_list') || 'null') || [
    {
        id: 'tourn_1',
        title: 'Sinless Super League - Season 1',
        host: 'SinlessGaming',
        game: 'FC MOBILE',
        format: 'WORLD_CUP',
        maxPlayers: 32,
        prizePool: '500 GHC',
        players: ['SinlessGaming', 'AceKhyd', 'DonPrime', 'Kumi_FC', 'Richard_GG', 'Messiah_X', 'Gloria_Gamer', 'Kwame_Pro'],
        eliminated: [],
        matches: [
            { id: 'm1', round: 1, p1: 'SinlessGaming', p2: 'AceKhyd', s1: 3, s2: 1, winner: 'SinlessGaming', stage: 'Group A', streamUrl: '', mvp: 'SinlessGaming', status: 'approved' },
            { id: 'm2', round: 1, p1: 'DonPrime', p2: 'Kumi_FC', s1: 2, s2: 0, winner: 'DonPrime', stage: 'Group A', streamUrl: '', mvp: 'DonPrime', status: 'approved' },
            { id: 'm3', round: 1, p1: 'Richard_GG', p2: 'Messiah_X', s1: 1, s2: 2, winner: 'Messiah_X', stage: 'Group B', streamUrl: '', mvp: 'Messiah_X', status: 'approved' },
            { id: 'm4', round: 1, p1: 'Gloria_Gamer', p2: 'Kwame_Pro', s1: 0, s2: 1, winner: 'Kwame_Pro', stage: 'Group B', streamUrl: '', mvp: 'Kwame_Pro', status: 'approved' },
            { id: 'm5', round: 2, p1: 'SinlessGaming', p2: 'Messiah_X', s1: null, s2: null, winner: null, stage: 'Quarter-Final', streamUrl: 'https://youtube.com/embed/live_stream', mvp: null, status: 'pending' }
        ]
    }
];

window.activeTournament = window.tournamentsList[0];
window.activeMatchForReporting = null;

window.openUniversalCreateModal = function() { document.getElementById('universalCreateModal').classList.remove('hidden'); };
window.closeUniversalCreateModal = function() { document.getElementById('universalCreateModal').classList.add('hidden'); };
window.openCreateTournamentModal = function() { window.closeUniversalCreateModal(); document.getElementById('createTournamentModal').classList.remove('hidden'); };
window.closeCreateTournamentModal = function() { document.getElementById('createTournamentModal').classList.add('hidden'); };

window.activeDeleteTournamentId = null;
window.deleteTournament = function(tournId) {
    window.activeDeleteTournamentId = tournId;
    const modal = document.getElementById('deleteTournamentModal');
    if (modal) modal.classList.remove('hidden');
};

window.closeDeleteTournamentModal = function() {
    const modal = document.getElementById('deleteTournamentModal');
    if (modal) modal.classList.add('hidden');
    window.activeDeleteTournamentId = null;
};

window.confirmDeleteTournament = function() {
    const tournId = window.activeDeleteTournamentId;
    if (!tournId) return;

    window.tournamentsList = window.tournamentsList.filter(t => t.id !== tournId);
    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));

    if (window.activeTournament && window.activeTournament.id === tournId) {
        window.activeTournament = window.tournamentsList[0] || null;
    }

    showToast("Tournament deleted successfully!");
    window.closeDeleteTournamentModal();
    if (window.renderTournamentsTab) window.renderTournamentsTab();
    if (window.renderTournamentsTabDedicated) window.renderTournamentsTabDedicated();
};

function getKnockoutStageName(maxPlayers, round) {
    let playersInRound = maxPlayers / Math.pow(2, round - 1);
    if (playersInRound === 2) return "Final";
    if (playersInRound === 4) return "Semi-Final";
    if (playersInRound === 8) return "Quarter-Final";
    if (playersInRound === 16) return "Round of 16";
    if (playersInRound === 32) return "Round of 32";
    if (playersInRound === 64) return "Round of 64";
    if (playersInRound === 128) return "Round of 128";
    if (playersInRound > 128) return `Round of ${playersInRound}`;
    return `Round ${round}`;
}

window.submitNewTournament = function() {
    const title = document.getElementById('tournTitleInput').value.trim();
    const game = document.getElementById('tournGameSelect').value;
    const format = document.getElementById('tournFormatSelect').value;
    const leagueH2HOption = document.getElementById('tournLeagueH2HSelect')?.value || '1x';
    const maxPlayers = parseInt(document.getElementById('tournSizeSelect').value);
    const prizePool = document.getElementById('tournPrizeInput').value.trim() || 'Bragging Rights';
    const hostUser = (window.myUsername || '@SinlessGaming').replace('@', '');

    if (!title) {
        showToast("⚠️ Enter tournament title!");
        return;
    }

    const newTourn = {
        id: 'tourn_' + Date.now(),
        title: title,
        host: hostUser,
        game: game,
        format: format,
        leagueH2H: leagueH2HOption,
        maxPlayers: maxPlayers,
        prizePool: prizePool,
        squadId: window.activeSquadForTournament || null,
        players: [hostUser],
        eliminated: [],
        matches: []
    };

    let numInitialMatches = 0;
    if (format === 'KNOCKOUT') numInitialMatches = maxPlayers / 2;
    else if (format === 'WORLD_CUP') numInitialMatches = 8;
    else if (format === 'CHAMPIONS_LEAGUE') numInitialMatches = 12;
    else if (format === 'LEAGUE') {
        let tempPlayers = [hostUser];
        for (let i = 1; i < maxPlayers; i++) {
            tempPlayers.push(`Club_${i}`);
        }
        newTourn.players = tempPlayers;
        
        for (let i = 0; i < tempPlayers.length; i++) {
            for (let j = i + 1; j < tempPlayers.length; j++) {
                newTourn.matches.push({
                    id: `m_${Date.now()}_${i}_${j}_1`,
                    round: 1,
                    p1: tempPlayers[i],
                    p2: tempPlayers[j],
                    s1: null,
                    s2: null,
                    winner: null,
                    stage: 'League Match (Leg 1)',
                    streamUrl: '',
                    mvp: null,
                    status: 'approved'
                });
                if (leagueH2HOption === '2x') {
                    newTourn.matches.push({
                        id: `m_${Date.now()}_${i}_${j}_2`,
                        round: 1,
                        p1: tempPlayers[j],
                        p2: tempPlayers[i],
                        s1: null,
                        s2: null,
                        winner: null,
                        stage: 'League Match (Leg 2)',
                        streamUrl: '',
                        mvp: null,
                        status: 'approved'
                    });
                }
            }
        }
    }

    if (format !== 'LEAGUE') {
        for (let i = 0; i < numInitialMatches; i++) {
            let initialStage = 'Round 1';
            if (format === 'KNOCKOUT') initialStage = getKnockoutStageName(maxPlayers, 1);
            else if (format === 'WORLD_CUP') initialStage = `Group ${String.fromCharCode(65 + (i % 4))}`;
            else if (format === 'CHAMPIONS_LEAGUE') initialStage = 'Swiss Phase';

            newTourn.matches.push({
                id: `m_${Date.now()}_${i}`,
                round: 1,
                p1: i === 0 ? hostUser : 'Open Spot',
                p2: 'Open Spot',
                s1: null,
                s2: null,
                winner: null,
                stage: initialStage,
                streamUrl: '',
                mvp: null,
                status: 'approved'
            });
        }
    }

    window.tournamentsList.unshift(newTourn);
    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));
    window.activeTournament = newTourn;
    window.activeSquadForTournament = null;

    showToast("Tournament Launched Successfully!");
    window.closeCreateTournamentModal();
    if(window.switchView) window.switchView('tournaments');
    window.renderTournamentsTabDedicated();
};

window.joinActiveTournament = function(tournId) {
    const tourn = window.tournamentsList.find(t => t.id === tournId);
    const me = (window.myUsername || '@SinlessGaming').replace('@', '');

    if (!tourn) return;
    if (tourn.players.includes(me)) {
        showToast("Already registered in this tournament!");
        return;
    }
    if (tourn.players.length >= tourn.maxPlayers) {
        showToast("Tournament is full!");
        return;
    }

    tourn.players.push(me);

    for (let m of tourn.matches) {
        if (m.p1 === 'Open Spot' || !m.p1) { m.p1 = me; break; }
        if (m.p2 === 'Open Spot' || !m.p2) { m.p2 = me; break; }
    }

    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));
    showToast(`Registered for ${tourn.title}!`);
    window.renderTournamentsTab();
    window.renderTournamentsTabDedicated();
};

window.activeManualAddContext = null;
window.manualAddPlayer = function(tournId, matchId, slot) {
    window.activeManualAddContext = { tournId, matchId, slot };
    document.getElementById('manualPlayerInput').value = '';
    document.getElementById('manualAddPlayerModal').classList.remove('hidden');
};

window.closeManualAddPlayerModal = function() {
    document.getElementById('manualAddPlayerModal').classList.add('hidden');
    window.activeManualAddContext = null;
};

window.confirmManualAddPlayer = function() {
    const ctx = window.activeManualAddContext;
    if (!ctx) return;
    const newPlayer = document.getElementById('manualPlayerInput').value.trim();
    if (!newPlayer) {
        showToast("⚠️ Enter a valid gamertag!");
        return;
    }

    const tourn = window.tournamentsList.find(t => t.id === ctx.tournId);
    if (!tourn) return;
    const match = tourn.matches.find(m => m.id === ctx.matchId);
    if (!match) return;

    const cleanPlayer = newPlayer.replace('@', '');
    match[ctx.slot] = cleanPlayer;
    if (!tourn.players.includes(cleanPlayer)) {
        tourn.players.push(cleanPlayer);
    }
    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));
    window.renderTournamentsTab();
    window.renderTournamentsTabDedicated();
    showToast(`Added @${cleanPlayer} to match!`);
    window.closeManualAddPlayerModal();
};

window.openMatchReportModal = function(matchId) {
    if (!window.activeTournament) return;
    const match = window.activeTournament.matches.find(m => m.id === matchId);
    if (!match) return;

    window.activeMatchForReporting = match;
    document.getElementById('reportMatchP1Label').innerText = `@${match.p1}`;
    document.getElementById('reportMatchP2Label').innerText = `@${match.p2}`;
    document.getElementById('reportP1ScoreInput').value = match.s1 !== null ? match.s1 : '';
    document.getElementById('reportP2ScoreInput').value = match.s2 !== null ? match.s2 : '';
    document.getElementById('reportMatchStreamInput').value = match.streamUrl || '';
    document.getElementById('matchMvpInput').value = match.mvp || '';

    const iframe = document.getElementById('matchLiveStreamFrame');
    if (match.streamUrl) {
        let streamEmbed = match.streamUrl.replace('watch?v=', 'embed/');
        iframe.src = streamEmbed;
        iframe.classList.remove('hidden');
    } else {
        iframe.src = '';
        iframe.classList.add('hidden');
    }

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    const isHost = window.activeTournament.host.toLowerCase() === me;
    const approvalBox = document.getElementById('matchApprovalBox');
    
    if (approvalBox) {
        if (match.status === 'disputed' && isHost) {
            approvalBox.classList.remove('hidden');
        } else {
            approvalBox.classList.add('hidden');
        }
    }

    document.getElementById('matchReportModal').classList.remove('hidden');
};

window.closeMatchReportModal = function() {
    document.getElementById('matchReportModal').classList.add('hidden');
    window.activeMatchForReporting = null;
};

window.submitMatchScoreReport = function() {
    const match = window.activeMatchForReporting;
    if (!match) return;

    const s1 = parseInt(document.getElementById('reportP1ScoreInput').value);
    const s2 = parseInt(document.getElementById('reportP2ScoreInput').value);
    const streamUrl = document.getElementById('reportMatchStreamInput').value.trim();
    const mvp = document.getElementById('matchMvpInput').value.trim();

    if (isNaN(s1) || isNaN(s2)) {
        showToast("⚠️ Enter valid scores for both players!");
        return;
    }

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    const isHost = window.activeTournament.host.toLowerCase() === me;

    match.s1 = s1;
    match.s2 = s2;
    match.streamUrl = streamUrl;
    match.mvp = mvp;
    match.winner = s1 > s2 ? match.p1 : (s2 > s1 ? match.p2 : 'DRAW');
    match.status = isHost ? 'approved' : 'disputed';

    if (match.status === 'approved') {
        let loser = s1 < s2 ? match.p1 : (s2 < s1 ? match.p2 : null);
        if (loser && (window.activeTournament.format === 'KNOCKOUT' || match.stage.toLowerCase().includes('knockout') || match.stage.toLowerCase().includes('round'))) {
            if(!window.activeTournament.eliminated) window.activeTournament.eliminated = [];
            if(!window.activeTournament.eliminated.includes(loser)) window.activeTournament.eliminated.push(loser);
        }
        advanceWinnerInBracket(window.activeTournament, match);
    }

    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));
    showToast(isHost ? `Match Score Updated & Approved! Winner: @${match.winner}` : `Score submitted! Pending Host Approval.`);
    window.closeMatchReportModal();
    window.renderTournamentsTab();
    window.renderTournamentsTabDedicated();
};

window.hostApproveMatch = function() {
    const match = window.activeMatchForReporting;
    if (!match) return;

    match.status = 'approved';
    let loser = match.s1 < match.s2 ? match.p1 : (match.s2 < match.s1 ? match.p2 : null);
    if (loser && (window.activeTournament.format === 'KNOCKOUT' || match.stage.toLowerCase().includes('knockout') || match.stage.toLowerCase().includes('round'))) {
        if(!window.activeTournament.eliminated) window.activeTournament.eliminated = [];
        if(!window.activeTournament.eliminated.includes(loser)) window.activeTournament.eliminated.push(loser);
    }
    advanceWinnerInBracket(window.activeTournament, match);

    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));
    showToast("Match Approved and Bracket Updated!");
    window.closeMatchReportModal();
    window.renderTournamentsTab();
    window.renderTournamentsTabDedicated();
};

window.addLeagueMatch = function(tournId) {
    const tourn = window.tournamentsList.find(t => t.id === tournId);
    if (!tourn) return;
    tourn.matches.push({
        id: `m_${Date.now()}`,
        round: 1,
        p1: tourn.players[0] || 'Open Spot',
        p2: tourn.players[1] || 'Open Spot',
        s1: null,
        s2: null,
        winner: null,
        stage: 'League Match',
        streamUrl: '',
        mvp: null,
        status: 'approved'
    });
    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));
    window.renderTournamentsTab();
    window.renderTournamentsTabDedicated();
    showToast("Added new league fixture slot.");
};

function advanceWinnerInBracket(tourn, completedMatch) {
    if (tourn.format === 'LEAGUE') return;
    if (!completedMatch.winner || completedMatch.winner === 'DRAW') return;

    const nextRound = completedMatch.round + 1;
    let nextMatch = tourn.matches.find(m => m.round === nextRound && (m.p1 === 'TBD' || m.p2 === 'TBD' || !m.p1 || !m.p2));

    let nextStageName = `Round ${nextRound}`;
    if (tourn.format === 'KNOCKOUT' || completedMatch.stage.includes('Knockout') || completedMatch.stage.includes('Round of') || completedMatch.stage.includes('Quarter') || completedMatch.stage.includes('Semi')) {
        nextStageName = getKnockoutStageName(tourn.maxPlayers, nextRound);
    } else if (tourn.format === 'WORLD_CUP' && nextRound === 2) {
        nextStageName = "Round of 16";
    } else if (tourn.format === 'WORLD_CUP' && nextRound === 3) {
        nextStageName = "Quarter-Final";
    }

    if (!nextMatch) {
        nextMatch = { 
            id: `m_${Date.now()}_next`, 
            round: nextRound, 
            p1: completedMatch.winner, 
            p2: 'TBD', 
            s1: null, 
            s2: null, 
            winner: null, 
            stage: nextStageName,
            streamUrl: '',
            mvp: null,
            status: 'approved'
        };
        tourn.matches.push(nextMatch);
    } else {
        if (nextMatch.p1 === 'TBD' || !nextMatch.p1) nextMatch.p1 = completedMatch.winner;
        else if (nextMatch.p2 === 'TBD' || !nextMatch.p2) nextMatch.p2 = completedMatch.winner;
    }
}

window.renderTournamentsTab = function() {
    const container = document.getElementById('tournamentsTabContainer');
    if (!container) return;
    container.innerHTML = generateTournamentsHTML();
};

window.renderTournamentsTabDedicated = function() {
    const container = document.getElementById('tournamentsDedicatedContainer');
    if (!container) return;
    container.innerHTML = generateTournamentsHTML();
};

window.switchActiveTournament = function(tournId) {
    const found = window.tournamentsList.find(t => t.id === tournId);
    if (found) {
        window.activeTournament = found;
        window.renderTournamentsTab();
        window.renderTournamentsTabDedicated();
    }
};

function generateTournamentsHTML() {
    if (!window.tournamentsList || window.tournamentsList.length === 0) {
        return `<div class="glass-panel p-4 rounded-2xl text-center text-xs text-gray-400">No active tournaments. Create one now!</div>`;
    }

    let selectorHtml = `<div class="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2">`;
    window.tournamentsList.forEach(t => {
        const isActive = window.activeTournament && window.activeTournament.id === t.id;
        selectorHtml += `<button onclick="window.switchActiveTournament('${t.id}')" class="px-3 py-1.5 rounded-xl text-[10px] font-extrabold ${isActive ? 'bg-cyan-400 text-slate-950 shadow-md' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'} whitespace-nowrap">${t.title}</button>`;
    });
    selectorHtml += `</div>`;

    const current = window.activeTournament || window.tournamentsList[0];
    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    const isJoined = current.players.includes(me);
    const isHost = current.host.toLowerCase() === me.toLowerCase();

    let formatBadge = current.format === 'WORLD_CUP' ? '🌍 World Cup Style' : (current.format === 'CHAMPIONS_LEAGUE' ? '🏆 Champions League Swiss' : (current.format === 'LEAGUE' ? `📊 Full League Table (${current.leagueH2H || '1x'} H2H)` : '⚡ Single Elimination'));

    let bodyHtml = `
        <div class="glass-panel p-4 rounded-2xl space-y-3 shadow-xl border border-cyan-500/30">
            <div class="flex items-center justify-between border-b border-cyan-500/15 pb-2">
                <div>
                    <h3 class="text-xs font-black text-white uppercase tracking-wider">${current.title}</h3>
                    <p class="text-[9px] text-cyan-400">Host: @${current.host} • ${current.game} • ${current.players.length}/${current.maxPlayers} Registered</p>
                    <div class="flex items-center space-x-2 mt-1">
                        <span class="inline-block text-[8px] bg-magenta/20 text-magenta font-extrabold px-2 py-0.5 rounded-md">${formatBadge}</span>
                        <span class="inline-block text-[8px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-md border border-amber-500/30">🏆 Prize Pool: ${current.prizePool || 'Bragging Rights'}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-1.5">
                    ${isHost ? `<button onclick="window.deleteTournament('${current.id}')" class="px-2 py-1 bg-red-600/20 text-red-400 border border-red-500/30 text-[9px] font-bold rounded-lg"><i class="fa-solid fa-trash mr-1"></i>Delete</button>` : ''}
                    ${!isJoined ? `<button onclick="window.joinActiveTournament('${current.id}')" class="px-3 py-1.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-xl uppercase shadow">Join League</button>` : `<span class="text-[9px] bg-cyan-500/10 text-cyan-400 font-extrabold px-2.5 py-1 rounded-full">✓ Registered</span>`}
                </div>
            </div>
    `;

    if (current.format === 'LEAGUE') {
        let standings = {};
        current.players.forEach(p => {
            if (p && p !== 'Open Spot' && p !== 'TBD') {
                standings[p] = { p: p, played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
            }
        });

        current.matches.forEach(m => {
            if (m.winner !== null && m.p1 !== 'Open Spot' && m.p2 !== 'Open Spot' && m.status === 'approved') {
                if (!standings[m.p1]) standings[m.p1] = { p: m.p1, played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
                if (!standings[m.p2]) standings[m.p2] = { p: m.p2, played: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 };
                
                standings[m.p1].played++;
                standings[m.p2].played++;
                standings[m.p1].gf += m.s1; standings[m.p1].ga += m.s2;
                standings[m.p2].gf += m.s2; standings[m.p2].ga += m.s1;

                if (m.s1 > m.s2) {
                    standings[m.p1].w++; standings[m.p1].pts += 3;
                    standings[m.p2].l++;
                } else if (m.s2 > m.s1) {
                    standings[m.p2].w++; standings[m.p2].pts += 3;
                    standings[m.p1].l++;
                } else {
                    standings[m.p1].d++; standings[m.p1].pts += 1;
                    standings[m.p2].d++; standings[m.p2].pts += 1;
                }
            }
        });

        Object.values(standings).forEach(s => s.gd = s.gf - s.ga);
        let tableArr = Object.values(standings).sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);

        bodyHtml += `
            <div class="bg-gg-950 rounded-xl border border-cyan-500/20 overflow-x-auto mb-3 shadow-inner">
                <table class="w-full text-xs text-left">
                    <thead class="bg-gg-900 text-cyan-400 font-black uppercase text-[9px]">
                        <tr>
                            <th class="px-2 py-1.5">Pos</th>
                            <th class="px-2 py-1.5">Club / Player</th>
                            <th class="px-2 text-center">P</th>
                            <th class="px-2 text-center">W</th>
                            <th class="px-2 text-center">D</th>
                            <th class="px-2 text-center">L</th>
                            <th class="px-2 text-center">GD</th>
                            <th class="px-2 text-center">Pts</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-cyan-500/10 text-gray-200">
        `;
        tableArr.forEach((row, i) => {
            bodyHtml += `
                <tr>
                    <td class="px-2 py-1.5 font-bold">${i+1}</td>
                    <td class="px-2 py-1.5 font-bold text-white truncate max-w-[90px]">@${row.p}</td>
                    <td class="px-2 text-center">${row.played}</td>
                    <td class="px-2 text-center text-emerald-400">${row.w}</td>
                    <td class="px-2 text-center text-gray-400">${row.d}</td>
                    <td class="px-2 text-center text-red-400">${row.l}</td>
                    <td class="px-2 text-center">${row.gd > 0 ? '+'+row.gd : row.gd}</td>
                    <td class="px-2 text-center font-black text-cyan-400">${row.pts}</td>
                </tr>
            `;
        });
        bodyHtml += `</tbody></table></div>`;

        bodyHtml += `<div class="space-y-2 pt-2"><h4 class="text-[10px] font-black text-white uppercase">League Fixtures & Results</h4><div class="space-y-2 max-h-[350px] overflow-y-auto pr-1">`;
        current.matches.forEach(m => {
            bodyHtml += renderBracketMatchCardHex(m, current.id, isHost, 'league');
        });
        bodyHtml += `</div></div>`;

        if (isHost) {
            bodyHtml += `<button onclick="window.addLeagueMatch('${current.id}')" class="w-full py-2 bg-gg-900 border border-cyan-500/30 text-cyan-400 rounded-xl text-xs font-bold mt-2 hover:bg-cyan-500/20 transition">+ Add League Fixture</button>`;
        }

        bodyHtml += `</div></div>`;
        return selectorHtml + bodyHtml;
    }

    bodyHtml += `
        <div class="space-y-3 pt-1">
            <div class="bg-gradient-to-r from-gg-900 via-gg-800 to-gg-900 p-2.5 rounded-xl border border-cyan-500/30 text-center shadow-lg relative">
                <div class="absolute top-1/2 left-3 -translate-y-1/2 flex items-center space-x-1">
                    <span class="w-2 h-2 rounded-full bg-red-500"></span>
                    <span class="text-[8px] font-black uppercase text-red-400">Red Conf</span>
                </div>
                <h4 class="text-[10px] font-black text-white uppercase tracking-widest flex items-center justify-center">
                    <i class="fa-solid fa-trophy text-amber-400 mr-1.5"></i> THE PLAYOFFS BRACKET TREE
                </h4>
                <p class="text-[8px] text-gray-400">Tap any match node to report scores or verify</p>
                <div class="absolute top-1/2 right-3 -translate-y-1/2 flex items-center space-x-1">
                    <span class="text-[8px] font-black uppercase text-blue-400">Blue Conf</span>
                    <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
            </div>
    `;

    if (!current.matches || current.matches.length === 0) {
        bodyHtml += `<p class="text-xs text-gray-400 text-center py-4">Waiting for players to join to generate bracket...</p>`;
    } else {
        let redConferenceMatches = [];
        let blueConferenceMatches = [];
        let finalMatches = [];

        current.matches.forEach((m, idx) => {
            if (m.stage && (m.stage.toLowerCase().includes('final') || m.stage.toLowerCase().includes('semi') || m.stage.toLowerCase().includes('quarter') && idx % 2 !== 0 && idx % 2 === 0)) {
                if (m.stage.toLowerCase() === 'final' || m.stage.toLowerCase().includes('championship')) {
                    finalMatches.push(m);
                } else if (idx % 2 === 0) {
                    redConferenceMatches.push(m);
                } else {
                    blueConferenceMatches.push(m);
                }
            } else if (idx % 2 === 0) {
                redConferenceMatches.push(m);
            } else {
                blueConferenceMatches.push(m);
            }
        });

        if (finalMatches.length === 0) {
            finalMatches.push({
                id: 'final_match_placeholder',
                round: 2,
                p1: 'TBD',
                p2: 'TBD',
                s1: null,
                s2: null,
                winner: null,
                stage: 'FINAL GAME',
                streamUrl: '',
                mvp: null,
                status: 'pending'
            });
        }

        bodyHtml += `
            <div class="grid grid-cols-1 md:grid-cols-11 gap-2 items-center">
                <div class="md:col-span-5 bg-red-950/20 border border-red-500/30 rounded-2xl p-3 space-y-2.5">
                    <div class="flex items-center justify-between border-b border-red-500/20 pb-1.5">
                        <h5 class="text-[10px] font-black text-red-400 uppercase flex items-center"><i class="fa-solid fa-shield mr-1.5"></i> Red Conference Tree</h5>
                        <span class="text-[8px] text-gray-400">Playoff Rounds</span>
                    </div>
                    <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        `;
        redConferenceMatches.forEach(m => {
            bodyHtml += renderBracketMatchCardHex(m, current.id, isHost, 'red');
        });
        bodyHtml += `</div></div>`;

        bodyHtml += `
            <div class="md:col-span-1 flex flex-col items-center justify-center my-2 md:my-0 space-y-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/40 animate-pulse" title="Final Game">
                    <i class="fa-solid fa-trophy text-xs"></i>
                </div>
                <span class="text-[8px] font-black uppercase text-amber-400 tracking-widest text-center">VS</span>
            </div>
        `;

        bodyHtml += `
            <div class="md:col-span-5 bg-blue-950/20 border border-blue-500/30 rounded-2xl p-3 space-y-2.5">
                <div class="flex items-center justify-between border-b border-blue-500/20 pb-1.5">
                    <h5 class="text-[10px] font-black text-blue-400 uppercase flex items-center"><i class="fa-solid fa-shield mr-1.5"></i> Blue Conference Tree</h5>
                    <span class="text-[8px] text-gray-400">Playoff Rounds</span>
                </div>
                <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        `;
        blueConferenceMatches.forEach(m => {
            bodyHtml += renderBracketMatchCardHex(m, current.id, isHost, 'blue');
        });
        bodyHtml += `</div></div>`;

        bodyHtml += `</div>`;

        bodyHtml += `
            <div class="bg-gradient-to-r from-amber-950/50 via-amber-900/40 to-amber-950/50 border border-amber-500/50 rounded-2xl p-3.5 space-y-2 mt-3 shadow-2xl">
                <div class="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
                    <span class="text-[9px] font-black text-amber-400 uppercase flex items-center"><i class="fa-solid fa-crown mr-1.5"></i> Championship Final Showdown</span>
                    <span class="text-[8px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-black">🏆 FINAL GAME</span>
                </div>
                <div class="space-y-2">
        `;
        finalMatches.forEach(m => {
            bodyHtml += renderBracketMatchCardHex(m, current.id, isHost, 'gold');
        });
        bodyHtml += `</div></div>`;
    }

    bodyHtml += `</div></div>`;
    return selectorHtml + bodyHtml;
}

function renderBracketMatchCardHex(m, tournId, isHost, theme = 'red') {
    const isCompleted = m.winner !== null && m.status === 'approved';
    const isDisputed = m.status === 'disputed';
    const hasStream = !!m.streamUrl;
    
    let borderStyle = 'border-cyan-500/20 hover:border-cyan-400';
    if (theme === 'red') borderStyle = 'border-red-500/30 hover:border-red-400 bg-red-950/10';
    if (theme === 'blue') borderStyle = 'border-blue-500/30 hover:border-blue-400 bg-blue-950/10';
    if (theme === 'gold') borderStyle = 'border-amber-500/50 hover:border-amber-400 bg-amber-950/20';
    if (theme === 'league') borderStyle = 'border-cyan-500/20 hover:border-cyan-400 bg-gg-950';

    let p1Html = `<span class="font-extrabold ${m.winner === m.p1 ? 'text-cyan-400 font-black' : 'text-gray-100'}">${m.p1 || 'Open Spot'}</span>`;
    let p2Html = `<span class="font-extrabold ${m.winner === m.p2 ? 'text-cyan-400 font-black' : 'text-gray-100'}">${m.p2 || 'Open Spot'}</span>`;

    return `
        <div class="glass-panel p-2.5 rounded-xl border ${borderStyle} transition shadow-md cursor-pointer space-y-1.5" onclick="window.openMatchReportModal('${m.id}')">
            <div class="flex items-center justify-between text-[9px]">
                <span class="text-cyan-400 font-black uppercase tracking-wider">${m.stage || 'Fixture'}</span>
                <div class="flex items-center space-x-1">
                    ${hasStream ? '<span class="text-[8px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded animate-pulse">🔴 Live Stream</span>' : ''}
                    ${isDisputed ? '<span class="text-[8px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">⚠️ Disputed</span>' : (isCompleted ? '<span class="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black px-1.5 py-0.5 rounded">✓ Final</span>' : '<span class="text-[8px] text-gray-400">Report Score</span>')}
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs bg-gg-950/80 p-2 rounded-lg border border-cyan-500/10">
                <div class="flex items-center justify-between pr-1 border-r border-cyan-500/10">
                    ${p1Html}
                    <span class="font-black text-amber-400 ml-1">${m.s1 !== null ? m.s1 : '-'}</span>
                </div>
                <div class="flex items-center justify-between pl-1">
                    ${p2Html}
                    <span class="font-black text-amber-400 ml-1">${m.s2 !== null ? m.s2 : '-'}</span>
                </div>
            </div>

            ${isHost && (m.p1 === 'Open Spot' || m.p2 === 'Open Spot') ? `
                <div class="flex space-x-1 pt-0.5">
                    ${m.p1 === 'Open Spot' ? `<button onclick="event.stopPropagation(); window.manualAddPlayer('${tournId}', '${m.id}', 'p1')" class="flex-1 py-1 bg-cyan-500/20 text-cyan-300 rounded text-[8px] font-bold">+ Add P1</button>` : ''}
                    ${m.p2 === 'Open Spot' ? `<button onclick="event.stopPropagation(); window.manualAddPlayer('${tournId}', '${m.id}', 'p2')" class="flex-1 py-1 bg-cyan-500/20 text-cyan-300 rounded text-[8px] font-bold">+ Add P2</button>` : ''}
                </div>
            ` : ''}
        </div>
    `;
}

// FYP Feed & Dynamic Feed State
window.fypposts = [];
window.activeCategoryFilter = 'ALL';
window.uploadedMediaBlobs = [];
window.selectedAudioTrack = null;

window.categoryInterests = JSON.parse(localStorage.getItem('sinless_category_interests') || '{}');

window.boostCategoryInterest = function(category) {
    if (!category) return;
    const cat = category.toUpperCase();
    window.categoryInterests[cat] = (window.categoryInterests[cat] || 0) + 1;
    localStorage.setItem('sinless_category_interests', JSON.stringify(window.categoryInterests));
};

window.filterByCategory = function(cat, btnElem) {
    window.activeCategoryFilter = cat;
    document.querySelectorAll('.cat-btn').forEach(b => {
        b.className = "cat-btn px-3 py-1.5 rounded-xl text-[10px] font-bold bg-gg-900 text-gray-400 border border-cyan-500/20 whitespace-nowrap transition";
    });
    if (btnElem) {
        btnElem.className = "cat-btn px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-cyan-400 text-slate-950 whitespace-nowrap shadow transition";
    }
    window.renderFypFeed();
};

window.renderFypFeed = function() {
    const feedContainer = document.getElementById('fypFeedContainer');
    if (!feedContainer) return;

    let posts = [...(window.fypposts || [])];

    if (window.activeCategoryFilter !== 'ALL') {
        if (window.activeCategoryFilter === 'LIVE STREAM') {
            posts = posts.filter(p => p.isLive || p.game === 'LIVE STREAM');
        } else {
            posts = posts.filter(p => (p.game || '').toUpperCase() === window.activeCategoryFilter);
        }
    } else {
        posts.sort((a, b) => {
            const scoreA = (window.categoryInterests[(a.game || '').toUpperCase()] || 0) + (a.ggsCount || 0);
            const scoreB = (window.categoryInterests[(b.game || '').toUpperCase()] || 0) + (b.ggsCount || 0);
            return scoreB - scoreA;
        });
    }

    if (posts.length === 0) {
        feedContainer.innerHTML = `<div class="glass-panel p-8 rounded-2xl text-center space-y-2">
            <i class="fa-solid fa-gamepad text-3xl text-cyan-400 opacity-60"></i>
            <p class="text-xs font-bold text-white">No posts found in ${window.activeCategoryFilter}</p>
            <p class="text-[10px] text-gray-400">Be the first gamer to post a clip or match update!</p>
        </div>`;
        return;
    }

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();

    feedContainer.innerHTML = posts.map(p => {
        const pId = p.docId || p.id;
        const isOwner = p.user && p.user.toLowerCase() === me;
        const hasGGed = p.ggsBy && p.ggsBy.includes(window.currentUser ? window.currentUser.uid : 'guest_user');

        let mediaHtml = '';
        if (p.mediaList && p.mediaList.length > 0) {
            if (p.mediaList.length === 1) {
                const m = p.mediaList[0];
                if (m.type === 'video') {
                    mediaHtml = `
                        <div class="relative rounded-2xl overflow-hidden bg-black max-h-96 border border-cyan-500/20 group cursor-pointer" onclick="window.openMediaZoomModal('video', '${m.url}', '${pId}')">
                            <video src="${m.url}" class="w-full h-full object-cover" controls playsinline></video>
                        </div>
                    `;
                } else {
                    mediaHtml = `
                        <div class="relative rounded-2xl overflow-hidden bg-black max-h-96 border border-cyan-500/20 group cursor-pointer" onclick="window.openMediaZoomModal('image', '${m.url}', '${pId}')">
                            <img src="${m.url}" class="w-full h-full object-cover">
                        </div>
                    `;
                }
            } else {
                mediaHtml = `
                    <div class="grid grid-cols-2 gap-1.5 rounded-2xl overflow-hidden max-h-96 border border-cyan-500/20">
                        ${p.mediaList.map(m => m.type === 'video' 
                            ? `<video src="${m.url}" class="w-full h-36 object-cover bg-black cursor-pointer" onclick="window.openMediaZoomModal('video', '${m.url}', '${pId}')"></video>` 
                            : `<img src="${m.url}" class="w-full h-36 object-cover bg-black cursor-pointer" onclick="window.openMediaZoomModal('image', '${m.url}', '${pId}')">`
                        ).join('')}
                    </div>
                `;
            }
        }

        let audioTrackHtml = '';
        if (p.audioTrack) {
            audioTrackHtml = `
                <div class="flex items-center space-x-2 p-2 bg-gg-900/90 rounded-xl border border-cyan-500/20 text-[10px] text-cyan-300">
                    <i class="fa-solid fa-music animate-spin text-magenta"></i>
                    <span class="font-bold truncate">${p.audioTrack.title || 'Background Sound'}</span>
                </div>
            `;
        }

        const badges = window.getProfileBadges ? window.getProfileBadges(p.user) : '';

        return `
            <div class="glass-panel p-4 rounded-2xl space-y-3 shadow-xl border border-cyan-500/20 hover:border-cyan-500/40 transition">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2.5 cursor-pointer" onclick="window.openUserProfileModal('${p.user}', event)">
                        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-magenta flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                            ${(p.user || 'SG').substring(0,2).toUpperCase()}
                        </div>
                        <div>
                            <div class="flex items-center space-x-1.5">
                                <h4 class="font-bold text-xs text-white hover:text-cyan-400 transition">@${p.user}</h4>
                                ${badges}
                            </div>
                            <p class="text-[9px] text-cyan-400 uppercase font-black tracking-wider">${p.game || 'GAMING'}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        ${isOwner ? `
                            <button onclick="window.openEditPostModal('${pId}')" class="text-gray-400 hover:text-cyan-400 text-xs px-1.5"><i class="fa-solid fa-pen"></i></button>
                            <button onclick="window.deletePost('${pId}')" class="text-gray-400 hover:text-red-400 text-xs px-1.5"><i class="fa-solid fa-trash"></i></button>
                        ` : ''}
                        <button onclick="window.shareContent('Sinless GG Post', 'Check out @${p.user}\'s post on Sinless GG!', window.location.href)" class="text-gray-400 hover:text-white text-xs px-1.5"><i class="fa-solid fa-share-nodes"></i></button>
                    </div>
                </div>

                ${p.caption ? `<p class="text-xs text-gray-200 leading-relaxed font-medium">${formatMentions(p.caption)}</p>` : ''}

                ${mediaHtml}
                ${audioTrackHtml}

                <div class="flex items-center justify-between pt-2 border-t border-cyan-500/15 text-xs text-gray-300 font-bold">
                    <button onclick="window.toggleGGPost('${pId}')" class="flex items-center space-x-1.5 ${hasGGed ? 'text-cyan-400' : 'hover:text-cyan-400'} transition">
                        <i class="fa-solid fa-thumbs-up"></i>
                        <span>${p.ggsCount || 0} GG</span>
                    </button>
                    <button onclick="window.openCommentsModal('${pId}')" class="flex items-center space-x-1.5 hover:text-cyan-400 transition">
                        <i class="fa-solid fa-comment"></i>
                        <span>${p.commentsCount || 0} Replies</span>
                    </button>
                    <button onclick="window.tipCreator('${pId}', '${p.user}')" class="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition">
                        <i class="fa-solid fa-coins"></i>
                        <span>${p.tipsTotal || 0} Tip</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
};

window.listenToCloudPosts = function() {
    if (!window.db || typeof query !== 'function') return;

    try {
        const postsRef = collection(window.db, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"), limit(40));

        onSnapshot(q, async (snapshot) => {
            let cloudPosts = [];
            snapshot.forEach(docSnap => {
                cloudPosts.push({ id: docSnap.id, docId: docSnap.id, ...docSnap.data() });
            });

            const localPosts = await window.loadLocalPostsFromDB();
            let mergedMap = {};

            cloudPosts.forEach(p => { if (p.id) mergedMap[p.id] = p; });
            localPosts.forEach(p => { if (p.id && !mergedMap[p.id]) mergedMap[p.id] = p; });

            window.fypposts = Object.values(mergedMap);
            window.renderFypFeed();
            if (window.renderLadder) window.renderLadder();
            if (window.renderTrendingTopics) window.renderTrendingTopics();
        }, (error) => {
            console.warn("Cloud posts listener error:", error);
        });
    } catch (e) {
        console.error("Firestore feed setup failed:", e);
    }
};

window.handleMediaUploadSelect = function(input) {
    if (!input.files) return;
    const files = Array.from(input.files).slice(0, 10);
    window.uploadedMediaBlobs = [];
    const previewBox = document.getElementById('mediaPreviewThumbnails');
    if (previewBox) previewBox.innerHTML = '';

    files.forEach(file => {
        const isVideo = file.type.includes('video');
        const url = URL.createObjectURL(file);
        window.uploadedMediaBlobs.push({ type: isVideo ? 'video' : 'image', url: url, file: file });

        if (previewBox) {
            previewBox.innerHTML += isVideo
                ? `<div class="aspect-square rounded-lg bg-black overflow-hidden relative border border-cyan-500/20"><video src="${url}" class="w-full h-full object-cover"></video><span class="absolute top-1 right-1 text-[8px] bg-red-600 text-white font-bold px-1 rounded">VID</span></div>`
                : `<div class="aspect-square rounded-lg bg-black overflow-hidden relative border border-cyan-500/20"><img src="${url}" class="w-full h-full object-cover"></div>`;
        }
    });

    const indicator = document.getElementById('mediaCountIndicator');
    if (indicator) indicator.innerText = `${window.uploadedMediaBlobs.length} / 10 selected`;
};

window.audioTracksPreset = [
    { id: 'track_1', title: 'Sinless GG Tournament Theme', artist: 'Sinless Productions', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73421.mp3' },
    { id: 'track_2', title: 'Cyberpunk Esports Hype', artist: 'Gaming Audio', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3' },
    { id: 'track_3', title: 'Champions League Anthem Remix', artist: 'FIFA Beat', url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_884b2c15a5.mp3' }
];

window.openAudioSelector = function() {
    const list = document.getElementById('audioTracksList');
    if (!list) return;

    list.innerHTML = window.audioTracksPreset.map(t => `
        <div class="p-2.5 bg-gg-900 rounded-xl border border-amber-500/20 flex items-center justify-between cursor-pointer hover:border-amber-400 transition" onclick="window.selectAudioTrack('${t.id}')">
            <div>
                <h4 class="text-xs font-bold text-white">${t.title}</h4>
                <p class="text-[9px] text-amber-400">${t.artist}</p>
            </div>
            <button class="px-3 py-1 bg-amber-400 text-slate-950 font-black rounded-lg text-[10px] uppercase shadow">Select</button>
        </div>
    `).join('');

    document.getElementById('audioSelectorModal').classList.remove('hidden');
};

window.closeAudioSelector = function() {
    document.getElementById('audioSelectorModal').classList.add('hidden');
};

window.selectAudioTrack = function(trackId) {
    const track = window.audioTracksPreset.find(t => t.id === trackId);
    if (!track) return;

    window.selectedAudioTrack = track;
    const label = document.getElementById('selectedSoundLabel');
    if (label) label.innerText = `🎵 Sound: ${track.title}`;

    const player = document.getElementById('previewAudioPlayer');
    if (player) {
        player.src = track.url;
        player.play().catch(() => {});
    }

    window.closeAudioSelector();
    showToast(`🎵 Background Track Attached!`);
};

window.stopAudioPreview = function() {
    const player = document.getElementById('previewAudioPlayer');
    if (player) {
        player.pause();
        player.currentTime = 0;
    }
};

window.activeLiveMediaStream = null;
window.activeLiveMediaRecorder = null;

window.openLiveBroadcastModal = function() {
    document.getElementById('liveStreamModal').classList.remove('hidden');
};

window.closeLiveBroadcastModal = function() {
    if (window.activeLiveMediaStream) {
        window.activeLiveMediaStream.getTracks().forEach(track => track.stop());
        window.activeLiveMediaStream = null;
    }
    document.getElementById('liveStreamModal').classList.add('hidden');
};

window.startLiveStream = async function(mode) {
    const video = document.getElementById('liveStreamPreviewVideo');
    const placeholder = document.getElementById('streamPlaceholder');
    const label = document.getElementById('liveStreamStatusLabel');

    if (mode === 'camera') {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            window.activeLiveMediaStream = stream;
            video.srcObject = stream;
            video.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
            if (label) label.innerHTML = `<i class="fa-solid fa-tower-broadcast mr-1.5 animate-pulse text-red-500"></i> LIVE ON CAMERA`;
            showToast("🎥 Camera Broadcast Started!");
        } catch (e) {
            console.error("Camera access error:", e);
            showToast("⚠️ Unable to access camera device.");
        }
    }
};

window.flipCamera = async function() {
    if (!window.activeLiveMediaStream) return;
    window.activeLiveMediaStream.getTracks().forEach(track => track.stop());

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: true });
        window.activeLiveMediaStream = stream;
        const video = document.getElementById('liveStreamPreviewVideo');
        video.srcObject = stream;
        showToast("📷 Switched Camera Facing");
    } catch (e) {
        showToast("Unable to flip camera.");
    }
};

window.togglePauseStream = function() {
    if (!window.activeLiveMediaStream) return;
    const videoTrack = window.activeLiveMediaStream.getVideoTracks()[0];
    if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        showToast(videoTrack.enabled ? "▶️ Video Resumed" : "⏸️ Video Paused");
    }
};

window.toggleAudioMute = function() {
    if (!window.activeLiveMediaStream) return;
    const audioTrack = window.activeLiveMediaStream.getAudioTracks()[0];
    if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        showToast(audioTrack.enabled ? "🎙️ Audio Unmuted" : "🔇 Audio Muted");
    }
};

window.embedExternalStreamLink = function() {
    const url = document.getElementById('streamUrlInput').value.trim();
    if (!url) return;

    let embedUrl = url.replace('watch?v=', 'embed/').replace('twitch.tv/', 'player.twitch.tv/?channel=');
    const iframe = document.getElementById('liveStreamEmbedIframe');
    const video = document.getElementById('liveStreamPreviewVideo');
    const placeholder = document.getElementById('streamPlaceholder');

    iframe.src = embedUrl;
    iframe.classList.remove('hidden');
    video.classList.add('hidden');
    if (placeholder) placeholder.classList.add('hidden');

    showToast("📡 External Live Stream Embedded!");
};

window.activeDmUser = null;
window.dmMessagesList = JSON.parse(localStorage.getItem('sinless_dm_messages') || '{}');

window.openDmModal = function(username = 'SinlessGaming', e = null) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const cleanUser = username.replace('@', '');
    window.activeDmUser = cleanUser;

    const headerUser = document.getElementById('dmHeaderUser');
    if (headerUser) headerUser.innerText = `@${cleanUser}`;

    window.renderDmThread();
    document.getElementById('dmModal').classList.remove('hidden');
};

window.closeDmModal = function() {
    document.getElementById('dmModal').classList.add('hidden');
    window.activeDmUser = null;
};

window.renderDmThread = function() {
    const container = document.getElementById('dmMessagesContainer');
    if (!container || !window.activeDmUser) return;

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    const partner = window.activeDmUser.toLowerCase();
    const threadKey = [me, partner].sort().join('_');

    const msgs = window.dmMessagesList[threadKey] || [];

    if (msgs.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">Start a private chat with @${window.activeDmUser}!</p>`;
        return;
    }

    container.innerHTML = msgs.map(m => {
        const isMine = m.sender.toLowerCase() === me;
        if (m.isImage) {
            return `
                <div class="flex flex-col ${isMine ? 'items-end' : 'items-start'} my-1">
                    <div class="p-2 bg-gg-900 rounded-2xl border border-cyan-500/20 max-w-xs space-y-1">
                        <span class="text-[9px] text-cyan-400 font-bold block">@${m.sender}</span>
                        <img src="${m.imageUrl}" class="max-h-48 rounded-xl object-contain cursor-pointer" onclick="window.openMediaZoomModal('image', '${m.imageUrl}')">
                    </div>
                </div>
            `;
        }
        return `
            <div class="flex flex-col ${isMine ? 'items-end' : 'items-start'} my-1">
                <div class="px-3 py-2 ${isMine ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-gg-900 text-white'} rounded-2xl max-w-xs text-xs shadow-md">
                    <p>${formatMentions(m.text)}</p>
                </div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;
};

window.sendDirectMessage = function() {
    const input = document.getElementById('dmInputText');
    if (!input) return;
    const text = input.value.trim();
    if (!text || !window.activeDmUser) return;

    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    const partner = window.activeDmUser;
    const threadKey = [me.toLowerCase(), partner.toLowerCase()].sort().join('_');

    if (!window.dmMessagesList[threadKey]) window.dmMessagesList[threadKey] = [];

    window.dmMessagesList[threadKey].push({
        sender: me,
        text: text,
        timestamp: Date.now()
    });

    localStorage.setItem('sinless_dm_messages', JSON.stringify(window.dmMessagesList));
    input.value = '';
    window.renderDmThread();
};

window.toggleDirectVoiceCall = function() {
    showToast(`📞 Direct Voice Call Connected with @${window.activeDmUser || 'Gamer'}!`);
};

window.openMarketModal = function() { document.getElementById('marketModal').classList.remove('hidden'); };
window.closeMarketModal = function() { document.getElementById('marketModal').classList.add('hidden'); };

window.submitMarketListingToCloud = async function() {
    const title = document.getElementById('marketTitleInput').value.trim();
    const price = document.getElementById('marketPriceInput').value.trim();

    if (!title || !price) {
        showToast("⚠️ Enter title and price!");
        return;
    }

    const listing = {
        id: 'local_mkt_' + Date.now(),
        title: title,
        price: price,
        user: (window.myUsername || '@SinlessGaming').replace('@', ''),
        uid: window.currentUser ? window.currentUser.uid : 'guest',
        createdAt: new Date().toISOString()
    };

    let savedToCloud = false;
    if (window.db && typeof addDoc === 'function') {
        try {
            await addDoc(collection(window.db, "market"), { ...listing, createdAt: serverTimestamp() });
            savedToCloud = true;
        } catch (e) {
            console.error("Market cloud save failed:", e);
        }
    }

    if (!savedToCloud) {
        window.marketListings = [listing, ...(window.marketListings || [])];
        localStorage.setItem('sinless_market_listings', JSON.stringify(window.marketListings.filter(m => String(m.id).startsWith('local_'))));
        window.renderMarketList();
    }

    showToast(savedToCloud ? "🛍️ Listed on Cloud Market!" : "🛍️ Listing saved on this device!");
    document.getElementById('marketTitleInput').value = '';
    document.getElementById('marketPriceInput').value = '';
    window.closeMarketModal();
};

// ================= MARKET LIST (restored) =================
window.marketListings = JSON.parse(localStorage.getItem('sinless_market_listings') || '[]');

window.renderMarketList = function() {
    const container = document.getElementById('marketListContainer');
    if (!container) return;

    const listings = window.marketListings || [];
    if (listings.length === 0) {
        container.innerHTML = `<div class="glass-panel p-4 rounded-2xl text-center text-xs text-gray-400">No listings yet. Tap "+ List Item" to sell something!</div>`;
        return;
    }

    container.innerHTML = '';
    listings.forEach(m => {
        container.innerHTML += `
            <div class="glass-panel p-3.5 rounded-2xl flex items-center justify-between shadow-lg border border-cyan-500/20">
                <div class="min-w-0 pr-2">
                    <h4 class="text-xs font-extrabold text-white truncate">${escapeHTML(m.title)}</h4>
                    <p class="text-[9px] text-cyan-400">Seller: @${escapeHTML(m.user)}</p>
                </div>
                <div class="text-right shrink-0">
                    <span class="text-xs font-black text-amber-400 block">${escapeHTML(m.price)}</span>
                    <button onclick="openDmModal('${escapeHTML(m.user)}', event)" class="px-3 py-1 bg-cyan-400 text-slate-950 font-black text-[9px] rounded-lg uppercase shadow mt-1">Contact</button>
                </div>
            </div>
        `;
    });
};

window.listenToFirestoreMarket = function() {
    if (!window.db || typeof query !== 'function') return;
    try {
        const q = query(collection(window.db, "market"), orderBy("createdAt", "desc"), limit(30));
        onSnapshot(q, (snapshot) => {
            const cloud = [];
            snapshot.forEach(d => cloud.push({ id: d.id, ...d.data() }));
            const local = JSON.parse(localStorage.getItem('sinless_market_listings') || '[]');
            window.marketListings = [...local, ...cloud];
            window.renderMarketList();
        }, (error) => console.warn("Market listener error:", error));
    } catch (e) {
        console.error("Market listener setup failed:", e);
    }
};

// ================= TRENDING & SEARCH (restored) =================
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
}

window.renderTrendingTopics = function() {
    const container = document.getElementById('dynamicTrendingTopicsList');
    if (!container) return;

    const counts = {};
    (window.fypposts || []).forEach(p => {
        const g = p.game || 'OTHER GAMES';
        counts[g] = (counts[g] || 0) + 1;
    });
    const topics = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    if (topics.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4">Nothing trending yet. Post something!</p>`;
        return;
    }

    container.innerHTML = '';
    topics.forEach(([game, n]) => {
        container.innerHTML += `
            <div class="glass-panel p-3 rounded-xl flex items-center justify-between cursor-pointer" onclick="switchView('fyp'); filterByCategory('${game}')">
                <div>
                    <h4 class="text-xs font-extrabold text-cyan-400">#${game.replace(/\s+/g, '')}</h4>
                    <p class="text-[9px] text-gray-400">${n} post${n === 1 ? '' : 's'}</p>
                </div>
                <i class="fa-solid fa-chevron-right text-gray-500 text-xs"></i>
            </div>
        `;
    });
};

window.handleGlobalSearch = function(text) {
    const q = (text || '').trim().toLowerCase();
    const container = document.getElementById('dynamicTrendingTopicsList');
    if (!container) return;
    if (!q) { window.renderTrendingTopics(); return; }

    const matches = (window.fypposts || []).filter(p =>
        (p.user && p.user.toLowerCase().includes(q)) ||
        (p.caption && p.caption.toLowerCase().includes(q)) ||
        (p.game && p.game.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4">No results for "${escapeHTML(q)}".</p>`;
        return;
    }

    container.innerHTML = '';
    matches.forEach(p => {
        container.innerHTML += `
            <div class="glass-panel p-3 rounded-xl space-y-1 cursor-pointer border border-cyan-500/20" onclick="openUserProfileModal('${escapeHTML(p.user)}', event)">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-extrabold text-cyan-400">@${escapeHTML(p.user)}</span>
                    <span class="text-[9px] text-gray-400 uppercase">${escapeHTML(p.game)}</span>
                </div>
                <p class="text-xs text-gray-200 truncate">${escapeHTML(p.caption) || 'Media Clip'}</p>
            </div>
        `;
    });
};

// ================= SMALL MISSING HELPERS (restored) =================
window.toggleTournamentFormatOptions = function(val) {
    const box = document.getElementById('leagueH2HOptionBox');
    if (box) box.classList.toggle('hidden', val !== 'LEAGUE');
};

window.closeStickyMediaViewer = function() {
    const viewer = document.getElementById('stickyMediaViewer');
    if (viewer) viewer.classList.add('hidden');
    const content = document.getElementById('stickyMediaContent');
    if (content) content.innerHTML = '';
};

window.openAccountModal = function() { document.getElementById('accountModal').classList.remove('hidden'); };
window.closeAccountModal = function() { document.getElementById('accountModal').classList.add('hidden'); };

window.openCreatePostModal = function() { document.getElementById('createPostModal').classList.remove('hidden'); };
window.closeCreatePostModal = function() { document.getElementById('createPostModal').classList.add('hidden'); };

window.activeZoomPostId = null;

window.openMediaZoomModal = function(type, mediaUrl, postId = null, caption = '') {
    window.activeZoomPostId = postId;
    const stage = document.getElementById('mediaZoomStage');
    const title = document.getElementById('mediaZoomTitle');
    if (!stage) return;

    if (title) title.innerText = 'Media Lightbox Preview';

    if (type === 'video') {
        stage.innerHTML = `<video src="${mediaUrl}" class="max-w-full max-h-full object-contain rounded-2xl" controls autoplay></video>`;
    } else if (type === 'image') {
        stage.innerHTML = `<img src="${mediaUrl}" class="max-w-full max-h-full object-contain rounded-2xl">`;
    } else {
        stage.innerHTML = `<div class="p-6 bg-gg-900 rounded-2xl border border-cyan-500/30 text-white text-sm max-w-md text-center">${caption}</div>`;
    }

    window.renderZoomInteractions(postId);
    document.getElementById('mediaZoomModal').classList.remove('hidden');
};

window.closeMediaZoomModal = function() {
    document.getElementById('mediaZoomModal').classList.add('hidden');
    window.activeZoomPostId = null;
};

window.renderZoomInteractions = function(postId) {
    const bar = document.getElementById('mediaZoomInteractionsBar');
    if (!bar) return;

    if (!postId) {
        bar.innerHTML = '';
        return;
    }

    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
    if (!post) {
        bar.innerHTML = '';
        return;
    }

    const hasGGed = post.ggsBy && post.ggsBy.includes(window.currentUser ? window.currentUser.uid : 'guest_user');

    bar.innerHTML = `
        <div class="flex items-center space-x-2 text-xs text-white">
            <span class="font-bold text-cyan-400">@${post.user}</span>
            <span class="text-[9px] text-gray-400 uppercase">${post.game || 'POST'}</span>
        </div>
        <div class="flex items-center space-x-3 text-xs">
            <button onclick="window.toggleGGPost('${postId}')" class="flex items-center space-x-1 ${hasGGed ? 'text-cyan-400' : 'text-gray-300'} font-bold">
                <i class="fa-solid fa-thumbs-up"></i>
                <span>${post.ggsCount || 0}</span>
            </button>
            <button onclick="window.openCommentsModal('${postId}')" class="flex items-center space-x-1 text-gray-300 font-bold">
                <i class="fa-solid fa-comment"></i>
                <span>${post.commentsCount || 0}</span>
            </button>
        </div>
    `;
};

window.switchView = function(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('[id^="nav-"]').forEach(b => {
        b.className = "flex-1 py-2 px-2.5 text-[10px] rounded-xl text-gray-400 font-bold transition hover:text-white whitespace-nowrap";
    });

    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) {
        activeNav.className = "flex-1 py-2 px-2.5 text-[10px] rounded-xl bg-magenta text-white font-extrabold transition shadow-lg whitespace-nowrap";
    }

    if (viewId === 'tournaments') {
        window.renderTournamentsTabDedicated();
    } else if (viewId === 'clans') {
        window.renderClansList();
    } else if (viewId === 'standings') {
        window.renderTournamentsTab();
        window.renderLadder();
    } else if (viewId === 'popular') {
        window.renderTopAccounts();
    }
};

window.renderLadder = function() {
    const container = document.getElementById('ladderBody');
    if (!container) return;

    const { sortedCreators } = calculateGlobalRanks();

    if (sortedCreators.length === 0) {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4">No creators ranked yet.</p>`;
        return;
    }

    container.innerHTML = sortedCreators.slice(0, 10).map((c, i) => `
        <div class="p-2.5 flex items-center justify-between text-xs cursor-pointer hover:bg-gg-900/50 transition" onclick="window.openUserProfileModal('${c.gamertag}', event)">
            <div class="flex items-center space-x-2.5">
                <span class="font-black text-amber-400 text-xs w-4">#${i + 1}</span>
                <div>
                    <h4 class="font-bold text-white">@${c.gamertag}</h4>
                    <p class="text-[9px] text-gray-400">${c.postsCount} Clips Published</p>
                </div>
            </div>
            <span class="font-black text-cyan-400 text-xs">${c.totalGGs} GGs</span>
        </div>
    `).join('');
};

window.renderTopAccounts = function() {
    const container = document.getElementById('topAccountsList');
    if (!container) return;

    const { sortedCreators } = calculateGlobalRanks();

    container.innerHTML = sortedCreators.map((c, i) => `
        <div class="glass-panel p-3 rounded-xl flex items-center justify-between text-xs border border-cyan-500/15 hover:border-cyan-400 transition cursor-pointer" onclick="window.openUserProfileModal('${c.gamertag}', event)">
            <div class="flex items-center space-x-3">
                <span class="font-black text-amber-400 w-5">#${i + 1}</span>
                <div>
                    <h4 class="font-bold text-white">@${c.gamertag}</h4>
                    <p class="text-[9px] text-cyan-400 font-semibold">${c.postsCount} Posts • ${c.totalGGs} Total GGs</p>
                </div>
            </div>
            <button class="px-3 py-1 bg-cyan-400 text-slate-950 font-black rounded-lg text-[10px] uppercase shadow">View Profile</button>
        </div>
    `).join('');
};

window.sendChatMessage = function() {
    const input = document.getElementById('chatInputMsg');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    const box = document.getElementById('chatMessagesBox');

    if (box) {
        box.innerHTML += `
            <div class="bg-gg-900 p-2.5 rounded-xl border border-cyan-500/15 space-y-0.5">
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold text-cyan-400 cursor-pointer" onclick="window.openUserProfileModal('${me}', event)">@${me}</span>
                    <span class="text-[8px] text-gray-500">Just now</span>
                </div>
                <p class="text-xs text-gray-200">${formatMentions(text)}</p>
            </div>
        `;
        box.scrollTop = box.scrollHeight;
    }

    input.value = '';
};

window.toggleVoiceLobbyConnection = function() {
    const label = document.getElementById('voiceStatusLabel');
    const btn = document.getElementById('voiceLobbyToggleBtn');

    if (label && label.innerText.includes('Disconnected')) {
        label.innerText = 'Voice Connected (Live)';
        label.className = 'text-[9px] text-emerald-400 font-extrabold animate-pulse';
        if (btn) btn.innerHTML = `<i class="fa-solid fa-microphone-slash"></i><span>Leave Voice Channel</span>`;
        showToast("🎙️ Connected to Global Voice Channel!");
    } else if (label) {
        label.innerText = 'Voice Disconnected';
        label.className = 'text-[9px] text-gray-400 font-extrabold';
        if (btn) btn.innerHTML = `<i class="fa-solid fa-microphone"></i><span>Join Voice Channel</span>`;
        showToast("Voice Channel Disconnected.");
    }
};

window.initApp = async function() {
    window.updateCoinDisplay();
    pruneExpiredEphemeralData();

    const localStories = await window.loadLocalStoriesFromDB();
    if (localStories && localStories.length > 0) {
        window.profileStories = localStories;
        window.renderStoriesBar();
    }

    if (window.listenToCloudPosts) window.listenToCloudPosts();
    if (window.listenToFirestoreSquads) window.listenToFirestoreSquads();

    if (window.listenToFirestoreMarket) window.listenToFirestoreMarket();

    if (window.renderFypFeed) window.renderFypFeed();
    if (window.renderClansList) window.renderClansList();
    if (window.renderTournamentsTab) window.renderTournamentsTab();
    if (window.renderTournamentsTabDedicated) window.renderTournamentsTabDedicated();
    if (window.renderMarketList) window.renderMarketList();
    if (window.renderTrendingTopics) window.renderTrendingTopics();
};
