import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { isOffline } from './is-offline';

export const getClient = (): SQSClient => {
	let cachedClient: SQSClient | null = null;
	const SQS_PORT = process.env.SQS_PORT || 9324;

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
