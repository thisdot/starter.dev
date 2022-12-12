import { Application, connect, Context, oakCors, Router } from '../deps.ts';
import { db } from './db/db.ts';
import { technologyResolvers } from './graphql/resolvers/resolvers.ts';
import { technologyTypes } from './graphql/schema/technology.ts';
import { corsAllowedOrigins } from './util/cors_allowed_origins.ts';
import {
	API_HOST,
	DATABASE_HOST,
	PORT,
  PRODUCTION,
	REDIS_CACHE_HOST,
	REDIS_CACHE_PORT,
} from './config/environment.ts';
import { logger } from './util/logger.ts';
import { Cache } from './cache/Cache.ts';

const port = +PORT || 3333;
const redisHostname = REDIS_CACHE_HOST || 'localhost';
const redisPort = REDIS_CACHE_PORT ? parseInt(REDIS_CACHE_PORT) : 6379;

const app = new Application();
const router = new Router();

const redisClient = await connect({
	hostname: redisHostname,
	port: redisPort,
});

const ds = new Cache({
	route: '/graphql',
	redisClient: redisClient,
	usePlayground: PRODUCTION !== 'true',
	schema: {
		typeDefs: technologyTypes,
		resolvers: technologyResolvers,
	},
});

router.get('/', ({ request, response }: Context) => {
	response.body = `Hello from the starter.dev starter kit, running at ${request.url}`;
});

app.use(
	oakCors({
		allowedHeaders: ['Content-Type', 'Authorization'],
		origin: corsAllowedOrigins(),
		optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
	}),
);

app.use(ds.routes(), ds.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

if (db.getConnector()._connected) {
	logger.info(`Database connected to: ${DATABASE_HOST}`);
}
redisClient.isConnected && logger.info('Connected to Redis');
logger.info(`Application is running on: ${API_HOST}:${PORT}`);

await app.listen({ port });
