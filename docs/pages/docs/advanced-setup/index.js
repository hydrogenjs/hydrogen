const html = require('html-template-tag');

const page = () => html`
  <h1>Advanced Setup</h1>
  <hr>
  <p>
    If you have not read the <a style="color: #76FF03;" href="/docs/getting-started">Getting Started</a> guide, now would be the perfect time!
    The Advanced Section builds on top of what we did in the Getting Started section.
  </p>
  <h2 id="setting-up-a-layout">Step 1: Setting up a layout</h2>
  <p>
    A <code class="code">layout</code> is a template that contains our application shell which our <code class="code">page</code>
    templates get injected into. Create a folder called "layouts", this is where our layouts will be stored.
  </p>
  <small class="code">layouts/default.js</small>
  <pre>
    <code class="lang-javascript">
      module.exports = ({ title, content }) => &#96;
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;
            &lt;title&gt;$n{title}&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            $n{content}
          &lt;/body&gt;
        &lt;/html&gt;
      &#96;;
    </code>
  </pre>
  <p>
    <code class="code">title</code> is provided by the page template and <code class="code">content</code> is the result of the generated page template.
    Now that we have our layout, we now need to use link it to a page template.
  </p>
  <h2 id="setting-up-a-page">Step 2: Setting up a page</h2>
  <p>
    A <code class="code">page</code> is a template that contains your page content. All page templates are stored in the pages folder.
  </p>
  <small class="code">pages/index.js</small>
  <pre>
    <code class="lang-javascript">
      const page = ({ text }) => &#96;
        &lt;p&gt;$n{text}&lt;/p&gt;
      &#96;;

      module.exports = {
        layout: 'default',
        title: 'Hydrogen webpage',
        page,
        data: () => ({
          text: 'Hello from Hydrogen 🎈',
        }),
      };
    </code>
  </pre>
  <h2 id="building-our-templates-into-html">Step 3: Building our templates into HTML</h2>
  <p>
    After setting up our pages and layouts, we are now able to generate our templates into deployable HTML files. The built files are stored in <code class="code">dist</code>.
    To build your templates run the <code class="code">build</code> command
  </p>
  <pre>
    <code class="lang-shell">
      $ npx hydrogen build
       _   _           _
      | | | |_   _  __| |_ __ ___   __ _  ___ _ __  
      | |_| | | | |/ _&#96; | '__/ _ \ / _&#96; |/ _ \ '_ \ 
      |  _  | |_| | (_| | | | (_) | (_| |  __/ | | |
      |_| |_|\__, |\__,_|_|  \___/ \__, |\___|_| |_|
              |___/                 |___/

      MODE: PRODUCTION
      Building files... done
      Build time: 49.934ms
    </code>
  </pre>
  <h2 id="using-static-assets-like-css-and-js">Step 4: Using static assets like CSS and JS</h2>
  <p>
    If you have static assets like CSS, JS, Images and etc... You can create a folder called <code class="code">public</code> in the root of the project.
    You can place any assets you like in this folder and when you run the <code class="code">build</code> command the public folder is automatically hoisted into the dist folder.
  </p>
  <p>Repeat <span style="color: #76FF03;">Step 3</span> to see how it works.</p>
`.replace(/\$n/g, '$');

module.exports = {
  layout: 'default',
  title: 'Advanced Setup | 🎈 Hydrogen',
  page,
};
