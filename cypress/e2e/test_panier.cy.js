describe('Panier Tests', () => {
    before(() => {
      // Connexion à l'application
      cy.visit('http://localhost:8080/#/login'); 
      // Remplissez les champs de connexion
      cy.get("[data-cy='login-input-username']").type('test2@test.fr');
      cy.get("[data-cy='login-input-password']").type('testtest');

      // Soumettez le formulaire de connexion
      cy.get("[data-cy='login-submit']").click();
       // Attendez que la connexion soit réussie et que la page se recharge 
       cy.url({ timeout: 10000 }).should('include', 'http://localhost:8080/#/');
    });
  
    it('should display added products in the cart', () => {
      // Naviguer vers la page du panier
      cy.get('[data-cy=nav-link-cart]').click();
  
      // Vérifier la présence des produits dans le panier
      cy.get('[data-cy=cart-line]').each(($el) => {
        cy.wrap($el).within(() => {
          cy.get('[data-cy=cart-line-name]').should('be.visible');
          cy.get('[data-cy=cart-line-description]').should('be.visible');
          cy.get('[data-cy=cart-line-quantity]').should('be.visible');
          cy.get('[data-cy=cart-line-total]').should('be.visible');
          cy.get('[data-cy=cart-line-delete]').should('be.visible');
        });
      });
  
      // Vérifier la présence des champs de formulaire pour l'adresse de livraison
      cy.get('[data-cy=cart-total]').should('be.visible');
      cy.get('[data-cy=cart-input-lastname]').should('be.visible');
      cy.get('[data-cy=cart-input-firstname]').should('be.visible');
      cy.get('[data-cy=cart-input-address]').should('be.visible');
      cy.get('[data-cy=cart-input-zipcode]').should('be.visible');
      cy.get('[data-cy=cart-input-city]').should('be.visible');
      cy.get('[data-cy=cart-submit]').should('be.visible');
    });
  });