import { client } from '../utils/contentful';

export class CommentModel {
	public static getAll = async () => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
		const entries = await environment.getEntries({
			content_type: 'comment',
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

	public static create = async (content: string) => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
		const entry = await environment.createEntry('comment', {
			fields: {
				content: {
					'en-US': content,
				},
			},
		});
		await entry.publish();
		return entry;
	};

	public static update = async (id: string, content: string) => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
		const entry = await environment.getEntry(id);
		entry.fields.content['en-US'] = content;
		await entry.update();
		await entry.publish();
		return entry;
	};

	public static delete = async (id: string) => {
		const space = await client.getSpace(`${process.env.CONTENTFUL_SPACE_ID}`);
		const environment = await space.getEnvironment(
			`${process.env.CONTENTFUL_ENVIRONMENT}`
		);
		const entry = await environment.getEntry(id);
		await entry.unpublish();
		await entry.delete();
		return entry;
	};
}
