/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { compilerOptions } = require('./tsconfig');
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(tsx|ts|jsx|js)$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    'remix/link': '<rootDir>/__mockRemix__/Link',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/public/build/',
    '<rootDir>/.cache/'
  ],
};