import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { getClient } from './getClient';

export const getItem = async (
	tableName: string,
	key: Record<string, unknown>,
	projection: GetItemCommandInput['ProjectionExpression'] = undefined
): Promise<Record<string, unknown> | null> => {
	const command = new GetItemCommand({
		TableName: tableName,
		Key: marshall(key),
		ProjectionExpression: projection,
	});
	const client = getClient();

	try {
		const response = await client.send(command);
		if (!response || !response.Item) {
			return null;
		}
		return unmarshall(response.Item);
	} catch (err) {
		console.error(`dynamodb.getItem Error - ${getErrorMessage(err)}`);
		return null;
	}
};
