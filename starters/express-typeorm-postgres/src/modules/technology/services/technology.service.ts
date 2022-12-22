import { InsertResult } from 'typeorm';
import { Result } from '../../../constants/result';
import { dataSource } from '../../../db/datasource';
import { Technology } from '../../../db/entities/technology.entity';
import { ErrorResult, NotFoundResult, SuccessResult } from '../../../interfaces/results';

export type CreateOrUpdateTechnologyResult = SuccessResult<{ id: Technology['id'] }> | ErrorResult;
export type DeleteTechnologyResult = SuccessResult<null> | ErrorResult;
export type TechnologiesResult = SuccessResult<Technology[]> | ErrorResult;
export type TechnologyResult = SuccessResult<Technology> | NotFoundResult | ErrorResult;

export function updateTechnologyEntry(
	technologyId: number,
	technologyData: Omit<Technology, 'id'>
): Promise<CreateOrUpdateTechnologyResult> {
	return dataSource
		.getRepository(Technology)
		.update(
			{
				id: technologyId,
			},
			technologyData
		)
		.then<SuccessResult<{ id: Technology['id'] }>>(() => ({
			type: Result.SUCCESS,
			data: { id: technologyId },
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: `An unexpected error occurred during updating technology with id ${technologyId}`,
			error,
		}));
}

export function insertTechnology(
	technology: Omit<Technology, 'id'>
): Promise<CreateOrUpdateTechnologyResult> {
	return dataSource
		.getRepository(Technology)
		.insert(technology)
		.then<SuccessResult<{ id: Technology['id'] }>>((insertedTechnology: InsertResult) => ({
			type: Result.SUCCESS,
			data: { id: insertedTechnology.raw[0].id },
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: `An unexpected error occurred during creating technology`,
			error,
		}));
}

export function deleteTechnologyEntry(technologyId: number): Promise<DeleteTechnologyResult> {
	return dataSource
		.getRepository(Technology)
		.delete({
			id: technologyId,
		})
		.then<SuccessResult<null>>(() => ({
			type: Result.SUCCESS,
			data: null,
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: `An unexpected error occurred while deleting technology with id ${technologyId}`,
			error: error,
		}));
}

export function getTechnologies(): Promise<SuccessResult<Technology[]> | ErrorResult> {
	return dataSource
		.getRepository(Technology)
		.find()
		.then<SuccessResult<Technology[]>>((technologies: Technology[]) => ({
			type: Result.SUCCESS,
			data: technologies,
		}))
		.catch((error) => ({
			type: Result.ERROR,
			message: error.message,
			error,
		}));
}

export function findTechnology(technologyId: number): Promise<TechnologyResult> {
	return dataSource
		.getRepository(Technology)
		.findOne({
			where: {
				id: technologyId,
			},
		})
		.then<SuccessResult<Technology> | NotFoundResult>((result) => {
			if (!result) {
				return {
					type: Result.NOT_FOUND,
					message: `Could not find technology with id: ${technologyId}`,
				};
			}
			return {
				type: Result.SUCCESS,
				data: result,
			};
		})
		.catch((error) => {
			return {
				type: Result.ERROR,
				message: `Unexpected error while fetching technology with id ${technologyId}`,
				error,
			};
		});
}
