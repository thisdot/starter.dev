import { MockProxy, mock } from 'jest-mock-extended';
import { TechnologyDataSource } from '../graphql/data-sources';

export const createMockTechnologyDataSource = (): MockProxy<TechnologyDataSource> =>
	mock<TechnologyDataSource>();
