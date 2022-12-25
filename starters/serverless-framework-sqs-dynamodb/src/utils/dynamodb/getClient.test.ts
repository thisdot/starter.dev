import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

describe('getClient', () => {
	const OLD_ENV = process.env;
	let subject: DynamoDBClient;
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

		it('returns an DynamoDBClient', () => {
			expect(subject).toEqual(expect.any(client));
		});

		it('sets the endpoint to localhost', async () => {
			if (!subject.config.endpoint) {
				fail('client misconfigured');
			}
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

		it('returns an DynamoDBClient', () => {
			expect(subject).toEqual(expect.any(client));
		});

		it('uses the default AWS Lambda endpoint', async () => {
			expect(subject.config.endpoint).toBeUndefined();
		});
	});

	describe('when called twice', () => {
		beforeAll(async () => {
			jest.resetModules();

			jest.mock('@aws-sdk/client-dynamodb');
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
	});
});
