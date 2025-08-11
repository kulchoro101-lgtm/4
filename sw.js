
const CACHE = 'teplostil-cache-v7';
const ASSETS = [
  './',
  './index.html',
  './cart.html',
  './manifest.json',
  './assets/icon.png',
  './assets/ph.png',
  './data/products.json'
];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }));
});
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).then(function(res){
        const copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return res;
      }).catch(function(){ return caches.match('./index.html'); });
    })
  );
});
