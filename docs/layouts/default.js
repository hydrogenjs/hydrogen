const html = require('html-template-tag');

module.exports = ({ content }) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://yandex.st/highlightjs/8.0/styles/vs.min.css">
    <script src="https://yandex.st/highlightjs/8.0/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <title>Document</title>
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

    pre code {
      font-size: 18px;
      border-radius: 5px;
    }
  </style>
  </html>
`;
