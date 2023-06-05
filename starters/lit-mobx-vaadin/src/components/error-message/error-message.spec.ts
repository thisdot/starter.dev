import { expect, fixture, html } from '@open-wc/testing';

import './error-message.js';
import type { ErrorMessage } from './error-message.js';

describe('ErrorMessage', () => {
	it('shows message if prop is set', async () => {
		const msg = 'Oops. Error.';
		const el: ErrorMessage = await fixture(html`
			<td-error-message .message=${msg}></td-error-message>
		`);

		const allNodes = el.shadowRoot?.querySelectorAll('*') || [];
		const matchingNodes = Array.from(allNodes).filter(
			node => node.textContent === msg,
		);
		expect(matchingNodes).to.have.length(1);
	});
});
