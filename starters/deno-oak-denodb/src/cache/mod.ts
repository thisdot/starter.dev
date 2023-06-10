import { Cache } from './cache.ts';

export const cache = new Cache();

await cache.connectToRedis();
