var express        = require("express");
var app            = express();
var expressLayouts = require('express-ejs-layouts')
var logger         = require("morgan");
var bodyParser     = require("body-parser");
var port           = process.env.PORT || 3000;
var router         = express.Router();
// Need to connect the socket to the http server
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);


app.set("views", __dirname + "/views");
app.use(logger('dev'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static("public", __dirname + "/public"));
app.use(bodyParser.json());



// LANDING PAGE
app.get('/', function(req, res) {
  res.render('index');
});

// RECEIVE MESSAGE
app.post('/message', function(req, res) {
  var message = req.body.message;
  var name = req.body.name;

// send a new messsage to all clients side
io.sockets.emit('IncomingMessage' , {name: name, message: message})

// repsond to post requrest
var response = {message: "We got your message"}
res.status(200).json(repsonse)

});

server.listen(3000);

console.log('Server started on ' + port);
