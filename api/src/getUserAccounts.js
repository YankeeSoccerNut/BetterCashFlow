var request = require('request');

// Set the headers
var headers = {
    'Content-Type':'application/json'
}

//Hard Code to our Use Case Account for now....could be a variable later.
var body = JSON.stringify({'LegalParticipantIdentifier':'913996201744144603'});
// Configure the request
var options = {
    url: 'https://api119525live.gateway.akana.com:443/user/accounts',
    method: 'POST',
    headers: headers,
    body: body
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(myTest);
        console.log(body);
        // Loop through the account list....
        // for (var account in body.AccessibleAccountDetailList) {
        //   console.log (account.ProductCode, account.BasicAccountDetail.Balances);
        // }

    } else {
      console.log(error)
    }
});
