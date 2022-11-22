import { DataSource } from 'typeorm';

const IS_LOGGING_ENABLED = process.env.ENABLE_LOGGING
  ? process.env.ENABLE_LOGGING === 'true'
  : true;

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['**/*.entity.js'],
  logging: IS_LOGGING_ENABLED,
  synchronize: true,
});
