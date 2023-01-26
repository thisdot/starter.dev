import { BaseContext } from '@apollo/server';
import { TechnologyDataSource } from '../data-sources/technology-data-source';

export type ServerContextDataSources = {
	technologyDataSource: TechnologyDataSource;
};

export type ServerContext = BaseContext & {
	// custom context properties
	dataSources: ServerContextDataSources;
	token: string | undefined;
};
