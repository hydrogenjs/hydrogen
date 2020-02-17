const html = require('html-template-tag');

const page = () => html`
  <h1>⛏️ Build hooks<code class="badge">New v1.0</code></h1>
  <hr>
  <p>
    Build hooks allow you to observe events that happen during the Hydrogen build process.
    You can intercept and modify the context of the build process to your liking.
  </p>
  <p>
    Here are the events you can observe:
    <ul>
      <li>
        <code class="code">beforeDistRemoved</code>
      </li>
      <li>
        <code class="code">afterDistRemoved</code>
      </li>
      <li>
        <code class="code">beforeBuild</code>
      </li>
      <li>
        <code class="code">afterBuild</code>
      </li>
      <li>
        <code class="code">beforeEachPageGenerated</code>
      </li>
      <li>
        <code class="code">afterEachPageGenerated</code>
      </li>
      <li>
        <code class="code">beforeServiceWorkerGenerated</code>
      </li>
      <li>
        <code class="code">afterServiceWorkerGenerated</code>
      </li>
    </ul>
  </p>
  <h2 id="basic-setup">Basic Setup</h2>
  <p class="tip">Create a file called <code class="code">hydrogen.hooks.js</code> in the root of your project</p>
  <p>
    All you have to do is export the hooks of the events you want to observe in Hydrogen and that's all there is too it,
    keep in mind that the <code class="code">ctx</code> of the hooks differ.
  </p>
  <pre>
    <code class="lang-javascript">
      exports.beforeDistRemoved = async (ctx) => {};

      exports.afterDistRemoved = async (ctx) => {};

      exports.beforeBuild = async (ctx) => {};

      exports.afterBuild = async (ctx) => {};

      exports.beforeEachPageGenerated = async (ctx) => {};

      exports.afterEachPageGenerated = async (ctx) => {};

      exports.beforeServiceWorkerGenerated = async (ctx) => {};

      exports.afterServiceWorkerGenerated = async (ctx) => {};
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
