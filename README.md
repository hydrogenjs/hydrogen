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

## Development

Pull requests are more than welcome :)

Get started by cloning the repo

```bash
$ yarn install

$ cd docs

$ node ../bin/run
```

This will run your changes to the Hydrogen CLI over the Hydrogen documentation

> Note: There are `pre-commit` and `pre-push` hooks that run tests
