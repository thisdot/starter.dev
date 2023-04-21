import { createMockRedisClient } from '../../mocks/redis-client';
import { getRedisHealth } from './redis';

describe('.getRedisHealth', () => {
	describe('when called without redisClient', () => {
		let result: boolean;

		beforeAll(async () => {
			result = await getRedisHealth();
		});

		it('returns expected result', () => {
			expect(result).toBe(false);
		});
	});

	describe('when called with redisClient', () => {
		const MOCK_REDIS_CLIENT = createMockRedisClient();

		describe('and redisClient.ping returns PONG', () => {
			let result: boolean;

			beforeAll(async () => {
				MOCK_REDIS_CLIENT.ping.mockResolvedValue('PONG');
				result = await getRedisHealth(MOCK_REDIS_CLIENT);
			});

			afterAll(() => {
				MOCK_REDIS_CLIENT.ping.mockReset();
			});

			it('calls redisClient.ping method once', () => {
				expect(MOCK_REDIS_CLIENT.ping).toHaveBeenCalledTimes(1);
			});

			it('returns expected result', () => {
				expect(result).toBe(true);
			});
		});

		describe('and redisClient.ping throws Error', () => {
			let result: boolean;

			beforeAll(async () => {
				MOCK_REDIS_CLIENT.ping.mockRejectedValue(new Error());
				result = await getRedisHealth(MOCK_REDIS_CLIENT);
			});

			afterAll(() => {
				MOCK_REDIS_CLIENT.ping.mockReset();
			});

			it('calls redisClient.ping method once', () => {
				expect(MOCK_REDIS_CLIENT.ping).toHaveBeenCalledTimes(1);
			});

			it('returns expected result', () => {
				expect(result).toBe(false);
			});
		});
	});
});
