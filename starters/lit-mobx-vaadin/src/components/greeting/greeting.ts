import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('td-greeting')
export class Greeting extends LitElement {
	@property({ type: String }) message = '';

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
			${this.message
				? html`<p class="fetch">Message: ${this.message}</p>`
				: html`<div class="loader"></div>`}
		`;
	}
}
