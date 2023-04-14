const nombreCache = "apv-v5";

const archivos = [
  "/",
  "/index.html",
  "/error.html",
  "/css/bootstrap.css",
  "/css/styles.css",
  "/js/app.js",
  "/js/apv.js",
];

// cuando se instala el service worder
self.addEventListener("install", (e) => {
  console.log("Instalando el service worker");

  e.waitUntil(
    caches.open(nombreCache).then((cache) => {
      console.log("cacheando...");
      cache.addAll(archivos);
    })
  );
});

// activar el service worker
self.addEventListener("activate", (e) => {
  console.log("Service worker activado");

  e.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== nombreCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// evento fetch para descargar archivos estáticos
self.addEventListener("fetch", (e) => {
  console.log("fetch", e);

  e.respondWith(
    caches
      .match(e.request)
      .then((respuestaCache) => {
        return respuestaCache;
      })
      .catch(() => caches.match("/error.html"))
  );
});
