var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");

// Need to connect the socket to the http server
var server = app.listen(3000);
var io = require("socket.io").listen(server);

app.set("views", __dirname + "/views");
app.use(logger('dev'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static("public", __dirname + "/public"));
app.use(bodyParser.json());

// LANDING PAGE
app.get('/', function(req, res){
  res.render('index');
});

// RECEIVE NEW MESSAGE
app.post('/message', function(req, res){
  var name    = req.body.name;
  var message = req.body.message;

  console.log('REQUEST PARAMS: ', req.body);

  // validations

  // send new message to all clients
  io.sockets.emit("incomingMessage", {name: name, message: message})

  // respond to post request
  var response = {message: "we got your msg buddy."};
  res.status(200).json(response);
});
