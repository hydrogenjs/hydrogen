---
title: "\U0001F388 Hydrogen: Super fast static-site generator"
description: "A super lightweight static-site generator built with TypeScript \U0001F63B
  Uses \U0001F525 lit-html inspired templates for super performant template generation"

---
# 🎈 Hydrogen

A super lightweight static-site generator built with TypeScript 😻 Uses 🔥 [lit-html](https://lit-html.polymer-project.org/) inspired templates for super performant template generation.

> Compile a ton of templates in under \~150ms

![](https://qph.fs.quoracdn.net/main-qimg-706f37c5cbc54e415892478836e8acb5.webp)

## Quick start

***

<small>Install Hydrogen CLI</small>

`yarn add hydrogen-cli`

<small>Input file: <i>index.js</i></small>

```javascript
const page = ({ title, data, head }) => `
  <html>
    <head>
      <title>${title}</title>
      ${head}
    </head>
    <body>
      <h2>${data.project}</h2>
      <p>${data.description}</p>
    <body>
  </html>
`;

module.exports = {
  page,
  title: 'Welcome to Hydrogen',
  data: () => ({
    project: 'Hydrogen',
    description: 'Super fast static-site generator'
  }),
  head: ({ data }) => [
    ['meta', { name: 'description', content: data.description }]
  ]
};
```

<small>Output file: <i>index.html</i></small>

```html
<html>
  <head>
    <title>Welcome to Hydrogen</title>
    <meta name="description" content="Super fast static-site generator" />
  </head>
  <body>
    <h2>Hydrogen</h2>
    <p>Super fast static-site generator</p>
  <body> 
</html>
```