import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { getClient } from '@/utils/dynamodb';
import { getAll } from './getAll';

describe('technology.getAll()', () => {
	let subject: Record<string, unknown>[];

	const ddbMock = mockClient(getClient());

	afterAll(() => {
		ddbMock.restore();
		jest.resetAllMocks();
	});

	describe('when no items in table', () => {
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
			subject = await getAll();
		});

		it('returns the requested technology', () => {
			expect(subject).toHaveLength(3);
			const actual = subject.map((tech) => tech.displayName);
			expect(actual).toContain('AWS SQS');
			expect(actual).toContain('AWS DynamoDB');
			expect(actual).toContain('Serverless Framework');
		});
	});

	describe('when items in table', () => {
		beforeAll(async () => {
			ddbMock.on(ScanCommand).resolves({
				Items: undefined,
			});
			subject = await getAll();
		});

		it('returns the requested technology', () => {
			expect(subject).toHaveLength(0);
		});
	});
});
