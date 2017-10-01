var async = require('async');

var Weight = require('../models/weight');
var Athlete = require('../models/athlete');
var Org = require('../models/org')

// Display list of all Athletes
exports.athlete_list = function (req, res) {
    var currentUser = res.locals.user._id;

    // Find school who's admin is the current user
    Org.findOne({ 'admin': currentUser }, '_id name', function (err, userOrg) {
        if (err) return handleError(err);

        // If super the use is Admin (Rob) them show all athletes
        if (userOrg.name === "superorg") {
            Athlete.find()
                .sort([['lname', 'ascending']])
                .exec(function (err, list_athletes) {
                    if (err) { return next(err); }
                    //Successful, so render

                    // Im also an admin, find all orgs
                    Org.find()
                        .exec(function (err, list_orgs) {
                            if (err) { return next(err); }

                            res.render('dashboard/athlete_list',
                                {
                                    title: 'Athlete List',
                                    athlete_list: list_athletes,
                                    orgs: list_orgs

                                });
                        });
                })
        }
        // If not super admin show only athlets who's org property is equal to the user's
        else {
            Athlete.find({ 'org': userOrg._id })
                .sort([['lname', 'ascending']])
                .exec(function (err, list_athletes) {
                    if (err) { return next(err); }
                    //Successful, so render
                    res.render('dashboard/athlete_list', { title: 'Athlete List', athlete_list: list_athletes });
                });

        }
    });
};

// Display detail page for a specific athlete on GET
exports.athlete_detail = function (req, res) {

    // 1.) Simultaniously look for athlete and weight information
    async.parallel({
        athlete: function (callback) {
            Athlete.findById(req.params.id)
                .exec(callback)
        },
        athletes_weights: function (callback) {
            Weight.find({ 'athlete': req.params.id }, 'weight type')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) return handleError(err);
        //Successful - 3.) Find the name of the orginization the athlete is associated with
        Org.findById(results.athlete.org, 'name', function (err, org) {
            if (err) return handleError(err);
            //Success
            res.render('dashboard/athlete_detail', {
                athlete: results.athlete,
                athlete_weights: results.athletes_weights,
                org: org.name
            });
        })
    });
};

// Handle athlete create on POST
exports.athlete_create_post = function (req, res) {
    // Grab first and last name from body of client browser
    req.checkBody('firstName', 'First name must be specified.').notEmpty(); //We won't force Alphanumeric, because people might have spaces.
    req.checkBody('lastName', 'Last name must be specified.').notEmpty();

    req.sanitize('firstName').escape();
    req.sanitize('lastName').escape();
    req.sanitize('firstName').trim();
    req.sanitize('lastName').trim();
    req.sanitize('bday').toDate();

    // 1) Get current user id
    var currentUser = res.locals.user._id;

    // If user is superadmin than grab org out of textbox on page
    if (req.body.org) {
        var athlete = new Athlete(
            {
                fname: req.body.firstName,
                lname: req.body.lastName,
                bday: req.body.bday,
                org: req.body.org
            });
        athlete.save(function (err) {
            if (err) return handleError(err);
            //success
            req.flash('success_msg', 'You have registered a new athlete');
            res.redirect(athlete.url + '/update');
        });
    }
    else {
        // If not superadmin, then find school related to current user
        Org.findOne({ 'admin': currentUser }, '_id', function (err, adminOrg) {
            if (err) return handleError(err);
            // Create athlete model with current user's org._id
            var athlete = new Athlete(
                {
                    fname: req.body.firstName,
                    lname: req.body.lastName,
                    bday: req.body.bday,
                    org: adminOrg
                });

            athlete.save(function (err) {
                if (err) return handleError(err);

                //success
                req.flash('success_msg', 'You have registered a new athlete');
                res.redirect(athlete.url + '/update');
            });
        });
    }
};

// Handle athlete delete on POST
exports.athlete_delete_post = function (req, res) {
    //Success
    Athlete.findByIdAndRemove(req.params.id, function deleteAthlete(err) {
        if (err) return handleError(err);
        //Success
        Weight.find({ 'athlete': req.params.id })
            .remove()
            .exec(function (err, results) {
                if (err) return handleError(err);
                //Successful, so render
                res.redirect('/dashboard/athletes');
            });
    })
};

// Display athlete update form on GET
exports.athlete_update_get = function (req, res) {

    req.sanitize('id').escape();
    req.sanitize('id').trim();
    Athlete.findById(req.params.id, function (err, athlete) {
        if (err) { return next(err); }
        //On success
        res.render('dashboard/athlete_form', {
            title: 'Update Athlete',
            athlete: athlete,
            genders: Athlete.schema.path('gender').enumValues
        });
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
    req.sanitize('bodyfat').trim();
    req.sanitize('passcode').trim();
    req.sanitize('bday').toDate();

    //Capitilize first letter of sport entry
    sportCAP = req.body.sport.charAt(0).toUpperCase() + req.body.sport.slice(1);


    //Run the validators
    var valErrors = req.validationErrors();
    //Create a author object with escaped and trimmed data (and the old id!)
    var athlete = new Athlete(
        {
            fname: req.body.fname,
            lname: req.body.lname,
            bday: req.body.bday,
            gender: req.body.gender,
            sport: sportCAP,
            passcode: req.body.passcode,
            gradyr: req.body.gradyr,
            highrisk: req.body.highrisk || false,
            showweight: req.body.showweight || false,
            bodyfat: req.body.bodyfat,
            _id: req.params.id
        }
    );
    if (valErrors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('athlete_form', { title: 'Error Updating Athlete', athlete: athlete, valErrors: valErrors });
        return;
    }
    else {
        // Data from form is valid. Update the record.
        Athlete.findByIdAndUpdate(req.params.id, athlete, {}, function (err, theathlete) {
            if (err) { return next(err); }
            //successful - redirect to genre detail page.
            res.redirect(theathlete.url);
        });
    }
};

// Display history page for a specific athlete on GET
exports.athlete_history = function (req, res) {

    async.parallel({
        athlete: function (callback) {
            Athlete.findById(req.params.id)
                .exec(callback)
        },
        weights: function (callback) {
            Weight.find({ 'athlete': req.params.id }, 'type date time_hh_mm_a weight bodyFat')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) return handleError(err);
        //Successful
        res.render('dashboard/athlete_history', {
            athlete: results.athlete,
            athlete_weights: results.weights
        });
    });
};


