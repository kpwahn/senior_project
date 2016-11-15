exports.help = function(callback) {
	helpMessage = {
		status: 200,
		base_URL : "https://kpwahnschaffe.com/",
		last_Updated : "November 14, 2016",
		endpoints : {
			"http://kpwahnschaffe.com/*" : {
				"Method" : "GET",
				"requires_authentication" : false,
				"description" : "(http) Returns the default status website, no matter the route. Cannot access API with http"
			},
			"/" : {
				"Method" : "GET",
				"requires_authentication" : false,
				"description" : "Returns the default static website"
			},
			"/help" : {
				"Method" : "GET",
				"requires_authentication" : false,
				"description" : "Returns JSON explaining the API"
			},
			"/createNewMember" : {
				"Method" : "POST",
				"requires_authentication" : false
			},
			"/makeTransaction" : {
				"Method" : "POST",
				"requires_authentication" : true
			},
			"/getAccounts" : {
				"Method" : "POST",
				"requires_authentication" : true
			},
			"/createAccount" : {
				"Method" : "POST",
				"requires_authentication" : true
			},
			"/authenticate" : {
				"Method" : "POST",
				"requires_authentication" : true
			}
		}
	}
	
	return callback(helpMessage);
}