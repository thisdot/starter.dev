import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: './src/schema/index.ts',
	generates: {
		'src/generated/graphql.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: { contextType: '../handlers/graphql#MyContext' },
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
	},
};

export default config;
