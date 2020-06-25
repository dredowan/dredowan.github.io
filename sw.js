
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/manifest.json',
          '/index.html',
          '/menu.html',
          '/plays.html',
          '/js/menu.js',
          '/js/index.js',
          '/js/play.js',
          '/css/menu.css',
          '/css/play.css',
          '/offline/offline.html',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
          'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
          '/images/icons/icon-72x72.png',
          '/images/icons/icon-96x96.png',
          '/images/icons/icon-128x128.png',
          '/images/icons/icon-144x144.png',
          '/images/icons/icon-152x152.png',
          '/images/icons/icon-192x192.png',
          '/images/icons/icon-384x384.png',
          '/images/icons/icon-512x512.png',      
          '/images/fireball.gif',
          '/images/1.gif',
          '/images/2.gif',
          '/images/3.gif',
          '/images/next.png',
          '/images/prev.png',
          '/images/playground.png',
          '/naruto.png',
          '/icon.png',
          '/images/CobaBg2.png',
          '/images/CobaBg3.png'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  self.skipWaiting();
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }else{
            console.log("CACHE VERSION : ");
            console.log(CACHE_STATIC_NAME);
            console.log(CACHE_DYNAMIC_NAME);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.open(CACHE_STATIC_NAME)
                .then(function(cache) {
                  console.log("RETURN OFFLINE HTML");
                  return cache.match('/offline/offline.html');
                });
            });
        }
      })
  );
});
