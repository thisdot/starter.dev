import * as dotenv from 'dotenv';

// load dotenv config
const { parsed } = dotenv.config();

process.env = { ...process.env, ...parsed };
