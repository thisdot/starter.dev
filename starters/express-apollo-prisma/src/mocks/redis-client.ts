import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { RedisClient } from '../lib/cache/redis';

export const createMockRedisClient = (): DeepMockProxy<RedisClient> => mockDeep<RedisClient>();
