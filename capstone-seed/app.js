'use strict';

const express = require('express'),
  pbConfig = require('playbuzz-config'),
  pbLogs = require('playbuzz-logs'),
  pbExpress = require('playbuzz-express'),
  winston = require('winston');

// Load environment variables from .env file.
require('dotenv-safe').load();

// Set environment
const environment = process.env.NODE_ENV || 'local';

// Load the config file for the environment
pbConfig.load('config/config.yml', environment);

pbLogs(winston);

const app = express();

pbExpress(express, app, pbConfig, environment);

winston.info(`Loading node server, Environment ${app.get('env')}`);

// swagger
require('./config/swagger')(app, () => {

  // Load routes
  require('./src/routers/example.route')(app);

  // Create the server
  app.listen(app.get('port'), function (err) {
    if (err) {
      winston.error(`Error launching service : ${err}`);
      throw  err;
    } else {
      winston.info(`Server is listening on port: ${app.get('port')}`);
    }
  });
});

module.exports = app;
