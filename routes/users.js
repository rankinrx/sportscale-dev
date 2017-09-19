var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user'); //.. up one directory

// Require controller modules
var user_controller = require('../controllers/userController');

//-------------------------------------- REGISTER ROUTES --------------------------------------///

/* GET request for list of all Athletes (/dashboard/athletes). */
router.get('/register', user_controller.user_register_get);
/* POST request or user registration (/dashboard/athletes). */
router.post('/register', user_controller.user_register_post, );
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///

// Login
router.get('/login', function (req, res) {
  res.render('login');
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
  passport.authenticate('local', { successRedirect: '/dashboard/overview', failureRedirect: '/users/login', failureFlash: true }),
  function (req, res) {
    res.redirect('/');
  });

router.get('/logout', function (req, res) {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

module.exports = router;
