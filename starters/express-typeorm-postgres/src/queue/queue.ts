import { Queue, Job, Worker } from 'bullmq';
import path from 'node:path';
import { LogHelper } from '../utils/log-helper';
import {
	DEFAULT_REMOVE_CONFIG,
	queueName,
	REDIS_QUEUE_HOST,
	REDIS_QUEUE_PORT,
} from './config.constants';

export const defaultQueue = new Queue(queueName, {
	connection: {
		host: REDIS_QUEUE_HOST,
		port: REDIS_QUEUE_PORT,
	},
});

const processorPath = path.join(__dirname, 'job-processor.js');
export const defaultWorker = new Worker(queueName, processorPath, {
	connection: {
		host: REDIS_QUEUE_HOST,
		port: REDIS_QUEUE_PORT,
	},
	autorun: true,
});

defaultWorker.on('completed', (job: Job, returnvalue: 'DONE') => {
	LogHelper.debug(`Completed job with id ${job.id}`, returnvalue);
});

defaultWorker.on('active', (job: Job<unknown>) => {
	LogHelper.debug(`Completed job with id ${job.id}`);
});
defaultWorker.on('error', (failedReason: Error) => {
	LogHelper.error(`Job encountered an error`, failedReason);
});
export async function addJob<T>(data: T): Promise<Job<T>> {
	LogHelper.debug(`Adding job to queue`);

	return defaultQueue.add('job', data, DEFAULT_REMOVE_CONFIG);
}
