import { getEnvironment } from '../utils/contentful';
import { MakeOptional } from '../generated/graphql';
import { CONTENTFUL_CONTENT_TYPE_ID_TECHNOLOGY } from '../utils/contentful/constants';

export type Fields = {
	displayName: string;
	description?: string | null | undefined;
	url?: string | null | undefined;
};

export class TechnologyModel {
	public static getAll = async () => {
		const environment = await getEnvironment();
		const entries = await environment.getEntries({
			content_type: CONTENTFUL_CONTENT_TYPE_ID_TECHNOLOGY,
		});

		return entries.items;
	};

	public static get = async (id: string) => {
		const environment = await getEnvironment();
		const entry = await environment.getEntry(id);

		return entry;
	};

	public static create = async ({ displayName, description, url }: Fields) => {
		const environment = await getEnvironment();
		const entry = await environment.createEntry(CONTENTFUL_CONTENT_TYPE_ID_TECHNOLOGY, {
			fields: {
				displayName: {
					'en-US': displayName,
				},
				description: {
					'en-US': description,
				},
				url: {
					'en-US': url,
				},
			},
		});
		await entry.publish();
		return entry;
	};

	public static update = async (
		id: string,
		{ displayName, description, url }: MakeOptional<Fields, 'displayName'>
	) => {
		const environment = await getEnvironment();
		const entry = await environment.getEntry(id);
		entry.fields.displayName['en-US'] =
			displayName ?? entry.fields.displayName['en-US'];
		entry.fields.description['en-US'] =
			description ?? entry.fields.description['en-US'];
		entry.fields.url['en-US'] = url ?? entry.fields.url['en-US'];
		await entry.update();
		await entry.publish();
		return entry;
	};
}
