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

then create by providing the schema and a controller

```javascript
var controller = require('crtrdg-tty')()
var core = require('hexaworld-core')

var game = core({schema: schema, controller: controller})
```

then you can start the game

```javascript
game.start()
```

### inputs

The required inputs are

- `schema` Schema for a level, should follow the schema for levels defined in `hexaworld-schema`. 
	
	Examples: `hexaworld-levels`

- `controller` Should have a `keysDown` property with the current state of keys and/or buttons. 
 
	Examples: `crtrdg-keyboard`, `crtrdg-touch`, `crtrdg-tty`

### methods

Methods are provided to control the underlying game loop

- `game.start()` start the game
- `game.end()` end the game
- `game.pause()` pause the game
- `game.resume()` resume the game

### properties

The following properties are returned

- `game.objects` A list of all game objects (including the player, consumables, and parts of the game world) to be used as required by external renderers. Each object has the following schema:

```javascript
{
	id: 'string',
	type: 'string',
	points: [[x,y], [x,y], ...],
	transform: {translation: [x,y], scale: s, rotation: r}
}
```

### events

The following events are provided:

- `game.on('consume')` collide with a `consumable` object
- `game.on('move')` player moves
- `game.on('enter')` player enters a tile
- `game.on('exit')` player exits a tile

Each provides as argument to the callback the object affected by the event.
