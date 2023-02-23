import { createClient, Environment } from 'contentful-management';
import { getEnvironment } from './contentful';

const dummyEnvironment = {
	accessToken: 'DUMMYTOKEN',
};

const mockCreateClient = createClient as jest.Mock;

jest.mock('contentful-management', () => ({
	createClient: jest.fn().mockReturnValue({
		getSpace: jest.fn().mockResolvedValue({
			getEnvironment: jest.fn().mockResolvedValue({
				accessToken: 'DUMMYTOKEN',
			}),
		}),
	}),
}));

describe('.getEnviroment', () => {
	let environment: Environment;
	let mockGetSpace: jest.Mock;
	beforeAll(async () => {
		environment = await getEnvironment();
	});

	it('calls create client with expected arguments', () => {
		expect(mockCreateClient).toHaveBeenCalledTimes(1);
		expect(mockCreateClient).toHaveBeenCalledWith({
			accessToken: 'MOCK_CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN',
		});
	});

	it('calls getSpace function from created client result with expected argument', () => {
		mockGetSpace = mockCreateClient.mock.results[0].value.getSpace;
		expect(mockGetSpace).toHaveBeenCalledTimes(1);
		expect(mockGetSpace).toHaveBeenCalledWith('MOCK_CONTENTFUL_SPACE_ID');
	});

	it('calls getEnvironment function from space result with expected argument', async () => {
		const mockGetSpaceResult = await mockGetSpace.mock.results[0].value;
		const mockGetEnvironment = mockGetSpaceResult.getEnvironment;
		expect(mockGetEnvironment).toHaveBeenCalledTimes(1);
		expect(mockGetEnvironment).toHaveBeenCalledWith(
			'MOCK_CONTENTFUL_ENVIRONMENT'
		);
	});

	it('returns expected result', () => {
		expect(environment).toEqual(dummyEnvironment);
	});
});
