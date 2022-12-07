import { config, Database, PostgresConnector } from '../../deps.ts';
import { Technologies } from './model/technology.ts';
import { technologySeedData } from './seeding/technology-seeder.ts';

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = config({
	safe: true,
});

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
