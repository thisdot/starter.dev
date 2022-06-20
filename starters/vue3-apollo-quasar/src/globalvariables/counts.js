import { makeVar } from '@apollo/client';

export const counts = makeVar(0);

export const increment = () => {
  counts(counts() + 1);
};

export const decrement = () => {
  counts(counts() - 1);
};

export const reset = () => {
  counts(0);
};
