var now = require('performance-now')
var fs = require('fs')

var path = './tmp/game.log'

var num = 0
var curTime = now().toFixed(3)
var nextTime

var numD = 0
var curTimeD = now().toFixed(3)
var nextTimeD

var obj

var ws = fs.createWriteStream(path)

module.exports = function (opts) {
  var game = opts.game

  game.on('consume', function (object) {
    obj = {'type': 'consume',
      'time': now()
    }
    ws.write(JSON.stringify(obj))
  })

  game.on('move', function (object) {
    obj = {'type': 'move',
      'time': now()
    }
    ws.write(JSON.stringify(obj))
  })

  game.on('enter', function (object) {
    obj = {'type': 'enter',
      'time': now()
    }
    ws.write(JSON.stringify(obj))
  })

  game.on('exit', function (object) {
    obj = {'type': 'exit',
      'time': now()
    }
    ws.write(JSON.stringify(obj))
      //console.log('exited: ' + object.id)
  })

  game.on('update', function (object) {
    obj = {'type': 'update',
     'time': now()
    }
    ws.write(JSON.stringify(obj))
    //nextTime = now()
    //ws.write('update: ' + num + ' - ' + (nextTime - curTime).toFixed(3) + '\n');
    //console.log('update: ' + num + ' - ' + (nextTime - curTime))
    //curTime = nextTime
    //num++
  })

  game.on('draw', function (object) {
    obj = {'type': 'draw',
      'time': now()
    }
    ws.write(JSON.stringify(obj))
    //nextTimeD = now()
    //console.log('draw: ' + numD + ' - ' + (nextTimeD - curTimeD))
    //ws.write('draw: ' + numD + ' - ' + (nextTimeD - curTimeD).toFixed(3) + '\n');
    //curTimeD = nextTimeD
    //numD++
  })

}


