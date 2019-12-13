/* eslint-disable no-undef */
const apiURL = 'http://localhost:8080/#/login/'

    describe('Log in', () => {
        beforeEach(() => {
            cy.visit(apiURL)
        })
        describe('With correct admin username and password', () => {
            it('log in successfully', () => {
                //  Fill out web form
                cy.get('.login-wrap > [type="text"]')
                    .type('gyy')
                cy.get('.login-wrap > [type="password"]')
                    .type('123')
                cy.get('.login-wrap > button').click()

            })
            after(() => {
                cy.wait(100)
                cy.url()
                    .should('include', 'admincenter')
            })
        })
        describe('With correct common username and password', () => {
            it('log in successfully', () => {
                cy.get('.login-wrap > [type="text"]')
                    .type('gyy123')
                cy.get('.login-wrap > [type="password"]')
                    .type('123')
                cy.get('.login-wrap > button').click()
                after(() => {
                    cy.wait(100)
                    cy.url()
                        .should('include', 'usercenter')
                })
            })
    })
        describe('With incorrect username and password', () => {
            it('fail to log in and should register', () => {
                //  Fill out web form
                cy.get('.login-wrap > [type="text"]')
                    .type('Choulaotou')
                cy.get('.login-wrap > [type="password"]')
                    .type('1748')
                cy.get('.login-wrap > button')
                    .click()
                cy.url()
                    .should('include', 'login')
                cy.get('.login-wrap > span')
                    .click()
                cy.wait(2000)
                cy.url()
                    .should('include', 'login')
                cy.get('.register-wrap > [type="text"]')
                    .type('Choulaotou')
                cy.get('.register-wrap > [type="password"]')
                    .type('1748')
                cy.get('.register-wrap > button')
                    .click()
                cy.wait(1000)
                cy.get('.login-wrap > [type="text"]')
                    .type('Choulaotou')
                cy.get('.login-wrap > [type="password"]')
                    .type('1748')
                cy.get('.login-wrap > button')
                    .click()
                cy.url()
                    .should('include', 'usercenter')



            })
        })
})
