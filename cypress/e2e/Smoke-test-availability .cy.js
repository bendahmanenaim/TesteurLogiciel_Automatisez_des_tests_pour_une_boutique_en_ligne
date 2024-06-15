describe('Product Availability Field Test', () => {
  const baseUrl = 'http://localhost:8080'; 

  beforeEach(() => {
    cy.log('Visite de la page des produits');
    cy.visit(`${baseUrl}/products`);
  });

  it('Vérifie la présence du champ de disponibilité du produit', () => {
    cy.log('Début du test pour vérifier la présence du champ de disponibilité du produit');

    // Vérifiez que la page de produits est chargée
    cy.get('body', { timeout: 10000 }).should('be.visible').then(() => {
      cy.log('La page de produits est visible');

      // Utilisez cy.contains pour trouver et cliquer sur le bouton "Consulter"
      cy.contains('button', 'Consulter').first().should('be.visible').click().then(() => {
        cy.log('Navigué vers la page de détails du produit');

        // Vérifiez que le champ de disponibilité est présent
        cy.contains('p', 'en stock', { timeout: 10000 })
          .should('be.visible')
          .then(() => {
            cy.log('Le champ de disponibilité du produit est visible');
          });
      });
    });
  });
});