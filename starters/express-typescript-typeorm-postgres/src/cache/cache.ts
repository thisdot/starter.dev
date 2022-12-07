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
const ONE_MINUTE_IN_MS = 60_000;

export const cacheRedisClient = createClient({
  socket: {
    host: REDIS_CACHE_HOST,
    port: REDIS_CACHE_PORT,
  },
});

cacheRedisClient.on('error', (err) => {
  LogHelper.error('An error occurred while connecting to Redis', err);
});

cacheRedisClient.on('connected', () => {
  LogHelper.info(`Successfully connected to Redis instance`);
});

export const cachifiedCache = redisCacheAdapterTtl(cacheRedisClient);

export async function useCache<Value>(key: string, cb: GetFreshValue<Value>): Promise<Value> {
  return cachified<Value>({
    key,
    cache: cachifiedCache,
    getFreshValue: cb,
    ttl: ONE_MINUTE_IN_MS,
  });
}

export function clearCacheEntry(key: string) {
  cachifiedCache.delete(key);
}
