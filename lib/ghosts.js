(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }
  var MovingObjects = App.MovingObjects.MovingObjects;
  var BLOCK_DIM = App.Blocks.BLOCK_DIM;

  var Ghost = App.MovingObjects.Ghost = function Ghost(pos, vel, sprites, options) {
  	MovingObjects.call(this, pos, vel, sprites) 
  	this.blinkytx = options.blinkytx;
  	this.pinkytx = options.pinkytx;
  	this.inkytx = options.inkytx;
  	this.clydetx = options.clydetx;
  	this.board = options.board;
  	this.path = [];
  	this.frightened = false;
  	this.respawning = false;
  }

  App.Util.inherits(Ghost, MovingObjects);

  Ghost.prototype.findPath = function(options) {
  	var pacman = App.MovingObjects.Objects['pacman'];
  	var start = this.currentTilePos(this.pos);
  	if(pacman.currentTilePos(pacman.pos).equals(this.currentTilePos(this.pos))){
  		this.path = [this.currentTilePos(this.pos)];
  		return;
  	}
  	if(options && options.start){
  		start = options.start
  	}
  	var startNode = App.Boards.Nodes['' + JSON.stringify(start)];
  	var destination = this.currentTilePos(pacman.pos);
  	if(options && options.offset) {
  		var dirX = Math.sign(pacman.vel[0]);
  		var dirY = Math.sign(pacman.vel[1]);
  		var offsetDestination = [destination[0] + dirX * options.offset * BLOCK_DIM[0], destination[1] + dirY * 2 * BLOCK_DIM[0]]; 
  		if(App.Boards.Nodes['' + JSON.stringify(offsetDestination)]) {
  			destination = [destination[0] + dirX * options.offset * BLOCK_DIM[0], destination[1] + dirY * 2 * BLOCK_DIM[0]]
  		}
  	}
  	if(options && options.destination){
  		destination = options.destination;
  	}
  	var cameFrom = App.PathFinding.aStarSearch(startNode, start, destination);
  	this.path = App.PathFinding.reconstructPath(cameFrom, start, destination);
  	this.path.pop();
  }

  Ghost.prototype.isReverse = function(dX, dY) {
  	return (Math.sign(this.vel[0]) === dX && Math.sign(this.vel[1]) === -dY) || (Math.sign(this.vel[1]) === dY && Math.sign(this.vel[0]) === -dX)
  }

  Ghost.prototype.withinCage = function() {
  	return App.Boards.CageNodes['' + JSON.stringify(this.currentTilePos(this.pos))]
  }

  Ghost.prototype.isBackTrace = function(dX, dY){
  	if(Math.sign(this.vel[0]) === 1 && dX === -1) {
  		return true;
  	} else if(Math.sign(this.vel[0]) === -1 && dX === 1) {
  		return true;
  	} else if(Math.sign(this.vel[1]) === 1 && dY === -1) {
  		return true;
  	} else if(Math.sign(this.vel[1]) === -1 && dY === 1) {
  		return true;
  	}
  }

  Ghost.prototype.bestNextMove = function(destination){
  	var currentTilePos = this.currentTilePos(this.pos);
	var currentNode = App.Boards.Nodes['' + JSON.stringify(currentTilePos)];
	var bestNextNode = "None";
	var minimalDistance = Infinity;
	currentNode.neighbors.forEach(function(neighbor){
		var dX = Math.sign(neighbor.pos[0] - this.pos[0]);
		var dY = Math.sign(neighbor.pos[1] - this.pos[1]);
		if(this.isBackTrace(dX, dY)) {
			return;
		}
		var distance = App.Util.manhattan(neighbor.pos, destination);
		if(distance <= minimalDistance) {
			bestNextNode = neighbor;
			minimalDistance = distance;
		}
		
	}.bind(this))
	return bestNextNode.pos;
  }

  Ghost.prototype.flee = function() {

  	var randomIdx = Math.floor(Math.random() * App.Boards.IntersectionArr.length);
  	var destination = App.Boards.IntersectionArr[randomIdx];
  	var currentTilePos = this.currentTilePos(this.pos);
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		var nextMove = this.bestNextMove(destination)
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 1, Math.sign(nextMove[1] - this.pos[1]) * 1]; 
  	} 
  	this.pos[0] = this.pos[0] + this.vel[0];
  	this.pos[1] = this.pos[1] + this.vel[1];
  }

  Ghost.prototype.scatter = function(destination) {
  	var currentTilePos = this.currentTilePos(this.pos);
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)] || this.vel.equals([0, 0])) {
  		var currentNode = App.Boards.Nodes['' + JSON.stringify(currentTilePos)];
  		var bestNextNode = "None";
  		var minimalDistance = Infinity;
  		if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  			currentNode = App.Boards.Nodes['' + JSON.stringify(this.pos)];
  		}
  		currentNode.neighbors.forEach(function(neighbor){
  			var dX = Math.sign(neighbor.pos[0] - this.pos[0]);
  			var dY = Math.sign(neighbor.pos[1] - this.pos[1]);
  			if(this.isBackTrace(dX, dY)) {
  				return;
  			}
  			var distance = App.Util.manhattan(neighbor.pos, destination);
  			if(distance <= minimalDistance) {
  				bestNextNode = neighbor;
  				minimalDistance = distance;
  			}
  			
  		}.bind(this))
  		this.vel = [Math.sign(bestNextNode.pos[0] - this.pos[0]) * 2, Math.sign(bestNextNode.pos[1] - this.pos[1]) * 2];
  	}
  	this.changeAvatar(this.vel[0], this.vel[1]);
  	this.pos[0] = this.pos[0] + this.vel[0];
  	this.pos[1] = this.pos[1] + this.vel[1];
  }

  var Blinky = App.MovingObjects.Blinky = function Blinky(pos, vel, sprites, options){
  	Ghost.call(this, pos, vel, sprites, options);
  	this.avatar = this.spriteSources.blinkyLeft[this.animationCycle % 2]
  	this.scatterDestination = [0, 0]
  	this.vel = [0, 0];
  	this.moved = false;
  };
  App.Util.inherits(Blinky, Ghost);

  Blinky.prototype.draw = function(){
    this.blinkytx.clearRect(0, 0, 1000, 1000);
    this.move();
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.blinkytx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  	
  }

  Blinky.prototype.move = function() {
  	var pacman = App.MovingObjects.Objects['pacman'];	
  	if(!pacman.moved) {
  		return;
  	}
  	if(!this.moved){
  		this.moved = true;
  	}
  	this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
  	if(this.frightened){
  		this.flee();
  	} else {
  		if(this.animationCycle % 80 < 40) {
  			this.chase();
  		} else {
  			this.scatter(this.scatterDestination);
  		}
  	}
  	
  }

  Blinky.prototype.chase = function(){
  	var pacman = App.MovingObjects.Objects['pacman'];	
  	var pacmanCurrentTile = pacman.currentTilePos(pacman.pos);
  	var currentTilePos = this.currentTilePos(this.pos);

  	if(this.pos.equals(pacmanCurrentTile)) {
  		var nextMove = this.bestNextMove(pacman.pos)
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
	  	this.pos[0] = this.pos[0] + this.vel[0];
  		this.pos[1] = this.pos[1] + this.vel[1];
  		return;
  	}

  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		this.findPath();
  		var nextMove = this.path[this.path.length - 1];
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	} else if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  		this.findPath({start: this.pos, offset: 1});
  		var nextMove = this.path[this.path.length - 1];
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	}
  	
  	this.pos[0] = this.pos[0] + this.vel[0];
  	this.pos[1] = this.pos[1] + this.vel[1];
  	
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

  var Pinky = App.MovingObjects.Pinky = function Pinky(pos, vel, sprites, options){
  	Ghost.call(this, pos, vel, sprites, options);
  	this.avatar = this.spriteSources.pinkyLeft[this.animationCycle % 2];
  	this.scatterDestination = [1000, 0];
  	this.moved = false;
  	
  };
  App.Util.inherits(Pinky, Ghost);

  Pinky.prototype.draw = function(){
    this.pinkytx.clearRect(0, 0, 1000, 1000);
    this.move();
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.pinkytx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

  }

  Pinky.prototype.move = function() {
  	var blinky = App.MovingObjects.Objects['blinky'];	
  	if(!blinky.moved || blinky.animationCycle < 24) {
  		return;
  	}
  	if(!this.moved){
  		this.moved = true;
  	}

  	if(this.frightened){
  		this.flee();
  		return;
  	}
  	this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
  	if(this.frightened){
  		this.flee();
  	} else {
  		if(this.animationCycle % 80 < 40) {
  			this.chase();
  		} else {
  			this.scatter(this.scatterDestination);
  		}
  	}
  	
  }

  Pinky.prototype.chase = function(){
	var pacman = App.MovingObjects.Objects['pacman'];	
  	var pacmanCurrentTile = pacman.currentTilePos(pacman.pos);
  	var currentTilePos = this.currentTilePos(this.pos);

  	if(this.pos.equals(pacman.closestIntersection(pacman.vel, 4))) {
  		var nextMove = this.bestNextMove(pacman.pos)
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
	  	this.pos[0] = this.pos[0] + this.vel[0];
  		this.pos[1] = this.pos[1] + this.vel[1];
  		return;
  	}
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		this.findPath({destination: pacman.closestIntersection(pacman.vel, 4)})
  		var nextMove = this.path[this.path.length - 1];
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	} else if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  		this.findPath({start: this.pos, destination: pacman.closestIntersection(pacman.vel, 4)})
  		var nextMove = this.path[this.path.length - 1];
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	}
  	
  	this.pos[0] = this.pos[0] + this.vel[0];
  	this.pos[1] = this.pos[1] + this.vel[1];
  	
  }

  Pinky.prototype.changeAvatar = function(dx, dy) {
  	if(dx === 1) {
  		this.avatar = this.spriteSources.pinkyRight[this.animationCycle % 2];
  	} else if(dx === -1) {
  		this.avatar = this.spriteSources.pinkyLeft[this.animationCycle % 2];
  	} else if(dy === -1) {
  		this.avatar = this.spriteSources.pinkyUp[this.animationCycle % 2];
  	} else if(dy === 1) {
  		this.avatar = this.spriteSources.pinkyDown[this.animationCycle % 2];
  	}
  }



