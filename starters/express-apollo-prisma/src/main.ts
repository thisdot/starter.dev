import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlServer, createGraphqlServerMiddlewareAsync } from './endpoints/graphql';
import * as dotenv from 'dotenv';
import { connectRedisClient } from './lib/cache/redis';
import { createHealthcheckHandler } from './endpoints/health';
import { jobGeneratorHandler } from './endpoints/job-generator/job-generator-handler';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const PORT = Number(process.env.PORT);
if (isNaN(PORT)) {
	throw new Error(`[Invalid environment] Variable not found: PORT`);
}

const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
	throw new Error(`[Invalid environment] Variable not found: REDIS_URL`);
}

let CORS_ALLOWED_ORIGINS: string[] | undefined;
if (process.env.CORS_ALLOWED_ORIGINS && process.env.CORS_ALLOWED_ORIGINS !== '*') {
	CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS.split(',');
}

(async () => {
	// Required logic for integrating with Express
	const app = express();

	// Set up common Express middleware
	app.use(
		cors<cors.CorsRequest>({
			origin: CORS_ALLOWED_ORIGINS
				? new RegExp(CORS_ALLOWED_ORIGINS.filter(Boolean).join('|'))
				: '*',
		}),
		bodyParser.json()
	);

	// Our httpServer handles incoming requests to our Express app.
	// Below, we tell Apollo Server to "drain" this httpServer,
	// enabling our servers to shut down gracefully.
	const httpServer = http.createServer(app);

	// GraphQL server initialization
	graphqlServer.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));
	await graphqlServer.start();

	const redisClient = await connectRedisClient(REDIS_URL);

	// Set up server-related Express middleware
	app.use('/graphql', await createGraphqlServerMiddlewareAsync());
	const prismaClient = new PrismaClient();
	app.use('/health', createHealthcheckHandler({ redisClient, prismaClient }));
	app.post('/example-job', jobGeneratorHandler);

	// Modified server startup
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log('\x1b[33m 🚀 Server ready. Endpoints: \x1b[0m');
	console.table({
		GraphQL: { Method: 'GET', Endpoint: `http://localhost:${PORT}/graphql` },
		HealthCheck: { Method: 'GET', Endpoint: `http://localhost:${PORT}/health` },
		GenerateQueueJob: { Method: 'POST', Endpoint: `http://localhost:${PORT}/example-job` },
	});

	process.on('SIGTERM', () => {
		console.log('SIGTERM signal received: closing HTTP server');
		httpServer.close(() => {
			console.log('HTTP server closed');
		});
	});
})();
