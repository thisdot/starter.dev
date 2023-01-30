import { v4 as uuidv4 } from 'uuid';
import { TechnologyCreate } from '@/types/technology';
import { putItem } from '@/utils/dynamodb/putItem';
import { addToCache } from '@/utils/cache/addToCache';
import { getCacheKey } from './getCacheKey';

export const create = async (payload: TechnologyCreate) => {
	const newTechnology = {
		id: uuidv4(),
		...payload,
	};
	const didPersist = await putItem(process.env.TECHNOLOGIES_TABLE, newTechnology);
	if (didPersist) {
		await addToCache(getCacheKey(newTechnology.id), newTechnology);
		return newTechnology;
	}

	return null;
};
