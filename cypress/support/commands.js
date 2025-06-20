const baseUrl = Cypress.env("baseUrl")

Cypress.Commands.add('login', () => { 
    
    const username = Cypress.env("email")
    const password = Cypress.env("password")

    cy.intercept("POST", "**/login", {fixture: 'loginSuccess.json'})
    cy.request({
        method: "POST",
        url: `${baseUrl}/user/login`,
        headers: {
        "X-Service-Id": "UserService" 
        },
        body: {
            username: username,
            password: password
        }
    }).then((response) => {
        cy.wrap(response.body.token).as('accessToken')
        cy.wrap(response.body.userId).as('userId')
    })
    cy.intercept("GET", "**/user/info", {fixture: 'userInfo.json'})
    cy.get("@userId").then((userId) => {
    cy.request({
        method: "GET",
        url: `${baseUrl}/user/info/${userId}`
    }).then((response) => {
        cy.wrap(response.body.wallet.Id).as('walletId')
    })
    })
  })

Cypress.Commands.add('debitRequest', (responseStatus) => {
    cy.get("@walletId").then((walletId) => {
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "POST",
                url: `${baseUrl}/wallet/${walletId}/transaction`,
                headers: {"Bearer": accessToken},
                body: {fixture: "debitBody.json"}
    }).then(response => {
        expect(response.status).to.eql(responseStatus)
    })
        })
    
    })  
})  

Cypress.Commands.add('creditRequest', (responseStatus) => {
    cy.get("@walletId").then((walletId) => {
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "POST",
                url: `${baseUrl}/wallet/${walletId}/transaction`,
                headers: {"Bearer": accessToken},
                body: {fixture: "creditBody.json"}
    }).then(response => {
        expect(response.status).to.eql(responseStatus)
    })
        })
    
    })  
})


Cypress.Commands.add('getWalletInfo', (balance, responseStatus) => {
    cy.get("@walletId").then((walletId) => {
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "GET",
                url: `${baseUrl}/wallet/${walletId}`,
                headers: {"Bearer": accessToken},
    }).then(response => {
        expect(response.body.currencyClips.balance).to.eql(balance)
        expect(response.status).to.eql(responseStatus)
    })
        })
    
    })  
})

       
Cypress.Commands.add('getTransaction', (transactionId, outcome) => {
     cy.get("@walletId").then((walletId) => {
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "GET",
                url: `${baseUrl}/wallet/${walletId}/transaction/${transactionId}`,
                headers: {"Bearer": accessToken}
            }).then(response => {
                expect(response.body.outcome).to.eql(outcome)
            })
        })
})
})