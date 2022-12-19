import { connect, Redis, SetOpts } from '../../deps.ts';
import { REDIS_CACHE_HOST, REDIS_CACHE_PORT } from '../config/environment.ts';
import { logger } from '../util/logger.ts';

const redisHostname = REDIS_CACHE_HOST || 'localhost';
const redisPort = REDIS_CACHE_PORT ? parseInt(REDIS_CACHE_PORT) : 6379;

export class Cache {
	redisClient!: Redis;
	constructor() {
	}

	async connectToRedis(): Promise<void> {
		this.redisClient = await connect({
			hostname: redisHostname,
			port: redisPort,
		});
		this.redisClient.isConnected && logger.info('Connected to Redis');
	}

	async readItem<T>(cacheKey: string): Promise<T | null> {
		const cacheValue = await this.redisClient.get(cacheKey);
		if (cacheValue) {
			return JSON.parse(cacheValue);
		}
		return null;
	}

	async writeItem<T>(
		cacheKey: string,
		cacheValue: T,
		ex?: number,
	): Promise<T> {
		let redisCachingOpts: SetOpts | undefined;

		// Set the expiration time for the individual request if provided
		if (!ex) redisCachingOpts = { keepttl: true, ex };

		if (redisCachingOpts) {
			await this.redisClient.set(cacheKey, JSON.stringify(cacheValue), redisCachingOpts);
		} else {
			await this.redisClient.set(cacheKey, JSON.stringify(cacheValue));
		}

		return cacheValue;
	}

	async clearAllCache(): Promise<void> {
		await this.redisClient.flushall();
	}

	async invalidateItem(cacheKey: string): Promise<void> {
		await this.redisClient.del(cacheKey);
	}

	async pingRedis(): Promise<string> {
		return await this.redisClient.ping();
	}
}
