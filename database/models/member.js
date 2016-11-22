var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our schema
var memberSchema   = new mongoose.Schema({
    	"member_name" : {type: String, unique: true, required: true},
  		"accounts": Array,									
  		"username" : {type: String, unique: true, required: true},
		"password" : {type: String, required: true}
});

// Execute before each user.save() call
memberSchema.pre('save', function(callback) {
  var member = this;

  // Break out if the password hasn't changed
  if (!member.isModified('password')) return callback();

  // Password changed so we need to hash it
	try{
		bcrypt.genSalt(5, function(err, salt) {
			if (err) {
				return callback(err);
			}

			bcrypt.hash(member.password, salt, null, function(err, hash) {
				if (err) {
					return callback(err);
				}
				member.password = hash;
				callback();
			});
		});
	} catch(e){
		console.log("ERROR THROWN BY BCRYPT");	
	}
});

memberSchema.methods.verifyPassword = function(password, callback) {
	try{
		bcrypt.compare(password, this.password, function(err, isMatch) {
			if (err) {
				return callback(err);
			}
			callback(null, isMatch);
		});
	}catch(e){
		console.log("ERROR THROWN BY BCRYPT!!!!!!!!!1");	
	}
};

// Export the Mongoose model
module.exports = mongoose.model('Member', memberSchema);