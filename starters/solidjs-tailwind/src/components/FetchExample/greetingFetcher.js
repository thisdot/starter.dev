const greetingFetcher = async (message) => {
  const encodedMessage = encodeURIComponent(message);
  const endpoint = `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`;

  return await fetch(endpoint).then((result) => result.text());
};

export default greetingFetcher;
