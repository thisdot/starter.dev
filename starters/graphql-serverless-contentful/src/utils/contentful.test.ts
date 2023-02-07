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

it('getEnvironment', async () => {
	expect(await getEnvironment()).toBe(dummyEnvironment);
	expect(await getEnvironment()).not.toBe({});
});
