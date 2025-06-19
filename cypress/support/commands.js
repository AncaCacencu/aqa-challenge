Cypress.Commands.add('login', () => { 
    
    const username = Cypress.env("email")
    const password = Cypress.env("password")
    cy.intercept("POST", "**/login", {fixture: 'loginSuccess.json'})
    cy.request({
        method: "POST",
        url: "https://challenge.test.local/challenge/api/v1/user/login",
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
    cy.intercept("GET", "**/user/info", {fixture: 'userInfo.json'}),
    cy.get("@userId").then((userId) => {
    cy.request({
        method: "GET",
        url: `https://challenge.test.local/challenge/api/v1/user/info/${userId}`
    }).then((response) => {
        cy.wrap(response.body.wallet.Id).as('walletId')
    })
    })
  })

Cypress.Commands.add('creditRequest', () => {
    cy.get("@walletId").then((walletId) => {
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "POST",
                url: `https://challenge.test.local/challenge/api/v1/wallet/${walletId}/transaction`,
                headers: {"Bearer": accessToken},
                body: {fixture: "creditBody.json"}
    })
        })
    
    })  
})

Cypress.Commands.add('debitRequest', () => {
    cy.get("@walletId").then((walletId) => {
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "POST",
                url: `https://challenge.test.local/challenge/api/v1/wallet/${walletId}/transaction`,
                headers: {"Bearer": accessToken},
                body: {fixture: "debitBody.json"}
    })
        })
    
    })  
})

Cypress.Commands.add('getWalletInfo', () => {
    cy.get("@walletId").then((walletId) => {
        cy.get("@accessToken").then((accessToken) => {
            cy.request({
                method: "GET",
                url: `https://challenge.test.local/challenge/api/v1/wallet/${walletId}`,
                headers: {"Bearer": accessToken},
    })
        })
    
    })  
})

       
