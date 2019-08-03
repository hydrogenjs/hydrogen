const html = require('html-template-tag');

const page = () => html`
  <h1>🔧 Hydrogen Config<code class="badge">New v0.5.6</code></h1>
  <p>
    You can pass a config file to the Hydrogen CLI, the config file is accessible to the Layout, Page, Data and Head API
  </p>
  <p class="tip">Create a file called <code class="code">hydrogen.config.js</code> in the root of your project</p>
  <h2 id="set-a-global-project-name">Set a global project name</h2>
  <p>The <code class="code">name</code> property can be used as the root title of all your pages</p>
  <small>hydrogen.config.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = {
        name: 'Hydrogen WebApp',
      };
    </code>
  </pre>
  <p>Now we can access the config via the <code class="code">config</code> object</p>
  <small>layouts/default.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = ({ config }) => &#96;
        &lt;title&gt;$n{config.name}&lt;/title&gt;
      &#96;;
    </code>
  </pre>
  <h2 id="set-a-static-assets-folder">Set a static assets folder</h2>
  <p>
    We need some way of copying our static assets into the <code class="code">dist</code> folder, you can now set a static assets folder via <code class="code">staticFolder</code> property.
  </p>
  <p class="tip">Your static assets folder must be in the root of the project</p>
  <small>hydrogen.config.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = {
        name: 'Hydrogen Webapp',
        staticFolder: 'public'
      };
    </code>
  </pre>
  <h2 id="set-global-head-tags">Set global head tags</h2>
  <p>You now have access to the <a href="/docs/working-with-meta-data">Head API</a> in the config for global meta info</p>
  <p class="tip">The global head tags are merged with the head tags in each page</p>
  <pre>
    <code class="lang-javascript">
      module.exports = {
        name: 'Hydrogen Webapp',
        staticFolder: 'public',
        head: ({ config }) => [
          ['script', { src: 'https://my.script.js' }, true],
          ['link', { rel: 'stylesheet', href: &#96;/$n{config.staticFolder}/css/main.css&#96; }],
          ['meta', { property: 'og:site_name', content: config.name }],
        ],
      };
    </code>
  </pre>
`.replace(/\$n/g, '$');

module.exports = {
  layout: 'default',
  page,
  head: ({ config }) => [
    ['title', {}, `Hydrogen Config | ${config.name}`],
  ],
};