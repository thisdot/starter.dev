import { getEnvironment } from '../../utils/contentful';
import TechnologyModel from './TechnologyModel';

export default async function getAll() {
	try {
		const environment = await getEnvironment();
		const entries = await environment.getEntries({
			content_type: 'technology',
		});

		return entries.items.map((entry) => new TechnologyModel(entry));
	} catch (e) {
		console.log('======= something went wrong fetch =======');
		console.log(e);
		throw e;
	}
}
