/* eslint-disable @typescript-eslint/no-explicit-any */
import { dataSource } from '../../../db/datasource';
import { getAllTechnologies } from './get-all-technologies';

jest.mock('../../../cache/cache', () => ({
	useCache: (key, callback) => callback(),
}));

const MOCK_REQUEST: any = {};
const MOCK_RESPONSE: any = {
	status: jest.fn(),
	json: jest.fn(),
};
const MOCK_NEXT_FN = jest.fn();

const MOCK_REPOSITORY: any = {
	find: jest.fn(),
};

describe(getAllTechnologies.name, () => {
	beforeEach(() => {
		jest.spyOn(dataSource, 'getRepository').mockReturnValue(MOCK_REPOSITORY);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it(`Calls the 'next()' function with the error, if the database request rejects`, async () => {
		MOCK_REPOSITORY.find.mockRejectedValue(new Error('Test'));

		await getAllTechnologies(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(1);
		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(new Error('Test'));
	});

	it(`Returns with status 200 and the values returned from the database`, async () => {
		MOCK_REPOSITORY.find.mockResolvedValue([]);
		MOCK_RESPONSE.status.mockReturnValue(MOCK_RESPONSE);

		await getAllTechnologies(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_RESPONSE.status).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(200);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith([]);

		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(0);
	});
});
