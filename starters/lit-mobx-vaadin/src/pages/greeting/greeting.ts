import { html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { PageMixin } from '../page.mixin.js';
import { starterState } from '../../state.js';
import { fetchMessage } from '../../api/fetch.js';

import '../../components/greeting/greeting.js';

@customElement('starter-greeting')
export class StarterFetch extends PageMixin(MobxLitElement) {
	protected state = starterState;

	render() {
		return html`
			<vaadin-vertical-layout theme="padding center">
				<h1>Fetch Data from API</h1>
				<td-greeting message="${this.state.greetingMessage}"></td-greeting>
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

		this.state.setGreetingMessage('');
	}

	firstUpdated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
	) {
		super.firstUpdated(changedProperties);

		fetchMessage('lit-mobx-vaadin starter.dev!')
			.then(message => {
				this.state.setGreetingMessage(message);
			})
			.catch(error => {
				console.error(error);
				this.state.setGreetingMessage(
					'Sorry, something went wrong. Please try again.',
				);
			});
	}
}
