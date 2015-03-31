(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  App.StationaryObjects = {};
  var Objects = App.StationaryObjects.Objects = {};

  var Dots = App.StationaryObjects.Dots = function(pos, sprites, dotstx) {
  	this.pos = pos;
  	this.sprites = sprites;
  	this.dotstx = dotstx;
  	this.animationCycle = 0;
  	this.spriteSources = {
  		smalldot: [512, 616, 20, 20],
  		largedot: [532, 600, 35, 35]
  	}
  }

  Dots.prototype.draw = function(){
  	$.each(Objects, function(objectKey, object){
  		object.draw();
  	});
  }

  var SmallDot = App.StationaryObjects.SmallDot = function SmallDot(pos, sprites, dotstx){
  	Dots.call(this, pos, sprites, dotstx);
  	this.spriteSource = this.spriteSources['smalldot'];
  }

  App.Util.inherits(SmallDot, Dots);

  SmallDot.prototype.draw = function(){
  	var sourceX = this.spriteSource[0]
  	var sourceY = this.spriteSource[1]
  	var sourceWidth = this.spriteSource[2]
  	var sourceHeight = this.spriteSource[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0]/2;
  	var destHeight = App.Blocks.BLOCK_DIM[1]/2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0]/4;
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1]/4;
  	this.dotstx.clearRect(destX, destY, destWidth, destHeight);
  	this.dotstx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  }

  var LargeDot = App.StationaryObjects.LargeDot = function LargeDot(pos, sprites, dotstx){
  	Dots.call(this, pos, sprites, dotstx);
  	this.spriteSource = this.spriteSources['largedot'];
  	this.animationCycle = 0;
  }

  App.Util.inherits(LargeDot, Dots);

  LargeDot.prototype.draw = function(){
  	this.animationCycle += 1;
  	this.dotstx.clearRect(this.pos[0] - App.Blocks.BLOCK_DIM[0]/2, this.pos[1] - App.Blocks.BLOCK_DIM[1]/2, App.Blocks.BLOCK_DIM[0], App.Blocks.BLOCK_DIM[1])
  	if(this.animationCycle % 60 > 30) {
  		return;
  	}
  	var sourceX = this.spriteSource[0]
  	var sourceY = this.spriteSource[1]
  	var sourceWidth = this.spriteSource[2]
  	var sourceHeight = this.spriteSource[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0];
  	var destHeight = App.Blocks.BLOCK_DIM[1];
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0]/2;
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1]/2;
  	this.dotstx.clearRect(destX, destY, destWidth, destHeight);
  	this.dotstx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  }

})();