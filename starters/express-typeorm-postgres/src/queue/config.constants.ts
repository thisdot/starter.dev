export const REDIS_QUEUE_HOST = process.env.REDIS_QUEUE_HOST || 'localhost';
export const REDIS_QUEUE_PORT = process.env.REDIS_QUEUE_PORT
	? parseInt(process.env.REDIS_QUEUE_PORT)
	: 6479;

export const queueName = 'defaultQueue';

export const DEFAULT_REMOVE_CONFIG = {
	removeOnComplete: {
		age: 3600,
	},
	removeOnFail: {
		age: 24 * 3600,
	},
};
