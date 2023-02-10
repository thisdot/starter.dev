import {
	checkHealth,
	CONTENTFUL_HEALTH_CHECK_QUERY_OPTIONS,
} from './check-health';
import { getEnvironment } from './get-environment';

jest.mock('./get-environment', () => ({
	getEnvironment: jest.fn(),
}));

const MOCK_GET_ENVIRONMENT = <jest.Mock>getEnvironment;

describe('.checkHealth', () => {
	describe('when called', () => {
		describe('and getEnvironment returns enviroment', () => {
			describe('and requested content type exists', () => {
				const MOCK_EVNIRONMENT = {
					getEntries: jest.fn().mockResolvedValue({
						items: [],
					}),
				};
				let result: boolean;

				beforeAll(async () => {
					MOCK_GET_ENVIRONMENT.mockResolvedValue(MOCK_EVNIRONMENT);
					result = await checkHealth();
				});

				afterAll(() => {
					MOCK_GET_ENVIRONMENT.mockReset();
				});

				it('calls getEnvironment once', () => {
					expect(MOCK_GET_ENVIRONMENT).toHaveBeenCalledTimes(1);
				});

				it('calls Environment.getEntries once with expected argument', () => {
					const EXPECTED_ARGUMENT = CONTENTFUL_HEALTH_CHECK_QUERY_OPTIONS;

					expect(MOCK_EVNIRONMENT.getEntries).toBeCalledTimes(1);
					expect(MOCK_EVNIRONMENT.getEntries).toHaveBeenCalledWith(
						EXPECTED_ARGUMENT
					);
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(true);
				});
			});

			describe('and requested content type does not exist', () => {
				const MOCK_EVNIRONMENT = {
					getEntries: jest.fn().mockRejectedValue(new Error()),
				};
				let result: boolean;

				beforeAll(async () => {
					MOCK_GET_ENVIRONMENT.mockResolvedValue(MOCK_EVNIRONMENT);
					result = await checkHealth();
				});

				afterAll(() => {
					MOCK_GET_ENVIRONMENT.mockReset();
				});

				it('calls getEnvironment once', () => {
					expect(MOCK_GET_ENVIRONMENT).toHaveBeenCalledTimes(1);
				});

				it('calls Environment.getEntries once with expected argument', () => {
					const EXPECTED_ARGUMENT = CONTENTFUL_HEALTH_CHECK_QUERY_OPTIONS;

					expect(MOCK_EVNIRONMENT.getEntries).toBeCalledTimes(1);
					expect(MOCK_EVNIRONMENT.getEntries).toHaveBeenCalledWith(
						EXPECTED_ARGUMENT
					);
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(false);
				});
			});
		});

		describe('and getEnvironment throws error', () => {
			let result: boolean;

			beforeAll(async () => {
				MOCK_GET_ENVIRONMENT.mockResolvedValue(new Error());
				result = await checkHealth();
			});

			afterAll(() => {
				MOCK_GET_ENVIRONMENT.mockReset();
			});

			it('returns expected result', () => {
				expect(result).toStrictEqual(false);
			});
		});
	});
});
