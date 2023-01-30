declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REGION: string;
			SLS_STAGE: string;

			DEFAULT_CACHE_TIME: string;
			REDIS_CACHE_URL: string;
			TECHNOLOGIES_TABLE: string;
		}
	}
}

export {};
