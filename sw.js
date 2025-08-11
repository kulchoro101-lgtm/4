
const CACHE = 'teplostil-cache-v5';
const ASSETS = ['./','./index.html','./cart.html','./manifest.json','./assets/icon.png','./assets/ph.png','./data/products.json'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request).then(res=>{
    const copy = res.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)); return res;
  }).catch(()=>caches.match('./index.html'))));
});
