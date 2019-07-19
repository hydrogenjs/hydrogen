const html = require('html-template-tag');

const page = () => html`
  <p>Ahe</p>
`;

module.exports = {
  layout: 'default',
  title: 'Homepage',
  page,
};