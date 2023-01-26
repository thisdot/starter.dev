import { BaseContext } from '@apollo/server';
import { ServerContextDataSources } from './server-context';

export type ServerContext = BaseContext & {
	// custom context properties
	token: string | undefined;
	dataSources: ServerContextDataSources;
};
