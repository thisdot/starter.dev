import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getClient } from './client';

export const getQueueUrl = async (): Promise<string | undefined> => {
	const queueName = process.env.JOB_QUEUE;

	if (!queueName) {
		throw new Error('Unable to find queue.');
	}

	const command = new GetQueueUrlCommand({
		QueueName: queueName,
	});

	try {
		const { QueueUrl } = await getClient().send(command);
		return QueueUrl;
	} catch (err) {
		const error = err as Error;
		throw new Error(error.message);
	}
};
