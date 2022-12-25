import Redis from 'ioredis';

let cachedClients: Record<string, Redis> = {};

export const getClient = async (type: string, url: string): Promise<Redis> => {
	if (cachedClients[type]) {
		return cachedClients[type];
	}

	const newClient = new Redis(`${url}/0?allowUsernameInURI=true`);
	cachedClients[type] = newClient;
	return newClient;
};
