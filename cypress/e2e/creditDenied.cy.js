import creditDenied from '../fixtures/creditDenied.json'
describe('Credit transfer - immediately rejected', () => {

  before(() => {cy.login();
})

   it('The response for the credit transfer is rejection', () => {
    
    cy.intercept("POST", "**/transaction", {fixture: 'creditDenied.json'})
    cy.creditRequest()
    cy.getTransaction(creditDenied.transactionId, creditDenied.outcome)
    
  })
})