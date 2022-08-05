const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 12000,
  pageLoadTimeout: 12000,
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: '**/*.cy.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
