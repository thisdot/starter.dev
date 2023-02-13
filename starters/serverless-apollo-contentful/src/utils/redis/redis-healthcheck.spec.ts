import { getRedisHealth } from './redis-healthcheck';
import { redisClient } from './redis';

const MOCK_REDIS_CLIENT = redisClient.get as jest.Mock;
jest.mock('./redis', () => ({
	redisClient: {
		get: jest.fn(),
	},
}));

describe('.healthcheck', () => {
	describe('when connection is successful', () => {
		let result: boolean;

		beforeAll(async () => {
			MOCK_REDIS_CLIENT.mockResolvedValue('');
			result = await getRedisHealth();
		});

		it('should return true', () => {
			expect(result).toEqual(true);
		});
	});

	describe('when connection is unsuccessful', () => {
		let result: boolean;

		beforeAll(async () => {
			MOCK_REDIS_CLIENT.mockRejectedValue(undefined);
			result = await getRedisHealth();
		});

		it('should return false', () => {
			expect(result).toEqual(false);
		});
	});
});
