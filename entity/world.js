var _ = require('lodash')
var inherits = require('inherits')
var hexagon = require('../geometry/hexagon.js')
var Entity = require('crtrdg-entity')

module.exports = World
inherits(World, Entity)

function World(schema, opts) {
  this.opts = opts || {}
  this.load(schema)
}

World.prototype.load = function (tiles) {
  var self = this
  var opts = self.opts
  
  self.lookup = {}

  self.tiles = _.map(tiles, function (t) {
    var r = t.coordinates[0]
    var q = t.coordinates[1]
    
    var hex = hexagon({
      id: 'tile',
      translation: [
        opts.scale * 3 / 2 * r,
        opts.scale * Math.sqrt(3) * (q + r / 2)
      ],
      scale: opts.scale
    })

    var row = self.lookup[r] || {}
    row[q] = hex
    self.lookup[r] = row

    return hex
  })
}

World.prototype.tile = function (point) {
  return this.lookup[r][q]
}

World.prototype.coordinates = function (point) {
  var x = point[0]
  var y = point[1]
  var s = this.opts.scale
  var r = x / 3 / s * 2
  var q = (y - s * Math.sqrt(3) * r / 2) / (s * Math.sqrt(3))
  return [Math.round(r), Math.round(q)]
}