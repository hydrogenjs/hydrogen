const html = require('html-template-tag');

const page = () => html`
  <h1>🎈 Hydrogen</h1>
  <p>A super lightweight static-site generator built with <span style="color: #007acc">TypeScript</span> 😻 Uses 🔥 <a style="color: #ff2f2f;" href="https://lit-html.polymer-project.org">lit-html</a> inspired templates for super performant template generation.</p>
  <p class="tip"><i>Compile a ton of templates in under ~150ms</i></p>
  <center>
    <img style="margin: 20px; border-radius: 10px;" src="https://qph.fs.quoracdn.net/main-qimg-706f37c5cbc54e415892478836e8acb5.webp">
  </center>
  <p align="center">
    <a style="color: #76FF03;" href="/docs">Docs</a>
    |
    v0.5.2
    |
    <a href="https://github.com/ShailenNaidoo/hydrogen">GitHub</a>
    |
    <a style="color: #007acc;" href="https://twitter.com/shailen_naidoo">@shailen_naidoo</a>
    |
    <a class="github-button" href="https://github.com/ShailenNaidoo/hydrogen" data-icon="octicon-star" data-show-count="true" aria-label="Star ShailenNaidoo/hydrogen on GitHub">Star</a>
  </p>
  <h2 id="quick-start">⚡ Quick Start</h2>
  <hr style="margin-bottom: 20px;">
  <small>Install: <i>Hydrogen CLI</i></small>
  <pre>
    <code class="lang-shell">
      $ yarn add hydrogen-cli
    </code>
  </pre>
  <small>Input file: <i>index.js</i></small>
  <pre>
    <code class="lang-javascript">
      const page = ({ title }) => &#96;&lt;title&gt;$n{title}&lt;/title&gt;&#96;

      module.exports = {
        title: 'Hello World',
        page,
      };
    </code>
  </pre>
  <small>Run command: <i>generate</i></small>
  <pre>
    <code class="lang-shell">
      $ npx hydrogen generate index.js
    </code>
  </pre>
  <small>Output file: <i>index.html</i></small>
  <pre>
    <code class="lang-html">
      &lt;title&gt;Hello World&lt;/title&gt;
    </code>
  </pre>
  <h2>🏝 Deep dive</h2>
  <hr style="margin-bottom: 20px;">
  <p>Hydrogen is fast because it uses plain JavaScript as a template engine, no need to use something like Pug or Handlebars anymore!</p>
  <p>
    The <a href="#quick-start">⚡ Quick Start</a> gave you a quick taste of what's possible with Hydrogen, 
    all we did was write a simple JS function that renders a piece of HTML which gets saved to an HTML file.
  </p>
  <p>
    The sweet thing about Hydrogen is that it only provides two commands <i style="color: #ff2f2f;">generate</i> and <i style="color: #007acc;">build</i>. 
    This is what makes Hydrogen so powerful, it does not provide a dev server or any overhead packages. 
    If you want, you can build what ever configuration you want on top of it.
  </p>
  <p>Checkout the <a style="color: #76FF03;" href="/docs">docs</a></p>
`.replace('$n', '$');

module.exports = {
  layout: 'default',
  title: '🎈 Hydrogen: Super fast static-site generator',
  page,
  head: () => [
    ['meta', { name: 'description', content: 'A super lightweight static-site generator built with TypeScript 😻 Uses 🔥 lit-html inspired templates for super performant template generation' }],
    ['meta', { property: 'og:title', content: '🎈 Hydrogen: Super fast static-site generator' }],
    ['meta', { property: 'og:description', content: 'A super lightweight static-site generator built with TypeScript 😻 Uses 🔥 lit-html inspired templates for super performant template generation' }],
    ['meta', { property: 'og:url', content: 'https://hydrogen-cli.netlify.com' }],
  ],
};
