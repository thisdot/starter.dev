import { RedisSocketCommonOptions } from '@redis/client/dist/lib/client/socket';
import { RedisFunctions, RedisScripts } from '@redis/client/dist/lib/commands';
import { createClient, RedisClientType, RedisModules } from 'redis';

export type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

let clientInstances: Record<string, RedisClient> = {};

export type ReconnectStrategy = RedisSocketCommonOptions['reconnectStrategy'];

export const createReconnectStrategy = (maxReconnectRetries: number): ReconnectStrategy => {
	return (retries) => {
		if (retries < maxReconnectRetries) {
			console.warn('[Redis client] reconnecting...');
			return 1000;
		}
		console.warn('[Redis client] Redis reconnect maximum retries reached.');
		return false;
	};
};

export const onRedisClientError: (...args: unknown[]) => void = (err) => {
	console.warn('Redis connection error: ', err);
};

export const onRedisClientReady: (...args: unknown[]) => void = () => {
	console.log('Redis connected.');
};

export const connectRedisClient = async (
	url: string,
	maxReconnectRetries = 5
): Promise<RedisClient | undefined> => {
	const existingClient = clientInstances[url];

	if (existingClient) {
		return existingClient;
	}

	const client = createClient<RedisModules, RedisFunctions, RedisScripts>({
		url,
		socket: {
			reconnectStrategy: createReconnectStrategy(maxReconnectRetries),
		},
	});

	client.on('error', onRedisClientError);

	client.on('ready', onRedisClientReady);

	try {
		await client.connect();
		clientInstances[url] = client;
		return client;
	} catch (error) {
		console.warn('Cannot connect Redis client.', error);
	}

	return undefined;
};

export const _clearInstances = () => {
	clientInstances = {};
};
