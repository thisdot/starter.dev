import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: './src/graphql/schema/index.ts',
	generates: {
		'src/graphql/schema/generated/types/index.ts': {
			plugins: ['typescript', 'typescript-resolvers', 'typescript-operations'],
			config: {
				namingConvetion: {
					typeNames: 'keep',
					enumValues: 'keep',
				},
			},
		},
		'/src/graphql/schema/generated/graphql.schema.json': {
			plugins: ['introspection'],
		},
		'/src/graphql/schema/generated/schema.graphql': {
			plugins: ['schema-ast'],
			config: {
				includeDirectives: true,
				commentDescriptions: true,
				sort: true,
			},
		},
	},
};

export default config;
