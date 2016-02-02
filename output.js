var five = require('johnny-five')
var _ = require('lodash')
var NanoTimer = require('nanotimer')

var pinOut = {'update': 13,
  'draw': 12,
  'enter-exit': 10,
  'start-stop': 9,
  'reward': 8
  }

var reward = '120m'

module.exports = function (opts) {
  var game = opts.game

  var board = new five.Board()

  board.on('ready', function() {
    console.log('board ready')
    
    var pins = {}
    _.forEach(pinOut, function (location, label) {
      pins[label] = new five.Led(location)
    })

    var pulse = {}
    _.forEach(pinOut, function (location, label) {
      pulse[label] = new NanoTimer()
    })
  
    game.on('draw', function (object) {
      pins['draw'].on()
      pulse['draw'].setTimeout(function () {
        pins['draw'].off()
      }, '', '500u')
    })
    
    game.on('update', function (object) {
      pins['update'].on()
      pulse['update'].setTimeout(function () {
        pins['update'].off()
      }, '', '500u')
    })

    game.on('enter', function (object) {
      pins['enter-exit'].on()
    })

    game.on('exit', function (object) {
      pins['enter-exit'].off()
    })

    game.on('reward', function (object) {
      pins['reward'].on()
      pulse['reward'].setTimeout(function () {
        pins['reward'].off()
      }, '', reward)
    })

  })
  return board
}


