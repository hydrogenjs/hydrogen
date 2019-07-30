module.exports = {
  name: '🎈 Hydrogen',
  staticFolder: 'public',
  head: ({ config }) => [
    ['link', { rel: 'stylesheet', href: `/${config.staticFolder}/css/main.css` }],
    ['link', { rel: 'stylesheet', href: 'https://highlightjs.org/static/demo/styles/tomorrow-night-bright.css' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Palanquin&display=swap' }],
    ['script', { src: 'https://yandex.st/highlightjs/8.0/highlight.min.js' }, ''],
    ['script', {}, 'hljs.initHighlightingOnLoad();'],
    ['script', { src: `/${config.staticFolder}/js/script.js` }],
    ['script', { async: true, defer: true, src: 'https://buttons.github.io/buttons.js' }],
  ],
};
