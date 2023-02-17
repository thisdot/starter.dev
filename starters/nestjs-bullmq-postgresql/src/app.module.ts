import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import 'dotenv/config';
import { Dialect } from 'sequelize';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: process.env.dialect as Dialect,
			host: process.env.host,
			port: Number(process.env.port),
			username: process.env.username,
			password: process.env.password,
			database: process.env.database,
			models: [],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
