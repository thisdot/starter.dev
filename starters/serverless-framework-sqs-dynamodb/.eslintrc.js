module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	overrides: [
		{
			files: ['**/*.test.ts', 'jest.setupEnvironment.js'],
			env: {
				jest: true,
			},
			rules: {
				'no-unused-expressions': 'off',
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'import', 'promise'],
	rules: {
		'array-callback-return': 'error',
		'block-scoped-var': 'error',
		'camelcase': ['error', { properties: 'never' }],
		'consistent-return': 'error',
		'curly': ['error', 'multi-line'],
		'dot-notation': 'error',
		'eqeqeq': ['error', 'allow-null'],
		'guard-for-in': 'error',
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'new-cap': 'error',
		'no-array-constructor': 'error',
		'no-caller': 'error',
		'no-confusing-arrow': ['error', { allowParens: false }],
		'no-duplicate-imports': 'error',
		'no-else-return': 'error',
		'no-eval': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-implied-eval': 'error',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-loop-func': 'error',
		'no-multi-str': 'error',
		'no-nested-ternary': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-wrappers': 'error',
		'no-octal-escape': 'error',
		'no-proto': 'error',
		'no-restricted-syntax': ['error', 'ForInStatement', 'WithStatement'],
		'no-return-assign': 'error',
		'no-script-url': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-shadow': 'error',
		'no-throw-literal': 'error',
		'no-undef-init': 'error',
		'no-unneeded-ternary': ['error'],
		'no-unused-expressions': ['error'],
		'no-unused-vars': ['error', { vars: 'local', args: 'after-used' }],
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'error',
		'no-useless-constructor': 'error',
		'no-useless-rename': [
			'error',
			{ ignoreDestructuring: false, ignoreImport: false, ignoreExport: false },
		],
		'no-var': 'error',
		'no-void': 'error',
		'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
		'one-var': ['error', 'never'],
		'operator-assignment': ['error', 'always'],
		'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
		'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: true }],
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'quotes': ['error', 'single', { avoidEscape: true }],
		'radix': 'error',
		'require-atomic-updates': 'off', // Reports false positives: https://github.com/eslint/eslint/issues/11899
		'semi': ['error', 'always'],
		'spaced-comment': ['error', 'always'],
		'strict': ['error', 'safe'],
		'vars-on-top': 'error',
		'yoda': 'error',

		// import plugin settings
		'import/export': 'error',
		'import/first': ['error', 'absolute-first'],
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/*.test.ts',
					'prettier.config.js',
					'jest.config.ts',
					'jest.setup.ts',
					'esbuild-plugins.ts',
				],
			},
		],
		'import/no-mutable-exports': 'error',
		'import/no-named-as-default': 'error',
		'import/no-named-as-default-member': 'error',
		'import/no-unresolved': ['error', { commonjs: false }],

		// typescript settings
		'@typescript-eslint/no-empty-function': 'off',
	},
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
};