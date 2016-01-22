var _ = require('lodash')
var EventEmitter = require('eventemitter2').EventEmitter2
var Game = require('gameloop')
var Touch = require('crtrdg-touch')
var Keyboard = require('crtrdg-keyboard')
var TTY = require('crtrdg-tty')

module.exports = function(mode, schema) {

  var game, keyboard, touch

  if (mode == 'webgl') {
    game = new Game({
      canvas: canvas,
      renderer: canvas.getContext('webgl'),
      width: height,
      height: height
    })
    keyboard = new Keyboard(game)
    touch = new Touch(game)
  }

  if (mode == 'headless') {
    game = new Game()
    tty = new TTY(game)
  }

  game.on('update', function (dt) {
    console.log(tty.keysDown)
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