import { getEnvironment } from '../../utils/contentful';
import TechnologyModel, { TechnologyFields } from './TechnologyModel';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export default async function create(data: WithRequired<TechnologyFields, 'displayName'>) {
	const environment = await getEnvironment();

	const entry = await environment.createEntry('technology', {
		fields: {
			displayName: { 'en-US': data.displayName },
			description: { 'en-US': data.description },
			url: { 'en-US': data.url },
		},
	});
	await entry.publish();

	return new TechnologyModel(entry);
}
