var mongoose = require('mongoose');

// Athlete Profile Schema
var ActivityWtSchema = mongoose.Schema({
	pid: {
		type: String
	},
	date: { 
		type: Date, 
		default: Date.now
	},
	weight: {
		type: String
	},
	type: {
		type: String
	}
});

var ActivityWt = module.exports = mongoose.model('ActivityWt', ActivityWtSchema);
// Items Needed for new athlete: fname, lname, bday

module.exports.createActivityWt = function(newActivityWt, callback){
	newActivityWt.save(callback);
}

