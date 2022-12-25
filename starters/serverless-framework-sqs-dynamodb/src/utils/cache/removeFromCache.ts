import { getClient } from './getClient';

export async function removeFromCache(key: string) {
	const cache = await getClient();
	await cache.delete(key);
}
