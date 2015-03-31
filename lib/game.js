(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Game = App.Game = function(board, movingObjects, stationaryObjects) {
    this.board = board;
    this.movingObjects = movingObjects;
    this.stationaryObjects = stationaryObjects;

  }

  Game.prototype.draw = function(){
    
  }

})();
