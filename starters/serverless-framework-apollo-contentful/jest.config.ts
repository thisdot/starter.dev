import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts'],
	coverageReporters: ['html', 'json', 'lcov', 'text', 'clover'],
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/test/',
		'/mocks/',
		'/index.ts',
		'/index.js',
		'.typedefs.ts',
		'/src/utils/redis/redis.ts',
		'/src/handlers/graphql.ts',
	],
	transform: {
		'\\.[jt]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
	},
	setupFiles: ['<rootDir>/.jest/set-env-vars.ts'],
};

export default config;
