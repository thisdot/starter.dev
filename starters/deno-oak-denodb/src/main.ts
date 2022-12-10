import { Application, applyGraphQL, Context, oakCors, Router } from '../deps.ts';
import { db } from './db/db.ts';
import { technologyResolvers } from './graphql/resolvers/resolvers.ts';
import { technologyTypes } from './graphql/schema/technology.ts';
import { corsAllowedOrigins } from './util/cors_allowed_origins.ts';
import { API_HOST, DATABASE_HOST, PORT } from './config/environment.ts';
import { logger } from './util/logger.ts';

const app = new Application();
const port = +PORT || 3333;
const router = new Router();

router.get('/', ({ request, response }: Context) => {
	response.body = `Hello from the starter.dev starter kit, running at ${request.url}`;
});

const GraphQLService = await applyGraphQL<Router>({
	Router,
	typeDefs: technologyTypes,
	resolvers: technologyResolvers,
});

app.use(
	oakCors({
		allowedHeaders: ['Content-Type', 'Authorization'],
		origin: corsAllowedOrigins(),
		optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
	}),
);

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

if (db.getConnector()._connected) {
	logger.info(`%cDatabase connected to: ${DATABASE_HOST}`, 'color: green');
}
logger.info(`%c🚀 Application is running on: ${API_HOST}:${PORT}`, 'color: green');

await app.listen({ port });
