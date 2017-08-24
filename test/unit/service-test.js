var service = require('../../services/service.js');
var config = require('konphyg')(__dirname + "/../../config");
var nock = require('nock');
var expect = require('chai').expect;
var test = require('tap').test;

test('login', function(t) {

  //use endpoint from config even for tests
  var targetURL = config("properties").baseApiUrl;

  var expected = 1;
  var requestJson = {
    "username": "user1",
    "password": "pass1",
  }

  // test a 200 success
  var server = nock(targetURL, {})
        .post('/login', requestJson)
        .reply(200, expected);

  server;
  service.login('user1', 'pass1', function(error, results) {
    server.done();
    expect(error).to.be.a('null');
    expect(results).to.eql(expected);
  });
  t.end();
});

test('getUser', function(t) {

  //use endpoint from config even for tests
  var targetURL = config("properties").baseApiUrl;

  var expected = {
    "username": "user1",
    "password": "pass1",
    "firstName": "User",
    "lastName": "One",
    "department": "Finance"
  }

  // test a 200 success
  var server = nock(targetURL, {})
        .get('/user/1')
        .reply(200, expected);

  server;
  service.getUser('1', function(error, results) {
    server.done();
    expect(error).to.be.a('null');
    expect(results).to.eql(expected);
  });
  t.end();
});

test('search', function(t) {

  //use endpoint from config even for tests
  var targetURL = config("properties").baseApiUrl;
  var expected = [
    {
      "id": 2,
      "username": "user2",
      "firstName": "User",
      "lastName": "Two",
      "department": "Operations"
    }
  ]

  // test a 200 success
  var server = nock(targetURL, {})
        .get('/employee/search/firstname/User/lastname/Two')
        .reply(200, expected);

  server;
  service.search('User', 'Two', function(error, results) {
    server.done();
    expect(error).to.be.a('null');
    expect(results).to.eql(expected);
  });
  t.end();
});

test('submitKudos', function(t) {

  //use endpoint from config even for tests
  var targetURL = config("properties").baseApiUrl;

  var requestJson = {"fromEmployeeId":"3","toEmployeeId":"4","comments":"great job!","category":"25"}

  // test a 200 success
  var server = nock(targetURL, {})
        .post('/employee/kudos', requestJson)
        .reply(200);

  server;
  service.submitKudos('3', '4', 'great job!', '25', function(error, results) {
    server.done();
    expect(error).to.be.a('null');
  });
  t.end();
});

test('getWeather', function(t) {

  //use endpoint from config even for tests
  var weatherServerUrl = config("properties").weatherServerUrl;

  var expected = {
      "coord": {
        "lon": -75.61,
        "lat": 39.96
      },
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 302.66,
        "pressure": 1012,
        "humidity": 64,
        "temp_min": 300.37,
        "temp_max": 304.82
      },
      "wind": {
        "speed": 1.51,
        "deg": 285.003
      },
      "rain": {},
      "clouds": {
        "all": 20
      },
      "dt": 1471552094,
      "sys": {
        "type": 3,
        "id": 8556,
        "message": 0.0484,
        "country": "US",
        "sunrise": 1471515496,
        "sunset": 1471564376
      },
      "id": 4562144,
      "name": "West Chester",
      "cod": 200
    }

  // test a 200 success
  var server = nock(weatherServerUrl, {})
        .get('/data/2.5/weather?zip=19382,us&units=imperial&APPID=7c45065e8081fd769b74d36262862dc6')
        .reply(200, expected);

  server;
  service.getWeather('19382', function(error, results) {
    server.done();
    expect(error).to.be.a('null');
    expect(results).to.eql(expected);
  });
  t.end();
});
