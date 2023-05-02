import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageMixin } from '../page.mixin.js';

import '../../components/fetch/fetch.js';

@customElement('starter-fetch')
export class StarterFetch extends PageMixin(LitElement) {
  render() {
    return html`
      <vaadin-vertical-layout theme="padding center">
        <h1>Fetch Data from API</h1>
        <td-fetch></td-fetch>
        <nav>
          <ul>
            <li><a href="/">Return Home</a></li>
          </ul>
        </nav>
      </vaadin-vertical-layout>
    `;
  }
}
