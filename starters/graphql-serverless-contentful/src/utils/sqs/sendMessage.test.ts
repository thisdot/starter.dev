import {
	SendMessageCommand,
	SendMessageCommandOutput,
} from '@aws-sdk/client-sqs';
import { ResponseMetadata } from '@aws-sdk/types/dist-types';
import { Message, sendMessage, SendMessageResult } from './sendMessage';
import { getClient } from './client';
import { getQueueUrl } from './getQueueUrl';

const MOCK_GET_CLIENT = getClient as jest.Mock;
const MOCK_GET_QUEUE_URL = getQueueUrl as jest.Mock;
const MOCK_QUEUE_URL = 'MOCK_QUEUE_URL';
const MOCK_METADATA: ResponseMetadata = {
	httpStatusCode: 200,
};
const MOCK_DATA: SendMessageCommandOutput = {
	$metadata: MOCK_METADATA,
};
const MOCK_ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE';

jest.mock('./client', () => ({
	getClient: jest.fn(),
}));

jest.mock('./getQueueUrl', () => ({
	getQueueUrl: jest.fn(),
}));

describe('.sendMessage', () => {
	const message: Message = { key: 'mock_value' };
	let result: SendMessageResult;

	describe('when called with correct argument', () => {
		describe('and SQSClient.send returns result', () => {
			beforeAll(async () => {
				MOCK_GET_CLIENT.mockReturnValue({
					send: jest.fn().mockResolvedValue(MOCK_DATA),
				});
				MOCK_GET_QUEUE_URL.mockResolvedValue(MOCK_QUEUE_URL);
				result = await sendMessage(message);
			});

			afterAll(() => {
				MOCK_GET_CLIENT.mockReset();
				MOCK_GET_QUEUE_URL.mockReset();
			});

			it('calls getClient', () => {
				expect(MOCK_GET_CLIENT).toHaveBeenCalledTimes(1);
			});
			it('calls getQueueUrl', () => {
				expect(MOCK_GET_QUEUE_URL).toHaveBeenCalledTimes(1);
			});
			it('calls SQSClient.send with expected command', () => {
				const EXPECTED_ARGUMENT = new SendMessageCommand({
					QueueUrl: MOCK_QUEUE_URL,
					MessageBody: JSON.stringify(message),
				});
				expect(getClient().send).toHaveBeenCalledTimes(1);
				expect(getClient().send).toHaveBeenCalledWith(EXPECTED_ARGUMENT);
			});
			it('returns expected result', () => {
				const EXPECTED_RESULT: SendMessageResult = {
					success: true,
					data: MOCK_DATA,
				};
				expect(result).toEqual(EXPECTED_RESULT);
			});
		});

		describe('and SQSClient.send throws error', () => {
			beforeAll(async () => {
				MOCK_GET_CLIENT.mockReturnValue({
					send: jest.fn().mockRejectedValue(new Error(MOCK_ERROR_MESSAGE)),
				});
				MOCK_GET_QUEUE_URL.mockResolvedValue(MOCK_QUEUE_URL);
				result = await sendMessage(message);
			});

			afterAll(() => {
				MOCK_GET_CLIENT.mockReset();
				MOCK_GET_QUEUE_URL.mockReset();
			});
			it('calls getClient', () => {
				expect(MOCK_GET_CLIENT).toHaveBeenCalledTimes(1);
			});
			it('calls getQueueUrl', () => {
				expect(MOCK_GET_QUEUE_URL).toHaveBeenCalledTimes(1);
			});
			it('calls SQSClient.send with expected command', () => {
				const EXPECTED_ARGUMENT = new SendMessageCommand({
					QueueUrl: MOCK_QUEUE_URL,
					MessageBody: JSON.stringify(message),
				});
				expect(getClient().send).toHaveBeenCalledTimes(1);
				expect(getClient().send).toHaveBeenCalledWith(EXPECTED_ARGUMENT);
			});
			it('returns expected result', () => {
				const EXPECTED_RESULT: SendMessageResult = {
					success: false,
					data: MOCK_ERROR_MESSAGE,
				};
				expect(result).toEqual(EXPECTED_RESULT);
			});
		});
	});
});
