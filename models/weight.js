var mongoose = require('mongoose');

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
		required: true
	}
});

// Virtual for this book instance URL
WeightSchema
	.virtual('url')
	.get(function () {
		return '/dashboard/weight/' + this._id;
	});

// Virtual for date weight was created
WeightSchema
	.virtual('time_yyyy_mm_dd')
	.get(function () {
		time = this._id.getTimestamp();
		return time
		//return moment(time).format('YYYY-MM-DD');
	});

var Weight = module.exports = mongoose.model('Weight', WeightSchema);

