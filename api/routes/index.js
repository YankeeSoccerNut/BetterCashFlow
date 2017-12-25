const config = require('../config/config');
const mySecret = config.mySecret;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');

const mysql = require('mysql');
const connection = mysql.createConnection(config.db)
connection.connect();

// need 2 passport strategies....
// 1.  Local will use email/password for login
// 2.  Jwt will use a bearer token to protect api routes

const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;

const bcrypt = require('bcrypt-nodejs');
const jwtSimple = require('jwt-simple');

// for VISAB2B
let  fs = require('fs');
let  VisaAPIClient = require('../libs/visaapiclient.js');
let  assert = require('chai').assert;
let  randomstring = require('randomstring');

let  req = request.defaults();
let  userId = config.userId ;
let  password = config.password;
let  keyFile = config.key;
let  certificateFile = config.cert;

router.get('/api', (req, res) => {
  res.send("Invalid API route")
});

router.post('/api/register',(req, res) => {
  console.log("Hit /api/register");
  console.log("req.body\n", req.body);

  //check if the user already exists...
  connection.query("select * from users where email = ?;", [req.body.email], function(err, rows){
    if (err) {
      console.log(err);
      res.json({msg: err});
      return;
    }

    if(rows.length > 0){
      res.json({msg: 'User already registered!'});
      return;
    };

    const hash = bcrypt.hashSync(req.body.password);

    const insertQuery = "INSERT INTO users (fullname,email,password,sms_phone,company_name) VALUES (?,?,?,?,?);";

    connection.query(insertQuery,[req.body.name, req.body.email, hash, req.body.phone, req.body.company], function(err, rows){
          if(err){
            console.log(err);
            res.json({msg: err});
            return;
          }
          console.log(rows.insertId);
          req.login(rows.insertId, function(err) {
            console.log("req.session.passport", req.session.passport);
            console.log("req.user: ", req.user);
            res.json({msg: 'User Registered!'});
            return;
          });
    });
  });
});


router.get('/api/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.json({token: '', status: 'User Logged Out'});
});


// Simple middleware to ensure user is authenticated.
// Use this middleware on any resource that needs to be protected.
// If the request is authenticated (typically via a persistent login session),
// the request will proceed.  Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next){

  console.log("req.user: ",req.user);
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied.
  console.log("ensureAuthenticated: Not Authorized");
  return (res.json({token: '',
              msg: 'User Not Authorized'}));
};

router.post('/api/protected', function(req, res, next) {
  console.log("hit /api/protected");

  passport.authenticate('jwt', function(err, user, info) {
    console.log("err\n", err);
    console.log("user\n", user);
    console.log("info\n", info);

    if (err) return next(err);
        if (user) {
          req.user = user;
          return next();
        } else {
          return res.status(401).json({ status: 'error', code: 'unauthorized for /api/protected' });
        }
      })(req, res, next);
});

// Passport's default behavior is to just send back a 401 unauthorized message IF it is used as middleware.  Override this default by authenticating within the route so a well-structured response can be sent back to client.

router.post('/api/login', function(req, res, next) {
  console.log("hit /api/login");
  passport.authenticate('local', function(err, user, info) {
    if(err){
      res.json({token: '', status: err});
    } else if (user) {
      console.log(user);

      console.log("After deserialize...req.session: \n", req.session);
      console.log("After deserialize...req.user: \n", req.user);



      //generate a JWT.....
      // encode
      let payload = { token: 'bar' };
      const token = jwtSimple.encode(payload, mySecret)
      console.log("token: ", token);

      //send it back....
      res.json({token: token, status: 'User Logged In'});
    } else {
      res.json({token: '', status: info});
    };
  })(req, res, next);
});

router.get('/api/getUSBankUserInfo', (req, res) => {
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

router.get('/api/reqVisaB2BAccount', (req, res) => {
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

passport.serializeUser(function(uid, done){
    done(null, uid);
});

passport.deserializeUser(function(uid, done){
    done(err, uid);
});

module.exports = router;
