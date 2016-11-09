var Account = require('./../database/models/account');
var Member = require('./../database/models/member');
var util = require('./util');

/*****************************************************************************
* GET ACCOUNT INFO
******************************************************************************/
exports.createAccount = function(info, callback){
	
	var new_account = new Account();
	
	new_account.memberId = info.memberId;
	new_account.name = info.account_name;
	new_account.accountNumber = Math.floor(Math.random() * (1000000000 - 1000000) + 1000000);
	new_account.type = info.account_type;
	new_account.balance = util.formatAmount(info.inital_balance);
	new_account.transactions = [];
	
	new_account.save(function(err, data) {
		if (err)
			callback({message: "Error at accountUtil - createAccount - line 19", error: err});
	
		// Push new account onto the appropriate member's account array
		Member.findByIdAndUpdate(info.memberId, {$push: {"accounts": data}}, {safe: true, new : true}, function(err) {
            	if (err)
					console.log("Error at accountUtil - line 24 " + err);
				//add our new id into the member array of accounts
				callback({message: info.account_name + " successfully created", data: data});
        });
	});
}

exports.getAccounts = function(info, callback){
	Account.find({"memberId" : info.memberId}, function(err, accounts) {
		if(err){
		
		}else {
			accounts.forEach(function(account) {
				//Mask the account number
				account.accountNumber = account.accountNumber.replace(/\d(?=\d{4})/g, "*");				 
			});
			callback(accounts);
		}
	})
}