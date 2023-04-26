import { RedisClient } from '../../lib/cache/redis';

export const getRedisHealth = async (redisClient?: RedisClient) => {
	try {
		const redisClientPingResult = await redisClient?.ping();
		return redisClientPingResult === 'PONG';
	} catch {
		return false;
	}
};
