import { afterEach, assertEquals, beforeEach, describe, it, spy, stub, assertSpyCall, assertSpyCalls, Stub, Spy } from '../../deps.ts';
import { Technologies } from '../db/model/technology.ts';
import { getTechnologies, getTechnology } from '../graphql/resolvers/query_handler.ts';

const MOCK_INFO: any = { fieldName: 'technologies' };

describe(`getTechnologies`, () => {
	let technologiesStub: Stub;

	beforeEach(() => {
		technologiesStub = stub(Technologies, 'all', () => Promise.resolve([]));
	});

	afterEach(() => {
		technologiesStub.restore();
	});

	it(`returns a list of technologies if the cache has nothing stored`, async () => {
		const MOCK_CACHE: { readItem: Spy; writeItem: Spy } = {
			readItem: spy((cacheKey: string) => Promise.resolve(null)),
			writeItem: spy((cacheKey: string, value: unknown) => Promise.resolve(value)),
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
		const MOCK_CACHE: { readItem: Spy; writeItem: Spy } = {
			readItem: spy((cacheKey: string) => Promise.resolve([{ id: 1, displayName: 'string', description: 'whatever' }])),
			writeItem: spy((cacheKey: string, value: unknown) => Promise.resolve(value)),
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
		const MOCK_CACHE: { readItem: Spy; writeItem: Spy } = {
			readItem: spy((cacheKey: string) => Promise.resolve({ id: 1, displayName: 'string', description: 'whatever' })),
			writeItem: spy((cacheKey: string, value: unknown) => Promise.resolve(value)),
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
