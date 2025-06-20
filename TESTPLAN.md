 #Implemented tests: 
 1. Perform a credit transfer with immediate success response
 2. Perform a debit transfer with immediate success response
 3. Initiate a credit transfer with immediate rejection 
 4. Call wallet endpoints without having an access token (transfer, wallet)


 ##Additional tests - not implemented, added just a few examples 
 1. Credit/debit transfers with delayed responses 
 2. Initiate credits with values larger than the balances 
 3. Make multiple deposits with the same currency, expect only one clip with counter changes 
 3. Make multiple deposits with different currencies, expect multiple clips to be available
 4. Assuming that the validation rules are known, add negative scenarios for lengths, types and assess that the correct errors messages are returned
 5. Assuming that a backend is in place, attempt to make multiple transfers with the same transfer id 
