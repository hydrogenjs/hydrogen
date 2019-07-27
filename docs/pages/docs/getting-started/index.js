const html = require('html-template-tag');

const page = () => html`
  <h1>Getting Started</h1>
  <hr>
`;

module.exports = {
  layout: 'default',
  title: 'Getting Started | 🎈 Hydrogen',
  page,
};
