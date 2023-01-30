import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
	collectCoverage: true,
	coverageDirectory: './coverage',
	coverageReporters: ['html', 'json'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	modulePaths: [compilerOptions.baseUrl],
	modulePathIgnorePatterns: ['<rootDir>/.esbuild/'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['./jest.setup.ts'],
};

export default jestConfig;
