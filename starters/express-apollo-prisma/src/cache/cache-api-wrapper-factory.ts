import { CacheAPIWrapper } from './cache-api-wrapper';
import { RedisCacheAPIWrapper } from './redis-cache-api-wrapper';
import { connectRedisClient } from './redis/connect-redis-client';
import { REDIS_CACHE_TTL_SECONDS, REDIS_URL } from '../config';

export const createCacheAPIWrapperAsync = async <
	TEntity extends { [k: string]: number | string | null },
	TUniqueKey extends keyof TEntity = 'id'
>(
	cacheKeyPrefix: string
): Promise<CacheAPIWrapper<TEntity, TUniqueKey> | null> => {
	const redisClient = await connectRedisClient(REDIS_URL);
	return redisClient
		? new RedisCacheAPIWrapper(redisClient, cacheKeyPrefix, REDIS_CACHE_TTL_SECONDS)
		: null;
};
