var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");
// Need to connect the socket to the http server
var server = require('http').createServer(app)
var port = process.env.PORT || 3000;
var router = express.Router();


app.set("views", __dirname + "/views");
app.engine('ejs', require('ejs').renderFile);
app.use(logger('dev'));
app.set('view engine', 'ejs');
app.use(express.static("public", __dirname + "/public"));
app.use(bodyParser.json());

// Write your code here

app.get('/', function(req, res) {
  res.render('index');
})


server.listen(port);
console.log('Server started on ' + port);
var io = require('socket.io')(server);

io.on('connect', function(socket){
  socket.on('send', function(data) {
    socket.emit('message', data);
  });
});