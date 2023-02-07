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
				getSpace: () => {
					return {
						getEnvironment: jest.fn().mockReturnValue(dummyEnvironment),
					};
				},
			};
		},
	};
});

describe('getEnviroment', () => {
	let environment: Environment;

	beforeAll(async () => {
		environment = await getEnvironment();
	});

	it('should return the getEnvironment', () => {
		expect(environment).toBe(dummyEnvironment);
		expect(environment).not.toBe({});
	});
});
