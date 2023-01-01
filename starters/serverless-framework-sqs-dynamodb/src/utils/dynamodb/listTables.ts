import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { getClient } from './getClient';

export const listTables = async () => {
	const command = new ListTablesCommand({});
	const client = getClient();

	try {
		const response = await client.send(command);
		if (!response || !response.TableNames) {
			throw new Error('Unable to get tables');
		}
		return response.TableNames;
	} catch (err) {
		console.error(`dynamodb.listTables Error - ${getErrorMessage(err)}`);
		throw err;
	}
};
