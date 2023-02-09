import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { isOffline } from './is-offline';

let cachedClient: SQSClient | null = null;

const SQS_PORT = process.env.SQS_PORT;

export const getClient = (): SQSClient => {
	if (cachedClient) {
		return cachedClient;
	}

	const config: SQSClientConfig = {};
	if (isOffline()) {
		config.endpoint = `http://localhost:${SQS_PORT}`;
	}

	cachedClient = new SQSClient(config);
	return cachedClient;
};
