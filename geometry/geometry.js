var _ = require('lodash')
var transform = require('transformist')
var inside = require('point-in-polygon')
var collide = require('point-circle-collision')

module.exports = Geometry

function Geometry (opts) {
  var self = this
  if (!opts.points) throw new Error('Must provide points')
  if (!opts.id) throw new Error('Must provide an id')
  opts.type = opts.type || opts.id
  opts.transform = opts.transform ? transform(opts.transform) : transform()
  opts.props = opts.props || {}
  opts.children = opts.children || []
  _.defaults(opts.props, {
    trigger: false,
    triggered: false,
    consumable: false,
    consumed: false,
    movable: false
  })
  _.assign(this, opts)
  this.stage()
}

Geometry.prototype.stage = function (transform, opts) {
  var self = this
  opts = opts || {}
  transform = transform || self.transform
  var op = opts.invert ? transform.invert : transform.apply
  self.points = op.bind(transform)(self.points)
  if (self.children.length) {
    _.forEach(self.children, function (child) {
      child.stage(transform, opts)
    })
  }
}

Geometry.prototype.unstage = function () {
  var self = this
  self.stage(self.transform, { invert: true })
}

Geometry.prototype.update = function (transform) {
  var self = this
  self.unstage()
  self.transform.compose(transform)
  self.stage(self.transform)
}

Geometry.prototype.contains = function (point) {
  var self = this
  return inside(point, self.points)
}

Geometry.prototype.collide = function (point) {
  var self = this
  return collide(point, self.points[0], 3)
}