import { Entry } from 'contentful-management';

const fieldNames = ['url', 'description', 'displayName'] as const;
type FieldName = (typeof fieldNames)[number];
export type TechnologyFields = { [field in FieldName]?: string | null };

export default class TechnologyModel {
	public get id() {
		return this.entry.sys.id;
	}

	public get displayName(): string {
		return this.entry.fields.displayName['en-US'];
	}
	public set displayName(value: string) {
		this.entry.fields.displayName = { 'en-US': value };
	}

	public get description(): TechnologyFields['description'] {
		return this.entry.fields?.description?.['en-US'];
	}
	public set description(value: TechnologyFields['description']) {
		this.entry.fields.description = { 'en-US': value };
	}

	public get url(): TechnologyFields['url'] {
		return this.entry.fields?.url?.['en-US'];
	}
	public set url(value: TechnologyFields['url']) {
		this.entry.fields.url = { 'en-US': value };
	}

	constructor(private entry: Entry) {}

	async update(data: TechnologyFields) {
		if ('displayName' in data && data.displayName != null) this.displayName = data.displayName;
		if ('url' in data) this.url = data.url;
		if ('description' in data) this.description = data.description;

		if (!this.entry.isDraft()) {
			this.entry = await this.entry.update();
		}

		this.entry = await this.entry.publish();
	}

	async delete() {
		if (this.entry.isPublished()) {
			this.entry = await this.entry.unpublish();
		}
		await this.entry.delete();
	}
}
