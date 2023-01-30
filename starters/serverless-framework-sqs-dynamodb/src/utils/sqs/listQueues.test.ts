import { ListQueuesCommand } from '@aws-sdk/client-sqs';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from './getClient';
import { listQueues } from './listQueues';

describe('dynamodb.listQueues()', () => {
	let subject: Awaited<ReturnType<typeof listQueues>> | ReturnType<typeof listQueues>;
	const sqsMock = mockClient(getClient());

	afterAll(() => {
		sqsMock.restore();
		jest.resetAllMocks();
	});

	describe('when items are found', () => {
		beforeAll(async () => {
			sqsMock.on(ListQueuesCommand).resolves({
				QueueUrls: ['http://localhost:9324/000000000000/ExampleQueue'],
			});
			subject = await listQueues();
		});

		it('returns the queue names', () => {
			expect(subject).toEqual(['http://localhost:9324/000000000000/ExampleQueue']);
		});
	});

	describe('when items are not found', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			sqsMock.on(ListQueuesCommand).resolves({
				QueueUrls: undefined,
			});
			subject = listQueues();
		});

		it('throws error', async () => {
			await expect(subject).rejects.toThrow();
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			sqsMock.on(ListQueuesCommand).rejects('mock error');
			subject = listQueues();
		});

		it('throws error', async () => {
			await expect(subject).rejects.toThrow();
		});

		it('logs the error', () => {
			expect(console.error).toHaveBeenCalledWith('sqs.listQueues Error - mock error');
		});
	});
});
