const MOCK_ASSERT_EXCHANGE = jest.fn();
const MOCK_ASSERT_QUEUE = jest.fn();
const MOCK_BIND_QUEUE = jest.fn();
const MOCK_PUBLISH = jest.fn();

export const createMockQueueChannel = () => {
	return jest.fn(() =>
		Promise.resolve({
			assertExchange: MOCK_ASSERT_EXCHANGE,
			assertQueue: MOCK_ASSERT_QUEUE,
			bindQueue: MOCK_BIND_QUEUE,
			publish: MOCK_PUBLISH,
		})
	);
};

export { MOCK_ASSERT_EXCHANGE, MOCK_ASSERT_QUEUE, MOCK_BIND_QUEUE, MOCK_PUBLISH };
