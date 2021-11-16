describe('The Home Page', function () {
  describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })

    it('successfully loads', function () {
      cy.visit('/')
      cy.contains('type')
    })
  })
})  