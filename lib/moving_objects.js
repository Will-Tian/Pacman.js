(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  App.MovingObjects = {};

  var Objects = App.MovingObjects.Objects = [];

  var MovingObjects = App.MovingObjects.MovingObjects = function MovingObjects(pos, vel, sprites, ptx, gtx, pdtx) {
  	this.pos = pos;
  	this.vel = vel;
  	this.ptx = ptx;
  	this.gtx = gtx;
  	this.pdtx = pdtx;
  	this.sprites = sprites;
    this.spriteSources = {
    	pacmanLeftOne: [852, 400, 48, 50]
    }
  }

  MovingObjects.prototype.draw = function() {
  	Objects.forEach(function(object){
  		object.draw();
  	})
  };

  MovingObjects.prototype.move = function() {
  	Objects.forEach(function(object){
  		object.move();
  	})
  };

  var Pacman = App.MovingObjects.Pacman = function Pacman(options){
  	MovingObjects.call(this, options.pos, options.vel, options.sprites, options.ptx, options.gtx, options.pdtx);
  	this.moveQueue = [];
  };

  App.Util.inherits(Pacman, MovingObjects);

  Pacman.prototype.draw = function(){
  	var currentTilePos = this.currentTilePos(this.pos);
  	currentTile = JSON.stringify(currentTilePos);
  	if(App.Boards.Intersections['' + currentTile] === 1 && (this.pos[0] === currentTilePos[0] && this.pos[1] === currentTilePos[1])) {
  		if(this.available_move(this.moveQueue[0]) !== 'false') {
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
  		this.pos[0] = this.pos[0] + this.vel[0];
  		this.pos[1] = this.pos[1] + this.vel[1];
  	};
  	
  	this.ptx.clearRect(0, 0, 1000, 1000);
  	this.pdtx.clearRect(0, 0, 1000, 1000);
  	var sourceX = this.spriteSources.pacmanLeftOne[0]
  	var sourceY = this.spriteSources.pacmanLeftOne[1]
  	var sourceWidth = this.spriteSources.pacmanLeftOne[2]
  	var sourceHeight = this.spriteSources.pacmanLeftOne[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.ptx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  	this.pdtx.fillStyle = "red";
  	// this.pdtx.fillRect(this.pos[0] - App.Blocks.BLOCK_DIM[0]/2, this.pos[1] - App.Blocks.BLOCK_DIM[1]/2, App.Blocks.BLOCK_DIM[0], App.Blocks.BLOCK_DIM[1])
  	// this.pdtx.fillRect(this.currentTilePos(this.pos)[0] - (App.Blocks.BLOCK_DIM[0]/2), this.currentTilePos(this.pos)[1] - (App.Blocks.BLOCK_DIM[1]/2), 20, 20)
  };

  Pacman.prototype.currentTilePos = function(pos) {
  	// offset of 1: compensates for canvas.draw starting at [1, 1] rather than [0, 0]
  	var closestGridPosX = Math.floor((pos[0]-1)/App.Blocks.BLOCK_DIM[0]);
  	var closestGridPosY = Math.floor((pos[1]-1)/App.Blocks.BLOCK_DIM[1]);
  	//returns the center of the tile
  	var tilePosX = App.Blocks.BLOCK_DIM[0] * closestGridPosX + (App.Blocks.BLOCK_DIM[0]/2) + 1;
  	var tilePosY = App.Blocks.BLOCK_DIM[1] * closestGridPosY + (App.Blocks.BLOCK_DIM[1]/2) + 1;
  	
  	return [tilePosX, tilePosY];
  }

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

  	if(this.available_move(vel) === "false") {

  	} else {
  		
  		if(!this.is_turn(vel)) {
  			this.vel[0] = vel[0];
  			this.vel[1] = vel[1];		
  		} else if (this.is_turn(vel)) {
  			
  		}
  		
  	};

  }


})();