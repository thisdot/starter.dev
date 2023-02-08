import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { RedisClient } from '../cache/redis';

export const createMockRedisClient = (): DeepMockProxy<RedisClient> => mockDeep<RedisClient>();
