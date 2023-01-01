import type { APIGatewayProxyEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { ListQueuesCommand } from '@aws-sdk/client-sqs';
import { Redis } from 'ioredis';
import { getClient as getDynamodbClient } from '@/utils/dynamodb/getClient';
import { getClient as getSqsClient } from '@/utils/sqs/getClient';
import * as GetRedisClient from '@/utils/redis/getClient';
import { handler } from './healthcheck';

describe('GET /healthcheck', () => {
	let subject: APIGatewayProxyResult;
	let ddbMock: ReturnType<typeof mockClient>;
	let sqsMock: ReturnType<typeof mockClient>;

	describe('when all services are functional', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getDynamodbClient());
			sqsMock = mockClient(getSqsClient());

			ddbMock.on(ListTablesCommand).resolves({
				TableNames: ['technologies-test'],
			});
			sqsMock.on(ListQueuesCommand).resolves({
				QueueUrls: ['http://localhost:9324/000000000000/ExampleQueue'],
			});

			jest.spyOn(GetRedisClient, 'getClient').mockImplementation(async () => {
				return {
					status: 'ready',
				} as Redis;
			});

			subject = (await handler(
				{} as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(() => {
			ddbMock.restore();
			sqsMock.restore();
			jest.resetAllMocks();
		});

		it('returns a 200 statusCode', () => {
			expect(subject.statusCode).toBe(200);
		});

		it('returns status', () => {
			expect(JSON.parse(subject.body)).toEqual(
				expect.objectContaining({
					dynamodbStatus: `Connected with tables: ${['technologies-test']}`,
					sqsStatus: `Connected with queues: ${[
						'http://localhost:9324/000000000000/ExampleQueue',
					]}`,
					cacheRedisStatus: 'ready',
				})
			);
		});
	});

	describe('when a service is failing', () => {
		beforeAll(async () => {
			ddbMock = mockClient(getDynamodbClient());
			sqsMock = mockClient(getSqsClient());

			ddbMock.on(ListTablesCommand).rejects('mock error');
			sqsMock.on(ListQueuesCommand).resolves({
				QueueUrls: ['http://localhost:9324/000000000000/ExampleQueue'],
			});

			jest.spyOn(GetRedisClient, 'getClient').mockImplementation(async () => {
				return {
					status: 'ready',
				} as Redis;
			});
			jest.spyOn(console, 'error').mockImplementation(() => {});

			subject = (await handler(
				{} as APIGatewayProxyEvent,
				{} as Context,
				{} as Callback
			)) as APIGatewayProxyResult;
		});

		afterAll(() => {
			ddbMock.restore();
			sqsMock.restore();
			jest.resetAllMocks();
		});

		it('returns a 503 statusCode', () => {
			expect(subject.statusCode).toBe(503);
		});

		it('returns status', () => {
			expect(subject.body).toEqual('mock error');
		});
	});
});
