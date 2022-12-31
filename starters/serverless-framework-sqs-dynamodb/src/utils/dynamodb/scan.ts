import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { getErrorMessage } from '@/utils/error';
import { getClient } from './getClient';

export const scan = async (tableName: string) => {
	const command = new ScanCommand({
		TableName: tableName,
	});
	const client = getClient();

	try {
		const response = await client.send(command);
		if (!response || !response.Items) {
			return [];
		}
		return response.Items.map((item) => unmarshall(item));
	} catch (err) {
		console.error(`dynamodb.scan Error - ${getErrorMessage(err)}`);
		return [];
	}
};
