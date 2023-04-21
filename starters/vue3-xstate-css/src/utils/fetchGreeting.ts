export const fetchGreeting = (message: string) => {
	const encodedMessage = encodeURIComponent(message);
	const endpoint = `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`;
	return fetch(endpoint).then((result) => result.text());
};
