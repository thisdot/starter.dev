import { Result } from '../constants/result';

export interface SuccessResult<T> {
  type: Result.SUCCESS;
  data: T;
}

export interface ErrorResult {
  type: Result.ERROR;
  message: string;
}
