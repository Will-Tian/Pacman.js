(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }
  var MovingObjects = App.MovingObjects.MovingObjects;
  var BLOCK_DIM = App.Blocks.BLOCK_DIM;

  var Ghost = App.MovingObjects.Ghost = function Ghost(options) {
  	MovingObjects.call(this, options.pos, options.vel, options.sprites, options.ptx, options.gtx, options.pdtx);
  	this.path = [];
  }

  App.Util.inherits(Ghost, MovingObjects);

  Ghost.prototype.findPath = function(st, offset) {
  	var pacman = App.MovingObjects.Objects['pacman'];
  	var start = this.currentTilePos(this.pos);
  	if(st){
  		start = st
  	}
  	var startNode = App.Boards.Nodes['' + JSON.stringify(start)];
  	var destination = this.currentTilePos(pacman.pos);
  	if(offset) {
  		var dirX = Math.sign(pacman.vel[0]);
  		var dirY = Math.sign(pacman.vel[1]);
  		destination = [destination[0] + dirX * offset * BLOCK_DIM[0], destination[1] + dirY * 2 * BLOCK_DIM[0]]
  	}
  	var cameFrom = App.PathFinding.aStarSearch(startNode, start, destination);
  	this.path = App.PathFinding.reconstructPath(cameFrom, start, destination);
  	this.path.pop()
  }

  var Blinky = App.MovingObjects.Blinky = function Blinky(options){
  	Ghost.call(this, options);
  	this.avatar = this.spriteSources.blinkyLeft[this.animationCycle % 2]
  };
  App.Util.inherits(Blinky, Ghost);

  Blinky.prototype.draw = function(){
    this.pdtx.clearRect(0, 0, 1000, 1000);
    this.move();
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.pdtx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  	// this.path.forEach(function(node){
  	// 	var pathX = node[0];
  	// 	var pathY = node[1];
  	// 	this.pdtx.fillStyle = 'red';
  	// 	this.pdtx.fillRect(pathX - App.Blocks.BLOCK_DIM[0]/2, pathY - App.Blocks.BLOCK_DIM[1]/2, App.Blocks.BLOCK_DIM[0], App.Blocks.BLOCK_DIM[1]);
  	// }.bind(this))	
  }

  Blinky.prototype.move = function(){
  	var pacman = App.MovingObjects.Objects['pacman'];	
  	var pacmanCurrentTile = pacman.currentTilePos(pacman.pos);
  	var currentTilePos = this.currentTilePos(this.pos);

  	if(this.animationCycle === 0){
  		this.findPath();
  	} 
  	if(pacman.moved == false) {
  		return;
  	}
  	if(App.Boards.CageCorridor['' + JSON.stringify(pacmanCurrentTile)]){
  		
  	} else if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		this.findPath();
  	}
  	if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  		this.findPath(this.pos);
  	}
  	var nextMove = this.path[this.path.length - 1];
  	if(this.pos.equals(nextMove)){
  		this.path.pop();
  		nextMove = this.path[this.path.length - 1];
  	}
  	if(this.path.length === 0){
  		if(App.Boards.CageCorridor['' + JSON.stringify(pacmanCurrentTile)]){
  			this.findPath(currentTilePos, 2);
  		} else {
  			this.findPath();
  		}
  		nextMove = this.path[this.path.length - 1];
  	}
  	
  	var dX = Math.sign(nextMove[0] - this.pos[0]);
  	var dY = Math.sign(nextMove[1] - this.pos[1]);
  	this.changeAvatar(dX, dY);
  	var velX = dX * 2;
  	var velY = dY * 2;
  	this.pos[0] = this.pos[0] + velX;
  	this.pos[1] = this.pos[1] + velY;
  	
  }

  Blinky.prototype.changeAvatar = function(dx, dy) {
  	if(dx === 1) {
  		this.avatar = this.spriteSources.blinkyRight[this.animationCycle % 2];
  	} else if(dx === -1) {
  		this.avatar = this.spriteSources.blinkyLeft[this.animationCycle % 2];
  	} else if(dy === -1) {
  		this.avatar = this.spriteSources.blinkyUp[this.animationCycle % 2];
  	} else if(dy === 1) {
  		this.avatar = this.spriteSources.blinkyDown[this.animationCycle % 2];
  	}
  }

  var Pinky = App.MovingObjects.Pinky = function Pinky(options){
  	Ghost.call(this, options);
  	this.avatar = this.spriteSources.pinkyLeft[this.animationCycle % 2]
  };
  App.Util.inherits(Pinky, Ghost);

})();
