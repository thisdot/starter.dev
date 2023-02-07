import { Environment } from 'contentful-management';
import { getEnvironment } from './contentful';

const dummyEnvironment = {
	accessToken: 'DUMMYTOKEN',
};
jest.mock('contentful-management', () => {
	const contentfulManagement = jest.requireActual('contentful-management');

	return {
		...contentfulManagement,
		createClient: (
			...args: Parameters<typeof contentfulManagement.createClient>
		) => {
			return {
				...contentfulManagement.createClient(...args),
				getSpace: jest.fn().mockResolvedValue(() => {
					return {
						getEnvironment: jest.fn().mockResolvedValue(dummyEnvironment),
					};
				}),
			};
		},
	};
});

describe('.getEnviroment', () => {
	let environment: Environment;

	beforeAll(async () => {
		environment = await getEnvironment();
	});

	it('returns expected result', () => {
		expect(environment).toBe(dummyEnvironment);
	});
});
