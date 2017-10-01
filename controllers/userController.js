var async = require('async');
var bcrypt = require('bcryptjs');

var Setting = require('../models/setting');
var User = require('../models/user');

exports.user_register_get = function (req, res) {
    res.render('register');
};

exports.user_register_post = function (req, res) {
    // Grab data from body of the html document
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Check for matching passwords (Validation)
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        // Problem validating body
        res.render('register', {
            title: 'Error Registering User',
            errors: errors
        });
    } else {
        // Data from form is valid
        console.log('1 - Form Validation Passed');

        var newUser = new User
            ({
                name: name,
                email: email,
                username: username,
                password: password
            });

        var setting = new Setting(
            {
                admin: newUser._id
            });

        setting.save(function (err) {
            if (err) { return next(err); }
            console.log('2 - Settings were made for the new user')
        });

        // Use bcrrypt to hash the password
        // 1) generate salt: bcrypt.genSalt(rounds, callback)
        //  - callback(err,salt): 'salt' is the generated salt
        // 2) Use bcrypt to  encypt password bcrypt.hash(data, salt)
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) { return next(err); }
                    req.flash('success_msg', 'New User Registered');
                    //successful - redirect to new author record.
                    res.redirect('/dashboard/settings');
                });
            });
        });
    }
};


