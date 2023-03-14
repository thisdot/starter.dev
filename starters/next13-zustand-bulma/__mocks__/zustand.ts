import { create as actualCreate, StateCreator } from 'zustand';
import { act } from 'react-dom/test-utils';

// THIS MOCK IS TO RESET ALL ZUSTAND STORES AFTER EACH TEST RUN

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<() => void>();

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = function <S>() {
  const mockCreator = (createState: StateCreator<S>) => {
    const store = actualCreate(createState);
    const initialState = store.getState();
    storeResetFns.add(() => store.setState(initialState, true));
    return store;
  };
  return arguments.length === 0 ? mockCreator : mockCreator(arguments[0]);
};

// Reset all stores after each test run
beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});
