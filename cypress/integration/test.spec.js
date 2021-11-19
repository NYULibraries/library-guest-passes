describe('The Home Page', function () {
  before(() => {
    cy.visit('/')
  })

  describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })

    it('successfully loads', function () {
      cy.contains('type')
    })
  })
})  