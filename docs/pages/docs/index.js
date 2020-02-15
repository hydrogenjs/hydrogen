const html = require('html-template-tag');

const page = () => html`
  <center>
    <img src="data:image/jpeg;base64,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">
  </center>
  <h1>The lightest static-site generator</h1>
  <hr>
  <p>
    Hydrogen uses JavaScript as it's templating engine, it's aimed at doing one thing really well which is converting <i>template literals</i> to HTML making it super extensible as you have the whole <span style="color: #007acc;">Node.js</span> ecosystem at your fingertips.
  </p>
  <p>
    Before ES6, JavaScript was not considered powerful enough to manipulate large chunks of the DOM and template engines like Handlebars and Pug filled that void. Now that JavaScript is more powerful than ever,
    it's time for JS to shine as a viable templating engine.
  </p>
  <p>
    Hydrogen provides you with:
    <ul>
      <li><strong>⚡ Millisecond Builds.</strong> With the global average attention span being 8 seconds, why wait seconds for your builds when you can wait milliseconds.</li>
      <li><strong>🔥 JavaScript Templates.</strong> With ES6 template literals, who needs template engines like pug and handlebars. You now have access to the full-power of JavaScript.</li>
      <li><strong>🔌 Use External APIs.</strong> Plug into your data with remote APIs.</li>
      <li><strong>🕶 Powerful Metadata API.</strong> Get the best SEO for your static pages.</li>
    </ul>
  </p>
  <h2>Index</h2>
  <ul>
    <li><a href="/docs/getting-started">🔨 Getting Started</a></li>
    <ul>
      <li><a href="/docs/getting-started#setup-a-project">Step 1: Setup a project</a></li>
      <li><a href="/docs/getting-started#install-hydrogen">Step 2: Install Hydrogen</a></li>
      <li><a href="/docs/getting-started#create-a-template">Step 3: Create a template</a></li>
      <li><a href="/docs/getting-started#build-the-template">Step 4: Build the template</a></li>
    </ul>
    <li><a href="/docs/advanced-setup">⚙ Advanced Setup</a></li>
    <ul>
      <li><a href="/docs/advanced-setup#setting-up-a-layout">Step 1: Setting up a layout</a></li>
      <li><a href="/docs/advanced-setup#setting-up-a-page">Step 2: Setting up a page</a></li>
      <li><a href="/docs/advanced-setup#building-our-templates-into-html">Step 3: Building our templates into HTML</a></li>
      <li><a href="/docs/advanced-setup#using-static-assets-like-css-and-js">Step 4: Using static assets like CSS and JS</a></li>
      <li><a href="/docs/advanced-setup#setting-up-a-dev-server">Step 5: Setting up a dev server</a></li>
    </ul>
    <li><a href="/docs/working-with-data">🌐 Working with Data</a></li>
    <ul>
      <li><a href="/docs/working-with-data#using-synchronous-data">Using synchronous data</a></li>
      <li><a href="/docs/working-with-data#using-asynchronous-data">Using asynchronous data</a></li>
    </ul>
    <li><a href="/docs/working-with-meta-data">🕶 Working with Metadata</a></li>
    <ul>
      <li><a href="/docs/working-with-meta-data#using-the-head-api">Using the Head API</a></li>
      <li><a href="/docs/working-with-meta-data#using-asynchronous-data-with-the-head-api">Using asynchronous data with the Head API</a></li>
    </ul>
    <li><a href="/docs/setting-up-a-service-worker">💾 Setting Up a Service Worker</a></li>
    <ul>
      <li><a href="/docs/setting-up-a-service-worker#basic-setup">Basic Setup</a></li>
      <li><a href="/docs/setting-up-a-service-worker#exposing-page-routes-to-your-service-worker">Exposing page routes to your Service Worker</a></li>
      <li><a href="/docs/setting-up-a-service-worker#versioning-your-service-worker-cache">Versioning your Service Worker cache</a></li>
    </ul>
    <li><a href="/docs/hydrogen-routes">⚙ Generate Routes Dynamically</a></li>
    <ul>
      <li><a href="/docs/hydrogen-routes#basic-setup">Basic setup</a></li>
      <li><a href="/docs/hydrogen-routes#setting-up-a-dynamic-page-template">Setting up a dynamic page template</a></li>
    </ul>
    <li><a href="/docs/hydrogen-config">🔧 Hydrogen Config</a></li>
    <ul>
      <li><a href="/docs/hydrogen-config#set-a-global-project-name">Set a global project name</a></li>
      <li><a href="/docs/hydrogen-config#set-a-static-assets-folder">Set a static assets folder</a></li>
      <li><a href="/docs/hydrogen-config#copy-extra-static-files">Copy extra static files</a></li>
      <li><a href="/docs/hydrogen-config#set-global-head-tags">Set global head tags</a></li>
      <li><a href="/docs/hydrogen-config#setting-a-custom-service-worker">Setting a custom Service Worker</a></li>
      <li><a href="/docs/hydrogen-config#delete-dist-folder-before-build">Delete dist folder before build</a></li>
    </ul>
    <li><a href="/docs/build-hooks">⛏️ Build hooks</a></li>
    <ul>
      <li><a href="/docs/build-hooks#basic-setup">Basic setup</a></li>
    </ul>
  </ul>
`;

module.exports = {
  layout: 'default',
  page,
  head: ({ config }) => [
    ['title', {}, `Docs | ${config.name}`],
  ],
};
