describe('API Tests for Product Details', () => {
    const baseUrl = 'http://localhost:8081';
    const productId = 4; // ID du produit spécifique que vous souhaitez tester
  
    it('Requête d’une fiche produit spécifique', () => {
      // Authentification de l'utilisateur avant de faire la requête (si nécessaire)
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
        cy.log('Token reçu :', token);
  
        // Envoi de la requête pour obtenir la fiche produit spécifique
        cy.request({
          method: 'GET',
          url: `${baseUrl}/products/${productId}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          
          // Affiche la réponse de la fiche produit
          cy.log('Réponse de la fiche produit:', JSON.stringify(response.body));
  
          // Vérifiez que le corps de la réponse est un objet
          expect(response.body).to.be.an('object');
          
          // Vérifiez que le produit a les propriétés attendues
          expect(response.body).to.have.property('id', productId);
          expect(response.body).to.have.property('name');
          expect(response.body).to.have.property('description');
          expect(response.body).to.have.property('price');
          expect(response.body).to.have.property('picture');
          
          // Affiche les détails du produit
          cy.log('Détails du produit:', JSON.stringify(response.body));
        });
      });
    });
  });