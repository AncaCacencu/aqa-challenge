import debitBody from '../fixtures/debitBody.json';
import creditBody from '../fixtures/creditBody.json';
var balance = 0
var responseStatus = 200

describe('Credit and Debit with immediate approval', () => {

  before(() => {cy.login();
})

   it('Debit scenario', () => {
    
    cy.intercept("POST", "**/transaction", {fixture: 'successTransaction.json'})
    cy.debitRequest(responseStatus)
    cy.getWalletInfo(balance + debitBody.amount, responseStatus)
    balance += debitBody.amount
  })

  it('Credit scenario', () => {
    cy.intercept("POST", "**/transaction", {fixture: 'successTransaction.json'})
    cy.creditRequest(responseStatus)
    cy.getWalletInfo(balance - creditBody.amount, responseStatus)
  })
})