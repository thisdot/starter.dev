/* eslint-disable @typescript-eslint/no-var-requires */
import type { SQSClient } from '@aws-sdk/client-sqs';
import assert from 'assert';

describe('getClient', () => {
	const OLD_ENV = process.env;
	let subject: any;
	let SQSClient: SQSClient;

	describe('when IS_OFFLINE is true', () => {
		beforeAll(() => {
			jest.resetModules();
			SQSClient = require('@aws-sdk/client-sqs').SQSClient;
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'true',
				SQS_PORT: '9324',
			};
			const { getClient } = require('./client');
			subject = getClient();
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('returns an SQSClient', () => {
			assert(subject != null);
			expect(subject).toEqual(expect.any(SQSClient));
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
			SQSClient = require('@aws-sdk/client-sqs').SQSClient;
			const { getClient } = require('./client');
			process.env = {
				...OLD_ENV,
				IS_OFFLINE: 'false',
			};
			subject = getClient();
		});

		afterAll(() => {
			process.env = OLD_ENV;
		});

		it('returns an SQSClient', () => {
			expect(subject).toEqual(expect.any(SQSClient));
		});

		it('uses the default AWS SQS endpoint', async () => {
			expect(subject.config.isCustomEndpoint).toBe(false);
		});
	});

	describe('when called twice', () => {
		let client: any;

		beforeAll(() => {
			jest.resetModules();

			client = require('@aws-sdk/client-sqs');
			jest.doMock('@aws-sdk/client-sqs', () => ({
				SQSClient: jest.fn().mockImplementation(() => new client.SQSClient({})),
			}));
			SQSClient = require('@aws-sdk/client-sqs').SQSClient;

			const { getClient } = require('./client');
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
			expect(SQSClient).toHaveBeenCalledTimes(1);
		});

		it('returns a cached client', () => {
			expect(subject).toEqual(expect.any(client.SQSClient));
		});
	});
});
