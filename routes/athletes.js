var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Athlete = require('../models/athlete'); //.. up one directory

// Register
router.get('/create', function (req, res) {
  res.render('create');
});

// Register Athlete
router.post('/create', function (req, res, next) {
  var fname = req.body.firstName;
  var lname = req.body.lastName;

  // Check for form errors
  var errors = req.validationErrors();
  if (errors) {
    res.render('dashbaord-settings', {
      errors: errors
    });
  } else {
    console.log('passed');
    var newAthlete = new Athlete({
      fname: fname,
      lname: lname
    });
    // Create new athlete in DB
    Athlete.createAthlete(newAthlete, function (err, athlete) {
      if (err) throw err;
      console.log(athlete);
    });

    req.flash('success_msg', 'You are registered a new athlete');
    // Redirect to dashboard home
    res.redirect('/dashboard/athletes');
  }
});


module.exports = router;
