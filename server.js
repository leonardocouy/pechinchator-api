const http = require('http');
const settings = require('./config/settings');
const app = require('./app');

const server = http.createServer(app);

server.listen(settings.port, () => {
  console.log(`Server running on port ${settings.port}`);
});

module.exports = server;
