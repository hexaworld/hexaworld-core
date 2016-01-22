var Geometry = require('./geometry.js')

module.exports = function (opts) {
  opts = opts || {}
  
  return new Geometry({
    id: opts.id,
    points: [[0, 0]],
    props: opts.props,
    transform: opts.transform,
    children: opts.children
  })
}