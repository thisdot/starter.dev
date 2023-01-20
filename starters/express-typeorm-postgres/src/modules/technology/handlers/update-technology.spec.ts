/* eslint-disable @typescript-eslint/no-explicit-any */
import { dataSource } from '../../../db/datasource';
import { updateTechnology } from './update-technology';

jest.mock('../../../cache/cache', () => ({
	clearCacheEntry: () => void 0,
}));

const MOCK_REQUEST: any = {
	params: {
		technologyId: '1',
	},
	body: {
		name: 'Jest',
	},
};
const MOCK_RESPONSE: any = {
	status: jest.fn(),
	json: jest.fn(),
};
const MOCK_NEXT_FN = jest.fn();

const MOCK_REPOSITORY: any = {
	update: jest.fn(),
};

const MOCK_TECHNOLOGY = { id: 1, technology: 'Jest ' };

describe(updateTechnology.name, () => {
	beforeEach(() => {
		jest.spyOn(dataSource, 'getRepository').mockReturnValue(MOCK_REPOSITORY);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it(`Calls the 'next()' function with the error, if the database request rejects`, async () => {
		MOCK_REPOSITORY.update.mockRejectedValue(new Error('Test'));

		await updateTechnology(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(1);
		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(new Error('Test'));
	});

	it(`Returns with 200 status code and with the updated technology`, async () => {
		MOCK_REPOSITORY.update.mockResolvedValue({ raw: [] });
		MOCK_RESPONSE.status.mockReturnValue(MOCK_RESPONSE);

		await updateTechnology(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_RESPONSE.status).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(200);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith({ id: MOCK_TECHNOLOGY.id });
		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(0);
	});
});
