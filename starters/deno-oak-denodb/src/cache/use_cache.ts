import { Cache } from './cache.ts';

export type GetFreshValue<T> = {
	(): Promise<T> | T;
};

export async function useCache<T>(
	cacheKey: string,
	cache: Cache,
	callback: GetFreshValue<T>,
): Promise<T> {
	const cacheTechnology = await cache.readItem<T>(cacheKey);
	if (cacheTechnology) {
		return cacheTechnology;
	}
	const result = await callback();
	return cache.writeItem(cacheKey, result);
}
