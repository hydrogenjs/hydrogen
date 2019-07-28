const html = require('html-template-tag');

module.exports = async ({ title, content, head }) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    $${head}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Palanquin&display=swap" rel="stylesheet">
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
      font-family: Palanquin, sans-serif;
      padding: 2rem;
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
      overflow-y: scroll;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 16px;
    }

    li {
      font-size: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    small {
      font-size: 12px;
    }

    a {
      color: white;
    }

    pre code {
      font-size: 14px;
      border-radius: 10px;
    }
    
    hr {
      border-top: dotted 1px;
    }

    ul ul li {
      font-size: 13px;
    }

    table {
      border: 1px solid white;
      padding: 5px;
      border-radius: 10px;
    }

    tr {
      border: 1px solid white;
    }

    th {
      padding: 5px;
    }

    td { 
      border-top: 1px solid white;
      font-size: 13px;
      padding: 10px;
    }

    footer {
      margin-top: 20px;
    }

    .code {
      background-color: black; 
      color: #76FF03; 
      padding: 2px;
    }
  </style>
  <hr style="margin-top: 40px;">
  <footer>
    <p>Made with Hydrogen by <a style="color: #007acc;" href="https://twitter.com/shailen_naidoo">@shailen_naidoo</a> 🤎</p>
  </footer>
  </html>
`;
