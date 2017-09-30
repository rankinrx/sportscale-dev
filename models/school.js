var mongoose = require('mongoose');

var SchoolSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	admin: {
		type: Schema.ObjectId,
		ref: 'user',
		required: true
	},
	address: {
		type: String,
		trim: true
	},


});

var School = module.exports = mongoose.model('School', SchoolSchema);

