import { Application, Context, oakCors, Router } from '../deps.ts';
import { corsAllowedOrigins } from './util/cors_allowed_origins.ts';
import { API_HOST, PORT } from './config/environment.ts';

const app = new Application();
const port = +PORT || 3333;

const router = new Router();
router.get('/', ({ request, response }: Context) => {
  response.body = `Hello world! from ${request.url}`;
});

app.use(
  oakCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: corsAllowedOrigins(),
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🚀 Application is running on: ${API_HOST}:${PORT}`);

await app.listen({ port });
