import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageMixin } from '../page.mixin.js';
import { starterState } from '../../state.js';

import '../../components/counter/counter.js';
import '../../components/vaadin-vertical-layout/vaadin-vertical-layout.js';

@customElement('starter-counter')
export class StarterCounter extends PageMixin(LitElement) {
	protected state = starterState;

	render() {
		return html`
			<vaadin-vertical-layout theme="padding center">
				<h1>Increment, Decrement and Reset Button Example</h1>
				<td-counter></td-counter>
				<nav>
					<ul>
						<li><a href="/">Return Home</a></li>
					</ul>
				</nav>
			</vaadin-vertical-layout>
		`;
	}

	connectedCallback() {
		super.connectedCallback();

		this.state.resetCount();
	}
}
