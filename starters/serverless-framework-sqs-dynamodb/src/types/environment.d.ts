declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REGION: string;
			SLS_STAGE: string;
			TECHNOLOGIES_TABLE: string;
		}
	}
}

export {};
