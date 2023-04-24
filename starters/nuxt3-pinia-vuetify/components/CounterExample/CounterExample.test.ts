import { describe, expect, test } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CounterExample from './CounterExample.vue';
import { fireEvent, render, screen } from '../../test/utils';

describe('<CounterExample />', () => {
	test('Should increase by 1 the count when clicking increment button', async () => {
		// Test Mock
		createTestingPinia({
			initialState: {
				counterStore: {
					counter: 0,
				},
			},
		});

		// Act
		render(CounterExample);
		const button = screen.getByTestId('increment-button');
		const countValueComponent = screen.getByTestId('count-value');

		// Assertions
		expect(countValueComponent.textContent).toBe('0');

		await fireEvent.click(button);
		expect(countValueComponent.textContent).toBe('1');

		await fireEvent.click(button);
		expect(countValueComponent.textContent).toBe('2');
	});

	test('Should decrease by 1 the count when clicking decrement button', async () => {
		// Test Mock
		createTestingPinia({
			initialState: {
				counterStore: {
					counter: 0,
				},
			},
		});

		// Act
		render(CounterExample);
		const button = screen.getByTestId('decrement-button');
		const countValueComponent = screen.getByTestId('count-value');

		// Assertions
		expect(countValueComponent.textContent).toBe('0');

		await fireEvent.click(button);
		expect(countValueComponent.textContent).toBe('-1');

		await fireEvent.click(button);
		expect(countValueComponent.textContent).toBe('-2');
	});

	test('Should reset the count when clicking the reset button', async () => {
		// Test Mock
		createTestingPinia({
			initialState: {
				counterStore: {
					counter: 0,
				},
			},
		});

		// Act
		render(CounterExample);
		const resetButton = screen.getByTestId('reset-button');
		const decrementButton = screen.getByTestId('decrement-button');
		const countValueComponent = screen.getByTestId('count-value');

		// Assertions
		expect(countValueComponent.textContent).toBe('0');

		await fireEvent.click(decrementButton);
		expect(countValueComponent.textContent).toBe('-1');

		await fireEvent.click(decrementButton);
		expect(countValueComponent.textContent).toBe('-2');

		await fireEvent.click(resetButton);
		expect(countValueComponent.textContent).toBe('0');
	});
});
