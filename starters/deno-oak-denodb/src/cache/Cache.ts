import {
	Context,
	graphql,
	GraphQLSchema,
	makeExecutableSchema,
	Middleware,
	Redis,
	renderPlaygroundPage,
	Router,
	SetOpts,
} from '../../deps.ts';

type GetFreshValue<Value> = {
	(): Promise<Value> | Value;
};

type ArgsType = {
	schema: {
		typeDefs: any;
		resolvers: any;
	};
	redisClient: Redis;
	usePlayground: boolean;
	route: string;
	defaultEx?: number | undefined;
};

export class Cache {
	usePlayground: boolean;
	redisClient!: Redis;
	schema!: GraphQLSchema;
	router: Router;
	route: string;
	defaultEx: number | undefined;
	constructor(
		{ schema, redisClient, usePlayground = false, route = '/graphql', defaultEx }: ArgsType,
	) {
		this.schema = makeExecutableSchema({
			typeDefs: schema.typeDefs,
			resolvers: schema.resolvers,
		});
		this.redisClient = redisClient;
		this.usePlayground = usePlayground;
		this.router = new Router();
		this.route = route;
		this.defaultEx = defaultEx;
	}

	async cache<Value>(
		{ cacheKey, ex }: { cacheKey: string; ex?: number },
		callback: GetFreshValue<Value>,
	) {
		const cacheValue = await this.redisClient.get(cacheKey);
		if (cacheValue) {
			return JSON.parse(cacheValue);
		}

		const results = await callback();
		if (results === null || results === undefined) {
			console.error(
				'%cError: result of callback provided to DenoStore cache function cannot be undefined or null',
				'font-weight: bold; color: white; background-color: red;',
			);
			throw new Error('Error: Query error. See server console.');
		}

		// redis caching options
		let opts: SetOpts | undefined;

		// if positive expire argument specified, set expire time in options
		if (ex) {
			if (ex > 0) opts = { ex: ex };
			// else set default expire time in options if provided
		} else if (this.defaultEx) {
			opts = { ex: this.defaultEx };
		}

		if (opts) {
			await this.redisClient.set(cacheKey, JSON.stringify(results), opts);
		} else {
			await this.redisClient.set(cacheKey, JSON.stringify(results));
		}

		return results;
	}

	async clearAllCache(): Promise<void> {
		await this.redisClient.flushall();
	}

	async deleteCache(cacheKey: string) {
		await this.redisClient.del(cacheKey);
	}

	routes(): Middleware {
		if (this.usePlayground) {
			this.renderPlayGroundIDE();
		}
		this.handleGraphqlQueries();

		return this.router.routes();
	}

	allowedMethods(): Middleware {
		return this.router.allowedMethods();
	}

	private async graphqlExecutionResult(query: any, variables: any) {
		return await graphql({
			schema: this.schema,
			source: query,
			contextValue: { ds: this },
			variableValues: variables,
		});
	}

	private renderPlayGroundIDE() {
		this.router.get(this.route, (ctx: Context): void => {
			const { request, response } = ctx;
			try {
				const playground = renderPlaygroundPage({
					endpoint: request.url.origin + this.route,
				});
				response.status = 200;
				response.body = playground;
				return;
			} catch (err) {
				console.error(`%cError: ${err}`, 'font-weight: bold; color: white; background-color: red;');
				response.status = 500;
				response.body = 'Problem rendering GraphQL Playground IDE';
				throw err;
			}
		});
	}

	private handleGraphqlQueries() {
		this.router.post(this.route, async (ctx: Context): Promise<void> => {
			const { response, request } = ctx;
			try {
				const { query, variables } = await request.body().value;
				const graphqlResults = await this.graphqlExecutionResult(query, variables);
				// if errors delete results data
				if (graphqlResults.errors) delete graphqlResults.data;
				response.status = graphqlResults.errors ? 500 : 200;
				response.body = graphqlResults;
				return;
			} catch (err) {
				console.error(
					`%cError: error finding query on provided route.
        \nReceived error: ${err}`,
					'font-weight: bold; color: white; background-color: red;',
				);
				throw err;
			}
		});
	}
}
