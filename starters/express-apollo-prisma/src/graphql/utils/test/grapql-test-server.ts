import {
	ExecuteOperationOptions,
	GraphQLRequest,
	GraphQLResponse,
	VariableValues,
} from '@apollo/server/dist/esm/externalTypes/graphql';
import { DocumentNode, TypedQueryDocumentNode } from 'graphql';
import { graphqlServer } from '../../graphql-server';
import { ServerContext } from '../../server-context';
import { createMockTechnologyDataSource } from './technology-data-source';

const createMockDefaultContext = (): ServerContext => ({
	dataSources: {
		technologyDataSource: createMockTechnologyDataSource(),
	},
});

export const testServerExecuteOperation = async <
	TData = Record<string, unknown>,
	TVariables extends VariableValues = VariableValues
>(
	request: Omit<GraphQLRequest<TVariables>, 'query'> & {
		query?: string | DocumentNode | TypedQueryDocumentNode<TData, TVariables>;
	},
	contextValue?: ServerContext
): Promise<GraphQLResponse<TData>> => {
	const executeOperationOptions: ExecuteOperationOptions<ServerContext> = {
		contextValue: contextValue ?? createMockDefaultContext(),
	};
	return await graphqlServer.executeOperation(request, executeOperationOptions);
};
