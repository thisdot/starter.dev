import { Channel, Connection } from 'amqplib';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export const createMockConnection = (): DeepMockProxy<Connection> => mockDeep<Connection>();
export const createMockChannel = (): DeepMockProxy<Channel> => mockDeep<Channel>();
