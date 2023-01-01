import { useCache } from '@/utils/cache/useCache';
import { getItem } from '@/utils/dynamodb/getItem';
import { TechnologySchema } from '@/types/technology';
import { getCacheKey } from './getCacheKey';

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
