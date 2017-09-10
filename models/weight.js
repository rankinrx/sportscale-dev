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
		type: String,
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
  return '/dashboard/weight/'+this._id;
});

var Weight = module.exports = mongoose.model('Weight', WeightSchema);

