import {
	afterEach,
	assertEquals,
	beforeEach,
	describe,
	it,
	Spy,
	spy,
	Stub,
	stub,
} from '../../dev_deps.ts';
import {
	createTechnology,
	deleteTechnologyById,
	updateTechnology,
} from '../graphql/resolvers/mutation_handler.ts';
import { TechnologyRepository } from '../db/repository/technology_repository.ts';

describe('createTechnology', () => {
	let repositoryCreateStub: Stub, repositoryUpdateStub: Stub, repositoryDeleteByIdStub: Stub;

	const MOCK_CREATE_INPUT = {
		id: '1',
		displayName: 'technology1',
		description: 'whatever',
		url: 'http://lulz.com',
	};

	beforeEach(() => {
		repositoryCreateStub = stub(
			TechnologyRepository,
			'create',
			() => Promise.resolve(MOCK_CREATE_INPUT as any),
		);

		repositoryUpdateStub = stub(TechnologyRepository, 'update', () =>
			Promise.resolve({
				displayName: 'technology2',
				description: 'whatever',
				url: 'http://lulz.com',
			} as any));

		repositoryDeleteByIdStub = stub(
			TechnologyRepository,
			'deleteById',
			() => Promise.resolve(MOCK_CREATE_INPUT as any),
		);
	});

	afterEach(() => {
		repositoryCreateStub.restore();
		repositoryUpdateStub.restore();
		repositoryDeleteByIdStub.restore();
	});

	it('creates a technology', async () => {
		const MOCK_CACHE: { writeItem: Spy; invalidateItem: Spy } = {
			writeItem: spy((_cacheKey: string, value: unknown) => Promise.resolve(value)),
			invalidateItem: spy((_cacheKey: string) => Promise.resolve(null)),
		};

		const result = await createTechnology({}, { id: '1', input: MOCK_CREATE_INPUT }, {
			cache: MOCK_CACHE as any,
		});

		assertEquals(result, MOCK_CREATE_INPUT as any);
	});

	it('deletes a technology', async () => {
		const MOCK_CACHE: { writeItem: Spy; invalidateItem: Spy } = {
			writeItem: spy((_cacheKey: string, value: unknown) => Promise.resolve(value)),
			invalidateItem: spy((_cacheKey: string) => Promise.resolve(null)),
		};

		const result = await deleteTechnologyById({}, { id: '1' }, { cache: MOCK_CACHE as any });

		assertEquals(result, { done: true });
	});

	it('updates a technology', async () => {
		const MOCK_CACHE: { writeItem: Spy; invalidateItem: Spy } = {
			writeItem: spy((_cacheKey: string, value: unknown) => Promise.resolve(value)),
			invalidateItem: spy((_cacheKey: string) => Promise.resolve(null)),
		};

		const result = await updateTechnology({}, {
			id: '1',
			input: MOCK_CREATE_INPUT as any,
		}, { cache: MOCK_CACHE as any });

		assertEquals(result, {
			done: true,
		});
	});
});
