import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { starterState } from '../../state.js';

@customElement('starter-fetch')
export class StarterFetch extends MobxLitElement {
  protected state = starterState;

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<h1>Fetch Page</h1>`;
  }
}
