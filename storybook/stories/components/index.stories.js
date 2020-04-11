import html from 'html-template-tag'

export default { title: 'Components' }

const Badge = () => html`
  <code class="badge">+v0.6</code>
  
  <code class="badge red text-white">+v0.6</code>

  <code class="badge green">+v0.6</code>

  <code class="badge blue">+v0.6</code>

  <code class="badge orange">+v0.6</code>
`

const Code = () => html`
  <code class="code">{ "hello": "world" }</code>

  <code class="code red text-white">{ "hello": "world" }</code>

  <code class="code grey text-white">{ "hello": "world" }</code>

  <code class="code green text-black">{ "hello": "world" }</code>
`

const Dropdown = () => html`
  <details open>
    <summary>
      <span class="title">🔨 Getting Started</span>
    </summary>
    <ul>
      <li>Step 1: Setup a project</li>
      <li>Step 2: Install Hydrogen</li>
      <li>Step 3: Create a template</li>
      <li>Step 4: Build the template</li>
    </ul>
  </details>
`

export {
  Badge,
  Code,
  Dropdown,
}
