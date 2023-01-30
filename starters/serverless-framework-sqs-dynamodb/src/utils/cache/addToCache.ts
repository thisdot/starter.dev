import { DEFAULT_CACHE_TIME } from './constants';
import { getClient } from './getClient';

export async function addToCache(key: string, value: unknown, ttl: number = DEFAULT_CACHE_TIME) {
	const cache = await getClient();
	await cache.set(key, {
		value,
		metadata: {
			createdTime: Date.now(),
			ttl,
		},
	});
}
