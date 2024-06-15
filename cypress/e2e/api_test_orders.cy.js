describe('API Tests for Orders', () => {
    const baseUrl = 'http://localhost:4200/';
  
    it('Requête de la liste des produits du panier', () => {
      // Authentification de l'utilisateur avant de faire la requête
      cy.request({
        method: 'POST',
        url: `${baseUrl}/api/login`, // Assurez-vous que cette URL est correcte
        body: {
          username: 'test1@test.fr',
          password: 'testtest'
        },
        failOnStatusCode: false // Pour éviter l'échec sur les codes de statut 4xx ou 5xx
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200); // Vérifiez que la connexion a réussi
        const token = loginResponse.body.token; // Assurez-vous de récupérer le token ou tout autre élément d'authentification nécessaire
  
        cy.request({
          method: 'GET',
          url: `${baseUrl}/orders`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array'); 
          // Ajoutez des vérifications supplémentaires selon les besoins
        });
      });
    });
  });