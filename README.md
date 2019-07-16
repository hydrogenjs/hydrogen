# 🎈 Hydrogen

### World's lightest static-site generator

This project is basically an experiment for educational purposes, to see what is least required to create a static-site generator and also provide the necessary features for basic web development

## Getting Started

1. Clone repo
2. Install packages with NPM or Yarn
3. Run `yarn dev`

All changes to the files will cause the server to auto-build your static html files

## Folder structure

```
layouts/
  |_ default.js
pages/
  |_index.js
```

## Layouts

Let's look at how to create a layout like `layouts/default.js`:

All you do is export a `function` and that function takes an object as an argument with `title` and `content` as properties.

```javascript
const html = require('html-template-tag');

module.exports = ({ title, content }) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${title}</title>
  </head>
  <body>
    $${content}
  </body>
  </html>
`;
```

## Pages

Let's look at how to configure `pages/index.js`:

exported properties:

* `layout`: a `string` of the layout name
* `title`: a `string` of the page title
* `data`: an `object | async function` that returns data
* `page`: the root level `function` that return HTML markup

```javascript
const html = require('html-template-tag');

const page = ({ heading }) => html`
  <h1>${heading}</h1>
`;

module.exports = {
  layout: 'default',
  title: 'Homepage',
  data: {
    heading: 'This is my homepage',
  },
  page,
};
```

### Async data

You can also fetch data asynchronously from external APIs using the `async data` function

```javascript
const html = require('html-template-tag');

const page = ({ heading }) => html`
  <h1>${heading}</h1>
`;

module.exports = {
  layout: 'default',
  title: 'Homepage',
  async data() {
    const heading = await new Promise((resolve) => resolve('This is my homepage'));

    return { 
      heading,
    };
  },
  page,
};
```

## Components

You can create very simple HTML components

```javascript
const html = require('html-template-tag');

const createUnorderedListOfFruits = (fruits) => html`
  <li>
    $${fruits.map(fruit => html`<li>${fruit}</li>`).join('')}
  </li>
`;

const page = ({ fruits }) => html`
  <div>
    $${createUnorderedListOfFruits(fruits)}
  </div>
`;

module.exports = {
  layout: 'default',
  title: 'Homepage',
  data: {
    fruits: ['Orange', 'Mango', 'Grapes'],
  },
  page,
};
```

## Syntax highlighting

For syntax highligting of HTML within the template tag, use **lit-html** extension for VSCode

![](https://i.ibb.co/BcRRh8k/image.png)