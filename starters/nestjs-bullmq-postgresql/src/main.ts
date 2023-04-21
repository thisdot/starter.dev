import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const config = new DocumentBuilder()
		.setTitle('NestJS, Bull MQ and PostgreSQL starter kit API')
		.setDescription('NestJS starter kit API with CRUD functionality')
		.setVersion('1.0')
		.build();

	const app = await NestFactory.create(AppModule);
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
