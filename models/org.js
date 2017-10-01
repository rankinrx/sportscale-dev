var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrgSchema = mongoose.Schema({
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
	}

});

var Org = module.exports = mongoose.model('Org', OrgSchema);

