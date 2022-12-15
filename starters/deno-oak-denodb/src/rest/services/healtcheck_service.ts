import { cache } from '../../cache/mod.ts';
import { logger } from '../../util/logger.ts';
import { db } from '../../db/db.ts';
import { PostgresConnector } from '../../../deps.ts';

export async function isCacheRunning(): Promise<boolean> {
	let isRunning;

	try {
		const pingResponses = Promise.race([
			cache.pingRedis(),
			new Promise<'PONG'>((_, reject) => {
				setTimeout(() => {
					reject(
						new Error(`Timeout error, Redis did not respond to ping under 2 seconds`),
					);
				}, 2000);
			}),
		]);
		isRunning = (await pingResponses) === 'PONG';
	} catch (e) {
		isRunning = false;
		logger.error(e);
	}

	return isRunning;
}

export async function isDatabaseRunning(): Promise<boolean> {
	let isRunning;

	try {
		const connector = db.getConnector() as PostgresConnector;
		// We're accessing a private property here, but this is to work around a bug where the connector ping()
		// method is not implemented properly (below is the proper implementation)
		// This should be fixed in this PR: https://github.com/eveningkid/denodb/pull/363
		const client = connector._client;
		const [firstRow] = (
			await client.queryObject<{ result: number }>('SELECT 1 + 1 as result')
		).rows;

		isRunning = firstRow.result === 2;
	} catch (e) {
		isRunning = false;
		logger.error(e);
	}

	return isRunning;
}
