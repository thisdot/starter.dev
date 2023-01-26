import { TechnologyModel } from "../src/models/TechnologyModel";
import * as dotenv from "dotenv";

// load dotenv config
dotenv.config();

// Add some dummy data to the database
(async () => {
	console.log('Seeding database...');

	await TechnologyModel.create({
		displayName: 'GraphQL',
		description:
			'GraphQL provides a strong-typing system to better understand and utilize our API to retrieve and interact with our data.',
		url: 'https://graphql.framework.dev/',
	});
	await TechnologyModel.create({
		displayName: 'Node.js',
		description:
			'Node.js® is an open-source, cross-platform JavaScript runtime environment.',
		url: 'https://nodejs.framework.dev/',
	});
	await TechnologyModel.create({
		displayName: 'Express',
		description:
			'Express is a minimal and flexible Node.js web application framework.',
		url: 'https://www.npmjs.com/package/express',
	});

	console.log('Database seeded!');
})();
