describe('Admin - Affiliate', function () {
  before(() => {
    cy.visit('http://localhost:3000/')
  });

  describe('breadcrumb navigates to affiliate',() => {
    it('goes to Admin-Affiliate view after clicking link', () => {
      cy.get('#affiliate-breadcrumb').children().contains('Admin')
        .click();
      cy.url().should('include', 'affiliates');
    })
  })

  describe('shows affiliates who have visited', () => {
    it('has a list of affiliates', () => {
      cy.get('#affiliates-list').children().contains('Joanna del Pueblo Test');
    })

    it('can view affiliate\'s previous visits', () =>{
      cy.contains('td', 'Joanna del Pueblo Test')
        .parent()
        .within($tr => {
          cy.get('td button.view')
            .click()
        })
      cy.url().should('match', /\/admin\/affiliates\/\d/)
    })

    it('list does not contain visits not created by e2e', () => {
      cy.contains('Joanna del Pueblo Test')
      cy.get('td.notes').each($td => {
        cy.contains('e2e')
      })
    })
  })

  describe('back to all affiliates view', () => {
    it('still contains test user after deleting their visits', () =>{
      cy.get('#affiliate-breadcrumb').click();
      cy.contains('Joanna del Pueblo Test');
    })

    it('can open the module to edit a user\'s information', () => {
      cy.contains('td', 'Joanna del Pueblo Test')
        .parent()
        .within($tr => {
          cy.get('td button.edit')
            .click()
        })
      cy.get('input.edit-name').invoke('val').should('equal', 'Joanna del Pueblo Test')
    })

    it('can edit user\'s name and status', () => {
      cy.get('input.edit-name').invoke('val').should('equal', 'Joanna del Pueblo Test')
      cy.get('input.edit-name')
        .clear()
        .type('Jolyne del Pueblo')
      cy.get('input.edit-permission_status').invoke('val').should('equal', 'true')
      cy.get('input.edit-permission_status')
        .clear()
        .type('false')
      
      cy.get('form').submit()  
    })

    it('can delete affiliates', () => {
      cy.contains('td', 'Jolyne del Pueblo')
        .parent()
        .within($tr => {
          cy.get('td button.delete')
            .click()
        })
    })
  })
})