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

	const worker = new Worker(new URL("../../worker/worker.ts", import.meta.url).href, { type: "module" });
	worker.postMessage({imageUrl: "https://d1wqzb5bdbcre6.cloudfront.net/b8228240089357d3f09865d678ff82141cc3faadab19f5138465c025235482fb/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a64463878533356756145354b4d584649575552696130357966475a7358327870646d56664d484a6b616c467a556d4e6b515455344d6a67356346524f5930704c5a4764543030594d575945487967"});

	response.body = {
		isCacheRunning: await isCacheRunning(),
		isDatabaseRunning: await isDatabaseRunning(),
	} as HealthCheckResponse;
}
