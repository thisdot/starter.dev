import { Application, applyGraphQL, Context, oakCors, Router } from '../deps.ts';
import { db } from './db/db.ts';
import { technologyResolvers } from './db/resolvers/resolvers.ts';
import { technologyTypes } from './db/schema/technology.ts';
import { corsAllowedOrigins } from './util/cors_allowed_origins.ts';
import { API_HOST, DATABASE_HOST, PORT } from './config/environment.ts';

const app = new Application();
const port = +PORT || 3333;

const router = new Router();
router.get('/', ({ request, response }: Context) => {
	response.body = `Hello world! from ${request.url}`;
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
	console.log(`Database connected to: ${DATABASE_HOST}`);
}
console.log(`🚀 Application is running on: ${API_HOST}:${PORT}`);

await app.listen({ port });
