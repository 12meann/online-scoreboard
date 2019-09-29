const staticCacheName = "site-static-v2"; //
const dynamicCacheName = "site-dynamic-v2";
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "./js/app.js",
  "js/scoreboard.js",
  "css/style.css",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
  "https://code.jquery.com/jquery-3.3.1.slim.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
];
// limit cache size -- delete oldest one
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

//install sw
self.addEventListener("install", e => {
  console.log("serviceWorker has been installed");
  e.waitUntil(
    // wait for caches to be done b4 install finish
    caches
      .open(staticCacheName)
      .then(cache => {
        console.log("caching shell assets");
        cache.addAll(assets);
      })
      .catch(err => console.log(err))
  );
});

//listen to activate evt
self.addEventListener("activate", e => {
  //delete old cache
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

//fetch event
self.addEventListener("fetch", e => {
  // check if theres something in cache that match the request
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return (
        cacheRes ||
        fetch(e.request).then(fetchRes => {
          //save new request to dynamic cache
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(e.request.url, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          });
        })
      );
    })
  );
});
