import {
	SendMessageCommand,
	SendMessageCommandOutput,
} from '@aws-sdk/client-sqs';
import { getClient } from './client';
import { getQueueUrl } from './getQueueUrl';

export type Message = {
	[key: string]: string | number | boolean | null;
};

export type SendMessageResult = {
	success: boolean;
	data: SendMessageCommandOutput | string;
};

export const sendMessage = async (
	message: Message
): Promise<SendMessageResult> => {
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
	} catch (err) {
		const error = err as Error;
		return {
			success: false,
			data: error.message,
		};
	}
};