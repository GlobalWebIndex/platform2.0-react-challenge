/// <reference types="cypress" />

context('My Cat App', () => {
  describe('Open the app', () => {
    before(() => {
      cy.intercept('GET', '*/images/search*', {
        fixture: 'search.json'
      }).as('search');
      cy.visit('http://localhost:3000');
    });

    it('should show 10 images', () => {
      cy.get('[data-test="list-item"]').should('have.length', 10);
    });

    it('should load 10 more images when button is clicked', () => {
      cy.intercept('GET', '*/images/search*', {
        fixture: 'search.json'
      }).as('searchMore');
      cy.get('[data-test="show-more"]').click();
      cy.wait('@searchMore');
      // The images must have been doubled
      cy.get('[data-test="list-item"]').should('have.length', 20);
    });

    it('should open a modal with the image details when image is clicked', () => {
      cy.get('[data-test="cat-image-modal"]').should('not.be.visible');
      cy.url().should('eq', 'http://localhost:3000/');
      cy.get('[data-test="list-item"]').eq(7).should('be.visible').click();

      // Modal is opened
      cy.get('[data-test="cat-image-modal"]').should('be.visible');
      // The original image is shown
      cy.get('[data-test="original-cat-image"]').should('be.visible');
      // App URL has been updated
      cy.url().should('contains', '/images/agwTe5TSe');
    });

    it(`should save an image as 'favourite'`, () => {
      cy.intercept('POST', '*/favourites*', {
        fixture: 'favourites.json'
      }).as('favourite');
      cy.get('[data-test="favourite"]')
        .should('have.css', 'opacity', '0.3')
        .click();
      cy.wait('@favourite');
      cy.get('[data-test="favourite"]').should('have.css', 'opacity', '1');
    });

    it(`should show a tooltip with cat details`, () => {
      cy.get('[data-test="tooltip"]').trigger('mouseover');
      cy.wait(100);
      cy.get('[data-test="tooltip-content"]').should('be.visible').click();
      cy.url().should('contains', '/breeds');
      cy.get('[data-test="title"]').should('have.text', 'breeds');
      cy.get('[data-test="table-row"]').should('have.length', 67);
    });

    it(`should open a modal with images when a breed is clicked`, () => {
      cy.get('[data-test="table-row"]').eq(1).click();
      cy.get('[data-test="cat-breed-images-modal"]').should('be.visible');
      cy.get('[data-test="list-item"]').should('have.length', 5);
    });

    it(`should open a modal with the selected image`, () => {
      cy.get('[data-test="list-item"]').eq(0).click();
      cy.get('[data-test="cat-image-modal"]').should('be.visible');
      cy.wait(1000);
      cy.get('[data-test="original-cat-image"]').should('be.visible');
    });
  });

  describe(`Open the app directly on 'breeds' page`, () => {
    before(() => {
      cy.visit('http://localhost:3000/breeds');
    });

    it('should show a tabular list of cat breeds', () => {
      cy.get('[data-test="title"]').should('have.text', 'breeds');
      cy.get('[data-test="table-row"]').should('have.length', 67);
    });
  });

  describe(`Open the app directly on 'favorites' page`, () => {
    before(() => {
      cy.visit('http://localhost:3000/favourites');
      cy.intercept('GET', '*/favourites', {
        fixture: 'favourites.json'
      }).as('favourites');
      cy.wait('@favourites');
    });

    it('should show a list of favourite images', () => {
      cy.get('[data-test="title"]').should('have.text', 'favourites');
      cy.get('[data-test="favourites"] > *').should('have.length', 12);
    });

    it('should delete a favourite image', () => {
      cy.intercept('DELETE', /\/favourites\//, {
        fixture: 'delete-favourite.json'
      }).as('deletion');
      cy.get('[data-test="delete"]').last().click();
      cy.wait('@deletion');
      cy.intercept('GET', '*/favourites', {
        fixture: 'favourites-after-deletion.json'
      }).as('favouritesAfterDeletion');
      cy.wait('@favouritesAfterDeletion');
      cy.get('[data-test="favourites"] > *').should('have.length', 11);
    });
  });

  describe(`Open the app directly on an image`, () => {
    before(() => {
      cy.visit('http://localhost:3000/images/agwTe5TSe');
    });

    it('should show a specific image', () => {
      cy.get('[data-test="cat-image-modal"]').should('be.visible');
    });

    it('should close modal to show the home page', () => {
      cy.get('[data-test="close-modal"]').click();
      cy.get('[data-test="cat-image-modal"]').should('not.be.visible');
      cy.get('[data-test="title"]').should('have.text', 'My Cat App');
    });
  });
});
