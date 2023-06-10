import fetch from 'jest-fetch-mock';

beforeEach(() => {
  fetch.resetMocks();
});

test('returns a string result', () => {
  fetch.mockResponseOnce('Hello, from This Dot Labs!');
  const onResponse = jest.fn();
  const onError = jest.fn();

  return fetch(
    'https://api.starter.dev/.netlify/functions/server/hello?greeting=from This Dot Labs!'
  )
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
    });
});
