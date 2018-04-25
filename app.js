var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let load = require('express-load');
var app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./nodefire-512c4-firebase-adminsdk-4dmsn-258a809b7d.json");
app.firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodefire-512c4.firebaseio.com"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

load('controllers', {cwd: 'src'})
  .then('routes')
  .into(app);

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
