import { html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { PageMixin } from '../page.mixin.js';
import { starterState } from '../../state.js';
import { fetchMessage } from '../../api/fetch.js';

import '../../components/fetch/fetch.js';

@customElement('starter-fetch')
export class StarterFetch extends PageMixin(MobxLitElement) {
  protected state = starterState;

  render() {
    return html`
      <vaadin-vertical-layout theme="padding center">
        <h1>Fetch Data from API</h1>
        <td-fetch message="${this.state.fetchMessage}"></td-fetch>
        <nav>
          <ul>
            <li><a href="/">Return Home</a></li>
          </ul>
        </nav>
      </vaadin-vertical-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.state.setFetchMessage('');
  }

  firstUpdated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ) {
    super.firstUpdated(changedProperties);

    fetchMessage('lit-mobx-vaadin starter.dev!').then(message => {
      console.info(message);
      this.state.setFetchMessage(message);
    });
  }
}
