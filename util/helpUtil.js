exports.help = function(callback) {
	helpMessage = {
		status: 200,
		base_URL : "https://kpwahnschaffe.com/",
		last_Updated : "November 14, 2016",
		endpoints : {
			"http://kpwahnschaffe.com/*" : {
				"method" : "GET",
				"requires_authentication" : false,
				"description" : "(http) Returns the default status website, no matter the route. Cannot access API with http"
			},
			"/" : {
				"method" : "GET",
				"requires_authentication" : false,
				"description" : "Returns the default static website"
			},
			"/help" : {
				"method" : "GET",
				"requires_authentication" : false,
				"description" : "Returns JSON explaining the API"
			},
			"/createNewMember" : {
				"method" : "POST",
				"requires_authentication" : false,
				"description" : ""
			},
			"/makeTransaction" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : ""
			},
			"/getAccounts" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : ""
				
			},
			"/createAccount" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Enpoint used to create accounts for existing members",
				"keys" : [{key : "account_name",
						   "optional" : false}, 
						  { "key" : "account_type", 
						   "optional" : false}, 
						  { "key" : "inital_balance", 
						   "optional" : false}, 
						  { "key" : "memberId", 
						   "optional" : false}, 
						  { "key" : "token", 
						   "optional" : false}] 
			},
			"/authenticate" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Enpoint used to authenticate users",
				"keys" : [{key : "username", 
						   "optional" : false}, 
						  { "key" : "password", 
						   "optional" : false}]
				
			}
		}
	}
	
	return callback(helpMessage);
}