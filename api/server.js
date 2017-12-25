const config = require('./config/config');
const mySecret = config.mySecret;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const request = require('request');

const index = require('./routes/index');

const mysql = require('mysql');
const connection = mysql.createConnection(config.db)
connection.connect();

const session = require('express-session');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOpts = {};

jwtOpts.jwtFromRequest = ExtractJwt.fromBodyField('token');
jwtOpts.secretOrKey = mySecret;
jwtOpts.tokenBodyField = 'token';

const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(session({ secret: mySecret, resave: false, saveUninitialized: false })); // cookie: {secure: true }
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// passport auth strategies.....
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

  passport.use('jwt', new JwtStrategy(jwtOpts, function (jwtPayload, done){

    // match the token in the payload against the token in the session...if no match or err then return false to protect route...

    // for now...everything passes!
    console.log("jwtPayload: ", jwtPayload);
    return done(null, user);

    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
  }));

// Allow cross-origin.....

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
