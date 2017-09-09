var express = require('express');
var router = express.Router();

var Athlete = require('../models/athlete');

/* GET Dashboard page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('dashboard', { title: 'SportScale' });
});

router.get('/athletes', ensureAuthenticated, function (req, res, next) {
  Athlete.find(function(err, athletes) {
    if (err) return next(err);
    res.render('dashboard-athletes', {
      athletes: athletes
    })
  });
});

router.get('/settings', ensureAuthenticated, function (req, res, next) {
  res.render('dashboard-settings', { title: 'SportScale' });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}

module.exports = router;
