const removeOldCaches = async () => {
  const cacheVersions = await caches.keys();

  cacheVersions.splice(cacheVersions.indexOf(CACHE_VERSION), 1);

  for (cacheName of cacheVersions) {
    await caches.delete(cacheName)
  }
}

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_VERSION).then((cache) => {
    return cache.addAll(routes.map(({ route }) => route))
      .then(() => removeOldCaches());
  }));
});
