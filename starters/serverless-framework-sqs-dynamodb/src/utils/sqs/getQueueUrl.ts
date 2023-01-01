import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { getClient, QueueName } from './getClient';

export const getQueueUrl = async (queue: QueueName): Promise<string> => {
	const command = new GetQueueUrlCommand({
		QueueName: queue,
	});

	try {
		const { QueueUrl } = await getClient().send(command);
		if (!QueueUrl) {
			throw new Error('Queue not found');
		}
		return QueueUrl;
	} catch (error) {
		const message = getErrorMessage(error);
		console.error(message);
		throw new Error(message);
	}
};
