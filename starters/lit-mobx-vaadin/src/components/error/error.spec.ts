import { expect, fixture, html } from '@open-wc/testing';

import './error.js';
import type { Error } from './error.js';

describe('Error', () => {
	it('shows message if prop is set', async () => {
		const msg = 'Oops. Error.';
		const el: Error = await fixture(html`
			<td-error .message=${msg}></td-error>
		`);

		const allNodes = el.shadowRoot?.querySelectorAll('*') || [];
		const matchingNodes = Array.from(allNodes).filter(
			node => node.textContent === msg,
		);
		expect(matchingNodes).to.have.length(1);
	});
});
