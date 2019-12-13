let url = 'http://localhost:8080/#/usercenter'

    /* eslint-disable no-undef */
    describe('Home page', () => {
        // eslint-disable-next-line no-undef
        beforeEach(() => {
            cy.visit('http://localhost:8080/#/login')
            cy.get('.login-wrap > [type="text"]')
                .type('gyy123')
            cy.get('.login-wrap > [type="password"]')
                .type('123')
            cy.get('.login-wrap > button').click()
            cy.wait(500)
            // eslint-disable-next-line no-undef
            cy.visit(url)
        })
      describe('usercenter', () => {
    it('Shows a header', () => {
        cy.get('.vue-title').should('contain', 'Home')
    })
    describe('Navigation bar and the word on the homepage', () => {
        it('Shows the required navigation bar links', () => {
            cy.get('.navbar-brand > b')
                .should('contain', 'Flowershop')
            cy.get(':nth-child(4) > .nav-link')
                .should('contain', 'Flower')
                .click()
            cy.url()
                .should('include', 'video')
            cy.get(':nth-child(3) > .nav-link > .fa')
                .should('contain', 'Map')
        })
    })
})

    })
