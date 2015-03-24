(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  App.MovingObjects = {};

  var Objects = App.MovingObjects.Objects = {};

  var MovingObjects = App.MovingObjects.MovingObjects = function MovingObjects(pos, vel, sprites, ptx, gtx, pdtx) {
  	this.pos = pos;
  	this.vel = vel;
  	this.ptx = ptx;
  	this.gtx = gtx;
  	this.pdtx = pdtx;
  	this.sprites = sprites;
    this.spriteSources = {
    	pacmanLeft: [[852, 400, 48, 50], [852, 300, 48, 52], [852, 350, 48, 50], [852, 300, 48, 50]],
    	pacmanRight: [[852, 0, 48, 50], [852, 100, 48, 50], [852, 50, 48, 50], [852, 100, 48, 50]],
    	pacmanUp: [[852, 450, 48, 50], [852, 500, 48, 50], [852, 550, 48, 50], [852, 500, 48, 50]],
    	pacmanDown: [[852, 150, 48, 50], [852, 250, 48, 50], [852, 200, 48, 50], [852, 250, 48, 50]],
    	blinkyRight: [[652, 0, 48, 50], [652, 50, 48, 50]],
    	blinkyDown: [[652, 100, 48, 50], [652, 150, 48, 50]],
    	blinkyLeft: [[652, 200, 48, 50], [652, 250, 48, 50]],
    	blinkyUp: [[652, 300, 48, 50], [652, 350, 48, 50]]
    }
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
  	// offset of 1: compensates for canvas.draw starting at [1, 1] rather than [0, 0]
  	var closestGridPosX = Math.floor((pos[0]-1)/App.Blocks.BLOCK_DIM[0]);
  	var closestGridPosY = Math.floor((pos[1]-1)/App.Blocks.BLOCK_DIM[1]);
  	//returns the center of the tile
  	var tilePosX = App.Blocks.BLOCK_DIM[0] * closestGridPosX + (App.Blocks.BLOCK_DIM[0]/2) + 1;
  	var tilePosY = App.Blocks.BLOCK_DIM[1] * closestGridPosY + (App.Blocks.BLOCK_DIM[1]/2) + 1;
  	
  	return [tilePosX, tilePosY];
  }

  var Pacman = App.MovingObjects.Pacman = function Pacman(options){
  	MovingObjects.call(this, options.pos, options.vel, options.sprites, options.ptx, options.gtx, options.pdtx);
  	this.moveQueue = [];
  	this.animationCycle = 0;
  	this.avatar = this.spriteSources.pacmanLeft[this.animationCycle % 4];
  	this.moved = false;
  };

  App.Util.inherits(Pacman, MovingObjects);

  Pacman.prototype.draw = function(){
  	var currentTilePos = this.currentTilePos(this.pos);
  	currentTile = JSON.stringify(currentTilePos);
  	if(App.Boards.Intersections['' + currentTile] === 1 && (this.pos[0] === currentTilePos[0] && this.pos[1] === currentTilePos[1])) {
  		
  		if(this.available_move(this.moveQueue[0]) !== 'false') {

  			if(Math.sign(this.moveQueue[0][0]) === 1) {
  				this.avatar = this.spriteSources.pacmanRight[this.animationCycle % 4];
  			} else if (Math.sign(this.moveQueue[0][0]) === -1) {
  				this.avatar = this.spriteSources.pacmanLeft[this.animationCycle % 4];
  			} else if (Math.sign(this.moveQueue[0][1]) === 1) {
  				this.avatar = this.spriteSources.pacmanDown[this.animationCycle % 4];
  			} else if (Math.sign(this.moveQueue[0][1]) === -1) {
  				this.avatar = this.spriteSources.pacmanUp[this.animationCycle % 4];
  			}
  			this.vel[0] = this.moveQueue[0][0];
  			this.vel[1] = this.moveQueue[0][1];
  			this.pos[0] = this.pos[0] + this.vel[0];
  			this.pos[1] = this.pos[1] + this.vel[1];
  			
  		} else {
  			this.pos[0] = this.pos[0] + this.vel[0];
  			this.pos[1] = this.pos[1] + this.vel[1];
  		}
  	} else if(this.available_move(this.vel) === "false"){
  	} else {
  			if(Math.sign(this.vel[0]) === 1) {
  				this.avatar = this.spriteSources.pacmanRight[this.animationCycle % 4];
  			} else if (Math.sign(this.vel[0]) === -1) {
  				this.avatar = this.spriteSources.pacmanLeft[this.animationCycle % 4];
  			} else if (Math.sign(this.vel[1]) === 1) {
  				this.avatar = this.spriteSources.pacmanDown[this.animationCycle % 4];
  			} else if (Math.sign(this.vel[1]) === -1) {
  				this.avatar = this.spriteSources.pacmanUp[this.animationCycle % 4];
  			}
  		this.pos[0] = this.pos[0] + this.vel[0];
  		this.pos[1] = this.pos[1] + this.vel[1];
  	};
  	
  	this.ptx.clearRect(0, 0, 1000, 1000);
  	// this.pdtx.clearRect(0, 0, 1000, 1000);
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.ptx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  	// ---- Debugging---- Uncomment below to render current position of Pacman 
  	// this.pdtx.fillStyle = "red";
  	// this.pdtx.fillRect(this.pos[0] - App.Blocks.BLOCK_DIM[0]/2, this.pos[1] - App.Blocks.BLOCK_DIM[1]/2, App.Blocks.BLOCK_DIM[0], App.Blocks.BLOCK_DIM[1])
  	// this.pdtx.fillRect(this.currentTilePos(this.pos)[0] - (App.Blocks.BLOCK_DIM[0]/2), this.currentTilePos(this.pos)[1] - (App.Blocks.BLOCK_DIM[1]/2), 20, 20)
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

  Pacman.prototype.move = function(vel){
  	this.moveQueue.pop();
  	this.moveQueue.push(vel);
  	this.moved = true;
  	if(this.available_move(vel) === "false") {
  	} else {
  		if(!this.is_turn(vel)) {
  			this.vel[0] = vel[0];
  			this.vel[1] = vel[1];		
  		} 
  	};
  }


})();