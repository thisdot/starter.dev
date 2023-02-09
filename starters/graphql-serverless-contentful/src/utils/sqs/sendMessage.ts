import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { getClient } from './client';
import { getQueueUrl } from './getQueueUrl';

type Message = {
	[key: string]: string | number | boolean | null;
};

export const sendMessage = async (message: Message) => {
	const client = getClient();
	const queueUrl = await getQueueUrl();
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
	} catch (error: any) {
		return {
			success: false,
			data: error?.message,
		};
	}
};
