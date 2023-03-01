import { getEnvironment } from './contentful';
import { getContentfulHealth } from './contentful-healthcheck';

const MOCK_GET_ENVIRONMENT = getEnvironment as jest.Mock;
jest.mock('./contentful', () => ({
	getEnvironment: jest.fn(),
}));

describe('.healthcheck', () => {
	describe('when connection is successful', () => {
		let result: boolean;
		beforeAll(async () => {
			MOCK_GET_ENVIRONMENT.mockResolvedValue({});
			result = await getContentfulHealth();
		});
		it('should return 200', () => {
			expect(result).toEqual(true);
		});
	});
	describe('when connection is unsuccessful', () => {
		let result: boolean;
		beforeAll(async () => {
			MOCK_GET_ENVIRONMENT.mockRejectedValue(undefined);
			result = await getContentfulHealth();
		});
		it('should return 500', () => {
			expect(result).toEqual(false);
		});
	});
});
