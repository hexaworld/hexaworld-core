var _ = require('lodash')
var inherits = require('inherits')
var path = require('../geometry/hexagon.js')
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

    var center = hexagon({
      id: 'center',
      transform: {scale: 0.25},
      props: {trigger: true}
    })

    var paths = _.range(6).map(function (i) {
      if (_.includes(opts.paths, i)) {
        return path({
          id: 'path',
          transform: {scale: 0.25, rotation: i * 60},
        })
      }
    })
    _.remove(paths, _.isUndefined)

    var children = [center].concat(paths)
    
    var tile = hexagon({
      id: 'tile',
      transform: {
        translation: [opts.scale * 3 / 2 * r, opts.scale * Math.sqrt(3) * (q + r / 2)],
        scale: opts.scale,
        children: children
      }
    })

    var row = self.lookup[r] || {}
    row[q] = tile
    self.lookup[r] = row

    return tile
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