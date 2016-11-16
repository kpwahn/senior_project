exports.help = function(callback) {
	helpMessage = {
		status: 200,
		base_URL : "https://kpwahnschaffe.com/",
		last_Updated : "November 14, 2016",
		endpoints : {
			"http://kpwahnschaffe.com/*" : {
				"method" : "GET",
				"requires_authentication" : false,
				"description" : "(http) Returns the default static website, no matter the route. Cannot access API with http"
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
				"description" : "",
				"keys" : [{key : "member_name",
						   "optional" : false}, 
						  { "key" : "username", 
						   "optional" : false}, 
						  { "key" : "password", 
						   "optional" : false}] 
			},
			"/makeTransaction" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Endpoint used to make transactions",
				"keys" : [{key : "member_id",
						   "optional" : false}, 
						  { "key" : "token", 
						   "optional" : false}, 
						  { "key" : "type",
						   "possible_values" : ["purchase", "transfer", "deposit", "withdraw"],
						   "optional" : false}, 
						  { "key" : "amount", 
						   "optional" : false}] 
				
				//Add in other keys for specific types, or add that once they hit this endpoint?
			},
			"/getAccounts" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Endpoint returns all the accounts for the provided member",
				"keys" : [{key : "member_id",
						   "optional" : false}]
			},
			"/createAccount" : {
				"method" : "POST",
				"requires_authentication" : true,
				"description" : "Enpoint used to create accounts for existing members",
				"keys" : [{ "key" : "member_id", 
						   "optional" : false}, 
						  { "key" : "token", 
						   "optional" : false},
						  {key : "account_name",
						   "optional" : false}, 
						  { "key" : "account_type",
						   "possible_values" : ["savings", "checking"],
						   "optional" : false}, 
						  { "key" : "inital_balance", 
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