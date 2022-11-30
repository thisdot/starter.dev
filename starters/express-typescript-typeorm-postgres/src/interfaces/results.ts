import { Result } from './constants';

export interface SuccessResult<T> {
  type: Result.SUCCESS;
  data: T;
}

export interface ErrorResult {
  type: Result.ERROR;
  message: string;
}
