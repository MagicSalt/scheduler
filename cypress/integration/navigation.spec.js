describe('Navigation', () => {

  it('should visit root', () => {
    cy.visit('/');

    cy.contains('[data-testid=day-item]', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');
  });

});