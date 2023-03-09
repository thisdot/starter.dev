import { TechnologyDataSource, TechnologyEntityCollectionPage } from './technology-data-source';
import { PrismaClient, TechnologyEntity } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { createMockPrismaClient } from '../../mocks/prisma-client';
import { createMockCacheApiWrapper } from '../../mocks/cache-api-wrapper';

describe('TechnologyDataSource', () => {
	const MOCK_PRISMA_CLIENT: DeepMockProxy<PrismaClient> = createMockPrismaClient();
	const MOCK_CACHE_API_WRAPPER = createMockCacheApiWrapper<TechnologyEntity>();
	const MOCK_TECHNOLOGY_INPUT = {
		displayName: 'MOCK_TECHNOLOGY',
		description: 'MOCK_TECHNOLOGY_DESCRIPTION',
		url: 'MOCK_TECHNOLOGY_URL',
	};
	const MOCK_TECHNOLOGY: TechnologyEntity = {
		id: 123,
		...MOCK_TECHNOLOGY_INPUT,
	};
	const MOCK_NON_EXISTING_ID = 321;

	describe('constructor', () => {
		describe('when called with PrismaClient (required)', () => {
			it('creates an instance', () => {
				const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT);
				expect(instance).toBeInstanceOf(TechnologyDataSource);
			});
		});

		describe('when called with PrismaClient (required) and CacheAPIWrapper (optional)', () => {
			it('creates an instance', () => {
				const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT, MOCK_CACHE_API_WRAPPER);
				expect(instance).toBeInstanceOf(TechnologyDataSource);
			});
		});
	});

	const GENERAL_CASES: [string, TechnologyDataSource, boolean][] = [
		[
			'when instance created with PrismaClient (required) only',
			new TechnologyDataSource(MOCK_PRISMA_CLIENT),
			false, // cache disabled
		],
		[
			'when instance created with PrismaClient (required) and CacheAPIWrapper (optional)',
			new TechnologyDataSource(MOCK_PRISMA_CLIENT, MOCK_CACHE_API_WRAPPER),
			true, // cache enabled
		],
	];

	const testMockTechnologyCacheSet = () =>
		it('calls CacheAPIWrapper.set method once with valid arguments', () => {
			expect(MOCK_CACHE_API_WRAPPER.cache).toHaveBeenCalledTimes(1);
			expect(MOCK_CACHE_API_WRAPPER.cache).toHaveBeenCalledWith(MOCK_TECHNOLOGY, 'id');
		});

	describe('#createTechnology', () => {
		describe.each(GENERAL_CASES)('%s', (_statement, instance, cacheEnabled) => {
			const EXPECTED_RESULT_CREATE = MOCK_TECHNOLOGY;
			let result: TechnologyEntity;

			beforeAll(async () => {
				MOCK_PRISMA_CLIENT.technologyEntity.create.mockResolvedValue(MOCK_TECHNOLOGY);
				result = await instance.createTechnology(MOCK_TECHNOLOGY_INPUT);
			});

			afterAll(() => {
				MOCK_PRISMA_CLIENT.technologyEntity.create.mockReset();
				MOCK_CACHE_API_WRAPPER.cache.mockReset();
			});

			it('calls PrismaClient create method once with valid argument', () => {
				expect(MOCK_PRISMA_CLIENT.technologyEntity.create).toHaveBeenCalledTimes(1);
				expect(MOCK_PRISMA_CLIENT.technologyEntity.create).toHaveBeenCalledWith({
					data: MOCK_TECHNOLOGY_INPUT,
				});
			});

			if (cacheEnabled) {
				testMockTechnologyCacheSet();
			}

			it('returns expected result', () => {
				expect(result).toEqual(EXPECTED_RESULT_CREATE);
			});
		});
	});

	describe('#updateTechnology', () => {
		describe.each(GENERAL_CASES)('%s', (_statement, instance, cacheEnabled) => {
			const EXPECTED_RESULT_UPDATE = MOCK_TECHNOLOGY;
			let result: TechnologyEntity;

			beforeAll(async () => {
				MOCK_PRISMA_CLIENT.technologyEntity.update.mockResolvedValue(MOCK_TECHNOLOGY);
				result = await instance.updateTechnology(MOCK_TECHNOLOGY.id, MOCK_TECHNOLOGY_INPUT);
			});
			afterAll(() => {
				MOCK_PRISMA_CLIENT.technologyEntity.update.mockReset();
				MOCK_CACHE_API_WRAPPER.cache.mockReset();
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

			if (cacheEnabled) {
				testMockTechnologyCacheSet();
			}

			it('returns expected result', () => {
				expect(result).toEqual(EXPECTED_RESULT_UPDATE);
			});
		});
	});

	describe('#deleteTechnology', () => {
		describe.each(GENERAL_CASES)('%s', (_statement, instance, cacheEnabled) => {
			let result: TechnologyEntity;

			beforeAll(async () => {
				MOCK_PRISMA_CLIENT.technologyEntity.delete.mockResolvedValue(MOCK_TECHNOLOGY);
				result = await instance.deleteTechnology(MOCK_TECHNOLOGY.id);
			});

			afterAll(() => {
				MOCK_PRISMA_CLIENT.technologyEntity.delete.mockReset();
				MOCK_CACHE_API_WRAPPER.invalidateCached.mockReset();
			});

			it('calls PrismaClient delete method once with valid argument', () => {
				expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledTimes(1);
				expect(MOCK_PRISMA_CLIENT.technologyEntity.delete).toHaveBeenCalledWith({
					where: {
						id: MOCK_TECHNOLOGY.id,
					},
				});
			});

			if (cacheEnabled) {
				it('calls CacheAPIWrapper.del method once with valid argument', () => {
					expect(MOCK_CACHE_API_WRAPPER.invalidateCached).toHaveBeenCalledTimes(1);
					expect(MOCK_CACHE_API_WRAPPER.invalidateCached).toHaveBeenCalledWith(MOCK_TECHNOLOGY.id);
				});
			}

			it('returns expected result', () => {
				expect(result).toEqual(MOCK_TECHNOLOGY);
			});
		});
	});

	describe('#getTechnologyById', () => {
		describe('when instance created with PrismaClient (required) only', () => {
			const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT);
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

		describe('when instance created with PrismaClient (required) and CacheAPIWrapper (optional)', () => {
			const instance = new TechnologyDataSource(MOCK_PRISMA_CLIENT, MOCK_CACHE_API_WRAPPER);
			describe('when called with existing id', () => {
				describe('and entity cached', () => {
					let result: TechnologyEntity | null;
					beforeAll(async () => {
						MOCK_CACHE_API_WRAPPER.getCached.mockResolvedValue(MOCK_TECHNOLOGY);
						result = await instance.getTechnologyById(MOCK_TECHNOLOGY.id);
					});
					afterAll(() => {
						MOCK_CACHE_API_WRAPPER.getCached.mockReset();
					});
					it('calls CacheAPIWrapper method once with valid arguments', () => {
						expect(MOCK_CACHE_API_WRAPPER.getCached).toHaveBeenCalledTimes(1);
						expect(MOCK_CACHE_API_WRAPPER.getCached).toHaveBeenLastCalledWith(MOCK_TECHNOLOGY.id);
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
						MOCK_CACHE_API_WRAPPER.getCached.mockResolvedValue(null);
						MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockResolvedValue(MOCK_TECHNOLOGY);
						result = await instance.getTechnologyById(MOCK_TECHNOLOGY.id);
					});

					afterAll(() => {
						MOCK_CACHE_API_WRAPPER.getCached.mockReset();
						MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockReset();
						MOCK_CACHE_API_WRAPPER.cache.mockReset();
					});

					it('calls CacheAPIWrapper.get method once with valid arguments', () => {
						expect(MOCK_CACHE_API_WRAPPER.getCached).toHaveBeenCalledTimes(1);
						expect(MOCK_CACHE_API_WRAPPER.getCached).toHaveBeenLastCalledWith(MOCK_TECHNOLOGY.id);
					});

					it('calls PrismaClient method once with valid arguments', () => {
						expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenCalledTimes(1);
						expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenLastCalledWith({
							where: { id: MOCK_TECHNOLOGY.id },
						});
					});

					it('calls CacheAPIWrapper.set method once with valid arguments', () => {
						expect(MOCK_CACHE_API_WRAPPER.cache).toHaveBeenCalledTimes(1);
						expect(MOCK_CACHE_API_WRAPPER.cache).toHaveBeenLastCalledWith(MOCK_TECHNOLOGY, 'id');
					});
					it('returns expected result', () => {
						expect(result).toEqual(MOCK_TECHNOLOGY);
					});
				});
			});

			describe('when called with non-existing id', () => {
				let result: TechnologyEntity | null;

				beforeAll(async () => {
					MOCK_CACHE_API_WRAPPER.getCached.mockResolvedValue(null);
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockResolvedValue(null);
					result = await instance.getTechnologyById(MOCK_NON_EXISTING_ID);
				});

				afterAll(() => {
					MOCK_CACHE_API_WRAPPER.getCached.mockReset();
					MOCK_PRISMA_CLIENT.technologyEntity.findFirst.mockReset();
				});

				it('calls CacheAPIWrapper.get method once with valid arguments', () => {
					expect(MOCK_CACHE_API_WRAPPER.getCached).toHaveBeenCalledTimes(1);
					expect(MOCK_CACHE_API_WRAPPER.getCached).toHaveBeenLastCalledWith(MOCK_NON_EXISTING_ID);
				});

				it('calls PrismaClient method once with valid arguments', () => {
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenCalledTimes(1);
					expect(MOCK_PRISMA_CLIENT.technologyEntity.findFirst).toHaveBeenLastCalledWith({
						where: { id: MOCK_NON_EXISTING_ID },
					});
				});

				it('does not call CacheAPIWrapper.set method', () => {
					expect(MOCK_CACHE_API_WRAPPER.cache).not.toHaveBeenCalled();
				});

				it('returns expected result', () => {
					expect(result).toStrictEqual(null);
				});
			});
		});
	});

	describe('#getTechnologies', () => {
		describe.each(GENERAL_CASES)('%s', (_statement, instance) => {
			const MOCK_LIMIT = 1;
			const MOCK_OFFSET = 2;
			const MOCK_RESULT_TOTAL_COUNT = 3;
			const MOCK_TECHNOLOGIES: TechnologyEntity[] = [MOCK_TECHNOLOGY];

			const EXPECTED_RESULT: TechnologyEntityCollectionPage = {
				totalCount: MOCK_RESULT_TOTAL_COUNT,
				items: MOCK_TECHNOLOGIES,
			};

			let result: TechnologyEntityCollectionPage;

			beforeAll(async () => {
				MOCK_PRISMA_CLIENT.$transaction.mockResolvedValue([
					MOCK_RESULT_TOTAL_COUNT,
					[MOCK_TECHNOLOGY],
				]);
				result = await instance.getTechnologies(MOCK_LIMIT, MOCK_OFFSET);
			});

			afterAll(() => {
				MOCK_PRISMA_CLIENT.$transaction.mockReset();
				MOCK_PRISMA_CLIENT.technologyEntity.count.mockReset();
				MOCK_PRISMA_CLIENT.technologyEntity.findMany.mockReset();
			});

			it('calls PrismaClient count method once', () => {
				expect(MOCK_PRISMA_CLIENT.technologyEntity.count).toHaveBeenCalledTimes(1);
			});

			it('calls PrismaClient findMany method once with expected argument', () => {
				expect(MOCK_PRISMA_CLIENT.technologyEntity.findMany).toHaveBeenCalledTimes(1);
				expect(MOCK_PRISMA_CLIENT.technologyEntity.findMany).toHaveBeenCalledWith({
					take: MOCK_LIMIT,
					skip: MOCK_OFFSET,
				});
			});

			it('calls PrismaClient.$transaction method once', () => {
				expect(MOCK_PRISMA_CLIENT.technologyEntity.count).toHaveBeenCalledTimes(1);
			});

			it('returns expected result', () => {
				expect(result).toEqual(EXPECTED_RESULT);
			});
		});
	});
});
