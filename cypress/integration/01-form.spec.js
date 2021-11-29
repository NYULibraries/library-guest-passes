describe('The Home Page', function () {
  before(() => {
    cy.visit('http://localhost:3000/')
  });

  beforeEach(() => {
    cy.get('#clear-btn')
      .click({force: true})
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
        .type('John Doe', {force: true})
      cy.get('#affiliate_name')
        .should('be.visible')
        .type('Joanne Doe', {force: true})
      cy.get('#initials')
        .should('be.visible')
        .type('LN', {force: true})
      cy.get('#idtype')
        .should('be.visible')
        .type('passport', {force: true})
      cy.get('#restrictions')
        .should('be.visible')
        .select('Visual History Archives', {force: true})
      cy.get('#status')
        .should('be.visible')
        .select('Sponsored Access', {force: true})
      cy.get('#cardissue')
        .should('be.visible')
        .type('2021-12-01', {force: true})
      cy.get('#cardexp')
        .should('be.visible')
        .type('2021-12-12', {force: true})
      cy.get('#notes')
        .should('be.visible')
        .type('e2e test user', {force: true})
      cy.get('button.btn-primary')
        .should('be.visible')
        .click({force: true})
      cy.get('div.msgWrap > em').contains('Success');
    });

    it('returns error message on empty form', function(){
      cy.get('button.btn-primary').click({force: true});
      cy.get('div.msgWrap > em').contains('Oops!');
    })

    it('returns error message on incomplete form', function(){
      cy.get('#guest_name')
        .type('John Doe', {force: true})
      cy.get('button.btn-primary').click({force: true});
      cy.get('div.msgWrap > em').contains('Oops!');
    })
  })

  describe('User Lookup', () => {
    it('looks up returning guests', function () {
      cy.get('#guest_name')
        .type('John', {force: true})

      cy.get('div.dropdown > select.form-select')
        .should('be.visible')
        .select('John Doe', {force: true});
    });

    it('does not show permission status if name is incomplete', function (){
      cy.get('#guest_name')
        .type('John', {force: true})
      
      cy.get('#guestPermission')
        .contains("For returning guests, type name to see permission status");
    });

    it('does not show permission status if name is not in system', function (){
      cy.get('#guest_name')
        .type('Spike Spiegel')
      
      cy.get('#guestPermission')
        .contains("For returning guests, type name to see permission status");
    })
  })
})  