// Instalação do Service Worker e Cache de recursos
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('FINANCA_TOTAL').then((cache) => {
            return cache.addAll([
                'index.html',
                'style.css',
                'app.js',
                'camera.js',
                'display.html',
                'decoder-qr-code.js'
            ]);
        })
    );
});

// Intercepta solicitações de rede e serve os recursos do cache, se disponí­veis
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});