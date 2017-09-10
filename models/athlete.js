var mongoose = require('mongoose');
var moment = require('moment');
var uniqid = require('uniqid');

// Athlete Profile Schema
var AthleteSchema = mongoose.Schema({
	pid: {
		type: String
	},
	passcode: {
		type: Number,
		trim: true,
		default: null
	},
	fname: {
		type: String,
		trim: true,
		required: true
	},
	lname: {
		type: String,
		trim: true,
		required: true
	},
	bday: {
		type: Date,
		default: null
	},
	gender: {
		type: String,
		default: null
	},
	gradyr: {
		type: Date,
		default: null
	},
	sport: {
		type: String,
		trim: true,
		default: null
	},
	showweight: {
		type: Boolean,
		default: true
	},
	highrisk: {
		type: Boolean,
		default: false
	},
	bodyfat: {
		type: String,
		default: null
	}
});

// Virtual for athlete's full name
AthleteSchema
.virtual('name')
.get(function () {
  return this.fname + ' ' + this.lname;
});

// Virtual for author's URL
AthleteSchema
.virtual('url')
.get(function () {
  return '/dashboard/athlete/' + this._id;
});

var Athlete = module.exports = mongoose.model('Athlete', AthleteSchema);
// Items Needed for new athlete: fname, lname, bday

module.exports.createAthlete = function(newAthlete, callback){
	newAthlete.pid = uniqid();
	newAthlete.save(callback);
}
