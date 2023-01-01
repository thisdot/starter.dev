import { getClient } from './getClient';

describe('cache.getClient()', () => {
	let subject: Awaited<ReturnType<typeof getClient>>;

	describe('when called once', () => {
		beforeAll(async () => {
			jest.resetModules();
			subject = await getClient();
		});

		it('returns a cache instance', () => {
			expect(subject).toHaveProperty('set');
			expect(subject).toHaveProperty('get');
			expect(subject).toHaveProperty('delete');
		});
	});

	describe('when called twice', () => {
		beforeAll(async () => {
			jest.resetModules();
			await getClient();
			subject = await getClient();
		});

		it('returns a cache instance', () => {
			expect(subject).toHaveProperty('set');
			expect(subject).toHaveProperty('get');
			expect(subject).toHaveProperty('delete');
		});
	});
});
