var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var util = require('util');

//var expressJWT = require('express-jwt');
//var jwt = require('jsonwebtoken');
//var bearerToken = require('express-bearer-token');
var cors = require('cors');

const { sequelize } = require('./models');

//const passport = require('passport');

//const passportConfig = require('./passport');
//passportConfig(passport);
require('./config.js');
require('dotenv').config();

/*
//blockhcian
var hfc = require('fabric-client');
var helper = require('./safeticket_net/helper.js');
*/

var indexRouter = require('./routes/index');
var ticketRouter = require('./routes/ticket');
var tokenRouter = require('./routes/token');
//var UserRouter = require('./routes/users');


var app = express();
sequelize.sync();

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// SET CONFIGURATONS ////////////////////////////
///////////////////////////////////////////////////////////////////////////////

app.options('*', cors());
app.use(cors());
//support parsing of application/json type post data

app.use(bodyParser.json({limit: '50mb'}));
//support parsing of application/x-www-form-urlencoded post data

app.use(bodyParser.urlencoded({
	limit: '50mb', extended: true
}));

/*
// set secret variable
app.set('secret', 'thisismysecret');
app.use(expressJWT({
	secret: 'thisismysecret'
}).unless({
	path: ['/users']
}));
app.use(bearerToken());
*/
/*
app.use(function(req, res, next) {
  console.log(' ------>>>>>> new request for %s',req.originalUrl);
  
	if (req.originalUrl.indexOf('/users') >= 0) {
		return next();
	}
  var token = req.token;
	jwt.verify(token, app.get('secret'), function(err, decoded) {
		if (err) {
			res.send({
				success: false,
				message: 'Failed to authenticate token. Make sure to include the ' +
					'token returned from /users call in the authorization header ' +
					' as a Bearer token'
			});
			return;
		} else {
      
			// add the decoded user name and org name to the request object
			// for the downstream code to use
			req.username = decoded.username;
			req.orgname = decoded.orgName;
			console.log(util.format('Decoded from JWT token: username - %s, orgname - %s', decoded.username, decoded.orgName));
			return next();
		}
	});
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
/*
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie:{
    httpOnly: true,
    secure: false,
  }
}));


app.use(passport.initialize());
app.use(passport.session());
*/

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ticket',ticketRouter);
app.use('/token',tokenRouter);
//app.use('/users',UserRouter);


//create token
/*
// Register and enroll user
app.post('/users',async function(req, res) {
  var username = req.body.username;
  var orgName = req.body.orgName;
  console.log('End point : /users');
  console.log('User name : ' + username);
  console.log('Org name  : ' + orgName);
  if (!username) {
    res.json(getErrorMessage('\'username\''));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage('\'orgName\''));
    return;
  }
  
  var token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + parseInt(hfc.getConfigSetting('jwt_expiretime')),
    username: username,
    orgName: orgName
  }, app.get('secret'));
  let response = await helper.getRegisteredUser(username, orgName, true);
  
  console.log('-- returned from registering the username %s for organization %s',username,orgName);
  if (response && typeof response !== 'string') {
    console.log('Successfully registered the username %s for organization %s',username,orgName);
    response.token = token;
    res.json(response);
  } else {
    console.log('Failed to register the username %s for organization %s with::%s',username,orgName,response);
    res.json({success: false, message: response});
  }
});
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
