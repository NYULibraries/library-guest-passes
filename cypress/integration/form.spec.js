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
    it('returns error message on incomplete form', function(){
      cy.get('button.btn-primary').click();
      cy.get('div.msgWrap > em').contains('Oops!');
    })
    it('successfully submits form if all necessary fields are filled', function(){
      
    })
  })
})  