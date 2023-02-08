import { RedisFunctions, RedisScripts } from '@redis/client/dist/lib/commands';
import { createClient, RedisClientType, RedisModules } from 'redis';

export type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

const clientInstances: Record<string, RedisClient> = {};

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
			reconnectStrategy: (retries) => {
				if (retries < maxReconnectRetries) {
					console.warn('[Redis client] reconnecting...');
					return 1000;
				}
				console.warn('[Redis client] Redis reconnect maximum retries reached.');
				return false;
			},
		},
	});
	client.on('error', function (err) {
		console.warn('Redis connection error: ', err);
	});

	client.on('ready', () => {
		console.log('Redis connected.');
	});

	try {
		await client.connect();
		clientInstances[url] = client;
		return client;
	} catch (error) {
		console.warn({ error });
		console.warn('Cannot connect Redis client.');
	}

	return undefined;
};
