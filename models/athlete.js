var mongoose = require('mongoose');
var moment = require('moment');
var uniqid = require('uniqid');

// Athlete Profile Schema
var AthleteSchema = mongoose.Schema({
	pid: {
		type: String
	},
	createdate: { 
		type: Date, 
		default: Date.now
	},
	passcode: {
		type: Number
	},
	fname: {
		type: String
	},
	lname: {
		type: String
	},
	bday: {
		type: Date
	},
	gender: {
		type: String
	},
	gradyr: {
		type: Date
	},
	sport: {
		type: String
	},
	showweight: {
		type: Boolean
	}
});

var Athlete = module.exports = mongoose.model('Athlete', AthleteSchema);
// Items Needed for new athlete: fname, lname, bday

module.exports.createAthlete = function(newAthlete, callback){
	newAthlete.pid = uniqid();
	newAthlete.save(callback);
}

