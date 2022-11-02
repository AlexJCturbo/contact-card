const path = require('path');

//Adding a GET route that uses PATH to allow HTML to be served up by the server
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });
};