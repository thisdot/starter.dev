import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ettpg',
  database: 'pgdatabase',
  entities: ['**/*.entity.js'],
  logging: true,
  synchronize: true,
});
