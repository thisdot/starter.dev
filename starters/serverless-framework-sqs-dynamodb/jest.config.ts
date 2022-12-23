/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
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
	preset: 'ts-jest',
	testEnvironment: 'node',
};
