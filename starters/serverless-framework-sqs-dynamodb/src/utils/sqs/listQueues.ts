import { ListQueuesCommand } from '@aws-sdk/client-sqs';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { getClient } from './getClient';

export const listQueues = async () => {
	const command = new ListQueuesCommand({});
	const client = getClient();

	try {
		const response = await client.send(command);
		if (!response || !response.QueueUrls) {
			throw new Error('Unable to get queues');
		}
		return response.QueueUrls;
	} catch (err) {
		console.error(`sqs.listQueues Error - ${getErrorMessage(err)}`);
		throw err;
	}
};
