(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  App.StationaryObjects = {};
  var Objects = App.StationaryObjects.Objects = {};

  var StationaryObjects = App.StationaryObjects.StationaryObjects = function(pos, sprites, dotstx, stx) {
  	this.pos = pos;
  	this.sprites = sprites;
  	this.dotstx = dotstx;
  	this.stx = stx
  	this.animationCycle = 0;
  	this.spriteSources = {
  		smalldot: [512, 616, 20, 20],
  		largedot: [532, 600, 35, 35],
  		// lifeToken: [595, 600, 35, 35],
  		lifeToken: [852, 400, 48, 50]
  	}
  }

  StationaryObjects.prototype.draw = function(){
  	$.each(App.StationaryObjects.Objects, function(objectKey, object){
  		object.draw();
  	});
  }

  var SmallDot = App.StationaryObjects.SmallDot = function SmallDot(pos, sprites, dotstx){
  	StationaryObjects.call(this, pos, sprites, dotstx);
  	this.spriteSource = this.spriteSources['smalldot'];
  }

  App.Util.inherits(SmallDot, StationaryObjects);

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
  	StationaryObjects.call(this, pos, sprites, dotstx);
  	this.spriteSource = this.spriteSources['largedot'];
  	this.animationCycle = 0;
  }

  App.Util.inherits(LargeDot, StationaryObjects);

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

  var ScoreBoard = App.StationaryObjects.ScoreBoard = function ScoreBoard(pos, sprites, dotstx, stx){
  	StationaryObjects.call(this, pos, sprites, dotstx, stx);
  	this.spriteSource = this.spriteSources['lifeToken'];
  	this.lifeCounter = 3;
  	this.score = 0;
  }

  App.Util.inherits(ScoreBoard, StationaryObjects);

  ScoreBoard.prototype.drawLifeToken = function(posX, posY) {
  	
  	var sourceX = this.spriteSource[0]
  	var sourceY = this.spriteSource[1]
  	var sourceWidth = this.spriteSource[2]
  	var sourceHeight = this.spriteSource[3]
  	var destWidth = 35;
  	var destHeight = 35;
  	var destX = posX;
  	var destY = posY;
  	this.stx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  }

  ScoreBoard.prototype.drawScore = function(){
  	this.stx.textAlign = "end";
  	this.stx.font = '15px arcadePixelated';
  	this.stx.fillStyle = 'white';
  	this.stx.fillText(this.score, this.pos[0] + App.Boards.levelDim[0][1] - 35, this.pos[1] + 40);
  }


  ScoreBoard.prototype.draw = function(){
  	this.stx.clearRect(0, 0, 1000, 1000);
  	for(var i=1;i<=this.lifeCounter;i++){
  		var posX = i*35;
  		var posY = this.pos[1] + 10;
  		this.drawLifeToken(posX, posY);
  	}
  	this.drawScore();
  }

})();
