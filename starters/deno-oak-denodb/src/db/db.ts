import { Database, PostgresConnector } from '../../deps.ts';
import { Technologies } from './model/technology.ts';
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

db.link([Technologies]);

export { db };
