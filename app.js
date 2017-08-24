var express = require('express');
var gracefulShutdown = require('express-graceful-shutdown-handler');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('./logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

logger.info("Environment: " + app.get('env'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// default route
app.use(function (req, res, next) {

  // set data for all templates
  res.locals = {
    env: app.get('env')
  };

  // continue processing the route
  next();
});

// setup all other routes
require('./routes')(app);

// catch 404 (no other route handled this request) and log it
app.use(function(req, res, next) {
  logger.debug("Page not found: " + req.url);
  res.status = 404;
});

// error handlers

// Unhandled exceptions handling w/ graceful shutdown.
app.use(gracefulShutdown({
  onExceptionFn: function (err, callback) {
    logger.error("Unhandled exception detected, shutting down gracefully", err);
    return callback();
  }
}))

// development error handler will print stacktrace
if ((app.get('env') === 'development') || (app.get('env') === 'local')) {
  app.use(function(err, req, res, next) {
    logger.warn("Caught unhandled error", err);
    res.status(err.status || 500);
    res.render('error', {
      message: "This is a global error handler for development and local - " + err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  logger.warn("Caught unhandled error");
  res.status(err.status || 500);
  res.render('error', {
    message: "This is a global error handler for production and local - " + err.message,
    error: {}
  });
});

module.exports = app;
