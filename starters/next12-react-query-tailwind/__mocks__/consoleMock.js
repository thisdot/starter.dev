const errorMock = jest.spyOn(console, 'error').mockImplementation();
const warnMock = jest.spyOn(console, 'warn').mockImplementation();
const infoMock = jest.spyOn(console, 'info').mockImplementation();
const logMock = jest.spyOn(console, 'log').mockImplementation();
const clearMock = jest.spyOn(console, 'clear').mockImplementation();
const assertMock = jest.spyOn(console, 'assert').mockImplementation();
const countMock = jest.spyOn(console, 'count').mockImplementation();
const countResetMock = jest.spyOn(console, 'countReset').mockImplementation();
const debugMock = jest.spyOn(console, 'debug').mockImplementation();
const dirMock = jest.spyOn(console, 'dir').mockImplementation();
const dirxmlMock = jest.spyOn(console, 'dirxml').mockImplementation();
const groupMock = jest.spyOn(console, 'group').mockImplementation();
const groupCollapsedMock = jest
  .spyOn(console, 'groupCollapsed')
  .mockImplementation();
const groupEndMock = jest.spyOn(console, 'groupEnd').mockImplementation();
const tableMock = jest.spyOn(console, 'table').mockImplementation();
const timeMock = jest.spyOn(console, 'time').mockImplementation();
const timeEndMock = jest.spyOn(console, 'timeEnd').mockImplementation();
const traceMock = jest.spyOn(console, 'trace').mockImplementation();

const cleanUpMocks = () => {
  errorMock.mockRestore();
  warnMock.mockRestore();
  infoMock.mockRestore();
  logMock.mockRestore();
  clearMock.mockRestore();
  assertMock.mockRestore();
  countMock.mockRestore();
  countResetMock.mockRestore();
  debugMock.mockRestore();
  dirMock.mockRestore();
  dirxmlMock.mockRestore();
  groupMock.mockRestore();
  groupCollapsedMock.mockRestore();
  groupEndMock.mockRestore();
  tableMock.mockRestore();
  timeMock.mockRestore();
  timeEndMock.mockRestore();
  traceMock.mockRestore();
};

export { cleanUpMocks };
