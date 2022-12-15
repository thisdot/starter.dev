/* eslint-disable @typescript-eslint/no-explicit-any */
import { dataSource } from '../../../db/datasource';
import { getTechnology } from './get-technology';

jest.mock('../../../cache/cache', () => ({
	useCache: (key, callback) => callback(),
}));

const MOCK_REQUEST: any = {
	params: {
		technologyId: '1',
	},
};
const MOCK_RESPONSE: any = {
	status: jest.fn(),
	json: jest.fn(),
};
const MOCK_NEXT_FN = jest.fn();

const MOCK_REPOSITORY: any = {
	findOne: jest.fn(),
};

const MOCK_TECHNOLOGY = { id: 1, technology: 'jest ' };

describe(getTechnology.name, () => {
	beforeEach(() => {
		jest.spyOn(dataSource, 'getRepository').mockReturnValue(MOCK_REPOSITORY);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it(`Calls the 'next()' function with the error, if the database request rejects`, async () => {
		MOCK_REPOSITORY.findOne.mockRejectedValue(new Error('Test'));

		await getTechnology(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(1);
		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(new Error('Test'));
	});

	it(`Returns with 200 status code and with the retrieved technology`, async () => {
		MOCK_REPOSITORY.findOne.mockResolvedValue(MOCK_TECHNOLOGY);

		await getTechnology(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_RESPONSE.json).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith(MOCK_TECHNOLOGY);
		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(0);
	});

	it(`Returns with 404 status code and a corresponding error message when there is no entry in the database`, async () => {
		MOCK_REPOSITORY.findOne.mockResolvedValue(null);
		MOCK_RESPONSE.status.mockReturnValue(MOCK_RESPONSE);

		await getTechnology(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_RESPONSE.status).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(404);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith({
			error: 'Not Found',
			details: `Could not find technology with id: ${MOCK_TECHNOLOGY.id}`,
		});
		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(0);
	});
});
