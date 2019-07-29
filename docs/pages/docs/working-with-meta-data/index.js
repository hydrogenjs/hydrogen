const html = require('html-template-tag');

const page = () => html`
  <h1>🕶 Working with Metadata<code class="badge">New v0.5</code></h1>
  <p>Want to add some metadata to your page? Now you can with the <code class="code">Head API</code>! All page templates have access to this API</p>
  <h2 id="using-the-head-api">Using the Head API</h2>
  <p>Using static metadata</p>
  <small>You can access the head property in the layout template</small>
  <pre>
    <code class="lang-javascript">
      module.exports = ({ title, content, head, dev }) => &#96;
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;
            $n{head}
            &lt;script src="$n{dev ? 'https://dev.script.js' : 'https://prod.script.js'}"&gt;&lt;/script&gt;
            &lt;title&gt;$n{title}&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            $n{content}
          &lt;/body&gt;
        &lt;/html&gt;
      &#96;;
    </code>
  </pre>
  <small>In your page template you can export the head function</small>
  <pre>
    <code class="lang-javascript">
      const page = ({ text, dev }) => &#96;
        &lt;p&gt;$n{text}&lt;/p&gt;
      &#96;;

      module.exports = {
        layout: 'default',
        title: 'Hydrogen webpage',
        page,
        data: () => ({
          text: 'Hydrogen metadata',
        }),
        head: () => [
          ['meta', { name: 'description', content: 'Hydrogen metadata' }],
        ];
      };
    </code>
  </pre>
  <small>Run build command</small>
  <pre>
    <code class="lang-html">
      &lt;!DOCTYPE html&gt;
      &lt;html&gt;
        &lt;head&gt;
          &lt;meta name="description" content="Hydrogen metadata" /&gt;
          &lt;script src="https://dev.script.js"&gt;&lt;/script&gt;
          &lt;title&gt;Hydrogen webpage&lt;/title&gt;
        &lt;/head&gt;
        &lt;body&gt;
          &lt;p&gt;Hydrogen metadata&lt;/p&gt;          
        &lt;/body&gt;
      &lt;/html&gt;
    </code>
  </pre>
  <h2 id="using-asynchronous-data-with-the-head-api">Using asynchronous data with the Head API</h2>
  <p>We also have access to the data from the Data API</p>
  <pre>
    <code class="lang-javascript">
      const axios = require('axios');

      const page = ({ likes, dev }) => &#96;
        &lt;p&gt;This project has $n{likes} likes&lt;/p&gt;
      &#96;;

      module.exports = {
        layout: 'default',
        title: 'Hydrogen webpage',
        page,
        data: async ({ dev }) => ({
          likes: await axios.get('https://likes.com').then(res => res.data),
        }),
        head: ({ likes, dev }) => [
          ['meta', { name: 'og:likes', content: likes }],
        ];
      };
    </code>
  </pre>
`.replace(/\$n/g, '$');

module.exports = {
  layout: 'default',
  title: 'Working with Metadata | 🎈 Hydrogen',
  page,
  head: () => [
    ['meta', { name: 'description', content: 'Want to add some metadata to your page? Now you can with the Head API! All page templates have access to this API' }],
    ['meta', { property: 'og:tite', content: 'Working with Metadata | 🎈 Hydrogen' }],
    ['meta', { property: 'og:description', content: 'Want to add some metadata to your page? Now you can with the Head API! All page templates have access to this API' }],
    ['meta', { property: 'og:url', content: 'https://hydrogen-cli.netlify.com' }],
  ],
};
