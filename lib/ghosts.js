(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }
  var MovingObjects = App.MovingObjects.MovingObjects;

  var Blinky = App.MovingObjects.Blinky = function Blinky(options){
  	MovingObjects.call(this, options.pos, options.vel, options.sprites, options.ptx, options.gtx, options.pdtx);
  	this.pacman = options.pacman;
  	this.path = [];
  	this.animationCycle = 0
  	this.avatar = this.spriteSources.blinkyLeft[this.animationCycle % 2]
  };

  App.Util.inherits(Blinky, MovingObjects);

  Blinky.prototype.findPath = function() {
  	var start = this.currentTilePos(this.pos);
  	var startNode = App.Boards.Nodes['' + JSON.stringify(start)];
  	var destination = this.currentTilePos(this.pacman.pos);
  	var cameFrom = App.PathFinding.aStarSearch(startNode, start, destination);
  	this.path = App.PathFinding.reconstructPath(cameFrom, start, destination);
  }

  Blinky.prototype.draw = function(){
    this.pdtx.clearRect(0, 0, 1000, 1000);
  	var sourceX = this.avatar[0]
  	var sourceY = this.avatar[1]
  	var sourceWidth = this.avatar[2]
  	var sourceHeight = this.avatar[3]
  	var destWidth = App.Blocks.BLOCK_DIM[0] * 2;
  	var destHeight = App.Blocks.BLOCK_DIM[1] * 2;
  	var destX = this.pos[0] - App.Blocks.BLOCK_DIM[0];
  	var destY = this.pos[1] - App.Blocks.BLOCK_DIM[1];
  	this.pdtx.drawImage(this.sprites, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  }

  Blinky.prototype.move = function(){
  	

  }

})();
