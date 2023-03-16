import { create } from '../src/models/Technology';
import * as dotenv from 'dotenv';

// load dotenv config
dotenv.config();

// Add some dummy data to the database
(async () => {
	console.log('Seeding database...');

	await create({
		displayName: 'GraphQL',
		description:
			'GraphQL provides a strong-typing system to better understand and utilize our API to retrieve and interact with our data.',
		url: 'https://graphql.framework.dev/',
	});
	await create({
		displayName: 'Node.js',
		description: 'Node.js® is an open-source, cross-platform JavaScript runtime environment.',
		url: 'https://nodejs.framework.dev/',
	});
	await create({
		displayName: 'Express',
		description: 'Express is a minimal and flexible Node.js web application framework.',
		url: 'https://www.npmjs.com/package/express',
	});

	console.log('Database seeded!');
})();
