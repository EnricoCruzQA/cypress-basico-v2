/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche e envia o formulario', function() {
    cy.fillMandatoryFieldsAndSubmit('Enrico', 'Cruz', 'enrico@email.com', '12345678', 'Mentoria', 'lorem ipsum')
    cy.get('.success').should('be.visible')
  })

  it('verifica msg de erro ao digitar um email invalido', function() {
    cy.fillMandatoryFieldsAndSubmit('Enrico', 'Cruz', 'enrico.email.com', '12345678', 'Blog', 'lorem ipsum')
    cy.get('.error').should('be.visible')
  })

  it('verifica campo de telefone so aceita numeros', function() {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('verifica msg de erro ao marcar checkbox de telefone e nao digitar um telefone', function() {
    cy.get('#phone-checkbox').click()
    cy.fillMandatoryFieldsAndSubmit('Enrico', 'Cruz', 'enrico@email.com', '', '', 'lorem ipsum')
    cy.get('.error').should('be.visible')
  })

  it('verifica que todos os campos podem ser limpos', function() {
    cy.get('#firstName')
      .type('Enrico')
      .should('have.value', 'Enrico')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Cruz')
      .should('have.value', 'Cruz')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('enrico@email.com')
      .should('have.value', 'enrico@email.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('12345678')
      .should('have.value', '12345678')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('lorem ipsum')
      .should('have.value', 'lorem ipsum')
      .clear()
      .should('have.value', '')
  })
  it('verifica msg erro ao clicar em submit sem preencher campos', function() {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

})
