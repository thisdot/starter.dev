import { getTechnologies, getTechnology } from '../graphql/resolvers/query_handler.ts';
import { TechnologyRepository } from '../db/repository/technology_repository.ts';
import {
	afterEach,
	assertEquals,
	assertSpyCall,
	assertSpyCalls,
	beforeEach,
	describe,
	it,
	Spy,
	spy,
	Stub,
	stub,
} from '../../dev_deps.ts';

const MOCK_INFO: any = { fieldName: 'technologies' };

type MockCache = { readItem: Spy; writeItem: Spy };

describe(`getTechnologies`, () => {
	let repositoryStub: Stub;

	beforeEach(() => {
		repositoryStub = stub(TechnologyRepository, 'getAll', () => Promise.resolve([]));
	});

	afterEach(() => {
		repositoryStub.restore();
	});

	it(`returns a list of technologies if the cache has nothing stored`, async () => {
		const MOCK_CACHE: { readItem: Spy; writeItem: Spy } = {
			readItem: spy((_cacheKey: string) => Promise.resolve(null)),
			writeItem: spy((_cacheKey: string, value: unknown) => Promise.resolve(value)),
		};

		const result = await getTechnologies({}, { id: '' }, { cache: MOCK_CACHE } as any, MOCK_INFO);

		assertEquals(result, []);
		assertSpyCall(MOCK_CACHE.readItem, 0, {
			args: [MOCK_INFO.fieldName],
		});
		assertSpyCalls(MOCK_CACHE.readItem, 1);
		assertSpyCall(MOCK_CACHE.writeItem, 0, {
			args: [MOCK_INFO.fieldName, []],
		});
		assertSpyCalls(MOCK_CACHE.writeItem, 1);
	});

	it(`returns a list of technologies if the cache has value and skips calling the database`, async () => {
		const MOCK_CACHE: MockCache = {
			readItem: spy((_cacheKey: string) =>
				Promise.resolve([{ id: 1, displayName: 'string', description: 'whatever' }])
			),
			writeItem: spy((_cacheKey: string, value: unknown) => Promise.resolve(value)),
		};

		const result = await getTechnologies({}, { id: '' }, { cache: MOCK_CACHE } as any, MOCK_INFO);

		assertEquals(result, [{ id: 1, displayName: 'string', description: 'whatever' } as any]);
		assertSpyCall(MOCK_CACHE.readItem, 0, {
			args: [MOCK_INFO.fieldName],
		});
		assertSpyCalls(MOCK_CACHE.readItem, 1);
		assertSpyCalls(MOCK_CACHE.writeItem, 0);
	});
});

describe('getTechnology', () => {
	it('returns a single technology by ID', async () => {
		const MOCK_CACHE: MockCache = {
			readItem: spy((_cacheKey: string) =>
				Promise.resolve({ id: 1, displayName: 'string', description: 'whatever' })
			),
			writeItem: spy((_cacheKey: string, value: unknown) => Promise.resolve(value)),
		};

		const result = await getTechnology({}, { id: '1' }, { cache: MOCK_CACHE } as any, MOCK_INFO);

		assertEquals(result, { id: 1, displayName: 'string', description: 'whatever' } as any);
		assertSpyCall(MOCK_CACHE.readItem, 0, {
			args: [MOCK_INFO.fieldName + ':1'],
		});
		assertSpyCalls(MOCK_CACHE.readItem, 1);
		assertSpyCalls(MOCK_CACHE.writeItem, 0);
	});
});
