describe('API Tests for Adding Product to Cart with XSS Validation', () => {
    const baseUrl = 'http://localhost:8081';
    const productId = 4; // ID du produit spécifique que vous souhaitez ajouter
    const xssQuantity = "<script>alert('XSS!')</script>"; // Tentative d'injection XSS

    it('Should not execute injected script in the add to cart endpoint', () => {
        // Authentification de l'utilisateur
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

            // Envoi de la requête pour ajouter un produit au panier avec XSS potentiel dans la quantité
            cy.request({
                method: 'PUT',
                url: `${baseUrl}/orders/add`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    product: productId,
                    quantity: xssQuantity
                },
                failOnStatusCode: false
            }).then((response) => {
                // Affiche la réponse après avoir tenté d'ajouter le produit au panier avec XSS
                cy.log('Réponse après tentative d\'ajout au panier:', JSON.stringify(response.body));
                // Vérifie le statut de la réponse
                expect(response.status).to.not.eq(200);

                // Vérifiez que le corps de la réponse contient un message d'erreur approprié
                expect(response.body).to.have.property('error');
                // Vérifiez que le champ quantity est inclus dans le message d'erreur
                expect(response.body.error).to.have.property('quantity');
                // Vérifiez que le message d'erreur mentionne l'invalidité de la valeur
                if (Array.isArray(response.body.error.quantity)) {
                expect(response.body.error.quantity).to.include("This value is not valid.");
                } else {
                expect(response.body.error.quantity).to.eq("This value is not valid.");
                }
                
                // Affiche les détails de l'erreur
                cy.log('Détails de l\'erreur:', JSON.stringify(response.body.error));
            });
        });
    });
});