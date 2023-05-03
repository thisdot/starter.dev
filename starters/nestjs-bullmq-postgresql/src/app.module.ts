import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import 'dotenv/config';
import { Dialect } from 'sequelize';
import { TechnologyModule } from './technology/technology.module';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: process.env.dialect as Dialect,
			host: process.env.host,
			port: Number(process.env.port),
			username: process.env.username,
			password: process.env.password,
			database: process.env.database,
			autoLoadModels: true,
			synchronize: true,
		}),
		TechnologyModule,
	],
})
export class AppModule {}
