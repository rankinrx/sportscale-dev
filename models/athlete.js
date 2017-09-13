var mongoose = require('mongoose');
var moment = require('moment'); //for date handling

// Athlete Profile Schema
var AthleteSchema = mongoose.Schema({
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
	},
	school: {
		type: String
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

// Virtual for athletes birthday (for proper formating)
AthleteSchema
.virtual('bday_yyyy_mm_dd')
.get(function () {
  return moment(this.bday).format('YYYY-MM-DD');
});

// Virtual for athletes graduation year (for proper formating)
AthleteSchema
.virtual('gradyr_yyyy_mm_dd')
.get(function () {
  return moment(this.gradyr).format('YYYY-MM-DD');
});

var Athlete = module.exports = mongoose.model('Athlete', AthleteSchema);
// Items Needed for new athlete: fname, lname, bday

module.exports.createAthlete = function(newAthlete, callback){
	newAthlete.save(callback);
}
