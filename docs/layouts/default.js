const html = require('html-template-tag');

module.exports = ({ title, content }) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/tomorrow-night-bright.css">
    <script src="https://yandex.st/highlightjs/8.0/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <meta name="description" content="A super lightweight static-site generator built with TypeScript 😻 Uses 🔥 lit-html inspired templates for super performant template generation">
    <meta property="og:title" content="🎈 Hydrogen: Super fast static-site generator" />
    <meta property="og:image" content="https://qph.fs.quoracdn.net/main-qimg-706f37c5cbc54e415892478836e8acb5.webp" />
    <meta property="og:url" content="https://hydrogen-cli.netlify.com" />
    <title>${title}</title>
  </head>
  <body>
    $${content}
  </body>
  <style>
    body {
      background: #222222;
      color: white;
      font-family: "Roboto Mono", sans-serif;
      padding: 2rem;
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
      overflow-y: scroll;
    }

    h1 {
      font-size: 25px;
    }

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 13px;
    }

    li {
      font-size: 13px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    small {
      font-size: 10px;
    }

    a {
      color: white;
    }

    pre code {
      font-size: 13px;
      border-radius: 10px;
    }
    
    hr {
      border-top: dotted 1px;
    }

    .code {
      background-color: black; 
      color: #76FF03; 
      padding: 2px;
    }
  </style>
  </html>
`;
