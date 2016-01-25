var Geometry = require('./geometry.js')

module.exports = function (opts) {
  opts = opts || {}

  return new Geometry({
    id: opts.id,
    type: opts.type,
    points: [[-0.6, 0.6], [0.6, 0.6], [0, -0.6]],
    props: opts.props,
    transform: opts.transform,
    children: opts.children
  })
}