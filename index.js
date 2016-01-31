var _ = require('lodash')
var inherits = require('inherits')
var EventEmitter = require('eventemitter2').EventEmitter2
var Game = require('gameloop')
var TTY = require('crtrdg-tty')
var Player = require('./entity/player.js')
var World = require('./entity/world.js')
var collide = require('point-circle-collision')

module.exports = Core
inherits(Core, EventEmitter)

function Core (opts) {
  if (!(this instanceof Core)) return new Core(opts)
  var self = this
  var options = {fps: 100}
  self.loop = Game(options)
  self.controller = opts.controller || TTY()
  self.init(opts.schema)
}

Core.prototype.init = function (schema) {
  var self = this

  var world = new World(schema.map.tiles, {scale: 50})
  var player = new Player()

  self.loop.on('update', function () {
    self.emit('update')
    var input = self.controller.keysDown || self.controller.down
    var moved = player.move(input)
    if (moved) self.emit('move', player.geometry)

    var p = player.translation()
    
    world.list('consumable', p).forEach(function (consumable) {
      if (consumable.collide(p) & !consumable.consumed) {
        consumable.consumed = true
        self.emit('consume', consumable)
      }
    })

    world.list('trigger', p).forEach(function (trigger) {
      if (trigger.contains(p) & !trigger.triggered) {
        trigger.triggered = true
        self.emit('enter', trigger)
      }
      if (!trigger.contains(p) & trigger.triggered) {
        trigger.triggered = false
        self.emit('exit', trigger)
      }
    })
  })

  self.loop.on('draw', function () {
    self.emit('draw')
  })

  this.objects = world.flatten().concat([player.geometry])
}

Core.prototype.start = function () {
  this.loop.start()
}

Core.prototype.end = function () {
  this.loop.end()
}

Core.prototype.pause = function () {
  this.loop.pause()
}

Core.prototype.resume = function () {
  this.loop.resume()
}
