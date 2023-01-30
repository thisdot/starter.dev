import * as dotenv from 'dotenv';

dotenv.config();

jest.mock('ioredis', () => require('ioredis-mock'));
