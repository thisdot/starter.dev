import { cachified } from 'cachified';
import { GetFreshValue } from 'cachified/dist/common';
import * as process from 'process';
import { createClient } from 'redis';
import { LogHelper } from '../utils/log-helper';
import { redisCacheAdapterTtl } from './redis-cache-adapter-ttl';

const REDIS_CACHE_HOST = process.env.REDIS_CACHE_HOST || 'localhost';
const REDIS_CACHE_PORT = process.env.REDIS_CACHE_PORT
  ? parseInt(process.env.REDIS_CACHE_PORT)
  : 6379;

const FIVE_MINUTES_IN_MS = 300_000;
const REDIS_CACHE_TTL = process.env.REDIS_CACHE_TTL_IN_MS
  ? parseInt(process.env.REDIS_CACHE_TTL_IN_MS)
  : FIVE_MINUTES_IN_MS;

export const cacheRedisClient = createClient({
  socket: {
    host: REDIS_CACHE_HOST,
    port: REDIS_CACHE_PORT,
  },
});

const CACHE_HEALTH = {
  isConnected: false,
  error: null,
};

cacheRedisClient.on('error', (err) => {
  LogHelper.error('[CACHE] An error occurred while connecting to Redis', err);
  CACHE_HEALTH.isConnected = false;
  CACHE_HEALTH.error = err;
});

cacheRedisClient.on('reconnecting', () => {
  LogHelper.info(`[CACHE] Reconnecting to Redis instance`);
});

cacheRedisClient.on('connect', () => {
  LogHelper.info(`[CACHE] Successfully connected to Redis instance`);
  CACHE_HEALTH.isConnected = true;
  CACHE_HEALTH.error = null;
});

export const cachifiedCache = redisCacheAdapterTtl(cacheRedisClient);

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

export function redisHealthCheck(): Promise<'CONNECTED'> {
  return new Promise((resolve, reject) => {
    if (CACHE_HEALTH.isConnected) {
      resolve('CONNECTED');
    } else {
      reject(CACHE_HEALTH.error);
    }
  });
}
