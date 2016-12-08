var Account = require('./../database/models/account');
var Member = require('./../database/models/member');
var util = require('./util');

/*****************************************************************************
* GET ACCOUNT INFO
******************************************************************************/
exports.createAccount = function(info, callback){
	var new_account = new Account();
	
	new_account.member_id = info.member_id;
	new_account.name = info.name;
	new_account.account_number = Math.floor(Math.random() * (1000000000 - 1000000) + 1000000);
	new_account.type = info.type;
	new_account.balance = 0.00;
	new_account.transactions = [];
	
	new_account.save(function(err, data) {
		if (err) {
			callback(err);
		} else {
			Account.find({"name" : info.name}, function(err, account) {
				if(err) {
					callback({status: 400, data: err});
				} else if (account.length > 1) {
					callback({status: 400, message: "Account name already exists"});	
				}
				else {
					if(info.member_id){
						// Push new account onto the appropriate member's account array
						Member.findByIdAndUpdate(info.member_id, {$push: {"accounts": data}}, {safe: true, new : true}, function(err, data) {
								if (err) {
									callback({status: 400, data: err});
								}
								//add our new id into the member array of accounts
								callback({status: 200, data: data});
						});
					} else {
						callback({status: 200, data: data})	
					}
				}
			});
		}
	});
}

exports.removeAccount = function(info, callback) {
	if (info.account_number || info.member_id ){
		callback({status: 401, message: "Missing key 'token'" });	
	} else {
		Account.remove({"member_id": info.member_id, "account_number": info.account_number}, function(err, account) {
			if (err) {
				callback({status: 400, data: err});	
			} else {
				if( account.result.n == 0){
					callback({status: 400, message: "No account or member found"});
				} else {
					callback({status: 200, message: "Account removed"});
				}
			}	
		});
	}
}

exports.getAccounts = function(info, callback){
	if(info.member_id) {
		Account.find({"member_id" : info.member_id}, function(err, accounts) {
			if(err){
				callback({status: 400, data: err});
			}else {
//				accounts.forEach(function(account) {
//					//Mask the account number
//					account.account_number = account.account_number.replace(/\d(?=\d{4})/g, "*");				 
//				});

				callback({status: 200, data: accounts});
			}
		})
	} else {
		callback({status: 401, message: "missing key 'member_id'"});		
	}
}

exports.changeAccountName = function(info, callback) {
	if(info.account_number && info.new_account_name){
		// Push new account onto the appropriate member's account array
		Account.update(info.account_number, {name: info.new_account_name}, function(err, data) {
				if (err) {
					callback({status: 400, data: err});
				}
				//add our new id into the member array of accounts
				callback({status: 200, data: data});
		});
	} else {
		callback({status: 401, message: "missing key 'account_number' or 'new_account_name'"});	
	}
}