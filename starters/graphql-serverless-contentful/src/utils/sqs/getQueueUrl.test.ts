import { mockClient } from 'aws-sdk-client-mock';
import { SQSClient, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
// import { getQueueUrl } from './getQueueUrl';
import assert from 'assert';

describe('getQueueUrl', () => {
	// const OLD_ENV = process.env;
	let subject: any;
	let sqsMock: any;
	// let SQSClient: SQSClient;

	beforeAll(() => {
		jest.resetModules();
		// SQSClient = require('@aws-sdk/client-sqs').SQSClient;
		sqsMock = mockClient(SQSClient);
		const { getQueueUrl } = require('./getQueueUrl');
		subject = getQueueUrl();
	});

	afterAll(() => {
		assert(sqsMock !== null);
		sqsMock.restore();
	});

	describe('when valid params are provided', () => {
		beforeAll(async () => {
			sqsMock.on(GetQueueUrlCommand).resolves({
				QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/DemoQueue',
			});
			const { getQueueUrl } = require('./getQueueUrl');
			subject = getQueueUrl();
		});

		it('returns QueueUrl', () => {
			expect(subject).toEqual(
				'https://sqs.us-east-1.amazonaws.com/123456789012/DemoQueue'
			);
		});
	});

	// describe('when invalid params are provided', () => {
	// 	beforeAll(() => {
	// 		sqsMock.on(GetQueueUrlCommand).rejects('mocked rejection');
	// 		subject = getQueueUrl();
	// 	});

	// 	it('throws an exception with the error message', async () => {
	// 		await expect(subject).rejects.toThrow('mocked rejection');
	// 	});
	// });
});
