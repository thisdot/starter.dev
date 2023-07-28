import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { router } from '../router.js';
import { theme } from '../styles/theme.js';

@customElement('starter-app')
export class StarterApp extends LitElement {
	@query('#outlet', true) private outlet!: HTMLDivElement;

	static styles = [theme];

	firstUpdated() {
		router.setOutlet(this.outlet);
	}

	render() {
		return html`<div id="outlet"></div>`;
	}
}
