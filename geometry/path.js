var Geometry = require('./geometry.js')

module.exports = function (opts) {
  opts = opts || {}

  return new Geometry({
    id: opts.id,
    type: opts.type,
    points: [
      [-1 / 2, Math.sqrt(3) / 2], 
      [1 / 2, Math.sqrt(3) / 2], 
      [1 / 2, Math.sqrt(3) / 2 / opts.transform.scale],
      [-1 / 2, Math.sqrt(3) / 2 / opts.transform.scale]
    ],
    props: opts.props,
    transform: opts.transform,
    children: opts.children
  })
}