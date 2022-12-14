/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	'*': {
		/** * */
		options: {
			/** * */
			responses: {};
		};
	};
	'/health': {
		/** /health */
		get: {
			/** /health */
			responses: {
				/** @description OK */
				200: {
					content: {
						'application/json': {
							/** @example PostgreSQL 15.1 (Debian 15.1-1.pgdg110+1) on aarch64-unknown-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit */
							database?: string;
							/** @example CONNECTED */
							redisCacheConnection?: string;
							redisQueueHealth?: {
								/** @example PONG */
								connection?: string;
								/** @example 0 */
								activeCount?: number;
								/** @example 0 */
								waitingCount?: number;
								/** @example 2 */
								completedCount?: number;
								/** @example 0 */
								failedCount?: number;
							};
						};
					};
				};
			};
		};
	};
	'/technology': {
		/** /technology */
		get: {
			/** /technology */
			responses: {
				/** @description OK */
				200: {
					content: {
						'application/json': {
							id: number;
							displayName: string;
							description: string;
						}[];
					};
				};
			};
		};
		/** /technology */
		post: {
			/** /technology */
			requestBody: components['requestBodies']['Body'];
			responses: {
				/** @description Accepted */
				202: {
					content: {
						'application/json': {
							/** @example 12 */
							id?: number;
						};
					};
				};
			};
		};
	};
	'/technology/{technologyId}': {
		/** /technology/{technologyId} */
		get: {
			/** /technology/{technologyId} */
			parameters: {
				path: {
					technologyId: string;
				};
			};
			responses: {
				/** @description OK */
				200: {
					content: {
						'*/*': {
							id: number;
							displayName: string;
							description: string;
						};
					};
				};
			};
		};
		/** /technology/{technologyId} */
		put: {
			/** /technology/{technologyId} */
			parameters: {
				path: {
					technologyId: string;
				};
			};
			requestBody: components['requestBodies']['Body'];
			responses: {
				/** @description Accepted */
				200: {
					content: {
						'*/*': {
							/** @example 12 */
							id?: number;
						};
					};
				};
			};
		};
		/** /technology/{technologyId} */
		delete: {
			/** /technology/{technologyId} */
			parameters: {
				path: {
					technologyId: string;
				};
			};
			responses: {
				/** @description Accepted */
				200: {
					content: {
						'*/*': {
							/** @example 12 */
							id?: number;
						};
					};
				};
			};
		};
	};
	'/queue': {
		/** /queue */
		post: {
			/** /queue */
			requestBody: {
				content: {
					'application/json': {
						/** @example It can be anything */
						data?: string;
					};
				};
			};
			responses: {
				/** @description OK */
				200: {
					content: {
						'application/json': {
							/** @example 6 */
							jobId?: string;
						};
					};
				};
			};
		};
	};
}

export type webhooks = Record<string, never>;

export interface components {
	schemas: never;
	responses: never;
	parameters: never;
	requestBodies: {
		Body: {
			content: {
				'application/json': {
					/** @example BullMQ */
					displayName?: string;
					/** @example A javascript library that leverages Redis to set up queues */
					description?: string;
				};
			};
		};
	};
	headers: never;
	pathItems: never;
}

export type external = Record<string, never>;

export type operations = Record<string, never>;
