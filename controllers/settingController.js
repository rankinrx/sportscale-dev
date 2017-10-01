var async = require('async');

var Setting = require('../models/setting');
var User = require('../models/user');
var Athlete = require('../models/athlete');
var Org = require('../models/org');


exports.index = function (req, res) {
  var currentUser = res.locals.user._id;
  res.redirect('/dashboard/settings/' + currentUser + '/update')
}

exports.setting_update_get = function (req, res) {
  req.sanitize('id').escape();
  req.sanitize('id').trim();
  
  async.parallel({
    // Find the settings of the current user
    setting: function (callback) {
      Setting.findOne({ 'admin': req.params.id }, 'ioMessage ioPercent iiMessage iiPercent _id')
        .exec(callback)
    },
    // Find details of all users
    user: function (callback) {
      User.find({}, 'name _id')
        .exec(callback)
    },
    // Find details of all orgs
    org: function (callback) {
      Org.find({})
        .exec(callback)
    }
  }, function (err, results) {
    if (err) { return next(err); }
    //Successful, so render and send current user's settings, and all user names, _id's
    res.render('dashboard/settings', {
      title: 'Update Settings',
      setting: results.setting,
      users: results.user,
      orgs: results.org
    });
  });
};

// Handle setting update on POST
exports.setting_update_post = function (req, res) {
  var currentUser = res.locals.user._id;

  req.sanitize('id').escape();
  req.sanitize('id').trim();

  // // Check to make sure form inputs are not empty
  req.checkBody('ioMessage', 'A message must be specified.').notEmpty();
  req.checkBody('iiMessage', 'A message must be specified').notEmpty();
  req.checkBody('ioPercent', 'A percent must be specified.').notEmpty();
  req.checkBody('iiPercent', 'A percent must be specified').notEmpty();

  //Run the validators
  var valErrors = req.validationErrors();

  // Get list of all admins


  //Create a setting object with escaped and trimmed data (and the old id!)
  var setting = new Setting(
    {
      ioMessage: req.body.ioMessage,
      iiMessage: req.body.iiMessage,
      ioPercent: req.body.ioPercent,
      iiPercent: req.body.iiPercent,
      // Get id for the settings document (from hidden html input posted by setting_update_get)
      _id: req.body.settingId
    }
  );

  if (valErrors) {
    //If there are errors render the form again, passing the previously entered values and errors
    res.render('dashboard/settings', { title: 'Error Updating Settings', setting: setting, errors: valErrors });
    return;
  }
  else {
    // Data from form is valid. Update the record.
    Setting.findByIdAndUpdate(setting._id, setting, {}, function (err, thesetting) {
      if (err) { return next(err); }
      //successful - redirect to genre detail page.
      console.log('settings saved');
      res.redirect('back');
    });
  }
};

exports.athlete_deleteAll_post = function (req, res) {
  var currentUser = res.locals.user._id;
  // Athlete.findById(req.params.id, function (err, athlete) {
  //   if (err) { return next(err); }
  //   //On success
  //   res.render('dashboard/athlete_form', {
  //     title: 'Update Athlete',
  //     athlete: athlete,
  //     genders: Athlete.schema.path('gender').enumValues
  //   });
  // });
  //Success
  // Impletent below in order to delete all associated weight records when an athlete is deleted
  // if (results.athlete_weights.length > 0) {
  //     //Author has books. Render in same way as for GET route.
  //     res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.athlete_weights } );
  //     return;
  // }
  //else {
  //Author has no books. Delete object and redirect to the list of authors.

  //}
  // });
};
