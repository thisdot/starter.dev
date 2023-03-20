import { ExpressMiddlewareOptions } from '@apollo/server/dist/esm/express4';
import { WithRequired } from '@apollo/utils.withrequired';
import { mock, MockProxy } from 'jest-mock-extended';
import { ServerContext } from '../graphql/server-context';
import {
	ExecuteOperationOptions,
	GraphQLRequest,
	GraphQLResponse,
	VariableValues,
} from '@apollo/server/dist/esm/externalTypes/graphql';
import { DocumentNode, TypedQueryDocumentNode } from 'graphql';
import { graphqlServer } from '../graphql';
import { createMockTechnologyDataSource } from './technology-entity';

export const createMockExpressMiddlewareOptions = (): MockProxy<
	WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>
> => mock<WithRequired<ExpressMiddlewareOptions<ServerContext>, 'context'>>();

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
