var _ = require('lodash')
var inherits = require('inherits')
var EventEmitter = require('eventemitter2').EventEmitter2
var Game = require('gameloop')
var TTY = require('crtrdg-tty')
var Player = require('./entity/player.js')
var World = require('./entity/world.js')

module.exports = Core
inherits(Core, EventEmitter)

function Core (opts) {
  if (!(this instanceof Core)) return new Core(opts)
  var self = this

  self.gameloop = opts.gameloop || Game()
  self.controller = opts.controller || TTY(self.gameloop)
  self.init(opts.schema)
}

Core.prototype.init = function (schema) {
  var self = this

  var world = new World(schema.map.tiles, {scale: 50})
  var player = new Player()

  self.gameloop.on('update', function (interval) {
    player.move(self.controller.keysDown)
  })

  var objects = []
  objects.push(player.geometry)
  world.tiles.forEach(function (tile) {
    objects.push(tile)
    tile.children.forEach(function (child) {
      objects.push(child)
    })
  })

  this.objects = objects
}
