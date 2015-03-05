(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var GameView = App.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.MOVES = {
    "w": [0, -2],
    "s": [0, 2],
    "a": [-2, 0],
    "d": [2, 0]
  }

  GameView.prototype.bindKeyHandlers = function(){
    var player = App.MovingObjects.Objects[0];
    Object.keys(GameView.MOVES).forEach(function(k) {
      var moveValue = GameView.MOVES[k];
      key(k, function() { player.move(moveValue);});
    });
  }

  GameView.prototype.start = function() {
    var gameView = this;
    this.game.board.drawGrid();
    this.game.board.draw();

    this.timerId = setInterval(
        function () {
          gameView.game.movingObjects.draw();
        }, 1000 / 60
    );

    this.bindKeyHandlers();
  };

})();
