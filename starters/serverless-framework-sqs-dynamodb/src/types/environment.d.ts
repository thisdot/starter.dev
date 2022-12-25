declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REGION: string;
			SLS_STAGE: string;

			REDIS_CACHE_URL: string;
			TECHNOLOGIES_TABLE: string;
		}
	}
}

export {};
