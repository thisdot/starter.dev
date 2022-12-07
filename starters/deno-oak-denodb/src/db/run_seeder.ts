import { Database, PostgresConnector } from '../../deps.ts';
import { Technologies } from './model/technology.ts';
import { technologySeedData } from './seeding/technology-seeder.ts';

import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_USERNAME,
} from '../config/environment.ts';

async function runSeeder() {
	const connection = new PostgresConnector({
		host: DATABASE_HOST,
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		database: DATABASE_NAME,
	});

	const db = new Database(connection);
	db.link([Technologies]);

	await db.sync({ drop: true });
	const technologies = await Technologies.create(technologySeedData);
	if (technologies.length) {
		Deno.exit();
	}
}

runSeeder();
