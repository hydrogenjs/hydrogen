module.exports = {
  name: '🎈 Hydrogen',
  staticFolder: 'public',
  extraStaticFiles: [
    'robots.txt',
  ],
  sw: 'sw.js',
  head: ({ config }) => [
    ['link', { rel: 'stylesheet', href: `/${config.staticFolder}/css/main.css` }],
    ['link', { rel: 'stylesheet', href: 'https://highlightjs.org/static/demo/styles/tomorrow-night-bright.css' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli&display=swap' }],
    ['script', { src: 'https://yandex.st/highlightjs/8.0/highlight.min.js' }, true],
    ['script', {}, 'hljs.initHighlightingOnLoad();'],
    ['script', { src: `/${config.staticFolder}/js/script.js` }, true],
  ],
  build: {
    deleteFolder: true,
  },
};
