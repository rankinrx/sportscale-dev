var mongoose = require('mongoose');
var moment = require('moment'); //for date handling

var Schema = mongoose.Schema;

// Athlete Profile Schema
var WeightSchema = mongoose.Schema({
	athlete: {
		type: Schema.ObjectId,
		ref: 'Athlete',
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		enum: ["IN", "OUT", "SAVE"],
		required: true
	},
	bodyfat: {
		type: Number,
		default: null
	},
});

// Virtual for this book instance URL
WeightSchema
	.virtual('url')
	.get(function () {
		return '/dashboard/weight/' + this._id;
	});

// Virtual for date weight was created
WeightSchema
	.virtual('date_mm_dd_yyyy')
	.get(function () {
		dateTime = this._id.getTimestamp();
		return moment.utc(this.dateTime).format('MM/DD/YYYY');
		//return moment(time).format('YYYY-MM-DD');
	});

WeightSchema
	.virtual('time_hh_mm_a')
	.get(function () {
		dateTime = this._id.getTimestamp();
		return moment(dateTime).format('h:mm a');
	});

var Weight = module.exports = mongoose.model('Weight', WeightSchema);

