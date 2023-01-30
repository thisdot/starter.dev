import { isOffline } from './isOffline';

describe('isOffline()', () => {
	const env = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...env };
	});

	afterEach(() => {
		process.env = env;
	});

	// run each of the 3 possible scenarios
	const cases = [
		['true', true],
		['false', false],
		['undefined', false],
	];
	test.each(cases)('when process.env.IS_OFFLINE set to %p,  returns %p', (a, b) => {
		// set env to test case
		process.env.IS_OFFLINE = String(a);
		expect(isOffline()).toEqual(b);
	});
});
