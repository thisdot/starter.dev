import { greetingReducer, initialState } from './greeting.reducer';

describe('Greeting Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = greetingReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
