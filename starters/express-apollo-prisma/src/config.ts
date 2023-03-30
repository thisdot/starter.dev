import * as dotenv from 'dotenv';
import { Prisma } from '@prisma/client';
dotenv.config();

// Application port to listen on
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;

export let CORS_ALLOWED_ORIGINS: string[] | undefined;
if (process.env.CORS_ALLOWED_ORIGINS && process.env.CORS_ALLOWED_ORIGINS !== '*') {
	CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS.split(',');
}

// Build Redis URL based on the separate values
export const REDIS_URL = [
	'redis://',
	process.env.REDIS_USER || '',
	':',
	process.env.REDIS_PASSWORD || 'redi$pass',
	'@',
	process.env.REDIS_HOST || 'localhost',
	':',
	process.env.REDIS_PORT || '6379',
].join('');
export const REDIS_CACHE_TTL_SECONDS = process.env.REDIS_CACHE_TTL_SECONDS
	? Number(process.env.REDIS_CACHE_TTL_SECONDS)
	: 3600;

// Database configuration
export const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
export const DB_DATABASE = process.env.DB_DATABASE || 'demodb';
export const DB_PASSWORD = process.env.DB_DATABASE || 'demopass';
export const DB_USER = process.env.DB_USER || 'demo';

export const PRISMA_CONFIG: Prisma.PrismaClientOptions = {
	datasources: {
		db: {
			url: `mysql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_DATABASE}`,
		},
	},
};

// Queue
export const RABBIT_MQ_PORT_CLIENT = process.env.RABBIT_MQ_PORT_CLIENT || '5673';
export const AMQP_URL = process.env.AMQP_URL || 'amqp://localhost:' + RABBIT_MQ_PORT_CLIENT;
export const AMQP_QUEUE_JOB = process.env.AMQP_QUEUE_JOB || 'jobs';
