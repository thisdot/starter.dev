import { createHealthcheckHandler, CreateHealthcheckHandlerOptions } from './healthcheck-handler';
import { getDataSourceHealth } from './datasource-healthcheck';
import { getRedisHealth } from './redis-healthcheck';
import { HealthCheckResult } from './healthcheck-result';
import { createMockPrismaClient } from '../mocks/prisma-client';
import { createMockRedisClient } from '../mocks/redis-client';
import { createMockExpressRequest, createMockExpressResponse } from '../mocks/express';

jest.mock('./datasource-healthcheck', () => ({
	getDataSourceHealth: jest.fn(),
}));
jest.mock('./redis-healthcheck', () => ({
	getRedisHealth: jest.fn(),
}));

const MOCK_GET_DATA_SOURCE_HEALTH = getDataSourceHealth as jest.Mock;
const MOCK_GET_REDIS_HEALTH = getRedisHealth as jest.Mock;

const MOCK_REQUEST = createMockExpressRequest();
const MOCK_RESPONSE = createMockExpressResponse();
const MOCK_NEXT_DELEGATE = jest.fn();

const MOCK_REDIS_CLIENT = createMockRedisClient();
const MOCK_PRISMA_CLIENT = createMockPrismaClient();
const MOCK_CREATE_HEALTHCHECK_HANDLER_OPTIONS: CreateHealthcheckHandlerOptions = {
	prismaClient: MOCK_PRISMA_CLIENT,
	redisClient: MOCK_REDIS_CLIENT,
};

describe('.healthcheck-handler', () => {
	describe('when called', () => {
		describe.each([
			[
				'cache database - not healthy, data source - not healthy',
				false,
				false,
				503,
				{ cacheDatabase: false, dataSource: false },
			],
			[
				'cache database - healthy, data source - not healthy',
				true,
				false,
				503,
				{ cacheDatabase: true, dataSource: false },
			],
			[
				'cache database - not healthy, data source - healthy',
				false,
				true,
				503,
				{ cacheDatabase: false, dataSource: true },
			],
			[
				'cache database - healthy, data source - healthy',
				true,
				true,
				200,
				{ cacheDatabase: true, dataSource: true },
			],
		])(
			'and %s',
			(
				_statement,
				mockResultGetRedisHealth,
				mockResultGetDataSourceHealth,
				expectedStatusCode,
				expectedResponseBody: HealthCheckResult
			) => {
				beforeAll(async () => {
					MOCK_GET_REDIS_HEALTH.mockResolvedValue(mockResultGetRedisHealth);
					MOCK_GET_DATA_SOURCE_HEALTH.mockResolvedValue(mockResultGetDataSourceHealth);

					const handler = createHealthcheckHandler(MOCK_CREATE_HEALTHCHECK_HANDLER_OPTIONS);
					await handler(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_DELEGATE);
				});

				afterAll(() => {
					MOCK_GET_DATA_SOURCE_HEALTH.mockReset();
					MOCK_GET_REDIS_HEALTH.mockReset();
					MOCK_RESPONSE.status.mockClear();
					MOCK_RESPONSE.send.mockClear();
				});

				it('sends expected response', () => {
					expect(MOCK_RESPONSE.status).toHaveBeenCalledTimes(1);
					expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(expectedStatusCode);
					expect(MOCK_RESPONSE.send).toHaveBeenCalledTimes(1);
					expect(MOCK_RESPONSE.send).toHaveBeenCalledWith(expectedResponseBody);
				});
			}
		);
	});
});
