import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { router } from '../router.js';

@customElement('starter-app')
export class StarterApp extends LitElement {
  @query('#outlet', true) private outlet!: HTMLDivElement;

  firstUpdated() {
    router.setOutlet(this.outlet);
  }

  render() {
    return html`
      <div id="outlet"></div>`;
  }
}
