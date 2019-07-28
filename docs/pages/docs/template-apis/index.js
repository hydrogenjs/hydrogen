const html = require('html-template-tag');

const page = () => html`
  <h1>👀 Template APIs</h1>
  <hr>
  <p>Let's breakdown the APIs of <code class="code">layout</code> and <code class="code">page</code> templates.</p>
  <h2 id="layout-template">Layout Template</h2>
  <p>
    The layout template is used to create our application shell. It's just a JS file that exports a function.
  </p>
  <pre>
    <code class="lang-javascript">
      module.exports = ({ title, content, dev }) => &#96;
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;
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
  <table>
    <tr>
      <th>Argument</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
    <tr>
      <td><code class="code">title</code></td>
      <td>This is provided by the page template, which becomes the title of the page</td>
      <td>string</td>
    </tr>
    <tr>
      <td><code class="code">content</code></td>
      <td>This is output generated after compiling the page template, this gets injected into the layout template</td>
      <td>string</td>
    </tr>
    <tr>
      <td><code class="code">dev</code></td>
      <td>This determines if you are in development or production mode. This is set by using the <code class="code">--dev</code> flag with the build command</td>
      <td>boolean</td>
    </tr>
  </table>
  <h2 id="page-template">Page Template</h2>
  <p>
    The page template contains your page's content. It gets injected into the application shell which is contained in the layout template. 
    It's just a JS file which exports a combination of properties and functions.
  </p>
  <pre>
    <code class="lang-javascript">
      const page = ({ text, dev }) => &#96;
        &lt;p&gt;$n{text}&lt;/p&gt;
      &#96;;

      module.exports = {
        layout: 'default',
        title: 'Hydrogen webpage',
        page,
        data: ({ dev }) => ({
          text: 'Hello from Hydrogen 🎈',
        }),
      };
    </code>
  </pre>
  <table>
    <tr>
      <th>Properties</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
    <tr>
      <td><code class="code">layout</code></td>
      <td>This is the name of the layout you want to use</td>
      <td>string</td>
    </tr>
    <tr>
      <td><code class="code">title</code></td>
      <td>This is used as the title of the page</td>
      <td>string</td>
    </tr>
    <tr>
      <td><code class="code">page</code></td>
      <td>This is a function that is used as the page content</td>
      <td style="width: 20vw;">async page({ ...data: object, dev: boolean }): string</td>
    </tr>
    <tr>
      <td><code class="code">data</code></td>
      <td>This is a function that can be used to fetch data from remote sources such as: JSON files or APIs</td>    
      <td>async data({ dev: boolean }): object</td>    
    </tr>
  </table>
`.replace(/\$n/g, '$');

module.exports = {
  layout: 'default',
  title: 'Template APIs | 🎈 Hydrogen',
  page,
};
