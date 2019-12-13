/* eslint-disable no-undef */
const URL = 'http://localhost:8080/#/addproduct'
describe('admin login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/login')
        cy.get('.login-wrap > [type="text"]')
            .type('gyy')
        cy.get('.login-wrap > [type="password"]')
            .type('123')
        cy.get('.login-wrap > button').click()
        cy.wait(1000)
        cy.url()
            .should('include', 'http://localhost:8080/#/')
        cy.request('https://flowershop-master.herokuapp.com/admin/product/')
            .its('body')
            .then(products => {
                products.forEach(element => {
                    cy.request('DELETE', `${'https://flowershop-master.herokuapp.com/admin/product/'}${element._id}`)
                })
            })
        cy.fixture('products').then(products => {
            // eslint-disable-next-line no-unused-vars
            let [d1, d2, d3, d4, ...rest] = products
            let four = [d1, d2, d3, d4]
            four.forEach(product => {
                cy.request('POST', `${'https://flowershop-master.herokuapp.com/admin/product/'}`, product)
            })
        })
        cy.visit(URL)
        cy.wait(2000)
    })
    describe('Product list', () => {
        it('Add a product successfully', () => {
            cy.get(':nth-child(2) > .form__input')
                .type('Gyy')
            cy.get('label')
                .contains('Price')
                .next()
                .clear()
                .type('0')
            cy.get(':nth-child(5) > .form__input')
                .clear()
                .type('1')

            cy.get(':nth-child(7) > .btn')
                .click()
            cy.get(':nth-child(8) > .btn')
                .click()
            cy.wait(500)
            cy.url()
                .should('include', 'product')

        })
        it('add s production with error', () => {
            cy.get('label')
                .contains('Price')
                .next()
                .type('0')
            cy.get('.error').contains('Price')
                .should('exist')
            cy.get('label')
                .contains('Name')
                .next()
                .clear()
            cy.get('.error').contains('Required')
                .should('exist')
            cy.get('label')
                .contains('Amount')
                .next()
                .clear()
            cy.get('.error').contains('Required')
                .should('exist')

        })

    })

})
