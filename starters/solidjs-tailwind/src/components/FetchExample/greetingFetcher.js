const DEFAULT_MESSAGE = 'from This Dot Labs!';
const greetingFetcher =
  (message = DEFAULT_MESSAGE) =>
  async () => {
    const encodedMessage = encodeURIComponent(message);
    const endpoint = `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`;

    return fetch(endpoint).then((result) => result.text());
  };

export default greetingFetcher;
