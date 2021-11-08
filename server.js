var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/docs'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":1234" );
app.listen(1234);
