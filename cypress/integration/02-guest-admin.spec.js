describe('Admin - Guest', function () {
  before(() => {
    cy.visit('http://localhost:3000/')
  });

  describe('breadcrumb navigates to guest',() => {
    it('goes to Admin-Guest view after clicking link', () => {
      cy.get('#guest-breadcrumb').children().contains('Admin')
        .click();
      cy.url().should('include', 'guests');
    })
  })

  describe('shows guests who have visited', () => {
    it('has a list of guests', () => {
      cy.get('#guests-list').children().contains('John Doe');
    })

    it('can view guest\'s previous visits', () =>{
      cy.contains('td', 'John Doe')
        .parent()
        .within($tr => {
          cy.get('td button.view')
            .click()
        })
      cy.url().should('match', /\/admin\/guests\/\d/)
    })
  })
})