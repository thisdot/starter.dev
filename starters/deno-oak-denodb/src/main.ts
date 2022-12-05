import { Application, Context, Router } from '../deps.ts';

const app = new Application();
const port = 3333;

const router = new Router();
router.get('/', async ({ request, response }: Context) => {
  response.body = `Hello world! from ${request.url}`;
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🚀 Application is running on: ${port}`);

await app.listen({ port });
