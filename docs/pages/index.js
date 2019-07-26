const html = require('html-template-tag');

const page = () => html`
  <h1>🎈 Hydrogen</h1>
  <p>A super lightweight static-site generator built with <span style="color: #007acc">TypeScript</span> 😻 Uses 🔥 lit-html inspired templates for super performant template generation</p>
  <center>
    <img style="margin: 20px;" src="https://qph.fs.quoracdn.net/main-qimg-706f37c5cbc54e415892478836e8acb5.webp">
  </center>
  <h2>⚡ Quick Start</h2>
  <hr>
  <pre style="padding: 20px 20px 0px 0px; background-color: #616161; border-radius: 10px; font-size: 20px; border: 1px solid white;">
    $: yarn add hydrogen-cli
  </pre>
`;

module.exports = {
  layout: 'default',
  title: 'Hello',
  page,
};
