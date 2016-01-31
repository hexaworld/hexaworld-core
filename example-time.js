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

var controller = require('crtrdg-tty')()
var core = require('./index.js')

var game = core({
  schema: schema,
  controller: controller
})

game.on('consume', function (object) {
  console.log('consumed: ' + object.id)
})

game.on('move', function (object) {
  console.log('moved: ' + object.id)
})

game.on('enter', function (object) {
  console.log('entered: ' + object.id)
})

game.on('exit', function (object) {
  console.log('exited: ' + object.id)
})

var now = require('performance-now')

var num = 0
var curTime = now().toFixed(3)
var nextTime

game.on('update', function (object) {
  // nextTime = now().toFixed(3)
  // console.log('update: ' + num + ' - ' + (nextTime - curTime))
  // curTime = nextTime
  // num++
})


game.start()

console.log('waiting for keyboard input...')
