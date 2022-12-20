import { Context } from '../../../deps.ts';
import { isCacheRunning, isDatabaseRunning } from '../services/healtcheck_service.ts';

interface HealthCheckResponse {
	isCacheRunning: boolean;
	isDatabaseRunning: boolean;
}

/**
 * Handles the healthcheck endpoint. Returns the status of the databases.
 * @param response The response where the "isCacheRunning" and "isDatabaseRunning" flags will be set
 */
export async function handleHealthCheck({ response }: Context): Promise<void> {
	response.body = {
		isCacheRunning: await isCacheRunning(),
		isDatabaseRunning: await isDatabaseRunning(),
	} as HealthCheckResponse;
}
