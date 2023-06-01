import CounterView from '../views/CounterView.vue';

describe('<CounterView />', () => {
	it('renders', () => {
		cy.mount(CounterView);
	});

	it('should have an initial value of 0', () => {
		cy.mount(CounterView);
		cy.get('[data-cy=count]').should('contain.text', '0');
	});

	it('should increase the value when the increment button is clicked', () => {
		cy.mount(CounterView);
		cy.get('[data-cy=inc-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '1');
		cy.get('[data-cy=inc-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '2');
	});

	it('should decrease the value when the decrement button is clicked', () => {
		cy.mount(CounterView);
		cy.get('[data-cy=dec-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '-1');
		cy.get('[data-cy=dec-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '-2');
	});

	it('should reset the value when the reset button is clicked', () => {
		cy.mount(CounterView);
		// test after increase
		cy.get('[data-cy=inc-button]').click();
		cy.get('[data-cy=inc-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '2');
		cy.get('[data-cy=res-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '0');
		// test after decrease
		cy.get('[data-cy=dec-button]').click();
		cy.get('[data-cy=dec-button]').click();
		cy.get('[data-cy=dec-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '-3');
		cy.get('[data-cy=res-button]').click();
		cy.get('[data-cy=count]').should('contain.text', '0');
	});
});
