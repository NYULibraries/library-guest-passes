describe('Admin - Guest', function () {
  before(() => {
    cy.visit('/')
    //cy.visit('http://dev:3000/')
    //cy.visit('https://library.nyu.edu/')
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

  describe('back to all guests view', () => {
    it('still contains test user after deleting their visits', () =>{
      cy.get('#guest-breadcrumb').click();
      cy.contains('Juan del Pueblo Test');
    })

    it('can open the module to edit a user\'s information', () => {
      cy.contains('td', 'Juan del Pueblo Test')
        .parent()
        .within($tr => {
          cy.get('td button.edit')
            .click()
        })
      cy.get('input.edit-name').invoke('val').should('equal', 'Juan del Pueblo Test')
    })

    it('can edit user\'s name and status', () => {
      cy.get('input.edit-name').invoke('val').should('equal', 'Juan del Pueblo Test')
      cy.get('input.edit-name')
        .clear()
        .type('Juanito del Pueblo')
      cy.get('input.edit-permission_status').invoke('val').should('equal', 'true')
      cy.get('input.edit-permission_status')
        .clear()
        .type('false')
      
      cy.get('form').submit()  
    })

    it('can delete guests', () => {
      cy.contains('td', 'Juanito del Pueblo')
        .parent()
        .within($tr => {
          cy.get('td button.delete')
            .click()
        })
    })
  })
})
