var mongoose = require('mongoose');

var transaction_types = 'purchase transfer deposit withdraw'.split(' ')

// Define our schema
var transactionSchema   = new mongoose.Schema({
    	"date" : {type: String, required: true},
		"type": {type: String, enum: transaction_types, required: true},
		"location": {type: String},
		"amount": {type: String, required: true},
		"comment": {type: String}
});

// Export the Mongoose model
module.exports = mongoose.model('Transaction', transactionSchema);