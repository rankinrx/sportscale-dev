var async = require('async');

var Setting = require('../models/setting');
var User = require('../models/user');

exports.index = function (req, res) {
  res.render('dashboard/settings', { title: 'Settings'});
};


// Display list of all Athletes
exports.get_messages = function (req, res) {
    Athlete.find()
    .sort([['lname', 'ascending']])
    .exec(function (err, list_athletes) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('dashboard/athletes', { title: 'Athlete List', athlete_list:  list_athletes});
    })
};