import { CodegenConfig, generate } from 'npm:@graphql-codegen/cli';
import 'npm:@graphql-codegen/typescript';
import 'npm:@graphql-codegen/typescript-resolvers';

const config: CodegenConfig = {
	schema: './src/graphql/schema/technology.ts',
	generates: {
		'./src/graphql/interfaces/codegen.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
	},
};

const execute = async () => {
	await generate(config);

	// The generated file includes an import, which imports a type from graphql npm package,
	// So we read the file and replace the import with the same type in our deps.ts file.
	const codeGenFileContent = Deno.readTextFileSync('./src/graphql/interfaces/codegen.ts');
	const codeGenWithFixedImports = codeGenFileContent.replace(`import { GraphQLResolveInfo } from 'graphql';`, `import { GraphQLResolveInfo } from '../../../deps.ts';`);
	Deno.writeTextFileSync('./src/graphql/interfaces/codegen.ts', `// deno-lint-ignore-file\n${codeGenWithFixedImports}`);
};

execute();
