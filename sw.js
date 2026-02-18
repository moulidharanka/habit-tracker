const CACHE = "habit-cache-v2";

const ASSETS = [
  "/habit-tracker/",
  "/habit-tracker/index.html",
  "/habit-tracker/manifest.json",
  "/habit-tracker/icon-192.png",
  "/habit-tracker/icon-512.png"
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
