const html = require('html-template-tag');

const page = () => html`
  <h1>🔨 Getting Started</h1>
  <hr>
  <p>
    Hydrogen is available on <a style="color: #2289b4;" href="https://yarnpkg.com/en/package/hydrogen-cli">Yarn</a> and <a style="color: #f43f43;" href="https://www.npmjs.com/package/hydrogen-cli">NPM</a>
    and requires Node.js 8 and higher. We will be using Yarn as the package manager throughout the documentation
  </p>
  <h2 id="setup-a-project">Step 1: Setup a project</h2>
  <p>We need a folder to store our project files</p>
  <pre>
    <code class="lang-shell">
      $ mkdir hydrogen-sample
      $ cd hydrogen-sample
    </code>
  </pre>
  <h2 id="install-hydrogen">Step 2: Install Hydrogen</h2>
  <p>Our project needs a <code class="code"><i>package.json</i></code>. We can use Yarn to make one</p>
  <pre>
    <code class="lang-shell">
      $ yarn init -y
    </code>
  </pre>
  <small>Add Hydrogen to the <code class="code">package.json</code></small>
  <pre>
    <code>
      $ yarn add hydrogen-cli
    </code>
  </pre>
  <h2 id="create-a-template">Step 3: Create a template</h2>
  <p>Let's create a simple template which we will store in <code class="code">index.js</code> file</p>
  <pre>
    <code class="lang-javascript">
      const page = ({ title, head, data }) => &#96;
        &lt;html&gt;
          &lt;head&gt;
            $n{head}
            &lt;title&gt;$n{title}&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            &lt;p&gt;$n{data.text}&lt;/p&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      &#96;;

      module.exports = {
        title: 'Hydrogen webpage',
        page,
        data: () => ({
          text: 'Hello from Hydrogen',
          css: 'https://main.css',
        }),
        head: ({ css }) => [
          ['link', { rel: 'stylesheet', href: data.css }],
          ['script', { src: 'https://script.js' }, true],
          ['style', {}, 'body { font-size: 10px; }'],
        ],
      };
    </code>
  </pre>
  <h2 id="build-the-template">Step 4: Build the template</h2>
  <p>
    We need to run the <code class="code">generate</code> command to build the <code class="code">index.js</code> template.
    The output of template will be stored in a file of the same name as the template but with the <code class="code">.html</code> extension.
  </p>
  <pre>
    <code class="lang-shell">
      $ npx hydrogen generate index.js
    </code>
  </pre>
  <small><code class="code">index.html</code></small>
  <pre>
    <code class="lang-html">
      &lt;html&gt;
        &lt;head&gt;
          &lt;link rel="stylesheet" href="https://main.css" /&gt;
          &lt;script src="https://script.js"&gt;&lt;/script&gt;
          &lt;style&gt;body { font-size: 10px; }&lt;/style&gt;
          &lt;title&gt;Hydrogen webpage&lt;/title&gt;
        &lt;/head&gt;
        &lt;body&gt;
          &lt;p&gt;Hello from Hydrogen&lt;/p&gt;
        &lt;/body&gt;
      &lt;/html&gt;
    </code>
  </pre>
  <p>
    The <i style="color: #ff2f2f;">generate</i> command is more of a lower-level template generator, for a more advanced setup we use the <i style="color: #007acc;">build</i> command for working with more larger projects.
    Find out more in the <a href="/docs/advanced-setup">Advanced Setup</a> section.
  </p>
`.replace(/\$n/g, '$');

module.exports = {
  title: 'Getting Started | 🎈 Hydrogen',
  page,
  head: ({ config }) => [
    ['meta', { name: 'description', content: 'Learn how to get up and running with Hydrogen' }],
    ['meta', { property: 'og:title', content: 'Getting Started | 🎈 Hydrogen' }],
    ['meta', { property: 'og:description', content: 'Learn how to get up and running with Hydrogen' }],
    ['meta', { property: 'og:url', content: 'https://hydrogen-cli.netlify.com' }],
    ['title', {}, `Getting Started | ${config.name}`],
  ],
};
