import { TechnologyDataSource } from '../../data-sources';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export const createMockTechnologyDataSource = (): DeepMockProxy<TechnologyDataSource> =>
	mockDeep<TechnologyDataSource>();
