import { Cache, totalTtl } from 'cachified';
import { getClient as getRedisClient } from '@/utils/redis';

let cachedClient: Cache;
export const getClient = async () => {
	if (cachedClient) {
		return cachedClient;
	}

	const redisClient = await getRedisClient('cache', process.env.REDIS_CACHE_URL);
	cachedClient = {
		name: redisClient.options?.name || 'Redis',
		async get(key) {
			const value = await redisClient.get(key);
			if (!value) {
				return null;
			}
			return JSON.parse(value);
		},
		async set(key, value) {
			const ttl = totalTtl(value?.metadata);
			if (ttl > 0 && ttl < Infinity) {
				return redisClient.set(key, JSON.stringify(value), 'PX', ttl);
			}
			return redisClient.set(key, JSON.stringify(value));
		},
		async delete(key) {
			return redisClient.del(key);
		},
	};

	return cachedClient;
};
