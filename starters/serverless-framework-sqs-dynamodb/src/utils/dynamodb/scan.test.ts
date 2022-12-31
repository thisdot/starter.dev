import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from './getClient';
import { scan } from './scan';

describe('dynamodb.scan()', () => {
	let subject: Record<string, unknown>[] | null;
	const ddbMock = mockClient(getClient());

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	describe('when items are found', () => {
		beforeAll(async () => {
			ddbMock.on(ScanCommand).resolves({
				Items: [
					{
						description: {
							S: 'Fully managed message queuing for microservices, distributed systems, and serverless applications',
						},
						id: { S: 'ca9085fa-45a6-4d56-b6ee-8d6c59bebbfa' },
						websiteUrl: { S: 'https://aws.amazon.com/sqs/' },
						displayName: { S: 'AWS SQS' },
					},
					{
						description: {
							S: 'Fast, flexible NoSQL database service for single-digit millisecond performance at any scale',
						},
						id: { S: 'dfb3378f-a991-4e45-8e23-59e27768f96f' },
						websiteUrl: { S: 'https://aws.amazon.com/dynamodb/' },
						displayName: { S: 'AWS DynamoDB' },
					},
					{
						description: {
							S: 'All-in-one development solution for auto-scaling apps on AWS Lambda',
						},
						id: { S: '629202fd-00bc-46f2-9f67-3ddeb149b931' },
						websiteUrl: { S: 'https://www.serverless.com/' },
						displayName: { S: 'Serverless Framework' },
					},
				],
			});
			subject = await scan('technology-test');
		});

		it('returns the unmarshalled items', () => {
			expect(subject).toEqual([
				{
					description:
						'Fully managed message queuing for microservices, distributed systems, and serverless applications',
					id: 'ca9085fa-45a6-4d56-b6ee-8d6c59bebbfa',
					websiteUrl: 'https://aws.amazon.com/sqs/',
					displayName: 'AWS SQS',
				},
				{
					description:
						'Fast, flexible NoSQL database service for single-digit millisecond performance at any scale',
					id: 'dfb3378f-a991-4e45-8e23-59e27768f96f',
					websiteUrl: 'https://aws.amazon.com/dynamodb/',
					displayName: 'AWS DynamoDB',
				},
				{
					description: 'All-in-one development solution for auto-scaling apps on AWS Lambda',
					id: '629202fd-00bc-46f2-9f67-3ddeb149b931',
					websiteUrl: 'https://www.serverless.com/',
					displayName: 'Serverless Framework',
				},
			]);
		});
	});

	describe('when items are not found', () => {
		beforeAll(async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
			ddbMock.on(ScanCommand).resolves({
				Items: undefined,
			});
			subject = await scan('technology-test');
		});

		it('returns empty array', () => {
			expect(subject).toEqual([]);
		});
	});

	describe('when error occurs', () => {
		beforeAll(async () => {
			ddbMock.on(ScanCommand).rejects('mock error');
			subject = await scan('technology-test');
		});

		it('returns null', () => {
			expect(subject).toEqual([]);
		});

		it('logs the error', () => {
			expect(console.error).toHaveBeenCalledWith('dynamodb.scan Error - mock error');
		});
	});
});
