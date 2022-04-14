import * as fromGreeting from './greeting.actions';

describe('getGreetings', () => {
  it('should return an action', () => {
    expect(fromGreeting.getGreetings().type).toBe('[Greeting] Get Greetings');
  });
});
