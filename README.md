<p align="center"><img src="https://qph.fs.quoracdn.net/main-qimg-706f37c5cbc54e415892478836e8acb5.webp"></p>

# 🎈 Hydrogen

Voted the world's lightest static-site generator built with TypeScript ❤ It uses 🔥 _lit-html_ inspired templating for super duper performant template generation.

BTW Hydrogen is much faster than [@11ty/eleventy](https://www.npmjs.com/package/@11ty/eleventy) 😜

[![Version](https://img.shields.io/npm/v/hydrogen-cli.svg)](https://npmjs.org/package/hydrogen-cli)
[![Downloads/week](https://img.shields.io/npm/dw/hydrogen-cli.svg)](https://npmjs.org/package/hydrogen-cli)
[![License](https://img.shields.io/npm/l/cli.svg)](https://github.com/ShailenNaidoo/hydrogen/blob/master/package.json)

## ⚙ Features

- ⚡ **Millisecond Builds**. With the global average attention span being 8 seconds, why wait seconds for you builds when you can wait milliseconds. Read the SLA.
- 🔥 **JavaScript Templates**. With ES6 template literals, who needs template engines like pug and handlebars. You now have access to the full-power of a JavaScript.
- 🔌 **Use External APIs**. Plug into your data with remote APIs.

## 🔨 Getting started

Time to install. You know what to do, time to put _NPM_ or _Yarn_ to work 💪

```bash
yarn add hydrogen-cli
```

### Folder structure

Here is a basic folder structure you can setup.

```
layouts/
  |_ default.js
pages//
  |_ index.js
```

There are two types of templates: `layout` and `page`

### Layout

A layout is a template that contains the markup for the application shell

<small><strong>default.js</strong></small>
```javascript
module.exports = ({ title, content, dev }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
  </head>
  <body>
    ${content}
  </body>
  </html>
`;
```

Properties made available to the exported function

| Properties | Description | Type |
|------------| ------------|------|
| *title* | The is the title of page | `string` |
| *content* | The HTML generate by the page | `string` |
| *dev* | If in development mode | `boolean` |

### Page

A page is your content that gets injected into the layout you assign.

```javascript
const page = ({ name, dev }) => `
  <p>${name}<p>
`;

module.exports = {
  layout: 'default',
  title: 'Homepage',
  page,
  async data() {
    return {
      name: 'John',
    };
  },
};
```

Properties of the exported object

| Properties | Description | Type |
|------------|-------------|------|
| _layout_ | Assigns a layout to your page | `string` |
| _title_ | Assigns a title to your page layout | `string` |
| _page_ | Your page content goes here, you get access to all the properties returned from the `async data` method | `function(): string` |
| _data_ | A method where you can access data from remote APIs. **!Always return an object** | `async function(): Promise<object>`

## How do build my templates?.


All you have to do is run this command, it will generate a `dist` folder with your HTML documents

<small><strong>development build</strong></small>
```bash
npx hydrogen build --dev
```

<small><strong>production build</strong></small>

```bash
npx hydrogen build
```