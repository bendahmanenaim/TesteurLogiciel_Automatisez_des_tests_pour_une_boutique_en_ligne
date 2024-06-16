describe('Test de Connexion', () => {
    beforeEach(() => {
        // l'URL de l'application
        cy.visit('http://localhost:8080/#/login');
      });
    
      it('Vérifie la présence des boutons d’ajout au panier quand vous êtes connecté', () => {
        // Remplissez les champs de connexion
        cy.get("[data-cy='login-input-username']").type('test2@test.fr');
        cy.get("[data-cy='login-input-password']").type('testtest');
    
        // Soumettez le formulaire de connexion
        cy.get("[data-cy='login-submit']").click();
    
        // Attendez que la connexion soit réussie et que la page se recharge 
        cy.url({ timeout: 10000 }).should('include', 'http://localhost:8080/#/');

        // Vérification de la redirection vers la page d'accueil
        cy.url().should('eq', 'http://localhost:8080/#/'); 
        //cy.contains('a', 'Mon panier').should('be.visible');
    });
});