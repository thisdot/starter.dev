import { TechnologyDataSource } from './technology-data-source';
import { PrismaClient, TechnologyEntity } from '@prisma/client';
import { RedisClient } from '../../redis';
import { DeepMockProxy } from 'jest-mock-extended';
import { createMockRedisClient } from '../../mocks/redis-client';
import { createMockPrismaClient } from '../../mocks/prisma-client';

describe('TechnologyDataSource', () => {
	const MOCK_PRISMA_CLIENT: DeepMockProxy<PrismaClient> = createMockPrismaClient();
	const MOCK_REDIS_CLIENT: DeepMockProxy<RedisClient> = createMockRedisClient();
	const MOCK_REDIS_CACHE_TTL_SECONDS = 3600;
	const MOCK_TECHNOLOGY_INPUT = {
		name: 'MOCK_TECHNOLOGY',
	};
	const MOCK_TECHNOLOGY: TechnologyEntity = {
		id: 123,
		...MOCK_TECHNOLOGY_INPUT,
	};
	const MOCK_NON_EXISTING_ID = 321;

	const EXPECTED_CACHE_KEY = `technology:${MOCK_TECHNOLOGY.id}`;
	const EXPECTED_CACHE_KEY_NON_EXISTING = `technology:${MOCK_NON_EXISTING_ID}`;
	const EXPECTED_CACHE_VALUE = JSON.stringify(MOCK_TECHNOLOGY);
	const EXPECTED_CACHE_TTL_DEFAULT = 360;

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

		describe('#getTechnologyById', () => {
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

		describe('#getTechnologies', () => {
			const MOCK_TECHNOLOGIES: TechnologyEntity[] = [MOCK_TECHNOLOGY];
			describe('when called', () => {
				let result: TechnologyEntity[];
				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.findMany.mockResolvedValue([MOCK_TECHNOLOGY]);
					result = await instance.getTechnologies();
				});
				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.findMany.mockReset();
				});
				it('calls PrismaClient method once', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findMany).toHaveBeenCalledTimes(1);
				});
				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGIES);
				});
			});
		});

		describe('#createTechnology', () => {
			describe('when called', () => {
				let result: TechnologyEntity;

				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.create.mockResolvedValue(MOCK_TECHNOLOGY);
					result = await instance.createTechnology(MOCK_TECHNOLOGY_INPUT);
				});

				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.create.mockReset();
				});

				it('calls PrismaClient create method once with valid argument', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.create).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.create).toHaveBeenCalledWith({
						data: MOCK_TECHNOLOGY_INPUT,
					});
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
		});

		describe('#updateTechnology', () => {
			describe('when called', () => {
				let result: TechnologyEntity;

				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.update.mockResolvedValue(MOCK_TECHNOLOGY);
					result = await instance.updateTechnology(MOCK_TECHNOLOGY.id, MOCK_TECHNOLOGY_INPUT);
				});

				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.update.mockReset();
				});

				it('calls PrismaClient update method once with valid arguments', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.update).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.update).toHaveBeenCalledWith({
						where: {
							id: MOCK_TECHNOLOGY.id,
						},
						data: MOCK_TECHNOLOGY_INPUT,
					});
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
		});

		describe('#deleteTechnology', () => {
			describe('when called', () => {
				let result: TechnologyEntity;

				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.delete.mockResolvedValue(MOCK_TECHNOLOGY);
					result = await instance.deleteTechnology(MOCK_TECHNOLOGY.id);
				});

				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.delete.mockReset();
				});

				it('calls PrismaClient delete method once with valid arguments', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledWith({
						where: {
							id: MOCK_TECHNOLOGY.id,
						},
					});
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
		});

		describe('#composeRedisKey', () => {
			it('returns expected result', () => {
				const result = instance.composeRedisKey(MOCK_NON_EXISTING_ID);

				expect(result).toEqual(EXPECTED_CACHE_KEY_NON_EXISTING);
			});
		});
	});

	describe('when created with Prisma Client (required) and Redis Client (optional)', () => {
		const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT, MOCK_REDIS_CLIENT);

		describe('#getTechnologyById', () => {
			describe('when called with existing id', () => {
				describe('and entity cached', () => {
					let result: TechnologyEntity | null;
					beforeAll(async () => {
						MOCK_REDIS_CLIENT.get.mockResolvedValue(EXPECTED_CACHE_VALUE);
						result = await instance.getTechnologyById(MOCK_TECHNOLOGY.id);
					});
					afterAll(() => {
						MOCK_REDIS_CLIENT.get.mockReset();
					});
					it('calls RedisClient method once with valid arguments', () => {
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledTimes(1);
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenLastCalledWith(EXPECTED_CACHE_KEY);
					});
					it('does not call PrismaClient method', () => {
						expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).not.toHaveBeenCalled();
					});
					it('returns expected result', () => {
						expect(result).toEqual(MOCK_TECHNOLOGY);
					});
				});
				describe('and entity not cached', () => {
					let result: TechnologyEntity | null;
					beforeAll(async () => {
						MOCK_REDIS_CLIENT.get.mockResolvedValue(null);
						MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockResolvedValue(MOCK_TECHNOLOGY);
						result = await instance.getTechnologyById(MOCK_TECHNOLOGY.id);
					});
					afterAll(() => {
						MOCK_REDIS_CLIENT.get.mockReset();
						MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockReset();
						MOCK_REDIS_CLIENT.set.mockReset();
					});
					it('calls RedisClient.get method once with valid arguments', () => {
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledTimes(1);
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenLastCalledWith(EXPECTED_CACHE_KEY);
					});
					it('calls PrismaClient method once with valid arguments', () => {
						expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenCalledTimes(1);
						expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenLastCalledWith({
							where: { id: MOCK_TECHNOLOGY.id },
						});
					});
					it('calls RedisClient.set method once with valid arguments', () => {
						expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledTimes(1);
						expect(MOCK_REDIS_CLIENT.set).toHaveBeenLastCalledWith(
							EXPECTED_CACHE_KEY,
							EXPECTED_CACHE_VALUE,
							{ EX: EXPECTED_CACHE_TTL_DEFAULT }
						);
					});
					it('returns expected result', () => {
						expect(result).toEqual(MOCK_TECHNOLOGY);
					});
				});
			});

			describe('when called with non-existing id', () => {
				let result: TechnologyEntity | null;

				beforeAll(async () => {
					MOCK_REDIS_CLIENT.get.mockResolvedValue(null);
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockResolvedValue(null);
					result = await instance.getTechnologyById(MOCK_NON_EXISTING_ID);
				});

				afterAll(() => {
					MOCK_REDIS_CLIENT.get.mockReset();
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockReset();
				});

				it('calls RedisClient.get method once with valid arguments', () => {
					expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.get).toHaveBeenLastCalledWith(EXPECTED_CACHE_KEY_NON_EXISTING);
				});

				it('calls PrismaClient method once with valid arguments', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenLastCalledWith({
						where: { id: MOCK_NON_EXISTING_ID },
					});
				});

				it('does not call RedisClient.set method', () => {
					expect(MOCK_REDIS_CLIENT.set).not.toHaveBeenCalled();
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(null);
				});
			});

			describe('when called and Redis unavailable', () => {
				let spyConsoleWarn: jest.SpyInstance;
				beforeAll(async () => {
					MOCK_REDIS_CLIENT.get.mockRejectedValueOnce(new Error());
					MOCK_REDIS_CLIENT.set.mockRejectedValueOnce(new Error());
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockResolvedValue(MOCK_TECHNOLOGY);
					spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
					await instance.getTechnologyById(MOCK_TECHNOLOGY.id);
				});

				afterAll(() => {
					MOCK_REDIS_CLIENT.get.mockReset();
					MOCK_REDIS_CLIENT.set.mockReset();
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockReset();
					spyConsoleWarn.mockReset();
					spyConsoleWarn.mockRestore();
				});

				it('logs warning into console', () => {
					expect(spyConsoleWarn).toHaveBeenCalledTimes(2);
					expect(spyConsoleWarn).toHaveBeenCalledWith('Redis cache unavailable.');
				});
			});
		});

		describe('#getTechnologies', () => {
			const MOCK_TECHNOLOGIES: TechnologyEntity[] = [MOCK_TECHNOLOGY];
			describe('when called', () => {
				let result: TechnologyEntity[];
				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.findMany.mockResolvedValue([MOCK_TECHNOLOGY]);
					result = await instance.getTechnologies();
				});
				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.findMany.mockReset();
				});
				it('does not call RedisClient.hGetAll method', () => {
					expect(MOCK_REDIS_CLIENT.hGetAll).not.toHaveBeenCalled();
					expect(MOCK_REDIS_CLIENT.HGETALL).not.toHaveBeenCalled();
				});
				it('calls PrismaClient method once', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findMany).toHaveBeenCalledTimes(1);
				});
				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGIES);
				});
			});
		});

		describe('#createTechnology', () => {
			describe('when called', () => {
				let result: TechnologyEntity;

				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.create.mockResolvedValue(MOCK_TECHNOLOGY);
					result = await instance.createTechnology(MOCK_TECHNOLOGY_INPUT);
				});

				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.create.mockReset();
					MOCK_REDIS_CLIENT.set.mockReset();
				});

				it('calls PrismaClient create method once with valid argument', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.create).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.create).toHaveBeenCalledWith({
						data: MOCK_TECHNOLOGY_INPUT,
					});
				});

				it('calls RedisClient.set method once with valid argument', () => {
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledWith(
						EXPECTED_CACHE_KEY,
						EXPECTED_CACHE_VALUE,
						{ EX: EXPECTED_CACHE_TTL_DEFAULT }
					);
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
		});

		describe('#updateTechnology', () => {
			describe('when called', () => {
				let result: TechnologyEntity;

				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.update.mockResolvedValue(MOCK_TECHNOLOGY);
					result = await instance.updateTechnology(MOCK_TECHNOLOGY.id, MOCK_TECHNOLOGY_INPUT);
				});
				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.update.mockReset();
					MOCK_REDIS_CLIENT.set.mockReset();
				});

				it('calls PrismaClient update method once with valid arguments', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.update).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.update).toHaveBeenCalledWith({
						where: {
							id: MOCK_TECHNOLOGY.id,
						},
						data: MOCK_TECHNOLOGY_INPUT,
					});
				});

				it('calls RedisClient.set method once with valid arguments', () => {
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledWith(
						EXPECTED_CACHE_KEY,
						EXPECTED_CACHE_VALUE,
						{
							EX: EXPECTED_CACHE_TTL_DEFAULT,
						}
					);
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
		});

		describe('#deleteTechnology', () => {
			describe('when called', () => {
				let result: TechnologyEntity;

				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.delete.mockResolvedValue(MOCK_TECHNOLOGY);
					result = await instance.deleteTechnology(MOCK_TECHNOLOGY.id);
				});

				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.delete.mockReset();
					MOCK_REDIS_CLIENT.del.mockReset();
				});

				it('calls PrismaClient delete method once with valid argument', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledWith({
						where: {
							id: MOCK_TECHNOLOGY.id,
						},
					});
				});

				it('calls RedisClient.del method once with valid argument', () => {
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledWith(EXPECTED_CACHE_KEY);
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
			describe('when called and Redis unavailable', () => {
				let result: TechnologyEntity;
				let spyConsoleWarn: jest.SpyInstance;
				beforeAll(async () => {
					MOCK_PRISMA_CLIENT.technologyEntity.delete.mockResolvedValue(MOCK_TECHNOLOGY);
					MOCK_REDIS_CLIENT.del.mockRejectedValue(new Error());
					spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();
					result = await instance.deleteTechnology(MOCK_TECHNOLOGY.id);
				});

				afterAll(() => {
					MOCK_PRISMA_CLIENT.technologyEntity.delete.mockReset();
					MOCK_REDIS_CLIENT.del.mockReset();
					spyConsoleWarn.mockReset();
					spyConsoleWarn.mockRestore();
				});

				it('calls PrismaClient delete method once with valid argument', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledWith({
						where: {
							id: MOCK_TECHNOLOGY.id,
						},
					});
				});

				it('calls RedisClient.del method once with valid argument', () => {
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledWith(EXPECTED_CACHE_KEY);
				});

				it('logs warning into console', () => {
					expect(spyConsoleWarn).toHaveBeenCalledTimes(1);
					expect(spyConsoleWarn).toHaveBeenCalledWith('Redis cache unavailable.');
				});

				it('returns expected result', () => {
					expect(result).toEqual(MOCK_TECHNOLOGY);
				});
			});
		});
	});
});
