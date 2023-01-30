import type { AWS } from '@serverless/typescript';
import { StatusCodes } from 'http-status-codes';

const serverlessConfiguration: AWS = {
	service: 'serverless-framework-sqs-dynamodb',
	frameworkVersion: '3',
	useDotenv: true,
	plugins: [
		'serverless-auto-swagger',
		'serverless-esbuild',
		'serverless-analyze-bundle-plugin',
		'serverless-dynamodb-local',
		'serverless-offline-dynamodb-streams',
		'serverless-offline-sqs',
		'serverless-offline',
	],
	custom: {
		'autoswagger': {
			excludeStages: ['production'],
		},
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
			packager: 'npm',
			plugins: './esbuild-plugins.ts',
			bundle: true,
			minify: true,
			sourcemap: true,
		},
		'serverless-offline': {
			httpPort: 4000,
			lambdaPort: 4002,
			reloadHandler: true,
		},
		'serverless-offline-dynamodb-streams': {
			apiVersion: '2015-03-31',
			endpoint: 'http://0.0.0.0:8000',
			region: '${aws:region}',
			accessKeyId: 'root',
			secretAccessKey: 'root',
			skipCacheInvalidation: false,
			readInterval: 500,
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
			DEFAULT_CACHE_TIME: '${env:DEFAULT_CACHE_TIME}',
			REDIS_CACHE_URL: '${env:REDIS_CACHE_URL}',
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
							'dynamodb:ListTables',
							'dynamodb:Scan',
							'dynamodb:Query',
							'dynamodb:GetItem',
							'dynamodb:PutItem',
							'dynamodb:UpdateItem',
						],
						Resource: 'arn:aws:dynamodb:*:*:table/${param:technologiesTable}',
					},
					{
						Effect: 'Allow',
						Action: ['sqs:ListQueues', 'sqs:CreateQueue', 'sqs:SendMessage', 'sqs:GetQueueUrl'],
						Resource: 'arn:aws:sqs:*:*:*',
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
						// @ts-expect-error Swagger Types not in main ts type
						responseData: {
							[StatusCodes.OK]: {
								description: 'All systems ready to use',
							},
							[StatusCodes.SERVICE_UNAVAILABLE]: {
								description: 'Systems are not operating correctly',
							},
						},
					},
				},
			],
		},
		technology_index: {
			handler: 'src/handlers/technology_index.handler',
			events: [
				{
					httpApi: {
						path: '/technology',
						method: 'get',
						// @ts-expect-error Swagger Types not in main ts type
						responseData: {
							[StatusCodes.OK]: {
								description: 'Fetched Technologies Successfully',
								bodyType: 'Technologies',
							},
						},
						swaggerTags: ['Technology'],
					},
				},
			],
		},
		technology_create: {
			handler: 'src/handlers/technology_create.handler',
			events: [
				{
					httpApi: {
						path: '/technology',
						method: 'post',
						// @ts-expect-error Swagger Types not in main ts type
						bodyType: 'TechnologyCreateBody',
						responseData: {
							[StatusCodes.CREATED]: {
								description: 'Technology Successfully Created',
								bodyType: 'Technology',
							},
							[StatusCodes.BAD_REQUEST]: {
								description: 'Failed to create Technology',
								bodyType: 'TechnologyCreateFormError',
							},
							[StatusCodes.INTERNAL_SERVER_ERROR]: {
								description: 'Server Error',
							},
						},
						swaggerTags: ['Technology'],
					},
				},
			],
		},
		technology_show: {
			handler: 'src/handlers/technology_show.handler',
			events: [
				{
					httpApi: {
						path: '/technology/{id}',
						method: 'get',
						// @ts-expect-error Swagger Types not in main ts type
						responseData: {
							[StatusCodes.OK]: {
								description: 'Fetched Technology Successfully',
								bodyType: 'Technology',
							},
							[StatusCodes.BAD_REQUEST]: {
								description: 'Invalid Request',
							},
							[StatusCodes.NOT_FOUND]: {
								description: 'Technology Not Found',
							},
							[StatusCodes.INTERNAL_SERVER_ERROR]: {
								description: 'Server Error',
							},
						},
						swaggerTags: ['Technology'],
					},
				},
			],
		},
		technology_update: {
			handler: 'src/handlers/technology_update.handler',
			events: [
				{
					httpApi: {
						path: '/technology/{id}',
						method: 'put',
						// @ts-expect-error Swagger Types not in main ts type
						bodyType: 'TechnologyUpdateBody',
						responseData: {
							[StatusCodes.OK]: {
								description: 'Technology Successfully Updated',
								bodyType: 'Technology',
							},
							[StatusCodes.BAD_REQUEST]: {
								description: 'Invalid Request',
								bodyType: 'TechnologyUpdateFormError',
							},
							[StatusCodes.NOT_FOUND]: {
								description: 'Technology Not Found',
							},
							[StatusCodes.INTERNAL_SERVER_ERROR]: {
								description: 'Server Error',
							},
						},
						swaggerTags: ['Technology'],
					},
				},
			],
		},
		technology_destroy: {
			handler: 'src/handlers/technology_destroy.handler',
			events: [
				{
					httpApi: {
						path: '/technology/{id}',
						method: 'delete',
						// @ts-expect-error Swagger Types not in main ts type
						responseData: {
							[StatusCodes.OK]: {
								description: 'Technology Successfully Deleted',
								bodyType: 'Technology',
							},
							[StatusCodes.BAD_REQUEST]: {
								description: 'Invalid Request',
							},
							[StatusCodes.INTERNAL_SERVER_ERROR]: {
								description: 'Server Error',
							},
						},
						swaggerTags: ['Technology'],
					},
				},
			],
		},
		generate_job: {
			handler: 'src/handlers/generate_job.handler',
			events: [
				{
					httpApi: {
						path: '/generate_job',
						method: 'post',
						// @ts-expect-error Swagger Types not in main ts type
						responseData: {
							[StatusCodes.CREATED]: {
								description: 'Job Generated',
							},
							[StatusCodes.BAD_REQUEST]: {
								description: 'Failed to generate job',
							},
						},
					},
				},
			],
		},
		example_job_processor: {
			handler: 'src/handlers/example_job_processor.handler',
			events: [
				{
					sqs: {
						arn: {
							'Fn::GetAtt': ['ExampleQueue', 'Arn'],
						},
					},
				},
			],
		},
		example_stream_processor: {
			handler: 'src/handlers/example_stream_processor.handler',
			events: [
				{
					stream: {
						type: 'dynamodb',
						arn: {
							'Fn::GetAtt': ['technologiesTable', 'StreamArn'],
						},
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
					StreamSpecification: {
						StreamViewType: 'NEW_AND_OLD_IMAGES',
					},
				},
			},
			ExampleQueue: {
				Type: 'AWS::SQS::Queue',
				Properties: {
					QueueName: 'ExampleQueue',
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
