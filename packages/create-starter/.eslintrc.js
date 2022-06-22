/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  env: {
    node: true,
    browser: false,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2019',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['**/node_modules', '**/dist'],
  rules: {},
};
