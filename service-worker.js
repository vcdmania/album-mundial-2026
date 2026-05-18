// ============================================================
// Service Worker - Álbum Mundial 2026
// ============================================================
// IMPORTANTE: Cuando hagas cambios en el HTML o quieras forzar
// que todos los usuarios reciban la actualización, cambia este
// número de versión:
const VERSION = 'v1.0.0';
const CACHE_NAME = 'album-mundial-' + VERSION;

// Archivos que se cachean en la primera carga (la app funciona offline)
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ============================================================
// Instalación: precargar los archivos clave
// ============================================================
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Usamos { cache: 'reload' } para evitar el caché del navegador
        return cache.addAll(PRECACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
      })
      .then(() => self.skipWaiting()) // activar inmediatamente
      .catch(err => console.warn('[SW] Error precaching:', err))
  );
});

// ============================================================
// Activación: limpiar versiones viejas del caché
// ============================================================
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(k => k.startsWith('album-mundial-') && k !== CACHE_NAME)
            .map(k => {
              console.log('[SW] Eliminando caché viejo:', k);
              return caches.delete(k);
            })
      )
    ).then(() => self.clients.claim())
  );
});

// ============================================================
// Fetch: estrategia "Network-first, fallback a cache"
// - Intenta primero la red (para tener siempre la última versión)
// - Si no hay red, sirve desde el caché (offline)
// ============================================================
self.addEventListener('fetch', (event) => {
  const req = event.request;
  
  // Solo manejamos GET de nuestro propio origen
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    fetch(req)
      .then(response => {
        // Si la respuesta es OK, la guardamos en caché para uso offline
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, responseClone));
        }
        return response;
      })
      .catch(() => {
        // Sin red → servir desde caché
        return caches.match(req).then(cached => {
          if (cached) return cached;
          // Si no hay caché, devolver index.html como fallback (SPA)
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Sin conexión', { status: 503, statusText: 'Sin conexión' });
        });
      })
  );
});

// ============================================================
// Mensaje del cliente para forzar actualización inmediata
// ============================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
