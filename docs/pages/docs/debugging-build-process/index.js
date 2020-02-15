const html = require('html-template-tag');

const page = () => html`
  <h1>🐛 Debugging Build Process</h1>
  <hr>
  <p>
    A bi-product of Hydrogen being based on Node.js is that we are able to support debugging of any JavaScript during the Hydrogen build process, 
    just the way you would do with any other Node.js applications.
  </p>
  <p>
    Let's see how we can do this!
  </p>
  <h2 id="using-synchronous-data">Using Node.js Devtools in Chrome</h2>
  <p>
    Chrome has a built-in tool called the Node.js V8 inspector which allows us to debug Node.js applications in Chrome Devtools
  </p>
  <small>Run the command below</small>
  <pre>
    <code class="lang-shell">
      npx --node-arg="--inspect-brk" hydrogen build --dev
    </code>
  </pre>
  <small>You will output like this</small>
  <pre>
    <code class="lang-text">
      Debugger listening on ws://127.0.0.1:9229/f35613dd-25b2-414f-a81f-24be123d59e5
      For help, see: https://nodejs.org/en/docs/inspector
    </code>
  </pre>
  <p>Open the Chrome dev tools and you will see the Node logo popup right next to the Elements tab, click on it and you will go to the Node devtools</p>
  <img src="/public/images/node-dev-tools.png">
  <p>Once the Node Devtools are open, you will need to add your project folder to the workspace by clicking on "Add folder to workspace"</p>
  <img src="/public/images/node-inspector.png">
  <p>Now you can debug your JavaScript</p>
  <h2 id="using-synchronous-data">Debugging in VS Code</h2>
`.replace(/\$n/g, '$');

module.exports = {
  page,
  head: ({ config }) => [
    ['meta', { name: 'description', content: 'Learn how to expose data to your data sync/async' }],
    ['meta', { name: 'og:title', content: 'Working with data | 🎈 Hydrogen' }],
    ['meta', { name: 'og:description', content: 'Learn how to expose data to your data sync/async' }],
    ['meta', { name: 'og:url', content: 'https://hydrogen-cli.netlify.com' }],
    ['title', {}, `Working with data | ${config.name}`],
  ],
};
