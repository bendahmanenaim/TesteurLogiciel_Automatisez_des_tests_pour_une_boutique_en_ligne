describe('API Tests', () => {
    const baseUrl = 'http://localhost:8081';
  
    it('Vérifie l\'accès non authentifié aux données confidentielles d\'un utilisateur', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/orders`,
        failOnStatusCode: false // Empêche Cypress de faire échouer le test sur une réponse non 2xx
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
    
      });
    });
  });