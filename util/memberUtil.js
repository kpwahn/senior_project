var Member = require('./../database/models/member');

/*****************************************************************************
* CREATE ACCOUNT
******************************************************************************/
exports.createNewMember = function(info, callback){		
	// Makes sure there is not already an account assoicated with the member's name or username
	Member.find({"member_name" : info.member_name, "username" : info.username}, function(err, member) {
		if (err){
			callback({message: "Error at memberUtil - createNewMember - line 25", error: err});
		}else {
			var new_member = new Member();

			new_member.member_name = info.member_name;
			new_member.accounts = [];
			new_member.username = info.username;

			// Password is encrypted(hashed and salted) through the schema's pre "save" method
			new_member.password = info.password;

			//Call save on the Account model which is a Mongoose function that will save the model to the MongoDB database
			new_member.save(function(err, data) {
			if (err) {
				callback({message: "Error at memberUtil - createNewMember - line 39", error: err});
			}else {
				//TODO passback account numbers and such, NOT PASSWORD
				callback({status: 200, message: info.member_name + " is now a new member!", data: data});
			}
			});
		}
	});
}