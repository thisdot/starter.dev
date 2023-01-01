import { mockClient } from 'aws-sdk-client-mock';
import { SQSClient, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getQueueUrl } from './getQueueUrl';

describe('getQueueUrl', () => {
	let subject: ReturnType<typeof getQueueUrl> | Awaited<ReturnType<typeof getQueueUrl>>;
	let sqsMock: ReturnType<typeof mockClient>;

	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
		sqsMock = mockClient(SQSClient);
	});

	afterAll(() => {
		sqsMock.restore();
		jest.restoreAllMocks();
	});

	describe('when valid params are provided', () => {
		describe('when queue is found', () => {
			beforeAll(async () => {
				sqsMock.on(GetQueueUrlCommand).resolves({
					QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/ExampleQueue',
				});
				subject = await getQueueUrl('ExampleQueue');
			});

			it('returns QueueUrl', () => {
				expect(subject).toEqual('https://sqs.us-east-1.amazonaws.com/123456789012/ExampleQueue');
			});
		});

		describe('when queue is not found', () => {
			beforeAll(() => {
				sqsMock.on(GetQueueUrlCommand).resolves({
					QueueUrl: undefined,
				});
				subject = getQueueUrl('ExampleQueue');
			});

			it('throws an error', async () => {
				await expect(subject).rejects.toThrow('Queue not found');
			});
		});
	});

	describe('when invalid params are provided', () => {
		beforeAll(() => {
			sqsMock.on(GetQueueUrlCommand).rejects('mocked rejection');
			subject = getQueueUrl('ExampleQueue');
		});

		it('throws an exception with the error message', async () => {
			await expect(subject).rejects.toThrow('mocked rejection');
		});
	});
});
