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

      .loader {
        min-width: 300px;
        border-radius: 0.375rem;
        border-width: 2px;
        font-size: 1.2rem;
        margin: 1em 0;

        background-color: #d1d5db;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .loader::before {
        content: '\\00a0 ';
      }

      .fetch {
        font-size: 1.2rem;
        margin: 1em 0;
      }

      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ];

  render() {
    return html`
      ${this.state.fetchMessage
        ? html`<p class="fetch">Message: ${this.state.fetchMessage}</p>`
        : html`<div class="loader"></div>`}
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
