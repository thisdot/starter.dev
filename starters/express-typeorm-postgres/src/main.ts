// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { bootstrapApp } from './bootstrap-app';
import { cacheRedisClient } from './cache/redis-cache-client';
import { initialiseDataSource } from './db/datasource';
import { LogHelper } from './utils/log-helper';

const PORT = process.env.PORT || 3333;

const app = bootstrapApp();

initialiseDataSource().then((isInitialised: boolean) => {
	if (isInitialised) {
		LogHelper.log(`DataSource has been initialised!`);
	} else {
		LogHelper.error(`Could not initialise database connection`);
	}
});

cacheRedisClient
	.connect()
	.then(() => {
		LogHelper.debug('Connected to redis');
	})
	.catch((e) => {
		LogHelper.error(`Could not connect to redis`, e);
	});

app.listen(PORT, () => {
	LogHelper.info(`Example app listening on port ${PORT}`);
});
