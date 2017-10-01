var express = require('express');
var router = express.Router();

// Require controller modules
var overview_controller = require('../controllers/overviewController');
var athlete_controller = require('../controllers/athleteController');
var setting_controller = require('../controllers/settingController');
var org_controller = require('../controllers/orgController');


///-------------------------------------- OVERVIEW ROUTES --------------------------------------///

/* GET Dashboard homepage. */
router.get('/overview', ensureAuthenticated, overview_controller.index);
/* GET Dashboard homepage. */


///-------------------------------------- ATHLETE ROUTES --------------------------------------///

/* GET request for list of all Athletes (/dashboard/athletes). */
router.get('/athletes', ensureAuthenticated, athlete_controller.athlete_list);
/* POST request for list of all Athletes (/dashboard/athletes). */
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
/* GET request for deleting all Athletes (/dashboard/athletes/delete). */
/* POST request for deleting all Athletes (/dashboard/athletes/delete). */
//router.post('/athletes/delete', ensureAuthenticated, athlete_controller.athlete_deleteAll_post);
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
/* GET request for one Athlete's history (/dashboard/athlete/{id}/history ). */
router.get('/athlete/:id/history', ensureAuthenticated, athlete_controller.athlete_history);
/* POST request for one Athlete's history (/dashboard/athlete/{id}/history ). */
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///


///------------------------------------- SETTINGS ROUTES --------------------------------------///

/* GET request for settings main page (redirects to /dashboard/setting/{id} ). */
router.get('/settings', ensureAuthenticated, setting_controller.index);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
/* GET request to update Settings. (/dashboard/settings/{id}/update)*/
router.get('/settings/:id/update', ensureAuthenticated, setting_controller.setting_update_get);
/* POST request to update Settings  (/dashboard/settings/{id}/update)*/
router.post('/settings/:id/update', setting_controller.setting_update_post);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
/* POST request to create a new user's Settings  (/dashboard/settings/create/{ID of new user)*/
// router.post('/settings/create/:newId', ensureAuthenticated, setting_controller.setting_create_post);


///------------------------------------- ORG ROUTES --------------------------------------///

/* POST request for creating new org */
router.post('/org/create', ensureAuthenticated, org_controller.org_create_post);
// /* GET request for list of all orgs. */
// router.get('/orgs', ensureAuthenticated, org_controller.index);
// /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///
// /* GET request for orgs of a specific user. */
// router.get('/orgs/:id', ensureAuthenticated, org_controller.org_get);
/* POST request for orgs of a specific user. */
router.get('/org/:id', ensureAuthenticated, org_controller.org_get_one);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ///


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
