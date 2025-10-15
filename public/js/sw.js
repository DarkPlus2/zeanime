// public/js/sw.js
const CACHE = "ultimate-anime-shell-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/catalog.html",
  "/watch.html",
  "/offline.html",
  "/css/style.css",
  "/js/main.js",
  "/js/catalog.js",
  "/js/watch.js",
  "/js/errors.js",
  "/assets/placeholder.jpg"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // navigation => network-first with fallback to offline.html
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => {
      // update cache
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return r;
    }).catch(() => caches.match("/offline.html")));
    return;
  }

  // assets => cache-first
  e.respondWith(caches.match(req).then(cached => cached || fetch(req).then(networkRes => {
    // optionally cache same-origin GETs
    if (req.method === "GET" && req.url.startsWith(self.location.origin)) {
      caches.open(CACHE).then(c => c.put(req, networkRes.clone()));
    }
    return networkRes;
  }).catch(() => {
    // fallback for images
    if (req.destination === "image") return caches.match("/assets/placeholder.jpg");
  })));
});
