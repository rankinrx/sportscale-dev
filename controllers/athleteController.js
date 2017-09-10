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
exports.athlete_delete_get = function (req, res) {

};

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
    res.send('NOT IMPLEMENTED: athlete update GET');
};

// Handle athlete update on POST
exports.athlete_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: athlete update POST');
};