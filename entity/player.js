var _ = require('lodash')
var Entity = require('crtrdg-entity')
var Freemove = require('../movement/freemove.js')
var inherits = require('inherits')
var point = require('../geometry/point.js')

module.exports = Player
inherits(Player, Entity)

function Player (opts) {
  this.opts = opts || {}
  this.geometry = point({
    id: 'player'
  })
  this.movement = new Freemove({
    keymap: ['<left>', '<right>', '<up>', '<down>'],
    translation: [[0, 0, 0, 0], [0, 0, 1, -1]],
    rotation: [-1, 1, 0, 0]
  })
  this.waiting = true
}

Player.prototype.move = function (keys) {
  var rotation = this.geometry.transform.rotation
  var delta = this.movement.compute(keys, rotation)
  this.geometry.update(delta)
}

Player.prototype.moveto = function (delta) {
  this.geometry.update(delta)
}

Player.prototype.translation = function () {
  return this.geometry.transform.translation
}

Player.prototype.rotation = function () {
  return this.geometry.transform.rotation
}
