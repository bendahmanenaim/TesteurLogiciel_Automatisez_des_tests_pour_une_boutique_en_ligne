describe('XSS Vulnerability Test - Registration Form', () => {
    const baseUrl = 'http://localhost:8080'; 

    it('Should prevent XSS in registration form', () => {
        cy.visit(`${baseUrl}/#/register`);

        
        cy.get('#email').type('test8@test.fr'); // Injection XSS dans l'e-mail
        cy.get('#firstname').type('<script>alert("XSS!");</script>'); // Injection XSS dans le prénom
        cy.get('#lastname').type('<script>alert("XSS!");</script>'); // Injection XSS dans le nom de famille
        cy.get('#password').type("';alert('XSS!');//"); // Injection XSS dans le mot de passe
        cy.get('#confirm').type("';alert('XSS!');//"); // Injection XSS dans la confirmation de mot de passe

        // Soumettez le formulaire
        cy.get('form').submit();

        // Vérifiez que l'inscription est réussie (statut 200 ou redirection appropriée)
        cy.url().should('eq', `${baseUrl}/#/dashboard`);

        // Vérifiez que l'application ne présente pas de vulnérabilités XSS
        cy.get('body').should('not.contain', '<script>alert("XSS!");</script>');
    });
});