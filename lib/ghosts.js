(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }
  var MovingObjects = App.MovingObjects.MovingObjects;
  var BLOCK_DIM = App.Blocks.BLOCK_DIM;

  var Ghost = App.MovingObjects.Ghost = function Ghost(options) {
  	MovingObjects.call(this, options.pos, options.vel, options.sprites, options.ptx, options.gtx, options.pdtx, options.pinkytx);
  	this.path = [];
  }

  App.Util.inherits(Ghost, MovingObjects);

  Ghost.prototype.findPath = function(options) {
  	var pacman = App.MovingObjects.Objects['pacman'];
  	var start = this.currentTilePos(this.pos);
  	if(options && options.start){
  		start = options.start
  	}
  	var startNode = App.Boards.Nodes['' + JSON.stringify(start)];
  	var destination = this.currentTilePos(pacman.pos);
  	if(options && options.offset) {
  		var dirX = Math.sign(pacman.vel[0]);
  		var dirY = Math.sign(pacman.vel[1]);
  		destination = [destination[0] + dirX * options.offset * BLOCK_DIM[0], destination[1] + dirY * 2 * BLOCK_DIM[0]]
  	}
  	if(options && options.destination){
  		destination = options.destination;
  	}
  	var cameFrom = App.PathFinding.aStarSearch(startNode, start, destination);
  	this.path = App.PathFinding.reconstructPath(cameFrom, start, destination);
  	this.path.pop()
  }

  Ghost.prototype.scatter = function(destination) {
  	var currentTilePos = this.currentTilePos(this.pos);
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]) {
  		var currentNode = App.Boards.Nodes['' + JSON.stringify(currentTilePos)];
  		var bestNextNode = "None";
  		var minimalDistance = Infinity;
  		currentNode.neighbors.forEach(function(neighbor){
  			var dX = Math.sign(neighbor.pos[0] - this.pos[0]);
  			var dY = Math.sign(neighbor.pos[1] - this.pos[1]);
  			if((Math.sign(this.vel[0]) === dX && Math.sign(this.vel[1]) === -dY) || (Math.sign(this.vel[1]) === dY && Math.sign(this.vel[0]) === -dX)) {
  				return;
  			}
  			var distance = App.Util.manhattan(neighbor.pos, destination);
  			if(distance < minimalDistance) {
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

  var Blinky = App.MovingObjects.Blinky = function Blinky(options){
  	Ghost.call(this, options);
  	this.avatar = this.spriteSources.blinkyLeft[this.animationCycle % 2]
  	this.vel = [1, 0];
  };
  App.Util.inherits(Blinky, Ghost);

  Blinky.prototype.draw = function(){
    this.pdtx.clearRect(0, 0, 1000, 1000);
    var pacman = App.MovingObjects.Objects['pacman'];	
  	var pacmanCurrentTile = pacman.currentTilePos(pacman.pos);
  	this.scatter(pacman.pos);
    // this.move();
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

  	if(currentTilePos.equals(pacmanCurrentTile)){
  		
  		return;
  	}
  		
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		this.findPath();
  	}
  	if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  		this.findPath({start: this.pos, offset: 1});
  	}
  	var nextMove = this.path[this.path.length - 1];
  	if(this.pos.equals(nextMove)){
  		this.path.pop();
  		nextMove = this.path[this.path.length - 1];
  	}
  	if(this.path.length === 0){
  		this.findPath();
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
  	this.avatar = this.spriteSources.pinkyLeft[this.animationCycle % 2];
  	this.destination = [0, 0];

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
  	// this.path.forEach(function(node){
  	// 	var pathX = node[0];
  	// 	var pathY = node[1];
  	// 	this.pdtx.fillStyle = 'red';
  	// 	this.pdtx.fillRect(pathX - App.Blocks.BLOCK_DIM[0]/2, pathY - App.Blocks.BLOCK_DIM[1]/2, App.Blocks.BLOCK_DIM[0], App.Blocks.BLOCK_DIM[1]);
  	// }.bind(this))	
  }



  Pinky.prototype.move = function(){
  	var pacman = App.MovingObjects.Objects['pacman'];	
  	var pacmanCurrentTile = pacman.currentTilePos(pacman.pos);
  	var currentTilePos = this.currentTilePos(this.pos);
  	
  	if(this.animationCycle === 0){
  		this.findPath({destination: pacman.closestIntersection(pacman.vel, 4)});
  	} 

  	if(this.animationCycle < 40) {
  		return;
  	}
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		this.findPath({destination: pacman.closestIntersection(pacman.vel, 4)});
  		this.destination = pacman.closestIntersection(pacman.vel, 4);
  	} 

  	// if(currentTilePos.equals(this.destination)){
  	// 	this.findPath({destination: pacman.closestIntersection(pacman.vel, 4)});
  	// 	this.destination = pacman.closestIntersection(pacman.vel, 4);
  	// }

  	// if(this.animationCycle % 8 === 4){
  	// 	this.findPath({destination: pacman.closestIntersection(pacman.vel, 4)});
  	// 	this.destination = pacman.closestIntersection(pacman.vel, 4);
  	// }
  		
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]){	
  		this.findPath({destination: pacman.closestIntersection(pacman.vel, 4)})
  		this.destination = pacman.closestIntersection(pacman.vel, 4);
  	}
  	if(App.Boards.CageNodes['' + JSON.stringify(this.pos)]){
  		this.findPath({start: this.pos, destination: pacman.closestIntersection(pacman.vel, 4)});
  		this.destination = pacman.closestIntersection(pacman.vel, 4);
  	}
  	if(this.path.length === 0){
  		this.findPath({destination: pacman.closestIntersection(pacman.vel, 4)})
  		this.destination = pacman.closestIntersection(pacman.vel, 4);
  		var nextMove = this.path[this.path.length - 1];
  	}
  	var nextMove = this.path[this.path.length - 1];
  	if(this.pos.equals(nextMove)){
  		this.path.pop();
  		nextMove = this.path[this.path.length - 1];
  	}

  	if(currentTilePos.equals(pacman.closestIntersection(pacman.vel, 4))){
  		var dX = Math.sign(this.vel[0]);
  		var dY = Math.sign(this.vel[1]);
  		if(App.Boards.Nodes['' + JSON.stringify([currentTilePos[0] + dX * App.Blocks.BLOCK_DIM[0], currentTilePos[1] + dY * App.Blocks.BLOCK_DIM[1]])]){
  			this.pos[0] = this.pos[0] + this.vel[0];
	  		this.pos[1] = this.pos[1] + this.vel[1];
  		} else {
  			this.vel[0] = -this.vel[0];
  			this.vel[1] = -this.vel[1];
  			this.pos[0] = this.pos[0] + this.vel[0];
	  		this.pos[1] = this.pos[1] + this.vel[1];
  		}
  		
  	}
  		// var destination = pacman.closestIntersection(pacman.vel, 4);
  		// this.gtx.clearRect(0, 0, 1000, 1000);
  		// this.gtx.fillStyle = 'red';
  		// this.gtx.fillRect(destination[0] - App.Blocks.BLOCK_DIM[0]/2, destination[1] - App.Blocks.BLOCK_DIM[1]/2, App.Blocks.BLOCK_DIM[0], App.Blocks.BLOCK_DIM[1]);
  
  	if(nextMove){
	  	var dX = Math.sign(nextMove[0] - this.pos[0]);
	  	var dY = Math.sign(nextMove[1] - this.pos[1]);
	  	this.changeAvatar(dX, dY);
	  	this.vel[0] = dX * 2;
	  	this.vel[1] = dY * 2;
	  	this.pos[0] = this.pos[0] + this.vel[0];
	  	this.pos[1] = this.pos[1] + this.vel[1];
  	}
  	
  	
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

})();
