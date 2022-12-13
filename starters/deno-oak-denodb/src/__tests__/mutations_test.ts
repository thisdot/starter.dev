import { afterEach, assertEquals, beforeEach, describe, it, spy, stub, assertSpyCall, assertSpyCalls, Stub, Spy } from '../../deps.ts';
import { Technologies } from '../db/model/technology.ts';
import { createTechnology, updateTechnology } from '../graphql/resolvers/mutation_handler.ts';

describe('createTechnology', () => {
	let technologiesCreateStub: Stub, technologiesWhereStub: Stub, technologiesUpdateStub: Stub;

	const MOCK_CREATE_INPUT = {
		id: '1',
		displayName: 'technology1',
		description: 'whatever',
		url: 'http://lulz.com',
	};

	beforeEach(() => {
		technologiesCreateStub = stub(Technologies, 'create', () => Promise.resolve(MOCK_CREATE_INPUT as any));

		technologiesWhereStub = stub(Technologies, 'where', () => Promise.resolve(MOCK_CREATE_INPUT as any));

		technologiesUpdateStub = stub(Technologies, 'update', () =>
			Promise.resolve({
				displayName: 'technology2',
				description: 'whatever',
				url: 'http://lulz.com',
			} as any)
		);
	});

	afterEach(() => {
		technologiesCreateStub.restore();
		technologiesWhereStub.restore();
		technologiesUpdateStub.restore();
	});

	it('creates a technology', async () => {
		const MOCK_CACHE: { writeItem: Spy; invalidateItem: Spy } = {
			writeItem: spy((cacheKey: string, value: unknown) => Promise.resolve(value)),
			invalidateItem: spy((cacheKey: string) => Promise.resolve(null)),
		};

		const result = await createTechnology({}, { id: '1', input: MOCK_CREATE_INPUT }, { cache: MOCK_CACHE as any });

		assertEquals(result, MOCK_CREATE_INPUT as any);
	});

	it('updates a technology', async () => {
		const MOCK_CACHE: { writeItem: Spy; invalidateItem: Spy } = {
			writeItem: spy((cacheKey: string, value: unknown) => Promise.resolve(value)),
			invalidateItem: spy((cacheKey: string) => Promise.resolve(null)),
		};

		const MOCK_UPDATE_INPUT = {
			displayName: 'technology2',
			description: 'whatever',
			url: 'http://lulz.com',
		};

		const result = await updateTechnology({}, { id: '1', input: MOCK_CREATE_INPUT as any }, { cache: MOCK_CACHE as any });

		assertEquals(result, MOCK_UPDATE_INPUT as any);
	});
});
