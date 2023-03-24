import { getRedisHealth } from './redis-healthcheck';
import { redisClient } from './redis';

const MOCK_REDIS_CLIENT_GET = redisClient.get as jest.Mock;
jest.mock('./redis', () => ({
	redisClient: {
		get: jest.fn(),
	},
}));

describe('.healthcheck', () => {
	describe('when connection is successful', () => {
		let result: boolean;

		beforeAll(async () => {
			MOCK_REDIS_CLIENT_GET.mockResolvedValue(null);
			result = await getRedisHealth();
		});
		afterAll(() => {
			MOCK_REDIS_CLIENT_GET.mockReset();
		});

		it('calls RedisClient.get withod with expected argument', () => {
			expect(MOCK_REDIS_CLIENT_GET).toHaveBeenCalledTimes(1);
			expect(MOCK_REDIS_CLIENT_GET).toHaveBeenCalledWith('');
		});

		it('should return true', () => {
			expect(result).toEqual(true);
		});
	});

	describe('when connection is unsuccessful', () => {
		let result: boolean;

		beforeAll(async () => {
			MOCK_REDIS_CLIENT_GET.mockRejectedValue(new Error());
			result = await getRedisHealth();
		});

		afterAll(() => {
			MOCK_REDIS_CLIENT_GET.mockReset();
		});

		it('calls RedisClient.get withod with expected argument', () => {
			expect(MOCK_REDIS_CLIENT_GET).toHaveBeenCalledTimes(1);
			expect(MOCK_REDIS_CLIENT_GET).toHaveBeenCalledWith('');
		});

		it('should return false', () => {
			expect(result).toEqual(false);
		});
	});
});
