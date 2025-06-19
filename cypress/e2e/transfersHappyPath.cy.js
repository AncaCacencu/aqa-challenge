describe('Credit and Debit with immediate approval', () => {

  before(() => {cy.login();
})

   it('Debit scenario', () => {
    cy.intercept("POST", "**/transaction", {fixture: 'successTransaction.json'})
    cy.debitRequest()
    cy.getWalletInfo().then(response => {
      
    })


   
  })

  it('Credit scenario', () => {
    cy.intercept("POST", "**/transaction", {fixture: 'successTransaction.json'})
    cy.creditRequest()
   
  })
})