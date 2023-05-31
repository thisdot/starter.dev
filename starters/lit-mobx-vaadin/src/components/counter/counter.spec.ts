import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import { starterState } from '../../state.js';
import './counter.js';
import type { Counter } from './counter.js';

describe('Counter', () => {
	beforeEach(() => {
		starterState.count = 0;
	});

	it('has required elements 3 buttons and 1 span', async () => {
		const el: Counter = await fixture(html` <td-counter></td-counter> `);

		expect(el.shadowRoot?.querySelectorAll('span')).to.have.length(1);
		expect(el.shadowRoot?.querySelectorAll('vaadin-button')).to.have.length(3);
	});

	it('is shows a count with default value 0', async () => {
		const el: Counter = await fixture(html` <td-counter></td-counter> `);

		expect(el.shadowRoot?.querySelector('span')).to.have.text('Count: 0');
	});

	it('it increases count value when increment button is clicked', async () => {
		const el: Counter = await fixture(html` <td-counter></td-counter> `);

		const span = el.shadowRoot?.querySelector('span');
		expect(span).to.have.text('Count: 0');

		const buttons = el.shadowRoot?.querySelectorAll('vaadin-button') || [];
		const incrementButton = Array.from(buttons).find(button =>
			/increment/i.test(button.innerText),
		);

		incrementButton?.click();
		await elementUpdated(el);

		expect(span).to.have.text('Count: 1');

		incrementButton?.click();
		await elementUpdated(el);

		expect(span).to.have.text('Count: 2');
	});

	it('it decreases count value when decrement button is clicked', async () => {
		const el: Counter = await fixture(html` <td-counter></td-counter> `);

		const span = el.shadowRoot?.querySelector('span');
		expect(span).to.have.text('Count: 0');

		const buttons = el.shadowRoot?.querySelectorAll('vaadin-button') || [];
		const decrementButton = Array.from(buttons).find(button =>
			/decrement/i.test(button.innerText),
		);

		decrementButton?.click();
		await elementUpdated(el);

		expect(span).to.have.text('Count: -1');

		decrementButton?.click();
		await elementUpdated(el);

		expect(span).to.have.text('Count: -2');
	});

	it('it resets count value when reset button is clicked', async () => {
		const el: Counter = await fixture(html` <td-counter></td-counter> `);

		const span = el.shadowRoot?.querySelector('span');
		expect(span).to.have.text('Count: 0');

		const buttons = el.shadowRoot?.querySelectorAll('vaadin-button') || [];
		const resetButton = Array.from(buttons).find(button =>
			/reset/i.test(button.innerText),
		);

		starterState.count = 20;
		await elementUpdated(el);
		expect(span).to.have.text('Count: 20');

		resetButton?.click();
		await elementUpdated(el);
		expect(span).to.have.text('Count: 0');
	});
});
