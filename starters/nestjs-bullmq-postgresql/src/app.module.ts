import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BullModule } from '@nestjs/bullmq';
import { Dialect } from 'sequelize';
import { TechnologyModule } from './technology/technology.module';
import { HealthModule } from './health/health.module';
import 'dotenv/config';

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
		BullModule.forRoot({
			connection: {
				host: 'localhost',
				port: 6379,
			},
		}),
		BullModule.registerQueue({
			name: 'queue',
			connection: {
				host: 'localhost',
				port: 6380,
			},
		}),
		TechnologyModule,
		HealthModule,
	],
})
export class AppModule {}
