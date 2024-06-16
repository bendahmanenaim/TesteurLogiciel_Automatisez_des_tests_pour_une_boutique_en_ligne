describe('Test d\'Affichage des Produits', () => {
    it('Doit afficher tous les produits avec leurs informations', () => {
        const baseUrl = 'http://localhost:8080';
        cy.visit(`${baseUrl}/products`);

        // Attendre que les produits soient visibles
        cy.get('.mini-product', { timeout: 10000 }).should('be.visible').then(() => {
            cy.log('Les produits sont visibles');

            // Vérifiez l'affichage de chaque produit
            cy.get('article.mini-product').each(($product, index) => {
                cy.log(`Vérification du produit ${index + 1}`);
                cy.wrap($product).within(() => {
                    cy.get('h3').should('be.visible').then(() => {
                        cy.log('Titre du produit visible');
                    });
                    cy.get('p').should('be.visible').then(() => {
                        cy.log('Informations sur le produit visibles');
                    });
                    cy.get('button').should('be.visible').then(() => {
                        cy.log('Bouton du produit visible');
                    });
                    
                });
            });
        });
    });
});