import assert from 'assert';
import Keyv from 'keyv';
import { redisClient } from './redis';

jest.mock('./redis', () => {
	// Original env snapshot
	const _originalEnv = process.env;
	process.env = {
		REDIS_PORT: '1234',
		REDIS_HOST: 'MOCK_HOST',
		REDIS_USER: 'MOCK_USER',
		REDIS_PASS: 'MOCK_PASS',
	};
	// Require the original module to not be mocked...
	const originalModule = jest.requireActual<typeof import('./redis')>('./redis');

	return {
		__esModule: true, // Use it when dealing with esModules
		...originalModule,
		_originalEnv, // Store original env to reset changes after tests
	};
});

jest.mock('keyv');

const MOCK_KEYV = Keyv as unknown as jest.Mock;

describe('./redis', () => {
	afterAll(async () => {
		const mockedModule = await import('./redis');
		assert('_originalEnv' in mockedModule);
		process.env = <NodeJS.ProcessEnv>mockedModule._originalEnv;
	});

	it('exports valid redis client', () => {
		expect(redisClient).toBeInstanceOf(Keyv);
		expect(MOCK_KEYV).toHaveBeenCalledWith('redis://MOCK_USER:MOCK_PASS@MOCK_HOST:1234');
	});
});
