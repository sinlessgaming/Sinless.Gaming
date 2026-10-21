// Sinless GG service worker
// - Lets the app be installed on the home screen.
// - Always tries the internet first, so updates you upload to GitHub show up straight away.
// - If there's no internet, it opens the last saved copy of the app instead of a blank page.
const CACHE = 'sinless-gg-v31';
const APP_FILES = ['./', './index.html', './tailwind.css', './styles.css', './app.js', './firebase-config.js', './manifest.json', './icon-192.png', './icon-512.png', './logo-96.png', './icon-180.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_FILES)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  // Only handle our own app files; Firebase, Cloudinary, scores etc. go straight to the internet
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
  );
});

// Tapping a phone alert opens (or focuses) the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow(url);
    })
  );
});

// Phone alerts sent while the app is closed (from the Sinless GG push helper via Firebase Cloud Messaging)
self.addEventListener('push', (event) => {
  let j = {};
  try { j = event.data ? event.data.json() : {}; } catch (e) { j = { data: { body: event.data ? event.data.text() : '' } }; }
  const d = j.data || j || {};
  const n = j.notification || {};
  const title = d.title || n.title || 'Sinless GG';
  const opts = {
    body: d.body || n.body || '',
    icon: 'icon-192.png', badge: 'icon-192.png',
    tag: d.tag || undefined, renotify: !!d.tag,
    data: { url: d.url || './' }
  };
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      // if the app is open and on screen, it shows its own in-app alert instead
      if (list.some((c) => c.visibilityState === 'visible')) return;
      return self.registration.showNotification(title, opts);
    })
  );
});
