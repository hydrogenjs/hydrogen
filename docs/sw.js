self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('cache').then((cache) => {
    return cache.addAll(routes.map(({ route }) => route));
  }));
});
