var async = require('async');
var request = require('superagent');

var Org = require('../models/org');

exports.index = function (req, res) {
};

exports.org_get_one = function (req, res) {

};

// Handle setting update on POST
exports.org_create_post = function (req, res) {
  var currentUser = res.locals.user._id;

  //Create a setting object with escaped and trimmed data (and the old id!)
  var org = new Org(
    {
      name: req.body.orgName,
      admin: req.body.OrgAdmin,
      address: req.body.OrgAddress
    }
  );

  org.save(function (err) {
    if (err) { return next(err); }
    console.log('Orginization Created');
    res.redirect('back');
});

};