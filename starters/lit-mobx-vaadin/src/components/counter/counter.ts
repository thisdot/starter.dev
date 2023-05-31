import { MobxLitElement } from '@adobe/lit-mobx';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { starterState } from '../../state.js';

import '../vaadin-button/vaadin-button.js';
import '../vaadin-horizontal-layout/vaadin-horizontal-layout.js';

@customElement('td-counter')
export class Counter extends MobxLitElement {
	protected state = starterState;

	render() {
		return html`
			<vaadin-horizontal-layout theme="spacing wrap center" class="container">
				<span class="count">Count: ${this.state.count}</span>
				<vaadin-horizontal-layout
					theme="spacing wrap center"
					class="buttons-wrapper"
				>
					<vaadin-button
						theme="primary"
						class="counter-button"
						@click=${() => this.state.incrementCount()}
						>Increment</vaadin-button
					>
					<vaadin-button
						theme="primary"
						class="counter-button"
						@click=${() => this.state.decrementCount()}
						>Decrement</vaadin-button
					>
					<vaadin-button
						theme="primary"
						class="counter-button"
						@click=${() => this.state.resetCount()}
						>Reset</vaadin-button
					>
				</vaadin-horizontal-layout>
			</vaadin-horizontal-layout>
		`;
	}

	static styles = [
		css`
			.container,
			.buttons-wrapper {
				justify-content: center;
			}

			.count {
				font-size: var(--lumo-font-size-l);
				font-weight: 700;
			}

			.counter-button {
				min-width: 120px;
				flex: 1 1 120px;
			}
		`,
	];
}
