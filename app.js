const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//HTTPS通信で使用するためのSSLキーを設定
const ssloptions = {
	key: fs.readFileSync ('/home/tshimakawa/sslKey/privkey.pem'),
        cert: fs.readFileSync('/home/tshimakawa/sslKey/cert.pem'),
        ca: [fs.readFileSync('/home/tshimakawa/sslKey/chain.pem'), fs.readFileSync('/home/tshimakawa/sslKey/fullchain.pem','utf-8')],
requestCert: true,
rejectUnauthorized: false
};

app.use('/', index);
app.use('/users', users);
//app.login('/login',login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// ポート設定
app.set('httpsport', process.env.PORT || 44502);

// サーバ立ち上げ
var server = https.createServer(ssloptions,app).listen(app.get('httpsport'), function(){
    console.log('Express HTTPS server listening on port ' + app.get('httpsport'));
});

module.exports = app;
