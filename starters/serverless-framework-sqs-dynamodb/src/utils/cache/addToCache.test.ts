import Redis from 'ioredis';
import { getClient as getRedisClient } from '@/utils/redis';
import { DEFAULT_CACHE_TIME } from './constants';
import { addToCache } from './addToCache';

describe('cache.addToCache()', () => {
	let redisClient: Redis;

	beforeAll(async () => {
		jest.resetModules();
		jest.useFakeTimers();
		redisClient = await getRedisClient('cache', process.env.REDIS_CACHE_URL);
		jest.spyOn(redisClient, 'set');
		await addToCache('test-add', {
			a: 1,
		});
	});

	afterAll(() => {
		jest.clearAllTimers();
	});

	it('sets a value to the cache', () => {
		expect(redisClient.set).toHaveBeenCalledWith(
			'test-add',
			JSON.stringify({
				value: {
					a: 1,
				},
				metadata: {
					createdTime: Date.now(),
					ttl: DEFAULT_CACHE_TIME,
				},
			}),
			'PX',
			DEFAULT_CACHE_TIME
		);
	});
});
