/* eslint-disable no-undef */
const URL = 'http://localhost:8080/#/productlist'


describe('Product page', () => {
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
        cy.request('http://localhost:3000/admin/product/')
            .its('body')
            .then(products => {
                products.forEach(element => {
                    cy.request('DELETE', `${'http://localhost:3000/admin/product/'}${element._id}`)
                })
            })
        cy.fixture('products').then(products => {
            // eslint-disable-next-line no-unused-vars
            let [d1, d2, d3, d4, ...rest] = products
            let four = [d1, d2, d3, d4]
            four.forEach(product => {
                cy.request('POST', `${'http://localhost:3000/admin/product/'}`, product)
            })
        })
        cy.visit(URL)
        cy.wait(2000)
    })
    describe('Product list', () => {
        it('check the product', () => {
            cy.get('tbody')
                .find('tr')
                .eq(3)
                .find('td')
                .eq(1)
                .should('contain', 'A')
            cy.get('tbody')
                .find('tr')
                .eq(3)
                .find('td')
                .eq(0)
                .should('contain', '1')
            cy.get('tbody')
                .find('tr')
                .eq(3)
                .find('td')
                .eq(3)
                .should('contain', '1')
        })
    })

})
