const html = require('html-template-tag');

const page = () => html`
  <h1>Hydrogen</h1>
  <p>Voted the world's lightest static-site generator built with TypeScript ❤ It uses 🔥 _lit-html_ inspired templating for super duper performant template generation.</p>
`;

module.exports = {
  layout: 'default',
  title: 'Hello',
  page,
};
