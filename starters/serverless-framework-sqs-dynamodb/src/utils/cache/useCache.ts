import { cachified, CachifiedOptions } from 'cachified';
import { DEFAULT_CACHE_TIME } from './constants';
import { getClient } from './getClient';

export async function useCache<T>({
	key,
	getFreshValue,
	ttl = DEFAULT_CACHE_TIME,
}: Pick<CachifiedOptions<T>, 'key' | 'getFreshValue' | 'ttl'>) {
	const cache = await getClient();
	return cachified({
		cache,
		key,
		getFreshValue,
		ttl,
	});
}
