(function() {
  if (typeof App === "undefined") {
    window.App = {};
  }

  var GameView = App.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function() {
    var gameView = this;
    this.game.board.drawGrid();
    this.game.board.draw();
    this.timerId = setInterval(
        function () {

        }, 1000 / 60
      );
  };

})();
