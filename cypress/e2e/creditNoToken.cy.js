balance = 0
responseStatus = 401

describe('Call the wallet endpoints without having an access token', () => {

   it('Initiate a credit transfer without an access token', () => {

    cy.creditRequest(responseStatus)
    
  })

  it('Initiate a debit transfer without an access token', () => {

    cy.debitRequest(responseStatus)
    
  })

  it('Request the wallet information without an access token', () => {
    cy.getWalletInfo(balance, responseStatus)
  })

})