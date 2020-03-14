import html from 'html-template-tag'
import { withA11y } from '@storybook/addon-a11y';

export default { title: 'Typography', decorators: [withA11y] }

const Index = () => html`
  <h1>Hydrogen</h1>

  <h2>Hydrogen</h2>

  <h3>Hydrogen</h3>

  <h4>Hydrogen</h4>

  <h5>Hydrogen</h5>

  <h6>Hydrogen</h6>

  <p>A super lightweight static-site generator built with TypeScript 😻 Uses 🔥 lit-html inspired templates for super performant template generation.</p>

  <small>Install Hydrogen CLI</small>

  <small class="italic">Deep dive</small>

  <small class="bold">Quick start</small>

  <small class="italic bold">Documentation</small>
  
  <small class="underline">JavaScript</small>
`

export { Index }
