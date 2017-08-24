var request = require('request');
var logger = require('../logger');
var config = require('konphyg')(__dirname + '/../config');

login = function(username, password, callback) {

    var targetURL = config("properties").baseApiUrl + "login";
    authCredentials = {};
    authCredentials.username = username;
    authCredentials.password = password;
    logger.info("Calling service: " + targetURL);

    request({
        method: 'POST',
        url: targetURL,
        json: authCredentials,
        headers: {
          'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (error) {
            return callback(error, null);
        }
        else if (!response) {
            logger.error("No response from get API");
            return callback(new Error("No response from get API"));
        }
        else if (response.statusCode != 200) {
            logger.error("Get API returned status " + response.statusCode);
            return callback(new Error("Get API returned status " + response.statusCode), null);
        }
        else if (body){
            return callback(null, body);
        }
        else {
            return callback(new Error("Undetermined error calling get API"), null);
        }
    })
};
addUser = function(firstname, lastname, callback) {

    var targetURL = config("properties").baseApiUrl + "user";
    userData = {};
    userData.firstname = firstname;
    userData.lastname = lastname;
    userData.username = lastname;
    userData.password = firstname;
    userData.department = "Operations";

    logger.info("Calling service: " + targetURL);
    logger.info("With data: " + JSON.stringify(userData));

    request({
        method: 'POST',
        url: targetURL,
        json: userData,
        headers: {
          'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (error) {
            return callback(error, null);
        }
        else if (!response) {
            logger.error("No response from add user API");
            return callback(new Error("No response from add user API"));
        }
        else if (response.statusCode == 200) {
          return callback(null, body);
          }
        else if (response.statusCode != 200) {
            logger.error("Add user API returned status " + response.statusCode);
            return callback(new Error("Add user API returned status " + response.statusCode), null);
        }
        else {
            return callback(new Error("Undetermined error calling add user API"), null);
        }
    })
};

search = function(firstname, lastname, callback) {


    logger.debug("Getting the Search results");


    var targetURL = config("properties").baseApiUrl + "employee/search/firstname/"+firstname+"/lastname/"+lastname;
    console.log ("Target url " + targetURL);

    request({
        method: 'GET',
        url: targetURL
    }, function (error, response, body) {
        if (error) {
            return callback( error, null);
        }
        else if (!response) {
            return callback(new Error("No response from get search results"));
        }
         else if (response.statusCode == 404) {
            return callback(new Error("NoMatch"), null);
        }
        else if (response.statusCode != 200) {
            return callback(new Error("Get Search API returned status " + response.statusCode), null);
        }

        else if (body){
            logger.debug(body);
            var resultObject = JSON.parse(body);
            return callback(null, resultObject);
        }
        else {
            return callback(new Error("Undetermined error calling get Search API"), null);
        }
    })
};

getUser = function(userId, callback) {
    logger.debug("Getting the user");

    var targetURL = config("properties").baseApiUrl + "user/" + userId;
    request({
        method: 'GET',
        url: targetURL
    }, function (error, response, body) {
        if (error) {
            return callback( error, null);
        }
        else if (!response) {
            return callback(new Error("No response from get user API"));
        }
        else if (response.statusCode != 200) {
            return callback(new Error("Get user API returned status " + response.statusCode), null);
        }
        else if (body){
            logger.debug(body);
            var resultObject = JSON.parse(body);
            return callback(null, resultObject);
        }
        else {
            return callback(new Error("Undetermined error calling get user API"), null);
        }
    })
};

getWeather = function(id, callback) {
    logger.debug("Getting something from an api");
    logger.debug(id);

    var targetURL = config("properties").weatherServerUrl + '/data/2.5/weather?zip=' + id + ',us&units=imperial&APPID=7c45065e8081fd769b74d36262862dc6';
    request({
        method: 'GET',
        url: targetURL
    }, function (error, response, body) {
        if (error) {
            return callback( error, null);
        }
        else if (!response) {
            return callback(new Error("No response from get API"));
        }
        else if (response.statusCode != 200) {
            return callback(new Error("Get API returned status " + response.statusCode), null);
        }
        else if (body){
            var resultObject = JSON.parse(body);
            return callback(null, resultObject);
        }
        else {
            return callback(new Error("Undetermined error calling get API"), null);
        }
    })
};

submitKudos = function(giverId,recieverId,kudosText,kudosRating, callback) {

    var targetURL = config("properties").baseApiUrl + "employee/kudos";
    var kudosJson = {};
    kudosJson.fromEmployeeId = giverId;
    kudosJson.toEmployeeId = recieverId;
    kudosJson.comments = kudosText;
    kudosJson.category = kudosRating;

    logger.debug("Calling service: " + targetURL);
    logger.debug(JSON.stringify(kudosJson));

    request({
        method: 'POST',
        url: targetURL,
        json: kudosJson,
        headers: {
          'Content-Type': 'application/json'
        }
    }, function (error, response, body) {
        if (error) {
            logger.error("Error from API:" + error)
            return callback(error, null);
        }
        else if (!response) {
            logger.error("No response from get API");
            return callback(new Error("No response from get API"));
        }
        else if (response.statusCode != 200) {
            logger.error("POST API returned status " + response.statusCode);
            return callback(new Error("POST API returned status " + response.statusCode), null);
        }
        else {
            //success
            return callback(null, body);
        }
    })
};

module.exports = {
    getWeather: getWeather,
    login: login,
    getUser: getUser,
    search : search ,
    submitKudos : submitKudos,
    addUser : addUser
}
