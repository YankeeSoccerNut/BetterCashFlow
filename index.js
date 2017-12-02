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

const user = () => {
  const options = {
    method: 'POST',
    url: 'http://api119525live.gateway.akana.com:80/user/accounts',
    headers: {
      'postman-token': 'f97a0999-45f1-03af-b141-70af03fe754e',
      'cache-control': 'no-cache'
    },
    body: '{\n    "LegalParticipantIdentifier": "913996201744144603"\n}'
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
};

app.get('/', (req, res) => {
  const options = {
    method: 'POST',
    url: 'http://api119525live.gateway.akana.com:80/user/accounts',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"LegalParticipantIdentifier": "913996201744144603"}'
  };

  request(options, function(error, response, body) {
    if (error) console.log(error);

    res.json(body);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
