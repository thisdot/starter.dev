import { CacheAPIWrapper } from './cache-api-wrapper';
import { connectRedisClient, RedisClient } from './redis/connect-redis-client';

export class RedisCacheAPIWrapper extends CacheAPIWrapper {
	constructor(
		private readonly redisClient: RedisClient,
		keyPrefix: string,
		private readonly cacheTtlSeconds: number = 360
	) {
		super(keyPrefix);
	}

	composeRedisKey<
		TItem extends { [k: string]: number | string },
		TUniqueKey extends keyof TItem = 'id'
	>(id: TItem[TUniqueKey]): string {
		return `${this.keyPrefix}:${id}`;
	}

	async getCached<
		TItem extends { [k: string]: number | string },
		TIdKey extends keyof TItem = 'id'
	>(uniqueKeyValue: TItem[TIdKey]): Promise<TItem | null> {
		if (this.redisClient) {
			try {
				const key = this.composeRedisKey(uniqueKeyValue);
				const serialized = await this.redisClient.get(key);
				if (serialized) {
					return JSON.parse(serialized);
				}
			} catch {
				console.warn('Redis cache unavailable.');
			}
		}
		return null;
	}

	async cache<
		TItem extends { [k: string]: number | string },
		TUniqueKey extends keyof TItem = 'id'
	>(item: TItem, uniqueKey: TUniqueKey): Promise<void> {
		if (this.redisClient) {
			try {
				const key = this.composeRedisKey(item[uniqueKey]);
				const serialized = JSON.stringify(item);
				await this.redisClient.set(key, serialized, {
					EX: this.cacheTtlSeconds,
				});
			} catch {
				console.warn('Redis cache unavailable.');
			}
		}
	}

	async invalidateCached<
		TItem extends { [k: string]: number | string },
		TUniqueKey extends keyof TItem = 'id'
	>(uniqueKey: TItem[TUniqueKey]): Promise<void> {
		if (this.redisClient) {
			try {
				const key = this.composeRedisKey(uniqueKey);
				await this.redisClient.del(key);
			} catch {
				console.warn('Redis cache unavailable.');
			}
		}
	}
}

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
	throw new Error(`[Invalid environment] Variable not found: REDIS_URL`);
}

const REDIS_CACHE_TTL_SECONDS_STRING = process.env.REDIS_CACHE_TTL_SECONDS;

if (!REDIS_CACHE_TTL_SECONDS_STRING) {
	throw new Error(`[Invalid environment] Variable not found: REDIS_CACHE_TTL_SECONDS`);
}

const REDIS_CACHE_TTL_SECONDS = Number(REDIS_CACHE_TTL_SECONDS_STRING);

if (isNaN(REDIS_CACHE_TTL_SECONDS)) {
	throw new Error(
		`[Invalid environment] Invalid variable: REDIS_CACHE_TTL_SECONDS. Should be a number`
	);
}

export const createCacheAPIWrapperAsync = async (
	cacheKeyPrefix: string
): Promise<CacheAPIWrapper | null> => {
	const redisClient = await connectRedisClient(REDIS_URL);
	return redisClient
		? new RedisCacheAPIWrapper(redisClient, cacheKeyPrefix, REDIS_CACHE_TTL_SECONDS)
		: null;
};
