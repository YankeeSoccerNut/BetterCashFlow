const config = require('../config/config');
const mySecret = config.mySecret;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');

const loadUserFinAccounts = require('../src/loadUserFinAccounts');

const saveUserPlan = require('../src/saveUserPlan');

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
const jwt = require('jsonwebtoken');

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

router.get('/', (req, res) => {
  console.log("req.user: ", req.user);
  console.log("req.isAuthenticated: ", req.isAuthenticated());
  res.send("Invalid API route")
});

router.get('/api', (req, res) => {
  console.log("req.user: ", req.user);
  console.log("req.isAuthenticated: ", req.isAuthenticated());
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

    console.log(rows);
    if(rows.length > 0){
      res.json({msg: 'User already registered!'});
      return;
    };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users (fullname,email,password,sms_phone,company_name) VALUES (?,?,?,?,?);";

    connection.query(insertQuery,[req.body.name, req.body.email, hash, req.body.phone, req.body.company], function(err, rows){
          if(err){
            console.log(err);
            res.json({msg: err});
            return;
          }
          console.log("rows.insertId: ", rows.insertId);
          req.login(rows.insertId, function(err) {
            // payload is encoded with token...
            let payload = { uid: rows.insertId };

            const token = jwt.sign(payload, mySecret, {expiresIn: "1d"});
            console.log("token: ", token);

            console.log("req.session.passport", req.session.passport);
            console.log("req.user: ", req.user);
            res.json({status: 'User Registered!',
                      token: token});
            return;
          });
    });
  });
});

router.post('/api/login', function(req, res, next) {
  console.log("hit /api/login");
  passport.authenticate('local', function(err, user, info) {

    if(err){
      res.json({token: '', status: err});
      return;
    };

    console.log("authenticated user: ")

    req.login(user.id, function(err) {

      const token = jwt.sign({ uid: user.id }, mySecret, {expiresIn: "1d"})
      console.log("token: ", token);

      console.log("req.session.passport", req.session.passport);
      console.log("req.user: ", req.user);
      res.json({status: 'User Logged In!',
                token: token});
      return;
    });
  })(req, res, next);
});


router.get('/api/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.json({token: '', status: 'User Logged Out'});
});


// Passport's default behavior is to just send back a 401 unauthorized message IF it is used as middleware.  Override this default by authenticating within the route so a well-structured response can be sent back to client.

router.post('/api/loadUserFinAccounts', function(req, res) {
  console.log("hit /api/loadUserFinAccounts");

  passport.authenticate('jwt', function(err, user, info) {
    console.log("err\n", err);
    console.log("user\n", user);
    console.log("info\n", info);

    if (err) {
      console.log(err);
      res.json({status: 'Error', msg: err});
      return;
    };

    if (user) {
      console.log("user:" , user)
      console.log("req.user", req.user);
      console.log("req.session.passport.user: ", req.session.passport);

      // feels like I should be deserializing the user with the uid....req.user is undefined at this point...req.session.passport.user is also undefined.  Note:  I don't think I even need sessions for this app!

      const userAccountsObj = loadUserFinAccounts(user.uid);

      res.json(userAccountsObj)
      return;
    } else {
      return res.status(401).json({ status: 'error', code: 'unauthorized for requested route' });
    }
  })(req, res);
});

router.post('/api/saveUserPlan', function(req, res, next) {
  console.log("hit /api/saveUserPlan");

  passport.authenticate('jwt', function(err, user, info) {

    console.log("user\n", user);
    console.log("info\n", info);

    if (err) {
      console.log(err);
      res.json({status: 'Error', msg: err});
      return;
    };

    if (user) {

      let saveSuccess = saveUserPlan(user.uid, connection, req.body.planObject, req.body.transactions);

      if(saveSuccess) {
        console.log("returning success to client...")
        res.json({message: "return from saveUserPlan"});
        return
      };

      console.log("returning fail to client");
      res.json({message: "fail in saveUserPlan"});
      return;
    } else {
      console.log("returning 401 to client");
      return res.status(401).json({ status: 'error', code: 'unauthorized for requested route' });
    }
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

passport.deserializeUser(function(uid, err, done){
    done(err, uid);
});

function authenticationMiddleware() {
  return(req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();

    res.json({status: 'User is not authenticated', token: ''});
  }
}
module.exports = router;
