import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { isOffline } from './is-offline';

let cachedClient: SQSClient | null = null;

export const getClient = (): SQSClient => {
	if (cachedClient) {
		return cachedClient;
	}

	const config: SQSClientConfig = {};
	if (isOffline()) {
		console.log('isOFFLINE');
		config.endpoint = 'http://localhost:9324';
	}

	console.log('before instancing');
	cachedClient = new SQSClient(config);
	console.log('after instancing');
	return cachedClient;
};
