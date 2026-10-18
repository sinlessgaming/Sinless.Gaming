// ======================================================================
// SINLESS GG - APP LOGIC (MODULE VERSION - PART 1)
// ======================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, doc, deleteDoc, updateDoc, 
    arrayUnion, arrayRemove, increment, query, orderBy, limit, 
    onSnapshot, serverTimestamp, where, getDocs, getDoc 
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

// ================= SITE-STYLED POPUPS (replace browser prompt/confirm) =================
window.sgDialog = function({ title = '', message = '', note = '', input = false, inputType = 'text', defaultValue = '', placeholder = '', okText = 'OK', cancelText = 'Cancel', danger = false }) {
    return new Promise((resolve) => {
        const modal = document.getElementById('sgDialogModal');
        const titleEl = document.getElementById('sgDialogTitle');
        const msgEl = document.getElementById('sgDialogMessage');
        const noteEl = document.getElementById('sgDialogNote');
        const inputEl = document.getElementById('sgDialogInput');
        const okBtn = document.getElementById('sgDialogOk');
        const cancelBtn = document.getElementById('sgDialogCancel');

        if (!modal) {
            // Fallback if the popup HTML is missing
            resolve(input ? window.prompt(message, defaultValue) : window.confirm(message));
            return;
        }

        titleEl.innerText = title;
        titleEl.classList.toggle('hidden', !title);
        msgEl.innerText = message;
        noteEl.innerText = note;
        noteEl.classList.toggle('hidden', !note);

        inputEl.classList.toggle('hidden', !input);
        inputEl.type = inputType;
        inputEl.value = defaultValue;
        inputEl.placeholder = placeholder;

        okBtn.innerText = okText;
        cancelBtn.innerText = cancelText;
        okBtn.className = danger
            ? 'flex-1 py-2.5 bg-red-600 text-white font-black rounded-xl text-xs uppercase shadow'
            : 'flex-1 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black rounded-xl text-xs uppercase shadow';

        const finish = (result) => {
            modal.classList.add('hidden');
            okBtn.onclick = null;
            cancelBtn.onclick = null;
            inputEl.onkeydown = null;
            resolve(result);
        };

        okBtn.onclick = () => finish(input ? inputEl.value : true);
        cancelBtn.onclick = () => finish(input ? null : false);
        inputEl.onkeydown = (e) => { if (e.key === 'Enter') finish(inputEl.value); };

        modal.classList.remove('hidden');
        if (input) setTimeout(() => { inputEl.focus(); inputEl.select(); }, 50);
    });
};

window.sgPrompt = function(message, opts = {}) {
    return window.sgDialog({ ...opts, message, input: true });
};

window.sgConfirm = function(message, opts = {}) {
    return window.sgDialog({ ...opts, message, input: false });
};

// ================= "TIME AGO" FORMATTER =================
window.timeAgo = function(value) {
    if (!value) return 'Just now';
    let date;
    if (typeof value.toDate === 'function') date = value.toDate();            // Firestore Timestamp
    else if (typeof value.seconds === 'number') date = new Date(value.seconds * 1000);
    else date = new Date(value);                                               // ISO string or number
    if (isNaN(date.getTime())) return '';

    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secs < 60) return 'Just now';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    const sameYear = date.getFullYear() === new Date().getFullYear();
    return date.toLocaleDateString(undefined, sameYear
        ? { day: 'numeric', month: 'short' }
        : { day: 'numeric', month: 'short', year: 'numeric' });
};

window.postTimeValue = function(p) {
    const v = p && p.createdAt;
    if (!v) return Date.now();
    if (typeof v.toDate === 'function') return v.toDate().getTime();
    if (typeof v.seconds === 'number') return v.seconds * 1000;
    const t = new Date(v).getTime();
    return isNaN(t) ? 0 : t;
};

// Refresh the "time ago" labels every minute without reloading the feed
setInterval(() => {
    document.querySelectorAll('[data-time]').forEach(el => {
        const t = parseInt(el.getAttribute('data-time'));
        if (t) el.innerText = window.timeAgo(t);
    });
}, 60000);

