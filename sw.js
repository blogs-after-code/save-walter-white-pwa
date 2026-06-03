const CACHE_NAME = "walter-white-v1";

// Files to cache for offline use
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/assets/Breaking Bad.jpeg",
  "/assets/walter_1.jpg",
  "/assets/walter_2.jpg",
  "/assets/walter_3.jpg",
  "/assets/walter_4.jpg",
  "/assets/walter_5.jpg",
  "/assets/walter_6.jpg",
  "/assets/walter_7.jpg",
  "/assets/save_walter_banner.png",
  "/assets/donate_button.png",
  "/assets/icons8-walter-white-32.png"
];

// Install — cache everything
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate — delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch — serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});