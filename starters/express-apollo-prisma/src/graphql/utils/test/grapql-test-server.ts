import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';
import {
	ExecuteOperationOptions,
	GraphQLRequest,
	GraphQLResponse,
	VariableValues,
} from '@apollo/server/dist/esm/externalTypes/graphql';
import { Request } from 'express';
import { Response } from 'express-serve-static-core';
import { DocumentNode, TypedQueryDocumentNode } from 'graphql';
import { graphqlServer } from '../../graphql-server';
import { ServerContext, createServerContextMiddlewareOptions } from '../../server-context';

const MOCK_EXPRESS_REQUEST = { headers: {} } as Request;
const MOCK_EXPRESS_RESPONSE = {} as Response;

const MOCK_EXPRESS_CONTEXT_FUNCTION_ARGUMENT: ExpressContextFunctionArgument = {
	req: MOCK_EXPRESS_REQUEST,
	res: MOCK_EXPRESS_RESPONSE,
};

export const serverExecuteOperation = async <
	TData = Record<string, unknown>,
	TVariables extends VariableValues = VariableValues
>(
	request: Omit<GraphQLRequest<TVariables>, 'query'> & {
		query?: string | DocumentNode | TypedQueryDocumentNode<TData, TVariables>;
	},
	options?: ExecuteOperationOptions<ServerContext>
): Promise<GraphQLResponse<TData>> => {
	let executeOperationOptions = options;
	if (!executeOperationOptions) {
		const serverContextMiddlewareOptions = createServerContextMiddlewareOptions();
		const contextValue = await serverContextMiddlewareOptions.context(
			MOCK_EXPRESS_CONTEXT_FUNCTION_ARGUMENT
		);
		executeOperationOptions = {
			contextValue,
		};
	}
	return await graphqlServer.executeOperation(request, executeOperationOptions);
};
