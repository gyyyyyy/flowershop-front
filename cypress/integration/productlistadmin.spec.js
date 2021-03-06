/* eslint-disable no-undef */
const URL = 'http://localhost:8080/#/productlistadmin/'

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
    describe('Delete operation', () => {
        it('reduces the no. of products by 1', () => {
            cy.get('tbody')
                .find('tr')
                .should('have.length', 4)
            // Click trash/delete link of 3rd donation in list
            cy.get('tbody')
                .find('tr')
                .eq(2)
                .find('td')
                .eq(7)
                .click()
            cy.get('tbody')
                .find('tr')
                .should('have.length', 3)
        })
    })

    describe('Edit operation', () => {
        it('edit the student successfully', () => {
            cy.get('tbody')
                .find('tr')
                .eq(2)
                .find('td')
                .eq(6)
                .click()
            cy.wait(1000)
            cy.url()
                .should('include', 'edit')
            cy.get('label')
                .contains('Price')
                .next()
                .clear()
                .type('1')
            cy.get('button[type=submit]').click()
            cy.get(':nth-child(8) > .btn').click()
            cy.url().should('include', '/productlistadmin')
            cy.get('tbody')
                .find('tr')
                .should('have.length', 4)
            cy.get(':nth-child(3) > :nth-child(3)')
                .contains(1)
        })
            it('edit student with error', () => {
                cy.get('tbody')
                    .find('tr')
                    .eq(2)
                    .find('td')
                    .eq(6)
                    .click()
                cy.wait(1000)
                cy.url()
                    .should('include', 'edit')
                cy.get('label')
                    .contains('Price')
                    .next()
                    .clear()
                    .type('0')
                cy.get('.error').contains('Price')
                    .should('exist')
                cy.get('label')
                    .contains('Name')
                    .next()
                cy.get('.error').contains('Required')
                    .should('exist')
                cy.get('label')
                    .contains('Amount')
                    .next()
                    .clear()
                    .type('0')
                cy.get('.error').contains('Amount')
                    .should('exist')
                cy.get('button[type=submit]').click()

        })
    })
})
