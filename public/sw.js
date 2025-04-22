/* eslint-disable no-restricted-globals */
// Name your cache (you can version it)
const CACHE_NAME = "v1";

// List of URLs you want to cache
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/favicon.ico",
  "/user",
  "/about",
];

// ===============================
// Install Event
// ===============================
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install Event");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching App Shell");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("[Service Worker] Failed to cache", error);
      })
  );
});

// ===============================
// Fetch Event
// ===============================
self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetch Event for:", event.request.url);

  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          console.log("[Service Worker] Found in Cache:", event.request.url);
          return cachedResponse;
        }

        // If not found, fetch from network
        console.log(
          "[Service Worker] Fetching from Network:",
          event.request.url
        );
        return fetch(event.request).then((networkResponse) => {
          // Optionally, we can also cache this new file dynamically
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
      .catch((error) => {
        console.error("[Service Worker] Fetch Failed:", error);
        // You can also show a fallback page here if desired
      })
  );
});

// clone the caches
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(
        caches.match(event.request).then((respond) => {
          if (!respond) {
            const requestURL = event.request.clone();
            fetch(requestURL);
          }
        })
      )
    );
  }
});

// ===============================
// Activate Event (Optional but recommended)
// ===============================
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate Event");

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
