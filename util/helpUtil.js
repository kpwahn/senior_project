exports.help = function(callback) {
	helpMessage = {
		status: 200,
		base_URL : "https://kpwahnschaffe.com/",
		last_Updated : "November 14, 2016",
		endpoints : {
			"/" : "Returns the default static website",
			"/help" : "Returns JSON explaining the API"
		}
	}
	
	return callback(helpMessage);
}