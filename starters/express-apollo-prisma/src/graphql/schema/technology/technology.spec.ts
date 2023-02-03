import gql from 'graphql-tag';
import { Query, Technology } from '../generated/types';
import assert from 'assert';
import { serverExecuteOperation } from '../../utils/test';
import { PrismaClient } from '@prisma/client';
import { RedisClient } from '../../../redis';

type TechnologyQuery = Pick<Query, 'technology'>;

const MOCK_EXISTING_ID = '123';
const MOCK_EXISTING_NAME = 'MOCK_EXISTING_NAME';
const MOCK_EXISTING_TECHNOLOGY: Technology = {
	id: MOCK_EXISTING_ID,
	name: MOCK_EXISTING_NAME
};
const MOCK_QUERY_TECHNOLOGY = gql`
	query TechnologyQuery($id: ID!) {
		technology(id: $id) {
			id
			name
		}
	}
`;

jest.mock('../../data-sources/technology-data-source', () => {
	return {
		TechnologyDataSource: (prismaClient: PrismaClient, redisClient?: RedisClient, redisCacheTtlSeconds?: number) => {

		}
	}
});

const mockTechnologyDataSource = 

describe('technologyResolvers', () => {
	describe('.Query', () => {
		describe('.technology', () => {
			describe('when called with existing id', () => {
				beforeAll(() => {

				}));

				it('returns expected result', async () => {
					const subject = await serverExecuteOperation<TechnologyQuery>({
						query: MOCK_QUERY_TECHNOLOGY,
						variables: {
							id: MOCK_EXISTING_ID,
						},
					});
					expect(subject.body.kind).toEqual('single');
					assert(subject.body.kind === 'single');
					expect(subject.body.singleResult.data).toEqual(MOCK_EXISTING_TECHNOLOGY);
				});
			});
		});
	});
});
