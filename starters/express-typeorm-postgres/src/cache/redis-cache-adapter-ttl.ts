import { RedisLikeCache, totalTtl, Cache } from 'cachified';

/**
 * Temporary fix until https://github.com/Xiphe/cachified/issues/17 gets resolved
 * @param redisCache
 */
export function redisCacheAdapterTtl(redisCache: RedisLikeCache): Cache {
	return {
		name: redisCache.name || 'Redis',
		set(key, value) {
			const ttl = totalTtl(value?.metadata);
			const createdTime = value?.metadata?.createdTime;

			return redisCache.set(
				key,
				JSON.stringify(value),
				ttl > 0 && ttl < Infinity && typeof createdTime === 'number'
					? {
							EXAT: Math.ceil((ttl + createdTime) / 1000),
					  }
					: undefined
			);
		},
		async get(key) {
			const value = await redisCache.get(key);
			if (value == null) {
				return null;
			}
			return JSON.parse(value);
		},
		delete(key) {
			return redisCache.del(key);
		},
	};
}
