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
/*****************************************************************************
* FILES
******************************************************************************/
var memberUtil = require('./util/memberUtil')
var accountUtil = require('./util/accountUtil')
var transactionUtil = require('./util/transactionUtil')
var authUtil = require('./util/authenticateUtil');
var config = require('./config');

var app = express();
/*****************************************************************************
* ESTABLISH CONNECTION TO DATABASE
******************************************************************************/
mongoose.connect(config.database);

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/web_app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Can use this for less code, but then token must be set in the headers { authorization: 'Bearer YOUR_ID_TOKEN_HERE' }
//app.use("/api/", jwt({ secret: config.secret}));

/***********************************************
*   Send all requests through here
***********************************************/
function getRequestInfo(req, callback){

    var info = "";
    req.on("data",  function(data){
        info += data;
    });
	
    req.on("end", function(){
		info = JSON.parse(info);
        callback(info);
    });
}

function isAuthenticated(info, callback){
	 // check header or url parameters or post parameters for token
	  if (info.token) {
		// verifies secret and checks exp
		jwt.verify(info.token, config.secret, function(err, decoded) {
			
		  if (err) {
			return callback({ success: false, message: 'Failed to authenticate token.' });    
		  } else {
			callback(info);
		  }
		});

	  } else {
		  //No token
		  callback({ 
			  status: 403,
			  success: false, 
			  message: 'No token provided.' 
		  });

	  }
}

/*****************************************************************************
* ENDPOINTS
******************************************************************************/
app.post('/authenticate', function(req, res) {
	getRequestInfo(req, function(info){
		authUtil.authenticate(info, function(result){
			res.send(result);
		});
	});
});

app.post('/createNewMember', function(req, res) {
	getRequestInfo(req, function(info){
		memberUtil.createNewMember(info, function(result){
			res.send(result);
		});
	});
});

// In order to create an account you must have the members _id value (maybe implement a unique member number?
app.post('/createAccount', function(req, res) {
	getRequestInfo(req, function(info){
		isAuthenticated(info, function(info){
			if(info.status == 403){
				res.send(info);
			}else {
				accountUtil.createAccount(info, function(result){
					res.send(result);
				});
			}
		});
	});
});

app.post('/getAccounts', function(req, res) {
	getRequestInfo(req, function(info){
		isAuthenticated(info, function(info){
			if(info.status == 403){
				res.send(info);
			}else {
				accountUtil.getAccounts(info, function(result){
					res.send(result);
				});
			}
		});
	});
});

app.post('/makeTransaction', function(req, res) {
	getRequestInfo(req, function(info){
		isAuthenticated(info, function(info){
			if(info.status == 403){
				res.send(info);
			}else {
				transactionUtil.makeTransaction(info, function(result){
					res.send(result);
				})
			}
		});
	});
});

app.get('/index', function(req, res) {
		console.log(__dirname + "/web_app/index.html");
		res.sendfile('/web_app/index.html', { root: __dirname });
    });

var port = 443;

//server = https.createServer(options, app).listen(port, function () {
//    console.log('Securely listening on port ' + port);
//});

var http = require('http');
var app2 = express();

app2.get('*', function(req, res) {
		console.log("We made it!");
		res.redirect('https://kpwahnschaffe.com');
});

// Redirect from http port 8080 to https
http.createServer(app2).listen(8080	, function () {
	console.log("listening for http requests on 8080");
});