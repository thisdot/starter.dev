import { cachified, redisCacheAdapter } from 'cachified';
import { GetFreshValue } from 'cachified/dist/common';
import * as process from 'process';
import { CACHE_HEALTH, cacheRedisClient } from './redis-cache-client';

const FIVE_MINUTES_IN_MS = 300_000;
const REDIS_CACHE_TTL = process.env.REDIS_CACHE_TTL_IN_MS
	? parseInt(process.env.REDIS_CACHE_TTL_IN_MS)
	: FIVE_MINUTES_IN_MS;

const cachifiedCache = redisCacheAdapter(cacheRedisClient);

export async function useCache<Value>(key: string, cb: GetFreshValue<Value>): Promise<Value> {
	if (!CACHE_HEALTH.isConnected) {
		return cb();
	}

	return cachified<Value>({
		key,
		cache: cachifiedCache,
		getFreshValue: cb,
		ttl: REDIS_CACHE_TTL,
	});
}

export function clearCacheEntry(key: string) {
	cachifiedCache.delete(key);
}
