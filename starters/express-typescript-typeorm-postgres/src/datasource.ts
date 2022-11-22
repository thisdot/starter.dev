import { DataSource } from 'typeorm';

console.log(process.env.DATABASE_PASSWORD)

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt( process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD,
  database: 'pgdatabase',
  entities: ['**/*.entity.js'],
  logging: true,
  synchronize: true,
});
