import { mockClient } from 'aws-sdk-client-mock';
import { SQSClient, SendMessageCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { sendMessage } from './sendMessage';

describe('sendMessage', () => {
	let subject: ReturnType<typeof sendMessage> | Awaited<ReturnType<typeof sendMessage>>;
	let sqsMock: ReturnType<typeof mockClient>;

	beforeAll(() => {
		sqsMock = mockClient(SQSClient);
		sqsMock.on(GetQueueUrlCommand).resolves({
			QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/test-queue',
		});
	});

	afterAll(() => {
		sqsMock.restore();
	});

	describe('when valid params are provided', () => {
		let messageId: string;

		beforeAll(async () => {
			messageId = '12345678-1111-2222-3333-111122223333';
			sqsMock.on(SendMessageCommand).resolves({
				MessageId: messageId,
			});
			subject = await sendMessage('ExampleQueue', {
				message: 'Hello World',
			});
		});

		it('sends message to queue', () => {
			expect(subject).toEqual({
				success: true,
				data: {
					MessageId: messageId,
				},
			});
		});
	});

	describe('when invalid params are provided', () => {
		beforeAll(async () => {
			sqsMock.on(SendMessageCommand).rejects('mocked rejection');
			subject = await sendMessage('ExampleQueue', {
				message: 'Hello World',
			});
		});

		it('does not send the message to queue', () => {
			expect(subject).toEqual({
				success: false,
				data: 'mocked rejection',
			});
		});
	});
});
