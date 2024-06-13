/// <reference types="cypress" />

describe('Smoke Tests login', () => {
  
    beforeEach(() => {
      // l'URL de l'application
      cy.visit('http://localhost:8080/#/login');
    });
  
    it('Vérifie la présence des boutons d’ajout au panier quand vous êtes connecté', () => {
      // Remplissez les champs de connexion
      cy.get("[data-cy='login-input-username']").type('test1@test.fr');
      cy.get("[data-cy='login-input-password']").type('testtest');
  
      // Soumettez le formulaire de connexion
      cy.get("[data-cy='login-submit']").click();
  
      // Attendez que la connexion soit réussie et que la page se recharge 
      cy.url({ timeout: 10000 }).should('include', 'http://localhost:8080/#/');
  
      // Sélectionnez un produit au hasard
      cy.get('[data-cy="product-home-link"]').then($products => {
        // Choisissez un produit au hasard parmi la liste
        const randomIndex = Math.floor(Math.random() * $products.length);
        cy.wrap($products[randomIndex]).click();
  
        // Vérifiez que le bouton d'ajout au panier est présent
        cy.get('[data-cy="detail-product-add"]', { timeout: 10000 }).should('be.visible');
      });
    });
  
  });