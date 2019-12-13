/* eslint-disable no-undef */
const URL = 'http://localhost:8080/#/productlistuser'
describe('admin login', () => {
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
      products.forEach(product => {
        cy.request('POST', `${'http://localhost:3000/admin/product/'}`, product)
      })
    })
    cy.visit(URL)
    cy.wait(2000)
  })

  it('displays first 10 products only', () => {
    cy.get('tbody')
      .find('tr')
      .should('have.length', 10)
    cy.get('tbody')
      .find('tr')
      .its('length')
      .should('be.lt', 11)
    cy.get('tbody')
      .find('tr')
      .eq(2)
      .find('td')
      .eq(2)
      .should('contain', '1') // its('length').should('be.lt',11)
  })

  it('starts at the 11th product on the next page', () => {
    cy.get('ul.pagination')
      .find('li')
      .eq(2)
      .next()
      .click() // 2nd page link
    cy.get('tbody')
      .find('tr')
      .should('have.length', 6)
    cy.get('tbody')
      .find('tr')
      .eq(2)
      .find('td')
      .eq(2)
      .should('contain', '1') // its('length').should('be.lt',11)
  })
})
