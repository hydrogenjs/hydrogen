const html = require('html-template-tag');

const page = () => html`
  <h1>💾 Setting Up a Service Worker<code class="badge ml-12">New v0.6</code></h1>
  <hr>
  <p>
    A Service Worker is a super powerful browser API that allows you to intercept network requests online or offline.
    Hydrogen is now able to expose all the generated routes to your Service Worker so that you can do some cool precaching of your routes or whatever fits your use case.
  </p>
  <h2 id="basic-setup">Basic Setup</h2>
  <p>Create a simple Service Worker file in the root of your project.</p>
  <small>sw.js</small>
  <pre>
    <code class="lang-javascript">
      self.addEventListener('install', (e) => {
        
      });
    </code>
  </pre>
  <p>Register Service Worker in a layout</p>
  <small>default.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = () => &#96;
        &lt;script&gt;
          const registerSW = async () => {
            if (!navigator.serviceWorker) {
              return false;
            }

            const reg = await navigator.serviceWorker.register('/sw.js');

            await reg.update();
          }

          registerSW();
        &lt;/script&gt;
      &#96;;
    </code>
  </pre>
  <p>Add the Service Worker file to the config file.</p>
  <small>hydrogen.config.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = {
        sw: 'sw.js',
      };
    </code>
  </pre>
  <p>Run <code class="code">npx hydrogen build</code> and the <code class="code">sw.js</code> will be copied to the dist folder</p>
  <h2 id="exposing-page-routes-to-your-service-worker">Exposing page routes to your Service Worker</h2>
  <p>Here is our pages folder structure.</p>
  <pre>
    <code class="lang-plaintext">
      /pages
      |_ javascript
        |_ index.js
        |_ functions.js
        |_ oop
          |_ index.js
      |_ java
        |_ index.js
      |_ index.js
    </code>
  </pre>
  <p>Hydrogen generates the above folder structure into an array of routes like the example below.</p>
  <pre>
    <code class="lang-javascript">
      const routes = [
        {
          "route": "/",
          "filename": "index.html",
          "index": true,
          "depth": 0
        },
        {
          "route": "/java",
          "filename": "index.html",
          "index": true,
          "depth": 1 
        },
        {
          "route": "/javascript",
          "filename": "index.html",
          "index": true,
          "depth": 1
        },
        {
          "route": "/javascript",
          "filename": "functions.html"
          "index": false,
          "depth": 1
        },
        {
          "route": "/javascript/oop",
          "filename": "index.html",
          "index": true,
          "depth": 2
        }
      ]
    </code>
  </pre>
  <p>Your <code class="code">sw.js</code> now has access to the above <code class="code">const routes</code>, so you can do something like creating a simple precache.</p>
  <p class="tip">You also have access to the <code class="code">const DEV</code> which determines the mode</p>
  <small>sw.js</small>
  <pre>
    <code class="lang-javascript">
      self.addEventListener('install', (e) => {
        e.waitUntil(caches.open('data').then(cache => {
          return cache.addAll(routes.map(({ route }) => route));
        }));
      });
    </code>
  </pre>
  <h2 id="versioning-your-service-worker-cache">Versioning your Service Worker cache<code class="badge ml-12">New v0.9</code></h2>
  <p>
    Managing cache is not the easiest thing in the world, especially if you need to invalidate the cache. 
    You can now get access to the <code class="code">const CACHE_VERSION</code> variable
    which is determined by the version field in your <code class="code">package.json</code> file
  </p>
  <pre>
    <code class="lang-javascript">
      const removeOldCaches = async () => {
        const cacheVersions = await caches.keys();

        const handler = () => Promise.all(cacheVersions.map((cacheName) => caches.delete(cacheName)));

        if (cacheVersions.includes(CACHE_VERSION)) {
          cacheVersions.splice(cacheVersions.indexOf(CACHE_VERSION), 1)
        }

        return handler();
      };

      self.addEventListener('install', (event) => {
        event.waitUntil(removeOldCaches())
      })

      self.addEventListener('fetch', (event) => {
        event.respondWith(
          caches.open(CACHE_VERSION).then((cache) => {
            if (event.request.destination !== 'image') {
              return fetch(event.request);
            }

            return cache.match(event.request).then((cacheResponse) => {
              return cacheResponse || fetch(event.request).then((networkResponse) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
            });
          }),
        );
      });
    </code>
  </pre>
  <p>
    Here we are deleting our old caches if we deployed a new version of our app,
    it will only delete the old cache versions if the new cache version was successfully created.
    If any of the promises fails in <code class="code">e.waitUntil</code> then the entire install event will cancel 
  </p>
`;

module.exports = {
  layout: 'default',
  page,
  head: ({ config }) => [
    ['title', {}, `Setting Up a Service Worker | ${config.name}`],
  ],
};
