import { Database, PostgresConnector } from '../../deps.ts';
import { TechnologyModel } from './model/technology_model.ts';
import { technologySeedData } from './seeding/technology_seeder.ts';

import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_USERNAME,
} from '../config/environment.ts';

async function runSeeder(): Promise<void> {
	const connection = new PostgresConnector({
		host: DATABASE_HOST,
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME,
	});

	const db = new Database(connection);
	db.link([TechnologyModel]);

	await db.sync({ drop: true });
	await TechnologyModel.create(technologySeedData);

	console.log('%cDatabase Seeded', 'color: green; font-weight: bold');
	Deno.exit();
}

runSeeder();
