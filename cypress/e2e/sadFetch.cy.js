it('displays an error message if there is a failure fetching URLs', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
      fixture: 'urlsSadFetch.json'
    }).as('getUrlsError');
  
    cy.visit('http://localhost:3000/');
    cy.wait('@getUrlsError');
    cy.contains('Failed to fetch URLs.');
});
