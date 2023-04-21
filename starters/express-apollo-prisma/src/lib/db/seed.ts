import { PrismaClient, Prisma } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const RECORDS: Prisma.TechnologyEntityCreateInput[] = [
	{
		displayName: 'Node.js',
		description: 'JavaScript runtime built on Chrome V8 JavaScript engine',
		url: 'https://nodejs.org/',
	},
	{
		displayName: 'TypeScript',
		description:
			'Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale',
		url: 'https://www.typescriptlang.org/',
	},
	{
		displayName: 'Nodemon',
		description:
			'Simple monitor utility for use during development of a Node.js app, that will monitor for any changes in your source and automatically restart your server',
		url: 'https://nodemon.io/',
	},
	{
		displayName: 'Express',
		description: 'Fast, unopinionated, minimalist web framework for Node.js',
		url: 'https://expressjs.com/',
	},
	{
		displayName: 'Apollo GrapQL',
		description: 'The GraphQL developer platform',
		url: 'https://www.apollographql.com/',
	},
	{
		displayName: 'Prisma',
		description: 'Next-generation Node.js and TypeScript ORM',
		url: 'https://www.prisma.io/',
	},
	{
		displayName: 'Redis',
		description:
			'The open source, in-memory data store used by millions of developers as a database, cache, streaming engine, and message broker',
		url: 'https://redis.io/',
	},
	{
		displayName: 'RabbitMQ',
		description: 'Open source message broker',
		url: 'https://www.rabbitmq.com/',
	},
	{
		displayName: 'Jest',
		description: 'JavaScript Testing Framework with a focus on simplicity',
		url: 'https://jestjs.io/',
	},
	{
		displayName: 'Docker',
		description: 'Platform designed to help developers build, share, and run modern applications',
		url: 'https://www.docker.com/',
	},
	{
		displayName: 'Prettier',
		description: 'Opinionated Code Formatter',
		url: 'https://prettier.io/',
	},
];

async function main() {
	const promises = RECORDS.map((record) =>
		prisma.technologyEntity.upsert({
			where: { displayName: record.displayName },
			update: {},
			create: record,
		})
	);
	const results = await Promise.all(promises);
	console.log(`Seeding completed successfully:`, results);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
