import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { getErrorMessage } from '@/utils/error/getErrorMessage';
import { getClient, QueueName } from './getClient';
import { getQueueUrl } from './getQueueUrl';

export const sendMessage = async (
	queue: QueueName,
	message: Record<string, unknown>
): Promise<{
	success: boolean;
	data: unknown;
}> => {
	const client = getClient();
	const queueUrl = await getQueueUrl(queue);
	const command = new SendMessageCommand({
		QueueUrl: queueUrl,
		MessageBody: JSON.stringify(message),
	});

	try {
		const data = await client.send(command);
		return {
			success: true,
			data,
		};
	} catch (error) {
		const errMessage = getErrorMessage(error);
		return {
			success: false,
			data: errMessage,
		};
	}
};
