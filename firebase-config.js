import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, initializeFirestore, memoryLocalCache, 
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
// Always read fresh from the server (the saved-on-phone copy could get stuck when several tabs were open,
// which made the feed look empty). The app keeps its own small quick-start copy of the feed.
let db;
try { db = initializeFirestore(app, { localCache: memoryLocalCache() }); }
catch (e) { db = getFirestore(app); }
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let messaging = null;
try {
    messaging = getMessaging(app);
} catch (e) {
    console.warn("FCM Messaging unsupported in this context.");
}

// Global window bindings for Firestore
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

// Global window bindings for Authentication & Messaging
window.googleProvider = googleProvider;
window.signInWithPopup = signInWithPopup;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
window.messaging = messaging;
window.getToken = getToken;
window.onMessage = onMessage;
