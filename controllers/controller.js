// controller for "messages" related routes
var service = require('../services/service');
var logger = require('../logger');
var async = require('async');

module.exports = {

    login: function(req, res, next) {

      var validationFail = (req.query.validation == "fail");
      var credentialsFail = (req.query.credentials == "fail");

      logger.debug("Displaying the login page");
      res.render('login',
        {
            title: 'Login',
            validationFail: validationFail,
            credentialsFail: credentialsFail
        });
    },

    giveapoint: function(req, res, next) {

      var success = req.query.success;

      logger.debug("Displaying the Give a point page");
      res.render('giveapoint',
        {
            title: 'Give a Point',
            success: success
        });

    },

    logout: function(req, res, next) {
      res.clearCookie("employeeId");
      res.redirect("/login");
    },

    loginsubmit: function(req, res, next) {

      logger.debug("Displaying the employee info page");
      var username = req.body.username;
      var password = req.body.password;
      var msg = req.query.msg;

      //validation
      if (username.length < 1 || password.length < 1) {
        res.redirect('login?validation=fail');
      } else {
        async.series({
            login: function(callback) {
                service.login(username, password, function(error, result) {
                    return callback(error, result);
                });
            }
        }, function(error, results) {
          if (error){
              // let error go to default error handler
              logger.error("Login info invalid", error);
              res.redirect('login?credentials=fail');
              return;
          }

          //retrieve the user info
          async.series({
              user: function(callback) {
                  service.getUser(results.login, function(error, result) {
                      return callback(error, result);
                  });
              }
          }, function(error, results) {
            if (error){
                // let error go to default error handler
                logger.error("Login info invalid", error);
                res.redirect('login?credentials=fail');
                return;
            }

            res.cookie('employeeId', results.user.id, {});
            res.redirect('giveapoint');
            return;
          })

        })
      }

    },

    employeelookup: function(req, res, next) {

      logger.debug("Displaying the employee lookup page");
      var currentUserId = getCurrentUser(req, res, next);

      //look on query string to see who we need to lookup
      var sameAsLoggedIn = false;
      var employeeId = req.query.employeeId;
      if (!employeeId) {
        //if not passed assume we use the current user
        employeeId = currentUserId;
        sameAsLoggedIn = true;
      }
      var msg = req.query.msg;

      //retrieve the user info
      async.series({
          user: function(callback) {
              service.getUser(employeeId, function(error, result) {
                  return callback(error, result);
              });
          }
      }, function(error, results) {
        if (error){
            // let error go to default error handler
            logger.error("Employee info invalid", error);
            res.redirect('login');
            return;
        }
        res.render('employeeinfo',
          {
              title: 'Employee Info',
              user: results.user,
              sameAsLoggedIn: sameAsLoggedIn,
              msg: msg
          });
      })

    },

    addUserAndSubmitPoints: function(req, res, next) {
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;
      var giverId = req.cookies.employeeId;
      var kudosText = req.body.kudosText;
      var kudosRating = req.body.kudosRating;
      async.series({
          user: function(callback) {
              service.addUser(firstName, lastName, function(error, result) {
                  return callback(error, result);
              });
          }
      }, function(error, results) {
        if (error){
            // let error go to default error handler
            logger.error("Error Creating a User", error);
            res.redirect('giveapoint?success=false');
            return;
        }
        else {
          var recieverId = results.user.id;
          //var recieverId = "3";
          async.series({
              submitKudos: function(callback) {
                service.submitKudos(giverId, recieverId, kudosText, kudosRating, function(error, result) {
                    return callback(error, result);
                });
              }
          }, function(error, results) {
            if (error) {
              logger.error("Error Creating a User", error);
              res.redirect('giveapoint?success=false');
            }
            else {
              res.redirect('giveapoint?success=true');
            }
          })
          return;
        }
      })
    },

    employeesearch: function(req, res, next) {

      logger.debug("Displaying the employee info page");
      var currentUserId = getCurrentUser(req, res, next);
      var firstName = req.body.firstName;
      var lastName = req.body.lastName;

      //validation
      async.series({
          employeeSearch: function(callback) {
            service.search(firstName,lastName, function(error, result) {
                return callback(error, result);
            });
          }
      }, function(error, results) {
        logger.debug(results);

        var noMatch = false;
        var failure = false;

        if (error) {
            // let error go to default error handler
            if (error == "Error: NoMatch") {
              logger.warn("Employee not found");
              noMatch = true;
            }
            else {
              logger.error("Search API returned an unknown error");
              failure = true;
            }
        }

        res.render('employeesearch',
          {
              title: 'Employee Search',
              noMatch: noMatch,
              failure: failure,
              results: results.employeeSearch
          });
      })
    },

    kudos: function(req, res, next) {

      var currentUserId = getCurrentUser(req, res, next);
      var recievedId = req.query.recievedId;
      var giverId = req.cookies.employeeId;
      var msg = req.query.msg;

      //retrieve the user info
      async.series({
          user: function(callback) {
              service.getUser(recievedId, function(error, result) {
                  return callback(error, result);
              });
          }
      }, function(error, results) {

        if (error) {
            // let error go to default error handler
            logger.error("Employee info invalid", error);
            res.redirect('login');
            return;
        }
        logger.debug("Displaying the kudos page");
        res.render('kudos',
          {
              title: 'Give Kudos',
              reciever: results.user,
              giverId: giverId,
              msg: msg
          });
      })

    },

    kudossubmit: function(req, res, next) {

      var currentUserId = getCurrentUser(req, res, next);
      var giverId = req.body.giverId;
      var recieverId = req.body.recieverId;
      var kudosText = req.body.kudosText;
      var kudosRating = req.body.kudosRating;

      async.series({
          submitKudos: function(callback) {
            service.submitKudos(giverId, recieverId, kudosText, kudosRating, function(error, result) {
                return callback(error, result);
            });
          }
      }, function(error, results) {
        if (error) {
            logger.error("Kudos API returned error: " + error)
            res.redirect('/kudos?recievedId=' + recieverId + "&msg=error");
        }
        else {
          res.redirect('/employeelookup?msg=thanks');
        }
      })

    },

    sample: function(req, res, next) {

      logger.debug("Displaying the sample page");
      res.render('sample',
        {
            title: 'Sample'
        });
    },

    getWeather: function(req, res, next) {

        // get zip from post or get
        var zip = req.query.zip;
        if (typeof zip == 'undefined') {
          zip = req.body.zip;
        }

        async.series({
            weather: function(callback) {
                service.getWeather(zip, function (error, result) {
                    return callback(error, result);
                });
            }
        }, function(error, results) {
            if (error){
                // let error go to default error handler
                logger.error("Unable to get data from API", error);
                res.status(404).send();
                return;
            }

            logger.debug("Data found for api: " + JSON.stringify(results));
            res.render('weather',
              {
                title: 'Current Weather',
                zip: zip,
                results: results.weather
              });
        })
    }

} // end module.exports

function getCurrentUser(req, res, next) {
  var employeeId = req.cookies.employeeId;
  if (!employeeId) {
      //if no cookie value then you need to login
      logger.warn("No current cookie; logging out");
      res.redirect("/login");
      return next(new Error([error]));
  }
  return employeeId;
}
