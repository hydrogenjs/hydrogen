const html = require('html-template-tag');

const page = () => html`
  <h1>🩺 Setting Up a Service Worker<code class="badge">New v0.6</code></h1>
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
`;

module.exports = {
  layout: 'default',
  page,
  head: ({ config }) => [
    ['title', {}, `Setting Up a Service Worker | ${config.name}`],
  ],
};
