import { Fragment } from 'react';
import cn from 'clsx';

type GreetingView = {
  message?: string | null;
  loading?: boolean;
  errorMessage?: string | null;
};

export function GreetingView({ message, loading, errorMessage }: GreetingView) {
  return (
    <div className="flex w-full text-xl justify-center">
      {errorMessage ? (
        <Fragment>
          <div
            className="grow border border-solid border-red-300 rounded bg-red-100 p-4 text-center text-red-500"
            role="error-message"
          >
            {errorMessage}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="mr-4">Message:</div>
          <div
            className={cn('text-left', {
              'grow animate-pulse bg-gray-200 rounded-md': loading,
              'grow-0': !loading,
            })}
            role="display-message"
          >
            {message}
          </div>
        </Fragment>
      )}
    </div>
  );
}
