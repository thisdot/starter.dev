import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { isOffline } from '@/utils/isOffline/isOffline';

export type QueueName = 'ExampleQueue';

let cachedClient: SQSClient | null = null;

export const getClient = (): SQSClient => {
	if (cachedClient) {
		return cachedClient;
	}

	const config: SQSClientConfig = {};
	if (isOffline()) {
		config.endpoint = 'http://localhost:9324';
	}

	cachedClient = new SQSClient(config);
	return cachedClient;
};
