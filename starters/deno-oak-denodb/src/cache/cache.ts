import { connect, Redis, SetOpts } from '../../deps.ts';
import { REDIS_CACHE_HOST, REDIS_CACHE_PORT } from '../config/environment.ts';
import { logger } from '../util/logger.ts';

type GetFreshValue<Value> = {
	(): Promise<Value> | Value;
};

const redisHostname = REDIS_CACHE_HOST || 'localhost';
const redisPort = REDIS_CACHE_PORT ? parseInt(REDIS_CACHE_PORT) : 6379;

export class Cache {
	redisClient!: Redis;
	constructor() {
		this.connectToRedis();
	}

	private async connectToRedis() {
		this.redisClient = await connect({
			hostname: redisHostname,
			port: redisPort,
		});
		this.redisClient.isConnected && logger.info('Connected to Redis');
	}

	async readItem({ cacheKey }: { cacheKey: string; ex?: number }) {
		const cacheValue = await this.redisClient.get(cacheKey);
		if (cacheValue) {
			return JSON.parse(cacheValue);
		}
		return null;
	}

	async writeItem<Value>(
		{ cacheKey, ex }: { cacheKey: string; ex?: number },
		callback: GetFreshValue<Value>,
	) {
		const results = await callback();
		let redisCachingOpts: SetOpts = { keepttl: true };
    console.log("results", results)

		// Set the expiration time for the individual request if provided
		if (ex) {
			if (ex > 0) redisCachingOpts = { ...redisCachingOpts, ex };
		}

		if (redisCachingOpts) {
			await this.redisClient.set(cacheKey, JSON.stringify(results), redisCachingOpts);
		} else {
			await this.redisClient.set(cacheKey, JSON.stringify(results));
		}

		return results;
	}

	async clearAllCache(): Promise<void> {
		await this.redisClient.flushall();
	}

	async invalidateItem(cacheKey: string) {
		await this.redisClient.del(cacheKey);
	}
}