window.tipCreator = async function(postId, creatorUsername) {
    const tipAmount = await window.sgPrompt(`How many GG Coins do you want to tip @${creatorUsername}?`, { title: '🪙 Tip Creator', defaultValue: '10', inputType: 'number', note: `Your balance: ${window.myGGCoins} GG Coins`, okText: 'Send Tip' });
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

// ================= CLOUDINARY (photos & videos) =================
window.CLOUDINARY_CLOUD_NAME = 'gppuryi3';
window.CLOUDINARY_UPLOAD_PRESET = 'Sinless GG';
window.CLOUDINARY_FOLDER = 'sinlessgg';

// Uploads a File (or image data URL) and returns { url, type }
window.uploadToCloudinary = function(fileOrDataUrl, onProgress) {
    return new Promise((resolve, reject) => {
        const fd = new FormData();
        fd.append('file', fileOrDataUrl);
        fd.append('upload_preset', window.CLOUDINARY_UPLOAD_PRESET);
        fd.append('folder', window.CLOUDINARY_FOLDER);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${window.CLOUDINARY_CLOUD_NAME}/auto/upload`);
        xhr.upload.onprogress = (e) => { if (e.lengthComputable && onProgress) onProgress(Math.round(e.loaded / e.total * 100)); };
        xhr.onload = () => {
            let data = {};
            try { data = JSON.parse(xhr.responseText); } catch (e) {}
            if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
                const type = data.resource_type === 'video' ? 'video' : 'image';
                // Ask Cloudinary for phone-friendly versions (smaller, faster to load)
                // Store the clean original link; sizes/quality are chosen when showing it (see cldSized)
                const url = data.secure_url;
                resolve({ url, type });
            } else {
                reject(new Error((data.error && data.error.message) || `Upload failed (${xhr.status})`));
            }
        };
        xhr.onerror = () => reject(new Error('No internet connection'));
        xhr.send(fd);
    });
};

// Prepares a picked file: shrinks big photos first (saves your free storage), checks video size
window.prepareAndUpload = async function(file, onProgress, maxW = 2048, maxH = 2048) {
    const isVideo = file.type.includes('video');
    if (isVideo && file.size > 100 * 1024 * 1024) throw new Error('Video is over 100 MB. Please trim it.');
    if (isVideo || file.type === 'image/gif') return window.uploadToCloudinary(file, onProgress);
    const shrunk = await window.compressImageSharp(file, maxW, maxH);
    return window.uploadToCloudinary(shrunk, onProgress);
};

// High-quality phone-side compression: WebP at 0.86 looks practically identical to the original
// but is usually 5-10x smaller than a phone camera photo. Falls back to JPEG 0.9.
window.compressImageSharp = function(file, maxW = 2048, maxH = 2048) {
    return new Promise((resolve) => {
        const img = new Image();
        const objUrl = URL.createObjectURL(file);
        img.onload = () => {
            let w = img.naturalWidth, h = img.naturalHeight;
            const scale = Math.min(1, maxW / w, maxH / h);
            w = Math.round(w * scale); h = Math.round(h * scale);
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(objUrl);
            let out = canvas.toDataURL('image/webp', 0.86);
            if (!out.startsWith('data:image/webp')) out = canvas.toDataURL('image/jpeg', 0.9);
            // If our version is somehow bigger than the original, keep the original
            resolve(out.length * 0.75 > file.size ? file : out);
        };
        img.onerror = () => { URL.revokeObjectURL(objUrl); resolve(file); };
        img.src = objUrl;
    });
};

// Builds the best Cloudinary link for where the media is shown.
// f_auto = best format for the phone, q_auto:good = sharp but light, c_limit,w_ = never bigger than needed
window.cldSized = function(url, width, kind = 'image') {
    if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
    const [base, rest] = url.split('/upload/');
    // drop any older transformation segment so we don't stack them
    const parts = rest.split('/');
    if (parts.length > 1 && /(^|,)(f_|q_|w_|c_|vc_|so_)/.test(parts[0])) parts.shift();
    const t = kind === 'video'
        ? `f_auto:video,q_auto:good,vc_auto,c_limit,w_${width}`
        : `f_auto,q_auto:good,c_limit,w_${width}`;
    return `${base}/upload/${t}/${parts.join('/')}`;
};

// Still frame used as the video cover, so the video itself only downloads when someone taps play
window.cldPoster = function(url, width = 720) {
    if (!url || !url.includes('res.cloudinary.com') || !url.includes('/video/upload/')) return '';
    const sized = window.cldSized(url, width, 'image').replace('/video/upload/f_auto,', '/video/upload/so_0,f_auto,');
    return sized.replace(/\.[a-z0-9]+$/i, '.jpg');
};

// 1234 -> 1.2K, 1500000 -> 1.5M
window.formatCount = function(n) {
    n = Number(n) || 0;
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'K';
    return String(n);
};

// ================= POST VIEWS =================
// How views are counted (generous, but always from real people looking at posts):
//  • A post counts 1 view after it's ~60% on screen for 1 second.
//  • While someone keeps looking, it counts again every few seconds (like replays), up to 4 per stay.
//  • Scrolling away and coming back after 20+ seconds counts again.
//  • Opening a post full screen counts too, and keeps counting while it stays open.
// Views are saved in small batches (not one save per view) to protect the free Firebase limits.
window.VIEW_RULES = { firstAfterMs: 1000, repeatEveryMs: 4500, maxPerStay: 4, revisitAfterMs: 20000, saveEveryMs: 15000 };
window.viewState = {};          // per post: { lastStayEnd, timer, interval, countThisStay }
window.pendingViewSaves = {};   // per post: views not yet saved to the cloud

window.addPostViews = function(postId, n = 1) {
    if (!postId || n <= 0) return;
    const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
    if (!post) return;
    post.viewsCount = (post.viewsCount || 0) + n;
    const badge = document.getElementById(`viewsCounterBadge_${postId}`);
    if (badge) badge.innerText = window.formatCount(post.viewsCount);
    const targetId = post.docId || post.id;
    if (targetId && !String(targetId).startsWith('local_')) {
        window.pendingViewSaves[targetId] = (window.pendingViewSaves[targetId] || 0) + n;
    }
};

window.flushViewSaves = function() {
    if (!window.db) return;
    const batch = window.pendingViewSaves;
    window.pendingViewSaves = {};
    Object.entries(batch).forEach(([id, n]) => {
        if (n > 0) updateDoc(doc(window.db, "posts", id), { viewsCount: increment(n) }).catch(() => {});
    });
};
setInterval(() => window.flushViewSaves(), window.VIEW_RULES.saveEveryMs);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') window.flushViewSaves(); });
window.addEventListener('pagehide', () => window.flushViewSaves());

window.startViewStay = function(id) {
    const R = window.VIEW_RULES;
    const st = window.viewState[id] || (window.viewState[id] = {});
    if (st.timer || st.interval) return;                                       // already counting
    if (st.lastStayEnd && Date.now() - st.lastStayEnd < R.revisitAfterMs) return; // came back too quickly
    st.countThisStay = 0;
    st.timer = setTimeout(() => {
        st.timer = null;
        window.addPostViews(id, 1); st.countThisStay = 1;
        st.interval = setInterval(() => {
            if (st.countThisStay >= R.maxPerStay) { clearInterval(st.interval); st.interval = null; return; }
            window.addPostViews(id, 1); st.countThisStay++;
        }, R.repeatEveryMs);
    }, R.firstAfterMs);
};

window.endViewStay = function(id) {
    const st = window.viewState[id];
    if (!st) return;
    if (st.timer) { clearTimeout(st.timer); st.timer = null; }
    if (st.interval) { clearInterval(st.interval); st.interval = null; }
    if (st.countThisStay > 0) st.lastStayEnd = Date.now();
};

// Kept for older calls (e.g. opening a post full screen)
window.countPostView = function(postId) { window.startViewStay(postId); };

window.observePostViews = function() {
    if (!('IntersectionObserver' in window)) return;
    if (!window.postViewObserver) {
        window.postViewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('data-post-id');
                if (!id) return;
                if (entry.isIntersecting) window.startViewStay(id); else window.endViewStay(id);
            });
        }, { threshold: 0.6 });
    }
    window.postViewObserver.disconnect();
    document.querySelectorAll('[data-post-id]').forEach(el => window.postViewObserver.observe(el));
};

window.submitUniversalPost = async function() {
    const publishBtn = document.getElementById('publishPostBtn');
    let text = document.getElementById('postTextContent').value.trim();
    let cat = document.getElementById('postCategorySelect').value;
    let audioTrack = window.selectedAudioTrack || null;
    const picked = window.uploadedMediaBlobs || [];

    if(!text && picked.length === 0) {
        showToast("⚠️ Write a caption or select media to post!");
        return;
    }

    if (publishBtn) {
        publishBtn.disabled = true;
        publishBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Publishing...`;
    }

    // Upload photos/videos to Cloudinary first, so everyone can see them
    let mediaList = [];
    try {
        for (let i = 0; i < picked.length; i++) {
            const m = picked[i];
            if (!m.file) { mediaList.push({ type: m.type, url: m.url }); continue; }
            const uploaded = await window.prepareAndUpload(m.file, (pct) => {
                if (publishBtn) publishBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up mr-1"></i> Uploading ${i + 1}/${picked.length} · ${pct}%`;
            });
            mediaList.push(uploaded);
        }
    } catch (err) {
        console.error("Media upload failed:", err);
        showToast(`⚠️ Upload failed: ${err.message}`);
        if (publishBtn) {
            publishBtn.disabled = false;
            publishBtn.innerHTML = `🚀 Publish Post with Media`;
        }
        return;
    }
    if (publishBtn) publishBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Publishing...`;

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
    if (window.refreshPostDetailStats) window.refreshPostDetailStats(postId);

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
                                <span class="text-xs font-bold text-cyan-400 cursor-pointer" onclick="closeCommentsModal(); closeMediaZoomModal(); openUserProfileModal('${c.user}', event)">@${c.user}</span>
                            </div>
                            <span class="text-[9px] text-gray-400" data-time="${window.postTimeValue(c)}">${window.timeAgo(window.postTimeValue(c))}</span>
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
    if (!window.currentUser) { showToast("🔐 Sign in with Google (side menu → Account) to reply."); return; }

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
    const coinsEarned = userPosts.reduce((sum, p) => sum + (p.tipsTotal || 0), 0);
    const tipsEl = document.getElementById('profileTipsReceived');
    if (tipsEl) tipsEl.innerText = `${window.formatCount(coinsEarned)} received in tips`;
    const viewsEl = document.getElementById('profileViewsCount');
    if (viewsEl) viewsEl.innerText = window.formatCount(userPosts.reduce((sum, p) => sum + (p.viewsCount || 0), 0));
    const walletRow = document.getElementById('profileWalletRow');
    if (walletRow) {
        const mine = (window.myUsername || '').replace('@', '').toLowerCase() === cleanUser.toLowerCase();
        walletRow.classList.toggle('hidden', !mine);
        const bal = document.getElementById('profileWalletBalance');
        if (bal) bal.innerText = `${window.formatCount(window.myGGCoins)} GG Coins`;
    }

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
                    mediaThumbnail = window.cldPoster(m.url, 400) ? `<img src="${window.cldPoster(m.url, 400)}" loading="lazy" class="w-full h-full object-cover pointer-events-none">` : `<video src="${m.url}" preload="metadata" class="w-full h-full object-cover pointer-events-none"></video>`;
                } else {
                    mediaThumbnail = `<img src="${window.cldSized(m.url, 400)}" loading="lazy" class="w-full h-full object-cover">`;
                }
                postsContainer.innerHTML += `
                    <div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-gg-950 border border-cyan-500/20 group cursor-pointer hover:border-cyan-400 transition" onclick="event.stopPropagation(); window.openMediaZoomModal('${firstMediaType}', '${firstMediaUrl}', '${pId}')">
                        ${mediaThumbnail}
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-90 pointer-events-none"></div>
                        <div class="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px] text-white font-extrabold z-10">
                            <span class="flex items-center space-x-2"><span class="flex items-center text-cyan-400"><i class="fa-solid fa-thumbs-up mr-1 text-[8px]"></i>${p.ggsCount || 0}</span><span class="flex items-center text-gray-200"><i class="fa-solid fa-eye mr-1 text-[8px]"></i>${window.formatCount(p.viewsCount || 0)}</span></span>
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
                            <span class="flex items-center space-x-2"><span class="flex items-center text-cyan-400"><i class="fa-solid fa-thumbs-up mr-1 text-[8px]"></i>${p.ggsCount || 0}</span><span class="flex items-center text-gray-200"><i class="fa-solid fa-eye mr-1 text-[8px]"></i>${window.formatCount(p.viewsCount || 0)}</span></span>
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
        showToast("Uploading profile picture...");
        try {
            const up = await window.prepareAndUpload(input.files[0], null, 500, 500);
            window.tempProfilePfp = up.url;
        } catch (e) {
            window.tempProfilePfp = await compressImage(input.files[0], 300, 300, 0.8);
        }
        showToast("Profile Picture Ready! Tap Save.");
    }
};

window.handleCoverUpload = async function(input) {
    if (input.files && input.files[0]) {
        showToast("Uploading cover photo...");
        try {
            const up = await window.prepareAndUpload(input.files[0], null, 1500, 800);
            window.tempProfileCover = up.url;
        } catch (e) {
            window.tempProfileCover = await compressImage(input.files[0], 900, 450, 0.8);
        }
        showToast("Cover Photo Ready! Tap Save.");
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
    if (!(await window.sgConfirm('This deletes your profile data on this device and signs you out. This cannot be undone.', { title: 'Delete Account?', okText: 'Delete', danger: true }))) return;

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
    // Open the chat channel first so people can type straight away
    window.switchSquadSubRoom(squad.subRooms.includes('chat') ? 'chat' : (squad.subRooms[0] || 'chat'));

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

window.promptCreateSubRoom = async function() {
    const squad = window.activeSquadDetails;
    if (!squad) return;

    const name = await window.sgPrompt('Name your new channel (e.g. tactics, highlights, transfers)', { title: '# New Channel', placeholder: 'channel-name', okText: 'Create' });
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

window.deleteSubRoom = async function(room) {
    const squad = window.activeSquadDetails;
    if (!squad || !(await window.sgConfirm(`All messages in #${room} will be removed.`, { title: 'Delete Channel?', okText: 'Delete', danger: true }))) return;

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
    const lockedBar = document.getElementById('squadLockedBar');
    if (lockedBar) { lockedBar.classList.add('hidden'); lockedBar.innerHTML = ''; }
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
        if (lockedBar) {
            lockedBar.innerHTML = `🔒 Join this squad to chat &nbsp;<button onclick="window.toggleSquadMembership('${squad.id}'); window.switchSquadSubRoom('${room}')" class="ml-1 px-3 py-1 bg-emerald-500 text-slate-950 rounded-lg font-black text-[10px] uppercase">Join</button>`;
            lockedBar.classList.remove('hidden');
        }
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
                            <span class="text-[8px] text-gray-500">${m.timestamp ? window.timeAgo(m.timestamp) : (m.time || '')}</span>
                        </div>
                        <p class="text-xs text-gray-200">${formatMentions(m.text)}</p>
                    </div>
                `;
            }
        });
    }

    if (room === 'Rules/Announcements' && !isAdmin) {
        if (inputContainer) inputContainer.style.display = 'none';
        if (lockedBar) {
            lockedBar.innerHTML = `🔒 Only the owner and admins can post in #${room}. <button onclick="window.switchSquadSubRoom('chat')" class="ml-1 underline text-cyan-400">Go to #chat</button>`;
            lockedBar.classList.remove('hidden');
        }
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

window.transferOwnership = async function(newOwner) {
    const squad = window.activeSquadDetails;
    if (!squad || !(await window.sgConfirm(`@${newOwner} will become the owner of ${squad.name}. You will no longer be the owner.`, { title: 'Transfer Ownership?', okText: 'Transfer', danger: true }))) return;

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
    if (!squad || !(await window.sgConfirm(`${squad.name} and all its channels will be deleted. This cannot be undone.`, { title: 'Disband Squad?', okText: 'Disband', danger: true }))) return;

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

// ================= STORIES (shared with everyone, gone after 24h like WhatsApp) =================
window.STORY_LIFETIME_MS = 24 * 3600000;
window.profileStories = [];
window.cloudStories = [];
window.localOnlyStories = [];

window.storyExpiresAt = function(s) {
    if (s.expiresAt) {
        if (typeof s.expiresAt.toDate === 'function') return s.expiresAt.toDate().getTime();
        if (typeof s.expiresAt.seconds === 'number') return s.expiresAt.seconds * 1000;
        return new Date(s.expiresAt).getTime();
    }
    return (s.timestamp || 0) + window.STORY_LIFETIME_MS;
};

window.mergeStories = function() {
    const now = Date.now();
    window.profileStories = [...window.cloudStories, ...window.localOnlyStories]
        .filter(s => window.storyExpiresAt(s) > now)
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    window.renderStoriesBar();
};

window.initStories = async function() {
    // Old on-device stories: keep only unexpired ones, delete the rest for good
    try {
        const local = await window.loadLocalStoriesFromDB();
        const now = Date.now();
        window.localOnlyStories = [];
        for (const st of (local || [])) {
            if (window.storyExpiresAt(st) > now) window.localOnlyStories.push(st);
            else await window.deleteLocalStory(st.id);
        }
    } catch (e) {}
    window.mergeStories();

    if (window.db) {
        try {
            const q = query(collection(window.db, 'stories'), where('expiresAt', '>', new Date()), orderBy('expiresAt', 'asc'), limit(150));
            onSnapshot(q, (snap) => {
                window.cloudStories = [];
                snap.forEach(d => {
                    const data = d.data();
                    window.cloudStories.push({ id: d.id, ...data, timestamp: window.postTimeValue(data) });
                });
                window.mergeStories();
            }, (err) => console.warn('Stories listener:', err));
        } catch (e) { console.warn('Stories setup failed', e); }
    }
};

// Permanently delete expired stories from the database (anyone signed in can tidy up expired ones)
window.cleanupExpiredStories = async function() {
    if (!window.db || !window.currentUser) return;
    try {
        const snap = await getDocs(query(collection(window.db, 'stories'), where('expiresAt', '<=', new Date()), limit(25)));
        snap.forEach(d => deleteDoc(doc(window.db, 'stories', d.id)).catch(() => {}));
    } catch (e) {}
};

window.deleteLocalStory = async function(id) {
    try {
        const db = await openPostDB();
        db.transaction('local_stories', 'readwrite').objectStore('local_stories').delete(id);
    } catch (e) {}
};

// Every minute: drop anything that just turned 24h old
setInterval(() => {
    const before = window.profileStories.length;
    window.mergeStories();
    if (window.profileStories.length !== before) {
        const viewer = document.getElementById('storyViewerModal');
        if (viewer && !viewer.classList.contains('hidden') && !window.profileStories.some(s => s.id === window.storyViewer.list[window.storyViewer.index]?.id)) window.closeStoryViewer();
        window.cleanupExpiredStories();
    }
}, 60000);

window.triggerStoryUpload = function() {
    if (!window.currentUser) { showToast("🔐 Sign in with Google (side menu → Account) to post stories."); return; }
    document.getElementById('storyFileInput').click();
};

window.uploadProfileStory = async function(input) {
    if (!(input.files && input.files[0])) return;
    const file = input.files[0];
    if (!window.currentUser) { showToast("🔐 Sign in to post stories."); input.value = ''; return; }
    const caption = (await window.sgPrompt('Add a caption (optional)', { title: '✨ New Story', placeholder: 'Say something...', okText: 'Post Story', cancelText: 'Skip' })) || '';

    showToast("Uploading story...");
    try {
        const up = await window.prepareAndUpload(file, null, 1080, 1920);
        await addDoc(collection(window.db, 'stories'), {
            user: (window.myUsername || '@SinlessGaming').replace('@', ''),
            uid: window.currentUser.uid,
            type: up.type,
            mediaUrl: up.url,
            caption: caption,
            createdAt: serverTimestamp(),
            expiresAt: new Date(Date.now() + window.STORY_LIFETIME_MS)
        });
        showToast("✨ Story posted! It disappears in 24 hours.");
    } catch (err) {
        console.error('Story upload failed:', err);
        showToast(`⚠️ Story failed: ${err.message || 'try again'}`);
    }
    input.value = '';
};

// One bubble per person (your own first), like WhatsApp status
window.renderStoriesBar = function() {
    const container = document.getElementById('activeStoriesContainer');
    if (!container) return;
    const me = (window.myUsername || '').replace('@', '').toLowerCase();
    const groups = {};
    window.profileStories.forEach(st => { (groups[st.user] = groups[st.user] || []).push(st); });
    const users = Object.keys(groups).sort((a, b) => {
        if (a.toLowerCase() === me) return -1;
        if (b.toLowerCase() === me) return 1;
        return Math.max(...groups[b].map(x => x.timestamp || 0)) - Math.max(...groups[a].map(x => x.timestamp || 0));
    });
    const seen = (() => { try { return JSON.parse(localStorage.getItem('sinless_seen_stories') || '{}'); } catch (e) { return {}; } })();

    container.innerHTML = users.map(u => {
        const list = groups[u].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        const latest = list[list.length - 1];
        const allSeen = list.every(x => seen[x.id]);
        const thumb = latest.type === 'video'
            ? (window.cldPoster(latest.mediaUrl, 160) || '')
            : window.cldSized(latest.mediaUrl, 160);
        const ring = allSeen ? 'bg-gray-600' : 'bg-gradient-to-tr from-cyan-400 via-magenta to-amber-400';
        return `
            <div class="flex flex-col items-center shrink-0 cursor-pointer space-y-1 group" onclick="window.openStoryViewer('${u}')">
                <div class="w-14 h-14 rounded-full p-0.5 ${ring} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    ${thumb ? `<img src="${thumb}" class="w-full h-full rounded-full object-cover border-2 border-slate-950" loading="lazy">`
                            : `<div class="w-full h-full rounded-full bg-gg-900 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-cyan-400">${u.slice(0, 2).toUpperCase()}</div>`}
                </div>
                <span class="text-[8px] font-extrabold text-gray-300 truncate max-w-[60px]">${u.toLowerCase() === me ? 'Your story' : '@' + u}</span>
            </div>`;
    }).join('');
};

// ---------- Story viewer: progress bars, tap left/right, auto-advance ----------
window.storyViewer = { list: [], index: 0, timer: null };

window.openStoryViewer = function(user) {
    const list = window.profileStories.filter(s => s.user === user).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    if (!list.length) return;
    const seen = (() => { try { return JSON.parse(localStorage.getItem('sinless_seen_stories') || '{}'); } catch (e) { return {}; } })();
    const firstUnseen = list.findIndex(s => !seen[s.id]);
    window.storyViewer = { list, index: firstUnseen >= 0 ? firstUnseen : 0, timer: null };
    window.pauseFeedVideos && window.pauseFeedVideos();
    document.getElementById('storyViewerModal').classList.remove('hidden');
    window.showStory();
};

window.showStory = function() {
    const sv = window.storyViewer;
    clearTimeout(sv.timer);
    const st = sv.list[sv.index];
    if (!st) { window.closeStoryViewer(); return; }
    try {
        const seen = JSON.parse(localStorage.getItem('sinless_seen_stories') || '{}');
        seen[st.id] = Date.now();
        localStorage.setItem('sinless_seen_stories', JSON.stringify(seen));
    } catch (e) {}

    const me = (window.myUsername || '').replace('@', '').toLowerCase();
    const mine = (window.currentUser && st.uid === window.currentUser.uid) || (st.user || '').toLowerCase() === me;
    const left = Math.max(0, window.storyExpiresAt(st) - Date.now());
    const hrs = Math.floor(left / 3600000), mins = Math.floor((left % 3600000) / 60000);

    document.getElementById('storyProgress').innerHTML = sv.list.map((_, i) =>
        `<div class="flex-1 h-0.5 rounded bg-white/30 overflow-hidden"><div id="storyBar${i}" class="h-full bg-white" style="width:${i < sv.index ? 100 : 0}%"></div></div>`).join('');
    document.getElementById('storyHeader').innerHTML = `
        <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-magenta flex items-center justify-center text-slate-950 font-black text-[10px]">${(st.user || '?').slice(0, 2).toUpperCase()}</div>
            <div><p class="text-xs font-bold text-white">@${st.user}</p><p class="text-[9px] text-gray-300">${window.timeAgo(st.timestamp)} · disappears in ${hrs}h ${mins}m</p></div>
        </div>
        <div class="flex items-center space-x-2">
            ${mine ? `<button onclick="window.deleteMyStory('${st.id}')" class="w-8 h-8 rounded-full bg-black/50 text-red-400 text-xs"><i class="fa-solid fa-trash"></i></button>` : ''}
            <button onclick="window.closeStoryViewer()" class="w-8 h-8 rounded-full bg-black/50 text-white text-sm">✕</button>
        </div>`;

    const stage = document.getElementById('storyStage');
    const bar = () => document.getElementById('storyBar' + sv.index);
    if (st.type === 'video') {
        stage.innerHTML = `<video id="storyVideo" src="${window.cldSized(st.mediaUrl, 1080, 'video')}" class="max-w-full max-h-full object-contain" autoplay playsinline></video>`;
        const v = document.getElementById('storyVideo');
        v.ontimeupdate = () => { if (v.duration && bar()) bar().style.width = (v.currentTime / v.duration * 100) + '%'; };
        v.onended = () => window.nextStory();
        v.onerror = () => { sv.timer = setTimeout(window.nextStory, 3000); };
    } else {
        stage.innerHTML = `<img src="${window.cldSized(st.mediaUrl, 1080)}" class="max-w-full max-h-full object-contain">`;
        requestAnimationFrame(() => { const b = bar(); if (b) { b.style.transition = 'width 5s linear'; b.style.width = '100%'; } });
        sv.timer = setTimeout(window.nextStory, 5000);
    }
    document.getElementById('storyCaption').innerHTML = st.caption ? `<p class="text-sm text-white text-center font-semibold bg-black/40 rounded-xl px-3 py-2">${formatMentions(st.caption)}</p>` : '';
};

window.nextStory = function() { window.storyViewer.index++; window.showStory(); };
window.prevStory = function() { window.storyViewer.index = Math.max(0, window.storyViewer.index - 1); window.showStory(); };

window.closeStoryViewer = function() {
    clearTimeout(window.storyViewer.timer);
    const v = document.getElementById('storyVideo'); if (v) v.pause();
    document.getElementById('storyStage').innerHTML = '';
    document.getElementById('storyViewerModal').classList.add('hidden');
    window.renderStoriesBar();
    window.pickFeedVideoToPlay && setTimeout(window.pickFeedVideoToPlay, 100);
};

window.deleteMyStory = async function(id) {
    clearTimeout(window.storyViewer.timer);
    const ok = await window.sgConfirm('This story will be removed for everyone.', { title: 'Delete Story?', okText: 'Delete', danger: true });
    if (!ok) { window.showStory(); return; }
    try { await deleteDoc(doc(window.db, 'stories', id)); } catch (e) {}
    window.localOnlyStories = window.localOnlyStories.filter(s => s.id !== id);
    window.deleteLocalStory(id);
    window.cloudStories = window.cloudStories.filter(s => s.id !== id);
    window.storyViewer.list = window.storyViewer.list.filter(s => s.id !== id);
    window.mergeStories();
    showToast('Story deleted.');
    window.showStory();
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

window.leaveTournament = async function(tournId) {
    const tourn = window.tournamentsList.find(t => t.id === tournId);
    const me = (window.myUsername || '@SinlessGaming').replace('@', '');
    if (!tourn) return;

    const isMe = (name) => (name || '').toLowerCase() === me.toLowerCase();
    if (!tourn.players.some(isMe)) {
        showToast("You're not registered in this tournament.");
        return;
    }

    // Can't drop out once you've already played a match
    const isNum = v => v !== null && v !== undefined && v !== '' && !isNaN(v);
    const alreadyPlayed = tourn.matches.some(m => (isMe(m.p1) || isMe(m.p2)) && isNum(m.s1) && isNum(m.s2));
    if (alreadyPlayed) {
        showToast("⚠️ You've already played a match, so you can't leave now. Ask the host.");
        return;
    }

    const ok = await window.sgConfirm(`You'll be removed from ${tourn.title} and your spot will open up for someone else.`, { title: 'Leave Tournament?', okText: 'Leave', danger: true });
    if (!ok) return;

    tourn.players = tourn.players.filter(p => !isMe(p));
    tourn.matches.forEach(m => {
        if (isMe(m.p1)) m.p1 = 'Open Spot';
        if (isMe(m.p2)) m.p2 = 'Open Spot';
    });

    localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList));
    showToast(`You left ${tourn.title}.`);
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
                    ${!isJoined
                        ? (current.players.length >= current.maxPlayers
                            ? `<span class="text-[9px] bg-red-500/10 text-red-400 font-extrabold px-2.5 py-1 rounded-full">Full</span>`
                            : `<button onclick="window.joinActiveTournament('${current.id}')" class="px-3 py-1.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-xl uppercase shadow">Register</button>`)
                        : `<div class="flex flex-col items-end space-y-1"><span class="text-[9px] bg-cyan-500/10 text-cyan-400 font-extrabold px-2.5 py-1 rounded-full">✓ Registered</span><button onclick="window.leaveTournament('${current.id}')" class="text-[9px] text-red-400 font-bold underline">Leave</button></div>`}
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

// ================= FEED ORDER (fresh on top, shuffle when content is thin) =================
window.feedOrder = null;              // list of post ids in the order shown
window.pendingNewIds = new Set();     // new posts waiting behind the "New posts" pill
window.FEED_FRESH_MS = 6 * 3600000;   // posts newer than 6h always go on top (newest first)
window.FEED_SHUFFLE_BELOW = 60;       // fewer posts than this = shuffle the rest on every refresh

window.isMyPost = function(p) {
    const me = (window.myUsername || '').replace('@', '').toLowerCase();
    return (window.currentUser && p.uid === window.currentUser.uid) || (p.user || '').toLowerCase() === me;
};

window.feedScore = function(p) {
    const ageDays = (Date.now() - window.postTimeValue(p)) / 86400000;
    return (window.categoryInterests[(p.game || '').toUpperCase()] || 0)
        + 2 * (p.ggsCount || 0) + 3 * (p.commentsCount || 0) + 0.05 * (p.viewsCount || 0)
        + 10 / (1 + ageDays);
};

window.rebuildFeedOrder = function() {
    const all = window.fypposts || [];
    const now = Date.now();
    const fresh = all.filter(p => now - window.postTimeValue(p) < window.FEED_FRESH_MS)
        .sort((a, b) => window.postTimeValue(b) - window.postTimeValue(a));
    const freshIds = new Set(fresh.map(p => p.docId || p.id));
    const few = all.length < window.FEED_SHUFFLE_BELOW;
    const rest = all.filter(p => !freshIds.has(p.docId || p.id))
        .map(p => ({ p, s: window.feedScore(p) * (few ? (0.3 + Math.random() * 1.4) : (0.9 + Math.random() * 0.2)) }))
        .sort((a, b) => b.s - a.s).map(x => x.p);
    window.feedOrder = [...fresh, ...rest].map(p => p.docId || p.id);
    window.pendingNewIds.clear();
    window.updateNewPostsPill();
};

window.isFeedNearTop = function() {
    const view = document.getElementById('view-fyp');
    return view && !view.classList.contains('hidden') && (window.scrollY || document.documentElement.scrollTop) < 150;
};

// Works out which posts to show, in which order. New arrivals go straight to the top
// if you're at the top of the feed (or it's your own post); otherwise they wait behind the pill.
window.getOrderedFeed = function() {
    const all = window.fypposts || [];
    if (!window.feedOrder) window.rebuildFeedOrder();
    const byId = {};
    all.forEach(p => { byId[p.docId || p.id] = p; });
    const known = new Set(window.feedOrder);
    const arrivals = all.filter(p => !known.has(p.docId || p.id))
        .sort((a, b) => window.postTimeValue(b) - window.postTimeValue(a));
    const atTop = window.isFeedNearTop();
    const toTop = [];
    arrivals.forEach(p => {
        const id = p.docId || p.id;
        if (atTop || window.isMyPost(p)) toTop.push(id);
        else window.pendingNewIds.add(id);
    });
    if (toTop.length) window.feedOrder = [...toTop, ...window.feedOrder];
    window.updateNewPostsPill();
    return window.feedOrder.filter(id => byId[id] && !window.pendingNewIds.has(id)).map(id => byId[id]);
};

window.updateNewPostsPill = function() {
    const pill = document.getElementById('newPostsPill');
    if (!pill) return;
    const n = window.pendingNewIds.size;
    if (!n) { pill.classList.add('hidden'); return; }
    const users = [...window.pendingNewIds].map(id => (window.fypposts || []).find(p => (p.docId || p.id) === id)).filter(Boolean).map(p => p.user).slice(0, 3);
    pill.innerHTML = `<i class="fa-solid fa-arrow-up mr-1.5"></i>${users.map(u => `<span class="inline-flex w-5 h-5 -ml-1 first:ml-0 rounded-full bg-gradient-to-tr from-cyan-400 to-magenta text-slate-950 text-[8px] font-black items-center justify-center border border-gg-950">${(u || 'SG').slice(0, 2).toUpperCase()}</span>`).join('')}<span class="ml-1.5">${n} new post${n === 1 ? '' : 's'}</span>`;
    pill.classList.remove('hidden');
};

window.showNewPosts = function() {
    window.rebuildFeedOrder();
    window.renderFypFeed();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Full refresh (pull-to-refresh, coming back to the app)
window.refreshFeed = function(silent) {
    window.rebuildFeedOrder();
    window.renderFypFeed();
    if (!silent) showToast("✨ Feed refreshed");
};

// ================= FEED CARD =================
window.feedMuted = true;

window.renderFeedCard = function(p, me) {
    const pId = p.docId || p.id;
    const isOwner = p.user && p.user.toLowerCase() === me;
    const hasGGed = p.ggsBy && p.ggsBy.includes(window.currentUser ? window.currentUser.uid : 'guest_user');

    let mediaHtml = '';
    if (p.mediaList && p.mediaList.length > 0) {
        if (p.mediaList.length === 1) {
            const m = p.mediaList[0];
            if (m.type === 'video') {
                mediaHtml = `
                    <div class="relative rounded-2xl overflow-hidden bg-black border border-cyan-500/20">
                        <video data-feed-video="${pId}" data-src-raw="${m.url}" src="${window.cldSized(m.url, 720, 'video')}" poster="${window.cldPoster(m.url)}" class="w-full max-h-[28rem] object-contain bg-black" muted loop playsinline preload="none"></video>
                        <div class="absolute bottom-2 right-2 flex space-x-1.5">
                            <button onclick="window.toggleFeedMute()" class="feed-mute-btn w-8 h-8 rounded-full bg-black/60 text-white text-xs flex items-center justify-center"><i class="fa-solid ${window.feedMuted ? 'fa-volume-xmark' : 'fa-volume-high'}"></i></button>
                            <button onclick="window.floatVideo('${pId}', '${m.url}', this)" class="w-8 h-8 rounded-full bg-black/60 text-white text-xs flex items-center justify-center" title="Float video"><i class="fa-solid fa-clone"></i></button>
                        </div>
                    </div>`;
            } else {
                mediaHtml = `
                    <div class="relative rounded-2xl overflow-hidden bg-black max-h-[28rem] border border-cyan-500/20">
                        <img src="${window.cldSized(m.url, 1080)}" loading="lazy" class="w-full max-h-[28rem] object-cover">
                    </div>`;
            }
        } else {
            mediaHtml = `
                <div class="grid grid-cols-2 gap-1.5 rounded-2xl overflow-hidden border border-cyan-500/20">
                    ${p.mediaList.slice(0, 4).map((m, i) => {
                        const more = (i === 3 && p.mediaList.length > 4) ? `<div class="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-black text-lg">+${p.mediaList.length - 4}</div>` : '';
                        return m.type === 'video'
                            ? `<div class="relative h-40 bg-black"><img src="${window.cldPoster(m.url, 480)}" class="w-full h-40 object-cover" loading="lazy" onerror="this.style.display='none'"><i class="fa-solid fa-circle-play absolute inset-0 m-auto w-8 h-8 text-3xl text-white/90 flex items-center justify-center"></i>${more}</div>`
                            : `<div class="relative h-40"><img src="${window.cldSized(m.url, 600)}" loading="lazy" class="w-full h-40 object-cover bg-black">${more}</div>`;
                    }).join('')}
                </div>`;
        }
    }

    const audioTrackHtml = p.audioTrack ? `
        <div class="flex items-center space-x-2 p-2 bg-gg-900/90 rounded-xl border border-cyan-500/20 text-[10px] text-cyan-300">
            <i class="fa-solid fa-music animate-spin text-magenta"></i>
            <span class="font-bold truncate">${p.audioTrack.title || 'Background Sound'}</span>
        </div>` : '';

    const badges = window.getProfileBadges ? window.getProfileBadges(p.user) : '';
    const caption = p.caption || '';
    const longCaption = caption.length > 280;

    return `
        <div class="post-card-item glass-panel p-4 rounded-2xl space-y-3 shadow-xl border border-cyan-500/20 hover:border-cyan-500/40 transition cursor-pointer" data-post-id="${pId}" onclick="window.onPostCardTap(event, '${pId}')">
            <div class="flex items-center justify-between">
                <div data-noexpand class="flex items-center space-x-2.5 cursor-pointer" onclick="window.openUserProfileModal('${p.user}', event)">
                    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-magenta flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                        ${(p.user || 'SG').substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <div class="flex items-center space-x-1.5">
                            <h4 class="font-bold text-xs text-white hover:text-cyan-400 transition">@${p.user}</h4>
                            ${badges}
                        </div>
                        <p class="text-[9px] uppercase font-black tracking-wider"><span class="text-cyan-400">${p.game || 'GAMING'}</span> <span class="text-gray-500 normal-case font-bold tracking-normal">· <span data-time="${window.postTimeValue(p)}">${window.timeAgo(window.postTimeValue(p))}</span></span></p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    ${isOwner ? `
                        <button onclick="window.openEditPostModal('${pId}')" class="text-gray-400 hover:text-cyan-400 text-xs px-1.5"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="window.deletePost('${pId}')" class="text-gray-400 hover:text-red-400 text-xs px-1.5"><i class="fa-solid fa-trash"></i></button>
                    ` : ''}
                </div>
            </div>

            ${caption ? `<p class="text-xs text-gray-200 leading-relaxed font-medium whitespace-pre-wrap break-words">${formatMentions(longCaption ? caption.slice(0, 280) + '…' : caption)}${longCaption ? ' <span class="text-cyan-400 font-bold">Show more</span>' : ''}</p>` : ''}

            ${mediaHtml}
            ${audioTrackHtml}

            <div class="flex items-center justify-between pt-2 border-t border-cyan-500/15 text-xs text-gray-300 font-bold">
                <button onclick="window.toggleGGPost('${pId}')" class="flex items-center space-x-1.5 ${hasGGed ? 'text-cyan-400' : 'hover:text-cyan-400'} transition">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>${window.formatCount(p.ggsCount || 0)}</span>
                </button>
                <button onclick="window.openPostDetail('${pId}', true)" class="flex items-center space-x-1.5 hover:text-cyan-400 transition">
                    <i class="fa-solid fa-comment"></i>
                    <span>${window.formatCount(p.commentsCount || 0)}</span>
                </button>
                <span class="flex items-center space-x-1.5 text-gray-400">
                    <i class="fa-solid fa-eye"></i>
                    <span id="viewsCounterBadge_${pId}">${window.formatCount(p.viewsCount || 0)}</span>
                </span>
                <button onclick="window.tipCreator('${pId}', '${p.user}')" class="flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 transition">
                    <i class="fa-solid fa-coins"></i>
                    <span>Tip</span>
                </button>
                <button onclick="window.sharePost('${pId}')" class="flex items-center space-x-1.5 hover:text-cyan-400 transition">
                    <i class="fa-solid fa-share-nodes"></i>
                </button>
            </div>
        </div>
    `;
};

// Tapping anywhere on a post (except its buttons) opens the full post view
window.onPostCardTap = function(e, pId) {
    if (e.target.closest('button, a, input, textarea, [data-noexpand]')) return;
    window.openPostDetail(pId);
};

window.renderFypFeed = function() {
    const feedContainer = document.getElementById('fypFeedContainer');
    if (!feedContainer) return;

    // Remember a playing video so re-drawing the feed doesn't restart it
    const playing = [...feedContainer.querySelectorAll('video[data-feed-video]')].find(v => !v.paused);
    const resume = playing ? { id: playing.getAttribute('data-feed-video'), t: playing.currentTime } : null;

    let posts = window.getOrderedFeed();

    if (window.activeCategoryFilter && window.activeCategoryFilter !== 'ALL') {
        if (window.activeCategoryFilter === 'LIVE STREAM') {
            posts = posts.filter(p => p.isLive || p.game === 'LIVE STREAM');
        } else {
            posts = posts.filter(p => (p.game || '').toUpperCase() === window.activeCategoryFilter);
        }
    }

    if (posts.length === 0) {
        feedContainer.innerHTML = `<div class="glass-panel p-8 rounded-2xl text-center space-y-2">
            <i class="fa-solid fa-gamepad text-3xl text-cyan-400 opacity-60"></i>
            <p class="text-xs font-bold text-white">No posts found in ${window.activeCategoryFilter || 'the feed'}</p>
            <p class="text-[10px] text-gray-400">Be the first gamer to post a clip or match update!</p>
        </div>`;
        return;
    }

    const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
    feedContainer.innerHTML = posts.map(p => window.renderFeedCard(p, me)).join('');

    if (resume) {
        const v = feedContainer.querySelector(`video[data-feed-video="${resume.id}"]`);
        if (v) { v.preload = 'auto'; v.currentTime = resume.t; }
    }
    if (window.observePostViews) window.observePostViews();
    if (window.setupFeedAutoplay) window.setupFeedAutoplay();
};

// ================= TIKTOK-STYLE AUTOPLAY =================
// The video that's most on screen plays (muted until you tap the speaker); others pause.
window.setupFeedAutoplay = function() {
    if (!('IntersectionObserver' in window)) return;
    if (!window.feedVideoObserver) {
        window.feedVideoRatios = new Map();
        window.feedVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(en => window.feedVideoRatios.set(en.target, en.intersectionRatio));
            window.pickFeedVideoToPlay();
        }, { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] });
    }
    window.feedVideoObserver.disconnect();
    window.feedVideoRatios.clear();
    document.querySelectorAll('video[data-feed-video]').forEach(v => {
        v.muted = window.feedMuted;
        window.feedVideoObserver.observe(v);
    });
};

window.pickFeedVideoToPlay = function() {
    const feedVisible = !document.getElementById('view-fyp').classList.contains('hidden');
    const overlayOpen = ['postDetailModal', 'mediaZoomModal', 'storyViewerModal', 'userProfileModal'].some(id => {
        const el = document.getElementById(id); return el && !el.classList.contains('hidden');
    });
    let best = null, bestRatio = 0.6;
    if (feedVisible && !overlayOpen) {
        window.feedVideoRatios.forEach((r, v) => { if (r >= bestRatio && document.body.contains(v)) { best = v; bestRatio = r; } });
    }
    document.querySelectorAll('video[data-feed-video]').forEach(v => {
        if (v === best) { if (v.paused) { v.preload = 'auto'; v.muted = window.feedMuted; v.play().catch(() => {}); } }
        else if (!v.paused) v.pause();
    });
};

window.pauseFeedVideos = function() {
    document.querySelectorAll('video[data-feed-video]').forEach(v => { if (!v.paused) v.pause(); });
};

window.toggleFeedMute = function() {
    window.feedMuted = !window.feedMuted;
    document.querySelectorAll('video[data-feed-video]').forEach(v => { v.muted = window.feedMuted; });
    document.querySelectorAll('.feed-mute-btn i').forEach(i => { i.className = `fa-solid ${window.feedMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`; });
};

window.addEventListener('scroll', () => { if (window.feedVideoRatios) window.pickFeedVideoToPlay(); }, { passive: true });

// ================= PULL TO REFRESH + AUTO REFRESH =================
(function setupPullToRefresh() {
    let startY = null, pulling = false;
    const ind = () => document.getElementById('pullRefreshIndicator');
    window.addEventListener('touchstart', (e) => {
        const view = document.getElementById('view-fyp');
        const anyModal = document.querySelector('.fixed.inset-0:not(.hidden)');
        if (view && !view.classList.contains('hidden') && !anyModal && window.scrollY <= 0) { startY = e.touches[0].clientY; pulling = true; }
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        if (!pulling || startY === null) return;
        const dy = Math.max(0, Math.min(120, e.touches[0].clientY - startY));
        const el = ind();
        if (el) { el.style.height = (dy * 0.6) + 'px'; el.style.opacity = Math.min(1, dy / 80); el.querySelector('i').style.transform = `rotate(${dy * 3}deg)`; }
    }, { passive: true });
    window.addEventListener('touchend', (e) => {
        if (!pulling) return;
        const el = ind();
        const dy = startY === null ? 0 : (e.changedTouches[0].clientY - startY);
        pulling = false; startY = null;
        if (dy > 80) {
            if (el) { el.style.height = '44px'; el.querySelector('i').classList.add('fa-spin'); }
            setTimeout(() => {
                window.refreshFeed();
                if (window.loadLiveMatches) window.loadLiveMatches();
                if (el) { el.style.height = '0px'; el.style.opacity = 0; el.querySelector('i').classList.remove('fa-spin'); }
            }, 600);
        } else if (el) { el.style.height = '0px'; el.style.opacity = 0; }
    });
})();

// Coming back to the app after 3+ minutes: fresh, re-shuffled feed (like X)
(function setupAutoRefresh() {
    let hiddenAt = 0;
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') { hiddenAt = Date.now(); window.pauseFeedVideos(); }
        else if (hiddenAt && Date.now() - hiddenAt > 3 * 60000) {
            if (window.isFeedNearTop()) window.refreshFeed(true);
            else { (window.fypposts || []).forEach(p => { if (!window.feedOrder.includes(p.docId || p.id)) window.pendingNewIds.add(p.docId || p.id); }); window.updateNewPostsPill(); }
        }
    });
})();

// ================= FULL POST VIEW (tap any post) =================
window.activeDetailPostId = null;
window.detailCommentsUnsub = null;

window.findPost = function(id) { return (window.fypposts || []).find(p => p.id === id || p.docId === id); };

window.openPostDetail = function(postId, focusReply = false) {
    const post = window.findPost(postId);
    if (!post) return;
    window.pauseFeedVideos();
    window.activeDetailPostId = postId;
    window.renderPostDetail(post);
    document.getElementById('postDetailModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.countPostView) window.countPostView(postId);
    try { history.replaceState(null, '', '#post=' + postId); } catch (e) {}
    window.loadDetailComments(postId);
    if (focusReply) setTimeout(() => {
        document.getElementById('postDetailComments').scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('postDetailReplyInput').focus();
    }, 250);
};

window.closePostDetail = function() {
    const modal = document.getElementById('postDetailModal');
    modal.querySelectorAll('video').forEach(v => v.pause());
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (window.activeDetailPostId && window.endViewStay) window.endViewStay(window.activeDetailPostId);
    window.activeDetailPostId = null;
    if (window.detailCommentsUnsub) { window.detailCommentsUnsub(); window.detailCommentsUnsub = null; }
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (window.pickFeedVideoToPlay) setTimeout(window.pickFeedVideoToPlay, 100);
};

window.renderPostDetail = function(p) {
    const pId = p.docId || p.id;
    const me = (window.myUsername || '').replace('@', '').toLowerCase();
    const isOwner = (p.user || '').toLowerCase() === me;
    const badges = window.getProfileBadges ? window.getProfileBadges(p.user) : '';
    const when = new Date(window.postTimeValue(p));

    const media = (p.mediaList || []).map(m => m.type === 'video'
        ? `<div class="relative bg-black rounded-2xl overflow-hidden border border-cyan-500/20">
               <video src="${window.cldSized(m.url, 1280, 'video')}" poster="${window.cldPoster(m.url, 1080)}" class="w-full max-h-[75vh] object-contain bg-black" controls autoplay playsinline controlsList="nodownload"></video>
               <button onclick="window.floatVideo('${pId}', '${m.url}', this)" class="absolute top-2 right-2 px-2.5 py-1.5 rounded-full bg-black/70 text-white text-[10px] font-bold"><i class="fa-solid fa-clone mr-1"></i>Float</button>
           </div>`
        : `<img src="${window.cldSized(m.url, 1600)}" class="w-full rounded-2xl border border-cyan-500/20 bg-black cursor-zoom-in" onclick="window.openMediaZoomModal('image', '${m.url}', '${pId}')">`
    ).join('');

    const big = !(p.mediaList && p.mediaList.length) && (p.caption || '').length < 140;

    document.getElementById('postDetailBody').innerHTML = `
        <div class="max-w-xl mx-auto p-4 space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3 cursor-pointer" onclick="window.closePostDetail(); window.openUserProfileModal('${p.user}', event)">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-magenta flex items-center justify-center text-slate-950 font-black text-sm shadow-lg">${(p.user || 'SG').slice(0, 2).toUpperCase()}</div>
                    <div>
                        <div class="flex items-center flex-wrap gap-1.5"><span class="font-black text-sm text-white">@${p.user}</span>${badges}</div>
                        <span class="text-[10px] font-black text-cyan-400 uppercase tracking-wider">${p.game || 'GAMING'}</span>
                    </div>
                </div>
                ${isOwner ? `<div class="flex items-center space-x-1">
                    <button onclick="window.closePostDetail(); window.openEditPostModal('${pId}')" class="w-9 h-9 rounded-xl bg-gg-900 text-gray-300 text-xs"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="window.closePostDetail(); window.deletePost('${pId}')" class="w-9 h-9 rounded-xl bg-gg-900 text-red-400 text-xs"><i class="fa-solid fa-trash"></i></button>
                </div>` : ''}
            </div>

            ${p.caption ? `<p class="${big ? 'text-xl font-extrabold leading-snug' : 'text-[15px] leading-relaxed'} text-white whitespace-pre-wrap break-words">${formatMentions(p.caption)}</p>` : ''}
            ${media ? `<div class="space-y-2">${media}</div>` : ''}
            ${p.audioTrack ? `<div class="flex items-center space-x-2 p-2.5 bg-gg-900 rounded-xl border border-cyan-500/20 text-xs text-cyan-300"><i class="fa-solid fa-music text-magenta"></i><span class="font-bold truncate">${p.audioTrack.title || 'Sound'}</span></div>` : ''}

            <p class="text-[11px] text-gray-400 font-semibold">${when.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} · ${when.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>

            <div class="flex items-center space-x-4 py-2.5 border-y border-cyan-500/15 text-xs">
                <span><b id="pdViews" class="text-white">${window.formatCount(p.viewsCount || 0)}</b> <span class="text-gray-400">Views</span></span>
                <span><b id="pdGGs" class="text-white">${window.formatCount(p.ggsCount || 0)}</b> <span class="text-gray-400">GGs</span></span>
                <span><b id="pdReplies" class="text-white">${window.formatCount(p.commentsCount || 0)}</b> <span class="text-gray-400">Replies</span></span>
            </div>

            <div class="grid grid-cols-4 gap-2 text-xs font-bold">
                <button id="pdGGBtn" onclick="window.toggleGGPost('${pId}')" class="py-2.5 rounded-xl bg-gg-900 border border-cyan-500/20 flex flex-col items-center gap-1"><i class="fa-solid fa-thumbs-up text-base"></i><span>GG</span></button>
                <button onclick="document.getElementById('postDetailReplyInput').focus()" class="py-2.5 rounded-xl bg-gg-900 border border-cyan-500/20 text-gray-300 flex flex-col items-center gap-1"><i class="fa-solid fa-comment text-base"></i><span>Reply</span></button>
                <button onclick="window.sharePost('${pId}')" class="py-2.5 rounded-xl bg-gg-900 border border-cyan-500/20 text-gray-300 flex flex-col items-center gap-1"><i class="fa-solid fa-share-nodes text-base"></i><span>Share</span></button>
                <button onclick="window.tipCreator('${pId}', '${p.user}')" class="py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex flex-col items-center gap-1"><i class="fa-solid fa-coins text-base"></i><span>Tip</span></button>
            </div>

            <div id="postDetailComments" class="space-y-2.5 pb-24">
                <h4 class="text-[11px] font-black text-white uppercase tracking-wider">Replies</h4>
                <div id="postDetailCommentsList" class="space-y-2.5"><p class="text-xs text-gray-500 py-3">Loading replies…</p></div>
            </div>
        </div>`;
    window.refreshPostDetailStats(pId);
};

window.refreshPostDetailStats = function(postId) {
    if (window.activeDetailPostId !== postId) return;
    const p = window.findPost(postId);
    if (!p) return;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = window.formatCount(v || 0); };
    set('pdViews', p.viewsCount); set('pdGGs', p.ggsCount); set('pdReplies', p.commentsCount);
    const btn = document.getElementById('pdGGBtn');
    if (btn) {
        const on = p.ggsBy && p.ggsBy.includes(window.currentUser ? window.currentUser.uid : 'guest_user');
        btn.className = `py-2.5 rounded-xl border flex flex-col items-center gap-1 ${on ? 'bg-cyan-400 text-slate-950 border-cyan-400' : 'bg-gg-900 text-gray-300 border-cyan-500/20'}`;
    }
};

window.loadDetailComments = function(postId) {
    const list = document.getElementById('postDetailCommentsList');
    if (window.detailCommentsUnsub) { window.detailCommentsUnsub(); window.detailCommentsUnsub = null; }
    if (!window.db || String(postId).startsWith('local_')) {
        list.innerHTML = `<p class="text-xs text-gray-500 py-3">Replies work on posts saved to the cloud.</p>`;
        return;
    }
    const q = query(collection(window.db, "posts", postId, "comments"), orderBy("createdAt", "asc"), limit(100));
    window.detailCommentsUnsub = onSnapshot(q, (snap) => {
        if (snap.empty) { list.innerHTML = `<p class="text-xs text-gray-500 py-3">No replies yet. Start the conversation 👇</p>`; return; }
        list.innerHTML = '';
        snap.forEach(d => {
            const c = d.data();
            list.innerHTML += `
                <div class="flex space-x-2.5">
                    <div class="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-tr from-cyan-400/70 to-magenta/70 flex items-center justify-center text-slate-950 font-black text-[10px] cursor-pointer" onclick="window.closePostDetail(); window.openUserProfileModal('${c.user}', event)">${(c.user || '?').slice(0, 2).toUpperCase()}</div>
                    <div class="flex-1 bg-gg-900/80 rounded-2xl rounded-tl-sm px-3 py-2 border border-cyan-500/10">
                        <div class="flex items-center justify-between"><span class="text-[11px] font-bold text-cyan-400">@${c.user}</span><span class="text-[9px] text-gray-500" data-time="${window.postTimeValue(c)}">${window.timeAgo(window.postTimeValue(c))}</span></div>
                        <p class="text-xs text-gray-200 mt-0.5 whitespace-pre-wrap break-words">${formatMentions(c.text)}</p>
                    </div>
                </div>`;
        });
    }, () => { list.innerHTML = `<p class="text-xs text-gray-500 py-3">Couldn't load replies.</p>`; });
};

window.sendDetailReply = async function() {
    const input = document.getElementById('postDetailReplyInput');
    const text = input.value.trim();
    if (!text || !window.activeDetailPostId) return;
    const hidden = document.getElementById('commentInputText');
    window.activeCommentPostId = window.activeDetailPostId;
    hidden.value = text;
    input.value = '';
    await window.submitCommentReply();
};

// ================= FLOATING VIDEO =================
window.floatVideo = function(postId, rawUrl, btn) {
    // Continue from where the video was, if it was already playing
    const wrap = btn ? btn.closest('.relative') : null;
    const near = wrap ? wrap.querySelector('video') : null;
    const t = near ? near.currentTime : 0;
    if (near) near.pause();
    if (window.activeDetailPostId) window.closePostDetail();

    const box = document.getElementById('floatingPlayer');
    const v = document.getElementById('floatingVideo');
    const p = window.findPost(postId);
    document.getElementById('floatingPlayerLabel').innerText = p ? '@' + p.user : 'Video';
    box.dataset.postId = postId;
    v.src = window.cldSized(rawUrl, 720, 'video');
    v.muted = false;
    v.addEventListener('loadedmetadata', function once() { v.removeEventListener('loadedmetadata', once); if (t) v.currentTime = t; }, { once: true });
    box.classList.remove('hidden');
    v.play().catch(() => {});
    window.pickFeedVideoToPlay && window.pickFeedVideoToPlay();
};

window.closeFloatingVideo = function() {
    const box = document.getElementById('floatingPlayer');
    const v = document.getElementById('floatingVideo');
    v.pause(); v.removeAttribute('src'); v.load();
    box.classList.add('hidden');
};

window.expandFloatingVideo = function() {
    const id = document.getElementById('floatingPlayer').dataset.postId;
    window.closeFloatingVideo();
    if (id) window.openPostDetail(id);
};

(function setupFloatingDrag() {
    let dragging = false, ox = 0, oy = 0;
    document.addEventListener('pointerdown', (e) => {
        const handle = e.target.closest('#floatingPlayerHandle');
        if (!handle || e.target.closest('button')) return;
        const box = document.getElementById('floatingPlayer');
        const r = box.getBoundingClientRect();
        dragging = true; ox = e.clientX - r.left; oy = e.clientY - r.top;
        box.style.right = 'auto'; box.style.bottom = 'auto';
        box.style.left = r.left + 'px'; box.style.top = r.top + 'px';
        handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
    });
    document.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const box = document.getElementById('floatingPlayer');
        const x = Math.max(4, Math.min(window.innerWidth - box.offsetWidth - 4, e.clientX - ox));
        const y = Math.max(4, Math.min(window.innerHeight - box.offsetHeight - 4, e.clientY - oy));
        box.style.left = x + 'px'; box.style.top = y + 'px';
    });
    document.addEventListener('pointerup', () => { dragging = false; });
})();

