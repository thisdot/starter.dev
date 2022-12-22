import { Database, PostgresConnector } from '../../deps.ts';
import { TechnologyModel } from './model/technology_model.ts';
import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_USERNAME,
} from '../config/environment.ts';

const connection = new PostgresConnector({
	host: DATABASE_HOST,
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
});

const db = new Database(connection);

db.link([TechnologyModel]);

export { db };
