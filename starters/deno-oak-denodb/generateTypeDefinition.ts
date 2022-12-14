import { CodegenConfig, generate } from 'npm:@graphql-codegen/cli';
import 'npm:@graphql-codegen/typescript';
import 'npm:@graphql-codegen/typescript-resolvers';

const config: CodegenConfig = {
	schema: './src/graphql/schema/technology.ts',
	generates: {
		'./src/graphql/interfaces/codegen.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				avoidOptionals: true,
			},
		},
	},
};


const execute = async() => {
	await generate(config);
}
execute();
