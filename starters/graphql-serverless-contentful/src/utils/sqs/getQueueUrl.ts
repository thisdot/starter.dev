import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getClient } from './client';

const queueName = process.env.JOB_QUEUE;

export const getQueueUrl = async (): Promise<string> => {
  if (!queueName) {
    throw 'Unable to find queue.';
  }

	const command = new GetQueueUrlCommand({
		QueueName: queueName,
	});

	try {
		const { QueueUrl } = await getClient().send(command);
		return QueueUrl as string;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
