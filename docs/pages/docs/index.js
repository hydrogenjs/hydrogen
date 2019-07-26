const html = require('html-template-tag');

const page = () => html`
  <h1>The lightest static-site generator</h1>
  <p>
    Hydrogen was created out of the need to negate the <a style="color: #76FF03;" href="https://gostrengths.com/what-is-the-paradox-of-choice/">"paradox of choice"</a>
    which a lot of static-site generators try to do by providing developers with too many choices to make.
  </p>
  <p>
    Hydrogen uses JavaScript as it's templating engine, why use anything other than a full-blown programming language?
  </p>
  <p>
    Before ES6, JavaScript was not considered powerful enough to manipulate large chunks of the DOM and template engines like Handlebars and Pug filled that void. Now that JavaScript is more powerful than ever,
    it's time for JS to shine as a viable templating engine.
  </p>
  <p>
    Hydrogen provides you with:
    <ul>
      <li><strong>⚡ Millisecond Build.</strong> With the global average attention span being 8 seconds, why wait seconds for your builds when you can wait milliseconds.</li>
      <li><strong>🔥 JavaScript Templates.</strong> With ES6 template literals, who needs template engines like pug and handlebars. You now have access to the full-power of a JavaScript.</li>
      <li><strong>🔌 Use External APIs.</strong> Plug into your data with remote APIs.</li>
    </ul>
  </p>
`;

module.exports = {
  layout: 'default',
  title: 'Docs | 🎈 Hydrogen',
  page,
};
