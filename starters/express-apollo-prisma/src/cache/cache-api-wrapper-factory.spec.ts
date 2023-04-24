import { createMockCacheApiWrapper } from '../mocks/cache-api-wrapper';
import { createMockRedisClient } from '../mocks/redis-client';
import { CacheAPIWrapper } from './cache-api-wrapper';
import { createCacheAPIWrapperAsync } from './cache-api-wrapper-factory';
import { connectRedisClient } from './redis';
import { RedisCacheAPIWrapper } from './redis-cache-api-wrapper';
import {
	REDIS_URL as MOCK_REDIS_URL,
	REDIS_CACHE_TTL_SECONDS as MOCK_REDIS_CACHE_TTL_SECONDS,
} from '../config';

jest.mock('../config', () => ({
	REDIS_CACHE_TTL_SECONDS: 123,
	REDIS_URL: 'MOCK_REDIS_URL',
}));

jest.mock('./redis/connect-redis-client', () => ({
	connectRedisClient: jest.fn(),
}));
const MOCK_CONNECT_REDIS_CLIENT = connectRedisClient as jest.MockedFn<typeof connectRedisClient>;

jest.mock('./redis-cache-api-wrapper', () => ({
	RedisCacheAPIWrapper: jest.fn(),
}));
type CacheAPIWrapperType = CacheAPIWrapper<
	{
		[k: string]: string | number | null;
	},
	'id'
> | null;
const MOCK_REDIS_CACHE_API_WRAPPER_CONSTRUCTOR =
	RedisCacheAPIWrapper as unknown as jest.Mock<CacheAPIWrapperType>;

const MOCK_CACHE_KEY_PREFIX = 'MOCK_CACHE_KEY_PREFIX';
const MOCK_REDIS_CLIENT = createMockRedisClient();
const MOCK_CACHE_API_WRAPPER = createMockCacheApiWrapper();

describe('.createCacheAPIWrapperAsync', () => {
	describe('when called', () => {
		describe('and Redis available', () => {
			let result: CacheAPIWrapperType | null;

			beforeAll(async () => {
				MOCK_CONNECT_REDIS_CLIENT.mockResolvedValue(MOCK_REDIS_CLIENT);
				MOCK_REDIS_CACHE_API_WRAPPER_CONSTRUCTOR.mockReturnValue(MOCK_CACHE_API_WRAPPER);

				result = await createCacheAPIWrapperAsync(MOCK_CACHE_KEY_PREFIX);
			});

			afterAll(() => {
				MOCK_CONNECT_REDIS_CLIENT.mockReset();
				MOCK_REDIS_CACHE_API_WRAPPER_CONSTRUCTOR.mockReset();
			});

			it('calls .connectRedisClient once with expected argument', async () => {
				expect(MOCK_CONNECT_REDIS_CLIENT).toHaveBeenCalledTimes(1);
				expect(MOCK_CONNECT_REDIS_CLIENT).toHaveBeenCalledWith(MOCK_REDIS_URL);
			});

			it('calls RedisCacheAPIWrapper constructor with expected arguments', async () => {
				expect(MOCK_REDIS_CACHE_API_WRAPPER_CONSTRUCTOR).toHaveBeenCalledTimes(1);
				expect(MOCK_REDIS_CACHE_API_WRAPPER_CONSTRUCTOR).toHaveBeenCalledWith(
					MOCK_REDIS_CLIENT,
					MOCK_CACHE_KEY_PREFIX,
					MOCK_REDIS_CACHE_TTL_SECONDS
				);
			});

			it('returns expected result', () => {
				expect(result).toBe(MOCK_CACHE_API_WRAPPER);
			});
		});

		describe('and Redis unavailable', () => {
			let result: CacheAPIWrapperType | null;

			beforeAll(async () => {
				MOCK_CONNECT_REDIS_CLIENT.mockResolvedValue(undefined);
				MOCK_REDIS_CACHE_API_WRAPPER_CONSTRUCTOR.mockReturnValue(MOCK_CACHE_API_WRAPPER);

				result = await createCacheAPIWrapperAsync(MOCK_CACHE_KEY_PREFIX);
			});

			afterAll(() => {
				MOCK_CONNECT_REDIS_CLIENT.mockReset();
				MOCK_REDIS_CACHE_API_WRAPPER_CONSTRUCTOR.mockReset();
			});

			it('calls .connectRedisClient once with expected argument', async () => {
				expect(MOCK_CONNECT_REDIS_CLIENT).toHaveBeenCalledTimes(1);
				expect(MOCK_CONNECT_REDIS_CLIENT).toHaveBeenCalledWith(MOCK_REDIS_URL);
			});

			it('returns expected result', () => {
				expect(result).toBe(null);
			});
		});
	});
});
