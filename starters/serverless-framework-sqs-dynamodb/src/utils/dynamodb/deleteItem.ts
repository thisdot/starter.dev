import { DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { getClient } from './getClient';

export const deleteItem = async (tableName: string, key: Record<string, unknown>) => {
	const command = new DeleteItemCommand({
		TableName: tableName,
		Key: marshall(key),
		ReturnValues: 'ALL_OLD',
	});
	const client = getClient();

	try {
		const response = await client.send(command);

		if (!response || !response.Attributes) {
			console.warn('dynamodb.deleteItem Warning - ${response}');
			return null;
		}
		return unmarshall(response.Attributes);
	} catch (err) {
		console.error(`dynamodb.deleteItem Error - ${getErrorMessage(err)}`);
		return null;
	}
};
