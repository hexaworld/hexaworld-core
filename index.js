var _ = require('lodash')
var EventEmitter = require('eventemitter2').EventEmitter2
var Game = require('gameloop')
var Touch = require('crtrdg-touch')
var Keyboard = require('crtrdg-keyboard')
var TTY = require('crtrdg-tty')
var Player = require('./entity/player.js')
var World = require('./entity/world.js')

module.exports = function(mode, schema, opts) {

  var game, keyboard, touch

  if (mode == 'webgl') {
    game = new Game({
      canvas: opts.canvas,
      renderer: opts.canvas.getContext('webgl'),
      width: opts.height,
      height: opts.height
    })
    keyboard = new Keyboard(game)
    touch = new Touch(game)
  }

  if (mode == 'headless') {
    game = new Game()
    tty = new TTY(game)
  }

  var player = new Player()
  var world = new World(schema.map.tiles, {scale: 50})

  world.addTo(game)
  player.addTo(game)

  game.on('update', function (dt) {
    player.move(tty.keysDown)
    console.log(player.translation())
  })

  return {
    start: function () {
      game.start()
    },

    pause: function () {
      game.pause()
    },

    resume: function () {
      game.resume()
    },
  }

}