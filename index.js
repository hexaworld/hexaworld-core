var _ = require('lodash')
var EventEmitter = require('eventemitter2').EventEmitter2
var Game = require('gameloop')
var Touch = require('crtrdg-touch')
var Keyboard = require('crtrdg-keyboard')
var TTY = require('crtrdg-tty')
var Player = require('./entity/player.js')
var World = require('./entity/world.js')
var inherits = require('inherits')

module.exports = Core
inherits(Core, EventEmitter)

function Core (mode, schema, canvas) {
  if (!(this instanceof Core)) return new Core(mode, schema, canvas)
  mode = mode || 'headless'

  if (mode == 'webgl') {
    this.game = new Game({
      canvas: canvas,
      renderer: canvas.getContext('webgl'),
      width: canvas.clientHeight,
      height: canvas.clientWidth
    })
    this.controls = new Keyboard(this.game)
  }

  if (mode == 'headless') {
    this.game = new Game()
    this.controls = new TTY(this.game)
  }

  this.init(schema)
}

Core.prototype.init = function (schema) {
  var game = this.game
  var self = this

  var world = new World(schema.map.tiles, {scale: 50})
  world.addTo(game)

  var player = new Player()
  player.addTo(game)

  game.on('update', function (interval) {
    player.move(self.controls.keysDown)
    self.emit('update', interval)
  })

  game.on('draw', function (context) {
    self.emit('draw', context)
  })

  var objects = []
  objects.push(player.geometry)
  world.tiles.forEach(function (tile) {
    objects.push(tile.geometry)
  })

  this.objects = objects
}

Core.prototype.start = function () {
  this.game.start()
}
