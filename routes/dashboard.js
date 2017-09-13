var express = require('express');
var router = express.Router();

// Require controller modules
var athlete_controller = require('../controllers/athleteController');


/* GET Dashboard page. */
router.get('/overview', ensureAuthenticated, function (req, res, next) {
  res.render('dashboard/overview', { title: 'SportScale' });
});

/// ATHLETE ROUTES ///

/* POST request for creating Athlete. */
router.post('/athlete/create', ensureAuthenticated, athlete_controller.athlete_create_get);

// POST request to delete Athlete
router.post('/athlete/:id/delete', ensureAuthenticated, athlete_controller.athlete_delete_post);

/* GET request to update Author. (/dashboard/athlete/{id}/update)*/
router.get('/athlete/:id/update', ensureAuthenticated, athlete_controller.athlete_update_get);

/* POST request to update Author  (/dashboard/athlete/{id}/update)*/
router.post('/athlete/:id/update', ensureAuthenticated, athlete_controller.athlete_update_post);

/* GET request for one Athlete (/dashboard/athlete/{id} ). */
router.get('/athlete/:id', ensureAuthenticated, athlete_controller.athlete_detail);

/* GET request for list of all Athletes (/dashboard/athletes). */
router.get('/athletes', ensureAuthenticated, athlete_controller.athlete_list);


router.get('/settings', ensureAuthenticated, function (req, res, next) {
  res.render('dashboard/settings', { title: 'SportScale' });
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
