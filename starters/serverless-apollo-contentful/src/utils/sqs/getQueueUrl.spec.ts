import { getClient } from './client';
import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getQueueUrl } from './getQueueUrl';

const MOCK_JOB_QUEUE = 'MOCK_JOB_QUEUE';
const MOCK_QUEUE_URL = 'MOCK_QUEUE_URL';
const MOCK_ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE';

const MOCK_GET_CLIENT = getClient as jest.Mock;

const MOCK_DATA = {
	QueueUrl: MOCK_QUEUE_URL,
};

jest.mock('./client', () => ({
	getClient: jest.fn(),
}));

describe('.getQueueUrl', () => {
	const originalEnv = process.env;

	describe('when process.env.JOB_QUEUE is defined', () => {
		describe('and client.send returns result', () => {
			let result: string | undefined;
			beforeAll(async () => {
				process.env = { JOB_QUEUE: MOCK_JOB_QUEUE };
				MOCK_GET_CLIENT.mockReturnValue({
					send: jest.fn().mockResolvedValue(MOCK_DATA),
				});
				result = await getQueueUrl();
			});

			afterAll(() => {
				MOCK_GET_CLIENT.mockReset();
				process.env = originalEnv;
			});

			it('calls getClient', () => {
				expect(getClient).toHaveBeenCalledTimes(1);
			});

			it('calls client.send with expected command', () => {
				const EXPECTED_INPUT = {
					QueueName: process.env.JOB_QUEUE,
				};
				const mockSend = MOCK_GET_CLIENT.mock.results[0].value.send;
				const expectedArgument = mockSend.mock.calls[0][0];

				expect(mockSend).toHaveBeenCalledTimes(1);
				expect(expectedArgument).toBeInstanceOf(GetQueueUrlCommand);
				expect(expectedArgument.input).toEqual(EXPECTED_INPUT);
			});

			it('returns expected result', () => {
				expect(result).toEqual(MOCK_QUEUE_URL);
			});
		});

		describe('and client.send throws error', () => {
			beforeAll(() => {
				MOCK_GET_CLIENT.mockReturnValue({
					send: jest.fn().mockRejectedValue(new Error(MOCK_ERROR_MESSAGE)),
				});
			});

			afterAll(() => {
				MOCK_GET_CLIENT.mockReset();
			});

			it('throws expected error', async () => {
				await expect(getQueueUrl()).rejects.toThrow(MOCK_ERROR_MESSAGE);
			});
		});
	});

	describe('when process.env.JOB_QUEUE is not defined', () => {
		beforeAll(() => {
			process.env = originalEnv;
		});

		it('throws expected error', async () => {
			await expect(getQueueUrl()).rejects.toThrow('Unable to find queue.');
		});
	});
});
