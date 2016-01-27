# hexaworld-core

Core game loop and gameplay logic for hexaworld games. Constructs a game world using the provided schema, and runs the game, including movement, collision detection, and gameplay events. This module is designed to be passed to a variety of external renderers or other forms of progammatic access. It only requires a `schema`, a `gameloop`, and a `controller`, each of which conform to a simple API. Works well with [crtrdg.js](http://crtrdg.com/) components.

Example renderers:

- 3d with stack.gl: [`hexaworld-renderer-3d`](https://github.com/hexaworld/hexaworld-renderer-3d)

### example

First define a level schema

```javascript
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

var schema = {
  config: config,
  map: map
}
```

then create by providing the level, a gameloop, and a controller

```javascript
var gameloop = require('gameloop')()
var controller = require('crtrdg-tty')(gameloop)

var core = require('hexaworld-core')

var game = core({
	schema: schema,
	gameloop: gameloop, 
	controller: controller
})
```

when you start the gameloop the game will begin

```javascript
gameloop.start()
```

### inputs

#### `schema`

Should follow the schema for levels defined in `hexaworld-schema`.

Examples: `hexaworld-levels`


#### `gameloop`

Should have an `update` event for every refresh of the gameloop (e.g. every frame).

Examples: `gameloop`, `gameloop-canvas`


#### `controller`

Should have a `keysDown` property with the current state of keys and/or buttons.

Examples: `crtrdg-keyboard`, `crtrdg-touch`, `crtrdg-tty`
