import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/app-layout';

@customElement('starter-layout')
export class StarterLayout extends LitElement {
	render() {
		return html`
			<vaadin-app-layout>
				<slot></slot>
			</vaadin-app-layout>
		`;
	}
}
