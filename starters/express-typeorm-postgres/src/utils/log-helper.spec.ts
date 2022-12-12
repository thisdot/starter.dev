import { ALL_LOG_LEVELS } from './log-helper';

type LogMethods = 'log' | 'info' | 'debug' | 'warn' | 'error';
type LogLevels = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

describe(`LogHelper`, () => {
	let consoleSpy;
	beforeEach(() => {
		jest.resetModules();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe.each([
		['log', 'INFO'],
		['info', 'INFO'],
		['debug', 'DEBUG'],
		['warn', 'WARN'],
		['error', 'ERROR'],
	])(`%s function`, (method: LogMethods, level: LogLevels) => {
		beforeEach(() => {
			consoleSpy = jest.spyOn(console, method);
		});

		it(`does not call 'console.${method}()' if the ${level} is not provided in the ENV variable`, () => {
			process.env.ALLOWED_LOG_LEVELS = ALL_LOG_LEVELS.replace(level, '');

			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const { LogHelper } = require('./log-helper');

			LogHelper[method]('Test');

			expect(consoleSpy).toHaveBeenCalledTimes(0);
		});

		it(`calls 'console.${method}()', if the ${level} is provided in the ENV variable`, () => {
			process.env.ALLOWED_LOG_LEVELS = ALL_LOG_LEVELS;

			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const { LogHelper } = require('./log-helper');

			LogHelper[method]('Test');

			expect(consoleSpy).toHaveBeenCalledTimes(1);
			expect(consoleSpy).lastCalledWith(`[${level}] Test`);
		});
	});
});
