import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import "../../components/vaadin-vertical-layout/vaadin-vertical-layout.js";
import "../../components/counter/counter.js";

@customElement('starter-counter')
export class StarterCounter extends LitElement {
  render() {
    return html`
      <vaadin-vertical-layout theme="padding center">
          <h1>Increment, Decrement and Reset Button Example</h1>
          <td-counter></td-counter>
      </vaadin-vertical-layout>
    `;
  }
}
