var jwt    = require('jsonwebtoken');
var config = require('./../config');
var Member = require('./../database/models/member');

exports.authenticate = function(info, callback){
	
	Member.findOne({username : info.username}, function(err, member) {
		if(err)
			callback({status: 500, message: "Error at authenticateUtil - authenticate - line 6", error: err});
		data = {
			token: "",
			member_id: ""
		}
		
		if(!member) {
			callback({status: 403, message: "Authentication failed. User not found.", member_data: data});
		} else {
			member.verifyPassword(info.password, function(err, isMatch) {
				if(!isMatch) {
					callback({status: 403, message: "Authentication failed. Invalid Password.", member_data: data});
				} else {	
					// create a token
					var token = jwt.sign(member, config.secret, {
						expiresIn : 60 * 10 // Ten minutes
					});
					
					data = {
						token: token,
						member_id: member._id
					}
					callback({status: 200, message: "Logged in!", member_data: data});
				}
			});
		} 
	});
}