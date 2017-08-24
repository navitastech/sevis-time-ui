var test = require('tap').test;
var expect = require('chai').expect;
var proxyquire = require('proxyquire');

test('login', function(t) {

  // mock out our collaborators (i.e. the required libraries) so that we can verify behavior of our controller
  var controller = proxyquire('../../controllers/controller.js',
  {
    "../logger": {
      debug: function (message) {
        // do nothing
      }
    }
  });

  var req = {};
  req.query = {};
  var res = {
      render : function(page, content) {
        expect(page).to.eql('login');
        expect(content.title).to.eql('Login');
        expect(content.validationFail).to.eql(false);
        expect(content.credentialsFail).to.eql(false);
      },
      cookie: function(key, val, param) {
      }
  };

  controller.login(req, res, null);

  t.end();
});

test('loginsubmit', function(t) {

  var userId = "1";
  var expected = {
      "username": "user1",
      "password": "pass1",
      "firstName": "User",
      "lastName": "One",
      "department": "Finance"
    }
  var username = "user1";
  var password = "pass1";

  // mock out our collaborators (i.e. the required libraries) so that we can verify behavior of our controller
  var controller = proxyquire('../../controllers/controller.js',
  {
    "../services/service": {
      login: function (username, password, callback) {
        callback(null, 1);
      },
      getUser: function (userId, callback) {
        callback(null, expected);
      }
    }
  },
  {
    "../logger": {
      debug: function (message) {
        // do nothing
      }
    }
  });

  var req = {};
  req.body = {};
  req.body.username = "user1";
  req.body.password = "pass1";
  req.query = {};
  var res = {
      render : function(page, content) {
        expect(page).to.eql('giveapoint');
        expect(content.title).to.eql('Give A Point');
      },
      cookie: function(key, val, param) {
      },
      redirect: function(location) {
      }
  };

  controller.loginsubmit(req, res, null);

  t.end();
});

test('sample', function(t) {

  // mock out our collaborators (i.e. the required libraries) so that we can verify behavior of our controller
  var controller = proxyquire('../../controllers/controller.js',
  {
    "../logger": {
      debug: function (message) {
        // do nothing
      }
    }
  });

  var req = {};
  var res = {
      render : function(page, content) {
        expect(page).to.eql('sample');
        expect(content.title).to.eql('Sample');
      }
  };

  controller.sample(req, res, null);

  t.end();
});

test('getWeather', function(t) {

  var zip = "19382";
  var expected = {
      "weather": [
        {
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "main": {
        "temp": 302.66,
        "humidity": 64
      },
      "name": "West Chester"
    }

  // mock out our collaborators (i.e. the required libraries) so that we can verify behavior of our controller
  var controller = proxyquire('../../controllers/controller.js',
  {
    "../services/service": {
      getWeather: function (zip, callback) {
        callback(null, expected);
      }
    },
    "../logger": {
      debug: function (message) {
        // do nothing
      }
    }
  });

  var req = {};
  req.query = {};
  req.query.zip = zip;
  var res = {
      render : function(page, content) {
        expect(page).to.eql('weather');
        expect(content.title).to.eql('Current Weather');
      }
  };

  controller.getWeather(req, res, null);

  t.end();
});
