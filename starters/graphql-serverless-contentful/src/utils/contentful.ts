import { createClient } from 'contentful-management';
import * as dotenv from 'dotenv';

// load dotenv config
dotenv.config();

export const client = createClient({
	accessToken: `${process.env.CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN}`,
});

export async function getEnvironment() {
	const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
	const environment = await space.getEnvironment(
		`${process.env.CONTENTFUL_ENVIRONMENT}`
	);

	return environment;
}
