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
			port: Number(process.env.database_port),
			username: process.env.username,
			password: process.env.password,
			database: process.env.database,
			autoLoadModels: true,
			synchronize: true,
		}),
		BullModule.forRoot({
			connection: {
				host: 'localhost',
				port: Number(process.env.cache_port),
			},
		}),
		BullModule.registerQueue({
			name: 'queue',
			connection: {
				host: 'localhost',
				port: Number(process.env.queue_port),
			},
		}),
		TechnologyModule,
		HealthModule,
	],
})
export class AppModule {}
