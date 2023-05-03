import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: process.env.origins_urls ? process.env.origins_urls.split(',') : false,
	});

	await app.listen(3000);
}
bootstrap();
