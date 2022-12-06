import { Application, config, Context, oakCors, Router } from '../deps.ts';

const { API_HOST_URL, CORS_ALLOWED_ORIGINS, PORT } = config({ safe: true });
const app = new Application();
const port = +PORT || 3333;

const router = new Router();
router.get('/', ({ request, response }: Context) => {
  response.body = `Hello world! from ${request.url}`;
});

app.use(
  oakCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: CORS_ALLOWED_ORIGINS ? CORS_ALLOWED_ORIGINS.split(',') : '',
    optionsSuccessStatus: 200,
  }),
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🚀 Application is running on: ${API_HOST_URL}`);

await app.listen({ port });
