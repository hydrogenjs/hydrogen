import html from 'html-template-tag'

export default { title: 'Components' }

const Badge = () => html`
  <code class="badge">New v0.6</code>
  
  <code class="badge red">New v0.6</code>

  <code class="badge green">New v0.6</code>

  <code class="badge blue">New v0.6</code>

  <code class="badge orange">New v0.6</code>
`

const Code = () => html`
  <code class="code">{ "hello": "world" }</code>

  <code class="code red text-white">{ "hello": "world" }</code>

  <code class="code grey text-white">{ "hello": "world" }</code>

  <code class="code green text-black">{ "hello": "world" }</code>
`

export {
  Badge,
  Code,
}
