import Keyv from 'keyv';

const {
	REDIS_PORT = 6379,
	REDIS_HOST = '127.0.0.1',
	REDIS_USER = 'default',
	REDIS_PASS = '',
} = process.env;

export const redisClient = new Keyv(
	`redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}`
);
