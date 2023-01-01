import { TechnologyUpdate } from '@/types/technology';
import { addToCache } from '@/utils/cache/addToCache';
import { putItem } from '@/utils/dynamodb/putItem';
import { get } from './get';

export const update = async (id: string, payload: TechnologyUpdate) => {
	const existingTechnology = await get(id);
	if (!existingTechnology) {
		return null;
	}

	const updatedTechnology = {
		id,
		...existingTechnology,
		...payload,
	};

	const response = await putItem(process.env.TECHNOLOGIES_TABLE, updatedTechnology);
	if (!response) {
		return null;
	}
	await addToCache(id, updatedTechnology);
	return updatedTechnology;
};
