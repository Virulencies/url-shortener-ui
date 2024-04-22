it('shows an error message if submitting a form with incomplete data', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
        statusCode: 422,
        fixture: 'urlsSadPost.json'
    }).as('postUrlError');

    cy.visit('http://localhost:3000/');
    cy.get('input[name="title"]').type('Only Title');
    cy.contains('Missing long_url in request.');
});
