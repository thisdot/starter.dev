import { getQueueUrl } from './getQueueUrl';
import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';

describe('getQueueUrl', () => {
	beforeEach(() => {
		process.env.JOB_QUEUE = 'test-queue';
	});

	afterEach(() => {
		delete process.env.JOB_QUEUE;
	});

	it('should return the URL of the queue when the queue exists', async () => {
		const mockSend = jest
			.fn()
			.mockResolvedValue({ QueueUrl: 'https://test-queue-url' });
		jest.mock('./client', () => ({
			getClient: jest.fn().mockReturnValue({ send: mockSend }),
		}));

		const result = await getQueueUrl();
		expect(+.
			).toEqual('https://test-queue-url');
		expect(mockSend).toHaveBeenCalledWith(expect.any(GetQueueUrlCommand));
	});

	it('should throw an error when the queue does not exist', async () => {
		const mockSend = jest.fn().mockRejectedValue(new Error('Queue not found'));
		jest.mock('./client', () => ({
			getClient: jest.fn().mockReturnValue({ send: mockSend }),
		}));


		
		await expect(getQueueUrl()).rejects.toThrowError('Queue not found');
		expect(mockSend).toHaveBeenCalledWith(expect.any(GetQueueUrlCommand));
	});

	it('should throw an error when the JOB_QUEUE environment variable is not set', async () => {
		delete process.env.JOB_QUEUE;

		await expect(getQueueUrl()).rejects.toThrowError('Unable to find queue.');
	});
});
