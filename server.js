/****************************************************************************
*	SSL Certificate Informaton
****************************************************************************/
var fs = require('fs');

var options = {
    ca: fs.readFileSync('./certificates/www_kpwahnschaffe_com.ca-bundle'),
	key: fs.readFileSync('./certificates/free_key.key'),
    cert: fs.readFileSync('./certificates/www_kpwahnschaffe_com.crt'),
};

var https = require('https');
var express = require('express')
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');
var RateLimit = require('express-rate-limit');

/*****************************************************************************
* FILES
******************************************************************************/
var memberUtil = require('./util/memberUtil')
var accountUtil = require('./util/accountUtil')
var transactionUtil = require('./util/transactionUtil')
var authUtil = require('./util/authenticateUtil');
var helpUtil = require('./util/helpUtil');
var config = require('./config');

var app = express();
/*****************************************************************************
* ESTABLISH CONNECTION TO DATABASE
******************************************************************************/
mongoose.connect(config.database.path);

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var limiter = new RateLimit({
  windowMs: config.limiter.windowMs,
  max: config.limiter.max,
  delayMs: config.limiter.delayMs 
});

app.use(limiter);

/*****************************************************************************
* Serve up the webpage statically
******************************************************************************/
app.use(express.static(__dirname + '/web_app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Can use this for less code, but then token must be set in the headers { authorization: 'Bearer YOUR_ID_TOKEN_HERE' }
//app.use("/api/", jwt({ secret: config.database.secret}));

/***********************************************
*   Send all requests through here
***********************************************/
function getRequestInfo(req, callback){
    
	var info = "";
	
    req.on("data",  function(data){
        info += data;
    });
	
    req.on("end", function(){
		try {
			info = JSON.parse(info);
		} catch(error) {
			callback({status: 400, message: "Malformed JSON"});	
		}
		callback(info);
    });
}

/*****************************************************************************
* Authenicate users. All endpoints go through here to ensure user has access to
* the endpoint
******************************************************************************/
function isAuthenticated(info, callback){
	if (info.token) {
		// verifies secret and checks exp
		jwt.verify(info.token, config.database.secret, function(err, decoded) {
			if (err) {
				return callback({ status: 403, success: false, message: 'Failed to authenticate token.', data: decoded });    
			} else {
				callback(info);
			}
		});
	} else {
		callback({ 
		  status: 401,
		  message: "Missing key 'token'" 
		});
	}
}

/*****************************************************************************
* ENDPOINTS
******************************************************************************/
// Hit this endpoint in order to authenicate users
app.post('/authenticate', function(req, res) {
	getRequestInfo(req, function(info){
		if (info.status == 400) {
			res.status(400);
			res.send(info);
		} else {
			authUtil.authenticate(info, function(result){
				res.send(result);
			});
		}
	});
});

app.post('/createNewMember', function(req, res) {
	getRequestInfo(req, function(info){
		if (info.status == 400) {
			res.status(info.status);
			res.send(info);
		} else {
			memberUtil.createNewMember(info, function(result){
				res.status(result.status);
				res.send(result);
			});
		}
	});
});

app.post('/createAccount', function(req, res) {
	getRequestInfo(req, function(info){
		if (info.status == 400) {
			res.status(info.status);
			res.send(info);
		} else {
			isAuthenticated(info, function(info){
				if (info.status == 403) {
					res.status(info.status);
					res.send(info);
				} else {
					accountUtil.createAccount(info, function(result) {
						res.send(result);
					});
				}
			});
		}
	});
});

app.post('/getAccounts', function(req, res) {
	getRequestInfo(req, function(info){
		if (info.status == 400) {
			res.status(info.status);
			res.send(info);
		} else {
			isAuthenticated(info, function(info){
				if (info.status == 403) {
					res.status(info.status);
					res.send(info);
				} else {
					accountUtil.getAccounts(info, function(result) {
						res.send(result);
					});
				}
			});
		}
	});
});

app.post('/removeAccount', function(req, res) {
	getRequestInfo(req, function(info){
		if (info.status == 400) {
			res.status(info.status);
			res.send(info);
		} else {
			isAuthenticated(info, function(info){
				if (info.status == 403) {
					res.status(info.status);
					res.send(info);
				} else {
					accountUtil.removeAccount(info, function(result) {
						res.send(result);
					});
				}
			});
		}
	});
});

app.post('/makeTransaction', function(req, res) {
	getRequestInfo(req, function(info){
		if (info.status == 400) {
			res.status(info.status);
			res.send(info);
		} else {
			isAuthenticated(info, function(info){
				if (info.status == 403) {
					res.status(info.status);
					res.send(info);
				} else {
					transactionUtil.makeTransaction(info, function(result) {
						res.send(result);
					});
				}
			});
		}
	});
});

app.post('/changeAccountName', function(req, res) {
	getRequestInfo(req, function(info){
		if (info.status == 400) {
			res.status(info.status);
			res.send(info);
		} else {
			isAuthenticated(info, function(info){
				if (info.status == 403) {
					res.status(info.status);
					res.send(info);
				} else {
					accountUtil.changeAccountName(info, function(result) {
						res.send(result);
					});
				}
			});
		}
	});
});


app.get('/index', function(req, res) {
	res.sendfile('/web_app/index.html', { root: __dirname });
});

app.get('/help', function(req, res) {
	helpUtil.help(function(result) {
		res.send(result);	
	});
});

/* FOR A GAME - PLEASE DELETE */
app.post('/words', function(req, res) {
	getRequestInfo(req, function(info){
		if(info.number_of_words > 50){
			res.send({message: "No more than 50 words per request"});	
		} else {
			if(info.number_of_words){
				fs.readFile('./words.txt', "utf-8", function(err, data){
					if (err) throw err;
					var textByLine = data.split("\n")
					var words = [];
			
					var i = info.number_of_words;
					while(i > 0){
						var random_number = Math.floor(Math.random() * textByLine.length);
						if ( words.indexOf(textByLine[random_number]) == -1 ){
							words.push(textByLine[random_number]);
							i--;	
						} 
					}
					res.send({data: words});
				});

			} else {
				fs.readFile('./words.txt', "utf-8", function(err, data){
					if (err) throw err;
					var textByLine = data.split("\n")

					var random_number = Math.floor(Math.random() * textByLine.length); 

					res.send({data: [textByLine[random_number]]});
				});
			}
		}
	});
});

var port = 443;

server = https.createServer(options, app).listen(port, function () {
    console.log('Securely listening on port ' + port);
});


/*****************************************************************************
* Create another server to reroute http requests to https
* (Don't forget to change the hosting settings (amazon ec2) to allow https on port 80, etc. 
******************************************************************************/
var http = require('http');
var app2 = express();

app2.get('/*', function(req, res) {	
	res.redirect('https://kpwahnschaffe.com/');
});

// Redirect from http port 8080 to https
http.createServer(app2).listen(8080	, function () {
	console.log("Listening for http requests on 8080 to reroute to https");
});