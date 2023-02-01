import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { getClient } from './client';
// import type { QueueName } from './client';
import { getQueueUrl } from './getQueueUrl';

type Message = {
	[key: string]: string | number | boolean | null;
};

export const sendMessage = async (message: Message) => {
	console.log('sendMessage called');
	const client = getClient();
	console.log('client', client);
	const queueUrl = await getQueueUrl();
	console.log('queueUrl', queueUrl);
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

