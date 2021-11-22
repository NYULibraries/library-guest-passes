describe('The Home Page', function () {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  describe('Form Elements', () => {
    it('successfully loads', function () {
      cy.get('form').contains('Submit');
      cy.get('form').contains('Clear');
    })
  })

  describe('Submit', () => {
    it('successfully submits form if all necessary fields are filled', function(){
      cy.get('#guest_name')
        .should('be.visible')
        .type('John Doe')
      cy.get('#affiliate_name')
        .should('be.visible')
        .type('Joanne Doe')
      cy.get('#initials')
        .should('be.visible')
        .type('LN')
      cy.get('#idtype')
        .should('be.visible')
        .type('passport')
      cy.get('#restrictions')
        .should('be.visible')
        .select('Visual History Archives')
      cy.get('#status')
        .should('be.visible')
        .select('Sponsored Access')
      // cy.get('button[type="submit"]')
      //   .should('be.visible')
      //   .click()
  
      cy.contains('You will receive an email to finish the purchase.')
        .should('be.visible')
    })
    it('returns error message on incomplete form', function(){
      cy.get('button.btn-primary').click();
      cy.get('div.msgWrap > em').contains('Oops!');
    })
  })
})  