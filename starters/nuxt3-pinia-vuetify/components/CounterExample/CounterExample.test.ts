import { describe, expect, test } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import CounterExample from './CounterExample.vue';
import { fireEvent, render, screen } from '@/test/utils';

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
		const countValueCoomponent = screen.getByTestId('count-value');

		// Assertions
		expect(countValueCoomponent.textContent).toBe('0');

		await fireEvent.click(button);
		expect(countValueCoomponent.textContent).toBe('1');

		await fireEvent.click(button);
		expect(countValueCoomponent.textContent).toBe('2');
	});

	test('Should decrease by 1 the count when clicking decrement button', async () => {
		// Test Mock
		createTestingPinia({
			initialState: {
				counterStore: {
					counter: 5,
				},
			},
		});

		// Act
		render(CounterExample);
		const button = screen.getByTestId('decrement-button');
		const countValue = screen.getByTestId('count-value');

		// Assertions
		expect(countValue.textContent).toBe('5');

		await fireEvent.click(button);
		expect(countValue.textContent).toBe('4');

		await fireEvent.click(button);
		expect(countValue.textContent).toBe('3');
	});

	test('Should reset the count when clicking the reset button', async () => {
		// Test Mock
		createTestingPinia({
			initialState: {
				counterStore: {
					counter: 5,
				},
			},
		});

		// Act
		render(CounterExample);
		const button = screen.getByTestId('reset-button');
		const countValue = screen.getByTestId('count-value');

		// Assertions
		expect(countValue.textContent).toBe('5');

		await fireEvent.click(button);
		expect(countValue.textContent).toBe('0');
	});
});
