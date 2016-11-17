var jwt    = require('jsonwebtoken');
var config = require('./../config');
var Member = require('./../database/models/member');

exports.authenticate = function(info, callback){
	Member.findOne({username : info.username}, function(err, member) {		
		if(err) {
			callback(err);
		} else if (member) {
		
			data = {
				token: "",
				member_id: ""
			}

			member.verifyPassword(info.password, function(err, isMatch) {
				if(err) {
					callback(err);
				} else if (isMatch) {
					
					console.log("Did this work? " + isMatch);
					
					// create a token
					var token = jwt.sign(member, config.secret, {
						expiresIn : 60 * 10 // Ten minutes
					});

					data = {
						token: token,
						member_id: member._id
					}
					
					callback({status: 200, data: data});
				} else {
					callback({status: 401, message: "Incorrect password for " + info.username});	
				}
			});
		} else {
			callback({status: 401, message: "Username not found"});	
		}
	});
}