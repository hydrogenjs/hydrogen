const html = require('html-template-tag');

const page = () => html`
  <h1>🌐 Working with Data</h1>
  <hr>
  <p>
    Hydrogen has a powerful API for exposing data to your page templates using the data method, we can expose synchronous or asynchronous data.
  </p>
  <p>
    Let's see how we can do this!
  </p>
  <h2 id="using-synchronous-data">Using Synchronous Data</h2>
  <p>
    Synchronous data is any data that does not require some sort of API call to an endpoint.
  </p>
  <small>Using a simple object</small>
  <pre>
    <code class="lang-javascript">
      const page = ({ title, data }) => &#96;
        &lt;html&gt;
          &lt;head&gt;
            &lt;title&gt;$n{title}&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            &lt;p&gt;$n{data.text}&lt;/p&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      &#96;;

      module.exports = {
        title: 'Hydrogen webpage',
        page,
        data: ({ dev }) => ({
          text: 'Hello from Hydrogen',
        }),
      };
    </code>
  </pre>
  <small>Using JSON data</small>
  <pre>
    <code class="lang-javascript">
      const data = require('./data.json');

      const page = ({ title, data }) => &#96;
        &lt;html&gt;
          &lt;head&gt;
            &lt;title&gt;$n{title}&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            &lt;ul&gt;
              $n{data.posts.map((post) => &#96;&lt;li&gt;$n{post.title}&lt;/li&gt;&#96;).join('')}
            &lt;/ul&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      &#96;;

      module.exports = {
        title: 'Hydrogen webpage',
        page,
        data: ({ dev }) => ({
          posts: data,
        }),
      };
    </code>
  </pre>
  <h2 id="using-asynchronous-data">Using Asynchronous Data</h2>
  <p>
    Asynchronous data is any data that is sitting in a remote API
  </p>
  <small>Hitting a remote API</small>
  <pre>
    <code class="lang-javascript">
      const axios = require('axios');

      const page = ({ title, data }) => &#96;
        &lt;html&gt;
          &lt;head&gt;
            &lt;title&gt;$n{title}&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            &lt;p&gt;$n{data.githubStars}&lt;/p&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      &#96;;

      module.exports = {
        title: 'Hydrogen webpage',
        page,
        data: async ({ dev }) => ({
          githubStars: await axios.get('https://githubstars.com').then((res) => res.data),
        }),
      };
    </code>
  </pre>
`.replace(/\$n/g, '$');

module.exports = {
  layout: 'default',
  page,
  head: ({ config }) => [
    ['meta', { name: 'description', content: 'Learn how to expose data to your data sync/async' }],
    ['meta', { name: 'og:title', content: 'Working with data | 🎈 Hydrogen' }],
    ['meta', { name: 'og:description', content: 'Learn how to expose data to your data sync/async' }],
    ['meta', { name: 'og:url', content: 'https://hydrogen-cli.netlify.com' }],
    ['title', {}, `Working with data | ${config.name}`],
  ],
};
