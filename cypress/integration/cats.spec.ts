/// <reference types="cypress" />

describe('Cat spec', () => {
  it('loads the cats page and makes sure it has 10 images', () => {
    cy.visit('localhost:3000/cats')
    cy.get('img[data-cy=cat-image]').should('have.length', 10)
  })
})
