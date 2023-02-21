import { createMockRedisClient } from '../mocks/redis-client';
import { RedisCacheAPIWrapper } from './redis-cache-api-wrapper';

const MOCK_REDIS_CLIENT = createMockRedisClient();

type MockEntityType = {
	mockUniqueKey: number;
	mockKey: string;
};

const MOCK_ENTITY_UNIQUE_KEY = 123;
const MOCK_KEY_PREFIX = 'MOCK_PREFIX';
const MOCK_CACHE_TTL_SECONDS = 234;

const MOCK_ENTITY = {
	mockUniqueKey: MOCK_ENTITY_UNIQUE_KEY,
	mockKey: 'MOCK_VALUE',
};

const MOCK_ENTITY_SERIALIZED = JSON.stringify(MOCK_ENTITY);

const EXPECTED_ENTITY_CACHE_KEY = `${MOCK_KEY_PREFIX}:${MOCK_ENTITY_UNIQUE_KEY}`;

describe('RedisCacheAPIWrapper', () => {
	const MOCK_CONSOLE_WARN = jest.spyOn(console, 'warn');
	beforeAll(() => {
		MOCK_CONSOLE_WARN.mockImplementation(jest.fn());
	});
	afterAll(() => {
		MOCK_CONSOLE_WARN.mockRestore();
	});
	describe('constructor', () => {
		describe('when called', () => {
			describe('with required arguments only', () => {
				it('creates an instance', () => {
					const instance = new RedisCacheAPIWrapper<MockEntityType, 'mockUniqueKey'>(
						MOCK_REDIS_CLIENT,
						MOCK_KEY_PREFIX
					);

					expect(instance).toBeDefined();
					expect(instance).toBeInstanceOf(RedisCacheAPIWrapper);
				});
			});

			describe('with required and optional arguments', () => {
				it('creates an instance', () => {
					const instance = new RedisCacheAPIWrapper<MockEntityType, 'mockUniqueKey'>(
						MOCK_REDIS_CLIENT,
						MOCK_KEY_PREFIX,
						MOCK_CACHE_TTL_SECONDS
					);

					expect(instance).toBeDefined();
					expect(instance).toBeInstanceOf(RedisCacheAPIWrapper);
				});
			});
		});
	});

	describe('#composeRedisKey', () => {
		const INSTANCE = new RedisCacheAPIWrapper<MockEntityType, 'mockUniqueKey'>(
			MOCK_REDIS_CLIENT,
			MOCK_KEY_PREFIX
		);
		describe('when called', () => {
			let result: string;

			beforeAll(() => {
				result = INSTANCE.composeRedisKey(MOCK_ENTITY_UNIQUE_KEY);
			});

			it('returns expected result', () => {
				expect(result).toStrictEqual(EXPECTED_ENTITY_CACHE_KEY);
			});
		});
	});

	describe('#getCached', () => {
		const INSTANCE = new RedisCacheAPIWrapper<MockEntityType, 'mockUniqueKey'>(
			MOCK_REDIS_CLIENT,
			MOCK_KEY_PREFIX
		);
		let spyComposeRedisKey: jest.SpyInstance;

		beforeAll(() => {
			spyComposeRedisKey = jest.spyOn(INSTANCE, 'composeRedisKey');
		});

		afterAll(() => {
			spyComposeRedisKey.mockRestore();
		});

		describe('when called', () => {
			describe('and Redis cache is available', () => {
				describe('and entity cached', () => {
					let result: MockEntityType | null;

					beforeAll(async () => {
						spyComposeRedisKey.mockClear();
						MOCK_REDIS_CLIENT.get.mockResolvedValue(MOCK_ENTITY_SERIALIZED);
						result = await INSTANCE.getCached(MOCK_ENTITY_UNIQUE_KEY);
					});

					afterAll(() => {
						MOCK_REDIS_CLIENT.get.mockReset();
					});

					it('calls #composeRedisKey once with expected argument', () => {
						expect(spyComposeRedisKey).toHaveBeenCalledTimes(1);
						expect(spyComposeRedisKey).toHaveBeenCalledWith(MOCK_ENTITY_UNIQUE_KEY);
					});

					it('calls RedisClient.get method once with expected arguments', () => {
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledTimes(1);
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledWith(EXPECTED_ENTITY_CACHE_KEY);
					});

					it('returns expected result', () => {
						expect(result).toEqual(MOCK_ENTITY);
					});
				});

				describe('and entity not cached', () => {
					let result: MockEntityType | null;

					beforeAll(async () => {
						spyComposeRedisKey.mockClear();
						MOCK_REDIS_CLIENT.get.mockResolvedValue(null);
						result = await INSTANCE.getCached(MOCK_ENTITY_UNIQUE_KEY);
					});

					afterAll(() => {
						MOCK_REDIS_CLIENT.get.mockReset();
					});

					it('calls #composeRedisKey once with expected argument', () => {
						expect(spyComposeRedisKey).toHaveBeenCalledTimes(1);
						expect(spyComposeRedisKey).toHaveBeenCalledWith(MOCK_ENTITY_UNIQUE_KEY);
					});

					it('calls RedisClient.get method once with expected arguments', () => {
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledTimes(1);
						expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledWith(EXPECTED_ENTITY_CACHE_KEY);
					});

					it('returns expected result', () => {
						expect(result).toEqual(null);
					});
				});
			});

			describe('and Redis cache is unvailable', () => {
				let result: MockEntityType | null;

				beforeAll(async () => {
					spyComposeRedisKey.mockClear();
					MOCK_REDIS_CLIENT.get.mockRejectedValue(new Error());

					result = await INSTANCE.getCached(MOCK_ENTITY_UNIQUE_KEY);
				});

				afterAll(() => {
					MOCK_REDIS_CLIENT.get.mockReset();
					MOCK_CONSOLE_WARN.mockClear();
				});

				it('calls #composeRedisKey once with expected argument', () => {
					expect(spyComposeRedisKey).toHaveBeenCalledTimes(1);
					expect(spyComposeRedisKey).toHaveBeenCalledWith(MOCK_ENTITY_UNIQUE_KEY);
				});

				it('calls RedisClient.get method once with expected arguments', () => {
					expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.get).toHaveBeenCalledWith(EXPECTED_ENTITY_CACHE_KEY);
				});

				it('logs expected warning', () => {
					expect(MOCK_CONSOLE_WARN).toHaveBeenCalledTimes(1);
					expect(MOCK_CONSOLE_WARN).toHaveBeenCalledWith('Redis cache unavailable.');
				});

				it('returns expected result', () => {
					expect(result).toEqual(null);
				});
			});
		});
	});

	describe('#cache', () => {
		const INSTANCE = new RedisCacheAPIWrapper<MockEntityType, 'mockUniqueKey'>(
			MOCK_REDIS_CLIENT,
			MOCK_KEY_PREFIX
		);
		let spyComposeRedisKey: jest.SpyInstance;

		beforeAll(() => {
			spyComposeRedisKey = jest.spyOn(INSTANCE, 'composeRedisKey');
		});

		afterAll(() => {
			spyComposeRedisKey.mockRestore();
		});

		describe('when called', () => {
			describe('and Redis cache is available', () => {
				beforeAll(async () => {
					spyComposeRedisKey.mockClear();
					await INSTANCE.cache(MOCK_ENTITY, 'mockUniqueKey');
				});

				afterAll(() => {
					MOCK_REDIS_CLIENT.set.mockReset();
				});

				it('calls #composeRedisKey once with expected argument', () => {
					expect(spyComposeRedisKey).toHaveBeenCalledTimes(1);
					expect(spyComposeRedisKey).toHaveBeenCalledWith(MOCK_ENTITY_UNIQUE_KEY);
				});

				it('calls RedisClient.set method once with expected arguments', () => {
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledWith(
						EXPECTED_ENTITY_CACHE_KEY,
						MOCK_ENTITY_SERIALIZED,
						{
							EX: 360,
						}
					);
				});
			});

			describe('and Redis cache is unvailable', () => {
				beforeAll(async () => {
					spyComposeRedisKey.mockClear();
					MOCK_REDIS_CLIENT.set.mockRejectedValue(new Error());
					await INSTANCE.cache(MOCK_ENTITY, 'mockUniqueKey');
				});

				afterAll(() => {
					MOCK_REDIS_CLIENT.set.mockReset();
					MOCK_CONSOLE_WARN.mockClear();
				});

				it('calls #composeRedisKey once with expected argument', () => {
					expect(spyComposeRedisKey).toHaveBeenCalledTimes(1);
					expect(spyComposeRedisKey).toHaveBeenCalledWith(MOCK_ENTITY_UNIQUE_KEY);
				});

				it('calls RedisClient.set method once with expected arguments', () => {
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.set).toHaveBeenCalledWith(
						EXPECTED_ENTITY_CACHE_KEY,
						MOCK_ENTITY_SERIALIZED,
						{
							EX: 360,
						}
					);
				});

				it('logs expected warning', () => {
					expect(MOCK_CONSOLE_WARN).toHaveBeenCalledTimes(1);
					expect(MOCK_CONSOLE_WARN).toHaveBeenCalledWith('Redis cache unavailable.');
				});
			});
		});
	});

	describe('#invalidateCached', () => {
		const INSTANCE = new RedisCacheAPIWrapper<MockEntityType, 'mockUniqueKey'>(
			MOCK_REDIS_CLIENT,
			MOCK_KEY_PREFIX
		);
		let spyComposeRedisKey: jest.SpyInstance;

		beforeAll(() => {
			spyComposeRedisKey = jest.spyOn(INSTANCE, 'composeRedisKey');
		});

		afterAll(() => {
			spyComposeRedisKey.mockRestore();
		});

		describe('when called', () => {
			describe('and Redis cache is available', () => {
				beforeAll(async () => {
					spyComposeRedisKey.mockClear();
					await INSTANCE.invalidateCached(MOCK_ENTITY_UNIQUE_KEY);
				});

				afterAll(() => {
					MOCK_REDIS_CLIENT.del.mockReset();
				});

				it('calls #composeRedisKey once with expected argument', () => {
					expect(spyComposeRedisKey).toHaveBeenCalledTimes(1);
					expect(spyComposeRedisKey).toHaveBeenCalledWith(MOCK_ENTITY_UNIQUE_KEY);
				});

				it('calls RedisClient.del method once with expected argument', () => {
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledWith(EXPECTED_ENTITY_CACHE_KEY);
				});
			});

			describe('and Redis cache is unvailable', () => {
				beforeAll(async () => {
					spyComposeRedisKey.mockClear();
					MOCK_REDIS_CLIENT.del.mockRejectedValue(new Error());
					await INSTANCE.invalidateCached(MOCK_ENTITY_UNIQUE_KEY);
				});

				afterAll(() => {
					MOCK_REDIS_CLIENT.del.mockReset();
					MOCK_CONSOLE_WARN.mockClear();
				});

				it('calls #composeRedisKey once with expected argument', () => {
					expect(spyComposeRedisKey).toHaveBeenCalledTimes(1);
					expect(spyComposeRedisKey).toHaveBeenCalledWith(MOCK_ENTITY_UNIQUE_KEY);
				});

				it('calls RedisClient.del method once with expected argument', () => {
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledTimes(1);
					expect(MOCK_REDIS_CLIENT.del).toHaveBeenCalledWith(EXPECTED_ENTITY_CACHE_KEY);
				});

				it('logs expected warning', () => {
					expect(MOCK_CONSOLE_WARN).toHaveBeenCalledTimes(1);
					expect(MOCK_CONSOLE_WARN).toHaveBeenCalledWith('Redis cache unavailable.');
				});
			});
		});
	});
});
