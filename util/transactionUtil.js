var Transaction = require('./../database/models/transaction');
var Account = require('./../database/models/account');
var util = require('./util');

exports.makeTransaction = function(info, callback){	
	transaction = new Transaction();

	transaction.date = new Date();
	transaction.type = info.type;
	console.log(info.amount);
	if(util.isValidAmount(info.amount)){
		transaction.amount = util.formatAmount(info.amount);

		switch(transaction.type){
			case "purchase":
				transaction.location = info.location;
				transaction.comment = info.comment;
				submitTransaction(transaction, info, callback);
			break;
			case "transfer":
				// A transfer is just a withdraw and a deposit
				info.type = "withdraw";
				info.account = info.fromAccount;
				submitTransaction(transaction, info, function(){
					info.type = "deposit";
					info.account = info.toAccount
					submitTransaction(transaction, info, callback);
				});

			break;
			case "deposit":
				submitTransaction(transaction, info, callback);
			break;
			case "withdraw":
				submitTransaction(transaction, info, callback);
			break;
		}	
	} else {
		callback({status: 400, message: "Invalid 'amount'"})	
	}
}

function updateAmount(amount, change, type){
	if (type == "purchase" || type == "withdraw") {
		return String(parseFloat(amount) - parseFloat(change));
	} else if(type == "deposit") {
		return String(parseFloat(amount) + parseFloat(change));	
	}
}

function submitTransaction(transaction, info, callback){
	transaction.save(function(err, data) {
		if (err) {
			callback({status: 400, data: err});
		} else {
			// Pushes the transaction onto the account
			Account.findByIdAndUpdate(info.account, {$push: {"transactions": data}}, {safe: true, new : true}, function(err, account) {
					if (err) {
						callback({status: 400, data: err});
					}
					
					// Updates the balances of the account
					Account.findByIdAndUpdate(account._id, {"balance": util.formatAmount(updateAmount(account.balance, info.amount, info.type))}, {safe: true, new : true}, function(err, updatedAccount) {
						if (err) {
							callback({status: 400, data: err});
						}
						callback({status: 200, data: data});
					});
					
			});
			
			
		}
	});
}