var Inky = App.MovingObjects.Inky = function Inky(pos, vel, sprites, options){
  	Ghost.call(this, pos, vel, sprites, options);
  	this.avatar = this.spriteSources.inkyLeft[this.animationCycle % 2];
  	this.scatterDestination = [0, 1000];
  	this.moved = false;
  };
  App.Util.inherits(Inky, Ghost);

  Inky.prototype.draw = function(){
    this.inkytx.clearRect(0, 0, 1000, 1000);
    this.move();
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.inkytx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
	
  }

  Inky.prototype.move = function() {
  	var pinky = App.MovingObjects.Objects['pinky'];	
  	if(!pinky.moved || pinky.animationCycle < 24) {
  		return;
  	}
  	if(!this.moved){
  		this.moved = true;
  	}
  	this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
  	if(this.frightened){
  		this.flee();
  	} else {
  		if(this.animationCycle % 80 < 40) {
  			this.chase();
  		} else {
  			this.scatter(this.scatterDestination);
  		}
  	}
  	
  }

  Inky.prototype.chase = function(){
	var pacman = App.MovingObjects.Objects['pacman'];	
  	var pacmanCurrentTile = pacman.currentTilePos(pacman.pos);
  	var currentTilePos = this.currentTilePos(this.pos);

  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		var nextMove = this.bestNextMove(pacman.pos)
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	} else if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  		this.findPath({start: this.pos, offset: 1});
  		var nextMove = this.path[this.path.length - 1];
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	}
  	
  	this.pos[0] = this.pos[0] + this.vel[0];
  	this.pos[1] = this.pos[1] + this.vel[1];

  	
  	
  }

  Inky.prototype.changeAvatar = function(dx, dy) {
  	if(dx === 1) {
  		this.avatar = this.spriteSources.inkyRight[this.animationCycle % 2];
  	} else if(dx === -1) {
  		this.avatar = this.spriteSources.inkyLeft[this.animationCycle % 2];
  	} else if(dy === -1) {
  		this.avatar = this.spriteSources.inkyUp[this.animationCycle % 2];
  	} else if(dy === 1) {
  		this.avatar = this.spriteSources.inkyDown[this.animationCycle % 2];
  	}
  }



