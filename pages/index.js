const html = require('html-template-tag');

const page = ({ name }) => html`
  <p>${name}</p>
`;

module.exports = {
  layout: 'default',
  data: {
    name: 'Shailen',
  },
  page,
};