import { createHealthcheckHandler, CreateHealthcheckHandlerOptions } from './healthcheck-handler';
import { getDataSourceHealth } from './datasource-healthcheck';
import { getRedisHealth } from './redis-healthcheck';
import { NextFunction, Request, Response } from 'express';
import { HealthCheckResult } from './healthcheck-result';
import { createMockPrismaClient } from '../mocks/prisma-client';
import { createMockRedisClient } from '../mocks/redis-client';

const MOCK_REDIS_CLIENT = createMockRedisClient();
const MOCK_PRISMA_CLIENT = createMockPrismaClient();

const MOCK_GET_DATA_SOURCE_HEALTH = getDataSourceHealth as jest.Mock;
const MOCK_GET_REDIS_HEALTH = getRedisHealth as jest.Mock;

jest.mock('./datasource-healthcheck', () => ({
	getDataSourceHealth: jest.fn(),
}));
jest.mock('./redis-healthcheck', () => ({
	getRedisHealth: jest.fn(),
}));
const res = {
	status: jest.fn((statusCode) => {
		send: jest.fn((resObj) => ({ res: resObj, ...statusCode }));
	}),
} as unknown as Response;

describe('.healthcheck-handler', () => {
	describe('when called', () => {
		describe('without', () => {
			const CASES: [string, CreateHealthcheckHandlerOptions, number][] = [
				['redisClient', { redisClient: MOCK_REDIS_CLIENT }, 500],
				['prismaClient', { prismaClient: MOCK_PRISMA_CLIENT }, 500],
				['both redisClient & prismaClient', {}, 500],
			];

			describe.each(CASES)('%s', (_, options, expectedStatusCode) => {
				beforeAll(async () => {
					const req = {} as Request<Record<string, never>, HealthCheckResult>;
					const next = jest.fn();
					const handler = createHealthcheckHandler(options);
					await handler(req, res, next);
				});

				it(`should return ${expectedStatusCode}`, async () => {
					expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
				});
			});
		});

		// const CASES: [string, HealthCheckResult, number][] = [
		// 	['both cachedDatabase & dataSource pass', { cacheDatabase: true, dataSource: true }, 200],
		// 	['both cachedDatabase & dataSource fail', { cacheDatabase: false, dataSource: false }, 500],
		// 	['cachedDatabase fails & dataSource passes', { cacheDatabase: false, dataSource: true }, 500],
		// 	['cachedDatabase passes & dataSource fails', { cacheDatabase: true, dataSource: false }, 500],
		// ];

		// describe.each(CASES)('%s', (_, healthcheck, expectedCode) => {
		// 	let subject: RequestHandler;
		// 	let result: HealthCheckResult;

		// 	beforeAll(async () => {
		// 		MOCK_GET_REDIS_HEALTH.mockResolvedValue(healthcheck.cacheDatabase);
		// 		MOCK_GET_CONTENTFUL_HEALTH.mockResolvedValue(healthcheck.dataSource);

		// 		result = {
		// 			cacheDatabase: await getRedisHealth(),
		// 			dataSource: await getDataSourceHealth(),
		// 		};

		// 		subject = await createHealthcheckHandler({});
		// 	});
		// 	it('should return correct status code and correct JSON body', () => {
		// 		expect(subject?.statusCode).toBe(expectedCode);
		// 		expect(subject?.body).toEqual(JSON.stringify(result));
		// 	});
		// });
	});
});
