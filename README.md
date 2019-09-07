<p align="center"><img src="https://qph.fs.quoracdn.net/main-qimg-706f37c5cbc54e415892478836e8acb5.webp"></p>

# 🎈 Hydrogen

Voted the world's lightest static-site generator built with TypeScript ❤ It uses 🔥 _lit-html_ inspired templating for super duper performant template generation.

- Check out the online [documentation](https://hydrogenjs.org) 📖
- Check out our [Trello board](https://trello.com/b/N5949mJZ/hydrogenjs-development) for project activity
- Want to contribute to HydrogenJS? Check out the [contributing](/CONTRIBUTING.md) doc

BTW Hydrogen is much faster than [@11ty/eleventy](https://www.npmjs.com/package/@11ty/eleventy) 😜

[![Netlify Status](https://api.netlify.com/api/v1/badges/812415ef-37e8-4015-b7cd-7654d0f3c9b8/deploy-status)](https://app.netlify.com/sites/hydrogen-cli/deploys)
[![Version](https://img.shields.io/npm/v/hydrogen-cli.svg)](https://npmjs.org/package/hydrogen-cli)
[![codecov](https://codecov.io/gh/ShailenNaidoo/hydrogen/branch/master/graph/badge.svg)](https://codecov.io/gh/ShailenNaidoo/hydrogen)
[![Downloads/week](https://img.shields.io/npm/dw/hydrogen-cli.svg)](https://npmjs.org/package/hydrogen-cli)
[![License](https://img.shields.io/npm/l/cli.svg)](https://github.com/ShailenNaidoo/hydrogen/blob/master/package.json)

## Features 

- ⚡ **Millisecond Builds**. With the global average attention span being 8 seconds, why wait seconds for your builds when you can wait milliseconds. Read the [SLA](/SLA.md).
- 🔥 **JavaScript Templates**. With ES6 template literals, who needs template engines like pug and handlebars. You now have access to the full-power of a JavaScript.
- 🔌 **Use External APIs**. Plug into your data with remote APIs.
- 🕶 **Powerful Metadata API**. Get the best SEO for your static pages.

## Quick start
Add Hydrogen CLI to your project

```bash
$ yarn add hydrogen-cli
```
Create a simple `index.js` file with below code

```javascript
const page = ({ title, data, head }) => `
  <!DOCTYPE html>
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
}
```

Run the below command to generate your template to HTML

```bash 
$ npx hydrogen generate index.js
```
The below HTML is outputted to an HTML file with the same name as the source `index.html`

```html
  <!DOCTYPE html>
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

> If you want to see a more advanced setup using Hydrogen, checkout [⚙ Advanced Setup](https://hydrogenjs.org/docs/advanced-setup/)

## Development

Pull requests are more than welcome :)

1. Install [Docker](https://www.docker.com/)
2. Clone repo
3. All commands are in the `package.json` file

Run the below commands:

```bash
$ yarn docker:setup # Builds Docker image and create Docker container

$ yarn docker:start # Starts Docker image

$ yarn docker:cli:dev # Runs CLI in dev mode
```

This will run your changes to the Hydrogen CLI over the Hydrogen documentation

> Note: There are `pre-commit` and `pre-push` hooks that run tests
