var mongoose = require('mongoose');
var moment = require('moment'); //for date handling

// Athlete Profile Schema
// - Date: RFC 822 timestamps
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
		required: true
	},
	gender: {
		type: String,
		enum: ["Male", "Female"]
	},
	gradyr: {
		type: Number,
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

// Virtual for athletes birthday (for proper TEXT formating)
AthleteSchema
.virtual('bday_mm_dd_yyyy')
.get(function () {
  return moment.utc(this.bday).format('MM/DD/YYYY');
});

// Virtual for athletes birthday (for proper TIMEPICKER formating)
AthleteSchema
.virtual('bday_yyyy_mm_dd')
.get(function () {
  return moment.utc(this.bday).format('YYYY-MM-DD');
});


// Virtual for athletes age (no decimal needed)
AthleteSchema
.virtual('age')
.get(function () {
	yrs = moment().diff(this.bday, 'years', true);
  return yrs.toFixed(0);
});

var Athlete = module.exports = mongoose.model('Athlete', AthleteSchema);

