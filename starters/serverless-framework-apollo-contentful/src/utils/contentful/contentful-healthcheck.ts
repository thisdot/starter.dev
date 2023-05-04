import { getEnvironment } from './contentful';

export const getContentfulHealth = async () => {
	try {
		await getEnvironment();
		return true;
	} catch {
		return false;
	}
};
