(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  App.MovingObjects = {};

  var Objects = App.MovingObjects.Objects = {};

  var MovingObjects = App.MovingObjects.MovingObjects = function MovingObjects(pos, vel, sprites) {
  	this.pos = pos;
  	this.vel = vel;
  	this.sprites = sprites;
    this.spriteSources = {
    	pacmanLeft: [[852, 400, 48, 50], [852, 300, 48, 52], [852, 350, 48, 50], [852, 300, 48, 50]],
    	pacmanRight: [[852, 0, 48, 50], [852, 100, 48, 50], [852, 50, 48, 50], [852, 100, 48, 50]],
    	pacmanUp: [[852, 450, 48, 50], [852, 500, 48, 50], [852, 550, 48, 50], [852, 500, 48, 50]],
    	pacmanDown: [[852, 150, 48, 50], [852, 250, 48, 50], [852, 200, 48, 50], [852, 250, 48, 50]],
    	blinkyLeft: [[652, 200, 48, 50], [652, 250, 48, 50]],
    	blinkyRight: [[652, 0, 48, 50], [652, 50, 48, 50]],
    	blinkyUp: [[652, 300, 48, 50], [652, 350, 48, 50]],
    	blinkyDown: [[652, 100, 48, 50], [652, 150, 48, 50]],
    	pinkyLeft: [[702, 200, 48, 50], [702, 250, 48, 50]],
    	pinkyRight: [[702, 0, 48, 50], [702, 50, 48, 50]],
    	pinkyUp: [[702, 300, 48, 50], [702, 350, 48, 50]],
    	pinkyDown: [[702, 100, 48, 50], [702, 150, 48, 50]],
    	inkyLeft: [[752, 200, 48, 50], [752, 250, 48, 50]],
    	inkyRight: [[752, 0, 48, 50], [752, 50, 48, 50]],
    	inkyUp: [[752, 300, 48, 50], [752, 350, 48, 50]],
    	inkyDown: [[752, 100, 48, 50], [752, 150, 48, 50]],
    	clydeLeft: [[802, 200, 48, 50], [802, 250, 48, 50]],
    	clydeRight: [[802, 0, 48, 50], [802, 50, 48, 50]],
    	clydeUp: [[802, 300, 48, 50], [802, 350, 48, 50]],
    	clydeDown: [[802, 100, 48, 50], [802, 150, 48, 50]],
    }
    this.animationCycle = 0;
  }

  MovingObjects.prototype.draw = function() {
  	$.each(Objects, function(objectKey, object){
  		object.draw();
  	});
  };

  MovingObjects.prototype.move = function() {
  	$.each(Objects, function(objectKey, object){
  		object.draw();
  	});
  };

  MovingObjects.prototype.determineVelocity = function(destination){
  	
  	if(destination[0] !== this.pos[0]) {
  		return [Math.sign(destination[0] - this.pos[0]) * 2, this.vel[1]];
  	} else if (destination[1] !== this.pos[1]) {
  		return [this.vel[0], Math.sign(destination[1] - this.pos[1]) * 2];
  	}
  }

  MovingObjects.prototype.currentTilePos = function(pos) {
  	var closestGridPosX = Math.floor((pos[0]-1)/App.Blocks.BLOCK_DIM[0]);
  	var closestGridPosY = Math.floor((pos[1]-1)/App.Blocks.BLOCK_DIM[1]);
  	var tilePosX = App.Blocks.BLOCK_DIM[0] * closestGridPosX + (App.Blocks.BLOCK_DIM[0]/2) + 1;
  	var tilePosY = App.Blocks.BLOCK_DIM[1] * closestGridPosY + (App.Blocks.BLOCK_DIM[1]/2) + 1;
  	return [tilePosX, tilePosY];
  }

  var Pacman = App.MovingObjects.Pacman = function Pacman(pos, vel, sprites, ptx, gtx, dotstx){
  	MovingObjects.call(this, pos, vel, sprites)
  	this.ptx = ptx;
  	this.gtx = gtx;
  	this.dotstx = dotstx;
  	this.moveQueue = [];
  	this.avatar = this.spriteSources.pacmanLeft[this.animationCycle % 4];
  	this.moved = false;
  };

  App.Util.inherits(Pacman, MovingObjects);

  Pacman.prototype.draw = function(){
  	this.move();
  	this.ptx.clearRect(0, 0, 1000, 1000);
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.ptx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  };

  Pacman.prototype.available_move = function(vel) {

  	if(Math.sign(vel[0]) === -1) {
  		var nextTilePos = this.currentTilePos([this.pos[0] - App.Blocks.BLOCK_DIM[0], this.pos[1]]);
  		var dir = [-1, 0]
  	} else if (Math.sign(vel[0]) === 1) {
  		var nextTilePos = this.currentTilePos([this.pos[0] + App.Blocks.BLOCK_DIM[0], this.pos[1]]);
  		var dir = [1, 0]
  	} else if (Math.sign(vel[1]) === -1) {
  		var nextTilePos = this.currentTilePos([this.pos[0], this.pos[1] - App.Blocks.BLOCK_DIM[1]]);
  		var dir = [0, -1]
  	} else if (Math.sign(vel[1]) === 1) {
  		var nextTilePos = this.currentTilePos([this.pos[0], this.pos[1] + App.Blocks.BLOCK_DIM[1]]);
  		var dir = [0, 1]
  	} else {
  		var nextTilePos = this.pos;
  		var dir = [0, 0];
  	}

  	nextTilePos = JSON.stringify(nextTilePos);

  	if(App.Boards.WallCollisions['' + nextTilePos] === 1) {
  		var nextTilePos = JSON.parse(nextTilePos);
  		if(dir[0] === 1) {
  			if((nextTilePos[0] - this.pos[0]) <= App.Blocks.BLOCK_DIM[0]) {
  				this.vel[0] = 0;
  				return "false";

  			}
  		} else if (dir[0] === -1) {
  			if((this.pos[0] - nextTilePos[0]) <= App.Blocks.BLOCK_DIM[0]) {
  				this.vel[0] = 0;
  				
  				return "false"
  			}
  		} else if (dir[1] === 1) {
  			if((nextTilePos[1] - this.pos[1]) <= App.Blocks.BLOCK_DIM[1]) {
  				
  				this.vel[1] = 0;
  				return "false";
  			}
  		} else if (dir[1] === -1) {
  			if((this.pos[1] - nextTilePos[1]) <= App.Blocks.BLOCK_DIM[1]) {
  				
  				this.vel[1] = 0;
  				return "false";
  			}
  		}

  	}	
  	
  	return true
  	
  }

 Pacman.prototype.move = function() {
 	this.eatDot();
  	if(App.Boards.Intersections['' + JSON.stringify(this.pos)]) {

  		if(this.available_move(this.moveQueue[0]) !== 'false') {
  			this.vel[0] = this.moveQueue[0][0];
  			this.vel[1] = this.moveQueue[0][1];  			
  		} 
  	} 
  	this.changeAvatar(Math.sign(this.vel[0]), Math.sign(this.vel[1]))
	this.pos[0] = this.pos[0] + this.vel[0];
	this.pos[1] = this.pos[1] + this.vel[1];
  	
 }

Pacman.prototype.eatDot = function() {
 	if(App.StationaryObjects.Objects[this.pos] && App.StationaryObjects.Objects[this.pos].constructor.name === "SmallDot"){
 		delete App.StationaryObjects.Objects[this.pos];
 		this.dotstx.clearRect(this.pos[0] - App.Blocks.BLOCK_DIM[0]/2, this.pos[1] - App.Blocks.BLOCK_DIM[1]/2, App.Blocks.BLOCK_DIM[0], App.Blocks.BLOCK_DIM[1])
 	} else if(App.StationaryObjects.Objects[this.pos] && App.StationaryObjects.Objects[this.pos].constructor.name === "LargeDot") {
 		delete App.StationaryObjects.Objects[this.pos];
 		$.each(App.MovingObjects.Objects, function(objectKey, object){
          	if(object.constructor.prototype.__proto__.constructor.name === "Ghost") {
          		object.frightened = true;
          	}
          })
 		debugger
 	}
 }

 Pacman.prototype.changeAvatar = function(dx, dy) {
  	if(dx === 1) {
  		this.avatar = this.spriteSources.pacmanRight[this.animationCycle % 4];
  	} else if(dx === -1) {
  		this.avatar = this.spriteSources.pacmanLeft[this.animationCycle % 4];
  	} else if(dy === -1) {
  		this.avatar = this.spriteSources.pacmanUp[this.animationCycle % 4];
  	} else if(dy === 1) {
  		this.avatar = this.spriteSources.pacmanDown[this.animationCycle % 4];
  	}
  }

  Pacman.prototype.is_turn = function(vel) {
  	if(this.vel[0] === 0 && this.vel[1] === 0) {
  		return false
  	}
  	var current_dir = [Math.sign(this.vel[0]), Math.sign(this.vel[1])]
  	var new_dir = [Math.sign(vel[0]), Math.sign(vel[1])];
  	if(this.vel[0] === 0 && new_dir[1] === current_dir[1] * -1){
  		return false
  	}
  	if(this.vel[1] === 0 &&  new_dir[0] === current_dir[0] * -1) {
  		return false
  	}
  	return true
  }

  Pacman.prototype.closestIntersection = function(vel, minimalNodesAway){
  	var currentDirection = [Math.sign(vel[0]), Math.sign(vel[1])];
  	if(currentDirection.equals([0, 0])) {
  		return this.currentTilePos(this.pos);
  	}
  	var startTile = this.currentTilePos(this.pos)
  	var found = false;
  	var accumulator = 0;
  	while(!found){
  		var checkPos = [0, 0]
  		checkPos[0] += startTile[0] + accumulator * currentDirection[0] * App.Blocks.BLOCK_DIM[0];
  		checkPos[1] += startTile[1] + accumulator * currentDirection[1] * App.Blocks.BLOCK_DIM[1];	
  		if(App.Boards.Intersections['' + JSON.stringify(checkPos)]){
  			found = true;
  			break;
  		}
  		accumulator += 1
  		if(accumulator > minimalNodesAway) {
  			return this.currentTilePos(this.pos);
  		}
  	}
  	
  	return checkPos;
  }

  Pacman.prototype.tileOffset = function(tilesAway) {
	var currentTilePos = this.currentTilePos(this.pos);
	var dX = Math.sign(this.vel[0]);
	var dY = Math.sign(this.vel[1])
	if(dX === -1){
		var posX = currentTilePos[0] - tilesAway * App.Blocks.BLOCK_DIM[0];
		return [posX, currentTilePos[1]];
	} else if(dX === 1) {
		var posX = currentTilePos[0] + tilesAway * App.Blocks.BLOCK_DIM[0];
		return [posX, currentTilePos[1]];
	} else if(dY === 1) {
		var posY = currentTilePos[0] + tilesAway * App.Blocks.BLOCK_DIM[1];
		return [currentTilePos[0], posY];
	} else if(dY === -1) {
		var posX = currentTilePos[0] - tilesAway * App.Blocks.BLOCK_DIM[0];
		var posY = currentTilePos[0] - tilesAway * App.Blocks.BLOCK_DIM[1];
		return [posX, posY];
	}

  }  

  Pacman.prototype.changeDirection = function(vel){
  	this.moveQueue.pop();
  	this.moveQueue.push(vel);
  	this.moved = true;
	if(!this.is_turn(vel)) {
		this.vel[0] = vel[0];
		this.vel[1] = vel[1];		
	} 
  }


})();