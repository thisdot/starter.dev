import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlServer, createGraphqlServerMiddleware } from './graphql';
import * as dotenv from 'dotenv';
import { connectRedisClient } from './redis';
import { createHealthcheckHandler } from './healthcheck';
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

const REDIS_CACHE_TTL_SECONDS = Number(ENV?.REDIS_CACHE_TTL_SECONDS);
if (isNaN(REDIS_CACHE_TTL_SECONDS)) {
	throw new Error(`[Invalid environment] Variable is not a number: REDIS_CACHE_TTL_SECONDS`);
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
	app.use('/graphql', createGraphqlServerMiddleware(redisClient, REDIS_CACHE_TTL_SECONDS));
	const prismaClient = new PrismaClient();
	app.use('/health', createHealthcheckHandler({ redisClient, prismaClient }));

	// Modified server startup
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log(`🚀 Server ready at http://localhost:${PORT}/`);
})();
