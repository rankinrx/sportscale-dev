var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user'); //.. up one directory

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// Register
router.get('/register', function (req, res) {
  res.render('register');
});

// Login
router.get('/login', function (req, res) {
  res.render('login');
});

// Register User
router.post('/register', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    console.log('passed');
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    // Call our model functions we created
    User.getUserByUsername(username, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  }));


// In a typical web application, the credentials used to authenticate a user will only be transmitted 
// during the login request. If authentication succeeds, a session will be established and maintained 
// via a cookie set in the user's browser.
// Each subsequent request will not contain credentials, but rather the unique cookie that identifies 
// the session. In order to support login sessions, Passport will serialize and deserialize user 
// instances to and from the session.  

// From passport API
passport.serializeUser(function (user, done) {
  done(null, user.id);
});


// From passport API
passport.deserializeUser(function (id, done) {
  // mongoose method
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/users/login', failureFlash: true }),
  function (req, res) {
    res.redirect('/');
  });

router.get('/logout', function (req, res) {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

module.exports = router;
