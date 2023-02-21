import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlServer, createGraphqlServerMiddlewareAsync } from './graphql';
import * as dotenv from 'dotenv';
import { connectRedisClient } from './cache/redis';
import { createHealthcheckHandler } from './healthcheck';
import { createJobGenerator, createQueueChannel } from './queue/producer';
import { PrismaClient } from '@prisma/client';

const { parsed: ENV } = dotenv.config();

const PORT = Number(ENV?.PORT);
if (isNaN(PORT)) {
	throw new Error(`[Invalid environment] Variable not found: PORT`);
}

const REDIS_URL = ENV?.REDIS_URL;
if (!REDIS_URL) {
	throw new Error(`[Invalid environment] Variable not found: REDIS_URL`);
}

const AMQP_URL = ENV?.AMQP_URL;
if (!AMQP_URL) {
	throw new Error(`[Invalid environment] Variable not found: AMQP_URL`);
}

(async () => {
	// Required logic for integrating with Express
	const app = express();

	// Set up common Express middleware
	app.use('/', cors<cors.CorsRequest>(), bodyParser.json());

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
	const queueChannel = await createQueueChannel(AMQP_URL);
	app.post('/example-job', createJobGenerator({ queueChannel }));

	// Modified server startup
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log('\x1b[33m 🚀 Server ready. Endpoints: \x1b[0m');
	console.table({
		GraphQL: { Method: 'GET', Endpoint: `http://localhost:${PORT}/graphql` },
		HealthCheck: { Method: 'GET', Endpoint: `http://localhost:${PORT}/health` },
		GenerateQueueJob: { Method: 'POST', Endpoint: `http://localhost:${PORT}/example-job` },
	});
})();
