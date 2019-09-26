var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');var app = express();
var server = http.Server(app);

var io = socketIO(server);app.set('port', 5000);

var players = {};
playerLocation = 20;

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

io.on('connection', function(socket) {
});

setInterval(function() {
    io.sockets.emit('players', players);
  }, 1000/60);

io.on("connection", function(connection) {
  console.log("New connection");
  players[connection.id] = ({x: playerLocation, y: playerLocation});
  playerLocation += 20;
  playerLocation += 20;
  connection.on("move", function(dx, dy) {
    players[connection.id].x = players[connection.id].x + dx;
    players[connection.id].y = players[connection.id].y + dy;
  });
});