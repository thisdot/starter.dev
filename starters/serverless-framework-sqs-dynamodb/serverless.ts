import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
	service: 'serverless-framework-sqs-dynamodb',
	frameworkVersion: '3',
	useDotenv: true,
	plugins: [
		'serverless-esbuild',
		'serverless-analyze-bundle-plugin',
		'serverless-dynamodb-local',
		'serverless-offline',
	],
	custom: {
		'dynamodb': {
			stages: ['dev'],
			start: {
				port: 8000,
				convertEmptyValues: true,
				noStart: true,
			},
			seed: {
				core: {
					sources: [
						{
							table: '${param:technologiesTable}',
							sources: ['./db/technologies-seed.json'],
						},
					],
				},
			},
		},
		'esbuild': {
			packager: 'yarn',
			plugins: './esbuild-plugins.ts',
			bundle: true,
			minify: true,
			sourcemap: true,
		},
		'serverless-offline': {
			httpPort: 4000,
			lambdaPort: 4002,
		},
		'serverless-offline-sqs': {
			autoCreate: true,
			apiVersion: '2012-11-05',
			endpoint: 'http://0.0.0.0:9324',
			region: 'us-east-1',
			accessKeyId: 'root',
			secretAccessKey: 'root',
			skipCacheInvalidation: false,
		},
	},
	package: {
		individually: true,
		patterns: ['src/handlers/*.ts', '!src/handlers/*.test.ts', '!node_modules/**'],
		excludeDevDependencies: true,
	},
	params: {
		production: {
			technologiesTable: 'technologies-production',
		},
		staging: {
			technologiesTable: 'technologies-staging',
		},
		dev: {
			technologiesTable: 'technologies-dev',
		},
	},
	provider: {
		name: 'aws',
		runtime: 'nodejs16.x',
		// profile: '<your profile>', // assumes default aws profile by default
		stage: "${opt:stage, 'dev'}",
		region: "${opt:region, 'us-east-1'}" as AWS['provider']['region'], // Temp fix. See https://github.com/serverless/typescript/issues/11.
		memorySize: 512, // default: 1024MB
		timeout: 29, // default: max allowable for Gateway
		httpApi: {
			// TODO: update to be more restrictive for real apps: https://www.serverless.com/framework/docs/providers/aws/events/http-api/#cors-setup
			cors: true,
		},
		environment: {
			REGION: '${aws:region}',
			SLS_STAGE: '${sls:stage}',
			// DynamoDB Tables
			TECHNOLOGIES_TABLE: '${param:technologiesTable}',
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: ['lambda:InvokeFunction'],
						Resource: 'arn:aws:lambda:*:*:*',
					},
					{
						Effect: 'Allow',
						Action: [
							'dynamodb:Scan',
							'dynamodb:Query',
							'dynamodb:GetItem',
							'dynamodb:PutItem',
							'dynamodb:UpdateItem',
						],
						Resource: 'arn:aws:dynamodb:*:*:table/${param:technologiesTable}',
					},
				],
			},
		},
		tracing: {
			apiGateway: true,
			lambda: true,
		},
	},
	functions: {
		healthcheck: {
			handler: 'src/handlers/healthcheck.handler',
			events: [
				{
					httpApi: {
						path: '/healthcheck',
						method: 'get',
					},
				},
			],
		},
	},
	resources: {
		Resources: {
			technologiesTable: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					TableName: '${param:technologiesTable}',
					AttributeDefinitions: [
						{
							AttributeName: 'id',
							AttributeType: 'S',
						},
					],
					KeySchema: [
						{
							AttributeName: 'id',
							KeyType: 'HASH',
						},
					],
					ProvisionedThroughput: {
						ReadCapacityUnits: 1,
						WriteCapacityUnits: 1,
					},
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
