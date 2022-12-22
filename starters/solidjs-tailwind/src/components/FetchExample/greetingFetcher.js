const DEFAULT_MESSAGE = 'solidjs-tailwind starter.dev!';
const greetingFetcher =
  (message = DEFAULT_MESSAGE) =>
  async () => {
    const encodedMessage = encodeURIComponent(message);
    const endpoint = `https://api.starter.dev/hello?greeting=${encodedMessage}`;

    return fetch(endpoint).then((result) => result.text());
  };

export default greetingFetcher;
