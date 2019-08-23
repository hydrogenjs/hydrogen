const html = require('html-template-tag');

const page = () => html`
  <h1>⚙ Advanced Setup</h1>
  <hr>
  <p>
    If you have not read the <a style="color: #007acc;" href="/docs/getting-started">Getting Started</a> guide, now would be the perfect time!
    The Advanced Section builds on top of what we did in the Getting Started section.
  </p>
  <h2 id="setting-up-a-layout">Step 1: Setting up a layout</h2>
  <p>
    A <code class="code">layout</code> is a template that contains our application shell which our <code class="code">page</code>
    templates get injected into. Create a folder called "layouts", this is where our layouts will be stored.
  </p>
  <small>layouts/default.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = ({ title, content }) => &#96;
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;
            &lt;title&gt;$n{title}&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            $n{content}
          &lt;/body&gt;
        &lt;/html&gt;
      &#96;;
    </code>
  </pre>
  <p>
    <code class="code">title</code> is provided by the page template and <code class="code">content</code> is the result of the generated page template.
    Now that we have our layout, we now need to use link it to a page template.
  </p>
  <h2 id="setting-up-a-page">Step 2: Setting up a page</h2>
  <p>
    A <code class="code">page</code> is a template that contains your page content. All page templates are stored in the pages folder.
  </p>
  <small>pages/index.js</small>
  <pre>
    <code class="lang-javascript">
      const page = ({ data }) => &#96;
        &lt;p&gt;$n{data.text}&lt;/p&gt;
      &#96;;

      module.exports = {
        layout: 'default',
        title: 'Hydrogen webpage',
        page,
        data: () => ({
          text: 'Hello from Hydrogen 🎈',
        }),
      };
    </code>
  </pre>
  <h2 id="building-our-templates-into-html">Step 3: Building our templates into HTML</h2>
  <p>
    After setting up our pages and layouts, we are now able to generate our templates into deployable HTML files. The built files are stored in <code class="code">dist</code>.
    To build your templates run the <code class="code">build</code> command
  </p>
  <pre>
    <code class="lang-shell">
      $ npx hydrogen build
       _   _           _
      | | | |_   _  __| |_ __ ___   __ _  ___ _ __  
      | |_| | | | |/ _&#96; | '__/ _ \ / _&#96; |/ _ \ '_ \ 
      |  _  | |_| | (_| | | | (_) | (_| |  __/ | | |
      |_| |_|\__, |\__,_|_|  \___/ \__, |\___|_| |_|
              |___/                 |___/

      MODE: PRODUCTION
      Building files... done
      Build time: 49.934ms
    </code>
  </pre>
  <p class="tip">Use the <code class="code">--dev</code> to enable builds in development mode</p>
  <h2 id="using-static-assets-like-css-and-js">Step 4: Using static assets like CSS and JS</h2>
  <p>
    If you have static assets like CSS, JS, Images and etc... You can create a folder called <code class="code">public</code> in the root of the project.
    You can place any assets you like in this folder and when you run the <code class="code">build</code> command the public folder is automatically hoisted into the dist folder.
  </p>
  <p>Repeat <span style="color: #007acc;">Step 3</span> to see how it works.</p>
  <h2 id="setting-up-a-dev-server">Step 5: Setting up a dev server</h2>
  <p>
    Most static-site generators provide a development server out of the box but not Hydrogen. 
    Hydrogen gives all the power to you, so you can setup our own development server.
    Here is a simple development server setup with hot reloading.
  </p>
  <p>
    We need some way to re-run hydrogen when files change and push the updates to the browser. We can use <code class="code">nodemon</code> <code class="code">live-server</code> <code class="code">npm-run-all</code> packages
  </p>
  <small>Install packages</small>
  <pre>
    <code class="lang-bash">
        $ yarn add -D nodemon live-server npm-run-all
    </code>
  </pre>
  <small>Update package.json</small>
  <pre>
    <code class="lang-json">
        {
          "scripts": {
            "reload": "npx cross-env npx nodemon -w ./layouts -w ./pages -w ./public --exec \"npx hydrogen build --dev\"",
            "serve": "npx cross-env npx live-server ./dist",
            "dev": "npx npm-run-all --parallel reload serve"
          }
        }
    </code>
  </pre>
  <p>
    Run <code class="code">yarn dev</code> then you will have neat little development server with hot reloading
  </p>
`.replace(/\$n/g, '$');

module.exports = {
  title: 'Advanced Setup | 🎈 Hydrogen',
  page,
  head: ({ config }) => [
    ['meta', { name: 'description', content: 'Learn how to use a more advanced setup with Hydrogen' }],
    ['meta', { property: 'og:title', content: 'Advanced Setup | 🎈 Hydrogen' }],
    ['meta', { property: 'og:description', content: 'Learn how to use a more advanced setup with Hydrogen' }],
    ['meta', { property: 'og:url', content: 'https://hydrogen-cli.netlify.com' }],
    ['title', {}, `Advanced Setup | ${config.name}`],
  ],
};
