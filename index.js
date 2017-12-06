const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/api', (req, res) => {
  res.send("Invalid API route")
});

app.get('/api/getUSBankUserInfo', (req, res) => {
  console.log("hit /getUSBankUserInfo route");

  var request = require('request');

  // Set the headers
  var headers = {
      'Content-Type':'application/json'
  }

  //Hard Code to our Use Case Account for now....could be a variable later.
  var body =  JSON.stringify({'LegalParticipantIdentifier':'913996201744144603'});

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
          let USBankUserInfo = JSON.parse(body);

          console.log(USBankUserInfo.AccessibleAccountDetailList[0].BasicAccountDetail);
          // Print out the response body
          res.send(JSON.parse(body));
          // Loop through the account list....
          // for (var account in body.AccessibleAccountDetailList) {
          //   console.log (account.ProductCode, account.BasicAccountDetail.Balances);
          // }

      } else {
        console.log(error)
      }
  });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
