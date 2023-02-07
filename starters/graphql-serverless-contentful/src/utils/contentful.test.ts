import { Environment } from 'contentful-management';
import { getEnvironment } from './contentful';

const dummyEnvironment = {
	accessToken: 'DUMMYTOKEN',
};

jest.mock('contentful-management', () => ({
	createClient: () => ({
		getSpace: () => ({
			getEnvironment: jest.fn().mockResolvedValue(dummyEnvironment),
		}),
	}),
}));

describe('.getEnviroment', () => {
	let environment: Environment;

	beforeAll(async () => {
		environment = await getEnvironment();
	});

	it('returns expected result', () => {
		expect(environment).toBe(dummyEnvironment);
	});
});
