import { ERROR_TYPE, SUCCESS_TYPE } from './constants';

export interface SuccessResult<T> {
  type: typeof SUCCESS_TYPE;
  data: T;
}

export interface ErrorResult {
  type: typeof ERROR_TYPE;
  message: string;
}
