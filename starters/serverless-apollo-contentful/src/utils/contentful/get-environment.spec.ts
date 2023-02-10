import { createClient, Environment } from 'contentful-management';
import { getEnvironment } from './get-environment';

jest.mock('contentful-management', () => ({
	createClient: jest.fn().mockReturnValue({
		getSpace: jest.fn().mockResolvedValue({
			getEnvironment: jest.fn().mockResolvedValue({
				accessToken: 'MOCK_ACCESS_TOKEN',
			}),
		}),
	}),
}));

const mockCreateClient = createClient as jest.Mock;

const EXPECTED_RESULT_CONTENTFUL_ENVIRONMENT = {
	accessToken: 'MOCK_ACCESS_TOKEN',
};

describe('.getEnviroment', () => {
	let environment: Environment;
	let mockGetSpace: jest.Mock;
	let mockGetEnvironment: jest.Mock;
	beforeAll(async () => {
		environment = await getEnvironment();
	});

	afterAll(() => {
		mockCreateClient.mockClear();
		mockGetSpace.mockClear();
		mockGetEnvironment.mockClear();
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
		mockGetEnvironment = mockGetSpaceResult.getEnvironment;
		expect(mockGetEnvironment).toHaveBeenCalledTimes(1);
		expect(mockGetEnvironment).toHaveBeenCalledWith(
			'MOCK_CONTENTFUL_ENVIRONMENT'
		);
	});

	it('returns expected result', () => {
		expect(environment).toEqual(EXPECTED_RESULT_CONTENTFUL_ENVIRONMENT);
	});
});
