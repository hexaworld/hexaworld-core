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
      id: 'tile-' + i + '-center-' + i,
      type: 'platform',
      transform: {scale: 0.25},
      props: {trigger: true}
    })

    var paths = _.range(6).map(function (p) {
      if (_.includes(t.paths, p)) {
        var children = _.range(3).map(function (b) {
          return point({
            id: 'tile-' + i + '-path-' + p + '-bit-' + b,
            type: 'bit',
            transform: {translation: [0, 1.5 + b * 0.5]},
            props: {consumable: true}
          })
        })

        return path({
          id: 'tile-' + i + '-path-' + p,
          type: 'platform',
          transform: {scale: 0.25, rotation: p * 60},
          children: children
        })
      }
    })
    _.remove(paths, _.isUndefined)

    var children = [center].concat(paths)

    if (t.cue) {
      var cue = point({
        id: 'tile-' + i + '-cue-' + t.cue.id,
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

World.prototype.getconsumables = function (point) {
  var tile = this.gettile(point)
  var consumables = []
  if (!tile) return consumables
  tile.children.forEach(function (child) {
    if (child.props.consumable) consumables.push(child)
    child.children.forEach(function (subchild) {
      if (subchild.props.consumable) consumables.push(subchild)
    })
  })
  return consumables
}

World.prototype.gettile = function (point) {
  var coordinates = this.getcoordinates(point)
  return this.lookup[coordinates[0]][coordinates[1]]
}

World.prototype.getcoordinates = function (point) {
  var x = point[0]
  var y = point[1]
  var s = this.opts.scale
  var r = x / 3 / s * 2
  var q = (y - s * Math.sqrt(3) * r / 2) / (s * Math.sqrt(3))
  return [Math.round(r), Math.round(q)]
}