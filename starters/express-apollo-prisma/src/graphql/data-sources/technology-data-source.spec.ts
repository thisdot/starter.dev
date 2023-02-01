import { createMockPrismaClient } from '../../mocks/prisma-client';
import { TechnologyDataSource } from './technology-data-source';
import redisMock from 'redis-mock';
import { PrismaClient, TechnologyEntity } from '@prisma/client';
import { RedisClient } from '../../redis';
import { DeepMockProxy } from 'jest-mock-extended';

jest.mock('redis', () => redisMock);

describe('TechnologyDataSource', () => {
	const MOCK_PRISMA_CLIENT: DeepMockProxy<PrismaClient> = createMockPrismaClient();
	const MOCK_REDIS_CLIENT: RedisClient = redisMock.createClient();
	const MOCK_REDIS_CACHE_TTL_SECONDS = 3600;
	describe('constructor', () => {
		describe('when called with Prisma Client (required)', () => {
			it('creates an instance', () => {
				const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT);
				expect(instance).toBeInstanceOf(TechnologyDataSource);
			});
		});

		describe('when called with Prisma Client (required) and Redis Client (optional)', () => {
			it('creates an instance', () => {
				const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT, MOCK_REDIS_CLIENT);
				expect(instance).toBeInstanceOf(TechnologyDataSource);
			});
		});

		describe('when called with Prisma Client (required), Redis Client (optional) and Redis Cache TTL Seconds (optional)', () => {
			it('creates an instance', () => {
				const instance = new TechnologyDataSource(
					MOCK_PRISMA_CLIENT,
					MOCK_REDIS_CLIENT,
					MOCK_REDIS_CACHE_TTL_SECONDS
				);
				expect(instance).toBeInstanceOf(TechnologyDataSource);
			});
		});
	});

	describe('when created with Prisma Client (required)', () => {
		const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT);
		describe('#getTechnologies', () => {
			const MOCK_TECHNOLOGY: TechnologyEntity = {
				id: 123,
				name: 'MOCK_TECHNOLOGY',
			};
			describe('when called with existing id', () => {
				let result: TechnologyEntity | null;
				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockResolvedValue(MOCK_TECHNOLOGY);
					result = await instance.getTechnologyById(MOCK_TECHNOLOGY.id);
				});
				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockReset();
				});
				it('calls PrismaClient method once with valid arguments', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenLastCalledWith({
						where: { id: MOCK_TECHNOLOGY.id },
					});
				});
				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
			describe('when called with non-existing id', () => {
				const MOCK_NON_EXISTING_ID = 321;
				let result: TechnologyEntity | null;
				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockResolvedValue(null);
					result = await instance.getTechnologyById(MOCK_NON_EXISTING_ID);
				});
				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockReset();
				});
				it('calls PrismaClient method once with valid arguments', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenLastCalledWith({
						where: { id: MOCK_NON_EXISTING_ID },
					});
				});
				it('returns expected result', () => {
					expect(result).toStrictEqual(null);
				});
			});
		});
	});
});
