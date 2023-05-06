export const fetchGreeting = (message: string) => {
	console.log(message);
	const encodedMessage = encodeURIComponent(message);
	const endpoint = `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`;
	return fetch(endpoint).then((result) => result.text());
};
