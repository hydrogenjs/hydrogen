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

Let's look at how to create a layout like `layouts/default.js`:

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

Let's look at how to configure `pages/index.js`:

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
    ${createUnorderedListOfFruits(fruits)}
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