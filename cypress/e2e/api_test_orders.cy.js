describe('API Tests for Orders', () => {
    const baseUrl = 'http://localhost:8081';
  
    it('Requête de la liste des produits du panier', () => {
      // Authentification de l'utilisateur avant de faire la requête
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`, 
        body: {
          username: 'test2@test.fr',
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
          cy.log('Réponse de la commande:', JSON.stringify(response.body));
          // Vérifiez que le corps de la réponse est un objet
        expect(response.body).to.be.an('object');
        
        // Vérifiez que la commande a les propriétés attendues
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('firstname');
        expect(response.body).to.have.property('lastname');
        expect(response.body).to.have.property('address');
        expect(response.body).to.have.property('zipCode');
        expect(response.body).to.have.property('city');
        expect(response.body).to.have.property('date');
        expect(response.body).to.have.property('validated');
        
        });
      });
    });
  });