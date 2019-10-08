const html = require('html-template-tag');

const page = () => html`
  <h1>⚙ Generate routes dynamically <code class="badge">New v0.7</code></h1>
  <hr>
  <p>
    What if you want to generate pages dynamically based off some data from an API? Let's say you want to generate blog posts with a unique URL, you can now that!
  </p>
  <h2 id="basic-setup">Basic setup</h2>
  <p>
    Create a file called <code class="code">hydrogen.routes.js</code> in the root of your project
  </p>
  <small>hydrogen.routes.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = async () =&gt; [
        {
          path: '/blogs/setting-up-hydrogen',
          data: {
            post: 1,
          },
        },
        {
          path: '/blogs/setting-up-a-service-worker',
          data: {
            post: 2,
          },
        },
      ];
    </code>
  </pre>
  <p>
    The above function will return an array of routes that can be dynamically generated. We can think of the path like this <code>/blogs/:dynamic-route</code>
    so if you we run <code class="code">npx hydrogen build</code> it will generate pages like this:
  </p>
  <pre>
    <code class="lang-plaintext">
      /dist
      |_ /blogs
        |_ /setting-up-hydrogen
          |_ index.html
        |_ /setting-up-a-service-worker
          |_ index.html
    </code>
  </pre>
  <p>
    Hydrogen will also inject the route information into the Head API, Data API and the Page Template.
  </p>
  <h2 id="setting-up-a-dynamic-page-template">Setting up a dynamic page template</h2>
  <p>
    All dynamic page templates are prefixed with an underscore, so a dynamic page will always look this <code class="code">_index.js</code>
  </p>
  <small>pages/blogs/_index.js</small>
  <pre>
    <code class="lang-javascript">
      const page = ({ data }) => &#96;
        &lt;p&gt;$n{data.content}&lt;/p&gt;
      &#96;;

      module.exports = {
        layout: 'default',
        title: 'Hydrogen webpage',
        page,
        data: async ({ route }) => ({
          content: await axios.get('https://api.blog.com/post=$n{route.data.post}'),
        }),
      };
    </code>
  </pre>
`.replace(/\$n/g, '$');

module.exports = {
  title: 'Advanced Setup | 🎈 Hydrogen',
  page,
  head: ({ config }) => [
    ['meta', { name: 'description', content: 'Learn how to dynamically generate routes with Hydrogen' }],
    ['meta', { property: 'og:title', content: 'Dynamically generate routes | 🎈 Hydrogen' }],
    ['meta', { property: 'og:description', content: 'Learn how to dynamically generate routes with Hydrogen' }],
    ['meta', { property: 'og:url', content: 'https://hydrogen-cli.netlify.com' }],
    ['title', {}, `Dynamically generate routes | ${config.name}`],
  ],
};
