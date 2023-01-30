import { RedisFunctions, RedisScripts } from '@redis/client/dist/lib/commands';
import { createClient, RedisClientType, RedisModules } from 'redis';

export type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

const clientInstances: Record<string, RedisClient> = {};

export const connectRedisClient = async (url: string): Promise<RedisClient> => {
	const existingClient = clientInstances[url];
	if (existingClient) {
		return existingClient;
	}

	const client = createClient<RedisModules, RedisFunctions, RedisScripts>({ url });
	try {
		await client.connect();
	} catch (error) {
		console.log({ error });
		throw new Error('Cannot connect Redis client.');
	}

	clientInstances[url] = client;
	return client;
};
