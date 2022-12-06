import { config, Database, PostgresConnector } from '../../deps.ts';

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = config({
  safe: true,
});

const connection = new PostgresConnector({
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

export const db = new Database(connection);

await db.sync({ drop: true });
