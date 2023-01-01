import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { isOffline } from '@/utils/isOffline/isOffline';

let cachedClient: DynamoDBClient;

export const getClient = (): DynamoDBClient => {
	if (cachedClient) {
		return cachedClient;
	}

	const { REGION } = process.env;
	const config: DynamoDBClientConfig = {
		apiVersion: '2031',
		region: REGION,
	};

	if (isOffline()) {
		config.endpoint = 'http://localhost:8000';
		// needs to be set if AWS credentials aren't configured
		config.credentials = {
			accessKeyId: 'DEFAULT_ACCESS_KEY',
			secretAccessKey: 'DEFAULT_SECRET',
		};
	}

	cachedClient = new DynamoDBClient(config);
	return cachedClient;
};
