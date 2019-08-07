const html = require('html-template-tag');

const page = () => html`
  <h1>🩺 Setting Up a Service Worker</h1>
`;

module.exports = {
  layout: 'default',
  page,
  head: ({ config }) => [
    ['title', {}, `Setting Up a Service Worker | ${config.name}`],
  ],
};
