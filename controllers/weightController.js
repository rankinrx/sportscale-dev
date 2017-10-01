var Weight = require('../models/weight');

// Handle athlete delete on POST
exports.weight_truncate = function (req, res) {
    Weight.find({ 'athlete' :req.params.id })
    .remove()
    .exec(function (err, results) {
        if (err) return handleError(err);
        //Successful, so render
        res.redirect('/dashboard/athlete/' + req.params.id);
    })
};