const html = require('html-template-tag');

const page = () => html`
  <h1>🎈 Hydrogen</h1>
  <p>A super lightweight static-site generator built with <span style="color: #007acc">TypeScript</span> 😻 Uses 🔥 lit-html inspired templates for super performant template generation</p>
  <center>
    <img style="margin: 20px;" src="https://qph.fs.quoracdn.net/main-qimg-706f37c5cbc54e415892478836e8acb5.webp">
  </center>
  <h2>⚡ Quick Start</h2>
  <hr>
  <pre>
    <code>
      $: yarn add hydrogen-cli
    </code>
  </pre>
  <small>index.js</small>
  <pre>
    <code class="javascript">
      const page = ({ title }) => '&lt;title&gt;$n{title}&lt;/title&gt;'

      module.exports = {
        title: 'Hello World',
      }
    </code>
  </pre>
  <pre>
    <code>
      npx hydrogen generate index.js
    </code>
  </pre>
  <small>index.html</small>
  <pre>
    <code>
      &lt;title&gt;Hello World&lt;/title&gt;
    </code>
  </pre>
  `.replace('$n', '$');

module.exports = {
  layout: 'default',
  title: 'Hello',
  page,
};
