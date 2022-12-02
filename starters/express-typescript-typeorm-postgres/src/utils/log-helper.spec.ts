describe(`LogHelper`, () => {
  let consoleSpy;
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe(`log method`, () => {
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log');
    });

    it(`does not call console.log`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["ERROR"]`;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.log('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    it(`does call console.log if there is no environment variable set for it`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["INFO","ERROR"]`;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.log('Test');

      /** We expect the log method to be called two times, because it gets called in the constructor as well */
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).lastCalledWith(`[INFO] Test`);
    });
  });

  describe(`info method`, () => {
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log');
    });

    it(`does not call console.log`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["ERROR"]`;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.info('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    it(`does call console.log if there is no environment variable set for it`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["INFO","ERROR"]`;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.info('Test');

      /** We expect the log method to be called two times, because it gets called in the constructor as well */
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).lastCalledWith(`[INFO] Test`);
    });
  });

  describe(`debug method`, () => {
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'debug');
    });

    it(`does not call console.debug`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["ERROR"]`;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.debug('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    it(`does call console.debug if there is no environment variable set for it`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["DEBUG","ERROR"]`;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.debug('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).lastCalledWith(`[DEBUG] Test`);
    });
  });

  describe(`warn method`, () => {
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'warn');
    });

    it(`does not call console.debug`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["ERROR"]`;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.warn('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    it(`does call console.debug if there is no environment variable set for it`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["WARN","ERROR"]`;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.warn('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).lastCalledWith(`[WARN] Test`);
    });
  });

  describe(`error method`, () => {
    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error');
    });

    it(`does not call console.debug`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["INFO"]`;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.error('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(0);
    });

    it(`does call console.debug if there is no environment variable set for it`, () => {
      process.env.ALLOWED_LOG_LEVELS = `["WARN","ERROR"]`;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { LogHelper } = require('./log-helper');

      LogHelper.error('Test');

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).lastCalledWith(`[ERROR] Test`);
    });
  });
});
