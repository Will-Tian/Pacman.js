(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  App.MovingObjects = {};

  var Objects = App.MovingObjects.Objects = [];

  var MovingObjects = App.MovingObjects.MovingObjects = function MovingObjects(pos, vel, sprites, ptx) {
  	this.pos = pos;
  	this.vel = vel;
  	this.ptx = ptx;
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
  	MovingObjects.call(this, options.pos, options.vel, options.sprites, options.ptx);
  };

  App.Util.inherits(Pacman, MovingObjects);

  Pacman.prototype.draw = function(){
  	this.pos[0] = this.pos[0] + this.vel[0];
  	this.pos[1] = this.pos[1] + this.vel[1];
  	this.ptx.clearRect(0, 0, 1000, 1000);
  	var sourceX = this.spriteSources.pacmanLeftOne[0]
  	var sourceY = this.spriteSources.pacmanLeftOne[1]
  	var sourceWidth = this.spriteSources.pacmanLeftOne[2]
  	var sourceHeight = this.spriteSources.pacmanLeftOne[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2 - 5;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2 - 5;
  	var destX = this.pos[0] + 2;
  	var destY = this.pos[1] - 8;
  	this.ptx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  };

  Pacman.prototype.move = function(vel){
  	this.vel[0] = vel[0];
  	this.vel[1] = vel[1];
  	
  }


})();