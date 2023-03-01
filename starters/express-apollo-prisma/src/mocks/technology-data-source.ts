import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { TechnologyDataSource } from '../graphql/data-sources';

export const createMockTechnologyDataSource = (): DeepMockProxy<TechnologyDataSource> =>
	mockDeep<TechnologyDataSource>();
