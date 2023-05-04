import { getEnvironment } from '../../utils/contentful';
import TechnologyModel from './TechnologyModel';

export default async function getById(id: string) {
	const environment = await getEnvironment();
	const entry = await environment.getEntry(id);

	return new TechnologyModel(entry);
}
