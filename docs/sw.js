const ROUTES_TO_CACHE = new Set([
  ...routes.map(({ route }) => route),
]);

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

const migrateOldCacheToNewCache = async (oldCacheData) => {
  const cache = await caches.open(CACHE_VERSION);

  const addOldCacheToNewCache = Promise.all(oldCacheData.map(data => cache.put(data.request, data.response)));

  return Promise.all([cache.addAll(ROUTES_TO_CACHE), addOldCacheToNewCache]);
};

self.addEventListener('install', (event) => {
  const installEvent = getOldCacheData()
    .then(migrateOldCacheToNewCache)
    .then(removeOldCaches)
    .catch(console.log);

  event.waitUntil(installEvent);
});
