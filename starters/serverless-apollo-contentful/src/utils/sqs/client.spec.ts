import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { isOffline } from './is-offline';
import { getClient } from './client';

jest.mock('./is-offline', () => ({
	isOffline: jest.fn(),
}));

const MOCK_IS_OFFLINE = isOffline as jest.Mock;

const MOCK_PORT = '12345';

jest.mock('@aws-sdk/client-sqs', () => {
	const mSQSClient = {};
	return {
		SQSClient: jest.fn(() => mSQSClient),
	};
});

describe('.getClient', () => {
	let mockSqsClient: SQSClient;
	const originalEnv = process.env;

	beforeEach(() => {
		mockSqsClient = new SQSClient({});
	});

	afterEach(() => {
		process.env = originalEnv;
		jest.clearAllMocks();
	});

	describe('when isOffline returns false', () => {
		beforeAll(() => {
			MOCK_IS_OFFLINE.mockReturnValue(false);
		});

		it('returns an instance of SQSClient with an empty config', () => {
			const result = getClient();
			expect(result).toBe(mockSqsClient);
			expect(SQSClient).toHaveBeenCalledWith({});
		});
	});

	describe('when isOffline returns true', () => {
		beforeAll(() => {
			MOCK_IS_OFFLINE.mockReturnValue(true);
			process.env = { SQS_PORT: MOCK_PORT };
		});

		it('returns an instance of SQSClient with an empty config', () => {
			const result = getClient();
			expect(result).toBe(mockSqsClient);
			expect(SQSClient).toHaveBeenCalledWith({
				endpoint: `http://localhost:${MOCK_PORT}`,
			});
		});
	});

	describe('when caching', () => {
		beforeAll(() => {
			MOCK_IS_OFFLINE.mockReturnValueOnce(false);
		});

		it('returns a cached SQSClient instance when one already exists', () => {
			const firstResult = mockSqsClient;
			const secondResult = mockSqsClient;
			expect(secondResult).toBe(firstResult);
			expect(SQSClient).toHaveBeenCalledTimes(1);
		});
	});
});
