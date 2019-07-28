const html = require('html-template-tag');

const page = () => html`
  <h1>Template APIs</h1>
  <hr>
  <p>Let's breakdown the APIs of <code class="code">layout</code> and <code class="code">page</code> templates.</p>
  <h2>Layout Template</h2>
  <p>
    The layout template is used to create our application shell. It's just a JS file that exports a function.
  </p>
  <pre>
    <code class="lang-javascript">
      module.exports = ({ title, content, dev }) => &#96;
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;
            &lt;script src="$n{dev ? 'https://development.script.js' : 'https://production.script.js'}"&gt;&lt;/script&gt;
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
`.replace(/\$n/g, '$');

module.exports = {
  layout: 'default',
  title: 'Template APIs | 🎈 Hydrogen',
  page,
};
