import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

(async function bootstrap() {
	const config = new DocumentBuilder()
		.setTitle('NestJS, Bull MQ and PostgreSQL starter kit API')
		.setDescription('NestJS starter kit API with CRUD functionality')
		.setVersion('1.0')
		.build();

	const app = await NestFactory.create(AppModule);
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.enableCors({
		origin: process.env.origins_urls ? process.env.origins_urls.split(',') : false,
	});

	await app.listen(process.env.localhost_port || 3000);
})();
