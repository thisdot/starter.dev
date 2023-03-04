import GreetView from '../GreetView.vue';
import { greetMachine } from '../../machines/greetMachine';

describe('<GreetView />', () => {
  it('renders', () => {
    cy.mount(GreetView);
  });

  it('should display a message with my greeting when I pass in a greeting', () => {
    cy.mount(GreetView);
    cy.get('[data-cy=message-result]').should(
      'contain.text',
      'Hello, from This Dot Labs!'
    );
  });

  // this is how to pass in an initial context, but not sure how to give it to my component
  // it('should display a default message when no greeting is passed', () => {
  //   const emptyContext = {
  //     query: '',
  //     message: '',
  //     error: '',
  //   };
  //   const testGreetMachine = greetMachine.withContext(emptyContext);
  //   cy.mount(GreetView);
  //   cy.get('[data-cy=message-result]').should('contain.text', 'Hello, there');
  // });

  // it('should show an error if something goes wrong with the fetch call', () => {
  //   cy.mount(GreetView);
  //   cy.get('[data-cy=message-result]').should(
  //     'contain.text',
  //     'Failed to fetch'
  //   );
  // });
});
