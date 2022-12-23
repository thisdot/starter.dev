import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

describe('getClient', () => {
	const OLD_ENV = process.env;
	let subject;
	let client: DynamoDBClient;

	describe('when IS_OFFLINE is true', () => {
		beforeAll(() => {
			jest.resetModules();
			client = require('@aws-sdk/client-dynamodb').DynamoDBClient;
			const { getClient } = require('./getClient');
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'true',
			};
			subject = getClient();
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('returns an DynamoDB', () => {
			expect(subject).toEqual(expect.any(client));
		});

		it('sets the endpoint to localhost', async () => {
			expect(subject.config.isCustomEndpoint).toBe(true);
			const { hostname } = await subject.config.endpoint();
			expect(hostname).toMatch(/localhost/);
		});
	});

	describe('when IS_OFFLINE is false', () => {
		beforeAll(() => {
			jest.resetModules();
			client = require('@aws-sdk/client-dynamodb').DynamoDBClient;
			const { getClient } = require('./getClient');
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'false',
			};
			subject = getClient();
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('returns an LambdaClient', () => {
			expect(subject).toEqual(expect.any(client));
		});

		it('uses the default AWS Lambda endpoint', async () => {
			expect(subject.config.isCustomEndpoint).toBe(false);
		});
	});

	describe('when called twice', () => {
		let dynamodb;

		beforeAll(() => {
			jest.resetModules();

			dynamodb = require('@aws-sdk/client-dynamodb');
			jest.doMock('@aws-sdk/client-dynamodb', () => ({
				DynamoDBClient: jest.fn().mockImplementation(() => new dynamodb.DynamoDBClient({})),
			}));
			client = require('@aws-sdk/client-dynamodb').DynamoDBClient;

			const { getClient } = require('./getClient');
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'true',
			};
			getClient();
			subject = getClient();
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('runs the constructor once', () => {
			expect(client).toHaveBeenCalledTimes(1);
		});

		it('returns a cached client', () => {
			expect(subject).toEqual(expect.any(dynamodb.DynamoDBClient));
		});
	});
});
