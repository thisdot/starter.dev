import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCountStore = create<State & Actions>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