// ================= SHARE (apps + link) =================
window.postLink = function(postId) {
    return `${location.origin}${location.pathname}#post=${postId}`;
};

window.sharePost = function(postId) {
    const p = window.findPost(postId);
    const link = window.postLink(postId);
    const snippet = p && p.caption ? (p.caption.length > 100 ? p.caption.slice(0, 100) + '…' : p.caption) : '';
    const text = p ? `${snippet ? `"${snippet}" — ` : ''}@${p.user} on Sinless GG 🎮` : 'Check this out on Sinless GG 🎮';
    window.activeShare = { link, text };

    const enc = encodeURIComponent;
    const apps = [
        { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', color: 'bg-[#25D366]', url: `https://wa.me/?text=${enc(text + ' ' + link)}` },
        { name: 'Telegram', icon: 'fa-brands fa-telegram', color: 'bg-[#229ED9]', url: `https://t.me/share/url?url=${enc(link)}&text=${enc(text)}` },
        { name: 'X', icon: 'fa-brands fa-x-twitter', color: 'bg-black border border-gray-600', url: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(link)}` },
        { name: 'Facebook', icon: 'fa-brands fa-facebook-f', color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${enc(link)}` },
        { name: 'Messages', icon: 'fa-solid fa-comment-sms', color: 'bg-emerald-600', url: `sms:?&body=${enc(text + ' ' + link)}` },
        { name: 'Email', icon: 'fa-solid fa-envelope', color: 'bg-gray-600', url: `mailto:?subject=${enc('Sinless GG post')}&body=${enc(text + '\n' + link)}` }
    ];
    document.getElementById('shareApps').innerHTML = apps.map(a => `
        <button onclick="window.open('${a.url}', '_blank'); window.closeShareSheet()" class="flex flex-col items-center gap-1.5">
            <span class="w-12 h-12 rounded-full ${a.color} text-white text-xl flex items-center justify-center"><i class="${a.icon}"></i></span>
            <span class="text-[10px] text-gray-300 font-bold">${a.name}</span>
        </button>`).join('') + (navigator.share ? `
        <button onclick="window.shareWithMoreApps()" class="flex flex-col items-center gap-1.5">
            <span class="w-12 h-12 rounded-full bg-gg-800 border border-cyan-500/30 text-cyan-400 text-xl flex items-center justify-center"><i class="fa-solid fa-ellipsis"></i></span>
            <span class="text-[10px] text-gray-300 font-bold">More apps</span>
        </button>` : '');
    document.getElementById('shareLinkText').innerText = link;
    document.getElementById('shareSheet').classList.remove('hidden');
};

window.closeShareSheet = function() { document.getElementById('shareSheet').classList.add('hidden'); };

window.shareWithMoreApps = function() {
    const s = window.activeShare || {};
    window.closeShareSheet();
    navigator.share({ title: 'Sinless GG', text: s.text, url: s.link }).catch(() => {});
};

window.copyShareLink = async function() {
    const s = window.activeShare || {};
    try { await navigator.clipboard.writeText(s.link); }
    catch (e) {
        const t = document.createElement('textarea'); t.value = s.link; document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); } catch (err) {} t.remove();
    }
    showToast("🔗 Link copied!");
    window.closeShareSheet();
};

