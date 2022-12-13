import { Context } from '../../../deps.ts';
import { isCacheRunning, isDatabaseRunning } from '../services/healtcheck_service.ts';

interface HealthCheckResponse {
	isCacheRunning: boolean;
	isDatabaseRunning: boolean;
}

export async function handleHealthCheck({ response }: Context): Promise<void> {
	response.body = {
		isCacheRunning: await isCacheRunning(),
		isDatabaseRunning: await isDatabaseRunning(),
	} as HealthCheckResponse;
}
