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
			const SPY_CONSOLE_WARN = jest.spyOn(console, 'warn');

			beforeAll(async () => {
				SPY_CONSOLE_WARN.mockImplementationOnce(jest.fn());
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
			const SPY_CONSOLE_LOG = jest.spyOn(console, 'log');

			beforeAll(async () => {
				_clearInstances();
				SPY_CONSOLE_LOG.mockImplementationOnce(jest.fn());
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

		let PREVIOUS_MOCK_CLIENT: RedisClient | undefined;

		describe('when called', () => {
			const MOCK_CLIENT = {
				on: jest.fn(),
				connect: jest.fn(),
			};
			let result: RedisClient | undefined;

			beforeAll(async () => {
				MOCK_CREATE_CLIENT.mockReturnValue(MOCK_CLIENT);
				result = await connectRedisClient(MOCK_URL);
				PREVIOUS_MOCK_CLIENT = result;
			});

			afterAll(() => {
				MOCK_CREATE_CLIENT.mockReset();
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

			it('returns expected result', () => {
				expect(result).toBe(MOCK_CLIENT);
			});
		});

		describe('when called 2nd time', () => {
			const MOCK_CLIENT = {
				on: jest.fn(),
				connect: jest.fn(),
			};

			let result: RedisClient | undefined;

			beforeAll(async () => {
				MOCK_CREATE_CLIENT.mockReturnValue(MOCK_CLIENT);
				result = await connectRedisClient(MOCK_URL);
			});

			afterAll(() => {
				MOCK_CREATE_CLIENT.mockReset();
			});

			it('returns the same instance', () => {
				expect(result).toBe(PREVIOUS_MOCK_CLIENT);
			});
		});

		describe('when called and Redis is unavailable', () => {
			const MOCK_CLIENT = {
				on: jest.fn(),
				connect: jest.fn(),
			};
			const SPY_CONSOLE_WARN = jest.spyOn(console, 'warn');

			let result: RedisClient | undefined;

			beforeAll(async () => {
				_clearInstances();
				SPY_CONSOLE_WARN.mockImplementationOnce(jest.fn());
				MOCK_CREATE_CLIENT.mockReturnValue(MOCK_CLIENT);
				MOCK_CLIENT.connect.mockRejectedValue(new Error());
				result = await connectRedisClient(MOCK_URL);
			});

			afterAll(() => {
				SPY_CONSOLE_WARN.mockClear();
				MOCK_CLIENT.connect.mockReset();
				MOCK_CREATE_CLIENT.mockReset();
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

			it('logs warnings', () => {
				expect(SPY_CONSOLE_WARN).toHaveBeenCalledTimes(2);
				expect(SPY_CONSOLE_WARN).toHaveBeenCalledWith('Cannot connect Redis client.');
			});

			it('returns expected result', () => {
				expect(result).toBeUndefined();
			});
		});
	});
});
