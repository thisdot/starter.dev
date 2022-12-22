import { Application, applyGraphQL, oakCors, Router } from '../deps.ts';
import { db } from './db/db.ts';
import { technologyResolvers } from './graphql/resolvers/resolvers.ts';
import { technologyTypes } from './graphql/schema/technology.ts';
import { corsAllowedOrigins } from './util/cors_allowed_origins.ts';
import { API_HOST, DATABASE_HOST, PORT, PRODUCTION } from './config/environment.ts';
import { logger } from './util/logger.ts';
import { cache } from './cache/mod.ts';
import { handleHealthCheck } from './rest/handlers/healtcheck_handler.ts';

const port = +PORT || 3333;

const app = new Application();
const router = new Router();

router.get('/health', handleHealthCheck);

const GraphQLService = await applyGraphQL<Router>({
	Router,
	typeDefs: technologyTypes,
	resolvers: technologyResolvers,
	usePlayground: PRODUCTION !== 'true',
	context: () => {
		return { cache };
	},
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
	logger.info(`Database connected to: ${DATABASE_HOST}`);
}

logger.info(`Application is running on: ${API_HOST}:${PORT}`);

await app.listen({ port });
