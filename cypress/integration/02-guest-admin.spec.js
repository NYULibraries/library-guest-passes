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
      cy.get('#guests-list').children().contains('Juan del Pueblo Test');
    })

    it('can view guest\'s previous visits', () =>{
      cy.contains('td', 'Juan del Pueblo Test')
        .parent()
        .within($tr => {
          cy.get('td button.view')
            .click()
        })
      cy.url().should('match', /\/admin\/guests\/\d/)
    })

    it('list does not contain visits not created by e2e', () => {
      cy.contains('Juan del Pueblo Test')
      cy.get('td.notes').each($td => {
        cy.contains('e2e')
      })
    })

    it('deletes visits using the delete button', () => {
      cy.contains('Juan del Pueblo Test')
      cy.get('td button.delete-btn')
        .click({multiple: true})
      cy.get('tr').should('not.exist');
    })
  })
})