var mongoose = require('mongoose');

var account_types = 'checking savings'.split(' ')

// Define our schema
var accountSchema   = new mongoose.Schema({
		"member_id" : {type: String, required: true},
		"accountNumber" : {type: String, required: true},
    	"name" : {type: String, required: true},
		"type": {type: String, enum: account_types, required: true},
		"balance": {type: String, required: true},
		"transactions": Array
});

// Export the Mongoose model
module.exports = mongoose.model('Account', accountSchema);