describe('Smoke Tests login', () => {
  
    beforeEach(() => {
      // l'URL de l'application
      cy.visit('http://localhost:8080/#/login');
    });
  
    it('Vérifie la présence des champs et boutons de connexion', () => {
      // Vérifiez que le champ email est présent
      cy.get("[data-cy='login-input-username']").should('be.visible');
      
      // Vérifiez que le champ mot de passe est présent
      cy.get("[data-cy='login-input-password']").should('be.visible');
      
      // Vérifiez que le bouton de connexion est présent
      cy.get("[data-cy='login-submit']").should('be.visible'); // dans le cas ici pas de id alors , remplacer cy.get par cy.contains
    });
});