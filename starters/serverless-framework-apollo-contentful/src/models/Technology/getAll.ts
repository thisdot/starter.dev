import { getEnvironment } from '../../utils/contentful';
import TechnologyModel from './TechnologyModel';

export default async function getAll(limit?: number | null, skip?: number | null) {
	try {
		const environment = await getEnvironment();
		const entries = await environment.getEntries({
			content_type: 'technology',
			limit: limit || 100,
			skip: skip || 0,
			order: 'sys.createdAt',
		});

		return entries.items.map((entry) => new TechnologyModel(entry));
	} catch (e) {
		console.log('======= something went wrong fetch =======');
		console.log(String(e));
		throw e;
	}
}
