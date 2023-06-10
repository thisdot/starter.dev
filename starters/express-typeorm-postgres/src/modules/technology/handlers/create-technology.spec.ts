/* eslint-disable @typescript-eslint/no-explicit-any */
import { dataSource } from '../../../db/datasource';
import { createTechnology } from './create-technology';

jest.mock('../../../cache/cache', () => ({
	clearCacheEntry: () => void 0,
}));

const MOCK_REQUEST: any = {
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
	insert: jest.fn(),
};

const MOCK_TECHNOLOGY = { id: 1, technology: 'Jest ' };

describe(createTechnology.name, () => {
	beforeEach(() => {
		jest.spyOn(dataSource, 'getRepository').mockReturnValue(MOCK_REPOSITORY);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it(`Calls the 'next()' function with the error, if the database request rejects`, async () => {
		MOCK_REPOSITORY.insert.mockRejectedValue(new Error('Test'));

		await createTechnology(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(1);
		expect(MOCK_NEXT_FN).toHaveBeenCalledWith(new Error('Test'));
	});

	it(`Returns with 200 status code and with the inserted technology`, async () => {
		MOCK_REPOSITORY.insert.mockResolvedValue({ raw: [MOCK_TECHNOLOGY] });
		MOCK_RESPONSE.status.mockReturnValue(MOCK_RESPONSE);

		await createTechnology(MOCK_REQUEST, MOCK_RESPONSE, MOCK_NEXT_FN);

		expect(MOCK_RESPONSE.status).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.status).toHaveBeenCalledWith(202);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledTimes(1);
		expect(MOCK_RESPONSE.json).toHaveBeenCalledWith({ id: MOCK_TECHNOLOGY.id });
		expect(MOCK_NEXT_FN).toHaveBeenCalledTimes(0);
	});
});
