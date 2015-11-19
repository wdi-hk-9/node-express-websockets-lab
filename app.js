var logger = require("morgan");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.get('/', function(req, res) {
  res.render('index.ejs');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('text', function (txt){
    io.emit('text', txt);
    console.log('text: ' + txt)
  });
  socket.on('name', function (n){
    io.emit('name', n);
    console.log('name: ' + n)
  });
});

server.listen(port);
console.log('Server started on ' + port);


// var router = express.Router();

app.set("views", __dirname + "/views");
app.use(logger('dev'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static("public", __dirname + "/public"));
app.use(bodyParser.json());



