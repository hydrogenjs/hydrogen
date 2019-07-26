const html = require('html-template-tag');

const page = () => html`
  <h1>Hydrogen</h1>
  <p>A super lightweight static-site generator built with <span style="color: #007acc">TypeScript</span> 😻 Uses 🔥 lit-html inspired templates for super performant template generation</p>
`;

module.exports = {
  layout: 'default',
  title: 'Hello',
  page,
};
