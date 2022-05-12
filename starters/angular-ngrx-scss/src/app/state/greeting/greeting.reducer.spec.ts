import { greetingReducer, initialState } from './greeting.reducer';
import { getGreeting, getGreetingFailure, getGreetingSuccess } from './greeting.actions';

describe('Greeting Reducer', () => {
  describe('getGreeting action', () => {
    it('should set isLoading to true when the action is triggered', () => {
      const action = getGreeting({});
      const newState = {
        message: '',
        error: '',
        isLoading: true,
      };
      const result = greetingReducer(initialState, action);

      expect(result).toEqual(newState);
      expect(result).not.toBe(newState);
    });
  });

  describe('getGreetingSuccess action', () => {
    it('should show a greeting upon a successful call', () => {
      const action = getGreetingSuccess({
        message: 'Hello, angular-ngrx-scss test!',
      });
      const newState = {
        message: 'Hello, angular-ngrx-scss test!',
        error: '',
        isLoading: false,
      };
      const result = greetingReducer(initialState, action);

      expect(result).toEqual(newState);
      expect(result).not.toBe(newState);
    });
  });

  describe('getGreetingFailure action', () => {
    it('should show an error upon an error', () => {
      const action = getGreetingFailure({
        error: 'Sorry, something went wrong. Please try again.',
      });
      const newState = {
        message: '',
        error: 'Sorry, something went wrong. Please try again.',
        isLoading: false,
      };
      const result = greetingReducer(initialState, action);

      expect(result).toEqual(newState);
      expect(result).not.toBe(newState);
    });
  });
});
