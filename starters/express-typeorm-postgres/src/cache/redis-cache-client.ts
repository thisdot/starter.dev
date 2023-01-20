import process from 'process';
import { createClient } from 'redis';
import { LogHelper } from '../utils/log-helper';

const REDIS_CACHE_HOST = process.env.REDIS_CACHE_HOST || 'localhost';
const REDIS_CACHE_PORT = process.env.REDIS_CACHE_PORT
	? parseInt(process.env.REDIS_CACHE_PORT)
	: 6379;

export const cacheRedisClient = createClient({
	socket: {
		host: REDIS_CACHE_HOST,
		port: REDIS_CACHE_PORT,
	},
});

export const CACHE_HEALTH = {
	isConnected: false,
	error: null,
};

cacheRedisClient.on('error', (err) => {
	if (CACHE_HEALTH.isConnected) {
		LogHelper.error('[CACHE] An error occurred while connecting to Redis', err);
		CACHE_HEALTH.isConnected = false;
		CACHE_HEALTH.error = err;
	}
});

cacheRedisClient.on('reconnecting', () => {
	LogHelper.info(`[CACHE] Reconnecting to Redis instance`);
});

cacheRedisClient.on('connect', () => {
	LogHelper.info(`[CACHE] Successfully connected to Redis instance`);
	CACHE_HEALTH.isConnected = true;
	CACHE_HEALTH.error = null;
});

export function redisHealthCheck(): Promise<'CONNECTED'> {
	return new Promise((resolve, reject) => {
		if (CACHE_HEALTH.isConnected) {
			resolve('CONNECTED');
		} else {
			reject(CACHE_HEALTH.error);
		}
	});
}
