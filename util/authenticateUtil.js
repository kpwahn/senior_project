var jwt    = require('jsonwebtoken');
var config = require('./../config');
var Member = require('./../database/models/member');

exports.authenticate = function(info, callback){
	if(info.username) {
		Member.findOne({username : info.username}, function(err, member) {		
			if(err) {
				callback(err);
			} else if (member) {

				data = {
					token: "",
					member_id: ""
				}

				if (info.password) {
					member.verifyPassword(info.password, function(err, isMatch) {
						if(err) {
							callback(err);
						} else if (isMatch) {					
							// create a token
							var token = jwt.sign(member, config.secret, {
								expiresIn : 60 * 60 * 24 // Ten minutes
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
					callback({status: 401, message: "missing key: 'password'"});	
				}
			} else {
				callback({status: 401, message: "Username not found"});	
			}
		});
	}else {
		callback({status: 401, message: "missing key: 'username'"});	
	}
}