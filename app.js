import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
        import { 
            getFirestore, 
            collection, 
            addDoc, 
            doc,
            deleteDoc,
            updateDoc,
            arrayUnion,
            arrayRemove,
            increment,
            query, 
            orderBy, 
            limit, 
            onSnapshot, 
            serverTimestamp 
        } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
        import { 
            getAuth, 
            GoogleAuthProvider, 
            signInWithPopup, 
            signOut, 
            onAuthStateChanged 
        } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
        import { 
            getMessaging, 
            getToken, 
            onMessage 
        } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

        const firebaseConfig = {
          apiKey: "AIzaSyBDWeHQpmCVfJVXj5Dmu_ZuGmKvlqI4wek",
          authDomain: "sinlessgg.firebaseapp.com",
          projectId: "sinlessgg",
          storageBucket: "sinlessgg.firebasestorage.app",
          messagingSenderId: "774543139920",
          appId: "1:774543139920:web:b17fb4caa96a555dc81d55",
          measurementId: "G-T1ENJX4SFY"
        };

        const app = initializeApp(firebaseConfig);
        let analytics = null;
        try { analytics = getAnalytics(app); } catch(e) {}
        
        const db = getFirestore(app);
        const auth = getAuth(app);
        const googleProvider = new GoogleAuthProvider();
        
        let messaging = null;
        try {
            messaging = getMessaging(app);
        } catch (e) {
            console.warn("FCM Messaging unsupported in this context.");
        }

        window.db = db;
        window.auth = auth;
        window.collection = collection;
        window.addDoc = addDoc;
        window.doc = doc;
        window.deleteDoc = deleteDoc;
        window.updateDoc = updateDoc;
        window.arrayUnion = arrayUnion;
        window.arrayRemove = arrayRemove;
        window.increment = increment;
        window.query = query;
        window.orderBy = orderBy;
        window.limit = limit;
        window.onSnapshot = onSnapshot;
        window.serverTimestamp = serverTimestamp;

        window.setupPushNotifications = async function() {
            if (!messaging) {
                showToast("Push notifications not supported on this device.");
                return;
            }
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const token = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE' }).catch(() => null);
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

        if (messaging) {
            onMessage(messaging, (payload) => {
                showToast(`💬 ${payload.notification?.title || 'New Alert'}: ${payload.notification?.body || ''}`);
            });
        }

        window.loginWithGoogle = async function() {
            try {
                const result = await signInWithPopup(auth, googleProvider);
                const user = result.user;
                showToast(`Welcome, ${user.displayName || 'Gamer'}!`);
                closeAccountModal();
            } catch (error) {
                console.error("Auth error:", error);
                showToast("Sign-in failed. Please try again.");
            }
        };

        window.logoutUser = async function() {
            try {
                await signOut(auth);
                showToast("Signed out successfully.");
                closeAccountModal();
            } catch (error) {
                console.error("Sign-out error:", error);
            }
        };

        onAuthStateChanged(auth, (user) => {
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
            window.renderFypFeed();
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
            stopAudioPreview();
            closeCreatePostModal();
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
            window.renderFypFeed();
            closeDeletePostModal();

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

            window.renderFypFeed();
            closeEditPostModal();

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
                showToast('🔥 GG!');
            }

            window.renderFypFeed();
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
                badgeContainer.innerHTML = getProfileBadges(cleanUser);
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
                            <div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-gg-950 border border-cyan-500/20 group cursor-pointer hover:border-cyan-400 transition" onclick="event.stopPropagation(); openMediaZoomModal('${firstMediaType}', '${firstMediaUrl}', '${pId}')">
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
                        let safeCaption = p.caption ? p.caption.replace(/'/g, "\\'").replace(/"/g, '"') : '';
                        postsContainer.innerHTML += `
                            <div class="relative aspect-[3/4] rounded-xl overflow-hidden bg-gg-950 border border-cyan-500/20 group cursor-pointer hover:border-cyan-400 transition" onclick="event.stopPropagation(); openMediaZoomModal('text', '', '${pId}', '${safeCaption}')">
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
            closeEditProfileModal();
            openUserProfileModal(cleanUser);
        };

        window.deleteAccountData = async function() {
            if (!confirm("⚠️ PERMANENT DELETION: Are you sure you want to delete your account data and reset your profile?")) return;

            const cleanUser = (window.myUsername || '@SinlessGaming').replace('@','').toLowerCase();
            delete window.userProfiles[cleanUser];
            localStorage.setItem('sinless_user_profiles', JSON.stringify(window.userProfiles));

            if (window.currentUser) {
                try { await signOut(auth); } catch(e) {}
            }

            showToast("Account data reset.");
            closeAccountModal();
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
            openUserProfileModal(cleanUser);
        };

        window.closeUserProfileModal = function(e = null) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            document.getElementById('userProfileModal').classList.add('hidden');
        };

        window.defaultPublicCategorySquads = [
            { id: 'cat_squad_fcmobile', name: 'FC MOBILE OFFICIAL HUB', tag: 'FCM', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'FC MOBILE', isOfficial: true, isPublic: true, inviteCode: 'SQ-FCM01', members: ['SinlessGaming', 'AceKhyd', 'Kumi_FC'], subRooms: ['Rules/Announcements', 'chat', 'tactics', 'highlights', 'transfers', 'Matchmaking'], bio: 'Official public hub for FC Mobile players, leagues & transfers.', rooms: { 'Rules/Announcements': [{ sender: 'SinlessGaming', text: 'Welcome to the FC Mobile Public Squad!' }], 'chat': [], 'tactics': [], 'highlights': [], 'transfers': [], 'Matchmaking': [] } },
            { id: 'cat_squad_football', name: 'FOOTBALL NEWS HUB', tag: 'FTB', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'FOOTBALL', isOfficial: true, isPublic: true, inviteCode: 'SQ-FTB01', members: ['SinlessGaming', 'DonPrime', 'Richard_GG'], subRooms: ['Rules/Announcements', 'chat', 'tactics', 'Matchmaking'], bio: 'Public community for tactic discussions, news updates and fantasy lineups.', rooms: { 'Rules/Announcements': [], 'chat': [], 'tactics': [], 'Matchmaking': [] } },
            { id: 'cat_squad_eafc', name: 'EA SPORTS FC HUB', tag: 'EAFC', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'EA SPORTS FC', isOfficial: true, isPublic: true, inviteCode: 'SQ-EFC01', members: ['SinlessGaming', 'Messiah_X'], subRooms: ['Rules/Announcements', 'chat', 'highlights', 'Matchmaking'], bio: 'Ultimate Team, Pro Clubs and local tournament match hub.', rooms: { 'Rules/Announcements': [], 'chat': [], 'highlights': [], 'Matchmaking': [] } },
            { id: 'cat_squad_efootball', name: 'EFOOTBALL GLOBAL HUB', tag: 'EFTB', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'EFOOTBALL', isOfficial: true, isPublic: true, inviteCode: 'SQ-EFT01', members: ['SinlessGaming'], subRooms: ['Rules/Announcements', 'chat', 'tactics', 'Matchmaking'], bio: 'eFootball match strategy, squad builds and eLeagues.', rooms: { 'Rules/Announcements': [], 'chat': [], 'tactics': [], 'Matchmaking': [] } },
            { id: 'cat_squad_dls', name: 'DREAM LEAGUE SOCCER HUB', tag: 'DLS', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'DLS', isOfficial: true, isPublic: true, inviteCode: 'SQ-DLS01', members: ['SinlessGaming'], subRooms: ['Rules/Announcements', 'chat', 'transfers', 'Matchmaking'], bio: 'Dream League Soccer tips, kits, and multiplayer hubs.', rooms: { 'Rules/Announcements': [], 'chat': [], 'transfers': [], 'Matchmaking': [] } },
            { id: 'cat_squad_wrestling', name: 'WRESTLING', tag: 'WWE', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'WRESTLING', isOfficial: true, isPublic: true, inviteCode: 'SQ-WWE01', members: ['SinlessGaming'], subRooms: ['Rules/Announcements', 'chat', 'matches', 'Matchmaking'], bio: 'WWE 2K, wrestling simulation, match cards & discussion.', rooms: { 'Rules/Announcements': [], 'chat': [], 'matches': [], 'Matchmaking': [] } },
            { id: 'cat_squad_cod', name: 'CALL OF DUTY HUB', tag: 'COD', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'CALL OF DUTY', isOfficial: true, isPublic: true, inviteCode: 'SQ-COD01', members: ['SinlessGaming'], subRooms: ['Rules/Announcements', 'chat', 'loadouts', 'Matchmaking'], bio: 'COD Mobile, Warzone & multiplayer competitive team up.', rooms: { 'Rules/Announcements': [], 'chat': [], 'loadouts': [], 'Matchmaking': [] } },
            { id: 'cat_squad_other', name: 'OTHER GAMES HUB', tag: 'OTH', leader: 'SinlessGaming', owner: 'SinlessGaming', admins: ['SinlessGaming'], game: 'OTHER GAMES', isOfficial: true, isPublic: true, inviteCode: 'SQ-OTH01', members: ['SinlessGaming'], subRooms: ['Rules/Announcements', 'chat', 'Matchmaking'], bio: 'All other mobile, console & PC games community chat.', rooms: { 'Rules/Announcements': [], 'chat': [], 'Matchmaking': [] } }
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
                const members = c.members || [c.leader || c.owner];
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
                const members = c.members || [c.leader || c.owner];
                const isMember = members.some(m => m.toLowerCase() === me);

                box.innerHTML += `
                    <div class="glass-panel p-3.5 rounded-2xl flex justify-between items-center text-xs shadow-lg border border-cyan-500/20 hover:border-cyan-400/50 transition cursor-pointer" onclick="openSquadDetailsModal('${c.id}')">
                        <div class="space-y-1">
                            <div class="flex items-center space-x-1.5">
                                <h4 class="font-extrabold text-white">${c.name}</h4>
                                <span class="text-[9px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-black px-1.5 py-0.5 rounded uppercase">[${c.tag}]</span>
                                ${c.isOfficial ? '<span class="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded font-black">Official</span>' : ''}
                                ${!c.isPublic ? '<span class="text-[8px] bg-red-500/20 text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded font-black"><i class="fa-solid fa-lock mr-0.5"></i>Private</span>' : ''}
                            </div>
                            <p class="text-[9px] text-gray-400">Owner: <span class="text-cyan-400 font-bold" onclick="event.stopPropagation(); openUserProfileModal('${c.owner || c.leader}', event)">@${c.owner || c.leader}</span> • ${members.length} Members ${c.inviteCode ? `• Code: ${c.inviteCode}` : ''}</p>
                        </div>
                        <button onclick="event.stopPropagation(); toggleSquadMembership('${c.id}')" class="px-3.5 py-1.5 rounded-xl font-black text-[10px] uppercase transition shadow ${isMember ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'}">
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
            if (!squad.members) squad.members = [squad.owner || squad.leader];

            const memberIndex = squad.members.findIndex(m => m.toLowerCase() === me.toLowerCase());
            const isMember = memberIndex !== -1;

            if (isMember) {
                if ((squad.owner || squad.leader).toLowerCase() === me.toLowerCase() && squad.members.length > 1) {
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
            closeCreateClanModal();
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
            switchSquadSubRoom(squad.subRooms[0] || 'chat');

            document.getElementById('squadDetailsModal').classList.remove('hidden');
        };

        window.closeSquadDetailsModal = function() {
            document.getElementById('squadDetailsModal').classList.add('hidden');
            window.activeSquadDetails = null;
        };

        window.openCreateSquadTournamentModal = function() {
            const squad = window.activeSquadDetails;
            if (!squad) return;
            
            document.getElementById('tournTitleInput').value = `${squad.name} Championship`;
            document.getElementById('tournGameSelect').value = squad.game || 'FC MOBILE';
            window.activeSquadForTournament = squad.id;
            openCreateTournamentModal();
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
                        <button onclick="switchSquadSubRoom('${room}')" class="px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition ${isActive ? 'bg-cyan-400 text-slate-950 shadow-md' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'}">
                            ${isLocked ? '📢 ' : (isMatchmaking ? '⚔️ ' : '# ')}${room}
                        </button>
                        ${(isAdmin && !isLocked && room !== 'chat' && !isMatchmaking) ? `<button onclick="deleteSubRoom('${room}')" class="text-red-400 text-xs px-1 hover:text-red-300 font-bold" title="Delete Channel">✕</button>` : ''}
                    </div>
                `;
            });

            nav.innerHTML += `
                <button onclick="switchSquadSubRoom('Roster')" class="px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
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
            switchSquadSubRoom(cleanName);
            showToast(`Sub-channel #${cleanName} created!`);
        };

        window.deleteSubRoom = function(room) {
            const squad = window.activeSquadDetails;
            if (!squad || !confirm(`Delete sub-channel #${room}?`)) return;

            squad.subRooms = squad.subRooms.filter(r => r !== room);
            if (squad.rooms) delete squad.rooms[room];

            localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
            renderSquadSubRoomsNav();
            switchSquadSubRoom('chat');
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
            const members = squad.members || [squad.owner || squad.leader];
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
                            <button onclick="bookSquadMatchmakingFixture()" class="px-4 py-2 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase shadow hover:bg-emerald-400 transition">
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
                                <button onclick="acceptSquadChallenge('${q.id}')" class="px-3 py-1.5 bg-cyan-400 text-slate-950 font-black text-[10px] rounded-xl uppercase shadow">Accept Match</button>
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
                                <span class="font-bold text-white cursor-pointer hover:text-cyan-400" onclick="closeSquadDetailsModal(); openUserProfileModal('${m}', event)">@${m}</span>
                                ${memberIsOwner ? '<span class="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded font-black">👑 Owner</span>' : (memberIsAdmin ? '<span class="text-[8px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded font-black">🛡️ Admin</span>' : '<span class="text-[8px] text-gray-400">Member</span>')}
                            </div>
                            <div class="flex items-center space-x-2">
                                ${isOwner && !memberIsOwner ? `
                                    <button onclick="toggleSquadAdmin('${m}')" class="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-[9px] font-bold">
                                        ${memberIsAdmin ? 'Demote Admin' : 'Make Admin'}
                                    </button>
                                    <button onclick="transferOwnership('${m}')" class="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl text-[9px] font-bold">
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
                        <button onclick="toggleSquadMembership('${squad.id}')" class="px-5 py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl uppercase shadow-lg">Join Squad Now</button>
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
                                    <span class="text-cyan-400 font-bold cursor-pointer" onclick="closeSquadDetailsModal(); openUserProfileModal('${m.sender}', event)">@${m.sender}</span>
                                    <span class="text-amber-400 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">${timerBadge}</span>
                                </div>
                                <img src="${m.imageUrl}" class="max-h-60 rounded-xl object-contain bg-black w-full border border-cyan-500/10 cursor-pointer" onclick="openMediaZoomModal('image', '${m.imageUrl}')">
                            </div>
                        `;
                    } else {
                        msgsBox.innerHTML += `
                            <div class="bg-gg-900 p-2.5 rounded-2xl border border-cyan-500/10 space-y-0.5 max-w-xl">
                                <div class="flex items-center justify-between">
                                    <span class="text-[10px] font-bold text-cyan-400 cursor-pointer" onclick="closeSquadDetailsModal(); openUserProfileModal('${m.sender}', event)">@${m.sender}</span>
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
            switchSquadSubRoom('Matchmaking');
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
            switchSquadSubRoom('Roster');
        };

        window.transferOwnership = function(newOwner) {
            const squad = window.activeSquadDetails;
            if (!squad || !confirm(`⚠️ TRANSFER OWNERSHIP: Transfer complete ownership of squad ${squad.name} to @${newOwner}?`)) return;

            squad.owner = newOwner;
            squad.leader = newOwner;
            if (!squad.admins.includes(newOwner)) squad.admins.push(newOwner);

            localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
            openSquadDetailsModal(squad.id);
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

            if (!squad.members) squad.members = [squad.owner || squad.leader];
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
            closeSquadDetailsModal();
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

                    if (!squad.members) squad.members = [squad.owner || squad.leader];
                    if (!squad.members.some(m => m.toLowerCase() === me.toLowerCase())) {
                        squad.members.push(me);
                    }

                    squad.rooms[room].push(imgPayload);
                    localStorage.setItem('sinless_clans_data', JSON.stringify(window.clansData));
                    switchSquadSubRoom(room);
                } else if (context === 'dm') {
                    const partner = window.activeDmUser;
                    if (partner) {
                        const threadKey = [me.toLowerCase(), partner.toLowerCase()].sort().join('_');
                        if (!window.dmMessagesList[threadKey]) window.dmMessagesList[threadKey] = [];
                        window.dmMessagesList[threadKey].push(imgPayload);
                        localStorage.setItem('sinless_dm_messages', JSON.stringify(window.dmMessagesList));
                        window.renderDmThread();
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
                    renderStoriesBar();
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

            const stories = window.profileStories || [];
            if (stories.length === 0) {
                container.innerHTML = '<span class="text-[9px] text-gray-500 pl-2">No stories yet</span>';
                return;
            }

            stories.forEach(story => {
                let thumbContent = story.type === 'video'
                    ? `<video src="${story.mediaUrl}" class="w-12 h-12 rounded-full object-cover border-2 border-slate-950 pointer-events-none" autoplay loop muted></video>`
                    : `<img src="${story.mediaUrl}" class="w-12 h-12 rounded-full object-cover border-2 border-slate-950">`;

                container.innerHTML += `
                    <div class="flex flex-col items-center shrink-0 cursor-pointer space-y-1 group" onclick="openStoryViewer('${story.id}')">
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
            openMediaZoomModal(story.type || 'image', story.mediaUrl);

            const title = document.getElementById('mediaZoomTitle');
            if (title) title.innerText = `@${story.user}'s Story • ${timerBadge}`;
        };

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
        window.openCreateTournamentModal = function() { closeUniversalCreateModal(); document.getElementById('createTournamentModal').classList.remove('hidden'); };
        window.closeCreateTournamentModal = function() { document.getElementById('createTournamentModal').classList.add('hidden'); };

        window.activeDeleteTournamentId = null;
        window.deleteTournament = function(tournId) {
            window.activeDeleteTournamentId = tournId;
            document.getElementById('deleteTournamentModal').classList.remove('hidden');
        };

        window.closeDeleteTournamentModal = function() {
            document.getElementById('deleteTournamentModal').classList.add('hidden');
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

            showToast("Tournament deleted.");
            closeDeleteTournamentModal();
            renderTournamentsTab();
            renderTournamentsTabDedicated();
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
            closeCreateTournamentModal();
            switchView('tournaments');
            renderTournamentsTabDedicated();
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
            renderTournamentsTab();
            renderTournamentsTabDedicated();
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
            renderTournamentsTab();
            renderTournamentsTabDedicated();
            showToast(`Added @${cleanPlayer} to match!`);
            closeManualAddPlayerModal();
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
            closeMatchReportModal();
            renderTournamentsTab();
            renderTournamentsTabDedicated();
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
            closeMatchReportModal();
            renderTournamentsTab();
            renderTournamentsTabDedicated();
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
            renderTournamentsTab();
            renderTournamentsTabDedicated();
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

        function generateTournamentsHTML() {
            if (!window.tournamentsList || window.tournamentsList.length === 0) {
                return `<div class="glass-panel p-4 rounded-2xl text-center text-xs text-gray-400">No active tournaments. Create one now!</div>`;
            }

            let selectorHtml = `<div class="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2">`;
            window.tournamentsList.forEach(t => {
                const isActive = window.activeTournament && window.activeTournament.id === t.id;
                selectorHtml += `<button onclick="switchActiveTournament('${t.id}')" class="px-3 py-1.5 rounded-xl text-[10px] font-extrabold ${isActive ? 'bg-cyan-400 text-slate-950 shadow-md' : 'bg-gg-900 text-gray-300 border border-cyan-500/20'} whitespace-nowrap">${t.title}</button>`;
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
                            ${isHost ? `<button onclick="deleteTournament('${current.id}')" class="px-2 py-1 bg-red-600/20 text-red-400 border border-red-500/30 text-[9px] font-bold rounded-lg"><i class="fa-solid fa-trash mr-1"></i>Delete</button>` : ''}
                            ${!isJoined ? `<button onclick="joinActiveTournament('${current.id}')" class="px-3 py-1.5 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-xl uppercase shadow">Join League</button>` : `<span class="text-[9px] bg-cyan-500/10 text-cyan-400 font-extrabold px-2.5 py-1 rounded-full">✓ Registered</span>`}
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
                    bodyHtml += `<button onclick="addLeagueMatch('${current.id}')" class="w-full py-2 bg-gg-900 border border-cyan-500/30 text-cyan-400 rounded-xl text-xs font-bold mt-2 hover:bg-cyan-500/20 transition">+ Add League Fixture</button>`;
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

            let p1Html = `<span class="font-extrabold ${m.winner === m.p1 ? 'text-cyan-400 font-black' : 'text-gray-100'}">@${m.p1}</span>`;
            if ((m.p1 === 'Open Spot' || m.p1 === 'TBD') && (isHost || window.currentUser)) {
                p1Html = `<span class="font-bold text-gray-500">@${m.p1}</span> <button onclick="event.stopPropagation(); manualAddPlayer('${tournId}', '${m.id}', 'p1')" class="ml-1 px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-[8px] font-bold">Add</button>`;
            }

            let p2Html = `<span class="font-extrabold ${m.winner === m.p2 ? 'text-cyan-400 font-black' : 'text-gray-100'}">@${m.p2}</span>`;
            if ((m.p2 === 'Open Spot' || m.p2 === 'TBD') && (isHost || window.currentUser)) {
                p2Html = `<span class="font-bold text-gray-500">@${m.p2}</span> <button onclick="event.stopPropagation(); manualAddPlayer('${tournId}', '${m.id}', 'p2')" class="ml-1 px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-[8px] font-bold">Add</button>`;
            }

            let statusBadge = `<span class="text-[8px] uppercase block font-extrabold text-amber-400"><i class="fa-solid fa-bolt mr-0.5"></i> REPORT</span>`;
            if (isCompleted) statusBadge = `<span class="text-[8px] uppercase block font-extrabold text-emerald-400">✓ FINAL</span>`;
            if (isDisputed) statusBadge = `<span class="text-[8px] uppercase block font-extrabold text-red-400 animate-pulse">⚠️ DISPUTED</span>`;

            let mvpBadge = m.mvp ? `<span class="text-[7px] text-amber-400 block font-bold truncate max-w-[80px]">⭐ MVP: @${m.mvp}</span>` : '';

            return `
                <div class="glass-panel p-3 rounded-xl border ${borderStyle} flex items-center justify-between text-xs cursor-pointer transition shadow-md" onclick="openMatchReportModal('${m.id}')">
                    <div class="flex-1 space-y-1.5 pr-2">
                        <div class="flex justify-between items-center bg-gg-950/80 px-2.5 py-1.5 rounded-lg border border-cyan-500/10">
                            ${p1Html}
                            <span class="font-black text-sm ${m.winner === m.p1 ? 'text-cyan-400' : 'text-gray-300'}">${m.s1 !== null ? m.s1 : '-'}</span>
                        </div>
                        <div class="flex justify-between items-center bg-gg-950/80 px-2.5 py-1.5 rounded-lg border border-cyan-500/10">
                            ${p2Html}
                            <span class="font-black text-sm ${m.winner === m.p2 ? 'text-cyan-400' : 'text-gray-300'}">${m.s2 !== null ? m.s2 : '-'}</span>
                        </div>
                    </div>
                    <div class="text-right shrink-0 border-l border-cyan-500/15 pl-2.5 space-y-1">
                        ${hasStream ? `<span class="inline-block text-[8px] bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-black animate-pulse"><i class="fa-solid fa-play mr-1"></i>STREAM</span>` : ''}
                        ${statusBadge}
                        <span class="text-[8px] text-cyan-400 font-bold block truncate max-w-[80px]">${m.stage || 'Fixture'}</span>
                        ${mvpBadge}
                    </div>
                </div>
            `;
        }

        window.switchActiveTournament = function(tournId) {
            window.activeTournament = window.tournamentsList.find(t => t.id === tournId);
            renderTournamentsTab();
            renderTournamentsTabDedicated();
        };

        window.localStream = null;

        window.toggleVoiceLobbyConnection = async function() {
            const voiceBtn = document.getElementById('voiceLobbyToggleBtn');
            const statusLabel = document.getElementById('voiceStatusLabel');

            if (window.localStream) {
                window.localStream.getTracks().forEach(track => track.stop());
                window.localStream = null;
                if (voiceBtn) voiceBtn.innerHTML = `<i class="fa-solid fa-microphone mr-1"></i> Join Voice Channel`;
                if (statusLabel) statusLabel.innerText = "Voice Disconnected";
                showToast("Disconnected from Voice Lobby.");
                return;
            }

            try {
                window.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                if (voiceBtn) voiceBtn.innerHTML = `<i class="fa-solid fa-microphone-slash text-red-400 mr-1"></i> Mute / Disconnect`;
                if (statusLabel) statusLabel.innerText = "● Live Voice Connected (P2P Mesh)";
                showToast("Connected to P2P Voice Lobby!");
            } catch (err) {
                console.error("Microphone access error:", err);
                showToast("⚠️ Microphone access denied or unavailable.");
            }
        };

        function escapeHTML(str) {
            if (!str) return '';
            return str.replace(/[&<>'"]/g, 
                tag => ({ '&': '&', '<': '<', '>': '>', "'": '&#39;', '"': '"' }[tag] || tag)
            );
        }

        window.formatMentions = function(text) {
            if (!text) return '';
            let escaped = escapeHTML(text);
            return escaped.replace(/(@[a-zA-Z0-9_]+)/g, '<span class="text-cyan-400 font-extrabold cursor-pointer hover:underline" onclick="openUserProfileModal(\'$1\', event)">$1</span>');
        };

        window.activeDmUser = null;
        window.dmMessagesList = JSON.parse(localStorage.getItem('sinless_dm_messages') || '{}');
        window.dmVoiceStream = null;

        window.toggleDirectVoiceCall = async function() {
            const callBtn = document.getElementById('dmVoiceCallBtn');
            const partner = window.activeDmUser;

            if (!partner) {
                showToast("⚠️ Select a user to call!");
                return;
            }

            if (window.dmVoiceStream) {
                window.dmVoiceStream.getTracks().forEach(t => t.stop());
                window.dmVoiceStream = null;
                if (callBtn) callBtn.innerHTML = `<i class="fa-solid fa-phone text-emerald-400 mr-1"></i> Voice Call`;
                showToast(`📞 Voice call ended with @${partner}`);
                return;
            }

            try {
                window.dmVoiceStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                if (callBtn) callBtn.innerHTML = `<i class="fa-solid fa-phone-slash text-red-400 mr-1"></i> End Call`;
                showToast(`🎙️ 1-on-1 Voice Call connected with @${partner}!`);
            } catch (err) {
                console.error("DM Voice call error:", err);
                showToast("⚠️ Microphone access denied.");
            }
        };

        window.openDmModal = function(targetUser = null, e = null) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            document.getElementById('dmModal').classList.remove('hidden');
            if (targetUser) {
                window.selectDmTarget(targetUser);
            } else {
                window.renderDmThread();
            }
        };

        window.closeDmModal = function() {
            if (window.dmVoiceStream) {
                window.dmVoiceStream.getTracks().forEach(t => t.stop());
                window.dmVoiceStream = null;
            }
            document.getElementById('dmModal').classList.add('hidden');
        };

        window.selectDmTarget = function(username) {
            window.activeDmUser = username.replace('@', '');
            document.getElementById('dmHeaderUser').innerText = `@${window.activeDmUser}`;
            window.renderDmThread();
        };

        window.renderDmThread = function() {
            const container = document.getElementById('dmMessagesContainer');
            if (!container) return;

            if (!window.activeDmUser) {
                container.innerHTML = `<p class="text-xs text-gray-400 text-center py-8">Select or search a gamertag to start private messaging.</p>`;
                return;
            }

            const me = (window.myUsername || '@SinlessGaming').replace('@', '').toLowerCase();
            const partner = window.activeDmUser.toLowerCase();
            const threadKey = [me, partner].sort().join('_');

            const msgs = window.dmMessagesList[threadKey] || [];
            container.innerHTML = '';

            if (msgs.length === 0) {
                container.innerHTML = `<p class="text-xs text-gray-400 text-center py-8">No direct messages yet with @${window.activeDmUser}.</p>`;
                return;
            }

            msgs.forEach(m => {
                const isMe = m.sender.toLowerCase() === me;
                if (m.isImage) {
                    const timerBadge = getRemainingTimeBadge(m.timestamp);
                    container.innerHTML += `
                        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} my-1">
                            <div class="max-w-[75%] p-2 bg-gg-900 border border-cyan-500/20 rounded-2xl space-y-1">
                                <div class="flex justify-between items-center text-[8px] space-x-2">
                                    <span class="text-cyan-400 font-bold">@${m.sender}</span>
                                    <span class="text-amber-400 font-extrabold">${timerBadge}</span>
                                </div>
                                <img src="${m.imageUrl}" class="max-h-52 rounded-xl object-contain bg-black w-full cursor-pointer" onclick="openMediaZoomModal('image', '${m.imageUrl}')">
                            </div>
                        </div>
                    `;
                } else {
                    container.innerHTML += `
                        <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'} my-1">
                            <div class="max-w-[75%] p-2.5 rounded-2xl text-xs ${isMe ? 'bg-cyan-500 text-slate-950 font-semibold' : 'bg-gg-900 text-white border border-cyan-500/20'}">
                                ${formatMentions(m.text)}
                            </div>
                        </div>
                    `;
                }
            });
            container.scrollTop = container.scrollHeight;
        };

        window.sendDirectMessage = function() {
            const input = document.getElementById('dmInputText');
            const text = input.value.trim();
            if (!text || !window.activeDmUser) return;

            const me = (window.myUsername || '@SinlessGaming').replace('@', '');
            const partner = window.activeDmUser;
            const threadKey = [me.toLowerCase(), partner.toLowerCase()].sort().join('_');

            if (!window.dmMessagesList[threadKey]) window.dmMessagesList[threadKey] = [];
            window.dmMessagesList[threadKey].push({ sender: me, text: text, timestamp: Date.now() });

            localStorage.setItem('sinless_dm_messages', JSON.stringify(window.dmMessagesList));
            input.value = '';
            window.renderDmThread();
        };

        window.activeViewObservers = {};

        function initViewTracker() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const postId = entry.target.getAttribute('data-post-id');
                    if (!postId) return;

                    if (entry.isIntersecting) {
                        if(!window.seenPostsList[postId]) {
                            window.seenPostsList[postId] = true;
                            localStorage.setItem('sinless_seen_posts', JSON.stringify(window.seenPostsList));
                        }
                        if (!window.activeViewObservers[postId]) {
                            window.activeViewObservers[postId] = setTimeout(() => {
                                incrementPostView(postId);
                            }, 5000);
                        }
                    } else {
                        if (window.activeViewObservers[postId]) {
                            clearTimeout(window.activeViewObservers[postId]);
                            delete window.activeViewObservers[postId];
                        }
                    }
                });
            }, { threshold: 0.6 });

            document.querySelectorAll('.post-card-item').forEach(card => {
                observer.observe(card);
            });
        }
        window.initViewTracker = initViewTracker;

        async function incrementPostView(postId) {
            const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
            if (!post) return;

            post.viewsCount = (post.viewsCount || 0) + 1;
            
            const badge = document.getElementById(`viewsCounterBadge_${postId}`);
            if (badge) badge.innerText = `${post.viewsCount} Views`;

            const targetId = post.docId || post.id;
            if (window.db && targetId && !post.isLocalFallback && !String(targetId).startsWith('local_')) {
                try {
                    const postRef = doc(window.db, "posts", targetId);
                    await updateDoc(postRef, {
                        viewsCount: increment(1)
                    });
                } catch(e) {}
            }
        }

        window.currentBroadcastStream = null;
        window.currentFacingMode = 'user';
        window.isStreamPaused = false;
        window.isAudioMuted = false;

        window.openLiveBroadcastModal = function() { document.getElementById('liveStreamModal').classList.remove('hidden'); };
        window.closeLiveBroadcastModal = function() {
            window.stopLiveStream();
            document.getElementById('liveStreamModal').classList.add('hidden');
        };

        window.stopLiveStream = function() {
            if (window.currentBroadcastStream) {
                window.currentBroadcastStream.getTracks().forEach(t => t.stop());
                window.currentBroadcastStream = null;
            }
            const previewVideo = document.getElementById('liveStreamPreviewVideo');
            const embedIframe = document.getElementById('liveStreamEmbedIframe');
            const placeholder = document.getElementById('streamPlaceholder');
            
            if (previewVideo) {
                previewVideo.srcObject = null;
                previewVideo.classList.add('hidden');
            }
            if (embedIframe) {
                embedIframe.src = '';
                embedIframe.classList.add('hidden');
            }
            if (placeholder) placeholder.classList.remove('hidden');

            window.isStreamPaused = false;
            window.isAudioMuted = false;

            const pauseBtn = document.getElementById('pauseStreamBtn');
            if (pauseBtn) {
                pauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i><span>Pause</span>`;
            }

            const muteBtn = document.getElementById('muteAudioBtn');
            if (muteBtn) {
                muteBtn.innerHTML = `<i class="fa-solid fa-microphone"></i><span>Mute</span>`;
            }

            const statusLabel = document.getElementById('liveStreamStatusLabel');
            if (statusLabel) {
                statusLabel.innerText = '● LIVE BROADCAST CENTER';
                statusLabel.className = 'text-xs font-black text-red-500';
            }
        };

        window.startLiveStream = async function(mode) {
            const previewVideo = document.getElementById('liveStreamPreviewVideo');
            const embedIframe = document.getElementById('liveStreamEmbedIframe');
            const placeholder = document.getElementById('streamPlaceholder');
            const statusLabel = document.getElementById('liveStreamStatusLabel');

            window.stopLiveStream();

            try {
                window.currentBroadcastStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: window.currentFacingMode }, 
                    audio: true 
                });

                if (placeholder) placeholder.classList.add('hidden');
                if (embedIframe) embedIframe.classList.add('hidden');
                if (previewVideo) {
                    previewVideo.classList.remove('hidden');
                    previewVideo.srcObject = window.currentBroadcastStream;
                }

                statusLabel.innerText = `● BROADCASTING LIVE (CAMERA)`;
                statusLabel.className = 'text-xs font-black text-red-500 animate-pulse';

                showToast(`🔴 Stream Online via Camera!`);
            } catch(e) {
                console.error("Streaming error:", e);
                showToast("⚠️ Camera/Microphone access denied or unavailable.");
            }
        };

        window.embedExternalStreamLink = function() {
            const urlInput = document.getElementById('streamUrlInput');
            let rawUrl = urlInput ? urlInput.value.trim() : '';

            if (!rawUrl) {
                showToast("⚠️ Please enter a valid YouTube/Twitch/Stream URL!");
                return;
            }

            window.stopLiveStream();

            let embedUrl = rawUrl;
            if (rawUrl.includes('youtube.com/watch?v=')) {
                embedUrl = rawUrl.replace('watch?v=', 'embed/');
            } else if (rawUrl.includes('youtu.be/')) {
                embedUrl = rawUrl.replace('youtu.be/', 'youtube.com/embed/');
            } else if (rawUrl.includes('twitch.tv/')) {
                const channel = rawUrl.split('twitch.tv/')[1].split('/')[0];
                embedUrl = `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname || 'localhost'}`;
            }

            const previewVideo = document.getElementById('liveStreamPreviewVideo');
            const embedIframe = document.getElementById('liveStreamEmbedIframe');
            const placeholder = document.getElementById('streamPlaceholder');
            const statusLabel = document.getElementById('liveStreamStatusLabel');

            if (placeholder) placeholder.classList.add('hidden');
            if (previewVideo) previewVideo.classList.add('hidden');

            if (embedIframe) {
                embedIframe.src = embedUrl;
                embedIframe.classList.remove('hidden');
            }

            if (statusLabel) {
                statusLabel.innerText = `● LIVE EXTERNAL STREAM`;
                statusLabel.className = 'text-xs font-black text-red-500 animate-pulse';
            }

            showToast("📺 Live External Stream Embedded!");
        };

        window.flipCamera = async function() {
            window.currentFacingMode = window.currentFacingMode === 'user' ? 'environment' : 'user';
            showToast(`Switching to ${window.currentFacingMode === 'user' ? 'Front' : 'Rear'} Camera...`);
            await window.startLiveStream('camera');
        };

        window.applyStreamFilter = function(filterClass) {
            const previewVideo = document.getElementById('liveStreamPreviewVideo');
            if (!previewVideo) return;
            previewVideo.style.filter = filterClass;
            showToast("Visual Filter Applied!");
        };

        window.togglePauseStream = function() {
            if (!window.currentBroadcastStream) return;

            window.isStreamPaused = !window.isStreamPaused;
            window.currentBroadcastStream.getVideoTracks().forEach(track => {
                track.enabled = !window.isStreamPaused;
            });

            const btn = document.getElementById('pauseStreamBtn');
            if (btn) {
                btn.innerHTML = window.isStreamPaused 
                    ? `<i class="fa-solid fa-play"></i><span>Resume</span>` 
                    : `<i class="fa-solid fa-pause"></i><span>Pause</span>`;
            }
            showToast(window.isStreamPaused ? "Video Paused" : "Video Resumed");
        };

        window.toggleAudioMute = function() {
            if (!window.currentBroadcastStream) return;
            window.isAudioMuted = !window.isAudioMuted;
            window.currentBroadcastStream.getAudioTracks().forEach(track => {
                track.enabled = !window.isAudioMuted;
            });

            const btn = document.getElementById('muteAudioBtn');
            if (btn) {
                btn.innerHTML = window.isAudioMuted 
                    ? `<i class="fa-solid fa-microphone-slash text-red-400"></i><span>Unmute</span>` 
                    : `<i class="fa-solid fa-microphone"></i><span>Mute</span>`;
            }
            showToast(window.isAudioMuted ? "Microphone Muted" : "Microphone Unmuted");
        };

        window.listenToFirestorePosts = function() {
            if(!window.db || typeof query !== 'function') return;
            const q = query(collection(window.db, "posts"), orderBy("createdAt", "desc"), limit(30));
            onSnapshot(q, (snapshot) => {
                let cloudPosts = [];
                snapshot.forEach((docSnap) => {
                    cloudPosts.push({ id: docSnap.id, docId: docSnap.id, ...docSnap.data() });
                });
                let localPosts = (window.fypposts || []).filter(p => p.isLocalFallback);
                window.fypposts = [...localPosts, ...cloudPosts];
                if(window.renderFypFeed) window.renderFypFeed();
                if(window.renderTopAccounts) window.renderTopAccounts();
                if(window.renderLadder) window.renderLadder();
            }, (error) => { console.warn("Firestore listener error:", error); });
        };

        window.submitMarketListingToCloud = async function() {
            let title = document.getElementById('marketTitleInput').value.trim();
            let price = document.getElementById('marketPriceInput').value.trim();
            if(!title || !price) return;

            if(window.db && typeof addDoc === 'function') {
                try {
                    await addDoc(collection(window.db, "market"), {
                        title: title,
                        price: price,
                        user: (window.myUsername || '@SinlessGaming').replace('@',''),
                        uid: window.currentUser ? window.currentUser.uid : 'guest',
                        createdAt: typeof serverTimestamp === 'function' ? serverTimestamp() : new Date().toISOString()
                    });
                    document.getElementById('marketTitleInput').value = '';
                    document.getElementById('marketPriceInput').value = '';
                    closeMarketModal();
                    showToast("Listed on Cloud Market!");
                } catch(e) { showToast("Market sync failed."); }
            }
        };

        window.listenToFirestoreMarket = function() {
            if(!window.db || typeof query !== 'function') return;
            const q = query(collection(window.db, "market"), orderBy("createdAt", "desc"), limit(20));
            onSnapshot(q, (snapshot) => {
                window.marketListings = [];
                snapshot.forEach((doc) => {
                    window.marketListings.push({ id: doc.id, ...doc.data() });
                });
                if(window.renderMarketList) window.renderMarketList();
            });
        };

// ===== Application Logic =====

let activeCategoryFilter = 'ALL';
        window.myUsername = '@SinlessGaming';
        window.myDisplayName = 'Sinless Gaming';
        window.fypposts = [];
        window.marketListings = [];
        window.uploadedMediaBlobs = [];
        window.selectedAudioTrack = null;

        window.userCategoryWeights = JSON.parse(localStorage.getItem('sinless_cat_weights') || '{}');
        window.seenPostsList = JSON.parse(localStorage.getItem('sinless_seen_posts') || '{}');

        window.boostCategoryInterest = function(category) {
            if(!category) return;
            window.userCategoryWeights[category] = (window.userCategoryWeights[category] || 0) + 1;
            localStorage.setItem('sinless_cat_weights', JSON.stringify(window.userCategoryWeights));
        };

        let currentPreview = null;
        let selectedAudioUrl = "";

        function openSoundModal() { document.getElementById('soundPickerModal').classList.remove('hidden'); }
        function closeSoundModal() { document.getElementById('soundPickerModal').classList.add('hidden'); }

        function previewAudio(url) {
            if (currentPreview) currentPreview.pause();
            currentPreview = new Audio(url);
            currentPreview.volume = 0.5;
            currentPreview.play().catch(err => console.warn("Audio preview failed:", err));
            document.getElementById('audioPlayingStatus').innerText = "▶ Audio preview playing";
        }

        function selectTrack(url, label) {
            selectedAudioUrl = url;
            window.selectedAudioTrack = label;
            document.getElementById('selectedSoundLabel').innerText = label;
            previewAudio(url);
        }

        function stopAudioPreview() {
            if (currentPreview) { currentPreview.pause(); currentPreview.currentTime = 0; }
            document.getElementById('audioPlayingStatus').innerText = "Audio preview stopped";
        }

        function showToast(msg) {
            let banner = document.getElementById('toastBanner');
            if(!banner) return;
            banner.innerText = msg;
            banner.style.opacity = '1';
            banner.style.pointerEvents = 'auto';
            setTimeout(() => {
                banner.style.opacity = '0';
                banner.style.pointerEvents = 'none';
            }, 3000);
        }

        async function initApp() {
            document.getElementById('headerUserTag').innerText = window.myUsername;

            if (window.loadLocalPostsFromDB) {
                let storedPosts = await window.loadLocalPostsFromDB();
                if (storedPosts.length > 0) window.fypposts = storedPosts.reverse();
            }

            if (window.loadLocalStoriesFromDB) {
                let storedStories = await window.loadLocalStoriesFromDB();
                window.profileStories = storedStories.reverse();
            }

            if (typeof listenToFirestorePosts === 'function') listenToFirestorePosts();
            if (typeof listenToFirestoreMarket === 'function') listenToFirestoreMarket();
            if (typeof listenToFirestoreSquads === 'function') listenToFirestoreSquads();

            pruneExpiredEphemeralData();
            renderStoriesBar();
            renderClansList();
            renderLadder('ALL');
            renderTopAccounts();
            runTrendingTopics();
            fetchHorizontalLiveMatches();
            renderFypFeed();
            renderTournamentsTab();
            renderTournamentsTabDedicated();
            initMediaTouchZoomControls();

            setInterval(fetchHorizontalLiveMatches, 90000);
        }

        function compressImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.85) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        let width = img.width;
                        let height = img.height;
                        if (width > maxWidth || height > maxHeight) {
                            const ratio = Math.min(maxWidth / width, maxHeight / height);
                            width = Math.round(width * ratio);
                            height = Math.round(height * ratio);
                        }
                        const canvas = document.createElement('canvas');
                        canvas.width = width; canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        resolve(canvas.toDataURL('image/jpeg', quality));
                    };
                };
            });
        }

        async function handleMediaSelection(input) {
            const files = Array.from(input.files);
            if (files.length > 10) { showToast("⚠️ Max 10 items per post!"); return; }

            window.uploadedMediaBlobs = [];
            const thumbContainer = document.getElementById('mediaPreviewThumbnails');
            thumbContainer.innerHTML = '';
            document.getElementById('mediaCountIndicator').innerText = `${files.length} / 10 selected`;

            for (let file of files) {
                if (file.type.includes('video')) {
                    const videoUrl = URL.createObjectURL(file);
                    window.uploadedMediaBlobs.push({ type: 'video', url: videoUrl });
                    thumbContainer.innerHTML += `<div class="relative w-14 h-14 rounded-xl bg-gg-900 border border-cyan-500/30 overflow-hidden"><video src="${videoUrl}" class="w-full h-full object-cover"></video></div>`;
                } else {
                    const compressedDataUrl = await compressImage(file, 1920, 1080, 0.85);
                    window.uploadedMediaBlobs.push({ type: 'image', url: compressedDataUrl });
                    thumbContainer.innerHTML += `<div class="relative w-14 h-14 rounded-xl bg-gg-900 border border-cyan-500/30 overflow-hidden"><img src="${compressedDataUrl}" class="w-full h-full object-cover"></div>`;
                }
            }
        }

        let currentScale = 1, translateX = 0, translateY = 0;
        let initialPinchDistance = 0, initialScale = 1;
        let lastTouchX = 0, lastTouchY = 0, lastTapTime = 0;
        window.activeZoomPostId = null;

        window.openMediaZoomModal = function(type, url, postId = null, textContent = null) {
            const modal = document.getElementById('mediaZoomModal');
            const container = document.getElementById('mediaViewerContainer');
            
            currentScale = 1; translateX = 0; translateY = 0;
            window.activeZoomPostId = postId;
            
            if (type === 'video') {
                container.innerHTML = `<video id="zoomTargetElement" src="${url}" controls autoplay class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"></video>`;
            } else if (type === 'text') {
                container.innerHTML = `<div id="zoomTargetElement" class="p-6 bg-gg-900 border border-cyan-500/30 rounded-2xl shadow-2xl text-white max-w-sm w-full text-center flex flex-col justify-center min-h-[300px]"><p class="text-sm font-bold leading-relaxed">${formatMentions(textContent)}</p></div>`;
            } else {
                container.innerHTML = `<img id="zoomTargetElement" src="${url}" class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl">`;
            }
            
            const interactionBar = document.getElementById('mediaZoomInteractionBar');
            if (postId) {
                renderZoomInteractions(postId);
                interactionBar.classList.remove('hidden');
            } else {
                interactionBar.classList.add('hidden');
            }
            
            modal.classList.remove('hidden');
        };

        window.renderZoomInteractions = function(postId) {
            const interactionBar = document.getElementById('mediaZoomInteractionBar');
            const post = (window.fypposts || []).find(p => p.id === postId || p.docId === postId);
            if (post && interactionBar) {
                const uid = window.currentUser ? window.currentUser.uid : 'guest_user';
                const hasGGed = post.ggsBy && post.ggsBy.includes(uid);
                interactionBar.innerHTML = `
                    <button onclick="toggleGGPost('${postId}')" class="flex items-center space-x-2 ${hasGGed ? 'text-cyan-400' : 'text-white'} font-black hover:text-cyan-400 transition transform active:scale-95 text-sm">
                        <i class="${hasGGed ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i>
                        <span>${post.ggsCount || 0}</span>
                    </button>
                    <div class="w-px h-6 bg-cyan-500/30"></div>
                    <button onclick="closeMediaZoomModal(); openCommentsModal('${postId}')" class="flex items-center space-x-2 text-white font-bold hover:text-cyan-400 transition transform active:scale-95 text-sm">
                        <i class="fa-regular fa-comment"></i>
                        <span>${post.commentsCount || 0} Replies</span>
                    </button>
                `;
            }
        };

        function closeMediaZoomModal() {
            document.getElementById('mediaZoomModal').classList.add('hidden');
            document.getElementById('mediaViewerContainer').innerHTML = '';
            currentScale = 1; translateX = 0; translateY = 0;
            window.activeZoomPostId = null;
        }

        function updateZoomTransform() {
            const el = document.getElementById('zoomTargetElement');
            if (el) {
                el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
            }
        }

        function initMediaTouchZoomControls() {
            const container = document.getElementById('mediaViewerContainer');
            if (!container) return;

            container.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    initialPinchDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    initialScale = currentScale;
                } else if (e.touches.length === 1) {
                    lastTouchX = e.touches[0].clientX;
                    lastTouchY = e.touches[0].clientY;

                    const now = Date.now();
                    if (now - lastTapTime < 300) {
                        e.preventDefault();
                        if (window.activeZoomPostId) {
                            toggleGGPost(window.activeZoomPostId);
                            showToast("❤️ GGs Liked!");
                        }
                        currentScale = currentScale === 1 ? 2.5 : 1;
                        translateX = 0; translateY = 0;
                        updateZoomTransform();
                    }
                    lastTapTime = now;
                }
            }, { passive: false });

            container.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    const currentDist = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                    if (initialPinchDistance > 0) {
                        currentScale = Math.min(Math.max(1, initialScale * (currentDist / initialPinchDistance)), 4);
                        updateZoomTransform();
                    }
                } else if (e.touches.length === 1 && currentScale > 1) {
                    e.preventDefault();
                    const deltaX = e.touches[0].clientX - lastTouchX;
                    const deltaY = e.touches[0].clientY - lastTouchY;
                    translateX += deltaX;
                    translateY += deltaY;
                    lastTouchX = e.touches[0].clientX;
                    lastTouchY = e.touches[0].clientY;
                    updateZoomTransform();
                }
            }, { passive: false });

            container.addEventListener('touchend', (e) => {
                if (e.touches.length < 2) initialPinchDistance = 0;
            });
        }

        async function fetchHorizontalLiveMatches() {
            const carousel = document.getElementById('horizontalLiveMatchesCarousel');
            if (!carousel) return;

            carousel.innerHTML = '<div class="glass-panel p-4 rounded-2xl min-w-[240px] text-center text-xs text-gray-400">Loading live fixtures...</div>';

            try {
                const res = await fetch('https://api.sstats.net/games/list?Live=true&Limit=12');
                if (!res.ok) throw new Error('API failed');

                const data = await res.json();
                const matches = (data.data || []).slice(0, 8);

                if (matches.length === 0) {
                    carousel.innerHTML = '<div class="glass-panel p-4 rounded-2xl min-w-[240px] text-center text-xs text-gray-400">No live matches right now</div>';
                    return;
                }

                carousel.innerHTML = '';
                matches.forEach(m => {
                    const home = m.homeTeam?.name || 'Home';
                    const away = m.awayTeam?.name || 'Away';
                    const score = `${m.homeResult ?? 0} - ${m.awayResult ?? 0}`;
                    const minute = m.elapsed ? `${m.elapsed}'` : (m.statusName || 'LIVE');
                    const league = m.season?.league?.name || 'Live';

                    carousel.innerHTML += `
                        <div class="glass-panel p-3 rounded-2xl min-w-[220px] shrink-0 border border-red-500/30">
                            <div class="flex items-center justify-between mb-1.5">
                                <span class="text-[8px] text-red-400 font-black animate-pulse">● LIVE</span>
                                <span class="text-[8px] text-cyan-400 font-bold">${minute}</span>
                            </div>
                            <p class="text-xs font-bold text-white truncate">${home}</p>
                            <p class="text-base font-black text-cyan-400 my-0.5">${score}</p>
                            <p class="text-xs font-bold text-white truncate">${away}</p>
                            <p class="text-[8px] text-gray-400 mt-1 truncate">${league}</p>
                        </div>
                    `;
                });
            } catch (e) {
                console.warn('Live matches error:', e);
                carousel.innerHTML = '<div class="glass-panel p-4 rounded-2xl min-w-[240px] text-center text-xs text-gray-400">Live scores unavailable — check connection</div>';
            }
        }

        function openAccountModal() { document.getElementById('accountModal').classList.remove('hidden'); }
        function closeAccountModal() { document.getElementById('accountModal').classList.add('hidden'); }
        function openCreatePostModal() { document.getElementById('createPostModal').classList.remove('hidden'); }
        function closeCreatePostModal() { document.getElementById('createPostModal').classList.add('hidden'); }
        function openMarketModal() { document.getElementById('marketModal').classList.remove('hidden'); }
        function closeMarketModal() { document.getElementById('marketModal').classList.add('hidden'); }

        function switchView(viewName) {
            document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
            ['fyp', 'trending', 'market', 'clans', 'chat', 'tournaments', 'standings', 'popular'].forEach(v => {
                let navBtn = document.getElementById('nav-' + v);
                if(navBtn) {
                    navBtn.classList.remove('bg-magenta', 'text-white', 'font-extrabold', 'shadow-lg');
                    navBtn.classList.add('text-gray-400', 'font-bold');
                }
            });
            let activeSection = document.getElementById('view-' + viewName);
            let activeNav = document.getElementById('nav-' + viewName);
            if(activeSection) activeSection.classList.remove('hidden');
            if(activeNav) {
                activeNav.classList.remove('text-gray-400', 'font-bold');
                activeNav.classList.add('bg-magenta', 'text-white', 'font-extrabold', 'shadow-lg');
            }

            if (viewName === 'trending') {
                runTrendingTopics();
                fetchHorizontalLiveMatches();
            }
        }

        function filterByCategory(cat, btn) {
            activeCategoryFilter = cat;
            window.boostCategoryInterest(cat);
            document.querySelectorAll('#categoryFilterBar .cat-btn').forEach(b => {
                b.className = "cat-btn px-3 py-1.5 rounded-xl text-[10px] font-bold bg-gg-900 text-gray-300 border border-cyan-500/25 whitespace-nowrap transition";
            });
            if(btn) btn.className = "cat-btn px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-cyan-400 text-slate-950 whitespace-nowrap shadow transition";
            renderFypFeed();
        }

        window.renderFypFeed = function() {
            let container = document.getElementById('fypFeedContainer');
            if(!container) return;
            container.innerHTML = '';
            
            let filtered = (window.fypposts || []).filter(p => activeCategoryFilter === 'ALL' || (activeCategoryFilter === 'LIVE STREAM' ? p.isLive : p.game === activeCategoryFilter));
            
            filtered.sort((a, b) => {
                let getScore = (p) => {
                    let base = ((p.viewsCount||1)*0.1) + ((p.ggsCount||0)*2) + ((p.commentsCount||0)*3);
                    let ageHours = (Date.now() - new Date(p.createdAt || Date.now()).getTime()) / 3600000;
                    let catMulti = 1 + ((window.userCategoryWeights[p.game] || 0) * 0.05); 
                    let seenPenalty = window.seenPostsList[p.id] ? 0.5 : 1; 
                    return ((base + 1) * catMulti * seenPenalty) - (ageHours * 0.5); 
                };
                return getScore(b) - getScore(a);
            });
            
            if(filtered.length === 0) {
                container.innerHTML = `<div class="glass-panel p-4 rounded-2xl text-center text-xs text-gray-400">No cloud posts yet. Be the first to publish!</div>`;
                return;
            }

            filtered.forEach((post, index) => {
                let normalizedId = post.docId || post.id || ('post_fallback_' + index);
                post.id = normalizedId;

                const cleanMe = (window.myUsername || '@SinlessGaming').replace('@','').toLowerCase();
                const isMyPost = post.user && post.user.toLowerCase() === cleanMe;
                const isVerified = post.verified || (post.user && post.user.toLowerCase() === 'sinlessgaming');
                
                let audioBadge = post.audioTrack ? `<p class="text-[9px] text-cyan-400 font-bold mt-1.5 flex items-center"><i class="fa-solid fa-music mr-1.5"></i> ${post.audioTrack}</p>` : '';
                
                let mediaHtml = '';
                if (post.mediaList && post.mediaList.length > 0) {
                    mediaHtml = `<div class="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-cyan-500/10">`;
                    post.mediaList.forEach(m => {
                        if (m.type === 'video') {
                            mediaHtml += `<div class="relative cursor-pointer overflow-hidden rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition group" onclick="event.stopPropagation(); openMediaZoomModal('video', '${m.url}', '${normalizedId}')" ondblclick="event.stopPropagation(); toggleGGPost('${normalizedId}'); showToast('❤️ GGs Liked!')">
                                <video src="${m.url}" class="w-full h-36 rounded-xl object-cover bg-black pointer-events-none group-hover:scale-105 transition-transform duration-300" autoplay loop muted></video>
                                <i class="fa-solid fa-expand absolute top-2 right-2 text-xs text-white bg-slate-900/80 p-1 rounded-lg opacity-80 group-hover:opacity-100"></i>
                            </div>`;
                        } else {
                            mediaHtml += `<div class="relative cursor-pointer overflow-hidden rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition group" onclick="event.stopPropagation(); openMediaZoomModal('image', '${m.url}', '${normalizedId}')" ondblclick="event.stopPropagation(); toggleGGPost('${normalizedId}'); showToast('❤️ GGs Liked!')">
                                <img src="${m.url}" class="w-full h-36 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300">
                                <i class="fa-solid fa-expand absolute top-2 right-2 text-xs text-white bg-slate-900/80 p-1 rounded-lg opacity-80 group-hover:opacity-100"></i>
                            </div>`;
                        }
                    });
                    mediaHtml += `</div>`;
                }

                let captionHtml = post.caption ? `<p class="text-xs text-gray-200 leading-relaxed">${formatMentions(post.caption)}</p>` : '';

                let currentGGs = post.ggsCount || 0;
                let currentViews = post.viewsCount || 1;
                let uid = window.currentUser ? window.currentUser.uid : 'guest_user';
                let hasGGed = post.ggsBy && post.ggsBy.includes(uid);
                let commentsNum = post.commentsCount || 0;

                container.innerHTML += `
                    <div class="glass-panel rounded-2xl p-3.5 space-y-2.5 shadow-xl relative post-card-item hover:-translate-y-0.5 transition-all duration-200" data-post-id="${normalizedId}">
                        <div class="flex items-center justify-between border-b border-cyan-500/10 pb-1.5">
                            <div class="flex items-center space-x-1.5">
                                <span class="font-bold text-xs text-white cursor-pointer hover:text-cyan-400 transition" onclick="openUserProfileModal('${post.user}', event)">@${post.user}</span>
                                ${isVerified ? '<span class="verified-badge text-[10px]"><i class="fa-solid fa-circle-check"></i></span>' : ''}
                            </div>
                            <div class="flex items-center space-x-1.5">
                                <span class="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-extrabold uppercase">${post.game || 'GAMING'}</span>
                                ${isMyPost ? `
                                    <button onclick="event.stopPropagation(); openEditPostModal('${normalizedId}')" class="text-gray-400 hover:text-cyan-400 text-xs px-1 transition" title="Edit Post"><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button onclick="event.stopPropagation(); deletePost('${normalizedId}')" class="text-gray-400 hover:text-red-400 text-xs px-1 transition" title="Delete Post"><i class="fa-solid fa-trash"></i></button>
                                ` : ''}
                            </div>
                        </div>
                        ${captionHtml}
                        ${mediaHtml}
                        ${audioBadge}
                        
                        <div class="flex items-center justify-between pt-2 border-t border-cyan-500/10 text-xs">
                            <button onclick="event.stopPropagation(); toggleGGPost('${normalizedId}')" class="flex items-center space-x-1.5 ${hasGGed ? 'text-cyan-400 font-black' : 'text-gray-400 font-bold'} hover:text-cyan-400 transition active:scale-95 px-2 py-1 rounded-lg hover:bg-cyan-500/10">
                                <i class="${hasGGed ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i>
                                <span>${currentGGs} GGs</span>
                            </button>
                            <button onclick="event.stopPropagation(); openCommentsModal('${normalizedId}')" class="flex items-center space-x-1.5 text-gray-400 font-bold hover:text-cyan-400 transition active:scale-95 px-2 py-1 rounded-lg hover:bg-cyan-500/10">
                                <i class="fa-regular fa-comment"></i>
                                <span>${commentsNum} Replies</span>
                            </button>
                            <span id="viewsCounterBadge_${normalizedId}" class="text-[10px] text-gray-400 font-semibold flex items-center space-x-1">
                                <i class="fa-regular fa-eye"></i>
                                <span>${currentViews} Views</span>
                            </span>
                            <button onclick="event.stopPropagation(); shareContent('Sinless GG Post', '${(post.caption || 'Check out this clip on Sinless GG!').replace(/'/g, "\\'")}', window.location.href)" class="flex items-center space-x-1.5 text-gray-400 font-bold hover:text-cyan-400 transition active:scale-95 px-2 py-1 rounded-lg hover:bg-cyan-500/10">
                                <i class="fa-solid fa-share-nodes"></i>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                `;
            });

            setTimeout(() => {
                if (window.initViewTracker) window.initViewTracker();
            }, 300);
        };

        window.renderMarketList = function() {
            let box = document.getElementById('marketListContainer'); if(!box) return; box.innerHTML = '';
            if(!window.marketListings || window.marketListings.length === 0) {
                box.innerHTML = `<div class="glass-panel p-4 rounded-2xl text-center text-xs text-gray-400">No active cloud market listings.</div>`;
                return;
            }
            window.marketListings.forEach(item => {
                box.innerHTML += `<div class="glass-panel p-3 rounded-2xl flex justify-between items-center text-xs"><div><h4 class="font-bold text-white">${item.title}</h4><p class="text-[9px] text-gray-400 cursor-pointer" onclick="openUserProfileModal('${item.user}', event)">Seller: @${item.user}</p></div><span class="text-cyan-400 font-black">${item.price}</span></div>`;
            });
        };

        window.renderLadder = function(selectedGame = 'ALL') {
            let body = document.getElementById('ladderBody'); if(!body) return; body.innerHTML = '';
            let statsMap = {};
            (window.fypposts || []).forEach(p => {
                if (selectedGame !== 'ALL' && p.game !== selectedGame) return;
                let u = (p.user || 'Unknown').toLowerCase();
                if (!statsMap[u]) statsMap[u] = { gamertag: p.user, postsCount: 0, totalGGs: 0 };
                statsMap[u].postsCount += 1;
                statsMap[u].totalGGs += (p.ggsCount || 0);
            });

            let viralCreators = Object.values(statsMap).sort((a, b) => b.postsCount !== a.postsCount ? b.postsCount - a.postsCount : b.totalGGs - a.totalGGs);
            if (viralCreators.length === 0) {
                viralCreators = [
                    { gamertag: 'SinlessGaming', postsCount: 14, totalGGs: 180 },
                    { gamertag: 'Sinless101', postsCount: 9, totalGGs: 110 }
                ];
            }

            viralCreators.forEach((creator, idx) => {
                const badges = getProfileBadges ? getProfileBadges(creator.gamertag) : '';
                body.innerHTML += `
                    <div class="grid grid-cols-4 px-3 py-2.5 text-xs text-gray-200 items-center">
                        <span class="font-extrabold text-amber-400">#${idx+1}</span>
                        <div class="truncate"><span class="font-bold cursor-pointer text-white truncate" onclick="openUserProfileModal('${creator.gamertag}', event)">@${creator.gamertag}</span> ${badges}</div>
                        <span class="text-center font-extrabold text-emerald-400 bg-emerald-500/10 py-0.5 rounded-lg text-[10px]">${creator.postsCount} posts</span>
                        <span class="text-right text-cyan-400 font-black">${creator.totalGGs}</span>
                    </div>`;
            });
        }

        window.renderTopAccounts = function() {
            let list = document.getElementById('topAccountsList'); if(!list) return; list.innerHTML = '';
            
            let statsMap = {};
            (window.fypposts || []).forEach(p => {
                let u = (p.user || 'Unknown').toLowerCase();
                if (!statsMap[u]) statsMap[u] = { gamertag: p.user, totalGGs: 0, postsCount: 0 };
                statsMap[u].totalGGs += (p.ggsCount || 0);
                statsMap[u].postsCount += 1;
            });
            let sortedCreators = Object.values(statsMap).sort((a, b) => b.totalGGs - a.totalGGs);

            if (sortedCreators.length === 0) {
                ['SinlessGaming', 'Sinless101', 'AceKhyd'].forEach((u, i) => {
                    list.innerHTML += `<div class="glass-panel p-3 rounded-xl flex items-center justify-between text-xs cursor-pointer" onclick="openUserProfileModal('${u}', event)"><span class="font-bold text-white">#${i+1} @${u}</span><span class="text-cyan-400 font-bold">1.4k GGs</span></div>`;
                });
                return;
            }
            sortedCreators.forEach((creator, i) => {
                const badges = getProfileBadges ? getProfileBadges(creator.gamertag) : '';
                list.innerHTML += `<div class="glass-panel p-3 rounded-xl flex items-center justify-between text-xs cursor-pointer" onclick="openUserProfileModal('${creator.gamertag}', event)"><div class="flex items-center space-x-1.5"><span class="font-bold text-white">#${i+1} @${creator.gamertag}</span> ${badges}</div><span class="text-cyan-400 font-bold">${creator.totalGGs} GGs</span></div>`;
            });
        }

        function sendChatMessage() {
            let input = document.getElementById('chatInputMsg'); let text = input.value.trim();
            if(!text) return;
            let box = document.getElementById('chatMessagesBox');
            box.innerHTML += `<div class="bg-gg-900 p-2.5 rounded-xl text-xs space-y-0.5"><span class="text-cyan-400 font-bold cursor-pointer" onclick="openUserProfileModal('${window.myUsername}', event)">${window.myUsername}:</span> <span class="text-gray-200">${formatMentions(text)}</span></div>`;
            input.value = '';
            box.scrollTop = box.scrollHeight;
        }

        function switchChatRoom(room) {
            let box = document.getElementById('chatMessagesBox'); if(!box) return;
            box.innerHTML = `<div class="bg-gg-900 p-2 rounded-xl text-xs"><span class="text-cyan-400 font-bold">@GG-Bot:</span> Global gaming chat room active! Mention gamers using @username.</div>`;
        }

        function runTrendingTopics() {
            let list = document.getElementById('dynamicTrendingTopicsList'); if(!list) return;
            
            let posts = window.fypposts || [];
            if (posts.length > 0) {
                list.innerHTML = posts.slice(0, 5).map(p => `
                    <div class="p-3 bg-gg-950 rounded-xl border border-cyan-500/10 flex justify-between items-center cursor-pointer hover:border-cyan-400 transition" onclick="openUserProfileModal('${p.user}', event)">
                        <div>
                            <h4 class="text-xs font-black text-white">@${p.user}</h4>
                            <p class="text-[10px] text-gray-300 line-clamp-1">${p.caption || 'New clip uploaded!'}</p>
                        </div>
                        <span class="text-[9px] text-cyan-400 font-bold uppercase shrink-0 ml-2">${p.game || 'POST'}</span>
                    </div>
                `).join('');
            } else {
                list.innerHTML = `
                    <div class="p-3 bg-gg-950 rounded-xl border border-cyan-500/10"><h4 class="text-xs font-black text-white">#SinlessSuperLeague</h4><p class="text-[9px] text-cyan-400">4,320 posts • Ghana</p></div>
                    <div class="p-3 bg-gg-950 rounded-xl border border-cyan-500/10"><h4 class="text-xs font-black text-white">#PremierLeague</h4><p class="text-[9px] text-cyan-400">3,360 posts • Football</p></div>
                    <div class="p-3 bg-gg-950 rounded-xl border border-cyan-500/10"><h4 class="text-xs font-black text-white">#FCMobileChampions</h4><p class="text-[9px] text-cyan-400">2,110 posts • FC Mobile</p></div>
                `;
            }
        }

        function handleGlobalSearch(q) {
            let res = document.getElementById('dynamicTrendingTopicsList');
            if(!res) return;
            if(!q || !q.trim()) { runTrendingTopics(); return; }
            let matches = (window.fypposts || []).filter(p => (p.caption && p.caption.toLowerCase().includes(q.toLowerCase())) || (p.user && p.user.toLowerCase().includes(q.toLowerCase())) || (p.game && p.game.toLowerCase().includes(q.toLowerCase())));
            res.innerHTML = matches.map(p => `<div class="p-3 bg-gg-950 rounded-xl text-xs text-white border border-cyan-500/10"><span class="font-bold cursor-pointer text-cyan-400" onclick="openUserProfileModal('${p.user}', event)">@${p.user}</span>: ${p.caption || 'Media Clip'}</div>`).join('') || '<p class="text-xs text-gray-400 text-center py-4">No matching posts or gamertags found.</p>';
        }
