var async = require('async');

var Athlete = require('../models/athlete');
var Weight = require('../models/weight')

// Display list of all Athletes
exports.athlete_list = function (req, res) {
    Athlete.find()
    .sort([['lname', 'ascending']])
    .exec(function (err, list_athletes) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('dashboard/athletes', { title: 'Athlete List', athlete_list:  list_athletes});
    })
};

// Display detail page for a specific athlete
exports.athlete_detail = function (req, res) {
    
    async.parallel({
        athlete: function(callback) {
            Athlete.findById(req.params.id)
              .exec(callback)
        },
        // Finds weights associated with the id of a requested athlete
        athletes_weights: function(callback) {
            Weight.find({ 'athlete': req.params.id },'weight type')
          .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('dashboard/athlete_detail', { 
            title: 'Athlete Detail', 
            athlete: results.athlete, 
            athlete_weights: results.athletes_weights
        });
    });
};

// Display athlete create form on GET
exports.athlete_create_get = function (req, res) {
    var fname = req.body.firstName;
    var lname = req.body.lastName;
  
    // Check for form errors
    var errors = req.validationErrors();
    if (errors) {
      res.render('dashboard/athletes', {
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
      // Redirect to athletes home
      res.redirect('/dashboard/athletes');
    }
};

// Handle athlete create on POST
exports.athlete_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: athlete create POST');
};

// Display athlete delete form on GET
// exports.athlete_delete_get = function (req, res) {

// };

// Handle athlete delete on POST
exports.athlete_delete_post = function (req, res) {
    req.checkBody('athleteid', 'Athlete id must exist').notEmpty();
    
        async.parallel({
            athlete: function(callback) {
              Athlete.findById(req.body.athleteid).exec(callback)
            },
            athlete_weights: function(callback) {
              Weight.find({ 'athlete': req.body.athleteid }).exec(callback)
            },
        }, function(err, results) {
            if (err) { return next(err); }
            //Success
            // Impletent below in order to delete all associated weight records when an athlete is deleted
            // if (results.athlete_weights.length > 0) {
            //     //Author has books. Render in same way as for GET route.
            //     res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.athlete_weights } );
            //     return;
            // }
            //else {
                //Author has no books. Delete object and redirect to the list of authors.
                Athlete.findByIdAndRemove(req.body.athleteid, function deleteAthlete(err) {
                    if (err) { return next(err); }
                    //Success - got to author list
                    res.redirect('/dashboard/athletes')
                })
    
            //}
        });
};

// Display athlete update form on GET
exports.athlete_update_get = function (req, res) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();
    Athlete.findById(req.params.id, function(err, athlete) {
        if (err) { return next(err); }
        //On success
        res.render('dashboard/athlete_form', { title: 'Update Athlete', athlete: athlete });

    });
};

// Handle athlete update on POST
exports.athlete_update_post = function (req, res) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();

    req.checkBody('fname', 'First name must be specified.').notEmpty();
    req.checkBody('lname', 'Last name must be specified.').notEmpty();
    req.checkBody('lname', 'Last name must be alphanumeric text.').isAlpha();
    req.sanitize('fname').escape();
    req.sanitize('lname').escape();
    req.sanitize('fname').trim();
    req.sanitize('lname').trim();
    req.sanitize('sport').trim();
    req.sanitize('gender').trim();
    req.sanitize('passcode').trim();
    req.sanitize('bday').toDate();
    req.sanitize('gradyr').toDate();

    //Run the validators
    var errors = req.validationErrors();

    //Create a author object with escaped and trimmed data (and the old id!)
    var athlete = new Athlete(
      {
      fname: req.body.fname,
      lname: req.body.lname,
      bday: req.body.bday,
      gender: req.body.gender,
      sport: req.body.sport,
      passcode: req.body.passcode,
      gradyr: req.body.gradyr,
      _id: req.params.id
      }
    );

    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('athlete_form', { title: 'Update Athlete', athlete: athlete, errors: errors});
    return;
    }
    else {
        // Data from form is valid. Update the record.
        Athlete.findByIdAndUpdate(req.params.id, athlete, {}, function (err,theathlete) {
            if (err) { return next(err); }
               //successful - redirect to genre detail page.
               res.redirect(theathlete.url);
            });
    }


};