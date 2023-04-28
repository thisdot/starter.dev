import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { starterState } from '../../state.js';

import '@vaadin/button';
import '../vaadin-horizontal-layout/vaadin-horizontal-layout.js';
import '../vaadin-vertical-layout/vaadin-vertical-layout.js';

@customElement('td-counter')
export class StarterCounter extends MobxLitElement {
  protected state = starterState;

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing center">
          <span class="count">Count: ${this.state.count}</span>
          <vaadin-horizontal-layout theme="spacing wrap" class="w-100">
            <vaadin-button theme="primary" class="grow-150px" @click=${() => this.state.incrementCount()}>Increment</vaadin-button>
            <vaadin-button theme="primary" class="grow-150px" @click=${() => this.state.decrementCount()}>Decrement</vaadin-button>
          </vaadin-horizontal-layout>
          <vaadin-button theme="secondary" class="w-100" @click=${() => this.state.resetCount()}>Reset</vaadin-button>
      </vaadin-vertical-layout>
    `
  }

  static styles = [
    css`
      :host {
        width: 100%;
        max-width: 50ch;
      }
      
      .count {
        font-size: var(--lumo-font-size-l);
        font-weight: 700;
      }

      .grow-150px {
        flex-grow: 1;
        flex-basis: 150px;
      }

      .w-100 {
        width: 100%;
      }
    `
  ];
}
