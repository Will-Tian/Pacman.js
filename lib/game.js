(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Game = App.Game = function(board, movingObjects) {
    this.board = board;
    this.movingObjects = movingObjects;

  }

  Game.prototype.draw = function(){
    
  }

})();
