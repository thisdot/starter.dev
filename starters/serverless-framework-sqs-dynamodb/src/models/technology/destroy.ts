import { removeFromCache } from '@/utils/cache';
import { deleteItem } from '@/utils/dynamodb';
import { getCacheKey } from './getCacheKey';

export const destroy = async (key: string) => {
	const item = await deleteItem(process.env.TECHNOLOGIES_TABLE, { id: key });
	await removeFromCache(getCacheKey(key));
	return item;
};
