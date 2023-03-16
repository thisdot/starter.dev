import { redisClient } from './redis';

export const getRedisHealth = async () => {
	try {
		await redisClient.get('');
		return true;
	} catch {
		return false;
	}
};
