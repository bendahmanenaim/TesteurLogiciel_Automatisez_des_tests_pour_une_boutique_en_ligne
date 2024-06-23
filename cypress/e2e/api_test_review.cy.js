describe('Ajouter un avis', () => {
    const baseUrl = 'http://localhost:8081';
  
    beforeEach(() => {
      // Effectuer la connexion pour récupérer le token
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: 'test2@test.fr',
          password: 'testtest' 
        }
      }).then((response) => {
        expect(response.status).to.equal(200);
        cy.wrap(response.body.token).as('authToken');
      });
    });
  
    it('should add a review for a product', function() {
      cy.get('@authToken').then((authToken) => {
        const reviewBody = {
          title: "un bon avis",
          comment: "Le savon * magique est le meilleur allié de vos produits Unbottled. Grâce à son aimant et sa ventouse, il vous permet de les faire sécher sur toutes leurs faces pour maximiser leur durée de vie.",
          rating: 5,
         
        };
  
        cy.log('Review Body:', reviewBody);
  
        cy.request({
          method: 'POST',
          url: `${baseUrl}/reviews`,
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: reviewBody,
          failOnStatusCode: false // Ne pas échouer si le code d'état n'est pas 2xx ou 3xx
        }).then((response) => {
          // Log the response to diagnose the issue
          cy.log('Response:', response);
  
          // Vérifier le code de statut
          expect(response.status).to.equal(200);
  
          // Vérifications supplémentaires 
          expect(response.body).to.have.property('id');
          expect(response.body).to.have.property('date');
          expect(response.body).to.have.property('title', "un bon avis");
          expect(response.body).to.have.property('comment', "Le savon * magique est le meilleur allié de vos produits Unbottled. Grâce à son aimant et sa ventouse, il vous permet de les faire sécher sur toutes leurs faces pour maximiser leur durée de vie.");
          expect(response.body).to.have.property('rating', 5);
        });
      });
    });
  });