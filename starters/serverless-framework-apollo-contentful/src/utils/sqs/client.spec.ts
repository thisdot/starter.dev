import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { isOffline } from './is-offline';
import { getClient } from './client';

jest.mock('./is-offline', () => ({
	isOffline: jest.fn(),
}));

const MOCK_IS_OFFLINE = isOffline as jest.Mock;

jest.mock('@aws-sdk/client-sqs', () => {
	return {
		SQSClient: jest.fn(),
	};
});
const MOCK_SQS_CLIENT_CONSTRUCTOR = <jest.Mock>SQSClient;
const EXPECTED_REFERENCE_SQS_CLIENT_INSTANCE: SQSClient = {} as SQSClient;

describe('.getClient', () => {
	let originalEnv: NodeJS.ProcessEnv;

	beforeAll(() => {
		originalEnv = process.env;
		MOCK_SQS_CLIENT_CONSTRUCTOR.mockReturnValue(
			EXPECTED_REFERENCE_SQS_CLIENT_INSTANCE
		);
	});

	afterAll(() => {
		MOCK_SQS_CLIENT_CONSTRUCTOR.mockReset();
		process.env = originalEnv;
	});

	describe('when called', () => {
		describe('and Offline', () => {
			beforeAll(() => {
				MOCK_IS_OFFLINE.mockReturnValue(true);
			});

			afterAll(() => {
				MOCK_IS_OFFLINE.mockReset();
			});

			describe('and environment variable SQS_PORT set', () => {
				const EXPECTED_SQS_CLIENT_CONFIG: SQSClientConfig = {
					endpoint: `http://localhost:12345`,
				};
				let result: SQSClient;

				beforeAll(() => {
					process.env = {
						SQS_PORT: '12345',
					};
					result = getClient();
				});

				afterAll(() => {
					MOCK_IS_OFFLINE.mockClear();
					MOCK_SQS_CLIENT_CONSTRUCTOR.mockClear();
					process.env = originalEnv;
				});

				it('calls SQSClient constructor with expected constructor arguments', () => {
					expect(MOCK_SQS_CLIENT_CONSTRUCTOR).toHaveBeenCalledTimes(1);
					expect(MOCK_SQS_CLIENT_CONSTRUCTOR).toHaveBeenCalledWith(
						EXPECTED_SQS_CLIENT_CONFIG
					);
				});

				it('returns expected result', () => {
					expect(result).toBe(EXPECTED_REFERENCE_SQS_CLIENT_INSTANCE);
				});
			});

			describe('and environment variable SQS_PORT not set', () => {
				const EXPECTED_SQS_CLIENT_CONFIG: SQSClientConfig = {
					endpoint: 'http://localhost:undefined',
				};

				let result: SQSClient;

				beforeAll(() => {
					process.env = {};
					result = getClient();
				});

				afterAll(() => {
					MOCK_IS_OFFLINE.mockClear();
					MOCK_SQS_CLIENT_CONSTRUCTOR.mockClear();
					process.env = originalEnv;
				});

				it('calls SQSClient constructor with expected constructor arguments', () => {
					expect(MOCK_SQS_CLIENT_CONSTRUCTOR).toHaveBeenCalledTimes(1);
					expect(MOCK_SQS_CLIENT_CONSTRUCTOR).toHaveBeenCalledWith(
						EXPECTED_SQS_CLIENT_CONFIG
					);
				});

				it('returns expected result', () => {
					expect(result).toBe(EXPECTED_REFERENCE_SQS_CLIENT_INSTANCE);
				});
			});
		});
		describe('and not Offline', () => {
			const EXPECTED_SQS_CLIENT_CONFIG: SQSClientConfig = {};
			let result: SQSClient;

			beforeAll(() => {
				MOCK_IS_OFFLINE.mockReturnValue(false);
				result = getClient();
			});

			afterAll(() => {
				MOCK_IS_OFFLINE.mockReset();
				MOCK_SQS_CLIENT_CONSTRUCTOR.mockClear();
			});

			it('calls SQSClient constructor with expected constructor arguments', () => {
				expect(MOCK_SQS_CLIENT_CONSTRUCTOR).toHaveBeenCalledTimes(1);
				expect(MOCK_SQS_CLIENT_CONSTRUCTOR).toHaveBeenCalledWith(
					EXPECTED_SQS_CLIENT_CONFIG
				);
			});

			it('returns expected result', () => {
				expect(result).toBe(EXPECTED_REFERENCE_SQS_CLIENT_INSTANCE);
			});
		});
	});
});
