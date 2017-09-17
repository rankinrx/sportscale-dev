var express = require('express');
var router = express.Router();

// Require controller modules
var overview_controller = require('../controllers/overviewController');
var athlete_controller = require('../controllers/athleteController');
var setting_controller = require('../controllers/settingController');


///-------------------------------------- OVERVIEW ROUTES --------------------------------------///

/* GET Dashboard homepage. */
router.get('/overview', ensureAuthenticated, overview_controller.index);
/* GET Dashboard homepage. */


///-------------------------------------- ATHLETE ROUTES --------------------------------------///

/* GET request for list of all Athletes (/dashboard/athletes). */
router.get('/athletes', ensureAuthenticated, athlete_controller.athlete_list);
/* POST request for list of all Athletes (/dashboard/athletes). */
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
/* GET request for creating Athlete. */
/* POST request for creating Athlete. */
router.post('/athlete/create', ensureAuthenticated, athlete_controller.athlete_create_post);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
/* GET request for one Athlete (/dashboard/athlete/{id} ). */
router.get('/athlete/:id', ensureAuthenticated, athlete_controller.athlete_detail);
/* POST request for one Athlete (/dashboard/athlete/{id} ). */
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
// GET request to delete Athlete
// POST request to delete Athlete
router.post('/athlete/:id/delete', ensureAuthenticated, athlete_controller.athlete_delete_post);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
/* GET request to update Author. (/dashboard/athlete/{id}/update)*/
router.get('/athlete/:id/update', ensureAuthenticated, athlete_controller.athlete_update_get);
/* POST request to update Author  (/dashboard/athlete/{id}/update)*/
router.post('/athlete/:id/update', ensureAuthenticated, athlete_controller.athlete_update_post);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///


///------------------------------------- SETTINGS ROUTES --------------------------------------///

/* GET request for settings main page (/dashboard/athlete/{id} ). */
router.get('/settings', ensureAuthenticated, setting_controller.index);


///---------------------------------------- FUNCTIONS -----------------------------------------///

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}

module.exports = router;
