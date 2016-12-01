var Member = require('./../database/models/member');
var authUtil = require('./authenticateUtil');

/*****************************************************************************
* CREATE ACCOUNT
******************************************************************************/
exports.createNewMember = function(info, callback){		
	// Makes sure there is not already an account assoicated with the member's name or username
	Member.find({"member_name" : info.member_name, "username" : info.username}, function(err, member) {
		if (err){
			callback({status: 400, data: err});
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
					callback({status: 400, data: err});
				}else {
					data.password = info.password;
					// Log in the new user
					authUtil.authenticate(data, function(result){
						callback({status: 200, data: result});
					});
				}
			});
		}
	});
}