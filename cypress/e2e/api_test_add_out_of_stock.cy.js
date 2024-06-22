describe('API Tests for Adding Out of Stock Product to Cart', () => {
    const baseUrl = 'http://localhost:8081';
    const outOfStockProductId = 3; // Remplacez par l'ID d'un produit en rupture de stock
    const quantityToAdd = 1; // Quantité de produit à ajouter
  
    it('Ajouter un produit en rupture de stock au panier', () => {
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
        const token = loginResponse.body.token;
        cy.log('Token reçu :', token);
  
        // Envoi de la requête pour ajouter un produit en rupture de stock au panier
        cy.request({
          method: 'PUT',
          url: `${baseUrl}/orders/add`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            product: outOfStockProductId, // L'ID du produit en rupture de stock
            quantity: quantityToAdd
          },
          failOnStatusCode: false // Pour capturer les erreurs et vérifier les messages
        }).then((addResponse) => {
          // Affiche la réponse après avoir tenté d'ajouter le produit au panier
          cy.log('Réponse après tentative d\'ajout au panier:', JSON.stringify(addResponse.body));
  
          // Vérifie le statut de la réponse
          expect(addResponse.status).to.eq(400); // Vérifiez que la requête retourne une erreur 400 (Bad Request)
  
          // Vérifiez que le corps de la réponse contient le message d'erreur attendu
          expect(addResponse.body).to.have.property('error');
          expect(addResponse.body.error).to.include('Product out of stock'); // Remplacez par le message d'erreur exact si connu
  
          // Affiche les détails de l'erreur
          cy.log('Détails de l\'erreur:', JSON.stringify(addResponse.body));
        });
      });
    });
  });