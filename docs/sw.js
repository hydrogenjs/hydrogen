const getOldCacheData = async () => {
  const oldCache = await caches.open(await caches.keys()[0]);

  return oldCache.keys();
};

const removeOldCaches = async () => {
  const cacheVersions = await caches.keys();

  cacheVersions.splice(cacheVersions.indexOf(CACHE_VERSION), 1);

  for (const cacheName of cacheVersions) {
    await caches.delete(cacheName);
  }
};

self.addEventListener('install', async (e) => {
  const oldCacheData = await getOldCacheData();
  const requestsToCache = [
    ...oldCacheData,
    ...routes.map(({ route }) => new Request(route)),
  ];

  e.waitUntil(caches.open(CACHE_VERSION).then((cache) => {
    return cache.addAll(requestsToCache)
      .then(() => removeOldCaches());
  }));
});
