import { createHealthcheckHandler, CreateHealthcheckHandlerOptions } from './healthcheck-handler';
import { getDataSourceHealth } from './datasource-healthcheck';
import { getRedisHealth } from './redis-healthcheck';
import { Request } from 'express';
import { HealthCheckResult } from './healthcheck-result';
import { createMockPrismaClient } from '../mocks/prisma-client';
import { createMockRedisClient } from '../mocks/redis-client';
import { createMockExpressResponse } from '../mocks/express';

const MOCK_REDIS_CLIENT = createMockRedisClient();
const MOCK_PRISMA_CLIENT = createMockPrismaClient();

const MOCK_GET_DATA_SOURCE_HEALTH = getDataSourceHealth as jest.Mock;
const MOCK_GET_REDIS_HEALTH = getRedisHealth as jest.Mock;

const MOCK_REQUEST = {} as Request<Record<string, never>, HealthCheckResult>;
const req = MOCK_REQUEST;
const res = createMockExpressResponse();
const next = jest.fn();

jest.mock('./datasource-healthcheck', () => ({
	getDataSourceHealth: jest.fn(),
}));
jest.mock('./redis-healthcheck', () => ({
	getRedisHealth: jest.fn(),
}));

describe('.healthcheck-handler', () => {
	describe('when called', () => {
		describe('without', () => {
			const CASES: [string, CreateHealthcheckHandlerOptions, HealthCheckResult, number][] = [
				[
					'redisClient',
					{ redisClient: MOCK_REDIS_CLIENT },
					{ cacheDatabase: true, dataSource: false },
					500,
				],
				[
					'prismaClient',
					{ prismaClient: MOCK_PRISMA_CLIENT },
					{ cacheDatabase: false, dataSource: true },
					500,
				],
				['both redisClient & prismaClient', {}, { cacheDatabase: false, dataSource: false }, 500],
			];

			describe.each(CASES)('%s', (_, options, healthcheck, expectedStatusCode) => {
				let result: HealthCheckResult;

				beforeAll(async () => {
					MOCK_GET_DATA_SOURCE_HEALTH.mockResolvedValue(healthcheck.dataSource);
					MOCK_GET_REDIS_HEALTH.mockResolvedValue(healthcheck.cacheDatabase);

					const handler = createHealthcheckHandler(options);
					await handler(req, res, next);

					result = {
						cacheDatabase: await getRedisHealth(options.redisClient),
						dataSource: await getDataSourceHealth(options.prismaClient),
					};
				});

				afterAll(() => {
					jest.clearAllMocks();
				});

				it('calls res.status once', () => {
					expect(res.status).toHaveBeenCalledTimes(1);
				});

				it(`calls res.status with status code: ${expectedStatusCode}`, async () => {
					expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
				});

				it(`calls res.send with correct arguments`, async () => {
					expect(res.send).toHaveBeenCalledWith(healthcheck);
				});

				it('should return correct result', () => {
					expect(result).toEqual(healthcheck);
				});
			});
		});

		describe('with both redisClient & prismaClient', () => {
			const CASES: [string, HealthCheckResult, number][] = [
				[
					'both cachedDatabase & dataSource return true',
					{ cacheDatabase: true, dataSource: true },
					200,
				],
				[
					'both cachedDatabase & dataSource return false',
					{ cacheDatabase: false, dataSource: false },
					500,
				],
				[
					'cachedDatabase returns false & dataSource returns true',
					{ cacheDatabase: false, dataSource: true },
					500,
				],
				[
					'cachedDatabase returns true & dataSource returns false',
					{ cacheDatabase: true, dataSource: false },
					500,
				],
			];

			describe.each(CASES)('%s', (_, healthcheck, expectedStatusCode) => {
				let result: HealthCheckResult;

				beforeAll(async () => {
					MOCK_GET_DATA_SOURCE_HEALTH.mockResolvedValue(healthcheck.dataSource);
					MOCK_GET_REDIS_HEALTH.mockResolvedValue(healthcheck.cacheDatabase);

					const options = {
						prismaClient: MOCK_PRISMA_CLIENT,
						redisClient: MOCK_REDIS_CLIENT,
					};

					const handler = createHealthcheckHandler(options);
					await handler(req, res, next);

					result = {
						cacheDatabase: await getRedisHealth(options.redisClient),
						dataSource: await getDataSourceHealth(options.prismaClient),
					};
				});

				afterAll(() => {
					jest.clearAllMocks();
				});

				it('calls res.status once', () => {
					expect(res.status).toHaveBeenCalledTimes(1);
				});

				it(`calls res.status with status code: ${expectedStatusCode}`, async () => {
					expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
				});

				it(`calls res.send with correct arguments`, async () => {
					expect(res.send).toHaveBeenCalledWith(healthcheck);
				});

				it('should return correct result', () => {
					expect(result).toEqual(healthcheck);
				});
			});
		});
	});
});
