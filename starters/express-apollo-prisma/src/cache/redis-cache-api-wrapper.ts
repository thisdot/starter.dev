import { CacheAPIWrapper } from './cache-api-wrapper';
import { RedisClient } from './redis/connect-redis-client';

export class RedisCacheAPIWrapper<
	TEntity extends { [k: string]: number | string | null },
	TUniqueKey extends keyof TEntity = 'id'
> implements CacheAPIWrapper<TEntity, TUniqueKey>
{
	constructor(
		private readonly redisClient: RedisClient,
		private keyPrefix: string,
		private readonly cacheTtlSeconds: number = 360
	) {}

	composeRedisKey(id: TEntity[TUniqueKey]): string {
		return `${this.keyPrefix}:${id}`;
	}

	async getCached(uniqueKeyValue: TEntity[TUniqueKey]): Promise<TEntity | null> {
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

	async cache(entity: TEntity, uniqueKey: TUniqueKey): Promise<void> {
		if (this.redisClient) {
			try {
				const key = this.composeRedisKey(entity[uniqueKey]);
				const serialized = JSON.stringify(entity);
				await this.redisClient.set(key, serialized, {
					EX: this.cacheTtlSeconds,
				});
			} catch {
				console.warn('Redis cache unavailable.');
			}
		}
	}

	async invalidateCached(uniqueKey: TEntity[TUniqueKey]): Promise<void> {
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
