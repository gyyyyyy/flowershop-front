/* eslint-disable no-undef */
const URL = 'http://localhost:8080/#/video'


describe('Video page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/login')
        cy.get('.login-wrap > [type="text"]')
            .type('gyy123')
        cy.get('.login-wrap > [type="password"]')
            .type('123')
        cy.get('.login-wrap > button').click()
        cy.wait(1000)
        cy.url()
            .should('include', 'http://localhost:8080/#/')
        cy.visit(URL)
        cy.wait(2000)
    })
    describe('Flower meaning', () => {
        it('Watch video', () => {
            cy.get('#widget2').click()
        })
    })
})
