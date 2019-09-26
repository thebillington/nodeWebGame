var socket = io();

var players = {};

socket.on('players', function(_players) {
  players = _players;
});

function setup() {
  createCanvas(400,400);
}

function draw() {
  clear();
  for (var id in players) {
    ellipse(players[id].x, players[id].y, 10, 10);
  }
  if(keyIsDown(LEFT_ARROW)) {
    socket.emit("move", -1, 0);
  }
  if(keyIsDown(RIGHT_ARROW)) {
    socket.emit("move", 1, 0);
  }
  if(keyIsDown(DOWN_ARROW)) {
    socket.emit("move", 0, 1);
  }
  if(keyIsDown(UP_ARROW)) {
    socket.emit("move", 0, -1);
  }
}