var mongoose = require('mongoose');

// Athlete Profile Schema
var RecordWtSchema = mongoose.Schema({
	pid: {
		type: String
	},
	date: { 
		type: Date, 
		default: Date.now
	},
	weight: {
		type: String
	}
});

var RecordWt = module.exports = mongoose.model('RecordWt', RecordWtSchema);
// Items Needed for new athlete: fname, lname, bday

module.exports.createRecordWt = function(newRecordWt, callback){
	newRecordWt.save(callback);
}