var Clyde = App.MovingObjects.Clyde = function Clyde(pos, vel, sprites, options){
  	Ghost.call(this, pos, vel, sprites, options);
  	this.avatar = this.spriteSources.clydeLeft[this.animationCycle % 2];
  	this.scatterDestination = [1000, 1000];
  	this.moved = false;
  };
  App.Util.inherits(Clyde, Ghost);

  Clyde.prototype.draw = function(){
    this.clydetx.clearRect(0, 0, 1000, 1000);
    this.move();
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.clydetx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

  }

  Clyde.prototype.move = function() {
  	var inky = App.MovingObjects.Objects['inky'];	
  	if(!inky.moved || inky.animationCycle < 24) {
  		return;
  	}
  	if(!this.moved){
  		this.moved = true;
  	}
  	this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]));
  	if(this.frightened){
  		this.flee();
  	} else {
  		if(this.animationCycle % 80 < 40) {
  			this.chase();
  		} else {
  			this.scatter(this.scatterDestination);
  		}
  	}
  	
  }


  Clyde.prototype.chase = function(){
	var pacman = App.MovingObjects.Objects['pacman'];	
  	var pacmanCurrentTile = pacman.currentTilePos(pacman.pos);
  	var currentTilePos = this.currentTilePos(this.pos);

  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		var nextMove = this.bestNextMove(pacman.pos)
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	} else if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  		this.findPath({start: this.pos, offset: 1});
  		var nextMove = this.path[this.path.length - 1];
	  	this.vel = [Math.sign(nextMove[0] - this.pos[0]) * 2, Math.sign(nextMove[1] - this.pos[1]) * 2]; 
  	}
  	
  	this.pos[0] = this.pos[0] + this.vel[0];
  	this.pos[1] = this.pos[1] + this.vel[1];  	
  }

  Clyde.prototype.changeAvatar = function(dx, dy) {
  	if(dx === 1) {
  		this.avatar = this.spriteSources.clydeRight[this.animationCycle % 2];
  	} else if(dx === -1) {
  		this.avatar = this.spriteSources.clydeLeft[this.animationCycle % 2];
  	} else if(dy === -1) {
  		this.avatar = this.spriteSources.clydeUp[this.animationCycle % 2];
  	} else if(dy === 1) {
  		this.avatar = this.spriteSources.clydeDown[this.animationCycle % 2];
  	}
  }

})();
