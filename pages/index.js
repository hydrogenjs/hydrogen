const html = require('html-template-tag');
const axios = require('axios');

const page = () => html`
  <p>Hello World</p>
`;

module.exports = {
  layout: 'default',
  title: 'Homepage',
  page,
};