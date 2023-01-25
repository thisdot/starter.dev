import { client } from '../utils/contentful';
import { MakeOptional } from '../generated/graphql';

type fields = {
	displayName: string;
	description?: string | null | undefined;
	url?: string | null | undefined;
};

export class TechnologyModel {
	public static getAll = async () => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
		const entries = await environment.getEntries({
			content_type: 'technology',
		});

		return entries.items;
	};

	public static get = async (id: string) => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
		const entry = await environment.getEntry(id);

		return entry;
	};

	public static create = async ({ displayName, description, url }: fields) => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
		const entry = await environment.createEntry('technology', {
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
		{ displayName, description, url }: MakeOptional<fields, 'displayName'>
	) => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
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
