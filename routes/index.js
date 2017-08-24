var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js');

module.exports = function (app) {

    // employee stuff
    app.use('/', router.get('/', controller.login));
    app.use('/', router.get('/login', controller.login));
    app.use('/', router.get('/logout', controller.logout));
    app.use('/', router.post('/loginsubmit', controller.loginsubmit));
    app.use('/', router.post('/addUser', controller.addUserAndSubmitPoints));
    //app.use('/', router.post('/employeesearch', controller.employeesearch));
    //app.use('/', router.get('/employeelookup', controller.employeelookup));
    //app.use('/', router.get('/kudos', controller.kudos));
    //app.use('/', router.post('/kudos-submit', controller.kudossubmit));
    app.use('/', router.get('/giveapoint', controller.giveapoint));


    //sample stuff
    app.use('/', router.get('/sample', controller.sample));
    app.use('/', router.get('/weather', controller.getWeather));
    app.use('/', router.post('/weather', controller.getWeather));

}
