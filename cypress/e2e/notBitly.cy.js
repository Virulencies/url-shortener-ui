describe('URL Shortener', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'urls.json' }).as('getUrls');
    });
  
    it('displays the page title, form, and existing shortened URLs', () => {
      cy.contains('URL Shortener');
      cy.get('form');
      cy.get('.url').should('have.length', 2);
    });
  
    it('reflects the input field values as the user types', () => {
      cy.get('input[name="title"]').type('Random Title');
      cy.get('input[name="urlToShorten"]').type('https://www.testUrl.com');
      cy.get('input[name="title"]').should('have.value', 'Random Title');
      cy.get('input[name="urlToShorten"]').should('have.value', 'https://www.testUrl.com');
    });
  
    it('adds a new shortened URL when the form is submitted', () => {
      cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
        statusCode: 201,
        fixture: 'urls.json' 
      }).as('postUrl');
      cy.get('input[name="title"]').type('New URL');
      cy.get('input[name="urlToShorten"]').type('https://new.url');
      cy.get('button').click();
      cy.get('.url').should('have.length', 3);
    });
  });
  