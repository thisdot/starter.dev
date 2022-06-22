import { makeVar } from '@apollo/client';

export const counter = makeVar(0);

export const increment = () => {
  counter(counter() + 1);
};

export const decrement = () => {
  counter(counter() - 1);
};

export const reset = () => {
  counter(0);
};
