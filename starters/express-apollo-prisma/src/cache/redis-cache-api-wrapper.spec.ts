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
			describe.each([
				[
					'Redis cache is available and entity cached',
					MOCK_ENTITY_SERIALIZED,
					MOCK_ENTITY,
					undefined,
				],
				['Redis cache is available and entity not cached', null, null, undefined],
				['Redis cache is unvailable', new Error(), null, 'Redis cache unavailable.'],
			])(
				'and %s',
				(_statement, mockRedisClientGetResult, expectedResult, expectedWarningMessage) => {
					let result: MockEntityType | null;

					beforeAll(async () => {
						spyComposeRedisKey.mockClear();
						if (mockRedisClientGetResult instanceof Error) {
							MOCK_REDIS_CLIENT.get.mockRejectedValue(mockRedisClientGetResult);
						} else {
							MOCK_REDIS_CLIENT.get.mockResolvedValue(mockRedisClientGetResult);
						}
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

					if (expectedWarningMessage) {
						it('logs expected warning', () => {
							expect(MOCK_CONSOLE_WARN).toHaveBeenCalledTimes(1);
							expect(MOCK_CONSOLE_WARN).toHaveBeenCalledWith('Redis cache unavailable.');
						});
					}
					it('returns expected result', () => {
						expect(result).toEqual(expectedResult);
					});
				}
			);
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
			describe.each([
				['Redis cache is available', 'OK', undefined],
				['Redis cache is unvailable', new Error(), 'Redis cache unavailable.'],
			])('and %s', (_statement, mockRedisClientSetResult, expectedWarningMessage) => {
				beforeAll(async () => {
					spyComposeRedisKey.mockClear();
					if (mockRedisClientSetResult instanceof Error) {
						MOCK_REDIS_CLIENT.set.mockRejectedValue(mockRedisClientSetResult);
					} else {
						MOCK_REDIS_CLIENT.set.mockResolvedValue(mockRedisClientSetResult);
					}
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

				if (expectedWarningMessage) {
					it('logs expected warning', () => {
						expect(MOCK_CONSOLE_WARN).toHaveBeenCalledTimes(1);
						expect(MOCK_CONSOLE_WARN).toHaveBeenCalledWith(expectedWarningMessage);
					});
				}
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
			describe.each([
				['Redis cache is available', 1, undefined],
				['Redis cache is unavailable', new Error(), 'Redis cache unavailable.'],
			])('and %s', (_statement, mockRedisClientDelResult, expectedWarningMessage) => {
				beforeAll(async () => {
					spyComposeRedisKey.mockClear();
					if (mockRedisClientDelResult instanceof Error) {
						MOCK_REDIS_CLIENT.del.mockRejectedValue(mockRedisClientDelResult);
					} else {
						MOCK_REDIS_CLIENT.del.mockResolvedValue(mockRedisClientDelResult);
					}
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

				if (expectedWarningMessage) {
					it('logs expected warning', () => {
						expect(MOCK_CONSOLE_WARN).toHaveBeenCalledTimes(1);
						expect(MOCK_CONSOLE_WARN).toHaveBeenCalledWith(expectedWarningMessage);
					});
				}
			});
		});
	});
});
