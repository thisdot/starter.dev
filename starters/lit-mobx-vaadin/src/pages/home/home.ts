import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PageMixin } from '../page.mixin.js';

import '../../components/vaadin-vertical-layout/vaadin-vertical-layout.js';

@customElement('starter-home')
export class StarterHome extends PageMixin(LitElement) {
	render() {
		return html`
			<vaadin-vertical-layout theme="padding center">
				<h1>Lit-Mobx-Vaadin Starter Kit</h1>
				<nav>
					<ul class="links">
						<li>
							<a href="/counter">See Counter example component</a>
						</li>
						<li>
							<a href="/greet">See Fetch example component</a>
						</li>
					</ul>
				</nav>
			</vaadin-vertical-layout>
		`;
	}
}
