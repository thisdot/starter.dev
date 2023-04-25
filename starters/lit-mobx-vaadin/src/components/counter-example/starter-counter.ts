import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { starterState } from '../../state.js';

@customElement('starter-counter')
export class StarterCounter extends MobxLitElement {
  protected state = starterState;

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<h1>Counter Page</h1>`;
  }
}
