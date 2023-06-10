import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Result } from '../../../constants/result';
import {
	checkDatabaseConnection,
	checkRedisCacheConnection,
	checkRedisQueHealth,
} from '../services/health.service';

export async function getHealth(req: Request, res: Response): Promise<void> {
	const [databaseVersion, redisCacheConnectionResult, redisQueueHealthResult] = await Promise.all([
		checkDatabaseConnection(),
		checkRedisCacheConnection(),
		checkRedisQueHealth(),
	]);

	if (databaseVersion.type === Result.ERROR) {
		res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
			error: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
			details: databaseVersion.message,
		});
		return;
	}

	if (redisQueueHealthResult.type === Result.ERROR) {
		res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
			error: getReasonPhrase(StatusCodes.SERVICE_UNAVAILABLE),
			details: redisQueueHealthResult.message,
		});
		return;
	}

	if (redisCacheConnectionResult.type === Result.ERROR) {
		/**
		 *  We return 200 here, because if the cache server is down the application still works
		 *  If you need to, set up alerting based on the contents of this response or notify your
		 *  alerting system programmatically.
		 *
		 *  You can also change the status code if you'd prefer this to be an error.
		 */
		res.status(StatusCodes.OK).json({
			database: databaseVersion.data,
			redisCacheConnection: 'CONNECTION ERROR',
			error: redisCacheConnectionResult.error,
		});
		return;
	}

	res.json({
		database: databaseVersion.data,
		redisCacheConnection: redisCacheConnectionResult.data,
		redisQueueHealth: redisQueueHealthResult.data,
	});
}
