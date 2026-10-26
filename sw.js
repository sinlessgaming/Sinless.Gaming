// Sinless GG service worker
// - Lets the app be installed on the home screen.
// - Opens instantly from the saved copy. A new version is downloaded whole, then used on the next open.
// - Each update has a new CACHE name, so the newest files are fetched as soon as an update is uploaded.
// - If there's no internet, it opens the last saved copy of the app instead of a blank page.
const CACHE = 'sinless-gg-v56';
const APP_FILES = ['./', './index.html', './tailwind.css', './styles.css', './app.js', './firebase-config.js', './manifest.json', './icon-192.png', './icon-512.png', './logo-96.png', './icon-180.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_FILES.map((u) => new Request(u, { cache: 'reload' })))).catch(() => {}));
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
  // Only our own app files; Firebase, Cloudinary, YouTube, ads etc. go straight to the internet
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  // ads.txt and the legal pages always come fresh
  if (/\/(ads\.txt|robots\.txt|sitemap\.xml)$/.test(url.pathname)) return;
  // The app's own files are used as ONE matching set from this version's saved copy (never a mix of old + new files,
  // which could break sign-in). A new version is downloaded whole in the background and swapped in on the next open.
  const isApp = req.mode === 'navigate' || APP_FILES.some((f) => f !== './' && url.pathname.endsWith(f.slice(1)));
  event.respondWith(caches.open(CACHE).then(async (c) => {
    const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await c.match('./index.html') : null);
    if (hit && isApp) return hit;
    // pictures and other files: saved copy instantly, refreshed quietly for next time
    const fresh = fetch(req).then((res) => { if (res && res.ok) c.put(req, res.clone()).catch(() => {}); return res; }).catch(() => hit);
    if (hit) { event.waitUntil(fresh.catch(() => {})); return hit; }
    return fresh.then((r) => r || caches.match('./index.html'));
  }));
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
    vibrate: [200, 100, 200], silent: false, timestamp: Date.now(),
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
