import {
	connectRedisClient,
	createReconnectStrategy,
	RedisClient,
	_clearInstances,
	onRedisClientError,
	onRedisClientReady,
	ReconnectStrategy,
} from './connect-redis-client';
import { createClient } from 'redis';
import assert from 'assert';
import { createMockRedisClient } from '../../../mocks/redis-client';

jest.mock('redis', () => ({
	createClient: jest.fn(),
}));

jest.mock('./connect-redis-client', () => {
	const originalModule =
		jest.requireActual<typeof import('./connect-redis-client')>('./connect-redis-client');

	return {
		__esModule: true, // Use it when dealing with esModules
		...originalModule,
		createReconnectStrategy: jest.spyOn(originalModule, 'createReconnectStrategy'),
	};
});

const MOCK_CREATE_CLIENT = createClient as jest.Mock;
const MOCK_CLIENT = createMockRedisClient();

const SPY_CONSOLE_WARN = jest.spyOn(console, 'warn');
const SPY_CONSOLE_LOG = jest.spyOn(console, 'log');

const SPY_CREATE_RECONNECT_STRATEGY = createReconnectStrategy as unknown as jest.SpyInstance;

const MOCK_URL = 'redis://localhost:6379';

describe('connect-redis-client', () => {
	beforeAll(() => {
		SPY_CONSOLE_WARN.mockImplementation(jest.fn());
		SPY_CONSOLE_LOG.mockImplementation(jest.fn());
	});

	afterAll(() => {
		SPY_CONSOLE_WARN.mockRestore();
		SPY_CONSOLE_LOG.mockRestore();
	});

	describe('.createReconnectStrategy', () => {
		describe('when called', () => {
			const MOCK_MAX_RECONNECT_RETRIES = 123;

			let result: ReconnectStrategy;

			beforeAll(() => {
				result = createReconnectStrategy(MOCK_MAX_RECONNECT_RETRIES);
			});

			afterAll(() => {
				SPY_CONSOLE_WARN.mockClear();
			});

			describe('result', () => {
				it('is function', () => {
					expect(result).toBeDefined();
					expect(result).toBeInstanceOf(Function);
				});

				describe('when called', () => {
					const CASES: [string, number, string, number | false | Error][] = [
						[
							'with less than maximum attempts',
							MOCK_MAX_RECONNECT_RETRIES - 1,
							'[Redis client] reconnecting...',
							1000,
						],
						[
							'with maximum attempts',
							MOCK_MAX_RECONNECT_RETRIES,
							'[Redis client] Redis reconnect maximum retries reached.',
							false,
						],
						[
							'with less than maximum attempts',
							MOCK_MAX_RECONNECT_RETRIES + 1,
							'[Redis client] Redis reconnect maximum retries reached.',
							false,
						],
					];

					describe.each(CASES)('%s', (_, MOCK_RETRIES, expectedWarning, expectedResult) => {
						let callResult: number | false | Error;

						beforeAll(async () => {
							assert(result instanceof Function);
							callResult = result(MOCK_RETRIES, new Error());
						});

						it('logs correct warning', () => {
							expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith(expectedWarning);
						});

						it('returns expected result', async () => {
							expect(callResult).toStrictEqual(expectedResult);
						});
					});
				});
			});
		});
	});

	describe('.onRedisClientError', () => {
		describe('when called with error argument', () => {
			const error = new Error('Test error');

			beforeAll(async () => {
				onRedisClientError(error);
			});

			afterAll(() => {
				SPY_CONSOLE_WARN.mockClear();
			});

			it('should log the error', () => {
				expect(SPY_CONSOLE_WARN).toHaveBeenCalledTimes(1);
				expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith('Redis connection error: ', error);
			});
		});
	});

	describe('.onRedisClientReady', () => {
		describe('when called', () => {
			beforeAll(async () => {
				_clearInstances();
				onRedisClientReady();
			});

			afterAll(() => {
				SPY_CONSOLE_LOG.mockClear();
			});

			it('should log the error', () => {
				expect(SPY_CONSOLE_LOG).toHaveBeenCalledTimes(1);
				expect(SPY_CONSOLE_LOG).toHaveBeenCalledWith('Redis connected.');
			});
		});
	});

	describe('.connectRedisClient', () => {
		const MOCK_RECONNECT_STRATEGY = {};

		beforeAll(() => {
			SPY_CREATE_RECONNECT_STRATEGY.mockReturnValue(MOCK_RECONNECT_STRATEGY);
		});

		afterAll(() => {
			SPY_CREATE_RECONNECT_STRATEGY.mockRestore();
		});

		describe('when called', () => {
			describe.each([
				['Redis is available', undefined, undefined, MOCK_CLIENT],
				['Redis is unavailable', new Error(), 'Cannot connect Redis client.', undefined],
			])(
				'and %s',
				(_statement, mockClientConnectError, expectedWarningMessage, expectedResultReference) => {
					let result: RedisClient | undefined;

					beforeAll(async () => {
						MOCK_CREATE_CLIENT.mockReturnValue(MOCK_CLIENT);
						if (mockClientConnectError) {
							MOCK_CLIENT.connect.mockRejectedValue(mockClientConnectError);
						}
						result = await connectRedisClient(MOCK_URL);
					});

					afterAll(() => {
						_clearInstances();
						SPY_CONSOLE_WARN.mockClear();
						MOCK_CREATE_CLIENT.mockReset();
						MOCK_CLIENT.connect.mockReset();
						MOCK_CLIENT.on.mockClear();
					});

					it('calls createClient with correct arguments', () => {
						expect(MOCK_CREATE_CLIENT).toHaveBeenCalledTimes(1);
						expect(MOCK_CREATE_CLIENT).toHaveBeenCalledWith({
							url: MOCK_URL,
							socket: {
								reconnectStrategy: MOCK_RECONNECT_STRATEGY,
							},
						});
					});

					it('adds error handler to client', () => {
						expect(MOCK_CLIENT.on.mock.calls.find(([x]) => x === 'error')).toBeDefined();
					});

					it('adds ready handler to client', () => {
						expect(MOCK_CLIENT.on.mock.calls.find(([x]) => x === 'ready')).toBeDefined();
					});

					it('calls client connect method once', () => {
						expect(MOCK_CLIENT.connect).toHaveBeenCalledTimes(1);
					});

					if (expectedWarningMessage) {
						it('logs warnings', () => {
							expect(SPY_CONSOLE_WARN).toHaveBeenCalledTimes(1);
							expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith(
								expectedWarningMessage,
								mockClientConnectError
							);
						});
					}

					it('returns expected result', () => {
						expect(result).toBe(expectedResultReference);
					});
				}
			);
		});

		describe('when called multiple times', () => {
			const MOCK_CLIENT_2 = createMockRedisClient();
			let result1: RedisClient | undefined;
			let result2: RedisClient | undefined;

			beforeAll(async () => {
				MOCK_CREATE_CLIENT.mockReturnValue(MOCK_CLIENT);
				result1 = await connectRedisClient(MOCK_URL);
				MOCK_CREATE_CLIENT.mockReturnValue(MOCK_CLIENT_2);
				result2 = await connectRedisClient(MOCK_URL);
			});

			afterAll(() => {
				MOCK_CREATE_CLIENT.mockReset();
				MOCK_CLIENT.connect.mockReset();
				MOCK_CLIENT.on.mockClear();
			});

			it('returns the same instance', () => {
				expect(result1).toBe(result2);
			});
		});
	});
});
