import { GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getClient } from './client';
// import type { QueueName } from './client';

const queueName = process.env.JOB_QUEUE;

export const getQueueUrl = async (): Promise<string> => {
  if (!queueName) {
    throw 'Unable to find queue.';
  }

	console.log('QueueName', queueName)
	const command = new GetQueueUrlCommand({
		QueueName: queueName,
	});
	console.log('command', command)

	try {
		const { QueueUrl } = await getClient().send(command);
		console.log('QueueUrl', QueueUrl)
		return QueueUrl as string;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
