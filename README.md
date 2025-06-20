I added a few test examples using Cypress, still, since there is no functional backend and no UI, the tests can't pass. As a side note, I intercepted a few requests and mocked the responses just for the sake of example, I am aware that in this current setup, they would not work. 
Most of the test logic is defined in the /cypress/support/commands.js as I tried to make the tests as modular as possible. 

To theoretically run the tests, the steps are: 
 - Clone the repo
 - Run `npm install`
 - Run `npx cypress run` or `npx cypress open` to use the runner