import Redis from 'ioredis';
import { getClient } from './getClient';

describe('redis.getClient()', () => {
	let subject: Redis;

	describe('when called once', () => {
		beforeAll(async () => {
			jest.resetModules();
			subject = await getClient('test', 'fakeurl');
		});

		it('returns a Redis instance', () => {
			expect(subject).toEqual(expect.any(Redis));
		});
	});

	describe('when called twice', () => {
		beforeAll(async () => {
			jest.resetModules();
			await getClient('test', 'fakeurl');
			subject = await getClient('test', 'fakeurl');
		});

		it('returns a Redis client', () => {
			expect(subject).toEqual(expect.any(Redis));
		});
	});
});
