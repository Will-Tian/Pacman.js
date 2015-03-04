(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var Game = App.Game = function(board) {
    this.board = board;
  }

  Game.prototype.draw = function(){
    this.board.draw();
  }

})();
