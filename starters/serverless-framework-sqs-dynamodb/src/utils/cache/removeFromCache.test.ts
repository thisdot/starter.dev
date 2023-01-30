import Redis from 'ioredis';
import { getClient as getRedisClient } from '@/utils/redis/getClient';
import { removeFromCache } from './removeFromCache';

describe('cache.removeFromCache()', () => {
	let redisClient: Redis;

	beforeAll(async () => {
		jest.resetModules();
		redisClient = await getRedisClient('cache', process.env.REDIS_CACHE_URL);
		jest.spyOn(redisClient, 'del');
		await removeFromCache('test-del');
	});

	it('deletes a value', () => {
		expect(redisClient.del).toHaveBeenCalledWith('test-del');
	});
});
