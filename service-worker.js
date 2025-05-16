self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("mantra-cache").then(cache =>
      cache.addAll(["index.html", "style.css", "script.js", "jai-shri-ram.mp3"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});