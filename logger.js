var log4js = require('log4js');

// configure the logger
log4js.configure({
  "appenders": [
      {
          "type": "file",
          "filename": "logs/app.log",
          "maxLogSize": 5000000,
          "backups": 10,
          "category": "app",
      },
      {
          "type": "console",
          "category": "app",
      },
      {
        type      : 'loggly',
        token     : '8df5c7a2-9f70-4f84-8fb5-b0d608098fa3',
        subdomain : 'atb',
        tags      : ['Webapp'],
        category  : 'app'
      }
  ],
  "levels": {
    "app":  "DEBUG"
  }
});

var logger = log4js.getLogger('app');
logger.info('Logger setup ok');

module.exports = logger;
