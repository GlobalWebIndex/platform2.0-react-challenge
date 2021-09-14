/// <reference types="cypress" />

describe('App spec', () => {
  it('opens the site and verifies the logo existence', () => {
    cy.visit('localhost:3000')
    cy.get('[data-cy=app-logo]').should('contain', 'The Cat App')
  })
})
