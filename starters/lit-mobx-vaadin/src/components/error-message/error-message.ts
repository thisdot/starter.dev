import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('td-error-message')
export class ErrorMessage extends LitElement {
	@property({ type: String }) message = '';

	static styles = [
		css`
			:host {
				display: block;
				background: var(--td-error-background);
				color: var(--td-error-color);
				border: 1px solid var(--td-error-color);
				font-size: 1.2rem;
				border-radius: 0.2em;
				padding: 0.8em 1.2em;
			}

			p {
				margin: 0;
			}
		`,
	];

	render() {
		return html` <p class="error">${this.message}</p> `;
	}
}
