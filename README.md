# hexaworld-core

Core game loop and gameplay logic for hexaworld games. Constructs a game world using the provided schema, and runs the game, included movement, collision detection, and gameplay events. This module is designed to support a variety of external renderers, or other forms of progammatic access.

### example

First define a schema

```
var config = {
  energy: 2400
}

var map = {
  tiles: [
    {coordinates: [0, 0], paths: [0, 2, 4]},
    {coordinates: [-1, 0], paths: [0, 2, 4]},
    {coordinates: [0, 1], paths: [0, 2, 4]}
  ]
}

var level = {
  config: config,
  map: map
}
```

then initialize the world

```
var hexaworld = require('hexaworld-core')
var game = hexaworld('headless', level)
```

start the game

```
game.start()
```

and you can listen for various game events, e.g.

```
game.on(['player', 'enter'], {
	// player enters a tile
})
game.on(['player', 'exit'], {
	// player enters a tile
})
game.on(['player', 'collect'], {
	// player collects an item
})
```

### modes

Two modes are currently supported `webgl` and `headless`. Although no rendering happens here, we construct different gameloops depending on the target renderer. This choice determines the gameloop, and the input device.

#### `headless`
Doesn't require a browser, uses terminal for input.
```
var game = hexaworld('headless', level)
```

#### `webgl`
Uses a canvas element with a webgl context, uses keyboard and touch for input.
```
var game = hexaworld('webgl', level, {canvas: 'id', height: 700})
```
