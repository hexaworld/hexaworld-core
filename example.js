var config = {
  name: 'welcome',
  lives: 3,
  moves: 6,
  difficulty: 1
}

var map = {
  tiles: [
    {coordinates: [0, 0], paths: [0, 2, 4]},
    {coordinates: [-1, 0], paths: [0, 2, 4]},
    {coordinates: [0, 1], paths: [0, 2, 4]}
  ]
}

var level = {
  config: config,
  map: map
}

var hexaworld = require('./index.js')
var game = hexaworld('headless', level)

game.on('update', function (interval) {
  console.log(game.objects[0].transform.translation)
})

game.start()