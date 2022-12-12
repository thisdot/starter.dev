import { Result } from '../constants/result';

export interface SuccessResult<T> {
	type: Result.SUCCESS;
	data: T;
}

export interface NotFoundResult {
	type: Result.NOT_FOUND;
	message: string;
}

export interface ErrorResult {
	type: Result.ERROR;
	message: string;
	error?: unknown;
}
