import { MobxLitElement } from '@adobe/lit-mobx';
import { PropertyValueMap, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { starterState } from '../../state.js';

const FETCH_API_URL = 'https://api.starter.dev/.netlify/functions/server/hello';

@customElement('td-fetch')
export class StarterFetch extends MobxLitElement {
  protected state = starterState;

  static styles = [
    css`
      :host {
        display: block;
      }

      p {
        font-size: 1.2rem;
      }
    `,
  ];

  render() {
    return html`<p class="fetch">Message: ${this.state.fetchMessage}</p>`;
  }

  connectedCallback() {
    super.connectedCallback();

    this.state.setFetchMessage('');
  }

  firstUpdated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ) {
    super.firstUpdated(changedProperties);

    this.fetchMessage('lit-mobx-vaadin starter.dev!').then(message => {
      this.state.setFetchMessage(message);
    });
  }

  private async fetchMessage(greeting: string): Promise<string> {
    try {
      const response = await fetch(
        `${FETCH_API_URL}?${new URLSearchParams({ greeting })}`,
      );
      return response.text();
    } catch (error) {
      console.error(error);
      return 'Sorry, something went wrong. Please try again.';
    }
  }
}
