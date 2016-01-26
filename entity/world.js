var _ = require('lodash')
var inherits = require('inherits')
var path = require('../geometry/path.js')
var hexagon = require('../geometry/hexagon.js')
var point = require('../geometry/point.js')
var Entity = require('crtrdg-entity')

module.exports = World
inherits(World, Entity)

function World(schema, opts) {
  this.opts = opts || {}
  this.load(schema)
}

World.prototype.load = function (schema) {
  var self = this
  var opts = self.opts
  
  self.lookup = {}

  self.tiles = _.map(schema, function (t, i) {
    var r = t.coordinates[0]
    var q = t.coordinates[1]

    var center = hexagon({
      id: 'center-' + i,
      type: 'platform',
      transform: {scale: 0.25},
      props: {trigger: true}
    })

    var paths = _.range(6).map(function (p) {
      if (_.includes(t.paths, p)) {
        return path({
          id: 'path-' + p,
          type: 'platform',
          transform: {scale: 0.25, rotation: p * 60},
        })
      }
    })
    _.remove(paths, _.isUndefined)

    var children = [center].concat(paths)

    if (t.cue) {
      var cue = point({
        id: 'cue-' + t.cue.id,
        type: 'cue-' + t.cue.id
      })
      children.push(cue)
    }

    var tile = hexagon({
      id: 'tile-' + i,
      type: 'floor',
      transform: {
        translation: [opts.scale * 3 / 2 * r, opts.scale * Math.sqrt(3) * (q + r / 2)],
        scale: opts.scale
      },
      children: children
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