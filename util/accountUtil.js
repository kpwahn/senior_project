var Account = require('./../database/models/account');
var Member = require('./../database/models/member');
var util = require('./util');

/*****************************************************************************
* GET ACCOUNT INFO
******************************************************************************/
exports.createAccount = function(info, callback){
	var new_account = new Account();

	new_account.member_id = info.member_id;
	new_account.name = info.account_name;
	new_account.accountNumber = Math.floor(Math.random() * (1000000000 - 1000000) + 1000000);
	new_account.type = info.account_type;
	new_account.balance = 0.00;
	new_account.transactions = [];

	new_account.save(function(err, data) {
		if (err) {
			callback(err);
		}
		
		if(info.member_id){
			// Push new account onto the appropriate member's account array
			Member.findByIdAndUpdate(info.member_id, {$push: {"accounts": data}}, {safe: true, new : true}, function(err, data) {
					if (err) {
						callback(err);
					}
					//add our new id into the member array of accounts
					callback({status: 200, data: data});
			});
		} else {
			callback({status: 200, data: data})	
		}
	});
}

exports.getAccounts = function(info, callback){
	if(info.member_id) {
		Account.find({"member_id" : info.member_id}, function(err, accounts) {
			if(err){
				callback(err);
			}else {
				accounts.forEach(function(account) {
					//Mask the account number
					account.accountNumber = account.accountNumber.replace(/\d(?=\d{4})/g, "*");				 
				});

				callback({status: 200, data: accounts});
			}
		})
	} else {
		callback({status: 401, message: "missing key 'member_id'"});		
	}
}