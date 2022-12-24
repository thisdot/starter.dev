import { getErrorMessage } from './getErrorMessage';

type CircularType = { obj?: unknown };
const circularExample: CircularType = {};
circularExample.obj = circularExample;

describe('getErrorMessage', () => {
	describe.each([
		{
			label: 'error object with message',
			input: new Error('generic error message'),
			expected: 'generic error message',
		},
		{
			label: 'generic thrown error',
			input: 'non-error error message',
			expected: '"non-error error message"',
		},
		{
			label: 'generic thrown error with parsing issue',
			input: circularExample,
			expected: '[object Object]',
		},
	])('return $label', ({ input, expected }) => {
		test(`return ${expected}`, () => {
			expect(getErrorMessage(input)).toEqual(expected);
		});
	});
});
