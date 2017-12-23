const config = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const index = require('./routes/index');

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


// Allow cross-origin.....
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
