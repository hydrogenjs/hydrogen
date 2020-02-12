const getOldCacheData = async () => {
  const [cacheVersion] = await caches.keys();

  let cacheData = [];

  if (cacheVersion) {
    const oldCache = await caches.open(cacheVersion);
    const oldCacheKeys = await oldCache.keys();

    cacheData = Promise.all(oldCacheKeys.map(async request => ({
      request,
      response: await oldCache.match(request),
    })));
  }


  return cacheData;
};

const removeOldCaches = async () => {
  const cacheVersions = await caches.keys();

  cacheVersions.splice(cacheVersions.indexOf(CACHE_VERSION), 1);

  return Promise.all(cacheVersions.map(cacheName => caches.delete(cacheName)));
};

self.addEventListener('install', (e) => {
  e.waitUntil(getOldCacheData()
    .then((oldCacheData) => {
      const requestsToCache = new Set([
        ...routes.map(({ route }) => route),
      ]);

      return caches.open(CACHE_VERSION)
        .then((cache) => {
          const addOldCache = Promise.all(oldCacheData.map(data => cache.put(data.request, data.response)));

          return Promise.all([cache.addAll(requestsToCache), addOldCache]);
        });
    })
    .then(() => removeOldCaches())
    .catch(console.log));
});
