const config = require('./api/config/config');

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const mysql = require('mysql');
const connection = mysql.createConnection(config.db)
connection.connect();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt-nodejs');

const app = express();

// For passport and persistent sessions....
// TODO: repalce secret with config.js property

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

//initialize passport...
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , function (req, email, password, done){

      if(!email || !password ) { return done(null, false, res.json({msg: 'Missing email or password'})); }

      connection.query("select * from users where email = ?;", [email], function(err, rows){


        if (err){
          console.log(err);
          return done({token: '', status: err});
        }

        if(!rows.length){
          console.log("Invalid username or password.")
          return done(null, false, {token: '', status: 'Invalid username or password.'});
        };

        const checkHash = bcrypt.compareSync(password, rows[0].password);

        if(!(checkHash)){
          console.log("No match on hash")
            return done(null, false, {token: '', status: 'Invalid username or password.'});
         };

        return done(null, rows[0]);
      });

  })); // passport.use('local'....

passport.serializeUser(function(user, done){
    done(null, user.email);
});

passport.deserializeUser(function(email, done){
    connection.query("select * from users where email = ?;", [email], function (err, rows){
        done(err, rows[0]);
    });
});


// for VISAB2B
let  fs = require('fs');
let  VisaAPIClient = require('./api/libs/visaapiclient.js');
let  assert = require('chai').assert;
let  randomstring = require('randomstring');

let  req = request.defaults();
let  userId = config.userId ;
let  password = config.password;
let  keyFile = config.key;
let  certificateFile = config.cert;


// Allow cross-origin.....
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

app.post('/api/register',(req, res) => {
  console.log("Hit /api/register");
  console.log("req.body\n", req.body);

  //check if the user already exists...
  connection.query("select * from users where email = ?;", [req.body.email], function(err, rows){
    if (err) {
      console.log(err);
      res.json({msg: err})
    }

    if(rows.length > 0){
      res.json({msg: 'User already registered!'});
    };

    const hash = bcrypt.hashSync(req.body.password);

    const insertQuery = "INSERT INTO users (fullname,email,password,sms_phone,company_name) VALUES (?,?,?,?,?);";

    connection.query(insertQuery,[req.body.name, req.body.email, hash, req.body.phone, req.body.company], function(err, rows){
          if(err){
            console.log(err);
            res.json({msg: err})
          }
          res.json({msg: 'User Registered!'});
    });
  });
});


app.get('/api/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.json({msg: 'User Logged Out'});
});


// Simple middleware to ensure user is authenticated.
// Use this middleware on any resource that needs to be protected.
// If the request is authenticated (typically via a persistent login session),
// the request will proceed.  Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied.
  console.log("ensureAuthenticated: Not Authorized");
    return res(res.json({token: '',
              msg: 'User Not Authorized'}));
};

// app.get('/protected', ensureAuthenticated, function(req, res) {
//   res.send("access granted. secure stuff happens here");
// });

// Passport's default behavior is to just send back a 401 unauthorized message IF it is used as middleware.  Override this default by authenticating within the route so a well-structured response can be sent back to client.

app.post('/api/login', function(req, res, next) {
  console.log("hit /api/login");
  passport.authenticate('local', function(err, user, info) {
    console.log("req.session.id\n", req.session.id);
    if(err){
      res.json({token: '', status: err});
    } else if (user) {
      res.json({token: req.session.id, status: 'User Logged In'});
    } else {
      res.json({token: '', status: info});
    };
  })(req, res, next);
});

app.get('/api/getUSBankUserInfo', (req, res) => {
  console.log("hit /getUSBankUserInfo route");
  console.log("req.user: ", req.user)

  let  request = require('request');

  // Set the headers
  let  headers = {
      'Content-Type':'application/json'
  }

  //Hard Code to our Use Case Account for now....could be a let iable later.
  let  body =  JSON.stringify({'LegalParticipantIdentifier':'913996201744144603'});

  // Configure the request
  let  options = {
      url: 'https://api119525live.gateway.akana.com:443/user/accounts',
      method: 'POST',
      headers: headers,
      body: body
  }

  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          let USBankUserInfo = JSON.parse(body);
          console.log("Showing subset of response...");
          console.log(USBankUserInfo.AccessibleAccountDetailList[0].BasicAccountDetail);
          // Print out the response body
          res.send(JSON.parse(body));
      } else {
        console.log(error)
      }
  });
});

app.get('/api/reqVisaB2BAccount', (req, res) => {
  console.log("hit /reqVisaB2BAccount");
  console.log("req.user: ", req.user)
  let  visaAPIClient = new VisaAPIClient();
  let  strDate = new Date().toISOString().replace(/Z/, '').replace(/\..+/, '');

  let  mVisaTransactionRequest = JSON.stringify({
  "requisitionDetails": {
  "rules": [
  {
  "overrides": [
  {
  "overrideValue": "840",
  "overrideCode": "amountCurrencyCode",
  "sequence": "0"
  },
  {
  "overrideValue": "55",
  "overrideCode": "amountValue",
  "sequence": "0"
  }
  ],
  "ruleCode": "VPAS"
  }
  ],
  "timeZone": "8",
  "endDate": "2017-12-14",
  "startDate": "2017-01-13"
  },
  "optionalInfo": [
  {
  "optionalFiledValue": "12345678901234567",
  "optionalFieldName": "TWOTewst"
  },
  {
  "optionalFiledValue": "12345112",
  "optionalFieldName": "12345"
  }
  ],
  "numberOfCards": "1",
  "action": "A",
  "proxyPoolId": "12345",
  "accountNumber": "1234567123456",
  "buyerId": "107777",
  "clientId": "B2BWS_107777_5126",
  "messageId": "2017-12-03T05:28:29.000Z"
  });

  console.log(keyFile);
  console.log(certificateFile);


  let  baseUri = 'vpa/v1/requisitionService/';
  let  resourcePath = '';
  visaAPIClient.doMutualAuthRequest(baseUri + resourcePath, mVisaTransactionRequest, 'POST', {},
  function(err, response) {
    if(!err) {
      console.log("VISAB2B BODY........");
      console.log(response['body']);
      res.send(JSON.parse(response['body']));
    } else {
      assert(false);
      res.json({
        data: [{msg: "FAIL from reqVisaB2BAccount API!"}]
      });
    };
  });
});


const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
