import { ApolloServer } from '@apollo/server';
import { graphqlServer } from './graphql-server';

describe('graphqlServer', () => {
	it('creates server instance', () => {
		expect(graphqlServer).toBeInstanceOf(ApolloServer);
	});
});
