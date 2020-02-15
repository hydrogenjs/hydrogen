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
  <p>1. Run the command below in the project root</p>
  <pre>
    <code class="lang-shell">
      npx --node-arg="--inspect-brk" hydrogen build --dev
    </code>
  </pre>
  <p>2. You will see output like this</p>
  <pre>
    <code class="lang-text">
      Debugger listening on ws://127.0.0.1:9229/f35613dd-25b2-414f-a81f-24be123d59e5
      For help, see: https://nodejs.org/en/docs/inspector
    </code>
  </pre>
  <p>3. Open the Chrome dev tools and you will see the Node logo popup right next to the Elements tab, click on it and you will go to the Node devtools</p>
  <img src="/public/images/node-dev-tools.png">
  <p>4. Once the Node Devtools are open, you will need to add your project folder to the workspace by clicking on "Add folder to workspace"</p>
  <img src="/public/images/node-inspector.png">
  <p>Now you can debug your JavaScript</p>
  <h2 id="using-synchronous-data">Debugging in VS Code</h2>
  <p>
    There are two ways we could setup debugging in VS Code,
    either with VS Code's auto attaching feature or with a <code class="code">launch.json</code> file
  </p>
  <h3>Auto attaching</h3>
  <p>
    1. Go to settings and search "auto attach" and turn the setting on
  </p>
  <img src="/public/images/auto-attach.png">
  <p>
    2. Set a breakpoint anywhere in your JavaScript
  </p>
  <p>
    3. Run the command below
  </p>
  <pre>
    <code class="lang-shell">
      npx --node-arg="--inspect-brk" hydrogen build --dev
    </code>
  </pre>
  <p>
    VS Code will automatically attach to the Node.js debugging process and stop by your breakpoint
  </p>
  <h3>Setting up <code class="code">launch.json</code></h3>
  <p>
    1. Go to the <i>Debug Explorer</i> and click on the <i>cogwheel</i> on the top right, it will open up a <code class="code">launch.json</code> file
  </p>
  <img src="/public/images/vscode-debug.png">
  <p>
    2. Copy and paste the below JSON config to your launch.json file
  </p>
  <pre>
    <code class="lang-json">
      {
        "version": "0.2.0",
        "configurations": [
          {
            "type": "node",
            "request": "launch",
            "name": "Debug Hydrogen CLI",
            "skipFiles": [
              "<node_internals>/**"
            ],
            "program": "$n{workspaceFolder}/node_modules/hydrogen-cli/bin/run",
            "cwd": "$n{workspaceFolder}",
            "args": ["build", "--dev"],
          }
        ]
      }
    </code>
  </pre>
  <p class="tip">Make sure to set a breakpoint</p>
  <p>
    3. Go back to the Debug Explorer and run the debug "Debug Hydrogen CLI"
  </p>
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
