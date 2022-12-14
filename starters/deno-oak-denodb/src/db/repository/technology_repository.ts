import { Technologies } from '../model/technology.ts';
import { FieldValue } from '../../../deps.ts';

export class TechnologyRepository {
	static create(technologyFields: { [key: string]: FieldValue }): Promise<Technologies> {
		return Technologies.create({
			id: crypto.randomUUID(),
			...technologyFields,
		});
	}

	static async update(
		id: string,
		technologyFields: { [key: string]: FieldValue },
	): Promise<Technologies> {
		return await Technologies.where('id', id).update({
			...technologyFields,
		}) as Technologies;
	}

	static getById(id: string): Promise<Technologies> {
		return Technologies.find(id);
	}

	static getAll(): Promise<Technologies[]> {
		return Technologies.all();
	}

	static async deleteById(id: string): Promise<void> {
		await Technologies.deleteById(id);
	}
}
