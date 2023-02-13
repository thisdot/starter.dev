import { APIGatewayProxyHandler } from "aws-lambda";
import { redisClient } from "../utils/redis";

type HealthCheckResult = {
	cacheDatabase: boolean;
};

export const handler: APIGatewayProxyHandler = async () => {
	let cacheDatabase: boolean;
	try {
		await redisClient.get("");
		cacheDatabase = true;
	} catch {
		cacheDatabase = false;
	}


	const result: HealthCheckResult = {
		cacheDatabase
	};

	const hasFailedCheck = Object.values(result).includes(false);
	const statusCode = hasFailedCheck ? 503 : 200;
	return {
		statusCode: statusCode,
		body: JSON.stringify(result),
		headers: {
			"Content-Type": "application/json"
		}
	};
};
