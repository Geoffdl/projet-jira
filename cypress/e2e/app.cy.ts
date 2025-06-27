describe('Jirafe App', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display the main application components', () => {
        cy.contains('Jirafe').should('be.visible');
        cy.get('app-navbar').should('exist');
        cy.get('main').should('exist');
        cy.get('app-footer').should('exist');
        cy.get('app-all-boards').should('exist');
        cy.contains('My First Board').should('be.visible');
    });
});
