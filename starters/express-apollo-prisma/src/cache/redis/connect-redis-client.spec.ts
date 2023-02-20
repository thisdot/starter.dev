import { connectRedisClient, RedisClient } from './connect-redis-client';
import { createClient } from 'redis';

const MOCK_CREATE_CLIENT = createClient as jest.Mock;

jest.mock('redis', () => ({
	createClient: jest.fn(() => ({
		on: jest.fn(),
		connect: jest.fn(),
	})),
}));

const MOCK_URL = 'redis://localhost:6379';

describe('.connectRedisClient when called', () => {
	describe('and connects to Redis successfully', () => {
		let client: RedisClient | undefined;
		let result: RedisClient | undefined;

		beforeAll(async () => {
			client = MOCK_CREATE_CLIENT.mockImplementation(() => ({
				on: jest.fn(),
				connect: jest.fn().mockResolvedValueOnce(undefined),
			})) as unknown as RedisClient;

			result = await connectRedisClient(MOCK_URL, 5);
		});

		it('should have called createClient once', () => {
			expect(MOCK_CREATE_CLIENT).toHaveBeenCalledTimes(1);
		});

		it('should connect to Redis successfully', async () => {
			expect(result).toEqual(client);
		});
	});

	describe('with existing client url if one exists', () => {
		let client1: RedisClient | undefined;
		let client2: RedisClient | undefined;

		beforeAll(async () => {
			client1 = await connectRedisClient(MOCK_URL, 5);
			client2 = await connectRedisClient(MOCK_URL, 5);
		});

		it('should have called createClient once', () => {
			expect(MOCK_CREATE_CLIENT).toHaveBeenCalledTimes(1);
		});

		it('should return an existing client', async () => {
			expect(client1).toBe(client2);
		});
	});

	describe('and connection fails', () => {
		let client: RedisClient | undefined;

		beforeAll(async () => {
			MOCK_CREATE_CLIENT.mockImplementation(() => ({
				on: jest.fn(),
				connect: jest.fn().mockRejectedValueOnce(new Error('Connection error')),
			}));

			client = await connectRedisClient(MOCK_URL, 0);
		});

		afterAll(() => {
			// Reset the mock implementation for the createClient function
			MOCK_CREATE_CLIENT.mockReset();
		});

		it('should havecalled createClient once', () => {
			expect(MOCK_CREATE_CLIENT).toHaveBeenCalledTimes(1);
		});

		it('should return undefined', async () => {
			expect(client).toBeUndefined();
		});
	});

	describe('and connection fails and try to reconnect up to maxReconnectRetries times', () => {
		let result: RedisClient | undefined;

		beforeAll(async () => {
			MOCK_CREATE_CLIENT.mockImplementation(() => ({
				on: jest.fn(),
				connect: jest.fn().mockRejectedValueOnce(new Error('Connection error')),
			}));

			result = await connectRedisClient(MOCK_URL, 3);
		});

		it('should try to implement reconnectStrategy', async () => {
			expect(result).toBeUndefined();
			expect(createClient).toHaveBeenCalledTimes(4);
			expect(MOCK_CREATE_CLIENT.mock.calls).toEqual([
				[{ MOCK_URL, socket: { reconnectStrategy: expect.any(Function) } }],
				[{ MOCK_URL, socket: { reconnectStrategy: expect.any(Function) } }],
				[{ MOCK_URL, socket: { reconnectStrategy: expect.any(Function) } }],
				[{ MOCK_URL, socket: { reconnectStrategy: expect.any(Function) } }],
			]);

			const reconnectStrategy = MOCK_CREATE_CLIENT.mock.calls[0][0].socket.reconnectStrategy;
			expect(reconnectStrategy(0)).toBe(1000);
			expect(reconnectStrategy(1)).toBe(1000);
			expect(reconnectStrategy(2)).toBe(1000);
			expect(reconnectStrategy(3)).toBe(false);
		});
	});
});
