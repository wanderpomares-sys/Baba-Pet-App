/* Babá do Pet — funciona sem internet.
   Páginas e código: tenta a internet primeiro (assim as atualizações chegam sozinhas) e usa a cópia salva se estiver offline.
   Imagens: usa a cópia salva primeiro. */
const CACHE = 'babypet-v30';
const BASE = ['./', 'index.html', 'manifest.json', 'biblioteca.json', 'eventos.json', 'privacidade.html', 'manual.html', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(BASE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.searchParams.has('t')) return; // consultas de diagnóstico: não guardar no cache
  const imagem = req.destination === 'image';
  e.respondWith(imagem
    ? caches.match(req).then(r => r || fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); return res; }))
    : fetch(new Request(req, { cache: 'no-cache' })).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
});
