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
    id: 'player',
    type: 'player',
    props: {moveable: true}
  })
  this.movement = new Freemove({
    keymap: ['<left>', '<right>', '<up>', '<down>', '<tapLeft>', '<tapRight>', '<tapCenter>'],
    translation: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 1, -1, 0, 0, 5]],
    rotation: [-1, 1, 0, 0, -5, 5, 0]
  })
}

Player.prototype.move = function (keys) {
  var rotation = this.geometry.transform.rotation
  var delta = this.movement.compute(keys, rotation)
  this.geometry.transform.translation[0] += delta.translation[0]
  this.geometry.transform.translation[1] += delta.translation[1]
  this.geometry.transform.rotation += delta.rotation
  var cond1 = Math.abs(delta.translation[0]) > 0.0000001
  var cond2 = Math.abs(delta.translation[1]) > 0.0000001
  var cond3 = Math.abs(delta.rotation) > 0.0000001
  var cond4 = Math.abs(delta.scale - 1) > 0.0000001
  return (cond1 || cond2 || cond3 || cond4)
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
