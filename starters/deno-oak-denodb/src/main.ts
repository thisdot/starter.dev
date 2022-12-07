import { Application, applyGraphQL, config, Context, oakCors, Router } from '../deps.ts';
import { db } from './db/db.ts';
import { technologyResolvers } from './db/resolvers/technology.ts';
import { technologyTypes } from './db/schema/technology.ts';

const { API_HOST, CORS_ALLOWED_ORIGINS, PORT } = config({ safe: true });
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
		origin: CORS_ALLOWED_ORIGINS ? CORS_ALLOWED_ORIGINS.split(',') : '',
		optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
	}),
);

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

await db.sync({ drop: true });

console.log(`Database connected!`);
console.log(`🚀 Application is running on: ${API_HOST}:${PORT}`);

await app.listen({ port });
