import GreetView from '../GreetView.vue';

describe('<GreetView />', () => {
  it('renders', () => {
    cy.mount(GreetView, { props: { query: 'from This Dot Labs!' } });
  });

  it('should display a message with my greeting when I pass in a greeting', () => {
    cy.mount(GreetView, { props: { query: 'from Cypress!' } });
    cy.get('[data-cy=message-result]').should(
      'contain.text',
      'Hello, from Cypress!'
    );
  });

  it('should display a default message when no greeting is passed', () => {
    cy.mount(GreetView, { props: { query: '' } });
    cy.get('[data-cy=message-result]').should('contain.text', 'Hello, there');
  });

  it('should show an error if something goes wrong with the fetch call', () => {
    // easiest way to test this is to forcefully destroy the request so it fails
    cy.intercept(
      'GET',
      'https://api.starter.dev/.netlify/functions/server/hello*',
      (req) => {
        req.destroy();
      }
    );
    cy.mount(GreetView, { props: { query: 'from Cypress!' } });
    cy.get('[data-cy=message-result]').should(
      'contain.text',
      'Failed to fetch'
    );
  });
});