// Older share buttons elsewhere in the app now use the same sheet
window.shareContent = function(title, text, url) {
    window.activeShare = { link: url || location.href, text: text || 'Check this out on Sinless GG 🎮' };
    if (navigator.share) navigator.share({ title: title || 'Sinless GG', text: window.activeShare.text, url: window.activeShare.link }).catch(() => {});
    else window.copyShareLink();
};

// Opening a shared link (…#post=ID) jumps straight to that post
window.openPostFromLink = async function() {
    const m = location.hash.match(/^#post=([A-Za-z0-9_\-]+)/);
    if (!m || window.activeDetailPostId === m[1] || window.linkPostOpened === m[1]) return;
    const id = m[1];
    let p = window.findPost(id);
    if (!p && window.db && !id.startsWith('local_')) {
        try {
            const snap = await getDoc(doc(window.db, 'posts', id));
            if (snap.exists()) { p = { id: snap.id, docId: snap.id, ...snap.data() }; window.fypposts.push(p); }
        } catch (e) {}
    }
    if (p) { window.linkPostOpened = id; window.openPostDetail(id); }
    else if (window.cloudFeedLoaded) { window.linkPostOpened = id; showToast("That post isn't available anymore."); }
};
window.addEventListener('hashchange', () => { window.linkPostOpened = null; window.openPostFromLink(); });

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
            if (!window.cloudFeedLoaded) { window.cloudFeedLoaded = true; window.rebuildFeedOrder(); }
            window.renderFypFeed();
            if (window.refreshPostDetailStats && window.activeDetailPostId) window.refreshPostDetailStats(window.activeDetailPostId);
            if (window.openPostFromLink) window.openPostFromLink();
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

// ================= LIVE FOOTBALL MATCHES (free ESPN scoreboard feed) =================
window.liveLeagues = [
    { id: 'all', name: 'All' },
    { id: 'eng.1', name: 'Premier League', short: 'EPL' },
    { id: 'esp.1', name: 'LaLiga', short: 'LaLiga' },
    { id: 'uefa.champions', name: 'Champions League', short: 'UCL' },
    { id: 'ita.1', name: 'Serie A', short: 'Serie A' },
    { id: 'ger.1', name: 'Bundesliga', short: 'Bundesliga' },
    { id: 'fra.1', name: 'Ligue 1', short: 'Ligue 1' }
];
window.activeLiveLeague = 'all';
window.liveMatchesCache = [];
window.liveMatchesError = false;

window.loadLiveMatches = async function() {
    const leagues = window.liveLeagues.filter(l => l.id !== 'all');
    const results = await Promise.all(leagues.map(async (lg) => {
        try {
            const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg.id}/scoreboard`);
            if (!res.ok) return [];
            const data = await res.json();
            return (data.events || []).map(e => {
                const comp = (e.competitions || [])[0] || {};
                const teams = comp.competitors || [];
                const home = teams.find(t => t.homeAway === 'home') || teams[0] || {};
                const away = teams.find(t => t.homeAway === 'away') || teams[1] || {};
                const st = (e.status && e.status.type) || {};
                return {
                    id: e.id,
                    league: lg.id,
                    leagueShort: lg.short,
                    date: e.date,
                    state: st.state,                      // 'pre' | 'in' | 'post'
                    detail: st.shortDetail || '',
                    clock: (e.status && e.status.displayClock) || '',
                    link: (e.links && e.links[0] && e.links[0].href) || '',
                    home: { abbr: (home.team && home.team.abbreviation) || '', logo: (home.team && home.team.logo) || '', score: home.score },
                    away: { abbr: (away.team && away.team.abbreviation) || '', logo: (away.team && away.team.logo) || '', score: away.score }
                };
            });
        } catch (e) {
            return null; // network/CORS problem
        }
    }));

    window.liveMatchesError = results.every(r => r === null);
    const order = { in: 0, pre: 1, post: 2 };
    window.liveMatchesCache = results.flat().filter(Boolean).sort((a, b) =>
        (order[a.state] ?? 3) - (order[b.state] ?? 3) ||
        (a.state === 'post' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date))
    );

    const upd = document.getElementById('liveMatchesUpdated');
    if (upd) upd.innerText = 'Updated ' + new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    window.renderLiveMatches();
    if (window.renderCommunityPulse) window.renderCommunityPulse();
};

window.setLiveLeague = function(id) {
    window.activeLiveLeague = id;
    window.renderLiveMatches();
};

window.renderLiveMatches = function() {
    const chips = document.getElementById('liveLeagueChips');
    const strip = document.getElementById('liveMatchesStrip');
    if (!chips || !strip) return;

    const liveCount = window.liveMatchesCache.filter(m => m.state === 'in').length;
    chips.innerHTML = window.liveLeagues.map(l => {
        const active = window.activeLiveLeague === l.id;
        const label = l.id === 'all' ? (liveCount ? `🔴 Live (${liveCount})` : 'All') : l.short;
        return `<button onclick="window.setLiveLeague('${l.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-[10px] font-extrabold whitespace-nowrap ${active ? 'bg-white text-slate-950' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">${label}</button>`;
    }).join('');

    let list = window.liveMatchesCache;
    if (window.activeLiveLeague !== 'all') list = list.filter(m => m.league === window.activeLiveLeague);

    if (window.liveMatchesError) {
        strip.innerHTML = `<div class="glass-panel p-4 rounded-2xl text-xs text-gray-400 w-full text-center">Couldn't load matches right now. <button onclick="window.loadLiveMatches()" class="text-cyan-400 font-bold underline ml-1">Try again</button></div>`;
        return;
    }
    if (list.length === 0) {
        strip.innerHTML = `<div class="glass-panel p-4 rounded-2xl text-xs text-gray-400 w-full text-center">${window.liveMatchesCache.length ? 'No matches in this league right now.' : 'Loading matches…'}</div>`;
        return;
    }

    const teamRow = (t, showScore, winning) => `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 min-w-0">
                ${t.logo ? `<img src="${t.logo}" class="w-5 h-5 object-contain" loading="lazy" alt="">` : '<span class="w-5 h-5"></span>'}
                <span class="text-sm font-bold ${winning ? 'text-white' : 'text-gray-300'}">${escapeHTML(t.abbr)}</span>
            </div>
            <span class="text-sm font-black ${winning ? 'text-white' : 'text-gray-400'}">${showScore ? escapeHTML(t.score ?? '') : ''}</span>
        </div>`;

    strip.innerHTML = list.slice(0, 20).map(m => {
        const kickoff = new Date(m.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        const kickDay = new Date(m.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
        const isToday = new Date(m.date).toDateString() === new Date().toDateString();
        let badge, right;
        if (m.state === 'in') { badge = `<span class="flex items-center text-[10px] font-black text-red-400"><span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5"></span>LIVE</span>`; right = escapeHTML(m.clock || m.detail); }
        else if (m.state === 'post') { badge = `<span class="text-[10px] font-black text-gray-400">FT</span>`; right = isToday ? 'Today' : kickDay; }
        else { badge = `<span class="text-[10px] font-black text-cyan-400">${isToday ? 'TODAY' : 'UPCOMING'}</span>`; right = isToday ? kickoff : `${kickDay} ${kickoff}`; }

        const showScore = m.state !== 'pre';
        const h = parseInt(m.home.score), a = parseInt(m.away.score);
        const open = m.link ? `onclick="window.open('${m.link}', '_blank')"` : '';
        return `
            <div ${open} class="shrink-0 w-44 glass-panel p-3 rounded-2xl space-y-2 cursor-pointer border ${m.state === 'in' ? 'border-red-500/40' : 'border-cyan-500/15'}">
                <div class="flex items-center justify-between pb-1.5 border-b border-dashed border-gray-600/50">
                    ${badge}
                    <span class="text-[10px] text-gray-400 font-bold">${right}</span>
                </div>
                ${teamRow(m.home, showScore, showScore && h > a)}
                ${teamRow(m.away, showScore, showScore && a > h)}
                <p class="text-[8px] text-gray-500 font-bold uppercase">${escapeHTML(m.leagueShort)}</p>
            </div>`;
    }).join('');
};

// Refresh scores every minute while the Trending page is open
setInterval(() => {
    const view = document.getElementById('view-trending');
    if (view && !view.classList.contains('hidden')) window.loadLiveMatches();
}, 60000);

// ================= "WHAT PEOPLE ARE TALKING ABOUT" (built from real posts) =================
window.renderCommunityPulse = function() {
    const box = document.getElementById('communityPulseBox');
    if (!box) return;

    const all = window.fypposts || [];
    const DAY = 86400000;
    let recent = all.filter(p => Date.now() - window.postTimeValue(p) < 7 * DAY);
    if (recent.length < 3) recent = all;   // not much this week? use everything

    if (recent.length === 0) {
        box.innerHTML = `<h3 class="text-xs font-black text-white uppercase tracking-wider">✨ What people are talking about</h3><p class="text-xs text-gray-400">It's quiet right now. Be the first to post!</p>`;
        return;
    }

    // Hottest game
    const games = {};
    recent.forEach(p => { const g = p.game || 'OTHER GAMES'; games[g] = (games[g] || 0) + 1; });
    const [topGame, topGameCount] = Object.entries(games).sort((a, b) => b[1] - a[1])[0];

    // Hashtags and mentions
    const tags = {}, mentions = {};
    recent.forEach(p => {
        ((p.caption || '').match(/#[A-Za-z0-9_]{2,}/g) || []).forEach(t => { const k = t.toLowerCase(); tags[k] = (tags[k] || 0) + 1; });
        ((p.caption || '').match(/@[A-Za-z0-9_]{2,}/g) || []).forEach(t => { mentions[t] = (mentions[t] || 0) + 1; });
    });
    const topTags = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topMention = Object.entries(mentions).sort((a, b) => b[1] - a[1])[0];

    // Most engaging post (GGs + replies count double + tips)
    const score = p => (p.ggsCount || 0) + 2 * (p.commentsCount || 0) + (p.tipsTotal || 0) / 10;
    const topPost = [...recent].sort((a, b) => score(b) - score(a))[0];

    // Most active creator
    const creators = {};
    recent.forEach(p => { if (p.user) creators[p.user] = (creators[p.user] || 0) + 1; });
    const [topCreator, topCreatorCount] = Object.entries(creators).sort((a, b) => b[1] - a[1])[0] || [];

    // Live football tie-in
    const liveNow = (window.liveMatchesCache || []).filter(m => m.state === 'in');

    const lines = [];
    lines.push(`🔥 <b class="text-white">${escapeHTML(topGame)}</b> is the hottest game with ${topGameCount} post${topGameCount === 1 ? '' : 's'}.`);
    if (topPost && topPost.caption) {
        const pid = topPost.docId || topPost.id;
        const snippet = topPost.caption.length > 70 ? topPost.caption.slice(0, 70) + '…' : topPost.caption;
        lines.push(`💬 Most talked-about: <span class="text-cyan-400 font-bold cursor-pointer" onclick="window.openUserProfileModal('${escapeHTML(topPost.user)}', event)">@${escapeHTML(topPost.user)}</span> — <span class="cursor-pointer underline decoration-dotted" onclick="window.openMediaZoomModal('text', '', '${pid}')">"${escapeHTML(snippet)}"</span> (${topPost.ggsCount || 0} GG, ${topPost.commentsCount || 0} replies)`);
    }
    if (topCreator && topCreatorCount > 1) lines.push(`⭐ <span class="text-cyan-400 font-bold">@${escapeHTML(topCreator)}</span> is the most active creator (${topCreatorCount} posts).`);
    if (topTags.length) lines.push(`#️⃣ Trending tags: ${topTags.map(([t, n]) => `<span class="text-cyan-400 font-bold">${escapeHTML(t)}</span> (${n})`).join(', ')}`);
    if (topMention && topMention[1] > 1) lines.push(`👀 Everyone's tagging <span class="text-cyan-400 font-bold">${escapeHTML(topMention[0])}</span>.`);
    if (liveNow.length) lines.push(`⚽ ${liveNow.length} real match${liveNow.length === 1 ? ' is' : 'es are'} live right now — e.g. ${escapeHTML(liveNow[0].home.abbr)} ${escapeHTML(liveNow[0].home.score)}-${escapeHTML(liveNow[0].away.score)} ${escapeHTML(liveNow[0].away.abbr)}.`);

    box.innerHTML = `
        <h3 class="text-xs font-black text-white uppercase tracking-wider">✨ What people are talking about</h3>
        <div class="space-y-2">${lines.map(l => `<p class="text-xs text-gray-300 leading-relaxed">${l}</p>`).join('')}</div>`;
};

window.renderTrendingTopics = function() {
    if (window.renderCommunityPulse) window.renderCommunityPulse();
    const container = document.getElementById('dynamicTrendingTopicsList');
    if (!container) return;
    window.renderTrendingTopicsList(container);
};

window.TREND_STOPWORDS = new Set(('a an the and or but if then so of to in on at for from by with without about as is are was were be been being am do does did have has had i me my mine you your yours he him his she her it its we us our they them their this that these those there here what which who whom whose when where why how all any both each few more most other some such no nor not only own same than too very can will just dont should now im ive youre thats its lets get got go going gonna wanna really one two also like yes yeah ok okay lol omg pls please hey hi hello guys bro man today tomorrow yesterday time day week still even much many make made see seen know need want new good great nice best well back out up down over into off again ever every way thing things post posts game games play played playing').split(' '));

window.computeTrends = function() {
    const posts = window.fypposts || [];
    const now = Date.now();
    const terms = {};
    const add = (key, label, weight, post, kind) => {
        const t = terms[key] || (terms[key] = { label, score: 0, posts: new Set(), kind, games: {} });
        const ageH = (now - window.postTimeValue(post)) / 3600000;
        const engagement = 1 + ((post.ggsCount || 0) + 2 * (post.commentsCount || 0)) / 5;
        t.score += weight * engagement / (1 + ageH / 24);
        t.posts.add(post.docId || post.id);
        const g = post.game || 'GAMING'; t.games[g] = (t.games[g] || 0) + 1;
    };

    posts.forEach(p => {
        const text = (p.caption || '').replace(/https?:\/\/\S+/g, ' ');
        const seen = new Set();
        const once = (key, ...rest) => { if (!seen.has(key)) { seen.add(key); add(key, ...rest); } };

        (text.match(/#[A-Za-z0-9_]{2,}/g) || []).forEach(h => once('#' + h.slice(1).toLowerCase(), h, 3, p, 'tag'));
        (text.match(/@[A-Za-z0-9_]{2,}/g) || []).forEach(m => once('@' + m.slice(1).toLowerCase(), m, 2, p, 'person'));
        // Names & phrases: runs of Capitalised words, e.g. "Don Prime", "Real Madrid"
        (text.match(/\b[A-Z][a-zA-Z0-9']+(?:\s+[A-Z][a-zA-Z0-9']+){0,2}\b/g) || []).forEach(ph => {
            const words = ph.split(/\s+/).filter(w => !window.TREND_STOPWORDS.has(w.toLowerCase()));
            if (!words.length) return;
            const clean = words.join(' ');
            if (clean.length < 3) return;
            once('p:' + clean.toLowerCase(), clean, words.length > 1 ? 2.5 : 1.5, p, words.length > 1 ? 'phrase' : 'name1');
        });
        // Everyday words and word pairs people keep using
        const words = text.toLowerCase().replace(/[#@][a-z0-9_]+/g, ' ').match(/[a-z][a-z0-9']{3,}/g) || [];
        const keep = words.filter(w => !window.TREND_STOPWORDS.has(w));
        keep.forEach(w => once('p:' + w, w, 1, p, 'word'));
        for (let k = 0; k < keep.length - 1; k++) once('p:' + keep[k] + ' ' + keep[k + 1], keep[k] + ' ' + keep[k + 1], 1.5, p, 'pair');
        if (p.game) once('g:' + p.game.toLowerCase(), p.game, 0.8, p, 'game');
    });

    let list = Object.values(terms)
        // single words, word pairs and one-word names must show up in 2+ posts to count as a trend
        .filter(t => t.posts.size >= (['word', 'pair', 'name1'].includes(t.kind) ? 2 : 1))
        .sort((a, b) => b.score - a.score);

    // Drop near-duplicates ("prime" when "Don Prime" is already trending)
    const picked = [];
    for (const t of list) {
        const norm = (str) => str.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
        const low = norm(t.label), lowTight = low.replace(/ /g, '');
        if (picked.some(x => {
            const xl = norm(x.label), xlTight = xl.replace(/ /g, '');
            return xlTight === lowTight || xl.includes(low) || (low.includes(xl) && t.posts.size <= x.posts.size);
        })) continue;
        picked.push(t);
        if (picked.length >= 10) break;
    }

    // Live football fills any gaps so there's always something trending
    const live = (window.liveMatchesCache || []).filter(m => m.state === 'in');
    for (const m of live) {
        if (picked.length >= 10) break;
        picked.push({ label: `${m.home.abbr} vs ${m.away.abbr}`, score: 0, posts: new Set(), kind: 'live', games: {}, live: `${m.home.score}-${m.away.score} · ${m.clock}`, leagueShort: m.leagueShort });
    }
    return picked;
};

window.renderTrendingTopicsList = function(container) {
    const trends = window.computeTrends();
    if (!trends.length) {
        container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4">Nothing trending yet. Post something!</p>`;
        return;
    }
    container.innerHTML = `<h3 class="text-xs font-black text-white uppercase tracking-wider px-1">🔥 Trending now</h3>` + trends.map((t, i) => {
        const topGame = Object.entries(t.games).sort((a, b) => b[1] - a[1])[0];
        const context = t.kind === 'live' ? `⚽ Live · ${t.leagueShort}` : `Trending${topGame ? ' in ' + topGame[0] : ''}`;
        const sub = t.kind === 'live' ? t.live : `${t.posts.size} post${t.posts.size === 1 ? '' : 's'}`;
        const searchTerm = t.kind === 'live' ? t.label.split(' vs ')[0] : t.label;
        return `
            <div class="glass-panel p-3 rounded-xl flex items-center justify-between cursor-pointer hover:border-cyan-400 transition" onclick="window.searchTrend('${escapeHTML(searchTerm).replace(/'/g, "\\'")}', '${t.kind}')">
                <div class="flex items-center space-x-3 min-w-0">
                    <span class="text-[11px] font-black text-gray-500 w-4">${i + 1}</span>
                    <div class="min-w-0">
                        <p class="text-[9px] text-gray-400 font-bold">${escapeHTML(context)}</p>
                        <h4 class="text-sm font-extrabold text-white truncate">${escapeHTML(t.label)}</h4>
                        <p class="text-[9px] text-gray-400">${escapeHTML(sub)}</p>
                    </div>
                </div>
                <i class="fa-solid fa-chevron-right text-gray-500 text-xs"></i>
            </div>`;
    }).join('');
};

window.searchTrend = function(term, kind) {
    if (kind === 'live') { window.setLiveLeague && window.setLiveLeague('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const input = document.getElementById('globalSearchInput');
    if (input) input.value = term;
    window.handleGlobalSearch(term);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (postId) window.countPostView(postId);
    const stage = document.getElementById('mediaZoomStage');
    const title = document.getElementById('mediaZoomTitle');
    if (!stage) return;

    if (title) {
        const zp = postId ? (window.fypposts || []).find(p => p.id === postId || p.docId === postId) : null;
        title.innerText = zp ? `@${zp.user} · ${window.timeAgo(window.postTimeValue(zp))}` : '';
    }

    if (type === 'video') {
        stage.innerHTML = `<video src="${window.cldSized(mediaUrl, 1920, 'video')}" poster="${window.cldPoster(mediaUrl, 1080)}" class="max-w-full max-h-full object-contain rounded-2xl" controls autoplay playsinline controlsList="nodownload"></video>`;
    } else if (type === 'image') {
        stage.innerHTML = `<img id="zoomableImage" src="${window.cldSized(mediaUrl, 2048)}" class="max-w-full max-h-full object-contain rounded-2xl select-none" draggable="false" style="max-width:100%;max-height:100%;transform-origin:center center;transition:transform .15s ease-out;touch-action:none">`;
        window.enablePinchZoom(document.getElementById('zoomableImage'));
    } else {
        // Text-only post: fill the screen, bigger text for shorter posts
        const tp = postId ? (window.fypposts || []).find(p => p.id === postId || p.docId === postId) : null;
        const text = (tp && tp.caption) || caption || '';
        const size = text.length <= 40 ? 'text-4xl' : text.length <= 120 ? 'text-2xl' : text.length <= 300 ? 'text-lg' : 'text-base';
        stage.innerHTML = `
            <div class="w-full h-full max-w-lg mx-auto flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-gg-900 via-cyan-950/40 to-magenta/20 border border-cyan-500/20 overflow-y-auto">
                ${tp && tp.game ? `<span class="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4">${tp.game}</span>` : ''}
                <p class="${size} font-extrabold text-white text-center leading-snug break-words whitespace-pre-wrap w-full">${formatMentions(text)}</p>
            </div>`;
    }

    window.renderZoomInteractions(postId);
    document.getElementById('mediaZoomModal').classList.remove('hidden');
};

// Pinch with two fingers to zoom (up to 5x), drag to move around, double-tap to zoom in/out
window.enablePinchZoom = function(img) {
    if (!img) return;
    let scale = 1, x = 0, y = 0;
    let startDist = 0, startScale = 1, lastX = 0, lastY = 0, lastTap = 0;
    const pts = new Map();
    const apply = (animate) => {
        img.style.transition = animate ? 'transform .2s ease-out' : 'none';
        img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    };
    const clampPan = () => {
        const maxX = (img.clientWidth * (scale - 1)) / 2, maxY = (img.clientHeight * (scale - 1)) / 2;
        x = Math.max(-maxX, Math.min(maxX, x)); y = Math.max(-maxY, Math.min(maxY, y));
    };
    const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };

    img.addEventListener('pointerdown', (e) => {
        img.setPointerCapture(e.pointerId);
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 2) { startDist = dist(); startScale = scale; }
        if (pts.size === 1) {
            lastX = e.clientX; lastY = e.clientY;
            const now = Date.now();
            if (now - lastTap < 300) {                       // double tap
                if (scale > 1) { scale = 1; x = 0; y = 0; } else { scale = 2.5; }
                apply(true);
            }
            lastTap = now;
        }
    });
    img.addEventListener('pointermove', (e) => {
        if (!pts.has(e.pointerId)) return;
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pts.size === 2 && startDist) {
            scale = Math.max(1, Math.min(5, startScale * dist() / startDist));
            if (scale === 1) { x = 0; y = 0; }
            clampPan(); apply(false);
        } else if (pts.size === 1 && scale > 1) {
            x += e.clientX - lastX; y += e.clientY - lastY;
            lastX = e.clientX; lastY = e.clientY;
            clampPan(); apply(false);
        }
    });
    const end = (e) => {
        pts.delete(e.pointerId);
        if (pts.size < 2) startDist = 0;
        if (pts.size === 1) { const p = [...pts.values()][0]; lastX = p.x; lastY = p.y; }
    };
    img.addEventListener('pointerup', end);
    img.addEventListener('pointercancel', end);
};

window.closeMediaZoomModal = function() {
    if (window.activeZoomPostId) window.endViewStay(window.activeZoomPostId);
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
            <span class="flex items-center space-x-1 text-gray-400 font-bold">
                <i class="fa-solid fa-eye"></i>
                <span>${window.formatCount(post.viewsCount || 0)}</span>
            </span>
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
    } else if (viewId === 'trending') {
        window.renderTrendingTopics();
    }

    // Videos only play while you're on the feed
    if (viewId === 'fyp') setTimeout(() => window.pickFeedVideoToPlay && window.pickFeedVideoToPlay(), 100);
    else if (window.pauseFeedVideos) window.pauseFeedVideos();
};

// ================= CREATOR RANKINGS =================
// Tables = Creators of the Week (last 7 days, top 250). Top = all-time creators by GGs.
window.rankCache = {};

window.fetchRankingPosts = async function(kind) {
    const cached = window.rankCache[kind];
    if (cached && Date.now() - cached.at < 10 * 60000) return cached.posts;
    let posts = [];
    if (window.db) {
        try {
            const q = kind === 'week'
                ? query(collection(window.db, 'posts'), where('createdAt', '>=', new Date(Date.now() - 7 * 86400000)), orderBy('createdAt', 'desc'), limit(1000))
                : query(collection(window.db, 'posts'), orderBy('ggsCount', 'desc'), limit(1000));
            const snap = await getDocs(q);
            snap.forEach(d => posts.push({ id: d.id, docId: d.id, ...d.data() }));
        } catch (e) { console.warn('Ranking fetch failed, using loaded posts:', e); }
    }
    // Include posts already on screen (and on-device posts) without double counting
    const byId = {};
    posts.forEach(p => byId[p.docId || p.id] = p);
    (window.fypposts || []).forEach(p => { const id = p.docId || p.id; if (!byId[id]) byId[id] = p; });
    posts = Object.values(byId);
    if (kind === 'week') posts = posts.filter(p => Date.now() - window.postTimeValue(p) < 7 * 86400000);
    window.rankCache[kind] = { at: Date.now(), posts };
    return posts;
};

window.buildCreatorStats = function(posts) {
    const map = {};
    posts.forEach(p => {
        const u = p.user || 'Unknown';
        const k = u.toLowerCase();
        const c = map[k] || (map[k] = { gamertag: u, posts: 0, ggs: 0, replies: 0, views: 0 });
        c.posts++; c.ggs += p.ggsCount || 0; c.replies += p.commentsCount || 0; c.views += p.viewsCount || 0;
    });
    return Object.values(map);
};

window.creatorRow = function(c, i, line, score) {
    const medal = ['🥇', '🥈', '🥉'][i];
    const top = i < 3;
    return `
        <div class="p-3 flex items-center justify-between text-xs cursor-pointer hover:bg-gg-900/60 transition ${top ? 'bg-amber-500/5' : ''}" onclick="window.openUserProfileModal('${c.gamertag}', event)">
            <div class="flex items-center space-x-3 min-w-0">
                <span class="w-7 text-center font-black ${top ? 'text-lg' : 'text-amber-400 text-xs'}">${medal || '#' + (i + 1)}</span>
                <div class="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-cyan-400 to-magenta flex items-center justify-center text-slate-950 font-black text-[10px]">${c.gamertag.slice(0, 2).toUpperCase()}</div>
                <div class="min-w-0">
                    <h4 class="font-bold text-white truncate">@${c.gamertag}</h4>
                    <p class="text-[9px] text-gray-400 truncate">${line}</p>
                </div>
            </div>
            <span class="font-black text-cyan-400 text-xs shrink-0 ml-2">${score}</span>
        </div>`;
};

window.renderLadder = async function() {
    const container = document.getElementById('ladderBody');
    if (!container) return;
    if (!container.innerHTML.trim()) container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Ranking this week's creators…</p>`;
    const posts = await window.fetchRankingPosts('week');
    // Weekly score: GGs count most, replies show real conversation, views add a little
    const list = window.buildCreatorStats(posts)
        .map(c => ({ ...c, score: Math.round(c.ggs * 3 + c.replies * 2 + c.views * 0.1 + c.posts) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 250);
    if (!list.length) { container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">No posts this week yet — be the first creator of the week!</p>`; return; }
    container.innerHTML = list.map((c, i) => window.creatorRow(c, i,
        `${c.posts} post${c.posts === 1 ? '' : 's'} · ${window.formatCount(c.ggs)} GGs · ${window.formatCount(c.views)} views this week`,
        `${window.formatCount(c.score)} pts`)).join('');
    const count = document.getElementById('ladderCount');
    if (count) count.innerText = `${list.length} creator${list.length === 1 ? '' : 's'}`;
};

window.renderTopAccounts = async function() {
    const container = document.getElementById('topAccountsList');
    if (!container) return;
    if (!container.innerHTML.trim()) container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading all-time leaders…</p>`;
    const posts = await window.fetchRankingPosts('all');
    const list = window.buildCreatorStats(posts).sort((a, b) => b.ggs - a.ggs || b.views - a.views).slice(0, 250);
    if (!list.length) { container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">No creators yet.</p>`; return; }
    container.innerHTML = list.map((c, i) => window.creatorRow(c, i,
        `${c.posts} post${c.posts === 1 ? '' : 's'} · ${window.formatCount(c.views)} views all-time`,
        `${window.formatCount(c.ggs)} GGs`)).join('');
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

    await window.initStories();
    setTimeout(() => window.cleanupExpiredStories(), 8000);

    if (window.listenToCloudPosts) window.listenToCloudPosts();
    if (window.listenToFirestoreSquads) window.listenToFirestoreSquads();

    if (window.listenToFirestoreMarket) window.listenToFirestoreMarket();

    if (window.renderFypFeed) window.renderFypFeed();
    if (window.renderClansList) window.renderClansList();
    if (window.renderTournamentsTab) window.renderTournamentsTab();
    if (window.renderTournamentsTabDedicated) window.renderTournamentsTabDedicated();
    if (window.renderMarketList) window.renderMarketList();
    if (window.renderTrendingTopics) window.renderTrendingTopics();
    if (window.loadLiveMatches) window.loadLiveMatches();
};
