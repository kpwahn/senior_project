var jwt    = require('jsonwebtoken');
var config = require('./../config');
var Member = require('./../database/models/member');

exports.authenticate = function(info, callback){
	
	Member.findOne({username : info.username}, function(err, member) {
		if(err)
			callback({message: "Error at authenticateUtil - authenticate - line 6", error: err});
		
		data = {
			token: "",
			member_Id: ""
		}
		
		if(!member) {
			callback({message: "Authentication failed. User not found.", status: 403});
		} else {
			member.verifyPassword(info.password, function(err, isMatch) {
				if(!isMatch) {
					callback({message: "Authentication failed. Invalid Password.", data: data});
				} else {	
					// create a token
					var token = jwt.sign(member, config.secret, {
						expiresIn : 60 * 10 // Ten minutes
					});
					
					data = {
						token: token,
						memberId: member._id
					}
					callback({message: "Logged in!", data: data});
				}
			});
		} 
	});
}