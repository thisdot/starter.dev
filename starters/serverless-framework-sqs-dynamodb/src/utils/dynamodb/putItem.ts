import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { getClient } from './getClient';

export const putItem = async (tableName: string, item: Record<string, unknown>) => {
	const command = new PutItemCommand({
		TableName: tableName,
		Item: marshall(item),
	});
	const client = getClient();

	try {
		await client.send(command);
		return true;
	} catch (err) {
		console.error(`dynamodb.putItem Error - ${getErrorMessage(err)}`);
		return false;
	}
};
