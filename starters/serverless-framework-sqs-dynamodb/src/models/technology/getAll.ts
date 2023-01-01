import { scan } from '@/utils/dynamodb/scan';

export const getAll = async () => {
	const items = await scan(process.env.TECHNOLOGIES_TABLE);
	return items;
};
