import { cachified, CachifiedOptions } from 'cachified';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { DEFAULT_CACHE_TIME } from './constants';
import { getClient } from './getClient';
import { removeFromCache } from './removeFromCache';

export async function useCache<T>({
	key,
	getFreshValue,
	ttl = DEFAULT_CACHE_TIME,
	checkValue = undefined,
}: Omit<CachifiedOptions<T>, 'cache'>) {
	try {
		const cache = await getClient();
		const cachifiedOptions: CachifiedOptions<T> = {
			cache,
			key,
			getFreshValue,
			ttl,
		};

		if (checkValue) {
			cachifiedOptions.checkValue = checkValue;
		}

		const cacheValue = await cachified(cachifiedOptions);
		return cacheValue;
	} catch (err) {
		await removeFromCache(key);
		console.error(getErrorMessage(err));
		return null;
	}
}
