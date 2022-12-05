import { Database, DataTypes, Model, PostgresConnector } from '../../deps.ts';

const connection = new PostgresConnector({
  host: 'localhost',
  username: 'user',
  password: 'dbpassword',
  database: 'deno_db',
});

export const db = new Database(connection);

await db.sync({ drop: true });
