var Transaction = require('./../database/models/transaction');
var Account = require('./../database/models/account');

exports.makeTransaction = function(info, callback){
	transaction = new Transaction();
	
	transaction.date = new Date();
	transaction.type = info.type;
	transaction.amount = info.amount;
	
	transaction.amount = formatTransactionAmount(transaction.amount);
	
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
}

function updateAmount(amount, change, type){
	if (type == "purchase" || type == "withdraw") {
		return parseFloat(amount) - parseFloat(change);
	} else if(type == "deposit") {
		return parseFloat(amount) + parseFloat(change);	
	}
}

function formatTransactionAmount(amount) {
	console.log("Checking for decimal: " + amount);
	console.log(amount.indexOf("."));
	if(amount.indexOf(".") == -1){
		console.log("Didn't but now does " + amount.concat(".00"));
		return amount.concat(".00");
	} else if (amount.indexOf(".") == (amount.length - 1) ){
		
		return amount.concat("0");
	} else { amount.indexOf(".") == -1
		console.log("Already had it " + amount);
		return amount;
	}
}

function submitTransaction(transaction, info, callback){
	transaction.save(function(err, data) {
		if (err) {
			callback({message: "Error at transactionUtil - submitTransaction - line 36", error: err});
		} else {
			// Pushes the transaction onto the account
			Account.findByIdAndUpdate(info.account, {$push: {"transactions": data}}, {safe: true, new : true}, function(err, account) {
					if (err)
						console.log("Error at transactionUtil - line 51 " + err);
					
					// Updates the balances of the account
					Account.findByIdAndUpdate(account._id, {"balance": updateAmount(account.balance, info.amount, info.type)}, {safe: true, new : true}, function(err, updatedAccount) {
						
						if (err) {
							console.log("Error at accountUtil - line 51 " + err);
						}
						callback({message: "transaction complete", data: data});
					});
					
			});
			
			
		}
	});
}