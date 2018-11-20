// Initialize app
const app = require('express')();
const settings = require('./config/settings');

// App configuration
require('./config/passport')(settings);
require('./config/express')(app, settings);
require('./config/database')(settings);

module.exports = app;
