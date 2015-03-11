(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var MoveQueue = App.MoveQueue = function MoveQueue () {
    this.moves = [];
  };

  MoveQueue.prototype.enQueue = function(move){
  	this.move.push(move);
  	if(this.moves.length >== 1) {
  		
  	}
  };

  MoveQueue.prototype.deQueue = function(callback){
  	callback();
  };


})();
