import { isOffline } from './is-offline';

describe('.isOffline', () => {
	describe('when called', () => {
		describe('and IS_OFFLINE enviroment variable value', () => {
			const CASES: [string, string | undefined, boolean][] = [
				['true', 'true', true],
				['false', 'false', false],
				['not set', undefined, false],
			];
			describe.each(CASES)('%s', (_, varValue, expectedResult) => {
				let originalEnv: NodeJS.ProcessEnv;
				let actualResult: boolean;

				beforeAll(() => {
					originalEnv = process.env;
					process.env = {};
					if (varValue) {
						process.env['IS_OFFLINE'] = varValue;
					}
					actualResult = isOffline();
				});

				afterAll(() => {
					process.env = originalEnv;
				});

				it('returns expected result', () => {
					expect(actualResult).toStrictEqual(expectedResult);
				});
			});
		});
	});
});
