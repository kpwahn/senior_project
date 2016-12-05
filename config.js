module.exports = {
    "limiter": {
		"windowMs": 15*60*1000, // 15 minutes
		"max": 100, // limit each IP to maxx requests per windowMS
		"delayMs": 0 // diable delaying (full speed until max limit is reached)
	},
	"database": {
		"path": "mongodb://localhost:27017/bank",
		"secret": "ilovescotchyscotch"
	}
};