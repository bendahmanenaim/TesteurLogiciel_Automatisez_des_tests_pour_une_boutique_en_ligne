describe('API Tests for Adding Product to Cart', () => {
    const baseUrl = 'http://localhost:8081';
    const productId = 4; // ID du produit spécifique que vous souhaitez ajouter
    const quantity = 1; // Quantité de produit à ajouter
  
    it('Ajouter un produit disponible au panier', () => {
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
        const token = loginResponse.body.token; 
        cy.log('Token reçu :', token);
  
        // Envoi de la requête pour ajouter un produit au panier
        cy.request({
          method: 'Put',
          url: `${baseUrl}/orders/add`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            productId: productId,
            quantity: quantity
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
  
          // Affiche la réponse après avoir ajouté le produit au panier
          cy.log('Réponse après ajout au panier:', JSON.stringify(response.body));
  
          // Vérifiez que le corps de la réponse est un objet
          expect(response.body).to.be.an('object');
  
          // Vérifiez que la réponse contient les informations attendues
          expect(response.body).to.have.property('id');
          expect(response.body).to.have.property('productId', productId);
          expect(response.body).to.have.property('quantity', quantity);
          expect(response.body).to.have.property('orderLines');
  
          // Affiche les détails de la réponse
          cy.log('Détails de la commande:', JSON.stringify(response.body));
        });
      });
    });
  });