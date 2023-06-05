import { MobxLitElement } from '@adobe/lit-mobx';
import { html, PropertyValueMap } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';
import { fetchMessage } from '../../api/fetch.js';
import { starterState } from '../../state.js';
import { PageMixin } from '../page.mixin.js';

import '../../components/greeting/greeting.js';
import '../../components/error-message/error-message.js';

@customElement('starter-greeting')
export class StarterGreeting
	extends PageMixin(MobxLitElement)
	implements BeforeEnterObserver
{
	protected state = starterState;

	protected greeting = '';

	@state()
	protected error = false;

	render() {
		return html`
			<vaadin-vertical-layout theme="padding center">
				<h1>Fetch Data from API</h1>
				${!this.error
					? html`<td-greeting
							message="${this.state.greetingMessage}"
					  ></td-greeting>`
					: html`<td-error-message
							message="Failed to fetch"
					  ></td-error-message>`}
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

	onBeforeEnter(location: RouterLocation) {
		const searchParams = new URLSearchParams(location.search);
		this.greeting =
			searchParams.get('greeting') || 'lit-mobx-vaadin starter.dev!';
	}

	firstUpdated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
	) {
		super.firstUpdated(changedProperties);

		fetchMessage(this.greeting)
			.then(message => {
				this.state.setGreetingMessage(message);
			})
			.catch(() => {
				this.error = true;
			});
	}
}
