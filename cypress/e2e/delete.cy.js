describe('Delete URL functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'urls.json' }).as('getUrls');
        cy.wait('@getUrls');
    });

    it('allows a user to delete a URL', () => {
        cy.intercept('DELETE', 'http://localhost:3001/api/v1/urls/1', {
            statusCode: 204
        }).as('deleteUrl');

        cy.get('.url').should('have.length', 2);
        cy.contains('Delete').first().click();
        cy.wait('@deleteUrl');
        cy.get('.url').should('have.length', 1);
    });
});
