import { scan } from '@/utils/dynamodb/scan';

export const getAll = async () => {
	return await scan(process.env.TECHNOLOGIES_TABLE);
};
