import { removeFromCache } from '@/utils/cache/removeFromCache';
import { deleteItem } from '@/utils/dynamodb/deleteItem';
import { getCacheKey } from './getCacheKey';

export const destroy = async (key: string) => {
	const item = await deleteItem(process.env.TECHNOLOGIES_TABLE, { id: key });
	await removeFromCache(getCacheKey(key));
	return item;
};
