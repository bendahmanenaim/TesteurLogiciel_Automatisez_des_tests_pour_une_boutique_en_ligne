describe('Login API Tests', () => {
    const baseUrl = 'http://localhost:8081';
  
    // Test pour un utilisateur inconnu
    it('should return 401 for unknown user', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: 'unknown@test.fr', // Utilisateur inconnu
          password: 'wrongpassword'
        },
        failOnStatusCode: false // Ne pas échouer si le code d'état n'est pas 2xx ou 3xx
      }).then((response) => {
        // Vérifier le code de statut
        expect(response.status).to.equal(401);
      });
    });
  
    // Test pour un utilisateur connu
    it('should return 200 for known user', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: 'test2@test.fr', // Utilisateur connu
          password: 'testtest' // 
        }
      }).then((response) => {
        // Vérifier le code de statut
        expect(response.status).to.equal(200);
  
        // Sauvegarder le token pour utilisation ultérieure
        cy.wrap(response.body.token).as('authToken');
      });
    });
});