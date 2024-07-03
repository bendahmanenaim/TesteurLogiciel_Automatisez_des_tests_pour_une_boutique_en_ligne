describe('API Tests for XSS vulnerability', () => {
    const baseUrl = 'http://localhost:8081';
    const productId = 6; // ID du produit spécifique que vous souhaitez ajouter
    const quantity = 1; // Quantité de produit à ajouter
  
    it('Should not execute injected script in the add to cart endpoint', () => {
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
  
        // Envoi de la requête pour ajouter un produit au panier avec un script injecté
        cy.request({
          method: 'PUT',
          url: `${baseUrl}/orders/add`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            product: productId,
            quantity: quantity,
            comment: "<img src=x onerror=alert('XSS')>" // Injection XSS
          },
          failOnStatusCode: false
        }).then((response) => {
          // Affiche la réponse après avoir ajouté le produit au panier
          cy.log('Réponse après ajout au panier:', JSON.stringify(response.body));
          
          // Vérifie que le statut de la réponse est 400, car la requête avec injection XSS devrait échouer
          expect(response.status).to.eq(400);
  
          // Vérifie que la réponse ne contient pas le script injecté
          if (response.body && typeof response.body === 'object') {
            const responseBodyString = JSON.stringify(response.body);
            expect(responseBodyString).to.not.contain("<img src=x onerror=alert('XSS')>");
          } else {
            expect(response.body).to.not.contain("<img src=x onerror=alert('XSS')>");
          }
          
          //  Vérifiez que la réponse contient les informations attendues si le statut est 200 (ce qui ne devrait pas arriver)
          if (response.status === 200) {
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('orderLines');
            expect(response.body.orderLines).to.be.an('array');
            const orderLine = response.body.orderLines.find(line => line.product.id === productId);
            expect(orderLine).to.not.be.undefined;
            expect(orderLine.quantity).to.be.at.least(quantity);
            cy.log('Détails de la commande:', JSON.stringify(response.body));
          }
        });
      });
    });
  });