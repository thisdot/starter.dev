import { useCache } from '@/utils/cache';
import { getItem } from '@/utils/dynamodb';
import { TechnologySchema } from '@/types/technology';
import { getCacheKey } from './getCacheKey';
import { getErrorMessage } from '@/utils/error/getErrorMessage';

export const get = async (key: string) => {
	return useCache({
		key: getCacheKey(key),
		getFreshValue: async () => {
			const item = await getItem(process.env.TECHNOLOGIES_TABLE, { id: key });
			return item;
		},
		checkValue(value: unknown) {
			TechnologySchema.parse(value);
		},
	});
};
