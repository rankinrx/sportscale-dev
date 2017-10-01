var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

// User Schema
// - trim: remove whitespace from front and back of text
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		index:true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		required: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

// module.exports.createUser = function(newUser, callback){
//     // Use bcrrypt to hash the password
//     bcrypt.genSalt(10, function(err, salt) {
// 	    bcrypt.hash(newUser.password, salt, function(err, hash) {
// 	        newUser.password = hash;
// 	        newUser.save(callback);
// 	    });
// 	});
// }

// Its good to keep these function within the model (could of placed within the user.js route)
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

