import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlServer } from './graphql';
import * as dotenv from 'dotenv';
const { parsed: ENV } = dotenv.config();

const PORT = Number(ENV?.PORT);
if (isNaN(PORT)) {
	throw new Error(`[Invalid .env file] Not found: PORT`);
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

	// Set up server-related Express middleware
	app.use(
		'/',
		expressMiddleware(graphqlServer, {
			context: async ({ req }) => ({ token: req.headers.authorization }),
		})
	);

	// Modified server startup
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log(`🚀 Server ready at http://localhost:${PORT}/`);
})();
