type LogMethods = 'log' | 'info' | 'debug' | 'warn' | 'error';
type LogLevels = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

const ALL_LOG_LEVELS = `["INFO","DEBUG","WARN","ERROR"]`;
const LOG_LEVELS_MAP = new Map<string, string>()
  .set('INFO', '["ERROR"]')
  .set('DEBUG', '["ERROR"]')
  .set('WARN', '["ERROR"]')
  .set('ERROR', '["WARN"]');

describe(`LogHelper`, () => {
  let consoleSpy;
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe.each([
    /** We expect the log method to be called two times, because it gets called in the constructor as well */
    ['log', 'INFO', 2],
    ['info', 'INFO', 2],
    ['debug', 'DEBUG', 1],
    ['warn', 'WARN', 1],
    ['error', 'ERROR', 1],
  ])(`%s function`, (method: LogMethods, level: LogLevels, expectedNrOfCalls: number) => {
    beforeEach(() => {
      let consoleMethod = method;
      if (consoleMethod === 'info') {
        consoleMethod = 'log';
      }
      consoleSpy = jest.spyOn(console, consoleMethod);
    });

    it(`does not call 'console.${method}()' if the ${level} is not provided in the ENV variable`, () => {
      process.env.ALLOWED_LOG_LEVELS = LOG_LEVELS_MAP.get(level);

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper[method]('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    it(`calls 'console.${method}()' ${expectedNrOfCalls} times, if the ${level} is provided in the ENV variable`, () => {
      process.env.ALLOWED_LOG_LEVELS = ALL_LOG_LEVELS;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper[method]('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(expectedNrOfCalls);
      expect(consoleSpy).lastCalledWith(`[${level}] Test`);
    });
  });
});
