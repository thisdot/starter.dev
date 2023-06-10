import { TechnologyModel } from '../model/technology_model.ts';
import { FieldValue } from '../../../deps.ts';

export class TechnologyRepository {
	static create(technologyFields: { [key: string]: FieldValue }): Promise<TechnologyModel> {
		return TechnologyModel.create({
			id: crypto.randomUUID(),
			...technologyFields,
		});
	}

	static async update(
		id: string,
		technologyFields: { [key: string]: FieldValue },
	): Promise<TechnologyModel> {
		return await TechnologyModel.where('id', id).update({
			...technologyFields,
		}) as TechnologyModel;
	}

	static getById(id: string): Promise<TechnologyModel> {
		return TechnologyModel.find(id);
	}

	static getAll(): Promise<TechnologyModel[]> {
		return TechnologyModel.all();
	}

	static async deleteById(id: string): Promise<void> {
		await TechnologyModel.deleteById(id);
	}
}
