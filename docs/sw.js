const getOldCacheData = async () => {
  const oldCache = await caches.open(await caches.keys()[0]);

  return oldCache.keys();
};

const removeOldCaches = async () => {
  const cacheVersions = await caches.keys();

  cacheVersions.splice(cacheVersions.indexOf(CACHE_VERSION), 1);

  return Promise.all(cacheVersions.map(cacheName => caches.delete(cacheName)))
};

self.addEventListener('install', (e) => {
  e.waitUntil(getOldCacheData()
    .then((oldCacheData) => {
      const requestsToCache = [
        ...oldCacheData,
        ...routes.map(({ route }) => new Request(route)),
      ];

      return caches.open(CACHE_VERSION)
        .then(cache => cache.addAll(requestsToCache));
    })
    .then(() => removeOldCaches())
    .catch(console.log));
});
