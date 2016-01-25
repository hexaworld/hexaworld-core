var config = {
  moves: 6
}

var map = {
  tiles: [
    {coordinates: [0, 0], paths: [0, 2, 4]},
    {coordinates: [-1, 0], paths: [1, 3, 5]},
    {coordinates: [0, 1], paths: [1, 4, 5]}
  ]
}

var schema = {
  config: config,
  map: map
}

var gameloop = require('gameloop')()
var controller = require('crtrdg-tty')(gameloop)
var core = require('./index.js')

var game = core({
  schema: schema, 
  gameloop: gameloop,
  controller: controller
})

gameloop.on('update', function (interval) {
  console.log(game.objects[0].transform.translation)
})

gameloop.start()