var Geometry = require('./geometry.js')

module.exports = function (opts) {
  opts = opts || {}
  var width = opts.scale || 0.25

  return new Geometry({
    id: opts.id,
    points: [
      [-1 / 2, Math.sqrt(3) / 2], 
      [1 / 2, Math.sqrt(3) / 2], 
      [1 / 2, Math.sqrt(3) / 2 / opts.tranform.scale],
      [-1 / 2, Math.sqrt(3) / 2 / opts.transform.scale]
    ],
    props: opts.props,
    transform: opts.transform
    children: opts.children
  })
}