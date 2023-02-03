import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { RedisClient } from '../redis';

export const createMockRedisClient = (): DeepMockProxy<RedisClient> => mockDeep<RedisClient>();
