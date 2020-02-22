const html = require('html-template-tag');

const ListItem = ({ heading, links = [] }) => html`
  <details>
    <summary>
      <a href="${heading.url}">${heading.text}</a>
    </summary>
    <ul>
      ${links.map(({ url, text }) => html`
        <li><a href="${url}">${text}</a></li>
      `)}
    </ul>
  </details>
`;

const page = () => html`
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
      <li>
        <strong>🔨 Build Hooks.</strong> Customize the build process to fit your needs
      </li>
      <li>
        <strong>💾 Service Worker friendly.</strong> Build powerful offline-first experiences
      </li>
    </ul>
  </p>
  <h2>Index</h2>
  $${ListItem({
    heading: { url: '/docs/getting-started', text: '🔨 Getting Started' },
    links: [
      { text: 'Step 1: Setup a project', url: '/docs/getting-started#setup-a-project' },
      { text: 'Step 2: Install Hydrogen', url: '/docs/getting-started#install-hydrogen' },
      { text: 'Step 3: Create a template', url: '/docs/getting-started#create-a-template' },
      { text: 'Step 4: Build the template', url: '/docs/getting-started#build-the-template' },
    ],
  })}
  $${ListItem({
    heading: { text: '⚙ Advanced Setup', url: '/docs/advanced-setup' },
    links: [
      { text: 'Step 1: Setting up a layout', url: '/docs/advanced-setup#setting-up-a-layout' },
      { text: 'Step 2: Setting up a page', url: '/docs/advanced-setup#setting-up-a-page' },
      { text: 'Step 3: Building our templates into HTML', url: '/docs/advanced-setup#building-our-templates-into-html' },
      { text: 'Step 4: Using static assets like CSS and JS', url: '/docs/advanced-setup#using-static-assets-like-css-and-js' },
      { text: 'Step 5: Setting up a dev server', url: '/docs/advanced-setup#setting-up-a-dev-server' },
    ],
  })}
  $${ListItem({
    heading: { text: '🌐 Working with Data', url: '/docs/working-with-data' },
    links: [
      { text: 'Using synchronous data', url: '/docs/working-with-data#using-synchronous-data' },
      { text: 'Using asynchronous data', url: '/docs/working-with-data#using-asynchronous-data' },
    ],
  })}
  $${ListItem({
    heading: { text: '🕶 Working with Metadata', url: '/docs/working-with-meta-data' },
    links: [
      { text: 'Using the Head API', url: '/docs/working-with-meta-data#using-the-head-api' },
      { text: 'Using asynchronous data with the Head API', url: '/docs/working-with-meta-data#using-asynchronous-data-with-the-head-api' },
    ],
  })}
  $${ListItem({
    heading: { text: '💾 Setting Up a Service Worker', url: '/docs/setting-up-a-service-worker' },
    links: [
      { text: 'Basic Setup', url: '/docs/setting-up-a-service-worker#basic-setup' },
      { text: 'Exposing page routes to your Service Worker', url: '/docs/setting-up-a-service-worker#exposing-page-routes-to-your-service-worker' },
      { text: 'Versioning your Service Worker cache', url: '/docs/setting-up-a-service-worker#versioning-your-service-worker-cache' },
    ],
  })}
  $${ListItem({
    heading: { text: '⚙ Generate Routes Dynamically', url: '/docs/hydrogen-routes' },
    links: [
      { text: 'Basic setup', url: '/docs/hydrogen-routes#basic-setup' },
      { text: 'Setting up a dynamic page template', url: '/docs/hydrogen-routes#setting-up-a-dynamic-page-template' },
    ]
  })}
  $${ListItem({
    heading: { text: '🔧 Hydrogen Config', url: '/docs/hydrogen-config' },
    links: [
      { text: 'Set a global project name', url: '/docs/hydrogen-config#set-a-global-project-name' },
      { text: 'Set a static assets folder', url: '/docs/hydrogen-config#set-a-static-assets-folder' },
      { text: 'Copy extra static files', url: '/docs/hydrogen-config#copy-extra-static-files' },
      { text: 'Set global head tags', url: '/docs/hydrogen-config#set-global-head-tags' },
      { text: 'Setting a custom Service Worker', url: '/docs/hydrogen-config#setting-a-custom-service-worker' },
      { text: 'Delete dist folder before build', url: '/docs/hydrogen-config#delete-dist-folder-before-build' },
    ],
  })}
  $${ListItem({
    heading: { text: '⛏️ Build hooks', url: '/docs/build-hooks' },
    links: [
      { text: 'Basic setup', url: '/docs/build-hooks#basic-setup' },
    ]
  })}
  $${ListItem({
    heading: { text: '🐛 Debugging Build Process', url: '/docs/debugging-build-process/' },
    links: [
      { text: 'Using Node.js Devtools in Chrome', url: '/docs/debugging-build-process#using-nodejs-devtools-in-chrome' },
      { text: 'Debugging in VS Code', url: '/docs/debugging-build-process#debugging-in-vs-code' }
    ],
  })}
`;

module.exports = {
  layout: 'default',
  page,
  head: ({ config }) => [
    ['title', {}, `Docs | ${config.name}`],
  ],
};
