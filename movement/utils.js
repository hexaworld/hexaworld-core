function difference (self, other) {
  return {
    translation: [
      other.translation[0] - self.translation[0],
      other.translation[1] - self.translation[1]
    ],
    rotation: self.rotation - other.rotation,
    scale: self.scale - other.scale
  }
}

function distance (self, other) {
  var d = difference(self, other)
  return {
    translation: Math.sqrt(Math.pow(d.translation[0], 2) + Math.pow(d.translation[1], 2)),
    rotation: Math.abs(d.rotation),
    scale: Math.abs(d.scale)
  }
}

module.exports = {
  difference: difference,
  distance: distance
}