import { createCacheAPIWrapperAsync } from '../../cache';
import { PrismaClient } from '@prisma/client';
import { TechnologyDataSource } from '../data-sources';
import { createMockCacheApiWrapper } from '../../mocks/cache-api-wrapper';
import { createMockPrismaClient } from '../../mocks/prisma-client';
import { createMockTechnologyDataSource } from '../../mocks/technology-entity';
import { createServerContextMiddlewareOptionsAsync } from './server-context-middleware-options';
import {
	ExpressMiddlewareOptions,
	ExpressContextFunctionArgument,
} from '@apollo/server/dist/esm/express4';
import { WithRequired } from '@apollo/utils.withrequired';
import { ServerContext } from './server-context';
import { createMockExpressRequest, createMockExpressResponse } from '../../mocks/express';

jest.mock('@prisma/client', () => ({
	PrismaClient: jest.fn(),
}));
const MOCK_PRISMA_CLIENT_CONSTRUCTOR = PrismaClient as jest.Mock<PrismaClient>;
const MOCK_INSTANCE_PRISMA_CLIENT = createMockPrismaClient();

jest.mock('../../cache', () => ({
	createCacheAPIWrapperAsync: jest.fn(),
}));
const MOCK_CREATE_CACHE_API_WRAPPER_ASYNC = createCacheAPIWrapperAsync as jest.MockedFn<
	typeof createCacheAPIWrapperAsync
>;
const MOCK_INSTANCE_CACHE_API_WRAPPER = createMockCacheApiWrapper();

jest.mock('../data-sources', () => ({
	TechnologyDataSource: jest.fn(),
}));
const MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR =
	TechnologyDataSource as jest.Mock<TechnologyDataSource>;
const MOCK_INSTANCE_TECHNOLOGY_DATA_SOURCE = createMockTechnologyDataSource();

describe('.createServerContextMiddlewareOptionsAsync', () => {
	describe('when called and cache enabled', () => {
		let result: WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>;

		beforeAll(async () => {
			MOCK_PRISMA_CLIENT_CONSTRUCTOR.mockReturnValue(MOCK_INSTANCE_PRISMA_CLIENT);
			MOCK_CREATE_CACHE_API_WRAPPER_ASYNC.mockResolvedValue(MOCK_INSTANCE_CACHE_API_WRAPPER);
			MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR.mockReturnValue(MOCK_INSTANCE_TECHNOLOGY_DATA_SOURCE);

			result = await createServerContextMiddlewareOptionsAsync();
		});

		afterAll(() => {
			MOCK_PRISMA_CLIENT_CONSTRUCTOR.mockReset();
			MOCK_CREATE_CACHE_API_WRAPPER_ASYNC.mockReset();
			MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR.mockReset();
		});

		it('creates a PrismaClient', () => {
			expect(MOCK_PRISMA_CLIENT_CONSTRUCTOR).toHaveBeenCalledTimes(1);
		});
		it('creates a CacheAPIWrapper', () => {
			expect(MOCK_CREATE_CACHE_API_WRAPPER_ASYNC).toHaveBeenCalledTimes(1);
			expect(MOCK_CREATE_CACHE_API_WRAPPER_ASYNC).toHaveBeenCalledWith('technology');
		});
		it('creates a TechnologyDataSource with CacheAPIWrapper instance', () => {
			expect(MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR).toHaveBeenCalledTimes(1);
			expect(MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR).toHaveBeenCalledWith(
				MOCK_INSTANCE_PRISMA_CLIENT,
				MOCK_INSTANCE_CACHE_API_WRAPPER
			);
		});
		describe('result', () => {
			it('expected structure', () => {
				expect(result).toBeDefined();
				expect(result.context).toBeInstanceOf(Function);
			});

			describe('#context', () => {
				let contextResult: ServerContext;

				const MOCK_CONTEXT_FUNCTION_ARGS: ExpressContextFunctionArgument = {
					req: createMockExpressRequest(),
					res: createMockExpressResponse(),
				};
				beforeAll(async () => {
					contextResult = await result.context(MOCK_CONTEXT_FUNCTION_ARGS);
				});

				it('returns expected result', async () => {
					expect(contextResult.dataSources?.technologyDataSource).toBe(
						MOCK_INSTANCE_TECHNOLOGY_DATA_SOURCE
					);
				});
			});
		});
	});

	describe('when called and cache disabled', () => {
		beforeAll(async () => {
			MOCK_PRISMA_CLIENT_CONSTRUCTOR.mockReturnValue(MOCK_INSTANCE_PRISMA_CLIENT);
			MOCK_CREATE_CACHE_API_WRAPPER_ASYNC.mockResolvedValue(null);
			MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR.mockReturnValue(MOCK_INSTANCE_TECHNOLOGY_DATA_SOURCE);

			await createServerContextMiddlewareOptionsAsync();
		});

		afterAll(() => {
			MOCK_PRISMA_CLIENT_CONSTRUCTOR.mockReset();
			MOCK_CREATE_CACHE_API_WRAPPER_ASYNC.mockReset();
			MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR.mockReset();
		});

		it('creates a TechnologyDataSource without CacheAPIWrapper instance', () => {
			expect(MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR).toHaveBeenCalledTimes(1);
			expect(MOCK_TECHNOLOGY_DATA_SOURCE_CONSTRUCTOR).toHaveBeenCalledWith(
				MOCK_INSTANCE_PRISMA_CLIENT
			);
		});
	});
});
