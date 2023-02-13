import { getRedisHealth } from './redis-healthcheck';
import { redisClient } from './redis';

const MOCK_REDIS_CLIENT = redisClient as unknown as jest.Mock;

jest.mock('./contentful', () => ({
	redisClient: jest.fn(),
}));

describe('.healthcheck', () => {
	describe('when connection is successful', () => {
		let result: boolean;
		beforeAll(async () => {
			MOCK_REDIS_CLIENT.mockResolvedValue('');
			result = await getRedisHealth();
		});
		it('should return 200', () => {
			expect(result).toEqual(true);
		});
	});
	describe('when connection is unsuccessful', () => {
		let result: boolean;
		beforeAll(async () => {
			MOCK_REDIS_CLIENT.mockRejectedValue(undefined);
			result = await getRedisHealth();
		});
		it('should return 500', () => {
			expect(result).toEqual(false);
		});
	});
});
