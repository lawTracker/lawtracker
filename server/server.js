var express = require('express');
var bodyParser = require('body-parser');

// set up express
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client"))

var port = process.env.PORT || 3000;
var server = app.listen(port, function(req, res) {
  console.log('listening on port %d', server.address().port);
});
