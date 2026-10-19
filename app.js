// ======================================================================
// SINLESS GG - APP LOGIC (MODULE VERSION - PART 1)
// ======================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, doc, deleteDoc, updateDoc, 
    arrayUnion, arrayRemove, increment, query, orderBy, limit, 
    onSnapshot, serverTimestamp, where, getDocs, getDoc, setDoc, getCountFromServer 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getMessaging, getToken, onMessage 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

// Tips balance (real balance will come from the payments server; nothing is stored on the phone)
window.myGGCoins = 0;
try { localStorage.removeItem('sinless_gg_coins'); } catch (e) {}

window.updateCoinDisplay = function() {
    const coinBadge = document.getElementById('headerCoinBalanceText');
    const drawerBadge = document.getElementById('drawerCoinBadge');
    if (coinBadge) {
        coinBadge.innerText = `${window.myGGCoins} Tips`;
    }
    if (drawerBadge) {
        drawerBadge.innerText = window.myGGCoins;
    }
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
            window.myUsername = '@Guest';
            window.myDisplayName = 'Guest';
            window.currentUser = null;

            const headerTag = document.getElementById('headerUserTag');
            if (headerTag) headerTag.innerText = '@Guest';

            if (authModalStatus) authModalStatus.innerText = 'Connect with your Google account to post under your real Gamertag.';
            if (authModalBtn) {
                authModalBtn.innerHTML = `<i class="fa-brands fa-google text-red-500 text-sm"></i><span>Continue with Google Cloud</span>`;
                authModalBtn.onclick = window.loginWithGoogle;
            }
        }
        if(window.renderClansList) window.renderClansList();
        if (window.afterAuthChange) window.afterAuthChange(user);
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
        poll: window.pollDraft || null,
        pollCounts: {},
        pollVoters: [],
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
                                <span class="text-xs font-bold text-cyan-400 cursor-pointer" onclick="closeCommentsModal(); closeMediaZoomModal(); openUserProfileModal('${c.user}', event)">${window.dn(c.user)}</span>
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
        if (bal) bal.innerText = `${window.formatCount(window.myGGCoins)} Tips`;
    }

    let baseFollowers = Math.max(12, userPosts.length * 14 + totalGGs * 8);
    let isFollowing = !!window.userFollowsState[cleanUser.toLowerCase()];
    if (isFollowing) baseFollowers += 1;

    document.getElementById('profileFollowersCount').innerText = baseFollowers;

    const isMyOwnProfile = window.currentUser && (window.myUsername.replace('@','').toLowerCase() === cleanUser.toLowerCase());
    const followBtn = document.getElementById('profileFollowBtn');
    const editBtn = document.getElementById('profileEditBtn');

    if (isMyOwnProfile) {
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
        displayName: cleanUser,
        bio: '',
        website: ''
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
    { id: 'cat_squad_other', name: 'OTHER GAMES HUB', tag: 'OTH', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'OTHER GAMES', isOfficial: true, isPublic: true, inviteCode: 'SQ-OTH01', members: [], subRooms: ['Rules/Announcements', 'chat', 'Matchmaking'], bio: 'Every other game: Free Fire, PUBG, Fortnite, Roblox, Minecraft, GTA, NBA 2K, console & PC.', rooms: { 'Rules/Announcements': [], 'chat': [], 'Matchmaking': [] } },
    { id: 'cat_squad_movies', name: 'MOVIES & TV HUB', tag: 'MOV', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'MOVIES', isOfficial: true, isPublic: true, inviteCode: 'SQ-MOV01', members: [], subRooms: ['Rules/Announcements', 'chat'], bio: 'Movies, series, trailers, reviews and spoiler talk (mark your spoilers!).', rooms: { 'Rules/Announcements': [], 'chat': [] } },
    { id: 'cat_squad_anime', name: 'ANIME HUB', tag: 'ANI', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'ANIME', isOfficial: true, isPublic: true, inviteCode: 'SQ-ANI01', members: [], subRooms: ['Rules/Announcements', 'chat'], bio: 'Anime & manga: new episodes, power rankings, recommendations and debates.', rooms: { 'Rules/Announcements': [], 'chat': [] } },
    { id: 'cat_squad_books', name: 'BOOKS & READERS HUB', tag: 'BKS', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'BOOKS', isOfficial: true, isPublic: true, inviteCode: 'SQ-BKS01', members: [], subRooms: ['Rules/Announcements', 'chat'], bio: 'For readers: what you are reading, book clubs, reviews, novels, comics & webtoons.', rooms: { 'Rules/Announcements': [], 'chat': [] } }
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
                    <p class="text-[9px] text-gray-400">${c.isOfficial ? `Run by <span class="text-cyan-400 font-bold">Sinless GG</span> <i class="fa-solid fa-circle-check text-cyan-400"></i>` : `Owner: <span class="text-cyan-400 font-bold" onclick="event.stopPropagation(); window.openUserProfileModal('${c.owner || c.leader}', event)">${window.dn(c.owner || c.leader)}</span>`} • ${members.length} Members ${c.inviteCode ? `• Code: ${c.inviteCode}` : ''}</p>
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
    document.getElementById('squadDetailLeader').innerText = window.dnText(squad.owner || squad.leader);

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
                            ${window.nameLink(q.challenger, 'font-extrabold text-white')}
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
                        <span class="font-bold text-white cursor-pointer hover:text-cyan-400" onclick="window.closeSquadDetailsModal(); window.openUserProfileModal('${m}', event)">${window.dn(m)}</span>
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
                            <span class="text-cyan-400 font-bold cursor-pointer" onclick="window.closeSquadDetailsModal(); window.openUserProfileModal('${m.sender}', event)">${window.dn(m.sender)}</span>
                            <span class="text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">${timerBadge}</span>
                        </div>
                        <img src="${m.imageUrl}" class="max-h-60 rounded-xl object-contain bg-black w-full border border-cyan-500/10 cursor-pointer" onclick="window.openMediaZoomModal('image', '${m.imageUrl}')">
                    </div>
                `;
            } else {
                msgsBox.innerHTML += `
                    <div class="bg-gg-900 p-2.5 rounded-2xl border border-cyan-500/10 space-y-0.5 max-w-xl">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-bold text-cyan-400 cursor-pointer" onclick="window.closeSquadDetailsModal(); window.openUserProfileModal('${m.sender}', event)">${window.dn(m.sender)}</span>
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
                <span class="text-[8px] font-extrabold text-gray-300 truncate max-w-[60px]">${u.toLowerCase() === me ? 'Your story' : escapeHTML(window.dnText(u).split(' ')[0])}</span>
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
            <div><p class="text-xs">${window.nameLink(st.user, 'font-bold text-white')}</p><p class="text-[9px] text-gray-300">${window.timeAgo(st.timestamp)} · disappears in ${hrs}h ${mins}m</p></div>
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
    document.getElementById('reportMatchP1Label').innerText = window.dnText(match.p1);
    document.getElementById('reportMatchP2Label').innerText = window.dnText(match.p2);
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
                    <p class="text-[9px] text-cyan-400">Host: ${window.nameLink(current.host, 'font-bold text-cyan-400')}${current.squadId && window.squadTournLabel ? window.squadTournLabel(current.squadId) : ''} • ${current.game} • ${current.players.length}/${current.maxPlayers} Registered</p>
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
                    <td class="px-2 py-1.5 truncate max-w-[110px]">${window.nameLink(row.p, 'font-bold text-white')}</td>
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

    let p1Html = `<span class="font-extrabold ${m.winner === m.p1 ? 'text-cyan-400 font-black' : 'text-gray-100'}">${(!m.p1 || m.p1 === 'Open Spot' || m.p1 === 'TBD') ? (m.p1 || 'Open Spot') : window.dn(m.p1)}</span>`;
    let p2Html = `<span class="font-extrabold ${m.winner === m.p2 ? 'text-cyan-400 font-black' : 'text-gray-100'}">${(!m.p2 || m.p2 === 'Open Spot' || m.p2 === 'TBD') ? (m.p2 || 'Open Spot') : window.dn(m.p2)}</span>`;

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
                    ${window.avatarHtml(p.user, 'w-10 h-10', 'rounded-xl', 'text-xs')}
                    <div class="min-w-0">
                        <div class="flex items-center flex-wrap gap-x-1.5">
                            <h4 class="font-bold text-sm text-white hover:text-cyan-400 transition leading-tight">${window.dn(p.user, p.displayName)}</h4>
                            ${badges}
                        </div>
                        <p class="text-[9px] uppercase font-black tracking-wider"><span class="text-cyan-400">${p.game || 'GAMING'}</span> <span class="text-gray-500 normal-case font-bold tracking-normal">· <span data-time="${window.postTimeValue(p)}">${window.timeAgo(window.postTimeValue(p))}</span></span></p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    ${isOwner ? `
                        <button onclick="window.openEditPostModal('${pId}')" class="text-gray-400 hover:text-cyan-400 text-xs px-1.5"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="window.deletePost('${pId}')" class="text-gray-400 hover:text-red-400 text-xs px-1.5"><i class="fa-solid fa-trash"></i></button>
                        <button onclick="window.openPostActions('${pId}')" class="text-gray-400 hover:text-white text-sm px-1.5" aria-label="More"><i class="fa-solid fa-ellipsis"></i></button>
                    ` : `<button onclick="window.openPostActions('${pId}')" class="text-gray-400 hover:text-white text-sm px-2" aria-label="More"><i class="fa-solid fa-ellipsis"></i></button>`}
                </div>
            </div>

            ${caption ? `<p class="text-xs text-gray-200 leading-relaxed font-medium whitespace-pre-wrap break-words">${formatMentions(longCaption ? caption.slice(0, 280) + '…' : caption)}${longCaption ? ' <span class="text-cyan-400 font-bold">Show more</span>' : ''}</p>` : ''}

            ${mediaHtml}
            ${window.renderPollHtml ? window.renderPollHtml(p) : ''}
            ${audioTrackHtml}

            <div class="flex items-center justify-between pt-2 border-t border-cyan-500/15 text-xs text-gray-300 font-bold">
                <button onclick="window.toggleGGPost('${pId}')" class="flex items-center space-x-1.5 ${hasGGed ? 'text-cyan-400' : 'hover:text-cyan-400'} transition">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <span>${window.formatCount(p.ggsCount || 0)} GGs</span>
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
                <button onclick="window.openRepostMenu('${pId}')" class="flex items-center space-x-1.5 hover:text-emerald-400 transition ${window.myRepostOf && window.myRepostOf(pId) ? 'text-emerald-400' : ''}">
                    <i class="fa-solid fa-retweet"></i>
                    <span>${window.repostCount ? window.formatCount(window.repostCount(pId)) : ''}</span>
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
                <div class="flex items-center space-x-3 cursor-pointer" onclick="window.openUserProfileModal('${p.user}', event)">
                    ${window.avatarHtml(p.user, 'w-12 h-12', 'rounded-2xl', 'text-sm')}
                    <div>
                        <div class="flex items-center flex-wrap gap-1.5"><span class="font-black text-base text-white">${window.dn(p.user, p.displayName)}</span>${badges}</div>
                        <span class="text-[10px] font-black text-cyan-400 uppercase tracking-wider">${p.game || 'GAMING'}</span>
                    </div>
                </div>
                ${isOwner ? `<div class="flex items-center space-x-1">
                    <button onclick="window.closePostDetail(); window.openEditPostModal('${pId}')" class="w-9 h-9 rounded-xl bg-gg-900 text-gray-300 text-xs"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="window.closePostDetail(); window.deletePost('${pId}')" class="w-9 h-9 rounded-xl bg-gg-900 text-red-400 text-xs"><i class="fa-solid fa-trash"></i></button>
                </div>` : `<button onclick="window.openPostActions('${pId}')" class="w-9 h-9 rounded-xl bg-gg-900 text-gray-300 text-sm"><i class="fa-solid fa-ellipsis"></i></button>`}
            </div>

            ${p.caption ? `<p class="${big ? 'text-xl font-extrabold leading-snug' : 'text-[15px] leading-relaxed'} text-white whitespace-pre-wrap break-words">${formatMentions(p.caption)}</p>` : ''}
            ${media ? `<div class="space-y-2">${media}</div>` : ''}
            ${window.renderPollHtml ? window.renderPollHtml(p) : ''}
            ${p.audioTrack ? `<div class="flex items-center space-x-2 p-2.5 bg-gg-900 rounded-xl border border-cyan-500/20 text-xs text-cyan-300"><i class="fa-solid fa-music text-magenta"></i><span class="font-bold truncate">${p.audioTrack.title || 'Sound'}</span></div>` : ''}

            <p class="text-[11px] text-gray-400 font-semibold">${when.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} · ${when.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>

            <div class="flex items-center space-x-4 py-2.5 border-y border-cyan-500/15 text-xs">
                <span><b id="pdViews" class="text-white">${window.formatCount(p.viewsCount || 0)}</b> <span class="text-gray-400">Views</span></span>
                <span><b id="pdGGs" class="text-white">${window.formatCount(p.ggsCount || 0)}</b> <span class="text-gray-400">GGs</span></span>
                <span><b id="pdReplies" class="text-white">${window.formatCount(p.commentsCount || 0)}</b> <span class="text-gray-400">Replies</span></span>
            </div>

            <div class="grid grid-cols-4 gap-2 text-xs font-bold">
                <button id="pdGGBtn" onclick="window.toggleGGPost('${pId}')" class="py-2.5 rounded-xl bg-gg-900 border border-cyan-500/20 flex flex-col items-center gap-1"><i class="fa-solid fa-thumbs-up text-base"></i><span>GGs</span></button>
                <button onclick="document.getElementById('postDetailReplyInput').focus()" class="py-2.5 rounded-xl bg-gg-900 border border-cyan-500/20 text-gray-300 flex flex-col items-center gap-1"><i class="fa-solid fa-comment text-base"></i><span>Reply</span></button>
                <button onclick="window.openRepostMenu('${pId}')" class="py-2.5 rounded-xl bg-gg-900 border border-emerald-500/30 text-emerald-400 flex flex-col items-center gap-1"><i class="fa-solid fa-retweet text-base"></i><span>Repost</span></button>
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
                    ${window.avatarHtml(c.user, 'w-8 h-8', 'rounded-xl', 'text-[10px]')}
                    <div class="flex-1 bg-gg-900/80 rounded-2xl rounded-tl-sm px-3 py-2 border border-cyan-500/10">
                        <div class="flex items-center justify-between"><span class="text-[11px]">${window.nameLink(c.user, 'font-bold text-white')}</span><span class="text-[9px] text-gray-500" data-time="${window.postTimeValue(c)}">${window.timeAgo(window.postTimeValue(c))}</span></div>
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
                    <p class="text-[9px] text-cyan-400">Seller: ${window.nameLink(m.user, 'font-bold text-cyan-400')}</p>
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
        const open = `onclick="window.openLounge('${m.id}')"`;
        return `
            <div ${open} class="shrink-0 w-44 glass-panel p-3 rounded-2xl space-y-2 cursor-pointer border ${m.state === 'in' ? 'border-red-500/40' : 'border-cyan-500/15'}">
                <div class="flex items-center justify-between pb-1.5 border-b border-dashed border-gray-600/50">
                    ${badge}
                    <span class="text-[10px] text-gray-400 font-bold">${right}</span>
                </div>
                ${teamRow(m.home, showScore, showScore && h > a)}
                ${teamRow(m.away, showScore, showScore && a > h)}
                <div class="flex items-center justify-between"><p class="text-[8px] text-gray-500 font-bold uppercase">${escapeHTML(m.leagueShort)}</p><span class="text-[9px] font-black ${m.state === 'in' ? 'text-red-300' : 'text-cyan-400'}">💬 Lounge</span></div>
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
        lines.push(`💬 Most talked-about: <span class="text-cyan-400 font-bold cursor-pointer" onclick="window.openUserProfileModal('${escapeHTML(topPost.user)}', event)">${window.dn(topPost.user)}</span> — <span class="cursor-pointer underline decoration-dotted" onclick="window.openMediaZoomModal('text', '', '${pid}')">"${escapeHTML(snippet)}"</span> (${topPost.ggsCount || 0} GG, ${topPost.commentsCount || 0} replies)`);
    }
    if (topCreator && topCreatorCount > 1) lines.push(`⭐ ${window.nameLink(topCreator, 'text-cyan-400 font-bold')} is the most active creator (${topCreatorCount} posts).`);
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
                    <span class="font-extrabold text-white">${window.dn(p.user, p.displayName)}</span>
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
        title.innerText = zp ? `${window.dnText(zp.user, zp.displayName)} · ${window.timeAgo(window.postTimeValue(zp))}` : '';
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
            ${window.nameLink(post.user, 'font-bold text-cyan-400')}
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
                ? query(collection(window.db, 'posts'), where('createdAt', '>=', new Date(Date.now() - 7 * 86400000)), orderBy('createdAt', 'desc'), limit(600))
                : query(collection(window.db, 'posts'), orderBy('ggsCount', 'desc'), limit(300));
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
                    <span class="text-[10px] font-bold text-cyan-400 cursor-pointer" onclick="window.openUserProfileModal('${me}', event)">${window.dn(me)}</span>
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

// ======================================================================
// SINLESS GG - CLOUD LAYER (v9)
// Everything below replaces the old "only on this phone" versions so that
// tournaments, squads, DMs, profiles, follows and notifications are shared.
// ======================================================================

window.me = function() { return (window.myUsername || '').replace('@', ''); };
window.meLower = function() { return window.me().toLowerCase(); };
window.isSignedIn = function() { return !!(window.currentUser && window.db); };
window.needSignIn = function(what) {
    if (window.isSignedIn()) return false;
    showToast(`🔐 Sign in with Google (side menu → Account) to ${what}.`);
    return true;
};
// Makes data safe for Firestore (undefined → null) but keeps special values like serverTimestamp() and increment() intact
window.cleanForCloud = function(obj) {
    const clean = (v) => {
        if (v === undefined) return null;
        if (typeof v === 'number') return isFinite(v) ? v : null;
        if (typeof v === 'function') return undefined;
        if (Array.isArray(v)) return v.map(x => { const c = clean(x); return c === undefined ? null : c; });
        if (v && typeof v === 'object') {
            const proto = Object.getPrototypeOf(v);
            if ((proto !== Object.prototype && proto !== null) || Object.getOwnPropertySymbols(v).length) return v;   // Firestore field values, dates, timestamps
            const out = {};
            for (const k of Object.keys(v)) { const c = clean(v[k]); if (c !== undefined) out[k] = c; }
            return out;
        }
        return v;
    };
    return clean(obj);
};

// ================= PUBLIC PROFILES =================
// profiles/{gamertag-lowercase} = { uid, gamertag, displayName, bio, website, pfp, cover }
window.profileCache = {};

window.getProfile = async function(tag, force = false) {
    const key = (tag || '').replace('@', '').toLowerCase();
    if (!key) return null;
    const c = window.profileCache[key];
    if (c && !force && Date.now() - c.at < 5 * 60000) return c.data;
    let data = null;
    if (window.db) {
        try {
            const snap = await getDoc(doc(window.db, 'profiles', key));
            if (snap.exists()) data = snap.data();
        } catch (e) {}
    }
    window.profileCache[key] = { at: Date.now(), data };
    if (data) window.userProfiles[key] = { ...(window.userProfiles[key] || {}), ...data };
    return data;
};

// Make sure the signed-in user has a public profile (needed for DMs, follows, notifications)
window.ensureMyProfile = async function() {
    if (!window.isSignedIn()) return;
    const key = window.meLower();
    try {
        const ref = doc(window.db, 'profiles', key);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            const local = window.userProfiles[key] || {};
            await setDoc(ref, window.cleanForCloud({
                uid: window.currentUser.uid,
                gamertag: window.me(),
                displayName: local.displayName || window.myDisplayName || window.me(),
                bio: local.bio || 'Gamer on Sinless GG 🎮',
                website: local.website || '',
                pfp: (local.pfp && !String(local.pfp).startsWith('data:')) ? local.pfp : (window.currentUser.photoURL || ''),
                cover: (local.cover && !String(local.cover).startsWith('data:')) ? local.cover : '',
                createdAt: serverTimestamp()
            }));
        } else if (snap.data().uid !== window.currentUser.uid) {
            showToast(`⚠️ The gamertag @${window.me()} belongs to another account.`);
        }
        window.profileCache[key] = null;
    } catch (e) { console.warn('Profile setup failed', e); }
};

window.saveUserProfileChanges = async function() {
    const key = window.meLower();
    const updated = {
        displayName: document.getElementById('editDisplayNameInput').value.trim() || window.me(),
        bio: document.getElementById('editBioInput').value.trim(),
        website: document.getElementById('editWebsiteInput').value.trim(),
        pfp: window.tempProfilePfp || '',
        cover: window.tempProfileCover || ''
    };
    window.userProfiles[key] = { ...(window.userProfiles[key] || {}), ...updated };
    localStorage.setItem('sinless_user_profiles', JSON.stringify(window.userProfiles));
    if (window.isSignedIn()) {
        try {
            await setDoc(doc(window.db, 'profiles', key), window.cleanForCloud({ ...updated, uid: window.currentUser.uid, gamertag: window.me(), updatedAt: serverTimestamp() }), { merge: true });
            window.profileCache[key] = null;
            showToast("✅ Profile saved for everyone!");
        } catch (e) { showToast("⚠️ Couldn't save profile to the cloud."); }
    } else {
        showToast("Profile saved on this phone. Sign in to share it.");
    }
    window.closeEditProfileModal();
    window.openUserProfileModal(window.me());
};

// ================= FOLLOWS =================
// follows/{fromUid}_{toUid} = { fromUid, toUid, fromUser, toUser, createdAt }
window.myFollowing = { uids: new Set(), users: new Set() };

window.loadMyFollowing = async function() {
    window.myFollowing = { uids: new Set(), users: new Set() };
    if (!window.isSignedIn()) return;
    try {
        const snap = await getDocs(query(collection(window.db, 'follows'), where('fromUid', '==', window.currentUser.uid), limit(1000)));
        snap.forEach(d => { const f = d.data(); window.myFollowing.uids.add(f.toUid); window.myFollowing.users.add((f.toUser || '').toLowerCase()); });
    } catch (e) {}
    if (window.feedMode === 'following') window.renderFypFeed();
};

window.amFollowing = function(tag) { return window.myFollowing.users.has((tag || '').toLowerCase()); };

window.countFollows = async function(field, uid) {
    if (!window.db || !uid) return 0;
    try {
        const res = await getCountFromServer(query(collection(window.db, 'follows'), where(field, '==', uid)));
        return res.data().count;
    } catch (e) {
        try { const s = await getDocs(query(collection(window.db, 'follows'), where(field, '==', uid), limit(1000))); return s.size; } catch (err) { return 0; }
    }
};

window.toggleFollowUser = async function(tag) {
    if (window.needSignIn('follow gamers')) return;
    const prof = await window.getProfile(tag);
    if (!prof || !prof.uid) { showToast(`@${tag} hasn't signed in to Sinless GG yet.`); return; }
    if (prof.uid === window.currentUser.uid) return;
    const id = `${window.currentUser.uid}_${prof.uid}`;
    const ref = doc(window.db, 'follows', id);
    const following = window.amFollowing(tag);
    try {
        if (following) {
            await deleteDoc(ref);
            window.myFollowing.uids.delete(prof.uid); window.myFollowing.users.delete(tag.toLowerCase());
            showToast(`Unfollowed @${tag}.`);
        } else {
            await setDoc(ref, { fromUid: window.currentUser.uid, toUid: prof.uid, fromUser: window.me(), toUser: prof.gamertag || tag, createdAt: serverTimestamp() });
            window.myFollowing.uids.add(prof.uid); window.myFollowing.users.add(tag.toLowerCase());
            showToast(`✅ Following @${tag}!`);
            window.notify(prof.uid, 'follow', { text: 'started following you' });
        }
    } catch (e) { showToast("⚠️ Couldn't update follow. Check your connection."); }
    window.openUserProfileModal(tag);
};

// Profile view: after the normal render, fill in real cloud data (photo, bio, followers)
window._baseOpenUserProfileModal = window._baseOpenUserProfileModal || window.openUserProfileModal;
window.openUserProfileModal = function(username, e = null) {
    window._baseOpenUserProfileModal(username, e);
    const tag = (username || '').replace('@', '');
    window.enhanceProfileView(tag);
};

window.enhanceProfileView = async function(tag) {
    const isMine = window.isSignedIn() && tag.toLowerCase() === window.meLower();
    const editBtn = document.getElementById('profileEditBtn');
    if (editBtn) editBtn.classList.toggle('hidden', !isMine);

    ['profileFollowersCount', 'profileFollowingCount'].forEach(id => { const el = document.getElementById(id); if (el) el.innerText = '…'; });
    const prof = await window.getProfile(tag);
    if (window.activeProfileUser !== tag) return; // user opened someone else meanwhile

    if (prof) {
        if (prof.displayName) document.getElementById('profileDisplayName').innerText = prof.displayName;
        if (prof.bio) document.getElementById('profileBioText').innerText = prof.bio;
        const pfpBox = document.getElementById('profileAvatarBox');
        if (prof.pfp && pfpBox) pfpBox.innerHTML = `<img src="${window.cldSized(prof.pfp, 300)}" class="w-full h-full object-cover">`;
        const banner = document.getElementById('profileBannerHeader');
        if (prof.cover && banner) banner.style.backgroundImage = `url('${window.cldSized(prof.cover, 1200)}')`;
        if (prof.website) {
            const link = document.getElementById('profileLinkUrl');
            link.innerText = prof.website.replace(/^https?:\/\//, '');
            link.href = prof.website.startsWith('http') ? prof.website : `https://${prof.website}`;
        }
    }

    const followersEl = document.getElementById('profileFollowersCount');
    const followingEl = document.getElementById('profileFollowingCount');
    if (prof && prof.uid) {
        const [followers, following] = await Promise.all([window.countFollows('toUid', prof.uid), window.countFollows('fromUid', prof.uid)]);
        if (window.activeProfileUser !== tag) return;
        if (followersEl) followersEl.innerText = window.formatCount(followers);
        if (followingEl) followingEl.innerText = window.formatCount(following);
    } else {
        if (followersEl) followersEl.innerText = '0';
        if (followingEl) followingEl.innerText = '0';
    }

    const followBtn = document.getElementById('profileFollowBtn');
    const moreBtn = document.getElementById('profileMoreBtn');
    if (followBtn) {
        if (isMine) followBtn.classList.add('hidden');
        else {
            const on = window.amFollowing(tag);
            followBtn.classList.remove('hidden');
            followBtn.className = `px-4 py-1.5 font-black rounded-xl text-xs uppercase shadow ${on ? 'bg-gg-900 border border-cyan-500/40 text-cyan-400' : 'bg-cyan-400 text-slate-950'}`;
            followBtn.innerHTML = on ? `<i class="fa-solid fa-user-check mr-1"></i> Following` : `<i class="fa-solid fa-user-plus mr-1"></i> Follow`;
            followBtn.onclick = () => window.toggleFollowUser(tag);
        }
    }
    if (moreBtn) {
        moreBtn.classList.toggle('hidden', isMine);
        moreBtn.onclick = () => window.openUserActions(tag);
    }
};

// ================= FEED: For You / Following =================
window.feedMode = 'foryou';
window.setFeedMode = function(mode) {
    window.feedMode = mode;
    ['foryou', 'following'].forEach(m => {
        const b = document.getElementById('feedTab_' + m);
        if (b) b.className = `flex-1 py-2 text-xs font-black transition border-b-2 ${m === mode ? 'text-white border-cyan-400' : 'text-gray-500 border-transparent'}`;
    });
    if (mode === 'following' && window.needSignIn('see posts from people you follow')) { window.setFeedMode('foryou'); return; }
    window.renderFypFeed();
};

// Wrap the feed so it respects Following mode, blocked users and reported posts
window._baseGetOrderedFeed = window._baseGetOrderedFeed || window.getOrderedFeed;
window.getOrderedFeed = function() {
    let list = window._baseGetOrderedFeed();
    list = list.filter(p => !window.isBlocked(p.user) && !window.isHiddenByReports(p));
    if (window.feedMode === 'following') {
        list = list.filter(p => window.myFollowing.uids.has(p.uid) || window.myFollowing.users.has((p.user || '').toLowerCase()) || window.isMyPost(p));
    }
    return list;
};

window._baseRenderFypFeed = window._baseRenderFypFeed || window.renderFypFeed;
window.renderFypFeed = function() {
    window._baseRenderFypFeed();
    const box = document.getElementById('fypFeedContainer');
    if (window.feedMode === 'following' && box && !box.querySelector('[data-post-id]')) {
        box.innerHTML = `<div class="glass-panel p-8 rounded-2xl text-center space-y-2">
            <i class="fa-solid fa-user-group text-3xl text-cyan-400 opacity-60"></i>
            <p class="text-xs font-bold text-white">${window.myFollowing.uids.size ? 'No posts yet from people you follow' : "You're not following anyone yet"}</p>
            <p class="text-[10px] text-gray-400">Tap a gamer's name → Follow, and their posts show up here.</p>
        </div>`;
    }
};

// ================= NOTIFICATIONS =================
// notifications/{auto} = { toUid, fromUid, fromUser, type, postId, text, read, createdAt }
window.notifList = [];
window.notifUnsub = null;

window.notify = async function(toUid, type, extra = {}) {
    if (!window.isSignedIn() || !toUid || toUid === window.currentUser.uid) return;
    try {
        await addDoc(collection(window.db, 'notifications'), window.cleanForCloud({
            toUid, fromUid: window.currentUser.uid, fromUser: window.me(), type,
            postId: extra.postId || null, text: (extra.text || '').slice(0, 140), read: false, createdAt: serverTimestamp()
        }));
    } catch (e) {}
};

// Tell everyone @mentioned in a piece of text
window.notifyMentions = async function(text, postId, what) {
    const tags = [...new Set(((text || '').match(/@[A-Za-z0-9_]{2,}/g) || []).map(t => t.slice(1).toLowerCase()))].slice(0, 10);
    for (const t of tags) {
        const prof = await window.getProfile(t);
        if (prof && prof.uid) window.notify(prof.uid, 'mention', { postId, text: `mentioned you in a ${what}` });
    }
};

window.listenToNotifications = function() {
    if (window.notifUnsub) { window.notifUnsub(); window.notifUnsub = null; }
    window.notifList = [];
    window.updateNotifBadge();
    if (!window.isSignedIn()) return;
    const q = query(collection(window.db, 'notifications'), where('toUid', '==', window.currentUser.uid), limit(100));
    window.notifUnsub = onSnapshot(q, (snap) => {
        const prevUnread = window.notifList.filter(n => !n.read).length;
        window.notifList = [];
        snap.forEach(d => window.notifList.push({ id: d.id, ...d.data() }));
        window.notifList.sort((a, b) => window.postTimeValue(b) - window.postTimeValue(a));
        const unread = window.notifList.filter(n => !n.read).length;
        window.updateNotifBadge();
        if (unread > prevUnread && prevUnread !== null && window.notifPrimed) {
            const n = window.notifList.find(x => !x.read);
            if (n && !['dm', 'group'].includes(n.type)) showToast(`🔔 @${n.fromUser} ${window.notifText(n)}`);
        }
        window.notifPrimed = true;
        if (!document.getElementById('notifModal').classList.contains('hidden')) window.renderNotifications();
    }, (e) => console.warn('Notifications listener:', e));
};

window.notifText = function(n) {
    return ({ gg: 'GG\'d your post', reply: 'replied to your post', mention: n.text || 'mentioned you', follow: 'started following you', dm: 'sent you a message', tournament: n.text || 'joined your tournament', squad: n.text || 'joined your squad' })[n.type] || n.text || '';
};
window.notifIcon = function(type) {
    return ({ gg: 'fa-thumbs-up text-cyan-400', reply: 'fa-comment text-emerald-400', mention: 'fa-at text-magenta', follow: 'fa-user-plus text-amber-400', dm: 'fa-envelope text-blue-400', tournament: 'fa-trophy text-amber-400', squad: 'fa-shield-halved text-emerald-400' })[type] || 'fa-bell text-gray-400';
};

window.updateNotifBadge = function() {
    const notifUnread = window.notifList.filter(n => !n.read && !['dm', 'group'].includes(n.type)).length;
    const dmUnread = window.notifList.filter(n => !n.read && ['dm', 'group'].includes(n.type)).length;
    const set = (id, n) => { const el = document.getElementById(id); if (!el) return; el.innerText = n > 9 ? '9+' : n; el.classList.toggle('hidden', !n); };
    set('notifBadge', notifUnread);
    set('dmBadge', dmUnread);
    set('drawerNotifBadge', notifUnread);
};

window.openNotifications = function() {
    if (window.needSignIn('get notifications')) return;
    document.getElementById('notifModal').classList.remove('hidden');
    window.renderNotifications();
    // Mark as read after a moment
    setTimeout(() => {
        window.notifList.filter(n => !n.read && !['dm', 'group'].includes(n.type)).forEach(n => {
            n.read = true;
            updateDoc(doc(window.db, 'notifications', n.id), { read: true }).catch(() => {});
        });
        window.updateNotifBadge();
    }, 1500);
};
window.closeNotifications = function() { document.getElementById('notifModal').classList.add('hidden'); };

window.renderNotifications = function() {
    const box = document.getElementById('notifList');
    const list = window.notifList.filter(n => !['dm', 'group'].includes(n.type) && !window.isBlocked(n.fromUser));
    if (!list.length) {
        box.innerHTML = `<div class="text-center py-16 space-y-2"><i class="fa-solid fa-bell text-3xl text-gray-600"></i><p class="text-xs text-gray-400">No notifications yet.<br>When people GG, reply, mention or follow you, it shows here.</p></div>`;
        return;
    }
    box.innerHTML = list.map(n => `
        <div class="flex items-start space-x-3 p-3 rounded-2xl ${n.read ? 'bg-transparent' : 'bg-cyan-500/5 border border-cyan-500/20'} cursor-pointer" onclick="window.openNotification('${n.id}')">
            <div class="relative shrink-0">${window.avatarHtml(n.fromUser, 'w-10 h-10', 'rounded-xl', 'text-[10px]')}<span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gg-950 border border-cyan-500/30 flex items-center justify-center text-[9px]"><i class="fa-solid ${window.notifIcon(n.type)}"></i></span></div>
            <div class="flex-1 min-w-0">
                <p class="text-xs text-gray-200">${window.nameLink(n.fromUser, 'font-bold text-white')} ${escapeHTML(window.notifText(n))}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">${window.timeAgo(window.postTimeValue(n))}</p>
            </div>
            ${n.read ? '' : '<span class="w-2 h-2 rounded-full bg-cyan-400 mt-1.5"></span>'}
        </div>`).join('');
};

window.openNotification = function(id) {
    const n = window.notifList.find(x => x.id === id);
    if (!n) return;
    window.closeNotifications();
    if (n.postId && window.findPost(n.postId)) window.openPostDetail(n.postId, n.type === 'reply' || n.type === 'mention');
    else if (n.postId) { location.hash = '#post=' + n.postId; }
    else window.openUserProfileModal(n.fromUser);
};

// Hook GGs and replies so post owners get notified
window._baseToggleGGPost = window._baseToggleGGPost || window.toggleGGPost;
window.toggleGGPost = async function(postId) {
    const p = window.findPost(postId);
    const uid = window.currentUser ? window.currentUser.uid : 'guest_user';
    const wasOn = p && p.ggsBy && p.ggsBy.includes(uid);
    await window._baseToggleGGPost(postId);
    if (p && !wasOn && p.uid) window.notify(p.uid, 'gg', { postId });
};

window._baseSubmitCommentReply = window._baseSubmitCommentReply || window.submitCommentReply;
window.submitCommentReply = async function() {
    const text = (document.getElementById('commentInputText').value || '').trim();
    const postId = window.activeCommentPostId;
    const p = window.findPost(postId);
    await window._baseSubmitCommentReply();
    if (text && p && window.isSignedIn()) {
        if (p.uid) window.notify(p.uid, 'reply', { postId, text: 'replied to your post' });
        window.notifyMentions(text, postId, 'reply');
    }
};

// ================= REPORT & BLOCK =================
window.blockedUsers = new Set((() => { try { return JSON.parse(localStorage.getItem('sinless_blocked') || '[]'); } catch (e) { return []; } })());
window.REPORT_HIDE_AT = 3;

window.isBlocked = function(tag) { return window.blockedUsers.has((tag || '').toLowerCase()); };
window.isHiddenByReports = function(p) {
    return (p.reportsCount || 0) >= window.REPORT_HIDE_AT && !window.isMyPost(p) && window.meLower() !== 'sinlessgaming';
};

window.saveBlocked = async function() {
    localStorage.setItem('sinless_blocked', JSON.stringify([...window.blockedUsers]));
    if (window.isSignedIn()) {
        try { await setDoc(doc(window.db, 'users', window.currentUser.uid), { blocked: [...window.blockedUsers] }, { merge: true }); } catch (e) {}
    }
};

window.loadBlocked = async function() {
    if (!window.isSignedIn()) return;
    try {
        const snap = await getDoc(doc(window.db, 'users', window.currentUser.uid));
        if (snap.exists() && Array.isArray(snap.data().blocked)) {
            snap.data().blocked.forEach(b => window.blockedUsers.add(b));
            localStorage.setItem('sinless_blocked', JSON.stringify([...window.blockedUsers]));
            window.renderFypFeed();
        }
    } catch (e) {}
};

window.blockUser = async function(tag) {
    const ok = await window.sgConfirm(`You won't see posts, replies, stories or messages from @${tag}. You can unblock them later in Account Settings.`, { title: `Block @${tag}?`, okText: 'Block', danger: true });
    if (!ok) return;
    window.blockedUsers.add(tag.toLowerCase());
    await window.saveBlocked();
    if (window.amFollowing(tag)) window.toggleFollowUser(tag);
    window.closeUserProfileModal && window.closeUserProfileModal();
    window.closePostDetail && window.activeDetailPostId && window.closePostDetail();
    window.renderFypFeed(); window.mergeStories && window.mergeStories();
    showToast(`🚫 @${tag} blocked.`);
};

window.unblockUser = async function(tag) {
    window.blockedUsers.delete(tag.toLowerCase());
    await window.saveBlocked();
    window.renderBlockedList(); window.renderFypFeed(); window.mergeStories && window.mergeStories();
    showToast(`@${tag} unblocked.`);
};

window.renderBlockedList = function() {
    const box = document.getElementById('blockedUsersList');
    if (!box) return;
    const list = [...window.blockedUsers];
    box.innerHTML = list.length ? list.map(t => `
        <div class="flex items-center justify-between text-xs bg-gg-950 rounded-xl px-3 py-2 border border-cyan-500/10">
            <span class="text-gray-300 font-bold">@${escapeHTML(t)}</span>
            <button onclick="window.unblockUser('${escapeHTML(t)}')" class="text-cyan-400 font-bold">Unblock</button>
        </div>`).join('') : `<p class="text-[10px] text-gray-500">You haven't blocked anyone.</p>`;
};

window.reportPost = function(postId) {
    if (window.needSignIn('report posts')) return;
    window.reportTarget = postId;
    document.getElementById('reportSheet').classList.remove('hidden');
};
window.closeReportSheet = function() { document.getElementById('reportSheet').classList.add('hidden'); };

window.submitReport = async function(reason) {
    const postId = window.reportTarget;
    window.closeReportSheet();
    if (!postId) return;
    const reported = JSON.parse(localStorage.getItem('sinless_reported') || '{}');
    if (reported[postId]) { showToast("You already reported this post. Thanks!"); return; }
    try {
        await addDoc(collection(window.db, 'reports'), { postId, reason, reporterUid: window.currentUser.uid, reporter: window.me(), createdAt: serverTimestamp() });
        if (!String(postId).startsWith('local_')) await updateDoc(doc(window.db, 'posts', postId), { reportsCount: increment(1) });
        reported[postId] = Date.now();
        localStorage.setItem('sinless_reported', JSON.stringify(reported));
        const p = window.findPost(postId);
        if (p) p.reportsCount = (p.reportsCount || 0) + 1;
        showToast("🛡️ Thanks — report sent. We'll review it.");
    } catch (e) { showToast("⚠️ Couldn't send report. Try again."); }
};

// "⋯" menu on a post or a profile
window.openPostActions = function(postId) {
    const p = window.findPost(postId);
    if (!p) return;
    window.openActionSheet(`@${p.user}'s post`, [
        { icon: 'fa-link', label: 'Copy link', run: () => { window.activeShare = { link: window.postLink(postId) }; window.copyShareLink(); } },
        { icon: 'fa-user-plus', label: window.amFollowing(p.user) ? `Unfollow @${p.user}` : `Follow @${p.user}`, run: () => window.toggleFollowUser(p.user) },
        { icon: 'fa-flag', label: 'Report post', danger: true, run: () => window.reportPost(postId) },
        { icon: 'fa-ban', label: `Block @${p.user}`, danger: true, run: () => window.blockUser(p.user) }
    ]);
};
window.openUserActions = function(tag) {
    window.openActionSheet(`@${tag}`, [
        { icon: 'fa-envelope', label: 'Send message', run: () => { window.closeUserProfileModal(); window.openDmModal(tag); } },
        { icon: 'fa-link', label: 'Copy profile link', run: () => { window.activeShare = { link: `${location.origin}${location.pathname}#user=${tag}` }; window.copyShareLink(); } },
        { icon: 'fa-ban', label: `Block @${tag}`, danger: true, run: () => window.blockUser(tag) }
    ]);
};
window.openActionSheet = function(title, items) {
    window.actionSheetItems = items;
    document.getElementById('actionSheetTitle').innerText = title;
    document.getElementById('actionSheetItems').innerHTML = items.map((it, i) => `
        <button onclick="window.runActionSheet(${i})" class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gg-800 text-sm font-bold ${it.danger ? 'text-red-400' : 'text-gray-200'}">
            <i class="fa-solid ${it.icon} w-5"></i><span>${escapeHTML(it.label)}</span>
        </button>`).join('');
    document.getElementById('actionSheet').classList.remove('hidden');
};
window.runActionSheet = function(i) {
    document.getElementById('actionSheet').classList.add('hidden');
    const it = window.actionSheetItems[i];
    if (it) it.run();
};

// ================= TOURNAMENTS IN THE CLOUD =================
// tournaments/{id} = the whole tournament (players, matches, eliminated, host, hostUid...)
window.tournamentsList = (window.tournamentsList || []).filter(t => t.id !== 'tourn_1'); // remove old sample
if (!window.tournamentsList.find(t => t.id === (window.activeTournament && window.activeTournament.id))) window.activeTournament = window.tournamentsList[0] || null;
window.cloudTournamentIds = new Set();

window.saveTournament = async function(t, isNew = false) {
    try { localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList)); } catch (e) {}
    if (!t) return;
    if (!window.isSignedIn()) { showToast("Saved on this phone only — sign in so others can see it."); return; }
    try {
        const ref = doc(window.db, 'tournaments', t.id);
        if (isNew || !window.cloudTournamentIds.has(t.id)) {
            t.hostUid = t.hostUid || window.currentUser.uid;
            await setDoc(ref, window.cleanForCloud({ ...t, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }));
            window.cloudTournamentIds.add(t.id);
        } else {
            await updateDoc(ref, window.cleanForCloud({ players: t.players || [], matches: t.matches || [], eliminated: t.eliminated || [], updatedAt: serverTimestamp() }));
        }
    } catch (e) {
        console.warn('Tournament sync failed', e);
        showToast("⚠️ Couldn't sync tournament. Only the host can change some things.");
    }
};

window.listenToTournaments = function() {
    if (!window.db) return;
    onSnapshot(query(collection(window.db, 'tournaments'), orderBy('createdAt', 'desc'), limit(60)), (snap) => {
        const cloud = [];
        snap.forEach(d => cloud.push({ ...d.data(), id: d.id }));
        window.cloudTournamentIds = new Set(cloud.map(t => t.id));
        // keep my phone-only tournaments that haven't been uploaded yet
        const localOnly = (window.tournamentsList || []).filter(t => !window.cloudTournamentIds.has(t.id) && t.id !== 'tourn_1');
        window.tournamentsList = [...cloud, ...localOnly];
        const activeId = window.activeTournament && window.activeTournament.id;
        window.activeTournament = window.tournamentsList.find(t => t.id === activeId) || window.tournamentsList[0] || null;
        if (window.activeMatchForReporting && window.activeTournament) {
            window.activeMatchForReporting = window.activeTournament.matches.find(m => m.id === window.activeMatchForReporting.id) || window.activeMatchForReporting;
        }
        try { localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList)); } catch (e) {}
        window.renderTournamentsTab && window.renderTournamentsTab();
        window.renderTournamentsTabDedicated && window.renderTournamentsTabDedicated();
        window.uploadMyLocalTournaments();
    }, (e) => console.warn('Tournaments listener:', e));
};

// Tournaments I made before this update get uploaded once I'm signed in
window.uploadMyLocalTournaments = function() {
    if (!window.isSignedIn() || window.uploadedLocalTourns) return;
    window.uploadedLocalTourns = true;
    (window.tournamentsList || []).filter(t => !window.cloudTournamentIds.has(t.id) && (t.host || '').toLowerCase() === window.meLower())
        .forEach(t => window.saveTournament(t, true));
};

window.confirmDeleteTournament = async function() {
    const id = window.activeDeleteTournamentId;
    if (!id) return;
    window.tournamentsList = window.tournamentsList.filter(t => t.id !== id);
    if (window.activeTournament && window.activeTournament.id === id) window.activeTournament = window.tournamentsList[0] || null;
    try { localStorage.setItem('sinless_tournaments_list', JSON.stringify(window.tournamentsList)); } catch (e) {}
    if (window.isSignedIn() && window.cloudTournamentIds.has(id)) {
        try { await deleteDoc(doc(window.db, 'tournaments', id)); } catch (e) { showToast("⚠️ Only the host can delete this tournament."); }
    }
    showToast("Tournament deleted.");
    window.closeDeleteTournamentModal();
    window.renderTournamentsTab && window.renderTournamentsTab();
    window.renderTournamentsTabDedicated && window.renderTournamentsTabDedicated();
};

// Wrap the existing tournament actions: they change the tournament locally, then we sync it
(function wrapTournamentActions() {
    const wrap = (name, pick, needAuth) => {
        const base = window[name];
        window[name] = async function(...args) {
            if (needAuth && window.needSignIn(needAuth)) return;
            const before = window.tournamentsList.map(t => t.id);
            const r = await base.apply(this, args);
            const t = pick(args, before);
            if (t) await window.saveTournament(t, !before.includes(t.id));
            return r;
        };
    };
    const byArg = (args) => window.tournamentsList.find(t => t.id === args[0]);
    const active = () => window.activeTournament;
    wrap('submitNewTournament', (a, before) => window.tournamentsList.find(t => !before.includes(t.id)), 'host tournaments');
    wrap('joinActiveTournament', byArg, 'join tournaments');
    wrap('leaveTournament', byArg, null);
    wrap('confirmManualAddPlayer', () => window.tournamentsList.find(t => t.id === (window._lastManualCtx || {}).tournId) || active(), null);
    wrap('submitMatchScoreReport', active, 'report scores');
    wrap('hostApproveMatch', active, null);
    wrap('addLeagueMatch', byArg, null);
    const baseManual = window.manualAddPlayer;
    window.manualAddPlayer = function(tournId, matchId, slot) { window._lastManualCtx = { tournId }; return baseManual(tournId, matchId, slot); };

    // Host gets a notification when someone joins
    const baseJoin = window.joinActiveTournament;
    window.joinActiveTournament = async function(id) {
        await baseJoin(id);
        const t = window.tournamentsList.find(x => x.id === id);
        if (t && t.hostUid && (t.players || []).some(p => p.toLowerCase() === window.meLower())) window.notify(t.hostUid, 'tournament', { text: `joined your tournament ${t.title}` });
    };
})();

// ================= SQUADS IN THE CLOUD =================
// squads/{id} = squad info (members, memberUids, admins, ownerUid, subRooms...)
// squads/{id}/messages/{auto} = { room, sender, senderUid, text, isImage, imageUrl, timestamp, createdAt }
window.squadMsgUnsub = null;
window.cloudSquadIds = new Set();
window.squadsLoadedOnce = false;

window.listenToFirestoreSquads = function() {
    if (!window.db) return;
    onSnapshot(query(collection(window.db, 'squads'), limit(200)), (snap) => {
        const cloud = [];
        snap.forEach(d => cloud.push({ ...d.data(), id: d.id, docId: d.id }));
        window.cloudSquadIds = new Set(cloud.map(s => s.id));
        const map = {};
        window.defaultPublicCategorySquads.forEach(s => { map[s.id] = { ...s, members: [], memberUids: [] }; });
        (window.clansData || []).forEach(s => { if (s.id && !map[s.id] && !String(s.id).startsWith('squad_')) map[s.id] = s; });
        cloud.forEach(s => { map[s.id] = { ...(map[s.id] || {}), ...s }; });
        // Official hubs always use the latest name/description from the app
        window.defaultPublicCategorySquads.forEach(h => {
            const m = map[h.id]; if (!m) return;
            ['name', 'tag', 'bio', 'game', 'inviteCode'].forEach(k => { m[k] = h[k]; });
            m.isOfficial = true; m.isPublic = true;
        });
        window.clansData = Object.values(map);
        try { localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData)); } catch (e) {}
        window.squadsLoadedOnce = true;
        window.ensureOfficialHubs();
        if (window.activeSquadDetails) {
            const fresh = window.clansData.find(c => c.id === window.activeSquadDetails.id);
            if (fresh) { fresh.rooms = window.activeSquadDetails.rooms; window.activeSquadDetails = fresh; }
        }
        window.renderClansList && window.renderClansList();
    }, (e) => console.warn('Squads listener:', e));
};

// The official game hubs are created in the cloud the first time someone signed in opens the app
window.ensureOfficialHubs = function() {
    if (!window.isSignedIn() || !window.squadsLoadedOnce || window.hubsEnsured) return;
    window.hubsEnsured = true;
    window.defaultPublicCategorySquads.forEach(h => {
        if (window.cloudSquadIds.has(h.id)) return;
        const { rooms, ...info } = h;
        setDoc(doc(window.db, 'squads', h.id), window.cleanForCloud({ ...info, members: [], memberUids: [], ownerUid: window.meLower() === 'sinlessgaming' ? window.currentUser.uid : null, createdAt: serverTimestamp() })).catch(() => {});
    });
};

window.isSquadMember = function(squad) {
    return (squad.members || []).some(m => (m || '').toLowerCase() === window.meLower()) ||
        (window.currentUser && (squad.memberUids || []).includes(window.currentUser.uid));
};

window.toggleSquadMembership = async function(squadId) {
    if (window.needSignIn('join squads')) return;
    const squad = window.clansData.find(c => c.id === squadId);
    if (!squad) return;
    const me = window.me(), uid = window.currentUser.uid;
    const isMember = window.isSquadMember(squad);
    if (isMember && !squad.isOfficial && (squad.owner || squad.leader || '').toLowerCase() === me.toLowerCase() && (squad.members || []).length > 1) {
        showToast("⚠️ Transfer ownership before leaving your squad.");
        return;
    }
    squad.members = squad.members || []; squad.memberUids = squad.memberUids || [];
    if (isMember) {
        squad.members = squad.members.filter(m => m.toLowerCase() !== me.toLowerCase());
        squad.memberUids = squad.memberUids.filter(u => u !== uid);
    } else {
        squad.members.push(me); squad.memberUids.push(uid);
    }
    window.renderClansList();
    try {
        await updateDoc(doc(window.db, 'squads', squad.id), {
            members: isMember ? arrayRemove(me) : arrayUnion(me),
            memberUids: isMember ? arrayRemove(uid) : arrayUnion(uid)
        });
        showToast(isMember ? `Left ${squad.name}` : `✅ Joined ${squad.name}!`);
        if (!isMember && squad.ownerUid) window.notify(squad.ownerUid, 'squad', { text: `joined your squad ${squad.name}` });
    } catch (e) { showToast("⚠️ Couldn't update squad. Try again in a moment."); }
};

window.submitNewSquad = async function() {
    if (window.needSignIn('create squads')) return;
    const name = document.getElementById('squadNameInput').value.trim();
    const tag = document.getElementById('squadTagInput').value.trim().toUpperCase();
    if (!name || !tag) { showToast("⚠️ Please enter a squad name and tag!"); return; }
    const me = window.me();
    const id = 'squad_' + Date.now();
    const squad = {
        name, tag,
        game: document.getElementById('squadGameSelect').value,
        isPublic: document.getElementById('squadPrivacySelect').value === 'public',
        isOfficial: false,
        inviteCode: 'SQ-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        bio: document.getElementById('squadBioInput').value.trim() || 'Squad on Sinless GG!',
        owner: me, leader: me, ownerUid: window.currentUser.uid,
        admins: [me], members: [me], memberUids: [window.currentUser.uid],
        subRooms: ['Rules/Announcements', 'chat', 'tactics', 'Matchmaking'],
        matchmakingQueue: []
    };
    try {
        await setDoc(doc(window.db, 'squads', id), window.cleanForCloud({ ...squad, createdAt: serverTimestamp() }));
        await addDoc(collection(window.db, 'squads', id, 'messages'), { room: 'Rules/Announcements', sender: me, senderUid: window.currentUser.uid, text: `Welcome to ${name}! Check back here for updates.`, timestamp: Date.now(), createdAt: serverTimestamp() });
        showToast(`🔥 Squad [${tag}] ${name} created! Invite code: ${squad.inviteCode}`);
        ['squadNameInput', 'squadTagInput', 'squadBioInput'].forEach(x => document.getElementById(x).value = '');
        window.closeCreateClanModal();
    } catch (e) { showToast("⚠️ Couldn't create squad. Try again."); }
};

// Open a squad: listen to its messages live
window._baseOpenSquadDetailsModal = window._baseOpenSquadDetailsModal || window.openSquadDetailsModal;
window.openSquadDetailsModal = function(squadId) {
    const squad = window.clansData.find(c => c.id === squadId);
    if (!squad) return;
    squad.rooms = squad.rooms || {};
    window._baseOpenSquadDetailsModal(squadId);
    window.listenToSquadMessages(squad);
};

window.listenToSquadMessages = function(squad) {
    if (window.squadMsgUnsub) { window.squadMsgUnsub(); window.squadMsgUnsub = null; }
    if (!window.db || !window.cloudSquadIds.has(squad.id)) return;
    const q = query(collection(window.db, 'squads', squad.id, 'messages'), orderBy('createdAt', 'desc'), limit(300));
    window.squadMsgUnsub = onSnapshot(q, (snap) => {
        const rooms = {};
        const now = Date.now();
        snap.forEach(d => {
            const m = { id: d.id, ...d.data() };
            if (window.isBlocked(m.sender)) return;
            if (m.isImage && now - (m.timestamp || 0) > 86400000) return; // photos vanish after 24h
            (rooms[m.room] = rooms[m.room] || []).unshift(m);
        });
        squad.rooms = rooms;
        if (window.activeSquadDetails && window.activeSquadDetails.id === squad.id) {
            window.activeSquadDetails.rooms = rooms;
            const r = window.activeSquadSubRoom;
            if (r !== 'Roster' && r !== 'Matchmaking') window.switchSquadSubRoom(r);
        }
    }, (e) => {
        const box = document.getElementById('squadRoomMsgsBox');
        if (box && e && e.code === 'permission-denied') box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">🔒 This is a private squad. Join it to read the chat.</p>`;
    });
};

window._baseCloseSquadDetailsModal = window._baseCloseSquadDetailsModal || window.closeSquadDetailsModal;
window.closeSquadDetailsModal = function() {
    if (window.squadMsgUnsub) { window.squadMsgUnsub(); window.squadMsgUnsub = null; }
    window._baseCloseSquadDetailsModal();
};

window.sendSquadMessage = async function(payload) {
    const squad = window.activeSquadDetails;
    const room = window.activeSquadSubRoom;
    if (!squad || !room) return;
    if (window.needSignIn('chat in squads')) return;
    if (!window.isSquadMember(squad)) { showToast("Join this squad first."); return; }
    // People who joined before this update: register their account on the squad so they can chat
    if (!(squad.memberUids || []).includes(window.currentUser.uid)) {
        try {
            await updateDoc(doc(window.db, 'squads', squad.id), { memberUids: arrayUnion(window.currentUser.uid), members: arrayUnion(window.me()) });
            squad.memberUids = [...(squad.memberUids || []), window.currentUser.uid];
        } catch (e) {}
    }
    const msg = { room, sender: window.me(), senderUid: window.currentUser.uid, timestamp: Date.now(), ...payload };
    squad.rooms = squad.rooms || {};
    (squad.rooms[room] = squad.rooms[room] || []).push(msg);   // show instantly
    window.switchSquadSubRoom(room);
    try {
        await addDoc(collection(window.db, 'squads', squad.id, 'messages'), window.cleanForCloud({ ...msg, createdAt: serverTimestamp() }));
        if (payload.text) window.notifyMentions(payload.text, null, `${squad.name} chat`);
    } catch (e) { showToast("⚠️ Message not sent. Check your connection."); }
};

window.sendSquadRoomMessage = function() {
    const input = document.getElementById('squadSubRoomInput');
    const text = (input.value || '').trim();
    if (!text) return;
    input.value = '';
    window.sendSquadMessage({ text, isImage: false });
};

// Photos in squad chats & DMs go to Cloudinary and vanish after 24h
window.sendInChatImage = async function(context) {
    const input = document.getElementById(context === 'squad' ? 'squadChatImageInput' : 'dmChatImageInput');
    const file = input && input.files && input.files[0];
    if (!file) return;
    input.value = '';
    showToast("Uploading photo…");
    try {
        const up = await window.prepareAndUpload(file, null, 1600, 1600);
        if (context === 'squad') await window.sendSquadMessage({ isImage: true, imageUrl: up.url, text: '' });
        else await window.sendDmMessage({ isImage: true, imageUrl: up.url, text: '' });
    } catch (e) { showToast(`⚠️ Photo failed: ${e.message}`); }
};

window.updateSquadCloud = async function(squad, fields, okMsg) {
    try { await updateDoc(doc(window.db, 'squads', squad.id), window.cleanForCloud(fields)); if (okMsg) showToast(okMsg); }
    catch (e) { showToast("⚠️ Only the squad owner can do that."); }
};

window.toggleSquadAdmin = function(member) {
    const squad = window.activeSquadDetails;
    if (!squad) return;
    squad.admins = squad.admins || [];
    const isAdmin = squad.admins.some(a => a.toLowerCase() === member.toLowerCase());
    squad.admins = isAdmin ? squad.admins.filter(a => a.toLowerCase() !== member.toLowerCase()) : [...squad.admins, member];
    window.switchSquadSubRoom('Roster');
    window.updateSquadCloud(squad, { admins: squad.admins }, isAdmin ? `Removed @${member} as admin.` : `🛡️ @${member} is now an admin!`);
};

window.transferOwnership = async function(newOwner) {
    const squad = window.activeSquadDetails;
    if (!squad) return;
    const ok = await window.sgConfirm(`@${newOwner} will become the owner of ${squad.name}.`, { title: 'Transfer Ownership?', okText: 'Transfer', danger: true });
    if (!ok) return;
    const prof = await window.getProfile(newOwner);
    if (!prof || !prof.uid) { showToast(`@${newOwner} needs to sign in once before they can own a squad.`); return; }
    const admins = [...new Set([...(squad.admins || []), newOwner])];
    await window.updateSquadCloud(squad, { owner: newOwner, leader: newOwner, ownerUid: prof.uid, admins }, `👑 @${newOwner} now owns ${squad.name}!`);
};

window.promptCreateSubRoom = async function() {
    const squad = window.activeSquadDetails;
    if (!squad) return;
    const name = await window.sgPrompt('Name your new channel (e.g. tactics, highlights)', { title: '# New Channel', placeholder: 'channel-name', okText: 'Create' });
    if (!name) return;
    const clean = name.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 24);
    if ((squad.subRooms || []).includes(clean)) { showToast("That channel already exists."); return; }
    squad.subRooms = [...(squad.subRooms || []), clean];
    await window.updateSquadCloud(squad, { subRooms: squad.subRooms }, `#${clean} created!`);
    window.switchSquadSubRoom(clean);
};

window.deleteSubRoom = async function(room) {
    const squad = window.activeSquadDetails;
    if (!squad) return;
    const ok = await window.sgConfirm(`#${room} will be removed from the channel list.`, { title: 'Delete Channel?', okText: 'Delete', danger: true });
    if (!ok) return;
    squad.subRooms = (squad.subRooms || []).filter(r => r !== room);
    await window.updateSquadCloud(squad, { subRooms: squad.subRooms }, `#${room} deleted.`);
    window.switchSquadSubRoom('chat');
};

window.bookSquadMatchmakingFixture = async function() {
    const squad = window.activeSquadDetails;
    if (!squad || window.needSignIn('queue for matches')) return;
    const entry = { id: 'match_' + Date.now(), challenger: window.me(), format: squad.game || 'FC MOBILE 1v1', status: 'Searching for Opponent', at: Date.now() };
    squad.matchmakingQueue = [entry, ...(squad.matchmakingQueue || [])].slice(0, 30);
    window.switchSquadSubRoom('Matchmaking');
    await window.updateSquadCloud(squad, { matchmakingQueue: squad.matchmakingQueue }, "⚔️ You're in the queue!");
};

window.acceptSquadChallenge = function(matchId) {
    const squad = window.activeSquadDetails;
    const entry = squad && (squad.matchmakingQueue || []).find(m => m.id === matchId);
    if (!entry) return;
    if (entry.challenger.toLowerCase() === window.meLower()) { showToast("That's your own challenge 😄"); return; }
    window.closeSquadDetailsModal();
    window.openDmModal(entry.challenger);
    setTimeout(() => { const i = document.getElementById('dmInputText'); if (i) i.value = `Hey! I'll take your ${entry.format} challenge from ${squad.name} ⚔️ When are you free?`; }, 400);
};

window.deleteActiveSquad = async function() {
    const squad = window.activeSquadDetails;
    if (!squad) return;
    const ok = await window.sgConfirm(`${squad.name} will be deleted for everyone. This cannot be undone.`, { title: 'Disband Squad?', okText: 'Disband', danger: true });
    if (!ok) return;
    try {
        await deleteDoc(doc(window.db, 'squads', squad.id));
        window.clansData = window.clansData.filter(c => c.id !== squad.id);
        showToast("Squad disbanded.");
        window.closeSquadDetailsModal();
        window.renderClansList();
    } catch (e) { showToast("⚠️ Only the squad owner can disband it."); }
};

// ================= PRIVATE MESSAGES (DMs) =================
// dms/{uidA_uidB} = { participants:[uidA,uidB], names:{uid:gamertag}, lastText, lastAt, lastFrom }
// dms/{uidA_uidB}/messages/{auto} = { fromUid, fromUser, text, isImage, imageUrl, createdAt }
window.dmThreads = [];
window.dmInboxUnsub = null;
window.dmThreadUnsub = null;
window.activeDm = null;   // { threadId, partnerUid, partnerTag }

window.threadIdFor = function(a, b) { return [a, b].sort().join('_'); };

window.listenToDmInbox = function() {
    if (window.dmInboxUnsub) { window.dmInboxUnsub(); window.dmInboxUnsub = null; }
    window.dmThreads = [];
    if (!window.isSignedIn()) return;
    const q = query(collection(window.db, 'dms'), where('participants', 'array-contains', window.currentUser.uid), limit(100));
    window.dmInboxUnsub = onSnapshot(q, (snap) => {
        window.dmThreads = [];
        snap.forEach(d => window.dmThreads.push({ id: d.id, ...d.data() }));
        window.dmThreads.sort((a, b) => window.postTimeValue({ createdAt: b.lastAt }) - window.postTimeValue({ createdAt: a.lastAt }));
        if (!window.activeDm && !document.getElementById('dmModal').classList.contains('hidden')) window.renderDmInbox();
    }, (e) => console.warn('DM inbox:', e));
};

window.openDmModal = async function(username = null, e = null) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (window.needSignIn('send messages')) return;
    document.getElementById('dmModal').classList.remove('hidden');
    if (username && typeof username === 'string') await window.openDmThread(username.replace('@', ''));
    else window.showDmInbox();
};

window.closeDmModal = function() {
    if (window.dmThreadUnsub) { window.dmThreadUnsub(); window.dmThreadUnsub = null; }
    window.activeDm = null;
    window.activeDmUser = null;
    document.getElementById('dmModal').classList.add('hidden');
};

window.showDmInbox = function() {
    if (window.dmThreadUnsub) { window.dmThreadUnsub(); window.dmThreadUnsub = null; }
    window.activeDm = null; window.activeDmUser = null;
    document.getElementById('dmHeaderUser').innerText = '';
    document.getElementById('dmBackBtn').classList.add('hidden');
    document.getElementById('dmComposer').classList.add('hidden');
    document.getElementById('dmNewChatRow').classList.remove('hidden');
    window.renderDmInbox();
};

window.renderDmInbox = function() {
    const box = document.getElementById('dmMessagesContainer');
    const uid = window.currentUser && window.currentUser.uid;
    const threads = window.dmThreads.filter(t => {
        const other = (t.participants || []).find(p => p !== uid);
        return !window.isBlocked((t.names || {})[other]);
    });
    if (!threads.length) {
        box.innerHTML = `<div class="text-center py-12 space-y-2"><i class="fa-solid fa-envelope-open-text text-3xl text-gray-600"></i><p class="text-xs text-gray-400">No messages yet.<br>Type a gamertag above to start a chat.</p></div>`;
        return;
    }
    const unreadFrom = new Set(window.notifList.filter(n => n.type === 'dm' && !n.read).map(n => n.fromUser.toLowerCase()));
    box.innerHTML = threads.map(t => {
        const other = (t.participants || []).find(p => p !== uid);
        const tag = (t.names || {})[other] || 'Gamer';
        const unread = unreadFrom.has(tag.toLowerCase());
        return `
            <div class="flex items-center space-x-3 p-3 rounded-2xl cursor-pointer hover:bg-gg-900 ${unread ? 'bg-cyan-500/5 border border-cyan-500/20' : ''}" onclick="window.openDmThread('${escapeHTML(tag)}')">
                ${window.avatarHtml(tag, 'w-11 h-11', 'rounded-2xl', 'text-xs').replace(/onclick="[^"]*"/, '')}
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between"><span class="text-sm font-bold text-white truncate">${window.dn(tag)}</span><span class="text-[9px] text-gray-500">${t.lastAt ? window.timeAgo(window.postTimeValue({ createdAt: t.lastAt })) : ''}</span></div>
                    <p class="text-xs ${unread ? 'text-white font-bold' : 'text-gray-400'} truncate">${t.lastFrom === uid ? 'You: ' : ''}${escapeHTML(t.lastText || '')}</p>
                </div>
                ${unread ? '<span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>' : ''}
            </div>`;
    }).join('');
};

window.startDmFromInput = function() {
    const i = document.getElementById('dmNewChatInput');
    const tag = (i.value || '').trim().replace('@', '');
    if (!tag) return;
    i.value = '';
    window.openDmThread(tag);
};

window.openDmThread = async function(tag) {
    if (tag.toLowerCase() === window.meLower()) { showToast("That's you 😄"); return; }
    if (window.isBlocked(tag)) { showToast(`You blocked @${tag}. Unblock them in Account Settings to chat.`); return; }
    const box = document.getElementById('dmMessagesContainer');
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Opening chat…</p>`;
    const prof = await window.getProfile(tag);
    if (!prof || !prof.uid) {
        box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">@${escapeHTML(tag)} hasn't signed in to Sinless GG yet,<br>so they can't receive messages.</p>`;
        return;
    }
    const threadId = window.threadIdFor(window.currentUser.uid, prof.uid);
    window.activeDm = { threadId, partnerUid: prof.uid, partnerTag: prof.gamertag || tag };
    window.activeDmUser = window.activeDm.partnerTag;
    document.getElementById('dmHeaderUser').innerText = window.dnText(window.activeDm.partnerTag);
    document.getElementById('dmBackBtn').classList.remove('hidden');
    document.getElementById('dmComposer').classList.remove('hidden');
    document.getElementById('dmNewChatRow').classList.add('hidden');

    // mark this person's message notifications as read
    window.notifList.filter(n => n.type === 'dm' && !n.read && n.fromUser.toLowerCase() === window.activeDm.partnerTag.toLowerCase()).forEach(n => {
        n.read = true; updateDoc(doc(window.db, 'notifications', n.id), { read: true }).catch(() => {});
    });
    window.updateNotifBadge();

    if (window.dmThreadUnsub) window.dmThreadUnsub();
    const q = query(collection(window.db, 'dms', threadId, 'messages'), orderBy('createdAt', 'desc'), limit(150));
    window.dmThreadUnsub = onSnapshot(q, (snap) => {
        const msgs = [];
        snap.forEach(d => msgs.unshift({ id: d.id, ...d.data() }));
        window.renderDmMessages(msgs);
    }, () => { box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">Couldn't load this chat.</p>`; });
};

window.renderDmMessages = function(msgs) {
    const box = document.getElementById('dmMessagesContainer');
    if (!msgs.length) { box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">Say hi to @${escapeHTML(window.activeDm.partnerTag)} 👋</p>`; return; }
    const uid = window.currentUser.uid;
    const now = Date.now();
    box.innerHTML = msgs.filter(m => !(m.isImage && now - window.postTimeValue(m) > 86400000)).map(m => {
        const mine = m.fromUid === uid;
        const body = m.isImage
            ? `<img src="${window.cldSized(m.imageUrl, 600)}" class="max-h-56 rounded-xl object-contain cursor-pointer" onclick="window.openMediaZoomModal('image', '${m.imageUrl}')"><p class="text-[8px] opacity-70 mt-1">📷 disappears 24h after sending</p>`
            : `<p class="whitespace-pre-wrap break-words">${formatMentions(m.text || '')}</p>`;
        return `
            <div class="flex ${mine ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[78%] px-3 py-2 rounded-2xl text-sm ${mine ? 'bg-cyan-500 text-slate-950 rounded-br-sm' : 'bg-gg-900 text-white border border-cyan-500/15 rounded-bl-sm'}">
                    ${body}
                    <p class="text-[9px] mt-0.5 ${mine ? 'text-slate-800' : 'text-gray-500'} text-right">${m.createdAt ? window.timeAgo(window.postTimeValue(m)) : 'sending…'}</p>
                </div>
            </div>`;
    }).join('');
    box.scrollTop = box.scrollHeight;
};

window.sendDmMessage = async function(payload) {
    const dm = window.activeDm;
    if (!dm || !window.isSignedIn()) return;
    const uid = window.currentUser.uid;
    try {
        await setDoc(doc(window.db, 'dms', dm.threadId), {
            participants: [uid, dm.partnerUid].sort(),
            names: { [uid]: window.me(), [dm.partnerUid]: dm.partnerTag },
            lastText: payload.isAudio ? '🎤 Voice note' : payload.isImage ? '📷 Photo' : (payload.text || '').slice(0, 80),
            lastFrom: uid, lastAt: serverTimestamp()
        }, { merge: true });
        await addDoc(collection(window.db, 'dms', dm.threadId, 'messages'), window.cleanForCloud({ fromUid: uid, fromUser: window.me(), ...payload, createdAt: serverTimestamp() }));
        window.notify(dm.partnerUid, 'dm', { text: payload.isAudio ? 'sent you a voice note' : payload.isImage ? 'sent you a photo' : (payload.text || '').slice(0, 60) });
    } catch (e) { showToast("⚠️ Message not sent. Check your connection."); }
};

window.sendDirectMessage = function() {
    const input = document.getElementById('dmInputText');
    const text = (input.value || '').trim();
    if (!text || !window.activeDm) return;
    input.value = '';
    window.sendDmMessage({ text, isImage: false });
};

// Market "Contact" and profile "DM" buttons pass a gamertag — that still works
window.selectDmTarget = function(tag) { window.openDmThread((tag || '').replace('@', '')); };

// ================= SIGN-IN / SIGN-OUT HOOK =================
window.afterAuthChange = async function(user) {
    // Drawer shows who you are
    const tag = user ? window.me() : 'Guest';
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    set('drawerName', user ? (window.myDisplayName || tag) : 'Guest');
    set('drawerTag', user ? '@' + tag : 'Not signed in');
    const av = document.getElementById('drawerAvatar');
    if (av) av.innerHTML = user && user.photoURL ? `<img src="${user.photoURL}" class="w-full h-full object-cover rounded-xl">` : (tag.slice(0, 2).toUpperCase());

    window.listenToNotifications();
    window.listenToDmInbox();
    if (user) {
        await window.ensureMyProfile();
        window.loadMyFollowing();
        window.loadBlocked();
        window.ensureOfficialHubs();
        window.uploadMyLocalTournaments();
        window.cleanupExpiredStories && window.cleanupExpiredStories();
    } else {
        window.myFollowing = { uids: new Set(), users: new Set() };
    }
    window.renderFypFeed && window.renderFypFeed();
    window.renderClansList && window.renderClansList();
};

// ================= INSTALLABLE APP (PWA) =================
window.deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredInstallPrompt = e;
    const item = document.getElementById('installAppItem');
    if (item) item.classList.remove('hidden');
});
window.addEventListener('appinstalled', () => {
    showToast('🎉 Sinless GG installed! Find it on your home screen.');
    const item = document.getElementById('installAppItem');
    if (item) item.classList.add('hidden');
});

window.installApp = async function() {
    if (window.deferredInstallPrompt) {
        window.deferredInstallPrompt.prompt();
        try { await window.deferredInstallPrompt.userChoice; } catch (e) {}
        window.deferredInstallPrompt = null;
    } else {
        window.sgConfirm('In Chrome, tap the ⋮ menu (top right), then "Add to Home screen" or "Install app". On iPhone Safari, tap Share → "Add to Home Screen".', { title: '📲 Install Sinless GG', okText: 'Got it', cancelText: 'Close' });
    }
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch((e) => console.warn('Service worker not registered:', e));
    });
}

// ================= LINKS TO PROFILES (#user=Name) =================
window.openUserFromLink = function() {
    const m = location.hash.match(/^#user=([A-Za-z0-9_]+)/);
    if (m) window.openUserProfileModal(m[1]);
};
window.addEventListener('hashchange', window.openUserFromLink);

// ================= START-UP FOR THE CLOUD LAYER =================
window._baseInitApp = window._baseInitApp || window.initApp;
window.initApp = async function() {
    await window._baseInitApp();
    window.listenToTournaments();
    window.setFeedMode('foryou');
    window.renderBlockedList();
    window.openUserFromLink();
    window.updateNotifBadge();
};

// Tell people they were @mentioned in a new post
window._baseSubmitUniversalPost = window._baseSubmitUniversalPost || window.submitUniversalPost;
window.submitUniversalPost = async function() {
    const text = (document.getElementById('postTextContent').value || '').trim();
    if (window.needSignIn('post')) return;
    await window._baseSubmitUniversalPost();
    if (text) window.notifyMentions(text, null, 'post');
};

// ======================================================================
// NAMES, AVATARS, @TAGGING, TABLES, INSTALL (v11)
// ======================================================================

// ---------- Everyone's public profile, loaded once (for names, photos and @tag suggestions) ----------
window.allProfilesMap = {};
window.loadAllProfiles = async function() {
    if (!window.db) return;
    try {
        const snap = await getDocs(query(collection(window.db, 'profiles'), limit(2000)));
        const map = {};
        snap.forEach(d => { const p = d.data(); map[d.id] = { ...p, gamertag: p.gamertag || d.id }; });
        window.allProfilesMap = map;
        window.renderFypFeed && window.renderFypFeed();
        window.renderStoriesBar && window.renderStoriesBar();
    } catch (e) { console.warn('Profiles load failed', e); }
};

window.profileFor = function(tag) {
    const k = (tag || '').replace('@', '').toLowerCase();
    return window.allProfilesMap[k] || (window.profileCache[k] && window.profileCache[k].data) || null;
};

// Display name (e.g. "Ace Khyd") — falls back to the gamertag
window.dnText = function(tag, fallback) {
    const p = window.profileFor(tag);
    return (p && p.displayName) || fallback || (tag || 'Gamer').replace('@', '');
};
window.dn = function(tag, fallback) { return escapeHTML(window.dnText(tag, fallback)); };

// Tappable name that opens the profile from anywhere
window.nameLink = function(tag, cls = 'font-bold text-white', fallback) {
    const t = escapeHTML((tag || '').replace('@', ''));
    return `<span class="cursor-pointer hover:underline ${cls}" onclick="event.stopPropagation(); window.openUserProfileModal('${t}', event)">${window.dn(tag, fallback)}</span>`;
};

// Profile photo if they have one, otherwise their initials
window.avatarHtml = function(tag, size = 'w-9 h-9', round = 'rounded-xl', textSize = 'text-xs') {
    const p = window.profileFor(tag);
    const t = escapeHTML((tag || '').replace('@', ''));
    const click = `onclick="event.stopPropagation(); window.openUserProfileModal('${t}', event)"`;
    if (p && p.pfp) return `<img ${click} src="${window.cldSized(p.pfp, 120)}" class="${size} ${round} object-cover shrink-0 cursor-pointer bg-gg-900" loading="lazy" alt="">`;
    return `<div ${click} class="${size} ${round} shrink-0 cursor-pointer bg-gradient-to-tr from-cyan-400 to-magenta flex items-center justify-center text-slate-950 font-black ${textSize}">${escapeHTML(window.dnText(tag).replace(/[^A-Za-z0-9 ]/g, '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || t.slice(0, 2).toUpperCase())}</div>`;
};

// ---------- @ tagging: suggestions pop up as you type @ in any box ----------
window.mentionTargets = ['postTextContent', 'commentInputText', 'postDetailReplyInput', 'dmInputText', 'squadSubRoomInput', 'editPostCaptionInput', 'chatInputMsg'];
window.mentionState = null;

window.mentionCandidates = function(q) {
    q = (q || '').toLowerCase();
    const seen = new Set(), out = [];
    const add = (tag, name) => {
        const k = (tag || '').toLowerCase();
        if (!k || seen.has(k) || k === window.meLower() || k === 'guest' || window.isBlocked(k)) return;
        if (q && !k.includes(q) && !(name || '').toLowerCase().includes(q)) return;
        seen.add(k); out.push({ tag, name: name || tag });
    };
    // people you follow first, then everyone else
    Object.values(window.allProfilesMap).filter(p => window.amFollowing(p.gamertag)).forEach(p => add(p.gamertag, p.displayName));
    Object.values(window.allProfilesMap).forEach(p => add(p.gamertag, p.displayName));
    (window.fypposts || []).forEach(p => add(p.user, p.displayName));
    return out.sort((a, b) => (a.tag.toLowerCase().startsWith(q) ? 0 : 1) - (b.tag.toLowerCase().startsWith(q) ? 0 : 1)).slice(0, 6);
};

window.onMentionInput = function(el) {
    const caret = el.selectionStart || el.value.length;
    const before = el.value.slice(0, caret);
    const m = before.match(/(^|\s)@([A-Za-z0-9_]{0,24})$/);
    if (!m) return window.hideMentionBox();
    const list = window.mentionCandidates(m[2]);
    if (!list.length) return window.hideMentionBox();
    window.mentionState = { el, start: caret - m[2].length - 1, end: caret, list };
    const box = document.getElementById('mentionBox');
    box.innerHTML = list.map((c, i) => `
        <button type="button" onmousedown="event.preventDefault()" onclick="window.pickMention(${i})" class="w-full flex items-center space-x-2.5 px-3 py-2 hover:bg-gg-800 text-left">
            ${window.avatarHtml(c.tag, 'w-8 h-8', 'rounded-full', 'text-[10px]').replace(/onclick="[^"]*"/, '')}
            <span class="min-w-0"><span class="block text-xs font-bold text-white truncate">${escapeHTML(c.name)}</span><span class="block text-[10px] text-gray-400">@${escapeHTML(c.tag)}</span></span>
        </button>`).join('');
    const r = el.getBoundingClientRect();
    const below = r.top < window.innerHeight / 2;
    box.style.left = Math.max(8, r.left) + 'px';
    box.style.width = Math.min(r.width, window.innerWidth - 16) + 'px';
    box.style.top = below ? (r.bottom + 6) + 'px' : 'auto';
    box.style.bottom = below ? 'auto' : (window.innerHeight - r.top + 6) + 'px';
    box.classList.remove('hidden');
};

window.pickMention = function(i) {
    const s = window.mentionState;
    if (!s) return;
    const c = s.list[i];
    const v = s.el.value;
    s.el.value = v.slice(0, s.start) + '@' + c.tag + ' ' + v.slice(s.end);
    const pos = s.start + c.tag.length + 2;
    s.el.focus(); s.el.setSelectionRange(pos, pos);
    window.hideMentionBox();
};

window.hideMentionBox = function() {
    const box = document.getElementById('mentionBox');
    if (box) box.classList.add('hidden');
    window.mentionState = null;
};

window.setupMentionInputs = function() {
    window.mentionTargets.forEach(id => {
        const el = document.getElementById(id);
        if (!el || el.dataset.mentions) return;
        el.dataset.mentions = '1';
        el.addEventListener('input', () => window.onMentionInput(el));
        el.addEventListener('blur', () => setTimeout(window.hideMentionBox, 150));
        el.addEventListener('keydown', (e) => {
            if (!window.mentionState) return;
            if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); e.stopImmediatePropagation(); window.pickMention(0); }
            if (e.key === 'Escape') window.hideMentionBox();
        }, true);
    });
};

// "Tag people" button in the post composer
window.startTagging = function() {
    const el = document.getElementById('postTextContent');
    const v = el.value;
    el.value = v + (v && !/\s$/.test(v) ? ' ' : '') + '@';
    el.focus(); el.setSelectionRange(el.value.length, el.value.length);
    window.onMentionInput(el);
};

// ---------- Opening a profile works from anywhere (it now sits on top of everything) ----------
window._baseOpenDmModal2 = window._baseOpenDmModal2 || window.openDmModal;
window.openDmModal = function(username = null, e = null) {
    const prof = document.getElementById('userProfileModal');
    if (prof && !prof.classList.contains('hidden')) prof.classList.add('hidden');
    return window._baseOpenDmModal2(username, e);
};
window._baseOpenStoryProfile = window.openUserProfileModal;
window.openUserProfileModal = function(username, e = null) {
    const sv = document.getElementById('storyViewerModal');
    if (sv && !sv.classList.contains('hidden')) window.closeStoryViewer();
    window.hideMentionBox();
    window.pauseFeedVideos && window.pauseFeedVideos();
    return window._baseOpenStoryProfile(username, e);
};

// ---------- Tables & Top: show GGs and Views (no points) ----------
window.rankSort = { week: 'ggs', all: 'ggs' };
window.setRankSort = function(kind, by) {
    window.rankSort[kind] = by;
    document.querySelectorAll(`[data-ranksort="${kind}"]`).forEach(b => {
        const on = b.dataset.by === by;
        b.className = `px-2.5 py-1 rounded-full text-[10px] font-black ${on ? 'bg-white text-slate-950' : 'bg-gg-900 text-gray-400 border border-cyan-500/20'}`;
    });
    if (kind === 'week') window.renderLadder(); else window.renderTopAccounts();
};

window.creatorRowV2 = function(c, i, sub) {
    const medal = ['🥇', '🥈', '🥉'][i];
    const top = i < 3;
    return `
        <div class="p-3 flex items-center justify-between text-xs cursor-pointer hover:bg-gg-900/60 transition ${top ? 'bg-amber-500/5' : ''}" onclick="window.openUserProfileModal('${escapeHTML(c.gamertag)}', event)">
            <div class="flex items-center space-x-2.5 min-w-0">
                <span class="w-7 text-center font-black ${top ? 'text-lg' : 'text-amber-400 text-xs'}">${medal || '#' + (i + 1)}</span>
                ${window.avatarHtml(c.gamertag, 'w-9 h-9', 'rounded-xl', 'text-[10px]')}
                <div class="min-w-0">
                    <h4 class="font-bold text-white truncate">${window.dn(c.gamertag)}</h4>
                    <p class="text-[9px] text-gray-400 truncate">${sub}</p>
                </div>
            </div>
            <div class="flex items-center space-x-3 shrink-0 ml-2 text-right">
                <div><p class="font-black text-cyan-400 text-xs">${window.formatCount(c.ggs)}</p><p class="text-[8px] text-gray-500 font-bold">GGs</p></div>
                <div><p class="font-black text-white text-xs">${window.formatCount(c.views)}</p><p class="text-[8px] text-gray-500 font-bold">VIEWS</p></div>
            </div>
        </div>`;
};

window.renderLadder = async function() {
    const container = document.getElementById('ladderBody');
    if (!container) return;
    if (!container.innerHTML.trim()) container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Ranking this week's creators…</p>`;
    const posts = await window.fetchRankingPosts('week');
    const by = window.rankSort.week;
    const list = window.buildCreatorStats(posts)
        .filter(c => !window.isBlocked(c.gamertag))
        .sort((a, b) => by === 'views' ? (b.views - a.views || b.ggs - a.ggs) : (b.ggs - a.ggs || b.views - a.views))
        .slice(0, 250);
    if (!list.length) { container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">No posts this week yet — be the first creator of the week!</p>`; return; }
    container.innerHTML = list.map((c, i) => window.creatorRowV2(c, i, `${c.posts} post${c.posts === 1 ? '' : 's'} this week`)).join('');
    const count = document.getElementById('ladderCount');
    if (count) count.innerText = `${list.length} creator${list.length === 1 ? '' : 's'}`;
};

window.renderTopAccounts = async function() {
    const container = document.getElementById('topAccountsList');
    if (!container) return;
    if (!container.innerHTML.trim()) container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading all-time leaders…</p>`;
    const posts = await window.fetchRankingPosts('all');
    const by = window.rankSort.all;
    const list = window.buildCreatorStats(posts)
        .filter(c => !window.isBlocked(c.gamertag))
        .sort((a, b) => by === 'views' ? (b.views - a.views || b.ggs - a.ggs) : (b.ggs - a.ggs || b.views - a.views))
        .slice(0, 250);
    if (!list.length) { container.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">No creators yet.</p>`; return; }
    container.innerHTML = list.map((c, i) => window.creatorRowV2(c, i, `${c.posts} post${c.posts === 1 ? '' : 's'} all-time`)).join('');
};

// ---------- Install on any device ----------
window.isStandalone = function() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
};
window.detectPlatform = function() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) return /CriOS|FxiOS|EdgiOS/.test(ua) ? 'ios-other' : 'ios-safari';
    if (/Android/.test(ua)) return /SamsungBrowser/.test(ua) ? 'android-samsung' : (/Firefox/.test(ua) ? 'android-firefox' : 'android-chrome');
    if (/Firefox/.test(ua)) return 'desktop-firefox';
    if (/Edg\//.test(ua)) return 'desktop-edge';
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) return 'desktop-safari';
    return 'desktop-chrome';
};

window.installApp = async function() {
    if (window.isStandalone()) { showToast("✅ You're already using the installed app!"); return; }
    if (window.deferredInstallPrompt) {
        window.deferredInstallPrompt.prompt();
        try { await window.deferredInstallPrompt.userChoice; } catch (e) {}
        window.deferredInstallPrompt = null;
        return;
    }
    const steps = {
        'ios-safari': ['Tap the <b>Share</b> button <i class="fa-solid fa-arrow-up-from-bracket"></i> at the bottom of Safari.', 'Scroll down and tap <b>Add to Home Screen</b>.', 'Tap <b>Add</b>. Sinless GG appears on your home screen.'],
        'ios-other': ['On iPhone/iPad, apps can only be installed from <b>Safari</b>.', 'Copy this page link, open it in <b>Safari</b>.', 'Then tap <b>Share</b> → <b>Add to Home Screen</b>.'],
        'android-chrome': ['Tap the <b>⋮</b> menu (top right of Chrome).', 'Tap <b>Install app</b> or <b>Add to Home screen</b>.', 'Tap <b>Install</b>.'],
        'android-samsung': ['Tap the <b>☰</b> menu at the bottom.', 'Tap <b>Add page to</b> → <b>Home screen</b>.', 'Tap <b>Add</b>.'],
        'android-firefox': ['Tap the <b>⋮</b> menu.', 'Tap <b>Install</b> or <b>Add to Home screen</b>.', 'Confirm.'],
        'desktop-chrome': ['Look for the <b>install icon</b> <i class="fa-solid fa-display"></i> at the right end of the address bar.', 'Or open the <b>⋮</b> menu → <b>Cast, save and share</b> → <b>Install page as app</b>.', 'Click <b>Install</b>. It opens in its own window and gets a desktop/Start menu icon.'],
        'desktop-edge': ['Click the <b>App available</b> icon in the address bar,', 'or <b>⋯</b> menu → <b>Apps</b> → <b>Install this site as an app</b>.', 'Click <b>Install</b>.'],
        'desktop-safari': ['On Mac Safari, open the <b>File</b> menu (or Share button).', 'Choose <b>Add to Dock</b>.', 'Sinless GG opens like a normal Mac app.'],
        'desktop-firefox': ['Firefox on computers can\'t install web apps yet.', 'Open this page in <b>Chrome</b> or <b>Edge</b>,', 'then use their <b>Install</b> option.']
    };
    const list = steps[window.detectPlatform()] || steps['desktop-chrome'];
    document.getElementById('installSteps').innerHTML = list.map((s, i) => `
        <div class="flex items-start space-x-3"><span class="w-6 h-6 shrink-0 rounded-full bg-cyan-400 text-slate-950 text-xs font-black flex items-center justify-center">${i + 1}</span><p class="text-sm text-gray-200 leading-snug pt-0.5">${s}</p></div>`).join('');
    document.getElementById('installSheet').classList.remove('hidden');
};

window.refreshInstallItem = function() {
    const item = document.getElementById('installAppItem');
    if (item) item.classList.toggle('hidden', window.isStandalone());
};

// ---------- Start-up ----------
window._baseInitApp2 = window._baseInitApp2 || window.initApp;
window.initApp = async function() {
    await window._baseInitApp2();
    window.setupMentionInputs();
    window.refreshInstallItem();
    window.loadAllProfiles();
};
// after saving your profile, refresh names everywhere
window._baseSaveProfile2 = window._baseSaveProfile2 || window.saveUserProfileChanges;
window.saveUserProfileChanges = async function() { await window._baseSaveProfile2(); window.refreshOneProfile && window.refreshOneProfile(window.me()); };

// ======================================================================
// v13: GAMERTAGS, ADMIN PANEL, BANS, LOBBY CHAT, PHONE ALERTS
// ======================================================================

// ---------- Custom gamertags ----------
window.RESERVED_TAGS = ['guest', 'admin', 'administrator', 'moderator', 'mod', 'support', 'official', 'sinless', 'sinlessgg', 'sinlessgaming', 'staff', 'system'];
window.validTag = function(t) { return /^[A-Za-z0-9_]{3,20}$/.test(t || ''); };

window.resolveGamertag = async function(user) {
    // 1) already chose one
    try {
        const u = await getDoc(doc(window.db, 'users', user.uid));
        if (u.exists() && u.data().gamertag) return u.data().gamertag;
    } catch (e) {}
    // 2) people who joined before gamertags: keep the one they already have
    try {
        const s = await getDocs(query(collection(window.db, 'profiles'), where('uid', '==', user.uid), limit(1)));
        let found = null;
        s.forEach(d => { found = d.data().gamertag || d.id; });
        if (found) { setDoc(doc(window.db, 'users', user.uid), { gamertag: found }, { merge: true }).catch(() => {}); return found; }
    } catch (e) {}
    // 3) brand-new: let them pick
    return await window.askForGamertag(user);
};

window.askForGamertag = function(user) {
    return new Promise((resolve) => {
        const modal = document.getElementById('gamertagModal');
        const input = document.getElementById('gamertagInput');
        const status = document.getElementById('gamertagStatus');
        const btn = document.getElementById('gamertagSaveBtn');
        input.value = (user.displayName || '').replace(/[^A-Za-z0-9_]/g, '').slice(0, 20);
        document.getElementById('gamertagNameInput').value = user.displayName || '';
        modal.classList.remove('hidden');
        let timer = null, okTag = null;
        const check = async () => {
            const t = input.value.trim();
            okTag = null; btn.disabled = true; btn.classList.add('opacity-50');
            if (!window.validTag(t)) { status.innerHTML = `<span class="text-amber-400">3–20 letters, numbers or _ (no spaces)</span>`; return; }
            if (window.RESERVED_TAGS.includes(t.toLowerCase()) && !window.isAppAdmin) { status.innerHTML = `<span class="text-red-400">That gamertag is reserved.</span>`; return; }
            status.innerHTML = `<span class="text-gray-400"><i class="fa-solid fa-spinner fa-spin"></i> Checking…</span>`;
            try {
                const snap = await getDoc(doc(window.db, 'profiles', t.toLowerCase()));
                if (input.value.trim() !== t) return;
                if (snap.exists() && snap.data().uid !== user.uid) { status.innerHTML = `<span class="text-red-400">@${escapeHTML(t)} is taken. Try another.</span>`; return; }
                okTag = t; btn.disabled = false; btn.classList.remove('opacity-50');
                status.innerHTML = `<span class="text-emerald-400">✓ @${escapeHTML(t)} is available!</span>`;
            } catch (e) { status.innerHTML = `<span class="text-red-400">Couldn't check. Are you online?</span>`; }
        };
        input.oninput = () => { clearTimeout(timer); timer = setTimeout(check, 400); };
        check();
        btn.onclick = async () => {
            if (!okTag) return;
            btn.disabled = true; btn.innerText = 'Saving…';
            const displayName = document.getElementById('gamertagNameInput').value.trim() || okTag;
            try {
                await setDoc(doc(window.db, 'profiles', okTag.toLowerCase()), window.cleanForCloud({
                    uid: user.uid, gamertag: okTag, displayName, bio: 'Gamer on Sinless GG 🎮', website: '',
                    pfp: user.photoURL || '', cover: '', createdAt: serverTimestamp()
                }));
                await setDoc(doc(window.db, 'users', user.uid), { gamertag: okTag }, { merge: true });
                window.myDisplayName = displayName;
                modal.classList.add('hidden');
                btn.innerText = "Let's go";
                showToast(`🎮 Welcome to Sinless GG, @${okTag}!`);
                resolve(okTag);
            } catch (e) {
                btn.disabled = false; btn.innerText = "Let's go";
                status.innerHTML = `<span class="text-red-400">Someone just took @${escapeHTML(okTag)}. Pick another.</span>`;
            }
        };
    });
};

// ---------- App admins & bans ----------
window.isAppAdmin = false;
window.isBanned = false;

window.checkAdminAndBan = async function(user) {
    window.isAppAdmin = false; window.isBanned = false;
    if (!user || !window.db) return;
    try { const c = await getDoc(doc(window.db, 'config', 'admins')); window.isAppAdmin = c.exists() && (c.data().uids || []).includes(user.uid); } catch (e) {}
    try { const b = await getDoc(doc(window.db, 'banned', user.uid)); window.isBanned = b.exists(); } catch (e) {}
    document.getElementById('adminPanelItem') && document.getElementById('adminPanelItem').classList.toggle('hidden', !window.isAppAdmin);
    document.getElementById('bannedBanner') && document.getElementById('bannedBanner').classList.toggle('hidden', !window.isBanned);
};

// Banned accounts can look around but can't post, chat or interact
window._baseNeedSignIn = window._baseNeedSignIn || window.needSignIn;
window.needSignIn = function(what) {
    if (window._baseNeedSignIn(what)) return true;
    if (window.isBanned) { showToast("🚫 Your account is suspended."); return true; }
    return false;
};

// Sign-in: pick/load gamertag first, then everything else
window._baseAfterAuthChange = window._baseAfterAuthChange || window.afterAuthChange;
window.afterAuthChange = async function(user) {
    if (user && window.db) {
        await window.checkAdminAndBan(user);
        const tag = await window.resolveGamertag(user);
        window.myUsername = '@' + tag;
        const prof = await window.getProfile(tag, true);
        window.myDisplayName = (prof && prof.displayName) || window.myDisplayName || tag;
        const status = document.getElementById('accountModalStatusText');
        if (status) status.innerText = `Signed in as ${window.myDisplayName} (@${tag})`;
        const uidBox = document.getElementById('myUidText');
        if (uidBox) uidBox.innerText = user.uid;
    } else {
        window.isAppAdmin = false; window.isBanned = false;
        document.getElementById('adminPanelItem') && document.getElementById('adminPanelItem').classList.add('hidden');
        document.getElementById('bannedBanner') && document.getElementById('bannedBanner').classList.add('hidden');
    }
    await window._baseAfterAuthChange(user);
    window.loadAllProfiles && window.loadAllProfiles();
};

window.copyMyUid = async function() {
    const uid = window.currentUser && window.currentUser.uid;
    if (!uid) return;
    try { await navigator.clipboard.writeText(uid); showToast('📋 User ID copied'); } catch (e) { showToast(uid); }
};

// Verified badge (given by admins)
window._baseGetProfileBadges = window._baseGetProfileBadges || window.getProfileBadges;
window.getProfileBadges = function(username) {
    const p = window.profileFor ? window.profileFor(username) : null;
    const v = p && p.verified ? '<span class="text-[9px] text-sky-400" title="Verified"><i class="fa-solid fa-circle-check"></i></span> ' : '';
    return v + window._baseGetProfileBadges(username);
};

// ---------- Admin panel ----------
window.adminTab = 'reports';
// Only lets a tab draw while it's still the open tab (slow tabs can't overwrite the one you switched to)
window.adminBoxFor = function(tab) {
    const el = document.getElementById('adminBody');
    return { get innerHTML() { return el.innerHTML; }, set innerHTML(v) { if (window.adminTab === tab) el.innerHTML = v; } };
};
window.openAdminPanel = function() {
    if (!window.isAppAdmin) { showToast("Admins only."); return; }
    document.getElementById('adminModal').classList.remove('hidden');
    window.setAdminTab(window.adminTab);
};
window.closeAdminPanel = function() { document.getElementById('adminModal').classList.add('hidden'); };
window.setAdminTab = function(tab) {
    window.adminTab = tab;
    document.querySelectorAll('[data-admintab]').forEach(b => {
        b.className = `flex-1 py-2 text-xs font-black border-b-2 ${b.dataset.admintab === tab ? 'text-white border-cyan-400' : 'text-gray-500 border-transparent'}`;
    });
    ({ reports: window.renderAdminReports, users: window.renderAdminUsers, stats: window.renderAdminStats, ads: window.renderAdminAds })[tab]();
};

window.renderAdminReports = async function() {
    const box = window.adminBoxFor('reports');
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-8"><i class="fa-solid fa-spinner fa-spin"></i> Loading reports…</p>`;
    let reports = [];
    try { const s = await getDocs(query(collection(window.db, 'reports'), limit(300))); s.forEach(d => reports.push({ id: d.id, ...d.data() })); }
    catch (e) { box.innerHTML = `<p class="text-xs text-red-400 text-center py-8">Couldn't load reports. Did you publish the new rules?</p>`; return; }
    const groups = {};
    reports.forEach(r => { (groups[r.postId] = groups[r.postId] || []).push(r); });
    const ids = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
    if (!ids.length) { box.innerHTML = `<div class="text-center py-14"><i class="fa-solid fa-shield-heart text-3xl text-emerald-400"></i><p class="text-xs text-gray-400 mt-2">No reports. All clean! 🎉</p></div>`; return; }
    const cards = [];
    for (const id of ids) {
        let p = window.findPost(id);
        if (!p) { try { const s = await getDoc(doc(window.db, 'posts', id)); if (s.exists()) p = { id, docId: id, ...s.data() }; } catch (e) {} }
        const reasons = {};
        groups[id].forEach(r => { reasons[r.reason] = (reasons[r.reason] || 0) + 1; });
        cards.push(`
            <div class="glass-panel rounded-2xl p-3 space-y-2 border border-red-500/30">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black text-red-400">🚩 ${groups[id].length} report${groups[id].length === 1 ? '' : 's'}</span>
                    <span class="text-[10px] text-gray-400">${Object.entries(reasons).map(([k, v]) => `${escapeHTML(k)} ×${v}`).join(' · ')}</span>
                </div>
                ${p ? `<div class="text-xs text-gray-200"><b class="text-white">${window.dn(p.user)}</b> <span class="text-gray-500">@${escapeHTML(p.user)}</span><p class="mt-1 line-clamp-3">${escapeHTML(p.caption || '(photo/video post)')}</p></div>` : `<p class="text-xs text-gray-500">Post already deleted.</p>`}
                <div class="grid grid-cols-2 gap-2 pt-1">
                    ${p ? `<button onclick="window.closeAdminPanel(); window.openPostDetail('${id}')" class="py-2 rounded-xl bg-gg-900 text-gray-200 text-[11px] font-bold">👁 View post</button>` : ''}
                    <button onclick="window.adminDismissReports('${id}')" class="py-2 rounded-xl bg-gg-900 text-emerald-400 text-[11px] font-bold">✓ Keep post</button>
                    ${p ? `<button onclick="window.adminRemovePost('${id}')" class="py-2 rounded-xl bg-red-600/20 text-red-400 text-[11px] font-bold">🗑 Remove post</button>` : ''}
                    ${p && p.uid ? `<button onclick="window.adminBan('${p.uid}', '${escapeHTML(p.user)}')" class="py-2 rounded-xl bg-red-600 text-white text-[11px] font-bold">🚫 Ban @${escapeHTML(p.user)}</button>` : ''}
                </div>
            </div>`);
    }
    box.innerHTML = cards.join('');
};

window.adminDeleteReportsFor = async function(postId) {
    try {
        const s = await getDocs(query(collection(window.db, 'reports'), where('postId', '==', postId), limit(300)));
        const jobs = []; s.forEach(d => jobs.push(deleteDoc(doc(window.db, 'reports', d.id))));
        await Promise.all(jobs);
    } catch (e) {}
};
window.adminDismissReports = async function(postId) {
    try { await updateDoc(doc(window.db, 'posts', postId), { reportsCount: 0 }); } catch (e) {}
    await window.adminDeleteReportsFor(postId);
    showToast('✓ Post kept, reports cleared.'); window.renderAdminReports();
};
window.adminRemovePost = async function(postId) {
    const ok = await window.sgConfirm('This post will be deleted for everyone.', { title: 'Remove post?', okText: 'Remove', danger: true });
    if (!ok) return;
    try { await deleteDoc(doc(window.db, 'posts', postId)); } catch (e) { showToast("⚠️ Couldn't delete. Check rules."); return; }
    window.fypposts = (window.fypposts || []).filter(p => (p.docId || p.id) !== postId);
    await window.adminDeleteReportsFor(postId);
    window.renderFypFeed(); showToast('🗑 Post removed.'); window.renderAdminReports();
};
window.adminBan = async function(uid, tag) {
    const ok = await window.sgConfirm(`@${tag} won't be able to post, reply, chat, follow or message anyone. You can unban them later.`, { title: `Ban @${tag}?`, okText: 'Ban', danger: true });
    if (!ok) return;
    try { await setDoc(doc(window.db, 'banned', uid), { tag, by: window.me(), createdAt: serverTimestamp() }); showToast(`🚫 @${tag} banned.`); }
    catch (e) { showToast("⚠️ Couldn't ban. Check rules."); }
    if (window.adminTab === 'users') window.renderAdminUsers(); else window.renderAdminReports();
};
window.adminUnban = async function(uid, tag) {
    try { await deleteDoc(doc(window.db, 'banned', uid)); showToast(`@${tag} unbanned.`); } catch (e) {}
    window.renderAdminUsers();
};
window.adminToggleVerify = async function(tag, on) {
    try {
        await updateDoc(doc(window.db, 'profiles', tag.toLowerCase()), { verified: on });
        if (window.allProfilesMap[tag.toLowerCase()]) window.allProfilesMap[tag.toLowerCase()].verified = on;
        showToast(on ? `✔ @${tag} verified!` : `Removed verification from @${tag}.`);
    } catch (e) { showToast("⚠️ Couldn't update. Check rules."); }
    window.renderAdminUsers(); window.renderFypFeed();
};

window.renderAdminUsers = async function() {
    const box = window.adminBoxFor('users');
    const q = (document.getElementById('adminUserSearch') || {}).value || '';
    let banned = {};
    try { const s = await getDocs(query(collection(window.db, 'banned'), limit(500))); s.forEach(d => banned[d.id] = d.data()); } catch (e) {}
    await window.loadAllProfiles();
    const list = Object.values(window.allProfilesMap)
        .filter(p => !q || (p.gamertag || '').toLowerCase().includes(q.toLowerCase()) || (p.displayName || '').toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''))
        .slice(0, 200);
    box.innerHTML = `
        <input id="adminUserSearch" value="${escapeHTML(q)}" oninput="clearTimeout(window._aus); window._aus = setTimeout(window.renderAdminUsers, 350)" placeholder="Search name or @gamertag…" class="w-full bg-gg-900 border border-cyan-500/30 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none mb-2">
        <p class="text-[10px] text-gray-500 mb-1">${Object.keys(window.allProfilesMap).length} gamers · ${Object.keys(banned).length} banned</p>
        ${list.map(p => `
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-gg-900/60 border border-cyan-500/10">
                <div class="flex items-center space-x-2 min-w-0">
                    ${window.avatarHtml(p.gamertag, 'w-9 h-9', 'rounded-xl', 'text-[10px]')}
                    <div class="min-w-0"><p class="text-xs font-bold text-white truncate">${escapeHTML(p.displayName || p.gamertag)} ${p.verified ? '<i class="fa-solid fa-circle-check text-sky-400"></i>' : ''}</p><p class="text-[10px] text-gray-500">@${escapeHTML(p.gamertag)}</p></div>
                </div>
                <div class="flex space-x-1.5 shrink-0">
                    <button onclick="window.adminToggleVerify('${escapeHTML(p.gamertag)}', ${!p.verified})" class="px-2 py-1.5 rounded-lg text-[10px] font-bold ${p.verified ? 'bg-gg-800 text-gray-300' : 'bg-sky-500/20 text-sky-400'}">${p.verified ? 'Unverify' : '✔ Verify'}</button>
                    ${banned[p.uid] ? `<button onclick="window.adminUnban('${p.uid}', '${escapeHTML(p.gamertag)}')" class="px-2 py-1.5 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Unban</button>`
                                    : (p.uid !== window.currentUser.uid ? `<button onclick="window.adminBan('${p.uid}', '${escapeHTML(p.gamertag)}')" class="px-2 py-1.5 rounded-lg text-[10px] font-bold bg-red-600/20 text-red-400">Ban</button>` : '')}
                </div>
            </div>`).join('')}`;
    const inp = document.getElementById('adminUserSearch');
    if (inp && q) { inp.focus(); inp.setSelectionRange(q.length, q.length); }
};

window.renderAdminStats = async function() {
    const box = window.adminBoxFor('stats');
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-8"><i class="fa-solid fa-spinner fa-spin"></i> Counting…</p>`;
    const count = async (q) => { try { return (await getCountFromServer(q)).data().count; } catch (e) { return '–'; } };
    const day = new Date(Date.now() - 86400000), week = new Date(Date.now() - 7 * 86400000);
    const [users, posts, posts24, posts7, squads, tourns, reports, banned] = await Promise.all([
        count(collection(window.db, 'profiles')), count(collection(window.db, 'posts')),
        count(query(collection(window.db, 'posts'), where('createdAt', '>=', day))), count(query(collection(window.db, 'posts'), where('createdAt', '>=', week))),
        count(collection(window.db, 'squads')), count(collection(window.db, 'tournaments')),
        count(collection(window.db, 'reports')), count(collection(window.db, 'banned'))
    ]);
    const tile = (label, v, color = 'text-white') => `<div class="glass-panel rounded-2xl p-3 border border-cyan-500/15"><p class="text-2xl font-black ${color}">${typeof v === 'number' ? window.formatCount(v) : v}</p><p class="text-[10px] text-gray-400 font-bold uppercase">${label}</p></div>`;
    box.innerHTML = `<div class="grid grid-cols-2 gap-2">
        ${tile('Gamers', users, 'text-cyan-400')}${tile('Posts total', posts)}
        ${tile('Posts today', posts24, 'text-emerald-400')}${tile('Posts this week', posts7)}
        ${tile('Squads', squads)}${tile('Tournaments', tourns, 'text-amber-400')}
        ${tile('Open reports', reports, 'text-red-400')}${tile('Banned', banned)}
    </div>`;
};

// ---------- Lobby: real shared chat ----------
window.lobbyUnsub = null;
window.listenToLobby = function() {
    if (window.lobbyUnsub || !window.db) return;
    window.lobbyUnsub = onSnapshot(query(collection(window.db, 'lobbyMessages'), orderBy('createdAt', 'desc'), limit(120)), (snap) => {
        const msgs = [];
        snap.forEach(d => msgs.unshift({ id: d.id, ...d.data() }));
        window.renderLobby(msgs);
    }, (e) => console.warn('Lobby:', e));
};
window.renderLobby = function(msgs) {
    const box = document.getElementById('chatMessagesBox');
    if (!box) return;
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
    const list = msgs.filter(m => !window.isBlocked(m.user));
    if (!list.length) { box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">Say hi to everyone on Sinless GG 👋</p>`; return; }
    const uid = window.currentUser && window.currentUser.uid;
    box.innerHTML = list.map(m => `
        <div class="flex space-x-2.5 group">
            ${window.avatarHtml(m.user, 'w-8 h-8', 'rounded-xl', 'text-[10px]')}
            <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">${window.nameLink(m.user, 'text-xs font-bold text-white')}<span class="text-[9px] text-gray-500">${m.createdAt ? window.timeAgo(window.postTimeValue(m)) : 'now'}</span>
                    ${(m.uid === uid || window.isAppAdmin) ? `<button onclick="window.deleteLobbyMessage('${m.id}')" class="text-[10px] text-gray-600 hover:text-red-400 ml-auto"><i class="fa-solid fa-trash"></i></button>` : ''}</div>
                <p class="text-sm text-gray-200 whitespace-pre-wrap break-words">${formatMentions(m.text || '')}</p>
            </div>
        </div>`).join('');
    if (atBottom || !window._lobbyScrolled) { box.scrollTop = box.scrollHeight; window._lobbyScrolled = true; }
};
window.sendChatMessage = async function() {
    const input = document.getElementById('chatInputMsg');
    const text = (input.value || '').trim();
    if (!text || window.needSignIn('chat in the lobby')) return;
    input.value = '';
    try {
        await addDoc(collection(window.db, 'lobbyMessages'), { user: window.me(), uid: window.currentUser.uid, text: text.slice(0, 500), createdAt: serverTimestamp() });
        window.notifyMentions(text, null, 'the lobby');
    } catch (e) { showToast("⚠️ Message not sent."); }
};
window.deleteLobbyMessage = async function(id) {
    try { await deleteDoc(doc(window.db, 'lobbyMessages', id)); } catch (e) { showToast("Couldn't delete."); }
};
window.toggleVoiceLobbyConnection = function() { showToast("🎙️ Voice rooms are coming soon."); };

// ---------- Phone alerts (while the app is open or in the background) ----------
window.alertsEnabled = function() { return 'Notification' in window && Notification.permission === 'granted'; };
window.setupPushNotifications = async function() {
    if (!('Notification' in window)) { showToast("This browser doesn't support alerts. Try installing the app."); return; }
    if (window.detectPlatform && window.detectPlatform().startsWith('ios') && !window.isStandalone()) {
        window.sgConfirm('On iPhone, alerts only work after you install the app: Share → Add to Home Screen, then open it from your home screen and turn alerts on.', { title: '📲 Install first', okText: 'OK', cancelText: 'Close' });
        return;
    }
    const perm = await Notification.requestPermission();
    showToast(perm === 'granted' ? "🔔 Phone alerts on!" : "Alerts are off. You can allow them in your browser settings.");
};
window.phoneAlert = async function(title, body, tag) {
    if (!window.alertsEnabled() || document.visibilityState === 'visible') return;
    try {
        const reg = await navigator.serviceWorker.ready;
        reg.showNotification(title, { body, tag, icon: 'icon-192.png', badge: 'icon-192.png', data: { url: location.href.split('#')[0] } });
    } catch (e) { try { new Notification(title, { body, icon: 'icon-192.png' }); } catch (err) {} }
};
// Watch new notifications and turn them into phone alerts when the app isn't on screen
window._seenNotifIds = null;
window._baseUpdateNotifBadge = window._baseUpdateNotifBadge || window.updateNotifBadge;
window.updateNotifBadge = function() {
    window._baseUpdateNotifBadge();
    const ids = new Set(window.notifList.map(n => n.id));
    if (window._seenNotifIds) {
        window.notifList.filter(n => !n.read && !window._seenNotifIds.has(n.id) && !window.isBlocked(n.fromUser)).slice(0, 3).forEach(n => {
            const who = window.dnText(n.fromUser);
            window.phoneAlert(['dm', 'group'].includes(n.type) ? `💬 ${who}` : 'Sinless GG', ['dm', 'group'].includes(n.type) ? (n.text || 'sent you a message') : `${who} ${window.notifText(n)}`, n.id);
        });
    }
    window._seenNotifIds = ids;
};

// Lobby starts listening when you open it
window._baseSwitchView13 = window._baseSwitchView13 || window.switchView;
window.switchView = function(v) {
    window._baseSwitchView13(v);
    if (v === 'chat') window.listenToLobby();
};

// ======================================================================
// v13: DISCORD-STYLE SQUADS
// Owner = full control. Admins = moderate (mute, kick, ban, delete, pin, channels).
// Channels live in categories; some are "admins post only", some are a private staff room.
// ======================================================================

window.DEFAULT_CHANNELS = [
    { name: 'rules', category: 'INFO', adminOnly: true },
    { name: 'announcements', category: 'INFO', adminOnly: true },
    { name: 'chat', category: 'TEXT CHANNELS' },
    { name: 'tactics', category: 'TEXT CHANNELS' },
    { name: 'highlights', category: 'TEXT CHANNELS' },
    { name: 'results', category: 'RESULTS', adminOnly: true },
    { name: 'staff-room', category: 'STAFF', staff: true }
];

window.squadChannels = function(sq) {
    if (Array.isArray(sq.channels) && sq.channels.length) return sq.channels;
    // older squads: build channels from their old room list
    return (sq.subRooms || ['Rules/Announcements', 'chat']).filter(r => r !== 'Matchmaking').map(r =>
        r === 'Rules/Announcements' ? { name: r, category: 'INFO', adminOnly: true } : { name: r, category: 'TEXT CHANNELS' });
};
window.channelOf = function(sq, name) { return window.squadChannels(sq).find(c => c.name === name) || null; };

window.uidNow = function() { return window.currentUser ? window.currentUser.uid : null; };
window.isSquadOwner = function(sq) {
    if (!sq || !window.currentUser) return false;
    if (window.isAppAdmin) return true;
    return sq.ownerUid ? sq.ownerUid === window.uidNow() : (sq.owner || sq.leader || '').toLowerCase() === window.meLower();
};
window.isSquadAdmin = function(sq) {
    if (!sq || !window.currentUser) return false;
    return window.isSquadOwner(sq) || (sq.adminUids || []).includes(window.uidNow());
};
window.isSquadBanned = function(sq) { return !!(window.currentUser && (sq.bannedUids || []).includes(window.uidNow())); };
window.mutedUntilMe = function(sq) { const t = (sq.mutedUntil || {})[window.uidNow()] || 0; return t > Date.now() ? t : 0; };
window.roleOf = function(sq, tag, uid) {
    const t = (tag || '').toLowerCase();
    if ((sq.ownerUid && uid && sq.ownerUid === uid) || (sq.owner || sq.leader || '').toLowerCase() === t) return 'owner';
    if ((uid && (sq.adminUids || []).includes(uid)) || (sq.admins || []).some(a => (a || '').toLowerCase() === t)) return 'admin';
    return 'member';
};
window.roleBadge = function(role) {
    return role === 'owner' ? '<span class="text-[9px] text-amber-400 ml-1" title="Owner">👑</span>' : role === 'admin' ? '<span class="text-[9px] text-cyan-400 ml-1" title="Admin">🛡️</span>' : '';
};

// ---------- Open a squad ----------
window.openSquadDetailsModal = function(squadId) {
    const sq = window.clansData.find(c => c.id === squadId);
    if (!sq) return;
    window.activeSquadDetails = sq;
    sq.rooms = sq.rooms || {};
    window.activeSquadRooms = {};
    const chans = window.squadChannels(sq);
    window.activeSquadSubRoom = chans.some(c => c.name === 'chat') ? 'chat' : (chans.find(c => !c.staff) || chans[0] || { name: 'chat' }).name;
    document.getElementById('squadDetailsModal').classList.remove('hidden');
    window.renderSquadHeader();
    window.renderSquadChannel();
    window.listenToSquadMessages(sq);
};

window.closeSquadDetailsModal = function() {
    if (window.squadMsgUnsub) { window.squadMsgUnsub(); window.squadMsgUnsub = null; }
    if (window.squadStaffUnsub) { window.squadStaffUnsub(); window.squadStaffUnsub = null; }
    document.getElementById('squadDetailsModal').classList.add('hidden');
    ['squadChannelSheet', 'squadSettingsSheet'].forEach(id => document.getElementById(id).classList.add('hidden'));
    window.activeSquadDetails = null;
};

window.renderSquadHeader = function() {
    const sq = window.activeSquadDetails;
    if (!sq) return;
    document.getElementById('squadDetailTitle').innerHTML = `${escapeHTML(sq.name)} <span class="text-cyan-400">[${escapeHTML(sq.tag || '')}]</span>${!sq.isPublic ? ' <i class="fa-solid fa-lock text-[10px] text-gray-400"></i>' : ''}`;
    document.getElementById('squadDetailLeader').innerText = `${(sq.members || []).length} member${(sq.members || []).length === 1 ? '' : 's'} · ${window.dnText(sq.owner || sq.leader || 'Owner')} 👑`;
    document.getElementById('squadSettingsBtn').classList.toggle('hidden', !window.isSquadAdmin(sq));
    document.getElementById('hostSquadTournamentBtn').classList.toggle('hidden', !window.isSquadAdmin(sq));
    const ch = window.activeSquadSubRoom;
    const chan = window.channelOf(sq, ch);
    const icon = ch === 'Members' ? '👥' : ch === 'Matchmaking' ? '⚔️' : chan && chan.staff ? '🔒' : chan && chan.adminOnly ? '📢' : '#';
    document.getElementById('squadSubRoomsNav').innerHTML = `
        <button onclick="window.openChannelSheet()" class="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gg-900 border border-cyan-500/25 text-sm font-bold text-white min-w-0 flex-1">
            <i class="fa-solid fa-bars text-gray-400 text-xs"></i><span class="truncate">${icon} ${escapeHTML(ch === 'Rules/Announcements' ? 'rules' : ch)}</span><i class="fa-solid fa-chevron-down text-[10px] text-gray-500 ml-auto"></i>
        </button>
        <button onclick="window.switchSquadSubRoom('Members')" class="px-3 py-2 rounded-xl text-xs font-bold ${ch === 'Members' ? 'bg-cyan-400 text-slate-950' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">👥</button>
        <button onclick="window.switchSquadSubRoom('Matchmaking')" class="px-3 py-2 rounded-xl text-xs font-bold ${ch === 'Matchmaking' ? 'bg-cyan-400 text-slate-950' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">⚔️</button>`;
};

window.switchSquadSubRoom = function(room) {
    window.activeSquadSubRoom = room;
    document.getElementById('squadChannelSheet').classList.add('hidden');
    window.renderSquadHeader();
    window.renderSquadChannel();
};

// ---------- Channel list (Discord-style sheet) ----------
window.openChannelSheet = function() {
    const sq = window.activeSquadDetails;
    if (!sq) return;
    const admin = window.isSquadAdmin(sq);
    const groups = {};
    window.squadChannels(sq).forEach(c => { if (c.staff && !admin) return; (groups[c.category || 'TEXT CHANNELS'] = groups[c.category || 'TEXT CHANNELS'] || []).push(c); });
    document.getElementById('squadChannelList').innerHTML = Object.entries(groups).map(([cat, list]) => `
        <div class="pt-2">
            <p class="text-[10px] font-black text-gray-500 tracking-wider px-2 pb-1">${escapeHTML(cat)}</p>
            ${list.map(c => `
                <div class="flex items-center rounded-xl ${window.activeSquadSubRoom === c.name ? 'bg-gg-800' : ''}">
                    <button onclick="window.switchSquadSubRoom('${escapeHTML(c.name)}')" class="flex-1 text-left px-3 py-2.5 text-sm font-bold ${window.activeSquadSubRoom === c.name ? 'text-white' : 'text-gray-300'}">
                        <span class="text-gray-500 mr-1.5">${c.staff ? '🔒' : c.adminOnly ? '📢' : '#'}</span>${escapeHTML(c.name === 'Rules/Announcements' ? 'rules' : c.name)}
                    </button>
                    ${admin ? `<button onclick="window.editChannel('${escapeHTML(c.name)}')" class="px-3 text-gray-500 hover:text-white"><i class="fa-solid fa-gear text-xs"></i></button>` : ''}
                </div>`).join('')}
        </div>`).join('') + (admin ? `
        <button onclick="window.editChannel(null)" class="w-full mt-3 py-2.5 rounded-xl border border-dashed border-cyan-500/40 text-cyan-400 text-xs font-black">+ Create channel</button>` : '');
    document.getElementById('squadChannelSheet').classList.remove('hidden');
};

// Create or edit a channel (name, category, admins-only posting, private staff room)
window.editChannel = function(name) {
    const sq = window.activeSquadDetails;
    const c = name ? window.channelOf(sq, name) : { name: '', category: 'TEXT CHANNELS' };
    const cats = [...new Set([...window.squadChannels(sq).map(x => x.category || 'TEXT CHANNELS'), 'INFO', 'TEXT CHANNELS', 'RESULTS', 'STAFF'])];
    document.getElementById('channelEditTitle').innerText = name ? `Edit #${name}` : 'Create channel';
    document.getElementById('channelNameInput').value = c.name === 'Rules/Announcements' ? 'rules' : (c.name || '');
    document.getElementById('channelNameInput').dataset.original = name || '';
    document.getElementById('channelCategoryInput').value = c.category || 'TEXT CHANNELS';
    document.getElementById('channelCategoryList').innerHTML = cats.map(x => `<option value="${escapeHTML(x)}">`).join('');
    document.getElementById('channelAdminOnly').checked = !!c.adminOnly;
    document.getElementById('channelStaff').checked = !!c.staff;
    document.getElementById('channelDeleteBtn').classList.toggle('hidden', !name);
    document.getElementById('channelEditSheet').classList.remove('hidden');
};
window.closeChannelEdit = function() { document.getElementById('channelEditSheet').classList.add('hidden'); };

window.saveChannel = async function() {
    const sq = window.activeSquadDetails;
    const inp = document.getElementById('channelNameInput');
    const original = inp.dataset.original;
    const name = inp.value.trim().toLowerCase().replace(/[^a-z0-9\- _]/g, '').replace(/\s+/g, '-').slice(0, 24);
    if (!name) { showToast('Give the channel a name.'); return; }
    const category = (document.getElementById('channelCategoryInput').value || 'TEXT CHANNELS').trim().toUpperCase().slice(0, 20);
    const staff = document.getElementById('channelStaff').checked;
    const adminOnly = document.getElementById('channelAdminOnly').checked && !staff;
    let chans = window.squadChannels(sq).map(c => ({ ...c }));
    if (!original && chans.some(c => c.name === name)) { showToast('That channel already exists.'); return; }
    const keepName = original === 'Rules/Announcements' && name === 'rules' ? original : name;
    const entry = { name: keepName, category, ...(adminOnly ? { adminOnly: true } : {}), ...(staff ? { staff: true } : {}) };
    chans = original ? chans.map(c => c.name === original ? entry : c) : [...chans, entry];
    await window.saveSquadChannels(sq, chans, original ? `#${keepName} updated.` : `#${keepName} created!`);
    window.closeChannelEdit();
    window.switchSquadSubRoom(keepName);
};

window.deleteChannel = async function() {
    const sq = window.activeSquadDetails;
    const name = document.getElementById('channelNameInput').dataset.original;
    if (!name) return;
    if (window.squadChannels(sq).filter(c => !c.staff).length <= 1) { showToast('A squad needs at least one channel.'); return; }
    const ok = await window.sgConfirm(`#${name} will be removed from the channel list.`, { title: 'Delete channel?', okText: 'Delete', danger: true });
    if (!ok) return;
    const chans = window.squadChannels(sq).filter(c => c.name !== name);
    await window.saveSquadChannels(sq, chans, `#${name} deleted.`);
    window.closeChannelEdit();
    window.switchSquadSubRoom((chans.find(c => c.name === 'chat') || chans[0]).name);
};

window.saveSquadChannels = async function(sq, chans, msg) {
    sq.channels = chans;
    sq.subRooms = chans.map(c => c.name);
    sq.adminOnlyRooms = chans.filter(c => c.adminOnly).map(c => c.name);
    await window.updateSquadCloud(sq, { channels: chans, subRooms: sq.subRooms, adminOnlyRooms: sq.adminOnlyRooms }, msg);
    window.openChannelSheet && document.getElementById('squadChannelSheet').classList.contains('hidden') || window.openChannelSheet();
};

// ---------- Live messages (normal channels + private staff room) ----------
window.listenToSquadMessages = function(sq) {
    if (window.squadMsgUnsub) { window.squadMsgUnsub(); window.squadMsgUnsub = null; }
    if (window.squadStaffUnsub) { window.squadStaffUnsub(); window.squadStaffUnsub = null; }
    if (!window.db || !window.cloudSquadIds.has(sq.id)) return;
    const collect = (snap, staff) => {
        const now = Date.now();
        const rooms = {};
        snap.forEach(d => {
            const m = { id: d.id, staff, ...d.data() };
            if (window.isBlocked(m.sender)) return;
            if (m.isImage && now - (m.timestamp || 0) > 86400000) return;
            (rooms[m.room] = rooms[m.room] || []).unshift(m);
        });
        return rooms;
    };
    let normal = {}, staffRooms = {};
    const merge = () => {
        sq.rooms = { ...normal, ...staffRooms };
        if (window.activeSquadDetails && window.activeSquadDetails.id === sq.id) {
            window.activeSquadRooms = sq.rooms;
            window.activeSquadDetails.rooms = sq.rooms;
            if (!['Members', 'Matchmaking'].includes(window.activeSquadSubRoom)) window.renderSquadChannel();
        }
    };
    window.squadMsgUnsub = onSnapshot(query(collection(window.db, 'squads', sq.id, 'messages'), orderBy('createdAt', 'desc'), limit(300)),
        (snap) => { normal = collect(snap, false); merge(); },
        (e) => { if (e && e.code === 'permission-denied') { normal = {}; merge(); } });
    if (window.isSquadAdmin(sq)) {
        window.squadStaffUnsub = onSnapshot(query(collection(window.db, 'squads', sq.id, 'staff'), orderBy('createdAt', 'desc'), limit(200)),
            (snap) => { staffRooms = collect(snap, true); merge(); }, () => {});
    }
};

// ---------- Draw the current channel ----------
window.renderSquadChannel = function() {
    const sq = window.activeSquadDetails;
    if (!sq) return;
    const room = window.activeSquadSubRoom;
    const box = document.getElementById('squadRoomMsgsBox');
    const input = document.getElementById('squadInputContainer');
    const lock = document.getElementById('squadLockedBar');
    const pinnedBar = document.getElementById('squadPinnedBar');
    const showLock = (html) => { input.style.display = 'none'; lock.innerHTML = html; lock.classList.remove('hidden'); };
    lock.classList.add('hidden'); input.style.display = 'flex'; pinnedBar.classList.add('hidden');

    if (room === 'Members') { input.style.display = 'none'; window.renderSquadMembers(); return; }
    if (room === 'Matchmaking') { input.style.display = 'none'; window.renderSquadMatchmaking(); return; }

    const chan = window.channelOf(sq, room) || { name: room };
    const member = window.isSquadMember(sq);
    const admin = window.isSquadAdmin(sq);

    if (chan.staff && !admin) { box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">🔒 Staff only.</p>`; input.style.display = 'none'; return; }
    if (!sq.isPublic && !member && !admin) {
        box.innerHTML = `<div class="text-center py-12 space-y-2"><i class="fa-solid fa-lock text-3xl text-cyan-400/70"></i><p class="text-sm font-bold text-white">Private squad</p><p class="text-xs text-gray-400">Join with an invite code to read and chat.</p></div>`;
        showLock(`🔒 Private squad <button onclick="window.toggleSquadMembership('${sq.id}')" class="ml-2 px-3 py-1 bg-emerald-500 text-slate-950 rounded-lg font-black text-[10px] uppercase">Join with code</button>`);
        return;
    }

    // pinned messages
    const pins = (sq.pinned || []).filter(p => p.room === room);
    if (pins.length) {
        pinnedBar.innerHTML = `<button onclick="this.nextElementSibling.classList.toggle('hidden')" class="w-full text-left text-[11px] font-bold text-amber-300"><i class="fa-solid fa-thumbtack mr-1"></i> ${pins.length} pinned message${pins.length === 1 ? '' : 's'}</button>
            <div class="hidden mt-2 space-y-1.5">${pins.map(p => `<div class="text-xs text-gray-200 bg-gg-950 rounded-lg px-2.5 py-1.5"><b class="text-white">${window.dn(p.sender)}:</b> ${escapeHTML(p.text || '📷 Photo')}</div>`).join('')}</div>`;
        pinnedBar.classList.remove('hidden');
    }

    const rooms = window.activeSquadRooms || sq.rooms || {};
    const msgs = rooms[room] || [];
    if (!msgs.length) {
        box.innerHTML = `<div class="text-center py-12"><p class="text-3xl">${chan.staff ? '🔒' : chan.adminOnly ? '📢' : '👋'}</p><p class="text-sm font-bold text-white mt-1">Welcome to #${escapeHTML(room === 'Rules/Announcements' ? 'rules' : room)}</p><p class="text-xs text-gray-400">${chan.staff ? 'Private room for the owner and admins.' : chan.adminOnly ? 'Only admins can post here.' : 'This is the start of the channel.'}</p></div>`;
    } else {
        let prev = null;
        box.innerHTML = msgs.map(m => {
            const role = window.roleOf(sq, m.sender, m.senderUid);
            const compact = prev && prev.sender === m.sender && (m.timestamp || 0) - (prev.timestamp || 0) < 5 * 60000;
            prev = m;
            const body = m.isAudio ? window.audioMsgHtml(m, false) : m.isImage
                ? `<img src="${window.cldSized(m.imageUrl, 600)}" class="mt-1 max-h-60 rounded-xl object-contain bg-black cursor-pointer" onclick="event.stopPropagation(); window.openMediaZoomModal('image', '${m.imageUrl}')"><p class="text-[9px] text-gray-500 mt-0.5">📷 disappears after 24h</p>`
                : `<p class="text-sm text-gray-200 whitespace-pre-wrap break-words">${formatMentions(m.text || '')}</p>`;
            const pinned = (sq.pinned || []).some(p => p.id === m.id);
            return compact
                ? `<div class="pl-11 pr-1 py-0.5 rounded-lg hover:bg-gg-900/40 cursor-pointer" onclick="window.openSquadMessageActions('${m.id}')">${body}</div>`
                : `<div class="flex space-x-2.5 pt-2.5 pr-1 rounded-lg hover:bg-gg-900/40 cursor-pointer" onclick="window.openSquadMessageActions('${m.id}')">
                       ${window.avatarHtml(m.sender, 'w-8 h-8', 'rounded-full', 'text-[10px]')}
                       <div class="flex-1 min-w-0">
                           <div class="flex items-center">${window.nameLink(m.sender, `text-xs font-bold ${role === 'owner' ? 'text-amber-300' : role === 'admin' ? 'text-cyan-300' : 'text-white'}`)}${window.roleBadge(role)}<span class="text-[9px] text-gray-500 ml-2">${m.timestamp ? window.timeAgo(m.timestamp) : ''}</span>${pinned ? '<i class="fa-solid fa-thumbtack text-[9px] text-amber-400 ml-1.5"></i>' : ''}</div>
                           ${body}
                       </div>
                   </div>`;
        }).join('');
        box.scrollTop = box.scrollHeight;
    }

    // who can type here?
    if (window.isSquadBanned(sq)) return showLock('🚫 You were banned from this squad.');
    if (!member && !admin) return showLock(`Join ${escapeHTML(sq.name)} to chat <button onclick="window.toggleSquadMembership('${sq.id}')" class="ml-2 px-3 py-1 bg-emerald-500 text-slate-950 rounded-lg font-black text-[10px] uppercase">Join</button>`);
    const mutedTill = window.mutedUntilMe(sq);
    if (mutedTill && !admin) return showLock(`🔇 You're muted until ${new Date(mutedTill).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}.`);
    if (chan.adminOnly && !admin) return showLock(`📢 Only admins can post in #${escapeHTML(room === 'Rules/Announcements' ? 'rules' : room)}. <button onclick="window.switchSquadSubRoom('chat')" class="underline text-cyan-400 ml-1">Go to #chat</button>`);
    document.getElementById('squadSubRoomInput').placeholder = `Message #${room === 'Rules/Announcements' ? 'rules' : room}`;
};

// ---------- Sending ----------
window.sendSquadMessage = async function(payload) {
    const sq = window.activeSquadDetails;
    const room = window.activeSquadSubRoom;
    if (!sq || !room || window.needSignIn('chat in squads')) return;
    const admin = window.isSquadAdmin(sq);
    const chan = window.channelOf(sq, room) || {};
    if (window.isSquadBanned(sq)) { showToast("You're banned from this squad."); return; }
    if (!window.isSquadMember(sq) && !admin) { showToast("Join this squad first."); return; }
    if (window.mutedUntilMe(sq) && !admin) { showToast("🔇 You're muted."); return; }
    if (chan.adminOnly && !admin) { showToast("Only admins can post here."); return; }
    if (!(sq.memberUids || []).includes(window.uidNow())) {
        try { await updateDoc(doc(window.db, 'squads', sq.id), { memberUids: arrayUnion(window.uidNow()), members: arrayUnion(window.me()) }); sq.memberUids = [...(sq.memberUids || []), window.uidNow()]; } catch (e) {}
    }
    const msg = { room, sender: window.me(), senderUid: window.uidNow(), timestamp: Date.now(), ...payload };
    window.activeSquadRooms = window.activeSquadRooms || sq.rooms || {};
    (window.activeSquadRooms[room] = window.activeSquadRooms[room] || []).push({ ...msg, id: 'tmp' + Date.now() });
    window.renderSquadChannel();
    try {
        await addDoc(collection(window.db, 'squads', sq.id, chan.staff ? 'staff' : 'messages'), window.cleanForCloud({ ...msg, createdAt: serverTimestamp() }));
        if (payload.text) window.notifyMentions(payload.text, null, `${sq.name} #${room}`);
    } catch (e) { showToast("⚠️ Message not sent."); }
};

// ---------- Tap a message ----------
window.findSquadMsg = function(id) {
    const sq = window.activeSquadDetails;
    for (const list of Object.values(window.activeSquadRooms || (sq && sq.rooms) || {})) { const m = list.find(x => x.id === id); if (m) return m; }
    return null;
};
window.openSquadMessageActions = function(id) {
    const sq = window.activeSquadDetails;
    const m = window.findSquadMsg(id);
    if (!sq || !m || String(id).startsWith('tmp')) return;
    const admin = window.isSquadAdmin(sq);
    const mine = m.senderUid === window.uidNow();
    const targetRole = window.roleOf(sq, m.sender, m.senderUid);
    const canModerate = admin && !mine && targetRole !== 'owner' && (window.isSquadOwner(sq) || targetRole === 'member');
    const pinned = (sq.pinned || []).some(p => p.id === id);
    const items = [];
    if (m.text) items.push({ icon: 'fa-copy', label: 'Copy text', run: () => { navigator.clipboard && navigator.clipboard.writeText(m.text); showToast('Copied'); } });
    items.push({ icon: 'fa-user', label: `View ${window.dnText(m.sender)}'s profile`, run: () => window.openUserProfileModal(m.sender) });
    if (admin) items.push({ icon: 'fa-thumbtack', label: pinned ? 'Unpin message' : 'Pin message', run: () => window.togglePin(m) });
    if (mine || admin) items.push({ icon: 'fa-trash', label: 'Delete message', danger: true, run: () => window.deleteSquadMessage(m) });
    if (canModerate && m.senderUid) {
        items.push({ icon: 'fa-volume-xmark', label: `Mute ${window.dnText(m.sender)}…`, run: () => window.openMuteMenu(m.senderUid, m.sender) });
        items.push({ icon: 'fa-door-open', label: `Kick ${window.dnText(m.sender)}`, danger: true, run: () => window.kickMember(m.senderUid, m.sender) });
        items.push({ icon: 'fa-ban', label: `Ban ${window.dnText(m.sender)}`, danger: true, run: () => window.banMember(m.senderUid, m.sender) });
    }
    window.openActionSheet(m.text ? `“${m.text.slice(0, 40)}${m.text.length > 40 ? '…' : ''}”` : 'Photo', items);
};

window.deleteSquadMessage = async function(m) {
    const sq = window.activeSquadDetails;
    try {
        await deleteDoc(doc(window.db, 'squads', sq.id, m.staff ? 'staff' : 'messages', m.id));
        if ((sq.pinned || []).some(p => p.id === m.id)) await window.updateSquadCloud(sq, { pinned: sq.pinned.filter(p => p.id !== m.id) });
        showToast('Message deleted.');
    } catch (e) { showToast("Couldn't delete that message."); }
};

window.togglePin = async function(m) {
    const sq = window.activeSquadDetails;
    const pinned = (sq.pinned || []).some(p => p.id === m.id);
    sq.pinned = pinned ? sq.pinned.filter(p => p.id !== m.id) : [{ id: m.id, room: m.room, text: (m.text || '').slice(0, 200), sender: m.sender, at: Date.now() }, ...(sq.pinned || [])].slice(0, 25);
    await window.updateSquadCloud(sq, { pinned: sq.pinned }, pinned ? 'Unpinned.' : '📌 Pinned!');
    window.renderSquadChannel();
};

// ---------- Moderation ----------
window.openMuteMenu = function(uid, tag) {
    const set = (mins) => () => window.muteMember(uid, tag, mins);
    window.openActionSheet(`Mute ${window.dnText(tag)}`, [
        { icon: 'fa-clock', label: '10 minutes', run: set(10) },
        { icon: 'fa-clock', label: '1 hour', run: set(60) },
        { icon: 'fa-clock', label: '24 hours', run: set(1440) },
        { icon: 'fa-clock', label: '7 days', run: set(10080) },
        ...(((window.activeSquadDetails.mutedUntil || {})[uid] || 0) > Date.now() ? [{ icon: 'fa-volume-high', label: 'Unmute', run: set(0) }] : [])
    ]);
};
window.muteMember = async function(uid, tag, mins) {
    const sq = window.activeSquadDetails;
    const mutedUntil = { ...(sq.mutedUntil || {}) };
    if (mins) mutedUntil[uid] = Date.now() + mins * 60000; else delete mutedUntil[uid];
    sq.mutedUntil = mutedUntil;
    await window.updateSquadCloud(sq, { mutedUntil }, mins ? `🔇 ${window.dnText(tag)} muted.` : `🔊 ${window.dnText(tag)} unmuted.`);
    window.renderSquadChannel();
};
window.kickMember = async function(uid, tag) {
    const sq = window.activeSquadDetails;
    const ok = await window.sgConfirm(`${window.dnText(tag)} will be removed from ${sq.name}. They can join again later.`, { title: 'Kick member?', okText: 'Kick', danger: true });
    if (!ok) return;
    sq.members = (sq.members || []).filter(m => m.toLowerCase() !== tag.toLowerCase());
    sq.memberUids = (sq.memberUids || []).filter(u => u !== uid);
    sq.adminUids = (sq.adminUids || []).filter(u => u !== uid);
    sq.admins = (sq.admins || []).filter(a => a.toLowerCase() !== tag.toLowerCase());
    const fields = { members: sq.members, memberUids: sq.memberUids };
    if (window.isSquadOwner(sq)) { fields.adminUids = sq.adminUids; fields.admins = sq.admins; }
    await window.updateSquadCloud(sq, fields, `👢 ${window.dnText(tag)} was kicked.`);
    window.renderSquadHeader(); window.renderSquadChannel();
};
window.banMember = async function(uid, tag) {
    const sq = window.activeSquadDetails;
    const ok = await window.sgConfirm(`${window.dnText(tag)} will be removed and can't join ${sq.name} again unless you unban them.`, { title: 'Ban member?', okText: 'Ban', danger: true });
    if (!ok) return;
    sq.members = (sq.members || []).filter(m => m.toLowerCase() !== tag.toLowerCase());
    sq.memberUids = (sq.memberUids || []).filter(u => u !== uid);
    sq.bannedUids = [...new Set([...(sq.bannedUids || []), uid])];
    sq.bannedNames = [...new Set([...(sq.bannedNames || []), tag])];
    sq.adminUids = (sq.adminUids || []).filter(u => u !== uid);
    sq.admins = (sq.admins || []).filter(a => a.toLowerCase() !== tag.toLowerCase());
    const fields = { members: sq.members, memberUids: sq.memberUids, bannedUids: sq.bannedUids, bannedNames: sq.bannedNames };
    if (window.isSquadOwner(sq)) { fields.adminUids = sq.adminUids; fields.admins = sq.admins; }
    await window.updateSquadCloud(sq, fields, `🚫 ${window.dnText(tag)} banned from the squad.`);
    window.renderSquadHeader(); window.renderSquadChannel();
};
window.unbanMember = async function(i) {
    const sq = window.activeSquadDetails;
    const uid = (sq.bannedUids || [])[i], tag = (sq.bannedNames || [])[i] || 'member';
    sq.bannedUids = (sq.bannedUids || []).filter((_, j) => j !== i);
    sq.bannedNames = (sq.bannedNames || []).filter((_, j) => j !== i);
    await window.updateSquadCloud(sq, { bannedUids: sq.bannedUids, bannedNames: sq.bannedNames }, `${window.dnText(tag)} unbanned.`);
    window.renderSquadChannel();
};
window.setSquadAdmin = async function(uid, tag, on) {
    const sq = window.activeSquadDetails;
    if (!window.isSquadOwner(sq)) { showToast('Only the owner can change admins.'); return; }
    sq.adminUids = on ? [...new Set([...(sq.adminUids || []), uid])] : (sq.adminUids || []).filter(u => u !== uid);
    sq.admins = on ? [...new Set([...(sq.admins || []), tag])] : (sq.admins || []).filter(a => a.toLowerCase() !== tag.toLowerCase());
    await window.updateSquadCloud(sq, { adminUids: sq.adminUids, admins: sq.admins }, on ? `🛡️ ${window.dnText(tag)} is now an admin!` : `${window.dnText(tag)} is no longer an admin.`);
    window.renderSquadChannel();
};
window.transferOwnership = async function(tag, uid) {
    const sq = window.activeSquadDetails;
    if (!window.isSquadOwner(sq)) return;
    const ok = await window.sgConfirm(`${window.dnText(tag)} becomes the owner of ${sq.name}. You'll stay as an admin.`, { title: 'Transfer ownership?', okText: 'Transfer', danger: true });
    if (!ok) return;
    if (!uid) { const p = await window.getProfile(tag); uid = p && p.uid; }
    if (!uid) { showToast(`${window.dnText(tag)} needs to sign in once first.`); return; }
    const adminUids = [...new Set([...(sq.adminUids || []), window.uidNow(), uid])];
    const admins = [...new Set([...(sq.admins || []), window.me(), tag])];
    await window.updateSquadCloud(sq, { owner: tag, leader: tag, ownerUid: uid, adminUids, admins }, `👑 ${window.dnText(tag)} now owns ${sq.name}!`);
};

// ---------- Members list ----------
window.renderSquadMembers = async function() {
    const sq = window.activeSquadDetails;
    const box = document.getElementById('squadRoomMsgsBox');
    const admin = window.isSquadAdmin(sq);
    const members = [...new Set(sq.members || [])];
    const rows = members.map(tag => ({ tag, uid: (window.profileFor(tag) || {}).uid || null }));
    rows.forEach(r => r.role = window.roleOf(sq, r.tag, r.uid));
    const order = { owner: 0, admin: 1, member: 2 };
    rows.sort((a, b) => order[a.role] - order[b.role] || window.dnText(a.tag).localeCompare(window.dnText(b.tag)));
    const section = (title, list) => list.length ? `<p class="text-[10px] font-black text-gray-500 tracking-wider px-1 pt-3 pb-1">${title} — ${list.length}</p>` + list.map(r => {
        const muted = r.uid && ((sq.mutedUntil || {})[r.uid] || 0) > Date.now();
        return `
            <div class="flex items-center justify-between p-2 rounded-xl hover:bg-gg-900/60 cursor-pointer" onclick="window.openMemberActions('${escapeHTML(r.tag)}')">
                <div class="flex items-center space-x-2.5 min-w-0">
                    ${window.avatarHtml(r.tag, 'w-9 h-9', 'rounded-full', 'text-[10px]').replace(/onclick="[^"]*"/, '')}
                    <span class="text-sm font-bold truncate ${r.role === 'owner' ? 'text-amber-300' : r.role === 'admin' ? 'text-cyan-300' : 'text-white'}">${window.dn(r.tag)}</span>${window.roleBadge(r.role)}${muted ? '<span class="text-[10px] ml-1">🔇</span>' : ''}
                </div>
                <i class="fa-solid fa-ellipsis text-gray-500"></i>
            </div>`;
    }).join('') : '';
    const banned = admin && (sq.bannedUids || []).length ? `<p class="text-[10px] font-black text-red-400 tracking-wider px-1 pt-4 pb-1">BANNED — ${sq.bannedUids.length}</p>` +
        sq.bannedUids.map((u, i) => `<div class="flex items-center justify-between p-2 text-sm"><span class="text-gray-400">${window.dn((sq.bannedNames || [])[i] || 'Unknown')}</span><button onclick="window.unbanMember(${i})" class="text-xs font-bold text-cyan-400">Unban</button></div>`).join('') : '';
    box.innerHTML = `<div class="max-w-lg mx-auto w-full">
        ${section('OWNER', rows.filter(r => r.role === 'owner'))}
        ${section('ADMINS', rows.filter(r => r.role === 'admin'))}
        ${section('MEMBERS', rows.filter(r => r.role === 'member'))}
        ${banned}
        ${!members.length ? '<p class="text-xs text-gray-400 text-center py-10">No members yet.</p>' : ''}
    </div>`;
    // make sure we know everyone's account id for moderation
    for (const r of rows) if (!r.uid) await window.getProfile(r.tag);
};

window.openMemberActions = async function(tag) {
    const sq = window.activeSquadDetails;
    const prof = window.profileFor(tag) || await window.getProfile(tag);
    const uid = prof && prof.uid;
    const role = window.roleOf(sq, tag, uid);
    const me = uid && uid === window.uidNow();
    const owner = window.isSquadOwner(sq), admin = window.isSquadAdmin(sq);
    const items = [
        { icon: 'fa-user', label: 'View profile', run: () => window.openUserProfileModal(tag) },
        ...(!me ? [{ icon: 'fa-envelope', label: 'Send message', run: () => window.openDmModal(tag) }] : [])
    ];
    if (!me && uid) {
        if (owner && role !== 'owner') items.push(role === 'admin'
            ? { icon: 'fa-shield-halved', label: 'Remove admin', run: () => window.setSquadAdmin(uid, tag, false) }
            : { icon: 'fa-shield-halved', label: 'Make admin', run: () => window.setSquadAdmin(uid, tag, true) });
        if (owner && role !== 'owner') items.push({ icon: 'fa-crown', label: 'Transfer ownership', run: () => window.transferOwnership(tag, uid) });
        if (admin && role !== 'owner' && (owner || role === 'member')) {
            items.push({ icon: 'fa-volume-xmark', label: 'Mute…', run: () => window.openMuteMenu(uid, tag) });
            items.push({ icon: 'fa-door-open', label: 'Kick', danger: true, run: () => window.kickMember(uid, tag) });
            items.push({ icon: 'fa-ban', label: 'Ban', danger: true, run: () => window.banMember(uid, tag) });
        }
    }
    window.openActionSheet(window.dnText(tag), items);
};

// ---------- Matchmaking view ----------
window.renderSquadMatchmaking = function() {
    const sq = window.activeSquadDetails;
    const box = document.getElementById('squadRoomMsgsBox');
    const q = sq.matchmakingQueue || [];
    box.innerHTML = `<div class="space-y-3 max-w-lg mx-auto w-full pt-2">
        <div class="glass-panel p-4 rounded-2xl border border-cyan-500/30 space-y-2 text-center">
            <h4 class="text-xs font-black text-cyan-400 uppercase tracking-widest">⚔️ Challenge Queue</h4>
            <p class="text-[11px] text-gray-300">Post a challenge — anyone in the squad can accept it and you'll chat to set up the match.</p>
            <button onclick="window.bookSquadMatchmakingFixture()" class="px-4 py-2 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase">Post a challenge</button>
        </div>
        ${q.length ? q.map(e => `
            <div class="glass-panel p-3 rounded-xl flex items-center justify-between text-xs border border-cyan-500/20">
                <div class="flex items-center space-x-2">${window.avatarHtml(e.challenger, 'w-8 h-8', 'rounded-full', 'text-[10px]')}<div>${window.nameLink(e.challenger, 'font-bold text-white')}<span class="text-[10px] text-cyan-400 block">${escapeHTML(e.format)} · ${e.at ? window.timeAgo(e.at) : ''}</span></div></div>
                <button onclick="window.acceptSquadChallenge('${e.id}')" class="px-3 py-1.5 bg-cyan-400 text-slate-950 font-black text-[10px] rounded-xl uppercase">Accept</button>
            </div>`).join('') : `<p class="text-xs text-gray-400 text-center py-6">No challenges yet.</p>`}
    </div>`;
};

// ---------- Join / leave (bans + private invite codes) ----------
window._baseToggleSquadMembership13 = window._baseToggleSquadMembership13 || window.toggleSquadMembership;
window.toggleSquadMembership = async function(squadId) {
    if (window.needSignIn('join squads')) return;
    const sq = window.clansData.find(c => c.id === squadId);
    if (!sq) return;
    if (!window.isSquadMember(sq)) {
        if (window.isSquadBanned(sq)) { showToast("🚫 You're banned from this squad."); return; }
        if (!sq.isPublic && !window.isSquadOwner(sq)) {
            const code = await window.sgPrompt(`${sq.name} is private. Enter the invite code:`, { title: '🔒 Invite code', placeholder: 'SQ-XXXXX', okText: 'Join' });
            if (!code) return;
            if (code.trim().toUpperCase() !== (sq.inviteCode || '').toUpperCase()) { showToast('❌ Wrong invite code.'); return; }
        }
    }
    await window._baseToggleSquadMembership13(squadId);
    if (window.activeSquadDetails && window.activeSquadDetails.id === squadId) { window.renderSquadHeader(); window.renderSquadChannel(); window.listenToSquadMessages(sq); }
};

// ---------- Create squad (with default channels & roles) ----------
window.submitNewSquad = async function() {
    if (window.needSignIn('create squads')) return;
    const name = document.getElementById('squadNameInput').value.trim();
    const tag = document.getElementById('squadTagInput').value.trim().toUpperCase();
    if (!name || !tag) { showToast("⚠️ Please enter a squad name and tag!"); return; }
    const me = window.me(), uid = window.uidNow();
    const id = 'squad_' + Date.now();
    const channels = window.DEFAULT_CHANNELS;
    const sq = {
        name, tag, game: document.getElementById('squadGameSelect').value,
        isPublic: document.getElementById('squadPrivacySelect').value === 'public', isOfficial: false,
        inviteCode: 'SQ-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        bio: document.getElementById('squadBioInput').value.trim() || 'Squad on Sinless GG!',
        owner: me, leader: me, ownerUid: uid, admins: [me], adminUids: [uid], members: [me], memberUids: [uid],
        channels, subRooms: channels.map(c => c.name), adminOnlyRooms: channels.filter(c => c.adminOnly).map(c => c.name),
        bannedUids: [], bannedNames: [], mutedUntil: {}, pinned: [], matchmakingQueue: []
    };
    try {
        await setDoc(doc(window.db, 'squads', id), window.cleanForCloud({ ...sq, createdAt: serverTimestamp() }));
        await addDoc(collection(window.db, 'squads', id, 'messages'), { room: 'rules', sender: me, senderUid: uid, text: `Welcome to ${name}! 🎮 Be respectful, no spam, have fun.`, timestamp: Date.now(), createdAt: serverTimestamp() });
        showToast(`🔥 ${name} created! Invite code: ${sq.inviteCode}`);
        ['squadNameInput', 'squadTagInput', 'squadBioInput'].forEach(x => document.getElementById(x).value = '');
        window.closeCreateClanModal();
        setTimeout(() => window.openSquadDetailsModal(id), 600);
    } catch (e) { showToast("⚠️ Couldn't create squad. Try again."); }
};

// ---------- Squad settings ----------
window.openSquadSettings = function() {
    const sq = window.activeSquadDetails;
    if (!sq || !window.isSquadAdmin(sq)) return;
    const owner = window.isSquadOwner(sq);
    document.getElementById('ssName').value = sq.name || '';
    document.getElementById('ssTag').value = sq.tag || '';
    document.getElementById('ssBio').value = sq.bio || '';
    document.getElementById('ssPrivacy').value = sq.isPublic ? 'public' : 'private';
    document.getElementById('ssCode').innerText = sq.inviteCode || '—';
    ['ssName', 'ssTag', 'ssBio', 'ssPrivacy'].forEach(id => document.getElementById(id).disabled = !owner);
    document.getElementById('ssOwnerOnly').classList.toggle('hidden', !owner);
    document.getElementById('ssDisband').classList.toggle('hidden', !owner || sq.isOfficial);
    document.getElementById('squadSettingsSheet').classList.remove('hidden');
};
window.closeSquadSettings = function() { document.getElementById('squadSettingsSheet').classList.add('hidden'); };
window.saveSquadSettings = async function() {
    const sq = window.activeSquadDetails;
    const fields = {
        name: document.getElementById('ssName').value.trim().slice(0, 40) || sq.name,
        tag: document.getElementById('ssTag').value.trim().toUpperCase().slice(0, 5) || sq.tag,
        bio: document.getElementById('ssBio').value.trim().slice(0, 300),
        isPublic: document.getElementById('ssPrivacy').value === 'public'
    };
    Object.assign(sq, fields);
    await window.updateSquadCloud(sq, fields, '✅ Squad updated.');
    window.closeSquadSettings(); window.renderSquadHeader(); window.renderClansList();
};
window.newInviteCode = async function() {
    const sq = window.activeSquadDetails;
    sq.inviteCode = 'SQ-' + Math.random().toString(36).substr(2, 5).toUpperCase();
    document.getElementById('ssCode').innerText = sq.inviteCode;
    await window.updateSquadCloud(sq, { inviteCode: sq.inviteCode }, 'New invite code made. The old one no longer works.');
};
window.shareInviteCode = function() {
    const sq = window.activeSquadDetails;
    window.activeShare = { link: `${location.origin}${location.pathname}#squad=${sq.id}`, text: `Join my squad ${sq.name} [${sq.tag}] on Sinless GG 🎮${!sq.isPublic ? ` Invite code: ${sq.inviteCode}` : ''}` };
    if (navigator.share) navigator.share({ title: sq.name, text: window.activeShare.text, url: window.activeShare.link }).catch(() => {});
    else window.copyShareLink();
};

// Opening a squad link (…#squad=ID)
window.openSquadFromLink = function() {
    const m = location.hash.match(/^#squad=([A-Za-z0-9_\-]+)/);
    if (!m) return;
    const sq = (window.clansData || []).find(c => c.id === m[1]);
    if (sq) { window.switchView('clans'); window.openSquadDetailsModal(sq.id); }
};
window.addEventListener('hashchange', window.openSquadFromLink);

// keep the open squad fresh when its settings change in the cloud
window._baseListenSquads13 = window._baseListenSquads13 || window.listenToFirestoreSquads;
window.listenToFirestoreSquads = function() {
    window._baseListenSquads13();
    setTimeout(() => window.openSquadFromLink(), 1500);
};
window._baseRenderClansList13 = window._baseRenderClansList13 || window.renderClansList;
window.renderClansList = function() {
    window._baseRenderClansList13();
    if (window.activeSquadDetails) {
        const fresh = window.clansData.find(c => c.id === window.activeSquadDetails.id);
        if (fresh && fresh !== window.activeSquadDetails) {
            fresh.rooms = window.activeSquadDetails.rooms;
            window.activeSquadDetails = fresh;
            window.renderSquadHeader();
            if (['Members', 'Matchmaking'].includes(window.activeSquadSubRoom)) window.renderSquadChannel();
        }
    }
};

// ======================================================================
// v13: POLLS & MATCH PREDICTIONS
// post.poll = { kind: 'poll'|'prediction', options: [..], endsAt: ms, correct: index|null }
// post.pollCounts = { '0': n, '1': n, ... }   post.pollVoters = [uid, ...]
// ======================================================================
window.pollDraft = null;

window.togglePollEditor = function() {
    const ed = document.getElementById('pollEditor');
    const on = ed.classList.contains('hidden');
    ed.classList.toggle('hidden', !on);
    document.getElementById('pollToggleBtn').classList.toggle('ring-2', on);
    if (on) window.setPollKind(document.getElementById('pollKind').value || 'poll');
};
window.setPollKind = function(kind) {
    document.getElementById('pollKind').value = kind;
    const pred = kind === 'prediction';
    document.querySelectorAll('[data-pollkind]').forEach(b => {
        b.className = `flex-1 py-1.5 rounded-lg text-[11px] font-black ${b.dataset.pollkind === kind ? 'bg-magenta text-white' : 'bg-gg-950 text-gray-400'}`;
    });
    document.getElementById('pollOptionsBox').classList.toggle('hidden', pred);
    document.getElementById('predictionBox').classList.toggle('hidden', !pred);
    const ta = document.getElementById('postTextContent');
    ta.placeholder = pred ? 'Ask the question, e.g. "Who wins the final? 🏆"' : 'Ask your question…';
};
window.addPollOption = function() {
    const box = document.getElementById('pollOptionInputs');
    if (box.children.length >= 4) { showToast('Up to 4 options.'); return; }
    const i = box.children.length + 1;
    box.insertAdjacentHTML('beforeend', `<input type="text" maxlength="40" placeholder="Option ${i}" class="poll-opt w-full bg-gg-950 border border-cyan-500/25 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">`);
};

// Read the poll editor when publishing (returns null if no poll)
window.collectPoll = function() {
    const ed = document.getElementById('pollEditor');
    if (!ed || ed.classList.contains('hidden')) return null;
    const kind = document.getElementById('pollKind').value;
    const hours = parseInt(document.getElementById('pollDuration').value) || 24;
    let options;
    if (kind === 'prediction') {
        const a = document.getElementById('predTeamA').value.trim(), b = document.getElementById('predTeamB').value.trim();
        if (!a || !b) return { error: 'Enter both sides of the match.' };
        options = document.getElementById('predDraw').checked ? [a, 'Draw', b] : [a, b];
    } else {
        options = [...document.querySelectorAll('#pollOptionInputs .poll-opt')].map(i => i.value.trim()).filter(Boolean);
        if (options.length < 2) return { error: 'A poll needs at least 2 options.' };
    }
    return { kind, options: options.map(o => o.slice(0, 40)), endsAt: Date.now() + hours * 3600000, correct: null };
};
window.resetPollEditor = function() {
    const ed = document.getElementById('pollEditor');
    if (!ed) return;
    ed.classList.add('hidden');
    document.getElementById('pollToggleBtn').classList.remove('ring-2');
    document.getElementById('pollOptionInputs').innerHTML = [1, 2].map(i => `<input type="text" maxlength="40" placeholder="Option ${i}" class="poll-opt w-full bg-gg-950 border border-cyan-500/25 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400">`).join('');
    ['predTeamA', 'predTeamB'].forEach(id => document.getElementById(id).value = '');
};

// Polls must have a question; check before the post goes out
window._baseSubmitUniversalPost13 = window._baseSubmitUniversalPost13 || window.submitUniversalPost;
window.submitUniversalPost = async function() {
    const poll = window.collectPoll();
    if (poll && poll.error) { showToast('⚠️ ' + poll.error); return; }
    if (poll && !(document.getElementById('postTextContent').value || '').trim()) { showToast('⚠️ Write your question in the caption box.'); return; }
    window.pollDraft = poll;
    await window._baseSubmitUniversalPost13();
    window.pollDraft = null;
    if (poll) window.resetPollEditor();
};

// ---------- Show a poll on a post ----------
window.myVotes = (() => { try { return JSON.parse(localStorage.getItem('sinless_votes') || '{}'); } catch (e) { return {}; } })();

window.renderPollHtml = function(p) {
    const poll = p.poll;
    if (!poll || !Array.isArray(poll.options)) return '';
    const pId = p.docId || p.id;
    const counts = p.pollCounts || {};
    const total = poll.options.reduce((s, _, i) => s + (counts[i] || 0), 0);
    const uid = window.currentUser && window.currentUser.uid;
    const voted = (uid && (p.pollVoters || []).includes(uid)) || window.myVotes[pId] !== undefined;
    const ended = Date.now() > (poll.endsAt || 0);
    const showResults = voted || ended;
    const mine = window.myVotes[pId];
    const pred = poll.kind === 'prediction';
    const left = Math.max(0, (poll.endsAt || 0) - Date.now());
    const timeLeft = ended ? 'Final results' : left > 86400000 ? `${Math.ceil(left / 86400000)}d left` : left > 3600000 ? `${Math.ceil(left / 3600000)}h left` : `${Math.ceil(left / 60000)}m left`;
    const correct = poll.correct;
    const isOwner = window.isMyPost(p);

    const rows = poll.options.map((o, i) => {
        const n = counts[i] || 0;
        const pct = total ? Math.round(n / total * 100) : 0;
        const isCorrect = correct === i;
        if (!showResults) return `<button onclick="window.votePoll('${pId}', ${i})" class="w-full py-2.5 rounded-xl border border-cyan-500/40 text-cyan-300 text-sm font-bold hover:bg-cyan-500/10">${escapeHTML(o)}</button>`;
        return `
            <div class="relative w-full rounded-xl overflow-hidden bg-gg-950 border ${isCorrect ? 'border-emerald-400' : 'border-cyan-500/15'}">
                <div class="absolute inset-y-0 left-0 ${isCorrect ? 'bg-emerald-500/30' : mine === i ? 'bg-cyan-500/30' : 'bg-gray-600/25'}" style="width:${pct}%"></div>
                <div class="relative flex items-center justify-between px-3 py-2.5 text-sm">
                    <span class="font-bold text-white truncate">${escapeHTML(o)} ${mine === i ? '<i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i>' : ''} ${isCorrect ? '<span class="text-emerald-400 text-xs">✓ Correct</span>' : ''}</span>
                    <span class="font-black text-white">${pct}%</span>
                </div>
            </div>`;
    }).join('');

    let footer = `${window.formatCount(total)} vote${total === 1 ? '' : 's'} · ${timeLeft}`;
    if (pred && correct !== null && correct !== undefined) {
        const right = counts[correct] || 0;
        footer = `🎯 ${right} of ${total} predicted right` + (mine !== undefined ? (mine === correct ? ' · <span class="text-emerald-400 font-bold">You got it! 🔥</span>' : ' · <span class="text-red-400">Not this time</span>') : '');
    }
    const settle = pred && isOwner && (correct === null || correct === undefined) ? `
        <div class="pt-1"><p class="text-[10px] text-gray-400 mb-1">Match over? Mark the result:</p><div class="flex gap-1.5">${poll.options.map((o, i) => `<button onclick="window.settlePrediction('${pId}', ${i})" class="flex-1 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 text-[10px] font-black">${escapeHTML(o)}</button>`).join('')}</div></div>` : '';

    return `
        <div class="space-y-2 p-3 rounded-2xl bg-gg-900/60 border ${pred ? 'border-amber-500/30' : 'border-magenta/30'}" data-noexpand>
            <p class="text-[10px] font-black uppercase tracking-wider ${pred ? 'text-amber-400' : 'text-magenta'}">${pred ? '⚽ Match prediction' : '📊 Poll'}</p>
            ${rows}
            <p class="text-[10px] text-gray-400">${footer}</p>
            ${settle}
        </div>`;
};

window.votePoll = async function(postId, i) {
    if (window.needSignIn('vote')) return;
    const p = window.findPost(postId);
    if (!p || !p.poll) return;
    if (Date.now() > p.poll.endsAt) { showToast('Voting has ended.'); return; }
    const uid = window.currentUser.uid;
    if ((p.pollVoters || []).includes(uid) || window.myVotes[postId] !== undefined) return;
    p.pollCounts = { ...(p.pollCounts || {}), [i]: ((p.pollCounts || {})[i] || 0) + 1 };
    p.pollVoters = [...(p.pollVoters || []), uid];
    window.myVotes[postId] = i;
    try { localStorage.setItem('sinless_votes', JSON.stringify(window.myVotes)); } catch (e) {}
    window.renderFypFeed();
    window.activeDetailPostId === postId && window.renderPostDetail(p);
    if (!String(postId).startsWith('local_')) {
        try { await updateDoc(doc(window.db, 'posts', postId), { [`pollCounts.${i}`]: increment(1), pollVoters: arrayUnion(uid) }); }
        catch (e) { showToast("⚠️ Vote didn't save."); }
    }
};

window.settlePrediction = async function(postId, i) {
    const p = window.findPost(postId);
    if (!p || !p.poll) return;
    const ok = await window.sgConfirm(`Mark "${p.poll.options[i]}" as the result? Everyone will see who predicted right.`, { title: 'Settle prediction', okText: 'Confirm' });
    if (!ok) return;
    p.poll = { ...p.poll, correct: i, endsAt: Math.min(p.poll.endsAt, Date.now()) };
    window.renderFypFeed();
    window.activeDetailPostId === postId && window.renderPostDetail(p);
    try { await updateDoc(doc(window.db, 'posts', postId), { poll: p.poll }); showToast('🎯 Result posted!'); } catch (e) { showToast("⚠️ Couldn't save result."); }
};

// ======================================================================
// v14: OFFICIAL HUBS RUN BY THE APP, SQUAD TOURNAMENTS, NEWS & GIST,
//      SMARTER "FOR YOU" (learns what each person likes)
// ======================================================================

// ---------- Official hubs belong to Sinless GG (app admins are the owners) ----------
window.appAdminUids = window.appAdminUids || [];
window._baseCheckAdminAndBan14 = window._baseCheckAdminAndBan14 || window.checkAdminAndBan;
window.checkAdminAndBan = async function(user) {
    await window._baseCheckAdminAndBan14(user);
    if (!user || !window.db) return;
    try { const c = await getDoc(doc(window.db, 'config', 'admins')); window.appAdminUids = c.exists() ? (c.data().uids || []) : []; } catch (e) {}
    window.syncOfficialHubInfo && window.syncOfficialHubInfo();
};

// An admin's phone quietly updates hub names/descriptions in the cloud (e.g. Variety → Other Games)
window.syncOfficialHubInfo = function() {
    if (!window.isAppAdmin || !window.squadsLoadedOnce || window.hubInfoSynced) return;
    window.hubInfoSynced = true;
    window.defaultPublicCategorySquads.forEach(h => {
        if (!window.cloudSquadIds.has(h.id)) return;
        updateDoc(doc(window.db, 'squads', h.id), { name: h.name, tag: h.tag, bio: h.bio, game: h.game, inviteCode: h.inviteCode }).catch(() => {});
    });
};

window._baseRoleOf14 = window._baseRoleOf14 || window.roleOf;
window.roleOf = function(sq, tag, uid) {
    if (sq && sq.isOfficial) {
        if (uid && window.appAdminUids.includes(uid)) return 'owner';
        if ((tag || '').toLowerCase() === 'sinlessgaming') return 'member';
    }
    return window._baseRoleOf14(sq, tag, uid);
};

// Anyone in an official hub can host a tournament there; in normal squads, owner + admins
window.canHostInSquad = function(sq) {
    if (!sq || !window.currentUser) return false;
    if (window.isSquadAdmin(sq)) return true;
    return !!sq.isOfficial && window.isSquadMember(sq);
};

window._baseRenderSquadHeader14 = window._baseRenderSquadHeader14 || window.renderSquadHeader;
window.renderSquadHeader = function() {
    window._baseRenderSquadHeader14();
    const sq = window.activeSquadDetails;
    if (!sq) return;
    const n = (sq.members || []).length;
    if (sq.isOfficial) {
        document.getElementById('squadDetailLeader').innerHTML = `${n} member${n === 1 ? '' : 's'} · Official hub · run by <b class="text-cyan-400">Sinless GG</b> <i class="fa-solid fa-circle-check text-cyan-400"></i>`;
    }
    document.getElementById('hostSquadTournamentBtn').classList.toggle('hidden', !window.canHostInSquad(sq));
    // 🏆 tournaments room button next to 👥 and ⚔️
    const nav = document.getElementById('squadSubRoomsNav');
    const on = window.activeSquadSubRoom === 'Tournaments';
    const count = (window.tournamentsList || []).filter(t => t.squadId === sq.id).length;
    nav.insertAdjacentHTML('beforeend', `<button onclick="window.switchSquadSubRoom('Tournaments')" class="relative px-3 py-2 rounded-xl text-xs font-bold ${on ? 'bg-amber-400 text-slate-950' : 'bg-gg-900 text-amber-400 border border-amber-500/30'}">🏆${count ? `<span class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-magenta text-white text-[9px] font-black flex items-center justify-center">${count}</span>` : ''}</button>`);
};

window._baseRenderSquadChannel14 = window._baseRenderSquadChannel14 || window.renderSquadChannel;
window.renderSquadChannel = function() {
    if (window.activeSquadSubRoom === 'Tournaments') {
        const input = document.getElementById('squadInputContainer');
        input.style.display = 'none';
        document.getElementById('squadLockedBar').classList.add('hidden');
        document.getElementById('squadPinnedBar').classList.add('hidden');
        window.renderSquadTournaments();
        return;
    }
    window._baseRenderSquadChannel14();
};

window.renderSquadTournaments = function() {
    const sq = window.activeSquadDetails;
    const box = document.getElementById('squadRoomMsgsBox');
    if (!sq || !box) return;
    const me = window.meLower ? window.meLower() : '';
    const list = (window.tournamentsList || []).filter(t => t.squadId === sq.id);
    const canHost = window.canHostInSquad(sq);
    const fmt = (t) => t.format === 'WORLD_CUP' ? '🌍 World Cup' : t.format === 'CHAMPIONS_LEAGUE' ? '🏆 Swiss' : t.format === 'LEAGUE' ? '📊 League' : '⚡ Knockout';
    const hostBtn = canHost
        ? `<button onclick="window.openCreateSquadSquadTournamentModal()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs uppercase shadow-lg"><i class="fa-solid fa-trophy mr-1.5"></i> Host a tournament in this squad</button>`
        : `<p class="text-[11px] text-gray-400 text-center">${window.isSquadMember(sq) ? 'Only squad admins can host tournaments here.' : 'Join this squad to take part in its tournaments.'}</p>`;
    box.innerHTML = `<div class="space-y-3 py-2">
        ${hostBtn}
        ${list.length ? list.map(t => {
            const players = (t.players || []).filter(p => p && !/^Club_\d+$/.test(p) && p !== 'Open Spot' && p !== 'TBD');
            const joined = (t.players || []).some(p => (p || '').toLowerCase() === me);
            const full = (t.players || []).length >= t.maxPlayers && !(t.players || []).some(p => /^Club_\d+$/.test(p));
            return `<div class="glass-panel rounded-2xl p-3.5 border border-amber-500/30 space-y-2">
                <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">
                        <p class="text-sm font-black text-white truncate">${escapeHTML(t.title)}</p>
                        <p class="text-[10px] text-gray-400">Host: ${window.nameLink(t.host, 'text-cyan-400 font-bold')} · ${escapeHTML(t.game || '')}</p>
                    </div>
                    <span class="shrink-0 text-[9px] font-black px-2 py-1 rounded-lg bg-magenta/20 text-magenta">${fmt(t)}</span>
                </div>
                <div class="flex items-center justify-between text-[10px]">
                    <span class="text-gray-300"><i class="fa-solid fa-users text-cyan-400 mr-1"></i>${players.length}/${t.maxPlayers} players</span>
                    <span class="text-amber-300 font-bold">🏆 ${escapeHTML(t.prizePool || 'Bragging Rights')}</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="window.openTournamentFromSquad('${t.id}')" class="flex-1 py-2 rounded-xl bg-gg-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-black">View bracket / table</button>
                    ${joined ? `<span class="flex-1 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-[11px] font-black text-center">✓ Registered</span>`
                        : full ? `<span class="flex-1 py-2 rounded-xl bg-red-500/10 text-red-400 text-[11px] font-black text-center">Full</span>`
                        : `<button onclick="window.registerSquadTournament('${t.id}')" class="flex-1 py-2 rounded-xl bg-emerald-500 text-slate-950 text-[11px] font-black uppercase">Register</button>`}
                </div>
            </div>`;
        }).join('') : `<div class="text-center py-10 space-y-2"><div class="text-4xl">🏆</div><p class="text-sm font-bold text-white">No tournaments yet</p><p class="text-xs text-gray-400">Squad tournaments show up here and in the Tournaments tab.</p></div>`}
    </div>`;
};

window.registerSquadTournament = async function(id) {
    const sq = window.activeSquadDetails;
    if (sq && !window.isSquadMember(sq)) { showToast('Join the squad first, then register.'); return; }
    await window.joinActiveTournament(id);
    window.renderSquadTournaments();
};

window.openTournamentFromSquad = function(id) {
    const t = (window.tournamentsList || []).find(x => x.id === id);
    if (!t) return;
    window.activeTournament = t;
    window.returnToSquadId = window.activeSquadDetails && window.activeSquadDetails.id;
    window.closeSquadDetailsModal();
    window.switchView('tournaments');
    window.scrollTo({ top: 0 });
};

window.squadTournLabel = function(squadId) {
    const sq = (window.clansData || []).find(c => c.id === squadId);
    if (!sq) return '';
    return ` • <span onclick="window.openSquadDetailsModal('${sq.id}')" class="text-amber-300 font-bold cursor-pointer">🛡️ ${escapeHTML(sq.name)}</span>`;
};

// Pre-fill the host form from the squad (and make sure its game is in the list)
window.openCreateSquadSquadTournamentModal = function() {
    const sq = window.activeSquadDetails;
    if (!sq) return;
    if (window.needSignIn('host tournaments')) return;
    if (!window.canHostInSquad(sq)) { showToast(sq.isOfficial ? 'Join the hub first to host here.' : 'Only squad admins can host here.'); return; }
    const sel = document.getElementById('tournGameSelect');
    const game = sq.game || 'FC MOBILE';
    if (![...sel.options].some(o => o.value === game)) sel.insertAdjacentHTML('beforeend', `<option value="${escapeHTML(game)}">${escapeHTML(game)}</option>`);
    sel.value = game;
    document.getElementById('tournTitleInput').value = `${sq.name.replace(/ HUB$/i, '')} Cup`;
    window.activeSquadForTournament = sq.id;
    window.openCreateTournamentModal();
};

// The general "+ Host Tournament" button should not attach to a squad
window._baseOpenCreateTournamentModal14 = window._baseOpenCreateTournamentModal14 || window.openCreateTournamentModal;
window.openCreateTournamentModal = function() {
    const fromSquad = !!(window.activeSquadDetails && window.activeSquadForTournament === window.activeSquadDetails.id &&
        !document.getElementById('squadDetailsModal').classList.contains('hidden'));
    if (!fromSquad) window.activeSquadForTournament = null;
    window._baseOpenCreateTournamentModal14();
};

// After launching from a squad, jump back into the squad's 🏆 room
window._baseSubmitNewTournament14 = window._baseSubmitNewTournament14 || window.submitNewTournament;
window.submitNewTournament = async function() {
    const squadId = window.activeSquadForTournament;
    const before = (window.tournamentsList || []).length;
    await window._baseSubmitNewTournament14();
    window.activeSquadForTournament = null;
    if (squadId && (window.tournamentsList || []).length > before && window.activeSquadDetails && window.activeSquadDetails.id === squadId) {
        window.activeSquadSubRoom = 'Tournaments';
        window.renderSquadHeader();
        window.renderSquadChannel();
    }
};

// Keep the squad 🏆 room fresh when tournaments change
window._baseRenderTournamentsTabDedicated14 = window._baseRenderTournamentsTabDedicated14 || window.renderTournamentsTabDedicated;
window.renderTournamentsTabDedicated = function() {
    window._baseRenderTournamentsTabDedicated14();
    const box = document.getElementById('tournamentsDedicatedContainer');
    if (box && window.returnToSquadId) {
        const sq = (window.clansData || []).find(c => c.id === window.returnToSquadId);
        if (sq) box.insertAdjacentHTML('afterbegin', `<button onclick="window.backToSquadFromTournament()" class="w-full text-left px-3.5 py-2.5 rounded-2xl bg-gg-900 border border-amber-500/30 text-xs font-bold text-amber-300"><i class="fa-solid fa-arrow-left mr-2"></i>Back to ${escapeHTML(sq.name)}</button>`);
    }
    const sqOpen = window.activeSquadDetails && !document.getElementById('squadDetailsModal').classList.contains('hidden');
    if (sqOpen) {
        if (window.activeSquadSubRoom === 'Tournaments') window.renderSquadTournaments();
        window.renderSquadHeader();
    }
};
window.backToSquadFromTournament = function() {
    const id = window.returnToSquadId;
    window.returnToSquadId = null;
    if (!id) return;
    window.openSquadDetailsModal(id);
    window.activeSquadSubRoom = 'Tournaments';
    window.renderSquadHeader();
    window.renderSquadChannel();
};

// ======================================================================
// TASTE ENGINE: learns what you like from what you watch, GG, comment, share and follow
// Saved on this phone only. Old interests slowly fade so the feed follows your current mood.
// ======================================================================
window.TASTE_KEY = 'sg_taste_v1';
window.loadTaste = function() {
    let t;
    try { t = JSON.parse(localStorage.getItem(window.TASTE_KEY) || 'null'); } catch (e) {}
    if (!t || typeof t !== 'object') {
        t = { cats: {}, creators: {}, tags: {}, news: {}, seen: {}, hidden: [], at: Date.now() };
        // carry over the old simple category counts
        try { Object.entries(JSON.parse(localStorage.getItem('sinless_category_interests') || '{}')).forEach(([k, v]) => { t.cats[k] = Math.min(20, Number(v) || 0); }); } catch (e) {}
    }
    ['cats', 'creators', 'tags', 'news', 'seen'].forEach(k => { t[k] = t[k] || {}; });
    t.hidden = t.hidden || [];
    const days = (Date.now() - (t.at || Date.now())) / 86400000;
    if (days > 0.25) {                                   // fade ~4% a day
        const f = Math.pow(0.96, days);
        ['cats', 'creators', 'tags', 'news'].forEach(k => { for (const x in t[k]) { t[k][x] *= f; if (Math.abs(t[k][x]) < 0.05) delete t[k][x]; } });
        t.at = Date.now();
    }
    return t;
};
window.taste = window.loadTaste();
window.saveTasteSoon = function() {
    clearTimeout(window._tasteSaveT);
    window._tasteSaveT = setTimeout(() => {
        const t = window.taste;
        const trim = (o, n) => { const e = Object.entries(o); if (e.length > n) { e.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])); return Object.fromEntries(e.slice(0, n)); } return o; };
        t.creators = trim(t.creators, 300); t.tags = trim(t.tags, 300); t.seen = trim(t.seen, 1500);
        t.hidden = t.hidden.slice(-500);
        try { localStorage.setItem(window.TASTE_KEY, JSON.stringify(t)); } catch (e) {}
    }, 800);
};

window.postTags = function(p) {
    return [...new Set(((p.caption || p.text || '').match(/#[\p{L}\p{N}_]{2,30}/gu) || []).map(x => x.slice(1).toLowerCase()))].slice(0, 5);
};
window.POST_TO_NEWS_CAT = { 'FOOTBALL': 'football', 'FC MOBILE': 'gaming', 'EA SPORTS FC': 'gaming', 'EFOOTBALL': 'gaming', 'DLS': 'gaming', 'CALL OF DUTY': 'gaming', 'OTHER GAMES': 'gaming', 'LIVE STREAM': 'gaming', 'WRESTLING': 'wrestling', 'MOVIES': 'movies', 'ANIME': 'anime', 'BOOKS': 'books' };

// weight > 0 = liked it, < 0 = not for me
window.tasteAdd = function(p, w) {
    if (!p || !w) return;
    const t = window.taste;
    const clamp = (v) => Math.max(-15, Math.min(60, v));
    const cat = (p.game || '').toUpperCase();
    if (cat) t.cats[cat] = clamp((t.cats[cat] || 0) + w);
    const who = (p.user || '').toLowerCase();
    if (who && !window.isMyPost(p)) t.creators[who] = clamp((t.creators[who] || 0) + w);
    window.postTags(p).forEach(tag => { t.tags[tag] = clamp((t.tags[tag] || 0) + w * 0.6); });
    const nc = window.POST_TO_NEWS_CAT[cat];
    if (nc) t.news[nc] = clamp((t.news[nc] || 0) + w * 0.5);
    window.saveTasteSoon();
};

// How much this person seems to like a post (roughly -1 … +3)
window.tasteScore = function(p) {
    const t = window.taste;
    const maxOf = (o) => Math.max(1, ...Object.values(o).map(Math.abs));
    const norm = (o, k) => k ? Math.max(-1, Math.min(1, (o[k] || 0) / maxOf(o))) : 0;
    let s = norm(t.cats, (p.game || '').toUpperCase()) + 0.9 * norm(t.creators, (p.user || '').toLowerCase());
    const tags = window.postTags(p);
    if (tags.length) s += 0.6 * Math.max(...tags.map(x => norm(t.tags, x)));
    if (window.amFollowing && window.amFollowing(p.user)) s += 0.5;
    return s;
};

// New ranking: quality + freshness + personal taste, and things you've already seen sink
window.feedScore = function(p) {
    const ageDays = (Date.now() - window.postTimeValue(p)) / 86400000;
    const quality = 4 * Math.log1p(p.ggsCount || 0) + 5 * Math.log1p(p.commentsCount || 0) + 1.5 * Math.log1p(p.viewsCount || 0);
    const freshness = 12 / (1 + ageDays);
    let s = quality + freshness + 9 * window.tasteScore(p) + 9;
    const seen = window.taste.seen[p.docId || p.id] || 0;
    if (seen >= 2) s *= 0.5; else if (seen === 1) s *= 0.8;
    return Math.max(0.5, s);
};

// "Not interested" posts disappear from your feed
window._baseGetOrderedFeed14 = window._baseGetOrderedFeed14 || window.getOrderedFeed;
window.getOrderedFeed = function() {
    const hidden = new Set(window.taste.hidden);
    return window._baseGetOrderedFeed14().filter(p => !hidden.has(p.docId || p.id));
};

// --- signals ---
window.viewStart14 = {};
window._baseStartViewStay14 = window._baseStartViewStay14 || window.startViewStay;
window.startViewStay = function(id) {
    if (!window.viewStart14[id]) window.viewStart14[id] = Date.now();
    return window._baseStartViewStay14(id);
};
window._baseEndViewStay14 = window._baseEndViewStay14 || window.endViewStay;
window.endViewStay = function(id) {
    const t0 = window.viewStart14[id];
    delete window.viewStart14[id];
    if (t0) {
        const secs = (Date.now() - t0) / 1000;
        const p = window.findPost(id);
        if (p && secs >= 1) { window.taste.seen[id] = (window.taste.seen[id] || 0) + 1; window.saveTasteSoon(); }
        if (p && secs >= 3) window.tasteAdd(p, Math.min(2.5, secs / 6));      // stayed to watch/read
        else if (p && secs < 1.2) window.tasteAdd(p, -0.1);                    // scrolled straight past
    }
    return window._baseEndViewStay14(id);
};

window._baseToggleGGPost14 = window._baseToggleGGPost14 || window.toggleGGPost;
window.toggleGGPost = async function(postId) {
    const p = window.findPost(postId);
    const uid = window.currentUser ? window.currentUser.uid : 'guest_user';
    const had = p && (p.ggsBy || []).includes(uid);
    const r = await window._baseToggleGGPost14(postId);
    if (p && window.currentUser) window.tasteAdd(p, had ? -3 : 3);
    return r;
};
window._baseSubmitCommentReply14 = window._baseSubmitCommentReply14 || window.submitCommentReply;
window.submitCommentReply = async function() {
    const p = window.findPost(window.activeCommentPostId);
    const had = (document.getElementById('commentInputText') || {}).value;
    const r = await window._baseSubmitCommentReply14();
    if (p && had && had.trim() && window.currentUser) window.tasteAdd(p, 4);
    return r;
};
window._baseSharePost14 = window._baseSharePost14 || window.sharePost;
window.sharePost = function(postId) { window.tasteAdd(window.findPost(postId), 5); return window._baseSharePost14(postId); };
window._baseOpenPostDetail14 = window._baseOpenPostDetail14 || window.openPostDetail;
window.openPostDetail = function(postId, focusReply) { window.tasteAdd(window.findPost(postId), 1.5); return window._baseOpenPostDetail14(postId, focusReply); };
window._baseVotePoll14 = window._baseVotePoll14 || window.votePoll;
window.votePoll = async function(postId, i) { const p = window.findPost(postId); const r = await window._baseVotePoll14(postId, i); if (p && window.currentUser) window.tasteAdd(p, 2); return r; };
window._baseToggleFollowUser14 = window._baseToggleFollowUser14 || window.toggleFollowUser;
window.toggleFollowUser = async function(tag) {
    const was = window.amFollowing(tag);
    const r = await window._baseToggleFollowUser14(tag);
    const k = (tag || '').toLowerCase();
    window.taste.creators[k] = Math.max(-15, Math.min(60, (window.taste.creators[k] || 0) + (was ? -8 : 8)));
    window.saveTasteSoon();
    return r;
};
window._baseFilterByCategory14 = window._baseFilterByCategory14 || window.filterByCategory;
window.filterByCategory = function(cat, btn) {
    if (cat && !['ALL', 'LIVE STREAM'].includes(cat)) { window.taste.cats[cat] = Math.min(60, (window.taste.cats[cat] || 0) + 0.5); window.saveTasteSoon(); }
    return window._baseFilterByCategory14(cat, btn);
};

// "Show more like this" / "Not interested" in the post ••• menu
window._baseOpenPostActions14 = window._baseOpenPostActions14 || window.openPostActions;
window.openPostActions = function(postId) {
    const orig = window.openActionSheet;
    window.openActionSheet = (title, items) => orig(title, [
        { icon: 'fa-heart', label: 'Show more like this', run: () => { window.tasteAdd(window.findPost(postId), 6); showToast('👍 Got it — more like this.'); } },
        { icon: 'fa-eye-slash', label: 'Not interested', run: () => window.notInterested(postId) },
        ...items
    ]);
    try { window._baseOpenPostActions14(postId); } finally { window.openActionSheet = orig; }
};
window.notInterested = function(postId) {
    const p = window.findPost(postId);
    if (p) window.tasteAdd(p, -6);
    window.taste.hidden.push(postId);
    window.saveTasteSoon();
    window.renderFypFeed();
    showToast("🙈 Hidden. You'll see less like this.");
};

// ======================================================================
// NEWS & GIST: free headlines from football, gaming, movies, anime, books & wrestling.
// Refreshes by itself every 10 minutes; live scores every 30 seconds while games are on.
// ======================================================================
window.NEWS_CATS = [
    { id: 'foryou', label: '✨ For You' },
    { id: 'football', label: '⚽ Football', color: 'text-emerald-400', post: 'FOOTBALL' },
    { id: 'gaming', label: '🎮 Gaming', color: 'text-cyan-300', post: 'OTHER GAMES' },
    { id: 'movies', label: '🎬 Movies & TV', color: 'text-rose-400', post: 'MOVIES' },
    { id: 'anime', label: '🍥 Anime', color: 'text-pink-400', post: 'ANIME' },
    { id: 'books', label: '📚 Books', color: 'text-yellow-300', post: 'BOOKS' },
    { id: 'wrestling', label: '🤼 Wrestling', color: 'text-amber-400', post: 'WRESTLING' }
];
window.NEWS_SOURCES = {
    football: [
        ['BBC Sport', 'https://feeds.bbci.co.uk/sport/football/rss.xml'],
        ['The Guardian', 'https://www.theguardian.com/football/rss'],
        ['Sky Sports', 'https://www.skysports.com/rss/12040']
    ],
    gaming: [
        ['GameSpot', 'https://www.gamespot.com/feeds/game-news'],
        ['IGN', 'https://feeds.feedburner.com/ign/games-all'],
        ['Guardian Games', 'https://www.theguardian.com/games/rss'],
        ['Eurogamer', 'https://www.eurogamer.net/feed']
    ],
    movies: [
        ['The Guardian', 'https://www.theguardian.com/film/rss'],
        ['Variety', 'https://variety.com/v/film/feed/'],
        ['Deadline', 'https://deadline.com/feed/'],
        ['Guardian TV', 'https://www.theguardian.com/tv-and-radio/rss']
    ],
    anime: [
        ['Anime News Network', 'https://www.animenewsnetwork.com/all/rss.xml?ann-edition=w'],
        ['MyAnimeList', 'https://myanimelist.net/rss/news.xml']
    ],
    books: [
        ['The Guardian', 'https://www.theguardian.com/books/rss'],
        ['Book Riot', 'https://bookriot.com/feed/'],
        ['Literary Hub', 'https://lithub.com/feed/']
    ],
    wrestling: [
        ['Wrestling Inc', 'https://www.wrestlinginc.com/feed/'],
        ['Ringside News', 'https://www.ringsidenews.com/feed/']
    ]
};
window.NEWS_TTL = 10 * 60000;
window.newsByCat = {};
window.activeNewsCat = 'foryou';
window.newsLoadedAt = 0;

window.newsText = function(html) {
    const d = document.createElement('div');
    d.innerHTML = String(html || '').replace(/<(script|style)[\s\S]*?<\/\1>/gi, '');
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
};
window.newsImageFrom = function(it, descHtml) {
    let img = it.thumbnail || (it.enclosure && (it.enclosure.link || it.enclosure.thumbnail)) || '';
    if (!img && descHtml) { const m = /<img[^>]+src=["']([^"']+)["']/i.exec(descHtml); if (m) img = m[1]; }
    if (!img || !/^https?:\/\//.test(img) || /\.(mp3|mp4|m4a)(\?|$)/i.test(img)) return '';
    return img.replace(/([?&])width=\d+/, '$1width=700').replace('/ace/standard/240/', '/ace/standard/624/');
};

// 1st try: rss2json (free). 2nd: read the RSS ourselves through a public relay.
window.fetchFeedItems = async function(source, url) {
    const cacheKey = 'sg_news_' + url;
    try {
        const c = JSON.parse(localStorage.getItem(cacheKey) || 'null');
        if (c && Date.now() - c.at < window.NEWS_TTL && c.items && c.items.length) return c.items;
    } catch (e) {}
    const tidy = (arr) => arr.map(it => ({
        title: window.newsText(it.title).slice(0, 200),
        link: it.link,
        date: new Date((it.date || '').replace(' ', 'T') + ((it.date || '').length === 19 ? 'Z' : '')).getTime() || Date.now(),
        img: it.img,
        desc: window.newsText(it.desc).slice(0, 220),
        source
    })).filter(x => x.title && /^https?:\/\//.test(x.link || ''));
    let items = null;
    try {
        const r = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url));
        const j = await r.json();
        if (j.status === 'ok' && (j.items || []).length) {
            items = tidy(j.items.map(it => ({ title: it.title, link: it.link, date: it.pubDate, img: window.newsImageFrom(it, it.description || it.content), desc: it.description })));
        }
    } catch (e) {}
    if (!items) {
        for (const relay of ['https://api.allorigins.win/raw?url=', 'https://api.codetabs.com/v1/proxy?quest=']) {
            try {
                const r = await fetch(relay + encodeURIComponent(url));
                const xml = new DOMParser().parseFromString(await r.text(), 'text/xml');
                const nodes = [...xml.querySelectorAll('item, entry')].slice(0, 15);
                if (!nodes.length) continue;
                const get = (n, sel) => { const e = n.getElementsByTagName(sel)[0]; return e ? e.textContent : ''; };
                items = tidy(nodes.map(n => {
                    const linkEl = n.getElementsByTagName('link')[0];
                    const link = linkEl ? (linkEl.getAttribute('href') || linkEl.textContent) : '';
                    const desc = get(n, 'description') || get(n, 'summary') || get(n, 'content');
                    const media = n.getElementsByTagName('media:content')[0] || n.getElementsByTagName('media:thumbnail')[0] || n.getElementsByTagName('enclosure')[0];
                    const pub = get(n, 'pubDate') || get(n, 'published') || get(n, 'updated');
                    return { title: get(n, 'title'), link: link.trim(), date: pub ? new Date(pub).toISOString() : '', img: window.newsImageFrom({ thumbnail: media ? media.getAttribute('url') : '' }, desc), desc };
                }));
                if (items.length) break;
            } catch (e) {}
        }
    }
    if (items && items.length) {
        try { localStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), items })); } catch (e) {}
        return items;
    }
    // fall back to an older saved copy rather than nothing
    try { const c = JSON.parse(localStorage.getItem(cacheKey) || 'null'); if (c && c.items) return c.items; } catch (e) {}
    return [];
};

window.loadNewsCat = async function(cat) {
    const lists = await Promise.all((window.NEWS_SOURCES[cat] || []).map(([name, url]) => window.fetchFeedItems(name, url)));
    const seen = new Set();
    const out = lists.flat().filter(x => {
        const k = x.title.toLowerCase().slice(0, 60);
        if (seen.has(k)) return false; seen.add(k); return true;
    }).map(x => ({ ...x, cat })).sort((a, b) => b.date - a.date).slice(0, 40);
    if (out.length) window.newsByCat[cat] = out;
    return out;
};

window.loadNews = async function(force) {
    if (window.newsLoading) return;
    if (!force && Date.now() - window.newsLoadedAt < window.NEWS_TTL && Object.keys(window.newsByCat).length) { window.renderNews(); return; }
    window.newsLoading = true;
    const icon = document.getElementById('newsRefreshIcon');
    if (icon) icon.classList.add('fa-spin');
    if (force) Object.values(window.NEWS_SOURCES).flat().forEach(([, url]) => { try { const k = 'sg_news_' + url; const c = JSON.parse(localStorage.getItem(k) || 'null'); if (c) { c.at = 0; localStorage.setItem(k, JSON.stringify(c)); } } catch (e) {} });
    try {
        await Promise.all(Object.keys(window.NEWS_SOURCES).map(c => window.loadNewsCat(c).then(() => window.renderNews())));
        window.newsLoadedAt = Date.now();
        window.newsMix = null;
    } finally {
        window.newsLoading = false;
        if (icon) icon.classList.remove('fa-spin');
    }
    const u = document.getElementById('newsUpdatedText');
    if (u) u.innerText = 'Updated ' + new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) + ' · refreshes by itself';
    window.renderNews();
    window.renderTrendingHeadlines();
    if (!document.getElementById('view-fyp').classList.contains('hidden')) window.renderFypFeed();
};

// "For You" news: more from what you like, but a bit of everything
window.newsForYou = function() {
    if (window.newsMix) return window.newsMix;
    const t = window.taste.news;
    const cats = Object.keys(window.NEWS_SOURCES).filter(c => (window.newsByCat[c] || []).length);
    const w = {};
    cats.forEach(c => { w[c] = 1 + Math.max(0, t[c] || 0); });
    const ptr = {}; cats.forEach(c => { ptr[c] = 0; });
    const credit = {}; cats.forEach(c => { credit[c] = 0; });
    const total = cats.reduce((a, c) => a + w[c], 0) || 1;
    const out = [];
    const max = cats.reduce((a, c) => a + window.newsByCat[c].length, 0);
    while (out.length < Math.min(60, max)) {
        cats.forEach(c => { credit[c] += w[c] / total; });
        const pick = cats.filter(c => ptr[c] < window.newsByCat[c].length).sort((a, b) => credit[b] - credit[a])[0];
        if (!pick) break;
        credit[pick] -= 1;
        out.push(window.newsByCat[pick][ptr[pick]++]);
    }
    window.newsMix = out;
    return out;
};
window.newsListFor = function(cat) { return cat === 'foryou' ? window.newsForYou() : (window.newsByCat[cat] || []); };

window.newsCatInfo = function(id) { return window.NEWS_CATS.find(c => c.id === id) || {}; };
window.newsCardHtml = function(n, opts = {}) {
    const info = window.newsCatInfo(n.cat);
    const idx = window.newsRegister(n);
    return `<div class="glass-panel rounded-2xl overflow-hidden border ${opts.inFeed ? 'border-cyan-500/40' : 'border-cyan-500/20'} shadow-lg">
        ${opts.inFeed ? `<div class="px-3.5 pt-2.5 text-[10px] font-black text-cyan-400 uppercase tracking-wider"><i class="fa-solid fa-newspaper mr-1"></i> News for you</div>` : ''}
        <div onclick="window.openNews(${idx})" class="cursor-pointer">
            ${n.img ? `<img src="${escapeHTML(n.img)}" loading="lazy" alt="" class="w-full ${opts.small ? 'h-36' : 'h-48'} object-cover bg-gg-900 mt-2" onerror="this.remove()">` : ''}
            <div class="p-3.5 space-y-1.5">
                <p class="text-[10px] font-bold ${info.color || 'text-cyan-300'}">${info.label ? info.label.split(' ')[0] : '📰'} ${escapeHTML(n.source)} · <span class="text-gray-500">${window.timeAgo(n.date)}</span></p>
                <h4 class="text-sm font-black text-white leading-snug">${escapeHTML(n.title)}</h4>
                ${n.desc && !opts.small ? `<p class="text-xs text-gray-400 leading-relaxed line-clamp-3">${escapeHTML(n.desc)}</p>` : ''}
            </div>
        </div>
        <div class="flex border-t border-cyan-500/10 text-[11px] font-bold text-gray-400">
            <button onclick="window.openNews(${idx})" class="flex-1 py-2.5 hover:text-cyan-400"><i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> Read</button>
            <button onclick="window.discussNews(${idx})" class="flex-1 py-2.5 hover:text-magenta"><i class="fa-solid fa-comment-dots mr-1"></i> Post about it</button>
            <button onclick="window.shareNews(${idx})" class="flex-1 py-2.5 hover:text-emerald-400"><i class="fa-solid fa-share-nodes mr-1"></i> Share</button>
        </div>
    </div>`;
};
// news items are referenced by number so titles with quotes never break buttons
window.newsRegistry = [];
window.newsRegister = function(n) {
    let i = window.newsRegistry.indexOf(n);
    if (i < 0) { window.newsRegistry.push(n); i = window.newsRegistry.length - 1; }
    return i;
};
window.openNews = function(i) {
    const n = window.newsRegistry[i];
    if (!n) return;
    window.taste.news[n.cat] = Math.min(60, (window.taste.news[n.cat] || 0) + 1.5);
    window.saveTasteSoon();
    window.open(n.link, '_blank', 'noopener');
};
window.shareNews = async function(i) {
    const n = window.newsRegistry[i];
    if (!n) return;
    try {
        if (navigator.share) { await navigator.share({ title: n.title, text: n.title + ' (via Sinless GG)', url: n.link }); return; }
    } catch (e) { return; }
    try { await navigator.clipboard.writeText(n.link); showToast('🔗 Link copied'); } catch (e) { showToast(n.link); }
};
window.discussNews = function(i) {
    const n = window.newsRegistry[i];
    if (!n) return;
    if (window.needSignIn('post')) return;
    window.openCreatePostModal();
    document.getElementById('postTextContent').value = `📰 ${n.title}\n\n${n.link}\n\nWhat do you think? 👇`;
    const sel = document.getElementById('postCategorySelect');
    const pc = window.newsCatInfo(n.cat).post;
    if (pc && [...sel.options].some(o => o.value === pc)) sel.value = pc;
};

window.renderNews = function() {
    const chips = document.getElementById('newsCatChips');
    const box = document.getElementById('newsListContainer');
    if (!chips || !box) return;
    chips.innerHTML = window.NEWS_CATS.map(c => `<button onclick="window.setNewsCat('${c.id}')" class="shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-extrabold whitespace-nowrap ${window.activeNewsCat === c.id ? 'bg-cyan-400 text-slate-950 shadow' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">${c.label}</button>`).join('');
    const list = window.newsListFor(window.activeNewsCat);
    if (!list.length) {
        box.innerHTML = `<div class="glass-panel p-8 rounded-2xl text-center space-y-2">
            <i class="fa-solid ${window.newsLoading ? 'fa-spinner fa-spin' : 'fa-newspaper'} text-3xl text-cyan-400 opacity-70"></i>
            <p class="text-xs font-bold text-white">${window.newsLoading ? 'Getting the latest news…' : "Couldn't load news right now"}</p>
            ${window.newsLoading ? '' : `<button onclick="window.loadNews(true)" class="text-cyan-400 text-xs font-bold underline">Try again</button>`}
        </div>`;
        return;
    }
    box.innerHTML = list.slice(0, 40).map(n => window.newsCardHtml(n)).join('');
    window.renderNewsTicker();
};
window.setNewsCat = function(id) {
    window.activeNewsCat = id;
    if (id !== 'foryou') { window.taste.news[id] = Math.min(60, (window.taste.news[id] || 0) + 0.5); window.saveTasteSoon(); }
    window.renderNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Live scores strip on the News page (only games that are on now or today)
window.renderNewsTicker = function() {
    const el = document.getElementById('newsLiveTicker');
    if (!el) return;
    const today = new Date().toDateString();
    const list = (window.liveMatchesCache || []).filter(m => m.state === 'in' || new Date(m.date).toDateString() === today).slice(0, 15);
    if (!list.length || !['foryou', 'football'].includes(window.activeNewsCat)) { el.classList.add('hidden'); return; }
    el.className = 'flex space-x-2 overflow-x-auto scrollbar-none pb-1';
    el.innerHTML = list.map(m => {
        const live = m.state === 'in';
        const mid = m.state === 'pre' ? new Date(m.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : `${escapeHTML(m.home.score ?? '')} - ${escapeHTML(m.away.score ?? '')}`;
        return `<button onclick="window.openLounge('${m.id}')" class="shrink-0 glass-panel rounded-xl px-3 py-2 border ${live ? 'border-red-500/50' : 'border-cyan-500/20'} text-left">
            <p class="text-[8px] font-black ${live ? 'text-red-400' : 'text-gray-500'} uppercase">${live ? `● ${escapeHTML(m.clock || 'LIVE')}` : m.state === 'post' ? 'FT' : 'Today'} · ${escapeHTML(m.leagueShort)}</p>
            <p class="text-xs font-black text-white whitespace-nowrap">${escapeHTML(m.home.abbr)} <span class="${live ? 'text-red-300' : 'text-cyan-300'}">${mid}</span> ${escapeHTML(m.away.abbr)}</p>
        </button>`;
    }).join('');
};

// Top headlines on the Trending page
window.renderTrendingHeadlines = function() {
    const box = document.getElementById('trendingHeadlinesBox');
    if (!box) return;
    const list = window.newsForYou().slice(0, 5);
    if (!list.length) { box.innerHTML = `<p class="text-xs text-gray-400"><i class="fa-solid fa-newspaper text-cyan-400 mr-1"></i> Loading headlines…</p>`; return; }
    box.innerHTML = `<div class="flex items-center justify-between"><h3 class="text-xs font-black text-white uppercase tracking-wider"><i class="fa-solid fa-newspaper text-cyan-400 mr-1.5"></i> Headlines</h3>
        <button onclick="window.switchView('news')" class="text-[10px] text-cyan-400 font-bold">See all ›</button></div>
        ${list.map(n => `<button onclick="window.openNews(${window.newsRegister(n)})" class="w-full flex items-center space-x-3 text-left py-1.5">
            ${n.img ? `<img src="${escapeHTML(n.img)}" loading="lazy" class="w-14 h-14 rounded-xl object-cover shrink-0 bg-gg-900" alt="" onerror="this.style.visibility='hidden'">` : `<div class="w-14 h-14 rounded-xl bg-gg-900 shrink-0 flex items-center justify-center text-xl">${(window.newsCatInfo(n.cat).label || '📰').split(' ')[0]}</div>`}
            <div class="min-w-0"><p class="text-xs font-bold text-white leading-snug line-clamp-2">${escapeHTML(n.title)}</p><p class="text-[10px] text-gray-500 mt-0.5">${escapeHTML(n.source)} · ${window.timeAgo(n.date)}</p></div>
        </button>`).join('')}`;
};

// News cards mixed into the For You feed (more when there are only a few posts)
window._baseRenderFypFeed14 = window._baseRenderFypFeed14 || window.renderFypFeed;
window.renderFypFeed = function() {
    window._baseRenderFypFeed14();
    const box = document.getElementById('fypFeedContainer');
    if (!box || window.feedMode === 'following') return;
    const f = window.activeCategoryFilter || 'ALL';
    if (f === 'LIVE STREAM') return;
    const nc = f === 'ALL' ? null : window.POST_TO_NEWS_CAT[f];
    if (f !== 'ALL' && !nc) return;
    const news = nc ? (window.newsByCat[nc] || []) : window.newsForYou();
    if (!news.length) return;
    const cards = [...box.children].filter(el => el.querySelector('[data-post-id]') || el.hasAttribute('data-post-id'));
    // Plenty of posts → news only now and then. Few posts → news fills the gaps.
    const n = cards.length;
    const every = n < 8 ? 2 : n < 20 ? 3 : n < 40 ? 5 : 8;
    const maxNews = n < 8 ? 40 : n < 20 ? 30 : n < 40 ? 15 : 8;
    let k = 0;
    const make = () => { const d = document.createElement('div'); d.setAttribute('data-news-card', '1'); d.innerHTML = window.newsCardHtml(news[k++], { inFeed: true, small: true }); return d; };
    if (!cards.length) {
        // nothing posted here yet: show the news so the page is never empty
        box.insertAdjacentHTML('beforeend', `<p class="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1 pt-2">Meanwhile, in the news</p>`);
        while (k < Math.min(40, news.length)) box.appendChild(make());
        return;
    }
    cards.forEach((c, i) => { if ((i + 1) % every === 0 && k < news.length && k < maxNews) c.after(make()); });
    // ran out of posts? keep the feed going with more news
    if (n < 40 && k < Math.min(news.length, maxNews)) {
        box.insertAdjacentHTML('beforeend', `<p class="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1 pt-2">You're all caught up · more from the news</p>`);
        while (k < Math.min(news.length, maxNews)) box.appendChild(make());
    }
};

// Show the News page / refresh when opened
window._baseSwitchView14 = window._baseSwitchView14 || window.switchView;
window.switchView = function(v) {
    window._baseSwitchView14(v);
    if (v === 'news') { window.renderNews(); window.loadNews(false); if (!(window.liveMatchesCache || []).length) window.loadLiveMatches(); }
    if (v === 'trending') { window.renderTrendingHeadlines(); window.loadNews(false); }
};

// Background refreshing: news every 10 min, scores every 30s when matches are live,
// trending lists every minute. Also refresh when you come back to the app.
setInterval(() => { if (document.visibilityState === 'visible') window.loadNews(false); }, 60000);
setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    const onNews = !document.getElementById('view-news').classList.contains('hidden');
    const onTrend = !document.getElementById('view-trending').classList.contains('hidden');
    const anyLive = (window.liveMatchesCache || []).some(m => m.state === 'in');
    if (onNews && (anyLive || !window._tickerAt || Date.now() - window._tickerAt > 120000)) { window._tickerAt = Date.now(); window.loadLiveMatches().then(() => window.renderNewsTicker()); }
    if (onTrend && anyLive) window.loadLiveMatches();
}, 30000);
setInterval(() => {
    if (document.visibilityState === 'visible' && !document.getElementById('view-trending').classList.contains('hidden')) window.renderTrendingTopics();
}, 60000);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { window.loadNews(false); }
});
setTimeout(() => window.loadNews(false), 2500);

// ======================================================================
// v15: SPONSORED ADS (sell ad spots directly — you keep 100%)
// ads/{id} = { sponsor, title, text, image, link, cta, places:['feed','news','squads'],
//              cats:[] (empty = everyone), active, startAt, endAt, impressions, clicks, createdAt }
// Only admins create/edit ads. Everyone can add to the view/tap counters.
// ======================================================================
window.adsList = [];
window.AD_CATS = ['FOOTBALL', 'FC MOBILE', 'EA SPORTS FC', 'EFOOTBALL', 'DLS', 'WRESTLING', 'CALL OF DUTY', 'OTHER GAMES', 'MOVIES', 'ANIME', 'BOOKS'];

window.listenToAds = function() {
    if (!window.db || window.adsUnsub) return;
    window.adsUnsub = onSnapshot(query(collection(window.db, 'ads'), limit(100)), (snap) => {
        const list = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id }));
        window.adsList = list;
        window.renderAdSlots();
        if (window.adminTab === 'ads' && !document.getElementById('adminModal').classList.contains('hidden') && !window.adEditing) window.renderAdminAds();
    }, (e) => console.warn('Ads listener:', e));
};

window.adIsLive = function(a) {
    const now = Date.now();
    return a.active && (!a.startAt || a.startAt <= now) && (!a.endAt || a.endAt > now);
};
window.hiddenAds = (() => { try { return JSON.parse(localStorage.getItem('sg_hidden_ads') || '{}'); } catch (e) { return {}; } })();

// Pick ads for a place; ads that match what you like come first, then rotate
window.adsFor = function(place, cat) {
    const now = Date.now();
    const list = window.adsList.filter(a => window.adIsLive(a) && (a.places || ['feed']).includes(place) && !(window.hiddenAds[a.id] > now) &&
        (!cat || !(a.cats || []).length || a.cats.includes(cat)));
    const t = window.taste ? window.taste.cats : {};
    return list.map(a => ({ a, s: Math.random() + ((a.cats || []).length ? Math.max(0, ...a.cats.map(c => t[c] || 0)) / 20 : 0) }))
        .sort((x, y) => y.s - x.s).map(x => x.a);
};

window.adRegistry = {};
window.adCardHtml = function(a, compact) {
    window.adRegistry[a.id] = a;
    return `<div data-ad-id="${a.id}" class="glass-panel rounded-2xl overflow-hidden border border-amber-500/40 shadow-lg">
        <div class="flex items-center justify-between px-3.5 pt-2.5">
            <p class="text-[10px] font-black text-amber-400 uppercase tracking-wider"><i class="fa-solid fa-bullhorn mr-1"></i> Sponsored · <span class="text-gray-300 normal-case">${escapeHTML(a.sponsor || '')}</span></p>
            <button onclick="window.hideAd('${a.id}')" class="text-gray-500 text-xs px-1" title="Hide ad">✕</button>
        </div>
        <div onclick="window.clickAd('${a.id}')" class="cursor-pointer">
            ${a.image ? `<img src="${escapeHTML(window.cldSized ? window.cldSized(a.image, 800, 'image') : a.image)}" loading="lazy" alt="" class="w-full ${compact ? 'h-28' : 'max-h-80'} object-cover mt-2 bg-gg-900">` : ''}
            <div class="p-3.5 space-y-1">
                <h4 class="text-sm font-black text-white leading-snug">${escapeHTML(a.title || '')}</h4>
                ${a.text && !compact ? `<p class="text-xs text-gray-300 leading-relaxed">${escapeHTML(a.text)}</p>` : ''}
            </div>
        </div>
        ${a.link ? `<div class="px-3.5 pb-3.5"><button onclick="window.clickAd('${a.id}')" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-black uppercase">${escapeHTML(a.cta || 'Learn more')}</button></div>` : ''}
    </div>`;
};

// Counting views (once per ad per 30 min on this phone) and taps — saved in small batches
window.adCounts = {};
window.adSeenAt = {};
window.adQueue = function(id, field) {
    window.adCounts[id] = window.adCounts[id] || { impressions: 0, clicks: 0 };
    window.adCounts[id][field]++;
};
window.flushAdCounts = function() {
    const all = window.adCounts; window.adCounts = {};
    Object.entries(all).forEach(([id, c]) => {
        const upd = {};
        if (c.impressions) upd.impressions = increment(Math.min(c.impressions, 500));
        if (c.clicks) upd.clicks = increment(Math.min(c.clicks, 50));
        if (Object.keys(upd).length) updateDoc(doc(window.db, 'ads', id), upd).catch(() => {});
    });
};
setInterval(() => window.flushAdCounts(), 45000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') window.flushAdCounts(); });

window.observeAds = function() {
    if (!('IntersectionObserver' in window)) return;
    if (!window.adObserver) {
        window.adObserver = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                const id = en.target.getAttribute('data-ad-id');
                const now = Date.now();
                if (window.adSeenAt[id] && now - window.adSeenAt[id] < 30 * 60000) return;
                window.adSeenAt[id] = now;
                window.adQueue(id, 'impressions');
            });
        }, { threshold: 0.5 });
    }
    document.querySelectorAll('[data-ad-id]').forEach(el => { if (!el._adObs) { el._adObs = 1; window.adObserver.observe(el); } });
};

window.clickAd = function(id) {
    const a = window.adRegistry[id];
    if (!a) return;
    window.adQueue(id, 'clicks');
    window.flushAdCounts();
    if (a.link) window.open(a.link, '_blank', 'noopener');
};
window.hideAd = function(id) {
    window.hiddenAds[id] = Date.now() + 24 * 3600000;   // hidden for a day
    try { localStorage.setItem('sg_hidden_ads', JSON.stringify(window.hiddenAds)); } catch (e) {}
    document.querySelectorAll(`[data-ad-id="${id}"]`).forEach(el => el.remove());
    showToast('Ad hidden for today.');
};

// --- where ads appear ---
// Feed: first ad after the 4th item, then about every 10 items (posts + news)
window._baseRenderFypFeed15 = window._baseRenderFypFeed15 || window.renderFypFeed;
window.renderFypFeed = function() {
    window._baseRenderFypFeed15();
    const box = document.getElementById('fypFeedContainer');
    if (!box) return;
    const f = window.activeCategoryFilter || 'ALL';
    const ads = window.adsFor('feed', f === 'ALL' || f === 'LIVE STREAM' ? null : f);
    if (!ads.length) return;
    const items = [...box.children].filter(el => el.hasAttribute('data-news-card') || el.querySelector('[data-post-id]') || el.hasAttribute('data-post-id'));
    let k = 0;
    items.forEach((el, i) => {
        if ((i === 3 || (i > 3 && (i - 3) % 10 === 0)) && k < Math.min(ads.length * 2, 6)) {
            const d = document.createElement('div');
            d.innerHTML = window.adCardHtml(ads[k % ads.length]);
            el.after(d.firstElementChild);
            k++;
        }
    });
    if (!k && items.length) { const d = document.createElement('div'); d.innerHTML = window.adCardHtml(ads[0]); items[items.length - 1].after(d.firstElementChild); }
    window.observeAds();
};

// News page: an ad after the 3rd story, then every 8
window._baseRenderNews15 = window._baseRenderNews15 || window.renderNews;
window.renderNews = function() {
    window._baseRenderNews15();
    const box = document.getElementById('newsListContainer');
    const ads = window.adsFor('news', (window.newsCatInfo(window.activeNewsCat) || {}).post || null);
    if (!box || !ads.length) return;
    const items = [...box.children];
    let k = 0;
    items.forEach((el, i) => {
        if ((i === 2 || (i > 2 && (i - 2) % 8 === 0)) && k < 5) {
            const d = document.createElement('div'); d.innerHTML = window.adCardHtml(ads[k % ads.length]); el.after(d.firstElementChild); k++;
        }
    });
    window.observeAds();
};

// Squads page: one banner above the hubs
window.renderSquadsAd = function() {
    const slot = document.getElementById('squadsAdSlot');
    if (!slot) return;
    const ad = window.adsFor('squads')[0];
    slot.innerHTML = ad ? `<div class="mb-2.5">${window.adCardHtml(ad, true)}</div>` : '';
    window.observeAds();
};
window._baseRenderClansList15 = window._baseRenderClansList15 || window.renderClansList;
window.renderClansList = function() { window._baseRenderClansList15(); if (!window._squadAdShown) { window._squadAdShown = 1; window.renderSquadsAd(); } };
window._baseSwitchView15 = window._baseSwitchView15 || window.switchView;
window.switchView = function(v) { if (v === 'clans') window._squadAdShown = 0; window._baseSwitchView15(v); };

window.renderAdSlots = function() {
    window._squadAdShown = 0;
    const vis = (id) => { const el = document.getElementById(id); return el && !el.classList.contains('hidden'); };
    if (vis('view-fyp')) window.renderFypFeed();
    if (vis('view-news')) window.renderNews();
    if (vis('view-clans')) window.renderSquadsAd();
};

// ---------- Admin: create & manage ads ----------
window.renderAdminAds = function() {
    window.adEditing = null;
    const box = document.getElementById('adminBody');
    const ads = [...window.adsList].sort((a, b) => (b.createdAt && b.createdAt.seconds || 0) - (a.createdAt && a.createdAt.seconds || 0));
    const status = (a) => window.adIsLive(a) ? '<span class="text-emerald-400">● Running</span>' : !a.active ? '<span class="text-gray-500">⏸ Paused</span>' : a.endAt && a.endAt <= Date.now() ? '<span class="text-red-400">⏹ Ended</span>' : '<span class="text-amber-400">⏳ Scheduled</span>';
    box.innerHTML = `
        <button onclick="window.editAd(null)" class="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs uppercase shadow-lg"><i class="fa-solid fa-plus mr-1"></i> New ad</button>
        <p class="text-[10px] text-gray-500 text-center px-4">Sell ad spots to shops, brands &amp; creators. They pay you directly (MoMo/cash); you set the ad up here.</p>
        ${ads.length ? ads.map(a => {
            const ctr = a.impressions ? ((a.clicks || 0) / a.impressions * 100).toFixed(1) : '0.0';
            return `<div class="glass-panel rounded-2xl p-3 border border-amber-500/25 space-y-2">
                <div class="flex items-start gap-3">
                    ${a.image ? `<img src="${escapeHTML(a.image)}" class="w-14 h-14 rounded-xl object-cover shrink-0" alt="">` : '<div class="w-14 h-14 rounded-xl bg-gg-900 shrink-0 flex items-center justify-center text-xl">📣</div>'}
                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-black text-white truncate">${escapeHTML(a.title || '')}</p>
                        <p class="text-[10px] text-gray-400 truncate">${escapeHTML(a.sponsor || '')} · ${(a.places || []).join(', ')} · ${(a.cats || []).length ? escapeHTML(a.cats.join(', ')) : 'everyone'}</p>
                        <p class="text-[10px] font-bold">${status(a)} ${a.endAt ? `<span class="text-gray-500">· until ${new Date(a.endAt).toLocaleDateString()}</span>` : ''}</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 text-center text-[10px] bg-gg-950 rounded-xl py-1.5">
                    <div><p class="text-sm font-black text-white">${window.formatCount ? window.formatCount(a.impressions || 0) : (a.impressions || 0)}</p><p class="text-gray-500">Views</p></div>
                    <div><p class="text-sm font-black text-white">${window.formatCount ? window.formatCount(a.clicks || 0) : (a.clicks || 0)}</p><p class="text-gray-500">Taps</p></div>
                    <div><p class="text-sm font-black text-white">${ctr}%</p><p class="text-gray-500">Tap rate</p></div>
                </div>
                <div class="flex gap-2 text-[11px] font-black">
                    <button onclick="window.editAd('${a.id}')" class="flex-1 py-2 rounded-xl bg-gg-900 border border-cyan-500/30 text-cyan-300">Edit</button>
                    <button onclick="window.toggleAdActive('${a.id}')" class="flex-1 py-2 rounded-xl bg-gg-900 border border-amber-500/30 text-amber-300">${a.active ? 'Pause' : 'Resume'}</button>
                    <button onclick="window.deleteAd('${a.id}')" class="flex-1 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">Delete</button>
                </div>
            </div>`;
        }).join('') : '<p class="text-xs text-gray-400 text-center py-8">No ads yet.</p>'}`;
};

window.editAd = function(id) {
    const a = id ? window.adsList.find(x => x.id === id) : { places: ['feed', 'news'], cats: [], cta: 'Learn more', active: true };
    if (!a) return;
    window.adEditing = { id, image: a.image || '' };
    const box = document.getElementById('adminBody');
    const field = 'w-full bg-gg-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400';
    const daysLeft = a.endAt ? Math.max(1, Math.ceil((a.endAt - Date.now()) / 86400000)) : 7;
    box.innerHTML = `
        <button onclick="window.renderAdminAds()" class="text-xs text-gray-400 font-bold mb-1"><i class="fa-solid fa-arrow-left mr-1"></i> Back to ads</button>
        <h3 class="text-sm font-black text-white">${id ? 'Edit ad' : 'New ad'}</h3>
        <label class="block text-[10px] text-gray-400 font-bold">Sponsor / business name<input id="adSponsor" maxlength="40" value="${escapeHTML(a.sponsor || '')}" class="${field} mt-1" placeholder="e.g. Kofi's Game Shop"></label>
        <label class="block text-[10px] text-gray-400 font-bold">Headline<input id="adTitle" maxlength="80" value="${escapeHTML(a.title || '')}" class="${field} mt-1" placeholder="e.g. PS5 games from GH₵150 🎮"></label>
        <label class="block text-[10px] text-gray-400 font-bold">Description (optional)<textarea id="adText" maxlength="220" class="${field} mt-1 h-20 resize-none" placeholder="Short message">${escapeHTML(a.text || '')}</textarea></label>
        <div class="space-y-1">
            <p class="text-[10px] text-gray-400 font-bold">Picture (optional, wide pictures look best)</p>
            <div class="flex items-center gap-3">
                <img id="adImgPreview" src="${escapeHTML(a.image || '')}" class="${a.image ? '' : 'hidden'} w-20 h-14 rounded-lg object-cover" alt="">
                <label class="px-3 py-2 rounded-xl bg-gg-900 border border-cyan-500/30 text-cyan-400 text-xs font-black cursor-pointer"><i class="fa-solid fa-image mr-1"></i> <span id="adImgLabel">${a.image ? 'Change' : 'Choose'} picture</span>
                    <input type="file" accept="image/*" class="hidden" onchange="window.uploadAdImage(this)"></label>
                ${a.image ? `<button onclick="window.adEditing.image=''; document.getElementById('adImgPreview').classList.add('hidden')" class="text-[10px] text-red-400 font-bold">Remove</button>` : ''}
            </div>
        </div>
        <label class="block text-[10px] text-gray-400 font-bold">Link when tapped (website, WhatsApp wa.me/233…, Instagram…)<input id="adLink" value="${escapeHTML(a.link || '')}" class="${field} mt-1" placeholder="https://wa.me/233XXXXXXXXX"></label>
        <label class="block text-[10px] text-gray-400 font-bold">Button text<select id="adCta" class="${field} mt-1">${['Learn more', 'Shop now', 'Chat on WhatsApp', 'Order now', 'Sign up', 'Watch now', 'Download', 'Visit'].map(c => `<option ${c === a.cta ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
        <div><p class="text-[10px] text-gray-400 font-bold mb-1">Show in</p><div class="flex gap-2">
            ${[['feed', 'Feed'], ['news', 'News'], ['squads', 'Squads']].map(([k, l]) => `<label class="flex-1 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gg-900 border border-cyan-500/20 text-xs text-white font-bold"><input type="checkbox" class="ad-place" value="${k}" ${(a.places || []).includes(k) ? 'checked' : ''}> ${l}</label>`).join('')}
        </div></div>
        <div><p class="text-[10px] text-gray-400 font-bold mb-1">Who sees it? (none ticked = everyone)</p><div class="flex flex-wrap gap-1.5">
            ${window.AD_CATS.map(c => `<label class="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gg-900 border border-cyan-500/20 text-[10px] text-gray-200 font-bold"><input type="checkbox" class="ad-cat" value="${c}" ${(a.cats || []).includes(c) ? 'checked' : ''}> ${c}</label>`).join('')}
        </div></div>
        <label class="block text-[10px] text-gray-400 font-bold">Run for how many days (from now)<input id="adDays" type="number" min="1" max="365" value="${daysLeft}" class="${field} mt-1"></label>
        <button id="adSaveBtn" onclick="window.saveAd()" class="w-full py-3 rounded-2xl bg-cyan-400 text-slate-950 font-black text-xs uppercase shadow-lg">${id ? 'Save changes' : 'Publish ad'}</button>`;
};

window.uploadAdImage = async function(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const label = document.getElementById('adImgLabel');
    try {
        label.innerText = 'Uploading…';
        const up = await window.prepareAndUpload(file, (pct) => { label.innerText = `Uploading ${pct}%`; }, 1600, 1600);
        window.adEditing.image = up.url;
        const img = document.getElementById('adImgPreview'); img.src = up.url; img.classList.remove('hidden');
        label.innerText = 'Change picture';
    } catch (e) { label.innerText = 'Choose picture'; showToast('⚠️ Upload failed: ' + e.message); }
};

window.saveAd = async function() {
    if (!window.isAppAdmin) return;
    const v = (id) => document.getElementById(id).value.trim();
    let link = v('adLink');
    if (link && !/^https?:\/\//i.test(link)) link = 'https://' + link;
    const data = {
        sponsor: v('adSponsor'), title: v('adTitle'), text: v('adText'), link, cta: v('adCta'),
        image: window.adEditing.image || '',
        places: [...document.querySelectorAll('.ad-place:checked')].map(x => x.value),
        cats: [...document.querySelectorAll('.ad-cat:checked')].map(x => x.value),
        endAt: Date.now() + Math.max(1, Math.min(365, parseInt(v('adDays')) || 7)) * 86400000
    };
    if (!data.sponsor || !data.title) { showToast('⚠️ Add the sponsor name and a headline.'); return; }
    if (!data.places.length) { showToast('⚠️ Pick where the ad shows.'); return; }
    const btn = document.getElementById('adSaveBtn'); btn.disabled = true; btn.innerText = 'Saving…';
    try {
        const id = window.adEditing.id;
        if (id) await updateDoc(doc(window.db, 'ads', id), data);
        else await addDoc(collection(window.db, 'ads'), { ...data, active: true, startAt: Date.now(), impressions: 0, clicks: 0, createdBy: window.currentUser.uid, createdAt: serverTimestamp() });
        showToast(id ? '✅ Ad updated' : '📣 Ad is live!');
        window.renderAdminAds();
    } catch (e) {
        console.warn(e); btn.disabled = false; btn.innerText = 'Try again';
        showToast("⚠️ Couldn't save. Did you add the new Firebase rules for ads?");
    }
};
window.toggleAdActive = async function(id) {
    const a = window.adsList.find(x => x.id === id); if (!a) return;
    try { await updateDoc(doc(window.db, 'ads', id), { active: !a.active }); } catch (e) { showToast("⚠️ Couldn't change it."); }
};
window.deleteAd = async function(id) {
    const ok = await window.sgConfirm('Delete this ad for good? Its stats will be lost.', { title: 'Delete ad', okText: 'Delete' });
    if (!ok) return;
    try { await deleteDoc(doc(window.db, 'ads', id)); showToast('Ad deleted'); } catch (e) { showToast("⚠️ Couldn't delete."); }
};

setTimeout(() => window.listenToAds(), 1200);

// ======================================================================
// v17: REAL LIVE STREAMING
// lives/{id} = { hostUid, host, title, game, mode:'embed'|'direct', source, embedUrl, status:'live'|'ended',
//               startedAt, lastBeat (ms), hype, endedAt }
//   /chat/{auto}     = { uid, user, text, kind:'msg'|'hype', emoji, createdAt }
//   /viewers/{uid}   = { at (ms), user }               (who's watching right now)
//   /peers/{uid}     = { offer, answer, full, at }       (direct video: host ↔ each viewer)
// Embed = YouTube / Twitch / Kick / Facebook player: unlimited viewers.
// Direct = phone-to-phone video (camera, or screen share on a computer): small audiences.
// ======================================================================
window.LIVE_MAX_DIRECT = 6;
window.LIVE_ICE = { iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }] };
window.livesList = [];
window.canScreenShare = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) && !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

window.liveIsOn = function(l) { return l && l.status === 'live' && (Date.now() - (l.lastBeat || 0)) < 100000; };

window.listenToLives = function() {
    if (!window.db || window.livesUnsub) return;
    window.livesUnsub = onSnapshot(query(collection(window.db, 'lives'), where('status', '==', 'live'), limit(30)), (snap) => {
        const list = [];
        snap.forEach(d => list.push({ ...d.data(), id: d.id }));
        window.livesList = list;
        window.renderLiveNowStrip();
        if (window.activeCategoryFilter === 'LIVE STREAM') window.renderFypFeed();
        // keep the open room up to date (e.g. host ended)
        const open = window.liveRoom && list.find(l => l.id === window.liveRoom.id);
        if (window.liveRoom && !window.liveRoom.isHost && window.liveRoom.data && !open) window.liveEndedForViewer();
        if (open) { window.liveRoom.data = open; window.renderLiveRoomInfo(); }
    }, (e) => console.warn('Lives listener:', e));
};
setInterval(() => window.renderLiveNowStrip && window.renderLiveNowStrip(), 45000);

// Parse a YouTube / Twitch / Kick / Facebook link into an embeddable player
window.parseStreamLink = function(raw) {
    const url = (raw || '').trim();
    if (!url) return null;
    let u; try { u = new URL(/^https?:\/\//i.test(url) ? url : 'https://' + url); } catch (e) { return null; }
    const host = u.hostname.replace(/^www\.|^m\./, '');
    const parent = location.hostname || 'localhost';
    if (host === 'youtu.be') { const id = u.pathname.slice(1).split('/')[0]; if (id) return { source: 'youtube', embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1` }; }
    if (host.endsWith('youtube.com')) {
        let id = u.searchParams.get('v');
        const m = u.pathname.match(/^\/(live|shorts|embed)\/([^/?]+)/);
        if (!id && m) id = m[2];
        if (id) return { source: 'youtube', embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1` };
        return { error: 'For YouTube, paste the link of the live video itself (tap Share on your live → Copy link).' };
    }
    if (host.endsWith('twitch.tv')) {
        const ch = u.pathname.split('/').filter(Boolean)[0];
        if (ch) return { source: 'twitch', embedUrl: `https://player.twitch.tv/?channel=${encodeURIComponent(ch)}&parent=${parent}&muted=true` };
    }
    if (host.endsWith('kick.com')) {
        const ch = u.pathname.split('/').filter(Boolean)[0];
        if (ch) return { source: 'kick', embedUrl: `https://player.kick.com/${encodeURIComponent(ch)}?muted=true&autoplay=true` };
    }
    if (host.endsWith('facebook.com') || host === 'fb.watch') {
        return { source: 'facebook', embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(u.href)}&show_text=false&autoplay=true&mute=true` };
    }
    return { error: 'Use a YouTube, Twitch, Kick or Facebook live link.' };
};

// ---------- Going live (setup screen) ----------
window.openLiveBroadcastModal = function() { window.openGoLive(); };
window.goLiveMode = 'link';
window.openGoLive = function() {
    if (window.needSignIn('go live')) return;
    const mine = window.livesList.find(l => l.hostUid === window.uidNow() && window.liveIsOn(l));
    if (mine) { window.openLiveRoom(mine.id); return; }
    const sel = document.getElementById('goLiveCat');
    sel.innerHTML = window.AD_CATS.map(c => `<option value="${c}">${c}</option>`).join('');
    sel.value = 'FC MOBILE';
    document.getElementById('goLiveModal').classList.remove('hidden');
    window.setGoLiveMode(window.goLiveMode);
};
window.closeGoLive = function() {
    window.stopPreviewStream();
    document.getElementById('goLiveModal').classList.add('hidden');
};
window.stopPreviewStream = function() {
    if (window.livePreviewStream && !(window.liveRoom && window.liveRoom.stream === window.livePreviewStream)) window.livePreviewStream.getTracks().forEach(t => t.stop());
    window.livePreviewStream = null;
};
window.setGoLiveMode = function(mode) {
    window.goLiveMode = mode;
    window.stopPreviewStream();
    const modes = [['link', 'fa-link', 'Stream link'], ['camera', 'fa-camera', 'Camera'], ['screen', 'fa-display', 'Screen']];
    document.getElementById('goLiveModes').innerHTML = modes.map(([k, ic, l]) => `<button onclick="window.setGoLiveMode('${k}')" class="py-3 rounded-xl text-xs font-black ${mode === k ? 'bg-red-600 text-white' : 'bg-gg-900 text-gray-300 border border-red-500/20'}"><i class="fa-solid ${ic} block text-lg mb-1"></i>${l}</button>`).join('');
    const body = document.getElementById('goLiveBody');
    const startBtn = (label) => `<button id="goLiveStartBtn" onclick="window.startGoLive()" class="w-full py-3.5 rounded-2xl bg-red-600 text-white font-black text-sm uppercase shadow-lg shadow-red-600/30"><span class="w-2 h-2 inline-block rounded-full bg-white animate-pulse mr-2"></span>${label}</button>`;
    if (mode === 'link') {
        body.innerHTML = `
            <input id="goLiveLink" placeholder="Paste your YouTube / Twitch / Kick live link" class="w-full bg-gg-900 border border-red-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-400">
            ${startBtn('Go live on Sinless GG')}
            <div class="glass-panel rounded-2xl p-3.5 border border-cyan-500/20 text-xs text-gray-300 space-y-2">
                <p class="font-black text-white">📱 Stream your phone games (best for big audiences)</p>
                <p>1. Open the free <b>YouTube</b>, <b>Twitch</b> or <b>Kick</b> app and start a live of your screen/game.</p>
                <p>2. Copy the live link and paste it above.</p>
                <p>3. Everyone on Sinless GG can watch it here, chat and hype you — no viewer limit.</p>
                <p class="text-[10px] text-gray-500">Tip: on YouTube, mobile live may need some subscribers first. Twitch and Kick let you stream your phone screen straight away.</p>
            </div>`;
    } else if (mode === 'camera') {
        body.innerHTML = `
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-red-500/30"><video id="goLivePreview" autoplay playsinline muted class="w-full h-full object-cover"></video></div>
            <div class="flex gap-2"><button onclick="window.previewCamera(true)" class="flex-1 py-2 rounded-xl bg-gg-900 border border-cyan-500/30 text-cyan-400 text-xs font-black"><i class="fa-solid fa-camera-rotate mr-1"></i> Flip camera</button></div>
            ${startBtn('Go live with camera')}
            <p class="text-[10px] text-gray-500 text-center">Beta · phone-to-phone video, best for up to ${window.LIVE_MAX_DIRECT} viewers. For bigger audiences use a Stream link.</p>`;
        window.previewCamera(false);
    } else {
        body.innerHTML = window.canScreenShare ? `
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-red-500/30 flex items-center justify-center"><video id="goLivePreview" autoplay playsinline muted class="w-full h-full object-contain"></video>
                <button id="pickScreenBtn" onclick="window.previewScreen()" class="absolute px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black"><i class="fa-solid fa-display mr-1"></i> Choose screen / window</button></div>
            ${startBtn('Go live with screen')}
            <p class="text-[10px] text-gray-500 text-center">Beta · phone-to-phone video, best for up to ${window.LIVE_MAX_DIRECT} viewers.</p>`
        : `<div class="glass-panel rounded-2xl p-4 border border-amber-500/30 text-xs text-gray-300 space-y-2">
                <p class="font-black text-amber-300">📵 Phones can't share their screen from a website</p>
                <p>Phone browsers (Chrome, Samsung Internet, Safari) don't allow screen sharing. To stream your phone games:</p>
                <p>1. Start a screen live in the free <b>Twitch</b>, <b>Kick</b> or <b>YouTube</b> app.<br>2. Tap <b>Stream link</b> above and paste your live link.</p>
                <p>On a <b>computer</b>, open Sinless GG in Chrome or Edge and you can share your screen directly from here.</p>
                <button onclick="window.setGoLiveMode('link')" class="w-full py-2.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase mt-1">Use a stream link</button>
            </div>`;
    }
};
window.liveFacing = 'user';
window.previewCamera = async function(flip) {
    if (flip) window.liveFacing = window.liveFacing === 'user' ? 'environment' : 'user';
    try {
        const old = window.livePreviewStream;
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: window.liveFacing, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: true });
        if (old) old.getTracks().forEach(t => t.stop());
        window.livePreviewStream = s;
        const v = document.getElementById('goLivePreview'); if (v) v.srcObject = s;
        if (window.liveRoom && window.liveRoom.isHost && window.liveRoom.mode === 'direct') window.swapHostStream(s);
    } catch (e) { showToast('⚠️ Allow camera & microphone to go live.'); }
};
window.previewScreen = async function() {
    try {
        const s = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: true });
        try { const mic = await navigator.mediaDevices.getUserMedia({ audio: true }); if (!s.getAudioTracks().length) mic.getAudioTracks().forEach(t => s.addTrack(t)); } catch (e) {}
        window.stopPreviewStream();
        window.livePreviewStream = s;
        const v = document.getElementById('goLivePreview'); if (v) v.srcObject = s;
        const b = document.getElementById('pickScreenBtn'); if (b) b.classList.add('hidden');
        s.getVideoTracks()[0].onended = () => { if (window.liveRoom && window.liveRoom.isHost) window.endLive(); };
    } catch (e) { showToast('Screen sharing was cancelled.'); }
};

window.startGoLive = async function() {
    if (window.needSignIn('go live')) return;
    const title = document.getElementById('goLiveTitle').value.trim() || `${window.dnText(window.me())} is live`;
    const game = document.getElementById('goLiveCat').value;
    const data = { hostUid: window.uidNow(), host: window.me(), title, game, status: 'live', hype: 0, startedAt: serverTimestamp(), lastBeat: Date.now() };
    if (window.goLiveMode === 'link') {
        const p = window.parseStreamLink(document.getElementById('goLiveLink').value);
        if (!p) { showToast('⚠️ Paste your live link first.'); return; }
        if (p.error) { showToast('⚠️ ' + p.error); return; }
        Object.assign(data, { mode: 'embed', source: p.source, embedUrl: p.embedUrl });
    } else {
        if (!window.livePreviewStream) { showToast(window.goLiveMode === 'screen' ? 'Choose a screen to share first.' : '⚠️ Allow camera & microphone first.'); return; }
        Object.assign(data, { mode: 'direct', source: window.goLiveMode });
    }
    const btn = document.getElementById('goLiveStartBtn'); if (btn) { btn.disabled = true; btn.innerText = 'Starting…'; }
    try {
        const ref = await addDoc(collection(window.db, 'lives'), window.cleanForCloud(data));
        const stream = data.mode === 'direct' ? window.livePreviewStream : null;
        window.livePreviewStream = null;
        document.getElementById('goLiveModal').classList.add('hidden');
        window.livesList = [{ ...data, id: ref.id, startedAt: null }, ...window.livesList.filter(l => l.id !== ref.id)];
        window.openLiveRoom(ref.id, { isHost: true, stream, data: { ...data, id: ref.id } });
        window.addXP && window.addXP(30, 'live');
        window.bumpChallenge && window.bumpChallenge('live');
        // let followers know
        window.notifyFollowersLive && window.notifyFollowersLive(ref.id, title);
    } catch (e) {
        console.warn(e);
        if (btn) { btn.disabled = false; btn.innerText = 'Try again'; }
        showToast("⚠️ Couldn't go live. Did you add the new Firebase rules?");
    }
};

window.notifyFollowersLive = async function(liveId, title) {
    try {
        const s = await getDocs(query(collection(window.db, 'follows'), where('toUid', '==', window.uidNow()), limit(200)));
        s.forEach(d => window.notify(d.data().fromUid, 'live', { text: `is live: ${title}`.slice(0, 120), postId: 'live:' + liveId }));
    } catch (e) {}
};

// ---------- The live room ----------
window.liveRoom = null;
window.openLiveRoom = async function(id, opts = {}) {
    if (window.liveRoom && window.liveRoom.id !== id) await window.leaveLiveRoom();
    let data = opts.data || window.livesList.find(l => l.id === id);
    if (!data) { try { const s = await getDoc(doc(window.db, 'lives', id)); if (s.exists()) data = { ...s.data(), id }; } catch (e) {} }
    if (!data || data.status !== 'live') { showToast('This live has ended.'); return; }
    const isHost = !!opts.isHost || data.hostUid === window.uidNow();
    window.liveRoom = { id, data, isHost, mode: data.mode, stream: opts.stream || null, peers: {}, unsubs: [], timers: [] };
    window.pauseFeedVideos && window.pauseFeedVideos();
    document.getElementById('liveRoomModal').classList.remove('hidden');
    document.getElementById('liveChatBox').innerHTML = '';
    document.getElementById('liveHypeBar').innerHTML = ['🔥', '⚽', '🏆', '👏', '😂', '💯', '🐐'].map(e => `<button onclick="window.sendHype('${e}')" class="shrink-0 w-10 h-10 rounded-full bg-gg-900 border border-magenta/30 text-lg active:scale-90 transition">${e}</button>`).join('');
    window.renderLiveRoomInfo();
    window.renderLiveStage();
    window.listenLiveChat();
    window.startPresence();
    if (isHost) window.startHosting(); else if (data.mode === 'direct') window.joinDirect();
};
window.renderLiveRoomInfo = function() {
    const r = window.liveRoom; if (!r) return;
    const d = r.data;
    document.getElementById('liveTitleText').innerText = d.title || 'Live';
    document.getElementById('liveHostText').innerHTML = `${window.nameLink(d.host, 'text-cyan-400 font-bold')} · ${escapeHTML(d.game || '')} · 🔥 ${window.formatCount ? window.formatCount(d.hype || 0) : (d.hype || 0)}`;
    document.getElementById('liveHostAvatar').innerHTML = window.avatarHtml(d.host, 'w-9 h-9', 'rounded-full', 'text-[10px]');
    const hc = document.getElementById('liveHostControls');
    hc.classList.toggle('hidden', !r.isHost);
    if (r.isHost) {
        const btn = (on, ic, l) => `<button onclick="${on}" class="shrink-0 px-3 py-2 rounded-xl bg-gg-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-black"><i class="fa-solid ${ic} mr-1"></i>${l}</button>`;
        hc.innerHTML = (r.mode === 'direct' ? btn('window.toggleLiveMic()', 'fa-microphone', r.micOff ? 'Unmute' : 'Mute') + (r.data.source === 'camera' ? btn('window.previewCamera(true)', 'fa-camera-rotate', 'Flip') : '') : '') +
            `<span class="shrink-0 px-2 py-2 text-[11px] text-gray-400 font-bold">${r.mode === 'direct' ? `${Object.keys(r.peers).length}/${window.LIVE_MAX_DIRECT} video viewers` : 'Streaming from ' + escapeHTML(r.data.source || 'link')}</span>` +
            `<button onclick="window.endLive()" class="shrink-0 ml-auto px-3 py-2 rounded-xl bg-red-600 text-white text-[11px] font-black uppercase">End live</button>`;
    }
};
window.renderLiveStage = function(msg) {
    const r = window.liveRoom; const stage = document.getElementById('liveStage');
    if (!r) return;
    if (r.mode === 'embed') {
        if (!stage.querySelector('iframe')) stage.innerHTML = `<iframe src="${escapeHTML(r.data.embedUrl)}" class="w-full h-full border-0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
        return;
    }
    if (r.isHost) {
        stage.innerHTML = `<video id="liveVideo" autoplay playsinline muted class="w-full h-full ${r.data.source === 'screen' ? 'object-contain' : 'object-cover'}"></video>`;
        document.getElementById('liveVideo').srcObject = r.stream;
        return;
    }
    stage.innerHTML = `<video id="liveVideo" autoplay playsinline class="w-full h-full object-contain"></video>
        <div id="liveStageMsg" class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/70 ${msg === '' ? 'hidden' : ''}">
            <i class="fa-solid fa-spinner fa-spin text-2xl text-red-500 mb-2"></i><p class="text-xs text-gray-300">${escapeHTML(msg || 'Connecting to the live…')}</p>
        </div>`;
};
window.setStageMsg = function(text, spinner) {
    const el = document.getElementById('liveStageMsg'); if (!el) return;
    if (!text) { el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    el.innerHTML = `${spinner ? '<i class="fa-solid fa-spinner fa-spin text-2xl text-red-500 mb-2"></i>' : '<i class="fa-solid fa-tower-broadcast text-2xl text-red-500 mb-2"></i>'}<p class="text-xs text-gray-300">${text}</p>`;
};

// chat + hype
window.listenLiveChat = function() {
    const r = window.liveRoom;
    const unsub = onSnapshot(query(collection(window.db, 'lives', r.id, 'chat'), orderBy('createdAt', 'desc'), limit(80)), (snap) => {
        const msgs = []; snap.forEach(d => msgs.unshift({ id: d.id, ...d.data() }));
        const box = document.getElementById('liveChatBox');
        const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
        box.innerHTML = msgs.filter(m => !window.isBlocked(m.user)).map(m => m.kind === 'hype'
            ? `<p class="text-xs text-gray-400"><span class="text-base">${escapeHTML(m.emoji)}</span> ${window.nameLink(m.user, 'font-bold text-magenta')} sent hype</p>`
            : `<p class="text-[13px] text-gray-200 leading-snug break-words">${window.nameLink(m.user, `font-bold ${m.uid === r.data.hostUid ? 'text-red-400' : 'text-cyan-300'}`)}${m.uid === r.data.hostUid ? ' <span class="text-[9px] px-1 rounded bg-red-600 text-white font-black">HOST</span>' : ''} ${formatMentions(m.text || '')}</p>`).join('');
        if (atBottom) box.scrollTop = box.scrollHeight;
        // float new hype
        const seen = r.seenHype || (r.seenHype = new Set());
        msgs.filter(m => m.kind === 'hype' && !seen.has(m.id)).forEach(m => { seen.add(m.id); if (r.chatReady) window.floatHype(m.emoji); });
        r.chatReady = true;
    }, () => {});
    r.unsubs.push(unsub);
};
window.sendLiveChat = async function() {
    const r = window.liveRoom; if (!r) return;
    if (window.needSignIn('chat')) return;
    const i = document.getElementById('liveChatInput');
    const text = i.value.trim(); if (!text) return;
    i.value = '';
    try { await addDoc(collection(window.db, 'lives', r.id, 'chat'), { uid: window.uidNow(), user: window.me(), text: text.slice(0, 200), kind: 'msg', createdAt: serverTimestamp() }); }
    catch (e) { showToast('⚠️ Message not sent.'); }
};
window.sendHype = async function(emoji) {
    const r = window.liveRoom; if (!r) return;
    window.floatHype(emoji);
    if (!window.isSignedIn() || window.isBanned) return;
    const now = Date.now();
    if (r.lastHype && now - r.lastHype < 1500) return;   // no spamming the chat
    r.lastHype = now;
    try {
        await addDoc(collection(window.db, 'lives', r.id, 'chat'), { uid: window.uidNow(), user: window.me(), kind: 'hype', emoji, text: '', createdAt: serverTimestamp() });
        await updateDoc(doc(window.db, 'lives', r.id), { hype: increment(1) });
    } catch (e) {}
};
window.floatHype = function(emoji) {
    const layer = document.getElementById('liveHypeLayer'); if (!layer) return;
    const el = document.createElement('span');
    el.textContent = emoji;
    el.style.cssText = `position:absolute;bottom:8px;right:${12 + Math.random() * 60}px;font-size:${22 + Math.random() * 14}px;transition:transform 2.2s ease-out, opacity 2.2s ease-out;`;
    layer.appendChild(el);
    requestAnimationFrame(() => { el.style.transform = `translate(${(Math.random() - 0.5) * 80}px, -${160 + Math.random() * 100}px)`; el.style.opacity = '0'; });
    setTimeout(() => el.remove(), 2300);
};
window.tipLive = function() {
    window.sgDialog({ title: '💰 Tips coming soon', message: 'Tipping on lives is coming soon with GG Coins 🪙. For now, show love with hype 🔥⚽🏆. The host sees every one!', okText: 'Send hype 🔥', cancelText: 'Close' })
        .then(ok => { if (ok) window.sendHype('🔥'); });
};
window.shareLive = async function() {
    const r = window.liveRoom; if (!r) return;
    const link = `${location.origin}${location.pathname}#live=${r.id}`;
    try { if (navigator.share) { await navigator.share({ title: r.data.title, text: `🔴 ${window.dnText(r.data.host)} is live on Sinless GG`, url: link }); return; } } catch (e) { return; }
    try { await navigator.clipboard.writeText(link); showToast('🔗 Live link copied'); } catch (e) { showToast(link); }
};

// viewers count
window.startPresence = function() {
    const r = window.liveRoom;
    const beat = () => {
        if (!window.liveRoom || window.liveRoom.id !== r.id) return;
        if (window.isSignedIn()) setDoc(doc(window.db, 'lives', r.id, 'viewers', window.uidNow()), { at: Date.now(), user: window.me() }).catch(() => {});
        if (r.isHost) updateDoc(doc(window.db, 'lives', r.id), { lastBeat: Date.now() }).catch(() => {});
    };
    beat();
    r.timers.push(setInterval(beat, 30000));
    r.unsubs.push(onSnapshot(collection(window.db, 'lives', r.id, 'viewers'), (snap) => {
        let n = 0; const cut = Date.now() - 75000;
        snap.forEach(d => { if ((d.data().at || 0) > cut && d.id !== r.data.hostUid) n++; });
        document.getElementById('liveViewerCount').innerHTML = `<i class="fa-solid fa-eye mr-1"></i>${n}`;
    }, () => {}));
};

// ---------- Direct video: host side ----------
window.startHosting = function() {
    const r = window.liveRoom;
    if (r.mode !== 'direct') return;
    if (!r.stream) { showToast('Camera stopped. Ending live.'); window.endLive(); return; }
    r.unsubs.push(onSnapshot(collection(window.db, 'lives', r.id, 'peers'), (snap) => {
        snap.docChanges().forEach(ch => {
            const vid = ch.doc.id, d = ch.doc.data();
            if (ch.type === 'removed') { window.dropPeer(vid); return; }
            if (d.want && !r.peers[vid] && !d.offer) window.hostOffer(vid);
            else if (d.answer && r.peers[vid] && !r.peers[vid].answered) {
                r.peers[vid].answered = true;
                r.peers[vid].pc.setRemoteDescription(d.answer).catch(e => console.warn('answer', e));
            }
        });
        window.renderLiveRoomInfo();
    }, () => {}));
};
window.waitIce = (pc) => new Promise(res => {
    if (pc.iceGatheringState === 'complete') return res();
    const t = setTimeout(res, 2500);
    pc.addEventListener('icegatheringstatechange', () => { if (pc.iceGatheringState === 'complete') { clearTimeout(t); res(); } });
});
window.hostOffer = async function(vid) {
    const r = window.liveRoom;
    const ref = doc(window.db, 'lives', r.id, 'peers', vid);
    if (Object.keys(r.peers).length >= window.LIVE_MAX_DIRECT) { setDoc(ref, { full: true, at: Date.now() }, { merge: true }).catch(() => {}); return; }
    const pc = new RTCPeerConnection(window.LIVE_ICE);
    r.peers[vid] = { pc };
    r.stream.getTracks().forEach(t => pc.addTrack(t, r.stream));
    pc.onconnectionstatechange = () => { if (['failed', 'closed'].includes(pc.connectionState)) window.dropPeer(vid, true); };
    await pc.setLocalDescription(await pc.createOffer());
    await window.waitIce(pc);
    await setDoc(ref, { offer: { type: pc.localDescription.type, sdp: pc.localDescription.sdp }, at: Date.now() }, { merge: true }).catch(() => {});
};
window.dropPeer = function(vid, clearDoc) {
    const r = window.liveRoom; if (!r || !r.peers[vid]) return;
    try { r.peers[vid].pc.close(); } catch (e) {}
    delete r.peers[vid];
    if (clearDoc) deleteDoc(doc(window.db, 'lives', r.id, 'peers', vid)).catch(() => {});
    window.renderLiveRoomInfo();
};
window.swapHostStream = function(s) {
    const r = window.liveRoom; if (!r) return;
    const old = r.stream; r.stream = s;
    Object.values(r.peers).forEach(({ pc }) => pc.getSenders().forEach(sender => {
        const t = s.getTracks().find(x => sender.track && x.kind === sender.track.kind);
        if (t) sender.replaceTrack(t).catch(() => {});
    }));
    if (old && old !== s) old.getTracks().forEach(t => t.stop());
    const v = document.getElementById('liveVideo'); if (v) v.srcObject = s;
};
window.toggleLiveMic = function() {
    const r = window.liveRoom; if (!r || !r.stream) return;
    r.micOff = !r.micOff;
    r.stream.getAudioTracks().forEach(t => { t.enabled = !r.micOff; });
    window.renderLiveRoomInfo();
};

// ---------- Direct video: viewer side ----------
window.joinDirect = async function() {
    const r = window.liveRoom;
    if (!window.isSignedIn()) { window.renderLiveStage('Sign in to watch camera/screen lives (you can still read the chat).'); window.setStageMsg('🔐 Sign in to watch this live video.'); return; }
    window.renderLiveStage();
    const ref = doc(window.db, 'lives', r.id, 'peers', window.uidNow());
    const pc = new RTCPeerConnection(window.LIVE_ICE);
    r.viewerPc = pc;
    pc.ontrack = (ev) => { const v = document.getElementById('liveVideo'); if (v && v.srcObject !== ev.streams[0]) { v.srcObject = ev.streams[0]; v.play().catch(() => { window.setStageMsg('Tap to play ▶️'); document.getElementById('liveStageMsg').onclick = () => { v.play(); window.setStageMsg(''); }; }); } window.setStageMsg(''); };
    pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'failed') window.setStageMsg("Couldn't connect to the host's video on this network. Try Wi-Fi, or ask the host to use a Stream link.");
        if (pc.connectionState === 'disconnected') window.setStageMsg('Reconnecting…', true);
        if (pc.connectionState === 'connected') window.setStageMsg('');
    };
    try { await deleteDoc(ref); } catch (e) {}
    await setDoc(ref, { want: true, user: window.me(), at: Date.now() }).catch(() => window.setStageMsg("Couldn't join. Check your connection."));
    let answered = false;
    r.unsubs.push(onSnapshot(ref, async (s) => {
        const d = s.exists() ? s.data() : null;
        if (!d) return;
        if (d.full) { window.setStageMsg(`This camera live is full (${window.LIVE_MAX_DIRECT} viewers). You can still chat and hype! 🔥`); return; }
        if (d.offer && !answered) {
            answered = true;
            try {
                await pc.setRemoteDescription(d.offer);
                await pc.setLocalDescription(await pc.createAnswer());
                await window.waitIce(pc);
                await setDoc(ref, { answer: { type: pc.localDescription.type, sdp: pc.localDescription.sdp } }, { merge: true });
            } catch (e) { console.warn(e); window.setStageMsg("Couldn't connect to the video."); }
        }
    }, () => {}));
    setTimeout(() => { if (window.liveRoom === r && !answered) window.setStageMsg('Waiting for the host to connect you…', true); }, 6000);
};

window.liveEndedForViewer = function() {
    if (!window.liveRoom) return;
    window.liveRoom.data = { ...window.liveRoom.data, status: 'ended' };
    const stage = document.getElementById('liveStage');
    stage.innerHTML = `<div class="text-center p-6"><p class="text-3xl mb-2">📴</p><p class="text-sm font-black text-white">This live has ended</p><p class="text-xs text-gray-400 mt-1">Thanks for watching!</p></div>`;
};

// ---------- Leaving / ending ----------
window.leaveLiveRoom = async function() {
    const r = window.liveRoom; if (!r) return;
    window.liveRoom = null;
    r.unsubs.forEach(u => { try { u(); } catch (e) {} });
    r.timers.forEach(t => clearInterval(t));
    if (r.viewerPc) { try { r.viewerPc.close(); } catch (e) {} deleteDoc(doc(window.db, 'lives', r.id, 'peers', window.uidNow())).catch(() => {}); }
    if (window.isSignedIn()) deleteDoc(doc(window.db, 'lives', r.id, 'viewers', window.uidNow())).catch(() => {});
    document.getElementById('liveStage').innerHTML = '';
    document.getElementById('liveRoomModal').classList.add('hidden');
    if (r.isHost) {
        Object.values(r.peers).forEach(({ pc }) => { try { pc.close(); } catch (e) {} });
        if (r.stream) r.stream.getTracks().forEach(t => t.stop());
    }
};
window.closeLiveRoom = async function() {
    const r = window.liveRoom;
    if (r && r.isHost && r.data.status === 'live') {
        const ok = await window.sgConfirm('End your live for everyone?', { title: 'End live', okText: 'End live', danger: true });
        if (!ok) return;
        return window.endLive();
    }
    window.leaveLiveRoom();
};
window.endLive = async function() {
    const r = window.liveRoom; if (!r) return;
    try { await updateDoc(doc(window.db, 'lives', r.id), { status: 'ended', endedAt: Date.now() }); } catch (e) {}
    await window.leaveLiveRoom();
    showToast('📴 Live ended. GG!');
};
window.addEventListener('pagehide', () => {
    const r = window.liveRoom;
    if (r && r.isHost) updateDoc(doc(window.db, 'lives', r.id), { status: 'ended', endedAt: Date.now() }).catch(() => {});
});

// ---------- Where lives show up ----------
window.activeLives = function() { return window.livesList.filter(l => window.liveIsOn(l) && !window.isBlocked(l.host)); };
window.renderLiveNowStrip = function() {
    const el = document.getElementById('liveNowStrip'); if (!el) return;
    const lives = window.activeLives();
    if (!lives.length) { el.className = 'hidden'; el.innerHTML = ''; return; }
    el.className = 'glass-panel p-2.5 rounded-2xl flex space-x-3 overflow-x-auto scrollbar-none items-center border border-red-500/40 shadow-lg';
    el.innerHTML = `<div class="shrink-0 text-[10px] font-black text-red-400 uppercase leading-tight pr-1"><span class="w-2 h-2 inline-block rounded-full bg-red-500 animate-pulse mr-1"></span>Live<br>now</div>` +
        lives.map(l => `<button onclick="window.openLiveRoom('${l.id}')" class="shrink-0 flex flex-col items-center space-y-1 w-16">
            <div class="relative p-0.5 rounded-full bg-gradient-to-tr from-red-500 to-magenta">${window.avatarHtml(l.host, 'w-12 h-12', 'rounded-full', 'text-xs').replace(/onclick="[^"]*"/, '')}
                <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 rounded bg-red-600 text-white text-[7px] font-black">LIVE</span></div>
            <span class="text-[9px] text-gray-300 font-bold truncate w-full text-center">${escapeHTML(window.dnText(l.host))}</span>
        </button>`).join('');
};
window.liveCardHtml = function(l) {
    return `<div onclick="window.openLiveRoom('${l.id}')" class="glass-panel rounded-2xl overflow-hidden border border-red-500/40 shadow-lg cursor-pointer">
        <div class="relative aspect-video bg-gradient-to-br from-red-950 via-gg-900 to-magenta/30 flex items-center justify-center">
            <i class="fa-solid ${l.mode === 'embed' ? 'fa-tv' : l.source === 'screen' ? 'fa-display' : 'fa-video'} text-4xl text-white/30"></i>
            <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black">● LIVE</span>
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">🔥 ${l.hype || 0}</span>
            <span class="absolute bottom-2 right-2 px-3 py-1.5 rounded-xl bg-white text-slate-950 text-[11px] font-black">Watch ▶</span>
        </div>
        <div class="p-3 flex items-center gap-2.5">${window.avatarHtml(l.host, 'w-9 h-9', 'rounded-full', 'text-[10px]').replace(/onclick="[^"]*"/, '')}
            <div class="min-w-0"><p class="text-sm font-black text-white truncate">${escapeHTML(l.title || 'Live')}</p><p class="text-[10px] text-gray-400 truncate">${escapeHTML(window.dnText(l.host))} · ${escapeHTML(l.game || '')}</p></div></div>
    </div>`;
};
// Live filter in the feed shows live streams first
window._baseRenderFypFeed17 = window._baseRenderFypFeed17 || window.renderFypFeed;
window.renderFypFeed = function() {
    window._baseRenderFypFeed17();
    const box = document.getElementById('fypFeedContainer');
    if (!box || window.activeCategoryFilter !== 'LIVE STREAM') return;
    const lives = window.activeLives();
    const goLiveBtn = `<button onclick="window.openGoLive()" class="w-full py-3 rounded-2xl bg-red-600 text-white font-black text-xs uppercase shadow-lg"><span class="w-2 h-2 inline-block rounded-full bg-white animate-pulse mr-2"></span>Go live</button>`;
    if (!lives.length) {
        box.innerHTML = `<div class="glass-panel p-8 rounded-2xl text-center space-y-3"><p class="text-3xl">📡</p><p class="text-xs font-bold text-white">Nobody is live right now</p><p class="text-[10px] text-gray-400">Be the first! Stream with a YouTube/Twitch/Kick link, your camera, or your PC screen.</p>${goLiveBtn}</div>`;
        return;
    }
    const posts = [...box.children].filter(el => el.querySelector && el.querySelector('[data-post-id]'));
    box.innerHTML = goLiveBtn + lives.map(window.liveCardHtml).join('');
    posts.forEach(p => box.appendChild(p));
};
// #live=ID links open the live
window.openLiveFromHash = function() {
    const m = location.hash.match(/live=([\w-]+)/);
    if (m) { setTimeout(() => window.openLiveRoom(m[1]), 1500); }
};
setTimeout(() => { window.listenToLives(); window.openLiveFromHash(); }, 1200);
// tapping a "live" notification opens the live
window._baseOpenNotification17 = window._baseOpenNotification17 || window.openNotification;
window.openNotification = function(id) {
    const n = (window.notifList || []).find(x => x.id === id);
    if (n && String(n.postId || '').startsWith('live:')) {
        window.closeNotifications();
        n.read = true; updateDoc(doc(window.db, 'notifications', n.id), { read: true }).catch(() => {});
        window.openLiveRoom(n.postId.slice(5));
        return;
    }
    return window._baseOpenNotification17(id);
};
window._baseNotifIcon17 = window._baseNotifIcon17 || window.notifIcon;
window.notifIcon = function(type) { return type === 'live' ? 'fa-tower-broadcast text-red-400' : window._baseNotifIcon17(type); };

// ======================================================================
// v17: MATCH LOUNGES (live chat for every real match)
// lounges/{matchId}/messages/{auto} = { uid, user, text, createdAt }
// ======================================================================
window.findMatch = function(id) {
    return (window.liveMatchesCache || []).find(m => m.id === id) || (window.predMatches || []).find(m => m.id === id) || null;
};
window.matchScoreHtml = function(m) {
    if (!m) return '';
    const live = m.state === 'in';
    const mid = m.state === 'pre'
        ? `<p class="text-lg font-black text-white">${new Date(m.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p><p class="text-[9px] text-cyan-400 font-black">${new Date(m.date).toDateString() === new Date().toDateString() ? 'TODAY' : new Date(m.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</p>`
        : `<p class="text-2xl font-black text-white">${escapeHTML(m.home.score ?? '')} - ${escapeHTML(m.away.score ?? '')}</p><p class="text-[9px] font-black ${live ? 'text-red-400' : 'text-gray-400'}">${live ? '● ' + escapeHTML(m.clock || m.detail || 'LIVE') : 'FULL TIME'}</p>`;
    const team = (t) => `<div class="flex flex-col items-center w-20">${t.logo ? `<img src="${t.logo}" class="w-9 h-9 object-contain" alt="">` : '<span class="w-9 h-9"></span>'}<p class="text-xs font-black text-white mt-1">${escapeHTML(t.abbr)}</p></div>`;
    return `<div class="glass-panel rounded-2xl p-3 border ${live ? 'border-red-500/40' : 'border-cyan-500/20'} flex items-center justify-between">${team(m.home)}<div class="text-center">${mid}<p class="text-[8px] text-gray-500 font-bold uppercase mt-0.5">${escapeHTML(m.leagueShort || '')}</p></div>${team(m.away)}</div>`;
};
window.lounge = null;
window.openLounge = function(matchId) {
    const m = window.findMatch(matchId);
    if (!m) { showToast('Match not found.'); return; }
    window.closeLounge();
    window.lounge = { id: matchId };
    window.pauseFeedVideos && window.pauseFeedVideos();
    document.getElementById('loungeModal').classList.remove('hidden');
    document.getElementById('loungeSub').innerText = `${m.home.abbr} vs ${m.away.abbr} · ${m.leagueShort || ''}`;
    document.getElementById('loungeScore').innerHTML = window.matchScoreHtml(m);
    document.getElementById('loungeQuick').innerHTML = ['⚽ GOAAAL!', '🔥🔥🔥', '😱', '🧤 What a save!', '🟥 Red card!', '🤬 Ref!', '🐐'].map(t => `<button onclick="window.sendLounge('${t}')" class="shrink-0 px-3 py-1.5 rounded-full bg-gg-900 border border-cyan-500/25 text-xs text-white font-bold mb-2">${t}</button>`).join('');
    const box = document.getElementById('loungeMsgs');
    box.innerHTML = `<p class="text-xs text-gray-500 text-center py-6">Loading chat…</p>`;
    window.lounge.unsub = onSnapshot(query(collection(window.db, 'lounges', matchId, 'messages'), orderBy('createdAt', 'desc'), limit(100)), (snap) => {
        const msgs = []; snap.forEach(d => msgs.unshift({ id: d.id, ...d.data() }));
        const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
        box.innerHTML = msgs.length ? msgs.filter(x => !window.isBlocked(x.user)).map(x => `<div class="flex gap-2 items-start">${window.avatarHtml(x.user, 'w-7 h-7', 'rounded-full', 'text-[9px]')}
            <div class="min-w-0"><p class="text-[13px] text-gray-200 leading-snug break-words">${window.nameLink(x.user, `font-bold ${x.uid === window.uidNow() ? 'text-magenta' : 'text-cyan-300'}`)} <span class="text-[9px] text-gray-500">${x.createdAt ? window.timeAgo(window.postTimeValue(x)) : ''}</span><br>${formatMentions(x.text || '')}</p></div></div>`).join('')
            : `<div class="text-center py-10"><p class="text-3xl">🏟️</p><p class="text-sm font-bold text-white mt-1">The lounge is open</p><p class="text-xs text-gray-400">Be the first to talk about this match.</p></div>`;
        if (atBottom || !window.lounge.loaded) box.scrollTop = box.scrollHeight;
        window.lounge.loaded = true;
    }, () => { box.innerHTML = `<p class="text-xs text-gray-400 text-center py-6">Couldn't load the lounge.</p>`; });
    window.lounge.timer = setInterval(async () => {
        const cur = window.findMatch(matchId);
        if (cur && cur.state === 'in') await window.loadLiveMatches();
        const fresh = window.findMatch(matchId);
        if (fresh && window.lounge && window.lounge.id === matchId) document.getElementById('loungeScore').innerHTML = window.matchScoreHtml(fresh);
    }, 30000);
};
window.closeLounge = function() {
    if (window.lounge) { try { window.lounge.unsub && window.lounge.unsub(); } catch (e) {} clearInterval(window.lounge.timer); }
    window.lounge = null;
    document.getElementById('loungeModal').classList.add('hidden');
};
window.sendLounge = async function(quick) {
    if (!window.lounge) return;
    if (window.needSignIn('chat in the lounge')) return;
    const i = document.getElementById('loungeInput');
    const text = (typeof quick === 'string' ? quick : i.value).trim();
    if (!text) return;
    if (typeof quick !== 'string') i.value = '';
    const now = Date.now();
    if (window._lastLounge && now - window._lastLounge < 1200) return;
    window._lastLounge = now;
    try {
        await addDoc(collection(window.db, 'lounges', window.lounge.id, 'messages'), { uid: window.uidNow(), user: window.me(), text: text.slice(0, 200), createdAt: serverTimestamp() });
        window.addXP && window.addXP(1, 'lounge');
        window.bumpChallenge && window.bumpChallenge('lounge');
    } catch (e) { showToast('⚠️ Message not sent.'); }
};
window.predictFromLounge = function() {
    const id = window.lounge && window.lounge.id;
    window.closeLounge();
    window.switchView('predict');
    window.setPredictTab('matches', id);
};

// ======================================================================
// v17: SCORE PREDICTOR LEAGUE
// predictions/{matchId}_{uid} = { uid, user, matchId, league, home, away, kickoff, week, h, a, updatedAt }
// Points are worked out from the real results: 3 = exact score, 1 = right winner/draw.
// A pick only counts if it was saved before kick-off.
// ======================================================================
window.predMatches = [];
window.predTab = 'matches';
window.weekKey = function(ms) {
    const d = new Date(ms); const day = (d.getUTCDay() + 6) % 7;     // Monday = 0
    const mon = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day));
    return mon.toISOString().slice(0, 10);                             // the Monday's date
};
window.weekRange = function(key) { const s = new Date(key + 'T00:00:00Z'); const e = new Date(s.getTime() + 6 * 86400000); return [s, e]; };
window.ymd = (d) => d.toISOString().slice(0, 10).replace(/-/g, '');

window.fetchMatchesRange = async function(from, to) {
    const key = window.ymd(from) + '-' + window.ymd(to);
    window._rangeCache = window._rangeCache || {};
    const c = window._rangeCache[key];
    if (c && Date.now() - c.at < 5 * 60000) return c.list;
    const leagues = window.liveLeagues.filter(l => l.id !== 'all');
    const res = await Promise.all(leagues.map(async lg => {
        try {
            const r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg.id}/scoreboard?dates=${key}&limit=200`);
            const j = await r.json();
            return (j.events || []).map(e => {
                const comp = (e.competitions || [])[0] || {};
                const teams = comp.competitors || [];
                const home = teams.find(t => t.homeAway === 'home') || teams[0] || {};
                const away = teams.find(t => t.homeAway === 'away') || teams[1] || {};
                const st = (e.status && e.status.type) || {};
                return { id: e.id, league: lg.id, leagueShort: lg.short, date: e.date, state: st.state, detail: st.shortDetail || '', clock: (e.status && e.status.displayClock) || '',
                    home: { abbr: (home.team && home.team.abbreviation) || '', name: (home.team && (home.team.shortDisplayName || home.team.displayName)) || '', logo: (home.team && home.team.logo) || '', score: home.score },
                    away: { abbr: (away.team && away.team.abbreviation) || '', name: (away.team && (away.team.shortDisplayName || away.team.displayName)) || '', logo: (away.team && away.team.logo) || '', score: away.score } };
            });
        } catch (e) { return []; }
    }));
    const list = res.flat().sort((a, b) => new Date(a.date) - new Date(b.date));
    window._rangeCache[key] = { at: Date.now(), list };
    return list;
};

window.setPredictTab = function(tab, focusId) {
    window.predTab = tab;
    document.querySelectorAll('[data-predtab]').forEach(b => {
        b.className = `flex-1 py-2 text-xs font-black border-b-2 ${b.dataset.predtab === tab ? 'text-white border-emerald-400' : 'text-gray-500 border-transparent'}`;
    });
    ({ matches: window.renderPredictMatches, mine: window.renderMyPicks, table: window.renderPredictTable })[tab](focusId);
};
window.myPicks = {};
window.loadMyPicks = async function() {
    if (!window.isSignedIn()) return {};
    try {
        const s = await getDocs(query(collection(window.db, 'predictions'), where('uid', '==', window.uidNow()), limit(400)));
        window.myPicks = {}; s.forEach(d => { const x = d.data(); window.myPicks[x.matchId] = x; });
    } catch (e) {}
    return window.myPicks;
};

window.renderPredictMatches = async function(focusId) {
    const box = document.getElementById('predictBody');
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-8"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Loading fixtures…</p>`;
    const now = new Date();
    const [list] = await Promise.all([window.fetchMatchesRange(new Date(now.getTime() - 86400000), new Date(now.getTime() + 7 * 86400000)), window.loadMyPicks()]);
    if (window.predTab !== 'matches') return;
    window.predMatches = list;
    const show = list.filter(m => m.state !== 'post' || (Date.now() - new Date(m.date)) < 6 * 3600000);
    if (!show.length) { box.innerHTML = `<div class="glass-panel p-8 rounded-2xl text-center text-xs text-gray-400">No fixtures this week. Check back soon!</div>`; return; }
    let lastDay = '';
    box.innerHTML = show.map(m => {
        const day = new Date(m.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
        const head = day !== lastDay ? `<p class="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1 pt-2">${day}</p>` : '';
        lastDay = day;
        const pick = window.myPicks[m.id];
        const locked = m.state !== 'pre' || Date.now() >= new Date(m.date).getTime();
        const team = (t, side) => `<div class="flex items-center gap-2 ${side === 'away' ? 'flex-row-reverse text-right' : ''} min-w-0 flex-1">${t.logo ? `<img src="${t.logo}" class="w-7 h-7 object-contain shrink-0" alt="">` : ''}<span class="text-xs font-bold text-white truncate">${escapeHTML(t.name || t.abbr)}</span></div>`;
        const inp = (side, v) => `<input id="pk_${m.id}_${side}" type="number" inputmode="numeric" min="0" max="20" value="${v ?? ''}" ${locked ? 'disabled' : ''} class="w-11 h-11 text-center text-lg font-black rounded-xl bg-gg-950 border ${locked ? 'border-gray-700 text-gray-500' : 'border-emerald-500/40 text-white'} focus:outline-none focus:border-emerald-400">`;
        const result = m.state !== 'pre' ? `<span class="text-[10px] font-black ${m.state === 'in' ? 'text-red-400' : 'text-gray-400'}">${m.state === 'in' ? '● ' : 'FT '}${escapeHTML(m.home.score ?? '')}-${escapeHTML(m.away.score ?? '')}</span>` : `<span class="text-[10px] text-gray-500 font-bold">${new Date(m.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>`;
        return `${head}<div id="pm_${m.id}" class="glass-panel rounded-2xl p-3 border ${focusId === m.id ? 'border-emerald-400' : 'border-cyan-500/15'} space-y-2">
            <div class="flex items-center justify-between"><span class="text-[9px] font-black text-gray-500 uppercase">${escapeHTML(m.leagueShort)}</span>${result}</div>
            <div class="flex items-center gap-2">${team(m.home, 'home')}${inp('h', pick && pick.h)}<span class="text-gray-500 font-black">:</span>${inp('a', pick && pick.a)}${team(m.away, 'away')}</div>
            <div class="flex gap-2">
                ${locked ? `<span class="flex-1 py-2 text-center text-[11px] font-bold text-gray-500">${pick ? '🔒 Your pick: ' + pick.h + '-' + pick.a : '🔒 Predictions closed'}</span>`
                    : `<button onclick="window.savePick('${m.id}')" class="flex-1 py-2 rounded-xl ${pick ? 'bg-gg-900 border border-emerald-500/40 text-emerald-400' : 'bg-emerald-500 text-slate-950'} text-[11px] font-black uppercase">${pick ? '✓ Saved · Update' : 'Save pick'}</button>`}
                <button onclick="window.openLounge('${m.id}')" class="px-3 py-2 rounded-xl bg-gg-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-black">💬 Lounge</button>
            </div>
        </div>`;
    }).join('');
    if (focusId) { const el = document.getElementById('pm_' + focusId); if (el) el.scrollIntoView({ block: 'center' }); }
};

window.savePick = async function(matchId) {
    if (window.needSignIn('make predictions')) return;
    const m = window.findMatch(matchId); if (!m) return;
    if (Date.now() >= new Date(m.date).getTime()) { showToast('🔒 This match has started.'); return; }
    const h = parseInt(document.getElementById(`pk_${matchId}_h`).value), a = parseInt(document.getElementById(`pk_${matchId}_a`).value);
    if (isNaN(h) || isNaN(a) || h < 0 || a < 0 || h > 20 || a > 20) { showToast('⚠️ Enter a score for both teams.'); return; }
    const isNew = !window.myPicks[matchId];
    const data = { uid: window.uidNow(), user: window.me(), matchId, league: m.league, home: m.home.abbr, away: m.away.abbr, homeName: m.home.name || m.home.abbr, awayName: m.away.name || m.away.abbr,
        kickoff: new Date(m.date).getTime(), week: window.weekKey(new Date(m.date).getTime()), h, a, updatedAt: serverTimestamp() };
    try {
        await setDoc(doc(window.db, 'predictions', `${matchId}_${window.uidNow()}`), data);
        window.myPicks[matchId] = { ...data, updatedAt: { seconds: Date.now() / 1000 } };
        showToast(`🎯 Saved: ${m.home.abbr} ${h}-${a} ${m.away.abbr}`);
        if (isNew) { window.addXP && window.addXP(3, 'predict'); window.bumpChallenge && window.bumpChallenge('predict'); }
        window.renderPredictMatches(matchId);
    } catch (e) { showToast("⚠️ Couldn't save. Did you add the new Firebase rules?"); }
};

window.pickPoints = function(p, m) {
    if (!m || m.state !== 'post') return null;
    const savedAt = window.postTimeValue({ createdAt: p.updatedAt });
    if (savedAt && savedAt >= new Date(m.date).getTime() + 60000) return 0;     // saved after kick-off: doesn't count
    const H = parseInt(m.home.score), A = parseInt(m.away.score);
    if (isNaN(H) || isNaN(A)) return null;
    if (p.h === H && p.a === A) return 3;
    return Math.sign(p.h - p.a) === Math.sign(H - A) ? 1 : 0;
};

window.renderMyPicks = async function() {
    const box = document.getElementById('predictBody');
    if (!window.isSignedIn()) { box.innerHTML = `<div class="glass-panel p-8 rounded-2xl text-center text-xs text-gray-400">Sign in to make predictions.</div>`; return; }
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-8"><i class="fa-solid fa-spinner fa-spin"></i></p>`;
    const wk = window.weekKey(Date.now());
    const [s] = window.weekRange(wk);
    const e = new Date(s.getTime() + 13 * 86400000);
    await window.loadMyPicks();
    const results = await window.fetchMatchesRange(s, e);
    if (window.predTab !== 'mine') return;
    const byId = Object.fromEntries(results.map(m => [m.id, m]));
    const picks = Object.values(window.myPicks).filter(p => p.kickoff >= s.getTime()).sort((a, b) => a.kickoff - b.kickoff);
    let total = 0, count = 0;
    const row = (p) => {
        const m = byId[p.matchId];
        const pts = window.pickPoints(p, m);
        const badge = pts === 3 ? '<span class="text-emerald-400 font-black">+3 🎯</span>' : pts === 1 ? '<span class="text-cyan-400 font-black">+1</span>' : pts === 0 ? '<span class="text-gray-500 font-black">0</span>' : '<span class="text-gray-500">⏳</span>';
        return `<div class="glass-panel rounded-xl p-3 flex items-center justify-between text-xs border border-cyan-500/15">
            <div class="min-w-0"><p class="font-bold text-white truncate">${escapeHTML(p.homeName || p.home)} vs ${escapeHTML(p.awayName || p.away)}</p>
            <p class="text-[10px] text-gray-400">${new Date(p.kickoff).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} · Your pick <b class="text-white">${p.h}-${p.a}</b>${m && m.state !== 'pre' ? ` · Result <b class="text-white">${escapeHTML(m.home.score ?? '?')}-${escapeHTML(m.away.score ?? '?')}</b>` : ''}</p></div>
            <div class="text-sm shrink-0 ml-2">${badge}</div></div>`;
    };
    const thisWeek = picks.filter(p => p.week === wk), later = picks.filter(p => p.week !== wk);
    thisWeek.forEach(p => { const pts = window.pickPoints(p, byId[p.matchId]); if (pts) total += pts; count++; });
    box.innerHTML = `<div class="glass-panel rounded-2xl p-4 border border-emerald-500/30 text-center"><p class="text-[10px] text-gray-400 font-bold uppercase">This week</p><p class="text-3xl font-black text-emerald-400">${total} pts</p><p class="text-[10px] text-gray-500">${count} prediction${count === 1 ? '' : 's'} this week</p></div>` +
        (thisWeek.length ? thisWeek.map(row).join('') : '') +
        (later.length ? `<p class="text-[10px] font-black text-gray-500 uppercase tracking-wider px-1 pt-2">Next week</p>` + later.map(row).join('') : '') +
        (!picks.length ? `<div class="glass-panel p-6 rounded-2xl text-center text-xs text-gray-400">No picks yet. <button onclick="window.setPredictTab('matches')" class="text-emerald-400 font-bold underline">Make some</button></div>` : '');
};

window.weeklyStandings = async function(wk) {
    const [s, e] = window.weekRange(wk);
    let preds = [];
    try { const snap = await getDocs(query(collection(window.db, 'predictions'), where('week', '==', wk), limit(3000))); snap.forEach(d => preds.push(d.data())); } catch (err) {}
    const results = await window.fetchMatchesRange(s, e);
    const byId = Object.fromEntries(results.map(m => [m.id, m]));
    const table = {};
    preds.forEach(p => {
        const t = table[p.uid] || (table[p.uid] = { uid: p.uid, user: p.user, pts: 0, exact: 0, picks: 0 });
        t.picks++;
        const pts = window.pickPoints(p, byId[p.matchId]);
        if (pts) { t.pts += pts; if (pts === 3) t.exact++; }
    });
    return Object.values(table).filter(t => !window.isBlocked(t.user)).sort((a, b) => b.pts - a.pts || b.exact - a.exact || a.picks - b.picks);
};

window.renderPredictTable = async function() {
    const box = document.getElementById('predictBody');
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-8"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Calculating points…</p>`;
    const wk = window.weekKey(Date.now());
    const lastWk = window.weekKey(Date.now() - 7 * 86400000);
    const [cur, last] = await Promise.all([window.weeklyStandings(wk), window.weeklyStandings(lastWk)]);
    if (window.predTab !== 'table') return;
    const champ = last.find(t => t.pts > 0);
    const row = (t, i) => `<div class="flex items-center justify-between p-3 ${t.uid === window.uidNow() ? 'bg-emerald-500/10' : ''}" onclick="window.openUserProfileModal('${escapeHTML(t.user)}', event)">
        <div class="flex items-center gap-2.5 min-w-0"><span class="w-7 text-center font-black ${i < 3 ? 'text-lg' : 'text-xs text-gray-400'}">${['🥇', '🥈', '🥉'][i] || '#' + (i + 1)}</span>${window.avatarHtml(t.user, 'w-8 h-8', 'rounded-xl', 'text-[10px]')}
        <div class="min-w-0"><p class="text-xs font-bold text-white truncate">${window.dn(t.user)}</p><p class="text-[9px] text-gray-500">${t.picks} picks · ${t.exact} exact</p></div></div>
        <p class="text-sm font-black text-emerald-400 shrink-0">${t.pts}</p></div>`;
    box.innerHTML = `
        ${champ ? `<div class="glass-panel rounded-2xl p-3.5 border border-amber-500/40 flex items-center gap-3"><span class="text-3xl">👑</span><div><p class="text-[10px] text-amber-400 font-black uppercase">Last week's Predictor King</p><p class="text-sm font-black text-white">${window.dn(champ.user)} · ${champ.pts} pts</p></div></div>` : ''}
        <div class="glass-panel rounded-2xl overflow-hidden border border-emerald-500/25">
            <p class="px-3 py-2 text-[10px] font-black text-gray-400 uppercase border-b border-cyan-500/10">This week · resets every Monday</p>
            ${cur.length ? `<div class="divide-y divide-cyan-500/10">${cur.slice(0, 100).map(row).join('')}</div>` : '<p class="text-xs text-gray-400 text-center py-8">No predictions yet this week. Be first!</p>'}
        </div>`;
};

window._baseSwitchView17 = window._baseSwitchView17 || window.switchView;
window.switchView = function(v) {
    window._baseSwitchView17(v);
    if (v === 'predict') window.setPredictTab(window.predTab || 'matches');
};

// ======================================================================
// v17: LEVELS, XP, DAILY STREAKS, WEEKLY CHALLENGES
// Saved on your profile: xp, streak, bestStreak, lastDay, challenges {week, counts, done}, champWeeks
// ======================================================================
window.LEVELS = [[0, 'Rookie'], [100, 'Amateur'], [300, 'Semi-Pro'], [700, 'Pro'], [1500, 'Elite'], [3000, 'World Class'], [6000, 'Legend'], [12000, 'GOAT']];
window.levelOf = function(xp) {
    xp = Math.max(0, xp || 0);
    let i = 0; while (i + 1 < window.LEVELS.length && xp >= window.LEVELS[i + 1][0]) i++;
    const cur = window.LEVELS[i][0], next = window.LEVELS[i + 1] ? window.LEVELS[i + 1][0] : null;
    return { lv: i + 1, name: window.LEVELS[i][1], xp, next, pct: next ? Math.round((xp - cur) / (next - cur) * 100) : 100 };
};
window.XP_RULES = { daily: [5, 1], post: [20, 5], comment: [5, 10], gg: [1, 20], predict: [3, 20], lounge: [1, 20], live: [30, 2], story: [10, 3], poll: [2, 10], share: [2, 10], tournament: [10, 5], follow: [2, 10] };
window.myStats = { xp: 0, streak: 0, bestStreak: 0, lastDay: '', challenges: null, champWeeks: [], invitesCredited: 0 };
window.todayStr = function(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

window.xpPending = 0;
window.addXP = function(n, reason) {
    if (!window.isSignedIn() || !n) return;
    const rule = window.XP_RULES[reason];
    if (rule && reason !== 'challenge' && reason !== 'invite') {
        let day; try { day = JSON.parse(localStorage.getItem('sg_xp_day') || '{}'); } catch (e) { day = {}; }
        if (day.d !== window.todayStr()) day = { d: window.todayStr() };
        day[reason] = (day[reason] || 0) + 1;
        try { localStorage.setItem('sg_xp_day', JSON.stringify(day)); } catch (e) {}
        if (day[reason] > rule[1]) return;           // daily cap reached for this action
    }
    const before = window.levelOf(window.myStats.xp).lv;
    window.myStats.xp += n;
    window.xpPending += n;
    const after = window.levelOf(window.myStats.xp);
    if (after.lv > before) showToast(`⬆️ Level up! You're now Lv ${after.lv} · ${after.name}`);
    window.updateLevelBadge();
    window.saveStatsSoon();
};
window.saveStatsSoon = function() {
    clearTimeout(window._statsT);
    window._statsT = setTimeout(window.flushStats, 4000);
};
window.flushStats = async function() {
    if (!window.isSignedIn()) return;
    const s = window.myStats;
    const upd = { streak: s.streak, bestStreak: s.bestStreak, lastDay: s.lastDay, challenges: s.challenges || null, champWeeks: s.champWeeks || [], invitesCredited: s.invitesCredited || 0 };
    if (window.xpPending) { upd.xp = increment(window.xpPending); }
    const sent = window.xpPending; window.xpPending = 0;
    try { await setDoc(doc(window.db, 'profiles', window.meLower()), window.cleanForCloud(upd), { merge: true }); }
    catch (e) { window.xpPending += sent; }
};
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && window.xpPending) window.flushStats(); });
window.updateLevelBadge = function() {
    const el = document.getElementById('drawerLevelBadge');
    if (el) el.innerText = window.isSignedIn() ? `Lv ${window.levelOf(window.myStats.xp).lv}${window.myStats.streak > 1 ? ' · 🔥' + window.myStats.streak : ''}` : 'Lv 1';
};

// Called after sign-in: load my stats and update the daily streak
window.loadMyStats = async function() {
    if (!window.isSignedIn()) return;
    const prof = await window.getProfile(window.me(), true) || {};
    const s = window.myStats = { xp: Number(prof.xp) || 0, streak: prof.streak || 0, bestStreak: prof.bestStreak || 0, lastDay: prof.lastDay || '', challenges: prof.challenges || null, champWeeks: prof.champWeeks || [], invitesCredited: prof.invitesCredited || 0, createdAt: prof.createdAt };
    const today = window.todayStr();
    if (s.lastDay !== today) {
        const y = new Date(); y.setDate(y.getDate() - 1);
        s.streak = s.lastDay === window.todayStr(y) ? s.streak + 1 : 1;
        s.bestStreak = Math.max(s.bestStreak, s.streak);
        s.lastDay = today;
        window.addXP(5, 'daily');
        if ([3, 7, 14, 30, 50, 100].includes(s.streak)) setTimeout(() => showToast(`🔥 ${s.streak}-day streak! Keep it going!`), 2500);
        window.saveStatsSoon();
    }
    window.ensureWeekChallenges();
    window.updateLevelBadge();
    window.claimInvite && window.claimInvite();
    window.creditInvites && window.creditInvites(true);
};
window._baseAfterAuthChange17 = window._baseAfterAuthChange17 || window.afterAuthChange;
window.afterAuthChange = async function(user) {
    const r = await window._baseAfterAuthChange17(user);
    if (user) setTimeout(() => window.loadMyStats(), 500);
    else { window.myStats = { xp: 0, streak: 0, bestStreak: 0, lastDay: '', challenges: null, champWeeks: [], invitesCredited: 0 }; window.updateLevelBadge(); }
    return r;
};

// ---------- Weekly challenges ----------
window.CHALLENGE_POOL = [
    { id: 'post2', type: 'post', target: 2, label: 'Make 2 posts', icon: '📝' },
    { id: 'gg10', type: 'gg', target: 10, label: 'Give 10 GGs', icon: '👍' },
    { id: 'comment5', type: 'comment', target: 5, label: 'Reply to 5 posts', icon: '💬' },
    { id: 'predict3', type: 'predict', target: 3, label: 'Predict 3 match scores', icon: '🎯' },
    { id: 'lounge3', type: 'lounge', target: 3, label: 'Chat 3 times in Match Lounges', icon: '🏟️' },
    { id: 'tourn1', type: 'tournament', target: 1, label: 'Join or host a tournament', icon: '🏆' },
    { id: 'live1', type: 'live', target: 1, label: 'Go live once', icon: '🔴' },
    { id: 'story1', type: 'story', target: 1, label: 'Post a story', icon: '⭕' },
    { id: 'poll2', type: 'poll', target: 2, label: 'Vote in 2 polls', icon: '📊' },
    { id: 'share2', type: 'share', target: 2, label: 'Share 2 posts', icon: '🔗' },
    { id: 'follow3', type: 'follow', target: 3, label: 'Follow 3 gamers', icon: '➕' },
    { id: 'invite1', type: 'invite', target: 1, label: 'Invite a friend who joins', icon: '📣' }
];
window.weekChallenges = function(wk = window.weekKey(Date.now())) {
    const seed = Math.floor(new Date(wk + 'T00:00:00Z').getTime() / (7 * 86400000));
    const pool = window.CHALLENGE_POOL, out = [];
    for (let i = 0; out.length < 4; i++) { const c = pool[(seed * 5 + i * 7) % pool.length]; if (!out.includes(c)) out.push(c); }
    return out;
};
window.ensureWeekChallenges = function() {
    const wk = window.weekKey(Date.now());
    if (!window.myStats.challenges || window.myStats.challenges.week !== wk) window.myStats.challenges = { week: wk, counts: {}, done: [] };
    return window.myStats.challenges;
};
window.bumpChallenge = function(type, n = 1) {
    if (!window.isSignedIn()) return;
    const ch = window.ensureWeekChallenges();
    ch.counts[type] = (ch.counts[type] || 0) + n;
    const XP_FOR = { gg: 1, comment: 'comment', post: 'post', poll: 'poll', share: 'share', story: 'story', tournament: 'tournament', follow: 'follow' };
    if (XP_FOR[type] && !['predict', 'lounge', 'live'].includes(type)) window.addXP(window.XP_RULES[type][0], type);
    const list = window.weekChallenges(ch.week);
    list.forEach(c => {
        if (c.type === type && !ch.done.includes(c.id) && (ch.counts[type] || 0) >= c.target) {
            ch.done.push(c.id);
            window.addXP(50, 'challenge');
            setTimeout(() => showToast(`🏅 Challenge done: ${c.label} (+50 XP)`), 600);
        }
    });
    if (list.every(c => ch.done.includes(c.id)) && !(window.myStats.champWeeks || []).includes(ch.week)) {
        window.myStats.champWeeks = [...(window.myStats.champWeeks || []), ch.week].slice(-52);
        window.addXP(100, 'challenge');
        setTimeout(() => showToast('🏆 All weekly challenges done! +100 XP & Challenge Champ badge'), 1800);
    }
    window.saveStatsSoon();
};

// hook everyday actions into XP + challenges
(function hookActions17() {
    const wrap = (name, after) => {
        const base = window[name];
        if (!base) return;
        window[name] = async function(...args) {
            const ctx = {};
            try { after.before && after.before(ctx, ...args); } catch (e) {}
            const r = await base.apply(this, args);
            try { after.after(ctx, ...args); } catch (e) {}
            return r;
        };
    };
    wrap('submitUniversalPost', {
        before: (c) => { const t = document.getElementById('postTextContent'); c.had = !!((t && t.value.trim()) || (window.uploadedMediaBlobs || []).length); },
        after: (c) => { const t = document.getElementById('postTextContent'); if (c.had && t && !t.value.trim()) window.bumpChallenge('post'); }
    });
    wrap('submitCommentReply', {
        before: (c) => { const t = document.getElementById('commentInputText'); c.had = !!(t && t.value.trim()); },
        after: (c) => { const t = document.getElementById('commentInputText'); if (c.had && t && !t.value.trim() && window.isSignedIn()) window.bumpChallenge('comment'); }
    });
    wrap('toggleGGPost', {
        before: (c, id) => { const p = window.findPost(id); c.had = p && (p.ggsBy || []).includes(window.uidNow()); },
        after: (c, id) => { const p = window.findPost(id); if (window.isSignedIn() && !c.had && p && (p.ggsBy || []).includes(window.uidNow())) window.bumpChallenge('gg'); }
    });
    wrap('votePoll', {
        before: (c, id) => { const p = window.findPost(id); c.had = p && (p.pollVoters || []).includes(window.uidNow()); },
        after: (c, id) => { const p = window.findPost(id); if (!c.had && p && (p.pollVoters || []).includes(window.uidNow())) window.bumpChallenge('poll'); }
    });
    wrap('sharePost', { after: () => window.bumpChallenge('share') });
    wrap('uploadProfileStory', {
        before: (c, input) => { c.had = !!(input && input.files && input.files.length); },
        after: (c) => { if (c.had) window.bumpChallenge('story'); }
    });
    wrap('joinActiveTournament', {
        before: (c, id) => { const t = (window.tournamentsList || []).find(x => x.id === id); c.had = t && t.players.some(p => (p || '').toLowerCase() === window.meLower()); },
        after: (c, id) => { const t = (window.tournamentsList || []).find(x => x.id === id); if (!c.had && t && t.players.some(p => (p || '').toLowerCase() === window.meLower())) window.bumpChallenge('tournament'); }
    });
    wrap('submitNewTournament', {
        before: (c) => { c.n = (window.tournamentsList || []).length; },
        after: (c) => { if ((window.tournamentsList || []).length > c.n) window.bumpChallenge('tournament'); }
    });
    wrap('toggleFollowUser', {
        before: (c, tag) => { c.had = window.amFollowing(tag); },
        after: (c, tag) => { if (!c.had && window.amFollowing(tag)) window.bumpChallenge('follow'); }
    });
})();

// Level shows next to names (small), Challenge Champ badge on profiles
window._baseGetProfileBadges17 = window._baseGetProfileBadges17 || window.getProfileBadges;
window.getProfileBadges = function(username) {
    const p = window.profileFor ? window.profileFor(username) : null;
    const lv = p && Number(p.xp) ? window.levelOf(Number(p.xp)).lv : 0;
    return window._baseGetProfileBadges17(username) + (lv >= 2 ? ` <span class="text-[8px] font-black px-1 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">Lv${lv}</span>` : '');
};

// ---------- "Level & Challenges" screen ----------
window.openPanel = function(title, html) {
    document.getElementById('sgPanelTitle').innerHTML = title;
    document.getElementById('sgPanelBody').innerHTML = html;
    document.getElementById('sgPanel').classList.remove('hidden');
};
window.closePanel = function() { document.getElementById('sgPanel').classList.add('hidden'); window.panelKind = null; };
window.openProgress = function() {
    if (window.needSignIn('earn XP and badges')) return;
    window.panelKind = 'progress';
    const s = window.myStats, L = window.levelOf(s.xp), ch = window.ensureWeekChallenges();
    const list = window.weekChallenges(ch.week);
    const endsIn = Math.ceil((new Date(ch.week + 'T00:00:00Z').getTime() + 7 * 86400000 - Date.now()) / 86400000);
    window.openPanel('🏅 Level &amp; Challenges', `
        <div class="glass-panel rounded-2xl p-4 border border-cyan-500/30 space-y-2">
            <div class="flex items-center justify-between">
                <div><p class="text-[10px] text-gray-400 font-bold uppercase">Level ${L.lv}</p><p class="text-xl font-black text-white">${L.name}</p></div>
                <div class="text-right"><p class="text-2xl font-black text-amber-400">🔥 ${s.streak}</p><p class="text-[9px] text-gray-400 font-bold">DAY STREAK · best ${s.bestStreak}</p></div>
            </div>
            <div class="h-2.5 rounded-full bg-gg-900 overflow-hidden"><div class="h-full bg-gradient-to-r from-cyan-400 to-magenta" style="width:${L.pct}%"></div></div>
            <p class="text-[10px] text-gray-400">${window.formatCount ? window.formatCount(L.xp) : L.xp} XP${L.next ? ` · ${L.next - L.xp} XP to ${window.LEVELS[L.lv][1]}` : ' · Max level!'}</p>
        </div>
        <div class="flex items-center justify-between px-1"><h4 class="text-xs font-black text-white uppercase tracking-wider">This week's challenges</h4><span class="text-[10px] text-gray-500 font-bold">Resets in ${endsIn} day${endsIn === 1 ? '' : 's'}</span></div>
        ${list.map(c => {
            const n = Math.min(c.target, ch.counts[c.type] || 0), done = ch.done.includes(c.id);
            return `<div class="glass-panel rounded-2xl p-3 border ${done ? 'border-emerald-500/40' : 'border-cyan-500/15'} flex items-center gap-3">
                <span class="text-2xl">${done ? '✅' : c.icon}</span>
                <div class="flex-1 min-w-0"><p class="text-xs font-bold ${done ? 'text-emerald-400' : 'text-white'}">${c.label}</p>
                <div class="h-1.5 rounded-full bg-gg-900 overflow-hidden mt-1.5"><div class="h-full ${done ? 'bg-emerald-400' : 'bg-cyan-400'}" style="width:${Math.round(n / c.target * 100)}%"></div></div></div>
                <span class="text-[10px] font-black ${done ? 'text-emerald-400' : 'text-gray-400'}">${done ? '+50 XP' : `${n}/${c.target}`}</span></div>`;
        }).join('')}
        <p class="text-[10px] text-gray-500 text-center">Finish all 4 for +100 XP and the 🏆 Challenge Champ badge.${(s.champWeeks || []).length ? ` You've been champ ${(s.champWeeks || []).length}×!` : ''}</p>
        <div class="glass-panel rounded-2xl p-3.5 border border-amber-500/20">
            <p class="text-xs font-black text-white mb-1.5">How to earn XP</p>
            <p class="text-[11px] text-gray-400 leading-relaxed">Open the app daily +5 · Post +20 · Go live +30 · Story +10 · Reply +5 · Join a tournament +10 · Predict a score +3 · GG a post +1 · Lounge chat +1 · Invite a friend who joins +100</p>
        </div>
        <button onclick="window.openInvite()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-magenta text-slate-950 font-black text-xs uppercase"><i class="fa-solid fa-user-plus mr-1"></i> Invite friends · +100 XP each</button>`);
};

// ======================================================================
// v17: INVITE FRIENDS
// invites/{newUid} = { byTag (lowercase), newUid, newTag, createdAt }  — one per new account
// ======================================================================
(function captureRef() {
    try {
        const m = location.search.match(/[?&]ref=([A-Za-z0-9_]{3,20})/) || location.hash.match(/ref=([A-Za-z0-9_]{3,20})/);
        if (m) {
            localStorage.setItem('sg_ref', m[1]);
            const clean = location.pathname + location.search.replace(/[?&]ref=[^&]*/, '').replace(/^&/, '?') + location.hash.replace(/#?ref=[^&]*/, '');
            history.replaceState(null, '', clean || location.pathname);
        }
    } catch (e) {}
})();
window.inviteLink = function() { return `${location.origin}${location.pathname}?ref=${encodeURIComponent(window.me())}`; };
window.claimInvite = async function() {
    let ref; try { ref = localStorage.getItem('sg_ref'); } catch (e) {}
    if (!ref || !window.isSignedIn()) return;
    if (ref.toLowerCase() === window.meLower()) { try { localStorage.removeItem('sg_ref'); } catch (e) {} return; }
    const created = window.postTimeValue({ createdAt: window.myStats.createdAt });
    if (!created || Date.now() - created > 3 * 86400000) { try { localStorage.removeItem('sg_ref'); } catch (e) {} return; }  // only new accounts
    try {
        const exists = await getDoc(doc(window.db, 'invites', window.uidNow()));
        if (!exists.exists()) {
            await setDoc(doc(window.db, 'invites', window.uidNow()), { byTag: ref.toLowerCase(), newUid: window.uidNow(), newTag: window.me(), createdAt: serverTimestamp() });
            const inviter = await window.getProfile(ref);
            if (inviter && inviter.uid) window.notify(inviter.uid, 'invite', { text: 'joined Sinless GG with your invite 🎉' });
        }
        localStorage.removeItem('sg_ref');
    } catch (e) {}
};
window.myInviteCount = async function() {
    try { const s = await getDocs(query(collection(window.db, 'invites'), where('byTag', '==', window.meLower()), limit(1000))); return s.size; } catch (e) { return 0; }
};
window.creditInvites = async function(silent) {
    if (!window.isSignedIn()) return 0;
    const n = await window.myInviteCount();
    const diff = n - (window.myStats.invitesCredited || 0);
    if (diff > 0) {
        window.myStats.invitesCredited = n;
        window.addXP(100 * diff, 'invite');
        window.bumpChallenge('invite', diff);
        if (!silent) showToast(`🎉 ${diff} friend${diff === 1 ? '' : 's'} joined with your link! +${100 * diff} XP`);
        else setTimeout(() => showToast(`🎉 ${diff} friend${diff === 1 ? '' : 's'} joined with your invite! +${100 * diff} XP`), 3000);
    }
    return n;
};
window.openInvite = async function() {
    if (window.needSignIn('invite friends')) return;
    window.panelKind = 'invite';
    const link = window.inviteLink();
    window.openPanel('📣 Invite Friends', `
        <div class="glass-panel rounded-2xl p-4 border border-magenta/30 text-center space-y-2">
            <p class="text-4xl">🎮</p>
            <p class="text-sm font-black text-white">Bring your squad to Sinless GG</p>
            <p class="text-xs text-gray-400">Every friend who joins with your link gives you <b class="text-amber-400">+100 XP</b>. Invite 3 for the 📣 <b>Recruiter</b> badge, 10 for 🌟 <b>Ambassador</b>.</p>
            <div class="bg-gg-950 rounded-xl px-3 py-2.5 text-[11px] text-cyan-300 break-all border border-cyan-500/20">${escapeHTML(link)}</div>
            <div class="flex gap-2">
                <button onclick="window.shareInvite()" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-magenta text-slate-950 font-black text-xs uppercase"><i class="fa-solid fa-share-nodes mr-1"></i> Share link</button>
                <button onclick="window.copyText('${escapeHTML(link)}')" class="px-4 py-3 rounded-xl bg-gg-900 border border-cyan-500/30 text-cyan-300 font-black text-xs"><i class="fa-solid fa-copy"></i></button>
            </div>
        </div>
        <div id="inviteStats" class="glass-panel rounded-2xl p-4 border border-cyan-500/20 text-center"><i class="fa-solid fa-spinner fa-spin text-cyan-400"></i></div>
        <div id="inviteBoard" class="glass-panel rounded-2xl overflow-hidden border border-amber-500/25"></div>`);
    const n = await window.creditInvites(false);
    const st = document.getElementById('inviteStats');
    if (st) st.innerHTML = `<p class="text-3xl font-black text-white">${n}</p><p class="text-[10px] text-gray-400 font-bold uppercase">friends joined</p>
        <p class="text-[11px] mt-1 ${n >= 3 ? 'text-emerald-400' : 'text-gray-400'}">${n >= 10 ? '🌟 Ambassador unlocked!' : n >= 3 ? `📣 Recruiter unlocked! ${10 - n} more for Ambassador` : `${3 - n} more for the Recruiter badge`}</p>`;
    // monthly leaderboard
    const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0);
    const counts = {};
    try { const s = await getDocs(query(collection(window.db, 'invites'), where('createdAt', '>=', start), limit(3000))); s.forEach(d => { const b = d.data().byTag; counts[b] = (counts[b] || 0) + 1; }); } catch (e) {}
    const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const board = document.getElementById('inviteBoard');
    if (board) board.innerHTML = `<p class="px-3 py-2 text-[10px] font-black text-amber-400 uppercase border-b border-amber-500/15">🏆 Top recruiters this month</p>` +
        (rows.length ? rows.map(([tag, c], i) => `<div class="flex items-center justify-between px-3 py-2.5 text-xs"><span class="text-white font-bold">${['🥇', '🥈', '🥉'][i] || '#' + (i + 1)} ${window.dn(tag)}</span><span class="font-black text-amber-400">${c}</span></div>`).join('')
            : '<p class="text-xs text-gray-400 text-center py-5">No invites yet this month. Be number one!</p>');
};
window.shareInvite = async function() {
    const link = window.inviteLink();
    const text = `Join me on Sinless GG 🎮⚽ Gamers, football, movies & anime in one app. Tournaments, live matches and more!`;
    try { if (navigator.share) { await navigator.share({ title: 'Sinless GG', text, url: link }); return; } } catch (e) { return; }
    window.copyText(link);
};
window.copyText = async function(t) { try { await navigator.clipboard.writeText(t); showToast('🔗 Copied!'); } catch (e) { showToast(t); } };
window.inviteBadge = async function(tag) {
    try { const s = await getDocs(query(collection(window.db, 'invites'), where('byTag', '==', tag.toLowerCase()), limit(20))); return s.size >= 10 ? '🌟 Ambassador' : s.size >= 3 ? '📣 Recruiter' : ''; } catch (e) { return ''; }
};

// ======================================================================
// v17: GAMING IDs + WATCHLISTS & SHELVES + PROFILE EXTRAS
// profiles/{tag}.gameIds = { fcm, eafc, efootball, ... }
// profiles/{tag}.shelf   = [{ id, kind:'anime'|'movie'|'tv'|'book', title, img, year, status, rating, at }]
// ======================================================================
window.GAME_ID_FIELDS = [['fcm', 'FC Mobile ID', '📱'], ['eafc', 'EA FC / EA ID', '🎮'], ['efootball', 'eFootball ID', '⚡'], ['dls', 'DLS Team Code', '🏆'],
    ['codm', 'COD Mobile UID', '🎯'], ['freefire', 'Free Fire ID', '🔥'], ['pubg', 'PUBG Mobile ID', '🪖'], ['psn', 'PlayStation (PSN)', '🎮'],
    ['xbox', 'Xbox Gamertag', '🟩'], ['steam', 'Steam', '💨'], ['epic', 'Epic Games', '⚫'], ['nintendo', 'Nintendo Friend Code', '🔴']];

window._baseOpenEditProfileModal17 = window._baseOpenEditProfileModal17 || window.openEditProfileModal;
window.openEditProfileModal = function() {
    window._baseOpenEditProfileModal17();
    const prof = window.profileFor(window.me()) || window.userProfiles[window.meLower()] || {};
    const ids = prof.gameIds || {};
    document.getElementById('editGameIdsBox').innerHTML = `
        <details class="bg-gg-950 border border-cyan-500/20 rounded-xl" ${Object.values(ids).some(Boolean) ? '' : 'open'}>
            <summary class="px-3 py-2.5 text-xs font-black text-white cursor-pointer">🎮 Gaming IDs <span class="text-[10px] text-gray-500 font-bold">(so people can add you)</span></summary>
            <div class="px-3 pb-3 grid grid-cols-1 gap-2">
                ${window.GAME_ID_FIELDS.map(([k, l, e]) => `<label class="text-[10px] text-gray-400 font-bold">${e} ${l}<input data-gameid="${k}" maxlength="40" value="${escapeHTML(ids[k] || '')}" class="w-full mt-0.5 bg-gg-900 border border-cyan-500/25 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"></label>`).join('')}
            </div>
        </details>`;
};
window._baseSaveProfile17 = window._baseSaveProfile17 || window.saveUserProfileChanges;
window.saveUserProfileChanges = async function() {
    const gameIds = {};
    document.querySelectorAll('[data-gameid]').forEach(i => { gameIds[i.dataset.gameid] = i.value.trim().slice(0, 40); });
    if (window.isSignedIn() && Object.keys(gameIds).length) {
        try { await setDoc(doc(window.db, 'profiles', window.meLower()), { gameIds }, { merge: true }); } catch (e) {}
        const k = window.meLower();
        if (window.allProfilesMap[k]) window.allProfilesMap[k].gameIds = gameIds;
        window.profileCache[k] = null;
    }
    return window._baseSaveProfile17();
};

// ---------- Shelf ----------
window.SHELF_KINDS = { anime: ['🍥', 'Anime'], movie: ['🎬', 'Movie'], tv: ['📺', 'Series'], book: ['📚', 'Book'] };
window.SHELF_STATUS = { watching: 'Watching', reading: 'Reading', done: 'Finished', planned: 'Want to' };
window.shelfSearch = async function(kind, q) {
    const enc = encodeURIComponent(q);
    try {
        if (kind === 'anime') {
            const j = await (await fetch(`https://api.jikan.moe/v4/anime?q=${enc}&limit=10&sfw=true`)).json();
            return (j.data || []).map(a => ({ id: 'mal' + a.mal_id, title: a.title_english || a.title, img: (a.images && a.images.jpg && a.images.jpg.image_url) || '', year: a.year || '' }));
        }
        if (kind === 'book') {
            const j = await (await fetch(`https://openlibrary.org/search.json?q=${enc}&limit=10&fields=key,title,author_name,first_publish_year,cover_i`)).json();
            return (j.docs || []).map(b => ({ id: 'ol' + (b.key || '').replace(/\W/g, ''), title: b.title + (b.author_name ? ' · ' + b.author_name[0] : ''), img: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : '', year: b.first_publish_year || '' }));
        }
        if (kind === 'tv') {
            const j = await (await fetch(`https://api.tvmaze.com/search/shows?q=${enc}`)).json();
            return (j || []).slice(0, 10).map(x => ({ id: 'tvm' + x.show.id, title: x.show.name, img: (x.show.image && x.show.image.medium) || '', year: (x.show.premiered || '').slice(0, 4) }));
        }
        if (kind === 'movie') {
            const j = await (await fetch(`https://itunes.apple.com/search?term=${enc}&media=movie&limit=10`)).json();
            return (j.results || []).map(m => ({ id: 'itm' + m.trackId, title: m.trackName, img: (m.artworkUrl100 || '').replace('100x100', '300x300'), year: (m.releaseDate || '').slice(0, 4) }));
        }
    } catch (e) { return null; }
    return [];
};
window.shelfDraft = null;
window.openShelfAdd = function(kind = 'anime') {
    if (window.needSignIn('build your shelf')) return;
    window.panelKind = 'shelf';
    window.shelfKind = kind;
    window.openPanel('➕ Add to my shelf', `
        <div class="grid grid-cols-4 gap-2">${Object.entries(window.SHELF_KINDS).map(([k, [e, l]]) => `<button onclick="window.openShelfAdd('${k}')" class="py-2.5 rounded-xl text-xs font-black ${k === kind ? 'bg-cyan-400 text-slate-950' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">${e}<br>${l}</button>`).join('')}</div>
        <div class="flex gap-2"><input id="shelfQ" placeholder="Search ${window.SHELF_KINDS[kind][1].toLowerCase()} title…" class="flex-1 bg-gg-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400" onkeydown="if(event.key === 'Enter') window.runShelfSearch()">
            <button onclick="window.runShelfSearch()" class="px-4 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs">Search</button></div>
        <div id="shelfResults" class="space-y-2"><p class="text-xs text-gray-500 text-center py-6">Search for what you're ${kind === 'book' ? 'reading' : 'watching'} 👆</p></div>`);
    setTimeout(() => { const i = document.getElementById('shelfQ'); if (i) i.focus(); }, 100);
};
window.runShelfSearch = async function() {
    const q = (document.getElementById('shelfQ').value || '').trim();
    if (!q) return;
    const box = document.getElementById('shelfResults');
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-6"><i class="fa-solid fa-spinner fa-spin"></i> Searching…</p>`;
    const res = await window.shelfSearch(window.shelfKind, q);
    window.shelfResults = (res || []).filter(x => x.title);
    const manual = { id: 'man' + q.toLowerCase().replace(/\W+/g, '').slice(0, 30), title: q, img: '', year: '' };
    window.shelfResults.push(manual);
    box.innerHTML = (res === null ? `<p class="text-[11px] text-amber-400 text-center">Couldn't reach the search right now — you can still add it by name.</p>` : '') +
        window.shelfResults.map((x, i) => `<button onclick="window.pickShelfItem(${i})" class="w-full flex items-center gap-3 p-2 rounded-xl bg-gg-900 border border-cyan-500/15 text-left">
            ${x.img ? `<img src="${escapeHTML(x.img)}" class="w-10 h-14 rounded-md object-cover shrink-0" alt="" loading="lazy">` : `<div class="w-10 h-14 rounded-md bg-gg-800 flex items-center justify-center shrink-0">${window.SHELF_KINDS[window.shelfKind][0]}</div>`}
            <div class="min-w-0"><p class="text-xs font-bold text-white line-clamp-2">${escapeHTML(x.title)}</p><p class="text-[10px] text-gray-500">${x.id.startsWith('man') ? 'Add by name' : escapeHTML(String(x.year || ''))}</p></div></button>`).join('');
};
window.pickShelfItem = function(i) {
    const x = window.shelfResults[i]; if (!x) return;
    const kind = window.shelfKind;
    window.shelfDraft = { ...x, kind, status: kind === 'book' ? 'reading' : 'watching', rating: 0 };
    window.renderShelfDraft();
};
window.renderShelfDraft = function() {
    const d = window.shelfDraft;
    const statuses = d.kind === 'book' ? ['reading', 'done', 'planned'] : ['watching', 'done', 'planned'];
    document.getElementById('shelfResults').innerHTML = `
        <div class="glass-panel rounded-2xl p-3 border border-cyan-500/30 space-y-3">
            <div class="flex gap-3">${d.img ? `<img src="${escapeHTML(d.img)}" class="w-16 h-24 rounded-lg object-cover" alt="">` : ''}<div><p class="text-sm font-black text-white">${escapeHTML(d.title)}</p><p class="text-[10px] text-gray-500">${window.SHELF_KINDS[d.kind][1]} ${d.year ? '· ' + escapeHTML(String(d.year)) : ''}</p></div></div>
            <div class="flex gap-2">${statuses.map(s => `<button onclick="window.shelfDraft.status='${s}'; window.renderShelfDraft()" class="flex-1 py-2 rounded-xl text-[11px] font-black ${d.status === s ? 'bg-cyan-400 text-slate-950' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">${window.SHELF_STATUS[s]}</button>`).join('')}</div>
            <div class="flex items-center justify-center gap-1">${[1, 2, 3, 4, 5].map(n => `<button onclick="window.shelfDraft.rating=${n}; window.renderShelfDraft()" class="text-2xl ${n <= d.rating ? 'text-amber-400' : 'text-gray-600'}">★</button>`).join('')}</div>
            <button onclick="window.saveShelfItem()" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-magenta text-slate-950 font-black text-xs uppercase">Add to my shelf</button>
        </div>`;
};
window.myShelf = function() { const p = window.profileFor(window.me()) || window.userProfiles[window.meLower()] || {}; return p.shelf || []; };
window.writeShelf = async function(shelf) {
    const k = window.meLower();
    shelf = shelf.slice(0, 60);
    try { await setDoc(doc(window.db, 'profiles', k), window.cleanForCloud({ shelf }), { merge: true }); } catch (e) { showToast("⚠️ Couldn't save shelf."); return false; }
    if (window.allProfilesMap[k]) window.allProfilesMap[k].shelf = shelf; else window.allProfilesMap[k] = { ...(window.profileFor(window.me()) || {}), shelf };
    window.userProfiles[k] = { ...(window.userProfiles[k] || {}), shelf };
    window.profileCache[k] = null;
    return true;
};
window.saveShelfItem = async function() {
    const d = window.shelfDraft; if (!d) return;
    const item = { id: d.id, kind: d.kind, title: d.title.slice(0, 120), img: d.img || '', year: String(d.year || ''), status: d.status, rating: d.rating || 0, at: Date.now() };
    const shelf = [item, ...window.myShelf().filter(x => x.id !== item.id)];
    if (await window.writeShelf(shelf)) {
        showToast(`✅ Added ${item.title}`);
        window.closePanel();
        if (window.activeProfileUser && window.activeProfileUser.toLowerCase() === window.meLower()) window.renderProfileExtras(window.me());
    }
};
window.shelfItemMenu = function(tag, id) {
    const mine = tag.toLowerCase() === window.meLower();
    const p = window.profileFor(tag) || {};
    const it = (p.shelf || []).find(x => x.id === id); if (!it) return;
    const items = [];
    if (mine) {
        Object.entries(window.SHELF_STATUS).filter(([k]) => it.kind === 'book' ? k !== 'watching' : k !== 'reading').forEach(([k, l]) => { if (k !== it.status) items.push({ icon: 'fa-bookmark', label: `Mark as ${l}`, run: async () => { await window.writeShelf(window.myShelf().map(x => x.id === id ? { ...x, status: k } : x)); window.renderProfileExtras(tag); } }); });
        items.push({ icon: 'fa-star', label: 'Change rating', run: async () => { const v = parseInt(await window.sgPrompt('Rating from 1 to 5', { title: '⭐ Rate', inputType: 'number', defaultValue: String(it.rating || 5) })); if (v >= 0 && v <= 5) { await window.writeShelf(window.myShelf().map(x => x.id === id ? { ...x, rating: v } : x)); window.renderProfileExtras(tag); } } });
        items.push({ icon: 'fa-trash', label: 'Remove from shelf', danger: true, run: async () => { await window.writeShelf(window.myShelf().filter(x => x.id !== id)); window.renderProfileExtras(tag); } });
    } else {
        items.push({ icon: 'fa-plus', label: 'Add to my shelf too', run: () => { window.shelfKind = it.kind; window.openShelfAdd(it.kind); window.shelfResults = [it]; window.pickShelfItem(0); } });
    }
    window.openActionSheet(it.title, items);
};

// ---------- Profile extras: level, streak, badges, gaming IDs, shelf ----------
window._baseEnhanceProfileView17 = window._baseEnhanceProfileView17 || window.enhanceProfileView;
window.enhanceProfileView = async function(tag) {
    const host = document.getElementById('profilePostCount').closest('.grid');
    let box = document.getElementById('profileExtras');
    if (!box) { box = document.createElement('div'); box.id = 'profileExtras'; box.className = 'space-y-3'; host.after(box); }
    box.innerHTML = '';
    await window._baseEnhanceProfileView17(tag);
    if (window.activeProfileUser !== tag) return;
    window.renderProfileExtras(tag);
};
window.renderProfileExtras = async function(tag) {
    const box = document.getElementById('profileExtras'); if (!box) return;
    const prof = (await window.getProfile(tag)) || {};
    if (window.activeProfileUser !== tag) return;
    const mine = window.isSignedIn() && tag.toLowerCase() === window.meLower();
    const xp = mine ? Math.max(window.myStats.xp || 0, Number(prof.xp) || 0) : (Number(prof.xp) || 0);
    const L = window.levelOf(xp);
    const streak = mine ? window.myStats.streak : (prof.lastDay && (prof.lastDay === window.todayStr() || prof.lastDay === window.todayStr(new Date(Date.now() - 86400000))) ? prof.streak || 0 : 0);
    const champs = (prof.champWeeks || []).length;
    const ids = Object.entries(prof.gameIds || {}).filter(([, v]) => v);
    const shelf = prof.shelf || [];
    const kindTab = window.profileShelfTab || 'all';
    const shown = shelf.filter(x => kindTab === 'all' || x.kind === kindTab);
    box.innerHTML = `
        <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-black text-cyan-300">Lv ${L.lv} · ${L.name}</span>
            ${streak > 1 ? `<span class="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] font-black text-amber-300">🔥 ${streak}-day streak</span>` : ''}
            ${champs ? `<span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-black text-emerald-300">🏆 Challenge Champ ×${champs}</span>` : ''}
            <span id="profileInviteBadge"></span>
        </div>
        ${mine ? `<div class="h-1.5 rounded-full bg-gg-900 overflow-hidden"><div class="h-full bg-gradient-to-r from-cyan-400 to-magenta" style="width:${L.pct}%"></div></div>` : ''}
        ${ids.length || mine ? `<div class="glass-panel rounded-2xl p-3 border border-cyan-500/15">
            <p class="text-[10px] font-black text-gray-400 uppercase mb-2">🎮 Gaming IDs</p>
            ${ids.length ? `<div class="flex flex-wrap gap-1.5">${ids.map(([k, v]) => { const f = window.GAME_ID_FIELDS.find(x => x[0] === k) || [k, k, '🎮']; return `<button onclick="window.copyText('${escapeHTML(v).replace(/'/g, '&#39;')}')" class="px-2.5 py-1.5 rounded-lg bg-gg-900 border border-cyan-500/20 text-[11px] text-left"><span class="text-gray-400">${f[2]} ${f[1]}</span><br><b class="text-white">${escapeHTML(v)}</b> <i class="fa-regular fa-copy text-cyan-400 ml-1"></i></button>`; }).join('')}</div>`
                : `<button onclick="window.openEditProfileModal()" class="text-[11px] text-cyan-400 font-bold">+ Add your FC Mobile, eFootball, PSN, COD IDs…</button>`}
        </div>` : ''}
        ${shelf.length || mine ? `<div class="glass-panel rounded-2xl p-3 border border-cyan-500/15">
            <div class="flex items-center justify-between mb-2"><p class="text-[10px] font-black text-gray-400 uppercase">📚 Shelf · watching & reading</p>${mine ? `<button onclick="window.openShelfAdd()" class="text-[11px] text-cyan-400 font-black">+ Add</button>` : ''}</div>
            ${shelf.length ? `<div class="flex gap-1.5 mb-2 overflow-x-auto scrollbar-none">${[['all', 'All'], ...Object.entries(window.SHELF_KINDS).map(([k, [e, l]]) => [k, e + ' ' + l])].filter(([k]) => k === 'all' || shelf.some(x => x.kind === k)).map(([k, l]) => `<button onclick="window.profileShelfTab='${k}'; window.renderProfileExtras('${escapeHTML(tag)}')" class="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-black ${kindTab === k ? 'bg-white text-slate-950' : 'bg-gg-900 text-gray-400'}">${l}</button>`).join('')}</div>
                <div class="grid grid-cols-4 gap-2">${shown.slice(0, 24).map(x => `<button onclick="window.shelfItemMenu('${escapeHTML(tag)}', '${escapeHTML(x.id)}')" class="text-left">
                    <div class="relative aspect-[2/3] rounded-lg overflow-hidden bg-gg-900 flex items-center justify-center">${x.img ? `<img src="${escapeHTML(x.img)}" class="w-full h-full object-cover" loading="lazy" alt="">` : `<span class="text-2xl">${(window.SHELF_KINDS[x.kind] || ['📌'])[0]}</span>`}
                    <span class="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-white font-bold px-1 py-0.5">${window.SHELF_STATUS[x.status] || ''}${x.rating ? ' · ' + '★'.repeat(x.rating) : ''}</span></div>
                    <p class="text-[9px] text-gray-300 font-bold line-clamp-2 mt-0.5">${escapeHTML(x.title)}</p></button>`).join('')}</div>`
                : `<p class="text-[11px] text-gray-500">Show what anime, movies, series and books you're into.</p>`}
        </div>` : ''}`;
    window.inviteBadge(tag).then(b => { const el = document.getElementById('profileInviteBadge'); if (el && b && window.activeProfileUser === tag) el.outerHTML = `<span class="px-2.5 py-1 rounded-lg bg-magenta/10 border border-magenta/30 text-[11px] font-black text-magenta">${b}</span>`; });
};

// Popular on shelves (Trending page)
window.renderPopularShelves = function() {
    let box = document.getElementById('popularShelvesBox');
    const anchor = document.getElementById('communityPulseBox');
    if (!anchor) return;
    if (!box) { box = document.createElement('div'); box.id = 'popularShelvesBox'; anchor.after(box); }
    const counts = {};
    Object.values(window.allProfilesMap || {}).forEach(p => (p.shelf || []).forEach(x => {
        const k = x.kind + '|' + x.title.toLowerCase();
        const c = counts[k] || (counts[k] = { ...x, n: 0, stars: 0, rated: 0 });
        c.n++; if (x.rating) { c.stars += x.rating; c.rated++; }
    }));
    const top = Object.values(counts).sort((a, b) => b.n - a.n || (b.stars / (b.rated || 1)) - (a.stars / (a.rated || 1))).slice(0, 12);
    if (!top.length) { box.innerHTML = ''; box.className = ''; return; }
    box.className = 'glass-panel p-3.5 rounded-2xl space-y-2.5 border border-pink-500/30';
    box.innerHTML = `<h3 class="text-xs font-black text-white uppercase tracking-wider">🍿 Popular on Sinless GG shelves</h3>
        <div class="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">${top.map(x => `<div class="shrink-0 w-20"><div class="aspect-[2/3] rounded-lg overflow-hidden bg-gg-900 flex items-center justify-center">${x.img ? `<img src="${escapeHTML(x.img)}" class="w-full h-full object-cover" loading="lazy" alt="">` : `<span class="text-2xl">${(window.SHELF_KINDS[x.kind] || ['📌'])[0]}</span>`}</div>
            <p class="text-[9px] text-white font-bold line-clamp-2 mt-1">${escapeHTML(x.title)}</p><p class="text-[8px] text-gray-500">${x.n} fan${x.n === 1 ? '' : 's'}${x.rated ? ' · ★' + (x.stars / x.rated).toFixed(1) : ''}</p></div>`).join('')}</div>`;
};
window._baseRenderTrendingTopics17 = window._baseRenderTrendingTopics17 || window.renderTrendingTopics;
window.renderTrendingTopics = function() { window._baseRenderTrendingTopics17(); window.renderPopularShelves(); };

// ======================================================================
// v17: BOOKMARKS & REPOSTS
// users/{uid}.saved = [postId, ...]   ·   posts with repostOf = original post id (quote = with caption)
// ======================================================================
window.savedPosts = (() => { try { return JSON.parse(localStorage.getItem('sg_saved') || '[]'); } catch (e) { return []; } })();
window.loadSaved = async function() {
    if (!window.isSignedIn()) return;
    try { const u = await getDoc(doc(window.db, 'users', window.uidNow())); if (u.exists() && Array.isArray(u.data().saved)) window.savedPosts = u.data().saved; } catch (e) {}
    try { localStorage.setItem('sg_saved', JSON.stringify(window.savedPosts)); } catch (e) {}
};
window.isSaved = (id) => window.savedPosts.includes(id);
window.toggleSave = async function(id) {
    if (window.needSignIn('save posts')) return;
    const on = window.isSaved(id);
    window.savedPosts = on ? window.savedPosts.filter(x => x !== id) : [id, ...window.savedPosts].slice(0, 300);
    try { localStorage.setItem('sg_saved', JSON.stringify(window.savedPosts)); } catch (e) {}
    showToast(on ? 'Removed from Saved' : '🔖 Saved! Find it in the menu → Saved Posts');
    try { await setDoc(doc(window.db, 'users', window.uidNow()), { saved: window.savedPosts }, { merge: true }); } catch (e) {}
    if (!on) window.tasteAdd && window.tasteAdd(window.findPost(id), 4);
};
window.fetchPostById = async function(id) {
    const p = window.findPost(id) || (window.postFetchCache || {})[id];
    if (p) return p;
    try {
        const s = await getDoc(doc(window.db, 'posts', id));
        if (s.exists()) { const x = { ...s.data(), id, docId: id }; (window.postFetchCache = window.postFetchCache || {})[id] = x; return x; }
    } catch (e) {}
    return null;
};
window.openSaved = async function() {
    if (window.needSignIn('see saved posts')) return;
    window.panelKind = 'saved';
    window.openPanel('🔖 Saved Posts', `<p class="text-xs text-gray-400 text-center py-8"><i class="fa-solid fa-spinner fa-spin"></i></p>`);
    await window.loadSaved();
    const posts = (await Promise.all(window.savedPosts.slice(0, 60).map(window.fetchPostById))).filter(Boolean);
    if (window.panelKind !== 'saved') return;
    const me = window.meLower();
    document.getElementById('sgPanelBody').innerHTML = posts.length ? posts.map(p => window.renderFeedCard(p, me)).join('')
        : `<div class="text-center py-12 space-y-2"><p class="text-3xl">🔖</p><p class="text-sm font-bold text-white">Nothing saved yet</p><p class="text-xs text-gray-400">Tap ••• on any post → Save post.</p></div>`;
};

window.makeRepost = async function(id, quote) {
    if (window.needSignIn('repost')) return;
    const orig = await window.fetchPostById(id);
    if (!orig) return;
    const root = orig.repostOf && !orig.caption ? orig.repostOf : (orig.docId || orig.id);
    const rootPost = root === (orig.docId || orig.id) ? orig : await window.fetchPostById(root);
    let caption = '';
    if (quote) {
        caption = await window.sgPrompt('Add your thoughts', { title: '✍️ Quote post', placeholder: 'Say something about this…', okText: 'Post' });
        if (caption === null) return;
        caption = caption.trim();
        if (!caption) { showToast('Write something to quote.'); return; }
    } else if ((window.fypposts || []).some(p => p.repostOf === root && !p.caption && window.isMyPost(p))) { showToast('You already reposted this.'); return; }
    const payload = { user: window.me(), displayName: window.myDisplayName || window.me(), uid: window.uidNow(), verified: false, game: (rootPost && rootPost.game) || 'OTHER GAMES',
        caption, mediaList: [], audioTrack: null, poll: null, pollCounts: {}, pollVoters: [], ggsCount: 0, ggsBy: [], tipsTotal: 0, viewsCount: 1, commentsCount: 0,
        repostOf: root, repostUser: rootPost ? rootPost.user : '', createdAt: serverTimestamp() };
    try {
        await addDoc(collection(window.db, 'posts'), payload);
        showToast(quote ? '✍️ Quote posted!' : '🔁 Reposted!');
        if (rootPost && rootPost.uid && rootPost.uid !== window.uidNow()) window.notify(rootPost.uid, quote ? 'quote' : 'repost', { postId: root, text: quote ? caption.slice(0, 60) : 'reposted your post' });
        window.tasteAdd && window.tasteAdd(rootPost, 4);
    } catch (e) { showToast("⚠️ Couldn't repost."); }
};

// Feed card for reposts / quotes
window._baseRenderFeedCard17 = window._baseRenderFeedCard17 || window.renderFeedCard;
window.renderFeedCard = function(p, me) {
    if (!p || !p.repostOf) return window._baseRenderFeedCard17(p, me);
    const orig = window.findPost(p.repostOf) || (window.postFetchCache || {})[p.repostOf];
    const pid = p.docId || p.id;
    const mine = window.isMyPost(p);
    if (!orig) {
        if (!(window._repostFetching || (window._repostFetching = new Set())).has(p.repostOf)) {
            window._repostFetching.add(p.repostOf);
            window.fetchPostById(p.repostOf).then(x => { if (x) window.renderFypFeed(); });
        }
    }
    const inner = orig ? window._baseRenderFeedCard17(orig, me) : `<div class="glass-panel p-4 rounded-2xl text-xs text-gray-500 text-center">This post is unavailable.</div>`;
    if (p.caption) {
        // quote post: the quoter's words on top, original inside
        return `<div class="post-card-item glass-panel p-4 rounded-2xl space-y-3 shadow-xl border border-cyan-500/20" data-post-id="${pid}">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">${window.avatarHtml(p.user, 'w-10 h-10', 'rounded-xl', 'text-xs')}<div><p class="text-sm font-bold text-white">${window.nameLink(p.user, 'text-white font-bold')}</p><p class="text-[9px] text-gray-500 font-bold">✍️ quoted · ${window.timeAgo(p.createdAt)}</p></div></div>
                ${mine ? `<button onclick="window.deletePost('${pid}')" class="text-gray-400 hover:text-red-400 text-xs px-1.5"><i class="fa-solid fa-trash"></i></button>` : `<button onclick="window.openPostActions('${pid}')" class="text-gray-400 text-sm px-2"><i class="fa-solid fa-ellipsis"></i></button>`}
            </div>
            <p class="text-sm text-gray-100 whitespace-pre-wrap break-words">${formatMentions(p.caption)}</p>
            <div class="rounded-2xl border border-cyan-500/25 overflow-hidden scale-[0.98] origin-top">${inner.replace(/data-post-id="/, 'data-quoted-id="')}</div>
            <div class="flex items-center gap-4 text-xs text-gray-400 font-bold pt-1">
                <button onclick="window.toggleGGPost('${pid}')" class="${(p.ggsBy || []).includes(window.uidNow()) ? 'text-cyan-400' : ''}"><i class="fa-solid fa-thumbs-up mr-1"></i>${p.ggsCount || 0} GGs</button>
                <button onclick="window.openPostDetail('${pid}', true)"><i class="fa-regular fa-comment mr-1"></i>${p.commentsCount || 0}</button>
                <button onclick="window.openRepostMenu('${pid}')" class="hover:text-emerald-400"><i class="fa-solid fa-retweet mr-1"></i>${window.formatCount(window.repostCount(pid)) || ''}</button>
            </div>
        </div>`;
    }
    // plain repost: banner + original card
    return `<div data-repost-id="${pid}">
        <p class="text-[11px] text-gray-400 font-bold px-2 pb-1"><i class="fa-solid fa-retweet text-emerald-400 mr-1.5"></i>${window.nameLink(p.user, 'text-gray-300 font-bold')} reposted${mine ? ` · <button onclick="window.undoRepost('${pid}')" class="text-red-400">Undo</button>` : ''}</p>
        ${inner}
    </div>`;
};
window.undoRepost = async function(id) {
    try { await deleteDoc(doc(window.db, 'posts', id)); window.fypposts = window.fypposts.filter(p => (p.docId || p.id) !== id); window.renderFypFeed(); showToast('Repost removed'); } catch (e) { showToast("⚠️ Couldn't undo."); }
};
// Don't show the same post twice in a row (original right next to a plain repost of it)
window._baseGetOrderedFeed17 = window._baseGetOrderedFeed17 || window.getOrderedFeed;
window.getOrderedFeed = function() {
    const list = window._baseGetOrderedFeed17();
    const shown = new Set();
    return list.filter(p => {
        const key = p.repostOf && !p.caption ? p.repostOf : (p.docId || p.id);
        if (shown.has(key)) return false;
        shown.add(key); return true;
    });
};

// ••• menu: save, repost, quote (and owner tools for your own posts)
window._baseOpenPostActions17 = window._baseOpenPostActions17 || window.openPostActions;
window.openPostActions = function(postId) {
    const p = window.findPost(postId) || (window.postFetchCache || {})[postId];
    if (!p) return;
    const target = p.repostOf && !p.caption ? p.repostOf : postId;
    const extra = [
        { icon: 'fa-bookmark', label: window.isSaved(target) ? 'Remove from Saved' : 'Save post', run: () => window.toggleSave(target) }
    ];
    if (window.isMyPost(p)) {
        window.openActionSheet('Your post', [...extra,
            { icon: 'fa-link', label: 'Copy link', run: () => { window.activeShare = { link: window.postLink(postId) }; window.copyShareLink(); } },
            { icon: 'fa-trash', label: 'Delete post', danger: true, run: () => window.deletePost(postId) }]);
        return;
    }
    const orig = window.openActionSheet;
    window.openActionSheet = (title, items) => orig(title, [...extra, ...items]);
    try { window._baseOpenPostActions17(postId); } finally { window.openActionSheet = orig; }
};
setTimeout(() => window.loadSaved(), 3000);

// ======================================================================
// v17: VOICE NOTES (DMs, group chats, squads)
// message = { isAudio: true, audioUrl, duration (s), text: '' }
// ======================================================================
window.audioSrc = function(url) { return (url || '').replace(/\.(webm|weba|ogg|oga|opus|mp4|m4a|wav)$/i, '.mp3'); };
window.audioMsgHtml = function(m, mine) {
    const d = Math.round(m.duration || 0);
    return `<div class="flex items-center gap-2 mt-1" onclick="event.stopPropagation()"><i class="fa-solid fa-microphone ${mine ? 'text-slate-800' : 'text-magenta'}"></i>
        <audio controls preload="none" src="${escapeHTML(window.audioSrc(m.audioUrl))}" class="h-9 max-w-[220px]"></audio>
        <span class="text-[10px] ${mine ? 'text-slate-800' : 'text-gray-400'} font-bold">${Math.floor(d / 60)}:${String(d % 60).padStart(2, '0')}</span></div>`;
};
window.voiceRec = null;
window.startVoiceNote = async function(ctx) {
    if (window.needSignIn('send voice notes')) return;
    if (ctx === 'dm' && !window.activeDm) return;
    if (ctx === 'squad') {
        const sq = window.activeSquadDetails, chan = sq && window.channelOf(sq, window.activeSquadSubRoom) || {};
        if (!sq || (!window.isSquadMember(sq) && !window.isSquadAdmin(sq)) || (chan.adminOnly && !window.isSquadAdmin(sq)) || (window.mutedUntilMe(sq) && !window.isSquadAdmin(sq))) { showToast("You can't post voice notes here."); return; }
    }
    if (!window.MediaRecorder || !navigator.mediaDevices) { showToast('Voice notes need a newer browser.'); return; }
    if (window.voiceRec) return;
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); }
    catch (e) { showToast('🎤 Allow the microphone to record voice notes.'); return; }
    const type = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || '';
    const rec = new MediaRecorder(stream, type ? { mimeType: type, audioBitsPerSecond: 32000 } : undefined);
    const chunks = [];
    rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    window.voiceRec = { ctx, rec, stream, chunks, start: Date.now(), type: rec.mimeType || type || 'audio/webm' };
    rec.start(250);
    document.getElementById('voiceRecBar').classList.remove('hidden');
    window.voiceRec.timer = setInterval(() => {
        const s = Math.floor((Date.now() - window.voiceRec.start) / 1000);
        document.getElementById('voiceRecTime').innerText = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
        if (s >= 120) window.finishVoiceNote();
    }, 250);
};
window.stopVoiceRec = function() {
    const v = window.voiceRec; if (!v) return null;
    window.voiceRec = null;
    clearInterval(v.timer);
    document.getElementById('voiceRecBar').classList.add('hidden');
    document.getElementById('voiceRecTime').innerText = '0:00';
    return new Promise(res => {
        v.rec.onstop = () => { v.stream.getTracks().forEach(t => t.stop()); res(v); };
        try { v.rec.stop(); } catch (e) { v.stream.getTracks().forEach(t => t.stop()); res(v); }
    });
};
window.cancelVoiceNote = async function() { await window.stopVoiceRec(); };
window.finishVoiceNote = async function() {
    const v = await window.stopVoiceRec(); if (!v) return;
    const duration = Math.round((Date.now() - v.start) / 1000);
    if (duration < 1) { showToast('Hold on a bit longer 🎤'); return; }
    const ext = v.type.includes('mp4') ? 'm4a' : v.type.includes('ogg') ? 'ogg' : 'webm';
    const file = new File(v.chunks, `voice_${Date.now()}.${ext}`, { type: v.type.split(';')[0] });
    showToast('🎤 Sending voice note…');
    try {
        const up = await window.uploadToCloudinary(file);
        const payload = { isAudio: true, audioUrl: up.url, duration, text: '' };
        if (v.ctx === 'squad') await window.sendSquadMessage(payload); else await window.sendDmMessage(payload);
    } catch (e) { showToast('⚠️ Voice note failed: ' + e.message); }
};

// ======================================================================
// v17: GROUP CHATS (inside Messages)
// groups/{id} = { name, ownerUid, memberUids, members (tags), lastText, lastFrom, lastAt, createdAt }
//   /messages/{auto} = { fromUid, fromUser, text | isImage+imageUrl | isAudio+audioUrl, createdAt }
// ======================================================================
window.groupThreads = [];
window.GROUP_MAX = 30;
window.listenToGroups = function() {
    if (window.groupsUnsub) { window.groupsUnsub(); window.groupsUnsub = null; }
    window.groupThreads = [];
    if (!window.isSignedIn()) return;
    window.groupsUnsub = onSnapshot(query(collection(window.db, 'groups'), where('memberUids', 'array-contains', window.uidNow()), limit(100)), (snap) => {
        window.groupThreads = []; snap.forEach(d => window.groupThreads.push({ id: d.id, ...d.data() }));
        if (!window.activeDm && !document.getElementById('dmModal').classList.contains('hidden')) window.renderDmInbox();
        if (window.activeDm && window.activeDm.group) {
            const g = window.groupThreads.find(x => x.id === window.activeDm.groupId);
            if (!g) { showToast('You left this group.'); window.showDmInbox(); }
            else { window.activeDm.g = g; document.getElementById('dmHeaderUser').innerText = `${g.name} (${(g.memberUids || []).length})`; }
        }
    }, (e) => console.warn('Groups:', e));
};
window._baseAfterAuthChange17b = window._baseAfterAuthChange17b || window.afterAuthChange;
window.afterAuthChange = async function(user) { const r = await window._baseAfterAuthChange17b(user); window.listenToGroups(); if (user) window.loadSaved(); return r; };

// Inbox = direct chats + groups, newest first
window.renderDmInbox = function() {
    const box = document.getElementById('dmMessagesContainer');
    const uid = window.uidNow();
    const tv = (t) => window.postTimeValue({ createdAt: t.lastAt }) || 0;
    const items = [
        ...window.dmThreads.map(t => ({ t, kind: 'dm', at: tv(t) })).filter(x => { const o = (x.t.participants || []).find(p => p !== uid); return !window.isBlocked((x.t.names || {})[o]); }),
        ...window.groupThreads.map(g => ({ t: g, kind: 'group', at: tv(g) || window.postTimeValue(g) || 0 }))
    ].sort((a, b) => b.at - a.at);
    if (!items.length) {
        box.innerHTML = `<div class="text-center py-12 space-y-2"><i class="fa-solid fa-envelope-open-text text-3xl text-gray-600"></i><p class="text-xs text-gray-400">No messages yet.<br>Type a gamertag above to start a chat, or tap <i class="fa-solid fa-users text-magenta"></i> for a group.</p></div>`;
        return;
    }
    const unreadFrom = new Set(window.notifList.filter(n => n.type === 'dm' && !n.read).map(n => (n.fromUser || '').toLowerCase()));
    const unreadGroups = new Set(window.notifList.filter(n => n.type === 'group' && !n.read).map(n => String(n.postId || '').slice(6)));
    box.innerHTML = items.map(({ t, kind }) => {
        if (kind === 'group') {
            const unread = unreadGroups.has(t.id);
            return `<div class="flex items-center space-x-3 p-3 rounded-2xl cursor-pointer hover:bg-gg-900 ${unread ? 'bg-magenta/5 border border-magenta/20' : ''}" onclick="window.openGroupThread('${t.id}')">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-magenta to-cyan-400 flex items-center justify-center text-slate-950 font-black text-sm shrink-0">${escapeHTML((t.name || 'G').slice(0, 2).toUpperCase())}</div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between"><span class="text-sm font-bold text-white truncate"><i class="fa-solid fa-users text-[10px] text-magenta mr-1"></i>${escapeHTML(t.name || 'Group')}</span><span class="text-[9px] text-gray-500">${t.lastAt ? window.timeAgo(window.postTimeValue({ createdAt: t.lastAt })) : ''}</span></div>
                    <p class="text-xs ${unread ? 'text-white font-bold' : 'text-gray-400'} truncate">${t.lastFrom === uid ? 'You: ' : t.lastUser ? escapeHTML(window.dnText(t.lastUser)) + ': ' : ''}${escapeHTML(t.lastText || '')}</p>
                </div>${unread ? '<span class="w-2.5 h-2.5 rounded-full bg-magenta"></span>' : ''}</div>`;
        }
        const other = (t.participants || []).find(p => p !== uid);
        const tag = (t.names || {})[other] || 'Gamer';
        const unread = unreadFrom.has(tag.toLowerCase());
        return `<div class="flex items-center space-x-3 p-3 rounded-2xl cursor-pointer hover:bg-gg-900 ${unread ? 'bg-cyan-500/5 border border-cyan-500/20' : ''}" onclick="window.openDmThread('${escapeHTML(tag)}')">
                ${window.avatarHtml(tag, 'w-11 h-11', 'rounded-2xl', 'text-xs').replace(/onclick="[^"]*"/, '')}
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between"><span class="text-sm font-bold text-white truncate">${window.dn(tag)}</span><span class="text-[9px] text-gray-500">${t.lastAt ? window.timeAgo(window.postTimeValue({ createdAt: t.lastAt })) : ''}</span></div>
                    <p class="text-xs ${unread ? 'text-white font-bold' : 'text-gray-400'} truncate">${t.lastFrom === uid ? 'You: ' : ''}${escapeHTML(t.lastText || '')}</p>
                </div>${unread ? '<span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>' : ''}</div>`;
    }).join('');
};

window.openGroupThread = function(gid) {
    const g = window.groupThreads.find(x => x.id === gid);
    if (!g) { showToast('Group not found.'); return; }
    document.getElementById('dmModal').classList.remove('hidden');
    window.activeDm = { group: true, groupId: gid, threadId: gid, partnerTag: g.name, g };
    window.activeDmUser = null;
    document.getElementById('dmHeaderUser').innerText = `${g.name} (${(g.memberUids || []).length})`;
    document.getElementById('dmBackBtn').classList.remove('hidden');
    document.getElementById('dmComposer').classList.remove('hidden');
    document.getElementById('dmNewChatRow').classList.add('hidden');
    window.notifList.filter(n => n.type === 'group' && !n.read && n.postId === 'group:' + gid).forEach(n => { n.read = true; updateDoc(doc(window.db, 'notifications', n.id), { read: true }).catch(() => {}); });
    window.updateNotifBadge && window.updateNotifBadge();
    if (window.dmThreadUnsub) window.dmThreadUnsub();
    const box = document.getElementById('dmMessagesContainer');
    box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10"><i class="fa-solid fa-spinner fa-spin"></i></p>`;
    window.dmThreadUnsub = onSnapshot(query(collection(window.db, 'groups', gid, 'messages'), orderBy('createdAt', 'desc'), limit(150)), (snap) => {
        const msgs = []; snap.forEach(d => msgs.unshift({ id: d.id, ...d.data() }));
        window.renderDmMessages(msgs);
    }, () => { box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">Couldn't load this group.</p>`; });
};

// One renderer for direct and group chats (photos, voice notes, sender names in groups)
window.renderDmMessages = function(msgs) {
    const box = document.getElementById('dmMessagesContainer');
    const dm = window.activeDm; if (!dm) return;
    if (!msgs.length) { box.innerHTML = `<p class="text-xs text-gray-400 text-center py-10">${dm.group ? `Say hi to the group 👋` : `Say hi to @${escapeHTML(dm.partnerTag)} 👋`}</p>`; return; }
    const uid = window.uidNow();
    const now = Date.now();
    let prevFrom = null;
    box.innerHTML = msgs.filter(m => !(m.isImage && now - window.postTimeValue(m) > 86400000) && !window.isBlocked(m.fromUser)).map(m => {
        const mine = m.fromUid === uid;
        const body = m.isAudio ? window.audioMsgHtml(m, mine)
            : m.isImage ? `<img src="${window.cldSized(m.imageUrl, 600)}" class="max-h-56 rounded-xl object-contain cursor-pointer" onclick="window.openMediaZoomModal('image', '${m.imageUrl}')"><p class="text-[8px] opacity-70 mt-1">📷 disappears 24h after sending</p>`
            : `<p class="whitespace-pre-wrap break-words">${formatMentions(m.text || '')}</p>`;
        const showName = dm.group && !mine && prevFrom !== m.fromUid;
        prevFrom = m.fromUid;
        return `<div class="flex ${mine ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[78%] px-3 py-2 rounded-2xl text-sm ${mine ? 'bg-cyan-500 text-slate-950 rounded-br-sm' : 'bg-gg-900 text-white border border-cyan-500/15 rounded-bl-sm'}">
                    ${showName ? `<p class="text-[10px] font-black text-magenta mb-0.5">${escapeHTML(window.dnText(m.fromUser))}</p>` : ''}
                    ${body}
                    <p class="text-[9px] mt-0.5 ${mine ? 'text-slate-800' : 'text-gray-500'} text-right">${m.createdAt ? window.timeAgo(window.postTimeValue(m)) : 'sending…'}</p>
                </div></div>`;
    }).join('');
    box.scrollTop = box.scrollHeight;
};

window._baseSendDmMessage17 = window._baseSendDmMessage17 || window.sendDmMessage;
window.sendDmMessage = async function(payload) {
    const dm = window.activeDm;
    if (!dm || !dm.group) return window._baseSendDmMessage17(payload);
    if (!window.isSignedIn() || window.isBanned) return;
    const last = payload.isAudio ? '🎤 Voice note' : payload.isImage ? '📷 Photo' : (payload.text || '').slice(0, 80);
    try {
        await addDoc(collection(window.db, 'groups', dm.groupId, 'messages'), window.cleanForCloud({ fromUid: window.uidNow(), fromUser: window.me(), ...payload, createdAt: serverTimestamp() }));
        await updateDoc(doc(window.db, 'groups', dm.groupId), { lastText: last, lastFrom: window.uidNow(), lastUser: window.me(), lastAt: serverTimestamp() });
        (dm.g.memberUids || []).filter(u => u !== window.uidNow()).forEach(u => window.notify(u, 'group', { postId: 'group:' + dm.groupId, text: `in ${dm.g.name}: ${last}`.slice(0, 100) }));
    } catch (e) { showToast('⚠️ Message not sent.'); }
};

window.dmHeaderTap = function() {
    const dm = window.activeDm; if (!dm) return;
    if (dm.group) { window.openGroupInfo(dm.groupId); return; }
    const tag = dm.partnerTag;
    window.closeDmModal();
    window.openUserProfileModal(tag);
};

window.openNewGroup = function() {
    if (window.needSignIn('create groups')) return;
    window.panelKind = 'newgroup';
    window.openPanel('👥 New group', `
        <label class="block text-[10px] text-gray-400 font-bold">Group name<input id="ngName" maxlength="40" placeholder="e.g. Weekend FC squad" class="w-full mt-1 bg-gg-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"></label>
        <label class="block text-[10px] text-gray-400 font-bold">Add people (gamertags, separated by commas)<textarea id="ngMembers" placeholder="@Kumi, @AceK, DonPrime" class="w-full mt-1 h-20 bg-gg-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none" oninput="window.onMentionInput && window.onMentionInput(this)"></textarea></label>
        <p id="ngStatus" class="text-[11px] text-gray-500">Up to ${window.GROUP_MAX} people. Only people who've signed in to Sinless GG can be added.</p>
        <button id="ngBtn" onclick="window.createGroup()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-magenta to-cyan-400 text-slate-950 font-black text-xs uppercase">Create group</button>`);
};
window.resolveTags = async function(raw) {
    const tags = [...new Set((raw || '').split(/[\s,]+/).map(t => t.replace('@', '').trim()).filter(Boolean))];
    const found = [], missing = [];
    for (const t of tags) {
        const p = await window.getProfile(t);
        if (p && p.uid && !window.isBlocked(t)) found.push({ tag: p.gamertag || t, uid: p.uid }); else missing.push(t);
    }
    return { found, missing };
};
window.createGroup = async function() {
    const name = document.getElementById('ngName').value.trim();
    if (!name) { showToast('Give the group a name.'); return; }
    const btn = document.getElementById('ngBtn'); btn.disabled = true; btn.innerText = 'Checking…';
    const { found, missing } = await window.resolveTags(document.getElementById('ngMembers').value);
    const people = found.filter(f => f.uid !== window.uidNow()).slice(0, window.GROUP_MAX - 1);
    if (missing.length) document.getElementById('ngStatus').innerHTML = `<span class="text-amber-400">Not found: ${missing.map(escapeHTML).join(', ')}</span>`;
    if (!people.length) { btn.disabled = false; btn.innerText = 'Create group'; showToast('Add at least one person.'); return; }
    try {
        const ref = await addDoc(collection(window.db, 'groups'), {
            name: name.slice(0, 40), ownerUid: window.uidNow(), memberUids: [window.uidNow(), ...people.map(p => p.uid)], members: [window.me(), ...people.map(p => p.tag)],
            lastText: 'Group created', lastFrom: window.uidNow(), lastUser: window.me(), lastAt: serverTimestamp(), createdAt: serverTimestamp()
        });
        people.forEach(p => window.notify(p.uid, 'group', { postId: 'group:' + ref.id, text: `added you to ${name}` }));
        window.closePanel();
        window.groupThreads = [{ id: ref.id, name, ownerUid: window.uidNow(), memberUids: [window.uidNow(), ...people.map(p => p.uid)], members: [window.me(), ...people.map(p => p.tag)] }, ...window.groupThreads.filter(g => g.id !== ref.id)];
        window.openGroupThread(ref.id);
    } catch (e) { btn.disabled = false; btn.innerText = 'Try again'; showToast("⚠️ Couldn't create group. Did you add the new Firebase rules?"); }
};
window.openGroupInfo = function(gid) {
    const g = window.groupThreads.find(x => x.id === gid); if (!g) return;
    const owner = g.ownerUid === window.uidNow();
    window.panelKind = 'group';
    window.openPanel(`👥 ${escapeHTML(g.name)}`, `
        ${owner ? `<div class="flex gap-2"><input id="grName" value="${escapeHTML(g.name)}" maxlength="40" class="flex-1 bg-gg-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"><button onclick="window.renameGroup('${gid}')" class="px-4 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs">Rename</button></div>` : ''}
        <p class="text-[10px] font-black text-gray-400 uppercase">${(g.memberUids || []).length} members</p>
        <div class="space-y-1">${(g.members || []).map((t, i) => { const u = (g.memberUids || [])[i]; return `<div class="flex items-center justify-between p-2 rounded-xl bg-gg-900">
            <div class="flex items-center gap-2">${window.avatarHtml(t, 'w-8 h-8', 'rounded-full', 'text-[10px]')}<span class="text-xs font-bold text-white">${window.dn(t)}</span>${u === g.ownerUid ? '<span class="text-[9px] text-amber-400">👑</span>' : ''}</div>
            ${owner && u !== window.uidNow() ? `<button onclick="window.removeFromGroup('${gid}', '${u}', '${escapeHTML(t)}')" class="text-[10px] text-red-400 font-black">Remove</button>` : ''}</div>`; }).join('')}</div>
        <div class="flex gap-2"><input id="grAdd" placeholder="Add by @gamertag" class="flex-1 bg-gg-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"><button onclick="window.addToGroup('${gid}')" class="px-4 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs">Add</button></div>
        <button onclick="window.leaveGroup('${gid}')" class="w-full py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 font-black text-xs uppercase">Leave group</button>`);
};
window.renameGroup = async function(gid) {
    const n = document.getElementById('grName').value.trim(); if (!n) return;
    try { await updateDoc(doc(window.db, 'groups', gid), { name: n.slice(0, 40) }); showToast('Renamed'); window.closePanel(); } catch (e) { showToast("⚠️ Couldn't rename."); }
};
window.addToGroup = async function(gid) {
    const g = window.groupThreads.find(x => x.id === gid); if (!g) return;
    const { found, missing } = await window.resolveTags(document.getElementById('grAdd').value);
    const add = found.filter(f => !(g.memberUids || []).includes(f.uid));
    if (missing.length) showToast(`Not found: ${missing.join(', ')}`);
    if (!add.length) return;
    if ((g.memberUids || []).length + add.length > window.GROUP_MAX) { showToast(`Groups can have up to ${window.GROUP_MAX} people.`); return; }
    try {
        await updateDoc(doc(window.db, 'groups', gid), { memberUids: arrayUnion(...add.map(a => a.uid)), members: arrayUnion(...add.map(a => a.tag)) });
        add.forEach(a => window.notify(a.uid, 'group', { postId: 'group:' + gid, text: `added you to ${g.name}` }));
        showToast(`Added ${add.map(a => '@' + a.tag).join(', ')}`);
        window.closePanel();
    } catch (e) { showToast("⚠️ Couldn't add."); }
};
window.removeFromGroup = async function(gid, uid, tag) {
    try { await updateDoc(doc(window.db, 'groups', gid), { memberUids: arrayRemove(uid), members: arrayRemove(tag) }); showToast(`Removed @${tag}`); window.closePanel(); } catch (e) { showToast("⚠️ Couldn't remove."); }
};
window.leaveGroup = async function(gid) {
    const ok = await window.sgConfirm('Leave this group? You will stop getting its messages.', { title: 'Leave group', okText: 'Leave', danger: true });
    if (!ok) return;
    const g = window.groupThreads.find(x => x.id === gid); if (!g) return;
    try {
        const upd = { memberUids: arrayRemove(window.uidNow()), members: arrayRemove(window.me()) };
        if (g.ownerUid === window.uidNow()) { const next = (g.memberUids || []).find(u => u !== window.uidNow()); if (next) upd.ownerUid = next; }
        await updateDoc(doc(window.db, 'groups', gid), upd);
        window.closePanel();
        window.groupThreads = window.groupThreads.filter(x => x.id !== gid);
        window.showDmInbox();
    } catch (e) { showToast("⚠️ Couldn't leave."); }
};
// group notifications open the group
window._baseOpenNotification17b = window._baseOpenNotification17b || window.openNotification;
window.openNotification = function(id) {
    const n = (window.notifList || []).find(x => x.id === id);
    if (n && String(n.postId || '').startsWith('group:')) {
        window.closeNotifications();
        n.read = true; updateDoc(doc(window.db, 'notifications', n.id), { read: true }).catch(() => {});
        window.openGroupThread(n.postId.slice(6));
        return;
    }
    return window._baseOpenNotification17b(id);
};

// ======================================================================
// v17: DATA SAVER (smaller pictures, no video autoplay, fewer images)
// ======================================================================
window.dataSaver = (() => { try { return localStorage.getItem('sg_datasaver') === '1'; } catch (e) { return false; } })();
window._baseCldSized17 = window._baseCldSized17 || window.cldSized;
window.cldSized = function(url, width, kind = 'image') {
    if (!window.dataSaver) return window._baseCldSized17(url, width, kind);
    const out = window._baseCldSized17(url, Math.min(width, kind === 'video' ? 360 : 480), kind);
    return out.replace('q_auto:good', 'q_auto:eco');
};
window._basePickFeedVideoToPlay17 = window._basePickFeedVideoToPlay17 || window.pickFeedVideoToPlay;
window.pickFeedVideoToPlay = function() {
    if (window.dataSaver) { document.querySelectorAll('video[data-feed-video]').forEach(v => { if (!v.paused && !v.dataset.userPlay) v.pause(); }); return; }
    return window._basePickFeedVideoToPlay17();
};
document.addEventListener('play', (e) => { if (e.target && e.target.matches && e.target.matches('video[data-feed-video]') && window.dataSaver && e.isTrusted) e.target.dataset.userPlay = '1'; }, true);
window.applyDataSaver = function() {
    document.body.classList.toggle('data-saver', window.dataSaver);
    let st = document.getElementById('dataSaverStyle');
    if (!st) { st = document.createElement('style'); st.id = 'dataSaverStyle'; st.textContent = `body.data-saver [data-news-card] img, body.data-saver #trendingHeadlinesBox img { display:none !important; }`; document.head.appendChild(st); }
    const b = document.getElementById('drawerDataSaverBadge');
    if (b) { b.innerText = window.dataSaver ? 'ON' : 'OFF'; b.style.background = window.dataSaver ? '#10b981' : ''; }
};
window.toggleDataSaver = function() {
    window.dataSaver = !window.dataSaver;
    try { localStorage.setItem('sg_datasaver', window.dataSaver ? '1' : '0'); } catch (e) {}
    window.applyDataSaver();
    window.renderFypFeed && window.renderFypFeed();
    showToast(window.dataSaver ? '📶 Data Saver ON: smaller pictures, videos play only when you tap' : '📶 Data Saver OFF');
};
setTimeout(() => window.applyDataSaver(), 300);

// ======================================================================
// v18: LOCAL CURRENCY (everything is priced in US dollars, shown in your own money too)
// ======================================================================
window.TZ_CURRENCY = {
    'Africa/Accra': 'GHS', 'Africa/Lagos': 'NGN', 'Africa/Nairobi': 'KES', 'Africa/Johannesburg': 'ZAR', 'Africa/Kampala': 'UGX', 'Africa/Dar_es_Salaam': 'TZS',
    'Africa/Kigali': 'RWF', 'Africa/Cairo': 'EGP', 'Africa/Casablanca': 'MAD', 'Africa/Abidjan': 'XOF', 'Africa/Dakar': 'XOF', 'Africa/Lome': 'XOF', 'Africa/Douala': 'XAF',
    'Africa/Lusaka': 'ZMW', 'Africa/Harare': 'USD', 'Africa/Addis_Ababa': 'ETB', 'Africa/Freetown': 'SLE', 'Africa/Monrovia': 'LRD', 'Africa/Banjul': 'GMD', 'Africa/Tunis': 'TND', 'Africa/Algiers': 'DZD',
    'Europe/London': 'GBP', 'Europe/Dublin': 'EUR', 'Europe/Zurich': 'CHF', 'Europe/Stockholm': 'SEK', 'Europe/Oslo': 'NOK', 'Europe/Copenhagen': 'DKK', 'Europe/Warsaw': 'PLN', 'Europe/Istanbul': 'TRY', 'Europe/Moscow': 'RUB', 'Europe/Kyiv': 'UAH', 'Europe/Kiev': 'UAH',
    'America/Toronto': 'CAD', 'America/Vancouver': 'CAD', 'America/Mexico_City': 'MXN', 'America/Sao_Paulo': 'BRL', 'America/Argentina/Buenos_Aires': 'ARS', 'America/Bogota': 'COP', 'America/Lima': 'PEN', 'America/Santiago': 'CLP', 'America/Jamaica': 'JMD',
    'Asia/Kolkata': 'INR', 'Asia/Calcutta': 'INR', 'Asia/Karachi': 'PKR', 'Asia/Dhaka': 'BDT', 'Asia/Dubai': 'AED', 'Asia/Riyadh': 'SAR', 'Asia/Qatar': 'QAR', 'Asia/Tokyo': 'JPY', 'Asia/Seoul': 'KRW', 'Asia/Shanghai': 'CNY', 'Asia/Hong_Kong': 'HKD',
    'Asia/Singapore': 'SGD', 'Asia/Manila': 'PHP', 'Asia/Jakarta': 'IDR', 'Asia/Bangkok': 'THB', 'Asia/Kuala_Lumpur': 'MYR', 'Asia/Ho_Chi_Minh': 'VND', 'Australia/Sydney': 'AUD', 'Australia/Melbourne': 'AUD', 'Pacific/Auckland': 'NZD'
};
window.detectCurrency = function() {
    try { const saved = localStorage.getItem('sg_currency'); if (saved) return saved; } catch (e) {}
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    if (window.TZ_CURRENCY[tz]) return window.TZ_CURRENCY[tz];
    if (tz.startsWith('Europe/')) return 'EUR';
    if (tz.startsWith('America/')) return 'USD';
    return 'USD';
};
window.userCurrency = window.detectCurrency();
window.fxRates = (() => { try { const c = JSON.parse(localStorage.getItem('sg_fx') || 'null'); return c && c.rates ? c : null; } catch (e) { return null; } })();
window.loadFx = async function() {
    if (window.fxRates && Date.now() - window.fxRates.at < 12 * 3600000) return;
    try {
        const j = await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
        if (j && j.rates) { window.fxRates = { at: Date.now(), rates: j.rates }; try { localStorage.setItem('sg_fx', JSON.stringify(window.fxRates)); } catch (e) {} }
    } catch (e) {}
};
// "$1.05 (≈ GH₵ 16.30)"
window.fmtMoney = function(amount, cur) {
    try { return new Intl.NumberFormat(navigator.language || 'en', { style: 'currency', currency: cur, maximumFractionDigits: amount < 1 && cur === 'USD' ? 2 : (amount >= 100 ? 0 : 2) }).format(amount); }
    catch (e) { return cur + ' ' + amount.toFixed(2); }
};
window.localPrice = function(usd) {
    const cur = window.userCurrency;
    const rate = cur === 'USD' ? 1 : window.fxRates && window.fxRates.rates[cur];
    return rate ? window.fmtMoney(usd * rate, cur) : null;
};
window.priceLabel = function(usd) {
    const local = window.userCurrency !== 'USD' ? window.localPrice(usd) : null;
    return `${window.fmtMoney(usd, 'USD')}${local ? ` <span class="text-gray-400 font-bold">≈ ${local}</span>` : ''}`;
};
setTimeout(() => window.loadFx(), 2000);

// ======================================================================
// v18: TIPS (the money). Buy Tips, send them as gifts. 1 Tip ≈ 1 US cent.
// Buying and cashing out switch on once the payments server + Paystack are set up.
// ======================================================================
window.TIPS_LIVE = false;             // becomes true when payments are ready
window.TIP_USD = 0.0105;              // price of one Tip when buying
window.TIP_PACKS = [100, 500, 1000, 2500, 5000, 10000, 50000];
window.TIP_GIFTS = [
    { id: 'goal', name: 'Goal', emoji: '⚽', tips: 10 },
    { id: 'fire', name: 'Fire', emoji: '🔥', tips: 50 },
    { id: 'gloves', name: 'Clean Sheet', emoji: '🧤', tips: 99 },
    { id: 'boot', name: 'Golden Boot', emoji: '👟', tips: 199 },
    { id: 'controller', name: 'Pro Controller', emoji: '🎮', tips: 299 },
    { id: 'trophy', name: 'Trophy', emoji: '🏆', tips: 500 },
    { id: 'mvp', name: 'MVP', emoji: '⭐', tips: 999 },
    { id: 'goldenball', name: 'Golden Ball', emoji: '🥇', tips: 2999 },
    { id: 'crown', name: 'Champions Crown', emoji: '👑', tips: 9999 },
    { id: 'stadium', name: 'Stadium', emoji: '🏟️', tips: 19999 },
    { id: 'goat', name: 'The GOAT', emoji: '🐐', tips: 44999 }
];
window.tipsUsd = (n) => n * window.TIP_USD;

window.openTipSheet = function(target) {
    if (window.needSignIn('send tips')) return;
    if (target.to && target.to.toLowerCase() === window.meLower()) { showToast("You can't tip yourself 😄"); return; }
    window.tipTarget = target;
    window.panelKind = 'tip';
    const bal = window.myGGCoins || 0;
    window.openPanel(`🎁 Send a Tip to ${escapeHTML(window.dnText(target.to))}`, `
        ${!window.TIPS_LIVE ? `<div class="rounded-2xl p-3 bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-bold text-center">🚀 Tips are launching soon! Here's a preview of what you'll be able to send.</div>` : ''}
        <div class="flex items-center justify-between glass-panel rounded-2xl p-3 border border-cyan-500/20">
            <div><p class="text-[10px] text-gray-400 font-bold uppercase">Your balance</p><p class="text-lg font-black text-white">${window.formatCount(bal)} Tips</p></div>
            <button onclick="window.openBuyTips()" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs uppercase">+ Get Tips</button>
        </div>
        <div class="grid grid-cols-3 gap-2">
            ${window.TIP_GIFTS.map(g => `<button onclick="window.sendTipGift('${g.id}')" class="glass-panel rounded-2xl p-2.5 border border-cyan-500/15 hover:border-amber-400 text-center active:scale-95 transition">
                <div class="text-3xl">${g.emoji}</div>
                <p class="text-[11px] font-black text-white mt-1 leading-tight">${g.name}</p>
                <p class="text-[10px] font-black text-amber-400">${Number(g.tips).toLocaleString()} Tips</p>
                <p class="text-[9px] text-gray-500">${window.localPrice(window.tipsUsd(g.tips)) || window.fmtMoney(window.tipsUsd(g.tips), 'USD')}</p>
            </button>`).join('')}
        </div>
        <p class="text-[10px] text-gray-500 text-center">Tips go to the creator. Tip amounts are never shown publicly.</p>`);
};
window.sendTipGift = async function(id) {
    const g = window.TIP_GIFTS.find(x => x.id === id); if (!g) return;
    if (!window.TIPS_LIVE) {
        const ok = await window.sgDialog({ title: `${g.emoji} ${g.name} · ${Number(g.tips).toLocaleString()} Tips`, message: `Tips are launching soon! You'll be able to buy Tips with Mobile Money or card and send a ${g.name} to support creators.\n\nFor now, show love with hype 🔥 and GGs 👍`, okText: 'Got it', cancelText: 'Close' });
        return ok;
    }
    if ((window.myGGCoins || 0) < g.tips) { showToast('Not enough Tips. Get more first.'); window.openBuyTips(); return; }
    // (When payments are live, the server checks your balance and sends the tip.)
};
window.openBuyTips = function() {
    window.panelKind = 'buytips';
    window.openPanel('💰 Get Tips', `
        ${!window.TIPS_LIVE ? `<div class="rounded-2xl p-3 bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-bold text-center">🚀 Buying Tips launches soon (Mobile Money &amp; cards). Prices preview:</div>` : ''}
        <div class="space-y-2">${window.TIP_PACKS.map(n => `<button onclick="window.buyTipPack(${n})" class="w-full flex items-center justify-between glass-panel rounded-2xl px-4 py-3 border border-amber-500/20 hover:border-amber-400">
            <span class="text-sm font-black text-white">🪙 ${Number(n).toLocaleString()} Tips</span>
            <span class="text-xs font-black text-amber-400 text-right">${window.priceLabel(Math.round(window.tipsUsd(n) * 100) / 100)}</span></button>`).join('')}</div>
        <p class="text-[10px] text-gray-500 text-center">Prices are in US dollars${window.userCurrency !== 'USD' ? ` and shown in ${window.userCurrency} for your convenience. Your bank or MoMo may convert at a slightly different rate` : ''}.</p>
        <button onclick="window.openLanguagePicker()" class="w-full text-[11px] text-cyan-400 font-bold">Change currency (${window.userCurrency})</button>`);
};
window.buyTipPack = function(n) {
    if (!window.TIPS_LIVE) { showToast('💰 Buying Tips launches soon!'); return; }
};
window.tipCreator = function(postId, to) { window.openTipSheet({ postId, to }); };
window.tipLive = function() { const r = window.liveRoom; if (!r) return; window.openTipSheet({ liveId: r.id, to: r.data.host }); };

window.openWallet = function() {
    if (window.needSignIn('open your wallet')) return;
    window.panelKind = 'wallet';
    window.openPanel('💼 Tips Wallet', `
        <div class="glass-panel rounded-2xl p-4 border border-amber-500/30 text-center">
            <p class="text-[10px] text-gray-400 font-bold uppercase">Balance</p>
            <p class="text-3xl font-black text-white">${window.formatCount(window.myGGCoins || 0)} <span class="text-amber-400">Tips</span></p>
            <button onclick="window.openBuyTips()" class="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs uppercase">+ Get Tips</button>
        </div>
        <div class="glass-panel rounded-2xl p-4 border border-emerald-500/30">
            <p class="text-[10px] text-gray-400 font-bold uppercase">Creator earnings</p>
            <p class="text-2xl font-black text-emerald-400">${window.fmtMoney(0, 'USD')}${window.userCurrency !== 'USD' && window.localPrice(0) ? ` <span class="text-sm text-gray-400">≈ ${window.localPrice(0)}</span>` : ''}</p>
            <p class="text-[11px] text-gray-400 mt-1">When people tip your posts and lives, your earnings show here. Cash out to Mobile Money or bank from $5.</p>
            <button disabled class="mt-3 w-full py-3 rounded-xl bg-gg-900 border border-emerald-500/20 text-gray-500 font-black text-xs uppercase">Cash out (from $5)</button>
        </div>
        ${!window.TIPS_LIVE ? `<p class="text-[11px] text-amber-300 text-center font-bold">🚀 Tips &amp; cash-outs are launching soon.</p>` : ''}
        <div class="glass-panel rounded-2xl p-3.5 border border-cyan-500/15 text-[11px] text-gray-400 space-y-1">
            <p class="font-black text-white text-xs">How Tips work</p>
            <p>1. Get Tips with Mobile Money or card.</p><p>2. Send gifts like ⚽ Goal or 🐐 The GOAT on posts and lives.</p><p>3. Creators turn the Tips they receive into real money.</p>
        </div>`);
};

// ======================================================================
// v18: EVERY LANGUAGE (Google's free website translator + auto-detect)
// ======================================================================
window.LANGS = [['en', 'English'], ['fr', 'Français'], ['es', 'Español'], ['pt', 'Português'], ['ar', 'العربية'], ['ha', 'Hausa'], ['yo', 'Yorùbá'], ['ig', 'Igbo'],
    ['ak', 'Twi (Akan)'], ['gaa', 'Ga'], ['ee', 'Ewe'], ['sw', 'Kiswahili'], ['zu', 'isiZulu'], ['am', 'አማርኛ'], ['so', 'Soomaali'], ['de', 'Deutsch'], ['it', 'Italiano'], ['nl', 'Nederlands'],
    ['tr', 'Türkçe'], ['ru', 'Русский'], ['uk', 'Українська'], ['pl', 'Polski'], ['hi', 'हिन्दी'], ['ur', 'اردو'], ['bn', 'বাংলা'], ['id', 'Bahasa Indonesia'], ['ms', 'Bahasa Melayu'],
    ['tl', 'Filipino'], ['vi', 'Tiếng Việt'], ['th', 'ไทย'], ['zh-CN', '中文 (简体)'], ['zh-TW', '中文 (繁體)'], ['ja', '日本語'], ['ko', '한국어'], ['fa', 'فارسی'], ['he', 'עברית'], ['el', 'Ελληνικά'], ['sv', 'Svenska']];
window.currentLang = function() {
    const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    return m ? decodeURIComponent(m[1]) : 'en';
};
window.setLangCookie = function(lang) {
    const host = location.hostname;
    const val = lang === 'en' ? '' : `/en/${lang}`;
    const exp = lang === 'en' ? 'Thu, 01 Jan 1970 00:00:00 GMT' : new Date(Date.now() + 365 * 86400000).toUTCString();
    document.cookie = `googtrans=${val}; expires=${exp}; path=/`;
    if (host.includes('.')) document.cookie = `googtrans=${val}; expires=${exp}; path=/; domain=.${host}`;
};
window.loadTranslator = function() {
    if (window._gtLoaded) return; window._gtLoaded = true;
    window.googleTranslateElementInit = function() {
        try { new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element'); } catch (e) {}
    };
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    s.onerror = () => { window._gtFailed = true; };
    document.head.appendChild(s);
    const st = document.createElement('style');
    st.textContent = `.goog-te-banner-frame, .skiptranslate iframe, #goog-gt-tt, .goog-te-balloon-frame, .VIpgJd-ZVi9od-ORHb-OEVmcd { display:none !important; } body { top:0 !important; } .goog-text-highlight { background:none !important; box-shadow:none !important; } font { background:transparent !important; }`;
    document.head.appendChild(st);
};
window.setLanguage = function(lang) {
    try { localStorage.setItem('sg_lang', lang); } catch (e) {}
    window.setLangCookie(lang);
    const combo = document.querySelector('.goog-te-combo');
    if (combo && lang !== 'en' && [...combo.options].some(o => o.value === lang)) { combo.value = lang; combo.dispatchEvent(new Event('change')); window.updateLangBadge(); window.closePanel(); return; }
    location.reload();   // reload applies the new language everywhere (and switching back to English)
};
window.updateLangBadge = function() { const b = document.getElementById('drawerLangBadge'); if (b) b.innerText = (window.currentLang() || 'en').toUpperCase().slice(0, 5) + ' · ' + window.userCurrency; };
window.openLanguagePicker = function() {
    window.panelKind = 'lang';
    const cur = window.currentLang();
    const curs = [...new Set(['USD', 'GHS', 'NGN', 'KES', 'ZAR', 'XOF', 'XAF', 'EGP', 'GBP', 'EUR', 'CAD', 'INR', 'BRL', 'MXN', 'AED', 'SAR', 'PHP', 'IDR', ...Object.values(window.TZ_CURRENCY)])];
    window.openPanel('🌐 Language &amp; Currency', `
        <p class="text-[10px] font-black text-gray-400 uppercase">Language</p>
        <div class="grid grid-cols-2 gap-2 notranslate" translate="no">${window.LANGS.map(([c, n]) => `<button onclick="window.setLanguage('${c}')" class="py-2.5 px-3 rounded-xl text-left text-xs font-bold ${cur === c ? 'bg-cyan-400 text-slate-950' : 'bg-gg-900 text-gray-200 border border-cyan-500/15'}">${n}</button>`).join('')}</div>
        <p class="text-[10px] text-gray-500">Translation by Google. Posts and messages are translated too. If a language doesn't load, use your browser's "Translate" option.</p>
        <p class="text-[10px] font-black text-gray-400 uppercase pt-2">Show prices in</p>
        <select onchange="window.setCurrency(this.value)" class="w-full bg-gg-900 border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white notranslate" translate="no">${curs.map(c => `<option ${c === window.userCurrency ? 'selected' : ''}>${c}</option>`).join('')}</select>
        <p class="text-[10px] text-gray-500">Everything is charged in US dollars; this only changes how prices are shown.</p>`);
};
window.setCurrency = function(c) {
    window.userCurrency = c;
    try { localStorage.setItem('sg_currency', c); } catch (e) {}
    window.loadFx();
    window.updateLangBadge();
    showToast(`Prices now shown in ${c}`);
};
// First visit: use the phone's language automatically
(function autoLanguage() {
    let saved = null; try { saved = localStorage.getItem('sg_lang'); } catch (e) {}
    const device = (navigator.language || 'en').toLowerCase();
    const base = device.split('-')[0];
    let want = saved;
    if (!want && base !== 'en') {
        const match = window.LANGS.find(([c]) => c.toLowerCase() === device) || window.LANGS.find(([c]) => c.split('-')[0] === base);
        if (match) { want = match[0]; try { localStorage.setItem('sg_lang', want); } catch (e) {} }
    }
    if (want && want !== 'en' && window.currentLang() !== want) window.setLangCookie(want);
    if ((want && want !== 'en') || window.currentLang() !== 'en') window.loadTranslator();
    else setTimeout(window.loadTranslator, 4000);       // load quietly so switching is instant
    setTimeout(window.updateLangBadge, 500);
})();


// ======================================================================
// v18b: REPOST BUTTON (replaces Share): Repost · Quote · Share in one pop-up
// ======================================================================
window.repostCount = function(id) {
    const n = (window.fypposts || []).filter(p => p.repostOf === id).length;
    return n || 0;
};
window.myRepostOf = function(id) {
    if (!window.currentUser) return null;
    return (window.fypposts || []).find(p => p.repostOf === id && !p.caption && window.isMyPost(p)) || null;
};
window.openRepostMenu = function(postId) {
    const p = window.findPost(postId) || (window.postFetchCache || {})[postId];
    const target = p && p.repostOf && !p.caption ? p.repostOf : postId;
    const mine = window.myRepostOf(target);
    window.openActionSheet('Repost', [
        mine ? { icon: 'fa-retweet', label: 'Undo repost', danger: true, run: () => window.undoRepost(mine.docId || mine.id) }
             : { icon: 'fa-retweet', label: 'Repost', run: () => window.makeRepost(target, false) },
        { icon: 'fa-pen-to-square', label: 'Quote (add your thoughts)', run: () => window.makeRepost(target, true) },
        { icon: 'fa-share-nodes', label: 'Share to WhatsApp, X, link…', run: () => window.sharePost(target) }
    ]);
};

// ======================================================================
// v19: FAST & LIGHT — protect the free Firebase allowance (50,000 reads a day)
// ======================================================================
// 1) Profiles: keep a copy on the phone and only re-download everyone every 6 hours.
//    Anyone new since then is fetched one by one, only when their name appears on screen.
window.PROFILE_CACHE_KEY = 'sg_profiles_v1';
window.PROFILE_REFRESH_MS = 6 * 3600000;
window.slimProfile = function(p) {
    return { uid: p.uid || '', gamertag: p.gamertag || '', displayName: p.displayName || '', pfp: p.pfp || '', verified: !!p.verified,
        xp: Number(p.xp) || 0, shelf: (p.shelf || []).slice(0, 12).map(x => ({ kind: x.kind, title: x.title, img: x.img || '', rating: x.rating || 0 })) };
};
window.saveProfileCache = function() {
    try {
        const slim = {}; Object.entries(window.allProfilesMap || {}).forEach(([k, p]) => { slim[k] = window.slimProfile(p); });
        localStorage.setItem(window.PROFILE_CACHE_KEY, JSON.stringify({ at: window._profilesAt || Date.now(), map: slim }));
    } catch (e) {}
};
(function restoreProfiles() {
    try {
        const c = JSON.parse(localStorage.getItem(window.PROFILE_CACHE_KEY) || 'null');
        if (c && c.map) { window.allProfilesMap = { ...c.map, ...(window.allProfilesMap || {}) }; window._profilesAt = c.at; }
    } catch (e) {}
})();
window._baseLoadAllProfiles19 = window._baseLoadAllProfiles19 || window.loadAllProfiles;
window.loadAllProfiles = function(force) {
    const fresh = window._profilesAt && Date.now() - window._profilesAt < window.PROFILE_REFRESH_MS && Object.keys(window.allProfilesMap || {}).length;
    if (!force && fresh) { window.renderFypFeed && window.renderFypFeed(); return Promise.resolve(); }
    if (window._profilesLoading) return window._profilesLoading;
    window._profilesLoading = window._baseLoadAllProfiles19().then(() => {
        window._profilesAt = Date.now();
        window.saveProfileCache();
    }).finally(() => { window._profilesLoading = null; });
    return window._profilesLoading;
};
window.refreshOneProfile = async function(tag) {
    const p = await window.getProfile(tag, true);
    if (p) { window.allProfilesMap[tag.toLowerCase()] = { ...p, gamertag: p.gamertag || tag }; window.saveProfileCache(); }
    window.renderFypFeed && window.renderFypFeed();
};
// names we don't know yet are fetched in small batches (1 read each, once)
window._missingProfiles = new Set(); window._askedProfiles = new Set();
window._baseProfileFor19 = window._baseProfileFor19 || window.profileFor;
window.profileFor = function(tag) {
    const r = window._baseProfileFor19(tag);
    const k = (tag || '').replace('@', '').toLowerCase();
    if (!r && k && k !== 'guest' && window.db && !window._askedProfiles.has(k) && window._askedProfiles.size < 300) {
        window._askedProfiles.add(k); window._missingProfiles.add(k);
        clearTimeout(window._missT);
        window._missT = setTimeout(async () => {
            const ks = [...window._missingProfiles].slice(0, 25); window._missingProfiles.clear();
            let got = 0;
            await Promise.all(ks.map(async key => { const p = await window.getProfile(key); if (p) { window.allProfilesMap[key] = { ...p, gamertag: p.gamertag || key }; got++; } }));
            if (got) { window.saveProfileCache(); window.renderFypFeed && window.renderFypFeed(); }
        }, 1500);
    }
    return r;
};
// admin user list always needs the full fresh list
window._baseRenderAdminUsers19 = window._baseRenderAdminUsers19 || window.renderAdminUsers;
window.renderAdminUsers = async function() { await window.loadAllProfiles(true); return window._baseRenderAdminUsers19(); };

// 2) Tables & Top: remember the ranking for 20 minutes (also between app opens)
(function persistRankCache() {
    try { const c = JSON.parse(localStorage.getItem('sg_rank_cache') || 'null'); if (c) Object.entries(c).forEach(([k, v]) => { if (Date.now() - v.at < 20 * 60000) window.rankCache[k] = v; }); } catch (e) {}
})();
window._baseFetchRankingPosts19 = window._baseFetchRankingPosts19 || window.fetchRankingPosts;
window.fetchRankingPosts = async function(kind) {
    const c = window.rankCache[kind];
    if (c && Date.now() - c.at < 20 * 60000) return c.posts;
    const posts = await window._baseFetchRankingPosts19(kind);
    try {
        const slim = (posts || []).map(p => ({ id: p.id, docId: p.docId, user: p.user, uid: p.uid, ggsCount: p.ggsCount || 0, viewsCount: p.viewsCount || 0, commentsCount: p.commentsCount || 0, game: p.game, createdAt: window.postTimeValue(p) }));
        const all = JSON.parse(localStorage.getItem('sg_rank_cache') || '{}');
        all[kind] = { at: Date.now(), posts: slim };
        localStorage.setItem('sg_rank_cache', JSON.stringify(all));
    } catch (e) {}
    return posts;
};

// 3) Predictor table: remember standings for 10 minutes
window._standCache = {};
window._baseWeeklyStandings19 = window._baseWeeklyStandings19 || window.weeklyStandings;
window.weeklyStandings = async function(wk) {
    const c = window._standCache[wk];
    if (c && Date.now() - c.at < 10 * 60000) return c.rows;
    const rows = await window._baseWeeklyStandings19(wk);
    window._standCache[wk] = { at: Date.now(), rows };
    return rows;
};

// 4) Profile link: only show a website when the person actually added one
window._baseEnhanceProfileView19 = window._baseEnhanceProfileView19 || window.enhanceProfileView;
window.enhanceProfileView = async function(tag) {
    const link = document.getElementById('profileLinkUrl');
    const row = link && link.parentElement;
    if (row) row.classList.add('hidden');
    await window._baseEnhanceProfileView19(tag);
    const prof = window.profileFor(tag) || (window.profileCache[(tag || '').toLowerCase()] || {}).data || {};
    const site = (prof.website || '').trim();
    if (row && site && window.activeProfileUser === tag) {
        link.innerText = site.replace(/^https?:\/\//, '');
        link.href = /^https?:\/\//.test(site) ? site : 'https://' + site;
        row.classList.remove('hidden');
    }
};
