import { useCache } from './useCache';

describe('cache.useCache()', () => {
	let subject: string | null;

	describe('when fails checkValue', () => {
		beforeAll(async () => {
			jest.resetModules();
			jest.spyOn(console, 'error').mockImplementation(() => {});
			subject = await useCache<string>({
				key: 'test-with-ttl',
				getFreshValue() {
					return 'test-value';
				},
				checkValue(value: unknown) {
					if (typeof value === 'string') {
						return value.startsWith('tests-');
					}
				},
			});
		});

		it('returns null', () => {
			expect(subject).toBeNull();
		});
	});

	describe('when using default ttl', () => {
		beforeAll(async () => {
			jest.resetModules();
			subject = await useCache<string>({
				key: 'test-with-ttl',
				getFreshValue() {
					return 'test-value';
				},
			});
		});

		it('returns a fresh fetched value', () => {
			expect(subject).toEqual('test-value');
		});
	});

	describe('when no ttl', () => {
		beforeAll(async () => {
			jest.resetModules();
			subject = await useCache<string>({
				key: 'test-no-ttl',
				getFreshValue() {
					return 'test-value';
				},
				ttl: 0,
			});
		});

		it('returns a fresh fetched value', () => {
			expect(subject).toEqual('test-value');
		});
	});

	describe('when called twice', () => {
		beforeAll(async () => {
			jest.resetModules();
			await useCache<string>({
				key: 'test-double',
				getFreshValue() {
					return 'test-value';
				},
			});
			subject = await useCache<string>({
				key: 'test-double',
				getFreshValue() {
					return 'test-value';
				},
			});
		});

		it('returns a fresh fetched value', () => {
			expect(subject).toEqual('test-value');
		});
	});
});
