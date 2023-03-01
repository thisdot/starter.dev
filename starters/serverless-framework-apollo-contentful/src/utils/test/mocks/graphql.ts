import {
	GraphQLObjectType,
	GraphQLOutputType,
	GraphQLResolveInfo,
	GraphQLSchema,
	Kind,
	OperationTypeNode,
} from 'graphql';
import { addPath } from 'graphql/jsutils/Path';

export const mockGraphQLResolveInfo = (): GraphQLResolveInfo => ({
	fieldName: '',
	fieldNodes: [],
	returnType: {} as GraphQLOutputType,
	parentType: {} as GraphQLObjectType,
	path: addPath(undefined, 'MOCK_PATH_KEY', undefined),
	schema: new GraphQLSchema({}),
	fragments: {},
	rootValue: undefined,
	operation: {
		kind: Kind.OPERATION_DEFINITION,
		operation: OperationTypeNode.QUERY,
		selectionSet: {
			kind: Kind.SELECTION_SET,
			selections: [],
		},
	},
	variableValues: {},
});
