import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('starter-home')
export class StarterHome extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<h1>Home Page</h1>`;
  }
}
