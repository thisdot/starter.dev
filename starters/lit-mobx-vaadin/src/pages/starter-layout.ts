import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/app-layout';

@customElement('starter-layout')
export class StarterLayout extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <vaadin-app-layout>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }
}
